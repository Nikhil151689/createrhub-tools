"use client"

import Link from "next/link"
import { LucideIcon, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/hooks/useStore"
import { useEffect, useState } from "react"

interface ToolCardProps {
  id?: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: string
}

export function ToolCard({ id, title, description, icon: Icon, href, color = "bg-primary" }: ToolCardProps) {
  const toolId = id || title.toLowerCase().replace(/\s+/g, "-")
  const { favorites, toggleFavorite, addRecentTool } = useStore()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isFavorite = favorites.includes(toolId)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(toolId)
  }

  const handleCardClick = () => {
    addRecentTool({
      id: toolId,
      title,
      description,
      href,
      icon: Icon.name,
      category: "Utility",
      color
    } as any)
  }

  return (
    <Link href={href} className="block group" onClick={handleCardClick}>
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur relative overflow-hidden">
        {isMounted && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 z-10 p-1.5 rounded-full transition-colors ${
              isFavorite ? "text-red-500 bg-red-500/10" : "text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        )}
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className={`${color} text-primary-foreground p-2.5 rounded-xl transition-transform group-hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1 pr-8">
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
