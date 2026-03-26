"use client"

import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [storeName, setStoreName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const [freeThreshold, setFreeThreshold] = useState('')
  const [lagosDelivery, setLagosDelivery] = useState('')
  const [citiesDelivery, setCitiesDelivery] = useState('')
  const [nationwideDelivery, setNationwideDelivery] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/settings')
        if (res.ok) {
          const data = await res.json()
          setStoreName(data.store_name || '')
          setContactEmail(data.contact_email || '')
          setWhatsapp(data.whatsapp_number || '')
          setAnnouncement(data.announcement_text || '')
          setFreeThreshold(String((data.free_delivery_threshold || 0) / 100))
          const fees = data.delivery_fees || {}
          setLagosDelivery(String((fees.lagos || 0) / 100))
          setCitiesDelivery(String((fees.major_cities || 0) / 100))
          setNationwideDelivery(String((fees.nationwide || 0) / 100))
          const social = data.social_links || {}
          setInstagram(social.instagram || '')
          setTwitter(social.twitter || '')
        }
      } catch {
        // Use defaults already set
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_name: storeName,
          contact_email: contactEmail,
          whatsapp_number: whatsapp,
          announcement_text: announcement,
          free_delivery_threshold: Math.round(Number(freeThreshold) * 100),
          delivery_fees: {
            lagos: Math.round(Number(lagosDelivery) * 100),
            major_cities: Math.round(Number(citiesDelivery) * 100),
            nationwide: Math.round(Number(nationwideDelivery) * 100),
          },
          social_links: {
            instagram: instagram || undefined,
            twitter: twitter || undefined,
          },
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast.success('Settings saved successfully!')
    } catch {
      toast.error('Failed to save settings')
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Settings</h1>
          <p className="text-sm text-warm-gray mt-1">Configure your store settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Store Info */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-medium text-wine mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="mt-1.5" />
            </div>
          </div>
        </div>

        {/* Announcement */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-medium text-wine mb-4">Announcement Bar</h2>
          <div>
            <Label>Announcement Text</Label>
            <Textarea value={announcement} onChange={(e) => setAnnouncement(e.target.value)} className="mt-1.5" rows={2} />
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-medium text-wine mb-4">Delivery Fees</h2>
          <div className="space-y-4">
            <div>
              <Label>Free Delivery Threshold (₦)</Label>
              <Input type="number" value={freeThreshold} onChange={(e) => setFreeThreshold(e.target.value)} className="mt-1.5" />
              <p className="text-[11px] text-warm-gray mt-1">Orders above this amount get free delivery</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lagos (₦)</Label>
                <Input type="number" value={lagosDelivery} onChange={(e) => setLagosDelivery(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Major Cities (₦)</Label>
                <Input type="number" value={citiesDelivery} onChange={(e) => setCitiesDelivery(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Nationwide (₦)</Label>
                <Input type="number" value={nationwideDelivery} onChange={(e) => setNationwideDelivery(e.target.value)} className="mt-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-2xl border border-beige/50 p-6">
          <h2 className="font-medium text-wine mb-4">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <Label>Instagram URL</Label>
              <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} className="mt-1.5" placeholder="https://instagram.com/mypleasureltd" />
            </div>
            <div>
              <Label>Twitter / X URL</Label>
              <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} className="mt-1.5" placeholder="https://x.com/mypleasureltd" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
