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
import PressHoldHeart from "@/components/tools/PressHoldHeart";
import { 
  Heart, 
  Sparkles, 
  Mail, 
  Image as ImageIcon, 
  Film, 
  Music, 
  ArrowRight, 
  ArrowLeft,
  X,
  Flame,
  Award
} from "lucide-react";

interface FullGiftViewProps {
  gift: Gift;
}

export default function FullGiftView({ gift }: FullGiftViewProps) {
  // Current screen step: 1 = Intro, 2 = LoveCounter, 3 = Cake, 4 = PressHold, 5 = GiftsHub
  const [currentStep, setCurrentStep] = useState(1);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cakeBlown, setCakeBlown] = useState(false);

  const { tools_config } = gift;

  // Background Theme
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
        return "bg-gradient-to-b from-[#160a22] via-[#2a0e30] to-[#14061a] text-white";
    }
  };

  return (
    <div className={`h-[100dvh] w-full flex flex-col justify-between overflow-hidden relative select-none ${getThemeClass()}`}>
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Vinyl Music Player */}
      {gift.background_music_url && (
        <VinylPlayer musicUrl={gift.background_music_url} autoPlay={true} />
      )}

      {/* Top Header / Progress Indicator */}
      <header className="px-6 pt-5 pb-2 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-300 transition"
              title="Previous screen"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono tracking-widest text-rose-300/80 uppercase font-semibold">
            Stage {currentStep} of 5
          </span>
        </div>

        {/* Stage dots */}
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === currentStep
                  ? "w-6 bg-rose-500"
                  : s < currentStep
                  ? "w-2 bg-rose-300/50"
                  : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Interactive Screen Content (100% Fullscreen, No scroll) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-md mx-auto">
        {/* ================= SCREEN 1: INTRO / GREETING ================= */}
        {currentStep === 1 && (
          <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
            {/* Glowing Big Heart */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 p-1 shadow-[0_0_40px_rgba(244,63,94,0.6)] mb-6 animate-pulse">
              <div className="w-full h-full rounded-full bg-[#1e0a29] flex items-center justify-center">
                <Heart className="w-12 h-12 text-rose-400 fill-rose-400 animate-bounce" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Happy Birthday ✨</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-black text-rose-100 mb-2 leading-tight">
              {gift.title}
            </h1>

            <p className="text-sm text-rose-200/90 mb-8 max-w-xs leading-relaxed">
              {gift.recipient_name} အတွက် {gift.sender_name} ရဲ့ Birthday လက်ဆောင် 🤍
            </p>

            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 active:scale-95 transition"
            >
              <span>ဆက်ကြည့်မယ် ✨</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: LOVE DAYS COUNTER ================= */}
        {currentStep === 2 && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <LoveCounter
              startDate={gift.love_start_date}
              senderName={gift.sender_name}
              recipientName={gift.recipient_name}
            />

            <button
              onClick={() => setCurrentStep(3)}
              className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center gap-2 active:scale-95 transition"
            >
              <span>ဆက်ကြည့်မယ် ➡️</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 3: 3D CAKE & CANDLE BLOW ================= */}
        {currentStep === 3 && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <BirthdayCake
              recipientName={gift.recipient_name}
              onBlowOut={() => setCakeBlown(true)}
            />

            {/* Next button visible after blowing candle */}
            {cakeBlown && (
              <button
                onClick={() => setCurrentStep(4)}
                className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center gap-2 active:scale-95 transition animate-in fade-in slide-in-from-bottom"
              >
                <span>ဆက်ကြည့်မယ် ➡️</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* ================= SCREEN 4: PRESS & HOLD HEART CHALLENGE ================= */}
        {currentStep === 4 && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <PressHoldHeart
              senderName={gift.sender_name}
              recipientName={gift.recipient_name}
              onComplete={() => setCurrentStep(5)}
            />
          </div>
        )}

        {/* ================= SCREEN 5: GIFTS SELECTION HUB ================= */}
        {currentStep === 5 && (
          <div className="w-full flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gifts for You 🎁</span>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-black text-rose-100 mb-1">
              လက်ဆောင်များ စီစဉ်ထားတယ် 🤍
            </h2>
            <p className="text-xs text-rose-200/80 mb-6">
              ဖွင့်ကြည့်လိုသော လက်ဆောင်ကတ်ပြားလေးများကို နှိပ်ပါ
            </p>

            {/* Interactive Gift Cards Grid */}
            <div className="grid grid-cols-2 gap-3.5 w-full max-w-xs">
              {/* Card 1: Letter */}
              {tools_config?.letter && (
                <button
                  onClick={() => setActiveModal("letter")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mb-2 group-hover:scale-110 transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Letter 💌</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">မေတ္တာစာလွှာ</span>
                </button>
              )}

              {/* Card 2: Memories Photo Album */}
              {tools_config?.memories && gift.photos && gift.photos.length > 0 && (
                <button
                  onClick={() => setActiveModal("memories")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-2 group-hover:scale-110 transition">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Memories 📸</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">ဓာတ်ပုံများ</span>
                </button>
              )}

              {/* Card 3: Scratch Card */}
              {tools_config?.scratch && (
                <button
                  onClick={() => setActiveModal("scratch")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Scratch 🪄</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">လျှို့ဝှက်ကတ်</span>
                </button>
              )}

              {/* Card 4: Voice Cassette */}
              {tools_config?.cassette && (
                <button
                  onClick={() => setActiveModal("cassette")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition">
                    <Music className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Cassette 📼</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">အသံဖိုင်လေး</span>
                </button>
              )}

              {/* Card 5: Sky Lanterns */}
              {tools_config?.skyLanterns && (
                <button
                  onClick={() => setActiveModal("lanterns")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2 group-hover:scale-110 transition">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Lanterns ✨</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">မီးပုံးပျံလွှတ်</span>
                </button>
              )}

              {/* Card 6: Message Bottle */}
              {tools_config?.bottle && (
                <button
                  onClick={() => setActiveModal("bottle")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition">
                    🍾
                  </div>
                  <span className="text-xs font-bold text-rose-100">Bottle Note 📜</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">ပင်လယ်ပုလင်း</span>
                </button>
              )}

              {/* Card 7: Video Player (if video_url exists) */}
              {tools_config?.video && gift.video_url && (
                <button
                  onClick={() => setActiveModal("video")}
                  className="p-4 rounded-2xl glass-panel-dark border border-rose-500/30 hover:border-rose-400 active:scale-95 transition flex flex-col items-center text-center group col-span-2"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mb-2 group-hover:scale-110 transition">
                    <Film className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-100">Our Video 🎬</span>
                  <span className="text-[10px] text-rose-300/70 mt-0.5">အမှတ်တရ ဗီဒီယို</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-rose-300/60 mt-6 font-serif italic">
              &ldquo;With love from {gift.sender_name} to {gift.recipient_name} 💖&rdquo;
            </p>
          </div>
        )}
      </main>

      {/* Bottom Footer info */}
      <footer className="py-3 text-center text-[10px] text-rose-300/50 relative z-10">
        CupidYoon Interactive Studio ✨
      </footer>

      {/* ================= MODAL OVERLAYS (WHEN CARDS ARE CLICKED) ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-2 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letter Modal */}
            {activeModal === "letter" && (
              <div className="p-2">
                <UnfoldingLetter
                  recipientName={gift.recipient_name}
                  senderName={gift.sender_name}
                  letterContent={gift.letter_content}
                />
              </div>
            )}

            {/* Memories Photo Album Modal */}
            {activeModal === "memories" && (
              <div className="p-2">
                <PhotoBook photos={gift.photos} />
              </div>
            )}

            {/* Scratch Card Modal */}
            {activeModal === "scratch" && (
              <div className="p-2">
                <ScratchCard secretText={gift.scratch_secret} />
              </div>
            )}

            {/* Voice Cassette Modal */}
            {activeModal === "cassette" && (
              <div className="p-2">
                <VintageCassette
                  audioUrl={gift.voice_note_url || gift.background_music_url}
                  senderName={gift.sender_name}
                />
              </div>
            )}

            {/* Sky Lanterns Modal */}
            {activeModal === "lanterns" && (
              <div className="p-2">
                <SkyLanterns
                  wishes={gift.lantern_wishes}
                  recipientName={gift.recipient_name}
                />
              </div>
            )}

            {/* Message Bottle Modal */}
            {activeModal === "bottle" && (
              <div className="p-2">
                <MessageBottle
                  message={gift.bottle_message}
                  senderName={gift.sender_name}
                />
              </div>
            )}

            {/* Video Modal */}
            {activeModal === "video" && gift.video_url && (
              <div className="p-4 rounded-3xl glass-panel-dark text-center border border-white/20">
                <h3 className="text-sm font-bold text-rose-100 mb-3">Our Video 🎬</h3>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">
                  <video src={gift.video_url} controls autoPlay playsInline className="w-full h-full object-contain" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
