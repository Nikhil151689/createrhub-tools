"use client"

import { useState } from "react"
import { Download, RefreshCw, FileImage } from "lucide-react"

import { formatSize } from "@/lib/utils"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { UploadArea } from "@/components/tools/UploadArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return
    const file = files[0]
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    setCompressedFile(null)
    setCompressedUrl(null)
  }

  const handleCompress = async () => {
    if (!originalFile) return
    setIsCompressing(true)
    
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      
      const { default: imageCompression } = await import("browser-image-compression")
      const compressedBlob = await imageCompression(originalFile, options)
      // browser-image-compression returns a Blob, convert to File
      const newFile = new File([compressedBlob], originalFile.name, {
        type: compressedBlob.type,
      })
      
      setCompressedFile(newFile)
      setCompressedUrl(URL.createObjectURL(compressedBlob))
    } catch (error) {
      console.error(error)
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedUrl || !compressedFile) return
    const link = document.createElement("a")
    link.href = compressedUrl
    // Append '-compressed' to the filename before extension
    const nameParts = compressedFile.name.split('.')
    const ext = nameParts.pop()
    const baseName = nameParts.join('.')
    link.download = `${baseName}-compressed.${ext}`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size instantly in your browser without losing quality."
      faqs={[
        {
          question: "Are my images uploaded to a server?",
          answer: "No. All image compression happens entirely in your browser. Your images never leave your device, ensuring complete privacy and security."
        },
        {
          question: "What image formats are supported?",
          answer: "We support common formats like JPEG, PNG, and WebP."
        }
      ]}
    >
      {!originalFile ? (
        <UploadArea 
          onUpload={handleUpload}
          accept={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
          }}
          title="Select Image to Compress"
          description="Drag & drop your image here, or click to browse"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Settings / Action Panel */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                <FileImage className="h-8 w-8 text-primary" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{originalFile.name}</p>
                  <p className="text-sm text-muted-foreground">Original Size: {formatSize(originalFile.size)}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Compression Settings</Label>
                <p className="text-sm text-muted-foreground">
                  Using smart compression to reduce size while maintaining visual quality.
                </p>
              </div>

              {!compressedFile ? (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setOriginalFile(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleCompress} disabled={isCompressing} className="flex-1">
                    {isCompressing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Compress Image
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4">
                   <Button variant="outline" onClick={() => {
                     setOriginalFile(null)
                     setCompressedFile(null)
                   }} className="flex-1">
                    Compress Another
                  </Button>
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Panel */}
          <Card className="flex flex-col items-center justify-center p-6 min-h-[300px] overflow-hidden relative group">
            {compressedUrl ? (
               <>
                 <div className="absolute inset-0 p-4">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={compressedUrl} alt="Compressed" className="w-full h-full object-contain rounded-lg" />
                 </div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur border shadow-lg rounded-full px-6 py-2 text-sm font-medium flex items-center gap-4">
                    <span className="text-green-500">New Size: {formatSize(compressedFile?.size || 0)}</span>
                    <span className="text-muted-foreground">
                      Saved {Math.round((1 - (compressedFile?.size || 0) / originalFile.size) * 100)}%
                    </span>
                 </div>
               </>
            ) : originalUrl ? (
               <div className="absolute inset-0 p-4 opacity-50">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={originalUrl} alt="Original" className="w-full h-full object-contain rounded-lg" />
               </div>
            ) : null}
          </Card>
        </div>
      )}
    </ToolLayout>
  )
}
