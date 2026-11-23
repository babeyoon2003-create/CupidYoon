import { createClient } from "@supabase/supabase-js";
import { Gift, AgentUser } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("placeholder")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Built-in Demo Gifts for initial preview
export const INITIAL_DEMO_GIFTS: Gift[] = [
  {
    id: "demo-koko-2026",
    slug: "koko",
    title: "Happy Birthday ကိုကို ✨",
    recipient_name: "ကိုကို",
    sender_name: "ယွန်း",
    event_type: "birthday",
    passcode: "2024",
    teaser_enabled: true,
    teaser_headline: "ကိုကို့အတွက် bae ရဲ့ အထူးမွေးနေ့လက်ဆောင်",
    teaser_note: "ဒီလင့်ခ်လေးထဲမှာ ကိုကို့အတွက် ရင်ခုန်စရာ အမှတ်တရလက်ဆောင်တွေ စီစဉ်ထားတယ် 🤍",
    love_start_date: "2022-11-23T00:00:00.000Z",
    letter_content: "ကိုကို... မွေးနေ့မှာ ပျော်ရွှင်ပါစေနော်။ bae ကို အမြဲဂရုစိုက်ပေးပြီး ချစ်ပေးတဲ့အတွက် ကျေးဇူးအများကြီးတင်ပါတယ်။ အမြဲတမ်း စိတ်ချမ်းသာ ကိုယ်ကျန်းမာပြီး လိုအင်ဆန္ဒတွေ အကုန်ပြည့်ပါစေ။ ချစ်တဲ့ bae 💖",
    scratch_secret: "ကိုကို့ကို တစ်သက်လုံး အနားမှာထားပြီး အချစ်ဆုံး ချစ်သွားမယ် 💍",
    bottle_message: "ဘဝတစ်လျှောက်လုံး အတူတူ လျှောက်လှမ်းသွားရအောင်နော် 🌊⛵",
    lantern_wishes: [
      "ကိုကို့ရဲ့ အပြုံးလေးတွေ အမြဲတမ်း တောက်ပနေပါစေ ✨",
      "ကျန်းမာရေး အမြဲကောင်းမွန်ပါစေ 🌿",
      "နှစ်ယောက်အတူ အမြဲပျော်ရွှင်ရပါစေ 🤍"
    ],
    background_music_url: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-114.mp3",
    video_url: "",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80", caption: "အတူတူ စတွေ့ခဲ့တဲ့ နေ့ရက်လေး 🥰" },
      { id: "p2", url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80", caption: "ကိုကို့ရဲ့ ချစ်စရာ အပြုံးလေးတွေ 😊" },
      { id: "p3", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80", caption: "အမှတ်တရ နေ့ရက်တိုင်းမှာ အမြဲတူတူ 🌸" },
      { id: "p4", url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=80", caption: "တစ်သက်လုံး လက်တွဲသွားမယ့် လူသား 🌿" }
    ],
    quiz_questions: [
      {
        question: "ငါတို့ နှစ်ယောက် အစောဆုံး စတင်စကားပြောဖြစ်တဲ့လက ဘယ်လလဲ?",
        options: ["နိုဝင်ဘာ", "ဒီဇင်ဘာ", "မတ်လ", "အောက်တိုဘာ"],
        answerIndex: 0,
        hint: "နွေးထွေးတဲ့ ဆောင်းဦးရာသီလေးပေါ့"
      },
      {
        question: "bae ရဲ့ အကြိုက်ဆုံး အရောင်က ဘာလဲ?",
        options: ["အပြာရောင်", "ပန်းရောင်နု", "အနက်ရောင်", "အဖြူရောင်"],
        answerIndex: 1,
        hint: "ချစ်စရာကောင်းတဲ့ အရောင်လေးပါ"
      }
    ],
    tools_config: {
      loveCounter: true,
      cake: true,
      scratch: true,
      cassette: true,
      quiz: true,
      bottle: true,
      letter: true,
      memories: true,
      video: false,
      skyLanterns: true
    },
    theme_config: {
      preset: "romantic-rose"
    },
    is_active: true,
    views_count: 14,
    expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    created_by: "yoon"
  }
];

// Helper to get local gifts safely
export function getLocalGifts(): Gift[] {
  if (typeof window === "undefined") return INITIAL_DEMO_GIFTS;
  try {
    const raw = localStorage.getItem("cupidyoon_gifts");
    if (!raw) {
      localStorage.setItem("cupidyoon_gifts", JSON.stringify(INITIAL_DEMO_GIFTS));
      return INITIAL_DEMO_GIFTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_GIFTS;
  } catch {
    return INITIAL_DEMO_GIFTS;
  }
}

// Helper to set local gifts safely
function saveLocalGifts(gifts: Gift[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cupidyoon_gifts", JSON.stringify(gifts));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// API functions for Gifts with Strict Timeout
export async function fetchGiftBySlug(slug: string): Promise<Gift | null> {
  const normalizedSlug = slug.toLowerCase().trim();
  const demoGift = INITIAL_DEMO_GIFTS.find(
    (g) => g.slug.toLowerCase() === normalizedSlug
  );

  // If Supabase is configured, try fetching with 2s strict timeout
  if (isSupabaseConfigured && supabase) {
    try {
      const fetchPromise = supabase
        .from("gifts")
        .select("*")
        .eq("slug", normalizedSlug)
        .single();

      const timeoutPromise = new Promise<{ data: null; error: any }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Supabase timeout") }), 2000)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result && !result.error && result.data) {
        return result.data as Gift;
      }
    } catch (err) {
      console.warn("Supabase fetch failed/timeout:", err);
    }
  }

  // Fallback to local storage or built-in demo
  try {
    const local = getLocalGifts().find(
      (g) => g.slug.toLowerCase() === normalizedSlug
    );
    if (local) return local;
  } catch {}

  return demoGift || null;
}

export async function fetchAllGifts(): Promise<Gift[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const fetchPromise = supabase
        .from("gifts")
        .select("*")
        .order("created_at", { ascending: false });

      const timeoutPromise = new Promise<{ data: null; error: any }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Timeout") }), 2500)
      );

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      if (!error && data && data.length > 0) return data as Gift[];
    } catch (e) {
      console.warn(e);
    }
  }
  return getLocalGifts();
}

export async function saveGift(gift: Gift): Promise<{ success: boolean; error?: string }> {
  // Always keep in local for offline/immediate preview
  const localGifts = getLocalGifts();
  const existingIdx = localGifts.findIndex((g) => g.id === gift.id || g.slug === gift.slug);
  if (existingIdx >= 0) {
    localGifts[existingIdx] = gift;
  } else {
    localGifts.unshift(gift);
  }
  saveLocalGifts(localGifts);

  // If Supabase is connected, sync to Cloud
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("gifts").upsert(gift, { onConflict: "slug" });
      if (error) {
        console.error("Supabase upsert error:", error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return { success: true };
}

export async function deleteGiftById(id: string): Promise<boolean> {
  const local = getLocalGifts().filter((g) => g.id !== id);
  saveLocalGifts(local);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("gifts").delete().eq("id", id);
    } catch {}
  }
  return true;
}

// Upload Media file to Supabase Storage with local data URL fallback
export async function uploadMediaFile(
  file: File, 
  folder: "photos" | "music" | "videos" = "photos"
): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("cupidyoon-media")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;
      const { data: publicUrlData } = supabase.storage
        .from("cupidyoon-media")
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn("Supabase upload error, using object URL:", err);
    }
  }

  // Fallback: convert file to Base64 data URL for local preview
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
