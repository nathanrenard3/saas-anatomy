# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaaS Anatomy (saas-anatomy.com) — a Next.js 16 app with an AI-powered landing page copywriting analyzer as the primary tool, plus a blog and marketing site. French is the default locale.

## Commands

```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm drizzle-kit generate   # Generate DB migrations
pnpm drizzle-kit migrate    # Run DB migrations
```

No test framework is configured.

## Architecture

### Routing & i18n

- **Next.js App Router** with `next-intl` for locale routing
- Locales: `fr` (default), `en` — prefix is always shown (`/fr/...`, `/en/...`)
- Middleware ([middleware.ts](middleware.ts)) handles locale routing; excludes `/api`, `/studio`, `/_next`, and static files
- Navigation helpers (`Link`, `redirect`, `useRouter`, `usePathname`, `getPathname`) are exported from [i18n/routing.ts](i18n/routing.ts) — **always use these instead of `next/link` or `next/navigation`**
- Translation files: [messages/fr.json](messages/fr.json), [messages/en.json](messages/en.json)
- i18n request config: [i18n/request.ts](i18n/request.ts) dynamically loads locale messages

### Directory Layout

- `app/[locale]/` — locale-scoped pages (home, blog, tools, legal, privacy)
- `app/api/` — API routes (not locale-scoped)
- `app/studio/` — Sanity Studio (not locale-scoped)
- `feature/` — page-level/feature components organized by domain (`Marketing/`, `tools/analyzer/`, `blog/`)
- `components/ui/` — shadcn/ui primitives (new-york style, Tailwind v4)
- `components/magicui/` — animation/effect components (blur-fade, particles, shimmer-button, etc.)
- `lib/` — utilities, DB, analyzer logic
- `sanity/` — Sanity CMS config, client, schema types
- `content/legal/` — static markdown legal pages per locale (`{locale}/{page}.md`)

### Data Layer

- **PostgreSQL** (Neon serverless) via **Drizzle ORM** — schema in [lib/db/schema.ts](lib/db/schema.ts)
  - `leads` table: email subscribers (UUID id, unique email)
  - `analyses` table: stored analysis results with IP-based rate limiting, `rewriteSuggestions` JSONB column for cached rewrites
  - Indexes: `idx_analyses_ip_created`, `idx_analyses_lead_id`
- **Sanity CMS** for blog posts — project ID `69k5xmfa`, dataset `production`
  - Schema in [sanity/schemaTypes/](sanity/schemaTypes/) (currently only `post` type)
  - Blog posts have a `language` field (`fr`/`en`) for locale filtering and a `translationGroup` string to link translated versions
  - Content uses Portable Text with custom blocks: image, codeBlock (with language syntax highlighting)
  - Custom Studio structure ([sanity/structure.ts](sanity/structure.ts)) with filtered views: Articles (FR), Articles (EN), All Articles
  - Client setup in [sanity/lib/client.ts](sanity/lib/client.ts) with `useCdn: true`

### AI Analyzer Pipeline

The landing page analyzer ([lib/analyzer/](lib/analyzer/)) works as:
1. **Scrape** URL with dual strategy: Cheerio first (fast path), Playwright CDP fallback for SPAs when body text < 50 chars ([scraper.ts](lib/analyzer/scraper.ts))
2. **Analyze** with OpenAI GPT-4O in JSON mode, temperature 0.3 ([openai.ts](lib/analyzer/openai.ts), [prompt.ts](lib/analyzer/prompt.ts))
3. **Store** results in PostgreSQL ([storage.ts](lib/analyzer/storage.ts))
4. **Gate** full results behind email collection — 3 free analyses/day per IP, `ADMIN_EMAIL` bypasses limit
5. **Rewrite** suggestions for criteria with score < 7 ([rewrite-prompt.ts](lib/analyzer/rewrite-prompt.ts)), cached in DB

The analyzer evaluates 10 criteria: 5-second clarity, target audience, value proposition, measurable outcome, CTA, problem articulation, social proof, differentiation, objection handling, structure & readability.

API routes: `POST /api/tools/analyze`, `/api/tools/analyze/unlock`, `/api/tools/analyze/rewrite`

### Authentication & Gating

- No user auth — lead identification uses `lead_email` httpOnly cookie (30 days)
- Unlock flow: user submits email → honeypot + disposable email validation → Brevo subscription (list ID 3) → cookie set → full results unlocked
- Rate limiting: IP-based, 3 analyses/day, counted via DB temporal query

### SEO & Integrations

- JSON-LD structured data (Organization, Article, Breadcrumb, FAQ) via [components/json-ld.tsx](components/json-ld.tsx)
- Dynamic OG images for analysis reports (`app/[locale]/tools/landing-page-analyzer/report/[id]/og/route.tsx`, Edge runtime)
- Blog ISR: 24h revalidation, `generateStaticParams()` for both locales
- Sitemap ([app/sitemap.ts](app/sitemap.ts)): static routes + dynamic blog posts from Sanity
- Google Analytics 4, Web Vitals reporting, Crisp Chat widget

### Key Patterns

- Analysis state machine: `idle → analyzing → complete | error` (see [lib/analyzer/types.ts](lib/analyzer/types.ts))
- Email validation uses Zod + disposable email domain blocking + honeypot fields ([lib/email-validation.ts](lib/email-validation.ts))
- Brevo API for newsletter/email ([lib/analyzer/brevo.ts](lib/analyzer/brevo.ts))
- `cn()` utility from [lib/utils.ts](lib/utils.ts) for merging Tailwind classes
- Portable Text rendering with custom components in [components/portable-text-content.tsx](components/portable-text-content.tsx)
- Blog queries in [lib/blog.ts](lib/blog.ts) use GROQ with `published == true` filter
- Scraper blocks private IPs (localhost, 10.x, 192.168.x, 172.16-31.x) and validates protocol

## Environment Variables

See [.env.example](.env.example):
- `BREVO_API_KEY` — Newsletter API
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — Sanity CMS
- `OPENAI_API_KEY` — GPT-4O for analysis
- `DATABASE_URL` — Neon Postgres connection string
- `ADMIN_EMAIL` — (optional) bypasses rate limiting
- `BROWSER_WS_ENDPOINT` — (optional) Playwright CDP endpoint for SPA scraping fallback

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Drizzle ORM · Neon PostgreSQL · Sanity CMS · OpenAI · Brevo · next-intl · Framer Motion · MDX · pnpm
