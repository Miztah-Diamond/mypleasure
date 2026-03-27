import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, product_name, category, description, product_slug } = body

    // At least one field should be provided
    if (!product_name && !description) {
      return NextResponse.json(
        { error: 'Please describe the product you are looking for' },
        { status: 400 }
      )
    }

    const sql = getDb()

    const rows = await sql`
      INSERT INTO product_requests (name, email, phone, product_name, category, description, product_slug)
      VALUES (${name || null}, ${email || null}, ${phone || null}, ${product_name || null}, ${category || null}, ${description || null}, ${product_slug || null})
      RETURNING *
    `

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
    }

    // Send admin notification email
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@mypleasureltd.com'
      await sendEmail({
        to: adminEmail,
        subject: `📋 New Product Request${product_name ? `: ${product_name}` : ''}`,
        html: `
          <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2C1810;">
            <div style="background: #1E1218; padding: 24px 32px; text-align: center;">
              <h1 style="color: #C4956A; font-size: 20px; margin: 0;">New Product Request</h1>
            </div>
            <div style="padding: 32px; background: #FFFFFF;">
              <table style="width: 100%; border-collapse: collapse;">
                ${name ? `<tr><td style="padding: 8px 0; color: #8B7B74; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>` : ''}
                ${email ? `<tr><td style="padding: 8px 0; color: #8B7B74;">Email</td><td style="padding: 8px 0;">${email}</td></tr>` : ''}
                ${phone ? `<tr><td style="padding: 8px 0; color: #8B7B74;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
                ${product_name ? `<tr><td style="padding: 8px 0; color: #8B7B74;">Product</td><td style="padding: 8px 0; font-weight: 600;">${product_name}</td></tr>` : ''}
                ${category ? `<tr><td style="padding: 8px 0; color: #8B7B74;">Category</td><td style="padding: 8px 0; text-transform: capitalize;">${category}</td></tr>` : ''}
                ${description ? `<tr><td style="padding: 8px 0; color: #8B7B74; vertical-align: top;">Description</td><td style="padding: 8px 0;">${description}</td></tr>` : ''}
                ${product_slug ? `<tr><td style="padding: 8px 0; color: #8B7B74;">From Product</td><td style="padding: 8px 0;"><a href="${process.env.NEXT_PUBLIC_SITE_URL}/product/${product_slug}" style="color: #C4956A;">${product_slug}</a></td></tr>` : ''}
              </table>
              <div style="margin-top: 24px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/requests" style="display: inline-block; background: #C4956A; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">View in Dashboard</a>
              </div>
            </div>
            <div style="background: #FAF6F2; padding: 16px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #8B7B74;">© ${new Date().getFullYear()} MP Wellness</p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Admin notification email error:', emailError)
    }

    return NextResponse.json({ success: true, request: rows[0] }, { status: 201 })
  } catch (err) {
    console.error('Product request API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
