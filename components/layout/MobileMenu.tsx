"use client"

import Link from 'next/link'
import Image from 'next/image'
import { X, ChevronRight, User, LogOut, Shield } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: SupabaseUser | null
  onSignOut: () => void
  isAdmin?: boolean
}

export function MobileMenu({ isOpen, onClose, user, onSignOut, isAdmin }: MobileMenuProps) {
  if (!isOpen) return null

  const menuItems = [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=women', label: 'For Her' },
    { href: '/shop?category=men', label: 'For Him' },
    { href: '/shop?category=couples', label: 'Couples' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ]

  const secondaryItems = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/track', label: 'Track Order' },
    { href: '/request', label: 'Request a Product' },
  ]

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-wine/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-beige">
            <Image src="/images/logo-full.png" alt="MP Wellness" width={40} height={40} className="h-9 w-9 rounded-lg object-cover" />
            <button
              onClick={onClose}
              className="p-2 text-warm-gray hover:text-chocolate transition-colors rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2">
              <span className="text-[11px] uppercase tracking-[2px] text-warm-gray font-medium">Shop</span>
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-6 py-3.5 text-chocolate hover:bg-cream hover:text-gold transition-colors"
              >
                <span className="font-medium">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-warm-gray" />
              </Link>
            ))}

            <div className="border-t border-beige my-4" />

            <div className="px-4 mb-2">
              <span className="text-[11px] uppercase tracking-[2px] text-warm-gray font-medium">Help</span>
            </div>
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-6 py-3.5 text-chocolate hover:bg-cream hover:text-gold transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-warm-gray" />
              </Link>
            ))}

            <div className="border-t border-beige my-4" />

            {/* Account Section */}
            <div className="px-4 mb-2">
              <span className="text-[11px] uppercase tracking-[2px] text-warm-gray font-medium">Account</span>
            </div>
            {!user ? (
              <Link
                href="/sign-in"
                onClick={onClose}
                className="flex items-center justify-between px-6 py-3.5 text-chocolate hover:bg-cream hover:text-gold transition-colors"
              >
                <span className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  Sign In
                </span>
                <ChevronRight className="h-4 w-4 text-warm-gray" />
              </Link>
            ) : (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-3.5 text-wine hover:bg-wine/5 transition-colors font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </span>
                    <ChevronRight className="h-4 w-4 text-wine/50" />
                  </Link>
                )}
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3.5 text-chocolate hover:bg-cream hover:text-gold transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    My Account
                  </span>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
                <button
                  onClick={() => { onSignOut(); onClose() }}
                  className="flex items-center justify-between w-full px-6 py-3.5 text-chocolate hover:bg-cream hover:text-wine transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-beige bg-cream">
            <p className="text-xs text-warm-gray text-center">
              100% Discreet &bull; Body-Safe &bull; Secure Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
