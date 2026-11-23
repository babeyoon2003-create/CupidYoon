"use client";

import React, { useState, useEffect } from "react";
import { Heart, Clock } from "lucide-react";

interface LoveCounterProps {
  startDate?: string;
  senderName: string;
  recipientName: string;
}

export default function LoveCounter({
  startDate = "2023-01-01T00:00:00.000Z",
  senderName,
  recipientName,
}: LoveCounterProps) {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl glass-panel shadow-2xl border border-white/20 text-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2 border border-rose-500/20 animate-bounce">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
        </div>

        <h3 className="text-sm uppercase tracking-widest text-rose-400 font-semibold mb-1">
          Together In Love
        </h3>
        <p className="text-lg font-serif font-bold text-gray-800 dark:text-rose-100 mb-5">
          {senderName} &amp; {recipientName}
        </p>

        {/* Big Days Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg w-full mb-4">
          <div className="text-4xl md:text-5xl font-black font-mono tracking-tight">
            {elapsed.days.toLocaleString()}
          </div>
          <div className="text-xs uppercase tracking-widest font-medium opacity-90 mt-1">
            Days of Love &amp; Happiness
          </div>
        </div>

        {/* Hours / Mins / Secs Live Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="p-2.5 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/30">
            <div className="text-xl font-bold font-mono text-gray-800 dark:text-rose-200">
              {String(elapsed.hours).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Hours
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/30">
            <div className="text-xl font-bold font-mono text-gray-800 dark:text-rose-200">
              {String(elapsed.minutes).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Minutes
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/30">
            <div className="text-xl font-bold font-mono text-rose-500 animate-pulse">
              {String(elapsed.seconds).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Seconds
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-4">
          &ldquo;စက္ကန့်တိုင်းမှာ ကိုကို့ကို အရင်နေ့တွေထက် ပိုချစ်လာတယ်&rdquo; 🤍
        </p>
      </div>
    </div>
  );
}
