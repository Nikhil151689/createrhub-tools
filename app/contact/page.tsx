import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Us | CreatorHub Tools",
  description: "Get in touch with the CreatorHub Tools team for support, feature requests, or business inquiries.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            We love hearing from our users! Whether you have a question, a feature request, or you've encountered an issue, please feel free to drop us a message.
          </p>
          
          <h3>Support</h3>
          <p>
            For technical support regarding our tools, please ensure you include details such as your browser type and the specific tool you were using.
          </p>

          <h3>Business & Partnerships</h3>
          <p>
            For business inquiries, advertising, or potential partnerships, please select the appropriate subject in the form.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded-md bg-background" placeholder="Your Name" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" id="email" className="w-full p-2 border rounded-md bg-background" placeholder="you@example.com" required />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <select id="subject" className="w-full p-2 border rounded-md bg-background" required>
                <option value="support">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="business">Business Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full p-2 border rounded-md bg-background" placeholder="How can we help you?" required></textarea>
            </div>

            <Button type="button" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
