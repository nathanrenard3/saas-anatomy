import { BlogPost } from "./blog";

const siteUrl = "https://saas-anatomy.com";

const descriptions = {
  fr: "Apprenez à construire des produits SaaS rentables de A à Z. De l'idée au lancement, maîtrisez l'anatomie des SaaS à succès.",
  en: "Learn to build profitable SaaS products from A to Z. From idea to launch, master the anatomy of successful SaaS businesses.",
};

const homeLabels = {
  fr: "Accueil",
  en: "Home",
};

export function generateOrganizationSchema(locale: string = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SaaS Anatomy",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
    sameAs: [
      "https://youtube.com/@saasanatomy",
      "https://www.tiktok.com/@saas_anatomy",
      "https://x.com/saasanatomy",
      "https://www.linkedin.com/company/saas-anatomy/",
    ],
  };
}

export function generateArticleSchema(post: BlogPost, locale: string = "fr") {
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `${siteUrl}${post.image || "/images/default-thumb.webp"}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "SaaS Anatomy",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SaaS Anatomy",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || "",
    articleSection: post.tags?.[0] || "SaaS",
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };
}

export function generateBreadcrumbSchema(post: BlogPost, locale: string = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabels[locale as keyof typeof homeLabels] || homeLabels.fr,
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/${locale}/blog/${post.slug}`,
      },
    ],
  };
}
