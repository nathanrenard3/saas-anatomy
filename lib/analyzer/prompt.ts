import type { ScrapedContent } from "./types";

const CRITERIA = {
  fr: [
    { id: "clarte-5-secondes", nom: "Clarté en 5 secondes" },
    { id: "audience-cible", nom: "Audience cible identifiable" },
    { id: "proposition-valeur", nom: "Proposition de valeur" },
    { id: "resultat-mesurable", nom: "Résultat mesurable" },
    { id: "appel-action", nom: "Appel à l'action (CTA)" },
    { id: "articulation-probleme", nom: "Articulation du problème" },
    { id: "preuve-sociale", nom: "Preuve sociale" },
    { id: "differenciation", nom: "Différenciation" },
    { id: "gestion-objections", nom: "Gestion des objections" },
    { id: "structure-lisibilite", nom: "Structure et lisibilité" },
  ],
  en: [
    { id: "clarte-5-secondes", nom: "5-Second Clarity" },
    { id: "audience-cible", nom: "Identifiable Target Audience" },
    { id: "proposition-valeur", nom: "Value Proposition" },
    { id: "resultat-mesurable", nom: "Measurable Outcome" },
    { id: "appel-action", nom: "Call to Action (CTA)" },
    { id: "articulation-probleme", nom: "Problem Articulation" },
    { id: "preuve-sociale", nom: "Social Proof" },
    { id: "differenciation", nom: "Differentiation" },
    { id: "gestion-objections", nom: "Objection Handling" },
    { id: "structure-lisibilite", nom: "Structure & Readability" },
  ],
} as const;

const CRITERIA_DESCRIPTIONS = {
  fr: `1. clarte-5-secondes — Le visiteur comprend-il le produit en 5 secondes ? Le heading principal est-il clair et spécifique ?
2. audience-cible — La cible est-elle clairement identifiée ? La page parle-t-elle à un persona spécifique ?
3. proposition-valeur — La proposition de valeur est-elle unique, spécifique et convaincante ? Va-t-elle au-delà des déclarations génériques ?
4. resultat-mesurable — La page promet-elle un résultat concret et quantifiable ? (ex: "Gagnez 10h/semaine" vs "Gagnez du temps")
5. appel-action — Les CTAs sont-ils clairs, visibles, orientés action et stratégiquement placés ?
6. articulation-probleme — La page décrit-elle clairement le problème ou la douleur avant de présenter la solution ?
7. preuve-sociale — Y a-t-il des témoignages, études de cas, logos, chiffres ou autres signaux de confiance ?
8. differenciation — La page explique-t-elle pourquoi cette solution est meilleure que les alternatives ?
9. gestion-objections — La page traite-t-elle les objections courantes (prix, complexité, migration, sécurité) ?
10. structure-lisibilite — Le contenu est-il bien organisé avec un flux logique ? Est-il scannable avec des sections claires ?`,
  en: `1. clarte-5-secondes — Does the visitor understand the product within 5 seconds? Is the main heading clear and specific?
2. audience-cible — Is the target audience clearly identified? Does the page speak to a specific persona?
3. proposition-valeur — Is the value proposition unique, specific, and compelling? Does it go beyond generic claims?
4. resultat-mesurable — Does the page promise a concrete, quantifiable outcome? (e.g., "Save 10h/week" vs "Save time")
5. appel-action — Are CTAs clear, visible, action-oriented, and strategically placed?
6. articulation-probleme — Does the page clearly describe the problem or pain point before presenting the solution?
7. preuve-sociale — Are there testimonials, case studies, logos, numbers, or other trust signals?
8. differenciation — Does the page explain why this solution is better than alternatives?
9. gestion-objections — Does the page address common objections (price, complexity, migration, security)?
10. structure-lisibilite — Is the content well-organized with a logical flow? Is it scannable with clear sections?`,
} as const;

const SYSTEM_PROMPTS = {
  fr: `Tu es un expert senior en optimisation de landing pages pour des entreprises SaaS.
Tu analyses les pages de destination en te concentrant sur la qualité du copywriting, pas le design visuel.

Tu reçois le contenu textuel extrait d'une landing page et tu dois l'évaluer selon exactement 10 critères.
Pour chaque critère, tu attribues un score de 1 à 10 et tu fournis une explication et une recommandation concrète.

Tes réponses sont toujours en français. Tu es direct, spécifique et actionable.
Ne sois pas complaisant — si la page est mauvaise, dis-le clairement avec des suggestions d'amélioration.

Réponds UNIQUEMENT avec un objet JSON valide selon le schéma fourni.`,
  en: `You are a senior expert in landing page optimization for SaaS companies.
You analyze landing pages focusing on copywriting quality, not visual design.

You receive the text content extracted from a landing page and must evaluate it against exactly 10 criteria.
For each criterion, you assign a score from 1 to 10 and provide an explanation and a concrete recommendation.

Your responses are always in English. Be direct, specific, and actionable.
Don't be complacent — if the page is poor, say so clearly with improvement suggestions.

Respond ONLY with a valid JSON object matching the provided schema.`,
} as const;

function none(locale: string) {
  return locale === "fr" ? "(aucun)" : "(none)";
}

function noneF(locale: string) {
  return locale === "fr" ? "(aucune)" : "(none)";
}

function yesNo(val: boolean, locale: string) {
  if (locale === "fr") return val ? "Oui" : "Non";
  return val ? "Yes" : "No";
}

export function buildAnalysisPrompt(scraped: ScrapedContent, url: string, locale: string = "fr") {
  const lang = locale === "en" ? "en" : "fr";
  const systemPrompt = SYSTEM_PROMPTS[lang];
  const criteria = CRITERIA[lang];

  const labels = lang === "fr"
    ? { title: "TITRE", meta: "META DESCRIPTION", h1: "TITRES H1", h2: "TITRES H2", h3: "TITRES H3", cta: "BOUTONS/CTA", links: "TEXTE DES LIENS", testimonials: "TÉMOIGNAGES DÉTECTÉS", logos: "LOGOS CLIENTS DÉTECTÉS", pricing: "PAGE TARIFS DÉTECTÉE", faq: "FAQ DÉTECTÉE", forms: "NOMBRE DE FORMULAIRES", altTexts: "TEXTE ALT IMAGES", mainContent: "CONTENU PRINCIPAL", analyzeIntro: "Voici le contenu extrait de la landing page", analyzeOutro: "Analyse cette page selon les 10 critères suivants et réponds en JSON", summary: "phrases de synthèse", strength: "force", weakness: "faiblesse" }
    : { title: "TITLE", meta: "META DESCRIPTION", h1: "H1 HEADINGS", h2: "H2 HEADINGS", h3: "H3 HEADINGS", cta: "BUTTONS/CTA", links: "LINK TEXT", testimonials: "TESTIMONIALS DETECTED", logos: "CLIENT LOGOS DETECTED", pricing: "PRICING PAGE DETECTED", faq: "FAQ DETECTED", forms: "NUMBER OF FORMS", altTexts: "IMAGE ALT TEXT", mainContent: "MAIN CONTENT", analyzeIntro: "Here is the extracted content from the landing page", analyzeOutro: "Analyze this page against the following 10 criteria and respond in JSON", summary: "sentence summary", strength: "strength", weakness: "weakness" };

  const n = none(lang);
  const nf = noneF(lang);

  const criteriaJson = criteria
    .map((c, i) => {
      const dots = i === 0
        ? `
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "<2-3 ${labels.summary}>",
      "recommandation": "<1-2 actionable sentences>",
      "elements_trouves": ["<specific element found or missing>"]`
        : `
      "score": <1-10>,
      "grade": <"A"|"B"|"C"|"D"|"F">,
      "explication": "...",
      "recommandation": "...",
      "elements_trouves": [...]`;
      return `    {
      "id": "${c.id}",
      "nom": "${c.nom}",${dots}
    }`;
    })
    .join(",\n");

  const userMessage = `${labels.analyzeIntro} : ${url}

${labels.title}: ${scraped.title || n}
${labels.meta}: ${scraped.metaDescription || nf}
${labels.h1}: ${scraped.h1.join(" | ") || n}
${labels.h2}: ${scraped.h2.join(" | ") || n}
${labels.h3}: ${scraped.h3.join(" | ") || n}
${labels.cta}: ${scraped.ctaButtons.join(" | ") || n}
${labels.links}: ${scraped.linkTexts.join(" | ") || n}
${labels.testimonials}: ${yesNo(scraped.hasTestimonials, lang)}
${labels.logos}: ${yesNo(scraped.hasLogos, lang)}
${labels.pricing}: ${yesNo(scraped.hasPricing, lang)}
${labels.faq}: ${yesNo(scraped.hasFAQ, lang)}
${labels.forms}: ${scraped.formCount}
${labels.altTexts}: ${scraped.imageAltTexts.join(" | ") || n}

${labels.mainContent}:
${scraped.bodyText}

---

${labels.analyzeOutro} :

{
  "url": "${url}",
  "domain": "${new URL(url).hostname}",
  "score_global": <number 0-100>,
  "grade_global": <"A"|"B"|"C"|"D"|"F">,
  "resume": "<2-3 ${labels.summary}>",
  "criteres": [
${criteriaJson}
  ],
  "points_forts": ["<${labels.strength} 1>", "<${labels.strength} 2>", "<${labels.strength} 3>"],
  "points_faibles": ["<${labels.weakness} 1>", "<${labels.weakness} 2>", "<${labels.weakness} 3>"]
}

${CRITERIA_DESCRIPTIONS[lang]}`;

  return { systemPrompt, userMessage };
}
