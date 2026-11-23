"use client";

import React, { useState } from "react";
import { Sparkles, Moon } from "lucide-react";

interface SkyLanternsProps {
  wishes?: string[];
  recipientName: string;
}

interface Lantern {
  id: number;
  x: number;
  y: number;
  wish: string;
}

export default function SkyLanterns({
  wishes = [
    "ကိုကို့ရဲ့ အပြုံးလေးတွေ အမြဲတမ်း တောက်ပနေပါစေ ✨",
    "ကျန်းမာရေး အမြဲကောင်းမွန်ပါစေ 🌿",
    "နှစ်ယောက်အတူ အမြဲပျော်ရွှင်ရပါစေ 🤍",
    "လိုချင်တဲ့ အိပ်မက်တွေ အားလုံး အောင်မြင်ပါစေ 🌟",
  ],
  recipientName,
}: SkyLanternsProps) {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [wishIndex, setWishIndex] = useState(0);

  const releaseLantern = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const wish = wishes[wishIndex % wishes.length];
    setWishIndex((prev) => prev + 1);

    const newLantern: Lantern = {
      id: Date.now() + Math.random(),
      x,
      y,
      wish,
    };

    setLanterns((prev) => [...prev, newLantern]);

    // Clean up lantern after animation
    setTimeout(() => {
      setLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, 4500);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      <div
        onClick={releaseLantern}
        className="relative w-full h-64 rounded-2xl bg-gradient-to-b from-[#090a1a] via-[#101432] to-[#1c1b3f] p-4 border border-indigo-500/30 shadow-2xl overflow-hidden cursor-pointer select-none group"
      >
        {/* Moon & Stars background */}
        <div className="absolute top-4 right-5 text-amber-100 flex items-center gap-1 opacity-90">
          <Moon className="w-6 h-6 fill-amber-100 drop-shadow-[0_0_12px_#fef08a]" />
        </div>

        {/* Subtle twinkling stars */}
        <div className="absolute top-8 left-10 text-[8px] text-yellow-200 animate-pulse">✦</div>
        <div className="absolute top-20 left-28 text-[10px] text-white animate-pulse">✧</div>
        <div className="absolute top-12 left-48 text-[9px] text-yellow-100 animate-pulse">✦</div>
        <div className="absolute bottom-16 right-16 text-[8px] text-white animate-pulse">✧</div>

        {/* Sky Lanterns Floating Up */}
        {lanterns.map((l) => (
          <div
            key={l.id}
            style={{ left: l.x - 20, top: l.y - 30 }}
            className="absolute pointer-events-none flex flex-col items-center transition-all animate-[lantern-ascend_4.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
          >
            {/* Glowing Lantern Icon */}
            <div className="w-10 h-14 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-t-xl rounded-b-md shadow-[0_0_25px_#f59e0b] border border-amber-300 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white blur-[1px] shadow-[0_0_8px_white]" />
            </div>
            {/* Wish note */}
            <span className="text-[10px] font-medium text-amber-200 bg-black/70 px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap border border-amber-400/30">
              {l.wish}
            </span>
          </div>
        ))}

        {/* Center Prompt */}
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-400/30 text-amber-200 text-xs shadow-lg backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ကောင်းကင်ကို နှိပ်ပြီး မီးပုံးပျံ လွှတ်တင်ပါ ✨</span>
          </div>
          <p className="text-[10px] text-indigo-300/80 mt-1">
            {recipientName} အတွက် မေတ္တာမီးပုံးပျံလေးများ
          </p>
        </div>
      </div>
    </div>
  );
}
