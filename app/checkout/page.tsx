'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Package,
  Lock,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCartStore } from '@/store/cart'
import { formatPrice, cn } from '@/lib/utils'
import {
  NIGERIAN_STATES,
  DELIVERY_METHODS,
  FREE_DELIVERY_THRESHOLD,
} from '@/lib/constants'

const PLACEHOLDER_IMG = 'https://placehold.co/80x80/1E1218/C4956A?text=MP'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z
    .string()
    .min(10, 'Valid Nigerian phone number required')
    .regex(/^(\+234|0)[0-9]{10}$/, 'Enter a valid Nigerian phone number'),
  email: z.string().email('Valid email required'),
  street: z.string().min(5, 'Street address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
  deliveryMethod: z.string().min(1, 'Select a delivery method'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const paystackEnabled = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<CheckoutForm | null>(null)
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryMethod: 'standard' },
  })

  const deliveryMethod = watch('deliveryMethod')
  const selectedDelivery = DELIVERY_METHODS.find((m) => m.id === deliveryMethod)
  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : (selectedDelivery?.fee || 200000)
  const total = subtotal + deliveryFee

  const onSubmitDelivery = (data: CheckoutForm) => {
    setFormData(data)
    setStep(2)
  }

  const createOrder = useCallback(async (paymentReference: string) => {
    if (!formData) return null
    try {
      const orderItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0] || '',
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode || '',
            notes: formData.notes || '',
          },
          delivery_method: formData.deliveryMethod,
          delivery_fee: deliveryFee,
          items: orderItems,
          subtotal,
          total,
          payment_reference: paymentReference,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create order')
      }

      const data = await res.json()
      return data.order_number
    } catch (error) {
      console.error('Order creation error:', error)
      throw error
    }
  }, [formData, items, deliveryFee, subtotal, total])

  const handlePayment = async () => {
    if (!formData) return
    setIsProcessing(true)

    if (paystackEnabled) {
      // Use Paystack inline checkout
      try {
        const PaystackPop = (await import('@paystack/inline-js')).default
        const paystack = new PaystackPop()

        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
          email: formData.email,
          amount: total, // Paystack expects kobo
          currency: 'NGN',
          channels: ['card', 'bank', 'ussd', 'bank_transfer'],
          metadata: {
            custom_fields: [
              { display_name: 'Customer Name', variable_name: 'customer_name', value: formData.name },
              { display_name: 'Phone', variable_name: 'phone', value: formData.phone },
            ],
          },
          onSuccess: async (transaction: { reference: string }) => {
            try {
              const orderNum = await createOrder(transaction.reference)
              setOrderNumber(orderNum || '')
              setStep(3)
              clearCart()
              toast.success('Payment successful!')
            } catch {
              toast.error('Payment received but order creation failed. Please contact support.')
            }
            setIsProcessing(false)
          },
          onCancel: () => {
            toast.error('Payment cancelled')
            setIsProcessing(false)
          },
        })
      } catch (error) {
        console.error('Paystack error:', error)
        toast.error('Payment system unavailable. Please try again.')
        setIsProcessing(false)
      }
    } else {
      // Fallback: create order without real payment (dev mode)
      try {
        const mockRef = `DEV_${Date.now()}`
        const orderNum = await createOrder(mockRef)
        setOrderNumber(orderNum || '')
        setStep(3)
        clearCart()
        toast.success('Order placed! (Payment in test mode)')
      } catch {
        toast.error('Failed to create order. Please try again.')
      }
      setIsProcessing(false)
    }
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 text-beige mx-auto mb-4" />
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-3">
          No items to checkout
        </h1>
        <Button asChild>
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {['Delivery', 'Payment', 'Confirmation'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1
                  ? 'bg-sage text-white'
                  : step === i + 1
                    ? 'bg-gold text-white'
                    : 'bg-beige text-warm-gray'
              }`}
            >
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span
              className={`text-sm hidden sm:block ${
                step === i + 1
                  ? 'text-chocolate font-medium'
                  : 'text-warm-gray'
              }`}
            >
              {label}
            </span>
            {i < 2 && <div className="w-8 sm:w-16 h-px bg-beige" />}
          </div>
        ))}
      </div>

      {/* Step 1: Delivery Info */}
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitDelivery)}>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">
            Delivery Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" {...register('name')} className="mt-1.5" placeholder="John Doe" />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" {...register('phone')} className="mt-1.5" placeholder="08012345678" />
              {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" {...register('email')} className="mt-1.5" placeholder="you@example.com" />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input id="street" {...register('street')} className="mt-1.5" placeholder="123 Victoria Island" />
              {errors.street && <p className="text-error text-xs mt-1">{errors.street.message}</p>}
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" {...register('city')} className="mt-1.5" placeholder="Lagos" />
              {errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select id="state" {...register('state')} className="mt-1.5">
                <option value="">Select State</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Select>
              {errors.state && <p className="text-error text-xs mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code (Optional)</Label>
              <Input id="postalCode" {...register('postalCode')} className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Delivery Notes (Optional)</Label>
              <Textarea id="notes" {...register('notes')} className="mt-1.5" placeholder="Leave at gate, call before delivery..." />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="mt-8">
            <h3 className="font-medium text-chocolate mb-3">Delivery Method *</h3>
            <div className="space-y-3">
              {DELIVERY_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === method.id
                      ? 'border-gold bg-gold/5'
                      : 'border-beige hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" value={method.id} {...register('deliveryMethod')} className="accent-[#C4956A]" />
                    <div>
                      <p className="text-sm font-medium text-chocolate">{method.label}</p>
                      <p className="text-xs text-warm-gray">{method.eta}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gold">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? 'FREE' : formatPrice(method.fee)}
                  </span>
                </label>
              ))}
            </div>
            {subtotal >= FREE_DELIVERY_THRESHOLD && (
              <p className="text-sage text-sm mt-2">✓ Free delivery applied — order over ₦15,000</p>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="ghost" asChild>
              <Link href="/cart"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart</Link>
            </Button>
            <Button type="submit" size="lg">
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">
            Review & Pay
          </h2>
          <div className="bg-white rounded-2xl border border-beige/50 p-6 mb-6">
            <h3 className="font-medium text-chocolate mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-sm">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                    <Image src={item.product.images?.[0] || PLACEHOLDER_IMG} alt={item.product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-chocolate">{item.product.name}</p>
                    <p className="text-warm-gray">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-beige mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-warm-gray">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray">Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-beige">
                <span className="text-wine">Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery details summary */}
          {formData && (
            <div className="bg-cream/50 rounded-xl p-4 mb-6 text-sm">
              <p className="font-medium text-chocolate mb-1">Delivering to:</p>
              <p className="text-warm-gray">{formData.name} — {formData.phone}</p>
              <p className="text-warm-gray">{formData.street}, {formData.city}, {formData.state}</p>
              {formData.notes && <p className="text-gold mt-1">Note: {formData.notes}</p>}
            </div>
          )}

          <div className="bg-cream/50 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Lock className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-chocolate">
                {paystackEnabled ? 'Secure Payment via Paystack' : 'Test Mode — No real payment'}
              </p>
              <p className="text-xs text-warm-gray mt-1">
                {paystackEnabled
                  ? 'Transaction will appear as "MP Wellness" on your statement. Card, bank transfer, and USSD accepted.'
                  : 'Paystack keys not configured. Orders will be created in test mode.'}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              size="xl"
              onClick={handlePayment}
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                `Pay ${formatPrice(total)}`
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/10 mb-6">
            <CheckCircle className="h-12 w-12 text-sage" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-wine mb-3">
            Order Confirmed!
          </h2>
          <p className="text-warm-gray mb-2">Thank you for your order</p>
          <p className="text-lg font-semibold text-gold mb-8">
            Order #{orderNumber}
          </p>
          <div className="bg-cream/50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
            <p className="text-sm text-warm-gray mb-2">
              📧 You&apos;ll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-warm-gray mb-2">
              📦 Your order will arrive in plain, unmarked packaging.
            </p>
            <p className="text-sm text-warm-gray">
              💬 Need help?{' '}
              <a href="https://wa.me/2348000000000" className="text-gold underline">
                Chat on WhatsApp
              </a>
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/track">Track Order</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
