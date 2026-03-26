"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const PLACEHOLDER_IMG = 'https://placehold.co/80x80/1E1218/C4956A?text=MP'

interface SearchResult {
  id: string
  name: string
  slug: string
  category: string
  price: number
  compare_price: number | null
  images: string[]
  badge: string | null
  rating: number
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) setResults(await res.json())
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleResultClick = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-wine/60 backdrop-blur-sm" onClick={onClose} />

      {/* Search panel */}
      <div className="relative bg-white w-full max-w-2xl mx-auto mt-16 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-beige">
          <Search className="h-5 w-5 text-warm-gray flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-lg text-chocolate placeholder:text-warm-gray/50 bg-transparent outline-none"
          />
          {loading && <Loader2 className="h-5 w-5 text-gold animate-spin" />}
          <button onClick={onClose} className="p-1.5 hover:bg-cream rounded-lg transition-colors">
            <X className="h-5 w-5 text-warm-gray" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && !loading && results.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-warm-gray">No products found for &ldquo;{query}&rdquo;</p>
              <Link href="/shop" onClick={handleResultClick} className="text-gold text-sm mt-2 inline-block hover:underline">
                Browse all products
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-cream transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                    <Image src={product.images?.[0] || PLACEHOLDER_IMG} alt={product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-chocolate truncate">{product.name}</p>
                    <p className="text-xs text-warm-gray capitalize">{product.category === 'women' ? 'For Her' : product.category === 'men' ? 'For Him' : product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-medium text-gold">{formatPrice(product.price)}</p>
                    {product.compare_price && (
                      <p className="text-xs text-warm-gray line-through">{formatPrice(product.compare_price)}</p>
                    )}
                  </div>
                </Link>
              ))}
              <div className="px-6 py-3 border-t border-beige">
                <Link href={`/shop?q=${encodeURIComponent(query)}`} onClick={handleResultClick} className="text-sm text-gold hover:underline">
                  View all results for &ldquo;{query}&rdquo;
                </Link>
              </div>
            </div>
          )}

          {query.length < 2 && (
            <div className="px-6 py-8 text-center">
              <p className="text-warm-gray text-sm">Type at least 2 characters to search</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Rose Vibrator', 'Couples', 'Lubricant', 'For Him'].map(term => (
                  <button key={term} onClick={() => setQuery(term)} className="px-3 py-1.5 bg-cream rounded-full text-xs text-chocolate hover:bg-gold/10 hover:text-gold transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
