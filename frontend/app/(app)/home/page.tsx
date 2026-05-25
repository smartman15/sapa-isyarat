"use client";

import { useRouter } from "next/navigation";
import {
  Home, MessageCircle, BookOpen, User, Camera, Mic, MessageSquare,
  Zap, Search, HandMetal, Heart, Bell, History, TrendingUp,
  AlertTriangle, Star,
} from "lucide-react";
import Mascot from "@/components/Mascot";

/* ─── Hand sign illustration ─────────────────────────────────────── */
function HandSignIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="44" rx="16" ry="12" fill="#1B1F3B" />
      <rect x="15" y="20" width="8" height="26" rx="4" fill="#1B1F3B" />
      <rect x="25" y="14" width="8" height="32" rx="4" fill="#1B1F3B" />
      <rect x="35" y="16" width="8" height="30" rx="4" fill="#1B1F3B" />
      <rect x="45" y="22" width="8" height="24" rx="4" fill="#1B1F3B" />
      <ellipse cx="11" cy="38" rx="5" ry="8" fill="#1B1F3B" transform="rotate(-20 11 38)" />
      <ellipse cx="29" cy="22" rx="3" ry="5" fill="white" opacity="0.1" />
    </svg>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */
function FeatureCard({
  icon, title, subtitle, bgColor, onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgColor: string;
  onClick?: () => void;
}) {
  const bgColors: Record<string, string> = {
    "ic-peach": "bg-[#FDEEE6] text-[#7A3010]",
    "ic-sand": "bg-[#F4F0E8] text-[#5C4A2A]",
    "ic-slate": "bg-[#EEF0F6] text-[#1B1F3B]",
  };
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E8E6E0] rounded-[18px] p-3.5 text-left relative overflow-hidden"
    >
      <div className="absolute w-20 h-20 rounded-full bg-[#F4A07A] opacity-[0.06] -right-5 -bottom-5 pointer-events-none" />
      <div className={`w-10 h-10 rounded-xl ${bgColors[bgColor]} flex items-center justify-center mb-2.5 relative z-10`}>
        {icon}
      </div>
      <h5 className="text-[13px] font-semibold text-[#1B1F3B] mb-0.5 relative z-10">{title}</h5>
      <p className="text-[11px] text-[#6B7194] leading-snug relative z-10">{subtitle}</p>
    </button>
  );
}

function RecentItem({
  icon, word, category, bgColor, onClick,
}: {
  icon: React.ReactNode;
  word: string;
  category: string;
  bgColor: string;
  onClick?: () => void;
}) {
  const bgColors: Record<string, string> = {
    "ic-peach": "bg-[#FDEEE6] text-[#7A3010]",
    "ic-slate": "bg-[#EEF0F6] text-[#1B1F3B]",
  };
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-[#E8E6E0] rounded-[13px] mb-1.5"
    >
      <div className={`w-[34px] h-[34px] rounded-[10px] ${bgColors[bgColor]} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-[13px] font-medium text-[#1B1F3B]">{word}</div>
        <div className="text-[11px] text-[#6B7194]">{category}</div>
      </div>
      <div className="text-sm text-[#C8C5BE]">→</div>
    </button>
  );
}

function NavItem({
  icon, label, active = false, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 flex-1">
      <div className={active ? "text-[#1B1F3B]" : "text-[#C8C5BE]"}>{icon}</div>
      <span className={`text-[9px] ${active ? "text-[#1B1F3B] font-semibold" : "text-[#C8C5BE]"}`}>
        {label}
      </span>
      {active && <div className="w-1 h-1 rounded-full bg-[#F4A07A]" />}
    </button>
  );
}

/* ─── Word of the Day card ──────────────────────────────────────── */
function WordOfDayCard({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <div className="mb-2.5">
      <div className="bg-gradient-to-br from-[#1B1F3B] to-[#252A52] rounded-[18px] p-4 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-[80px] h-[80px] rounded-full border-[16px] border-[#F4A07A] opacity-[0.15] pointer-events-none" />
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-[70px] h-[70px] bg-[#F4A07A]/10 rounded-[14px] flex items-center justify-center flex-shrink-0 border border-[#F4A07A]/20">
            <HandSignIllustration />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Star size={11} className="text-[#F4A07A]" fill="#F4A07A" />
              <span className="text-[10px] font-semibold text-[#F4A07A] uppercase tracking-wider">Kata Hari Ini</span>
            </div>
            <div className="text-[18px] font-bold text-white leading-none mb-0.5" style={{ letterSpacing: "-0.3px" }}>
              Selamat
            </div>
            <div className="text-[11px] text-white/40 mb-2">/se·la·mat/ · Sapaan</div>
            <button
              onClick={() => onNavigate("dictionary")}
              className="bg-[#F4A07A] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg"
            >
              Pelajari →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── Main Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const onNavigate = (screen: string) => router.push(`/${screen}`);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-5 pt-5 pb-7 relative overflow-hidden">
        <div className="absolute w-[140px] h-[140px] rounded-full bg-[#F4A07A] opacity-[0.09] -top-12 -right-10 pointer-events-none" />
        <div className="absolute w-[80px] h-[80px] rounded-full bg-[#E8C9A0] opacity-[0.08] -bottom-4 left-6 pointer-events-none" />
        <div className="absolute top-6 right-6 opacity-[0.12] pointer-events-none">
          {[0, 1, 2].map(row => (
            <div key={row} className="flex gap-2.5 mb-2.5">
              {[0, 1, 2].map(col => (
                <div key={col} className="w-[4px] h-[4px] rounded-full bg-[#F4A07A]" />
              ))}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-xs font-semibold text-white/50">9:41</span>
          <div className="flex gap-1.5 text-white/40">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <path d="M0 3.5C0 3.22 0.22 3 0.5 3C2.75 3 8.5 0 8.5 0s5.75 3 8 3c0.28 0 0.5 0.22 0.5 0.5v5c0 0.28-0.22 0.5-0.5 0.5C14.25 9 8.5 12 8.5 12S2.75 9 0.5 9C0.22 9 0 8.78 0 8.5v-5z"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
              <rect x="0" y="0" width="19" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1"/>
              <rect x="20" y="4" width="2" height="4" rx="0.5"/>
              <rect x="2" y="2" width="15" height="8" rx="1"/>
            </svg>
          </div>
        </div>

        {/* Greeting */}
        <div className="relative z-10 mb-3.5 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-0.5">
              <p className="text-[11px] text-white/45">Selamat pagi</p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#FFC107]">
                <circle cx="12" cy="12" r="5" fill="currentColor"/>
                <path d="M12 1v3M12 20v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-[20px] font-bold text-white leading-none" style={{ letterSpacing: "-0.4px" }}>
              Hai, Dira!
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onNavigate("favorites")}
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
            >
              <Heart size={15} className="text-white/70" />
            </button>
            <button
              onClick={() => onNavigate("notifications")}
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm relative"
            >
              <Bell size={15} className="text-white/70" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#F44336] rounded-full border border-[#1B1F3B]" />
            </button>
          </div>
        </div>

        {/* Search bar — mascot peeks from bottom-right into the body */}
        <div className="relative z-10">
          <button
            onClick={() => onNavigate("search")}
            className="w-full bg-white/10 rounded-xl px-3.5 py-2.5 flex items-center gap-2 backdrop-blur-sm pr-20"
          >
            <Search size={15} className="text-white/40" />
            <span className="text-[13px] text-white/35">Cari kata isyarat...</span>
          </button>
          {/* Mascot: bottom-right of header, negative margin pulls it down over body */}
          <div className="absolute -bottom-10 right-1 z-20 pointer-events-none">
            <Mascot size={76} mood="wave" />
          </div>
        </div>
      </div>


      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Main feature card */}
        <div className="mb-2.5">
          <h3 className="text-[11px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2.5">
            Fitur utama
          </h3>
          <button
            onClick={() => onNavigate("sign-camera")}
            className="w-full bg-[#1B1F3B] rounded-[18px] p-4 flex items-center gap-3.5 relative overflow-hidden"
          >
            <div className="absolute w-24 h-24 rounded-full bg-[#F4A07A] opacity-[0.12] -right-6 -top-6 pointer-events-none" />
            <div className="absolute right-12 bottom-0 opacity-[0.06] pointer-events-none">
              <HandSignIllustration />
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-[14px] flex items-center justify-center flex-shrink-0 relative z-10">
              <Camera size={22} className="text-white" />
            </div>
            <div className="flex-1 text-left relative z-10">
              <div className="text-[14px] font-bold text-white mb-0.5">Terjemahkan isyarat</div>
              <div className="text-[11px] text-white/48">Arahkan kamera, mulai komunikasi</div>
              <div className="flex items-center gap-1 mt-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#69B578]" />
                <span className="text-[10px] text-[#69B578] font-medium">Real-time · BISINDO</span>
              </div>
            </div>
            <div className="text-lg text-white/30 relative z-10">→</div>
          </button>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          <FeatureCard icon={<Mic size={18} />} title="Suara ke teks" subtitle="Real-time speech recognition" bgColor="ic-peach" onClick={() => onNavigate("speech-to-text")} />
          <FeatureCard icon={<MessageSquare size={18} />} title="Percakapan" subtitle="Mode dua arah interaktif" bgColor="ic-sand" onClick={() => onNavigate("conversation")} />
          <FeatureCard icon={<BookOpen size={18} />} title="Kamus isyarat" subtitle="300+ kata BISINDO" bgColor="ic-slate" onClick={() => onNavigate("dictionary")} />
          <FeatureCard icon={<Zap size={18} />} title="Kalimat cepat" subtitle="Frasa sehari-hari siap pakai" bgColor="ic-peach" onClick={() => onNavigate("quick-phrases")} />
          <FeatureCard icon={<History size={18} />} title="Riwayat" subtitle="Lihat percakapan sebelumnya" bgColor="ic-slate" onClick={() => onNavigate("history")} />
          <FeatureCard icon={<TrendingUp size={18} />} title="Progress belajar" subtitle="Tracking & achievements" bgColor="ic-peach" onClick={() => onNavigate("learning-progress")} />
        </div>

        {/* Emergency mode banner */}
        <div className="mb-2.5">
          <button
            onClick={() => onNavigate("emergency")}
            className="w-full bg-gradient-to-r from-[#F44336] to-[#FF6B35] rounded-[18px] p-3.5 flex items-center gap-3 shadow-md shadow-[#F44336]/20"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[13px] font-bold text-white mb-0.5">Mode Darurat</div>
              <div className="text-[11px] text-white/75">Akses cepat pesan darurat</div>
            </div>
            <div className="text-white/50 text-sm">→</div>
          </button>
        </div>

        <WordOfDayCard onNavigate={onNavigate} />

        {/* Recently learned */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2.5">
            Terakhir dipelajari
          </h3>
          <RecentItem icon={<HandMetal size={15} />} word="Terima kasih" category="Sapaan · BISINDO" bgColor="ic-peach" onClick={() => onNavigate("dictionary")} />
          <RecentItem icon={<HandMetal size={15} />} word="Tolong bantu saya" category="Darurat · BISINDO" bgColor="ic-slate" onClick={() => onNavigate("dictionary")} />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8E6E0] flex justify-around items-center px-2 pt-3 pb-4">
        <NavItem icon={<Home size={20} />} label="Beranda" active />
        <NavItem icon={<MessageCircle size={20} />} label="Sapa" onClick={() => onNavigate("conversation")} />
        <NavItem icon={<BookOpen size={20} />} label="Kamus" onClick={() => onNavigate("dictionary")} />
        <NavItem icon={<User size={20} />} label="Profil" onClick={() => onNavigate("profile")} />
      </div>
    </div>
  );
}
