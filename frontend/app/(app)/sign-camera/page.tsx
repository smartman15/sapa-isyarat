"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Zap, FlipHorizontal, Camera,
  Copy, Share2, Volume2, Check, X,
} from "lucide-react";
import { useHandDetection, LandmarkPoint } from "@/hooks/useHandDetection";
import { useGestureBuffer } from "@/hooks/useGestureBuffer";

/* ─── Constants ─────────────────────────────────────────────────── */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const CONFIDENCE_THRESHOLD = 0.5;
const FETCH_INTERVAL_MS = 100; // ~10 req/sec

type Mode = "SIBI" | "BISINDO";

/* ─── Page ───────────────────────────────────────────────────────── */
export default function SignCameraPage() {
  const router = useRouter();

  /* ── Refs ── */
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFetchRef = useRef<number>(0);

  /* ── State ── */
  const [mode, setMode]             = useState<Mode>("BISINDO");
  const [transcript, setTranscript] = useState<string>("");
  const [lastLabel, setLastLabel]   = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [status, setStatus]         = useState<string>("Memulai kamera...");
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [handPoints, setHandPoints] = useState<{ x: number; y: number }[]>([]);
  const [copied, setCopied]         = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  /* ── Gesture confirmed → append to transcript ── */
  const handleGesture = useCallback((label: string) => {
    setTranscript((prev) => (prev ? `${prev} ${label}` : label));
    setLastLabel(label);
  }, []);

  const { pushLabel, reset } = useGestureBuffer({
    threshold: 8,
    onGesture: handleGesture,
  });

  /* ── Per-frame landmark handler → POST to backend ── */
  const handleLandmarks = useCallback(
    async (hands: LandmarkPoint[][]) => {
      // Show tracking dots from first hand landmarks (normalised 0-1)
      if (hands[0]) {
        setHandPoints(hands[0].map((p) => ({ x: p.x * 100, y: p.y * 100 })));
        setIsDetecting(true);
      }

      // Throttle
      const now = Date.now();
      if (now - lastFetchRef.current < FETCH_INTERVAL_MS) return;
      lastFetchRef.current = now;

      try {
        const res = await fetch(`${API_URL}/gesture/predict`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ hands, mode }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setStatus(`Error: ${err?.detail ?? res.status}`);
          return;
        }

        const data: { label: string; confidence: number } = await res.json();

        if (data.confidence >= CONFIDENCE_THRESHOLD) {
          setConfidence(Math.round(data.confidence * 100));
          pushLabel(data.label);
          setStatus(`Mendeteksi (${mode})...`);
        } else {
          setStatus(`Kepercayaan rendah (${mode})`);
          setIsDetecting(false);
        }
      } catch {
        setStatus("⚠️ Backend tidak dapat dijangkau");
        setIsDetecting(false);
      }
    },
    [mode, pushLabel]
  );

  /* ── Hand detection hook — fills canvas with camera + landmark dots ── */
  useHandDetection(videoRef, canvasRef, {
    onLandmarks: handleLandmarks,
    onStatusChange: (s) => {
      setStatus(s);
      // When camera is ready, mark detecting
      if (s.includes("Camera ready") || s.includes("Detecting")) {
        setIsDetecting(true);
      }
    },
  });

  /* ── Actions ── */
  const handleClear = () => {
    setTranscript("");
    setLastLabel("");
    setConfidence(0);
    setIsDetecting(false);
    setHandPoints([]);
    reset();
  };

  const handleCopy = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!transcript) return;
    const utter = new SpeechSynthesisUtterance(transcript);
    utter.lang = "id-ID";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  const handleModeToggle = () => {
    setMode((m) => (m === "BISINDO" ? "SIBI" : "BISINDO"));
    reset();
    setTranscript("");
    setLastLabel("");
  };

  const handleFlip = () => {
    setFacingMode((f) => (f === "user" ? "environment" : "user"));
  };

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <div className="h-full flex flex-col bg-[#0F1120]">

      {/* ── Camera View ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Real camera canvas — fills the entire camera area */}
        <video
          ref={videoRef}
          width={380}
          height={500}
          style={{ display: "none" }}
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          width={380}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
        />

        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-3 z-30">
          <span className="text-xs font-semibold text-white/70">9:41</span>
          <div className="flex gap-1.5 text-white/60">
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

        {/* Top controls */}
        <div className="absolute top-12 left-0 right-0 flex items-center justify-between px-5 z-30">
          <button
            id="sign-camera-back"
            onClick={() => router.push("/home")}
            className="w-11 h-11 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>

          <div className="flex gap-2">
            {/* Flip camera */}
            <button
              id="sign-camera-flip"
              onClick={handleFlip}
              className="w-11 h-11 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center active:scale-90 transition-transform"
            >
              <FlipHorizontal size={18} className="text-white" />
            </button>

            {/* Mode toggle (BISINDO / SIBI) */}
            <button
              id="sign-camera-mode"
              onClick={handleModeToggle}
              className="h-11 px-3 bg-black/40 backdrop-blur-xl rounded-full flex items-center gap-1.5 active:scale-90 transition-transform"
            >
              <Zap size={14} className="text-[#F4A07A]" />
              <span className="text-white text-xs font-semibold">{mode}</span>
            </button>
          </div>
        </div>

        {/* Viewfinder corner brackets */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-[260px] h-[340px]">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#F4A07A] rounded-tl-3xl animate-pulse" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#F4A07A] rounded-tr-3xl animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#F4A07A] rounded-bl-3xl animate-pulse" style={{ animationDelay: "0.4s" }} />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#F4A07A] rounded-br-3xl animate-pulse" style={{ animationDelay: "0.6s" }} />

            {/* Center guide ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-dashed border-white/30 rounded-full" />

            {/* Live landmark dots (from real MediaPipe data) */}
            {handPoints.slice(0, 21).map((point, idx) => (
              <div
                key={idx}
                className="absolute w-2 h-2 bg-[#F4A07A] rounded-full"
                style={{
                  left:           `${point.x}%`,
                  top:            `${point.y}%`,
                  opacity:        isDetecting ? 1 : 0,
                  transition:     "opacity 0.2s, left 0.05s, top 0.05s",
                  boxShadow:      "0 0 6px #F4A07A",
                  transform:      "translate(-50%, -50%)",
                  animationDelay: `${idx * 0.02}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Detection status badge */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-300 ${
            isDetecting
              ? "bg-[#F4A07A] text-[#4A2000]"
              : "bg-black/50 text-white/70 backdrop-blur-xl"
          }`}>
            <div className={`w-2 h-2 rounded-full ${isDetecting ? "bg-[#4A2000] animate-pulse" : "bg-white/40"}`} />
            <span className="text-xs font-semibold">
              {isDetecting ? "Mendeteksi gerakan..." : status}
            </span>
          </div>
        </div>

        {/* AI confidence widget */}
        {confidence > 0 && (
          <div className="absolute top-40 right-5 z-20">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{confidence}%</div>
              <div className="text-[9px] text-white/60 uppercase tracking-wider">Akurasi AI</div>
              <div className="mt-2 w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#69B578] rounded-full transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Last detected letter pill */}
        {lastLabel && (
          <div className="absolute top-40 left-5 z-20">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-3 text-center min-w-[48px]">
              <div className="text-2xl font-bold text-[#F4A07A]">{lastLabel}</div>
              <div className="text-[9px] text-white/60 uppercase tracking-wider mt-1">Terakhir</div>
            </div>
          </div>
        )}

        {/* Clear button — bottom left of camera view */}
        {transcript && (
          <button
            id="sign-camera-clear"
            onClick={handleClear}
            className="absolute bottom-10 left-5 z-20 w-11 h-11 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <X size={18} className="text-white/70" />
          </button>
        )}

        {/* Capture shutter button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            id="sign-camera-shutter"
            className="w-20 h-20 bg-[#F4A07A] rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20 active:scale-95 transition-transform"
          >
            <Camera size={32} className="text-white" />
          </button>
        </div>
      </div>

      {/* ── Translation Output — Bottom Sheet ── */}
      <div className="bg-white rounded-t-[32px] shadow-2xl flex-shrink-0">
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-[#E8E6E0] rounded-full mx-auto mt-3 mb-4" />

        <div className="px-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#1B1F3B]">Terjemahan Real-time</h2>
            {confidence > 0 && (
              <div className="bg-[#69B578]/10 text-[#69B578] px-2.5 py-1 rounded-full text-xs font-semibold">
                Akurasi {confidence}%
              </div>
            )}
          </div>

          {/* Detected transcript */}
          <div className="bg-gradient-to-br from-[#EEF0F6] to-[#FDEEE6] rounded-2xl p-4 mb-4 min-h-[64px] flex items-center">
            {transcript ? (
              <p className="text-lg text-[#1B1F3B] leading-relaxed font-medium break-words">
                {transcript}
              </p>
            ) : (
              <p className="text-sm text-[#9CA3C8] italic">
                Arahkan tangan ke kamera untuk mulai menerjemahkan...
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              id="sign-camera-copy"
              onClick={handleCopy}
              disabled={!transcript}
              className="flex-1 bg-[#1B1F3B] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Tersalin!" : "Salin Teks"}
            </button>
            <button
              id="sign-camera-speak"
              onClick={handleSpeak}
              disabled={!transcript}
              className="w-14 h-14 bg-[#EEF0F6] text-[#1B1F3B] rounded-xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
              title="Baca keras"
            >
              <Volume2 size={20} />
            </button>
            <button
              id="sign-camera-share"
              onClick={() => {
                if (!transcript) return;
                navigator.share?.({ text: transcript }).catch(() => {});
              }}
              disabled={!transcript}
              className="w-14 h-14 bg-[#EEF0F6] text-[#1B1F3B] rounded-xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
              title="Bagikan"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
