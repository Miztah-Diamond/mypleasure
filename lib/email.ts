import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'MP Wellness <orders@mypleasureltd.com>',
      to,
      subject,
      html,
    })
    if (error) {
      console.error('Email error:', error)
      return { success: false, error }
    }
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export function formatOrderEmail(orderNumber: string, items: Array<{ name: string; quantity: number; price: number }>, total: number) {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6; text-align: right;">₦${(item.price / 100).toLocaleString()}</td>
    </tr>
  `).join('')

  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'DM Sans', Arial, sans-serif; color: #2C1810;">
      <div style="background: #1E1218; padding: 32px; text-align: center;">
        <h1 style="color: #C4956A; font-size: 24px; margin: 0;">MP Wellness</h1>
      </div>
      <div style="padding: 32px; background: #FFFFFF;">
        <h2 style="color: #1E1218; font-size: 20px;">Order Confirmed ✓</h2>
        <p style="color: #8B7B74;">Order Number: <strong style="color: #1E1218;">${orderNumber}</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <thead>
            <tr style="background: #FAF6F2;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #E8DDD6;">Item</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #E8DDD6;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #E8DDD6;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 12px; font-weight: 600; text-align: right;">Total:</td>
              <td style="padding: 12px; font-weight: 600; text-align: right; color: #C4956A;">₦${(total / 100).toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        <div style="background: #FAF6F2; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #8B7B74;">📦 Your order will be packaged discreetly in plain, unmarked packaging.</p>
        </div>
        <p style="color: #8B7B74; font-size: 14px;">Need help? Chat with us on <a href="https://wa.me/2348000000000" style="color: #C4956A;">WhatsApp</a></p>
      </div>
      <div style="background: #FAF6F2; padding: 24px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #8B7B74;">© ${new Date().getFullYear()} MP Wellness. All rights reserved.</p>
      </div>
    </div>
  `
}
