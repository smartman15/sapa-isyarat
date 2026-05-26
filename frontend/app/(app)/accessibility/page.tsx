"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Ear } from "lucide-react";

function SegmentButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-center py-2 px-1.5 rounded-[9px] text-[11px] font-medium border transition-colors ${
        active ? "bg-[#1B1F3B] text-white border-[#1B1F3B]" : "bg-transparent text-[#6B7194] border-[#E0DEDB]"
      }`}
    >
      {label}
    </button>
  );
}

function FeatureRow({
  icon, label, sublabel, toggleOn, onToggle, last = false,
}: {
  icon: React.ReactNode; label: string; sublabel: string; toggleOn: boolean; onToggle: () => void; last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-[13px] ${!last ? "border-b border-[#E8E6E0]" : ""}`}>
      <div className="w-[34px] h-[34px] bg-[#EEF0F6] rounded-[10px] flex items-center justify-center text-[#1B1F3B] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-medium text-[#1B1F3B]">{label}</div>
        <div className="text-[11px] text-[#6B7194] mt-0.5">{sublabel}</div>
      </div>
      <button
        onClick={onToggle}
        className={`w-[38px] h-[22px] rounded-full relative transition-colors ${toggleOn ? "bg-[#1B1F3B]" : "bg-[#D1CECC]"}`}
      >
        <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-0.5 transition-all ${toggleOn ? "right-0.5" : "left-0.5"}`}/>
      </button>
    </div>
  );
}

export default function AccessibilityPage() {
  const router = useRouter();
  const [textSize,  setTextSize]  = useState(16);
  const [contrast,  setContrast]  = useState<"normal"|"tinggi"|"maks">("tinggi");
  const [animation, setAnimation] = useState<"normal"|"lambat"|"tanpa">("normal");
  const [haptic,    setHaptic]    = useState(true);
  const [audio,     setAudio]     = useState(false);

  const pct = ((textSize - 12) / (20 - 12)) * 100;

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-[18px] pt-5 pb-4 relative">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <button onClick={() => router.back()} className="text-white/60"><ArrowLeft size={20}/></button>
          <h1 className="text-base font-semibold text-white flex-1">Aksesibilitas</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3.5">
        {/* Live preview */}
        <div className="bg-[#EEF0F6] rounded-2xl p-3.5 mb-4">
          <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">Pratinjau teks</div>
          <div className="font-semibold text-[#1B1F3B] mb-0.5" style={{fontSize: textSize}}>Terima kasih banyak</div>
          <div className="text-[#6B7194]" style={{fontSize: textSize - 3}}>Teks akan menyesuaikan pengaturanmu</div>
        </div>

        {/* Text size slider */}
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] p-3.5 mb-2">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[13px] font-medium text-[#1B1F3B]">Ukuran teks</span>
            <span className="bg-[#EEF0F6] px-2 py-0.5 rounded-full text-xs font-semibold text-[#1B1F3B]">{textSize}sp</span>
          </div>
          <div className="relative">
            <div className="h-1 bg-[#E0DEDB] rounded-full">
              <div className="h-1 bg-[#1B1F3B] rounded-full absolute left-0 top-0" style={{width:`${pct}%`}}/>
              <input
                type="range" min={12} max={20} value={textSize}
                onChange={e => setTextSize(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div className="w-5 h-5 bg-[#1B1F3B] rounded-full absolute -top-2 border-2 border-white" style={{left:`calc(${pct}% - 10px)`}}/>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#6B7194]">Kecil</span>
            <span className="text-[10px] text-[#6B7194]">Besar</span>
          </div>
        </div>

        {/* Contrast */}
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] p-3.5 mb-2">
          <div className="text-[13px] font-medium text-[#1B1F3B] mb-2.5">Kontras warna</div>
          <div className="flex gap-1.5">
            <SegmentButton label="Normal" active={contrast==="normal"} onClick={()=>setContrast("normal")}/>
            <SegmentButton label="Tinggi" active={contrast==="tinggi"} onClick={()=>setContrast("tinggi")}/>
            <SegmentButton label="Maks"   active={contrast==="maks"}   onClick={()=>setContrast("maks")}/>
          </div>
        </div>

        {/* Animation speed */}
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] p-3.5 mb-2">
          <div className="text-[13px] font-medium text-[#1B1F3B] mb-2.5">Kecepatan animasi</div>
          <div className="flex gap-1.5">
            <SegmentButton label="Normal"        active={animation==="normal"} onClick={()=>setAnimation("normal")}/>
            <SegmentButton label="Lambat"        active={animation==="lambat"} onClick={()=>setAnimation("lambat")}/>
            <SegmentButton label="Tanpa animasi" active={animation==="tanpa"}  onClick={()=>setAnimation("tanpa")}/>
          </div>
        </div>

        {/* Feature toggles */}
        <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2 mt-3.5">Fitur bantu</div>
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] overflow-hidden">
          <FeatureRow
            icon={<Eye size={16}/>}
            label="Getar saat isyarat terdeteksi"
            sublabel="Haptic feedback aktif"
            toggleOn={haptic}
            onToggle={()=>setHaptic(v=>!v)}
          />
          <FeatureRow
            icon={<Ear size={16}/>}
            label="Audio deskripsi"
            sublabel="Baca isyarat dengan suara"
            toggleOn={audio}
            onToggle={()=>setAudio(v=>!v)}
            last
          />
        </div>
      </div>
    </div>
  );
}
