"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, CheckCheck, Trash2, Trophy, Flame, Star, BookOpen, MessageCircle, Gift } from "lucide-react";

type NotifType = "achievement"|"reminder"|"update"|"social"|"reward";
interface Notif { id:string; type:NotifType; title:string; message:string; timestamp:Date; read:boolean; icon:React.ReactNode; color:string; }

const INIT: Notif[] = [
  { id:"1", type:"achievement", title:"Pencapaian Baru!",      message:'Selamat! Anda telah membuka pencapaian "Dedikasi 7 Hari" 🎉', timestamp:new Date("2026-05-15T10:30:00"), read:false, icon:<Trophy size={20}/>,       color:"from-[#FFD700] to-[#FFA500]" },
  { id:"2", type:"reminder",    title:"Jaga Streakmu!",         message:"Streak 12 hari! Jangan lupa berlatih hari ini untuk melanjutkan",  timestamp:new Date("2026-05-15T09:00:00"), read:false, icon:<Flame size={20}/>,        color:"from-[#FF6B35] to-[#F44336]" },
  { id:"3", type:"reward",      title:"Hadiah Tersedia!",       message:"Klaim 50 XP bonus untuk penyelesaian target mingguanmu",           timestamp:new Date("2026-05-14T16:20:00"), read:true,  icon:<Gift size={20}/>,         color:"from-[#F4A07A] to-[#E89566]" },
  { id:"4", type:"update",      title:"10 Kata Baru Ditambahkan",message:"Kamus BISINDO diperbarui dengan kosakata kesehatan",               timestamp:new Date("2026-05-14T10:00:00"), read:true,  icon:<BookOpen size={20}/>,     color:"from-[#1B1F3B] to-[#2D335E]" },
  { id:"5", type:"social",      title:"Komunitas Baru!",        message:"Bergabunglah dengan komunitas pelajar BISINDO di aplikasi",         timestamp:new Date("2026-05-13T14:00:00"), read:true,  icon:<MessageCircle size={20}/>,color:"from-[#4CAF50] to-[#69B578]" },
];

const fmtT = (d:Date)=>{
  const m=Math.floor((Date.now()-d.getTime())/60000),h=Math.floor(m/60),days=Math.floor(h/24);
  if(m<60)return`${m} menit lalu`; if(h<24)return`${h} jam lalu`; return`${days} hari lalu`;
};

export default function NotificationsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Notif[]>(INIT);
  const [filter, setFilter] = useState<"all"|"unread">("all");

  const unread = items.filter(n=>!n.read).length;
  const shown  = filter==="unread" ? items.filter(n=>!n.read) : items;

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] via-[#5B9FE3] to-[#6CAEE4] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3"><span className="text-xs font-semibold text-white/80">9:41</span></div>
        <div className="absolute -top-4 -right-4 w-32 h-32 opacity-10"><Bell size={128} className="text-white"/></div>

        <div className="flex items-center justify-between mt-8 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
            <div>
              <h1 className="text-2xl font-bold text-white mb-0.5" style={{letterSpacing:"-0.5px"}}>Notifikasi</h1>
              <p className="text-sm text-white/70">{unread} belum dibaca</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 relative z-10">
          {(["all","unread"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${filter===f?"bg-white text-[#4A90E2]":"bg-white/20 text-white backdrop-blur-sm"}`}>
              {f==="all"?`Semua (${items.length})`:`Belum Dibaca (${unread})`}
            </button>
          ))}
          <button onClick={()=>setItems(items.map(n=>({...n,read:true})))}
            className="px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2 text-white text-sm font-medium">
            <CheckCheck size={18}/>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {shown.length===0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-24 h-24 bg-[#EEF0F6] rounded-full flex items-center justify-center mb-4"><Bell size={40} className="text-[#6B7194]"/></div>
            <h3 className="text-lg font-semibold text-[#1B1F3B] mb-2">{filter==="unread"?"Semua Terbaca!":"Belum Ada Notifikasi"}</h3>
            <p className="text-sm text-[#6B7194] max-w-xs">{filter==="unread"?"Kamu sudah membaca semua notifikasi":"Notifikasi akan muncul di sini"}</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {shown.map(n=>(
              <div key={n.id} className={`rounded-2xl overflow-hidden shadow-sm border transition-all ${
                n.read?"bg-white border-[#E8E6E0]":"bg-gradient-to-br from-white to-[#F0F8FF] border-[#4A90E2]/30 ring-2 ring-[#4A90E2]/20"
              }`}>
                <button
                  onClick={() => router.push(`/notifications/${n.id}`)}
                  className="w-full flex items-start gap-3 p-4 text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${n.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md`}>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-[#1B1F3B] text-sm">{n.title}</h4>
                      {!n.read&&<div className="w-2 h-2 bg-[#4A90E2] rounded-full flex-shrink-0 mt-1.5"/>}
                    </div>
                    <p className="text-xs text-[#6B7194] leading-relaxed mb-2">{n.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#9B9890]">{fmtT(n.timestamp)}</span>
                      <button
                        onClick={(e)=>{e.stopPropagation();setItems(items.filter(i=>i.id!==n.id))}}
                        className="text-[#F44336] p-1.5 rounded-lg"
                      >
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                </button>
                {(n.type==="reward"||n.type==="achievement")&&!n.read&&(
                  <div className="bg-[#EEF0F6] px-4 py-2.5 border-t border-[#E8E6E0]">
                    <button
                      onClick={() => router.push(`/notifications/${n.id}`)}
                      className={`w-full py-2.5 bg-gradient-to-r ${n.color} text-white rounded-xl font-semibold text-sm shadow-md`}
                    >
                      {n.type==="reward"?"Klaim Hadiah":"Lihat Detail"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
