"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Volume2, AlertTriangle, Phone, MapPin, Heart, EarOff, Car } from "lucide-react";

const PHRASES = [
  { id:"1", text:"TOLONG BANTU SAYA!",           icon:<AlertTriangle size={32}/>, priority:"critical" },
  { id:"2", text:"SAYA BUTUH DOKTER",             icon:<Heart size={32}/>,        priority:"critical" },
  { id:"3", text:"HUBUNGI AMBULANS",              icon:<Phone size={32}/>,        priority:"critical" },
  { id:"4", text:"DI MANA RUMAH SAKIT?",          icon:<MapPin size={32}/>,       priority:"high"     },
  { id:"5", text:"SAYA TIDAK BISA MENDENGAR",     icon:<EarOff size={32}/>,       priority:"high"     },
  { id:"6", text:"TOLONG PANGGIL POLISI",         icon:<Car size={32}/>,          priority:"critical" },
];

function FullScreen({ text, onBack, onClose }: { text: string; onBack: () => void; onClose: () => void }) {
  const [speaking, setSpeaking] = useState(false);
  return (
    <div className="h-full flex flex-col bg-[#FFD700] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 35px,#F44336 35px,#F44336 70px)"
      }}/>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5 z-20">
        <button onClick={onBack} className="w-14 h-14 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl">
          <X size={24} className="text-white"/>
        </button>
        <button onClick={onClose} className="bg-[#F44336] text-white px-5 py-3 rounded-full font-bold text-sm shadow-2xl">
          TUTUP MODE DARURAT
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-between pt-24 pb-8 px-6 relative z-10 overflow-y-auto">
        <div className="w-24 h-24 bg-[#F44336] rounded-full flex items-center justify-center shadow-2xl shrink-0">
          <AlertTriangle size={48} className="text-white"/>
        </div>
        
        <div className="text-center mt-6 w-full">
          <div className="bg-[#F44336] rounded-[40px] px-8 py-10 shadow-2xl border-8 border-white">
            <h1 className="text-white font-black leading-tight uppercase break-words"
              style={{ fontSize:"clamp(1.5rem,7vw,3.5rem)", letterSpacing:"0.05em", textShadow:"0 4px 12px rgba(0,0,0,0.3)" }}>
              {text}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-2 mt-6">
            {[0,0.3,0.6].map((d,i) => <div key={i} className="w-4 h-4 bg-[#F44336] rounded-full animate-pulse" style={{animationDelay:`${d}s`}}/>)}
          </div>
        </div>
      </div>
      <div className="px-5 pb-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => setSpeaking(v=>!v)}
            className={`py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all ${
              speaking ? "bg-[#F44336] text-white" : "bg-white text-[#F44336]"
            }`}>
            <Volume2 size={24}/>{speaking?"BERHENTI":"PUTAR SUARA"}
          </button>
          <button className="bg-white text-[#1B1F3B] py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl">
            <Phone size={24}/>HUBUNGI 112
          </button>
        </div>
        <p className="text-center text-sm text-[#1B1F3B] font-semibold">Tunjukkan layar ini kepada orang di sekitar Anda</p>
      </div>
    </div>
  );
}

export default function EmergencyPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string|null>(null);
  const [fullScreen, setFullScreen] = useState(false);

  if (fullScreen && selected) {
    return <FullScreen text={selected} onBack={() => { setFullScreen(false); setSelected(null); }} onClose={() => router.back()}/>;
  }

  return (
    <div className="h-full flex flex-col bg-[#F44336]">
      {/* Header */}
      <div className="bg-[#D32F2F] px-5 pt-5 pb-4 relative">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle size={24} className="text-white"/>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white mb-0.5">MODE DARURAT</h1>
              <p className="text-xs text-white/80">Tap pesan untuk tampil penuh</p>
            </div>
          </div>
          <button onClick={() => router.back()} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <X size={20} className="text-white"/>
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-[#FF5722] px-5 py-3 flex items-center gap-3 border-t border-white/10 border-b border-black/10">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"/>
        <p className="text-white text-xs font-medium">Layar akan menampilkan pesan dalam ukuran besar untuk komunikasi darurat</p>
      </div>

      {/* Phrases */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {PHRASES.map(p => {
          const critical = p.priority === "critical";
          return (
            <button
              key={p.id}
              onClick={() => { setSelected(p.text); setFullScreen(true); }}
              className={`w-full rounded-2xl p-5 flex items-center gap-4 shadow-xl active:scale-95 transition-all ${
                critical ? "bg-white border-4 border-[#FFD700]" : "bg-white/95"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                critical ? "bg-[#F44336] text-white" : "bg-[#EEF0F6] text-[#F44336]"
              }`}>
                {p.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-lg font-bold text-[#1B1F3B] leading-tight">{p.text}</p>
                {critical && (
                  <span className="inline-flex items-center gap-1 bg-[#F44336] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1">
                    <AlertTriangle size={10}/>PRIORITAS TINGGI
                  </span>
                )}
              </div>
              <div className="w-10 h-10 bg-[#EEF0F6] rounded-full flex items-center justify-center flex-shrink-0">
                <Volume2 size={20} className="text-[#1B1F3B]"/>
              </div>
            </button>
          );
        })}

        {/* Quick actions */}
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-3 text-sm">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Phone size={24} className="text-[#F44336]"/>
              </div>
              <span className="text-white text-sm font-semibold">Hubungi 112</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <span className="text-white text-sm font-semibold">Rumah Sakit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
