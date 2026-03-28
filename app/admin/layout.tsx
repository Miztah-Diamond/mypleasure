"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Menu, X, MessageSquarePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/requests', label: 'Requests', icon: MessageSquarePlus },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

function AdminAvatar({ email }: { email?: string }) {
  const initial = email ? email.charAt(0).toUpperCase() : 'A'
  return (
    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
      <span className="text-xs font-semibold text-gold">{initial}</span>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminEmail, setAdminEmail] = useState<string | undefined>()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAdminEmail(user?.email ?? undefined)
    })
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
    router.refresh()
  }

  // Don't show admin chrome on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-wine/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-wine text-cream transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-cream/10">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image src="/images/logo-full.png" alt="MP" width={36} height={36} className="h-9 w-9 rounded-lg object-cover" />
              <span className="text-xs uppercase tracking-[2px] text-cream/60">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-cream/60 hover:text-cream">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive ? "bg-gold/20 text-gold" : "text-cream/70 hover:text-cream hover:bg-cream/5"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-cream/10 space-y-2">
            <div className="flex items-center justify-center">
              <AdminAvatar email={adminEmail} />
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-cream/50 hover:text-cream hover:bg-cream/5 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-cream/50 hover:text-cream hover:bg-cream/5 transition-all"
            >
              <Package className="h-5 w-5" />
              Back to Store
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-beige px-4 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-chocolate hover:text-wine"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <AdminAvatar email={adminEmail} />
            <span className="text-sm text-chocolate hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
