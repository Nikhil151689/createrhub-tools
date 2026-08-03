export type ConverterCategory = "Images" | "Documents" | "Text" | "Audio" | "Video"

export interface ConverterConfig {
  id: string
  title: string
  description: string
  category: ConverterCategory
  fromFormat: string
  toFormat: string
  iconName: "image" | "file-text" | "file" | "music" | "video"
  color: string
}

export const CONVERTERS: ConverterConfig[] = [
  // Images
  { id: "jpg-to-png", title: "JPG to PNG", description: "Convert JPG images to PNG format with transparency support.", category: "Images", fromFormat: "jpg", toFormat: "png", iconName: "image", color: "bg-blue-500" },
  { id: "png-to-jpg", title: "PNG to JPG", description: "Convert PNG images to JPG format for smaller file sizes.", category: "Images", fromFormat: "png", toFormat: "jpg", iconName: "image", color: "bg-blue-500" },
  { id: "jpg-to-webp", title: "JPG to WEBP", description: "Convert JPG to WebP for modern web performance.", category: "Images", fromFormat: "jpg", toFormat: "webp", iconName: "image", color: "bg-blue-500" },
  { id: "webp-to-jpg", title: "WEBP to JPG", description: "Convert WebP images back to highly compatible JPGs.", category: "Images", fromFormat: "webp", toFormat: "jpg", iconName: "image", color: "bg-blue-500" },
  { id: "png-to-webp", title: "PNG to WEBP", description: "Convert PNG to WebP format for optimal compression.", category: "Images", fromFormat: "png", toFormat: "webp", iconName: "image", color: "bg-blue-500" },
  { id: "webp-to-png", title: "WEBP to PNG", description: "Convert WebP images to PNG format.", category: "Images", fromFormat: "webp", toFormat: "png", iconName: "image", color: "bg-blue-500" },

  // Documents
  { id: "pdf-to-jpg", title: "PDF to JPG", description: "Extract pages from a PDF and save them as JPG images.", category: "Documents", fromFormat: "pdf", toFormat: "jpg", iconName: "file-text", color: "bg-red-500" },
  { id: "jpg-to-pdf", title: "JPG to PDF", description: "Combine multiple JPG images into a single PDF document.", category: "Documents", fromFormat: "jpg", toFormat: "pdf", iconName: "file-text", color: "bg-red-500" },

  // Text
  { id: "txt-to-pdf", title: "TXT to PDF", description: "Convert plain text files into PDF documents.", category: "Text", fromFormat: "txt", toFormat: "pdf", iconName: "file", color: "bg-gray-500" },
  { id: "markdown-to-html", title: "Markdown to HTML", description: "Convert Markdown syntax into clean HTML code.", category: "Text", fromFormat: "md", toFormat: "html", iconName: "file", color: "bg-gray-500" },
  { id: "html-to-markdown", title: "HTML to Markdown", description: "Convert HTML elements back into Markdown.", category: "Text", fromFormat: "html", toFormat: "md", iconName: "file", color: "bg-gray-500" },

  // Audio
  { id: "mp3-to-wav", title: "MP3 to WAV", description: "Convert compressed MP3 audio into lossless WAV format.", category: "Audio", fromFormat: "mp3", toFormat: "wav", iconName: "music", color: "bg-purple-500" },
  { id: "wav-to-mp3", title: "WAV to MP3", description: "Compress WAV audio files into MP3 format.", category: "Audio", fromFormat: "wav", toFormat: "mp3", iconName: "music", color: "bg-purple-500" },
  { id: "mp3-to-aac", title: "MP3 to AAC", description: "Convert MP3 audio to advanced AAC format.", category: "Audio", fromFormat: "mp3", toFormat: "aac", iconName: "music", color: "bg-purple-500" },
  { id: "aac-to-mp3", title: "AAC to MP3", description: "Convert AAC files to widely compatible MP3 audio.", category: "Audio", fromFormat: "aac", toFormat: "mp3", iconName: "music", color: "bg-purple-500" },

  // Video
  { id: "mp4-to-webm", title: "MP4 to WEBM", description: "Convert MP4 video to web-optimized WebM format.", category: "Video", fromFormat: "mp4", toFormat: "webm", iconName: "video", color: "bg-orange-500" },
  { id: "webm-to-mp4", title: "WEBM to MP4", description: "Convert WebM video back to standard MP4 format.", category: "Video", fromFormat: "webm", toFormat: "mp4", iconName: "video", color: "bg-orange-500" },
  { id: "mov-to-mp4", title: "MOV to MP4", description: "Convert Apple QuickTime MOV files to MP4.", category: "Video", fromFormat: "mov", toFormat: "mp4", iconName: "video", color: "bg-orange-500" },
  { id: "avi-to-mp4", title: "AVI to MP4", description: "Convert older AVI video files to modern MP4 format.", category: "Video", fromFormat: "avi", toFormat: "mp4", iconName: "video", color: "bg-orange-500" }
]

export function getConverterById(id: string): ConverterConfig | undefined {
  return CONVERTERS.find(c => c.id === id)
}
