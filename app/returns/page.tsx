import type { Metadata } from 'next'
import { RotateCcw, Shield, DollarSign, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Refunds',
  description: 'Returns policy and refund information for MP Wellness. 7-day return window for unopened items.',
}

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Satisfaction Guaranteed</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Returns & Refunds</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          We stand behind every product. If you&apos;re not satisfied, we make returns easy and discreet.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Return Window</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">7 days from delivery date for unopened, unused items in original packaging.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <RotateCcw className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Easy Process</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Contact us, get return shipping label, send item back. Full refund or replacement.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Full Refunds</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Processed within 5-7 business days after we receive and inspect your return.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-gold" />
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine">Defective Items</h3>
          </div>
          <p className="text-chocolate text-sm leading-relaxed">Free return shipping for items damaged or defective upon arrival.</p>
        </div>
      </div>

      <div className="bg-blush/20 border border-blush/30 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">Our Return Policy</h2>
        <div className="space-y-4 text-chocolate leading-relaxed">
          <p>
            <strong>7-Day Return Guarantee:</strong> We accept returns within 7 calendar days from the date of delivery. This gives you a full week to evaluate your purchase and decide if it&apos;s right for you.
          </p>
          <p>
            <strong>Unopened & Unused Requirement:</strong> Items must be completely unopened and unused with all original packaging intact. The product must be in resalable condition with no signs of tampering or testing.
          </p>
          <p>
            <strong>Hygiene Exception:</strong> We cannot accept returns for opened, used, or tested products for health and safety reasons. This applies to all intimate wellness products to protect both you and other customers.
          </p>
          <p>
            <strong>Defective or Damaged Items:</strong> If your item arrives defective, damaged, or with missing components, we accept returns regardless of whether it has been opened. We&apos;ll replace it or refund you immediately upon verification.
          </p>
          <p>
            <strong>Original Packaging:</strong> Items must be in original packaging as provided. If the box is damaged or packaging is removed, we cannot process the return (unless the damage occurred during shipping).
          </p>
        </div>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Step-by-Step Return Process</h2>

        <h3 className="font-semibold text-wine mt-6 mb-3">Step 1: Contact Us (Days 1-7)</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Contact our support team within 7 days of delivery. Email hello@mpwellness.ng or WhatsApp +234 901 234 5678 with:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li>• Your order number</li>
          <li>• Reason for return</li>
          <li>• Confirmation that product is unopened and unused</li>
          <li>• Preferred resolution (refund or replacement)</li>
        </ul>
        <p className="text-chocolate leading-relaxed mb-4">
          We respond within 2 business hours during business hours (Monday-Saturday, 9 AM - 6 PM WAT).
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Step 2: Receive Return Instructions (Immediate)</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Once we confirm your return, we&apos;ll send you:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li>• Return shipping label (printed at home or collected from courier)</li>
          <li>• Return address and special instructions</li>
          <li>• Return authorization number to include with your package</li>
        </ul>
        <p className="text-chocolate leading-relaxed mb-4">
          For defective items, we provide free return shipping. For unopened items, you cover return shipping costs (typically ₦1,500-₦3,000 depending on your location).
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Step 3: Pack & Ship (Within 7 Days)</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Pack the item securely in original packaging and ship using the label we provided. Include:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li>• Return authorization number</li>
          <li>• Original order number</li>
          <li>• Reason for return</li>
          <li>• Copy of your order confirmation email</li>
        </ul>
        <p className="text-chocolate leading-relaxed mb-4">
          Keep your tracking number for reference. Once shipped, reply to our email or WhatsApp with tracking details so we can monitor for arrival.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Step 4: Inspection & Refund (3-5 Business Days)</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Upon receiving your return, we inspect the item to verify it meets our return criteria (unopened, unused, original packaging). This inspection typically takes 3-5 business days. We&apos;ll notify you via email of the outcome.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Step 5: Refund Processed (5-7 Business Days)</h3>
        <p className="text-chocolate leading-relaxed">
          If approved, your refund is credited to your original payment method within 5-7 business days. Bank transfers may take an additional 2-3 days to appear. If requesting a replacement, we ship the new item within 2 business days.
        </p>
      </div>

      <div className="bg-white border border-beige/50 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-6">Return Timeline</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold text-cream font-bold">1</div>
            </div>
            <div>
              <p className="font-semibold text-wine mb-1">Days 1-7: Request Return</p>
              <p className="text-chocolate text-sm">Contact us within 7 days of delivery</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold text-cream font-bold">2</div>
            </div>
            <div>
              <p className="font-semibold text-wine mb-1">Same Day: Approval & Instructions</p>
              <p className="text-chocolate text-sm">Receive return label and authorization number</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold text-cream font-bold">3</div>
            </div>
            <div>
              <p className="font-semibold text-wine mb-1">Within 7 Days: Ship Back</p>
              <p className="text-chocolate text-sm">Pack securely and use provided shipping label</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold text-cream font-bold">4</div>
            </div>
            <div>
              <p className="font-semibold text-wine mb-1">3-5 Days: Inspection</p>
              <p className="text-chocolate text-sm">We verify product condition and approval status</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gold text-cream font-bold">5</div>
            </div>
            <div>
              <p className="font-semibold text-wine mb-1">5-7 Days: Refund Processed</p>
              <p className="text-chocolate text-sm">Money returned to original payment method</p>
            </div>
          </div>
        </div>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Refund Details</h2>

        <h3 className="font-semibold text-wine mt-6 mb-3">How Refunds Are Processed</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Refunds are credited to your original payment method. If you paid by card, the refund goes back to that card. If you used bank transfer, we refund to the account from which payment originated. Refunds are processed within 5-7 business days after we confirm approval.
        </p>
        <p className="text-chocolate leading-relaxed mb-4">
          <strong>Important:</strong> Bank transfers may take an additional 2-3 business days to appear in your account due to banking processing times. You will receive a refund confirmation email with a transaction reference number.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Refund of Shipping Costs</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          We refund the product price in full. Original shipping costs are refunded only if:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li>• The item arrived defective or damaged</li>
          <li>• The item was the wrong product or color due to our error</li>
          <li>• You qualify for free return shipping due to a product issue</li>
        </ul>
        <p className="text-chocolate leading-relaxed mb-4">
          For standard returns (unopened items), you cover return shipping costs. We provide the label and courier, but the shipping fee is deducted from your refund.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Replacement Instead of Refund</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          If you prefer a replacement instead of a refund, we ship the replacement item within 2 business days of confirming your return. We can replace with the same item or a different product of equivalent value. No additional shipping fees apply for defective item replacements.
        </p>
      </div>

      <div className="bg-error/10 border border-error rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-error mb-4">Non-Returnable Items</h2>
        <p className="text-chocolate leading-relaxed mb-4">
          While most items are returnable within 7 days when unopened, the following items cannot be returned for health and safety reasons:
        </p>
        <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mb-4">
          <li>• Any opened, used, or tested products</li>
          <li>• Items missing original packaging or with damaged packaging</li>
          <li>• Products returned after the 7-day window</li>
          <li>• Items that show signs of tampering or testing</li>
          <li>• Products returned without original documentation</li>
        </ul>
        <p className="text-chocolate leading-relaxed">
          <strong>Exception:</strong> Defective or damaged items are always returnable regardless of condition. If an item arrived broken, non-functional, or with manufacturing defects, we replace or refund immediately upon verification.
        </p>
      </div>

      <div className="prose-product mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Common Return Questions</h2>

        <h3 className="font-semibold text-wine mt-6 mb-3">Can I return an item opened just to inspect the quality?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Unfortunately, once the item is opened, we cannot accept it for return due to health and safety standards for intimate products. We recommend carefully reviewing product photos, descriptions, and customer reviews before ordering. If you have questions about a product, contact us before purchasing for detailed information.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">What if I ordered the wrong item or wrong color?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          If you ordered incorrectly or changed your mind about color/style, you can return the unopened item within 7 days for a refund (minus return shipping costs). We can also arrange an exchange — send back the original item and we&apos;ll ship the correct one. Contact us to arrange the exchange.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">How much does return shipping cost?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Return shipping costs vary by location (₦1,500-₦3,000 typically) and are deducted from your refund. We provide the return shipping label, so you simply use our couriers. For defective items, return shipping is free — we provide a prepaid label.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">Will the return package be discreet?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Yes, absolutely. Use plain packaging for your return. Write only our company name and address on the label — no product details. Your return is as discreet as your original order. Our couriers see only the address, not contents.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">How long do refunds take to appear in my account?</h3>
        <p className="text-chocolate leading-relaxed mb-4">
          Refunds are processed within 5-7 business days of approval. For card payments, the refund appears immediately in the system but may take 2-3 additional days to show in your bank account. For bank transfers, add another 2-3 days for banking processing. You&apos;ll receive a refund confirmation email with all details.
        </p>

        <h3 className="font-semibold text-wine mt-6 mb-3">What if my return doesn&apos;t meet your criteria?</h3>
        <p className="text-chocolate leading-relaxed">
          If your return doesn&apos;t meet our policy (e.g., item is opened), we&apos;ll contact you to explain. We&apos;ll either refuse the return and send it back to you, or if there&apos;s a legitimate issue (defect, damage), we may approve it despite the condition. We&apos;re committed to customer satisfaction and work with you fairly.
        </p>
      </div>

      <div className="bg-plum rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-cream mb-4">Need Help With a Return?</h2>
        <p className="text-cream/80 leading-relaxed max-w-xl mx-auto mb-6">
          Have questions about returning an item? Our support team is here to help with a quick, discreet process. Contact us anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/2349012345678"
            className="px-6 py-3 bg-cream text-wine rounded-lg font-semibold hover:bg-cream/90 transition-colors"
          >
            WhatsApp Support
          </a>
          <a
            href="mailto:hello@mpwellness.ng"
            className="px-6 py-3 border border-cream text-cream rounded-lg font-semibold hover:bg-cream/10 transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  )
}
