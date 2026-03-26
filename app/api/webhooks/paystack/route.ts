import { NextRequest, NextResponse } from 'next/server'
import { verifyPaystackSignature } from '@/lib/paystack'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    const isValid = verifyPaystackSignature(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data
      const orderNumber = metadata?.order_number

      if (orderNumber) {
        const supabase = createAdminClient()
        const { error } = await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            payment_reference: reference,
          })
          .eq('order_number', orderNumber)

        if (error) {
          console.error('Webhook update error:', error)
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
