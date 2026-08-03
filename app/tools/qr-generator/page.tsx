"use client"

import { useState } from "react"
import { Download, RefreshCw } from "lucide-react"

import { ToolLayout } from "@/components/tools/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function QRGeneratorPage() {
  const [text, setText] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!text.trim()) return
    setIsGenerating(true)
    try {
      const { default: QRCode } = await import("qrcode")
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        }
      })
      setQrCodeUrl(url)
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCodeUrl) return
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "qrcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, email, and more instantly."
      faqs={[
        {
          question: "Do these QR codes expire?",
          answer: "No, the QR codes generated here are static and will never expire as long as the destination URL or text remains valid."
        },
        {
          question: "Is this tool completely free?",
          answer: "Yes, you can generate as many QR codes as you need for free, for both personal and commercial use."
        }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text-input">URL or Text</Label>
                <Input 
                  id="text-input" 
                  placeholder="https://example.com" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!text.trim() || isGenerating}
              >
                {isGenerating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col items-center justify-center p-6 min-h-[300px]">
          {qrCodeUrl ? (
            <div className="flex flex-col items-center space-y-6 w-full">
              <div className="bg-white p-4 rounded-xl shadow-sm border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeUrl} alt="Generated QR Code" className="w-48 h-48" />
              </div>
              <Button onClick={handleDownload} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="w-48 h-48 border-2 border-dashed rounded-xl mb-4 flex items-center justify-center mx-auto bg-muted/20">
                <span className="text-sm">Preview Area</span>
              </div>
              <p>Enter text to generate a QR code</p>
            </div>
          )}
        </Card>
      </div>
    </ToolLayout>
  )
}
