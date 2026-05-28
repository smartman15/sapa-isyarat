"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Camera, Mic, BookOpen, Zap, MessageCircle, CheckCircle, Lightbulb } from "lucide-react";
import { Mascot, MascotMood } from "@/components/Mascot";

/* ── Mini SVG mockups ── */
function MockCamera() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
      <rect x="10" y="8" width="120" height="92" rx="12" fill="#252A52"/>
      <rect x="16" y="14" width="108" height="76" rx="8" fill="#1B1F3B"/>
      <path d="M30 28 L22 28 L22 36" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M110 28 L118 28 L118 36" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 76 L22 76 L22 68" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M110 76 L118 76 L118 68" stroke="#F4A07A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52 68 L52 52 C52 49.8 53.8 48 56 48 S60 49.8 60 52 L60 56" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M60 55 L60 50 C60 47.8 61.8 46 64 46 S68 47.8 68 50 L68 56" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M68 55 L68 51 C68 48.8 69.8 47 72 47 S76 48.8 76 51 L76 57" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M76 57 L76 54 C76 51.8 77.8 50 80 50 S84 51.8 84 54 L84 60 C84 66 79 70 73 70 L69 70 C66 70 64 67.3 64 64" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="44" y="80" width="52" height="14" rx="5" fill="#F4A07A"/>
      <text x="70" y="90" textAnchor="middle" fontSize="7" fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">Terima kasih ✓</text>
      <circle cx="70" cy="96" r="6" fill="#F4A07A" opacity="0.7"/>
      <circle cx="70" cy="96" r="4" fill="white" opacity="0.9"/>
    </svg>
  );
}

function MockSpeech() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
      <circle cx="70" cy="48" r="38" stroke="#F4A07A" strokeWidth="1.2" opacity="0.15"/>
      <circle cx="70" cy="48" r="28" stroke="#F4A07A" strokeWidth="1.5" opacity="0.22"/>
      <circle cx="70" cy="48" r="20" fill="#252A52"/>
      <circle cx="70" cy="48" r="15" fill="#1B1F3B"/>
      <rect x="65" y="36" width="10" height="17" rx="5" fill="white"/>
      <path d="M57 48 C57 55 63 61 70 61 C77 61 83 55 83 48" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="70" y1="61" x2="70" y2="67" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="62" y1="67" x2="78" y2="67" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {[30,39,48,57,66,75,84,93,102].map((x,i) => {
        const heights = [11,15,13,18,15,13,11,9,10];
        const ys      = [82,78,80,75,78,80,82,84,83];
        const opacities = [0.45,0.65,1,1,1,0.85,0.65,0.45,0.3];
        return <rect key={i} x={x} y={ys[i]} width="5" height={heights[i]} rx="2.5" fill="#F4A07A" opacity={opacities[i]}/>;
      })}
    </svg>
  );
}

function MockDictionary() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
      <rect x="10" y="8" width="120" height="20" rx="8" fill="#F0EEE8"/>
      <circle cx="22" cy="18" r="5" stroke="#B8B5AE" strokeWidth="1.5" fill="none"/>
      <line x1="26" y1="22" x2="29" y2="25" stroke="#B8B5AE" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="34" y="15" width="60" height="6" rx="3" fill="#D0CEC8" opacity="0.5"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="10" y={34 + i*24} width="120" height="20" rx="8" fill="white"/>
          <rect x="10" y={34 + i*24} width="120" height="20" rx="8" stroke="#E8E6E0" strokeWidth="1"/>
          <rect x="18" y={38 + i*24} width="24" height="12" rx="4" fill={i===0?'#FDEEE6':i===1?'#EEF0F6':'#F4F0E8'}/>
          <rect x="50" y={39 + i*24} width="44" height="5" rx="2.5" fill="#1B1F3B" opacity="0.7"/>
          <rect x="50" y={47 + i*24} width="32" height="3.5" rx="1.75" fill="#6B7194" opacity="0.4"/>
          <rect x="118" y={41 + i*24} width="6" height="6" rx="3" fill="#F4A07A" opacity="0.5"/>
        </g>
      ))}
    </svg>
  );
}

function MockQuickPhrase() {
  const phrases = [
    { y:32, w:90  },
    { y:54, w:72  },
    { y:76, w:108 },
  ];
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
      <rect x="10" y="8" width="40" height="16" rx="6" fill="#1B1F3B"/>
      <rect x="55" y="8" width="40" height="16" rx="6" fill="#F0EEE8"/>
      <rect x="100" y="8" width="30" height="16" rx="6" fill="#F0EEE8"/>
      <rect x="17" y="13" width="26" height="5" rx="2.5" fill="white" opacity="0.8"/>
      <rect x="62" y="13" width="26" height="5" rx="2.5" fill="#6B7194" opacity="0.6"/>
      <rect x="107" y="13" width="16" height="5" rx="2.5" fill="#6B7194" opacity="0.6"/>
      {phrases.map((p,i) => (
        <g key={i}>
          <rect x="10" y={p.y} width={p.w} height="18" rx="9" fill={i===0?'#FDEEE6':i===1?'#EEF0F6':'#F4F0E8'}/>
          <rect x="18" y={p.y+5} width={p.w-16} height="6" rx="3" fill={i===0?'#F4A07A':'#1B1F3B'} opacity="0.55"/>
          <circle cx={p.w+2} cy={p.y+9} r="7" fill="#F4A07A" opacity="0.85"/>
          <path d={`M${p.w-2} ${p.y+6} L${p.w+2} ${p.y+9} L${p.w-2} ${p.y+12}`} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
      ))}
    </svg>
  );
}

function MockConversation() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
      <rect x="48" y="10" width="82" height="22" rx="10" fill="#1B1F3B"/>
      <path d="M60 32 L56 38 L68 32" fill="#1B1F3B"/>
      <rect x="56" y="16" width="66" height="5" rx="2.5" fill="white" opacity="0.7"/>
      <rect x="56" y="24" width="42" height="4" rx="2" fill="white" opacity="0.35"/>
      <rect x="10" y="48" width="82" height="22" rx="10" fill="#F4A07A" opacity="0.2"/>
      <rect x="10" y="48" width="82" height="22" rx="10" stroke="#F4A07A" strokeWidth="1"/>
      <rect x="18" y="54" width="56" height="5" rx="2.5" fill="#F4A07A" opacity="0.7"/>
      <rect x="18" y="62" width="36" height="4" rx="2" fill="#F4A07A" opacity="0.4"/>
      <rect x="28" y="84" width="84" height="20" rx="8" fill="#F0EEE8"/>
      <rect x="50" y="91" width="56" height="4" rx="2" fill="#1B1F3B" opacity="0.4"/>
      <rect x="50" y="98" width="36" height="3" rx="1.5" fill="#6B7194" opacity="0.3"/>
      <circle cx="40" cy="94" r="8" fill="#F4A07A"/>
      <rect x="37" y="88" width="6" height="9" rx="3" fill="white"/>
      <path d="M34 94 C34 97.3 36.7 100 40 100 C43.3 100 46 97.3 46 94" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

/* ── Step data ── */
type Step = { icon: React.ReactNode; iconBg: string; title: string; description: string; tip: string; mascotMood: MascotMood; mockup: React.ReactNode; };

const STEPS: Step[] = [
  { icon:<Camera size={18}/>,       iconBg:"bg-[#EEF0F6] text-[#1B1F3B]",   title:"Terjemahkan Bahasa Isyarat", description:"Ketuk tombol kamera di beranda. Arahkan kamera ke tangan yang sedang berisyarat — Isya akan menerjemahkannya ke teks secara real-time.", tip:"Pastikan pencahayaan cukup dan tangan terlihat jelas di layar.", mascotMood:"teach",   mockup:<MockCamera/>      },
  { icon:<Mic size={18}/>,          iconBg:"bg-[#FDEEE6] text-[#7A3010]",   title:"Speech to Text",             description:"Ketuk ikon mikrofon lalu bicara dengan normal. Aplikasi mengubah suaramu jadi teks yang bisa dibaca pengguna tuli.",                                                 tip:"Bicara pelan dan jelas untuk hasil yang lebih akurat.",                               mascotMood:"thinking", mockup:<MockSpeech/>      },
  { icon:<BookOpen size={18}/>,     iconBg:"bg-[#EEF0F6] text-[#1B1F3B]",   title:"Kamus BISINDO",              description:"Cari kata di tab Kamus. Setiap kata dilengkapi video demonstrasi gerakan tangan, pelafalan, dan contoh penggunaan.",                                               tip:"Simpan kata ke Favorit agar mudah ditemukan lagi.",                                    mascotMood:"wave",    mockup:<MockDictionary/>  },
  { icon:<Zap size={18}/>,          iconBg:"bg-[#FDEEE6] text-[#7A3010]",   title:"Kalimat Cepat",              description:"Frasa yang paling sering digunakan sudah tersedia. Ketuk sekali, langsung terkirim — cocok untuk situasi mendesak.",                                              tip:"Mode Darurat membuka kalimat darurat seketika kapan saja.",                            mascotMood:"excited", mockup:<MockQuickPhrase/>},
  { icon:<MessageCircle size={18}/>,iconBg:"bg-[#F4F0E8] text-[#5C4A2A]",   title:"Mode Percakapan",            description:"Gunakan mode percakapan dua arah untuk dialog interaktif — satu sisi ketik/isyarat, sisi lain bicara/teks.",                                                       tip:"Putar layar secara bergantian agar percakapan lebih nyaman.",                          mascotMood:"happy",   mockup:<MockConversation/>},
];

/* ── Main page ── */
export default function TutorialPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const cur    = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6] relative overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 flex-shrink-0">
        <span className="text-xs font-semibold text-[#6B7194]">9:41</span>
      </div>

      {/* Navy header */}
      <div className="bg-[#1B1F3B] px-5 pt-3 pb-8 relative overflow-hidden flex-shrink-0">
        <div className="absolute -top-10 -right-10 w-[100px] h-[100px] rounded-full border-[20px] border-[#F4A07A] opacity-10 pointer-events-none"/>
        <div className="absolute -bottom-6 left-10 w-[70px] h-[70px] rounded-full bg-[#F4A07A] opacity-[0.06] pointer-events-none"/>

        <div className="flex justify-between items-center mb-3 relative z-10">
          <div>
            <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mb-0.5">Panduan penggunaan</p>
            <h1 className="text-[18px] font-bold text-white leading-none" style={{letterSpacing:"-0.3px"}}>
              Langkah {step + 1} dari {STEPS.length}
            </h1>
          </div>
          <button onClick={() => router.back()} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <X size={16} className="text-white"/>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
          <div
            className="h-full bg-[#F4A07A] rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
        {/* Mascot + mockup row */}
        <div className="flex items-end justify-between mb-5">
          <div className="flex-shrink-0">
            <Mascot size={90} mood={cur.mascotMood}/>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="bg-white border border-[#E8E6E0] rounded-[16px] p-3 shadow-sm">
              {cur.mockup}
            </div>
          </div>
        </div>

        {/* Step label */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${cur.iconBg}`}>{cur.icon}</div>
          <span className="text-[11px] font-semibold text-[#6B7194] uppercase tracking-wider">Fitur {step + 1}</span>
        </div>

        <h2 className="text-[20px] font-bold text-[#1B1F3B] mb-2.5 leading-snug" style={{letterSpacing:"-0.3px"}}>{cur.title}</h2>
        <p className="text-[13.5px] text-[#6B7194] leading-relaxed mb-4">{cur.description}</p>

        {/* Tip card */}
        <div className="bg-[#FDEEE6] border border-[#F4A07A]/25 rounded-[14px] p-3.5 flex gap-2.5 mb-6">
          <div className="flex-shrink-0 mt-0.5"><Lightbulb size={16} className="text-[#F4A07A]" fill="#F4A07A"/></div>
          <div>
            <p className="text-[11px] font-bold text-[#7A3010] mb-0.5 uppercase tracking-wide">Tips Isya</p>
            <p className="text-[12.5px] text-[#7A3010]/80 leading-relaxed">{cur.tip}</p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          {STEPS.map((_,i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i===step ? "w-[22px] bg-[#1B1F3B]" : i<step ? "w-1.5 bg-[#F4A07A]" : "w-1.5 bg-[#D0CEC8]"}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2.5">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-[14px] rounded-[14px] font-semibold text-[13px] border border-[#E8E6E0] text-[#1B1F3B] bg-white"
            >
              ← Sebelumnya
            </button>
          )}
          <button
            onClick={() => isLast ? router.push("/home") : setStep(step + 1)}
            className={`py-[14px] rounded-[14px] font-semibold text-[13px] bg-[#1B1F3B] text-white shadow-md ${step > 0 ? "flex-1" : "w-full"}`}
          >
            {isLast
              ? <span className="flex items-center justify-center gap-1.5"><CheckCircle size={15}/>Selesai, yuk mulai!</span>
              : "Selanjutnya →"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
