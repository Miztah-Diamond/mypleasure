"use client"

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('My Pleasure LTD')
  const [contactEmail, setContactEmail] = useState('hello@mypleasureltd.com')
  const [whatsapp, setWhatsapp] = useState('+2348000000000')
  const [announcement, setAnnouncement] = useState('🚚 Free discreet delivery on orders over ₦15,000 | 📦 100% unmarked packaging')
  const [freeThreshold, setFreeThreshold] = useState('15000')
  const [lagosDelivery, setLagosDelivery] = useState('1500')
  const [citiesDelivery, setCitiesDelivery] = useState('2000')
  const [nationwideDelivery, setNationwideDelivery] = useState('2500')
  const [instagram, setInstagram] = useState('https://instagram.com/mypleasureltd')
  const [twitter, setTwitter] = useState('https://x.com/mypleasureltd')
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      toast.success('Settings saved successfully!')
      setSaving(false)
    }, 1000)
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
              <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Twitter / X URL</Label>
              <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} className="mt-1.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
