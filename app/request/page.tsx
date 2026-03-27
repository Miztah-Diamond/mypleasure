"use client"

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Send, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function RequestForm() {
  const searchParams = useSearchParams()
  const prefillProduct = searchParams.get('product') || ''
  const prefillSlug = searchParams.get('slug') || ''
  const prefillCategory = searchParams.get('category') || ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product_name: prefillProduct,
    category: prefillCategory,
    description: prefillSlug ? `Restock request for "${prefillProduct}"` : '',
    product_slug: prefillSlug,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.product_name && !form.description) {
      setError('Please tell us what product you are looking for')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine mb-3">
            Request Submitted!
          </h1>
          <p className="text-warm-gray mb-8">
            We&apos;ve received your product request. If you provided contact info, we&apos;ll reach out once we have an update.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href="/shop">Browse Shop</Link>
            </Button>
            <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', product_name: '', category: '', description: '', product_slug: '' }) }}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-wine">
            Request a Product
          </h1>
        </div>
        <p className="text-warm-gray leading-relaxed">
          Can&apos;t find what you&apos;re looking for? Let us know and we&apos;ll try to source it for you. All fields are optional — share as much or as little as you&apos;d like.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-chocolate">What are you looking for?</h2>

          <div>
            <label className="block text-sm font-medium text-chocolate mb-1.5">Product Name</label>
            <Input
              placeholder="e.g. Wireless Vibrating Ring"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-chocolate mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-beige bg-white px-4 py-2.5 text-sm text-chocolate focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
            >
              <option value="">Select a category (optional)</option>
              <option value="women">For Her</option>
              <option value="men">For Him</option>
              <option value="couples">Couples</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-chocolate mb-1.5">Description</label>
            <textarea
              placeholder="Describe the product you're looking for — any details like brand, color, features, or where you saw it..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm text-chocolate placeholder:text-warm-gray/50 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-chocolate">Your Contact Info</h2>
            <p className="text-xs text-warm-gray mt-1">Optional — so we can notify you when we find the product</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Name</label>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Phone</label>
              <Input
                type="tel"
                placeholder="080XXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-error bg-error/5 px-4 py-3 rounded-xl">{error}</p>
        )}

        {/* Submit */}
        <Button type="submit" size="xl" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <>Submitting...</>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Submit Request
            </>
          )}
        </Button>

        <p className="text-xs text-center text-warm-gray">
          Your request is private and will only be seen by our team.
        </p>
      </form>
    </div>
  )
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><p className="text-warm-gray">Loading...</p></div>}>
      <RequestForm />
    </Suspense>
  )
}
