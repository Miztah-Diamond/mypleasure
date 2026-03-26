"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'
import type { Product } from '@/types'

const PLACEHOLDER_IMG = 'https://placehold.co/100x100/1E1218/C4956A?text=MP'

const categoryLabels: Record<string, string> = {
  women: 'For Her',
  men: 'For Him',
  couples: 'Couples',
  accessories: 'Accessories',
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('category', filter)
      if (search) params.set('search', search)

      const res = await fetch(`/api/products?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch {
      // Silently fail — products will show empty state
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, 300)
    return () => clearTimeout(timer)
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
        toast.success('Product deleted')
      } else {
        toast.error('Failed to delete product')
      }
    } catch {
      toast.error('Failed to delete product')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Products</h1>
          <p className="text-sm text-warm-gray mt-1">{products.length} products in catalog</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-4">No products found</p>
            <Button asChild size="sm">
              <Link href="/admin/products/new"><Plus className="mr-2 h-3 w-3" /> Add your first product</Link>
            </Button>
          </div>
        ) : (
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
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-beige/50 hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                          <Image src={product.images?.[0] || PLACEHOLDER_IMG} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="font-medium text-chocolate">{product.name}</p>
                          {product.badge && <Badge variant={product.badge as 'bestseller' | 'new' | 'sale'} className="text-[10px] mt-0.5">{product.badge}</Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-warm-gray">{categoryLabels[product.category] || product.category}</td>
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
                        <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 rounded-lg text-warm-gray hover:text-error hover:bg-error/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
