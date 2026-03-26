import { getDb } from '@/lib/db'
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
    description: 'The ultimate upgrade to the classic rose. Combines powerful suction with a flickering tongue for dual stimulation that hits every spot.',
    features: ['Suction + Tongue Dual Action', '10 Patterns Each', 'USB Rechargeable', 'Medical Silicone'],
    material: 'Medical-grade Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Rose+2in1'], badge: 'bestseller', stock: 15, status: 'active', featured: true, rating: 4.9, review_count: 1923, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '3', name: 'Bullet Vibrator Mini', slug: 'bullet-vibrator-mini',
    category: 'women', subcategory: 'Vibrators', price: 450000, compare_price: 1000000,
    description: 'Small but mighty. This discreet bullet vibrator delivers 10 speeds of powerful vibration in a pocket-sized design perfect for beginners.',
    features: ['10 Vibration Speeds', 'Ultra Discreet Size', 'USB Rechargeable', 'Waterproof'],
    material: 'ABS Plastic + Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Bullet+Vibe'], badge: 'bestseller', stock: 40, status: 'active', featured: true, rating: 4.7, review_count: 3456, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '4', name: 'Rabbit Vibrator', slug: 'rabbit-vibrator',
    category: 'women', subcategory: 'Vibrators', price: 1500000, compare_price: 5000000,
    description: 'The legendary dual-stimulation vibrator. Simultaneous G-spot and clitoral stimulation with independent motors for each.',
    features: ['Dual Stimulation', 'Independent Controls', '10 Patterns', 'Flexible Ears'],
    material: 'Medical-grade Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Rabbit+Vibe'], badge: 'bestseller', stock: 8, status: 'active', featured: true, rating: 4.8, review_count: 2134, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '5', name: 'Manual Masturbation Cup', slug: 'manual-masturbation-cup',
    category: 'men', subcategory: 'Strokers', price: 700000, compare_price: 1500000,
    description: 'Premium textured stroker with realistic internal channel. Soft, stretchy TPE material provides an incredibly lifelike experience.',
    features: ['Realistic Texture', 'Soft TPE Material', 'Easy to Clean', 'Compact Design'],
    material: 'TPE', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Stroker+Cup'], badge: 'bestseller', stock: 25, status: 'active', featured: true, rating: 4.6, review_count: 2345, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '6', name: 'Vibrating Cock Ring', slug: 'vibrating-cock-ring',
    category: 'men', subcategory: 'Rings', price: 450000, compare_price: 1200000,
    description: 'Stretchy silicone ring with powerful vibrating motor. Enhances pleasure for both partners during intimate moments.',
    features: ['10 Vibration Modes', 'USB Rechargeable', 'Stretchy Silicone', 'Couples Friendly'],
    material: 'Medical-grade Silicone', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Cock+Ring'], badge: 'bestseller', stock: 30, status: 'active', featured: true, rating: 4.5, review_count: 3456, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '7', name: 'Couples Starter Bundle', slug: 'couples-starter-bundle',
    category: 'couples', subcategory: 'Bundles', price: 2500000, compare_price: 4000000,
    description: 'Everything you need to explore together. Includes a rose vibrator, vibrating ring, lubricant, and bullet vibrator in one discreet package.',
    features: ['4 Products Included', 'Best Value Bundle', 'Gift Ready', 'Beginner Friendly'],
    material: 'Mixed', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Couples+Bundle'], badge: 'bestseller', stock: 10, status: 'active', featured: true, rating: 4.8, review_count: 1567, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '8', name: 'Water-Based Lubricant', slug: 'water-based-lubricant',
    category: 'accessories', subcategory: 'Lubricants', price: 350000, compare_price: 800000,
    description: 'Premium water-based formula safe for use with all toy materials. Non-staining, long-lasting, and pH balanced for comfort.',
    features: ['100ml Bottle', 'Toy Compatible', 'pH Balanced', 'Non-Staining', 'Odorless'],
    material: 'Water-based Formula', details: null,
    images: ['https://placehold.co/600x600/1E1218/C4956A?text=Lubricant'], badge: null, stock: 40, status: 'active', featured: true, rating: 4.7, review_count: 4567, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
]

export async function getProducts(options?: {
  category?: string
  featured?: boolean
  limit?: number
  sort?: string
}): Promise<Product[]> {
  try {
    const sql = getDb()
    const cat = options?.category || null
    const feat = options?.featured || null
    const lim = options?.limit || 100
    const sortBy = options?.sort || 'default'

    let rows: Product[]

    if (sortBy === 'price-asc') {
      rows = cat && feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} AND featured = true ORDER BY price ASC LIMIT ${lim}` as Product[]
        : cat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} ORDER BY price ASC LIMIT ${lim}` as Product[]
        : feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND featured = true ORDER BY price ASC LIMIT ${lim}` as Product[]
        : await sql`SELECT * FROM products WHERE status = 'active' ORDER BY price ASC LIMIT ${lim}` as Product[]
    } else if (sortBy === 'price-desc') {
      rows = cat && feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} AND featured = true ORDER BY price DESC LIMIT ${lim}` as Product[]
        : cat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} ORDER BY price DESC LIMIT ${lim}` as Product[]
        : feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND featured = true ORDER BY price DESC LIMIT ${lim}` as Product[]
        : await sql`SELECT * FROM products WHERE status = 'active' ORDER BY price DESC LIMIT ${lim}` as Product[]
    } else if (sortBy === 'newest') {
      rows = cat && feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} AND featured = true ORDER BY created_at DESC LIMIT ${lim}` as Product[]
        : cat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} ORDER BY created_at DESC LIMIT ${lim}` as Product[]
        : feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND featured = true ORDER BY created_at DESC LIMIT ${lim}` as Product[]
        : await sql`SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC LIMIT ${lim}` as Product[]
    } else if (sortBy === 'rating') {
      rows = cat && feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} AND featured = true ORDER BY rating DESC LIMIT ${lim}` as Product[]
        : cat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} ORDER BY rating DESC LIMIT ${lim}` as Product[]
        : feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND featured = true ORDER BY rating DESC LIMIT ${lim}` as Product[]
        : await sql`SELECT * FROM products WHERE status = 'active' ORDER BY rating DESC LIMIT ${lim}` as Product[]
    } else {
      rows = cat && feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} AND featured = true ORDER BY featured DESC, created_at DESC LIMIT ${lim}` as Product[]
        : cat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND category = ${cat} ORDER BY featured DESC, created_at DESC LIMIT ${lim}` as Product[]
        : feat
        ? await sql`SELECT * FROM products WHERE status = 'active' AND featured = true ORDER BY featured DESC, created_at DESC LIMIT ${lim}` as Product[]
        : await sql`SELECT * FROM products WHERE status = 'active' ORDER BY featured DESC, created_at DESC LIMIT ${lim}` as Product[]
    }

    if (!rows || rows.length === 0) {
      let filtered = [...mockProducts]
      if (options?.category) filtered = filtered.filter(p => p.category === options.category)
      if (options?.featured) filtered = filtered.filter(p => p.featured)
      if (options?.limit) filtered = filtered.slice(0, options.limit)
      return filtered
    }
    return rows
  } catch {
    let filtered = [...mockProducts]
    if (options?.category) filtered = filtered.filter(p => p.category === options.category)
    if (options?.featured) filtered = filtered.filter(p => p.featured)
    if (options?.limit) filtered = filtered.slice(0, options.limit)
    return filtered
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const sql = getDb()
    const rows = await sql`SELECT * FROM products WHERE slug = ${slug} AND status = 'active'` as Product[]

    if (!rows || rows.length === 0) {
      return mockProducts.find(p => p.slug === slug) || null
    }
    return rows[0]
  } catch {
    return mockProducts.find(p => p.slug === slug) || null
  }
}

export async function getRelatedProducts(category: string, excludeId: string, limit = 4): Promise<Product[]> {
  try {
    const sql = getDb()
    const rows = await sql`SELECT * FROM products WHERE category = ${category} AND status = 'active' AND id != ${excludeId} LIMIT ${limit}` as Product[]

    if (!rows || rows.length === 0) {
      return mockProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, limit)
    }
    return rows
  } catch {
    return mockProducts.filter(p => p.category === category && p.id !== excludeId).slice(0, limit)
  }
}
