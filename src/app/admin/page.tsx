"use client";

import React, { useState, useEffect } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Heart, Sparkles, Lock, User, Key, ArrowRight } from "lucide-react";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    role: "admin" | "agent";
  } | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check saved session
    const saved = localStorage.getItem("cupidyoon_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Master Admin credentials
      if (
        (username.toLowerCase() === "yoon" || username.toLowerCase() === "admin") &&
        (password === "yoon2026" || password === "yoon2024" || password === "123456")
      ) {
        const user = { username: "yoon", role: "admin" as const };
        setCurrentUser(user);
        localStorage.setItem("cupidyoon_user", JSON.stringify(user));
      } else if (username.startsWith("agent") && password === "123456") {
        // Agent credentials
        const user = { username, role: "agent" as const };
        setCurrentUser(user);
        localStorage.setItem("cupidyoon_user", JSON.stringify(user));
      } else {
        setError("အကောင့်အမည် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည် 🥺");
      }
      setLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem("cupidyoon_user");
    setCurrentUser(null);
  };

  if (currentUser) {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#120a1f] via-[#240c2b] to-[#14061a] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm glass-panel-dark p-8 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col items-center">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 p-0.5 shadow-xl mb-4 animate-bounce">
          <div className="w-full h-full rounded-full bg-[#1b0a24] flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Creator Studio</span>
        </div>

        <h1 className="text-xl font-serif font-black text-rose-100 mb-1">
          CupidYoon Login
        </h1>
        <p className="text-xs text-rose-200/70 mb-6 text-center">
          Customer များအတွက် Gift link များ ဖန်တီးစီမံရန် Login ဝင်ပါ
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-rose-200 mb-1">
              အကောင့်အမည် (Username)
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-rose-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yoon"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-rose-100 placeholder-gray-500 outline-none focus:border-rose-400 focus:bg-white/10 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-rose-200 mb-1">
              စကားဝှက် (Password)
            </label>
            <div className="relative flex items-center">
              <Key className="w-4 h-4 text-rose-400 absolute left-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-rose-100 placeholder-gray-500 outline-none focus:border-rose-400 focus:bg-white/10 transition"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              (Master: yoon / yoon2026)
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>အကောင့်သို့ ဝင်မည်</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-gray-500 mt-6 text-center">
          ✨ Crafted by Yoon for all lovely couples ✨
        </p>
      </div>
    </div>
  );
}
