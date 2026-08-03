"use client"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { CONVERTERS } from "@/lib/converter-config"

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const tools = [
    { title: "Merge PDF", href: "/tools/pdf-merge" },
    { title: "Image Compressor", href: "/tools/image-compressor" },
    { title: "Video to MP3", href: "/tools/video-to-mp3" },
    { title: "QR Code Generator", href: "/tools/qr-generator" },
    ...CONVERTERS.map(c => ({ title: c.title, href: `/${c.id}` }))
  ]

  const filtered = tools.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-start pt-[10vh]"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-xl border bg-card shadow-2xl overflow-hidden m-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center border-b px-4">
              <Search className="mr-2 h-5 w-5 opacity-50" />
              <input 
                autoFocus
                className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search all tools..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="opacity-50 hover:opacity-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                filtered.map((tool, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-3 text-sm hover:bg-muted rounded-md transition-colors"
                    onClick={() => {
                      router.push(tool.href)
                      onClose()
                    }}
                  >
                    {tool.title}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
