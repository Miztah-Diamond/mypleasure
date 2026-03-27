'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Zap, AlertCircle, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const isOutOfStock = product.stock <= 0
  const maxQuantity = product.stock

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('This item is currently out of stock')
      return
    }
    if (quantity > maxQuantity) {
      toast.error(`Only ${maxQuantity} available`)
      return
    }
    addItem(product, quantity)
    toast.success(`${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error('This item is currently out of stock')
      return
    }
    addItem(product, quantity)
    router.push('/checkout')
  }

  if (isOutOfStock) {
    return (
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-error/5 border border-error/20">
          <AlertCircle className="h-5 w-5 text-error flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-error">Out of Stock</p>
            <p className="text-xs text-warm-gray mt-0.5">This item is currently unavailable. Check back soon!</p>
          </div>
        </div>
        <Button size="xl" disabled className="w-full gap-2 opacity-50 cursor-not-allowed">
          <ShoppingBag className="h-5 w-5" />
          Out of Stock
        </Button>
        <Button size="xl" variant="secondary" asChild className="w-full gap-2">
          <Link href={`/request?product=${encodeURIComponent(product.name)}&slug=${product.slug}&category=${product.category}`}>
            <Sparkles className="h-5 w-5" />
            Request Restock
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-chocolate">Quantity</span>
        <div className="flex items-center border border-beige rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-cream transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-6 py-3 text-sm font-medium min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
            className="p-3 hover:bg-cream transition-colors disabled:opacity-30"
            disabled={quantity >= maxQuantity}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {product.stock <= 10 && (
          <span className="text-xs text-error">Only {product.stock} left!</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button size="xl" onClick={handleAddToCart} className="flex-1 gap-2">
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          size="xl"
          variant="secondary"
          onClick={handleBuyNow}
          className="flex-1 gap-2"
        >
          <Zap className="h-5 w-5" />
          Buy Now
        </Button>
      </div>
    </div>
  )
}
