import type { Metadata } from 'next'
import { MapPin, Clock, Package, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shipping & Delivery',
  description: 'Shipping rates, delivery zones, and discreet packaging information for MP Wellness.',
}

interface DeliveryZone {
  name: string
  timeline: string
  cost: string
  freeDeliveryThreshold: string
}

const deliveryZones: DeliveryZone[] = [
  {
    name: 'Lagos (Same-Day)',
    timeline: '24 hours',
    cost: '₦1,500',
    freeDeliveryThreshold: 'Free on orders over ₦15,000'
  },
  {
    name: 'Abuja, Port Harcourt, Ibadan',
    timeline: '24-48 hours',
    cost: '₦2,500',
    freeDeliveryThreshold: 'Free on orders over ₦20,000'
  },
  {
    name: 'Other Major Cities',
    timeline: '3-5 business days',
    cost: '₦3,000',
    freeDeliveryThreshold: 'Free on orders over ₦25,000'
  },
  {
    name: 'Remote Areas',
    timeline: '5-7 business days',
    cost: '₦5,000',
    freeDeliveryThreshold: 'Not available'
  },
]

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Delivery</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Shipping & Delivery</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          Fast, discreet delivery across Nigeria with flexible options and complete privacy protection.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Coverage Area</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">All 36 states plus FCT. We deliver nationwide with customized pricing for remote locations.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Fastest Delivery</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Same-day delivery available in Lagos for orders placed before 2 PM on business days.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Plain Packaging</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Every order ships in unmarked, discreet packaging. No product names or logos visible.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Flexible Costs</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Transparent pricing with free delivery options. No hidden fees or surprise charges.</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">Delivery Zones & Pricing</h2>
        <div className="space-y-4">
          {deliveryZones.map((zone) => (
            <div key={zone.name} className="p-6 rounded-2xl bg-white border border-beige/50 hover:border-gold/30 transition-colors">
              <div className="grid sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-gold mb-1">Zone</p>
                  <p className="font-semibold text-wine">{zone.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gold mb-1">Timeline</p>
                  <p className="text-chocolate">{zone.timeline}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gold mb-1">Shipping Cost</p>
                  <p className="text-chocolate font-semibold">{zone.cost}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gold mb-1">Free Delivery</p>
                  <p className="text-chocolate">{zone.freeDeliveryThreshold}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blush/20 border border-blush/30 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Shipping Timeline Examples</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-wine mb-3">Order Monday 9 AM (Lagos)</h3>
            <p className="text-chocolate text-sm leading-relaxed mb-2">Order confirmed and processed.</p>
            <p className="text-chocolate text-sm leading-relaxed mb-2">Same day: Item picked and packed.</p>
            <p className="text-chocolate text-sm leading-relaxed"><strong>Tuesday morning:</strong> Delivery completed.</p>
          </div>
          <div>
            <h3 className="font-semibold text-wine mb-3">Order Wednesday 10 AM (Abuja)</h3>
            <p className="text-chocolate text-sm leading-relaxed mb-2">Order confirmed and processed.</p>
            <p className="text-chocolate text-sm leading-relaxed mb-2">Same day: Shipped to Abuja distribution.</p>
            <p className="text-chocolate text-sm leading-relaxed"><strong>Thursday/Friday:</strong> Delivery completed.</p>
          </div>
        </div>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Discreet Packaging Guarantee</h2>
        <p className="text-chocolate leading-relaxed mb-4">
          Your privacy is our priority. Every order arrives in completely plain, unmarked packaging with absolutely no indication of contents. Here&apos;s what you can expect:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li><strong>Exterior Package:</strong> Plain cardboard box or padded envelope with no logos, brand names, or identifying marks</li>
          <li><strong>Return Address:</strong> "MP Wellness" only, with our office address (no product hints)</li>
          <li><strong>Labeling:</strong> Standard delivery label with your name and address only</li>
          <li><strong>Tracking:</strong> Secure tracking available via email. Track your package anytime without revealing contents</li>
          <li><strong>Contents:</strong> Items are wrapped separately and cannot be identified from outside the package</li>
        </ul>
        <p className="text-chocolate leading-relaxed">
          Your neighbors, family members, or anyone receiving the package on your behalf will have absolutely no way of knowing what&apos;s inside. This is our guarantee.
        </p>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">How to Choose Your Delivery Options</h2>
        <p className="text-chocolate leading-relaxed mb-4">
          During checkout, you can customize your delivery:
        </p>
        <ol className="text-chocolate leading-relaxed space-y-3 ml-4 mb-4">
          <li><strong>Select Your Location:</strong> Enter your delivery address. We&apos;ll show you available zones and costs automatically.</li>
          <li><strong>Choose Delivery Window:</strong> Select your preferred time slot (morning 9 AM-12 PM, afternoon 12 PM-4 PM, or evening 4 PM-7 PM).</li>
          <li><strong>Same-Day Option (Lagos Only):</strong> For orders placed before 2 PM, select same-day delivery for an additional ₦500 fee.</li>
          <li><strong>Alternative Recipient:</strong> Optionally provide a different name for delivery (pseudonym or trusted person).</li>
          <li><strong>Special Instructions:</strong> Add any delivery notes (e.g., specific gate, driver instructions, or preferred door).</li>
        </ol>
      </div>

      <div className="bg-white border border-beige/50 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">Free Delivery Thresholds</h2>
        <p className="text-chocolate leading-relaxed mb-6">
          We reward larger orders with free shipping. Check the thresholds for your zone above, or here&apos;s a quick summary:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blush/10 rounded-lg">
            <p className="text-sm text-warm-gray">Lagos Orders</p>
            <p className="font-semibold text-wine">Free over ₦15,000</p>
          </div>
          <div className="p-4 bg-blush/10 rounded-lg">
            <p className="text-sm text-warm-gray">Major Cities</p>
            <p className="font-semibold text-wine">Free over ₦20,000</p>
          </div>
          <div className="p-4 bg-blush/10 rounded-lg">
            <p className="text-sm text-warm-gray">Other Zones</p>
            <p className="font-semibold text-wine">Free over ₦25,000</p>
          </div>
          <div className="p-4 bg-blush/10 rounded-lg">
            <p className="text-sm text-warm-gray">Remote Areas</p>
            <p className="font-semibold text-wine">Contact support</p>
          </div>
        </div>
        <p className="text-chocolate text-sm leading-relaxed mt-6">
          Free delivery applies automatically at checkout when your order meets the threshold for your zone. No promo code needed.
        </p>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Delivery & Safety FAQs</h2>

        <h3 className="font-semibold text-wine mt-6 mb-3">What if no one is home for delivery?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Our couriers will not leave packages unattended for security and safety reasons. They will leave a notice with instructions for rescheduling. Contact us to arrange a new delivery time at no additional charge. We make up to 3 delivery attempts before returning the package to our warehouse.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Can I request a specific delivery date?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Yes. During checkout, you can select your preferred delivery date (subject to availability). For Lagos, same-day delivery is available if you order before 2 PM. For other areas, we can typically accommodate your preferred date within our standard timeline.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Do couriers know what they&apos;re delivering?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          No. Our courier partners see only plain packaging with your address. The contents are completely confidential between you and us. They deliver many packages daily and have no way of knowing yours contains intimate wellness products.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">What about weekend delivery?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Our office is closed on Sundays, but our courier partners deliver on Saturdays in most areas. You can select Saturday delivery during checkout and pay an additional ₦500 weekend fee. This option is available in Lagos and major cities.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Can I deliver to a workplace or PO Box?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          We strongly recommend home delivery to protect your privacy. However, if you prefer workplace delivery, you can use your office address and a neutral name. PO Boxes are not recommended as you&apos;ll need to collect in person during business hours, but we can arrange this upon request.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Is tracking available?</h3>
        <p className="text-chocolate leading-relaxed">
          Yes. You&apos;ll receive a tracking number via email immediately after your order ships. Track your package anytime through our system. Your tracking shows only your address and delivery status — no package contents are ever displayed.
        </p>
      </div>

      <div className="bg-plum rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-cream mb-4">Ready to Order?</h2>
        <p className="text-cream/80 leading-relaxed max-w-xl mx-auto mb-6">
          Browse our catalog and add items to your cart. At checkout, you&apos;ll see exact shipping costs and delivery timelines for your location before you pay.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-cream text-wine rounded-lg font-semibold hover:bg-cream/90 transition-colors"
        >
          Start Shopping
        </a>
      </div>
    </div>
  )
}
