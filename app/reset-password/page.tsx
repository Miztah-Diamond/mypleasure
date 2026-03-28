'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/sign-in')
      }, 3000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine mb-3">
            Password updated
          </h1>
          <p className="text-warm-gray mb-8">
            Your password has been reset successfully. Redirecting you to sign in...
          </p>
          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign In Now</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo-full.png" alt="MP Wellness Collection" width={80} height={80} className="h-20 w-20 rounded-xl object-cover mx-auto" />
            <span className="block text-[11px] uppercase tracking-[3px] text-warm-gray mt-2">Wellness</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-beige/50 shadow-xl p-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine text-center mb-2">
            Set new password
          </h1>
          <p className="text-sm text-warm-gray text-center mb-8">
            Choose a strong password for your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">New Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-chocolate transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Confirm Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            {error && (
              <p className="text-sm text-error bg-error/5 px-4 py-3 rounded-xl">{error}</p>
            )}

            <Button type="submit" size="xl" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-cream"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
