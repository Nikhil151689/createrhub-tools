import { FileText, Image as ImageIcon, Video, Music, Wrench } from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface ToolDefinition {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  category: string
}

export const TOOLS: ToolDefinition[] = [
  { id: "pdf-merge", title: "Merge PDF", description: "Combine multiple PDF files into a single document.", icon: FileText, href: "/tools/pdf-merge", color: "bg-red-500", category: "PDF" },
  { id: "image-compressor", title: "Image Compressor", description: "Reduce image file size without losing quality.", icon: ImageIcon, href: "/tools/image-compressor", color: "bg-blue-500", category: "Images" },
  { id: "video-to-mp3", title: "Video to MP3", description: "Extract high quality audio from any video file.", icon: Video, href: "/tools/video-to-mp3", color: "bg-purple-500", category: "Video" },
  { id: "qr-generator", title: "QR Code Generator", description: "Create custom QR codes for links, text, and more.", icon: Wrench, href: "/tools/qr-generator", color: "bg-green-500", category: "Utilities" },
  { id: "jpg-to-png", title: "JPG to PNG", description: "Convert JPG images to PNG format instantly.", icon: ImageIcon, href: "/jpg-to-png", color: "bg-blue-500", category: "Images" },
  { id: "mp4-to-webm", title: "MP4 to WEBM", description: "Convert video formats seamlessly.", icon: Video, href: "/mp4-to-webm", color: "bg-orange-500", category: "Video" },
  { id: "txt-to-pdf", title: "TXT to PDF", description: "Convert text files to PDF documents.", icon: FileText, href: "/txt-to-pdf", color: "bg-gray-500", category: "PDF" },
  { id: "mp3-to-wav", title: "MP3 to WAV", description: "Convert audio formats without losing quality.", icon: Music, href: "/mp3-to-wav", color: "bg-purple-500", category: "Audio" }
]
