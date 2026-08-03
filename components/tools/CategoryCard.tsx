import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  count: number
  color?: string
}

export function CategoryCard({ title, description, icon: Icon, href, count, color = "bg-primary" }: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg group-hover:border-primary/50">
        <div className="flex items-center gap-4 mb-4">
          <div className={`${color} text-primary-foreground p-3 rounded-xl transition-transform group-hover:scale-110`}>
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-semibold text-xl">{title}</h3>
            <p className="text-sm text-muted-foreground">{count} tools</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Explore tools <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}
