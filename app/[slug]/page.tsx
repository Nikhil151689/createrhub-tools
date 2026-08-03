import { notFound } from "next/navigation"
import { Metadata } from "next"
import { CONVERTERS, getConverterById } from "@/lib/converter-config"
import { FileConverterUI } from "@/components/tools/FileConverterUI"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CONVERTERS.map((converter) => ({
    slug: converter.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const converter = getConverterById(resolvedParams.slug)
  
  if (!converter) {
    return {}
  }

  return {
    title: `${converter.title} - Free Online File Converter`,
    description: converter.description,
    alternates: {
      canonical: `https://creatorhubtools.com/${converter.id}`,
    },
    openGraph: {
      title: `${converter.title} | CreatorHub Tools`,
      description: converter.description,
      type: "website",
      url: `https://creatorhubtools.com/${converter.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${converter.title} | CreatorHub Tools`,
      description: converter.description,
    },
  }
}

export default async function ConverterPage({ params }: Props) {
  const resolvedParams = await params;
  const converter = getConverterById(resolvedParams.slug)
  
  if (!converter) {
    notFound()
  }

  // Generate structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": converter.title,
    "operatingSystem": "Any",
    "applicationCategory": "BrowserApplication",
    "description": converter.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is it safe to convert ${converter.fromFormat.toUpperCase()} to ${converter.toFormat.toUpperCase()} here?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All conversions happen entirely in your browser. Your files are never uploaded to our servers, ensuring absolute privacy and security."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FileConverterUI config={converter} />
    </>
  )
}
