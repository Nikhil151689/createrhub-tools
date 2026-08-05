"use client"

import { FileIcon, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { formatSize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QueueFile } from "@/hooks/useFileQueue"

interface QueueListProps {
  queue: QueueFile[]
  onRemove: (id: string) => void
}

export function QueueList({ queue, onRemove }: QueueListProps) {
  if (queue.length === 0) return null

  return (
    <div className="space-y-3 mt-6">
      <h3 className="font-medium text-sm text-muted-foreground flex items-center justify-between">
        <span>Processing Queue ({queue.length})</span>
      </h3>
      <div className="grid gap-3">
        <AnimatePresence>
          {queue.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group"
            >
              {/* Background Progress */}
              {item.status === "processing" && (
                <div 
                  className="absolute inset-0 bg-primary/5 transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              )}
              
              <div className="flex items-center gap-3 flex-1 min-w-0 z-10 w-full">
                <div className="p-2 bg-muted rounded-md shrink-0">
                  <FileIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{formatSize(item.originalSize)}</span>
                    
                    {item.status === "completed" && item.resultSize && (
                      <>
                        <span>→</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {formatSize(item.resultSize)}
                        </span>
                        <span className="text-green-600/80 dark:text-green-400/80">
                          (-{Math.round((1 - item.resultSize / item.originalSize) * 100)}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto z-10">
                {item.status === "pending" && (
                  <span className="text-xs font-medium text-muted-foreground ml-auto sm:ml-0">Pending</span>
                )}
                {item.status === "processing" && (
                  <div className="flex items-center gap-2 ml-auto sm:ml-0 flex-1 sm:flex-none">
                    <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                    <Progress value={item.progress} className="w-full sm:w-24 h-1.5" />
                    <span className="text-xs font-medium w-8 text-right shrink-0">{Math.round(item.progress)}%</span>
                  </div>
                )}
                {item.status === "completed" && (
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 ml-auto sm:ml-0">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Done</span>
                  </div>
                )}
                {item.status === "error" && (
                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 ml-auto sm:ml-0" title={item.error}>
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-medium truncate max-w-[100px]">{item.error || "Failed"}</span>
                  </div>
                )}

                {(item.status === "pending" || item.status === "error") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemove(item.id)}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
