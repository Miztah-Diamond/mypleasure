'use client'

import { useState } from 'react'
import { Search, Package, CheckCircle, Truck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const steps = [
  { id: 'pending', label: 'Order Placed', icon: Package },
  { id: 'accepted', label: 'Processing', icon: CheckCircle },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: MapPin },
]

interface TrackingOrder {
  order_number: string
  order_status: string
  tracking_number?: string
  delivery_partner?: string
}

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<TrackingOrder | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/orders?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
      )
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      } else {
        setError(
          'Order not found. Please check your order number and email.'
        )
      }
    } catch {
      setError('Unable to track order. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.id === status)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
      <div className="text-center mb-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mb-3">
          Track Your Order
        </h1>
        <p className="text-warm-gray">
          Enter your order number and email to check delivery status
        </p>
      </div>

      <form onSubmit={handleTrack} className="bg-white rounded-2xl border border-beige/50 p-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              placeholder="MP-20260326-XXXX"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <Search className="h-4 w-4" />{' '}
            {loading ? 'Tracking...' : 'Track Order'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="bg-error/10 text-error rounded-xl p-4 text-sm text-center">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-wine mb-6">
            Order #{order.order_number}
          </h2>
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, i) => {
              const currentIndex = getStepIndex(order.order_status)
              const isCompleted = i <= currentIndex
              const isCurrent = i === currentIndex
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center mb-2',
                      isCompleted ? 'bg-sage text-white' : 'bg-beige text-warm-gray'
                    )}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      'text-xs text-center',
                      isCurrent ? 'font-semibold text-chocolate' : 'text-warm-gray'
                    )}
                  >
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        'h-0.5 w-full mt-[-24px] mb-6',
                        isCompleted ? 'bg-sage' : 'bg-beige'
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
          {order.tracking_number && (
            <div className="bg-cream/50 rounded-xl p-4 text-sm">
              <p className="text-warm-gray">
                Tracking:{' '}
                <strong className="text-chocolate">{order.tracking_number}</strong>
              </p>
              {order.delivery_partner && (
                <p className="text-warm-gray mt-1">
                  Carrier: {order.delivery_partner}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
