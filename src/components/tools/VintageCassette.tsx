"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Disc, Volume2, VolumeX } from "lucide-react";

interface VintageCassetteProps {
  audioUrl?: string;
  senderName: string;
  title?: string;
}

export default function VintageCassette({
  audioUrl = "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-114.mp3",
  senderName,
  title = "Voice Letter for My Love",
}: VintageCassetteProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((e) => console.log("Play failed:", e));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Cassette Tape Body */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-2xl p-4 shadow-2xl border-2 border-neutral-700/60 flex flex-col justify-between select-none">
        {/* Top Screw Details */}
        <div className="flex justify-between items-center px-1">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 border border-neutral-800 flex items-center justify-center text-[7px] text-neutral-400">
            +
          </div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
            SIDE A • STEREO
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 border border-neutral-800 flex items-center justify-center text-[7px] text-neutral-400">
            +
          </div>
        </div>

        {/* Vintage Paper Label */}
        <div className="relative w-full h-3/5 bg-gradient-to-b from-amber-50 to-orange-100 rounded-lg p-3 flex flex-col justify-between shadow-inner border border-amber-200">
          <div className="flex justify-between items-start">
            <span className="font-serif italic text-xs font-bold text-rose-800 truncate max-w-[180px]">
              {title}
            </span>
            <span className="text-[9px] font-mono text-neutral-500">
              From: {senderName} 💌
            </span>
          </div>

          {/* Cassette Spools Center Window */}
          <div className="relative w-full h-12 bg-neutral-900/90 rounded-md border border-neutral-700 flex items-center justify-around px-4">
            {/* Left Spool */}
            <div
              className={`w-9 h-9 rounded-full border-2 border-neutral-500 bg-neutral-800 flex items-center justify-center transition-transform ${
                isPlaying ? "animate-spin-slow" : ""
              }`}
            >
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            {/* Tape Window / Ruler */}
            <div className="w-16 h-4 bg-black/60 rounded border border-neutral-700 flex items-center justify-center">
              <div className="h-0.5 w-12 bg-amber-500/40 rounded-full" />
            </div>

            {/* Right Spool */}
            <div
              className={`w-9 h-9 rounded-full border-2 border-neutral-500 bg-neutral-800 flex items-center justify-center transition-transform ${
                isPlaying ? "animate-spin-slow" : ""
              }`}
            >
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Time display */}
          <div className="flex justify-between text-[10px] font-mono text-neutral-600 font-semibold px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 120)}</span>
          </div>
        </div>

        {/* Bottom Play Button Controls */}
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>ခဏရပ်မယ်</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>အသံဖိုင် နားထောင်မယ်</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
