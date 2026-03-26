import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let rows
    if (search) {
      rows = await sql`
        SELECT * FROM orders
        WHERE order_number ILIKE ${'%' + search + '%'}
           OR customer_name ILIKE ${'%' + search + '%'}
           OR customer_email ILIKE ${'%' + search + '%'}
        ORDER BY created_at DESC
      `
    } else if (status && status !== 'all') {
      rows = await sql`
        SELECT * FROM orders WHERE order_status = ${status}
        ORDER BY created_at DESC
      `
    } else {
      rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json([], { status: 200 })
  }
}
