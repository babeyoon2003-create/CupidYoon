"use client";

import React, { useState, useEffect } from "react";
import { Gift, AgentUser } from "@/types/database";
import { fetchAllGifts, deleteGiftById } from "@/lib/supabase";
import GiftBuilder from "./GiftBuilder";
import {
  Sparkles,
  Heart,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Eye,
  EyeOff,
  Users,
  Gift as GiftIcon,
  Clock,
  TrendingUp,
  Search,
  LogOut,
  Shield,
} from "lucide-react";

interface AdminDashboardProps {
  currentUser: {
    username: string;
    role: "admin" | "agent";
  };
  onLogout: () => void;
}

export default function AdminDashboard({ currentUser, onLogout }: AdminDashboardProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBuilder, setShowBuilder] = useState(false);
  const [activeTab, setActiveTab] = useState<"gifts" | "agents">("gifts");

  // Copy tracking & visible passcodes
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visiblePasscodes, setVisiblePasscodes] = useState<Record<string, boolean>>({});

  // Sub-agents state (Local storage based for demonstration & setup)
  const [agents, setAgents] = useState<AgentUser[]>([
    {
      id: "agent-1",
      username: "agent_su",
      role: "agent",
      quota: 20,
      created_gifts_count: 5,
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ]);
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentQuota, setNewAgentQuota] = useState(15);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllGifts();
    setGifts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (slug: string, id: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePasscodeVisibility = (id: string) => {
    setVisiblePasscodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("ဤလက်ဆောင်လင့်ခ်ကို အမှန်တကယ် ဖျက်ပစ်လိုပါသလား?")) {
      await deleteGiftById(id);
      setGifts((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName) return;
    const newAgent: AgentUser = {
      id: `agent-${Date.now()}`,
      username: newAgentName.trim(),
      role: "agent",
      quota: newAgentQuota,
      created_gifts_count: 0,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setAgents((prev) => [...prev, newAgent]);
    setNewAgentName("");
  };

  const filteredGifts = gifts.filter(
    (g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = gifts.reduce((acc, g) => acc + (g.views_count || 0), 0);
  const activeGifts = gifts.filter((g) => new Date(g.expires_at).getTime() > Date.now());

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0b17] text-gray-900 dark:text-neutral-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#161024]/80 backdrop-blur-md border-b border-gray-200/60 dark:border-neutral-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="font-serif font-black text-base md:text-lg tracking-tight bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              CupidYoon Studio
            </h1>
            <p className="text-[10px] text-gray-400">
              {currentUser.role === "admin" ? "Master Admin (Yoon)" : `Agent (${currentUser.username})`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Gift</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">စုစုပေါင်း Gifts</span>
              <GiftIcon className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold font-mono">{gifts.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Active Links</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-500">
              {activeGifts.length}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Total Views</span>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold font-mono">{totalViews}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Link Expiry</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xs font-semibold text-amber-500 mt-2">
              Auto 10 Days Policy
            </div>
          </div>
        </div>

        {/* Tab Switcher for Admin */}
        {currentUser.role === "admin" && (
          <div className="flex gap-2 border-b border-gray-200 dark:border-neutral-800 pb-2">
            <button
              onClick={() => setActiveTab("gifts")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "gifts"
                  ? "bg-rose-500 text-white"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <GiftIcon className="w-3.5 h-3.5" />
              <span>Gifts စီမံခန့်ခွဲမှု</span>
            </button>
            <button
              onClick={() => setActiveTab("agents")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "agents"
                  ? "bg-rose-500 text-white"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Agent အကောင့်များ စီမံခန့်ခွဲမှု</span>
            </button>
          </div>
        )}

        {/* Tab 1: Gifts Manager */}
        {activeTab === "gifts" && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 max-w-md">
              <Search className="w-4 h-4 text-gray-400 ml-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="လင့်ခ်၊ ခေါင်းစဉ် သို့မဟုတ် နာမည်ဖြင့် ရှာဖွေပါ..."
                className="w-full bg-transparent text-xs outline-none px-2"
              />
            </div>

            {/* Gifts Table / List */}
            {loading ? (
              <div className="text-center py-12 text-xs text-gray-400">
                Gifts များကို ဆွဲတင်နေပါသည်...
              </div>
            ) : filteredGifts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#1a1329] rounded-3xl border border-gray-200 dark:border-neutral-800">
                <GiftIcon className="w-12 h-12 text-rose-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold mb-1">လက်ဆောင်လင့်ခ် မရှိသေးပါ</h3>
                <p className="text-xs text-gray-400 mb-4">
                  Customer အတွက် ပထမဆုံး Gift link လေး စတင်ဖန်တီးလိုက်ပါ
                </p>
                <button
                  onClick={() => setShowBuilder(true)}
                  className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold"
                >
                  + Create Gift
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGifts.map((gift) => {
                  const isExpired = new Date(gift.expires_at).getTime() < Date.now();
                  const daysLeft = Math.max(
                    0,
                    Math.ceil(
                      (new Date(gift.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    )
                  );

                  return (
                    <div
                      key={gift.id}
                      className="bg-white dark:bg-[#1a1329] rounded-3xl p-5 border border-gray-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-rose-300 transition"
                    >
                      <div>
                        {/* Top Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isExpired
                                ? "bg-red-500/10 text-red-500"
                                : "bg-emerald-500/10 text-emerald-500"
                            }`}
                          >
                            {isExpired ? "Expired" : `${daysLeft} Days Left`}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            /{gift.slug}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-sm text-gray-900 dark:text-white mb-1 truncate">
                          {gift.title}
                        </h3>
                        <p className="text-xs text-rose-500 font-medium mb-3">
                          To: {gift.recipient_name} • From: {gift.sender_name}
                        </p>

                        {/* Passcode Box (For payment unlock) */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-neutral-800 mb-4 text-xs font-mono">
                          <span className="text-gray-400 text-[11px]">Passcode:</span>
                          <div className="flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400">
                            <span>
                              {visiblePasscodes[gift.id] ? gift.passcode : "••••"}
                            </span>
                            <button
                              onClick={() => togglePasscodeVisibility(gift.id)}
                              className="text-gray-400 hover:text-gray-600 ml-1"
                            >
                              {visiblePasscodes[gift.id] ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-800 pt-3">
                        <button
                          onClick={() => handleCopy(gift.slug, gift.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-rose-500"
                        >
                          {copiedId === gift.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={`/${gift.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 hover:text-rose-500 transition"
                            title="Preview Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(gift.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Agent Management */}
        {activeTab === "agents" && currentUser.role === "admin" && (
          <div className="space-y-6">
            {/* Create Agent Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-rose-500" />
                <h3 className="font-bold text-sm">Agent အကောင့် အသစ်ဖွင့်ပေးရန်</h3>
              </div>
              <form onSubmit={handleCreateAgent} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Agent အမည် (Username)
                  </label>
                  <input
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="agent_thida"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    လင့်ခ် ပြုလုပ်ခွင့် Quota (အရေအတွက် ကန့်သတ်ချက်)
                  </label>
                  <input
                    type="number"
                    value={newAgentQuota}
                    onChange={(e) => setNewAgentQuota(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-xs outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition"
                >
                  Agent အကောင့် ဖန်တီးမည် ✨
                </button>
              </form>
            </div>

            {/* Agent List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((ag) => (
                <div
                  key={ag.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#1a1329] border border-gray-200/80 dark:border-neutral-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {ag.username}
                    </h4>
                    <span className="text-[11px] text-gray-400">
                      ဖန်တီးပြီးသော Gifts: {ag.created_gifts_count} / {ag.quota} Quota
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Gift Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl my-8">
            <GiftBuilder
              onCancel={() => setShowBuilder(false)}
              onSuccess={(newGift) => {
                setGifts((prev) => [newGift, ...prev]);
                // Keep builder open on success screen so link can be copied, or closed via cancel
              }}
              currentUserRole={currentUser.role}
            />
          </div>
        </div>
      )}
    </div>
  );
}
