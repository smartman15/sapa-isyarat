"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Mic, MessageSquare, Calendar, Filter, Trash2, Share2, Clock } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type HistType = "sign"|"speech"|"conversation";
interface HistItem { id:string; type:HistType; title:string; content:string; timestamp:Date; duration?:string; words?:number; }

const DATA: HistItem[] = [
  { id:"1", type:"conversation", title:"Percakapan di Rumah Sakit", content:"Konsultasi dengan dokter spesialis mata tentang kondisi penglihatan...", timestamp:new Date("2026-05-15T10:30:00"), duration:"12 menit", words:245 },
  { id:"2", type:"sign",         title:"Terjemahan Bahasa Isyarat", content:"Halo, apa kabar? Saya ingin bertanya tentang jadwal pemeriksaan...",  timestamp:new Date("2026-05-14T15:20:00"), duration:"3 menit",  words:48  },
  { id:"3", type:"speech",       title:"Rekaman Suara ke Teks",     content:"Selamat pagi, saya ingin membuat janji temu untuk minggu depan...",  timestamp:new Date("2026-05-14T09:15:00"), duration:"2 menit",  words:67  },
  { id:"4", type:"conversation", title:"Percakapan di Bank",         content:"Pembukaan rekening tabungan baru dan informasi produk...",            timestamp:new Date("2026-05-13T14:00:00"), duration:"8 menit",  words:180 },
  { id:"5", type:"sign",         title:"Latihan Kosakata",           content:"Terima kasih banyak atas bantuannya hari ini...",                    timestamp:new Date("2026-05-13T11:30:00"), duration:"1 menit",  words:12  },
];

const TYPE_CFG: Record<HistType,{bg:string;icon:React.ReactNode;color:string;label:string}> = {
  sign:         { bg:"bg-[#FDEEE6]", icon:<Camera size={18}/>,      color:"text-[#7A3010]", label:"Bahasa Isyarat" },
  speech:       { bg:"bg-[#EEF0F6]", icon:<Mic size={18}/>,         color:"text-[#1B1F3B]", label:"Suara ke Teks"  },
  conversation: { bg:"bg-[#F4F0E8]", icon:<MessageSquare size={18}/>,color:"text-[#5C4A2A]", label:"Percakapan"    },
};

const fmtDate = (d:Date) => {
  const days = Math.floor((Date.now()-d.getTime())/86400000);
  if(days===0)return"Hari ini"; if(days===1)return"Kemarin"; if(days<7)return`${days} hari lalu`;
  return d.toLocaleDateString("id-ID",{day:"numeric",month:"long"});
};
const fmtTime = (d:Date) => d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});

export default function HistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all"|HistType>("all");

  const filtered = filter==="all" ? DATA : DATA.filter(i=>i.type===filter);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B1F3B] to-[#2D335E] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3"><span className="text-xs font-semibold text-white/50">9:41</span></div>
        <div className="absolute w-[120px] h-[120px] rounded-full bg-[#F4A07A] opacity-10 -top-12 -right-8"/>
        <div className="absolute w-[80px] h-[80px] rounded-full bg-[#E8C9A0] opacity-10 -bottom-4 left-8"/>
        <div className="mt-8 mb-4 relative z-10">
          <h1 className="text-2xl font-bold text-white mb-1" style={{letterSpacing:"-0.5px"}}>Riwayat Aktivitas</h1>
          <p className="text-sm text-white/60">{filtered.length} percakapan tercatat</p>
        </div>
        <div className="grid grid-cols-3 gap-2 relative z-10">
          {[{icon:<MessageSquare size={16}/>,v:"12",l:"Percakapan"},{icon:<Camera size={16}/>,v:"8",l:"Isyarat"},{icon:<Mic size={16}/>,v:"15",l:"Suara"}].map(s=>(
            <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <div className="text-white/80 mb-1.5 flex justify-center">{s.icon}</div>
              <div className="text-xl font-bold text-white mb-0.5">{s.v}</div>
              <div className="text-[9px] text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-4 py-3 bg-white border-b border-[#E8E6E0]">
        <div className="flex items-center gap-2 mb-2">
          <Filter size={16} className="text-[#6B7194]"/>
          <span className="text-xs font-semibold text-[#6B7194] uppercase tracking-wider">Filter</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {([["all","Semua"],[" sign","Bahasa Isyarat","sign"],["speech","Suara","speech"],["conversation","Percakapan","conversation"]] as [string,string,string?][]).map(([val,label])=>(
            <button key={val} onClick={()=>setFilter(val as typeof filter)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all ${filter===val?"bg-[#1B1F3B] text-white shadow-md":"bg-[#EEF0F6] text-[#6B7194]"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {filtered.length===0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-[#EEF0F6] rounded-full flex items-center justify-center mb-4"><Clock size={40} className="text-[#6B7194]"/></div>
            <h3 className="text-lg font-semibold text-[#1B1F3B] mb-2">Belum Ada Riwayat</h3>
            <p className="text-sm text-[#6B7194] max-w-xs">Percakapan dan terjemahan Anda akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item,i)=>{
              const c=TYPE_CFG[item.type];
              return (
                <div key={item.id} className={i===0?"ring-2 ring-[#F4A07A] ring-opacity-50 rounded-2xl":""}>
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E8E6E0] overflow-hidden">
                    <div className="flex items-start gap-3 p-4">
                      <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.color} flex-shrink-0`}>{c.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#1B1F3B] text-sm truncate">{item.title}</h3>
                          {i===0&&<span className="bg-[#F4A07A] text-white text-[9px] px-1.5 py-0.5 rounded-full font-semibold">Terbaru</span>}
                        </div>
                        <p className="text-xs text-[#6B7194] line-clamp-2 mb-2">{item.content}</p>
                        <div className="flex items-center gap-3 text-[10px] text-[#9B9890]">
                          <span className="flex items-center gap-1"><Calendar size={10}/>{fmtDate(item.timestamp)}</span>
                          <span>•</span><span>{fmtTime(item.timestamp)}</span>
                          {item.duration&&<><span>•</span><span>{item.duration}</span></>}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FAF9F6] px-4 py-2.5 flex items-center justify-between border-t border-[#E8E6E0]">
                      <div className="flex items-center gap-4 text-[11px]">
                        <span className="text-[#6B7194]">{item.words} kata</span>
                        <span className="px-2 py-0.5 bg-white rounded-full text-[#1B1F3B] font-medium border border-[#E8E6E0]">{c.label}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-[#6B7194] border border-[#E8E6E0]"><Share2 size={14}/></button>
                        <button className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-[#6B7194] border border-[#E8E6E0]"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav/>
    </div>
  );
}
