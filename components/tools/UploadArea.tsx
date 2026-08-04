"use client"

import { AlertCircle, UploadCloud } from "lucide-react"
import { useCallback, useState } from "react"
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone"

interface UploadAreaProps {
  onUpload: (files: File[]) => void
  accept?: DropzoneOptions["accept"]
  maxFiles?: number
  maxSize?: number // bytes
  title?: string
  description?: string
}

export function UploadArea({
  onUpload,
  accept,
  maxFiles = 1,
  maxSize = 100 * 1024 * 1024, // 100MB default
  title = "Select or Drop Files",
  description = "Drag and drop your files here, or click to browse",
}: UploadAreaProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null)
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection.errors[0]?.code === "file-too-large") {
        setError(`File is too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`)
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        setError("Invalid file type.")
      } else {
        setError(rejection.errors[0]?.message || "Error uploading file.")
      }
      return
    }

    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles)
    }
  }, [onUpload, maxSize])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
        ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"}
        ${isDragReject ? "border-red-500 bg-red-500/5" : ""}
      `}
    >
      <input {...getInputProps()} aria-label={title} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full ${isDragActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
          <UploadCloud className="w-10 h-10" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
        {maxFiles > 1 && (
          <p className="text-xs text-muted-foreground mt-4">
            Up to {maxFiles} files allowed.
          </p>
        )}
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-500/10 text-red-600 rounded-lg flex items-center justify-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
