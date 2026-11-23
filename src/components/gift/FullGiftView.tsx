"use client";

import React, { useState } from "react";
import { Gift } from "@/types/database";
import VinylPlayer from "@/components/tools/VinylPlayer";
import BirthdayCake from "@/components/tools/BirthdayCake";
import LoveCounter from "@/components/tools/LoveCounter";
import ScratchCard from "@/components/tools/ScratchCard";
import VintageCassette from "@/components/tools/VintageCassette";
import UnfoldingLetter from "@/components/tools/UnfoldingLetter";
import PhotoBook from "@/components/tools/PhotoBook";
import CoupleQuiz from "@/components/tools/CoupleQuiz";
import MessageBottle from "@/components/tools/MessageBottle";
import SkyLanterns from "@/components/tools/SkyLanterns";
import { Heart, Sparkles, Film, ArrowRight } from "lucide-react";

interface FullGiftViewProps {
  gift: Gift;
}

export default function FullGiftView({ gift }: FullGiftViewProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const { tools_config } = gift;

  // Background gradient based on theme preset
  const getThemeClass = () => {
    switch (gift.theme_config.preset) {
      case "starry-night":
        return "bg-gradient-to-b from-[#090b1e] via-[#111638] to-[#060714] text-white";
      case "golden-luxury":
        return "bg-gradient-to-b from-[#190b28] via-[#2d1245] to-[#11051c] text-white";
      case "pastel-dream":
        return "bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 text-gray-800";
      case "romantic-rose":
      default:
        return "bg-gradient-to-b from-rose-50 via-pink-100/50 to-rose-100/70 text-gray-800 dark:bg-gradient-to-b dark:from-[#190d1f] dark:via-[#2b102f] dark:to-[#120717] dark:text-rose-100";
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 transition-colors duration-500 relative overflow-hidden ${getThemeClass()}`}>
      {/* Background Floating Ambient Glows */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-rose-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-pink-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Vinyl Music Player */}
      {gift.background_music_url && (
        <VinylPlayer musicUrl={gift.background_music_url} autoPlay={true} />
      )}

      {/* Header Banner */}
      <header className="max-w-xl mx-auto text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-500 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>Special Gift for You 🤍</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight mb-2">
          {gift.title}
        </h1>

        <p className="text-sm font-medium text-rose-600/90 dark:text-rose-300">
          {gift.recipient_name} အတွက် {gift.sender_name} ၏ အချစ်လက်ဆောင် 💌
        </p>
      </header>

      {/* Interactive Tools Journey Container */}
      <main className="max-w-xl mx-auto space-y-10 relative z-10 pb-16">
        {/* 1. Love Days Counter */}
        {tools_config?.loveCounter && gift.love_start_date && (
          <section className="animate-in fade-in slide-in-from-bottom duration-700">
            <LoveCounter
              startDate={gift.love_start_date}
              senderName={gift.sender_name}
              recipientName={gift.recipient_name}
            />
          </section>
        )}

        {/* 2. 3D Birthday Cake with Candle Blow */}
        {tools_config?.cake && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <BirthdayCake recipientName={gift.recipient_name} />
          </section>
        )}

        {/* 3. Photo Book / Album Memories */}
        {tools_config?.memories && gift.photos && gift.photos.length > 0 && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <PhotoBook photos={gift.photos} />
          </section>
        )}

        {/* 4. Scratch Card */}
        {tools_config?.scratch && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <ScratchCard secretText={gift.scratch_secret} />
          </section>
        )}

        {/* 5. Unfolding Love Letter */}
        {tools_config?.letter && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <UnfoldingLetter
              recipientName={gift.recipient_name}
              senderName={gift.sender_name}
              letterContent={gift.letter_content}
            />
          </section>
        )}

        {/* 6. Vintage Audio Cassette Tape */}
        {tools_config?.cassette && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <VintageCassette
              audioUrl={gift.voice_note_url || gift.background_music_url}
              senderName={gift.sender_name}
            />
          </section>
        )}

        {/* 7. Couple Quiz Challenge */}
        {tools_config?.quiz && gift.quiz_questions && gift.quiz_questions.length > 0 && (
          <section className="w-full max-w-md mx-auto">
            <CoupleQuiz questions={gift.quiz_questions} />
          </section>
        )}

        {/* 8. Message in a Bottle */}
        {tools_config?.bottle && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <MessageBottle
              message={gift.bottle_message}
              senderName={gift.sender_name}
            />
          </section>
        )}

        {/* 9. Sky Lanterns with Wishes */}
        {tools_config?.skyLanterns && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20">
            <SkyLanterns
              wishes={gift.lantern_wishes}
              recipientName={gift.recipient_name}
            />
          </section>
        )}

        {/* 10. Romantic Video Player */}
        {tools_config?.video && gift.video_url && (
          <section className="w-full max-w-md mx-auto rounded-3xl glass-panel shadow-2xl p-6 border border-white/20 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-semibold mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>Special Video</span>
            </div>
            <h3 className="text-base font-bold mb-3">
              နှစ်ယောက်အတူ အမှတ်တရ ဗီဒီယို 🎬
            </h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">
              <video
                src={gift.video_url}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </section>
        )}

        {/* Romantic Footer Card */}
        <footer className="w-full max-w-md mx-auto p-6 rounded-3xl glass-panel text-center border border-white/20">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <h4 className="text-lg font-serif font-bold text-rose-500 mb-1">
            Forever &amp; Always
          </h4>
          <p className="text-xs text-gray-500 dark:text-rose-200/80 mb-3">
            &ldquo;မင်းနဲ့အတူရှိရတဲ့ အခိုက်အတန့်တိုင်းဟာ ငါ့အတွက် အလှပဆုံး မွေးနေ့လက်ဆောင်ပါပဲ&rdquo;
          </p>
          <div className="text-[11px] font-mono text-gray-400 border-t border-white/10 pt-3">
            Made with all my heart by {gift.sender_name} 💖
            <br />
            <span className="text-[10px] text-rose-400">CupidYoon Digital Studio</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
