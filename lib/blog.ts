import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content/blog')

// Helper function to translate reading time to French
function translateReadingTime(readingTimeText: string): string {
  // Convert "X min read" or "X minute read" to "X min de lecture"
  return readingTimeText
    .replace(/(\d+)\s*min(?:ute)?(?:s)?\s*read/i, '$1 min de lecture')
    .replace(/less than a minute read/i, 'moins d\'une minute de lecture')
    .replace(/1 min read/i, '1 min de lecture')
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
  readingTime: string
  image?: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const files = fs.readdirSync(contentDirectory)

  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 160) + '...',
        content,
        author: data.author,
        tags: data.tags || [],
        readingTime: translateReadingTime(readingTime(content).text),
        image: data.image,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      // Try .md extension
      const mdFilePath = path.join(contentDirectory, `${slug}.md`)
      if (!fs.existsSync(mdFilePath)) {
        return null
      }
      const fileContent = fs.readFileSync(mdFilePath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.slice(0, 160) + '...',
        content,
        author: data.author,
        tags: data.tags || [],
        readingTime: translateReadingTime(readingTime(content).text),
        image: data.image,
      }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.slice(0, 160) + '...',
      content,
      author: data.author,
      tags: data.tags || [],
      readingTime: translateReadingTime(readingTime(content).text),
      image: data.image,
    }
  } catch (error) {
    return null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

export async function getFeaturedPosts(slugs: readonly string[]): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const featuredPosts: BlogPost[] = []

  // Preserve the order from the slugs array
  for (const slug of slugs) {
    const post = posts.find((p) => p.slug === slug)
    if (post) {
      featuredPosts.push(post)
    }
  }

  return featuredPosts
}
