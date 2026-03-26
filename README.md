# MP Wellness - Premium Adult Wellness E-Commerce

A modern, full-featured e-commerce platform for premium adult wellness products. Built with Next.js 15, TypeScript, and Tailwind CSS, MP Wellness provides a seamless shopping experience with a secure payment system, comprehensive admin dashboard, and enterprise-grade features.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | React framework for production |
| **TypeScript** | Latest | Type-safe development |
| **Tailwind CSS** | v4 | Utility-first styling |
| **shadcn/ui** | Latest | High-quality UI components |
| **Supabase** | Latest | PostgreSQL database & auth |
| **Paystack** | API v1 | Payment processing |
| **Resend** | API v1 | Transactional email |
| **Zustand** | Latest | State management |
| **Vercel** | - | Hosting & deployment |

## Features

### Customer-Facing
- **Product Storefront** - Browse and search premium wellness products with detailed descriptions
- **Shopping Cart** - Add/remove items with persistent cart state
- **Secure Checkout** - Multi-step checkout process with address validation
- **Payment Processing** - Integrated Paystack for secure transactions
- **Order Tracking** - Real-time order status updates and shipment tracking
- **Product Reviews** - Customer ratings and feedback system
- **Wishlist** - Save favorite products for later
- **Newsletter** - Email subscription for promotions and updates
- **SEO Optimized** - Meta tags, structured data, and dynamic sitemap
- **Mobile Responsive** - Full mobile and tablet support

### Admin Dashboard
- **Product Management** - Create, edit, and delete products with variants and images
- **Order Management** - View, update status, and track customer orders
- **Customer Management** - View customer profiles and order history
- **Inventory Tracking** - Monitor stock levels and set low-stock alerts
- **Email Management** - View sent emails and resend transactional messages
- **Analytics** - Sales reports, revenue charts, and customer insights
- **Settings** - Configure store information and business settings
- **Admin Authentication** - Secure role-based access control

### Technical Features
- **Email Notifications** - Order confirmations, shipping updates, and status changes via Resend
- **Webhook Support** - Paystack webhooks for real-time payment updates
- **Database Migrations** - Version-controlled schema with automatic seeding
- **Error Handling** - Comprehensive error logging and user-friendly messages
- **Performance Optimized** - Image optimization, code splitting, and caching strategies
- **Privacy Focused** - Discreet billing, packaging options, and data protection

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (or yarn/pnpm)
- **Git** for version control
- **Supabase Account** (free tier available at https://supabase.com)
- **Paystack Account** (sign up at https://paystack.com)
- **Resend Account** (free tier available at https://resend.com)
- **Vercel Account** (optional, for deployment at https://vercel.com)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mypleasure.git
cd mypleasure
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in the required values (see [Environment Variables](#environment-variables) section below).

### 4. Configure Supabase

1. Create a new project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Create a new query and paste the contents of `schema.sql`
4. Execute the SQL to create tables and set up the database
5. Copy your Supabase URL and API key to `.env.local`

### 5. Seed the Database

```bash
npm run seed
```

This populates the database with initial product categories and sample data.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

**Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase API key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for server-side operations) | `eyJhbGc...` |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key (test or live) | `pk_test_...` |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (server-side only) | `sk_test_...` |
| `RESEND_API_KEY` | Resend API key for email sending | `re_...` |
| `NEXT_PUBLIC_APP_URL` | Your application URL | `http://localhost:3000` (dev), `https://yourdomain.com` (prod) |
| `NEXT_PUBLIC_STORE_NAME` | Your store display name | `MP Wellness` |
| `PAYSTACK_WEBHOOK_SECRET` | Secret for validating Paystack webhooks | `whsec_...` |

### Getting Your API Keys

**Supabase:**
1. Create a project at supabase.com
2. Go to Settings > API
3. Copy `Project URL` and `anon public` key
4. Copy `service_role` key from the same page

**Paystack:**
1. Sign up at paystack.com and log in
2. Go to Settings > API Keys & Webhooks
3. Copy your test keys initially, switch to live keys for production
4. For webhook setup, see [Paystack Setup](#paystack-setup)

**Resend:**
1. Create an account at resend.com
2. Go to API Keys
3. Create a new API key and copy it
4. Verify your domain for email sending

## Project Structure

```
mypleasure/
├── app/                           # Next.js app directory
│   ├── (customer)/               # Customer-facing routes
│   │   ├── page.tsx              # Home page
│   │   ├── shop/page.tsx         # Product listing
│   │   ├── product/[slug]/       # Product detail
│   │   ├── cart/page.tsx         # Shopping cart
│   │   ├── checkout/page.tsx     # Checkout flow
│   │   ├── track/page.tsx        # Order tracking
│   │   ├── about/page.tsx        # About page
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── faq/page.tsx          # FAQ
│   │   ├── privacy/page.tsx      # Privacy policy
│   │   ├── shipping/page.tsx     # Shipping info
│   │   ├── returns/page.tsx      # Returns policy
│   │   └── terms/page.tsx        # Terms of service
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx              # Dashboard home
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   ├── customers/            # Customer management
│   │   ├── emails/               # Email logs
│   │   └── settings/             # Store settings
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── products/             # Product API
│   │   ├── orders/               # Order API
│   │   ├── checkout/             # Checkout processing
│   │   ├── webhooks/             # Third-party webhooks
│   │   └── emails/               # Email endpoints
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── paystack.ts               # Paystack integration
│   ├── resend.ts                 # Resend email client
│   ├── utils.ts                  # Utility functions
│   └── types.ts                  # TypeScript types
├── components/
│   ├── common/                   # Reusable components
│   ├── cart/                     # Cart-related components
│   ├── checkout/                 # Checkout components
│   ├── admin/                    # Admin components
│   └── layouts/                  # Layout components
├── store/                        # Zustand state management
├── schema.sql                    # Database schema
├── seed.ts                       # Database seeding script
├── .env.example                  # Environment variables template
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Database Setup

### Creating the Schema

1. **In Supabase Dashboard:**
   - Navigate to SQL Editor
   - Create a new query
   - Copy the entire contents of `schema.sql`
   - Run the query

2. **What schema.sql includes:**
   - `products` table with variants and inventory
   - `categories` table for product organization
   - `orders` table for customer orders
   - `order_items` table for order line items
   - `customers` table for customer information
   - `reviews` table for product reviews
   - `emails` table for email logs
   - `admin_users` table for dashboard access
   - Necessary indexes and constraints for performance

### Seeding Initial Data

After setting up the schema, seed the database with initial categories and sample products:

```bash
npm run seed
```

This creates:
- Base product categories
- Sample premium wellness products
- Admin user account (credentials provided in console output)

## Paystack Setup

### Creating a Paystack Account

1. Go to https://paystack.com and sign up
2. Complete your account verification
3. Provide your business information

### Getting API Keys

1. Log in to your Paystack dashboard
2. Go to **Settings > API Keys & Webhooks**
3. You'll see two keys:
   - **Public Key** - Use in frontend (starts with `pk_`)
   - **Secret Key** - Use in backend only (starts with `sk_`)

### Test vs. Live Keys

- **Test Keys**: Use during development (provided by default)
- **Live Keys**: Use in production (request activation from Paystack)

Copy your test keys to `.env.local`:

```
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
```

### Webhook Configuration

1. In Paystack dashboard, go to **Settings > API Keys & Webhooks**
2. Scroll to "Webhook" section
3. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
4. Copy the webhook secret to `.env.local`:

```
PAYSTACK_WEBHOOK_SECRET=whsec_xxxxx
```

5. Select events to listen for:
   - `charge.success` - Triggered when payment succeeds
   - `charge.failed` - Triggered when payment fails
   - `transfer.success` - For payouts (optional)

### Testing Payments

Use Paystack's test card numbers:
- **Visa**: 4084084084084081 (expires 12/25, CVV: 408)
- **Mastercard**: 5399944090123456 (expires 12/25, CVV: 566)

Use any email, and OTP: 123456

## Deployment to Vercel

### Prerequisites
- GitHub repository with your code pushed
- Vercel account at https://vercel.com

### Deployment Steps

1. **Connect Your Repository:**
   - Log in to Vercel
   - Click "Add New..." > "Project"
   - Select your GitHub repository
   - Vercel automatically detects Next.js

2. **Configure Environment Variables:**
   - In the Vercel dashboard, go to Settings > Environment Variables
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `PAYSTACK_PUBLIC_KEY`
     - `PAYSTACK_SECRET_KEY`
     - `RESEND_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (set to your production domain)
     - `PAYSTACK_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_STORE_NAME`

3. **Deploy:**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Your site is live at `https://yourproject.vercel.app`

4. **Custom Domain:**
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Wait for domain verification

### Post-Deployment

- Update Paystack webhook URL to your production domain
- Update Resend domain settings for email verification
- Test payment flow with Paystack test mode
- Monitor logs in Vercel dashboard

## Pages Overview

### Customer-Facing Pages

| Route | Purpose |
|---|---|
| `/` | Home page with hero, featured products, and promotions |
| `/shop` | Product listing with filtering and search |
| `/product/[slug]` | Product detail page with reviews and variants |
| `/cart` | Shopping cart with quantity adjustment |
| `/checkout` | Multi-step checkout and payment |
| `/track` | Order tracking with status updates |
| `/about` | About company and mission |
| `/contact` | Contact form and support information |
| `/faq` | Frequently asked questions |
| `/privacy` | Privacy policy |
| `/shipping` | Shipping information and rates |
| `/returns` | Return policy and process |
| `/terms` | Terms of service and conditions |

### Admin Pages

| Route | Purpose |
|---|---|
| `/admin` | Dashboard with key metrics and recent orders |
| `/admin/products` | Manage products, variants, and inventory |
| `/admin/orders` | View and manage customer orders |
| `/admin/customers` | View customer profiles and history |
| `/admin/emails` | Email logs and resend options |
| `/admin/settings` | Store configuration and business settings |

### Protected Pages

Admin pages require authentication. Default admin credentials are provided after database seeding. Always change the default password immediately.

## Privacy & Discretion

MP Wellness prioritizes customer privacy and discretion. The following measures are implemented:

### Billing Descriptor
- Transactions appear on customer credit card statements with a discreet company name
- Configured in Paystack settings to avoid revealing product details
- Set via: Paystack Dashboard > Settings > Business Information

### Packaging
- Orders are shipped in plain, unmarked packaging
- No product names or images visible from outside
- Packing slips available in admin for internal use only
- Return shipping includes discreet labeling

### Email Sender
- Transactional emails from discreet sender name (e.g., "MP Wellness Order Support")
- Subject lines do not mention specific product types
- Plain text option available in email preferences
- Opt-out available for marketing emails (transactional emails required for orders)

### Data Protection
- Customer data encrypted at rest in Supabase
- SSL/TLS encryption for all data in transit
- No third-party data sharing without explicit consent
- Regular security audits and compliance checks
- GDPR and privacy law compliance

### Admin Dashboard
- Sensitive customer information is view-only
- Order details obscured in list views
- Full details require confirmation and logging
- Admin activity audit trails maintained

## Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Database
npm run seed             # Seed initial database data
npm run db:push          # Push schema changes (if using migrations)

# Building
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Testing
npm run test             # Run test suite (if configured)
```

## Security Considerations

1. **Environment Variables:** Never commit `.env.local` to version control
2. **Admin Authentication:** Use strong passwords and enable 2FA
3. **API Keys:** Rotate keys regularly and use different keys for test/production
4. **HTTPS:** Always use HTTPS in production
5. **CORS:** Configure properly to prevent unauthorized requests
6. **Rate Limiting:** Implement on API endpoints to prevent abuse
7. **Data Validation:** Validate all user input on client and server
8. **SQL Injection:** Use parameterized queries (Supabase handles this)

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Supabase connection failing:**
- Verify URL and keys in `.env.local`
- Check Supabase project status in dashboard
- Ensure IP is not blocked by firewall

**Paystack payments not working:**
- Verify keys are correct (test vs. live)
- Check Paystack webhook logs
- Ensure webhook secret matches
- Verify webhook URL is publicly accessible

**Resend emails not sending:**
- Verify API key is correct
- Check domain verification status
- Review Resend dashboard for bounces/errors
- Check spam folders for test emails

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Support & Contribution

For issues, questions, or contributions:
1. Check the FAQ page at `/faq`
2. Contact support via `/contact` form
3. Check GitHub issues for known problems
4. Submit pull requests for improvements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Last Updated:** March 2026

For the latest updates and documentation, visit the project repository.
