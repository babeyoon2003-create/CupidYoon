"use client";

import React, { useState } from "react";
import { Waves, Sparkles, X } from "lucide-react";

interface MessageBottleProps {
  message?: string;
  senderName: string;
}

export default function MessageBottle({
  message = "ဘဝတစ်လျှောက်လုံး အတူတူ လျှောက်လှမ်းသွားရအောင်နော် 🌊⛵",
  senderName,
}: MessageBottleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-sky-900/60 via-cyan-900/40 to-sky-950/80 p-4 border border-cyan-500/30 shadow-2xl flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
        >
          {/* Animated Wave Background */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cyan-600/20 to-transparent flex items-end justify-center">
            <Waves className="w-full h-8 text-cyan-400/30 animate-pulse" />
          </div>

          {/* Floating Glass Bottle */}
          <div className="relative z-10 text-4xl group-hover:scale-110 transition-transform duration-300 animate-bounce">
            🍾
          </div>

          <h4 className="relative z-10 text-xs font-bold text-cyan-200 mt-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Message in a Bottle</span>
          </h4>
          <p className="relative z-10 text-[10px] text-cyan-300/80 mt-0.5">
            လှိုင်းထဲ မျောလာတဲ့ ပုလင်းလေးကို ဖွင့်ကြည့်ပါ
          </p>
        </div>
      ) : (
        <div className="relative w-full bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 rounded-2xl p-5 shadow-2xl border-2 border-amber-300/80 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full bg-amber-200/60 hover:bg-amber-200 text-amber-900 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center border-b border-amber-200 pb-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
              📜 Ocean Secret Note
            </span>
          </div>

          <p className="font-serif italic text-amber-950 text-sm leading-relaxed text-center py-3">
            &ldquo;{message}&rdquo;
          </p>

          <div className="text-right text-xs font-serif font-bold text-amber-800 border-t border-amber-200 pt-2 mt-2">
            - {senderName} 🤍
          </div>
        </div>
      )}
    </div>
  );
}
