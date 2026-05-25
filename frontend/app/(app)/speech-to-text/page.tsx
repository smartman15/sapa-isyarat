"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Pause, Trash2, Save, Copy, Volume2, Lightbulb } from "lucide-react";

export default function SpeechToTextPage() {
  const router = useRouter();
  const [isListening, setIsListening]   = useState(false);
  const [transcript,  setTranscript]    = useState("");
  const [duration,    setDuration]      = useState(0);
  const [bars,        setBars]          = useState<number[]>(Array(40).fill(0));

  useEffect(() => {
    if (!isListening) return;
    const id = setInterval(() => setBars(Array(40).fill(0).map(() => Math.random() * 100)), 100);
    return () => clearInterval(id);
  }, [isListening]);

  useEffect(() => {
    if (!isListening) return;
    const id = setInterval(() => setDuration(p => p + 1), 1000);
    return () => clearInterval(id);
  }, [isListening]);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const toggle = () => {
    setIsListening(v => !v);
    if (!isListening) {
      setTimeout(() => setTranscript("Selamat pagi, saya ingin bertanya tentang jadwal klinik hari ini. Apakah dokter spesialis mata tersedia?"), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#FAF9F6] to-[#EEF0F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="absolute w-[140px] h-[140px] rounded-full bg-[#F4A07A] opacity-10 -top-16 -right-12" />
        <div className="flex items-center justify-between mt-8 relative z-10">
          <button onClick={() => router.back()} className="text-white/70"><ArrowLeft size={22}/></button>
          <h1 className="text-lg font-semibold text-white">Suara ke Teks</h1>
          <button onClick={() => { setTranscript(""); setDuration(0); }} className="text-white/70"><Trash2 size={20}/></button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Mic button */}
        <div className="relative mb-8">
          {isListening && (
            <>
              <div className="absolute inset-0 -m-12 rounded-full bg-[#F4A07A] opacity-10 animate-ping"/>
              <div className="absolute inset-0 -m-8 rounded-full bg-[#F4A07A] opacity-20 animate-pulse"/>
              <div className="absolute inset-0 -m-4 rounded-full bg-[#F4A07A] opacity-30 animate-pulse" style={{animationDelay:"0.3s"}}/>
            </>
          )}
          <button
            onClick={toggle}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
              isListening ? "bg-gradient-to-br from-[#F44336] to-[#D32F2F]" : "bg-gradient-to-br from-[#F4A07A] to-[#E89566]"
            }`}
          >
            {isListening ? <Pause size={48} className="text-white"/> : <Mic size={48} className="text-white"/>}
          </button>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-2">
            {isListening ? "Mendengarkan..." : transcript ? "Selesai Merekam" : "Ketuk untuk Mulai"}
          </h2>
          <p className="text-sm text-[#6B7194]">
            {isListening ? "Berbicara dengan jelas ke mikrofon"
              : transcript ? "Rekaman berhasil ditranskripsikan"
              : "Ketuk tombol mikrofon untuk merekam suara"}
          </p>
        </div>

        {isListening && (
          <>
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg mb-6">
              <div className="text-3xl font-bold text-[#F4A07A] text-center tracking-wider">{fmt(duration)}</div>
            </div>
            <div className="w-full max-w-md mb-8">
              <div className="flex items-center justify-center gap-1 h-24">
                {bars.map((h, i) => (
                  <div key={i} className="w-1 bg-gradient-to-t from-[#F4A07A] to-[#E89566] rounded-full transition-all duration-100"
                    style={{ height:`${Math.max(h,10)}%`, opacity:0.3+(h/100)*0.7 }}/>
                ))}
              </div>
            </div>
          </>
        )}

        {transcript && !isListening && (
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-[#1B1F3B] to-[#2D335E] px-5 py-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Transkrip</h3>
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-white/60"/>
                  <span className="text-xs text-white/60">{transcript.length} karakter</span>
                </div>
              </div>
              <div className="px-5 py-6 max-h-64 overflow-y-auto">
                <p className="text-base text-[#1B1F3B] leading-relaxed">{transcript}</p>
              </div>
              <div className="px-5 py-3 bg-[#EEF0F6] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div><div className="text-xs text-[#6B7194]">Kata</div><div className="text-sm font-semibold text-[#1B1F3B]">{transcript.split(" ").length}</div></div>
                  <div><div className="text-xs text-[#6B7194]">Durasi</div><div className="text-sm font-semibold text-[#1B1F3B]">{fmt(duration)}</div></div>
                </div>
                <div className="bg-[#69B578]/10 text-[#69B578] px-3 py-1 rounded-full text-xs font-semibold">Akurasi Tinggi</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-[#1B1F3B] to-[#2D335E] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                <Copy size={20}/>Salin Teks
              </button>
              <button className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                <Save size={22} className="text-[#1B1F3B]"/>
              </button>
            </div>
          </div>
        )}

        {!isListening && !transcript && (
          <div className="w-full max-w-md">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white">
              <h4 className="text-xs font-semibold text-[#1B1F3B] mb-2 flex items-center gap-2">
                <Lightbulb size={14} className="text-[#F4A07A]" fill="#F4A07A"/>Tips untuk hasil terbaik
              </h4>
              <ul className="text-xs text-[#6B7194] space-y-1">
                <li>• Berbicara dengan jelas dan tidak terlalu cepat</li>
                <li>• Hindari kebisingan latar belakang</li>
                <li>• Pastikan mikrofon tidak terhalang</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
