import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()
    const rows = await sql`SELECT * FROM settings WHERE id = 1`

    if (!rows || rows.length === 0) {
      // Return defaults
      return NextResponse.json({
        store_name: 'My Pleasure LTD',
        contact_email: 'hello@mypleasureltd.com',
        whatsapp_number: '+2348000000000',
        announcement_text: 'Free discreet delivery on orders over ₦15,000 | 100% unmarked packaging',
        free_delivery_threshold: 1500000,
        delivery_fees: { lagos: 150000, major_cities: 200000, nationwide: 250000 },
        social_links: {},
      })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({
      store_name: 'My Pleasure LTD',
      contact_email: '',
      whatsapp_number: '',
      announcement_text: '',
      free_delivery_threshold: 1500000,
      delivery_fees: { lagos: 150000, major_cities: 200000, nationwide: 250000 },
      social_links: {},
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sql = getDb()
    const body = await request.json()

    const {
      store_name, contact_email, whatsapp_number,
      announcement_text, free_delivery_threshold,
      delivery_fees, social_links,
    } = body

    const rows = await sql`
      INSERT INTO settings (id, store_name, contact_email, whatsapp_number, announcement_text, free_delivery_threshold, delivery_fees, social_links)
      VALUES (
        1,
        ${store_name || 'My Pleasure LTD'},
        ${contact_email || null},
        ${whatsapp_number || null},
        ${announcement_text || null},
        ${Number(free_delivery_threshold) || 1500000},
        ${JSON.stringify(delivery_fees || {})},
        ${JSON.stringify(social_links || {})}
      )
      ON CONFLICT (id) DO UPDATE SET
        store_name = EXCLUDED.store_name,
        contact_email = EXCLUDED.contact_email,
        whatsapp_number = EXCLUDED.whatsapp_number,
        announcement_text = EXCLUDED.announcement_text,
        free_delivery_threshold = EXCLUDED.free_delivery_threshold,
        delivery_fees = EXCLUDED.delivery_fees,
        social_links = EXCLUDED.social_links,
        updated_at = NOW()
      RETURNING *
    `

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
