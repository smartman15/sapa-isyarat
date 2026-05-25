"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, X, TrendingUp, Clock,
  Filter as FilterIcon, Play, BookOpen,
  ThumbsUp, HelpCircle, Smile, HandMetal, Lightbulb,
} from "lucide-react";

type ResultType = "word" | "phrase" | "category";
interface SearchResult {
  id: string; word: string; category: string;
  emoji: React.ReactNode; relevance: number; type: ResultType;
}

const TRENDING = ["Terima kasih","Tolong","Halo","Dokter","Rumah sakit"];
const RECENT   = ["Selamat pagi","Apa kabar","Saya butuh bantuan","Di mana toilet?"];
const RESULTS: SearchResult[] = [
  { id:"1", word:"Terima kasih",       category:"Sapaan",   emoji:<ThumbsUp size={20}/>,  relevance:100, type:"word"     },
  { id:"2", word:"Terima kasih banyak",category:"Sapaan",   emoji:<ThumbsUp size={20}/>,  relevance:95,  type:"phrase"   },
  { id:"3", word:"Tolong",             category:"Darurat",  emoji:<HelpCircle size={20}/>,relevance:85,  type:"word"     },
  { id:"4", word:"Sama-sama",          category:"Sapaan",   emoji:<Smile size={20}/>,     relevance:80,  type:"word"     },
  { id:"5", word:"Kategori: Sapaan",   category:"Kategori", emoji:<HandMetal size={20}/>, relevance:75,  type:"category" },
];

const TYPE_CONFIG = {
  word:     { bg:"bg-[#FDEEE6]", label:"Kata"     },
  phrase:   { bg:"bg-[#F4F0E8]", label:"Frasa"    },
  category: { bg:"bg-[#EEF0F6]", label:"Kategori" },
};

export default function SearchPage() {
  const router = useRouter();
  const [query,      setQuery]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [results,    setResults]    = useState<SearchResult[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim()) {
      setLoading(true);
      setTimeout(() => { setResults(RESULTS); setLoading(false); }, 500);
    } else {
      setResults([]);
    }
  };

  const clear = () => { setQuery(""); setResults([]); };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E0] px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.back()} className="text-[#1B1F3B]">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7194]" />
            <input
              type="text"
              placeholder="Cari kata, frasa, atau kategori..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              autoFocus
              className="w-full h-12 pl-12 pr-12 bg-[#EEF0F6] rounded-xl text-[#1B1F3B] placeholder:text-[#9B9890] focus:outline-none focus:ring-2 focus:ring-[#F4A07A] transition-all text-sm"
            />
            {query && (
              <button onClick={clear} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#C8C5BE] rounded-full flex items-center justify-center">
                <X size={14} className="text-white" />
              </button>
            )}
          </div>
        </div>

        {query && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["Semua","Kata","Frasa","Kategori"].map((f, i) => (
              <button
                key={f}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  i === 0 ? "bg-[#F4A07A] text-white shadow-md" : "bg-white text-[#6B7194] border border-[#E8E6E0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-[#F4A07A] rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Search size={28} className="text-white" />
            </div>
            <p className="text-sm text-[#6B7194]">Mencari...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6B7194]">
                Ditemukan <span className="font-semibold text-[#1B1F3B]">{results.length}</span> hasil
              </p>
              <button className="flex items-center gap-1.5 text-xs font-medium text-[#F4A07A]">
                <FilterIcon size={14} />Filter
              </button>
            </div>
            <div className="space-y-2">
              {results.map(r => {
                const cfg = TYPE_CONFIG[r.type];
                return (
                  <div key={r.id} className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <div className={`w-14 h-14 ${cfg.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {r.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[#1B1F3B] text-sm">{r.word}</h4>
                          <span className="text-[10px] text-[#F4A07A] font-medium bg-[#FDEEE6] px-2 py-0.5 rounded-full">{r.relevance}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#6B7194]">{r.category}</span>
                          <span className="text-[10px] text-[#9B9890]">• {cfg.label}</span>
                        </div>
                      </div>
                      <button className="w-10 h-10 bg-[#F4A07A] rounded-xl flex items-center justify-center flex-shrink-0">
                        {r.type === "category" ? <BookOpen size={18} className="text-white" /> : <Play size={18} className="text-white" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : query ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-24 h-24 bg-[#EEF0F6] rounded-full flex items-center justify-center mb-4">
              <Search size={40} className="text-[#6B7194]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1B1F3B] mb-2">Tidak Ditemukan</h3>
            <p className="text-sm text-[#6B7194]">Tidak ada hasil untuk &ldquo;<span className="font-semibold">{query}</span>&rdquo;</p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-[#F4A07A]" />
                <h3 className="font-semibold text-[#1B1F3B]">Pencarian Populer</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="bg-gradient-to-r from-[#F4A07A] to-[#E89566] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md active:scale-95 transition-transform"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-[#6B7194]" />
                <h3 className="font-semibold text-[#1B1F3B]">Pencarian Terkini</h3>
              </div>
              <div className="space-y-2">
                {RECENT.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8E6E0]"
                  >
                    <div className="w-10 h-10 bg-[#EEF0F6] rounded-lg flex items-center justify-center">
                      <Clock size={16} className="text-[#6B7194]" />
                    </div>
                    <span className="flex-1 text-left text-sm text-[#1B1F3B]">{term}</span>
                    <Search size={16} className="text-[#C8C5BE]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-[#EEF0F6] to-[#FDEEE6] rounded-2xl p-4 border border-[#E8E6E0]">
              <h4 className="font-semibold text-[#1B1F3B] mb-2 flex items-center gap-2">
                <Lightbulb size={14} className="text-[#F4A07A]" fill="#F4A07A"/>Tips Pencarian
              </h4>
              <ul className="text-xs text-[#6B7194] space-y-1">
                <li>• Gunakan kata kunci sederhana</li>
                <li>• Cari berdasarkan kategori (misal: &ldquo;sapaan&rdquo;)</li>
                <li>• Ketik frasa lengkap untuk hasil lebih akurat</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
