import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image Compressor | Free Online File Converter",
  description: "Reduce image file size instantly in your browser without losing quality. Support for JPG, PNG, and WebP.",
  alternates: {
    canonical: "https://creatorhubtools.com/tools/image-compressor",
  },
  openGraph: {
    title: "Image Compressor | CreatorHub Tools",
    description: "Reduce image file size instantly in your browser without losing quality.",
    type: "website",
    url: "https://creatorhubtools.com/tools/image-compressor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor | CreatorHub Tools",
    description: "Reduce image file size instantly in your browser without losing quality.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
