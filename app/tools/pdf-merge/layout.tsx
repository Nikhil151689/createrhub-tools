import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Merge PDF Files | Free Online File Converter",
  description: "Combine multiple PDF files into a single document entirely in your browser. Fast, free, and secure.",
  alternates: {
    canonical: "https://creatorhubtools.com/tools/pdf-merge",
  },
  openGraph: {
    title: "Merge PDF Files | CreatorHub Tools",
    description: "Combine multiple PDF files into a single document entirely in your browser.",
    type: "website",
    url: "https://creatorhubtools.com/tools/pdf-merge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files | CreatorHub Tools",
    description: "Combine multiple PDF files into a single document entirely in your browser.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
