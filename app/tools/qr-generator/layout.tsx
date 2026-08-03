import { Metadata } from "next"

export const metadata: Metadata = {
  title: "QR Code Generator | Free Online Utility",
  description: "Create custom QR codes for URLs, text, email, and more instantly. Free to use with no expiration.",
  alternates: {
    canonical: "https://creatorhubtools.com/tools/qr-generator",
  },
  openGraph: {
    title: "QR Code Generator | CreatorHub Tools",
    description: "Create custom QR codes for URLs, text, email, and more instantly.",
    type: "website",
    url: "https://creatorhubtools.com/tools/qr-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator | CreatorHub Tools",
    description: "Create custom QR codes for URLs, text, email, and more instantly.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
