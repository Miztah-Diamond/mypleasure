"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Search, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice, getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

const statusTabs = ['all', 'pending', 'accepted', 'shipped', 'delivered', 'cancelled']

const mockOrders = [
  { id: '1', order_number: 'MP-20260326-A1B2', created_at: '2026-03-26T10:30:00', customer_name: 'Chioma Adebayo', customer_phone: '08012345678', customer_email: 'chioma@email.com', items: [{ name: 'Rose Vibrator', quantity: 1 }, { name: 'Lubricant', quantity: 2 }], total: 1400000, order_status: 'pending', payment_status: 'paid' },
  { id: '2', order_number: 'MP-20260326-C3D4', created_at: '2026-03-26T08:15:00', customer_name: 'David Okonkwo', customer_phone: '08098765432', customer_email: 'david@email.com', items: [{ name: 'Bullet Vibrator', quantity: 1 }], total: 450000, order_status: 'accepted', payment_status: 'paid' },
  { id: '3', order_number: 'MP-20260325-E5F6', created_at: '2026-03-25T14:00:00', customer_name: 'Blessing Nwosu', customer_phone: '08055551234', customer_email: 'blessing@email.com', items: [{ name: 'Couples Bundle', quantity: 1 }], total: 2500000, order_status: 'shipped', payment_status: 'paid' },
  { id: '4', order_number: 'MP-20260325-G7H8', created_at: '2026-03-25T09:45:00', customer_name: 'Emeka Ibe', customer_phone: '08033334444', customer_email: 'emeka@email.com', items: [{ name: 'Masturbation Cup', quantity: 2 }, { name: 'Cock Ring', quantity: 1 }], total: 1850000, order_status: 'delivered', payment_status: 'paid' },
  { id: '5', order_number: 'MP-20260324-I9J0', created_at: '2026-03-24T16:20:00', customer_name: 'Fatima Mohammed', customer_phone: '08077778888', customer_email: 'fatima@email.com', items: [{ name: 'Rabbit Vibrator', quantity: 1 }], total: 1500000, order_status: 'delivered', payment_status: 'paid' },
]

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = mockOrders.filter(order => {
    const matchesTab = activeTab === 'all' || order.order_status === activeTab
    const matchesSearch = order.order_number.toLowerCase().includes(search.toLowerCase()) || order.customer_name.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Orders</h1>
          <p className="text-sm text-warm-gray mt-1">{mockOrders.length} total orders</p>
        </div>
        <Button variant="outline" size="sm">
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
        <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 max-w-sm" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-beige/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream/50 border-b border-beige">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Order</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Customer</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Items</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Total</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Payment</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-chocolate">{order.order_number}</td>
                  <td className="py-3 px-4 text-warm-gray">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <p className="text-chocolate">{order.customer_name}</p>
                    <p className="text-xs text-warm-gray">{order.customer_phone}</p>
                  </td>
                  <td className="py-3 px-4 text-warm-gray">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
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
      </div>
    </div>
  )
}
