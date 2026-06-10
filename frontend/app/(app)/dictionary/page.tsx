"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, HandMetal, Heart, Volume2, HelpCircle, User, Building2, ThumbsUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type Category = "semua" | "sapaan" | "darurat" | "kesehatan";

const WORDS = [
  { id: "1", word: "Halo",         category: "Sapaan",    icon: <HandMetal size={24} />, iconBg: "bg-[#EEF0F6] text-[#1B1F3B]" },
  { id: "2", word: "Terima kasih", category: "Sapaan",    icon: <Heart size={24} />,     iconBg: "bg-[#FDEEE6] text-[#7A3010]" },
  { id: "3", word: "Tolong saya",  category: "Darurat",   icon: <HelpCircle size={24} />,iconBg: "bg-[#FDEAEA] text-[#8B1A1A]" },
  { id: "4", word: "Dokter",       category: "Kesehatan", icon: <User size={24} />,      iconBg: "bg-[#E8F5E9] text-[#2E7D32]" },
  { id: "5", word: "Rumah sakit",  category: "Kesehatan", icon: <Building2 size={24} />, iconBg: "bg-[#E8F5E9] text-[#2E7D32]" },
  { id: "6", word: "Maaf",         category: "Sapaan",    icon: <ThumbsUp size={24} />,  iconBg: "bg-[#F4F0E8] text-[#5C4A2A]" },
] as const;

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-[11px] font-medium ${
        active ? "bg-[#1B1F3B] text-white" : "bg-white text-[#6B7194] border border-[#E0DEDB]"
      }`}
    >
      {label}
    </button>
  );
}

function WordCard({ word, onClick }: { word: (typeof WORDS)[number]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden text-left">
      <div className={`h-[70px] flex items-center justify-center ${word.iconBg}`}>
        {word.icon}
      </div>
      <div className="p-2.5">
        <div className="text-[13px] font-semibold text-[#1B1F3B] mb-0.5">{word.word}</div>
        <div className="text-[10px] text-[#6B7194]">{word.category}</div>
        <div className="inline-flex items-center gap-1 bg-[#EEF0F6] text-[#1B1F3B] px-1.5 py-0.5 rounded-full text-[9px] font-semibold mt-1">
          <Volume2 size={8} />Audio
        </div>
      </div>
    </button>
  );
}

function WordListItem({ word, onClick }: { word: (typeof WORDS)[number]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full bg-white border border-[#E8E6E0] rounded-[13px] p-[11px] flex items-center gap-[11px] mb-1.5">
      <div className={`w-[38px] h-[38px] rounded-[11px] ${word.iconBg} flex items-center justify-center flex-shrink-0`}>
        {word.icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-[13px] font-medium text-[#1B1F3B]">{word.word}</div>
        <div className="text-[11px] text-[#6B7194]">{word.category} · SIBI</div>
      </div>
      <div className="text-sm text-[#C8C5BE]">→</div>
    </button>
  );
}

export default function DictionaryPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const cats: { id: Category; label: string }[] = [
    { id: "semua",     label: "Semua"     },
    { id: "sapaan",    label: "Sapaan"    },
    { id: "darurat",   label: "Darurat"   },
    { id: "kesehatan", label: "Kesehatan" },
  ];

  const isSearching = searchQuery.trim().length > 0;

  // Apply both the category chip and search query as filters
  const filtered = WORDS.filter(w => {
    const matchesCategory = activeCategory === "semua" || w.category.toLowerCase() === activeCategory;
    const matchesSearch   = w.word.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-[18px] pt-[18px] pb-5 relative overflow-hidden">
        <div className="flex justify-between items-center absolute top-0 left-0 right-0 px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="absolute w-[100px] h-[100px] rounded-full bg-[#E8C9A0] opacity-10 -top-8 -right-5" />
        <h1 className="text-lg font-semibold text-white mb-3 relative z-10 mt-8" style={{ letterSpacing: "-0.2px" }}>
          Kamus Isyarat
        </h1>

        {/* Live search input */}
        <div className="relative z-10 flex items-center bg-white/10 rounded-xl px-3.5 py-2.5 gap-2">
          <Search size={16} className="text-white/40 flex-shrink-0" />
          <input
            id="dictionary-search"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari kata dalam SIBI..."
            className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none"
          />
          {isSearching && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
              aria-label="Hapus pencarian"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 px-3.5 py-3 overflow-x-auto no-scrollbar">
        {cats.map(c => (
          <CategoryChip key={c.id} label={c.label} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)} />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-24">

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 rounded-full bg-[#EEF0F6] flex items-center justify-center">
              <Search size={22} className="text-[#6B7194]" />
            </div>
            <p className="text-[13px] text-[#6B7194] text-center">
              Tidak ada kata yang cocok dengan<br />
              <span className="font-semibold text-[#1B1F3B]">&quot;{searchQuery}&quot;</span>
            </p>
          </div>
        )}

        {/* Search results — flat list, no Populer/Semua kata split */}
        {isSearching && filtered.length > 0 && (
          <>
            <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">
              {filtered.length} hasil ditemukan
            </div>
            {filtered.map(word => (
              <WordListItem key={word.id} word={word} onClick={() => router.push(`/dictionary/sapaan/${word.id}`)} />
            ))}
          </>
        )}

        {/* Default browsing layout (no active search) */}
        {!isSearching && filtered.length > 0 && (
          <>
            <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">Populer</div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {filtered.slice(0, 2).map(word => (
                <WordCard key={word.id} word={word} onClick={() => router.push(`/dictionary/sapaan/${word.id}`)} />
              ))}
            </div>
            <div className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2">Semua kata</div>
            {filtered.slice(2).map(word => (
              <WordListItem key={word.id} word={word} onClick={() => router.push(`/dictionary/sapaan/${word.id}`)} />
            ))}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
