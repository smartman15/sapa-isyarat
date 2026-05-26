"use client";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Volume2, Play } from "lucide-react";

type Category = "Sapaan" | "Darurat" | "Medis" | "Restoran";

const CATEGORY_DATA: Record<Category, { color: string; icon: string; phrases: { id: string; text: string; usage: string }[] }> = {
  Sapaan: {
    color: "from-[#69B578] to-[#4CAF50]",
    icon: "👋",
    phrases: [
      { id:"1", text:"Halo, apa kabar?",          usage:"Sapaan umum"          },
      { id:"2", text:"Selamat pagi!",              usage:"Sapaan pagi"          },
      { id:"3", text:"Terima kasih banyak",        usage:"Ucapan terima kasih"  },
      { id:"4", text:"Sama-sama",                  usage:"Respon terima kasih"  },
      { id:"5", text:"Permisi, boleh tanya?",      usage:"Meminta izin"         },
      { id:"6", text:"Maaf, saya terlambat",       usage:"Meminta maaf"         },
      { id:"7", text:"Senang bertemu Anda",        usage:"Perkenalan"           },
      { id:"8", text:"Sampai jumpa lagi",          usage:"Perpisahan"           },
    ],
  },
  Darurat: {
    color: "from-[#F44336] to-[#D32F2F]",
    icon: "🆘",
    phrases: [
      { id:"1", text:"TOLONG! SAYA BUTUH BANTUAN!", usage:"Darurat umum"           },
      { id:"2", text:"Panggil ambulans segera!",    usage:"Darurat medis"          },
      { id:"3", text:"Hubungi polisi!",             usage:"Darurat keamanan"       },
      { id:"4", text:"Saya tidak bisa mendengar",  usage:"Identitas tunarungu"    },
      { id:"5", text:"Ada yang terluka di sini",   usage:"Darurat medis"          },
      { id:"6", text:"Saya tersesat",              usage:"Butuh bantuan lokasi"   },
      { id:"7", text:"Di mana rumah sakit terdekat?", usage:"Mencari RS"          },
    ],
  },
  Medis: {
    color: "from-[#2196F3] to-[#1976D2]",
    icon: "🏥",
    phrases: [
      { id:"1", text:"Saya butuh dokter",          usage:"Konsultasi medis"  },
      { id:"2", text:"Kepala saya pusing",         usage:"Keluhan kesehatan" },
      { id:"3", text:"Perut saya sakit",           usage:"Keluhan kesehatan" },
      { id:"4", text:"Saya alergi terhadap...",    usage:"Informasi alergi"  },
      { id:"5", text:"Di mana apotek?",            usage:"Mencari apotek"    },
      { id:"6", text:"Saya butuh obat ini",        usage:"Permintaan obat"   },
      { id:"7", text:"Periksa tekanan darah saya", usage:"Pemeriksaan"       },
    ],
  },
  Restoran: {
    color: "from-[#FF9800] to-[#F57C00]",
    icon: "🍽️",
    phrases: [
      { id:"1", text:"Saya mau pesan makanan",  usage:"Memesan"               },
      { id:"2", text:"Berapa harganya?",        usage:"Menanyakan harga"      },
      { id:"3", text:"Satu kopi, tolong",       usage:"Memesan minuman"       },
      { id:"4", text:"Minta menu, tolong",      usage:"Meminta menu"          },
      { id:"5", text:"Tidak pedas, ya",         usage:"Instruksi masakan"     },
      { id:"6", text:"Minta bon, tolong",       usage:"Meminta bill"          },
      { id:"7", text:"Saya vegetarian",         usage:"Preferensi makanan"    },
      { id:"8", text:"Bungkus, tolong",         usage:"Takeaway"              },
    ],
  },
};

function PhraseCard({
  text, usage, categoryColor, onUse,
}: {
  text: string; usage: string; categoryColor: string; onUse: () => void;
}) {
  return (
    <div className="bg-white border border-[#E8E6E0] rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${categoryColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <MessageCircle size={24} className="text-white"/>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1B1F3B] mb-1 leading-snug">{text}</p>
          <p className="text-xs text-[#6B7194]">{usage}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onUse}
          className="flex-1 bg-[#1B1F3B] text-white py-2.5 rounded-xl text-sm font-semibold"
        >
          Pakai
        </button>
        <button className="w-12 h-10 bg-[#EEF0F6] rounded-xl flex items-center justify-center">
          <Volume2 size={18} className="text-[#6B7194]"/>
        </button>
        <button className="w-12 h-10 bg-[#EEF0F6] rounded-xl flex items-center justify-center">
          <Play size={18} className="text-[#6B7194]"/>
        </button>
      </div>
    </div>
  );
}

export default function QuickPhrasesCategoryPage() {
  const router   = useRouter();
  const { category } = useParams<{ category: string }>();

  /* Normalise the slug back to a valid category key */
  const key = (
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  ) as Category;

  const data = CATEGORY_DATA[key] ?? CATEGORY_DATA["Sapaan"];

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${data.color} px-5 pt-5 pb-6 relative overflow-hidden flex-shrink-0`}>
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"/>

        <div className="flex items-center gap-3 mt-8 mb-3 relative z-10">
          <button onClick={() => router.back()} className="text-white/90">
            <ArrowLeft size={22}/>
          </button>
          <div className="flex-1">
            <div className="text-4xl mb-2">{data.icon}</div>
            <h1 className="text-2xl font-bold text-white mb-1">{key}</h1>
            <p className="text-sm text-white/70">{data.phrases.length} frasa siap pakai</p>
          </div>
        </div>
      </div>

      {/* Phrases list */}
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="space-y-2">
          {data.phrases.map(p => (
            <PhraseCard
              key={p.id}
              text={p.text}
              usage={p.usage}
              categoryColor={data.color}
              onUse={() => router.push(`/phrase-display?phrase=${encodeURIComponent(p.text)}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
