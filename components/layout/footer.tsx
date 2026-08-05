import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-xl">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-tight text-xl">
                CreatorHub Tools
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop destination for modern, fast, and secure online utilities. Process files directly in your browser without compromising privacy.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/pdf-merge" className="hover:text-primary transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/image-compressor" className="hover:text-primary transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-primary transition-colors">QR Code Generator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {currentYear} CreatorHub Tools. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span>Made with ❤️ for Creators</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
