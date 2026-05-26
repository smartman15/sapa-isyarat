"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Users, Globe, Award, Shield, Zap, Code } from "lucide-react";

const FEATURES = [
  { icon:<Zap size={24}/>,    title:"Real-time AI",    description:"Deteksi isyarat tangan dengan teknologi AI terkini",    color:"from-[#FFD700] to-[#FFA500]" },
  { icon:<Globe size={24}/>,  title:"BISINDO",         description:"300+ kata dan frasa Bahasa Isyarat Indonesia",           color:"from-[#4A90E2] to-[#6CAEE4]" },
  { icon:<Shield size={24}/>, title:"Privasi Terjaga", description:"Data Anda aman dan terenkripsi",                         color:"from-[#69B578] to-[#4CAF50]" },
  { icon:<Heart size={24}/>,  title:"Inklusif",        description:"Dirancang dengan aksesibilitas WCAG AA",                  color:"from-[#F4A07A] to-[#E89566]" },
];

const TEAM = [
  { role:"Product Design", name:"UI/UX Designer"               },
  { role:"Development",    name:"Full Stack Developer"          },
  { role:"AI/ML",          name:"Machine Learning Engineer"     },
  { role:"Community",      name:"Deaf Community Liaison"        },
];

const TECH = ["React Native","TensorFlow","Computer Vision","Speech Recognition","Cloud AI"];
const LINKS = ["Kebijakan Privasi","Syarat & Ketentuan","Lisensi Open Source","Hubungi Kami"];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6]">
      {/* Header — gradient hero */}
      <div className="bg-gradient-to-br from-[#1B1F3B] via-[#2D335E] to-[#F4A07A] px-5 pt-5 pb-20 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 flex px-6 pt-3">
          <span className="text-xs font-semibold text-white/80">9:41</span>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"/>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"/>

        <div className="flex items-center gap-3 mt-8 mb-8 relative z-10">
          <button onClick={() => router.back()} className="text-white/90"><ArrowLeft size={22}/></button>
        </div>

        {/* App identity */}
        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="24" fill="white" opacity="0.2"/>
              <path d="M28 18C28 18 32 22 32 28C32 34 28 38 28 38M24 28C24 28 20 24 20 20C20 16 24 12 28 12C32 12 36 16 36 20C36 24 32 28 32 28"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="20" r="3" fill="#F4A07A"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{letterSpacing:"-0.8px"}}>Sapa Isyarat</h1>
          <p className="text-white/70 text-sm mb-1">Jembatan Komunikasi Inklusif</p>
          <p className="text-white/50 text-xs">Versi 1.0.0</p>
        </div>
      </div>

      {/* Scrollable content — overlaps header */}
      <div className="flex-1 overflow-y-auto -mt-12 px-4 pb-6">
        {/* Mission */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-4 border border-[#E8E6E0]">
          <h2 className="text-xl font-bold text-[#1B1F3B] mb-3">Misi Kami</h2>
          <p className="text-sm text-[#6B7194] leading-relaxed mb-4">
            Sapa Isyarat hadir untuk menjembatani komunikasi antara komunitas Tuli dan komunitas pendengar
            di Indonesia. Kami percaya bahwa setiap orang berhak untuk berkomunikasi dengan mudah, tanpa hambatan.
          </p>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#FDEEE6] to-[#F4F0E8] rounded-xl p-3">
            <Heart size={20} className="text-[#F4A07A] flex-shrink-0"/>
            <p className="text-xs text-[#1B1F3B] font-medium">Dibuat dengan cinta untuk komunitas Tuli Indonesia</p>
          </div>
        </div>

        {/* Features grid */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#1B1F3B] mb-3 px-1">Fitur Unggulan</h3>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((f,i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E6E0]">
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-white mb-3 shadow-md`}>{f.icon}</div>
                <h4 className="font-semibold text-[#1B1F3B] text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-[#6B7194] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#1B1F3B] mb-3 px-1">Tim Kami</h3>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E6E0]">
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} className="text-[#F4A07A]"/>
              <span className="text-sm font-semibold text-[#1B1F3B]">Dibuat oleh tim multidisiplin</span>
            </div>
            <div className="space-y-3">
              {TEAM.map((m,i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#F4A07A] rounded-full"/>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#1B1F3B]">{m.role}</div>
                    <div className="text-xs text-[#6B7194]">{m.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mb-4">
          <div className="bg-gradient-to-br from-[#FDEEE6] to-[#F4F0E8] rounded-2xl p-5 border border-[#F4A07A]/30">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#F4A07A] rounded-xl flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-white"/>
              </div>
              <div>
                <h4 className="font-semibold text-[#1B1F3B] mb-2">Penghargaan</h4>
                <ul className="space-y-1.5 text-xs text-[#6B7194]">
                  <li>🏆 Best Inclusive App 2026</li>
                  <li>🌟 Social Impact Innovation Award</li>
                  <li>♿ WCAG AA Accessibility Certified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E6E0]">
            <div className="flex items-center gap-2 mb-3">
              <Code size={20} className="text-[#1B1F3B]"/>
              <h4 className="font-semibold text-[#1B1F3B]">Teknologi</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH.map(t => (
                <span key={t} className="px-3 py-1.5 bg-[#EEF0F6] text-[#1B1F3B] rounded-full text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          {LINKS.map(l => (
            <button key={l} className="w-full bg-white border border-[#E8E6E0] rounded-xl p-3 flex items-center justify-between text-sm text-[#1B1F3B] font-medium hover:bg-[#FAF9F6] transition-colors">
              {l}<span className="text-[#C8C5BE]">→</span>
            </button>
          ))}
        </div>

        <div className="text-center mt-6 mb-2">
          <p className="text-xs text-[#9B9890]">© 2026 Sapa Isyarat. All rights reserved.</p>
          <p className="text-xs text-[#C8C5BE] mt-1">Made with ❤️ for Indonesian Deaf Community</p>
        </div>
      </div>
    </div>
  );
}
