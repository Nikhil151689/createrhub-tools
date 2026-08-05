import { Hero } from "@/components/layout/hero"
import { AdBanner } from "@/components/ads/AdBanner"
import { ToolCard } from "@/components/tools/ToolCard"
import { FileText, Image as ImageIcon, Video, Music, Wrench } from "lucide-react"
import Link from "next/link"
import { UserToolsSections } from "@/components/tools/UserToolsSections"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <AdBanner dataAdSlot="1234567890" className="mb-16" />
        
        <UserToolsSections />

        <section className="mb-20" id="tools">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Tools</h2>
            <p className="text-muted-foreground max-w-2xl">Our most frequently used utilities by creators worldwide.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ToolCard title="Merge PDF" description="Combine multiple PDF files into a single document." iconNode={<FileText className="h-6 w-6" />} href="/tools/pdf-merge" color="bg-red-500" />
            <ToolCard title="Image Compressor" description="Reduce image file size without losing quality." iconNode={<ImageIcon className="h-6 w-6" />} href="/tools/image-compressor" color="bg-blue-500" />
            <ToolCard title="Video to MP3" description="Extract high quality audio from any video file." iconNode={<Video className="h-6 w-6" />} href="/tools/video-to-mp3" color="bg-purple-500" />
            <ToolCard title="QR Code Generator" description="Create custom QR codes for links, text, and more." iconNode={<Wrench className="h-6 w-6" />} href="/tools/qr-generator" color="bg-green-500" />
            <ToolCard title="JPG to PNG" description="Convert JPG images to PNG format instantly." iconNode={<ImageIcon className="h-6 w-6" />} href="/jpg-to-png" color="bg-blue-500" />
            <ToolCard title="MP4 to WEBM" description="Convert video formats seamlessly." iconNode={<Video className="h-6 w-6" />} href="/mp4-to-webm" color="bg-orange-500" />
            <ToolCard title="TXT to PDF" description="Convert text files to PDF documents." iconNode={<FileText className="h-6 w-6" />} href="/txt-to-pdf" color="bg-gray-500" />
            <ToolCard title="MP3 to WAV" description="Convert audio formats without losing quality." iconNode={<Music className="h-6 w-6" />} href="/mp3-to-wav" color="bg-purple-500" />
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/file-converter" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
              Explore All 18 File Converters
            </Link>
          </div>
        </section>

        <AdBanner dataAdSlot="0987654321" className="mb-16" />

      </div>
    </div>
  )
}
