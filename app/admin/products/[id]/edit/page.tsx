"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, X, Plus, Save, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader } from '@/components/admin/ImageUploader'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [price, setPrice] = useState('')
  const [comparePrice, setComparePrice] = useState('')
  const [description, setDescription] = useState('')
  const [material, setMaterial] = useState('')
  const [badge, setBadge] = useState('')
  const [stock, setStock] = useState('0')
  const [status, setStatus] = useState('active')
  const [featured, setFeatured] = useState(false)
  const [rating, setRating] = useState('4.5')
  const [reviewCount, setReviewCount] = useState('0')
  const [features, setFeatures] = useState([''])
  const [dimensions, setDimensions] = useState('')
  const [howToUse, setHowToUse] = useState('')
  const [howToClean, setHowToClean] = useState('')
  const [whatsInBox, setWhatsInBox] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`)
        if (!res.ok) throw new Error('Product not found')
        const product = await res.json()

        setName(product.name || '')
        setSlug(product.slug || '')
        setCategory(product.category || '')
        setSubcategory(product.subcategory || '')
        setPrice(product.price ? String(product.price / 100) : '')
        setComparePrice(product.compare_price ? String(product.compare_price / 100) : '')
        setDescription(product.description || '')
        setMaterial(product.material || '')
        setBadge(product.badge || '')
        setStock(String(product.stock || 0))
        setStatus(product.status || 'active')
        setFeatured(product.featured || false)
        setRating(String(product.rating || 0))
        setReviewCount(String(product.review_count || 0))
        setFeatures(product.features?.length ? product.features : [''])
        setImages(product.images || [])

        const details = product.details || {}
        setDimensions(details.dimensions || '')
        setHowToUse(details.howToUse || '')
        setHowToClean(details.howToClean || '')
        setWhatsInBox(details.whatsInBox || '')
      } catch {
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [productId])

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const updateFeature = (index: number, value: string) => {
    const updated = [...features]
    updated[index] = value
    setFeatures(updated)
  }

  const handleSave = async () => {
    if (!name.trim()) { toast.error('Product name is required'); return }
    if (!category) { toast.error('Category is required'); return }
    if (!price || Number(price) <= 0) { toast.error('Valid price is required'); return }

    setSaving(true)
    try {
      const body = {
        name: name.trim(),
        slug,
        category,
        subcategory: subcategory || null,
        price: Math.round(Number(price) * 100),
        compare_price: comparePrice ? Math.round(Number(comparePrice) * 100) : null,
        description: description || null,
        features: features.filter(f => f.trim()),
        material: material || null,
        details: {
          dimensions: dimensions || undefined,
          howToUse: howToUse || undefined,
          howToClean: howToClean || undefined,
          whatsInBox: whatsInBox || undefined,
        },
        images,
        badge: badge || null,
        stock: Number(stock) || 0,
        status,
        featured,
        rating: Number(rating) || 0,
        review_count: Number(reviewCount) || 0,
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update product')
      }

      toast.success('Product updated successfully!')
      router.push('/admin/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Product deleted')
      router.push('/admin/products')
    } catch {
      toast.error('Failed to delete product')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-cream transition-colors">
          <ArrowLeft className="h-5 w-5 text-warm-gray" />
        </Link>
        <div className="flex-1">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Edit Product</h1>
          <p className="text-sm text-warm-gray mt-0.5">Update product details</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDelete} disabled={deleting} className="text-error border-error/20 hover:bg-error/10 gap-2">
          <Trash2 className="h-4 w-4" /> {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5">
                    <option value="">Select category</option>
                    <option value="women">For Her</option>
                    <option value="men">For Him</option>
                    <option value="couples">Couples</option>
                    <option value="accessories">Accessories</option>
                  </Select>
                </div>
                <div>
                  <Label>Subcategory</Label>
                  <Input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" rows={4} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Images</h2>
            <ImageUploader images={images} onChange={setImages} maxImages={5} maxSizeMB={5} />
            <p className="text-xs text-warm-gray mt-3">First image is the primary display image. Drag to reorder.</p>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₦) *</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" />
                <p className="text-[11px] text-warm-gray mt-1">Enter in Naira (auto-converts to kobo)</p>
              </div>
              <div>
                <Label>Compare-at Price (₦)</Label>
                <Input type="number" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} className="mt-1.5" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Key Features</h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={feature} onChange={(e) => updateFeature(index, e.target.value)} placeholder={`Feature ${index + 1}`} />
                  {features.length > 1 && (
                    <button onClick={() => removeFeature(index)} className="p-2 text-warm-gray hover:text-error transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addFeature} type="button">
                <Plus className="mr-2 h-3 w-3" /> Add Feature
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <Label>Material</Label>
                <Input value={material} onChange={(e) => setMaterial(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Dimensions</Label>
                <Input value={dimensions} onChange={(e) => setDimensions(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>How to Use</Label>
                <Textarea value={howToUse} onChange={(e) => setHowToUse(e.target.value)} className="mt-1.5" rows={2} />
              </div>
              <div>
                <Label>How to Clean</Label>
                <Textarea value={howToClean} onChange={(e) => setHowToClean(e.target.value)} className="mt-1.5" rows={2} />
              </div>
              <div>
                <Label>What&apos;s in the Box</Label>
                <Textarea value={whatsInBox} onChange={(e) => setWhatsInBox(e.target.value)} className="mt-1.5" rows={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-beige/50 p-6 sticky top-24">
            <h2 className="font-medium text-wine mb-4">Status & Visibility</h2>
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1.5">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </Select>
              </div>
              <div>
                <Label>Badge</Label>
                <Select value={badge} onChange={(e) => setBadge(e.target.value)} className="mt-1.5">
                  <option value="">None</option>
                  <option value="bestseller">Bestseller</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                </Select>
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1.5" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-[#C4956A] w-4 h-4" />
                <Label htmlFor="featured">Featured on Homepage</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rating</Label>
                  <Input type="number" step="0.1" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Reviews</Label>
                  <Input type="number" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} className="mt-1.5" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-beige space-y-3">
              <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
                <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Update Product'}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/products">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
