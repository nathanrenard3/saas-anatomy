# Journal de décisions — SaaS Anatomy

> Chaque décision importante est documentée ici avec son contexte.

---

### [2025-02-16] Modèle : outil-first, média en acquisition

**Contexte :** SaaS Anatomy est né comme un projet de média (interviews de founders). L'analyseur de landing page a été ajouté comme outil gratuit d'acquisition. Il fallait décider si le business repose sur le média ou l'outil.

**Options considérées :**
1. Média-first — l'outil reste gratuit, le revenu vient du sponsoring/communauté/formations
2. Outil-first — le média est du content marketing, le revenu vient des abonnements à la plateforme
3. Hybride — les deux génèrent du revenu indépendamment

**Décision :** Outil-first, comme Finary. Le produit c'est la suite d'outils (SaaS payant). Le média (blog, interviews) éduque l'audience et amène vers les outils.

**Raison :** Modèle éprouvé (Finary, Ahrefs, Semrush). Le média crée la confiance, l'outil monétise. Plus scalable qu'un média seul.

---

### [2025-02-16] Vision produit : radiographie externe des SaaS sur 4 leviers

**Contexte :** La headline du site promet "Analyse les SaaS qui rapportent vraiment de l'argent". L'analyseur de landing page ne couvre qu'une fraction de cette promesse. Il fallait définir le scope complet.

**Décision :** 4 outils, un par levier de revenu SaaS :
1. **Conversion** → Analyseur Landing Page (existe)
2. **Monétisation** → Analyseur Pricing Page
3. **Acquisition** → Analyseur Stratégie de Contenu
4. **Rétention** → Analyseur Satisfaction Client (avis publics)

**Principes :**
- Chaque outil : input simple → scrape → IA → rapport actionnable
- Chaque outil fonctionne sur soi-même ET sur un concurrent
- Vue comparative intégrée (toi vs concurrent)
- Tout se fait depuis l'extérieur, sans accès aux données internes

**Raison :** Cohérent avec la promesse du site. 4 outils suffisent pour couvrir les leviers clés sans devenir une plateforme complexe. Le pipeline technique (scrape + GPT-4O) est le même pour tous.

---

### [2025-02-16] Rétention : avis publics plutôt qu'emails d'onboarding

**Contexte :** On cherchait un outil de rétention. L'analyse d'emails d'onboarding a été envisagée puis écartée.

**Options considérées :**
1. Analyseur d'emails d'onboarding — l'utilisateur colle ses emails, on analyse la séquence
2. Analyseur de satisfaction client — on scrape les avis publics (G2, Capterra, Product Hunt)

**Décision :** Analyseur de satisfaction client via avis publics.

**Raison :** Les emails d'onboarding nécessitent une saisie manuelle (friction), la qualité de l'input est variable, et c'est techniquement moins fiable. Les avis publics sont scrapables automatiquement, reflètent directement la rétention (pourquoi les gens restent/partent), et suivent le même pipeline que les autres outils.

---

### [2025-02-16] V1 : améliorer l'analyseur existant avant de construire de nouveaux outils

**Contexte :** On a 4 outils dans la vision long terme. La question était : par quoi commencer ? Construire un nouvel outil ou améliorer l'existant ?

**Décision :** Améliorer l'analyseur de landing page pour en faire la feature clé de la V1 du SaaS. Les 3 autres outils viendront en V2.

**4 améliorations V1 :**
1. Recommandations vraiment pertinentes (pas de conseils génériques)
2. Concurrents mémorisés (persistance des URLs concurrentes)
3. Vue comparative critère par critère (toi vs concurrent)
4. Ré-analyse en background (auto + refresh manuel 2-3/jour, historique d'évolution)

**Raison :** L'outil existe et est validé. L'améliorer est plus rapide et plus sûr que de construire un nouvel outil from scratch. Ces 4 améliorations transforment un outil one-shot en feature récurrente qui justifie un abonnement.

**Détails :** [04-v1-analyseur.md](04-v1-analyseur.md)

---

### [2025-02-16] Décisions V1 : auth, concurrents, ré-analyse, comparaison

**Contexte :** Questions ouvertes à trancher avant de prototyper/coder la V1.

**Décisions :**

1. **Auth : email + mot de passe.** Pas d'OAuth, pas de Google, pas de magic link. Simple et direct.

2. **Concurrents par plan :**
   - Gratuit : 1 concurrent
   - Pro : 3-4 concurrents
   - Ultra : jusqu'à 10 concurrents

3. **Ré-analyse automatique : hebdomadaire.** Toutes les URLs (ta page + tes concurrents) sont ré-analysées 1x/semaine. Coûts maîtrisables.

4. **Vue comparative :**
   - Gratuite : comparaison 1v1 (toi vs ton unique concurrent)
   - Payante : vue multi-comparative (toi vs tous tes concurrents d'un coup) — accessible de fait seulement aux plans avec plusieurs concurrents

5. **Suppression du grade A-F.** On garde uniquement le score /100 (global) et /10 (par critère). Le grade a été supprimé du code le 2025-02-16.

**Raison :** Le modèle freemium crée un tunnel clair : gratuit (1 concurrent, vue 1v1) → Pro (3-4 concurrents, vue multi) → Ultra (10 concurrents). L'upsell est naturel : plus tu veux comparer, plus tu paies.

---

*Prochaines décisions à prendre :*
- Prix exacts des plans Pro et Ultra
- Limites de refresh manuel par plan
- Durée d'historique par plan (30j gratuit vs illimité payant ?)
