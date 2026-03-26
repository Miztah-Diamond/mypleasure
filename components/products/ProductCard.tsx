"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { formatPrice, truncateText } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    toast.success(`${product.name} added to cart`)
  }

  const categoryLabels: Record<string, string> = {
    women: 'For Her',
    men: 'For Him',
    couples: 'Couples',
    accessories: 'Accessories',
  }

  return (
    <div className="group product-card rounded-2xl bg-white border border-beige/50 overflow-hidden">
      <Link href={`/product/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-square image-zoom bg-cream">
          <Image
            src={product.images[0] || 'https://placehold.co/600x600/1E1218/C4956A?text=MP'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={product.badge as 'bestseller' | 'new' | 'sale'}>
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-[10px] uppercase tracking-[2px] text-warm-gray font-medium">
            {categoryLabels[product.category] || product.category}
          </span>
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-wine mt-1 leading-tight">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-warm-gray mt-1 leading-relaxed">
              {truncateText(product.description, 60)}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-gold fill-gold'
                      : 'text-beige'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-warm-gray">({product.review_count.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-semibold text-gold">{formatPrice(product.price)}</span>
            {product.compare_price && (
              <span className="text-sm text-warm-gray line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          variant="outline"
          size="sm"
          className="w-full gap-2"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
