import JSZip from "jszip"
import { sanitizeFilename } from "./security"

export async function downloadAsZip(files: { name: string; blob: Blob }[], zipName: string) {
  if (files.length === 0) return

  const zip = new JSZip()
  
  files.forEach((file) => {
    zip.file(sanitizeFilename(file.name), file.blob)
  })

  const content = await zip.generateAsync({ type: "blob" })
  
  const link = document.createElement("a")
  link.href = URL.createObjectURL(content)
  link.download = `${sanitizeFilename(zipName)}.zip`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
