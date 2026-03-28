-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('women', 'men', 'couples', 'accessories')),
  subcategory TEXT,
  price INTEGER NOT NULL,
  compare_price INTEGER,
  description TEXT,
  features TEXT[],
  material TEXT,
  details JSONB,
  images TEXT[],
  badge TEXT CHECK (badge IN ('bestseller', 'new', 'sale', NULL)),
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  featured BOOLEAN DEFAULT FALSE,
  rating NUMERIC(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address JSONB NOT NULL,
  delivery_method TEXT NOT NULL,
  delivery_fee INTEGER NOT NULL,
  items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  total INTEGER NOT NULL,
  promo_code TEXT,
  discount INTEGER DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_reference TEXT,
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'accepted', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  delivery_partner TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store settings
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  store_name TEXT DEFAULT 'My Pleasure LTD',
  contact_email TEXT,
  whatsapp_number TEXT,
  announcement_text TEXT DEFAULT '🚚 Free discreet delivery on orders over ₦15,000 | 📦 100% unmarked packaging',
  free_delivery_threshold INTEGER DEFAULT 1500000,
  delivery_fees JSONB DEFAULT '{"lagos": 150000, "major_cities": 200000, "nationwide": 250000}',
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product requests table
CREATE TABLE IF NOT EXISTS product_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  product_name TEXT,
  category TEXT,
  description TEXT,
  product_slug TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'sourcing', 'fulfilled', 'declined')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read for products
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
-- Admin full access for products (service role bypasses RLS)

-- Public can create orders
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
-- Public can view own orders by order_number
CREATE POLICY "Orders viewable by order number" ON orders FOR SELECT USING (true);

-- Public can read settings
CREATE POLICY "Settings are viewable by everyone" ON settings FOR SELECT USING (true);

-- Initial settings
INSERT INTO settings (id, store_name, contact_email, whatsapp_number)
VALUES (1, 'My Pleasure LTD', 'hello@mypleasureltd.com', '+2348000000000')
ON CONFLICT (id) DO NOTHING;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS for product_requests
ALTER TABLE product_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create product requests" ON product_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Product requests viewable by everyone" ON product_requests FOR SELECT USING (true);

-- Function: decrement_stock (called from orders API)
CREATE OR REPLACE FUNCTION decrement_stock(product_id UUID, qty INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products SET stock = stock - qty WHERE id = product_id AND stock >= qty;
END;
$$ LANGUAGE plpgsql;

-- Function: get_weekly_revenue (called from admin metrics API)
CREATE OR REPLACE FUNCTION get_weekly_revenue()
RETURNS TABLE(day TEXT, revenue BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_CHAR(d.day, 'Dy') AS day,
    COALESCE(SUM(o.total), 0)::BIGINT AS revenue
  FROM generate_series(
    DATE_TRUNC('week', NOW()),
    DATE_TRUNC('week', NOW()) + INTERVAL '6 days',
    INTERVAL '1 day'
  ) AS d(day)
  LEFT JOIN orders o ON DATE_TRUNC('day', o.created_at) = d.day
    AND o.payment_status = 'paid'
  GROUP BY d.day
  ORDER BY d.day;
END;
$$ LANGUAGE plpgsql;