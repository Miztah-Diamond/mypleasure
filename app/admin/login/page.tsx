"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simplified login — in production, use Supabase Auth
    try {
      // For now, accept any credentials and redirect
      // Replace with: const { error } = await supabase.auth.signInWithPassword({ email, password })
      setTimeout(() => {
        router.push('/admin')
        setLoading(false)
      }, 1000)
    } catch {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-wine">MP</span>
          <p className="text-[11px] uppercase tracking-[3px] text-warm-gray mt-1">Admin Portal</p>
        </div>
        <div className="bg-white rounded-2xl border border-beige/50 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-gold" />
            <h1 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-wine">Sign In</h1>
          </div>
          {error && (
            <div className="bg-error/10 text-error text-sm rounded-lg p-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder="admin@mypleasureltd.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
