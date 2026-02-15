import type { ScrapedContent, CriterionResult } from "./types";

export const REWRITE_THRESHOLD = 7;

function none(locale: string) {
  return locale === "fr" ? "(aucun)" : "(none)";
}

function yesNo(val: boolean, locale: string) {
  if (locale === "fr") return val ? "Oui" : "Non";
  return val ? "Yes" : "No";
}

function buildCriterionElementMap(
  locale: string
): Record<string, (scraped: ScrapedContent) => string> {
  const n = none(locale);
  const labels =
    locale === "fr"
      ? {
          title: "Titre",
          meta: "Meta description",
          h1: "H1",
          h2: "H2",
          h3: "H3",
          cta: "CTA/Boutons",
          links: "Liens principaux",
          contentStart: "Début du contenu",
          testimonials: "Témoignages détectés",
          logos: "Logos clients détectés",
          faq: "FAQ détectée",
        }
      : {
          title: "Title",
          meta: "Meta description",
          h1: "H1",
          h2: "H2",
          h3: "H3",
          cta: "CTA/Buttons",
          links: "Main links",
          contentStart: "Content start",
          testimonials: "Testimonials detected",
          logos: "Client logos detected",
          faq: "FAQ detected",
        };

  return {
    "clarte-5-secondes": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.title}: ${s.title || n}\n${labels.meta}: ${s.metaDescription || n}`,
    "audience-cible": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.meta}: ${s.metaDescription || n}`,
    "proposition-valeur": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.contentStart}: ${s.bodyText.slice(0, 500)}`,
    "resultat-mesurable": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.cta}: ${s.ctaButtons.join(" | ") || n}`,
    "appel-action": (s) =>
      `${labels.cta}: ${s.ctaButtons.join(" | ") || n}\n${labels.links}: ${s.linkTexts.slice(0, 10).join(" | ") || n}`,
    "articulation-probleme": (s) =>
      `${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.h3}: ${s.h3.join(" | ") || n}\n${labels.contentStart}: ${s.bodyText.slice(0, 800)}`,
    "preuve-sociale": (s) =>
      `${labels.testimonials}: ${yesNo(s.hasTestimonials, locale)}\n${labels.logos}: ${yesNo(s.hasLogos, locale)}\n${labels.h2}/${labels.h3}: ${s.h2.concat(s.h3).join(" | ") || n}`,
    "differenciation": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.contentStart}: ${s.bodyText.slice(0, 600)}`,
    "gestion-objections": (s) =>
      `${labels.faq}: ${yesNo(s.hasFAQ, locale)}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.h3}: ${s.h3.join(" | ") || n}`,
    "structure-lisibilite": (s) =>
      `${labels.h1}: ${s.h1.join(" | ") || n}\n${labels.h2}: ${s.h2.join(" | ") || n}\n${labels.h3}: ${s.h3.join(" | ") || n}\n${labels.cta}: ${s.ctaButtons.join(" | ") || n}`,
  };
}

const SYSTEM_PROMPTS = {
  fr: `Tu es un expert senior en copywriting SaaS.
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
- Tes réponses sont en français.`,
  en: `You are a senior SaaS copywriting expert.
You are given analysis criteria that received a low score (< 7/10) for a landing page.
For each weak criterion, you must propose 1 to 3 concrete rewrite suggestions.

Each suggestion MUST contain:
- element_type: the type of element concerned ("heading", "cta", "value_proposition", "section", "meta_description", "subheading")
- before: the EXACT current text found on the page (exact copy, no paraphrasing)
- after: your rewritten version, more impactful and conversion-oriented
- justification: one sentence explaining why this change improves the criterion

Rules:
- Use the REAL page data provided. Do not fabricate "before" content — quote the existing text.
- If an element is completely missing (e.g., no CTA), set before: "(missing)" and propose a complete text.
- Be specific to the page's business/product, not generic.
- Maximum 3 suggestions per criterion, minimum 1.
- Respond ONLY with a valid JSON object matching the provided schema.
- Your responses must be in English.`,
} as const;

export function getWeakCriteria(
  criteres: CriterionResult[]
): CriterionResult[] {
  return criteres.filter((c) => c.score < REWRITE_THRESHOLD);
}

export function buildRewritePrompt(
  weakCriteria: CriterionResult[],
  scraped: ScrapedContent,
  url: string,
  locale: string = "fr"
) {
  const lang = locale === "en" ? "en" : "fr";
  const systemPrompt = SYSTEM_PROMPTS[lang];
  const elementMap = buildCriterionElementMap(lang);

  const labels =
    lang === "fr"
      ? {
          criterion: "Critère",
          explanation: "Explication",
          recommendation: "Recommandation",
          pageElements: "Éléments de la page",
          analyzedPage: "Page analysée",
          respondJson: "Réponds en JSON avec ce format exact. IMPORTANT : criterion_id doit être l'identifiant technique du critère (ex: \"proposition-valeur\"), PAS son nom français.",
          possibleValues: "Les valeurs possibles pour criterion_id sont",
          techId: "identifiant technique du critère, ex: proposition-valeur",
          currentText: "texte actuel exact de la page",
          rewrittenText: "texte réécrit",
          oneSentence: "1 phrase",
        }
      : {
          criterion: "Criterion",
          explanation: "Explanation",
          recommendation: "Recommendation",
          pageElements: "Page elements",
          analyzedPage: "Analyzed page",
          respondJson: "Respond in JSON with this exact format. IMPORTANT: criterion_id must be the technical identifier of the criterion (e.g., \"proposition-valeur\"), NOT its display name.",
          possibleValues: "Possible values for criterion_id are",
          techId: "technical criterion identifier, e.g., proposition-valeur",
          currentText: "exact current text from the page",
          rewrittenText: "rewritten text",
          oneSentence: "1 sentence",
        };

  const criteriaBlock = weakCriteria
    .map((c) => {
      const elements = elementMap[c.id]?.(scraped) || "";
      return `--- ${labels.criterion} id="${c.id}" : ${c.nom} (score: ${c.score}/10) ---
${labels.explanation}: ${c.explication}
${labels.recommendation}: ${c.recommandation}
${labels.pageElements}:
${elements}`;
    })
    .join("\n\n");

  const validIds = weakCriteria.map((c) => `"${c.id}"`).join(", ");

  const userMessage = `${labels.analyzedPage} : ${url}

${criteriaBlock}

${labels.respondJson}
${labels.possibleValues} : ${validIds}

{
  "suggestions": [
    {
      "criterion_id": "<${labels.techId}>",
      "rewrites": [
        {
          "element_type": "heading"|"cta"|"value_proposition"|"section"|"meta_description"|"subheading",
          "before": "<${labels.currentText}>",
          "after": "<${labels.rewrittenText}>",
          "justification": "<${labels.oneSentence}>"
        }
      ]
    }
  ]
}`;

  return { systemPrompt, userMessage };
}
