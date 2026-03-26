# Decision Log — MP Wellness

> **STANDING RULE: NEVER delete entries. Only append new decisions. History must be preserved.**

Architecture Decision Records (ADRs) for the MP Wellness e-commerce platform.

---

## ADR-001: Next.js 15 with App Router
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Need a modern React framework for SSR, SEO, and API routes. User specified Next.js 15.
**Decision:** Use Next.js 15 App Router with TypeScript.
**Consequences:** Server Components by default, excellent SEO, API routes co-located, but requires careful client/server boundary management.

---

## ADR-002: Tailwind CSS v4 with @theme Directive
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Need a utility-first CSS framework that supports custom design tokens (wine, plum, gold palette).
**Decision:** Tailwind CSS v4 with `@theme` directive in globals.css for custom colors and fonts.
**Consequences:** Modern syntax, CSS-native custom properties, but requires `@tailwindcss/postcss` plugin.

---

## ADR-003: Initial Database Choice — Supabase
**Date:** 2026-03-26
**Status:** Superseded by ADR-006
**Context:** Needed a hosted PostgreSQL database with auth and storage.
**Decision:** Initially chose Supabase for database, auth, and file storage.
**Consequences:** Good DX, generous free tier, but added unnecessary complexity for this project's needs.

---

## ADR-004: Mock Data Fallback Pattern
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Site needs to work during development and preview without a live database connection.
**Decision:** All data functions in `lib/data.ts` try the database first, then fall back to hardcoded mock products.
**Consequences:** Site always renders with products, even without DB. 8 mock products cover development needs. Zero-downtime deploys.

---

## ADR-005: Lazy Initialization for External Clients
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Resend client threw "Missing API key" during Vercel's static page collection (build phase). The `new Resend()` constructor was evaluated at module import time.
**Decision:** Use lazy initialization pattern — defer client creation to first actual use via getter function.
**Consequences:** Build succeeds without API keys set. Runtime error only occurs when email is actually sent without key. Applied to Resend, should be pattern for all external service clients.

---

## ADR-006: Database Migration — Supabase → Neon
**Date:** 2026-03-26
**Status:** Accepted (supersedes ADR-003)
**Context:** User requested Supabase alternative. Evaluated Firebase, Neon, PlanetScale, Appwrite, Convex.
**Decision:** Migrate to Neon (serverless PostgreSQL) + Clerk (auth) + Uploadthing/Vercel Blob (storage).
**Rationale:**
- Neon is serverless Postgres — existing schema, seed script, and SQL all work unchanged
- Firebase would require complete schema rewrite (NoSQL)
- Clerk has best-in-class Next.js integration and generous free tier
- Neon free tier: 0.5 GB storage, 190 compute hours/month
**Consequences:**
- Replace `@supabase/ssr` and `@supabase/supabase-js` with `@neondatabase/serverless`
- Replace Supabase Auth with `@clerk/nextjs`
- All SQL queries remain identical (both are Postgres)
- Separate solutions needed for auth (Clerk) and file storage (Uploadthing/Vercel Blob)

---

## ADR-007: Paystack Payment Gateway
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Nigeria-based e-commerce needs local payment support (card, bank transfer, USSD).
**Decision:** Paystack inline checkout with HMAC SHA-512 webhook verification.
**Consequences:** Supports all Nigerian payment methods. Billing descriptor shows "MP Wellness" for discretion. Currently simulated in checkout — needs real keys to activate.

---

## ADR-008: Zustand for Cart State
**Date:** 2026-03-26
**Status:** Accepted
**Context:** Need client-side cart state that persists across page navigations.
**Decision:** Zustand with persist middleware (localStorage).
**Consequences:** Lightweight (~1KB), no context provider wrapping, cart survives page refreshes. Simple API for add/remove/update/clear.

---

## ADR-009: npm --legacy-peer-deps for Vercel
**Date:** 2026-03-26
**Status:** Accepted
**Context:** `react-paystack@6.0.0` has peer dependency on React 15-18, but project uses React 19.
**Decision:** Add `.npmrc` with `legacy-peer-deps=true` and override Vercel install command.
**Consequences:** npm ignores peer dependency conflicts. react-paystack works fine with React 19 at runtime despite the declared peer range.

---

## Task Log
| Date | Task | Status | Notes |
|------|------|--------|-------|
| 2026-03-26 | Project scaffold (77 files) | Done | All pages, components, API routes |
| 2026-03-26 | Local build verification | Done | All 25+ routes compiled |
| 2026-03-26 | Git init + push to GitHub | Done | main branch |
| 2026-03-26 | Fix Vercel deploy (peer deps) | Done | .npmrc + install command override |
| 2026-03-26 | Fix Vercel deploy (Resend crash) | Done | Lazy-init pattern |
| 2026-03-26 | Site live on Vercel | Done | mypleasure.vercel.app |
| 2026-03-26 | Migrate Supabase → Neon + Clerk | In Progress | Database + auth swap |
