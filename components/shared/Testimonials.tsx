"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "I was nervous about ordering online, but the packaging was completely plain — no one could tell what was inside. The product quality exceeded my expectations!",
    author: "Verified Customer",
    location: "Lagos",
    rating: 5,
  },
  {
    text: "Fast delivery and amazing quality. I've been recommending to all my friends. The discreet billing on my statement was a thoughtful touch.",
    author: "Verified Customer",
    location: "Abuja",
    rating: 5,
  },
  {
    text: "Best wellness products I've tried. The customer service on WhatsApp was incredibly helpful and discreet. Will definitely order again!",
    author: "Verified Customer",
    location: "Port Harcourt",
    rating: 5,
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[11px] uppercase tracking-[3px] text-gold font-semibold mb-3">Testimonials</h2>
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-wine mb-12">
          What Our Customers Say
        </h3>

        <div className="relative min-h-[200px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-500",
                active === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              )}
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                ))}
              </div>
              <blockquote className="text-lg lg:text-xl text-chocolate leading-relaxed italic mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <p className="text-sm text-warm-gray">
                — {testimonial.author}, {testimonial.location}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                active === index ? "bg-gold w-6" : "bg-beige"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
