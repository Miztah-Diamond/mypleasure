"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatPrice, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'

const mockOrder = {
  id: '1',
  order_number: 'MP-20260326-A1B2',
  created_at: '2026-03-26T10:30:00',
  customer_name: 'Chioma Adebayo',
  customer_email: 'chioma@email.com',
  customer_phone: '08012345678',
  delivery_address: { street: '45 Admiralty Way', city: 'Lekki', state: 'Lagos', postalCode: '101233', notes: 'Call before delivery' },
  delivery_method: 'Same-Day Lagos',
  delivery_fee: 150000,
  items: [
    { name: 'Rose Suction Vibrator', quantity: 1, price: 700000, image: 'https://placehold.co/80x80/1E1218/C4956A?text=W01' },
    { name: 'Water-Based Lubricant', quantity: 2, price: 350000, image: 'https://placehold.co/80x80/1E1218/C4956A?text=A01' },
  ],
  subtotal: 1400000,
  total: 1550000,
  payment_status: 'paid',
  payment_reference: 'PSK_abc123xyz',
  order_status: 'pending',
  tracking_number: '',
  delivery_partner: '',
  admin_notes: '',
}

export default function OrderDetailPage() {
  const [status, setStatus] = useState(mockOrder.order_status)
  const [trackingNumber, setTrackingNumber] = useState(mockOrder.tracking_number)
  const [deliveryPartner, setDeliveryPartner] = useState(mockOrder.delivery_partner)
  const [adminNotes, setAdminNotes] = useState(mockOrder.admin_notes)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setTimeout(() => {
      toast.success(`Order updated to "${status}". Email notification sent.`)
      setSaving(false)
    }, 1000)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-cream transition-colors">
          <ArrowLeft className="h-5 w-5 text-warm-gray" />
        </Link>
        <div className="flex-1">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">
            Order {mockOrder.order_number}
          </h1>
          <p className="text-sm text-warm-gray mt-0.5">{new Date(mockOrder.created_at).toLocaleString()}</p>
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
              <div><span className="text-warm-gray">Name:</span> <span className="font-medium text-chocolate ml-1">{mockOrder.customer_name}</span></div>
              <div><span className="text-warm-gray">Phone:</span> <span className="font-medium text-chocolate ml-1">{mockOrder.customer_phone}</span></div>
              <div><span className="text-warm-gray">Email:</span> <span className="font-medium text-chocolate ml-1">{mockOrder.customer_email}</span></div>
              <div><span className="text-warm-gray">Method:</span> <span className="font-medium text-chocolate ml-1">{mockOrder.delivery_method}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-beige">
              <span className="text-sm text-warm-gray">Delivery Address:</span>
              <p className="text-sm font-medium text-chocolate mt-1">
                {mockOrder.delivery_address.street}, {mockOrder.delivery_address.city}, {mockOrder.delivery_address.state}
              </p>
              {mockOrder.delivery_address.notes && (
                <p className="text-sm text-gold mt-1">Note: {mockOrder.delivery_address.notes}</p>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Order Items</h2>
            <div className="space-y-3">
              {mockOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-beige/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cream overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
              <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>{formatPrice(mockOrder.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-warm-gray">Delivery</span><span>{formatPrice(mockOrder.delivery_fee)}</span></div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-beige">
                <span className="text-wine">Total</span><span className="text-gold">{formatPrice(mockOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-beige/50 p-6">
            <h2 className="font-medium text-wine mb-4">Payment</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-warm-gray">Status:</span> <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(mockOrder.payment_status)}`}>{mockOrder.payment_status}</span></div>
              <div><span className="text-warm-gray">Reference:</span> <span className="font-mono text-xs ml-1">{mockOrder.payment_reference}</span></div>
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
