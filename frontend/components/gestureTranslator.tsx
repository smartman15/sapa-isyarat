"use client";

import { useRef, useState, useCallback } from "react";
import { useHandDetection, LandmarkPoint } from "@/hooks/useHandDetection";
import { useGestureBuffer } from "@/hooks/useGestureBuffer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const CONFIDENCE_THRESHOLD = 0.5;
const FETCH_INTERVAL_MS = 100; // throttle to ~10 req/sec

type Mode = "SIBI" | "BISINDO";
type TTSMode = "auto" | "manual";

export default function GestureTranslator() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFetchRef = useRef<number>(0);

  const [mode, setMode] = useState<Mode>("BISINDO");
  const [ttsMode, setTtsMode] = useState<TTSMode>("manual");
  const [transcript, setTranscript] = useState<string>("");
  const [lastLabel, setLastLabel] = useState<string>("");
  const [status, setStatus] = useState<string>("Starting camera...");

  const speak = useCallback((text: string) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const handleGesture = useCallback(
    (label: string) => {
      setTranscript((prev) => (prev ? `${prev} ${label}` : label));
      setLastLabel(label);
      if (ttsMode === "auto") speak(label);
    },
    [ttsMode, speak]
  );

  const { pushLabel, reset } = useGestureBuffer({
    threshold: 10,
    onGesture: handleGesture,
  });

  const handleLandmarks = useCallback(
    async (hands: LandmarkPoint[][]) => {
      // Throttle: skip if last fetch was too recent
      const now = Date.now();
      if (now - lastFetchRef.current < FETCH_INTERVAL_MS) return;
      lastFetchRef.current = now;

      try {
        const res = await fetch(`${API_URL}/gesture/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hands, mode }),
        });

        if (!res.ok) {
          // Try to parse a human-readable detail from the response
          try {
            const err = await res.json();
            const detail = err?.detail ?? `Backend error ${res.status}`;
            setStatus(`Error: ${detail}`);
          } catch {
            setStatus(`Backend error: ${res.status}`);
          }
          return;
        }

        const data: { label: string; confidence: number } = await res.json();

        if (data.confidence >= CONFIDENCE_THRESHOLD) {
          pushLabel(data.label);
          setStatus(`Detecting (${mode})... last: "${data.label}" (${(data.confidence * 100).toFixed(0)}%)`);
        } else {
          setStatus(`Detecting (${mode})... low confidence`);
        }
      } catch {
        setStatus("⚠️ Backend unreachable — make sure the server is running");
      }
    },
    [mode, pushLabel]
  );

  useHandDetection(videoRef, canvasRef, { onLandmarks: handleLandmarks });

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    reset(); // clear the stability buffer when switching modes
  };

  const handleClear = () => {
    setTranscript("");
    setLastLabel("");
    reset();
  };

  return (
    <div>
      <p>{status}</p>

      {/* Mode toggle */}
      <div>
        <span>Sign Language: </span>
        <button
          onClick={() => handleModeChange("SIBI")}
          disabled={mode === "SIBI"}
        >
          SIBI
        </button>
        <button
          onClick={() => handleModeChange("BISINDO")}
          disabled={mode === "BISINDO"}
        >
          BISINDO
        </button>
      </div>

      {/* TTS mode toggle */}
      <div>
        <span>Speech: </span>
        <button
          onClick={() => setTtsMode("auto")}
          disabled={ttsMode === "auto"}
        >
          Auto
        </button>
        <button
          onClick={() => setTtsMode("manual")}
          disabled={ttsMode === "manual"}
        >
          Manual
        </button>
      </div>

      {/* Camera feed — video is hidden, canvas shows the annotated output */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          width={640}
          height={480}
          style={{ display: "none" }}
          playsInline
          muted
        />
        <canvas ref={canvasRef} width={640} height={480} />
      </div>

      {/* Transcript */}
      <div>
        <p>
          <strong>Transcript:</strong>{" "}
          {transcript || "(no gesture confirmed yet)"}
        </p>
        {lastLabel && (
          <p>
            <strong>Last gesture:</strong> {lastLabel}
          </p>
        )}
        <button
          onClick={() => speak(transcript)}
          disabled={!transcript || ttsMode === "auto"}
        >
          🔊 Speak
        </button>
        <button onClick={handleClear} disabled={!transcript}>
          Clear
        </button>
      </div>
    </div>
  );
}
