import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendEmail, formatOrderEmail } from '@/lib/email'
import { generateOrderNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderNumber = searchParams.get('orderNumber')
  const email = searchParams.get('email')

  if (!orderNumber || !email) {
    return NextResponse.json({ error: 'Order number and email required' }, { status: 400 })
  }

  try {
    const sql = getDb()
    const rows = await sql`SELECT * FROM orders WHERE order_number = ${orderNumber} AND customer_email = ${email}`

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, delivery_address, delivery_method, delivery_fee, items, subtotal, total, payment_reference } = body

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order_number = generateOrderNumber()

    const sql = getDb()
    const rows = await sql`INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, delivery_address, delivery_method, delivery_fee, items, subtotal, total, payment_reference, payment_status, order_status) VALUES (${order_number}, ${customer_name}, ${customer_email}, ${customer_phone}, ${JSON.stringify(delivery_address)}, ${delivery_method}, ${delivery_fee}, ${JSON.stringify(items)}, ${subtotal}, ${total}, ${payment_reference}, 'paid', 'pending') RETURNING *`

    if (!rows || rows.length === 0) {
      console.error('Order creation failed: no rows returned')
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    const data = rows[0]

    // Send order confirmation email to customer
    try {
      const emailHtml = formatOrderEmail(order_number, items, total)
      await sendEmail({
        to: customer_email,
        subject: `Order Confirmed — MP Wellness (#${order_number})`,
        html: emailHtml,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }

    // Send admin notification
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@mypleasureltd.com'
      await sendEmail({
        to: adminEmail,
        subject: `🛒 New Order #${order_number} — ₦${(total / 100).toLocaleString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>New Order Received</h2>
            <p><strong>Order:</strong> ${order_number}</p>
            <p><strong>Customer:</strong> ${customer_name} (${customer_phone})</p>
            <p><strong>Email:</strong> ${customer_email}</p>
            <p><strong>Total:</strong> ₦${(total / 100).toLocaleString()}</p>
            <p><strong>Items:</strong> ${items.map((i: any) => `${i.name} x${i.quantity}`).join(', ')}</p>
            <p><strong>Delivery:</strong> ${delivery_method}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders">View in Dashboard →</a></p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Admin email error:', emailError)
    }

    return NextResponse.json({ order_number, ...data }, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
