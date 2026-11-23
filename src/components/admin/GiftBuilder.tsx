"use client";

import React, { useState } from "react";
import { Gift, EventType, ThemePreset, ToolsConfig, QuizQuestion } from "@/types/database";
import { saveGift, uploadMediaFile } from "@/lib/supabase";
import { compressImage, compressVideo } from "@/lib/compression";
import { 
  Sparkles, 
  Heart, 
  Upload, 
  Check, 
  Copy, 
  ExternalLink, 
  Calendar, 
  Music, 
  Film, 
  Image as ImageIcon,
  Key,
  ShieldCheck,
  Palette,
  Layers,
  ArrowRight,
  ArrowLeft,
  X
} from "lucide-react";

interface GiftBuilderProps {
  onSuccess?: (gift: Gift) => void;
  onCancel?: () => void;
  initialGift?: Gift | null;
  currentUserRole?: "admin" | "agent";
}

const PRESET_MUSIC = [
  { name: "Romantic Piano & Strings", url: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-114.mp3" },
  { name: "Sweet Acoustic Guitar", url: "https://assets.mixkit.co/music/preview/mixkit-loving-you-117.mp3" },
  { name: "Soft Lofi Romance", url: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3" },
];

export default function GiftBuilder({
  onSuccess,
  onCancel,
  initialGift,
  currentUserRole = "admin",
}: GiftBuilderProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState(initialGift?.title || "Happy Birthday ကိုကို ✨");
  const [recipientName, setRecipientName] = useState(initialGift?.recipient_name || "ကိုကို");
  const [senderName, setSenderName] = useState(initialGift?.sender_name || "ယွန်း");
  const [eventType, setEventType] = useState<EventType>(initialGift?.event_type || "birthday");
  const [slug, setSlug] = useState(initialGift?.slug || `gift-${Math.random().toString(36).substring(2, 7)}`);
  const [passcode, setPasscode] = useState(initialGift?.passcode || "2024");
  const [teaserEnabled, setTeaserEnabled] = useState(initialGift?.teaser_enabled ?? true);
  const [teaserHeadline, setTeaserHeadline] = useState(initialGift?.teaser_headline || "ကိုကို့အတွက် bae ၏ အထူးမွေးနေ့လက်ဆောင်");
  
  // Tools Toggle
  const [tools, setTools] = useState<ToolsConfig>(
    initialGift?.tools_config || {
      loveCounter: true,
      cake: true,
      scratch: true,
      cassette: true,
      quiz: false,
      bottle: true,
      letter: true,
      memories: true,
      video: false,
      skyLanterns: true,
    }
  );

  // Content state
  const [loveStartDate, setLoveStartDate] = useState(
    initialGift?.love_start_date ? initialGift.love_start_date.split("T")[0] : "2023-01-01"
  );
  const [letterContent, setLetterContent] = useState(
    initialGift?.letter_content || "မွေးနေ့မှာ ပျော်ရွှင်ပါစေနော်။ bae ကို အမြဲဂရုစိုက်ပေးပြီး ချစ်ပေးတဲ့အတွက် ကျေးဇူးအများကြီးတင်ပါတယ်။ အမြဲတမ်း စိတ်ချမ်းသာ ကိုယ်ကျန်းမာပြီး လိုအင်ဆန္ဒတွေ အကုန်ပြည့်ပါစေ။ ချစ်တဲ့ bae 💖"
  );
  const [scratchSecret, setScratchSecret] = useState(
    initialGift?.scratch_secret || "ကိုကို့ကို တစ်သက်လုံး အနားမှာထားပြီး အချစ်ဆုံး ချစ်သွားမယ် 💍"
  );
  const [bottleMessage, setBottleMessage] = useState(
    initialGift?.bottle_message || "ဘဝတစ်လျှောက်လုံး အတူတူ လျှောက်လှမ်းသွားရအောင်နော် 🌊⛵"
  );
  const [themePreset, setThemePreset] = useState<ThemePreset>(
    initialGift?.theme_config?.preset || "romantic-rose"
  );

  // Media
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; caption?: string }>>(
    initialGift?.photos || []
  );
  const [musicUrl, setMusicUrl] = useState(
    initialGift?.background_music_url || PRESET_MUSIC[0].url
  );
  const [videoUrl, setVideoUrl] = useState(initialGift?.video_url || "");

  // Compression & Upload status
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressProgress, setCompressProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle Photo Upload with Client-Side Compression
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 15) {
      alert("ဓာတ်ပုံ အများဆုံး ၁၅ ပုံအထိသာ တင်နိုင်ပါသည်ခင်ဗျာ။");
      return;
    }

    setIsCompressing(true);
    setStatusMessage("ဓာတ်ပုံများကို အရည်အသွေးမကျဘဲ Compress လုပ်နေပါသည်...");

    try {
      const newPhotos: Array<{ id: string; url: string; caption?: string }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImage(file, 1200, 0.82);
        const uploadedUrl = await uploadMediaFile(compressed, "photos");
        newPhotos.push({
          id: `p-${Date.now()}-${i}`,
          url: uploadedUrl,
          caption: "အမှတ်တရ အခိုက်အတန့်လေး 🥰",
        });
      }
      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      console.error(err);
      alert("ဓာတ်ပုံ upload ပြုလုပ်ရာတွင် အမှားဖြစ်ပွားပါသည်");
    } finally {
      setIsCompressing(false);
      setStatusMessage("");
    }
  };

  // Handle Video Upload with Client-Side Compression
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setStatusMessage("ဗီဒီယိုကို Compress ပြုလုပ်နေပါသည် (အများဆုံး ၃ မိနစ်)...");

    try {
      const compressedVideo = await compressVideo(file, (pct) => {
        setCompressProgress(pct);
      });
      setStatusMessage("ဗီဒီယိုကို Cloud ပေါ်သို့ သိမ်းဆည်းနေပါသည်...");
      const uploadedUrl = await uploadMediaFile(compressedVideo, "videos");
      setVideoUrl(uploadedUrl);
      setTools((prev) => ({ ...prev, video: true }));
    } catch (err: any) {
      alert(err.message || "ဗီဒီယို တင်၍ မရပါ");
    } finally {
      setIsCompressing(false);
      setStatusMessage("");
      setCompressProgress(0);
    }
  };

  // Save / Generate Gift
  const handleGenerate = async () => {
    setIsCompressing(true);
    setStatusMessage("လက်ဆောင်လင့်ခ်ကို ထုတ်ပေးနေပါသည်...");

    const newGift: Gift = {
      id: initialGift?.id || `gift-${Date.now()}`,
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-"),
      title,
      recipient_name: recipientName,
      sender_name: senderName,
      event_type: eventType,
      passcode: passcode.trim(),
      teaser_enabled: teaserEnabled,
      teaser_headline: teaserHeadline,
      love_start_date: new Date(loveStartDate).toISOString(),
      letter_content: letterContent,
      scratch_secret: scratchSecret,
      bottle_message: bottleMessage,
      lantern_wishes: [
        `${recipientName} ၏ အပြုံးလေးတွေ အမြဲတမ်း တောက်ပနေပါစေ ✨`,
        "ကျန်းမာရေး အမြဲကောင်းမွန်ပါစေ 🌿",
        "နှစ်ယောက်အတူ အမြဲပျော်ရွှင်ရပါစေ 🤍",
      ],
      background_music_url: musicUrl,
      video_url: videoUrl,
      photos,
      quiz_questions: [
        {
          question: "ငါတို့ နှစ်ယောက် အစောဆုံး စတင်စကားပြောဖြစ်တဲ့လက ဘယ်လလဲ?",
          options: ["နိုဝင်ဘာ", "ဒီဇင်ဘာ", "မတ်လ", "အောက်တိုဘာ"],
          answerIndex: 0,
          hint: "နွေးထွေးတဲ့ ဆောင်းဦးရာသီလေးပေါ့",
        },
      ],
      tools_config: tools,
      theme_config: { preset: themePreset },
      is_active: true,
      views_count: 0,
      expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days
      created_at: initialGift?.created_at || new Date().toISOString(),
      created_by: "yoon",
    };

    const res = await saveGift(newGift);
    setIsCompressing(false);

    if (res.success) {
      setIsSaved(true);
      const url = typeof window !== "undefined" 
        ? `${window.location.origin}/${newGift.slug}`
        : `/${newGift.slug}`;
      setGeneratedLink(url);
      onSuccess?.(newGift);
    } else {
      alert("Error saving gift: " + res.error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-neutral-800 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              CupidYoon Gift Creator 🪄
            </h2>
            <p className="text-xs text-gray-500">
              Customer အတွက် တစ်မူထူးခြားသော Digital Gift ဖန်တီးပါ
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Steps Header */}
      {!isSaved && (
        <div className="flex items-center justify-between mb-8 px-2">
          {[
            { num: 1, label: "အခြေခံ" },
            { num: 2, label: "Tools" },
            { num: 3, label: "Media" },
            { num: 4, label: "စာလွှာ" },
            { num: 5, label: "ထုတ်မည်" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-4 ring-rose-100 dark:ring-rose-950"
                    : step > s.num
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-400"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span className="text-[10px] text-gray-500 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              လက်ဆောင် ခေါင်းစဉ် (Title)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="ဥပမာ - Happy Birthday ကိုကို ✨"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                လက်ခံမည့်သူ (Recipient Name)
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="ဥပမာ - ကိုကို"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                ပေးပို့သူ (Sender Name)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="ဥပမာ - ယွန်း (bae)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                အကြောင်းအရာ (Event Type)
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
              >
                <option value="birthday">မွေးနေ့ (Birthday) 🎂</option>
                <option value="anniversary">ချစ်သူသက်တမ်းပြည့် (Anniversary) 💍</option>
                <option value="valentine">ဗယ်လင်တိုင်းဒေး (Valentine) 💖</option>
                <option value="apology">တောင်းပန်စာ (Apology) 🥺</option>
                <option value="proposal">လက်ထပ်ခွင့်တောင်းခြင်း (Proposal) 💐</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                လင့်ခ် အတိုကုဒ် (Custom Slug)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm font-mono focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="koko-birthday"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                သော့ဖွင့်ကုဒ် (Passcode) 🔒
              </label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm font-mono focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="2024"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Customer ဆီက ငွေအပြည့်ရမှ ပေးရမည့် နံပါတ်ဖြစ်ပါသည်
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                သက်တမ်း (Link Expiry)
              </label>
              <div className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-neutral-700">
                ၁၀ ရက်ပြည့်ပါက Auto-Expire ဖြစ်မည် ⏳
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Tools Toggle */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <p className="text-xs text-gray-500 mb-2">
            ဒီလက်ဆောင်ထဲမှာ ထည့်သွင်းပေးချင်တဲ့ Interactive Tools များကို အမှန်ခြစ် ရွေးချယ်ပါ -
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { key: "loveCounter", label: "Love Days Counter ⏳", desc: "ချစ်သူစဖြစ်တဲ့ရက်ကနေ ရေတွက်ပြခြင်း" },
              { key: "cake", label: "3D Birthday Cake 🎂", desc: "ဖယောင်းတိုင်မီး မှုတ်လို့ရသော ကိတ်မုန့်" },
              { key: "scratch", label: "Scratch Card 🪄", desc: "လက်ဖြင့် ခြစ်ပြီးမှ စာလွှာပေါ်လာခြင်း" },
              { key: "letter", label: "Envelope & Love Letter 💌", desc: "တံဆိပ်ခတ်ထားသော စာလွှာဖွင့်ဖတ်ခြင်း" },
              { key: "cassette", label: "Vintage Voice Cassette 📼", desc: "လှည့်နေသော ကက်ဆက်ခွေဖြင့် အသံနားထောင်ခြင်း" },
              { key: "memories", label: "Photo Memories Album 📸", desc: "၁၀~၁၅ ပုံအထိ တင်နိုင်သော အမှတ်တရ အယ်လ်ဘမ်" },
              { key: "skyLanterns", label: "Sky Lanterns ✨", desc: "ကောင်းကင်သို့ မီးပုံးပျံလွှတ်တင်ခြင်း" },
              { key: "bottle", label: "Message in a Bottle 🍾", desc: "ပင်လယ်ထဲက သဝဏ်လွှာပုလင်း" },
              { key: "quiz", label: "Couple Quiz Challenge 🏆", desc: "ချစ်သူတို့ရဲ့ အမေးအဖြေ ဂိမ်းလေး" },
            ].map((tool) => (
              <label
                key={tool.key}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-rose-300 cursor-pointer transition bg-gray-50/50 dark:bg-neutral-800/40"
              >
                <input
                  type="checkbox"
                  checked={(tools as any)[tool.key]}
                  onChange={(e) =>
                    setTools((prev) => ({ ...prev, [tool.key]: e.target.checked }))
                  }
                  className="mt-1 w-4 h-4 text-rose-500 rounded focus:ring-rose-500"
                />
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-rose-100">
                    {tool.label}
                  </div>
                  <div className="text-[11px] text-gray-400 leading-snug">
                    {tool.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Media Upload & Auto-Compress */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in">
          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              ဓာတ်ပုံများ (၁၀ မှ ၁၅ ပုံ အထိ) 📸
            </label>
            <div className="border-2 border-dashed border-rose-200 dark:border-neutral-700 rounded-2xl p-6 text-center hover:border-rose-400 transition bg-rose-50/30 dark:bg-neutral-800/20">
              <Upload className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                ဓာတ်ပုံများကို ရွေးချယ်ပါ
              </p>
              <p className="text-[10px] text-gray-400 mb-3">
                (Upload လုပ်ချိန်တွင် အလိုအလျောက် အရည်အသွေးမကျဘဲ Compress လုပ်ပေးပါသည်)
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isCompressing}
                className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white hover:file:bg-rose-600"
              />
            </div>

            {/* Photos Preview Grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {photos.map((p, idx) => (
                  <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img src={p.url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Music Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              နောက်ခံသီချင်း (Background Music) 🎵
            </label>
            <div className="space-y-2">
              {PRESET_MUSIC.map((m) => (
                <label
                  key={m.url}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                    musicUrl === m.url
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold"
                      : "border-gray-200 dark:border-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-rose-400" />
                    <span>{m.name}</span>
                  </div>
                  <input
                    type="radio"
                    name="music"
                    checked={musicUrl === m.url}
                    onChange={() => setMusicUrl(m.url)}
                    className="text-rose-500 focus:ring-rose-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Video Upload (3 mins max) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              အမှတ်တရ ဗီဒီယို (၃ မိနစ်အောက်) 🎬
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={isCompressing}
              className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white"
            />
            {videoUrl && (
              <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                ✓ ဗီဒီယို Compress ပြုလုပ်ပြီး အောင်မြင်စွာ တင်ပြီးပါပြီ
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Content customization */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              ချစ်သူစဖြစ်ခဲ့သောရက် / စတွေ့ခဲ့သည့်နေ့ 📅
            </label>
            <input
              type="date"
              value={loveStartDate}
              onChange={(e) => setLoveStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              မေတ္တာစာလွှာ (Love Letter Content) 💌
            </label>
            <textarea
              rows={4}
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="မွေးနေ့ဆုတောင်းစာလွှာ ရေးသားပါ..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Scratch Card လျှို့ဝှက်စာ 🪄
              </label>
              <input
                type="text"
                value={scratchSecret}
                onChange={(e) => setScratchSecret(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                ပင်လယ်ပုလင်းထဲက သဝဏ်လွှာ 🍾
              </label>
              <input
                type="text"
                value={bottleMessage}
                onChange={(e) => setBottleMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Theme ဒီဇိုင်း ရွေးချယ်ပါ 🎨
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "romantic-rose", name: "Romantic Rose 🌸" },
                { id: "starry-night", name: "Starry Night 🌌" },
                { id: "golden-luxury", name: "Golden Luxury ✨" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemePreset(t.id as ThemePreset)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                    themePreset === t.id
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-600"
                      : "border-gray-200 dark:border-neutral-800"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review & Generate */}
      {step === 5 && !isSaved && (
        <div className="space-y-4 animate-in fade-in text-center py-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center animate-bounce mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            အကုန်လုံး အဆင်သင့် ဖြစ်ပါပြီ! 🎉
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {recipientName} အတွက် {senderName} ၏ လက်ဆောင်လင့်ခ်ကို အခုပဲ ထုတ်ယူလိုက်ပါ
          </p>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 text-left text-xs space-y-2 border border-gray-200 dark:border-neutral-700">
            <div><strong>လင့်ခ်အမည်:</strong> /{slug}</div>
            <div><strong>Passcode:</strong> {passcode} (ငွေရမှပေးပါ)</div>
            <div><strong>ဓာတ်ပုံ:</strong> {photos.length} ပုံ</div>
            <div><strong>သက်တမ်း:</strong> ၁၀ ရက် သတ်မှတ်ထားပါသည်</div>
          </div>
        </div>
      )}

      {/* Success State / Generated Link */}
      {isSaved && (
        <div className="text-center py-6 animate-in zoom-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-3">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            လက်ဆောင်လင့်ခ် ထုတ်ပြီးပါပြီ! 🚀
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            ဒီလင့်ခ်လေးကို Customer ဆီသို့ ပေးပို့နိုင်ပါပြီခင်ဗျာ
          </p>

          {/* Copyable Link Box */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 max-w-md mx-auto mb-4">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="bg-transparent px-3 text-xs font-mono w-full outline-none text-rose-600 font-bold"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="flex justify-center gap-3">
            <a
              href={generatedLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-rose-300 text-rose-600 font-semibold text-xs hover:bg-rose-50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>ဖွင့်စမ်းကြည့်မည်</span>
            </a>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isCompressing && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-semibold text-center my-4">
          <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          {statusMessage}
          {compressProgress > 0 && ` (${compressProgress}%)`}
        </div>
      )}

      {/* Navigation Buttons */}
      {!isSaved && (
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-neutral-800 pt-4 mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>နောက်သို့</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-rose-500/20 active:scale-95 transition"
            >
              <span>ရှေ့သို့</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isCompressing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 active:scale-95 transition"
            >
              လင့်ခ် ဖန်တီးမည် ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
}
