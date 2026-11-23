import Link from "next/link";
import { 
  Heart, 
  Sparkles, 
  Gift, 
  Flame, 
  Clock, 
  Mail, 
  Music, 
  Image as ImageIcon, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#140b22] via-[#240f2d] to-[#120719] text-white overflow-hidden relative selection:bg-rose-500 selection:text-white">
      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-serif font-black text-xl tracking-tight bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">
              CupidYoon
            </span>
            <span className="block text-[9px] text-rose-300/70 font-mono tracking-widest uppercase">
              Digital Romance Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/koko"
            className="text-xs font-semibold text-rose-300 hover:text-white transition px-3 py-1.5"
          >
            Live Demo စမ်းရန်
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 active:scale-95 transition"
          >
            Admin Studio
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>ယွန်း ဖန်တီးပေးသော တစ်မူထူးခြားသည့် ဒစ်ဂျစ်တယ် လက်ဆောင်များ</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-tight mb-6">
          ချစ်ရသူအတွက် တစ်သက်မမေ့နိုင်မယ့်
          <br />
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Interactive Digital Gifts
          </span>
        </h1>

        <p className="text-sm md:text-base text-rose-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          ဖယောင်းတိုင်မှုတ်လို့ရသော 3D မွေးနေ့ကိတ်၊ ခြစ်ပြီးမှပေါ်သော Scratch Card၊ ဖွင့်ဖတ်ရသော မေတ္တာစာလွှာ၊ 
          လည်ပတ်နေသော Vintage အသံကက်ဆက်ခွေနှင့် အမှတ်တရ ဓာတ်ပုံ/ဗီဒီယိုများ ပါဝင်သည့် အဆင့်မြင့် 
          မွေးနေ့နှင့် အချစ်လက်ဆောင် ဝဘ်လင့်ခ်လေးများ။
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/koko"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>Live Demo စမ်းသပ်ကြည့်မည် ✨</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admin"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-rose-100 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <span>Gift Link အသစ် ဖန်တီးမည်</span>
          </Link>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
            Unique Interactive Tools
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
            CupidYoon တွင် ပါဝင်သော ရိုမန်တစ် Tools များ 🪄
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              3D Cake &amp; Candle Blow 🎂
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ဖယောင်းတိုင်မီးကို နှိပ်ပြီး မှုတ်လိုက်တာနဲ့ မီးငြိမ်းသွားပြီး မွေးနေ့စက္ကူကြဲ (Confetti) များနှင့် ဆုတောင်းမေတ္တာများ ပေါ်လာစေသည့် စနစ်။
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Interactive Scratch Card 🪄
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ထီခြစ်သကဲ့သို့ လက်ချောင်းလေးဖြင့် ပွတ်ဆွဲခြစ်ပြီးမှ လျှို့ဝှက်အချစ်စာလွှာ ပေါ်လာစေသည့် ဆန်းသစ်သော လက်ဆောင်ကတ်။
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Love Days &amp; Seconds Counter ⏳
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ချစ်သူစဖြစ်တဲ့ရက် သို့မဟုတ် မွေးနေ့ကနေ လက်ရှိစက္ကန့်အထိ အတူရှိခဲ့သော နေ့ရက်နာရီများကို Realtime ရေတွက်ပြသပေးခြင်း။
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Envelope &amp; Unfolding Letter 💌
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ဖယောင်းတံဆိပ်ခတ်ထားသော စာအိတ်လေးကို နှိပ်လိုက်ပါက စာလွှာလေး အလိုအလျောက် ပြန့်ထွက်လာပြီး အချစ်စာလွှာ ဖတ်ရှုနိုင်ခြင်း။
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Vintage Voice Cassette 📼
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ရိုမန်တစ်ဆန်သော Vintage ကက်ဆက်ခွေလေး လည်ပတ်နေပြီး ချစ်ရသူဆီ ပို့ချင်သော အသံဖိုင် (Voice note) ကို နားထောင်နိုင်ခြင်း။
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-xl hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Teaser &amp; 10-Day Auto Expire 🔒
            </h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              ငွေမရမီ Customer ကို အမြည်းပြသပြီး ငွေရမှ Passcode ပေးနိုင်သည့် စနစ်နှင့် ၁၀ ရက်ပြည့်ပါက အလိုအလျောက် ပိတ်သွားမည့် စနစ်။
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center relative z-10 text-xs text-rose-200/60">
        <div className="flex items-center justify-center gap-1.5 mb-2 font-serif text-sm text-rose-300 font-bold">
          <span>CupidYoon</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Handcrafted by Yoon</span>
        </div>
        <p className="text-[11px]">
          Dedicated to celebrating eternal love, birthdays &amp; precious moments.
        </p>
      </footer>
    </div>
  );
}
