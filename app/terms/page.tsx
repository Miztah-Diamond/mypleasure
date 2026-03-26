import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MP Wellness. Please read our terms and conditions for using our services.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Legal</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Terms of Service</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          Last updated: March 2026
        </p>
      </div>

      <div className="prose-product space-y-8">
        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Introduction & Agreement</h2>
          <p className="text-chocolate leading-relaxed">
            These Terms of Service ("Terms") constitute a binding agreement between you ("User," "Customer," "you," or "your") and MP Wellness ("Company," "we," "us," or "our"), a licensed business operating in Nigeria. By accessing, browsing, creating an account on, or making any purchase through our website and services, you agree to be bound by these Terms in their entirety.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            If you do not agree to these Terms, do not use our website or services. We reserve the right to modify these Terms at any time without prior notice. Continued use of our services after modifications constitutes acceptance of the updated Terms. We recommend reviewing these Terms periodically for changes.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">1. Age Requirement & Eligibility</h2>
          <p className="text-chocolate leading-relaxed">
            You must be at least 18 years of age to use our website and purchase products from MP Wellness. By placing an order, you represent and warrant that you are at least 18 years old and have the legal right to enter into this agreement.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            We do not knowingly service persons under the age of 18. If you are under 18, you must not access or use our website or services. We reserve the right to refuse service or cancel orders from anyone we believe does not meet the age requirement. If we discover you are under 18, we will cancel any pending orders and may ban your account from future use.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Parents and guardians are responsible for monitoring and restricting their children's access to the internet. We implement age verification in some cases and reserve the right to verify customer age upon request.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">2. Use of Website & Services</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Permitted Uses</h3>
          <p className="text-chocolate leading-relaxed">
            You agree to use our website and services only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use and enjoyment. Prohibited conduct includes:
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-3">
            <li>• Harassing or causing distress or inconvenience to any person</li>
            <li>• Transmitting obscene or offensive content or disrupting the normal flow of dialogue</li>
            <li>• Sharing discriminatory comments based on protected characteristics</li>
            <li>• Engaging in illegal activity or promoting illegal activity</li>
            <li>• Attempting to gain unauthorized access to our systems</li>
            <li>• Interfering with website functionality or security measures</li>
            <li>• Impersonating another person or entity</li>
            <li>• Collecting or tracking personal information without consent</li>
            <li>• Using automated tools (bots, scrapers) to access the website</li>
            <li>• Reselling products purchased from us for unauthorized commercial purposes</li>
          </ul>

          <h3 className="font-semibold text-wine mt-6 mb-3">Account Responsibility</h3>
          <p className="text-chocolate leading-relaxed">
            If you create an account, you are responsible for maintaining the confidentiality of your login credentials and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We are not liable for any unauthorized access or loss resulting from your failure to protect your password.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">3. Product Information & Availability</h2>
          <p className="text-chocolate leading-relaxed">
            We make every effort to provide accurate product descriptions, pricing, and availability information on our website. However, we do not guarantee that product descriptions, pricing, or availability are entirely accurate, complete, or error-free. If a product is listed at an incorrect price due to an error in our system, we have the right to refuse or cancel orders at that price.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Product availability is subject to change. We reserve the right to limit quantities, discontinue products, and refuse orders. If a product ordered is unavailable, we will contact you with options for refund, replacement with a similar item, or backorder.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            All product images and descriptions are for illustration purposes. Actual product colors, textures, and dimensions may vary slightly due to lighting, monitor settings, and manufacturing variations. We recommend reading product care instructions and body safety information before purchase.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">4. Ordering & Payment</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Order Acceptance</h3>
          <p className="text-chocolate leading-relaxed">
            When you place an order, you are making an offer to purchase products at the price shown on our website. Your order is subject to our acceptance. We will send you an order confirmation email once we have accepted your order. This confirmation does not constitute acceptance of your offer, but rather a receipt of your order request.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            We reserve the right to refuse or cancel any order for any reason, including (but not limited to):
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-3">
            <li>• Suspected fraud or unauthorized use</li>
            <li>• Incorrect or incomplete delivery information</li>
            <li>• Orders placed by individuals under 18 years old</li>
            <li>• Multiple orders from the same customer in a short period (indicating abuse)</li>
            <li>• Violation of these Terms or our policies</li>
          </ul>

          <h3 className="font-semibold text-wine mt-6 mb-3">Payment Terms</h3>
          <p className="text-chocolate leading-relaxed">
            Payment must be received in full before your order is processed and shipped. We accept payment via Paystack, which includes card payments, bank transfers, and USSD. All payments are processed securely through Paystack using SSL encryption. By providing payment information, you authorize us and Paystack to charge your account for the order total plus applicable taxes and shipping fees.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            You represent that any payment information you provide is accurate and that you have the right to use that payment method. You authorize us to charge your payment method for any orders placed using that information.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Pricing & Taxes</h3>
          <p className="text-chocolate leading-relaxed">
            Prices are displayed in Nigerian Naira (₦) and include applicable taxes. Shipping costs are calculated based on your delivery location and are displayed at checkout before you complete your order. You are responsible for any additional charges, duties, or taxes imposed by authorities in your location.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">5. Shipping & Delivery</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Delivery Information</h3>
          <p className="text-chocolate leading-relaxed">
            We strive to deliver orders within the timeframes specified on our website and communicated at checkout. However, delivery dates are estimates and not guaranteed. We are not liable for delays caused by courier partners, traffic, weather, public holidays, or other unforeseen circumstances beyond our control.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Risk of loss passes to you upon delivery to your address. Once a package is delivered, we are not responsible for theft, damage, or loss after delivery. We recommend inspecting packages immediately upon delivery and reporting any damage to us within 24 hours.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Delivery Requirements</h3>
          <p className="text-chocolate leading-relaxed">
            You must provide a valid delivery address. We will not deliver to incomplete addresses or addresses in areas we cannot reach. If you provide an incorrect or invalid address, we are not responsible for misdelivery. You may be charged additional fees to correct or redeliver to the correct address.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Someone must be available to receive your package. We do not leave packages unattended for security reasons. If no one is home, the courier will leave a notice for rescheduling.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Shipment Limitations</h3>
          <p className="text-chocolate leading-relaxed">
            We do not ship to addresses outside Nigeria. We do not ship to P.O. boxes (except by special arrangement). We do not ship to government buildings or restricted areas. We reserve the right to refuse delivery to any address we determine is unsafe or inaccessible.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">6. Returns & Refunds</h2>
          <p className="text-chocolate leading-relaxed">
            Please refer to our separate Returns & Refunds Policy for complete details on our return process, eligibility requirements, and refund procedures. In summary:
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-4">
            <li>• Returns accepted within 7 days of delivery for unopened, unused items</li>
            <li>• Opened or used items are non-returnable for hygiene reasons</li>
            <li>• Defective items are returnable regardless of condition</li>
            <li>• Refunds processed within 5-7 business days of approval</li>
            <li>• Return shipping costs deducted from refunds (except defects)</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            Our return policy is separate from your consumer rights under Nigerian law. Nothing in these Terms limits your statutory consumer protections.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">7. Product Warranties & Disclaimers</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Limited Warranty</h3>
          <p className="text-chocolate leading-relaxed">
            We warrant that all products sold are new and have not been used or tested before shipment. We warrant that products are made from the materials and in the condition described on our website. If a product is defective due to manufacturing defect, we will replace or refund it within 30 days of delivery.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Disclaimer of Warranties</h3>
          <p className="text-chocolate leading-relaxed">
            EXCEPT AS EXPRESSLY PROVIDED ABOVE, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT PRODUCTS WILL MEET YOUR EXPECTATIONS OR REQUIREMENTS.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Products are sold "AS IS" without warranty beyond the limited warranty stated above. We do not warrant that products will be suitable for your personal use or that they will perform without defect. We are not responsible for any damage to your body, property, or any other loss resulting from product use.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Product Safety & Usage</h3>
          <p className="text-chocolate leading-relaxed">
            You are responsible for ensuring that any product you purchase is suitable for your use. We provide care instructions and safety information with each product. You must read and follow these instructions. We are not responsible for improper use, misuse, or failure to follow care instructions.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            If you have allergies or sensitivities to any materials, contact us before ordering. While our products are made from body-safe materials, individual reactions vary. We recommend testing for sensitivity before full use. Stop use immediately if you experience irritation or allergic reactions.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">8. Limitation of Liability</h2>
          <p className="text-chocolate leading-relaxed">
            TO THE FULLEST EXTENT PERMITTED BY LAW, MP WELLNESS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR USE OF OUR WEBSITE OR PURCHASE OF PRODUCTS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT THAT IS THE SUBJECT OF THE CLAIM.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            This limitation applies to all claims, whether based on warranty, contract, tort (including negligence), strict liability, or any other legal theory, even if we have been advised of the possibility of such damages.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Some jurisdictions do not allow limitation of liability, so this limitation may not apply to you. In that case, our liability is limited to the maximum extent permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">9. Indemnification</h2>
          <p className="text-chocolate leading-relaxed">
            You agree to indemnify, defend, and hold harmless MP Wellness, its owners, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including attorney&apos;s fees) arising from or related to:
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-3">
            <li>• Your violation of these Terms or any applicable law</li>
            <li>• Your use of our website or products</li>
            <li>• Your violation of any third-party rights</li>
            <li>• Any content you submit or transmit through our services</li>
            <li>• Your account activity or conduct</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            This indemnification obligation shall survive termination of these Terms and your use of our services.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">10. Intellectual Property Rights</h2>
          <p className="text-chocolate leading-relaxed">
            All content on our website, including text, graphics, logos, images, software, and design, is the exclusive property of MP Wellness or our content providers and is protected by Nigerian and international copyright laws. You may not reproduce, modify, distribute, or transmit any content without our prior written permission.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            "MP Wellness," our logo, and all product names and designs are trademarks or service marks of MP Wellness. You may not use these trademarks without our explicit written permission.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            You may download or print content from our website for personal, non-commercial use only, provided you retain all copyright and proprietary notices. You may not modify, reproduce, or distribute content for commercial purposes without permission.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">11. Prohibited Activities</h2>
          <p className="text-chocolate leading-relaxed">
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-4">
            <li>• Accessing the website by unauthorized means or exceeding authorized access</li>
            <li>• Selling, reselling, or attempting to resell products purchased from us</li>
            <li>• Using automated tools, bots, or scripts to access our website</li>
            <li>• Attempting to gain unauthorized access to our systems or networks</li>
            <li>• Harassing, threatening, abusing, or defaming any person or entity</li>
            <li>• Submitting false, misleading, or fraudulent information in orders or communications</li>
            <li>• Interfering with website functionality or security</li>
            <li>• Engaging in any illegal activity or promoting illegal conduct</li>
            <li>• Violating any applicable laws or regulations</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            Violation of these prohibited activities may result in account suspension or termination, and we may pursue legal action.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">12. Third-Party Links & Content</h2>
          <p className="text-chocolate leading-relaxed">
            Our website may contain links to third-party websites, including payment processors, couriers, and other service providers. We are not responsible for the content, accuracy, or practices of these third-party sites. Your access to and use of third-party sites is at your own risk and subject to their terms and policies.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            We do not endorse any third-party sites or products and are not liable for any damages or loss resulting from your interactions with them. We recommend reviewing the privacy and terms of any third-party sites before providing information or making purchases.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">13. Termination of Access</h2>
          <p className="text-chocolate leading-relaxed">
            We reserve the right to terminate or suspend your account and access to our website at any time, for any reason, without notice or liability, including (but not limited to):
          </p>
          <ul className="text-chocolate leading-relaxed space-y-2 ml-4 mt-3">
            <li>• Violation of these Terms</li>
            <li>• Suspected fraud or unauthorized access</li>
            <li>• Abusive conduct toward staff or other customers</li>
            <li>• Multiple refund requests or chargebacks</li>
            <li>• Violation of applicable law</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            Termination is in our sole discretion and may be immediate and without notice. Upon termination, your right to use our services ceases immediately.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">14. Dispute Resolution & Governing Law</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Governing Law</h3>
          <p className="text-chocolate leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts of Nigeria for any disputes arising from these Terms or your use of our services.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Dispute Resolution</h3>
          <p className="text-chocolate leading-relaxed">
            Before initiating any legal proceedings, we encourage you to contact us to resolve disputes informally. If we cannot resolve your dispute through informal communication within 30 days, you may pursue legal action through the Nigerian court system.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Severability</h3>
          <p className="text-chocolate leading-relaxed">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. We will modify the invalid provision to the minimum extent necessary to make it valid and enforceable.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">15. Contact & Notices</h2>
          <p className="text-chocolate leading-relaxed">
            For any questions, complaints, or notices regarding these Terms, please contact us:
          </p>
          <div className="mt-4 space-y-2 text-chocolate">
            <p><strong>Email:</strong> hello@mpwellness.ng</p>
            <p><strong>WhatsApp:</strong> +234 901 234 5678</p>
            <p><strong>Business Address:</strong> MP Wellness, Lagos, Nigeria</p>
          </div>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">16. Changes to Terms</h2>
          <p className="text-chocolate leading-relaxed">
            We may update these Terms periodically. When we make material changes, we will notify you by updating the "Last updated" date at the top of this page and posting the updated Terms on our website. Your continued use of our website and services after such modifications constitutes your acceptance of the updated Terms.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            We recommend reviewing these Terms regularly to stay informed of any changes. If you do not agree with updated Terms, you must stop using our website and services.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">17. Entire Agreement</h2>
          <p className="text-chocolate leading-relaxed">
            These Terms, together with our Privacy Policy and any other policies posted on our website, constitute the entire agreement between you and MP Wellness regarding your use of our website and purchase of products. These Terms supersede all prior agreements, understandings, and communications, whether written or oral.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            If there is any conflict between these Terms and any other agreement or policy, these Terms shall control, except as otherwise explicitly stated.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center text-sm text-warm-gray">
        <p>© 2026 MP Wellness. All rights reserved.</p>
        <p className="mt-2">Last updated: March 2026</p>
      </div>
    </div>
  )
}
