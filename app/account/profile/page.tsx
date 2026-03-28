'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AccountProfilePage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        setFullName(user.user_metadata?.full_name || '')
        setPhone(user.user_metadata?.phone || '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    })

    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="max-w-lg">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine mb-6">
        Profile Details
      </h2>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
          <Input
            type="email"
            value={email}
            disabled
            className="bg-cream/50"
          />
          <p className="text-xs text-warm-gray mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-chocolate mb-1.5">Full Name</label>
          <Input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number</label>
          <Input
            type="tel"
            placeholder="+234 800 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-error bg-error/5 px-4 py-3 rounded-xl">{error}</p>
        )}

        {saved && (
          <p className="text-sm text-success bg-success/5 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Profile updated successfully
          </p>
        )}

        <Button type="submit" disabled={saving} className="inline-flex items-center gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </form>
    </div>
  )
}
