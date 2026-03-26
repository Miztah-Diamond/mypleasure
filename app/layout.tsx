import type { Metadata } from 'next'
import './globals.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Toaster } from '@/components/ui/toast'
import { ClerkProvider } from '@clerk/nextjs'

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export const metadata: Metadata = {
  title: {
    default: 'MP Wellness — Premium Products',
    template: '%s | MP Wellness',
  },
  description: 'Premium adult wellness products with 100% discreet delivery across Nigeria. Body-safe, certified, and luxurious.',
  keywords: ['wellness', 'premium products', 'discreet delivery', 'Nigeria'],
  openGraph: {
    title: 'MP Wellness — Premium Products',
    description: 'Premium adult wellness products with 100% discreet delivery across Nigeria.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'MP Wellness',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-[family-name:var(--font-body)] bg-cream text-chocolate antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  )

  if (clerkEnabled) {
    return <ClerkProvider>{content}</ClerkProvider>
  }

  return content
}
