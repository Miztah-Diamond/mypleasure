"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatPrice, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'
import type { Order } from '@/types'

const PLACEHOLDER_IMG = 'https://placehold.co/80x80/1E1218/C4956A?text=MP'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [deliveryPartner, setDeliveryPartner] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setOrder(data)
        setStatus(data.order_status || 'pending')
        setTrackingNumber(data.tracking_number || '')
        setDeliveryPartner(data.delivery_partner || '')
        setAdminNotes(data.admin_notes || '')
      } catch {
        toast.error('Failed to load order')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [orderId])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_status: status,
          tracking_number: trackingNumber,
          delivery_partner: deliveryPartner,
          admin_notes: adminNotes,
        }),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      setOrder(updated)
      toast.success(`Order updated to "${status}"`)
    } catch {
      toast.error('Failed to update order')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-24">
        <p className="text-warm-gray mb-4">Order not found</p>
        <Button asChild><Link href="/admin/orders">Back to Orders</Link></Button>
      </div>
    )
  }

  const address = order.delivery_address || {} as Record<string, string>
  const items = Array.isArray(order.items) ? order.items : []

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-cream transition-colors">
          <ArrowLeft className="h-5 w-5 text-warm-gray" />
        </Link>
        <div className="flex-1">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">
            Order {order.order_number}
          </h1>
          <p className="text-sm text-warm-gray mt-0.5">{new Date(order.created_at).toLocaleString()}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Customer Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-warm-gray">Name:</span> <span className="font-medium text-chocolate ml-1">{order.customer_name}</span></div>
              <div><span className="text-warm-gray">Phone:</span> <span className="font-medium text-chocolate ml-1">{order.customer_phone}</span></div>
              <div><span className="text-warm-gray">Email:</span> <span className="font-medium text-chocolate ml-1">{order.customer_email}</span></div>
              <div><span className="text-warm-gray">Method:</span> <span className="font-medium text-chocolate ml-1">{order.delivery_method}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-beige">
              <span className="text-sm text-warm-gray">Delivery Address:</span>
              <p className="text-sm font-medium text-chocolate mt-1">
                {address.street}, {address.city}, {address.state}
              </p>
              {address.notes && <p className="text-sm text-gold mt-1">Note: {address.notes}</p>}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Order Items</h2>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-beige/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cream overflow-hidden relative">
                      <Image src={item.image || PLACEHOLDER_IMG} alt={item.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-chocolate">{item.name}</p>
                      <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-beige space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-warm-gray">Delivery</span><span>{formatPrice(order.delivery_fee)}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between"><span className="text-warm-gray">Discount</span><span className="text-sage">-{formatPrice(order.discount)}</span></div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-beige">
                <span className="text-wine">Total</span><span className="text-gold">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Payment</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-warm-gray">Status:</span> <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.payment_status)}`}>{order.payment_status}</span></div>
              <div><span className="text-warm-gray">Reference:</span> <span className="font-mono text-xs ml-1">{order.payment_reference || '—'}</span></div>
            </div>
          </div>
        </div>

        {/* Sidebar: Status & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-beige/50 p-6 sticky top-24">
            <h2 className="font-medium text-wine mb-4">Update Order</h2>
            <div className="space-y-4">
              <div>
                <Label>Order Status</Label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1.5">
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>

              {status === 'shipped' && (
                <>
                  <div>
                    <Label>Tracking Number</Label>
                    <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="mt-1.5" placeholder="Enter tracking number" />
                  </div>
                  <div>
                    <Label>Delivery Partner</Label>
                    <Input value={deliveryPartner} onChange={(e) => setDeliveryPartner(e.target.value)} className="mt-1.5" placeholder="e.g., GIG Logistics" />
                  </div>
                </>
              )}

              <div>
                <Label>Admin Notes (Internal)</Label>
                <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="mt-1.5" placeholder="Internal notes..." rows={3} />
              </div>

              <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
                <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Update Order'}
              </Button>
              <p className="text-[11px] text-warm-gray text-center">
                Status change will trigger email notification to customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
