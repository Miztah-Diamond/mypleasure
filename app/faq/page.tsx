import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ordering, delivery, payment, returns, privacy, and product care at MP Wellness.',
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  questions: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Ordering',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Placing an order is simple. Browse our product catalog, add items to your cart, and proceed to checkout. You can create an account or checkout as a guest. We accept all major payment methods including Paystack, bank transfer, and card payments. Once your payment is confirmed, you\'ll receive an order confirmation via email immediately.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Yes, you can modify or cancel your order within 2 hours of placing it, before it\'s been prepared for shipment. Contact us via WhatsApp or email with your order number to make changes. After 2 hours, the order enters our fulfillment process and cannot be cancelled, though you can refuse delivery and return the package for a refund.'
      },
      {
        question: 'What is the minimum order amount?',
        answer: 'There is no minimum order amount. You can purchase a single product or build a larger order. However, orders under ₦5,000 will incur standard shipping fees. Orders over ₦15,000 qualify for free delivery across Lagos, with reduced shipping fees for other regions.'
      },
      {
        question: 'Do you offer gift wrapping or special packaging?',
        answer: 'All our packages come in discreet, plain packaging with an unmarked exterior. For special occasions, we can include a personalized note (maximum 50 words) at no extra charge. Simply add this request in the order notes at checkout.'
      },
    ]
  },
  {
    title: 'Delivery',
    questions: [
      {
        question: 'How long does delivery take?',
        answer: 'Delivery times depend on your location. Lagos and major cities (Abuja, Port Harcourt, Ibadan) receive deliveries within 24-48 hours. Most other cities receive deliveries within 3-5 business days. Remote areas may take 5-7 business days. You\'ll receive a tracking number via email once your order ships, so you can monitor progress.'
      },
      {
        question: 'Do you deliver on weekends?',
        answer: 'We process orders Monday to Friday. However, our courier partners deliver on weekends in selected areas. If you need weekend delivery, select it during checkout and pay the additional fee. We do not deliver on public holidays.'
      },
      {
        question: 'Can I choose a specific delivery date and time?',
        answer: 'Yes, we offer specific delivery window selection at checkout. You can choose your preferred date and time slot (morning 9 AM-12 PM, afternoon 12 PM-4 PM, or evening 4 PM-7 PM). For orders in Lagos, same-day delivery is available if placed before 2 PM.'
      },
      {
        question: 'What if I\'m not home for delivery?',
        answer: 'Our couriers will attempt delivery at your address. If you\'re not home, they\'ll leave a notice with alternative instructions. You can contact us to reschedule delivery for another time. For security reasons, we don\'t leave packages unattended or with neighbors. If no one receives the package within 3 attempts, it will be returned to our warehouse.'
      },
    ]
  },
  {
    title: 'Payment',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Visa and Mastercard, bank transfers, USSD payments, and Paystack Pay. All payments are processed securely using industry-standard encryption. We do not accept cash on delivery (COD) at this time. Your billing descriptor will show "MP Wellness" for complete discretion.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. All payments are processed through Paystack, one of Africa\'s most trusted payment gateways. We do not store your card details on our servers. All transactions are encrypted using SSL technology. We comply with PCI DSS standards for payment security.'
      },
      {
        question: 'Will my billing statement say "MP Wellness"?',
        answer: 'Yes, all charges will appear as "MP Wellness" on your bank statement or card statement. This is our billing descriptor and provides discretion when reviewing your financial statements. Your family or colleagues will only see the neutral brand name, not product details.'
      },
      {
        question: 'Can I use a different name or billing address?',
        answer: 'You can use any name for delivery (e.g., a pseudonym or preferred name), but the billing address must match your card\'s registered address for security verification. If you need to use a different address, contact our support team before checkout to arrange an alternative.'
      },
    ]
  },
  {
    title: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy for unopened, unused products in original packaging. The product must be in resalable condition. We do not accept returns for opened or used items for hygiene and safety reasons. To initiate a return, contact us within 7 days of delivery with your order number and reason.'
      },
      {
        question: 'How do I return a product?',
        answer: 'Contact our support team via WhatsApp or email with your order number and reason for return. We\'ll provide you with return shipping instructions and a return label. Once we receive and inspect your return, refunds are processed within 5-7 business days. Return shipping is free if the product is defective; otherwise, you cover return shipping costs.'
      },
      {
        question: 'Can I return opened or used products?',
        answer: 'Unfortunately, we cannot accept returns for opened, used, or tested products due to health and safety regulations. This applies to all intimate wellness products. However, if a product is defective or damaged upon arrival, we\'ll offer a full refund or replacement regardless of the condition.'
      },
      {
        question: 'How long does a refund take?',
        answer: 'Once we receive your returned item and inspect it (usually within 3-5 business days), we process the refund within 5-7 business days. The refund is credited to your original payment method. Bank transfers may take an additional 2-3 business days to appear in your account depending on your bank.'
      },
    ]
  },
  {
    title: 'Privacy & Discretion',
    questions: [
      {
        question: 'How do you protect my privacy?',
        answer: 'Privacy is our top priority. All packages are sent in unmarked, plain packaging with no product information visible. Your order details are encrypted and stored securely. We never share your information with third parties. Your billing shows "MP Wellness" only. We do not sell or rent customer lists or data to any external organization.'
      },
      {
        question: 'Will my neighbors know what I ordered?',
        answer: 'No. Our packaging is completely plain and discreet with no logos, product names, or suggestive imagery. The return address only shows "MP Wellness" with our main office address. Your neighbors will have no way of knowing what\'s inside the package.'
      },
      {
        question: 'Can I request delivery under a different name?',
        answer: 'Yes, absolutely. You can provide any name for delivery (such as a pseudonym, nickname, or a trusted family member\'s name) during checkout. This provides additional discretion. Just ensure the person is available to receive the package. The billing address must match your payment method for security verification.'
      },
      {
        question: 'Do you send marketing emails?',
        answer: 'We only send order confirmations, shipping updates, and delivery notifications automatically. We will not add you to a mailing list without your explicit consent during checkout. If you receive promotional emails and don\'t wish to, you can unsubscribe with a single click. We never share your email with third parties.'
      },
    ]
  },
  {
    title: 'Product Care',
    questions: [
      {
        question: 'How should I clean my product?',
        answer: 'Most of our products are made from medical-grade silicone and can be cleaned with warm water and mild soap. Dry thoroughly before storing. For electronic products, wipe with a damp cloth and allow to air dry completely before use. Avoid harsh chemicals, bleach, or boiling. Never use abrasive scrubbers that may damage the surface.'
      },
      {
        question: 'Is your silicone body-safe?',
        answer: 'Yes, all our silicone products are made from 100% medical-grade silicone, phthalate-free, and non-toxic. They are hypoallergenic and suitable for sensitive skin. All products are sourced from certified manufacturers and tested for safety. Every item comes with detailed care instructions.'
      },
      {
        question: 'How do I store my products?',
        answer: 'Store products in a cool, dry place away from direct sunlight. Use the storage bag or pouch provided (if included) to protect from dust and moisture. Keep away from extreme temperatures and avoid storing in humid bathrooms for extended periods. Store separately from other items to prevent cross-contamination.'
      },
      {
        question: 'How long will my product last?',
        answer: 'With proper care, silicone products typically last 3-5 years or longer. Electronic products have a 2-3 year lifespan depending on battery quality and usage frequency. Battery-operated items should have batteries removed for extended storage. Over time, silicone may develop a slight sticky feel, which can be managed with cornstarch or product refresher sprays.'
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Questions & Answers</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Frequently Asked Questions</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          Find answers to common questions about ordering, delivery, payment, returns, privacy, and product care.
        </p>
      </div>

      <div className="space-y-12">
        {faqCategories.map((category) => (
          <div key={category.title}>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">{category.title}</h2>
            <div className="space-y-4">
              {category.questions.map((item, index) => (
                <details
                  key={index}
                  className="group border border-beige/50 rounded-lg overflow-hidden hover:border-gold/30 transition-colors"
                >
                  <summary className="p-6 cursor-pointer hover:bg-blush/5 transition-colors flex justify-between items-start gap-4">
                    <span className="font-semibold text-wine text-left">{item.question}</span>
                    <span className="text-gold flex-shrink-0 text-lg group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-beige/30 bg-white">
                    <p className="text-chocolate leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blush/20 border border-blush/30 rounded-2xl p-8 lg:p-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Still Have Questions?</h2>
        <p className="text-chocolate leading-relaxed mb-6">
          Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help with any questions or concerns. We respond to WhatsApp inquiries within 15 minutes during business hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/2349012345678"
            className="px-6 py-3 bg-wine text-cream rounded-lg font-semibold hover:bg-wine/90 transition-colors text-center"
          >
            Message on WhatsApp
          </a>
          <a
            href="mailto:hello@mpwellness.ng"
            className="px-6 py-3 border border-wine text-wine rounded-lg font-semibold hover:bg-wine/5 transition-colors text-center"
          >
            Send us an Email
          </a>
        </div>
      </div>
    </div>
  )
}
