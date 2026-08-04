export const validateFileSignature = async (file: File, allowedSignatures: string[]): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, "0");
      }
      header = header.toUpperCase();

      const isValid = allowedSignatures.some(sig => header.startsWith(sig.toUpperCase()));
      resolve(isValid);
    };
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export const SIGNATURES = {
  PDF: ["25504446"], // %PDF
  JPEG: ["FFD8FF"], 
  PNG: ["89504E47"],
  WEBP: ["52494646"], // RIFF
  MP4: ["00000018", "00000014", "00000020", "0000001C"], 
  WEBM: ["1A45DFA3"],
  MKV: ["1A45DFA3"],
  AVI: ["52494646"],
  MOV: ["00000014"],
};

export const validateVideoSignature = async (file: File): Promise<boolean> => {
  return validateFileSignature(file, [
    ...SIGNATURES.MP4, 
    ...SIGNATURES.WEBM, 
    ...SIGNATURES.MKV, 
    ...SIGNATURES.AVI, 
    ...SIGNATURES.MOV
  ]);
};

export const sanitizeFilename = (filename: string): string => {
  let cleanName = filename.replace(/^.*[\\\/]/, '');
  cleanName = cleanName.replace(/[\x00-\x1F\x7F]/g, '');
  cleanName = cleanName.replace(/[^a-zA-Z0-9.\-_ ]/g, '_');
  
  if (cleanName.length > 200) {
    const parts = cleanName.split('.');
    const ext = parts.length > 1 ? '.' + parts.pop() : '';
    const name = parts.join('.');
    cleanName = name.substring(0, 200 - ext.length) + ext;
  }
  return cleanName || 'download';
};
