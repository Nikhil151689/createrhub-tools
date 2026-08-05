"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw, Archive, Plus } from "lucide-react"

import { ToolLayout } from "@/components/tools/ToolLayout"
import { UploadArea } from "@/components/tools/UploadArea"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFileQueue } from "@/hooks/useFileQueue"
import { QueueList } from "@/components/tools/QueueList"
import { downloadAsZip } from "@/lib/zip"
import { BeforeAfterComparison } from "@/components/tools/BeforeAfterComparison"
import { formatSize } from "@/lib/utils"

export default function ImageCompressorPage() {
  const {
    queue,
    addFiles,
    removeFile,
    updateFileStatus,
    updateFileProgress,
    updateFileResult,
    clearQueue,
    getPendingFiles,
    getCompletedFiles,
    isProcessing,
  } = useFileQueue()

  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (files: File[]) => {
    setError(null)
    const validFiles: File[] = []
    const { validateFileSignature, SIGNATURES } = await import("@/lib/security")

    for (const file of files) {
      if (file.size > 20 * 1024 * 1024) {
        setError(`Some files were ignored. Maximum size is 20MB.`)
        continue
      }
      const isValid = await validateFileSignature(file, [...SIGNATURES.JPEG, ...SIGNATURES.PNG, ...SIGNATURES.WEBP])
      if (isValid) {
        validFiles.push(file)
      } else {
        setError(`Some files were ignored due to invalid image signature.`)
      }
    }
    
    if (validFiles.length > 0) {
      addFiles(validFiles)
    }
  }

  const processFile = async (item: any) => {
    updateFileStatus(item.id, "processing")
    updateFileProgress(item.id, 10)
    
    try {
      const { default: imageCompression } = await import("browser-image-compression")
      
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (prog: number) => {
          updateFileProgress(item.id, 10 + (prog * 0.8)) // Scale progress 10% -> 90%
        }
      }
      
      const compressedBlob = await imageCompression(item.file, options)
      updateFileProgress(item.id, 95)
      
      const newFile = new File([compressedBlob], item.file.name, {
        type: compressedBlob.type,
      })
      
      updateFileResult(
        item.id,
        URL.createObjectURL(compressedBlob),
        compressedBlob.size,
        compressedBlob,
        newFile
      )
      
      if (!activePreviewId) {
        setActivePreviewId(item.id)
      }
      
    } catch (err) {
      updateFileStatus(item.id, "error", "Compression failed")
    }
  }

  const handleCompressAll = async () => {
    const pending = getPendingFiles()
    if (pending.length === 0) return

    // Process concurrently but limit if there are too many? Let's just run them all for now.
    await Promise.all(pending.map(item => processFile(item)))
  }

  const handleDownloadZip = async () => {
    const completed = getCompletedFiles()
    if (completed.length === 0) return
    
    const files = completed
      .filter((f) => f.resultBlob)
      .map((f) => {
        const nameParts = f.file.name.split('.')
        const ext = nameParts.pop()
        const baseName = nameParts.join('.')
        return {
          name: `${baseName}-compressed.${ext}`,
          blob: f.resultBlob!
        }
      })
      
    await downloadAsZip(files, "compressed-images")
  }

  const handleDownloadSingle = (id: string) => {
    const file = queue.find(f => f.id === id)
    if (!file || !file.resultUrl) return
    
    const nameParts = file.file.name.split('.')
    const ext = nameParts.pop()
    const baseName = nameParts.join('.')
    
    const link = document.createElement("a")
    link.href = file.resultUrl
    link.download = `${baseName}-compressed.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Find active preview item
  const previewItem = activePreviewId 
    ? queue.find(f => f.id === activePreviewId)
    : queue.find(f => f.status === "completed")

  useEffect(() => {
    // If previewItem is not found (e.g. removed), reset
    if (!previewItem && activePreviewId) {
      setActivePreviewId(null)
    }
  }, [queue, activePreviewId, previewItem])

  return (
    <ToolLayout
      toolId="image-compressor"
      title="Image Compressor"
      description="Batch compress images instantly in your browser without losing quality."
      faqs={[
        {
          question: "Are my images uploaded to a server?",
          answer: "No. All image compression happens entirely in your browser. Your images never leave your device."
        },
        {
          question: "Can I compress multiple images?",
          answer: "Yes, you can upload multiple images at once and we will process them in batch. You can download them individually or as a ZIP file."
        }
      ]}
    >
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        
        {queue.length === 0 ? (
          <UploadArea 
            onUpload={handleUpload}
            maxFiles={50}
            accept={{
              'image/jpeg': ['.jpg', '.jpeg'],
              'image/png': ['.png'],
              'image/webp': ['.webp']
            }}
            title="Select Images to Compress"
            description="Drag & drop multiple images here, or click to browse"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Queue & Actions Panel */}
            <Card className="flex flex-col h-full max-h-[700px]">
              <CardContent className="p-6 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Batch Queue</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => clearQueue()} disabled={isProcessing}>
                      Clear
                    </Button>
                    <label className={isProcessing ? "opacity-50 pointer-events-none" : "cursor-pointer"}>
                      <span className={buttonVariants({ variant: "secondary", size: "sm" })}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add More
                      </span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/jpeg,image/png,image/webp" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files) {
                            handleUpload(Array.from(e.target.files))
                          }
                          e.target.value = ''
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <QueueList 
                    queue={queue} 
                    onRemove={removeFile}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t space-y-4">
                  {getPendingFiles().length > 0 && (
                    <Button onClick={handleCompressAll} disabled={isProcessing} className="w-full">
                      {isProcessing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Compress {getPendingFiles().length} Pending {getPendingFiles().length === 1 ? 'Image' : 'Images'}
                    </Button>
                  )}
                  
                  {getCompletedFiles().length > 0 && (
                    <div className="flex gap-3">
                       <Button onClick={handleDownloadZip} className="flex-1" variant="default">
                        <Archive className="mr-2 h-4 w-4" />
                        Download All (ZIP)
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card className="flex flex-col">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                {previewItem && previewItem.status === "completed" && previewItem.resultUrl ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-center truncate px-4">
                      {previewItem.file.name}
                    </h3>
                    <BeforeAfterComparison 
                      originalUrl={URL.createObjectURL(previewItem.file)}
                      compressedUrl={previewItem.resultUrl}
                      originalSize={previewItem.originalSize}
                      compressedSize={previewItem.resultSize || 0}
                    />
                    <div className="flex justify-center pt-2">
                       <Button onClick={() => handleDownloadSingle(previewItem.id)} variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Single
                       </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <p>Process an image to see the before & after comparison.</p>
                  </div>
                )}
                
                {/* Thumbnails of completed for quick switching */}
                {getCompletedFiles().length > 1 && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Click to preview:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {getCompletedFiles().map(item => (
                        <button
                          key={item.id}
                          onClick={() => setActivePreviewId(item.id)}
                          className={`shrink-0 relative w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                            activePreviewId === item.id || (!activePreviewId && previewItem?.id === item.id)
                              ? "border-primary shadow-sm" 
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={item.resultUrl} 
                            alt={item.file.name} 
                            className="w-full h-full object-cover" 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
