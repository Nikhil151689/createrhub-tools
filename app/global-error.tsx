"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background text-foreground">
          <div className="bg-destructive/10 p-4 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-destructive" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold mb-4">A critical error occurred</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <button 
            onClick={() => reset()} 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
