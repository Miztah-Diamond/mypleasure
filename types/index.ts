export interface Product {
  id: string
  name: string
  slug: string
  category: 'women' | 'men' | 'couples' | 'accessories'
  subcategory: string | null
  price: number // stored in kobo (₦ × 100)
  compare_price: number | null
  description: string | null
  features: string[]
  material: string | null
  details: {
    dimensions?: string
    howToUse?: string
    howToClean?: string
    whatsInBox?: string
  } | null
  images: string[]
  badge: 'bestseller' | 'new' | 'sale' | null
  stock: number
  status: 'active' | 'draft'
  featured: boolean
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface DeliveryAddress {
  street: string
  city: string
  state: string
  postalCode?: string
  notes?: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: DeliveryAddress
  delivery_method: string
  delivery_fee: number
  items: OrderItem[]
  subtotal: number
  total: number
  promo_code: string | null
  discount: number
  payment_status: 'pending' | 'paid' | 'failed'
  payment_reference: string | null
  order_status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'cancelled'
  tracking_number: string | null
  delivery_partner: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface StoreSettings {
  id: number
  store_name: string
  contact_email: string | null
  whatsapp_number: string | null
  announcement_text: string | null
  free_delivery_threshold: number
  delivery_fees: {
    lagos: number
    major_cities: number
    nationwide: number
  }
  social_links: {
    instagram?: string
    twitter?: string
    tiktok?: string
  }
  updated_at: string
}

export interface ProductRequest {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  product_name: string | null
  category: string | null
  description: string | null
  product_slug: string | null
  status: 'new' | 'reviewed' | 'sourcing' | 'fulfilled' | 'declined'
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface DashboardMetrics {
  todayOrders: number
  todayRevenue: number
  totalProducts: number
  pendingOrders: number
}
