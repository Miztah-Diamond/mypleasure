export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
] as const

export const DELIVERY_METHODS = [
  { id: 'same-day-lagos', label: 'Same-Day Lagos Delivery', fee: 150000, eta: 'Today' },
  { id: 'standard', label: 'Standard 2-3 Days', fee: 200000, eta: '2-3 business days' },
  { id: 'nationwide', label: 'Nationwide 3-5 Days', fee: 250000, eta: '3-5 business days' },
] as const

export const CATEGORIES = [
  { id: 'women', label: 'For Her', description: 'Premium toys designed for women\'s pleasure', icon: '✨' },
  { id: 'men', label: 'For Him', description: 'Top-rated products for men', icon: '🔥' },
  { id: 'couples', label: 'Couples', description: 'Shared pleasure for partners', icon: '💕' },
  { id: 'accessories', label: 'Accessories', description: 'Essential care products', icon: '🧴' },
] as const

export const ORDER_STATUSES = [
  { id: 'pending', label: 'Pending', description: 'Order received, awaiting confirmation' },
  { id: 'accepted', label: 'Accepted', description: 'Order confirmed and being prepared' },
  { id: 'shipped', label: 'Shipped', description: 'Order dispatched for delivery' },
  { id: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
  { id: 'cancelled', label: 'Cancelled', description: 'Order has been cancelled' },
] as const

export const FREE_DELIVERY_THRESHOLD = 1500000 // ₦15,000 in kobo

export const SITE_CONFIG = {
  name: 'MP Wellness',
  fullName: 'My Pleasure LTD',
  description: 'Premium adult wellness products. Discreet delivery across Nigeria.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mypleasureltd.com',
  whatsapp: '+2348000000000',
  email: 'hello@mypleasureltd.com',
  instagram: 'https://instagram.com/mypleasureltd',
  twitter: 'https://x.com/mypleasureltd',
  announcement: '🚚 Free discreet delivery on orders over ₦15,000 | 📦 100% unmarked packaging',
}

export const TRUST_FEATURES = [
  { icon: 'Package', title: 'Discreet Packaging', description: '100% plain, unmarked boxes' },
  { icon: 'Shield', title: 'Secure Payment', description: 'Bank-grade encryption' },
  { icon: 'Heart', title: 'Body-Safe Materials', description: 'Medical-grade silicone' },
  { icon: 'Truck', title: 'Same-Day Lagos', description: 'Order before 2PM' },
  { icon: 'MessageCircle', title: 'Private Support', description: 'Discreet WhatsApp help' },
] as const
