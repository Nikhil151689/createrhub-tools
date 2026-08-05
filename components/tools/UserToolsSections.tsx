"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/hooks/useStore"
import { ToolCard } from "@/components/tools/ToolCard"
import { Button } from "@/components/ui/button"
import { Trash2, Heart, Clock } from "lucide-react"
import { TOOLS } from "@/lib/toolsList"
import * as Icons from "lucide-react"

const IconMap: Record<string, any> = Icons

export function UserToolsSections() {
  const { recentTools, favorites, clearRecentTools } = useStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Reconstruct favorites list from the static TOOLS array
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id))

  if (recentTools.length === 0 && favorites.length === 0) return null

  return (
    <div className="mb-20 space-y-16">
      {favorites.length > 0 && favoriteTools.length > 0 && (
        <section id="favorites">
          <div className="flex flex-col mb-8 text-center sm:text-left items-center sm:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <h2 className="text-2xl font-bold tracking-tight">Your Favorites</h2>
            </div>
            <p className="text-muted-foreground">Tools you've marked for quick access.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map(tool => (
              <ToolCard
                key={`fav-${tool.id}`}
                id={tool.id}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                color={tool.color}
              />
            ))}
          </div>
        </section>
      )}

      {recentTools.length > 0 && (
        <section id="recent">
          <div className="flex flex-col mb-8 text-center sm:text-left items-center sm:items-start">
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Recently Used</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={clearRecentTools} className="text-muted-foreground hover:text-destructive hidden sm:flex">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-muted-foreground">Jump back into your recent tasks.</p>
              <Button variant="ghost" size="sm" onClick={clearRecentTools} className="text-muted-foreground hover:text-destructive sm:hidden">
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentTools.map(tool => {
              // Convert string icon back to component if necessary
              const Icon = typeof tool.icon === 'string' ? (IconMap[tool.icon] || Icons.Wrench) : (tool.icon as any)
              return (
                <ToolCard
                  key={`recent-${tool.id}`}
                  id={tool.id}
                  title={tool.title || tool.name}
                  description={tool.description || ""}
                  icon={Icon}
                  href={tool.href}
                  color={tool.color}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
