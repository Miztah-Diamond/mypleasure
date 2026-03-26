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
| Images | Uploadthing or Vercel Blob | Pending — product image uploads |

## Active Files (Hot Reference)
| Path | What |
|------|------|
| lib/db.ts | Neon database client |
| lib/data.ts | Product data queries with mock fallback |
| lib/email.ts | Resend email (lazy-init pattern) |
| lib/paystack.ts | Paystack verification |
| store/cart.ts | Zustand cart store |
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

→ Full decision log: docs/DECISIONS.md
→ Full glossary: memory/glossary.md
→ Project details: memory/projects/mp-wellness.md
