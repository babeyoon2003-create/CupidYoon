"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface PressHoldHeartProps {
  onComplete: () => void;
  senderName: string;
  recipientName: string;
}

export default function PressHoldHeart({
  onComplete,
  senderName,
  recipientName,
}: PressHoldHeartProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isCompleted) return;
    setIsHolding(true);

    const stepMs = 30;
    const totalDuration = 2200; // 2.2 seconds to fill
    const increment = (stepMs / totalDuration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(intervalRef.current!);
          setIsCompleted(true);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {}
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return next;
      });
    }, stepMs);
  };

  const cancelHold = () => {
    if (isCompleted) return;
    setIsHolding(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Animate smoothly back to 0
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // SVG circular calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center select-none touch-none px-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>Love Challenge 🤍</span>
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-black text-rose-100 mb-2">
        ခဏလောက် နှိပ်ထားပေးပါ 🤍
      </h2>
      <p className="text-xs text-rose-200/80 mb-8 max-w-xs">
        {isCompleted
          ? "ပြည့်သွားပါပြီ! လက်ဆောင်ကို ဖွင့်လှစ်နေပါသည်... ✨"
          : isHolding
          ? "လက်မလွှတ်ပါနဲ့နော်... ပြည့်ခါနီးပါပြီ ✨"
          : "အသည်းပုံလေးကို မလွှတ်တမ်း လက်ဖြင့် ဖိထားပေးပါ (Press & Hold)"}
      </p>

      {/* Circular Progress & Heart Button */}
      <div
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className="relative w-36 h-36 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
      >
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="5"
            className="text-white/10 fill-transparent"
          />
          {/* Active Animated Progress Stroke */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="url(#roseGradient)"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="fill-transparent transition-all duration-75"
          />
          <defs>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Pulsing Heart */}
        <div
          className={`absolute inset-4 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-500 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-200 ${
            isHolding ? "scale-110 shadow-[0_0_35px_rgba(244,63,94,0.8)]" : "scale-100 animate-pulse"
          }`}
        >
          <Heart
            className={`w-12 h-12 fill-white text-white drop-shadow-md transition-transform duration-200 ${
              isHolding ? "scale-125" : ""
            }`}
          />
          <span className="text-[10px] font-mono font-bold mt-1 tracking-wider opacity-90">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-8">
        From {senderName} to {recipientName} with Love
      </p>
    </div>
  );
}
