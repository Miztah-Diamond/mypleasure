# Project: MP Wellness E-Commerce

**Repo:** https://github.com/Miztah-Diamond/mypleasure.git
**Live:** https://mypleasure.vercel.app
**Status:** Active — migrating to Neon + Clerk

## What It Is
Premium adult wellness e-commerce store for the Nigerian market. Built with Next.js 15, deployed on Vercel. Features 32 products across 4 categories, full checkout with Paystack, admin dashboard, order tracking, and transactional emails.

## Key People
- **Stanley** — Owner, sole operator, makes all decisions

## Architecture
- **Frontend:** Next.js 15 App Router, Tailwind v4, shadcn/ui
- **Database:** Neon (serverless Postgres) — migrated from Supabase
- **Auth:** Clerk — admin dashboard protection
- **Payments:** Paystack — Nigeria card/bank/USSD
- **Email:** Resend — transactional (order confirm, status updates)
- **State:** Zustand — cart persistence
- **Hosting:** Vercel (team: techzoid)

## Pages (25+)
Customer: Home, Shop, Product Detail, Cart, Checkout, Track Order, About, Contact, FAQ, Privacy, Shipping, Returns, Terms
Admin: Dashboard, Products, Products/New, Products/Edit, Orders, Orders/Detail, Settings, Login

## Brand Guidelines
- Colors: Wine #1E1218, Plum #3D2232, Gold #C4956A, Cream #FAF6F2
- Fonts: Playfair Display (headings), DM Sans (body)
- Tone: Luxury, discreet, body-positive
- Privacy: Age verification, "MP Wellness" billing, unmarked packaging
