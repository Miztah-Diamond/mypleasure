import crypto from 'crypto'

export function verifyPaystackSignature(
  body: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')
  return hash === signature
}

export async function verifyTransaction(reference: string) {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )
  return response.json()
}

export function initializePayment(data: {
  email: string
  amount: number
  reference: string
  metadata?: Record<string, unknown>
  channels?: string[]
}) {
  return {
    ...data,
    currency: 'NGN',
    channels: data.channels || ['card', 'bank', 'ussd', 'bank_transfer'],
    metadata: {
      ...data.metadata,
      custom_fields: [
        {
          display_name: 'Company',
          variable_name: 'company',
          value: 'MP Wellness',
        },
      ],
    },
  }
}
