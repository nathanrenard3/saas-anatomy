# Outils — SaaS Anatomy

> Dernière mise à jour : 2025-02-16

## Les 4 outils validés

Chaque outil couvre un levier du revenu SaaS. Même logique : input simple → scrape → analyse IA → rapport actionnable. Chaque outil fonctionne sur ton SaaS ET sur un concurrent, avec vue comparative.

---

### 1. Analyseur Landing Page (Conversion) ✅ LIVE

**Statut :** En production, validé, utilisé

**Input :** URL d'une landing page
**Output :** Score 0-100, grade A-F, rapport sur 10 critères copywriting

**Critères analysés :**
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

**Stack :** Cheerio + Playwright (scraping) → GPT-4O (analyse) → PostgreSQL (stockage)

---

### 2. Analyseur Pricing Page (Monétisation) — À construire

**Statut :** En conception

**Input :** URL d'une page pricing
**Output :** Rapport sur la structure et l'efficacité de la page de tarification

**Critères envisagés :**
- Clarté des tiers / plans (on comprend vite ce qui est inclus ?)
- Mise en avant du plan recommandé (ancrage, highlight)
- Psychologie de prix (terminaison, ancrage, comparaison)
- CTA et frictions (est-ce facile de passer à l'action ?)
- Transparence (prix cachés, "contactez-nous" vs prix affichés)
- Comparaison entre plans (tableau clair ?)
- Gestion du free tier / essai gratuit
- Social proof sur la page pricing
- FAQ / gestion des objections prix
- Positionnement par rapport au marché

**Faisabilité :** Haute — même pipeline technique que l'analyseur de landing page. On scrape la page pricing, on envoie à GPT-4O avec un prompt spécifique pricing.

**Valeur :** Très haute — chaque founder galère à pricer. Peu d'outils analysent ça.

---

### 3. Analyseur Stratégie de Contenu (Acquisition) — À construire

**Statut :** En conception

**Input :** Domaine d'un SaaS (ex: lemlist.com)
**Output :** Rapport sur la stratégie éditoriale / content marketing

**Ce qu'on analyse :**
- Présence d'un blog (oui/non, URL)
- Fréquence de publication (articles/mois)
- Volume total d'articles
- Types d'articles détectés (tutoriels, comparatifs X vs Y, études de cas, thought leadership, listes)
- Sujets dominants (catégories, tags, thèmes récurrents)
- Stratégie éditoriale déduite (acquisition SEO ? éducation ? conversion ?)
- Qualité des titres (longueur, keywords, structure)
- Présence de lead magnets (ebook, template, outil gratuit)
- Maillage interne (renvoie vers le produit ?)
- Call-to-action dans les articles

**Faisabilité :** Moyenne-haute — nécessite de scraper un blog (listing + articles individuels). Plus de pages à scraper que les autres outils. Cheerio devrait suffire pour la plupart des blogs.

**Valeur :** Haute — le content marketing est le canal #1 des SaaS bootstrappés. Voir comment les concurrents structurent leur contenu est immédiatement actionnable.

---

### 4. Analyseur Satisfaction Client (Rétention) — À construire

**Statut :** En conception

**Input :** Nom d'un SaaS (ex: "Notion", "Lemlist")
**Output :** Rapport de satisfaction basé sur les avis publics

**Sources scrapées :**
- G2
- Capterra
- Product Hunt
- Trustpilot (si pertinent)

**Ce qu'on analyse :**
- Score moyen et nombre d'avis par plateforme
- Tendance du sentiment (ça monte ? ça descend ?)
- Top raisons de satisfaction (ce que les gens adorent)
- Top raisons d'insatisfaction (ce qui fait partir)
- Points de friction récurrents (onboarding, support, prix, features manquantes)
- Comparaison entre plateformes (cohérence des retours)
- Score de rétention estimé (basé sur les patterns détectés)

**Faisabilité :** Moyenne — scraping de sites tiers (G2, Capterra) qui peuvent avoir des protections anti-bot. Peut nécessiter Playwright. Le volume d'avis varie selon le SaaS (les petits SaaS ont peu d'avis).

**Risques :**
- SaaS peu connus = peu d'avis = rapport pauvre
- Sites de reviews peuvent bloquer le scraping → prévoir des fallbacks
- Les avis peuvent être biaisés (faux avis positifs/négatifs)

**Valeur :** Haute — comprendre pourquoi les utilisateurs d'un concurrent restent ou partent est un avantage stratégique direct.

---

## Fonctionnalité transverse : Vue Comparative

**Appliquée à chaque outil.** Pas un outil séparé, c'est intégré.

**Flux :**
1. Analyse ton SaaS → rapport A
2. Analyse un concurrent → rapport B
3. Vue côte à côte : où tu gagnes, où tu perds, quelles actions prendre

**Faisabilité :** Haute — c'est de l'affichage et de la logique de comparaison, pas un nouveau pipeline d'analyse.

---

## Backlog d'idées (non priorisées)

Idées évoquées mais pas retenues pour la V1 :

| Idée | Pourquoi pas maintenant |
|------|------------------------|
| Suivi d'évolution dans le temps | Nécessite auth + dashboard + cron jobs. Phase 2. |
| Export PDF des rapports | Feature payante, pas critique pour valider les outils |
| Comparateur A/B landing pages | Couvert par la vue comparative |
| Copy rewriter complet | Existe déjà partiellement (suggestions de réécriture) |
| Audit SEO basique | Hors scope — trop d'outils existent déjà |
| Dashboard / Projets | Phase 2, après validation des 4 outils |
| Auth utilisateur | Phase 2, nécessaire avant dashboard |
| API publique | Phase 3, quand le produit est stable |
| Mode équipe | Phase 3 (plan Agence) |

---

*Document consolidé le 2025-02-16 après session de brainstorm.*
