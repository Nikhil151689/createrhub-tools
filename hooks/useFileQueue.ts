import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"

export type FileStatus = "pending" | "processing" | "completed" | "error"

export interface QueueFile {
  id: string
  file: File
  status: FileStatus
  progress: number
  error?: string
  resultUrl?: string
  resultBlob?: Blob
  resultFile?: File
  originalSize: number
  resultSize?: number
}

export function useFileQueue() {
  const [queue, setQueue] = useState<QueueFile[]>([])

  const addFiles = useCallback((files: File[]) => {
    const newFiles: QueueFile[] = files.map((file) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      file,
      status: "pending",
      progress: 0,
      originalSize: file.size,
    }))
    setQueue((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((id: string) => {
    setQueue((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.resultUrl) {
        URL.revokeObjectURL(file.resultUrl)
      }
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const updateFileStatus = useCallback((id: string, status: FileStatus, error?: string) => {
    setQueue((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status, error } : f))
    )
  }, [])

  const updateFileProgress = useCallback((id: string, progress: number) => {
    setQueue((prev) =>
      prev.map((f) => (f.id === id ? { ...f, progress } : f))
    )
  }, [])

  const updateFileResult = useCallback(
    (id: string, resultUrl: string, resultSize: number, resultBlob?: Blob, resultFile?: File) => {
      setQueue((prev) =>
        prev.map((f) => (f.id === id ? { ...f, resultUrl, resultSize, resultBlob, resultFile, status: "completed", progress: 100 } : f))
      )
    },
    []
  )

  const clearQueue = useCallback(() => {
    setQueue((prev) => {
      prev.forEach((f) => {
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl)
      })
      return []
    })
  }, [])

  const getPendingFiles = useCallback(() => queue.filter(f => f.status === "pending"), [queue])
  const getProcessingFiles = useCallback(() => queue.filter(f => f.status === "processing"), [queue])
  const getCompletedFiles = useCallback(() => queue.filter(f => f.status === "completed"), [queue])
  
  const isProcessing = queue.some(f => f.status === "processing")
  
  return {
    queue,
    addFiles,
    removeFile,
    updateFileStatus,
    updateFileProgress,
    updateFileResult,
    clearQueue,
    getPendingFiles,
    getProcessingFiles,
    getCompletedFiles,
    isProcessing
  }
}
