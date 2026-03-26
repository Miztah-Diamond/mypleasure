import { Package, Shield, Heart, Truck, MessageCircle } from 'lucide-react'

const features = [
  { icon: Package, title: 'Discreet Packaging', description: '100% plain, unmarked boxes' },
  { icon: Shield, title: 'Secure Payment', description: 'Bank-grade encryption' },
  { icon: Heart, title: 'Body-Safe', description: 'Medical-grade silicone' },
  { icon: Truck, title: 'Same-Day Lagos', description: 'Order before 2PM' },
  { icon: MessageCircle, title: 'Private Support', description: 'Discreet WhatsApp' },
]

export function TrustBar() {
  return (
    <section className="border-y border-beige bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between gap-8 py-6 overflow-x-auto scrollbar-hide">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 min-w-[180px]">
              <div className="p-2.5 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-chocolate whitespace-nowrap">{feature.title}</p>
                <p className="text-[11px] text-warm-gray whitespace-nowrap">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
