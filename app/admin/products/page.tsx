"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getStatusColor } from '@/lib/utils'

const mockProducts = [
  { id: '1', name: 'Rose Suction Vibrator', slug: 'rose-suction-vibrator', category: 'women', price: 700000, stock: 30, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=W01'] },
  { id: '2', name: 'Rose 2-in-1 Tongue Licker', slug: 'rose-2-in-1', category: 'women', price: 1200000, stock: 15, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=W02'] },
  { id: '3', name: 'Bullet Vibrator Mini', slug: 'bullet-vibrator', category: 'women', price: 450000, stock: 40, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=W06'] },
  { id: '4', name: 'Rabbit Vibrator', slug: 'rabbit-vibrator', category: 'women', price: 1500000, stock: 8, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=W07'] },
  { id: '5', name: 'Manual Masturbation Cup', slug: 'manual-cup', category: 'men', price: 700000, stock: 25, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=M01'] },
  { id: '6', name: 'Vibrating Cock Ring', slug: 'cock-ring', category: 'men', price: 450000, stock: 30, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=M04'] },
  { id: '7', name: 'Couples Starter Bundle', slug: 'couples-bundle', category: 'couples', price: 2500000, stock: 10, status: 'active', badge: 'bestseller', images: ['https://placehold.co/100x100/1E1218/C4956A?text=C01'] },
  { id: '8', name: 'Water-Based Lubricant', slug: 'lubricant', category: 'accessories', price: 350000, stock: 40, status: 'active', badge: null, images: ['https://placehold.co/100x100/1E1218/C4956A?text=A01'] },
]

const categoryLabels: Record<string, string> = { women: 'For Her', men: 'For Him', couples: 'Couples', accessories: 'Accessories' }

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || p.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Products</h1>
          <p className="text-sm text-warm-gray mt-1">{mockProducts.length} products in catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'women', 'men', 'couples', 'accessories'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === cat ? 'bg-gold text-white' : 'bg-white text-chocolate border border-beige hover:border-gold'}`}>
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-beige/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream/50 border-b border-beige">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Product</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Category</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Price</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Stock</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-chocolate">{product.name}</p>
                        {product.badge && <Badge variant={product.badge as any} className="text-[10px] mt-0.5">{product.badge}</Badge>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-warm-gray">{categoryLabels[product.category]}</td>
                  <td className="py-3 px-4 font-medium text-gold">{formatPrice(product.price)}</td>
                  <td className="py-3 px-4">
                    <span className={product.stock <= 10 ? 'text-error font-medium' : 'text-chocolate'}>{product.stock}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-sage/10 text-sage' : 'bg-warm-gray/10 text-warm-gray'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="p-1.5 rounded-lg text-warm-gray hover:text-gold hover:bg-gold/10 transition-colors">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="p-1.5 rounded-lg text-warm-gray hover:text-error hover:bg-error/10 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
