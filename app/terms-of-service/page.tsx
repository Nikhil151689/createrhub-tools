import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | CreatorHub Tools",
  description: "Terms and conditions for using CreatorHub Tools.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p><strong>Last Updated:</strong> August 5, 2026</p>

        <p>
          Welcome to CreatorHub Tools. By accessing this website, we assume you accept these terms and conditions. Do not continue to use CreatorHub Tools if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2>1. License</h2>
        <p>
          Unless otherwise stated, CreatorHub Tools and/or its licensors own the intellectual property rights for all material on CreatorHub Tools. All intellectual property rights are reserved. You may access this from CreatorHub Tools for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h2>2. Use of Tools</h2>
        <p>
          Our tools are provided "as is" and "as available". You agree to use the tools responsibly. You must not use our tools to process, generate, or distribute illegal, malicious, or copyrighted material that you do not have the rights to.
        </p>
        
        <h2>3. Local Processing</h2>
        <p>
          Because our tools process files locally within your browser, we do not guarantee the successful processing of extremely large files, as this depends heavily on the hardware capabilities of your specific device (e.g., available RAM). We are not liable for browser crashes resulting from intensive processing.
        </p>

        <h2>4. User Generated Content</h2>
        <p>
          We do not host or store the files you process. You are solely responsible for the content you process using our utilities.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of our tools. We reserve the right to modify, suspend, or discontinue any tool at any time without notice.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
      </div>
    </div>
  )
}
