import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query = supabase.from('products').select('*')

    if (search) {
      query = query.ilike('name', `%${search}%`)
    } else {
      if (status) query = query.eq('status', status)
      if (category) query = query.eq('category', category)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Products GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const {
      name, slug, category, subcategory, price, compare_price,
      description, features, material, details, images,
      badge, stock, status, featured, rating, review_count
    } = body

    if (!name || !slug || !category || !price) {
      return NextResponse.json({ error: 'Name, slug, category, and price are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name, slug, category,
        subcategory: subcategory || null,
        price: Number(price),
        compare_price: compare_price ? Number(compare_price) : null,
        description: description || null,
        features: features || [],
        material: material || null,
        details: details || null,
        images: images || [],
        badge: badge || null,
        stock: Number(stock) || 0,
        status: status || 'draft',
        featured: featured || false,
        rating: Number(rating) || 0,
        review_count: Number(review_count) || 0,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Products POST error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
