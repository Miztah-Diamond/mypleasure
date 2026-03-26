import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for MP Wellness. Learn how we protect your personal information and data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Legal</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Privacy Policy</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          Last updated: March 2026
        </p>
      </div>

      <div className="prose-product space-y-8">
        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Introduction</h2>
          <p className="text-chocolate leading-relaxed">
            MP Wellness ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you have a positive experience on our website and when using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, place orders, and interact with our business.
          </p>
          <p className="text-chocolate leading-relaxed mt-4">
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services. Your use of our website and services indicates your acceptance of this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">1. Information We Collect</h2>

          <h3 className="font-semibold text-wine mt-6 mb-3">Personal Information You Provide</h3>
          <p className="text-chocolate leading-relaxed">
            We collect information that you voluntarily provide when you:
          </p>
          <ul className="text-chocolate leading-relaxed mt-3 space-y-2 ml-4">
            <li>• Create an account or register on our website</li>
            <li>• Place an order and provide delivery and billing information</li>
            <li>• Contact us via email, WhatsApp, phone, or contact form</li>
            <li>• Subscribe to our newsletter or promotional communications</li>
            <li>• Leave product reviews or feedback</li>
            <li>• Request customer support or file a complaint</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            This information may include: name, email address, phone number, mailing address, billing address, payment information (processed securely through Paystack), product preferences, and any communications or messages you send us.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-chocolate leading-relaxed">
            When you visit our website, we automatically collect certain information about your device and browsing activity:
          </p>
          <ul className="text-chocolate leading-relaxed mt-3 space-y-2 ml-4">
            <li>• Log data (IP address, browser type, pages visited, time and date stamps)</li>
            <li>• Device information (type, operating system, unique identifiers)</li>
            <li>• Location data (country and general region based on IP address)</li>
            <li>• Cookies and similar tracking technologies</li>
            <li>• Analytics data about how you interact with our website</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            We do not collect geolocation data beyond country and region level. We never track your precise location.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Information from Third Parties</h3>
          <p className="text-chocolate leading-relaxed">
            We may receive information about you from third-party sources, including:
          </p>
          <ul className="text-chocolate leading-relaxed mt-3 space-y-2 ml-4">
            <li>• Payment processors (Paystack) for transaction verification</li>
            <li>• Courier and delivery partners for shipment status</li>
            <li>• Customer feedback and review platforms</li>
            <li>• Analytics providers for website performance</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            We do not purchase or use customer lists from data brokers. We only receive information necessary for fulfilling your orders and improving our services.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">2. How We Use Your Information</h2>
          <p className="text-chocolate leading-relaxed">
            We use the information we collect for various business purposes:
          </p>
          <ul className="text-chocolate leading-relaxed mt-4 space-y-3 ml-4">
            <li>• <strong>Order Processing & Delivery:</strong> To process your orders, collect payment, ship products, and communicate delivery updates</li>
            <li>• <strong>Customer Service:</strong> To respond to inquiries, resolve issues, and provide support</li>
            <li>• <strong>Account Management:</strong> To create and manage your account, maintain transaction history, and provide order status</li>
            <li>• <strong>Communications:</strong> To send order confirmations, shipping notifications, and customer service responses</li>
            <li>• <strong>Marketing (With Consent):</strong> To send promotional emails, newsletters, and special offers only if you have opted in</li>
            <li>• <strong>Website Improvement:</strong> To understand how customers use our website and improve functionality and user experience</li>
            <li>• <strong>Fraud Prevention:</strong> To detect, prevent, and address fraudulent activity, abuse, and security incidents</li>
            <li>• <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
            <li>• <strong>Analytics & Insights:</strong> To analyze trends and patterns in customer behavior (anonymized and aggregated)</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            We will not use your information for purposes not listed above without obtaining your explicit consent first.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">3. Data Storage & Security</h2>
          <p className="text-chocolate leading-relaxed">
            We take data security seriously and implement appropriate technical and organizational measures to protect your information:
          </p>
          <ul className="text-chocolate leading-relaxed mt-4 space-y-3 ml-4">
            <li>• <strong>Encryption:</strong> All sensitive data is encrypted in transit using SSL/TLS technology. Your website connection is always secure (HTTPS)</li>
            <li>• <strong>Payment Security:</strong> Payment information is never stored on our servers. All payments are processed through Paystack, which complies with PCI DSS standards</li>
            <li>• <strong>Access Controls:</strong> Access to customer data is restricted to authorized employees who have signed confidentiality agreements</li>
            <li>• <strong>Regular Security Audits:</strong> We conduct regular security reviews and updates to maintain protection against emerging threats</li>
            <li>• <strong>Data Minimization:</strong> We only collect and store data necessary for our business operations</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            While we implement robust security measures, no system is 100% secure. We cannot guarantee absolute security of your data, but we commit to maintaining industry-standard protections.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">4. Cookies & Tracking Technologies</h2>
          <p className="text-chocolate leading-relaxed">
            Our website uses cookies and similar technologies to enhance your experience:
          </p>
          <ul className="text-chocolate leading-relaxed mt-4 space-y-3 ml-4">
            <li>• <strong>Essential Cookies:</strong> Required for website functionality, security, and processing orders</li>
            <li>• <strong>Analytics Cookies:</strong> Help us understand how you use our website and identify improvements</li>
            <li>• <strong>Marketing Cookies:</strong> Used to deliver targeted advertising (only with your consent)</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            You can control cookie settings through your browser. However, disabling cookies may affect website functionality. We do not use cookies to track you across other websites.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">5. Information Sharing & Disclosure</h2>
          <p className="text-chocolate leading-relaxed">
            We maintain strict confidentiality regarding customer information and only share data when necessary:
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Service Providers</h3>
          <p className="text-chocolate leading-relaxed">
            We share limited information with trusted third-party service providers who assist with our operations:
          </p>
          <ul className="text-chocolate leading-relaxed mt-3 space-y-2 ml-4">
            <li>• <strong>Paystack:</strong> For secure payment processing only</li>
            <li>• <strong>Courier Partners:</strong> Delivery address and contact information for shipment</li>
            <li>• <strong>Email Service Providers:</strong> Email address for transactional communications (order confirmations, shipping updates)</li>
            <li>• <strong>Hosting & Analytics:</strong> Anonymized usage data to maintain and improve our website</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            All third-party service providers are contractually obligated to maintain confidentiality and use your information only for purposes necessary to provide services to us.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">When We Must Disclose Information</h3>
          <p className="text-chocolate leading-relaxed">
            We may disclose your information when required by law or in response to legal process:
          </p>
          <ul className="text-chocolate leading-relaxed mt-3 space-y-2 ml-4">
            <li>• Valid court orders, subpoenas, or government requests</li>
            <li>• To comply with applicable laws and regulations (Nigerian law and international regulations)</li>
            <li>• To protect our legal rights, privacy, and safety</li>
            <li>• To prevent fraud, abuse, or security threats</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            We will never sell your personal data to third parties or marketers. We do not share customer information with other companies for their direct marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">6. Paystack Integration</h2>
          <p className="text-chocolate leading-relaxed">
            Payment processing is handled securely by Paystack, one of Africa's leading payment gateways. When you provide payment information, it is transmitted directly to Paystack using SSL encryption. We do not receive, store, or have access to your full credit card details. Paystack is PCI DSS compliant and maintains the highest security standards for payment processing. For more information about Paystack's privacy practices, visit their privacy policy at paystack.com/privacy.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">7. Your Privacy Rights</h2>
          <p className="text-chocolate leading-relaxed">
            You have the following rights regarding your personal information:
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Right to Access</h3>
          <p className="text-chocolate leading-relaxed">
            You have the right to request access to the personal information we hold about you. Contact us with your request, and we will provide a complete copy of your data within 14 days.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Right to Correction</h3>
          <p className="text-chocolate leading-relaxed">
            If your personal information is inaccurate or incomplete, you have the right to request corrections. You can update much of your information yourself in your account settings, or contact us for assistance.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Right to Erasure</h3>
          <p className="text-chocolate leading-relaxed">
            You may request deletion of your personal information, subject to certain exceptions (e.g., when we need to retain it for legal, tax, or legitimate business purposes). We will delete your data as appropriate while retaining what is legally required.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">Right to Opt Out of Marketing</h3>
          <p className="text-chocolate leading-relaxed">
            You can unsubscribe from promotional communications at any time by clicking the "unsubscribe" link in any marketing email or by contacting us. You will continue to receive transactional emails (order confirmations, shipping updates) as these are necessary for your orders.
          </p>

          <h3 className="font-semibold text-wine mt-6 mb-3">How to Exercise Your Rights</h3>
          <p className="text-chocolate leading-relaxed">
            To exercise any of these rights, contact us via email at hello@mpwellness.ng or WhatsApp. Please include "Data Request" in your subject line and provide your account email address. We will respond within 14 business days.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">8. Data Retention</h2>
          <p className="text-chocolate leading-relaxed">
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Retention periods vary based on the type of information:
          </p>
          <ul className="text-chocolate leading-relaxed mt-4 space-y-2 ml-4">
            <li>• <strong>Account Information:</strong> Retained while your account is active. You can request deletion anytime</li>
            <li>• <strong>Order Data:</strong> Retained for 7 years for tax and accounting purposes (as required by Nigerian law)</li>
            <li>• <strong>Marketing Communications:</strong> Retained until you unsubscribe</li>
            <li>• <strong>Website Analytics:</strong> Aggregated and anonymized data retained for 2 years</li>
            <li>• <strong>Support Communications:</strong> Retained for 3 years to maintain service quality</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            When data is no longer necessary, we securely delete or anonymize it. Some information may be retained longer if required by law or for legitimate business or legal purposes.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">9. International Data Transfers</h2>
          <p className="text-chocolate leading-relaxed">
            MP Wellness is based in Nigeria. Information we collect is processed and stored primarily in Nigeria. However, some service providers (such as email and analytics providers) may process data in other jurisdictions. We ensure that any international transfers comply with applicable data protection laws and that appropriate safeguards are in place to protect your information.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">10. Children's Privacy</h2>
          <p className="text-chocolate leading-relaxed">
            Our services are intended for adults only. We do not knowingly collect information from individuals under 18 years of age. If we become aware that we have collected information from a minor, we will promptly delete such information and take appropriate steps to notify the parent or guardian. Our Terms of Service explicitly require users to be at least 18 years old.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">11. Discretion & Confidentiality</h2>
          <p className="text-chocolate leading-relaxed">
            Understanding the sensitive nature of our business, we maintain the highest standards of discretion:
          </p>
          <ul className="text-chocolate leading-relaxed mt-4 space-y-2 ml-4">
            <li>• We never disclose customer names or purchase history to anyone</li>
            <li>• All package contents are completely confidential</li>
            <li>• Your billing descriptor shows only "MP Wellness" for privacy</li>
            <li>• We do not share customer information with other adult retailers or businesses</li>
            <li>• No customer data is used for blackmail, harassment, or any malicious purpose</li>
          </ul>
          <p className="text-chocolate leading-relaxed mt-4">
            Your privacy and discretion are fundamental to our business values and legal obligations.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">12. Policy Updates</h2>
          <p className="text-chocolate leading-relaxed">
            We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website with a new "last updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy regularly.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">13. Governing Law & Jurisdiction</h2>
          <p className="text-chocolate leading-relaxed">
            This Privacy Policy is governed by the laws of the Federal Republic of Nigeria. Any dispute regarding privacy matters shall be resolved in accordance with Nigerian law. We comply with applicable Nigerian data protection regulations and international best practices.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">14. Contact Us</h2>
          <p className="text-chocolate leading-relaxed">
            If you have questions about this Privacy Policy, concerns about your privacy, or wish to exercise your data rights, please contact us:
          </p>
          <div className="mt-4 space-y-2 text-chocolate">
            <p><strong>Email:</strong> hello@mpwellness.ng</p>
            <p><strong>WhatsApp:</strong> +234 901 234 5678</p>
            <p><strong>Business Address:</strong> MP Wellness, Lagos, Nigeria</p>
            <p><strong>Response Time:</strong> We respond to all data privacy requests within 14 business days</p>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center text-sm text-warm-gray">
        <p>© 2026 MP Wellness. All rights reserved.</p>
        <p className="mt-2">Last updated: March 2026</p>
      </div>
    </div>
  )
}
