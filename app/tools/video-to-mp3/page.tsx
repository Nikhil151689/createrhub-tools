"use client"

import { Download, FileVideo, Music, RefreshCw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { FFmpeg } from "@ffmpeg/ffmpeg"

import { formatSize } from "@/lib/utils"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { UploadArea } from "@/components/tools/UploadArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function VideoToMp3Page() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const ffmpegRef = useRef<FFmpeg | null>(null)

  useEffect(() => {
    const init = async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg")
      ffmpegRef.current = new FFmpeg()
    }
    init()
  }, [])

  const handleUpload = (files: File[]) => {
    if (files.length === 0) return
    setVideoFile(files[0])
    setAudioUrl(null)
    setProgress(0)
  }

  const handleConvert = async () => {
    if (!videoFile) return
    setIsConverting(true)
    setProgress(0)

    try {
      const ffmpeg = ffmpegRef.current

      ffmpeg.on('progress', ({ progress }: { progress: number }) => {
        setProgress(Math.round(progress * 100))
      })

      if (!ffmpeg.loaded) {
        await ffmpeg.load()
      }

      const inputName = 'input-video'
      const outputName = 'output.mp3'

      const { fetchFile } = await import("@ffmpeg/util")
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile))

      // Run the FFmpeg command
      await ffmpeg.exec(['-i', inputName, '-vn', '-ab', '128k', '-ar', '44100', '-y', outputName])

      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([data as unknown as BlobPart], { type: 'audio/mp3' })
      const url = URL.createObjectURL(blob)

      setAudioUrl(url)
    } catch (error) {
      console.error('Error converting video:', error)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!audioUrl || !videoFile) return
    const link = document.createElement("a")
    link.href = audioUrl
    const baseName = videoFile.name.split('.').slice(0, -1).join('.')
    link.download = `${baseName || 'converted'}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ToolLayout
      title="Video to MP3"
      description="Extract high-quality audio from any video file instantly in your browser."
      faqs={[
        {
          question: "Is my video uploaded to a server?",
          answer: "No, this tool processes everything directly in your browser using WebAssembly. Your files are completely private and never leave your device."
        },
        {
          question: "What video formats are supported?",
          answer: "We support almost all standard video formats including MP4, WebM, MKV, AVI, and MOV."
        }
      ]}
    >
      {!videoFile ? (
        <UploadArea
          onUpload={handleUpload}
          accept={{
            'video/*': ['.mp4', '.webm', '.mkv', '.avi', '.mov']
          }}
          title="Select Video File"
          description="Drag & drop your video here, or click to browse"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                <FileVideo className="h-8 w-8 text-primary" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{videoFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatSize(videoFile.size)}</p>
                </div>
              </div>

              {!audioUrl ? (
                <div className="space-y-4">
                  {isConverting && (
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
                    <Button variant="outline" onClick={() => setVideoFile(null)} className="flex-1" disabled={isConverting}>
                      Cancel
                    </Button>
                    <Button onClick={handleConvert} disabled={isConverting} className="flex-1">
                      {isConverting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isConverting ? 'Extracting...' : 'Extract Audio'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center gap-3">
                    <Music className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Audio Extracted Successfully!</p>
                      <p className="text-sm opacity-80">Ready to download</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => {
                      setVideoFile(null)
                      setAudioUrl(null)
                    }} className="flex-1">
                      Convert Another
                    </Button>
                    <Button onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download MP3
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 min-h-[300px] relative overflow-hidden group bg-muted/20">
            {audioUrl ? (
              <div className="w-full max-w-md space-y-4 flex flex-col items-center">
                <Music className="w-24 h-24 text-primary opacity-50 mb-4" />
                <audio controls src={audioUrl} className="w-full" />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Music className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Preview will appear here after conversion</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </ToolLayout>
  )
}
