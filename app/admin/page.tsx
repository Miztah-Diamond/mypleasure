"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, DollarSign, Package, Clock, Plus, Eye, Settings as SettingsIcon } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getStatusColor } from '@/lib/utils'

const metrics = [
  { label: "Today's Orders", value: '12', change: '+3 from yesterday', icon: ShoppingCart, color: 'bg-gold/10 text-gold' },
  { label: "Today's Revenue", value: formatPrice(45600000), change: '+18% from yesterday', icon: DollarSign, color: 'bg-sage/10 text-sage' },
  { label: 'Total Products', value: '32', change: '4 low stock', icon: Package, color: 'bg-plum/10 text-plum' },
  { label: 'Pending Orders', value: '5', change: 'Needs attention', icon: Clock, color: 'bg-error/10 text-error' },
]

const revenueData = [
  { day: 'Mon', revenue: 125000 },
  { day: 'Tue', revenue: 89000 },
  { day: 'Wed', revenue: 156000 },
  { day: 'Thu', revenue: 203000 },
  { day: 'Fri', revenue: 178000 },
  { day: 'Sat', revenue: 245000 },
  { day: 'Sun', revenue: 198000 },
]

const recentOrders = [
  { id: '1', number: 'MP-20260326-A1B2', customer: 'Chioma A.', items: 3, total: 2350000, status: 'pending', date: '2 hours ago' },
  { id: '2', number: 'MP-20260326-C3D4', customer: 'David O.', items: 1, total: 700000, status: 'accepted', date: '4 hours ago' },
  { id: '3', number: 'MP-20260325-E5F6', customer: 'Blessing N.', items: 2, total: 1650000, status: 'shipped', date: 'Yesterday' },
  { id: '4', number: 'MP-20260325-G7H8', customer: 'Emeka I.', items: 4, total: 3200000, status: 'delivered', date: 'Yesterday' },
  { id: '5', number: 'MP-20260324-I9J0', customer: 'Fatima M.', items: 1, total: 450000, status: 'delivered', date: '2 days ago' },
]

export default function AdminDashboard() {
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
            <p className="text-2xl font-bold text-wine">{metric.value}</p>
            <p className="text-xs text-warm-gray mt-1">{metric.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-4">Revenue (Last 7 Days)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD6" />
                <XAxis dataKey="day" stroke="#8B7B74" fontSize={12} />
                <YAxis stroke="#8B7B74" fontSize={12} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #E8DDD6' }} />
                <Bar dataKey="revenue" fill="#C4956A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-beige">
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Order</th>
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Customer</th>
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Items</th>
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Total</th>
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-warm-gray font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                  <td className="py-3 px-2 font-medium text-chocolate">{order.number}</td>
                  <td className="py-3 px-2 text-chocolate">{order.customer}</td>
                  <td className="py-3 px-2 text-warm-gray">{order.items}</td>
                  <td className="py-3 px-2 font-medium text-gold">{formatPrice(order.total)}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-warm-gray">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
