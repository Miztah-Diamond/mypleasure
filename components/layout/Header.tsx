"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingBag, Menu, ChevronDown, User, LogOut, Shield } from 'lucide-react'
import { AnnouncementBar } from './AnnouncementBar'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from '@/components/shared/SearchOverlay'
import { useCartStore } from '@/store/cart'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const itemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0))
  const { openCart } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    // Get current user
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsUserMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  const categories = [
    { href: '/shop?category=women', label: 'For Her' },
    { href: '/shop?category=men', label: 'For Him' },
    { href: '/shop?category=couples', label: 'Couples' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ]

  const userInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U'

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'codedcrystal@gmail.com'
  const isAdmin = user?.email === adminEmail

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

              {/* Auth: User menu or Sign In link */}
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button
                    className="flex items-center justify-center w-9 h-9 bg-gold/10 text-gold rounded-full text-sm font-semibold hover:bg-gold/20 transition-colors"
                    aria-label="Account menu"
                  >
                    {userInitial}
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 w-48 bg-white rounded-xl shadow-xl border border-beige/50 py-2 mt-1 animate-fade-in-up">
                      <div className="px-4 py-2 border-b border-beige/50">
                        <p className="text-xs text-warm-gray truncate">{user.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-wine font-medium hover:bg-wine/5 transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-chocolate hover:bg-cream hover:text-gold transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-chocolate hover:bg-cream hover:text-wine transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
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

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} user={user} onSignOut={handleSignOut} isAdmin={isAdmin} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
