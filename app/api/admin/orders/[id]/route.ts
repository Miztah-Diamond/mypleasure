import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sql = getDb()
    const rows = await sql`SELECT * FROM orders WHERE id = ${id}`

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Order GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sql = getDb()
    const body = await request.json()

    const {
      order_status,
      tracking_number,
      delivery_partner,
      admin_notes,
    } = body

    const rows = await sql`
      UPDATE orders SET
        order_status = ${order_status},
        tracking_number = ${tracking_number || null},
        delivery_partner = ${delivery_partner || null},
        admin_notes = ${admin_notes || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Order PUT error:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
