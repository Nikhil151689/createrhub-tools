import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  content: string
}

const contentDir = path.join(process.cwd(), 'content', 'blog')

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  
  if (!match) return { data: {}, content: fileContent }

  const frontmatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  
  const data: Record<string, string> = {}
  frontmatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      data[key] = value
    }
  })

  return { data, content }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return []

  const categories = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory())
  
  const posts: BlogPost[] = []

  categories.forEach(category => {
    const catDir = path.join(contentDir, category)
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'))

    files.forEach(file => {
      const filePath = path.join(catDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = parseFrontmatter(fileContent)

      posts.push({
        slug: file.replace('.md', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'Anonymous',
        category: data.category || category,
        content
      })
    })
  })

  // Sort by date descending
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(p => p.slug === slug) || null
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const cats = new Set(posts.map(p => p.category))
  return Array.from(cats)
}
