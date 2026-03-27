"use client"

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()
  const subtotal = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-wine/60 backdrop-blur-sm" onClick={closeCart} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-beige">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine">
            Your Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-warm-gray hover:text-chocolate transition-colors rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-beige mb-4" />
              <p className="font-[family-name:var(--font-playfair)] text-lg text-wine mb-2">Your cart is empty</p>
              <p className="text-sm text-warm-gray mb-6">Discover our premium wellness collection</p>
              <Button onClick={closeCart} asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-cream/50">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-beige/30 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || '/images/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-chocolate truncate">{item.product.name}</h3>
                    <p className="text-sm font-semibold text-gold mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-lg border border-beige hover:bg-beige/50 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-lg border border-beige hover:bg-beige/50 transition-colors disabled:opacity-30"
                        disabled={item.quantity >= (item.product.stock || 999)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-1 text-warm-gray hover:text-error transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-beige p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-warm-gray">Subtotal</span>
              <span className="text-lg font-semibold text-wine">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-warm-gray">Delivery calculated at checkout</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={closeCart} asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button onClick={closeCart} asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
