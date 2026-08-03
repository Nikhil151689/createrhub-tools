"use client"

import { useState } from "react"
import { Download, RefreshCw, FileText, Trash2, GripVertical } from "lucide-react"

import { formatSize } from "@/lib/utils"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { UploadArea } from "@/components/tools/UploadArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([])
  const [isMerging, setIsMerging] = useState(false)
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null)

  const handleUpload = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
    setMergedPdfUrl(null)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setMergedPdfUrl(null)
  }

  const handleMerge = async () => {
    if (files.length < 2) return
    setIsMerging(true)
    
    try {
      const { PDFDocument } = await import("pdf-lib")
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      setMergedPdfUrl(url)
    } catch (error) {
      console.error(error)
    } finally {
      setIsMerging(false)
    }
  }

  const handleDownload = () => {
    if (!mergedPdfUrl) return
    const link = document.createElement("a")
    link.href = mergedPdfUrl
    link.download = "merged-document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document entirely in your browser."
      faqs={[
        {
          question: "Are my PDFs uploaded to a server?",
          answer: "No, this tool uses browser-side processing. Your PDF files never leave your device."
        },
        {
          question: "Is there a limit on how many PDFs I can merge?",
          answer: "There is no hard limit, but merging dozens of very large PDFs might consume a lot of memory in your browser."
        }
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UploadArea 
            onUpload={handleUpload}
            accept={{ 'application/pdf': ['.pdf'] }}
            maxFiles={20}
            title="Add PDFs to Merge"
            description="Drag & drop PDF files here, or click to browse"
          />

          {files.length > 0 && (
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px] w-full">
                  <div className="p-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border group">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        <div className="bg-red-500/10 p-2 rounded text-red-600 dark:text-red-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Merge Settings</h3>
                <p className="text-sm text-muted-foreground">Order your files and click merge when ready.</p>
              </div>

              <div className="bg-muted p-4 rounded-lg flex justify-between items-center text-sm">
                <span>Total Files</span>
                <span className="font-semibold">{files.length}</span>
              </div>

              {!mergedPdfUrl ? (
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
                >
                  {isMerging ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Merge PDFs
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Merged PDF
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setFiles([])
                    setMergedPdfUrl(null)
                  }}>
                    Start Over
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
