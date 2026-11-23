"use client";

import React, { useState } from "react";
import { Gift } from "@/types/database";
import { Lock, Unlock, Sparkles, Heart, AlertCircle, Clock } from "lucide-react";
import confetti from "canvas-confetti";

interface TeaserScreenProps {
  gift: Gift;
  onUnlock: () => void;
  isExpired: boolean;
}

export default function TeaserScreen({ gift, onUnlock, isExpired }: TeaserScreenProps) {
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleKeyPress = (num: string) => {
    if (passcode.length < 8) {
      setPasscode((prev) => prev + num);
      setErrorMsg("");
    }
  };

  const handleDelete = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setErrorMsg("");
  };

  const handleClear = () => {
    setPasscode("");
    setErrorMsg("");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!passcode) return;

    setIsVerifying(true);
    setTimeout(() => {
      if (passcode.trim() === gift.passcode.trim()) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
        onUnlock();
      } else {
        setErrorMsg("လျှို့ဝှက်ကုဒ် မှားယွင်းနေပါသည် 🥺 ထပ်စမ်းကြည့်ပါဦး");
        setPasscode("");
      }
      setIsVerifying(false);
    }, 400);
  };

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-rose-950 to-neutral-900 text-white">
        <div className="max-w-md w-full glass-panel-dark p-8 rounded-3xl text-center border border-rose-500/30 shadow-2xl">
          <Clock className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-bold font-serif mb-2">
            လက်ဆောင်လင့်ခ် သက်တမ်း ကုန်ဆုံးသွားပါပြီ ⏳
          </h2>
          <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
            ဤလက်ဆောင်လင့်ခ်သည် ၁၀ ရက်ပြည့်မြောက်သွားပြီ ဖြစ်သဖြင့် သက်တမ်းကုန်ဆုံးသွားပါပြီ။
            ဆက်လက်ကြည့်ရှုလိုပါက လက်ဆောင်ဖန်တီးသူထံသို့ ဆက်သွယ်ပေးပါခင်ဗျာ။
          </p>
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
            Created with CupidYoon 💖
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#120a1f] via-[#2d1235] to-[#14061a] text-white">
      {/* Ambient background particles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Luxury Teaser Card */}
      <div className="relative z-10 w-full max-w-md glass-panel-dark p-6 md:p-8 rounded-3xl shadow-2xl border border-rose-500/30 flex flex-col items-center text-center">
        {/* Floating Heart / Brand Badge */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 p-0.5 shadow-xl mb-4 animate-bounce">
          <div className="w-full h-full rounded-full bg-[#1b0a24] flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Romantic Surprise Inside ✨</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-serif font-black text-rose-100 mb-2 leading-tight">
          {gift.title}
        </h1>

        <p className="text-sm font-medium text-rose-200/90 mb-4">
          {gift.recipient_name} အတွက် {gift.sender_name} ၏ အထူးလက်ဆောင် 💌
        </p>

        {/* Sneak peek blurred preview */}
        <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 relative overflow-hidden">
          <div className="filter blur-[6px] opacity-40 select-none flex justify-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-rose-400" />
            <div className="w-14 h-14 rounded-xl bg-amber-400" />
            <div className="w-14 h-14 rounded-xl bg-pink-400" />
            <div className="w-14 h-14 rounded-xl bg-purple-400" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
            <Lock className="w-6 h-6 text-rose-400 mb-1" />
            <span className="text-xs font-semibold text-rose-200 drop-shadow">
              {gift.teaser_headline || "အမှတ်တရ လက်ဆောင် အပြည့်အစုံကို သော့ခတ်ထားပါသည်"}
            </span>
            <span className="text-[10px] text-gray-300 mt-0.5">
              ဖွင့်ကြည့်ရန် Passcode ရိုက်ထည့်ပါ
            </span>
          </div>
        </div>

        {/* Passcode input display */}
        <div className="w-full mb-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-11 h-12 rounded-xl border flex items-center justify-center text-lg font-mono font-bold transition-all ${
                  passcode.length > idx
                    ? "bg-rose-500/30 border-rose-400 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                    : "bg-white/5 border-white/20 text-gray-400"
                }`}
              >
                {passcode[idx] ? "●" : ""}
              </div>
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 flex items-center justify-center gap-1 mt-2 animate-shake">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>

        {/* Virtual Keypad for Mobile-Friendly Interaction */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] mb-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === "C") handleClear();
                else if (key === "⌫") handleDelete();
                else handleKeyPress(key);
              }}
              className="h-11 rounded-xl bg-white/10 hover:bg-rose-500/30 active:scale-95 border border-white/10 text-sm font-semibold text-rose-100 transition flex items-center justify-center"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Unlock Button */}
        <button
          onClick={() => handleSubmit()}
          disabled={isVerifying || passcode.length === 0}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          {isVerifying ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Unlock className="w-4 h-4" />
              <span>လက်ဆောင်ကို ဖွင့်ကြည့်မည် 🎁</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-400 mt-4">
          ✨ Powered by CupidYoon ✨
        </p>
      </div>
    </div>
  );
}
