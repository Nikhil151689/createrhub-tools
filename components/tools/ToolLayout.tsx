import { AdBanner } from "@/components/ads/AdBanner"
import { TOOLS } from "@/lib/toolsList"
import { ToolCard } from "@/components/tools/ToolCard"
import * as Icons from "lucide-react"

const IconMap: Record<string, any> = Icons

interface ToolLayoutProps {
  toolId?: string
  title: string
  description: string
  children: React.ReactNode
  faqs?: { question: string, answer: string }[]
}

export function ToolLayout({ toolId, title, description, children, faqs }: ToolLayoutProps) {
  const currentTool = toolId ? TOOLS.find(t => t.id === toolId) : null
  
  // Find related tools in the same category, excluding the current tool
  const relatedTools = currentTool 
    ? TOOLS.filter(t => t.category === currentTool.category && t.id !== currentTool.id).slice(0, 4)
    : []

  // If not enough related tools in the same category, fill with other popular tools
  if (relatedTools.length < 4 && currentTool) {
    const additional = TOOLS.filter(t => t.id !== currentTool.id && !relatedTools.find(r => r.id === t.id))
    relatedTools.push(...additional.slice(0, 4 - relatedTools.length))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-muted/30 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-8 flex-1">
        <AdBanner dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_TOP || "5555555555"} className="mb-8" />
        
        <div className="max-w-5xl mx-auto mb-16">
          {children}
        </div>

        <AdBanner dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM || "6666666666"} className="mb-16" />

        {faqs && faqs.length > 0 && (
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-5 bg-card">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedTools.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map(tool => {
                const Icon = typeof tool.icon === 'string' ? (IconMap[tool.icon] || Icons.Wrench) : (tool.icon as any)
                return (
                  <ToolCard
                    key={`related-${tool.id}`}
                    id={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={Icon}
                    href={tool.href}
                    color={tool.color}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
