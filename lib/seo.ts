import { BlogPost } from "./blog";

const siteUrl = "https://saas-anatomy.com";

/**
 * Generates JSON-LD Organization schema for the site
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SaaS Anatomy",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Apprenez à construire des produits SaaS rentables de A à Z. De l'idée au lancement, maîtrisez l'anatomie des SaaS à succès.",
    sameAs: [
      "https://youtube.com/@saasanatomy",
      "https://www.tiktok.com/@saas_anatomy",
      "https://x.com/saasanatomy",
      "https://www.linkedin.com/company/saas-anatomy/",
    ],
  };
}

/**
 * Generates JSON-LD Article schema for a blog post
 */
export function generateArticleSchema(post: BlogPost) {
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
    dateModified: post.date, // Use actual modification date if available in the future
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
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || "",
    articleSection: post.tags?.[0] || "SaaS",
    inLanguage: "fr-FR",
  };
}

/**
 * Generates JSON-LD BreadcrumbList schema for a blog post
 */
export function generateBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };
}

