"use client"

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const displayImages = images.length > 0 ? images : ['https://placehold.co/600x600/1E1218/C4956A?text=MP+Wellness']

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden bg-cream cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={displayImages[activeIndex]}
            alt={`${name} - Image ${activeIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-3">
            {displayImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200",
                  activeIndex === index ? "border-gold" : "border-beige hover:border-gold/50"
                )}
              >
                <Image src={img} alt={`${name} thumbnail ${index + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-wine/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 text-cream/80 hover:text-cream transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                className="absolute left-6 p-2 text-cream/80 hover:text-cream transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                className="absolute right-6 p-2 text-cream/80 hover:text-cream transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={displayImages[activeIndex]}
              alt={`${name} - Image ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  )
}
