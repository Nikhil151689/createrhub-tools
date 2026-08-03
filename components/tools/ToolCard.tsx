import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: string
}

export function ToolCard({ title, description, icon: Icon, href, color = "bg-primary" }: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className={`${color} text-primary-foreground p-2.5 rounded-xl transition-transform group-hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
