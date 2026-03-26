"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, DollarSign, Package, Clock, Plus, Eye, Settings as SettingsIcon, Loader2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { formatPrice, getStatusColor } from '@/lib/utils'

interface Metrics {
  todayOrders: number
  todayRevenue: number
  totalProducts: number
  pendingOrders: number
  lowStockCount: number
  recentOrders: Array<{
    id: string
    order_number: string
    customer_name: string
    total: number
    order_status: string
    created_at: string
  }>
  weeklyRevenue: Array<{ day: string; revenue: number }>
}

export default function AdminDashboard() {
  const [data, setData] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/admin/metrics')
        if (res.ok) {
          setData(await res.json())
        }
      } catch {
        // Will show zeros
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  const metrics = [
    { label: "Today's Orders", value: data?.todayOrders ?? 0, change: '', icon: ShoppingCart, color: 'bg-gold/10 text-gold', format: 'number' },
    { label: "Today's Revenue", value: data?.todayRevenue ?? 0, change: '', icon: DollarSign, color: 'bg-sage/10 text-sage', format: 'price' },
    { label: 'Total Products', value: data?.totalProducts ?? 0, change: data?.lowStockCount ? `${data.lowStockCount} low stock` : '', icon: Package, color: 'bg-plum/10 text-plum', format: 'number' },
    { label: 'Pending Orders', value: data?.pendingOrders ?? 0, change: data?.pendingOrders ? 'Needs attention' : 'All clear', icon: Clock, color: 'bg-error/10 text-error', format: 'number' },
  ]

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return days === 1 ? 'Yesterday' : `${days}d ago`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-semibold text-wine">Dashboard</h1>
          <p className="text-warm-gray text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline" asChild>
            <Link href="/admin/orders"><Eye className="mr-2 h-4 w-4" /> View Orders</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl border border-beige/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-warm-gray">{metric.label}</span>
              <div className={`p-2 rounded-xl ${metric.color}`}>
                <metric.icon className="h-4 w-4" />
              </div>
            </div>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-warm-gray" />
            ) : (
              <>
                <p className="text-2xl font-bold text-wine">
                  {metric.format === 'price' ? formatPrice(metric.value) : metric.value}
                </p>
                {metric.change && <p className="text-xs text-warm-gray mt-1">{metric.change}</p>}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-4">Revenue (Last 7 Days)</h2>
          <div className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (data?.weeklyRevenue?.length ?? 0) > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data!.weeklyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD6" />
                  <XAxis dataKey="day" stroke="#8B7B74" fontSize={12} />
                  <YAxis stroke="#8B7B74" fontSize={12} tickFormatter={(v) => `₦${(v/100000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [formatPrice(Number(value)), 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #E8DDD6' }} />
                  <Bar dataKey="revenue" fill="#C4956A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-warm-gray text-sm">
                No revenue data yet. Orders will appear here.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
              <div className="p-2 rounded-lg bg-gold/10 text-gold"><Plus className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-chocolate">Add New Product</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
              <div className="p-2 rounded-lg bg-sage/10 text-sage"><ShoppingCart className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-chocolate">View All Orders</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
              <div className="p-2 rounded-lg bg-plum/10 text-plum"><SettingsIcon className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-chocolate">Store Settings</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
              <div className="p-2 rounded-lg bg-beige text-warm-gray"><Eye className="h-4 w-4" /></div>
              <span className="text-sm font-medium text-chocolate">View Store</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-beige/50 p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-gold hover:text-gold/80 transition-colors">View all →</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gold" />
          </div>
        ) : (data?.recentOrders?.length ?? 0) > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige">
                  <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Order</th>
                  <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Customer</th>
                  <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Total</th>
                  <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                  <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {data!.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-2">
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-chocolate hover:text-gold transition-colors">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-chocolate">{order.customer_name}</td>
                    <td className="py-3 px-2 font-medium text-gold">{formatPrice(order.total)}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-warm-gray">{timeAgo(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-warm-gray py-8 text-sm">No orders yet. They&apos;ll appear here once customers start ordering.</p>
        )}
      </div>
    </div>
  )
}
