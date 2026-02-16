# V1 — Amélioration de l'Analyseur Landing Page

> Dernière mise à jour : 2025-02-16

## Contexte

L'analyseur de landing page existe et est validé (les gens l'utilisent). Avant de construire de nouveaux outils, on améliore celui qu'on a pour en faire la **feature clé de la V1 du SaaS**.

L'objectif : passer d'un outil gratuit one-shot à une feature qui justifie un abonnement.

## Ce qui existe aujourd'hui

- Input : URL → scrape (Cheerio + Playwright) → analyse GPT-4O → rapport
- 10 critères copywriting, score 0-100
- Suggestions de réécriture pour critères < 7/10
- Rate limit : 3 analyses/jour par IP
- Gating : 4 premiers critères gratuits, email requis pour le reste
- Rapport partageable avec OG image dynamique

## Les 4 améliorations V1

### 1. Concurrents mémorisés

**Quoi :** L'utilisateur entre l'URL d'un concurrent, elle est sauvegardée et associée à son compte/profil. Ses concurrents sont disponibles à tout moment pour la comparaison.

**Pourquoi :** C'est le socle de la vue comparative. Sans concurrents mémorisés, l'utilisateur doit re-entrer les URLs à chaque fois. La persistence crée aussi du lock-in — tes concurrents sont configurés, tu ne veux pas recommencer ailleurs.

**Détails :**
- L'utilisateur peut ajouter/supprimer des concurrents
- Chaque concurrent est analysé automatiquement à l'ajout
- Les analyses des concurrents sont stockées et mises à jour en background
- Limite selon le plan :
  - **Gratuit** : 1 concurrent
  - **Pro** : 3-4 concurrents
  - **Ultra** : jusqu'à 10 concurrents

**Implications techniques :**
- Auth email + mot de passe (pas d'OAuth/Google pour le moment)
- Nouvelle table DB pour les concurrents (user_id, competitor_url, dernière analyse)
- Ou extension de la table analyses avec un champ "competitor_of"

---

### 2. Vue comparative critère par critère

**Quoi :** Affichage côte à côte de deux analyses (la tienne vs un concurrent) sur chaque critère.

**Pourquoi :** C'est ce qui transforme un score absolu en un outil stratégique. "Tu es à 5/10 en CTA" c'est bien. "Tu es à 5/10, ton concurrent est à 8/10, voici ce qu'il fait mieux" c'est actionnable.

**Détails :**
- **Vue simple (gratuit)** : toi vs 1 concurrent, côte à côte, critère par critère
- **Vue multi-comparative (payant)** : toi vs tous tes concurrents d'un coup sur chaque critère
- Indicateurs visuels : tu gagnes (vert), tu perds (rouge), égalité (neutre)
- Résumé stratégique en haut : "Tu es meilleur sur X, Y. Il est meilleur sur Z. Priorité : améliorer Z."
- Les recommandations sont contextualisées par le concurrent : "Ton concurrent utilise des témoignages chiffrés, toi non. Ajoute des métriques à ta preuve sociale."

**Implications techniques :**
- Nouveau composant frontend de comparaison (simple + multi)
- Le prompt IA pourrait être enrichi : au lieu d'analyser une page seule, analyser dans le contexte d'un concurrent
- Ou plus simple : deux analyses indépendantes + une couche de comparaison IA par-dessus

---

### 3. Ré-analyse en background

**Quoi :** Les analyses se rafraîchissent automatiquement en background. L'utilisateur peut aussi forcer un refresh manuellement, limité à 2-3 fois par jour.

**Pourquoi :** Permet de suivre l'évolution sans action manuelle. Si l'utilisateur corrige son CTA, il voit l'impact au prochain refresh. Ça crée la boucle : analyser → corriger → constater le progrès.

**Détails :**
- **Ré-analyse automatique : 1x par semaine** (tous les concurrents + ta propre page)
- Refresh manuel : 2-3/jour max par utilisateur (anti-abus)
- Historique des scores conservé → courbe d'évolution
- Notification ou indicateur visuel quand un score a changé significativement
- Affichage du delta : "+5 pts depuis la dernière analyse" / "CTA passé de 5 à 7"

**Implications techniques :**
- Cron job hebdomadaire pour les ré-analyses automatiques
- Table d'historique des scores (ou versioning des analyses)
- Gestion des coûts API OpenAI (1 appel GPT-4O/semaine/URL — maîtrisable)
- Rate limiting sur le refresh manuel

---

### 4. Recommandations vraiment pertinentes

**Quoi :** Améliorer la profondeur et la spécificité des recommandations pour chaque critère.

**Pourquoi :** Aujourd'hui les recommandations donnent des idées générales mais manquent de pertinence. On veut du vrai actionnable : quoi changer, comment, avec des alternatives concrètes.

**Ce qu'on veut :**
- Recommandations spécifiques au contenu de la page (pas des conseils génériques)
- Alternatives concrètes : "Remplace [ton texte actuel] par [proposition 1] ou [proposition 2]"
- Quand un concurrent est configuré : "Ton concurrent fait ça → voici comment faire mieux"
- Priorisation : "Corrige ÇA en premier, c'est ce qui aura le plus d'impact"
- Exemples de SaaS qui font bien sur ce critère (optionnel, enrichit le côté éducatif)

**Détails techniques :**
- Amélioration du prompt système (plus de contexte, exemples, structure de sortie)
- Potentiellement un deuxième appel IA dédié aux recommandations (séparé du scoring)
- Intégration du contenu concurrent dans le prompt si disponible
- Le système de réécriture existant (rewrite-prompt.ts) pourrait être fusionné/amélioré

---

## Amélioration continue : qualité du scraping

Pas une feature visible mais un investissement technique continu :
- Meilleure extraction des éléments de la page (témoignages, pricing, formulaires)
- Meilleure gestion des SPA et des pages lentes
- Plus de données extraites = analyse IA plus riche
- Monitoring des échecs de scraping pour identifier les patterns problématiques

---

## Ordre de construction suggéré

1. **Recommandations pertinentes** — Amélioration du prompt, impact immédiat, pas de nouvelle infra
2. **Concurrents mémorisés** — Nécessite persistence, mais c'est le socle de tout le reste
3. **Vue comparative** — Dépend des concurrents mémorisés
4. **Ré-analyse en background** — Le plus complexe techniquement (cron, historique, coûts)

## Décisions prises

| Question | Décision |
|----------|----------|
| **Auth** | Email + mot de passe. Pas d'OAuth/Google pour le moment. |
| **Concurrents gratuit** | 1 concurrent |
| **Concurrents Pro** | 3-4 concurrents |
| **Concurrents Ultra** | Jusqu'à 10 concurrents |
| **Ré-analyse auto** | 1x par semaine |
| **Vue comparative** | Gratuite (1v1). Vue multi-comparative = payant (car nécessite plusieurs concurrents) |
| **Grade A-F** | Supprimé. On garde uniquement le score /100 et le score /10 par critère. |

## Plans tarifaires (draft)

| | Gratuit | Pro | Ultra |
|--|---------|-----|-------|
| Analyses | 3/jour | Illimitées | Illimitées |
| Concurrents | 1 | 3-4 | 10 |
| Vue comparative | 1v1 | Multi | Multi |
| Ré-analyse auto | Hebdo | Hebdo | Hebdo |
| Refresh manuel | 1/jour | 3/jour | 5/jour |
| Historique | 7 jours | 6 mois | 6 mois |

---

*Document créé le 2025-02-16. Mis à jour le 2025-02-16.*
