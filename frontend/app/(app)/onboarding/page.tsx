"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Mascot from "@/components/Mascot";

/* ─── Slide illustrations ───────────────────────────────────────── */

function IllustrationCamera() {
  return (
    <svg width="170" height="150" viewBox="0 0 170 150" fill="none">
      <rect x="48" y="14" width="74" height="116" rx="16" fill="#252A52" />
      <rect x="54" y="22" width="62" height="98" rx="10" fill="#1B1F3B" />
      <rect x="78" y="15" width="14" height="5" rx="2.5" fill="#1B1F3B" />
      <path d="M68 37 L62 37 L62 43" stroke="#F4A07A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M102 37 L108 37 L108 43" stroke="#F4A07A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M68 103 L62 103 L62 97" stroke="#F4A07A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M102 103 L108 103 L108 97" stroke="#F4A07A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M74 90 L74 73 C74 70.8 75.8 69 78 69 C80.2 69 82 70.8 82 73 L82 77" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M82 76 L82 70 C82 67.8 83.8 66 86 66 C88.2 66 90 67.8 90 70 L90 77" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M90 76 L90 71 C90 68.8 91.8 67 94 67 C96.2 67 98 68.8 98 71 L98 78" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M98 78 L98 75 C98 72.8 99.8 71 102 71 C104.2 71 106 72.8 106 75 L106 81 C106 87.6 100.6 93 94 93 L90 93 C86.7 93 84 90.3 84 87" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="92" y="108" width="54" height="19" rx="7" fill="#F4A07A"/>
      <path d="M96 117 L92 121" stroke="#F4A07A" strokeWidth="2"/>
      <text x="119" y="121" textAnchor="middle" fontSize="8" fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">Terima kasih</text>
      <circle cx="85" cy="132" r="8" fill="#F4A07A" opacity="0.7"/>
      <circle cx="85" cy="132" r="5" fill="white" opacity="0.9"/>
      <circle cx="34" cy="52" r="5" fill="#F4A07A" opacity="0.25"/>
      <circle cx="140" cy="75" r="4" fill="#E8C9A0" opacity="0.25"/>
      <circle cx="136" cy="32" r="6" fill="#F4A07A" opacity="0.18"/>
    </svg>
  );
}

function IllustrationSpeech() {
  return (
    <svg width="170" height="150" viewBox="0 0 170 150" fill="none">
      <circle cx="85" cy="65" r="52" stroke="#F4A07A" strokeWidth="1.5" opacity="0.14"/>
      <circle cx="85" cy="65" r="40" stroke="#F4A07A" strokeWidth="1.5" opacity="0.22"/>
      <circle cx="85" cy="65" r="28" fill="#252A52"/>
      <circle cx="85" cy="65" r="22" fill="#1B1F3B"/>
      <rect x="79" y="50" width="12" height="20" rx="6" fill="white"/>
      <path d="M72 65 C72 73.8 77.9 81 85 81 C92.1 81 98 73.8 98 65" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <line x1="85" y1="81" x2="85" y2="89" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
      <line x1="77" y1="89" x2="93" y2="89" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M49 65 C49 65 53 57 57 65 C61 73 65 65 65 65" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.65"/>
      <path d="M105 65 C105 65 109 57 113 65 C117 73 121 65 121 65" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.65"/>
      <rect x="50" y="108" width="6" height="13" rx="3" fill="#F4A07A" opacity="0.45"/>
      <rect x="60" y="103" width="6" height="18" rx="3" fill="#F4A07A" opacity="0.65"/>
      <rect x="70" y="106" width="6" height="15" rx="3" fill="#F4A07A" opacity="0.85"/>
      <rect x="80" y="100" width="6" height="21" rx="3" fill="#F4A07A"/>
      <rect x="90" y="104" width="6" height="17" rx="3" fill="#F4A07A" opacity="0.85"/>
      <rect x="100" y="107" width="6" height="14" rx="3" fill="#F4A07A" opacity="0.65"/>
      <rect x="110" y="110" width="6" height="11" rx="3" fill="#F4A07A" opacity="0.45"/>
    </svg>
  );
}

function IllustrationDictionary() {
  return (
    <svg width="170" height="150" viewBox="0 0 170 150" fill="none">
      <rect x="42" y="22" width="86" height="104" rx="14" fill="#252A52" transform="rotate(-7 42 22)"/>
      <rect x="40" y="20" width="86" height="104" rx="14" fill="#2D335E" transform="rotate(-2.5 40 20)"/>
      <rect x="38" y="18" width="86" height="104" rx="14" fill="#FAF9F6"/>
      <path d="M62 76 L62 62 C62 59.8 63.8 58 66 58 C68.2 58 70 59.8 70 62 L70 68" stroke="#1B1F3B" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M70 67 L70 60 C70 57.8 71.8 56 74 56 C76.2 56 78 57.8 78 60 L78 68" stroke="#1B1F3B" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M78 67 L78 62 C78 59.8 79.8 58 82 58 C84.2 58 86 59.8 86 62 L86 68" stroke="#1B1F3B" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M86 68 L86 65 C86 62.8 87.8 61 90 61 C92.2 61 94 62.8 94 65 L94 70 C94 76.6 88.6 82 82 82 L78 82 C74.7 82 72 79.3 72 76" stroke="#1B1F3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="52" y="90" width="56" height="8" rx="4" fill="#F4A07A" opacity="0.85"/>
      <rect x="60" y="102" width="40" height="5" rx="2.5" fill="#6B7194" opacity="0.45"/>
      <circle cx="122" cy="32" r="17" fill="#F4A07A"/>
      <circle cx="122" cy="32" r="13" fill="#E8934A"/>
      <text x="122" y="29" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">+25</text>
      <text x="122" y="39" textAnchor="middle" fontSize="6" fill="white" fontFamily="DM Sans, sans-serif" fontWeight="600">XP</text>
    </svg>
  );
}

/* ─── Dot indicator ─────────────────────────────────────────────── */
function Dots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? "w-[24px] bg-[#F4A07A]" : "w-1.5 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Slide data ─────────────────────────────────────────────────── */
type SlideData = {
  illustration: "camera" | "speech" | "dictionary";
  title: string;
  subtitle: string;
};

const featureSlides: SlideData[] = [
  {
    illustration: "camera",
    title: "Terjemahkan isyarat,\nseketika",
    subtitle: "Arahkan kamera ke tangan dan Isya menerjemahkan SIBI ke teks secara real-time.",
  },
  {
    illustration: "speech",
    title: "Suaramu jadi teks,\notomatis",
    subtitle: "Bicara natural — teknologi speech recognition mengubah suara jadi teks seketika.",
  },
  {
    illustration: "dictionary",
    title: "Belajar SIBI\nbersama Isya",
    subtitle: "300+ kata dengan video demonstrasi, kuis seru, dan gamification untuk semangat belajarmu.",
  },
];

const IllustrationMap = {
  camera: <IllustrationCamera />,
  speech: <IllustrationSpeech />,
  dictionary: <IllustrationDictionary />,
};

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < featureSlides.length) {
      setStep(step + 1);
    } else {
      router.push("/home");
    }
  };

  const handleSkip = () => router.push("/home");

  /* ── SPLASH ─────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div className="h-full flex flex-col bg-[#1B1F3B] relative overflow-hidden">
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 pt-3 relative z-10">
          <span className="text-xs font-semibold text-white/50">9:41</span>
          <div className="flex gap-1.5 text-xs text-white/40"><span>📶</span><span>🔋</span></div>
        </div>

        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-[220px] h-[220px] rounded-full border-[40px] border-[#F4A07A] opacity-[0.11] pointer-events-none"/>
        <div className="absolute -top-14 -right-14 w-[140px] h-[140px] rounded-full border-[24px] border-[#E8C9A0] opacity-[0.08] pointer-events-none"/>
        <div className="absolute -bottom-20 -left-20 w-[180px] h-[180px] rounded-full border-[32px] border-[#F4A07A] opacity-[0.08] pointer-events-none"/>
        <div className="absolute top-16 left-5 opacity-[0.16] pointer-events-none">
          {[0,1,2,3,4].map(r => (
            <div key={r} className="flex gap-[10px] mb-[10px]">
              {[0,1,2,3].map(c => <div key={c} className="w-[5px] h-[5px] rounded-full bg-[#F4A07A]"/>)}
            </div>
          ))}
        </div>
        <div className="absolute top-[19%] right-10 w-5 h-5 rounded-[5px] bg-[#E8C9A0] opacity-[0.18] rotate-12 pointer-events-none"/>
        <div className="absolute top-[40%] left-7 w-3 h-3 rounded-full bg-white opacity-[0.10] pointer-events-none"/>
        <div className="absolute bottom-[30%] right-7 w-4 h-4 rounded-full bg-[#F4A07A] opacity-[0.16] pointer-events-none"/>

        {/* Hero area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-4 relative z-10">
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute w-[220px] h-[220px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(244,160,122,0.22) 0%, transparent 72%)" }}/>
            <div className="absolute w-[168px] h-[168px] rounded-full border border-[#F4A07A]/18 pointer-events-none"/>
            <div className="absolute w-[130px] h-[130px] rounded-full border border-[#F4A07A]/10 pointer-events-none"/>
            <Mascot size={152} mood="wave"/>
          </div>

          {/* App logo + name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-[#F4A07A] rounded-[13px] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#F4A07A]/25">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 17V9.5C7 8.12 8.12 7 9.5 7S12 8.12 12 9.5V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 12.5V8.5C12 7.12 13.12 6 14.5 6S17 7.12 17 8.5V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 12.5V10C17 8.62 18.12 7.5 19.5 7.5S22 8.62 22 10V15C22 18.87 18.87 22 15 22H12C9.24 22 7 19.76 7 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="5" cy="6" r="3" fill="#FDEEE6"/>
              </svg>
            </div>
            <div>
              <div className="text-[24px] font-bold text-white leading-none" style={{ letterSpacing: "-0.5px" }}>
                Sapa Isyarat
              </div>
              <div className="text-[11px] text-[#F4A07A] font-medium tracking-wide mt-0.5">
                Komunikasi Inklusif untuk Semua
              </div>
            </div>
          </div>

          {/* Tag pills */}
          <div className="flex gap-2 flex-wrap justify-center">
            {["Gratis", "SIBI", "Mudah Digunakan"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-medium text-white/55 border border-white/12 bg-white/[0.05]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="bg-[#FAF9F6] px-5 pt-5 pb-7 flex flex-col gap-2.5 rounded-t-[28px]">
          <button
            onClick={handleNext}
            className="w-full bg-[#1B1F3B] text-[#FAF9F6] py-[15px] rounded-[14px] font-semibold text-[14px]"
            style={{ letterSpacing: "-0.15px" }}
          >
            Mulai perjalanan ✨
          </button>
          <button onClick={handleSkip} className="w-full text-[#6B7194] py-2 text-[13px]">
            Saya sudah punya akun
          </button>
        </div>
      </div>
    );
  }

  /* ── FEATURE SLIDES ──────────────────────────────────────────── */
  const slide = featureSlides[step - 1];
  const moodMap: Record<number, "wave" | "thinking" | "happy"> = { 1: "wave", 2: "thinking", 3: "happy" };

  return (
    <div className="h-full flex flex-col bg-[#1B1F3B] relative overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-3 relative z-10">
        <span className="text-xs font-semibold text-white/50">9:41</span>
        <div className="flex gap-1.5 text-xs text-white/40"><span>📶</span><span>🔋</span></div>
      </div>

      <div className="absolute -top-20 -right-20 w-[180px] h-[180px] rounded-full border-[32px] border-[#F4A07A] opacity-[0.09] pointer-events-none"/>

      <button onClick={handleSkip} className="absolute top-3 right-5 z-20 text-[12px] text-white/35 font-medium">
        Lewati
      </button>

      {/* Illustration zone */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-2 relative z-10">
        <div className="relative flex items-center justify-center mb-5">
          <div className="w-[224px] h-[224px] rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
            <div className="w-[194px] h-[194px] rounded-full bg-white/[0.04] flex items-center justify-center">
              {IllustrationMap[slide.illustration]}
            </div>
          </div>
          <div className="absolute -bottom-3 -right-1 z-10">
            <Mascot size={68} mood={moodMap[step] || "wave"}/>
          </div>
        </div>

        <div className="text-center px-2">
          <h2
            className="text-[20px] font-bold text-white mb-2.5 leading-snug whitespace-pre-line"
            style={{ letterSpacing: "-0.4px" }}
          >
            {slide.title}
          </h2>
          <p className="text-[13px] text-white/48 leading-relaxed max-w-[280px]">
            {slide.subtitle}
          </p>
        </div>

        <div className="mt-5">
          <Dots total={featureSlides.length} current={step - 1}/>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-[#FAF9F6] px-5 pt-5 pb-7 flex flex-col gap-2.5 rounded-t-[28px]">
        <button
          onClick={handleNext}
          className="w-full bg-[#1B1F3B] text-[#FAF9F6] py-[15px] rounded-[14px] font-semibold text-[14px]"
          style={{ letterSpacing: "-0.15px" }}
        >
          {step < featureSlides.length ? "Lanjut" : "Mulai sekarang"}
        </button>
        <button onClick={handleSkip} className="w-full text-[#6B7194] py-2 text-[13px]">
          Lewati
        </button>
      </div>
    </div>
  );
}
