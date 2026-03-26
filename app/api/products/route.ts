import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let rows
    if (search) {
      rows = await sql`
        SELECT * FROM products
        WHERE name ILIKE ${'%' + search + '%'}
        ORDER BY created_at DESC
      `
    } else if (status && category) {
      rows = await sql`
        SELECT * FROM products
        WHERE status = ${status} AND category = ${category}
        ORDER BY created_at DESC
      `
    } else if (status) {
      rows = await sql`
        SELECT * FROM products WHERE status = ${status}
        ORDER BY created_at DESC
      `
    } else if (category) {
      rows = await sql`
        SELECT * FROM products WHERE category = ${category}
        ORDER BY created_at DESC
      `
    } else {
      rows = await sql`SELECT * FROM products ORDER BY created_at DESC`
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Products GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const body = await request.json()

    const {
      name, slug, category, subcategory, price, compare_price,
      description, features, material, details, images,
      badge, stock, status, featured, rating, review_count
    } = body

    // Basic validation
    if (!name || !slug || !category || !price) {
      return NextResponse.json(
        { error: 'Name, slug, category, and price are required' },
        { status: 400 }
      )
    }

    const rows = await sql`
      INSERT INTO products (
        name, slug, category, subcategory, price, compare_price,
        description, features, material, details, images,
        badge, stock, status, featured, rating, review_count
      ) VALUES (
        ${name}, ${slug}, ${category}, ${subcategory || null},
        ${Number(price)}, ${compare_price ? Number(compare_price) : null},
        ${description || null}, ${features || []}, ${material || null},
        ${details ? JSON.stringify(details) : null},
        ${images || []},
        ${badge || null}, ${Number(stock) || 0}, ${status || 'draft'},
        ${featured || false}, ${Number(rating) || 0}, ${Number(review_count) || 0}
      )
      RETURNING *
    `

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error) {
    console.error('Products POST error:', error)

    // Check for duplicate slug
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
