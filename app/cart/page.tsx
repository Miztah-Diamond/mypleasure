'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { FREE_DELIVERY_THRESHOLD } from '@/lib/constants'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 text-center">
        <ShoppingBag className="h-20 w-20 text-beige mx-auto mb-6" />
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-wine mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-warm-gray mb-8">
          Looks like you haven&apos;t added any products yet.
        </p>
        <Button size="xl" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 lg:py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-beige/50"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                <Image
                  src={item.product.images[0] || '/images/placeholder.jpg'}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-[family-name:var(--font-playfair)] font-semibold text-wine hover:text-gold transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-warm-gray mt-1">
                      {item.product.subcategory}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-warm-gray hover:text-error transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gold font-semibold mt-2">
                  {formatPrice(item.product.price)}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-beige rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                      className="p-2 hover:bg-cream transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-cream transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-semibold text-chocolate">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition-colors mt-4"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-beige/50 p-6 sticky top-24">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-warm-gray">
                  Subtotal ({items.length} items)
                </span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray">Delivery</span>
                <span className="text-warm-gray">
                  {isFreeDelivery ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              {isFreeDelivery && (
                <div className="flex justify-between text-sage">
                  <span>Free Delivery Applied</span>
                  <span>✓</span>
                </div>
              )}
            </div>
            <div className="border-t border-beige my-4" />
            {/* Promo Code */}
            <div className="flex gap-2 mb-4">
              <Input placeholder="Promo code" className="flex-1" />
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span className="text-wine">Total</span>
              <span className="text-gold">{formatPrice(subtotal)}</span>
            </div>
            <Button size="xl" className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <p className="text-[11px] text-warm-gray text-center mt-4">
              Transaction appears as &quot;MP Wellness&quot; on your statement
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
