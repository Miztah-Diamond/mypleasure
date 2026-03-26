"use client"

import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-wine text-cream py-2 px-4 text-center relative">
      <p className="text-xs tracking-wide font-light">
        🚚 Free discreet delivery on orders over ₦15,000 | 📦 100% unmarked packaging
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
