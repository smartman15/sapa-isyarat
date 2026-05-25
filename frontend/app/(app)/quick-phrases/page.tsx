"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, AlertTriangle, HandMetal, Stethoscope, MapPin, DollarSign,
  Coffee, ShoppingBag, Utensils, HelpCircle, Heart, ThumbsUp, Phone, Clock,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const BG: Record<string, string> = {
  "ic-n": "bg-[#EEF0F6] text-[#1B1F3B]",
  "ic-p": "bg-[#FDEEE6] text-[#7A3010]",
  "ic-s": "bg-[#F4F0E8] text-[#5C4A2A]",
};

const PHRASES = [
  { id:"1",  phrase:"Halo, apa kabar?",               category:"Sapaan umum", icon:<HandMetal size={17}/>,  bg:"ic-n" },
  { id:"2",  phrase:"Terima kasih banyak",             category:"Sapaan umum", icon:<Heart size={17}/>,      bg:"ic-p" },
  { id:"3",  phrase:"Senang bertemu dengan Anda",      category:"Sapaan umum", icon:<ThumbsUp size={17}/>,   bg:"ic-s" },
  { id:"4",  phrase:"Saya butuh dokter",               category:"Kesehatan",   icon:<Stethoscope size={17}/>,bg:"ic-p" },
  { id:"5",  phrase:"Saya merasa pusing",              category:"Kesehatan",   icon:<HelpCircle size={17}/>, bg:"ic-n" },
  { id:"6",  phrase:"Di mana toilet?",                 category:"Fasilitas",   icon:<MapPin size={17}/>,     bg:"ic-s" },
  { id:"7",  phrase:"Saya mau pesan makanan",          category:"Restoran",    icon:<Utensils size={17}/>,   bg:"ic-p" },
  { id:"8",  phrase:"Satu kopi, tolong",               category:"Restoran",    icon:<Coffee size={17}/>,     bg:"ic-n" },
  { id:"9",  phrase:"Berapa harganya?",                category:"Transaksi",   icon:<DollarSign size={17}/>, bg:"ic-n" },
  { id:"10", phrase:"Saya mau beli ini",               category:"Transaksi",   icon:<ShoppingBag size={17}/>,bg:"ic-s" },
  { id:"11", phrase:"Hubungi keluarga saya",           category:"Darurat",     icon:<Phone size={17}/>,      bg:"ic-p" },
  { id:"12", phrase:"Tunggu sebentar",                 category:"Umum",        icon:<Clock size={17}/>,      bg:"ic-s" },
];

const CATS = ["Semua","Sapaan","Darurat","Medis","Restoran","Belanja"];

export default function QuickPhrasesPage() {
  const router = useRouter();
  const [active, setActive] = useState("Semua");

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-[18px] pt-[18px] pb-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="absolute w-[100px] h-[100px] rounded-full bg-[#F4A07A] opacity-10 -top-8 -right-5" />
        <div className="flex items-center gap-3 mt-8 mb-3">
          <button onClick={() => router.back()} className="text-white/60">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 relative z-10">
            <h1 className="text-lg font-semibold text-white" style={{ letterSpacing: "-0.2px" }}>Kalimat cepat</h1>
            <p className="text-xs text-white/40">Tap untuk langsung menggunakan</p>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 px-3.5 py-3 overflow-x-auto no-scrollbar">
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-[11px] font-medium ${
              active === c ? "bg-[#1B1F3B] text-white" : "bg-white text-[#6B7194] border border-[#E0DEDB]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-24">
        <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">Sering dipakai</div>

        {/* Featured emergency card */}
        <div className="bg-[#1B1F3B] rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 relative overflow-hidden">
          <div className="absolute w-20 h-20 rounded-full bg-[#F4A07A] opacity-[0.12] -right-5 -bottom-5" />
          <div className="w-[42px] h-[42px] bg-white/10 rounded-xl flex items-center justify-center text-white flex-shrink-0 relative z-10">
            <AlertTriangle size={19} />
          </div>
          <div className="flex-1 relative z-10">
            <div className="text-[13px] font-semibold text-white mb-0.5">Tolong bantu saya!</div>
            <div className="text-[11px] text-white/40">Darurat · tampil di layar</div>
          </div>
          <button
            onClick={() => router.push("/emergency")}
            className="bg-[#F4A07A] text-[#4A2000] px-3 py-1.5 rounded-[9px] text-[11px] font-semibold flex-shrink-0 relative z-10"
          >
            Gunakan
          </button>
        </div>

        {/* Phrase list */}
        {PHRASES.map(p => (
          <div key={p.id} className="bg-white border border-[#E8E6E0] rounded-[14px] p-[13px] flex items-center gap-3 mb-1.5">
            <div className={`w-[38px] h-[38px] rounded-[11px] ${BG[p.bg]} flex items-center justify-center flex-shrink-0`}>
              {p.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#1B1F3B] mb-0.5">{p.phrase}</div>
              <div className="text-[11px] text-[#6B7194]">{p.category}</div>
            </div>
            <button className="bg-[#1B1F3B] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Pakai</button>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
