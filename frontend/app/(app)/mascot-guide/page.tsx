"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { Mascot, MascotMood } from "@/components/Mascot";

function Swatch({ hex, name, role }: { hex: string; name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-[10px] border border-black/[0.08] flex-shrink-0 shadow-sm" style={{ background: hex }}/>
      <div>
        <div className="text-[12px] font-bold text-[#1B1F3B]">{name}</div>
        <div className="text-[11px] text-[#6B7194] font-mono">{hex}</div>
        <div className="text-[10px] text-[#9B9890]">{role}</div>
      </div>
    </div>
  );
}

function MoodCard({ mood, label, usage, bg }: { mood: MascotMood; label: string; usage: string; bg: string }) {
  return (
    <div className={`${bg} rounded-[16px] p-3.5 flex flex-col items-center gap-1`}>
      <Mascot size={72} mood={mood}/>
      <div className="text-center mt-1">
        <div className="text-[12px] font-bold text-[#1B1F3B]">{label}</div>
        <div className="text-[10px] text-[#6B7194] mt-0.5 leading-snug">{usage}</div>
      </div>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 h-px bg-[#E8E6E0]"/>
      <span className="text-[10px] font-bold text-[#6B7194] uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-[#E8E6E0]"/>
    </div>
  );
}

function SizeCard({ size, label, context }: { size: number; label: string; context: string }) {
  return (
    <div className="flex flex-col items-center bg-[#F5F4F0] rounded-[14px] p-3 flex-1">
      <Mascot size={size} mood="wave"/>
      <div className="text-[11px] font-bold text-[#1B1F3B] mt-1">{label}</div>
      <div className="text-[10px] text-[#6B7194] mt-0.5 text-center leading-snug">{context}</div>
      <div className="text-[9px] font-mono text-[#B8B5AE] mt-1">{size}px</div>
    </div>
  );
}

function RuleRow({ ok, rule, note }: { ok: boolean; rule: string; note: string }) {
  return (
    <div className="flex items-start gap-2.5 mb-2.5">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${ok ? "bg-[#E8F5EB] text-[#2E7D32]" : "bg-[#FDEAEA] text-[#C62828]"}`}>
        <span className="text-[10px] font-bold">{ok ? "✓" : "✕"}</span>
      </div>
      <div>
        <div className={`text-[12px] font-semibold ${ok ? "text-[#2E7D32]" : "text-[#C62828]"}`}>{rule}</div>
        <div className="text-[11px] text-[#6B7194] leading-snug">{note}</div>
      </div>
    </div>
  );
}

const BACKGROUNDS = [
  { bg: "bg-[#1B1F3B]",  label: "Navy Gelap",  border: ""                      },
  { bg: "bg-[#FAF9F6]",  label: "Krim Terang", border: "border border-[#E8E6E0]" },
  { bg: "bg-[#F4A07A]",  label: "Peach",        border: ""                      },
];

const PERSONALITY = [
  { emoji:"🤝", trait:"Inklusif",    desc:"Menyambut semua pengguna tanpa terkecuali" },
  { emoji:"✨", trait:"Ceria",       desc:"Selalu positif dan memberi semangat belajar" },
  { emoji:"🎓", trait:"Panduan",     desc:"Siap menjelaskan dan memandu dengan sabar" },
  { emoji:"🛡️", trait:"Terpercaya", desc:"Menjaga privasi dan keamanan pengguna" },
];

export default function MascotGuidePage() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 flex-shrink-0">
        <span className="text-xs font-semibold text-[#6B7194]">9:41</span>
      </div>

      {/* Navy header */}
      <div className="bg-[#1B1F3B] px-5 pt-3 pb-10 relative overflow-hidden flex-shrink-0">
        <div className="absolute -top-12 -right-12 w-[120px] h-[120px] rounded-full border-[22px] border-[#F4A07A] opacity-[0.11] pointer-events-none"/>
        <div className="absolute -bottom-8 left-12 w-[80px] h-[80px] rounded-full bg-[#F4A07A] opacity-[0.07] pointer-events-none"/>

        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-3 relative z-10"
        >
          <ArrowLeft size={16} className="text-white"/>
        </button>

        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-0.5">Design System</p>
            <h1 className="text-[22px] font-bold text-white leading-tight" style={{ letterSpacing:"-0.4px" }}>
              Panduan Maskot Isya
            </h1>
            <p className="text-[12px] text-white/45 mt-1">Referensi penggunaan resmi</p>
          </div>
          <div className="-mb-10 relative z-20">
            <Mascot size={96} mood="peace"/>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-8">
        {/* Intro */}
        <div className="bg-[#F0EEE8] rounded-[16px] p-4 mb-6 flex gap-3">
          <Info size={16} className="text-[#6B7194] flex-shrink-0 mt-0.5"/>
          <p className="text-[12.5px] text-[#6B7194] leading-relaxed">
            <span className="font-bold text-[#1B1F3B]">Isya</span> adalah maskot resmi Sapa Isyarat — karakter beruang mungil berwarna peach yang ramah dan ekspresif. Isya hadir untuk menghangatkan antarmuka dan membuat pengalaman belajar SIBI terasa menyenangkan.
          </p>
        </div>

        {/* Moods */}
        <SectionTitle label="Ekspresi & Suasana Hati"/>
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <MoodCard mood="wave"     label="Wave"     usage="Sapaan, onboarding, header"   bg="bg-[#FDEEE6]"/>
          <MoodCard mood="happy"    label="Happy"    usage="Pencapaian, selamat, sukses"  bg="bg-[#EEF0F6]"/>
          <MoodCard mood="excited"  label="Excited"  usage="Fitur baru, level naik"       bg="bg-[#F4F0E8]"/>
          <MoodCard mood="peace"    label="Peace"    usage="Akhir sesi, selesai belajar"  bg="bg-[#E8F5EB]"/>
          <MoodCard mood="thinking" label="Thinking" usage="Loading, proses berjalan"     bg="bg-[#F0EEE8]"/>
          <MoodCard mood="teach"    label="Teach"    usage="Tutorial, tips, panduan"      bg="bg-[#FDEEE6]"/>
        </div>

        {/* Color palette */}
        <SectionTitle label="Palet Warna Isya"/>
        <div className="bg-white border border-[#E8E6E0] rounded-[16px] p-4 mb-6 space-y-4">
          <Swatch hex="#F4A07A" name="Peach Utama"  role="Body, kepala — warna identitas"/>
          <Swatch hex="#E8934A" name="Peach Tua"    role="Telinga luar, lengan"/>
          <Swatch hex="#FDEEE6" name="Krim"         role="Telinga dalam, perut, cakar"/>
          <Swatch hex="#1B1F3B" name="Navy Malam"   role="Bola mata, hidung, senyum"/>
          <Swatch hex="#E07A40" name="Blush Peach"  role="Pipi (transparansi 35%)"/>
          <Swatch hex="#FFFFFF" name="Putih"         role="Sklera mata, kilap"/>
        </div>

        {/* Size guide */}
        <SectionTitle label="Panduan Ukuran"/>
        <div className="flex gap-2 mb-6">
          <SizeCard size={48}  label="Kecil"  context="Badge, notif, ikon kecil"/>
          <SizeCard size={80}  label="Sedang" context="Header, kartu, tips"/>
          <SizeCard size={120} label="Besar"  context="Splash, onboarding, hero"/>
        </div>

        {/* Backgrounds */}
        <SectionTitle label="Isya di Berbagai Latar"/>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {BACKGROUNDS.map(b => (
            <div key={b.label} className={`${b.bg} ${b.border} rounded-[14px] p-3 flex flex-col items-center`}>
              <Mascot size={56} mood="wave"/>
              <span className="text-[9px] font-semibold mt-1.5" style={{ color: b.label === "Krim Terang" ? "#1B1F3B" : "rgba(255,255,255,0.75)" }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#6B7194] text-center mb-6">
          Isya tampil jelas di ketiga tipe latar berkat warna tubuh peach yang kontras.
        </p>

        {/* Do's & Don'ts */}
        <SectionTitle label="Aturan Penggunaan"/>
        <div className="bg-white border border-[#E8E6E0] rounded-[16px] p-4 mb-6">
          <RuleRow ok rule="Gunakan ukuran minimum 48px"       note="Di bawah itu detail muka menjadi tidak terbaca."/>
          <RuleRow ok rule="Pertahankan proporsi asli"         note="Jangan stretch horisontal atau vertikal."/>
          <RuleRow ok rule="Pilih mood yang sesuai konteks"    note="Wave untuk sapa, Thinking untuk loading, dst."/>
          <RuleRow ok rule="Beri ruang napas di sekitar Isya"  note="Minimal padding 8px dari elemen lain."/>
          <div className="h-px bg-[#E8E6E0] my-3"/>
          <RuleRow ok={false} rule="Jangan ubah warna tubuh"              note="Warna peach adalah identitas Isya yang tidak boleh diganti."/>
          <RuleRow ok={false} rule="Jangan rotasi atau mirror"             note="Isya selalu menghadap ke depan/sedikit ke kanan."/>
          <RuleRow ok={false} rule="Jangan gunakan sebagai ikon kecil <32px" note="Pada ukuran itu, gunakan versi abstrak/logo saja."/>
          <RuleRow ok={false} rule="Jangan tumpuk teks di atas Isya"      note="Teks di atas karakter mengurangi keterbacaan keduanya."/>
        </div>

        {/* Personality */}
        <SectionTitle label="Kepribadian Isya"/>
        <div className="space-y-2 mb-4">
          {PERSONALITY.map(p => (
            <div key={p.trait} className="flex items-center gap-3 bg-white border border-[#E8E6E0] rounded-[12px] px-3.5 py-2.5">
              <span className="text-base">{p.emoji}</span>
              <div>
                <div className="text-[12px] font-bold text-[#1B1F3B]">{p.trait}</div>
                <div className="text-[11px] text-[#6B7194]">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer card */}
        <div className="bg-[#1B1F3B] rounded-[16px] p-4 flex items-center gap-3 mt-2">
          <Mascot size={52} mood="peace"/>
          <div>
            <div className="text-[13px] font-bold text-white">Dibuat dengan ❤️</div>
            <div className="text-[11px] text-white/50">Sapa Isyarat Design System v1.0</div>
            <div className="text-[10px] text-[#F4A07A] mt-0.5 font-medium">Isya © 2024 Sapa Isyarat</div>
          </div>
        </div>
      </div>
    </div>
  );
}
