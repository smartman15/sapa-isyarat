"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle } from "lucide-react";
import Mascot from "@/components/Mascot";

type AuthMode = "login" | "register";

function InputField({
  icon, label, type = "text", placeholder, value, onChange, rightElement,
}: {
  icon: React.ReactNode;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] font-semibold text-[#1B1F3B] mb-1.5 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-[#6B7194]">{icon}</div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#F5F4F0] border border-[#E8E6E0] rounded-[12px] pl-10 pr-10 py-3.5 text-[14px] text-[#1B1F3B] placeholder-[#B8B5AE] outline-none focus:border-[#1B1F3B] focus:bg-white transition-colors"
        />
        {rightElement && <div className="absolute right-3.5">{rightElement}</div>}
      </div>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [pass2, setPass2] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6] relative overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3">
        <span className="text-xs font-semibold text-[#6B7194]">9:41</span>
        <div className="flex gap-1.5 text-[#6B7194]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <path d="M0 3.5C0 3.22 0.22 3 0.5 3C2.75 3 8.5 0 8.5 0s5.75 3 8 3c0.28 0 0.5 0.22 0.5 0.5v5c0 0.28-0.22 0.5-0.5 0.5C14.25 9 8.5 12 8.5 12S2.75 9 0.5 9C0.22 9 0 8.78 0 8.5v-5z"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0" y="0" width="19" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="20" y="4" width="2" height="4" rx="0.5"/>
            <rect x="2" y="2" width="15" height="8" rx="1"/>
          </svg>
        </div>
      </div>

      {/* Navy header */}
      <div className="bg-[#1B1F3B] px-5 pt-3 pb-10 relative overflow-hidden">
        <div className="absolute -top-14 -right-14 w-[130px] h-[130px] rounded-full border-[24px] border-[#F4A07A] opacity-[0.12] pointer-events-none"/>
        <div className="absolute -bottom-8 -left-8 w-[90px] h-[90px] rounded-full border-[16px] border-[#E8C9A0] opacity-[0.10] pointer-events-none"/>
        <div className="absolute bottom-3 right-5 flex gap-2 opacity-[0.15]">
          {[0,1,2,3].map(i => <div key={i} className="w-[5px] h-[5px] rounded-full bg-[#F4A07A]"/>)}
        </div>

        <button onClick={() => router.back()} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3 relative z-10">
          <ArrowLeft size={16} className="text-white"/>
        </button>

        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="text-[11px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold">
              {isLogin ? "Selamat datang kembali" : "Bergabung sekarang"}
            </p>
            <h1 className="text-[22px] font-bold text-white leading-tight" style={{ letterSpacing: "-0.4px" }}>
              {isLogin ? "Masuk ke\nSapa Isyarat" : "Buat akun\nbaru"}
            </h1>
          </div>
          <div className="-mb-8 relative z-20">
            <Mascot size={88} mood={isLogin ? "wave" : "happy"}/>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex bg-[#F0EEE8] rounded-[12px] p-1">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all ${
                mode === m ? "bg-white text-[#1B1F3B] shadow-sm" : "text-[#6B7194]"
              }`}
            >
              {m === "login" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Google */}
        <button
          onClick={handleSubmit}
          className="w-full border border-[#E8E6E0] bg-white rounded-[12px] py-3.5 flex items-center justify-center gap-2.5 mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[13px] font-semibold text-[#1B1F3B]">Lanjutkan dengan Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#E8E6E0]"/>
          <span className="text-[11px] text-[#B8B5AE] font-medium">atau dengan email</span>
          <div className="flex-1 h-px bg-[#E8E6E0]"/>
        </div>

        {!isLogin && (
          <InputField icon={<User size={16}/>} label="Nama lengkap" placeholder="Nama kamu" value={name} onChange={setName}/>
        )}
        <InputField icon={<Mail size={16}/>} label="Email" type="email" placeholder="kamu@email.com" value={email} onChange={setEmail}/>
        <InputField
          icon={<Lock size={16}/>}
          label="Kata sandi"
          type={showPass ? "text" : "password"}
          placeholder={isLogin ? "Kata sandimu" : "Min. 8 karakter"}
          value={pass}
          onChange={setPass}
          rightElement={
            <button onClick={() => setShowPass(!showPass)} className="text-[#6B7194]">
              {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          }
        />
        {!isLogin && (
          <InputField
            icon={<Lock size={16}/>}
            label="Konfirmasi kata sandi"
            type={showPass2 ? "text" : "password"}
            placeholder="Ulangi kata sandi"
            value={pass2}
            onChange={setPass2}
            rightElement={
              <button onClick={() => setShowPass2(!showPass2)} className="text-[#6B7194]">
                {showPass2 ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            }
          />
        )}

        {isLogin && (
          <div className="text-right mb-5 -mt-2">
            <button className="text-[12px] font-semibold text-[#F4A07A]">Lupa kata sandi?</button>
          </div>
        )}

        {!isLogin && (
          <button onClick={() => setAgreed(!agreed)} className="flex items-start gap-2.5 mb-5 text-left">
            <div className={`w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5 border transition-colors ${agreed ? "bg-[#1B1F3B] border-[#1B1F3B]" : "bg-white border-[#D0CEC8]"}`}>
              {agreed && <CheckCircle size={12} className="text-white" fill="white"/>}
            </div>
            <span className="text-[12px] text-[#6B7194] leading-relaxed">
              Saya setuju dengan{" "}
              <span className="text-[#F4A07A] font-semibold">Syarat &amp; Ketentuan</span>
              {" "}dan{" "}
              <span className="text-[#F4A07A] font-semibold">Kebijakan Privasi</span>
            </span>
          </button>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || (!isLogin && !agreed)}
          className={`w-full py-[15px] rounded-[14px] font-semibold text-[14px] mb-4 transition-all ${
            loading || (!isLogin && !agreed)
              ? "bg-[#D0CEC8] text-white cursor-not-allowed"
              : "bg-[#1B1F3B] text-white shadow-lg shadow-[#1B1F3B]/20"
          }`}
          style={{ letterSpacing: "-0.15px" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Memproses...
            </span>
          ) : (
            isLogin ? "Masuk" : "Buat akun"
          )}
        </button>

        <p className="text-center text-[13px] text-[#6B7194]">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button onClick={() => setMode(isLogin ? "register" : "login")} className="text-[#1B1F3B] font-bold">
            {isLogin ? "Daftar sekarang" : "Masuk"}
          </button>
        </p>
      </div>
    </div>
  );
}
