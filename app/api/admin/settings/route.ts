import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const defaultSettings = {
  store_name: 'My Pleasure LTD',
  contact_email: 'hello@mypleasureltd.com',
  whatsapp_number: '+2348000000000',
  announcement_text: 'Free discreet delivery on orders over ₦15,000 | 100% unmarked packaging',
  free_delivery_threshold: 1500000,
  delivery_fees: { lagos: 150000, major_cities: 200000, nationwide: 250000 },
  social_links: {},
}

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) return NextResponse.json(defaultSettings)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const {
      store_name, contact_email, whatsapp_number,
      announcement_text, free_delivery_threshold,
      delivery_fees, social_links,
    } = body

    const { data, error } = await supabase
      .from('settings')
      .upsert({
        id: 1,
        store_name: store_name || 'My Pleasure LTD',
        contact_email: contact_email || null,
        whatsapp_number: whatsapp_number || null,
        announcement_text: announcement_text || null,
        free_delivery_threshold: Number(free_delivery_threshold) || 1500000,
        delivery_fees: delivery_fees || {},
        social_links: social_links || {},
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
