import { Metadata } from "next"
import { CONVERTERS } from "@/lib/converter-config"
import { ToolCard } from "@/components/tools/ToolCard"
import { FileText, Image as ImageIcon, Video, Music, Wrench, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Online File Converters | CreatorHub Tools",
  description: "Convert images, documents, audio, and video completely free in your browser.",
  alternates: {
    canonical: "https://creatorhubtools.com/file-converter",
  }
}

export default function FileConverterCategoryPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'image': return ImageIcon;
      case 'file-text': return FileText;
      case 'music': return Music;
      case 'video': return Video;
      default: return Wrench;
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 min-h-screen">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="bg-primary/10 text-primary p-3 rounded-2xl mb-4">
          <Zap className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">File Converter</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Fast, secure, and free file conversions directly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CONVERTERS.map((tool) => {
          const IconComponent = getIcon(tool.iconName);
          return (
            <ToolCard 
              key={tool.id}
              title={tool.title} 
              description={tool.description} 
              iconNode={<IconComponent className="h-6 w-6" />} 
              href={`/${tool.id}`} 
              color={tool.color} 
            />
          )
        })}
      </div>
    </div>
  )
}
