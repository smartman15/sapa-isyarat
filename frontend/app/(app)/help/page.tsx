"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, ChevronDown, ChevronUp,
  Camera, Mic, BookOpen, MessageCircle, Play, Mail,
} from "lucide-react";

type FAQ = { id: string; question: string; answer: string; category: string; };
type Tutorial = { id: string; title: string; duration: string; icon: React.ReactNode; steps: number; };

const FAQS: FAQ[] = [
  { id:"1", category:"Dasar",        question:"Bagaimana cara menggunakan penerjemah isyarat?", answer:"Tap fitur \"Terjemahkan Isyarat\" di beranda, arahkan kamera ke tangan Anda, dan aplikasi akan mendeteksi gerakan isyarat secara real-time. Pastikan pencahayaan cukup dan tangan terlihat jelas di layar." },
  { id:"2", category:"Dasar",        question:"Apakah aplikasi bisa bekerja offline?",           answer:"Kamus BISINDO dapat diakses offline. Namun, fitur penerjemahan real-time dan speech-to-text memerlukan koneksi internet untuk hasil terbaik." },
  { id:"3", category:"Kamus",        question:"Berapa banyak kata BISINDO yang tersedia?",       answer:"Saat ini kami menyediakan 300+ kata dan frasa BISINDO lengkap dengan video tutorial. Kami terus menambahkan kata baru setiap bulannya." },
  { id:"4", category:"Fitur",        question:"Bagaimana cara menggunakan mode darurat?",        answer:"Akses mode darurat dari beranda atau dengan swipe dari kiri. Pilih pesan darurat dan layar akan menampilkan teks besar yang mudah dibaca. Mode ini dirancang untuk komunikasi cepat dalam situasi darurat." },
  { id:"5", category:"Privasi",      question:"Apakah data saya aman?",                          answer:"Ya, semua data Anda dienkripsi dan disimpan secara lokal. Kami tidak membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin Anda." },
  { id:"6", category:"Fitur",        question:"Bagaimana cara melacak progress belajar?",        answer:"Tap menu \"Progress Belajar\" di beranda untuk melihat statistik lengkap, streak harian, pencapaian, dan riwayat pembelajaran Anda." },
  { id:"7", category:"Fitur",        question:"Apakah bisa menyimpan favorit?",                  answer:"Ya! Tap ikon hati pada kata atau frasa apa pun untuk menyimpannya ke favorit. Akses favorit dari menu beranda atau profil." },
  { id:"8", category:"Aksesibilitas",question:"Bagaimana cara mengatur ukuran teks?",            answer:"Buka Pengaturan > Aksesibilitas untuk mengatur ukuran teks, kontras, kecepatan animasi, dan fitur aksesibilitas lainnya." },
];

const TUTORIALS: Tutorial[] = [
  { id:"1", title:"Memulai dengan Sapa Isyarat",  duration:"3 menit", icon:<Play size={20}/>,          steps:5 },
  { id:"2", title:"Menggunakan Kamera Deteksi",   duration:"5 menit", icon:<Camera size={20}/>,        steps:7 },
  { id:"3", title:"Mode Percakapan",              duration:"4 menit", icon:<MessageCircle size={20}/>, steps:6 },
  { id:"4", title:"Menjelajahi Kamus BISINDO",    duration:"6 menit", icon:<BookOpen size={20}/>,      steps:8 },
];

const CATS = ["Semua","Dasar","Fitur","Kamus","Aksesibilitas","Privasi"];

function TutorialCard({ t }: { t: Tutorial }) {
  return (
    <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-[#E8E6E0] hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#6CAEE4] rounded-xl flex items-center justify-center text-white flex-shrink-0">
        {t.icon}
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-semibold text-[#1B1F3B] text-sm mb-1">{t.title}</h4>
        <div className="flex items-center gap-2 text-xs text-[#6B7194]">
          <span>{t.duration}</span><span>•</span><span>{t.steps} langkah</span>
        </div>
      </div>
      <div className="w-10 h-10 bg-[#EEF0F6] rounded-full flex items-center justify-center">
        <Play size={16} className="text-[#1B1F3B]"/>
      </div>
    </button>
  );
}

function FAQItem({ faq, expanded, onToggle }: { faq: FAQ; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E6E0]">
      <button onClick={onToggle} className="w-full p-4 flex items-start gap-3 text-left hover:bg-[#FAF9F6] transition-colors">
        <div className="flex-1">
          <h4 className="font-semibold text-[#1B1F3B] text-sm mb-1">{faq.question}</h4>
          <span className="inline-block text-[10px] bg-[#EEF0F6] text-[#6B7194] px-2 py-0.5 rounded-full font-medium">{faq.category}</span>
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? <ChevronUp size={20} className="text-[#6B7194]"/> : <ChevronDown size={20} className="text-[#6B7194]"/>}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#E8E6E0] pt-3">
          <p className="text-sm text-[#6B7194] leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const router = useRouter();
  const [query,    setQuery]    = useState("");
  const [expanded, setExpanded] = useState<string|null>(null);
  const [category, setCategory] = useState("Semua");

  const filtered = FAQS.filter(f => {
    const catOk  = category === "Semua" || f.category === category;
    const textOk = query === "" || f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase());
    return catOk && textOk;
  });

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] via-[#5B9FE3] to-[#6CAEE4] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"/>

        <div className="flex items-center gap-3 mt-8 mb-4 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5" style={{letterSpacing:"-0.5px"}}>Pusat Bantuan</h1>
            <p className="text-sm text-white/70">FAQ &amp; tutorial lengkap</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative z-10">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"/>
          <input
            type="text"
            placeholder="Cari bantuan..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white/20 backdrop-blur-sm rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Contact card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] rounded-2xl p-4 border border-[#F4A07A]/30">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#F4A07A] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={24} className="text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1B1F3B] mb-1">Butuh bantuan lebih?</h3>
                <p className="text-xs text-[#6B7194] mb-3">Tim kami siap membantu Anda 24/7</p>
                <button className="bg-[#F4A07A] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md active:scale-95 transition-transform">
                  Hubungi Kami
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial list */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold text-[#1B1F3B] mb-3">Tutorial Video</h3>
          <div className="space-y-2">
            {TUTORIALS.map(t => <TutorialCard key={t.id} t={t}/>)}
          </div>
        </div>

        {/* FAQ section */}
        <div className="px-4 pb-6">
          <h3 className="font-semibold text-[#1B1F3B] mb-3">Pertanyaan Umum (FAQ)</h3>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  category === c ? "bg-[#4A90E2] text-white shadow-md" : "bg-white text-[#6B7194] border border-[#E8E6E0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-2">
            {filtered.length > 0 ? (
              filtered.map(f => (
                <FAQItem
                  key={f.id}
                  faq={f}
                  expanded={expanded === f.id}
                  onToggle={() => setExpanded(expanded === f.id ? null : f.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#EEF0F6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search size={32} className="text-[#6B7194]"/>
                </div>
                <p className="text-sm text-[#6B7194]">Tidak ada hasil ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
