"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Camera, Check, RotateCcw, ArrowRight, Trophy, Target } from "lucide-react";

/* Default word list — in a real integration these would come from route state/query params */
const DEFAULT_WORDS = ["Terima kasih", "Halo", "Tolong", "Maaf", "Selamat pagi"];

export default function PracticeSessionPage() {
  const router = useRouter();

  const [words]         = useState<string[]>(DEFAULT_WORDS);
  const [currentIdx,    setCurrentIdx]    = useState(0);
  const [isDetecting,   setIsDetecting]   = useState(false);
  const [accuracy,      setAccuracy]      = useState(0);
  const [attempts,      setAttempts]      = useState(0);
  const [showResult,    setShowResult]    = useState(false);
  const [passed,        setPassed]        = useState(false);
  const [sessionDone,   setSessionDone]   = useState(false);
  const [correctCount,  setCorrectCount]  = useState(0);

  const currentWord = words[currentIdx];
  const progress    = ((currentIdx + 1) / words.length) * 100;

  /* Simulate AI accuracy climbing toward 100 */
  useEffect(() => {
    if (!isDetecting) return;
    const id = setInterval(() => {
      setAccuracy(prev => {
        const next = Math.min(prev + Math.random() * 20, 100);
        if (next >= 85) {
          setIsDetecting(false);
          setPassed(true);
          setShowResult(true);
          return 100;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [isDetecting]);

  const handleStart = () => {
    setIsDetecting(true);
    setAccuracy(0);
    setAttempts(a => a + 1);
  };

  const handleNext = () => {
    if (passed) setCorrectCount(c => c + 1);
    if (currentIdx < words.length - 1) {
      setCurrentIdx(i => i + 1);
      setAccuracy(0);
      setAttempts(0);
      setShowResult(false);
      setPassed(false);
    } else {
      setSessionDone(true);
    }
  };

  const handleRetry = () => {
    setAccuracy(0);
    setShowResult(false);
    setPassed(false);
  };

  /* ── Session complete screen ── */
  if (sessionDone) {
    const score = Math.round((correctCount / words.length) * 100);
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1B1F3B] to-[#0F1120] z-50 flex flex-col items-center justify-center p-8 text-white">
        <div className="w-24 h-24 bg-[#F4A07A] rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Trophy size={48} className="text-white"/>
        </div>
        <h2 className="text-3xl font-bold mb-2">Latihan Selesai!</h2>
        <p className="text-white/60 text-sm mb-8">Kamu berhasil menyelesaikan sesi latihan</p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          {[
            { label:"Skor",     value:`${score}%`              },
            { label:"Benar",    value:`${correctCount}/${words.length}` },
            { label:"XP",       value:`+${words.length * 10}`  },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/home")}
          className="w-full max-w-sm bg-[#F4A07A] text-white py-4 rounded-2xl font-bold text-lg shadow-2xl"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  /* ── Practice screen ── */
  const cornerColor = passed ? "border-[#69B578]" : "border-[#F4A07A]";
  const pulse       = isDetecting ? "animate-pulse" : "";

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header bar */}
      <div className="bg-gradient-to-b from-black/80 to-transparent px-5 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <X size={20} className="text-white"/>
          </button>

          <div className="flex-1 mx-4">
            <div className="flex items-center justify-between text-white text-xs mb-1">
              <span>Kata {currentIdx + 1} dari {words.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F4A07A] to-[#69B578] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="w-10"/>
        </div>

        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Praktek kata:</p>
          <h2 className="text-white text-2xl font-bold">{currentWord}</h2>
        </div>
      </div>

      {/* Camera area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1B1F3B] to-[#0F1120] relative">

        {/* Detection frame */}
        <div className="relative w-full max-w-sm aspect-[3/4] mb-6">
          {/* Animated corner markers */}
          <div className={`absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-3xl ${cornerColor} ${pulse} transition-colors`}/>
          <div className={`absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 rounded-tr-3xl ${cornerColor} ${pulse} transition-colors`}/>
          <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 rounded-bl-3xl ${cornerColor} ${pulse} transition-colors`}/>
          <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-3xl ${cornerColor} ${pulse} transition-colors`}/>

          {/* Camera placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <Camera size={80}/>
          </div>

          {/* Success overlay */}
          {showResult && passed && (
            <div className="absolute inset-0 bg-[#69B578]/90 flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={40} className="text-[#69B578]"/>
                </div>
                <p className="text-white font-bold text-xl">Sempurna!</p>
                <p className="text-white/80 text-sm mt-1">Akurasi: {accuracy.toFixed(0)}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Live accuracy bar */}
        {isDetecting && (
          <div className="w-full max-w-sm mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Akurasi Real-time</span>
                <span className="text-white font-bold text-2xl">{accuracy.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F4A07A] via-[#FFC107] to-[#69B578] rounded-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/40 text-xs">Target: 85%</span>
                <span className="text-white/40 text-xs">Percobaan: {attempts}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-3">
          {!showResult && !isDetecting && (
            <button
              onClick={handleStart}
              className="w-full bg-[#F4A07A] text-white py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2"
            >
              <Camera size={24}/>Mulai Deteksi
            </button>
          )}

          {isDetecting && (
            <button
              onClick={() => setIsDetecting(false)}
              className="w-full bg-white/20 text-white py-4 rounded-2xl font-semibold backdrop-blur-sm"
            >
              Berhenti
            </button>
          )}

          {showResult && (
            <>
              {passed ? (
                <button
                  onClick={handleNext}
                  className="w-full bg-[#69B578] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl"
                >
                  {currentIdx < words.length - 1
                    ? <><span>Lanjut ke Kata Berikutnya</span><ArrowRight size={20}/></>
                    : <><span>Selesai</span><Trophy size={20}/></>
                  }
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full bg-[#F4A07A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20}/>Coba Lagi
                </button>
              )}
              {currentIdx < words.length - 1 && (
                <button
                  onClick={handleNext}
                  className="w-full bg-white/20 text-white py-3 rounded-2xl font-semibold backdrop-blur-sm"
                >
                  Lewati Kata Ini
                </button>
              )}
            </>
          )}
        </div>

        {/* Stats footer */}
        <div className="flex gap-4 mt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-1">
              <Target size={20} className="text-white"/>
            </div>
            <p className="text-white/60 text-xs">Target</p>
            <p className="text-white font-bold text-sm">85%</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-1">
              <Trophy size={20} className="text-[#FFC107]"/>
            </div>
            <p className="text-white/60 text-xs">Reward</p>
            <p className="text-white font-bold text-sm">+{words.length * 10} XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
