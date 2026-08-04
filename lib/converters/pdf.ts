export async function convertJpgToPdf(file: File): Promise<string> {
  const { jsPDF } = await import("jspdf");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const orientation = img.width > img.height ? 'l' : 'p';
        const doc = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [img.width, img.height]
        });
        doc.addImage(img.src, 'JPEG', 0, 0, img.width, img.height);
        const blob = doc.output('blob');
        resolve(URL.createObjectURL(blob));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function convertPdfToJpg(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  // Set up PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  // Convert first page
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2.0 }); 
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
    canvas: canvas,
  };
  
  await page.render(renderContext).promise;
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Blob conversion failed"));
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg", 0.92);
  });
}
