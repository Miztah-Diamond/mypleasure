import type { Metadata } from 'next'
import './globals.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Toaster } from '@/components/ui/toast'

export const metadata: Metadata = {
  title: {
    default: 'MP Wellness — Premium Adult Wellness Products | Discreet Delivery Nigeria',
    template: '%s | MP Wellness',
  },
  description: 'Premium adult wellness products with 100% discreet delivery across Nigeria. Body-safe, certified, and luxurious. Same-day Lagos delivery.',
  keywords: ['wellness products', 'discreet delivery Nigeria', 'adult toys Nigeria', 'body-safe', 'premium wellness'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mypleasure.vercel.app'),
  openGraph: {
    title: 'MP Wellness — Premium Adult Wellness Products',
    description: 'Premium adult wellness products with 100% discreet delivery across Nigeria.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'MP Wellness',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP Wellness — Premium Adult Wellness Products',
    description: 'Discreet delivery across Nigeria. Body-safe, certified, luxurious.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E1218" />
      </head>
      <body className="font-[family-name:var(--font-body)] bg-cream text-chocolate antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  )
}
