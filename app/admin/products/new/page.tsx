"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Plus, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewProductPage() {
  const router = useRouter()
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
  const [saving, setSaving] = useState(false)

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(generateSlug(value))
  }

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const updateFeature = (index: number, value: string) => {
    const updated = [...features]
    updated[index] = value
    setFeatures(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    // In production, save to Supabase
    setTimeout(() => {
      toast.success('Product saved successfully!')
      setSaving(false)
      router.push('/admin/products')
    }, 1000)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-cream transition-colors">
          <ArrowLeft className="h-5 w-5 text-warm-gray" />
        </Link>
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Add Product</h1>
          <p className="text-sm text-warm-gray mt-0.5">Create a new product listing</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input value={name} onChange={(e) => handleNameChange(e.target.value)} className="mt-1.5" placeholder="Rose Suction Vibrator" />
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
                  <Input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="mt-1.5" placeholder="Rose Toys" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" placeholder="Premium wellness product..." rows={4} />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₦) *</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" placeholder="7000" />
                <p className="text-[11px] text-warm-gray mt-1">Enter in Naira, stored as kobo</p>
              </div>
              <div>
                <Label>Compare-at Price (₦)</Label>
                <Input type="number" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} className="mt-1.5" placeholder="12000" />
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
                <Input value={material} onChange={(e) => setMaterial(e.target.value)} className="mt-1.5" placeholder="Medical-grade Silicone" />
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

          {/* Images */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Images</h2>
            <div className="border-2 border-dashed border-beige rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-warm-gray mx-auto mb-3" />
              <p className="text-sm text-chocolate font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-warm-gray mt-1">PNG, JPG up to 5MB • Max 5 images</p>
              <p className="text-xs text-warm-gray mt-3 bg-cream rounded-lg p-2">
                Image upload requires Supabase Storage connection. Configure your .env.local file.
              </p>
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
                <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Product'}
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
