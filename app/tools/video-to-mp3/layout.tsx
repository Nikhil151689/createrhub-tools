import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video to MP3 Converter | Free Online File Converter",
  description: "Extract high-quality audio from any video file instantly in your browser. Fast, free, and secure.",
  alternates: {
    canonical: "https://creatorhubtools.com/tools/video-to-mp3",
  },
  openGraph: {
    title: "Video to MP3 Converter | CreatorHub Tools",
    description: "Extract high-quality audio from any video file instantly in your browser. Fast, free, and secure.",
    type: "website",
    url: "https://creatorhubtools.com/tools/video-to-mp3",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to MP3 Converter | CreatorHub Tools",
    description: "Extract high-quality audio from any video file instantly in your browser.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
