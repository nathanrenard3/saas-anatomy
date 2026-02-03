import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source).auto('format').fit('max')
}

// Helper function to calculate reading time from PortableText
function calculateReadingTime(content: PortableTextBlock[]): string {
  if (!content || content.length === 0) return '1 min de lecture'

  // Extract text from PortableText blocks
  const text = content
    .filter((block: any) => block._type === 'block')
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join('') || ''
    )
    .join(' ')

  // Calculate reading time (average 200 words per minute in French)
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)

  return minutes === 1 ? '1 min de lecture' : `${minutes} min de lecture`
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: PortableTextBlock[]
  author?: string
  tags?: string[]
  readingTime: string
  image?: string
  published?: boolean
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const query = groq`
    *[_type == "post" && published == true] | order(date desc) {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published
    }
  `

  const posts = await client.fetch<BlogPost[]>(query)

  // Add reading time to each post
  return posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = groq`
    *[_type == "post" && slug.current == $slug && published == true][0] {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published
    }
  `

  const post = await client.fetch<BlogPost | null>(query, { slug })

  if (!post) return null

  return {
    ...post,
    readingTime: calculateReadingTime(post.content),
  }
}

export async function getAllTags(): Promise<string[]> {
  const query = groq`
    *[_type == "post" && published == true] {
      tags
    }.tags[] | order(@)
  `

  const tags = await client.fetch<string[]>(query)

  // Remove duplicates
  return Array.from(new Set(tags)).sort()
}

export async function getFeaturedPosts(slugs: readonly string[]): Promise<BlogPost[]> {
  const query = groq`
    *[_type == "post" && slug.current in $slugs && published == true] {
      "slug": slug.current,
      title,
      date,
      excerpt,
      content,
      tags,
      "image": image.asset->url,
      published
    }
  `

  const posts = await client.fetch<BlogPost[]>(query, { slugs })

  // Add reading time and preserve order from slugs array
  const postsWithReadingTime = posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }))

  // Sort by original slugs order
  return slugs
    .map((slug) => postsWithReadingTime.find((p) => p.slug === slug))
    .filter((post): post is BlogPost => post !== undefined)
}
