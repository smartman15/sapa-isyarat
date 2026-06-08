"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Flame, Target, Award, Star,
  TrendingUp, Sprout, BookOpen, MessageCircle, Clock, Check,
} from "lucide-react";

type Achievement = {
  id: string; title: string; description: string;
  icon: React.ReactNode; unlocked: boolean; progress?: number; total?: number;
};

const ACHIEVEMENTS: Achievement[] = [
  { id:"1", title:"Pemula",            description:"Pelajari 10 kata pertama",          icon:<Sprout size={24} className="text-[#69B578]"/>,                          unlocked:true  },
  { id:"2", title:"Dedikasi 7 Hari",   description:"Belajar 7 hari berturut-turut",     icon:<Flame size={24} fill="#FF6B35" className="text-[#FF6B35]"/>,             unlocked:true  },
  { id:"3", title:"Kolektor Kata",     description:"Kumpulkan 50 kata",                 icon:<BookOpen size={24} className="text-[#1B1F3B]"/>,                         unlocked:false, progress:48, total:50  },
  { id:"4", title:"Master Percakapan", description:"20 percakapan selesai",             icon:<MessageCircle size={24} className="text-[#F4A07A]"/>,                    unlocked:false, progress:12, total:20  },
  { id:"5", title:"Rajin Berlatih",    description:"Latihan 30 hari",                   icon:<Target size={24} className="text-[#2196F3]"/>,                           unlocked:false, progress:12, total:30  },
  { id:"6", title:"Ahli SIBI",       description:"100 kata dikuasai",                 icon:<Trophy size={24} className="text-[#FFC107]"/>,                           unlocked:false, progress:48, total:100 },
];

const DAYS = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];

/* ── sub-components ── */
function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${active ? "text-[#F4A07A]" : "text-[#6B7194]"}`}>
      {label}
      {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4A07A]"/>}
    </button>
  );
}

function StatCard({ icon, value, label, bg }: { icon: React.ReactNode; value: number|string; label: string; bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4`}>
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-[#1B1F3B] mb-0.5">{value}</div>
      <div className="text-xs text-[#6B7194]">{label}</div>
    </div>
  );
}

function DayDot({ day, active, completed }: { day: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
        completed ? "bg-gradient-to-br from-[#69B578] to-[#4CAF50] text-white shadow-md"
        : active   ? "bg-[#F4A07A] text-white"
        :            "bg-[#EEF0F6] text-[#C8C5BE]"
      }`}>
        {completed ? <Check size={16}/> : null}
      </div>
      <span className={`text-[10px] ${active ? "text-[#1B1F3B] font-medium" : "text-[#C8C5BE]"}`}>{day}</span>
    </div>
  );
}

function QuickStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#E8E6E0]">
      <div className="mb-1 flex justify-center">{icon}</div>
      <div className="text-sm font-bold text-[#1B1F3B]">{value}</div>
      <div className="text-[9px] text-[#6B7194]">{label}</div>
    </div>
  );
}

function AchievementCard({ a, onClick }: { a: Achievement; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl p-4 flex items-start gap-3 transition-all text-left ${
        a.unlocked ? "bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] border-2 border-[#F4A07A] shadow-md"
                   : "bg-white border border-[#E8E6E0]"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${a.unlocked ? "bg-white shadow-sm" : "bg-[#EEF0F6] grayscale opacity-60"}`}>
        {a.icon}
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold mb-1 ${a.unlocked ? "text-[#1B1F3B]" : "text-[#6B7194]"}`}>{a.title}</h4>
        <p className="text-xs text-[#6B7194] mb-2">{a.description}</p>
        {!a.unlocked && a.progress !== undefined && a.total !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#1B1F3B]">{a.progress}/{a.total}</span>
              <span className="text-xs text-[#6B7194]">{Math.round((a.progress/a.total)*100)}%</span>
            </div>
            <div className="h-2 bg-[#EEF0F6] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#F4A07A] to-[#E89566] rounded-full" style={{width:`${(a.progress/a.total)*100}%`}}/>
            </div>
          </div>
        )}
        {a.unlocked && (
          <div className="inline-flex items-center gap-1 bg-[#69B578] text-white px-2 py-1 rounded-full text-[10px] font-semibold">
            <Award size={10}/>Terbuka
          </div>
        )}
      </div>
    </button>
  );
}

/* ── tab views ── */
function OverviewTab({ onNavigate }: { onNavigate: (path: string) => void }) {
  const streak=12, wordsLearned=48, totalWords=100, weeklyGoal=10, weeklyProgress=7;
  return (
    <div className="space-y-4">
      {/* Streak card */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#F44336] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10"><Flame size={120}/></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2"><Flame size={24}/><span className="text-sm font-medium">Streak Belajar</span></div>
          <div className="text-5xl font-bold mb-2">{streak}</div>
          <p className="text-white/80 text-sm">Hari berturut-turut! Jaga streakmu!</p>
        </div>
      </div>

      {/* Stats 2-col */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Star className="text-[#F4A07A]" size={20}/>} value={wordsLearned}                        label="Kata dipelajari"  bg="bg-[#FDEEE6]"/>
        <StatCard icon={<Target className="text-[#1B1F3B]" size={20}/>} value={`${weeklyProgress}/${weeklyGoal}`} label="Target mingguan" bg="bg-[#EEF0F6]"/>
      </div>

      {/* Vocabulary progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E6E0]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#1B1F3B]">Progress Kosakata</h3>
          <span className="text-sm font-bold text-[#F4A07A]">{Math.round((wordsLearned/totalWords)*100)}%</span>
        </div>
        <div className="relative h-4 bg-[#EEF0F6] rounded-full overflow-hidden mb-2">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1B1F3B] to-[#2D335E] rounded-full" style={{width:`${(wordsLearned/totalWords)*100}%`}}/>
        </div>
        <p className="text-xs text-[#6B7194]">{wordsLearned} dari {totalWords} kata dikuasai</p>
      </div>

      {/* Weekly activity dots */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E6E0]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1B1F3B]">Aktivitas 7 Hari</h3>
          <button
            onClick={() => onNavigate("/weekly-stats")}
            className="text-xs text-[#F4A07A] font-semibold"
          >
            Lihat detail →
          </button>
        </div>
        <div className="flex justify-between gap-2">
          {DAYS.map((d,i) => <DayDot key={d} day={d} active={i<5} completed={i<4}/>)}
        </div>
      </div>

      {/* Quick stats 3-col */}
      <div className="grid grid-cols-3 gap-2">
        <QuickStat icon={<Clock size={20} className="text-[#F4A07A]"/>}    value="2.5 jam" label="Waktu belajar"/>
        <QuickStat icon={<Check size={20} className="text-[#69B578]"/>}    value="35"      label="Sesi selesai"/>
        <QuickStat icon={<TrendingUp size={20} className="text-[#2196F3]"/>} value="+12%"  label="Minggu ini"/>
      </div>

      {/* Practice button */}
      <button
        onClick={() => onNavigate("/practice")}
        className="w-full bg-[#1B1F3B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
      >
        <Target size={20}/>Mulai Latihan Sekarang
      </button>
    </div>
  );
}

function AchievementsTab({ onNavigate }: { onNavigate: (path: string) => void }) {
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked).length;
  return (
    <div>
      <div className="bg-gradient-to-r from-[#F4A07A] to-[#E89566] rounded-2xl p-4 mb-4 text-white">
        <div className="flex items-center gap-3">
          <Trophy size={32}/>
          <div>
            <div className="text-2xl font-bold">{unlocked}/{ACHIEVEMENTS.length}</div>
            <div className="text-sm text-white/80">Pencapaian terbuka</div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {ACHIEVEMENTS.map(a => (
          <AchievementCard
            key={a.id}
            a={a}
            onClick={() => onNavigate(`/achievements/${a.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── page ── */
export default function LearningProgressPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"overview"|"achievements">("overview");
  const xp=720, nextLevelXP=1000, level=3;

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F4A07A] to-[#E89566] px-5 pt-5 pb-8 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3"><span className="text-xs font-semibold text-white/80">9:41</span></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"/>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"/>

        <div className="flex items-center gap-3 mt-8 mb-6 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-0.5" style={{letterSpacing:"-0.5px"}}>Progress Belajar</h1>
            <p className="text-sm text-white/70">Terus tingkatkan kemampuanmu!</p>
          </div>
        </div>

        {/* Level card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F4A07A] to-[#E89566] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">L{level}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B1F3B]">Level {level}</h3>
                <p className="text-xs text-[#6B7194]">Pelajar Antusias</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#6B7194] mb-0.5">XP</div>
              <div className="text-lg font-bold text-[#F4A07A]">{xp}/{nextLevelXP}</div>
            </div>
          </div>
          <div className="relative h-3 bg-[#EEF0F6] rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F4A07A] to-[#E89566] rounded-full transition-all duration-500" style={{width:`${(xp/nextLevelXP)*100}%`}}/>
          </div>
          <p className="text-xs text-[#6B7194] mt-2 text-center">{nextLevelXP-xp} XP lagi ke Level {level+1}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E8E6E0] px-4 flex gap-2 flex-shrink-0">
        <TabBtn label="Ringkasan"  active={tab==="overview"}      onClick={() => setTab("overview")}/>
        <TabBtn label="Pencapaian" active={tab==="achievements"}  onClick={() => setTab("achievements")}/>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-8">
        {tab === "overview"
          ? <OverviewTab onNavigate={(p) => router.push(p)}/>
          : <AchievementsTab onNavigate={(p) => router.push(p)}/>
        }
      </div>
    </div>
  );
}
