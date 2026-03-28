import { createAdminClient } from '@/lib/supabase/admin'
import type { Product } from '@/types'

// Mock products for when Supabase isn't connected
const mockProducts: Product[] = [
  {
    id: '1', name: 'Rose Suction Vibrator', slug: 'rose-suction-vibrator',
    category: 'women', subcategory: 'Rose Toys', price: 700000, compare_price: 1200000,
    description: 'Experience the sensation that took the world by storm. Our classic rose vibrator features 10 powerful suction modes designed for intense clitoral stimulation.',
    features: ['10 Suction Modes', 'USB Rechargeable', 'Waterproof IPX7', 'Whisper Quiet', 'Body-Safe Silicone'],
    material: 'Medical-grade Silicone', details: { dimensions: '3.2 x 2.5 inches', howToUse: 'Apply water-based lubricant for enhanced sensation. Press the power button to cycle through 10 modes.', howToClean: 'Wash with warm water and toy cleaner before and after each use.', whatsInBox: '1x Rose Vibrator, 1x USB Charging Cable, 1x Storage Pouch' },
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Rose+Vibrator'], badge: 'bestseller', stock: 30, status: 'active', featured: true, rating: 4.8, review_count: 2847, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '2', name: 'Rose 2-in-1 Tongue Licker', slug: 'rose-2-in-1-tongue-licker',
    category: 'women', subcategory: 'Rose Toys', price: 1200000, compare_price: 2500000,
    description: 'The ultimate upgrade to the classic rose. Combines powerful suction with a flickering tongue for dual stimulation.',
    features: ['Suction + Tongue Dual Action', '10 Patterns Each', 'USB Rechargeable', 'Medical Silicone'],
    material: 'Medical-grade Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Rose+2in1'], badge: 'bestseller', stock: 15, status: 'active', featured: true, rating: 4.9, review_count: 1923, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '3', name: 'Bullet Vibrator Mini', slug: 'bullet-vibrator-mini',
    category: 'women', subcategory: 'Vibrators', price: 450000, compare_price: 1000000,
    description: 'Small but mighty. This discreet bullet vibrator delivers 10 speeds of powerful vibration.',
    features: ['10 Vibration Speeds', 'Ultra Discreet Size', 'USB Rechargeable', 'Waterproof'],
    material: 'ABS Plastic + Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Bullet+Vibe'], badge: 'bestseller', stock: 40, status: 'active', featured: true, rating: 4.7, review_count: 3456, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '4', name: 'Rabbit Vibrator', slug: 'rabbit-vibrator',
    category: 'women', subcategory: 'Vibrators', price: 1500000, compare_price: 5000000,
    description: 'The legendary dual-stimulation vibrator.',
    features: ['Dual Stimulation', 'Independent Controls', '10 Patterns', 'Flexible Ears'],
    material: 'Medical-grade Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Rabbit+Vibe'], badge: 'bestseller', stock: 8, status: 'active', featured: true, rating: 4.8, review_count: 2134, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
]

const sortMap: Record<string, { column: string; ascending: boolean }> = {
  'price-asc': { column: 'price', ascending: true },
  'price-desc': { column: 'price', ascending: false },
  'newest': { column: 'created_at', ascending: false },
  'rating': { column: 'rating', ascending: false },
  'default': { column: 'created_at', ascending: false },
}

export async function getProducts(options?: {
  category?: string
  featured?: boolean
  limit?: number
  sort?: string
}): Promise<Product[]> {
  try {
    const supabase = createAdminClient()
    const lim = options?.limit || 100
    const sortConfig = sortMap[options?.sort || 'default'] || sortMap.default

    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'active')

    if (options?.category) query = query.eq('category', options.category)
    if (options?.featured) query = query.eq('featured', true)

    query = query.order(sortConfig.column, { ascending: sortConfig.ascending })

    // Secondary sort for default
    if (!options?.sort || options.sort === 'default') {
      query = query.order('featured', { ascending: false })
    }

    query = query.limit(lim)

    const { data, error } = await query

    if (error) throw error
    if (!data || data.length === 0) return fallbackProducts(options)

    return data as Product[]
  } catch {
    return fallbackProducts(options)
  }
}

function fallbackProducts(options?: { category?: string; featured?: boolean; limit?: number }) {
  let filtered = [...mockProducts]
  if (options?.category) filtered = filtered.filter(p => p.category === options.category)
  if (options?.featured) filtered = filtered.filter(p => p.featured)
  if (options?.limit) filtered = filtered.slice(0, options.limit)
  return filtered
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error || !data) {
      return mockProducts.find(p => p.slug === slug) || null
    }
    return data as Product
  } catch {
    return mockProducts.find(p => p.slug === slug) || null
  }
}

export async function getRelatedProducts(category: string, excludeId: string, limit = 4): Promise<Product[]> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .neq('id', excludeId)
      .limit(limit)

    if (error || !data || data.length === 0) {
      return mockProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, limit)
    }
    return data as Product[]
  } catch {
    return mockProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, limit)
  }
}
