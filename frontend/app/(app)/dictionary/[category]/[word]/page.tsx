"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Play, Camera, Bookmark, Volume2, HandMetal } from "lucide-react";

function Step({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex gap-[11px] mb-2.5">
      <div className="w-[26px] h-[26px] bg-[#1B1F3B] text-white rounded-lg flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
        {num}
      </div>
      <p className="text-[13px] text-[#1B1F3B] leading-relaxed pt-0.5">{text}</p>
    </div>
  );
}

function RelatedChip({ word, onClick }: { word: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white border border-[#E8E6E0] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#1B1F3B]">
      {word}
    </button>
  );
}

export default function DictionaryDetailPage() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-[18px] py-4 relative">
        <div className="absolute top-0 left-0 right-0 flex justify-between px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <button onClick={() => router.back()} className="text-white/60">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[15px] font-semibold text-white flex-1">Detail isyarat</h1>
          <button className="text-white/50">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3.5">
        {/* Hero illustration */}
        <div className="bg-[#EEF0F6] rounded-[20px] h-40 flex flex-col items-center justify-center gap-2 mb-3.5 relative overflow-hidden">
          <div className="absolute w-[120px] h-[120px] rounded-full bg-[#1B1F3B] opacity-[0.05] -bottom-8 -right-8" />
          <div className="text-[#1B1F3B] relative z-10">
            <HandMetal size={64} strokeWidth={1.5} />
          </div>
          <div className="bg-[#1B1F3B] text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 relative z-10">
            <Play size={10} />Tonton animasi
          </div>
        </div>

        {/* Word info */}
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-[26px] font-semibold text-[#1B1F3B]" style={{ letterSpacing: "-0.4px" }}>
            Terima kasih
          </h2>
          <div className="bg-[#FDEEE6] text-[#7A3010] px-2.5 py-1 rounded-full text-[10px] font-semibold">
            Sapaan
          </div>
        </div>
        <p className="text-xs text-[#6B7194] mb-3.5">SIBI · /te-ri-ma ka-sih/</p>

        {/* Steps */}
        <div className="mb-3.5">
          <h3 className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2.5">
            Cara membuat isyarat
          </h3>
          <Step num={1} text="Sentuhkan ujung jari ke dagu dengan telapak tangan menghadap ke atas." />
          <Step num={2} text="Gerakkan tangan ke depan dan bawah dengan gerakan melengkung halus." />
          <Step num={3} text="Akhiri dengan telapak tangan menghadap lawan bicara." />
        </div>

        {/* Related words */}
        <div className="mb-3.5">
          <h3 className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">Kata terkait</h3>
          <div className="flex gap-2 flex-wrap">
            {["Halo","Maaf","Tolong","Sama-sama"].map(w => (
              <RelatedChip key={w} word={w} onClick={() => {}} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/sign-camera")}
            className="flex-1 bg-[#1B1F3B] text-white py-[13px] rounded-[13px] font-semibold text-[13px] flex items-center justify-center gap-1.5"
          >
            <Camera size={16} />Coba sekarang
          </button>
          <button className="w-12 h-12 bg-[#FDEEE6] text-[#7A3010] rounded-[13px] flex items-center justify-center">
            <Bookmark size={19} />
          </button>
          <button className="w-12 h-12 bg-[#EEF0F6] text-[#1B1F3B] rounded-[13px] flex items-center justify-center">
            <Volume2 size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
