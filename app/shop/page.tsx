import { Suspense } from 'react'
import { getProducts } from '@/lib/data'
import { ProductGrid } from '@/components/products/ProductGrid'
import { CategoryFilter } from '@/components/products/CategoryFilter'
import { Select } from '@/components/ui/select'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our premium collection of adult wellness products. Discreet delivery across Nigeria.',
}

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const products = await getProducts({
    category: params.category,
    sort: params.sort,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Browse</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mt-2">Our Collection</h1>
        <p className="text-warm-gray mt-2">Premium wellness products delivered with absolute discretion</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <Suspense fallback={<div className="h-10" />}>
          <CategoryFilter />
        </Suspense>
        <div className="flex items-center gap-4">
          <span className="text-sm text-warm-gray">{products.length} products</span>
          <form>
            <Select name="sort" defaultValue={params.sort || ''}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </Select>
          </form>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
