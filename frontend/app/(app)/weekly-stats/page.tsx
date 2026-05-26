"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, TrendingUp, Award, Clock, Flame, Target } from "lucide-react";

const WEEK = [
  { day:"Sen", date:"13 Mei", active:true,  completed:true,  xp:120, minutes:25 },
  { day:"Sel", date:"14 Mei", active:true,  completed:true,  xp:95,  minutes:18 },
  { day:"Rab", date:"15 Mei", active:true,  completed:true,  xp:110, minutes:22 },
  { day:"Kam", date:"16 Mei", active:true,  completed:true,  xp:85,  minutes:15 },
  { day:"Jum", date:"17 Mei", active:true,  completed:false, xp:0,   minutes:0  },
  { day:"Sab", date:"18 Mei", active:false, completed:false, xp:0,   minutes:0  },
  { day:"Min", date:"19 Mei", active:false, completed:false, xp:0,   minutes:0  },
];

function SummaryCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className={`${color} rounded-2xl p-4 text-white shadow-lg`}>
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  );
}

function DayCard({ day, date, active, completed, xp, minutes }: typeof WEEK[0]) {
  return (
    <div className={`rounded-xl p-4 transition-all ${
      completed ? "bg-gradient-to-r from-[#69B578] to-[#4CAF50] text-white shadow-md"
      : active   ? "bg-white border-2 border-[#F4A07A]"
      :            "bg-white border border-[#E8E6E0] opacity-50"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
            completed ? "bg-white/20 text-white"
            : active   ? "bg-[#F4A07A]/10 text-[#F4A07A]"
            :            "bg-[#EEF0F6] text-[#C8C5BE]"
          }`}>
            {day}
          </div>
          <div>
            <div className={`text-sm font-semibold ${completed ? "text-white" : active ? "text-[#1B1F3B]" : "text-[#6B7194]"}`}>{date}</div>
            <div className={`text-xs ${completed ? "text-white/80" : active ? "text-[#6B7194]" : "text-[#C8C5BE]"}`}>
              {completed ? "Selesai" : active ? "Belum selesai" : "Belum dimulai"}
            </div>
          </div>
        </div>
        {completed && (
          <div className="text-right">
            <div className="text-lg font-bold text-white">{xp} XP</div>
            <div className="text-xs text-white/80">{minutes} menit</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WeeklyStatsPage() {
  const router = useRouter();
  const totalXP      = WEEK.reduce((s,d) => s + d.xp, 0);
  const totalMinutes = WEEK.reduce((s,d) => s + d.minutes, 0);
  const streak       = WEEK.filter(d => d.completed).length;

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2196F3] to-[#1976D2] px-5 pt-5 pb-8 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3"><span className="text-xs font-semibold text-white/80">9:41</span></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"/>

        <div className="flex items-center gap-3 mt-8 mb-3 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-white"/>
              <span className="text-sm text-white/80">Minggu Ini</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Aktivitas 7 Hari</h1>
          </div>
        </div>
      </div>

      {/* Summary cards — overlap header */}
      <div className="px-5 -mt-6 mb-6 relative z-10 flex-shrink-0">
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard icon={<Flame size={20} className="text-[#FF6B35]"/>} value={`${streak}`}       label="Hari Aktif" color="bg-gradient-to-br from-[#FF6B35] to-[#F44336]"/>
          <SummaryCard icon={<Award size={20} className="text-[#FFC107]"/>} value={`${totalXP}`}     label="Total XP"   color="bg-gradient-to-br from-[#FFC107] to-[#F57C00]"/>
          <SummaryCard icon={<Clock size={20} className="text-[#2196F3]"/>} value={`${totalMinutes}`} label="Menit"     color="bg-gradient-to-br from-[#2196F3] to-[#1976D2]"/>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <h3 className="text-sm font-semibold text-[#1B1F3B] mb-3">Rincian Harian</h3>
        <div className="space-y-2">
          {WEEK.map((d,i) => <DayCard key={i} {...d}/>)}
        </div>

        {/* Weekly goal */}
        <div className="mt-6 bg-gradient-to-br from-[#EEF0F6] to-[#FDEEE6] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#F4A07A] rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white"/>
            </div>
            <div>
              <h4 className="font-semibold text-[#1B1F3B]">Target Mingguan</h4>
              <p className="text-xs text-[#6B7194]">7 dari 10 sesi selesai</p>
            </div>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#F4A07A] to-[#E89566] rounded-full" style={{width:"70%"}}/>
          </div>
          <p className="text-xs text-[#6B7194] mt-2">3 sesi lagi untuk mencapai target minggu ini!</p>
        </div>

        {/* Insights */}
        <div className="mt-6 bg-white rounded-2xl p-5 border border-[#E8E6E0]">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#69B578]"/>
            <h4 className="font-semibold text-[#1B1F3B]">Insight Minggu Ini</h4>
          </div>
          <ul className="space-y-2 text-sm text-[#6B7194]">
            <li className="flex items-start gap-2"><span className="text-[#69B578]">•</span><span>Rata-rata belajar 20 menit per hari</span></li>
            <li className="flex items-start gap-2"><span className="text-[#F4A07A]">•</span><span>Hari paling produktif: Rabu (110 XP)</span></li>
            <li className="flex items-start gap-2"><span className="text-[#2196F3]">•</span><span>Tingkatkan 15% dari minggu lalu!</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
