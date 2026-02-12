import type { ScrapedContent, CriterionResult } from "./types";

export const REWRITE_THRESHOLD = 7;

const CRITERION_ELEMENT_MAP: Record<
  string,
  (scraped: ScrapedContent) => string
> = {
  "clarte-5-secondes": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nTitre: ${s.title || "(aucun)"}\nMeta description: ${s.metaDescription || "(aucune)"}`,
  "audience-cible": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nMeta description: ${s.metaDescription || "(aucune)"}`,
  "proposition-valeur": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nDébut du contenu: ${s.bodyText.slice(0, 500)}`,
  "resultat-mesurable": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nCTA: ${s.ctaButtons.join(" | ") || "(aucun)"}`,
  "appel-action": (s) =>
    `CTA/Boutons: ${s.ctaButtons.join(" | ") || "(aucun)"}\nLiens principaux: ${s.linkTexts.slice(0, 10).join(" | ") || "(aucun)"}`,
  "articulation-probleme": (s) =>
    `H2: ${s.h2.join(" | ") || "(aucun)"}\nH3: ${s.h3.join(" | ") || "(aucun)"}\nDébut du contenu: ${s.bodyText.slice(0, 800)}`,
  "preuve-sociale": (s) =>
    `Témoignages détectés: ${s.hasTestimonials ? "Oui" : "Non"}\nLogos clients détectés: ${s.hasLogos ? "Oui" : "Non"}\nH2/H3: ${s.h2.concat(s.h3).join(" | ") || "(aucun)"}`,
  "differenciation": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nDébut du contenu: ${s.bodyText.slice(0, 600)}`,
  "gestion-objections": (s) =>
    `FAQ détectée: ${s.hasFAQ ? "Oui" : "Non"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nH3: ${s.h3.join(" | ") || "(aucun)"}`,
  "structure-lisibilite": (s) =>
    `H1: ${s.h1.join(" | ") || "(aucun)"}\nH2: ${s.h2.join(" | ") || "(aucun)"}\nH3: ${s.h3.join(" | ") || "(aucun)"}\nCTA: ${s.ctaButtons.join(" | ") || "(aucun)"}`,
};

export function getWeakCriteria(
  criteres: CriterionResult[]
): CriterionResult[] {
  return criteres.filter((c) => c.score < REWRITE_THRESHOLD);
}

export function buildRewritePrompt(
  weakCriteria: CriterionResult[],
  scraped: ScrapedContent,
  url: string
) {
  const systemPrompt = `Tu es un expert senior en copywriting SaaS.
On te donne des critères d'analyse qui ont reçu un score faible (< 7/10) pour une landing page.
Pour chaque critère faible, tu dois proposer 1 à 3 suggestions de réécriture concrètes.

Chaque suggestion DOIT contenir :
- element_type : le type d'élément concerné ("heading", "cta", "value_proposition", "section", "meta_description", "subheading")
- before : le TEXTE EXACT actuel trouvé sur la page (copie exacte, pas de paraphrase)
- after : ta version réécrite, plus percutante et orientée conversion
- justification : une phrase expliquant pourquoi ce changement améliore le critère

Règles :
- Utilise les données RÉELLES de la page fournies. Ne fabrique pas de contenu "before" — cite le texte existant.
- Si un élément manque complètement (ex: pas de CTA), mets before: "(absent)" et propose un texte complet.
- Sois spécifique au business/produit de la page, pas générique.
- Maximum 3 suggestions par critère, minimum 1.
- Réponds UNIQUEMENT avec un objet JSON valide selon le schéma fourni.
- Tes réponses sont en français.`;

  const criteriaBlock = weakCriteria
    .map((c) => {
      const elements = CRITERION_ELEMENT_MAP[c.id]?.(scraped) || "";
      return `--- Critère id="${c.id}" : ${c.nom} (score: ${c.score}/10) ---
Explication: ${c.explication}
Recommandation: ${c.recommandation}
Éléments de la page:
${elements}`;
    })
    .join("\n\n");

  const validIds = weakCriteria.map((c) => `"${c.id}"`).join(", ");

  const userMessage = `Page analysée : ${url}

${criteriaBlock}

Réponds en JSON avec ce format exact. IMPORTANT : criterion_id doit être l'identifiant technique du critère (ex: "proposition-valeur"), PAS son nom français.
Les valeurs possibles pour criterion_id sont : ${validIds}

{
  "suggestions": [
    {
      "criterion_id": "<identifiant technique du critère, ex: proposition-valeur>",
      "rewrites": [
        {
          "element_type": "heading"|"cta"|"value_proposition"|"section"|"meta_description"|"subheading",
          "before": "<texte actuel exact de la page>",
          "after": "<texte réécrit>",
          "justification": "<1 phrase>"
        }
      ]
    }
  ]
}`;

  return { systemPrompt, userMessage };
}
