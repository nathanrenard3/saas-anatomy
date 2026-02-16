# État des lieux — SaaS Anatomy

> Snapshot de ce qu'on a aujourd'hui, avant de décider la suite.

## Produit actuel

**SaaS Anatomy** (saas-anatomy.com) — Site marketing + blog + outil IA d'analyse de landing pages.

### Ce qui existe

| Élément | Status | Détails |
|---------|--------|---------|
| Landing page marketing | Live | Hero, sections valeur, blog, newsletter |
| Analyseur de landing pages | Live | Scraping + GPT-4O, 10 critères copywriting, score 0-100 |
| Blog bilingue | Live | Sanity CMS, articles FR/EN, Portable Text |
| Lead capture | Live | Email gating sur résultats complets, Brevo newsletter |
| SEO | Live | JSON-LD, OG images dynamiques, sitemap, ISR |

### L'outil validé : Analyseur de Landing Pages

**Ce qu'il fait :**
1. L'utilisateur entre une URL
2. On scrape la page (Cheerio + Playwright fallback pour SPA)
3. GPT-4O analyse le copywriting sur 10 critères
4. Score global + grade (A-F) + recommandations détaillées
5. Suggestions de réécriture pour les critères faibles (score < 7)

**Les 10 critères évalués :**
1. Clarté en 5 secondes
2. Audience cible identifiable
3. Proposition de valeur unique
4. Résultat mesurable
5. CTA clair et bien placé
6. Articulation du problème
7. Preuve sociale
8. Différenciation
9. Gestion des objections
10. Structure & lisibilité

**Modèle de monétisation actuel :**
- 3 analyses gratuites/jour par IP
- 4 premiers critères visibles gratuitement
- Déblocage complet = donner son email (lead capture)
- Pas de paiement

### Stack technique

- **Frontend :** Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, Framer Motion
- **Backend :** Next.js API routes, Edge Runtime (OG images)
- **DB :** PostgreSQL (Neon serverless) via Drizzle ORM
- **CMS :** Sanity (blog)
- **IA :** OpenAI GPT-4O (analyse + rewrites)
- **Scraping :** Cheerio + Playwright CDP
- **Email :** Brevo (newsletter + lead capture)
- **i18n :** next-intl (FR/EN)

### Données collectées

- **Leads :** email (via unlock ou newsletter)
- **Analyses :** URL, domaine, contenu scrappé, résultats IA, score, suggestions de réécriture, IP, date
- **Pas d'auth utilisateur** — identification par cookie email (httpOnly, 30j)

## Ce qu'on sait

- L'outil est utilisé (idée validée)
- Le lead capture fonctionne (les gens donnent leur email)
- Le blog attire du trafic
- Le stack est solide et extensible
- Pas de revenus encore — tout est gratuit

## Questions ouvertes

- Quel(s) nouvel(aux) outil(s) développer ?
- Faut-il un dashboard utilisateur ?
- Quel modèle de pricing ? Freemium ? Abonnement ?
- Comment capitaliser sur les leads existants ?
- Faut-il ajouter de l'auth (comptes utilisateur) ?
- Quelle direction : plus d'outils de copywriting ? SaaS analytics plus large ? Niche landing pages ?
