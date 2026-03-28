'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
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
            Check your email
          </h1>
          <p className="text-warm-gray mb-8">
            We&apos;ve sent a password reset link to <strong className="text-chocolate">{email}</strong>. Click the link to set a new password.
          </p>
          <Button variant="outline" asChild>
            <Link href="/sign-in">Back to Sign In</Link>
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
            <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-wine">MP</span>
            <span className="block text-[11px] uppercase tracking-[3px] text-warm-gray mt-1">Wellness</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-beige/50 shadow-xl p-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine text-center mb-2">
            Forgot password?
          </h1>
          <p className="text-sm text-warm-gray text-center mb-8">
            Enter your email and we&apos;ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-error bg-error/5 px-4 py-3 rounded-xl">{error}</p>
            )}

            <Button type="submit" size="xl" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
            </Button>
          </form>

          <p className="text-sm text-warm-gray text-center mt-6">
            <Link href="/sign-in" className="text-gold hover:text-gold/80 font-medium transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
