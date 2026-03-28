'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
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
            We&apos;ve sent a confirmation link to <strong className="text-chocolate">{email}</strong>. Click the link to activate your account.
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
            <Image src="/images/logo-full.png" alt="MP Wellness Collection" width={80} height={80} className="h-20 w-20 rounded-xl object-cover mx-auto" />
            <span className="block text-[11px] uppercase tracking-[3px] text-warm-gray mt-2">Wellness</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-beige/50 shadow-xl p-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine text-center mb-2">
            Create an account
          </h1>
          <p className="text-sm text-warm-gray text-center mb-8">
            Track orders and save your details for faster checkout
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Password</label>
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

            {error && (
              <p className="text-sm text-error bg-error/5 px-4 py-3 rounded-xl">{error}</p>
            )}

            <Button type="submit" size="xl" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-warm-gray text-center mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-gold hover:text-gold/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
