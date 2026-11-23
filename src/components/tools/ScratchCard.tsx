"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  secretText?: string;
  onRevealed?: () => void;
}

export default function ScratchCard({
  secretText = "ကိုကို့ကို တစ်သက်လုံး အနားမှာထားပြီး အချစ်ဆုံး ချစ်သွားမယ် 💍💖",
  onRevealed,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas accurately
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw shimmering silver/gold scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d1d5db");
    gradient.addColorStop(0.3, "#f3f4f6");
    gradient.addColorStop(0.5, "#9ca3af");
    gradient.addColorStop(0.8, "#e5e7eb");
    gradient.addColorStop(1, "#9ca3af");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add romantic subtle overlay pattern
    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ လက်ဖြင့် ခြစ်ပြီး လျှို့ဝှက်ချက် ဖွင့်ကြည့်ပါ ✨", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched percentage periodically
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) {
        transparentPixels += 4;
      }
    }

    const pct = Math.round((transparentPixels / totalPixels) * 100);
    setPercentScratched(pct);

    if (pct >= 45 && !isRevealed) {
      setIsRevealed(true);
      // Auto clear remaining
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
      onRevealed?.();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Scratch to Reveal</span>
      </div>
      <h3 className="text-base font-bold text-gray-800 dark:text-rose-100 mb-3 text-center">
        လျှို့ဝှက်ကတ်ပြားလေးကို ခြစ်ကြည့်ပါ 🪄
      </h3>

      {/* Card Container */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300/40 select-none touch-none">
        {/* Hidden Content (Revealed beneath) */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 p-6 flex flex-col items-center justify-center text-center text-white">
          <Heart className="w-8 h-8 text-white fill-white animate-bounce mb-2" />
          <p className="text-sm md:text-base font-semibold leading-relaxed tracking-wide drop-shadow-md">
            &ldquo;{secretText}&rdquo;
          </p>
        </div>

        {/* Scratchable Canvas Surface */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10 transition-opacity duration-300"
          style={{ opacity: isRevealed ? 0 : 1, pointerEvents: isRevealed ? "none" : "auto" }}
        />
      </div>

      <p className="text-[11px] text-gray-400 mt-2">
        {isRevealed
          ? "🎉 ဖွင့်ဖတ်ပြီးပါပြီ!"
          : `လက်ချောင်းလေးဖြင့် ပွတ်ဆွဲပါ (${percentScratched}% ပြီးစီး)`}
      </p>
    </div>
  );
}
