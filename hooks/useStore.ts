import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Tool {
  id: string
  name: string
  href: string
  icon: string
  category: string
  description?: string
}

interface AppState {
  favorites: string[]
  recentTools: Tool[]
  searchHistory: string[]
  
  toggleFavorite: (toolId: string) => void
  addRecentTool: (tool: Tool) => void
  clearRecentTools: () => void
  addSearchHistory: (query: string) => void
  clearSearchHistory: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      recentTools: [],
      searchHistory: [],

      toggleFavorite: (toolId) =>
        set((state) => ({
          favorites: state.favorites.includes(toolId)
            ? state.favorites.filter((id) => id !== toolId)
            : [...state.favorites, toolId],
        })),

      addRecentTool: (tool) =>
        set((state) => {
          const filtered = state.recentTools.filter((t) => t.id !== tool.id)
          return {
            recentTools: [tool, ...filtered].slice(0, 10), // Keep max 10
          }
        }),

      clearRecentTools: () => set({ recentTools: [] }),

      addSearchHistory: (query) =>
        set((state) => {
          if (!query.trim()) return state
          const filtered = state.searchHistory.filter((q) => q.toLowerCase() !== query.toLowerCase())
          return {
            searchHistory: [query, ...filtered].slice(0, 10),
          }
        }),

      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "creatorhub-storage",
    }
  )
)
