"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Mic, Send, Volume2, StopCircle, Play } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type Mode = "sign" | "voice" | "text";
type MsgType = "them" | "me" | "sign";

const INITIAL_MESSAGES = [
  { id:"1", type:"them" as MsgType, text:"Halo, ada yang bisa saya bantu?",       label:"Lawan bicara"     },
  { id:"2", type:"sign" as MsgType, text:"Saya ingin membeli tiket kereta",        label:"Isyarat terdeteksi"},
  { id:"3", type:"me"   as MsgType, text:"Untuk besok, dua orang",                label:"Anda"             },
];

function ModeChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-center py-1.5 rounded-[10px] text-[11px] font-medium transition-colors ${
        active ? "bg-[#1B1F3B] text-white" : "bg-transparent text-[#6B7194]"
      }`}
    >
      {label}
    </button>
  );
}

function MessageBubble({ message }: { message: (typeof INITIAL_MESSAGES)[number] }) {
  if (message.type === "them") return (
    <div className="max-w-[82%] mb-2.5">
      <div className="bg-white border border-[#E8E6E0] rounded-2xl rounded-tl px-3.5 py-3">
        <div className="text-[9px] text-[#6B7194] uppercase tracking-wider mb-1">{message.label}</div>
        <div className="text-[13px] text-[#1B1F3B] leading-relaxed">{message.text}</div>
      </div>
    </div>
  );
  if (message.type === "sign") return (
    <div className="max-w-[82%] mb-2.5">
      <div className="bg-[#FDEEE6] border border-[#F4D0BA] rounded-2xl rounded-tl px-3.5 py-3">
        <div className="text-[9px] text-[#7A3010] uppercase tracking-wider mb-1">{message.label}</div>
        <div className="text-[13px] text-[#4A2000] leading-relaxed">{message.text}</div>
      </div>
    </div>
  );
  return (
    <div className="max-w-[82%] mb-2.5 ml-auto">
      <div className="bg-[#1B1F3B] rounded-2xl rounded-br px-3.5 py-3">
        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{message.label}</div>
        <div className="text-[13px] text-white leading-relaxed">{message.text}</div>
      </div>
    </div>
  );
}

export default function ConversationPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);

  useEffect(() => {
    if (isRecording && mode === "voice") {
      const id = setInterval(() => setVoiceLevel(Math.random() * 100), 100);
      return () => clearInterval(id);
    }
  }, [isRecording, mode]);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-[18px] py-4 relative">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <button onClick={() => router.back()} className="text-white/70"><ArrowLeft size={20}/></button>
          <h1 className="text-base font-semibold text-white flex-1">Mode percakapan</h1>
          <div className="bg-[#F4A07A]/20 border border-[#F4A07A]/30 rounded-full px-2.5 py-1">
            <span className="text-[10px] text-[#F4A07A] font-medium">Aktif</span>
          </div>
        </div>
      </div>

      {/* Mode selector */}
      <div className="bg-[#EEF0F6] px-4 py-2 flex gap-2">
        <ModeChip label="Isyarat" active={mode==="sign"}  onClick={() => setMode("sign")}  />
        <ModeChip label="Suara"   active={mode==="voice"} onClick={() => setMode("voice")} />
        <ModeChip label="Teks"    active={mode==="text"}  onClick={() => setMode("text")}  />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3.5">
        {INITIAL_MESSAGES.map(m => <MessageBubble key={m.id} message={m} />)}
      </div>

      {/* Sign mode panel */}
      {mode === "sign" && (
        <div
          className="bg-[#1B1F3B] mx-3.5 mb-3 rounded-[18px] h-[130px] flex flex-col items-center justify-center gap-1.5 relative overflow-hidden cursor-pointer"
          onClick={() => router.push("/sign-camera")}
        >
          <div className="absolute w-[100px] h-[100px] rounded-full bg-[#F4A07A] opacity-[0.08] -right-5 -bottom-8" />
          <Camera size={36} className="text-white/40 relative z-10" />
          <span className="text-xs text-white/40 relative z-10">Arahkan kamera ke tangan Anda</span>
          <div className="bg-[#F4A07A]/25 border border-[#F4A07A]/40 rounded-full px-3 py-1 flex items-center gap-1.5 relative z-10">
            <div className="w-[9px] h-[9px] rounded-full bg-[#F4A07A] animate-pulse" />
            <span className="text-[10px] text-[#F4A07A] font-medium">Ketuk untuk buka kamera</span>
          </div>
        </div>
      )}

      {/* Voice mode panel */}
      {mode === "voice" && (
        <div className="bg-gradient-to-br from-[#1B1F3B] to-[#252A52] mx-3.5 mb-3 rounded-[18px] p-5 relative overflow-hidden">
          <div className="absolute w-[120px] h-[120px] rounded-full bg-[#F4A07A] opacity-[0.08] -right-8 -top-8" />
          {isRecording ? (
            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className="flex items-center gap-1 h-12">
                {[...Array(15)].map((_,i) => (
                  <div key={i} className="w-1 bg-[#F4A07A] rounded-full transition-all duration-100"
                    style={{ height:`${Math.max(8,(voiceLevel+(i*5))%48)}px`, opacity:0.3+(voiceLevel/200) }}/>
                ))}
              </div>
              <div className="text-[13px] text-white font-medium">Mendengarkan...</div>
              <button onClick={() => setIsRecording(false)} className="bg-[#F44336] text-white px-4 py-2 rounded-xl text-[11px] font-semibold flex items-center gap-2">
                <StopCircle size={16}/>Berhenti
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 relative z-10">
              <Mic size={36} className="text-white/40 mb-1"/>
              <span className="text-[13px] text-white/60">Tekan untuk bicara</span>
              <button onClick={() => setIsRecording(true)} className="bg-[#F4A07A] text-white px-5 py-2.5 rounded-xl text-[12px] font-semibold flex items-center gap-2">
                <Play size={16}/>Mulai Rekam
              </button>
            </div>
          )}
        </div>
      )}

      {/* Text mode input */}
      {mode === "text" && (
        <div className="flex items-center gap-2 px-3.5 pb-4 border-t border-[#E8E6E0]">
          <input type="text" placeholder="Ketik pesan..." className="flex-1 bg-white border border-[#E0DEDB] rounded-xl px-3.5 py-2.5 text-[13px] text-[#1B1F3B] placeholder:text-[#9B9890]"/>
          <button className="w-10 h-10 bg-[#1B1F3B] rounded-xl flex items-center justify-center"><Volume2 size={18} className="text-white"/></button>
          <button className="w-10 h-10 bg-[#F4A07A] rounded-xl flex items-center justify-center"><Send size={18} className="text-[#4A2400]"/></button>
        </div>
      )}

      {/* Quick actions */}
      {(mode === "sign" || mode === "voice") && (
        <div className="px-3.5 pb-20 border-t border-[#E8E6E0]">
          <div className="flex gap-2 pt-3">
            <button className="flex-1 bg-white border border-[#E8E6E0] rounded-xl py-2.5 text-[11px] font-medium text-[#1B1F3B]">Ulangi</button>
            <button className="flex-1 bg-[#1B1F3B] text-white rounded-xl py-2.5 text-[11px] font-semibold">Konfirmasi</button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
