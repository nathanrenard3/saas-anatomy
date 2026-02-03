import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Separator } from "@/components/ui/separator";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-zinc dark:prose-invert prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-12 mb-6 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-10 mb-5 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-8 mb-4 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-bold mt-6 mb-3 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-6 leading-relaxed text-foreground/90">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground/90 leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-muted-foreground bg-muted/30 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-muted px-2 py-0.5 rounded text-sm font-mono text-primary">
                {children}
              </code>
            ) : (
              <code className={`${className} block bg-muted p-6 rounded-xl overflow-x-auto text-sm border border-border`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-8 overflow-x-auto">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-primary hover:underline font-medium underline-offset-4 decoration-primary/30">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <figure className="my-10">
              <img src={src} alt={alt || ''} className="rounded-xl w-full border border-border shadow-lg" />
              {alt && <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">{alt}</figcaption>}
            </figure>
          ),
          hr: () => <Separator className="my-12" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/90">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
