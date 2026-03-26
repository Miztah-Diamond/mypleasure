"use client"

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, GripVertical, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  maxSizeMB?: number
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 5,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Upload failed')
    }

    const data = await res.json()
    return data.url
  }

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError(null)
    const fileArray = Array.from(files)

    // Check count limit
    const remaining = maxImages - images.length
    if (remaining <= 0) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    const toUpload = fileArray.slice(0, remaining)

    // Validate types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
    const invalidFiles = toUpload.filter(f => !allowedTypes.includes(f.type))
    if (invalidFiles.length > 0) {
      setError('Only JPEG, PNG, WebP, and AVIF images are allowed')
      return
    }

    // Validate sizes
    const oversized = toUpload.filter(f => f.size > maxSizeMB * 1024 * 1024)
    if (oversized.length > 0) {
      setError(`Each image must be under ${maxSizeMB}MB`)
      return
    }

    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of toUpload) {
        const url = await uploadFile(file)
        if (url) urls.push(url)
      }
      onChange([...images, ...urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [images, maxImages, maxSizeMB, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOver(false)
  }, [])

  const removeImage = async (index: number) => {
    const url = images[index]
    // Try to delete from Vercel Blob (best-effort)
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
    } catch {
      // Ignore delete errors
    }
    onChange(images.filter((_, i) => i !== index))
  }

  // Drag-to-reorder handlers
  const handleReorderDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleReorderDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    const reordered = [...images]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(index, 0, moved)
    onChange(reordered)
    setDragIndex(index)
  }

  const handleReorderDragEnd = () => {
    setDragIndex(null)
  }

  return (
    <div className="space-y-4">
      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((url, index) => (
            <div
              key={url}
              draggable
              onDragStart={() => handleReorderDragStart(index)}
              onDragOver={(e) => handleReorderDragOver(e, index)}
              onDragEnd={handleReorderDragEnd}
              className={cn(
                "relative group aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing",
                index === 0 ? "border-gold" : "border-beige/50",
                dragIndex === index && "opacity-50 scale-95"
              )}
            >
              <Image
                src={url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
              {/* Primary badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
              {/* Drag handle + remove */}
              <div className="absolute inset-0 bg-wine/0 group-hover:bg-wine/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <div className="p-1.5 bg-white/90 rounded-lg text-chocolate">
                  <GripVertical className="h-4 w-4" />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1.5 bg-white/90 rounded-lg text-error hover:bg-error hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {images.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
            dragOver ? "border-gold bg-gold/5" : "border-beige hover:border-gold/50",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 text-gold mx-auto mb-3 animate-spin" />
              <p className="text-sm text-chocolate font-medium">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-warm-gray mx-auto mb-3" />
              <p className="text-sm text-chocolate font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-warm-gray mt-1">
                PNG, JPG, WebP up to {maxSizeMB}MB &bull; {images.length}/{maxImages} images
              </p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-error text-sm bg-error/10 rounded-lg px-3 py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
