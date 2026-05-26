"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ChevronRight, User, Bell, Shield, Palette,
  Globe, Info, HelpCircle, LogOut, Moon, Volume2, Smartphone, Database,
} from "lucide-react";

type SettingItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  type: "navigate" | "toggle";
  value?: boolean;
  navigateTo?: string;
};

type SettingGroup = { title: string; items: SettingItem[] };

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`w-12 h-7 rounded-full relative transition-colors ${on ? "bg-[#F4A07A]" : "bg-[#C8C5BE]"}`}>
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${on ? "left-6" : "left-1"}`}/>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [s, setS] = useState({ notifications: true, darkMode: false, autoSave: true, analytics: false });

  const toggle = (id: string) => setS(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));

  const GROUPS: SettingGroup[] = [
    {
      title: "Akun",
      items: [
        { id:"profile",       icon:<User size={20}/>,       label:"Edit profil",        subtitle:"Nama, foto, dan info lainnya",         type:"navigate", navigateTo:"/profile"       },
        { id:"notifications", icon:<Bell size={20}/>,       label:"Notifikasi",          subtitle:"Kelola preferensi notifikasi",          type:"toggle",   value:s.notifications       },
      ],
    },
    {
      title: "Tampilan",
      items: [
        { id:"darkMode",      icon:<Moon size={20}/>,       label:"Mode gelap",          subtitle:"Tema antarmuka gelap",                  type:"toggle",   value:s.darkMode            },
        { id:"theme",         icon:<Palette size={20}/>,    label:"Tema warna",          subtitle:"Navy & Peach",                          type:"navigate"                              },
        { id:"accessibility", icon:<Smartphone size={20}/>, label:"Aksesibilitas",       subtitle:"Ukuran teks, kontras, haptic",          type:"navigate", navigateTo:"/accessibility" },
      ],
    },
    {
      title: "Aplikasi",
      items: [
        { id:"language",      icon:<Globe size={20}/>,      label:"Bahasa",              subtitle:"Bahasa Indonesia",                      type:"navigate"                              },
        { id:"autoSave",      icon:<Database size={20}/>,   label:"Simpan otomatis",     subtitle:"Simpan progress secara otomatis",       type:"toggle",   value:s.autoSave            },
        { id:"audio",         icon:<Volume2 size={20}/>,    label:"Audio",               subtitle:"Volume dan efek suara",                 type:"navigate"                              },
      ],
    },
    {
      title: "Privasi & Keamanan",
      items: [
        { id:"privacy",       icon:<Shield size={20}/>,     label:"Privasi",             subtitle:"Data dan izin aplikasi",                type:"navigate"                              },
        { id:"analytics",     icon:<Info size={20}/>,       label:"Analitik",            subtitle:"Bantu kami tingkatkan aplikasi",        type:"toggle",   value:s.analytics           },
      ],
    },
    {
      title: "Bantuan",
      items: [
        { id:"help",          icon:<HelpCircle size={20}/>, label:"Pusat bantuan",       subtitle:"FAQ dan tutorial",                      type:"navigate", navigateTo:"/help"          },
        { id:"about",         icon:<Info size={20}/>,       label:"Tentang aplikasi",    subtitle:"Versi 1.0.0",                           type:"navigate", navigateTo:"/about"         },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B1F3B] via-[#2D335E] to-[#3A4275] px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A07A]/10 rounded-full -mr-16 -mt-16"/>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F4A07A]/10 rounded-full -ml-12 -mb-12"/>
        <div className="flex items-center gap-3 mt-8 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5" style={{letterSpacing:"-0.5px"}}>Pengaturan</h1>
            <p className="text-sm text-white/70">Kelola preferensi aplikasi</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-6">
        {GROUPS.map((group, gi) => (
          <div key={gi} className="mb-6">
            <h3 className="text-xs font-semibold text-[#6B7194] uppercase tracking-wider mb-2 px-1">{group.title}</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E6E0]">
              {group.items.map((item, ii) => (
                <button
                  key={item.id}
                  onClick={() => item.type === "toggle" ? toggle(item.id) : item.navigateTo && router.push(item.navigateTo)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-[#FAF9F6] transition-colors ${ii < group.items.length - 1 ? "border-b border-[#E8E6E0]" : ""}`}
                >
                  <div className="w-10 h-10 bg-[#EEF0F6] rounded-xl flex items-center justify-center text-[#1B1F3B] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold text-[#1B1F3B] text-sm">{item.label}</div>
                    {item.subtitle && <p className="text-xs text-[#6B7194] mt-0.5">{item.subtitle}</p>}
                  </div>
                  {item.type === "toggle" && <Toggle on={!!item.value}/>}
                  {item.type === "navigate" && <ChevronRight size={20} className="text-[#C8C5BE] flex-shrink-0"/>}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => router.push("/auth")}
          className="w-full bg-white border border-[#E8E6E0] rounded-2xl p-4 flex items-center justify-center gap-2 text-[#F44336] font-semibold shadow-sm"
        >
          <LogOut size={20}/>Keluar dari akun
        </button>

        <p className="text-center text-xs text-[#9B9890] mt-6">
          Sapa Isyarat v1.0.0<br/>Made with ❤️ for Indonesian Deaf Community
        </p>
      </div>
    </div>
  );
}
