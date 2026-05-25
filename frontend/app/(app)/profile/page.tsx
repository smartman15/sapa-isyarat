"use client";
import { useRouter } from "next/navigation";
import { ChevronRight, Pencil, Languages, Moon, Bell, Accessibility, Type, Download, LogOut, Settings } from "lucide-react";
import BottomNav from "@/components/BottomNav";

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center px-[18px]">
      <div className="text-base font-semibold text-white">{num}</div>
      <div className="text-[10px] text-white/40">{label}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[10px] font-semibold text-[#6B7194] uppercase tracking-wider mb-2 mt-3.5 first:mt-0">{children}</h3>;
}

function SettingRow({
  icon, label, value, toggle = false, toggleOn = false,
  iconBg = "bg-[#EEF0F6]", iconColor = "text-[#1B1F3B]",
  labelColor = "text-[#1B1F3B]", last = false, onClick,
}: {
  icon: React.ReactNode; label: string; value?: string; toggle?: boolean; toggleOn?: boolean;
  iconBg?: string; iconColor?: string; labelColor?: string; last?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-[13px] ${!last ? "border-b border-[#E8E6E0]" : ""}`}>
      <div className={`w-[34px] h-[34px] ${iconBg} rounded-[10px] flex items-center justify-center ${iconColor} flex-shrink-0`}>{icon}</div>
      <span className={`flex-1 text-left text-[13px] font-medium ${labelColor}`}>{label}</span>
      {value && <span className="text-xs text-[#6B7194]">{value}</span>}
      {toggle && (
        <div className={`w-[38px] h-[22px] rounded-full relative transition-colors ${toggleOn ? "bg-[#1B1F3B]" : "bg-[#D1CECC]"}`}>
          <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-0.5 transition-all ${toggleOn ? "right-0.5" : "left-0.5"}`}/>
        </div>
      )}
      {!toggle && !value && <ChevronRight size={16} className="text-[#C8C5BE]"/>}
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-[#1B1F3B] px-5 pt-5 pb-6 relative overflow-hidden flex flex-col items-center gap-3">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/50">9:41</span>
        </div>
        <div className="absolute w-[130px] h-[130px] rounded-full bg-[#F4A07A] opacity-10 -top-10 -right-8"/>
        <div className="absolute w-20 h-20 rounded-full bg-[#E8C9A0] opacity-[0.08] -bottom-5 left-5"/>
        {/* Avatar */}
        <div className="w-[72px] h-[72px] bg-[#F4A07A] rounded-full flex items-center justify-center text-[26px] font-semibold text-[#4A2000] relative z-10 mt-8">
          DR
          <div className="absolute bottom-0 right-0 w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center">
            <Pencil size={10} className="text-[#1B1F3B]"/>
          </div>
        </div>
        <div className="text-center relative z-10">
          <h2 className="text-lg font-semibold text-white mb-0.5" style={{letterSpacing:"-0.3px"}}>Dira Rahayu</h2>
          <p className="text-xs text-white/40">Pengguna sejak Jan 2025</p>
        </div>
        <div className="flex gap-0 relative z-10 mt-1">
          <Stat num="48" label="Kata dipelajari"/>
          <div className="w-px h-8 bg-white/[0.12]"/>
          <Stat num="12" label="Hari berturut"/>
          <div className="w-px h-8 bg-white/[0.12]"/>
          <Stat num="3"  label="Percakapan"/>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3.5 pb-24">
        <SectionLabel>Umum</SectionLabel>
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] overflow-hidden mb-3.5">
          <SettingRow icon={<Settings size={16}/>} label="Pengaturan lengkap" onClick={() => router.push("/settings")} last/>
        </div>
        <SectionLabel>Preferensi</SectionLabel>
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] overflow-hidden mb-3.5">
          <SettingRow icon={<Languages size={16}/>} label="Bahasa isyarat"    value="BISINDO"/>
          <SettingRow icon={<Moon size={16}/>}      label="Tampilan gelap"    toggle toggleOn/>
          <SettingRow icon={<Bell size={16}/>}      label="Notifikasi belajar" toggle toggleOn last/>
        </div>
        <SectionLabel>Aksesibilitas</SectionLabel>
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] overflow-hidden mb-3.5">
          <SettingRow icon={<Accessibility size={16}/>} label="Pengaturan aksesibilitas" onClick={() => router.push("/accessibility")}/>
          <SettingRow icon={<Type size={16}/>}          label="Ukuran teks"               value="Sedang" last/>
        </div>
        <SectionLabel>Akun</SectionLabel>
        <div className="bg-white border border-[#E8E6E0] rounded-[14px] overflow-hidden mb-3.5">
          <SettingRow icon={<Download size={16}/>} label="Unduh konten offline"/>
          <SettingRow icon={<LogOut size={16}/>}   label="Keluar" iconBg="bg-[#FDEAEA]" iconColor="text-[#8B1A1A]" labelColor="text-[#8B1A1A]" last onClick={() => router.push("/auth")}/>
        </div>
      </div>
      <BottomNav/>
    </div>
  );
}
