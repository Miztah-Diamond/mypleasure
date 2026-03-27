import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        // Block out-of-stock items
        if (product.stock <= 0) return

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )
          if (existingItem) {
            // Cap at available stock
            const newQty = Math.min(existingItem.quantity + quantity, product.stock)
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: newQty }
                  : item
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { product, quantity: Math.min(quantity, product.stock) }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              // Cap at available stock
              const maxQty = item.product.stock || 999
              return { ...item, quantity: Math.min(quantity, maxQty) }
            }
            return item
          }),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getTotal: () => {
        return get().getSubtotal()
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'mp-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
