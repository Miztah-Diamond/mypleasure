import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
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
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .eq('customer_email', email)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, delivery_address, delivery_method, delivery_fee, items, subtotal, total, payment_reference, user_id } = body

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Validate stock availability before creating order
    const outOfStock: string[] = []
    for (const item of items) {
      if (item.product_id) {
        const { data: product } = await supabase
          .from('products')
          .select('name, stock')
          .eq('id', item.product_id)
          .single()

        if (product && product.stock < item.quantity) {
          outOfStock.push(`${product.name} (only ${product.stock} left)`)
        }
      }
    }

    if (outOfStock.length > 0) {
      return NextResponse.json(
        { error: 'Some items are out of stock', outOfStock },
        { status: 409 }
      )
    }

    const order_number = generateOrderNumber()

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        delivery_address: typeof delivery_address === 'string' ? JSON.parse(delivery_address) : delivery_address,
        delivery_method,
        delivery_fee,
        items: typeof items === 'string' ? JSON.parse(items) : items,
        subtotal,
        total,
        payment_reference,
        payment_status: 'paid',
        order_status: 'pending',
        user_id: user_id || null,
      })
      .select()
      .single()

    if (error || !data) {
      console.error('Order creation failed:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Decrement stock for each purchased item
    for (const item of items) {
      if (item.product_id) {
        // Use rpc for GREATEST to prevent negative stock
        await supabase.rpc('decrement_stock', {
          p_id: item.product_id,
          qty: item.quantity,
        })
      }
    }

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
