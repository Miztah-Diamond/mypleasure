import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="font-[family-name:var(--font-playfair)] text-8xl font-bold text-beige">404</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mt-4 mb-3">Page Not Found</h1>
        <p className="text-warm-gray mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild><Link href="/">Go Home</Link></Button>
          <Button variant="outline" asChild><Link href="/shop">Browse Products</Link></Button>
        </div>
      </div>
    </div>
  )
}
