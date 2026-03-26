"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'For Her' },
  { id: 'men', label: 'For Him' },
  { id: 'couples', label: 'Couples' },
  { id: 'accessories', label: 'Accessories' },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId === 'all') {
      params.delete('category')
    } else {
      params.set('category', categoryId)
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
            activeCategory === cat.id
              ? "bg-gold text-white shadow-sm"
              : "bg-white text-chocolate border border-beige hover:border-gold hover:text-gold"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
