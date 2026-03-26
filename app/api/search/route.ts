import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  try {
    const sql = getDb()
    const rows = await sql`
      SELECT id, name, slug, category, price, compare_price, images, badge, rating
      FROM products
      WHERE status = 'active'
        AND (name ILIKE ${'%' + q + '%'} OR description ILIKE ${'%' + q + '%'} OR category ILIKE ${'%' + q + '%'})
      ORDER BY featured DESC, rating DESC
      LIMIT 8
    `
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}
