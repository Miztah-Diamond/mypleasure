// Email template helper - exports HTML string generators for email templates
// These are used by the /api/email route and the order creation flow

export function orderConfirmationTemplate(data: {
  orderNumber: string
  customerName: string
  items: Array<{ name: string; quantity: number; price: number }>
  subtotal: number
  deliveryFee: number
  total: number
  deliveryAddress: { street: string; city: string; state: string }
  deliveryMethod: string
}) {
  const itemRows = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #E8DDD6; text-align: right;">₦${(item.price / 100).toLocaleString()}</td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; font-family: 'DM Sans', Arial, sans-serif; color: #2C1810; background: #FAF6F2;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #1E1218; padding: 32px; text-align: center;">
          <h1 style="color: #C4956A; font-size: 28px; margin: 0; font-family: Georgia, serif;">MP Wellness</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #1E1218; font-size: 22px; margin: 0 0 8px;">Order Confirmed ✓</h2>
          <p style="color: #8B7B74; margin: 0 0 24px;">Thank you for your order, ${data.customerName}!</p>

          <div style="background: #FAF6F2; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; color: #8B7B74;">Order Number</p>
            <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold; color: #C4956A;">${data.orderNumber}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #FAF6F2;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #E8DDD6; font-size: 12px; text-transform: uppercase; color: #8B7B74;">Item</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #E8DDD6; font-size: 12px; text-transform: uppercase; color: #8B7B74;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #E8DDD6; font-size: 12px; text-transform: uppercase; color: #8B7B74;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <div style="margin-top: 16px; padding-top: 16px; border-top: 2px solid #E8DDD6;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #8B7B74;">Subtotal</span>
              <span>₦${(data.subtotal / 100).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #8B7B74;">Delivery (${data.deliveryMethod})</span>
              <span>${data.deliveryFee === 0 ? 'FREE' : '₦' + (data.deliveryFee / 100).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; padding-top: 8px; border-top: 1px solid #E8DDD6;">
              <span style="color: #1E1218;">Total Paid</span>
              <span style="color: #C4956A;">₦${(data.total / 100).toLocaleString()}</span>
            </div>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #FAF6F2; border-radius: 8px;">
            <p style="margin: 0 0 8px; font-weight: bold; font-size: 14px;">Delivery Address</p>
            <p style="margin: 0; font-size: 14px; color: #8B7B74;">${data.deliveryAddress.street}, ${data.deliveryAddress.city}, ${data.deliveryAddress.state}</p>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #FAF6F2; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #8B7B74;">📦 Your order will be packaged discreetly in plain, unmarked packaging. No logos, no product names — complete privacy.</p>
          </div>
        </div>
        <div style="background: #FAF6F2; padding: 24px; text-align: center;">
          <p style="margin: 0; font-size: 14px; color: #8B7B74;">Need help? <a href="https://wa.me/2348000000000" style="color: #C4956A; text-decoration: none;">Chat on WhatsApp</a></p>
          <p style="margin: 12px 0 0; font-size: 12px; color: #8B7B74;">© ${new Date().getFullYear()} MP Wellness. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function adminNewOrderTemplate(data: {
  orderNumber: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  deliveryMethod: string
  deliveryAddress: { street: string; city: string; state: string }
}) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #1E1218; padding: 24px; text-align: center;">
          <h1 style="color: #C4956A; font-size: 20px; margin: 0;">🛒 New Order Alert</h1>
        </div>
        <div style="padding: 24px;">
          <h2 style="margin: 0 0 16px;">Order #${data.orderNumber}</h2>
          <p><strong>Total:</strong> ₦${(data.total / 100).toLocaleString()}</p>
          <hr style="border: 1px solid #E8DDD6;">
          <h3>Customer</h3>
          <p>${data.customerName}<br>${data.customerPhone}<br>${data.customerEmail}</p>
          <h3>Items</h3>
          <ul>${data.items.map(i => `<li>${i.name} x${i.quantity} — ₦${(i.price * i.quantity / 100).toLocaleString()}</li>`).join('')}</ul>
          <h3>Delivery</h3>
          <p>${data.deliveryMethod}<br>${data.deliveryAddress.street}, ${data.deliveryAddress.city}, ${data.deliveryAddress.state}</p>
          <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders" style="background: #C4956A; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none;">View in Dashboard</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}
