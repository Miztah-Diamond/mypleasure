"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function EditProductPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-cream transition-colors">
          <ArrowLeft className="h-5 w-5 text-warm-gray" />
        </Link>
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Edit Product</h1>
          <p className="text-sm text-warm-gray mt-0.5">Update product details</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-beige/50 p-8 text-center">
        <p className="text-warm-gray mb-4">Product editing uses the same form as Add Product.</p>
        <p className="text-sm text-warm-gray">Connect Supabase to load product data for editing. The form will pre-populate with existing values.</p>
      </div>
    </div>
  )
}
