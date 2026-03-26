import type { Metadata } from 'next'
import { Heart, Shield, Package, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MP Wellness - Nigeria\'s premium adult wellness brand. Quality products, discreet delivery.',
}

const values = [
  { icon: Heart, title: 'Quality First', description: 'Every product in our catalog is made from body-safe, certified materials. We never compromise on quality.' },
  { icon: Shield, title: 'Absolute Discretion', description: 'From plain packaging to "MP Wellness" billing — your privacy is protected at every step.' },
  { icon: Package, title: 'Accessibility', description: 'Premium products at fair prices with delivery to every state in Nigeria.' },
  { icon: BookOpen, title: 'Education', description: 'We believe in empowering our customers with knowledge about wellness and body-safe products.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Our Story</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">About MP Wellness</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          We are Nigeria&apos;s premier adult wellness brand, dedicated to providing premium, body-safe intimate products with the discretion and respect you deserve.
        </p>
      </div>

      <div className="prose-product max-w-2xl mx-auto mb-16">
        <p className="text-chocolate leading-relaxed mb-4">
          Founded in Lagos, MP Wellness was born from a simple belief: every adult deserves access to high-quality wellness products without judgment or compromise on privacy. We carefully curate the world&apos;s most loved intimate products and deliver them to your doorstep in completely plain, unmarked packaging.
        </p>
        <p className="text-chocolate leading-relaxed mb-4">
          Our catalog features over 30 premium products sourced from certified manufacturers, each made from body-safe materials like medical-grade silicone. From our bestselling rose collection to our couples bundles, every product is inspected and tested before it reaches you.
        </p>
        <p className="text-chocolate leading-relaxed">
          We understand the importance of privacy in this category. That&apos;s why we&apos;ve built discretion into every aspect of our business — from our neutral brand name to our &quot;MP Wellness&quot; billing descriptor. Your pleasure is your business, and keeping it that way is ours.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-wine text-center mb-10">Our Mission</h2>
        <div className="bg-blush/20 border border-blush/30 rounded-2xl p-8 lg:p-10">
          <p className="text-center text-lg text-wine font-[family-name:var(--font-playfair)]">
            To make premium wellness products accessible to every Nigerian adult with absolute discretion and respect.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-wine text-center mb-10">Our Values</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {values.map((value) => (
            <div key={value.title} className="flex gap-4 p-6 rounded-2xl bg-white border border-beige/50">
              <div className="p-3 rounded-xl bg-gold/10 text-gold h-fit">
                <value.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-2">{value.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-plum rounded-2xl p-8 lg:p-12 text-center mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-cream mb-4">Our Quality Promise</h2>
        <p className="text-cream/80 leading-relaxed max-w-xl mx-auto">
          Every product we sell is 100% body-safe, phthalate-free, and sourced from certified manufacturers. If you&apos;re not completely satisfied, contact us within 30 days for a full resolution.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        <div className="text-center">
          <div className="text-3xl font-[family-name:var(--font-playfair)] text-gold mb-2">30+</div>
          <p className="text-sm text-warm-gray">Premium Products</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-[family-name:var(--font-playfair)] text-gold mb-2">36</div>
          <p className="text-sm text-warm-gray">States Covered</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-[family-name:var(--font-playfair)] text-gold mb-2">100%</div>
          <p className="text-sm text-warm-gray">Discretion Guaranteed</p>
        </div>
      </div>

      <div className="prose-product max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Why Choose MP Wellness</h2>
        <p className="text-chocolate leading-relaxed mb-4">
          We&apos;re not just another online retailer. We&apos;ve built our business on three pillars: trust, quality, and discretion. When you order from us, you&apos;re joining thousands of Nigerian adults who have discovered that pleasure and privacy don&apos;t have to be mutually exclusive.
        </p>
        <p className="text-chocolate leading-relaxed mb-4">
          Our team personally inspects every single product before it ships. We partner exclusively with manufacturers who share our commitment to body safety and ethical production. We invest in education — through our blog, guides, and customer support — because we believe informed customers are satisfied customers.
        </p>
        <p className="text-chocolate leading-relaxed">
          Most importantly, we listen to our customers. Your feedback shapes our catalog, our policies, and our service. We&apos;re not just selling products; we&apos;re building a community of adults who deserve better. You deserve better. That&apos;s why we&apos;re here.
        </p>
      </div>
    </div>
  )
}
