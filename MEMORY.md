# Memory — My Pleasure LTD (MP Wellness)

> **STANDING RULE: NEVER delete anything from this file. Only append or update entries. History must be preserved.**

## Owner
**Stanley** (codedcrystal@gmail.com) — Founder & sole operator of My Pleasure LTD, a premium adult wellness e-commerce brand based in Lagos, Nigeria.
- GitHub: Miztah-Diamond
- Vercel team: techzoid

## Project
| Field | Value |
|-------|-------|
| **Name** | My Pleasure LTD / MP Wellness |
| **Repo** | https://github.com/Miztah-Diamond/mypleasure.git |
| **Live URL** | https://mypleasure.vercel.app |
| **Stack** | Next.js 15, TypeScript, Tailwind CSS v4, Neon (Postgres), Clerk (Auth), Paystack, Resend |
| **Hosting** | Vercel (team: techzoid) |
| **Design** | "Refined Sensuality" — wine/plum/gold palette, Playfair Display + DM Sans |

## Key Decisions
| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-26 | Chose Next.js 15 App Router | User spec — SSR + modern React |
| 2026-03-26 | Started with Supabase | Initial spec required it |
| 2026-03-26 | Switched Supabase → Neon + Clerk | User requested alternative; Neon keeps existing Postgres schema intact, Clerk provides better Next.js auth DX |
| 2026-03-26 | Used --legacy-peer-deps | react-paystack peer conflict with React 19 |
| 2026-03-26 | Lazy-init Resend client | Prevents build-time crash when RESEND_API_KEY isn't set |
| 2026-03-26 | Mock data fallback pattern | Site works without DB connection for development/preview |
| 2026-03-26 | Chose Vercel Blob for images | Native Vercel integration, no extra config, CDN-backed, generous free tier |
| 2026-03-26 | Replaced react-paystack with @paystack/inline-js | Better React 19 compatibility, no peer dep issues |
| 2026-03-26 | Admin APIs under /api/admin/* | Separate admin endpoints from public API for future auth middleware |

## Terms
| Term | Meaning |
|------|---------|
| MP Wellness | Discreet billing/brand name for My Pleasure LTD |
| kobo | NGN subunit (₦1 = 100 kobo); all prices stored in kobo |
| wine | Brand primary color #1E1218 |
| plum | Brand secondary #3D2232 |
| gold | Brand accent #C4956A |

## Tech Stack Details
| Component | Technology | Notes |
|-----------|-----------|-------|
| Database | Neon (serverless Postgres) | Drop-in Postgres, same schema as original |
| Auth | Clerk | Admin dashboard protection |
| Payments | Paystack | Nigeria's #1 gateway; billing as "MP Wellness" |
| Email | Resend | Transactional emails (order confirm, status updates) |
| State | Zustand + persist | Cart management |
| Forms | React Hook Form + Zod | Checkout validation |
| Charts | Recharts | Admin dashboard revenue charts |
| UI | shadcn/ui + CVA | Custom themed components |
| Images | Vercel Blob | Implemented — upload API + ImageUploader component |

## Active Files (Hot Reference)
| Path | What |
|------|------|
| lib/db.ts | Neon database client |
| lib/data.ts | Product data queries with mock fallback |
| lib/email.ts | Resend email (lazy-init pattern) |
| lib/paystack.ts | Paystack verification |
| store/cart.ts | Zustand cart store |
| app/api/upload/route.ts | Vercel Blob image upload (POST/DELETE) |
| app/api/products/route.ts | Product CRUD list/create (GET/POST) |
| app/api/products/[id]/route.ts | Product CRUD read/update/delete (GET/PUT/DELETE) |
| components/admin/ImageUploader.tsx | Drag-drop image uploader with reorder |
| scripts/schema.sql | PostgreSQL schema |
| scripts/seed.ts | 32-product seed script |

## Preferences (Stanley)
- Build first, add API keys later
- Use Claude in Chrome when needed — full permission granted
- Document everything using documentation skill
- Memory file: never delete, only append/update
- Production-grade code with proper error handling

## Progress Log
| Date | What Happened |
|------|---------------|
| 2026-03-26 | Full project scaffolded: 77 files, 25+ pages, admin dashboard |
| 2026-03-26 | Build succeeded locally |
| 2026-03-26 | Pushed to GitHub (main branch) |
| 2026-03-26 | Fixed Vercel deploy: .npmrc + lazy Resend init |
| 2026-03-26 | Site live at mypleasure.vercel.app |
| 2026-03-26 | Started migration: Supabase → Neon + Clerk |
| 2026-03-26 | Migration complete: removed @supabase/ssr, @supabase/supabase-js; added @neondatabase/serverless, @clerk/nextjs |
| 2026-03-26 | Created Clerk middleware for /admin route protection |
| 2026-03-26 | Updated all API routes (orders, webhooks) to Neon SQL |
| 2026-03-26 | Updated seed script for Neon |
| 2026-03-26 | Build verified — all 25+ routes compiled |
| 2026-03-26 | Pushed to GitHub and Vercel deployed successfully |
| 2026-03-26 | Created MEMORY.md, docs/DECISIONS.md, memory/ directory |
| 2026-03-26 | Fixed MIDDLEWARE_INVOCATION_FAILED — Clerk components now gracefully degrade without keys |
| 2026-03-26 | Added dynamic imports for all Clerk components (SignIn, UserButton) to prevent SSR crashes |
| 2026-03-26 | **Task 1: Product Image System** — installed @vercel/blob, created /api/upload (POST/DELETE), ImageUploader component with drag-drop + reorder |
| 2026-03-26 | Created full Product CRUD API: /api/products (GET/POST), /api/products/[id] (GET/PUT/DELETE) |
| 2026-03-26 | Rewrote admin products: list page fetches from API, new/edit pages use ImageUploader + real API saves |
| 2026-03-26 | Updated next.config.ts with Vercel Blob remote pattern (*.public.blob.vercel-storage.com) |
| 2026-03-26 | Added BLOB_READ_WRITE_TOKEN to .env.example |
| 2026-03-26 | **Task 2: Admin Dashboard Polish** — real-time metrics API, order management APIs, settings CRUD API |
| 2026-03-26 | Dashboard now shows live data: today's orders/revenue, product count, pending orders, weekly revenue chart |
| 2026-03-26 | Orders page: API-driven with status filters, search, CSV export |
| 2026-03-26 | Order detail page: loads real data, status updates via API |
| 2026-03-26 | Settings page: loads/saves to DB with upsert pattern |
| 2026-03-26 | **Task 3: Complete Order Flow** — replaced react-paystack with @paystack/inline-js |
| 2026-03-26 | Checkout now creates real orders via /api/orders after Paystack payment |
| 2026-03-26 | Graceful fallback to test mode when Paystack keys not configured |
| 2026-03-26 | **Task 4: UX Polish** — search overlay with live product search, quick suggestions |
| 2026-03-26 | Created /api/search route with ILIKE text search |
| 2026-03-26 | Header search icon opens SearchOverlay instead of linking to /shop |
| 2026-03-26 | **Task 5: SEO & Performance** — dynamic sitemap with product pages, JSON-LD structured data |
| 2026-03-26 | Enhanced root layout metadata: metadataBase, Twitter card, googleBot directives |
| 2026-03-26 | All 6 continuation tasks completed — site is production-ready pending API key config |
| 2026-03-26 | Neon DATABASE_URL received and saved to .env.local — schema needs to be run via Neon SQL Editor |
| 2026-03-27 | **Database schema deployed** — Injected schema.sql into Neon SQL Editor via browser automation (CodeMirror execCommand approach) |
| 2026-03-27 | **32 products seeded** — Generated SQL INSERTs from seed.ts, split into 8 base64 chunks, injected into Neon SQL Editor (women: 16, men: 10, couples: 4, accessories: 2) |
| 2026-03-27 | **All env vars added to Vercel** (8 total): DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_SIGN_IN_URL, NEXT_PUBLIC_CLERK_SIGN_UP_URL, NEXT_PUBLIC_SITE_URL, ADMIN_EMAIL, BLOB_READ_WRITE_TOKEN |
| 2026-03-27 | **Clerk sign-in/sign-up pages created** — Added `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` using Clerk's built-in components with brand-matching styles |
| 2026-03-27 | **Stanley signed up as first Clerk user** (username: 001, email: codedcrystal@gmail.com) |
| 2026-03-27 | **Vercel Blob store created** — Name: mypleasure-images, Region: Frankfurt (fra1, closest to Lagos), BLOB_READ_WRITE_TOKEN auto-added by Vercel |
| 2026-03-27 | **Site fully live with real data** — Homepage loads products from Neon, shop shows all 32 products with ₦ prices, sign-in/sign-up working, admin dashboard accessible |
| 2026-03-27 | **Multiple successful Vercel deployments** — All builds passing, no errors |
| 2026-03-27 | **Product images added** — Sourced 32 free-to-use images from Pexels, updated all products in Neon DB |
| 2026-03-27 | **Fixed 5 broken Pexels image IDs** — Replaced invalid photo IDs (11667789, 5187255, 6763674, 5187485, 6768982) with working alternatives from Pexels beauty/wellness search |
| 2026-03-27 | **All 32/32 product images verified** — Every product image loads correctly on live shop page |
| 2026-03-27 | **Added images.pexels.com to next.config.ts remotePatterns** — Required for Next.js Image component to optimize external Pexels images |
| 2026-03-27 | **Sign-in/sign-out added to customer header** — User icon links to /sign-in; Clerk UserButton replaces it when signed in; mobile menu has Account section with Sign In/Sign Out |
| 2026-03-27 | **Smart inventory management deployed** — Stock decrements on purchase, out-of-stock overlay on product cards, disabled add-to-cart when stock=0, qty capped at stock level, checkout validates stock before order creation (409 if OOS) |

## Key Decisions (continued)
| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-27 | Blob store region: Frankfurt (fra1) | Closest Vercel Blob region to Lagos, Nigeria for lowest latency |
| 2026-03-27 | Clerk in development mode for now | Fine for building/testing; switch to production instance before real customer launch |
| 2026-03-27 | Bulk .env paste for Vercel env vars | Used Vercel's auto-parse feature — paste KEY=VALUE lines into key input, auto-creates multiple rows |
| 2026-03-27 | Pexels for product images | Free commercial use, no attribution required, high-quality stock photos |
| 2026-03-27 | Direct Pexels URLs (not Vercel Blob) for initial images | Faster setup; can migrate to Blob later when admin uploads real product photos |
| 2026-03-27 | Clerk v7 dynamic import pattern: `dynamic(() => import('@clerk/nextjs').then(mod => mod.Component))` | v7 removed SignedIn/SignedOut wrapper components; use `process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` check + DOM detection for auth state |
| 2026-03-27 | Stock validation at API level (409 response) | Prevents overselling even if client-side checks are bypassed |
| 2026-03-27 | `GREATEST(stock - qty, 0)` for stock decrement | Prevents negative stock values in database |

## Infrastructure Status (as of 2026-03-27)
| Service | Status | Notes |
|---------|--------|-------|
| Neon PostgreSQL | ✅ Live | Schema deployed, 32 products seeded, stock management active |
| Clerk Auth | ✅ Live (dev mode) | Sign-in/sign-up pages + header auth UI working, 1 user registered |
| Vercel Hosting | ✅ Live | mypleasure.vercel.app |
| Vercel Blob | ✅ Ready | mypleasure-images store (Frankfurt), token configured |
| Inventory System | ✅ Live | Auto-decrement on purchase, OOS display, qty caps, checkout validation |
| Paystack | ❌ Not configured | Need test keys from dashboard.paystack.com |
| Resend | ❌ Not configured | Need API key from resend.com |

## Active Files (updated)
| Path | What |
|------|------|
| app/sign-in/[[...sign-in]]/page.tsx | Clerk sign-in page |
| app/sign-up/[[...sign-up]]/page.tsx | Clerk sign-up page |
| components/layout/Header.tsx | Customer header with auth (Sign In icon / Clerk UserButton) |
| components/layout/MobileMenu.tsx | Mobile menu with Account section (Sign In / Sign Out) |
| components/products/ProductCard.tsx | Product card with out-of-stock overlay + disabled button |
| app/product/[slug]/ProductActions.tsx | Product detail actions with stock-aware qty selector + OOS alert |
| store/cart.ts | Zustand cart with stock-capped addItem/updateQuantity |
| components/cart/CartSidebar.tsx | Cart sidebar with stock-limited qty buttons |
| app/api/orders/route.ts | Order API with pre-order stock validation + post-order stock decrement |
| app/admin/page.tsx | Admin dashboard — metrics, revenue chart, recent orders |
| app/admin/products/page.tsx | Admin product list |
| app/admin/products/[id]/edit/page.tsx | Edit product (including stock field) |
| app/admin/orders/page.tsx | Order management |
| app/admin/settings/page.tsx | Store settings |

→ Full decision log: docs/DECISIONS.md
→ Full glossary: memory/glossary.md
→ Project details: memory/projects/mp-wellness.md
