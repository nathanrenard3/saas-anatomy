/**
 * Configuration des articles mis en avant dans la navbar
 *
 * Pour changer les articles affichés dans la navbar, modifiez simplement
 * les slugs dans le tableau ci-dessous. Les articles seront affichés dans
 * l'ordre défini ici.
 */

export const featuredPostSlugs = [
  "welcome-to-indiestack",
  "pourquoi-mdx-plutot-cms",
  "automatiser-blog-n8n",
] as const;

export type FeaturedPostSlug = typeof featuredPostSlugs[number];
