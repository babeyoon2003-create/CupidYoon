"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Disc } from "lucide-react";

interface VinylPlayerProps {
  musicUrl?: string;
  autoPlay?: boolean;
}

export default function VinylPlayer({
  musicUrl = "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-114.mp3",
  autoPlay = false,
}: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay policy prevented
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((e) => console.log(e));
    }
  };

  if (!musicUrl) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      {/* Floating Vinyl Button */}
      <button
        onClick={toggleMusic}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel shadow-xl border border-white/30 text-rose-500 hover:text-rose-600 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        title={isPlaying ? "သီချင်းခဏရပ်မည်" : "သီချင်းဖွင့်မည်"}
      >
        {/* Spinning Vinyl Disc */}
        <div
          className={`relative w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-white/50" />
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold">
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span className="text-[11px] text-gray-700 dark:text-rose-200">Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] text-gray-400">Music Off</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
