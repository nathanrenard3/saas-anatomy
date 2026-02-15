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
- Middleware ([middleware.ts](middleware.ts)) handles locale routing; excludes `/api`, `/studio`, `/_next`
- Navigation helpers (`Link`, `redirect`, `useRouter`, etc.) are exported from [i18n/routing.ts](i18n/routing.ts) — use these instead of next/link or next/navigation
- Translation files: [messages/fr.json](messages/fr.json), [messages/en.json](messages/en.json)

### Directory Layout

- `app/[locale]/` — locale-scoped pages (home, blog, tools, legal)
- `app/api/` — API routes (not locale-scoped)
- `app/studio/` — Sanity Studio (not locale-scoped)
- `feature/` — page-level/feature components organized by domain (Marketing/, tools/analyzer/, blog/)
- `components/ui/` — shadcn/ui primitives (new-york style, Tailwind v4)
- `components/magicui/` — animation/effect components
- `lib/` — utilities, DB, analyzer logic
- `sanity/` — Sanity CMS config, client, schema types
- `content/legal/` — static markdown legal pages per locale

### Data Layer

- **PostgreSQL** (Neon serverless) via **Drizzle ORM** — schema in [lib/db/schema.ts](lib/db/schema.ts)
  - `leads` table: email subscribers
  - `analyses` table: stored analysis results with IP-based rate limiting
- **Sanity CMS** for blog posts — project ID `69k5xmfa`, dataset `production`
  - Schema in [sanity/schemaTypes/](sanity/schemaTypes/) (currently only `post` type)
  - Blog posts have a `language` field (`fr`/`en`) for locale filtering
  - Client setup in [sanity/lib/client.ts](sanity/lib/client.ts)

### AI Analyzer Pipeline

The landing page analyzer ([lib/analyzer/](lib/analyzer/)) works as:
1. **Scrape** URL with Cheerio ([scraper.ts](lib/analyzer/scraper.ts))
2. **Analyze** with OpenAI GPT-4O ([openai.ts](lib/analyzer/openai.ts), [prompt.ts](lib/analyzer/prompt.ts))
3. **Store** results in PostgreSQL ([storage.ts](lib/analyzer/storage.ts))
4. **Gate** full results behind email collection (3 free analyses/day per IP)
5. **Rewrite** suggestions for weak criteria ([rewrite-prompt.ts](lib/analyzer/rewrite-prompt.ts))

API routes: `POST /api/tools/analyze`, `/api/tools/analyze/unlock`, `/api/tools/analyze/rewrite`

### Key Patterns

- Analysis state machine: `idle → analyzing → complete | error` (see [lib/analyzer/types.ts](lib/analyzer/types.ts))
- Email validation uses Zod + disposable email domain blocking + honeypot fields ([lib/email-validation.ts](lib/email-validation.ts))
- Brevo API for newsletter/email ([lib/analyzer/brevo.ts](lib/analyzer/brevo.ts))
- `cn()` utility from [lib/utils.ts](lib/utils.ts) for merging Tailwind classes

## Environment Variables

See [.env.example](.env.example): `BREVO_API_KEY`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `OPENAI_API_KEY`, `DATABASE_URL`

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Drizzle ORM · Neon PostgreSQL · Sanity CMS · OpenAI · Brevo · next-intl · Framer Motion · MDX · pnpm
