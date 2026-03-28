import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, category, price, compare_price, images, badge, rating')
      .eq('status', 'active')
      .or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`)
      .order('featured', { ascending: false })
      .order('rating', { ascending: false })
      .limit(8)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}
