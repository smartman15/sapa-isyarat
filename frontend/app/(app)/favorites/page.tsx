"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Heart, Trash2, Play, Share2, FolderPlus,
  Grid, List, ThumbsUp, HelpCircle, HandMetal, User, Frown,
} from "lucide-react";

type FavItem = { id: string; word: string; category: string; emoji: React.ReactNode; dateAdded: Date; practiced: number; };

const FAVORITES: FavItem[] = [
  { id:"1", word:"Terima kasih", category:"Sapaan",    emoji:<ThumbsUp size={20}/>,   dateAdded:new Date("2026-05-10"), practiced:12 },
  { id:"2", word:"Tolong",       category:"Darurat",   emoji:<HelpCircle size={20}/>, dateAdded:new Date("2026-05-12"), practiced:8  },
  { id:"3", word:"Halo",         category:"Sapaan",    emoji:<HandMetal size={20}/>,  dateAdded:new Date("2026-05-13"), practiced:15 },
  { id:"4", word:"Dokter",       category:"Kesehatan", emoji:<User size={20}/>,       dateAdded:new Date("2026-05-14"), practiced:5  },
  { id:"5", word:"Maaf",         category:"Sapaan",    emoji:<Frown size={20}/>,      dateAdded:new Date("2026-05-15"), practiced:10 },
];

function QuickStat({ value, label }: { value: number|string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center">
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[9px] text-white/70">{label}</div>
    </div>
  );
}

function SortBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active ? "bg-[#F4A07A] text-white" : "bg-[#EEF0F6] text-[#6B7194]"}`}>
      {label}
    </button>
  );
}

function ViewBtn({ icon, active, onClick }: { icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-[#F4A07A] text-white" : "bg-[#EEF0F6] text-[#6B7194]"}`}>
      {icon}
    </button>
  );
}

function GridCard({ item }: { item: FavItem }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8E6E0] overflow-hidden">
      <div className="relative">
        <div className="h-24 bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] flex items-center justify-center relative">
          <div className="text-[#7A3010]">{item.emoji}</div>
          <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
            <Heart size={16} className="text-[#FF6B6B] fill-[#FF6B6B]"/>
          </button>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-[#1B1F3B] text-sm mb-1">{item.word}</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[#6B7194]">{item.category}</span>
          <span className="text-[10px] text-[#F4A07A] font-medium">{item.practiced}x latihan</span>
        </div>
        <div className="flex gap-1">
          <button className="flex-1 bg-[#EEF0F6] text-[#1B1F3B] py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
            <Play size={12}/>Latih
          </button>
          <button className="w-9 h-9 bg-[#EEF0F6] text-[#6B7194] rounded-lg flex items-center justify-center">
            <Share2 size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function ListCard({ item }: { item: FavItem }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-[#E8E6E0]">
      <div className="w-14 h-14 bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] rounded-xl flex items-center justify-center text-[#7A3010] flex-shrink-0">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1B1F3B] text-sm mb-0.5">{item.word}</h4>
        <div className="flex items-center gap-2 text-[10px] text-[#6B7194]">
          <span>{item.category}</span>
          <span>•</span>
          <span className="text-[#F4A07A] font-medium">{item.practiced}x latihan</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="w-9 h-9 bg-[#F4A07A] text-white rounded-lg flex items-center justify-center"><Play size={16}/></button>
        <button className="w-9 h-9 bg-[#EEF0F6] text-[#6B7194] rounded-lg flex items-center justify-center"><Share2 size={16}/></button>
        <button className="w-9 h-9 bg-[#FDEAEA] text-[#F44336] rounded-lg flex items-center justify-center"><Trash2 size={16}/></button>
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid"|"list">("grid");
  const [sortBy,   setSortBy]   = useState<"recent"|"practiced">("recent");

  const sorted = [...FAVORITES].sort((a,b) =>
    sortBy === "recent" ? b.dateAdded.getTime() - a.dateAdded.getTime() : b.practiced - a.practiced
  );

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B6B] via-[#F4A07A] to-[#E89566] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-12 -right-12"/>
        <div className="absolute w-24 h-24 rounded-full bg-white/10 -bottom-8 -left-8"/>

        <div className="flex items-center justify-between mt-8 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
            <div>
              <h1 className="text-2xl font-bold text-white mb-0.5" style={{letterSpacing:"-0.5px"}}>Favorit Saya</h1>
              <p className="text-sm text-white/70">{FAVORITES.length} kata tersimpan</p>
            </div>
          </div>
          <button className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <FolderPlus size={20} className="text-white"/>
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 relative z-10">
          <QuickStat value={FAVORITES.length} label="Total"/>
          <QuickStat value="3" label="Kategori"/>
          <QuickStat value="50" label="Latihan"/>
        </div>
      </div>

      {/* Sort + view controls */}
      <div className="bg-white border-b border-[#E8E6E0] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <SortBtn label="Terbaru"       active={sortBy==="recent"}    onClick={() => setSortBy("recent")}/>
            <SortBtn label="Sering dilatih" active={sortBy==="practiced"} onClick={() => setSortBy("practiced")}/>
          </div>
          <div className="flex gap-1">
            <ViewBtn icon={<Grid size={18}/>} active={viewMode==="grid"} onClick={() => setViewMode("grid")}/>
            <ViewBtn icon={<List size={18}/>} active={viewMode==="list"} onClick={() => setViewMode("list")}/>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {sorted.map(item => <GridCard key={item.id} item={item}/>)}
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map(item => <ListCard key={item.id} item={item}/>)}
          </div>
        )}
      </div>
    </div>
  );
}
