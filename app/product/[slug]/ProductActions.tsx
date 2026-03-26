'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, ShoppingBag, Zap } from 'lucide-react'
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

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push('/checkout')
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
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-cream transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {product.stock <= 10 && product.stock > 0 && (
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
