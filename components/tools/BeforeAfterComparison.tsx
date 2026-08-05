"use client"

import { useState } from "react"
import { formatSize } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface BeforeAfterComparisonProps {
  originalUrl: string
  compressedUrl: string
  originalSize: number
  compressedSize: number
}

export function BeforeAfterComparison({
  originalUrl,
  compressedUrl,
  originalSize,
  compressedSize,
}: BeforeAfterComparisonProps) {
  const [showOriginal, setShowOriginal] = useState(false)
  const ratio = originalSize > 0 ? (1 - compressedSize / originalSize) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-center">
        <Card className="p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Original Size</p>
          <p className="font-semibold">{formatSize(originalSize)}</p>
        </Card>
        <Card className="p-3 bg-primary/5 border-primary/20">
          <p className="text-xs text-primary/80 uppercase tracking-wider mb-1">Compressed</p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-semibold text-primary">{formatSize(compressedSize)}</p>
            <span className="text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
              -{Math.round(ratio)}%
            </span>
          </div>
        </Card>
      </div>

      <div 
        className="relative w-full aspect-video md:aspect-square bg-muted/20 rounded-lg overflow-hidden border cursor-pointer select-none group"
        onPointerDown={() => setShowOriginal(true)}
        onPointerUp={() => setShowOriginal(false)}
        onPointerLeave={() => setShowOriginal(false)}
        onTouchStart={() => setShowOriginal(true)}
        onTouchEnd={() => setShowOriginal(false)}
      >
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={showOriginal ? originalUrl : compressedUrl} 
            alt={showOriginal ? "Original" : "Compressed"} 
            className="max-w-full max-h-full object-contain rounded drop-shadow-md transition-opacity duration-200" 
            draggable={false}
          />
        </div>
        
        <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border shadow-sm transition-colors">
          {showOriginal ? "Original" : "Compressed"}
        </div>
        
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium border shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Click and hold to see original
        </div>
      </div>
    </div>
  )
}
