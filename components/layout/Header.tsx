"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Search, ShoppingBag, Menu, ChevronDown, User } from 'lucide-react'
import { AnnouncementBar } from './AnnouncementBar'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from '@/components/shared/SearchOverlay'
import { useCartStore } from '@/store/cart'

// Dynamic Clerk imports — same pattern as admin layout
const ClerkUserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false, loading: () => null }
)

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [clerkLoaded, setClerkLoaded] = useState(false)
  const itemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0))
  const { openCart } = useCartStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    // Check when Clerk loads and user is signed in (UserButton will render)
    if (clerkEnabled) {
      const checkClerk = setInterval(() => {
        const clerkBtn = document.querySelector('.cl-userButtonTrigger')
        if (clerkBtn) {
          setClerkLoaded(true)
          clearInterval(checkClerk)
        }
      }, 500)
      // Stop checking after 5s
      setTimeout(() => clearInterval(checkClerk), 5000)
      return () => { clearInterval(checkClerk); window.removeEventListener('scroll', handleScroll) }
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { href: '/shop?category=women', label: 'For Her' },
    { href: '/shop?category=men', label: 'For Him' },
    { href: '/shop?category=couples', label: 'Couples' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ]

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-beige/50'
            : 'bg-white border-b border-beige'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-chocolate hover:text-wine transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-wine">
                MP
              </span>
              <span className="hidden sm:block text-xs uppercase tracking-[3px] text-warm-gray font-light">
                Wellness
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-sm font-medium text-chocolate hover:text-gold transition-colors py-2"
                >
                  Shop
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {isShopDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-beige/50 py-2 animate-fade-in-up">
                    <Link
                      href="/shop"
                      className="block px-4 py-2.5 text-sm text-chocolate hover:bg-cream hover:text-gold transition-colors"
                    >
                      All Products
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-4 py-2.5 text-sm text-chocolate hover:bg-cream hover:text-gold transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/about" className="text-sm font-medium text-chocolate hover:text-gold transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium text-chocolate hover:text-gold transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-chocolate hover:text-gold transition-colors rounded-xl hover:bg-cream"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Auth: Sign In link or Clerk UserButton */}
              {clerkEnabled && (
                <>
                  {!clerkLoaded && (
                    <Link
                      href="/sign-in"
                      className="p-2.5 text-chocolate hover:text-gold transition-colors rounded-xl hover:bg-cream"
                      aria-label="Sign in"
                    >
                      <User className="h-5 w-5" />
                    </Link>
                  )}
                  <div className={clerkLoaded ? 'p-1' : 'absolute opacity-0 pointer-events-none'}>
                    <ClerkUserButton
                      appearance={{
                        elements: {
                          avatarBox: 'h-8 w-8',
                        },
                      }}
                    />
                  </div>
                </>
              )}
              {!clerkEnabled && (
                <Link
                  href="/sign-in"
                  className="p-2.5 text-chocolate hover:text-gold transition-colors rounded-xl hover:bg-cream"
                  aria-label="Sign in"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              <button
                onClick={openCart}
                className="relative p-2.5 text-chocolate hover:text-gold transition-colors rounded-xl hover:bg-cream"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
