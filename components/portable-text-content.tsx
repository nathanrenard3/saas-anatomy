import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/blog'
import type { PortableTextBlock } from '@portabletext/types'

interface PortableTextContentProps {
  content: PortableTextBlock[]
  className?: string
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).width(1200).height(630).url()}
            alt={value.alt || 'Article image'}
            fill
            className="object-cover"
          />
          {value.alt && (
            <p className="text-sm text-center text-muted-foreground mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    codeBlock: ({ value }) => {
      return (
        <div className="my-6">
          {value.language && (
            <div className="bg-muted/50 px-4 py-2 text-xs font-mono text-muted-foreground rounded-t-lg border-b border-border">
              {value.language}
            </div>
          )}
          <pre className="bg-muted p-4 rounded-b-lg overflow-x-auto">
            <code className="text-sm font-mono">{value.code}</code>
          </pre>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-3 scroll-mt-24">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-6 text-foreground/90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground bg-muted/30 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed text-foreground/90">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed text-foreground/90">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextContent({ content, className = '' }: PortableTextContentProps) {
  return (
    <div className={`prose prose-zinc dark:prose-invert prose-lg max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  )
}
