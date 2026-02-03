# Configuration des Articles en Vedette

Ce dossier contient la configuration pour les articles mis en avant dans la navbar.

## Comment changer les articles affichés dans la navbar ?

Éditez le fichier `featured-posts.ts` et modifiez le tableau `featuredPostSlugs` :

```typescript
export const featuredPostSlugs = [
  "welcome-to-indiestack",      // Premier article affiché
  "pourquoi-mdx-plutot-cms",    // Deuxième article affiché
  "automatiser-blog-n8n",       // Troisième article affiché
] as const;
```

### Instructions :

1. **Pour changer l'ordre** : Réorganisez simplement les slugs dans le tableau
2. **Pour remplacer un article** : Remplacez le slug par celui d'un autre article
3. **Pour trouver le slug d'un article** : Le slug est le nom du fichier dans `content/blog/` sans l'extension `.mdx`

### Exemples :

```typescript
// Afficher 3 articles différents
export const featuredPostSlugs = [
  "mon-nouveau-article",
  "guide-complet-saas",
  "strategies-growth",
] as const;

// Afficher seulement 2 articles
export const featuredPostSlugs = [
  "article-populaire",
  "tutoriel-important",
] as const;

// Afficher jusqu'à 4 articles (maximum recommandé)
export const featuredPostSlugs = [
  "article-1",
  "article-2",
  "article-3",
  "article-4",
] as const;
```

### Notes :

- Les articles sont affichés dans l'ordre défini dans le tableau
- Si un slug n'existe pas, il sera simplement ignoré
- Maximum recommandé : 3-4 articles pour ne pas surcharger la navbar
- Les changements sont appliqués automatiquement après sauvegarde
