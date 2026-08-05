import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { marked } from "marked"
import Link from "next/link"
import { ChevronRight, Calendar, User, Link as LinkIcon } from "lucide-react"

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

import { AdBanner } from "@/components/ads/AdBanner"
import { Metadata } from "next"

// In a real app we'd resolve params properly in next15+, for now using synchronous params is fine in typical next14/15 pages
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    category: post.category.toLowerCase(),
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug)
  if (!post) return {}
  
  return {
    title: `${post.title} | CreatorHub Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, category: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return notFound()
  }

  // Basic reading time estimation
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  // Use marked to render the HTML securely. 
  // In production, we'd also use DOMPurify if content is user-generated. Here it's static files.
  const htmlContent = await marked.parse(post.content)

  return (
    <article className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "datePublished": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "CreatorHub Tools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://creatorhubtools.com/favicon.ico"
              }
            }
          })
        }}
      />

      <div className="container mx-auto px-4 sm:px-8 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li>
              <Link href={`/blog/${post.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                {post.category}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-md" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-muted px-2 py-1 rounded-md">{readingTime} min read</span>
            </div>
          </div>
        </header>

        <AdBanner dataAdSlot="blog-top-ad" className="mb-10" />

        {/* Content layout with sidebar (share buttons + toc placeholder) */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Share Buttons */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Share this article</h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors" aria-label="Share on Facebook">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors" aria-label="Share on Twitter">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors" aria-label="Share on LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors" aria-label="Copy link">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Author section */}
              <div className="bg-muted/50 p-6 rounded-xl border">
                <div className="font-semibold mb-2">About the Author</div>
                <div className="text-sm text-muted-foreground">
                  The {post.author} is dedicated to building the best free tools for digital creators around the world.
                </div>
              </div>
            </div>
          </aside>
        </div>

        <AdBanner dataAdSlot="blog-bottom-ad" className="mt-16 mb-8" />
      </div>
    </article>
  )
}
