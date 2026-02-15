import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client)

export function urlForImage(
  source: any,
  options?: {
    width?: number
    height?: number
    quality?: number
  }
) {
  let imageBuilder = builder.image(source).auto('format').fit('max')

  if (options?.width) {
    imageBuilder = imageBuilder.width(options.width)
  }

  if (options?.height) {
    imageBuilder = imageBuilder.height(options.height)
  }

  if (options?.quality) {
    imageBuilder = imageBuilder.quality(options.quality)
  } else {
    imageBuilder = imageBuilder.quality(85)
  }

  return imageBuilder
}

function calculateReadingTime(content: PortableTextBlock[]): number {
  if (!content || content.length === 0) return 1

  const text = content
    .filter((block: any) => block._type === 'block')
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join('') || ''
    )
    .join(' ')

  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: PortableTextBlock[]
  author?: string
  tags?: string[]
  readingTime: number
  image?: string
  published?: boolean
  language?: string
  translationGroup?: string
}

export async function getAllPosts(locale: string = 'fr'): Promise<BlogPost[]> {
  const query = groq`
    *[_type == "post" && published == true && (!defined(language) || language == $locale)] | order(date desc) {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published,
      language,
      translationGroup
    }
  `

  const posts = await client.fetch<BlogPost[]>(query, { locale })

  return posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }))
}

export async function getPostBySlug(slug: string, locale: string = 'fr'): Promise<BlogPost | null> {
  const query = groq`
    *[_type == "post" && slug.current == $slug && published == true && (!defined(language) || language == $locale)][0] {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published,
      language,
      translationGroup
    }
  `

  const post = await client.fetch<BlogPost | null>(query, { slug, locale })

  if (!post) return null

  return {
    ...post,
    readingTime: calculateReadingTime(post.content),
  }
}

export async function getAllTags(locale: string = 'fr'): Promise<string[]> {
  const query = groq`
    *[_type == "post" && published == true && (!defined(language) || language == $locale)] {
      tags
    }.tags[] | order(@)
  `

  const tags = await client.fetch<string[]>(query, { locale })

  return Array.from(new Set(tags)).sort()
}

export async function getFeaturedPosts(slugs: readonly string[], locale: string = "fr"): Promise<BlogPost[]> {
  const query = groq`
    *[_type == "post" && slug.current in $slugs && published == true && (!defined(language) || language == $locale)] {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published,
      language,
      translationGroup
    }
  `

  const posts = await client.fetch<BlogPost[]>(query, { slugs, locale })

  const postsWithReadingTime = posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }))

  return slugs
    .map((slug) => postsWithReadingTime.find((p) => p.slug === slug))
    .filter((post): post is BlogPost => post !== undefined)
}

export async function getAlternatePost(translationGroup: string, targetLocale: string): Promise<{ slug: string } | null> {
  const query = groq`
    *[_type == "post" && translationGroup == $translationGroup && language == $targetLocale && published == true][0] {
      "slug": slug.current
    }
  `
  return client.fetch(query, { translationGroup, targetLocale })
}
