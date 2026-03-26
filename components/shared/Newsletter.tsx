"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Send } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Welcome! Check your email for your 10% discount code.')
      setEmail('')
    }
  }

  return (
    <section className="bg-plum py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-semibold text-cream mb-3">
          Get 10% Off Your First Order
        </h2>
        <p className="text-cream/70 text-sm mb-8 max-w-md mx-auto">
          Join our community for exclusive deals, new arrivals, and wellness tips. Delivered discreetly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-cream/20 text-cream placeholder:text-cream/40 focus-visible:ring-gold/50"
            required
          />
          <Button type="submit" size="default" className="gap-2 flex-shrink-0">
            <Send className="h-4 w-4" />
            Subscribe
          </Button>
        </form>
        <p className="text-[11px] text-cream/40 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
