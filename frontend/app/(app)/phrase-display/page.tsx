"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Volume2, RotateCcw } from "lucide-react";

const AUTO_DISMISS_MS = 15_000;

function PhraseDisplay() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const phrase       = searchParams.get("phrase") ?? "Saya tidak dapat mendengar";

  const [brightness, setBrightness] = useState(100);
  const [remaining,  setRemaining]  = useState(AUTO_DISMISS_MS / 1000);

  /* Auto-dismiss countdown */
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(interval); router.back(); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Top controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/20 to-transparent">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <X size={24} className="text-white"/>
        </button>
        <div className="flex gap-2">
          <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Volume2 size={20} className="text-white"/>
          </button>
          <button
            onClick={() => setRemaining(AUTO_DISMISS_MS / 1000)}
            className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <RotateCcw size={20} className="text-white"/>
          </button>
        </div>
      </div>

      {/* Main phrase display */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#1B1F3B] to-[#2D335E]">
        <div className="text-center max-w-4xl">
          <p className="text-white font-bold leading-tight px-4" style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)" }}>
            {phrase}
          </p>
        </div>
      </div>

      {/* Bottom hint + countdown */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent flex flex-col items-center gap-2">
        <p className="text-white/60 text-center text-sm">
          Tunjukkan layar ini ke lawan bicara
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1">
          <p className="text-white/80 text-xs font-medium">Otomatis tutup dalam {remaining} detik</p>
        </div>
      </div>

      {/* Vertical brightness slider */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 flex flex-col items-center gap-2">
          <input
            type="range"
            min="30"
            max="100"
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            className="h-32 cursor-pointer accent-[#F4A07A]"
            style={{ writingMode: "vertical-lr", direction: "rtl" }}
          />
          <span className="text-white/60 text-xs">{brightness}%</span>
        </div>
      </div>
    </div>
  );
}

export default function FullScreenPhraseDisplayPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#1B1F3B] flex items-center justify-center">
        <span className="text-white text-xl">Memuat...</span>
      </div>
    }>
      <PhraseDisplay/>
    </Suspense>
  );
}
