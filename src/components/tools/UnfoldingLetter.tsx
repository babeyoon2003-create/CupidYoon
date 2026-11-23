"use client";

import React, { useState } from "react";
import { Mail, Heart, Sparkles, X } from "lucide-react";

interface UnfoldingLetterProps {
  recipientName: string;
  senderName: string;
  letterContent?: string;
}

export default function UnfoldingLetter({
  recipientName,
  senderName,
  letterContent = "ကိုကို... မွေးနေ့မှာ ပျော်ရွှင်ပါစေနော်။ bae ကို အမြဲဂရုစိုက်ပေးပြီး ချစ်ပေးတဲ့အတွက် ကျေးဇူးအများကြီးတင်ပါတယ်။ အမြဲတမ်း စိတ်ချမ်းသာ ကိုယ်ကျန်းမာပြီး လိုအင်ဆန္ဒတွေ အကုန်ပြည့်ပါစေ။ ချစ်တဲ့ bae 💖",
}: UnfoldingLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      {!isOpen ? (
        /* Sealed Envelope UI */
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full h-48 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 rounded-2xl shadow-2xl border border-rose-300/60 p-6 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          {/* Envelope Flap Accent */}
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-rose-200/80 to-transparent clip-path-triangle opacity-70" />

          {/* Golden Wax Seal */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 p-0.5 shadow-xl flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex flex-col items-center justify-center border border-amber-300/60 shadow-inner">
              <Heart className="w-6 h-6 text-amber-100 fill-amber-100 drop-shadow" />
              <span className="text-[8px] font-serif font-black text-amber-200 uppercase tracking-tighter">
                CY
              </span>
            </div>
          </div>

          <h3 className="relative z-10 text-sm font-bold text-rose-900 mt-4 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-rose-600" />
            <span>To: {recipientName} 💌</span>
          </h3>
          <p className="relative z-10 text-[11px] text-rose-700/80 mt-1">
            တံဆိပ်ခတ်ထားသော စာလွှာကို နှိပ်ပြီး ဖွင့်ဖတ်ပါ
          </p>
        </div>
      ) : (
        /* Unfolded Letter Modal */
        <div className="relative w-full bg-gradient-to-b from-amber-50 via-rose-50/40 to-amber-50 rounded-2xl p-6 shadow-2xl border-2 border-rose-200 animate-in fade-in zoom-in duration-500">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-rose-200/50 hover:bg-rose-200 text-rose-700 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3 border-b border-rose-200 pb-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <h4 className="font-serif italic font-bold text-rose-900 text-base">
              To my beloved {recipientName} 💌
            </h4>
          </div>

          <div className="min-h-[140px] text-gray-800 text-sm leading-relaxed whitespace-pre-line font-serif italic py-2">
            {letterContent}
          </div>

          <div className="border-t border-rose-200 pt-3 mt-3 flex justify-end">
            <p className="text-xs font-serif font-bold text-rose-800">
              With all my love,
              <br />
              <span className="text-sm font-semibold text-rose-600">
                {senderName} 💖
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
