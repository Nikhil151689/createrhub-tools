$urls = @('http://localhost:3000/', 'http://localhost:3000/tools/pdf-merge', 'http://localhost:3000/tools/image-compressor', 'http://localhost:3000/tools/qr-generator')

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "$url -> $($response.StatusCode)"
    } catch {
        Write-Host "$url -> ERROR: $($_.Exception.Message)"
    }
}
