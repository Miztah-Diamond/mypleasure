import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sql = getDb()
    const rows = await sql`SELECT * FROM products WHERE id = ${id}`

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Product GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
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
      name, slug, category, subcategory, price, compare_price,
      description, features, material, details, images,
      badge, stock, status, featured, rating, review_count
    } = body

    const rows = await sql`
      UPDATE products SET
        name = ${name},
        slug = ${slug},
        category = ${category},
        subcategory = ${subcategory || null},
        price = ${Number(price)},
        compare_price = ${compare_price ? Number(compare_price) : null},
        description = ${description || null},
        features = ${features || []},
        material = ${material || null},
        details = ${details ? JSON.stringify(details) : null},
        images = ${images || []},
        badge = ${badge || null},
        stock = ${Number(stock) || 0},
        status = ${status || 'draft'},
        featured = ${featured || false},
        rating = ${Number(rating) || 0},
        review_count = ${Number(review_count) || 0},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Product PUT error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sql = getDb()

    const rows = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Product DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
