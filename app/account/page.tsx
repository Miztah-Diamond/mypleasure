'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Loader2, Package, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

interface Order {
  id: string
  order_number: string
  order_status: string
  total: number
  created_at: string
  items: Array<{ name: string; quantity: number }>
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-blue-50 text-blue-700',
  processing: 'bg-purple-50 text-purple-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })

      if (data) {
        setOrders(data.map((o: Record<string, unknown>) => ({
          ...o,
          items: typeof o.items === 'string' ? JSON.parse(o.items as string) : (o.items || []),
        })) as Order[])
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-beige/50 p-8 text-center">
        <Package className="h-12 w-12 text-warm-gray/40 mx-auto mb-4" />
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine mb-2">
          No orders yet
        </h2>
        <p className="text-sm text-warm-gray mb-6">
          When you place your first order, it will appear here.
        </p>
        <Button asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine">
        Order History
      </h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl border border-beige/50 p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <p className="font-medium text-chocolate">#{order.order_number}</p>
              <p className="text-xs text-warm-gray">
                {new Date(order.created_at).toLocaleDateString('en-NG', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[order.order_status] || 'bg-gray-50 text-gray-700'}`}>
                {order.order_status}
              </span>
              <span className="text-sm font-semibold text-wine">
                {'\u20A6'}{(order.total / 100).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-warm-gray">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              {order.items.length > 0 && ` — ${order.items.map(i => i.name).join(', ')}`}
            </p>
            <Link
              href={`/track?order=${order.order_number}`}
              className="text-xs text-gold hover:text-gold/80 font-medium transition-colors inline-flex items-center gap-1"
            >
              <Eye className="h-3.5 w-3.5" />
              Track
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
