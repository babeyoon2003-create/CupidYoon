"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Flame } from "lucide-react";

interface BirthdayCakeProps {
  recipientName: string;
  onBlowOut?: () => void;
}

export default function BirthdayCake({ recipientName, onBlowOut }: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fb7185", "#fbbf24", "#38bdf8", "#ec4899", "#f59e0b"]
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }

    setTimeout(() => {
      setShowWish(true);
      onBlowOut?.();
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium mb-3">
        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
        <span>Make a Wish 🕯️</span>
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-rose-100 mb-1">
        မွေးနေ့ ဆုတောင်းလေး တောင်းလိုက်ပါဦး ✨
      </h2>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-6">
        {isBlown
          ? "မီးငြိမ်းသွားပါပြီ! ဆုတောင်းတွေ အကုန်ပြည့်ပါစေ ✨"
          : "ဖယောင်းတိုင်မီးလေးကို နှိပ်ပြီး မှုတ်လိုက်ပါ"}
      </p>

      {/* Realistic Interactive 3D Cake */}
      <div className="relative w-64 h-64 flex flex-col items-center justify-end pb-4">
        {/* Candle */}
        <div
          onClick={handleBlowCandle}
          className="relative z-20 flex flex-col items-center cursor-pointer group transition-transform active:scale-95"
          title="ဖယောင်းတိုင်ကို နှိပ်ပြီး မီးမှုတ်ပါ"
        >
          {/* Flame */}
          {!isBlown ? (
            <div className="relative flex flex-col items-center mb-1">
              <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-flame shadow-[0_0_20px_#f59e0b]" />
              <div className="absolute -top-1 w-2 h-2 bg-white/70 rounded-full blur-[1px]" />
            </div>
          ) : (
            <div className="h-6 flex flex-col items-center justify-end mb-1">
              <div className="w-1 h-3 bg-gray-400/50 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-400 italic">puff~ 💨</span>
            </div>
          )}

          {/* Candle Body */}
          <div className="w-4 h-12 bg-gradient-to-r from-rose-200 via-rose-100 to-rose-300 rounded-t-sm shadow-md border-x border-rose-300/50 relative overflow-hidden">
            {/* Spiral Stripes */}
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_3px,transparent_3px,transparent_8px)]" />
          </div>
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="relative z-10 w-32 h-14 bg-gradient-to-r from-pink-100 via-white to-pink-200 rounded-2xl shadow-lg border-b-4 border-pink-300 flex items-center justify-center">
          <div className="absolute -top-2 inset-x-2 h-3 bg-rose-400/80 rounded-full blur-[1px]" />
          <span className="text-xs font-bold text-rose-500 tracking-wider">
            {recipientName}
          </span>
          {/* Strawberries */}
          <div className="absolute -top-3 left-4 text-xs">🍓</div>
          <div className="absolute -top-3 right-4 text-xs">🍓</div>
        </div>

        {/* Cake Tier 2 (Middle) */}
        <div className="relative -mt-2 w-44 h-14 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 rounded-2xl shadow-xl border-b-4 border-rose-400 flex items-center justify-around px-4">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-amber-300" />
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-amber-300" />
        </div>

        {/* Cake Tier 3 (Bottom) */}
        <div className="relative -mt-2 w-56 h-16 bg-gradient-to-r from-rose-300 via-rose-200 to-pink-300 rounded-3xl shadow-2xl border-b-4 border-rose-500 flex items-center justify-center">
          <div className="text-[11px] font-semibold text-rose-700 tracking-widest uppercase">
            Happy Birthday
          </div>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-64 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 rounded-full shadow-md mt-1 border border-amber-300/40" />
      </div>

      {/* Reveal Wish Popup */}
      {showWish && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 max-w-sm animate-in fade-in zoom-in duration-500">
          <p className="text-sm font-semibold text-rose-600 dark:text-rose-300 mb-1">
            ဆုတောင်းမေတ္တာ မွန်များ ပြည့်စုံပါစေ ✨
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {recipientName} အတွက် အလှပဆုံး မွေးနေ့ အမှတ်တရလေး ဖြစ်ပါစေနော် 🤍
          </p>
        </div>
      )}
    </div>
  );
}
