"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Star, Target, Share2, Lock } from "lucide-react";

/* Stub — replace with real fetch using useParams in production */
const STUB = {
  id: "3",
  title: "Kolektor Kata",
  description: "Kumpulkan 50 kata SIBI dalam kamus favoritmu.",
  icon: "📖",
  unlocked: false,
  unlockedDate: undefined as Date | undefined,
  progress: 48,
  total: 50,
  reward: "+100 XP & Lencana Emas",
  category: "Kamus",
};

export default function AchievementDetailPage() {
  const router = useRouter();
  const a = STUB;

  const pct = a.progress !== undefined && a.total
    ? (a.progress / a.total) * 100
    : 0;

  const headerGrad = a.unlocked
    ? "from-[#F4A07A] to-[#E89566]"
    : "from-[#6B7194] to-[#494E6B]";

  const cardStyle = a.unlocked
    ? "bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] border-2 border-[#F4A07A]"
    : "bg-white border border-[#E8E6E0]";

  const iconStyle = a.unlocked
    ? "bg-white shadow-xl"
    : "bg-[#EEF0F6] grayscale opacity-60";

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className={`bg-gradient-to-br ${headerGrad} px-5 pt-5 pb-20 relative overflow-hidden flex-shrink-0`}>
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"/>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"/>

        <div className="flex items-center gap-3 mt-8 mb-6 relative z-10">
          <button onClick={() => router.back()} className="text-white/90">
            <ArrowLeft size={22}/>
          </button>
          <div className="flex-1">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
              <span className="text-xs text-white font-medium">{a.category}</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Pencapaian</h1>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Achievement card — pull-up */}
        <div className="px-5 -mt-16 mb-6 relative z-10">
          <div className={`${cardStyle} rounded-3xl p-6 shadow-2xl`}>
            <div className="flex flex-col items-center text-center mb-6">
              {/* Icon */}
              <div className={`w-32 h-32 rounded-3xl flex items-center justify-center mb-4 ${iconStyle}`}>
                {a.unlocked
                  ? <span className="text-5xl">{a.icon}</span>
                  : <Lock size={48} className="text-[#6B7194]"/>
                }
              </div>

              <h2 className="text-2xl font-bold text-[#1B1F3B] mb-2">{a.title}</h2>
              <p className="text-sm text-[#6B7194] mb-4">{a.description}</p>

              {/* Status badge */}
              {a.unlocked ? (
                <div className="inline-flex items-center gap-2 bg-[#69B578] text-white px-4 py-2 rounded-full font-semibold">
                  <Trophy size={18}/>Terbuka
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#E8E6E0] text-[#6B7194] px-4 py-2 rounded-full font-semibold">
                  <Lock size={18}/>Terkunci
                </div>
              )}
            </div>

            {/* Progress bar (locked only) */}
            {!a.unlocked && a.progress !== undefined && a.total !== undefined && (
              <div className="pt-6 border-t border-[#E8E6E0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#6B7194]">Progress</span>
                  <span className="text-lg font-bold text-[#1B1F3B]">{a.progress}/{a.total}</span>
                </div>
                <div className="h-3 bg-[#EEF0F6] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#F4A07A] to-[#E89566] rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-[#6B7194] text-center">{a.total - a.progress} lagi untuk membuka</p>
              </div>
            )}

            {/* Unlocked date */}
            {a.unlocked && a.unlockedDate && (
              <div className="pt-6 border-t border-[#F4A07A]/20 text-center">
                <p className="text-xs text-[#6B7194] mb-1">Dibuka pada</p>
                <p className="text-sm font-semibold text-[#1B1F3B]">
                  {a.unlockedDate.toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reward banner */}
        <div className="px-5 mb-6">
          <div className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3">
              <Star size={32} fill="white"/>
              <div>
                <p className="text-sm text-white/80 mb-1">Hadiah</p>
                <p className="text-xl font-bold">{a.reward}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips (locked only) */}
        {!a.unlocked && (
          <div className="px-5 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-[#E8E6E0]">
              <h3 className="text-sm font-semibold text-[#1B1F3B] mb-2 flex items-center gap-2">
                <Target size={18} className="text-[#F4A07A]"/>Tips untuk Membuka
              </h3>
              <ul className="text-xs text-[#6B7194] space-y-1">
                <li>• Gunakan fitur secara konsisten setiap hari</li>
                <li>• Jaga streak belajar Anda</li>
                <li>• Selesaikan latihan dengan akurasi tinggi</li>
              </ul>
            </div>
          </div>
        )}

        {/* Share action (unlocked only) */}
        {a.unlocked && (
          <div className="px-5 pb-6">
            <button className="w-full bg-[#1B1F3B] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Share2 size={20}/>Bagikan Pencapaian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
