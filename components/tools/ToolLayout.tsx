import { AdBanner } from "@/components/ads/AdBanner"

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  faqs?: { question: string, answer: string }[]
}

export function ToolLayout({ title, description, children, faqs }: ToolLayoutProps) {
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
      </div>
    </div>
  )
}
