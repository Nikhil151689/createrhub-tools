"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, RefreshCw, FileText, CheckCircle, AlertCircle, FileIcon } from "lucide-react"

import { formatSize } from "@/lib/utils"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { UploadArea } from "@/components/tools/UploadArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ConverterConfig } from "@/lib/converter-config"

import { convertImage } from "@/lib/converters/image"
import { convertJpgToPdf, convertPdfToJpg } from "@/lib/converters/pdf"
import { convertText } from "@/lib/converters/text"
import { convertMedia } from "@/lib/converters/media"

interface Props {
  config: ConverterConfig
}

export function FileConverterUI({ config }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = (files: File[]) => {
    if (files.length === 0) return
    const selectedFile = files[0]
    
    // Validate size (e.g. 500MB limit)
    if (selectedFile.size > 500 * 1024 * 1024) {
      setError("File is too large. Maximum size is 500MB.")
      return
    }

    setFile(selectedFile)
    setResultUrl(null)
    setError(null)
    setProgress(0)
  }

  const handleConvert = async () => {
    if (!file) return
    setIsConverting(true)
    setError(null)
    setProgress(0)
    
    try {
      let url = ""
      if (config.category === "Images") {
        url = await convertImage(file, config.toFormat)
      } else if (config.id === "jpg-to-pdf") {
        url = await convertJpgToPdf(file)
      } else if (config.id === "pdf-to-jpg") {
        url = await convertPdfToJpg(file)
      } else if (config.category === "Text") {
        url = await convertText(file, config.fromFormat, config.toFormat)
      } else if (config.category === "Video" || config.category === "Audio") {
        url = await convertMedia(file, config.toFormat, (p) => setProgress(p))
      } else {
        throw new Error("Unsupported conversion logic")
      }
      setResultUrl(url)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "An error occurred during conversion.")
    } finally {
      setIsConverting(false)
      setProgress(100)
    }
  }

  const handleDownload = () => {
    if (!resultUrl || !file) return
    const link = document.createElement("a")
    link.href = resultUrl
    
    const nameParts = file.name.split('.')
    nameParts.pop() // remove old extension
    link.download = `${nameParts.join('.')}-converted.${config.toFormat}`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    setFile(null)
    setResultUrl(null)
    setError(null)
    setProgress(0)
  }

  // Determine accept prop based on fromFormat
  const accept: Record<string, string[]> = {}
  if (config.fromFormat === "pdf") accept['application/pdf'] = ['.pdf']
  else if (config.fromFormat === "jpg") accept['image/jpeg'] = ['.jpg', '.jpeg']
  else if (config.fromFormat === "png") accept['image/png'] = ['.png']
  else if (config.fromFormat === "webp") accept['image/webp'] = ['.webp']
  else if (config.fromFormat === "mp3") accept['audio/mpeg'] = ['.mp3']
  else if (config.fromFormat === "wav") accept['audio/wav'] = ['.wav']
  else if (config.fromFormat === "aac") accept['audio/aac'] = ['.aac']
  else if (config.fromFormat === "mp4") accept['video/mp4'] = ['.mp4']
  else if (config.fromFormat === "webm") accept['video/webm'] = ['.webm']
  else if (config.fromFormat === "mov") accept['video/quicktime'] = ['.mov']
  else if (config.fromFormat === "avi") accept['video/x-msvideo'] = ['.avi']
  else if (config.fromFormat === "txt") accept['text/plain'] = ['.txt']
  else if (config.fromFormat === "md") accept['text/markdown'] = ['.md']
  else if (config.fromFormat === "html") accept['text/html'] = ['.html']

  return (
    <ToolLayout
      title={config.title}
      description={config.description}
      faqs={[
        {
          question: `Is it safe to convert ${config.fromFormat.toUpperCase()} to ${config.toFormat.toUpperCase()} here?`,
          answer: "Yes. All conversions happen entirely in your browser. Your files are never uploaded to our servers, ensuring absolute privacy and security."
        },
        {
          question: "Are there any file size limits?",
          answer: "Since the conversion runs in your browser, the limit depends on your device's available memory, but generally files under 500MB work perfectly fine."
        }
      ]}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {!file && (
          <UploadArea 
            onUpload={handleUpload}
            accept={accept}
            title={`Select ${config.fromFormat.toUpperCase()} File`}
            description="Drag & drop your file here, or click to browse"
          />
        )}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-red-500/10 text-red-600 p-4 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
            <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto">Dismiss</Button>
          </motion.div>
        )}

        {file && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                  <FileIcon className={`h-8 w-8 text-primary`} />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
                  </div>
                </div>

                {!resultUrl ? (
                  <div className="space-y-4">
                    {isConverting && (config.category === "Video" || config.category === "Audio") && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Converting...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={reset} className="flex-1" disabled={isConverting}>
                        Cancel
                      </Button>
                      <Button onClick={handleConvert} disabled={isConverting} className="flex-1">
                        {isConverting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isConverting ? 'Converting...' : 'Convert Now'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle className="h-6 w-6 shrink-0" />
                      <div>
                        <p className="font-medium">Conversion Successful!</p>
                        <p className="text-sm opacity-80">Ready to download</p>
                      </div>
                    </motion.div>
                    
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={reset} className="flex-1">
                        Convert Another
                      </Button>
                      <Button onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Download {config.toFormat.toUpperCase()}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center justify-center p-6 min-h-[300px] relative overflow-hidden bg-muted/20">
              {resultUrl ? (
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <p>Your {config.toFormat.toUpperCase()} file is ready.</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Preview will appear here after conversion</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </motion.div>
    </ToolLayout>
  )
}
