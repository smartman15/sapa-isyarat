"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Flame, Gift, BookOpen, MessageCircle, Check, Share2 } from "lucide-react";

/* Stub notification — replace with real data fetch using useParams in production */
const STUB = {
  id: "1",
  type: "achievement",
  title: "Pencapaian Terbuka!",
  message: "Selamat! Kamu telah berhasil membuka pencapaian 'Dedikasi 7 Hari'. Kamu telah belajar selama 7 hari berturut-turut. Pertahankan semangat belajarmu!",
  timestamp: new Date("2026-05-20T08:00:00"),
  color: "from-[#F4A07A] to-[#E89566]",
  details: {
    achievement: "Dedikasi 7 Hari",
    reward: "+50 XP",
    action: "Lanjutkan streak belajar",
  },
};

function getIcon(type: string) {
  switch (type) {
    case "achievement": return <Trophy size={48}/>;
    case "reminder":    return <Flame size={48}/>;
    case "reward":      return <Gift size={48}/>;
    case "update":      return <BookOpen size={48}/>;
    case "message":     return <MessageCircle size={48}/>;
    default:            return <Check size={48}/>;
  }
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs font-medium text-[#6B7194]">{label}</span>
      <span className="text-sm font-semibold text-[#1B1F3B]">{value}</span>
    </div>
  );
}

export default function NotificationDetailPage() {
  const router = useRouter();
  const n = STUB;   // replace with useParams + data fetch in production

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${n.color} px-5 pt-5 pb-8 relative overflow-hidden flex-shrink-0`}>
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"/>

        <div className="flex items-center gap-3 mt-8 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <h1 className="text-xl font-bold text-white">Detail Notifikasi</h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Pull-up icon card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 -mt-12 relative z-10 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className={`w-24 h-24 bg-gradient-to-br ${n.color} rounded-3xl flex items-center justify-center text-white mb-4 shadow-xl`}>
              {getIcon(n.type)}
            </div>
            <h2 className="text-2xl font-bold text-[#1B1F3B] mb-2">{n.title}</h2>
            <p className="text-sm text-[#6B7194]">
              {n.timestamp.toLocaleDateString("id-ID", {
                day:"numeric", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E6E0] mb-4">
          <h3 className="text-sm font-semibold text-[#1B1F3B] mb-2">Pesan</h3>
          <p className="text-sm text-[#6B7194] leading-relaxed">{n.message}</p>
        </div>

        {/* Details */}
        {n.details && (
          <div className="bg-gradient-to-br from-[#EEF0F6] to-[#FDEEE6] rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-semibold text-[#1B1F3B] mb-3">Detail</h3>
            <div className="space-y-1 divide-y divide-white/60">
              {n.details.achievement && <DetailRow label="Pencapaian" value={n.details.achievement}/>}
              {n.details.reward      && <DetailRow label="Hadiah"     value={n.details.reward}/>}
              {n.details.action      && <DetailRow label="Aksi"       value={n.details.action}/>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full bg-[#1B1F3B] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Check size={20}/>Tandai Selesai
          </button>
          <button className="w-full bg-white border border-[#E8E6E0] text-[#6B7194] py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Share2 size={18}/>Bagikan
          </button>
        </div>
      </div>
    </div>
  );
}
