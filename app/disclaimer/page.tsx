import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer | CreatorHub Tools",
  description: "General disclaimer for the use of CreatorHub Tools.",
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Disclaimer</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p><strong>Last Updated:</strong> August 5, 2026</p>

        <h2>General Information</h2>
        <p>
          All the information on this website - creatorhubtools.com - is published in good faith and for general information purpose only. CreatorHub Tools does not make any warranties about the completeness, reliability, and accuracy of this information. 
        </p>
        <p>
          Any action you take upon the information you find on this website (CreatorHub Tools), is strictly at your own risk. CreatorHub Tools will not be liable for any losses and/or damages in connection with the use of our website.
        </p>

        <h2>Tool Usage</h2>
        <p>
          While we strive to provide high-quality and reliable tools (e.g., file converters, compressors), the results of these tools may vary depending on the input file, your device's hardware, and browser limitations. We do not guarantee that the output will be perfect for every use case. Always verify the results before using them in critical or professional environments.
        </p>

        <h2>External Links</h2>
        <p>
          From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
        </p>

        <h2>Consent</h2>
        <p>
          By using our website, you hereby consent to our disclaimer and agree to its terms.
        </p>

        <h2>Update</h2>
        <p>
          Should we update, amend or make any changes to this document, those changes will be prominently posted here.
        </p>
      </div>
    </div>
  )
}
