"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Search, Play, Volume2, Bookmark } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type Difficulty = "easy" | "medium" | "hard";

const CATEGORY_DATA: Record<string, {
  color: string; icon: string;
  words: { id: string; word: string; pronunciation: string; difficulty: Difficulty }[];
}> = {
  sapaan: {
    color: "from-[#69B578] to-[#4CAF50]", icon: "👋",
    words: [
      { id: "1", word: "Halo",            pronunciation: "/ha-lo/",              difficulty: "easy"   },
      { id: "2", word: "Selamat pagi",    pronunciation: "/se-la-mat pa-gi/",    difficulty: "easy"   },
      { id: "3", word: "Terima kasih",    pronunciation: "/te-ri-ma ka-sih/",    difficulty: "medium" },
      { id: "4", word: "Sama-sama",       pronunciation: "/sa-ma sa-ma/",        difficulty: "easy"   },
      { id: "5", word: "Permisi",         pronunciation: "/per-mi-si/",          difficulty: "easy"   },
      { id: "6", word: "Maaf",            pronunciation: "/ma-af/",              difficulty: "easy"   },
      { id: "7", word: "Selamat tinggal", pronunciation: "/se-la-mat ting-gal/", difficulty: "medium" },
    ],
  },
  darurat: {
    color: "from-[#F44336] to-[#D32F2F]", icon: "🆘",
    words: [
      { id: "1", word: "Tolong!",                    pronunciation: "/to-long/",                      difficulty: "easy"   },
      { id: "2", word: "Saya butuh bantuan",          pronunciation: "/sa-ya bu-tuh ban-tu-an/",       difficulty: "medium" },
      { id: "3", word: "Panggil ambulans",            pronunciation: "/pang-gil am-bu-lans/",          difficulty: "hard"   },
      { id: "4", word: "Hubungi polisi",              pronunciation: "/hu-bung-i po-li-si/",           difficulty: "hard"   },
      { id: "5", word: "Saya tidak bisa mendengar",  pronunciation: "/sa-ya ti-dak bi-sa men-de-ngar/",difficulty: "hard"   },
    ],
  },
  kesehatan: {
    color: "from-[#2196F3] to-[#1976D2]", icon: "🏥",
    words: [
      { id: "1", word: "Dokter",            pronunciation: "/dok-ter/",             difficulty: "easy"   },
      { id: "2", word: "Rumah sakit",       pronunciation: "/ru-mah sa-kit/",       difficulty: "medium" },
      { id: "3", word: "Saya sakit",        pronunciation: "/sa-ya sa-kit/",        difficulty: "easy"   },
      { id: "4", word: "Kepala pusing",     pronunciation: "/ke-pa-la pu-sing/",    difficulty: "medium" },
      { id: "5", word: "Obat",              pronunciation: "/o-bat/",               difficulty: "easy"   },
      { id: "6", word: "Periksa kesehatan", pronunciation: "/pe-rik-sa ke-se-ha-tan/",difficulty: "hard" },
    ],
  },
};

const DIFF_STYLE: Record<Difficulty, string> = {
  easy:   "bg-[#69B578] text-white",
  medium: "bg-[#FFC107] text-[#5C4A2A]",
  hard:   "bg-[#F44336] text-white",
};
const DIFF_LABEL: Record<Difficulty, string> = {
  easy: "Mudah", medium: "Sedang", hard: "Sulit",
};

export default function DictionaryCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = (params?.category as string) ?? "sapaan";
  const data = CATEGORY_DATA[categorySlug] ?? CATEGORY_DATA.sapaan;
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  const [query, setQuery] = useState("");
  const filtered = data.words.filter(w => w.word.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${data.color} px-5 pt-5 pb-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="flex justify-between items-center w-full absolute top-0 left-0 right-0 px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>

        <div className="flex items-center gap-3 mt-8 mb-4 relative z-10">
          <button onClick={() => router.back()} className="text-white/90">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <div className="text-4xl mb-2">{data.icon}</div>
            <h1 className="text-2xl font-bold text-white mb-1">{categoryName}</h1>
            <p className="text-sm text-white/70">{data.words.length} kata dalam kategori ini</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3.5 py-2.5 flex items-center gap-2 relative z-10">
          <Search size={16} className="text-white/60" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari kata..."
            className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Word list */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-2">
        {filtered.map(word => (
          <button
            key={word.id}
            onClick={() => router.push(`/dictionary/${categorySlug}/${word.id}`)}
            className="w-full bg-white border border-[#E8E6E0] rounded-2xl p-4 flex items-center gap-3 hover:border-[#F4A07A] transition-all"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${data.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Play size={24} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-[#1B1F3B]">{word.word}</h3>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${DIFF_STYLE[word.difficulty]}`}>
                  {DIFF_LABEL[word.difficulty]}
                </span>
              </div>
              <p className="text-xs text-[#6B7194] mb-2">{word.pronunciation}</p>
              <div className="flex items-center gap-2">
                <Volume2 size={12} className="text-[#F4A07A]" />
                <span className="text-[10px] text-[#6B7194]">Audio</span>
                <div className="w-1 h-1 bg-[#E8E6E0] rounded-full" />
                <Play size={12} className="text-[#F4A07A]" />
                <span className="text-[10px] text-[#6B7194]">Video</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#EEF0F6] rounded-xl flex items-center justify-center flex-shrink-0">
              <Bookmark size={18} className="text-[#6B7194]" />
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
