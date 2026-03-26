"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Download, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice, getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Order } from '@/types'

const statusTabs = ['all', 'pending', 'accepted', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams()
      if (activeTab !== 'all') params.set('status', activeTab)
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/orders?${params}`)
      if (res.ok) setOrders(await res.json())
    } catch {
      // silent fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchOrders()
  }, [activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timer = setTimeout(() => fetchOrders(), 300)
    return () => clearTimeout(timer)
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleExport = () => {
    if (orders.length === 0) return
    const headers = ['Order #', 'Date', 'Customer', 'Email', 'Phone', 'Total', 'Status', 'Payment']
    const rows = orders.map(o => [
      o.order_number,
      new Date(o.created_at).toLocaleDateString(),
      o.customer_name,
      o.customer_email,
      o.customer_phone,
      (o.total / 100).toFixed(2),
      o.order_status,
      o.payment_status,
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Orders</h1>
          <p className="text-sm text-warm-gray mt-1">{orders.length} total orders</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport} disabled={orders.length === 0}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all capitalize",
            activeTab === tab ? 'bg-gold text-white' : 'bg-white text-chocolate border border-beige hover:border-gold'
          )}>
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
        <Input placeholder="Search by order number or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 max-w-sm" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-beige/50 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-warm-gray text-sm">
            {search ? 'No orders match your search.' : 'No orders yet. They\'ll appear here when customers place orders.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream/50 border-b border-beige">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Order</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Total</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Payment</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-chocolate">{order.order_number}</td>
                    <td className="py-3 px-4 text-warm-gray">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <p className="text-chocolate">{order.customer_name}</p>
                      <p className="text-xs text-warm-gray">{order.customer_phone}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-gold">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/orders/${order.id}`} className="p-1.5 rounded-lg text-warm-gray hover:text-gold hover:bg-gold/10 transition-colors inline-flex">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
