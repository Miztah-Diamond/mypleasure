import type { Metadata } from 'next'
import { MessageCircle, Mail, Clock, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with MP Wellness. WhatsApp support, email, and social media contact options available.',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[3px] text-gold font-semibold">Get In Touch</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-wine mt-3 mb-6">Contact Us</h1>
        <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
          Have a question? Need help with an order? We&apos;re here to help with professionalism and care.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {/* WhatsApp */}
        <a
          href="https://wa.me/2349012345678"
          className="group p-8 rounded-2xl bg-white border border-beige/50 hover:border-gold/30 transition-all"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gold/10 text-gold">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-1">WhatsApp</h3>
              <p className="text-sm text-warm-gray">Fast, discreet messaging</p>
            </div>
          </div>
          <p className="text-sm text-chocolate leading-relaxed mb-4">
            Send us a message on WhatsApp for quick responses. Perfect for order inquiries, product questions, and delivery updates.
          </p>
          <p className="text-gold font-semibold text-sm group-hover:underline">+234 901 234 5678</p>
        </a>

        {/* Email */}
        <a
          href="mailto:hello@mpwellness.ng"
          className="group p-8 rounded-2xl bg-white border border-beige/50 hover:border-gold/30 transition-all"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gold/10 text-gold">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-1">Email</h3>
              <p className="text-sm text-warm-gray">Detailed inquiries</p>
            </div>
          </div>
          <p className="text-sm text-chocolate leading-relaxed mb-4">
            Send us an email for detailed inquiries, feedback, or partnership opportunities. We respond within 24 hours.
          </p>
          <p className="text-gold font-semibold text-sm group-hover:underline">hello@mpwellness.ng</p>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/mpwellness.ng"
          className="group p-8 rounded-2xl bg-white border border-beige/50 hover:border-gold/30 transition-all"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gold/10 text-gold">
              <ExternalLink className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-1">Instagram</h3>
              <p className="text-sm text-warm-gray">Tips, news & community</p>
            </div>
          </div>
          <p className="text-sm text-chocolate leading-relaxed mb-4">
            Follow us for wellness tips, product launches, customer stories, and exclusive promotions.
          </p>
          <p className="text-gold font-semibold text-sm group-hover:underline">@mpwellness.ng</p>
        </a>

        {/* Business Hours */}
        <div className="p-8 rounded-2xl bg-white border border-beige/50">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gold/10 text-gold">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-wine mb-1">Business Hours</h3>
              <p className="text-sm text-warm-gray">When we&apos;re available</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-chocolate">
            <div className="flex justify-between">
              <span>Monday – Friday</span>
              <span className="font-semibold">9 AM – 6 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span className="font-semibold">10 AM – 4 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span className="font-semibold">Closed</span>
            </div>
            <p className="text-warm-gray pt-2 text-xs">All times are West Africa Time (WAT)</p>
          </div>
        </div>
      </div>

      <div className="bg-blush/20 border border-blush/30 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Quick Response Times</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-[family-name:var(--font-playfair)] text-gold mb-1">~15 min</p>
            <p className="text-sm text-warm-gray">WhatsApp response</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-[family-name:var(--font-playfair)] text-gold mb-1">~2 hours</p>
            <p className="text-sm text-warm-gray">Email response</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-[family-name:var(--font-playfair)] text-gold mb-1">24 hours</p>
            <p className="text-sm text-warm-gray">Maximum response time</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-beige/50 rounded-2xl p-8 lg:p-10 mb-16">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Contact Form</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-wine mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-beige/50 rounded-lg focus:outline-none focus:border-gold/50 bg-white text-chocolate placeholder-warm-gray/40"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-wine mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-beige/50 rounded-lg focus:outline-none focus:border-gold/50 bg-white text-chocolate placeholder-warm-gray/40"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-wine mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="How can we help?"
              className="w-full px-4 py-3 border border-beige/50 rounded-lg focus:outline-none focus:border-gold/50 bg-white text-chocolate placeholder-warm-gray/40"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-wine mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us more..."
              className="w-full px-4 py-3 border border-beige/50 rounded-lg focus:outline-none focus:border-gold/50 bg-white text-chocolate placeholder-warm-gray/40"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-wine text-cream rounded-lg font-semibold hover:bg-wine/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="prose-product max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-wine mb-4">Privacy & Confidentiality</h2>
        <p className="text-chocolate leading-relaxed mb-4">
          We take your privacy seriously. All communications with our team are treated with the utmost confidentiality. Your name, order details, and any questions you ask are never shared with third parties or used for marketing purposes without your consent.
        </p>
        <p className="text-chocolate leading-relaxed mb-4">
          Whether you contact us via WhatsApp, email, or any other channel, you can be assured that your privacy is protected. We understand the sensitive nature of our business and respect your need for discretion in every interaction.
        </p>
        <p className="text-chocolate leading-relaxed">
          For more information about how we handle your data, please review our Privacy Policy.
        </p>
      </div>
    </div>
  )
}
