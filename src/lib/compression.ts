/**
 * CupidYoon - Client-side Image & Video Compression Utilities
 * Compresses media right inside the browser before uploading to Supabase Storage.
 */

// Image Compression using HTML5 Canvas & WebP/JPEG conversion
export async function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.82
): Promise<File> {
  return new Promise((resolve, reject) => {
    // If SVG or GIF, keep as is
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      return resolve(file);
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve(file);
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Export as webp if supported, or jpeg
      const mimeType = "image/webp";
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".webp",
            { type: mimeType, lastModified: Date.now() }
          );
          resolve(compressedFile);
        },
        mimeType,
        quality
      );
    };

    reader.readAsDataURL(file);
  });
}

// Check Video Duration (must be <= 3 minutes / 180 seconds)
export async function checkVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = () => {
      reject(new Error("ဗီဒီယိုဖိုင်ကို ဖွင့်ဖတ်၍ မရပါ"));
    };

    video.src = URL.createObjectURL(file);
  });
}

/**
 * Compress video using HTML5 Video + Canvas + MediaRecorder
 * Compresses 1080p/4K 3-minute video to compact 720p/480p WebM
 */
export async function compressVideo(
  file: File,
  onProgress?: (percent: number) => void
): Promise<File> {
  const duration = await checkVideoDuration(file);
  if (duration > 185) {
    throw new Error("ဗီဒီယိုအရှည်သည် အများဆုံး ၃ မိနစ် (3 minutes) သာ ဖြစ်ရပါမည်။");
  }

  // If already under 12MB, return directly without quality degradation
  if (file.size <= 12 * 1024 * 1024) {
    onProgress?.(100);
    return file;
  }

  return new Promise((resolve) => {
    // If MediaRecorder or canvas captureStream is not available, return original
    if (typeof window === "undefined" || !window.MediaRecorder) {
      return resolve(file);
    }

    try {
      const video = document.createElement("video");
      video.muted = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        const targetWidth = Math.min(video.videoWidth, 720);
        const targetHeight = Math.round(
          (video.videoHeight * targetWidth) / video.videoWidth
        );

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        const stream = canvas.captureStream(24); // 24 FPS
        const recorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp8",
          videoBitsPerSecond: 1_200_000 // 1.2 Mbps
        });

        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + "_compressed.webm",
            { type: "video/webm" }
          );
          URL.revokeObjectURL(video.src);
          onProgress?.(100);
          resolve(compressedFile);
        };

        recorder.start();
        video.play();

        const drawFrame = () => {
          if (video.paused || video.ended) {
            recorder.stop();
            return;
          }
          if (ctx) {
            ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
          }
          if (video.duration > 0 && onProgress) {
            const pct = Math.min(95, Math.round((video.currentTime / video.duration) * 100));
            onProgress(pct);
          }
          requestAnimationFrame(drawFrame);
        };

        drawFrame();
      };

      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        resolve(file); // fallback to original file
      };
    } catch {
      resolve(file);
    }
  });
}
