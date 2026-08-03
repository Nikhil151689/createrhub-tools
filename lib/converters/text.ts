export async function convertText(file: File, fromFormat: string, toFormat: string): Promise<string> {
  const text = await file.text();
  
  if (fromFormat === "md" && toFormat === "html") {
    const { marked } = await import("marked");
    const html = await marked(text);
    const blob = new Blob([html], { type: "text/html" });
    return URL.createObjectURL(blob);
  }
  
  if (fromFormat === "html" && toFormat === "md") {
    const TurndownService = (await import("turndown")).default;
    const turndownService = new TurndownService();
    const md = turndownService.turndown(text);
    const blob = new Blob([md], { type: "text/markdown" });
    return URL.createObjectURL(blob);
  }

  if (fromFormat === "txt" && toFormat === "pdf") {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 15, 15);
    const blob = doc.output("blob");
    return URL.createObjectURL(blob);
  }
  
  throw new Error("Unsupported text conversion");
}
