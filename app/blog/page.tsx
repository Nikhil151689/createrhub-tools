import { getAllPosts, getAllCategories } from "@/lib/blog"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, User, ChevronRight } from "lucide-react"

export const metadata = {
  title: "CreatorHub Blog - Tips, Tricks & Tutorials",
  description: "Read the latest articles on file conversion, PDF management, image optimization, and more.",
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">CreatorHub Blog</h1>
        <p className="text-xl text-muted-foreground">Insights, tutorials, and news for creators.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 mb-12 justify-center custom-scrollbar">
        <Link 
          href="/blog" 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shrink-0"
        >
          All
        </Link>
        {categories.map(cat => (
          <Link 
            key={cat}
            href={`/blog/${cat.toLowerCase()}`} 
            className="px-4 py-2 bg-muted text-foreground hover:bg-muted/80 rounded-full text-sm font-medium shrink-0 transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link href={`/blog/${post.category.toLowerCase()}/${post.slug}`} key={post.slug} className="group block">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1">
              <CardHeader>
                <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{post.category}</div>
                <CardTitle className="text-2xl line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
