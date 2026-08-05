import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CreatorHub Tools",
  description: "Read the CreatorHub Tools privacy policy to understand how we protect your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p><strong>Last Updated:</strong> August 5, 2026</p>

        <p>
          At CreatorHub Tools ("we", "us", or "our"), accessible from creatorhubtools.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CreatorHub Tools and how we use it.
        </p>

        <h2>1. Client-Side Processing</h2>
        <p>
          We pride ourselves on providing a secure environment. Most of the file processing on CreatorHub Tools (such as image compression, PDF merging, and video conversion) happens <strong>locally in your browser</strong>. 
        </p>
        <p>
          This means your files are <strong>never uploaded to our servers</strong>. We have no access to the files you process, and they remain entirely on your device.
        </p>

        <h2>2. Local Storage and Cookies</h2>
        <p>
          We use browser Local Storage to save your preferences, such as your "Favorited Tools" and "Recently Used Tools" to enhance your user experience. This data remains on your device and is not transmitted to our servers.
        </p>
        <p>
          We may also use standard cookies to analyze website traffic and serve personalized advertisements through third-party vendors like Google AdSense.
        </p>

        <h2>3. Third-Party Advertisers (Google AdSense)</h2>
        <p>
          We use Google AdSense to display ads on some of our pages. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet.
        </p>
        <p>
          Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
        </p>

        <h2>4. Log Files</h2>
        <p>
          CreatorHub Tools follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2>5. Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </div>
  )
}
