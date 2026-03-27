import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const sql = getDb()

    let rows
    if (status && status !== 'all' && search) {
      rows = await sql`
        SELECT * FROM product_requests
        WHERE status = ${status}
        AND (
          product_name ILIKE ${'%' + search + '%'}
          OR name ILIKE ${'%' + search + '%'}
          OR email ILIKE ${'%' + search + '%'}
          OR description ILIKE ${'%' + search + '%'}
        )
        ORDER BY created_at DESC
      `
    } else if (status && status !== 'all') {
      rows = await sql`SELECT * FROM product_requests WHERE status = ${status} ORDER BY created_at DESC`
    } else if (search) {
      rows = await sql`
        SELECT * FROM product_requests
        WHERE product_name ILIKE ${'%' + search + '%'}
        OR name ILIKE ${'%' + search + '%'}
        OR email ILIKE ${'%' + search + '%'}
        OR description ILIKE ${'%' + search + '%'}
        ORDER BY created_at DESC
      `
    } else {
      rows = await sql`SELECT * FROM product_requests ORDER BY created_at DESC`
    }

    return NextResponse.json(rows)
  } catch (err) {
    console.error('Admin requests API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, admin_notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 })
    }

    const sql = getDb()

    const rows = await sql`
      UPDATE product_requests
      SET
        status = COALESCE(${status || null}, status),
        admin_notes = COALESCE(${admin_notes !== undefined ? admin_notes : null}, admin_notes),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    console.error('Admin request update error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
