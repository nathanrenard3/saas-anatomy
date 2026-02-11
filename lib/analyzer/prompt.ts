import type { ScrapedContent } from "./types";

export function buildAnalysisPrompt(scraped: ScrapedContent, url: string) {
  const systemPrompt = `Tu es un expert senior en optimisation de landing pages pour des entreprises SaaS.
Tu analyses les pages de destination en te concentrant sur la qualité du copywriting, pas le design visuel.

Tu reçois le contenu textuel extrait d'une landing page et tu dois l'évaluer selon exactement 10 critères.
Pour chaque critère, tu attribues un score de 1 à 10 et tu fournis une explication et une recommandation concrète.

Tes réponses sont toujours en français. Tu es direct, spécifique et actionable.
Ne sois pas complaisant — si la page est mauvaise, dis-le clairement avec des suggestions d'amélioration.

Réponds UNIQUEMENT avec un objet JSON valide selon le schéma fourni.`;

  const userMessage = `Voici le contenu extrait de la landing page : ${url}

TITRE: ${scraped.title || "(aucun)"}
META DESCRIPTION: ${scraped.metaDescription || "(aucune)"}
TITRES H1: ${scraped.h1.join(" | ") || "(aucun)"}
TITRES H2: ${scraped.h2.join(" | ") || "(aucun)"}
TITRES H3: ${scraped.h3.join(" | ") || "(aucun)"}
BOUTONS/CTA: ${scraped.ctaButtons.join(" | ") || "(aucun)"}
TEXTE DES LIENS: ${scraped.linkTexts.join(" | ") || "(aucun)"}
TÉMOIGNAGES DÉTECTÉS: ${scraped.hasTestimonials ? "Oui" : "Non"}
LOGOS CLIENTS DÉTECTÉS: ${scraped.hasLogos ? "Oui" : "Non"}
PAGE TARIFS DÉTECTÉE: ${scraped.hasPricing ? "Oui" : "Non"}
FAQ DÉTECTÉE: ${scraped.hasFAQ ? "Oui" : "Non"}
NOMBRE DE FORMULAIRES: ${scraped.formCount}
TEXTE ALT IMAGES: ${scraped.imageAltTexts.join(" | ") || "(aucun)"}

CONTENU PRINCIPAL:
${scraped.bodyText}

---

Analyse cette page selon les 10 critères suivants et réponds en JSON :

{
  "url": "${url}",
  "domain": "${new URL(url).hostname}",
  "score_global": <number 0-100>,
  "grade_global": <"A"|"B"|"C"|"D"|"F">,
  "resume": "<2-3 phrases de synthèse>",
  "criteres": [
    {
      "id": "clarte-5-secondes",
      "nom": "Clarté en 5 secondes",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "<2-3 phrases>",
      "recommandation": "<1-2 phrases actionables>",
      "elements_trouves": ["<élément spécifique trouvé ou manquant>"]
    },
    {
      "id": "audience-cible",
      "nom": "Audience cible identifiable",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "proposition-valeur",
      "nom": "Proposition de valeur",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "resultat-mesurable",
      "nom": "Résultat mesurable",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "appel-action",
      "nom": "Appel à l'action (CTA)",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "articulation-probleme",
      "nom": "Articulation du problème",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "preuve-sociale",
      "nom": "Preuve sociale",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "differenciation",
      "nom": "Différenciation",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "gestion-objections",
      "nom": "Gestion des objections",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    },
    {
      "id": "structure-lisibilite",
      "nom": "Structure et lisibilité",
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]
    }
  ],
  "points_forts": ["<force 1>", "<force 2>", "<force 3>"],
  "points_faibles": ["<faiblesse 1>", "<faiblesse 2>", "<faiblesse 3>"]
}

Les 10 critères dans l'ordre exact :
1. clarte-5-secondes — Le visiteur comprend-il le produit en 5 secondes ? Le heading principal est-il clair et spécifique ?
2. audience-cible — La cible est-elle clairement identifiée ? La page parle-t-elle à un persona spécifique ?
3. proposition-valeur — La proposition de valeur est-elle unique, spécifique et convaincante ? Va-t-elle au-delà des déclarations génériques ?
4. resultat-mesurable — La page promet-elle un résultat concret et quantifiable ? (ex: "Gagnez 10h/semaine" vs "Gagnez du temps")
5. appel-action — Les CTAs sont-ils clairs, visibles, orientés action et stratégiquement placés ?
6. articulation-probleme — La page décrit-elle clairement le problème ou la douleur avant de présenter la solution ?
7. preuve-sociale — Y a-t-il des témoignages, études de cas, logos, chiffres ou autres signaux de confiance ?
8. differenciation — La page explique-t-elle pourquoi cette solution est meilleure que les alternatives ?
9. gestion-objections — La page traite-t-elle les objections courantes (prix, complexité, migration, sécurité) ?
10. structure-lisibilite — Le contenu est-il bien organisé avec un flux logique ? Est-il scannable avec des sections claires ?`;

  return { systemPrompt, userMessage };
}
