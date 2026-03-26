"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function AgeVerification() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('mp-age-verified')
    if (!verified) {
      setShowModal(true)
    }
  }, [])

  const handleVerify = () => {
    localStorage.setItem('mp-age-verified', 'true')
    setShowModal(false)
  }

  const handleLeave = () => {
    window.location.href = 'https://google.com'
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-wine/90 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl animate-fade-in-up">
        <div className="mb-6">
          <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-wine">MP</span>
          <p className="text-[11px] uppercase tracking-[3px] text-warm-gray mt-1">Wellness</p>
        </div>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine mb-3">
          Age Verification
        </h2>
        <p className="text-warm-gray text-sm mb-8 leading-relaxed">
          This website contains products intended for adults. You must be 18 years or older to enter.
        </p>
        <div className="flex flex-col gap-3">
          <Button size="xl" onClick={handleVerify} className="w-full">
            Yes, I&apos;m 18 or Older
          </Button>
          <Button variant="outline" size="lg" onClick={handleLeave} className="w-full">
            No, I&apos;ll Leave
          </Button>
        </div>
        <p className="text-[11px] text-warm-gray mt-6">
          By entering, you confirm you are of legal age in your jurisdiction.
        </p>
      </div>
    </div>
  )
}
