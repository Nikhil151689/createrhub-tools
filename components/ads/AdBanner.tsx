"use client"

import { useEffect, useState } from "react"

interface AdBannerProps {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
  className?: string
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  className = "",
}: AdBannerProps) {
  const [isAdBlocker, setIsAdBlocker] = useState(false)
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    // Basic ad blocker detection (simplified)
    const checkAdBlocker = async () => {
      try {
        const response = await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
          method: "HEAD",
          mode: "no-cors"
        })
        if (!response) {
          setIsAdBlocker(true)
        }
      } catch {
        setIsAdBlocker(true)
      }
    }
    checkAdBlocker()

    // Initialize adsbygoogle
    if (publisherId && !isAdBlocker) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []
        adsbygoogle.push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [publisherId, isAdBlocker])

  // Placeholder when not configured or adblocker is active
  if (!publisherId || isAdBlocker) {
    return (
      <div className={`w-full bg-muted/50 border border-dashed rounded-lg flex items-center justify-center p-4 text-muted-foreground text-sm ${className}`} style={{ minHeight: "100px" }}>
        {isAdBlocker ? "Please disable AdBlock to support us" : "Google AdSense Placeholder"}
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={publisherId}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
      />
    </div>
  )
}
