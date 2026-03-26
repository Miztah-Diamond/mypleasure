import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, status, trackingNumber, deliveryPartner, customerEmail, customerName } = await request.json()

    if (!orderNumber || !status || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let subject = ''
    let html = ''

    const baseStyles = `font-family: 'DM Sans', Arial, sans-serif; color: #2C1810; max-width: 600px; margin: 0 auto;`
    const headerHtml = `<div style="background: #1E1218; padding: 32px; text-align: center;"><h1 style="color: #C4956A; font-size: 24px; margin: 0;">MP Wellness</h1></div>`
    const footerHtml = `<div style="background: #FAF6F2; padding: 24px; text-align: center;"><p style="margin: 0; font-size: 12px; color: #8B7B74;">📦 Your package will arrive in plain, unmarked packaging.</p><p style="margin: 8px 0 0; font-size: 12px; color: #8B7B74;">Need help? <a href="https://wa.me/2348000000000" style="color: #C4956A;">Chat on WhatsApp</a></p></div>`

    switch (status) {
      case 'accepted':
        subject = `Your Order is Being Prepared (#${orderNumber})`
        html = `<div style="${baseStyles}">${headerHtml}<div style="padding: 32px; background: #fff;"><h2 style="color: #1E1218;">Order Accepted ✓</h2><p>Hi ${customerName},</p><p>Great news! Your order <strong>#${orderNumber}</strong> has been accepted and is being prepared for delivery.</p><p style="color: #8B7B74;">We'll send you another update once your order has been dispatched.</p></div>${footerHtml}</div>`
        break

      case 'shipped':
        subject = `Your Order is On Its Way! (#${orderNumber})`
        html = `<div style="${baseStyles}">${headerHtml}<div style="padding: 32px; background: #fff;"><h2 style="color: #1E1218;">Order Shipped 🚚</h2><p>Hi ${customerName},</p><p>Your order <strong>#${orderNumber}</strong> is on its way to you!</p>${trackingNumber ? `<div style="background: #FAF6F2; padding: 16px; border-radius: 8px; margin: 16px 0;"><p style="margin: 0;"><strong>Tracking Number:</strong> ${trackingNumber}</p>${deliveryPartner ? `<p style="margin: 4px 0 0;"><strong>Carrier:</strong> ${deliveryPartner}</p>` : ''}</div>` : ''}<p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/track" style="color: #C4956A;">Track your order →</a></p></div>${footerHtml}</div>`
        break

      case 'delivered':
        subject = `Order Delivered (#${orderNumber})`
        html = `<div style="${baseStyles}">${headerHtml}<div style="padding: 32px; background: #fff;"><h2 style="color: #1E1218;">Order Delivered ✓</h2><p>Hi ${customerName},</p><p>Your order <strong>#${orderNumber}</strong> has been delivered. We hope you enjoy your purchase!</p><p style="color: #8B7B74; font-size: 14px;">For product care tips and guides, visit our FAQ page.</p><p style="color: #8B7B74; font-size: 14px;">If you have any questions, our WhatsApp support is always here to help.</p></div>${footerHtml}</div>`
        break

      case 'cancelled':
        subject = `Order Cancelled (#${orderNumber})`
        html = `<div style="${baseStyles}">${headerHtml}<div style="padding: 32px; background: #fff;"><h2 style="color: #1E1218;">Order Cancelled</h2><p>Hi ${customerName},</p><p>Your order <strong>#${orderNumber}</strong> has been cancelled. If you were charged, a refund will be processed within 5-7 business days.</p><p>If you didn't request this cancellation, please contact us immediately.</p></div>${footerHtml}</div>`
        break

      default:
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const result = await sendEmail({ to: customerEmail, subject, html })
    return NextResponse.json(result)
  } catch (err) {
    console.error('Email API error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
