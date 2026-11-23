"use client";

import React, { useState } from "react";
import { GiftPhoto } from "@/types/database";
import { Image as ImageIcon, Heart, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PhotoBookProps {
  photos: GiftPhoto[];
  title?: string;
}

export default function PhotoBook({
  photos = [],
  title = "Our Beautiful Memories 📸",
}: PhotoBookProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [zoomPhoto, setZoomPhoto] = useState<GiftPhoto | null>(null);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold mb-2">
        <ImageIcon className="w-3.5 h-3.5" />
        <span>Photo Album</span>
      </div>
      <h3 className="text-base font-bold text-gray-800 dark:text-rose-100 mb-3 text-center">
        {title}
      </h3>

      {/* Polaroid Frame Card */}
      <div className="relative w-full bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-2xl border border-gray-100 dark:border-neutral-800 transition-all duration-300">
        {/* Photo Container */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-inner group">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || "Memory photo"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Zoom Lightbox Trigger */}
          <button
            onClick={() => setZoomPhoto(currentPhoto)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition"
            title="ပုံအကြီးချဲ့ကြည့်မည်"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Heart Like Button */}
          <button
            onClick={() => toggleLike(currentPhoto.id)}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition active:scale-125"
          >
            <Heart
              className={`w-4 h-4 ${
                likedMap[currentPhoto.id]
                  ? "fill-rose-500 text-rose-500 animate-bounce"
                  : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Polaroid Caption */}
        <div className="pt-3 pb-1 text-center">
          <p className="font-serif italic text-sm text-gray-700 dark:text-rose-200 min-h-[22px]">
            {currentPhoto.caption || "နှစ်ယောက်အတူ အမှတ်တရလေး 🤍"}
          </p>
          <span className="text-[10px] text-gray-400 font-mono mt-1 block">
            {currentIdx + 1} of {photos.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-neutral-800 text-gray-600 dark:text-rose-300 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full cursor-pointer transition-all ${
                    idx === currentIdx
                      ? "w-4 bg-rose-500"
                      : "w-1.5 bg-gray-300 dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-neutral-800 text-gray-600 dark:text-rose-300 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {zoomPhoto && (
        <div
          onClick={() => setZoomPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in"
        >
          <button
            onClick={() => setZoomPhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomPhoto.url}
            alt="Zoomed memory"
            className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
          />
          {zoomPhoto.caption && (
            <p className="text-white font-serif italic text-sm mt-3 text-center">
              {zoomPhoto.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
