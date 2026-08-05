export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">You are offline</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        It looks like you've lost your internet connection. Some tools might still work if they are fully loaded, but others require an active connection.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
