export async function convertMedia(file: File, toFormat: string, onProgress?: (p: number) => void): Promise<string> {
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { fetchFile } = await import("@ffmpeg/util");
  
  const ffmpeg = new FFmpeg();
  
  if (onProgress) {
    ffmpeg.on("progress", ({ progress }: { progress: number }) => {
      onProgress(Math.round(progress * 100));
    });
  }

  await ffmpeg.load();

  const inputName = `input.${file.name.split('.').pop()}`;
  const outputName = `output.${toFormat}`;

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  let args: string[] = [];
  
  if (toFormat === "mp3") {
    args = ["-i", inputName, "-vn", "-ab", "128k", "-ar", "44100", "-y", outputName];
  } else if (toFormat === "wav") {
    args = ["-i", inputName, "-vn", "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2", "-y", outputName];
  } else if (toFormat === "aac") {
    args = ["-i", inputName, "-vn", "-acodec", "aac", "-b:a", "128k", "-y", outputName];
  } else if (toFormat === "mp4") {
    args = ["-i", inputName, "-c:v", "libx264", "-preset", "fast", "-c:a", "aac", "-y", outputName];
  } else if (toFormat === "webm") {
    args = ["-i", inputName, "-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-b:a", "128k", "-c:a", "libopus", "-y", outputName];
  } else {
    args = ["-i", inputName, "-y", outputName];
  }

  await ffmpeg.exec(args);
  
  const data = await ffmpeg.readFile(outputName);
  
  let mimeType = `video/${toFormat}`;
  if (["mp3", "wav", "aac"].includes(toFormat)) mimeType = `audio/${toFormat === "mp3" ? "mpeg" : toFormat}`;
  
  const blob = new Blob([data as unknown as BlobPart], { type: mimeType });
  return URL.createObjectURL(blob);
}
