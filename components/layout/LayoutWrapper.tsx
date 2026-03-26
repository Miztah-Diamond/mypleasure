"use client"

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { AgeVerification } from '@/components/shared/AgeVerification'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <AgeVerification />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartSidebar />
    </>
  )
}
