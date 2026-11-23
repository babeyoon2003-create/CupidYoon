"use client";

import React, { useState, useEffect } from "react";
import { Gift } from "@/types/database";
import { fetchGiftBySlug } from "@/lib/supabase";
import TeaserScreen from "@/components/gift/TeaserScreen";
import FullGiftView from "@/components/gift/FullGiftView";
import { Frown } from "lucide-react";
import Link from "next/link";

interface GiftClientViewProps {
  slug: string;
}

export default function GiftClientView({ slug }: GiftClientViewProps) {
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const loadGift = async () => {
      setLoading(true);
      const data = await fetchGiftBySlug(slug);
      setGift(data);
      // If teaser is disabled, automatically unlocked
      if (data && !data.teaser_enabled) {
        setIsUnlocked(true);
      }
      setLoading(false);
    };
    loadGift();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120a1f] to-[#250d2c] text-white">
        <div className="w-14 h-14 rounded-full border-4 border-rose-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-serif italic text-rose-200">
          အမှတ်တရ လက်ဆောင်လေးကို ဖွင့်လှစ်နေပါသည်... ✨
        </p>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120a1f] to-[#250d2c] text-white text-center">
        <Frown className="w-16 h-16 text-rose-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-serif font-bold text-rose-100 mb-2">
          လက်ဆောင်လင့်ခ်ကို ရှာမတွေ့ပါ
        </h2>
        <p className="text-xs text-rose-300 max-w-sm mb-6 leading-relaxed">
          လင့်ခ်စာလုံးပေါင်း မှားယွင်းနေခြင်း သို့မဟုတ် လက်ဆောင်လင့်ခ်ကို ဖယ်ရှားလိုက်ခြင်း ဖြစ်နိုင်ပါသည်။
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs shadow-lg transition"
        >
          မူလစာမျက်နှာသို့ သွားမည်
        </Link>
      </div>
    );
  }

  // Check 10-day expiration
  const isExpired = new Date(gift.expires_at).getTime() < Date.now();

  // If teaser is enabled and not yet unlocked by passcode
  if (gift.teaser_enabled && !isUnlocked) {
    return (
      <TeaserScreen
        gift={gift}
        isExpired={isExpired}
        onUnlock={() => setIsUnlocked(true)}
      />
    );
  }

  // Once unlocked, display full interactive experience
  return <FullGiftView gift={gift} />;
}
