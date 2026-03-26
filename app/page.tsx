import Link from 'next/link'
import { ArrowRight, Package, Shield, Heart, Truck, MessageCircle, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TrustBar } from '@/components/shared/TrustBar'
import { Newsletter } from '@/components/shared/Newsletter'
import { Testimonials } from '@/components/shared/Testimonials'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/data'

const categories = [
  { id: 'women', label: 'For Her', description: 'Discover toys designed for her pleasure', href: '/shop?category=women', color: 'from-plum/80 to-wine/80' },
  { id: 'men', label: 'For Him', description: 'Premium products for male pleasure', href: '/shop?category=men', color: 'from-wine/80 to-plum/80' },
  { id: 'couples', label: 'Couples', description: 'Shared pleasure for both partners', href: '/shop?category=couples', color: 'from-gold/60 to-plum/80' },
  { id: 'accessories', label: 'Accessories', description: 'Essential care & enhancement products', href: '/shop?category=accessories', color: 'from-blush/60 to-plum/80' },
]

const whyChooseUs = [
  { icon: Package, title: '100% Discreet Delivery', description: 'Plain, unmarked packaging with no indication of contents. Your privacy is our top priority.' },
  { icon: Shield, title: 'Secure Payments', description: 'Bank-grade encryption via Paystack. Transactions appear as "MP Wellness" on your statement.' },
  { icon: Heart, title: 'Body-Safe Materials', description: 'All products made from medical-grade silicone, phthalate-free and dermatologist-tested.' },
  { icon: Truck, title: 'Same-Day Lagos Delivery', description: 'Order before 2PM for same-day delivery within Lagos. Nationwide shipping in 3-5 days.' },
  { icon: MessageCircle, title: 'Private WhatsApp Support', description: 'Discreet customer service via WhatsApp. We never share your information.' },
  { icon: Award, title: 'Premium Quality Guaranteed', description: 'Every product tested and inspected. 30-day satisfaction guarantee on all orders.' },
]

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true, limit: 8 })

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-blush/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Premium Wellness</span>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-wine mt-4 leading-[1.1]">
                Your Pleasure,{' '}
                <span className="text-gold italic font-normal">Our Priority</span>
              </h1>
              <p className="text-warm-gray text-lg mt-6 max-w-lg leading-relaxed">
                Premium body-safe wellness products delivered with absolute discretion.
                Explore our curated collection of the world&apos;s most loved intimate products.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="xl" asChild>
                  <Link href="/shop">Shop Bestsellers <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/shop">Explore Collection</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-wine text-lg">5,000+</p>
                  <p className="text-warm-gray text-xs">Happy Customers</p>
                </div>
                <div className="w-px h-8 bg-beige" />
                <div className="text-center">
                  <p className="font-semibold text-wine text-lg">100%</p>
                  <p className="text-warm-gray text-xs">Discreet</p>
                </div>
                <div className="w-px h-8 bg-beige" />
                <div className="text-center">
                  <p className="font-semibold text-wine text-lg">Certified</p>
                  <p className="text-warm-gray text-xs">Body-Safe</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-plum via-wine to-gold/40 opacity-90 flex items-center justify-center">
                <div className="text-center text-cream">
                  <span className="font-[family-name:var(--font-playfair)] text-8xl font-bold text-gold/30">MP</span>
                  <p className="text-cream/50 text-sm tracking-[4px] uppercase mt-2">Wellness Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Curated Selection</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mt-3">Most Loved Products</h2>
            <p className="text-warm-gray mt-3 max-w-lg mx-auto">Our bestselling products, chosen by thousands of satisfied customers across Nigeria</p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Browse Categories</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mt-3">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.color}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-cream">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-1">{cat.label}</h3>
                  <p className="text-cream/80 text-sm">{cat.description}</p>
                  <span className="flex items-center gap-2 text-gold text-sm font-medium mt-3 group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Our Promise</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-wine mt-3">Why Choose MP Wellness</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-white border border-beige/50 hover:shadow-lg transition-shadow">
                <div className="inline-flex p-3 rounded-2xl bg-gold/10 text-gold mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-2">{item.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
