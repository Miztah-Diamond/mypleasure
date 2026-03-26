import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-wine text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold">MP</span>
              <span className="block text-[11px] uppercase tracking-[3px] text-cream/60 mt-1">Wellness</span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              Premium wellness products delivered with absolute discretion. Your pleasure, your privacy, our priority.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[2px] text-gold mb-4 font-semibold">Shop</h4>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?category=women', label: 'For Her' },
                { href: '/shop?category=men', label: 'For Him' },
                { href: '/shop?category=couples', label: 'Couples' },
                { href: '/shop?category=accessories', label: 'Accessories' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[2px] text-gold mb-4 font-semibold">Help</h4>
            <ul className="space-y-3">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/track', label: 'Track Order' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns & Refunds' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[2px] text-gold mb-4 font-semibold">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@mypleasureltd.com"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  hello@mypleasureltd.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/mypleasureltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/mypleasureltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} MP Wellness. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/50">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Bank Transfer</span>
            <span>•</span>
            <span>USSD</span>
          </div>
          <p className="text-xs text-cream/40 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-gold" /> in Lagos
          </p>
        </div>
      </div>
    </footer>
  )
}
