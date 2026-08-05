import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | CreatorHub Tools",
  description: "Learn more about CreatorHub Tools, our mission, and the team behind the ultimate suite of free online utilities.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">About CreatorHub Tools</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p>
          Welcome to <strong>CreatorHub Tools</strong>. We are a dedicated platform built for digital creators, developers, students, and professionals who need fast, reliable, and secure online utilities.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to provide high-quality, privacy-first tools that make your digital life easier. Whether you are compressing images, merging PDFs, or generating QR codes, we believe that you shouldn't have to download bulky software or sacrifice your privacy to get the job done.
        </p>

        <h2>Privacy First</h2>
        <p>
          Unlike many other online tools, the vast majority of our utilities run entirely inside your browser using cutting-edge WebAssembly (Wasm) and client-side processing. This means your files <strong>never leave your device</strong>. We don't store your documents, we don't look at your images, and we don't track your sensitive data.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>100% Free:</strong> No hidden fees or subscription traps.</li>
          <li><strong>Lightning Fast:</strong> By utilizing local browser power, you don't have to wait for long server uploads.</li>
          <li><strong>Secure:</strong> Your files are processed locally on your machine.</li>
          <li><strong>Constantly Evolving:</strong> We are always adding new tools and improving existing ones based on community feedback.</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Have a suggestion for a new tool? Found a bug? We would love to hear from you. Please visit our <a href="/contact">Contact Page</a> to reach out to our team.
        </p>
      </div>
    </div>
  )
}
