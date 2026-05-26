"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Camera, Mic, MessageCircle, Share2, Trash2, Download, Play } from "lucide-react";

/* Stub entry — in a real app this would be fetched from a store/API using the route [id] */
const STUB = {
  id: "1",
  type: "sign" as "sign" | "speech" | "conversation",
  title: "Sesi Terjemahan – Pagi",
  content: "Terima kasih banyak atas bantuannya. Saya sangat menghargai kebaikan Anda.",
  timestamp: new Date("2026-05-20T09:15:00"),
  duration: "2 menit 34 detik",
  accuracy: 94,
  words: ["Terima kasih", "banyak", "bantuan", "menghargai", "kebaikan"],
};

type EntryType = "sign" | "speech" | "conversation";

function getConfig(type: EntryType) {
  switch (type) {
    case "sign":         return { icon:<Camera size={32}/>,        color:"from-[#F4A07A] to-[#E89566]",   label:"Terjemahan Isyarat", bgColor:"bg-[#FDEEE6]" };
    case "speech":       return { icon:<Mic size={32}/>,           color:"from-[#2196F3] to-[#1976D2]",   label:"Suara ke Teks",      bgColor:"bg-[#E3F2FD]" };
    case "conversation": return { icon:<MessageCircle size={32}/>, color:"from-[#69B578] to-[#4CAF50]",   label:"Percakapan",         bgColor:"bg-[#E8F5E9]" };
  }
}

export default function HistoryDetailPage() {
  const router = useRouter();
  const entry  = STUB;               // replace with useParams + data fetch in production
  const cfg    = getConfig(entry.type);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${cfg.color} px-5 pt-5 pb-8 relative overflow-hidden flex-shrink-0`}>
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"/>

        <div className="flex items-center gap-3 mt-8 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <div className="flex-1">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
              <span className="text-xs text-white font-medium">{cfg.label}</span>
            </div>
            <h1 className="text-xl font-bold text-white">{entry.title}</h1>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Pull-up info card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E6E0] p-5 -mt-12 relative z-10 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 ${cfg.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              {cfg.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1B1F3B] mb-1">Informasi</h3>
              <div className="flex items-center gap-3 text-xs text-[#6B7194] flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock size={12}/>
                  <span>{entry.timestamp.toLocaleString("id-ID")}</span>
                </div>
                {entry.duration && (
                  <>
                    <div className="w-1 h-1 bg-[#E8E6E0] rounded-full"/>
                    <span>{entry.duration}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {entry.accuracy && (
            <div className="pt-4 border-t border-[#E8E6E0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B7194]">Akurasi</span>
                <span className="text-lg font-bold text-[#1B1F3B]">{entry.accuracy}%</span>
              </div>
              <div className="h-2 bg-[#EEF0F6] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${cfg.color} rounded-full`}
                  style={{ width:`${entry.accuracy}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Transcript content */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E6E0] p-5 mb-4">
          <h3 className="text-sm font-semibold text-[#1B1F3B] mb-3">Konten</h3>
          <p className="text-sm text-[#1B1F3B] leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        </div>

        {/* Detected words */}
        {entry.words && entry.words.length > 0 && (
          <div className="bg-gradient-to-br from-[#EEF0F6] to-[#FDEEE6] rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-semibold text-[#1B1F3B] mb-3">Kata Terdeteksi</h3>
            <div className="flex flex-wrap gap-2">
              {entry.words.map((w, i) => (
                <span key={i} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-[#1B1F3B]">{w}</span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="bg-white border border-[#E8E6E0] text-[#1B1F3B] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
            <Share2 size={18}/>Bagikan
          </button>
          <button className="bg-white border border-[#E8E6E0] text-[#1B1F3B] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
            <Download size={18}/>Unduh
          </button>
        </div>

        {entry.type === "sign" && (
          <button className="w-full bg-[#1B1F3B] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3">
            <Play size={20}/>Putar Ulang Rekaman
          </button>
        )}

        <button
          onClick={() => router.back()}
          className="w-full bg-white border border-[#F44336] text-[#F44336] py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Trash2 size={18}/>Hapus Riwayat Ini
        </button>
      </div>
    </div>
  );
}
