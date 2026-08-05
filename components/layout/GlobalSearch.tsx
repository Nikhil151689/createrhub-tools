"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Search, X, Clock, Zap, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { TOOLS } from "@/lib/toolsList"
import { useStore } from "@/hooks/useStore"

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { searchHistory, addSearchHistory, clearSearchHistory } = useStore()
  const [query, setQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!mounted) return null;

  const popularSearches = ["Image Compressor", "Merge PDF", "Video to MP3"]

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text
    const regex = new RegExp(`(${q})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-primary/20 text-primary font-medium">{part}</span> : part
    )
  }

  const handleSelect = (href: string, title: string) => {
    addSearchHistory(title)
    router.push(href)
    onClose()
    setQuery("")
  }

  return createPortal(
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
            className="w-full max-w-2xl rounded-xl border bg-card shadow-2xl overflow-hidden m-4"
            onClick={e => e.stopPropagation()}
          >
            <Command 
              className="flex w-full flex-col overflow-hidden bg-popover text-popover-foreground rounded-xl"
              label="Global Search"
              shouldFilter={false} // We handle filtering manually to allow multi-field matching
            >
              <div className="flex items-center border-b px-4">
                <Search className="mr-2 h-5 w-5 opacity-50 shrink-0" />
                <Command.Input 
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Search tools, blogs, or descriptions..."
                />
                <button onClick={onClose} className="opacity-50 hover:opacity-100 shrink-0">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found for "{query}".
                </Command.Empty>

                {!query && searchHistory.length > 0 && (
                  <Command.Group heading={
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                      <span>Recent Searches</span>
                      <button onClick={(e) => { e.preventDefault(); clearSearchHistory() }} className="hover:text-primary transition-colors">Clear</button>
                    </div>
                  }>
                    {searchHistory.map((q, i) => (
                      <Command.Item
                        key={i}
                        onSelect={() => setQuery(q)}
                        className="flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                      >
                        <Clock className="mr-2 h-4 w-4 opacity-50" />
                        {q}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {!query && (
                  <Command.Group heading={<div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1 mt-2">Popular Searches</div>}>
                    {popularSearches.map((p, i) => (
                      <Command.Item
                        key={i}
                        onSelect={() => setQuery(p)}
                        className="flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                      >
                        <Zap className="mr-2 h-4 w-4 text-primary" />
                        {p}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {query && (
                  <>
                    <Command.Group heading={<div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">Tools</div>}>
                      {TOOLS.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase())).map((tool) => (
                        <Command.Item
                          key={tool.id}
                          value={tool.title}
                          onSelect={() => handleSelect(tool.href, tool.title)}
                          className="flex cursor-pointer flex-col select-none rounded-sm px-2 py-2 outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                        >
                          <div className="flex items-center">
                            <span className="font-medium text-sm">{highlightMatch(tool.title, query)}</span>
                            <span className="ml-auto text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">{tool.category}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{highlightMatch(tool.description, query)}</p>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  </>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
