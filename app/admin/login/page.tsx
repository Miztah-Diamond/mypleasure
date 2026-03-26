'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

// Only load Clerk SignIn component when keys are configured
const ClerkSignIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignIn),
  { ssr: false, loading: () => <div className="text-center text-warm-gray p-8">Loading...</div> }
)

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function FallbackLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
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
      <p className="text-xs text-warm-gray text-center mt-4">Connect Clerk to enable secure authentication</p>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-wine">MP</span>
          <p className="text-[11px] uppercase tracking-[3px] text-warm-gray mt-1">Admin Portal</p>
        </div>

        {clerkEnabled ? (
          <ClerkSignIn
            forceRedirectUrl="/admin"
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'bg-white rounded-2xl border border-beige/50 shadow-sm',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formButtonPrimary: 'bg-wine hover:bg-wine/90 text-cream rounded-lg h-10 font-medium',
                formFieldInput: 'bg-cream/50 border border-beige rounded-lg h-10 text-chocolate placeholder:text-warm-gray/50',
                formFieldLabel: 'text-sm font-medium text-chocolate',
                footerActionLink: 'text-wine hover:text-wine/80 font-medium',
              },
              variables: {
                colorPrimary: '#8B3A3A',
                colorText: '#3D2817',
                colorTextSecondary: '#A39B8B',
                colorBackground: '#F5F1E8',
                colorInputBackground: '#F5F1E8',
                colorInputText: '#3D2817',
              },
            }}
          />
        ) : (
          <FallbackLoginForm />
        )}
      </div>
    </div>
  )
}
