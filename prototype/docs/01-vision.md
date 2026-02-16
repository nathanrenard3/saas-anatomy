# Vision Produit — SaaS Anatomy

> Dernière mise à jour : 2025-02-16

## L'origine

SaaS Anatomy est né comme un **média** : interviewer des founders SaaS sur comment ils ont scalé, validé leur marché, structuré leur équipe. L'analyseur de landing page est arrivé comme **outil gratuit d'acquisition** pour construire la communauté.

Le modèle de référence : **Finary** — l'outil (dashboard patrimoine) est le produit et le revenu, le média (YouTube, podcast) éduque et amène l'audience vers l'outil.

## La promesse

> **"Analyse les SaaS qui rapportent vraiment de l'argent."**

SaaS Anatomy aide les founders à comprendre **ce qui fait qu'un SaaS génère du revenu** — et à appliquer ces stratégies à leur propre produit.

## La vision

### Le concept : la radiographie externe des SaaS

SaaS Anatomy est une **boîte à outils qui radiographie les SaaS depuis l'extérieur**. Pas besoin d'accès interne, pas besoin de Google Analytics. On analyse ce qui est publiquement visible pour en déduire la stratégie.

L'utilisateur entre une URL — la sienne OU celle d'un concurrent — et obtient un rapport actionnable. **Chaque outil est un miroir** : tu t'analyses toi-même, tu analyses ton concurrent, tu compares côte à côte. C'est la comparaison qui crée la stratégie.

### Les 4 leviers du revenu SaaS

Chaque levier a UN outil dédié. Pas de plateforme complexe, pas de métriques incompréhensibles. Un input simple → scrape → analyse IA → rapport clair.

| Levier | Outil | Input | Ce qu'il analyse |
|--------|-------|-------|-----------------|
| **Conversion** | Analyseur Landing Page | URL | Copywriting sur 10 critères : clarté, CTA, preuve sociale, proposition de valeur, etc. |
| **Monétisation** | Analyseur Pricing Page | URL page pricing | Clarté des tiers, psychologie de prix, CTA, comparaison, frictions, positionnement |
| **Acquisition** | Analyseur Stratégie de Contenu | Domaine | Fréquence de publication, types d'articles, sujets dominants, stratégie éditoriale |
| **Rétention** | Analyseur Satisfaction Client | Nom du SaaS | Avis publics (G2, Capterra, Product Hunt) : sentiment, raisons de rester/partir, frictions |

### Le mécanisme central : Toi vs Concurrent

Chaque outil fonctionne en 3 temps :
1. **Analyse-toi** — entre ton URL / ton SaaS, obtiens ton rapport
2. **Analyse ton concurrent** — même outil, même grille, rapport identique
3. **Compare** — côte à côte, vois où tu es meilleur, où il est meilleur, déduis ta stratégie

Ce n'est pas un module "concurrents" séparé. C'est le même outil utilisé deux fois, avec une vue comparative.

### Le rôle du média

Le média (blog, interviews de founders, contenu éducatif) est le **moteur d'acquisition et d'éducation** :
- Il attire l'audience (SEO, réseaux sociaux)
- Il éduque sur les problématiques (acquisition, conversion, rétention, pricing)
- Il crée la confiance et pousse vers les outils
- Les données des outils nourrissent le contenu ("on a analysé 500 landing pages SaaS, voici ce qu'on a trouvé")

## Roadmap

### V1 — Améliorer l'analyseur existant pour en faire la feature clé du SaaS

Avant de construire de nouveaux outils, on rend l'analyseur de landing page suffisamment bon pour justifier un abonnement. Détails dans [04-v1-analyseur.md](04-v1-analyseur.md).

1. **Recommandations pertinentes** — Passer de conseils génériques à du vrai actionnable contextualisé
2. **Concurrents mémorisés** — Sauvegarder les URLs concurrentes, analysées automatiquement
3. **Vue comparative** — Toi vs concurrent, critère par critère, côte à côte
4. **Ré-analyse en background** — Refresh auto + manuel (2-3/jour), historique d'évolution

### V2 — Nouveaux outils (un par levier)

Une fois la V1 validée, on ajoute les 3 autres outils. Détails dans [02-idees-outils.md](02-idees-outils.md).

- [ ] Analyseur Pricing Page (monétisation)
- [ ] Analyseur Stratégie de Contenu (acquisition)
- [ ] Analyseur Satisfaction Client (rétention)

### V3 — Plateforme

- [ ] Dashboard / Projets
- [ ] Auth utilisateur
- [ ] Modèle payant

## Principes directeurs

1. **Simple > Complet** — Chaque outil fait UNE chose bien, avec un rapport lisible
2. **Externe > Interne** — On analyse ce qui est public, pas besoin d'accès aux données internes
3. **Actionnable > Informatif** — Pas juste des scores, des recommandations concrètes
4. **Comparatif > Absolu** — La valeur vient de la comparaison toi vs concurrent
5. **Même pipeline** — Chaque outil suit : input simple → scrape → IA → rapport

---

*Document consolidé le 2025-02-16 après session de brainstorm.*
