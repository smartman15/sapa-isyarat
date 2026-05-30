"use client";

import { useRef, useState, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type RecorderState = "idle" | "recording" | "processing" | "done" | "error";

export type STTResult = {
  transcript: string;
  language: string;
  duration_seconds: number;
  confidence: number;
};

type UseSpeechRecorderOptions = {
  /** Called when transcription succeeds. */
  onResult: (result: STTResult) => void;
  /** Called when an error occurs (recording or network). */
  onError?: (message: string) => void;
};

/**
 * Records audio via MediaRecorder, sends the blob to POST /stt/transcribe,
 * and calls onResult with the backend's transcript.
 *
 * Usage:
 *   const { state, duration, start, stop } = useSpeechRecorder({ onResult });
 */
export function useSpeechRecorder({ onResult, onError }: UseSpeechRecorderOptions) {
  const [state, setState] = useState<RecorderState>("idle");
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const timerRef         = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef        = useRef<MediaStream | null>(null);

  /** Stop the duration timer */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** Send recorded blob to the backend and call onResult */
  const sendToBackend = useCallback(
    async (blob: Blob) => {
      setState("processing");

      const formData = new FormData();
      // Use the blob's actual MIME type so the backend picks the right extension
      formData.append("file", blob, "recording.webm");

      try {
        const res = await fetch(`${API_URL}/stt/transcribe`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.detail ?? `Server error ${res.status}`);
        }

        const data: STTResult = await res.json();
        setState("done");
        onResult(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Network error";
        setState("error");
        onError?.(message);
      }
    },
    [onResult, onError]
  );

  /** Start recording — requests mic permission and begins MediaRecorder */
  const start = useCallback(async () => {
    if (state === "recording") return;

    setState("idle");
    setDuration(0);
    chunksRef.current = [];

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      const msg = "Izin mikrofon ditolak. Aktifkan akses mikrofon dan coba lagi.";
      setState("error");
      onError?.(msg);
      return;
    }

    streamRef.current = stream;

    // Prefer webm/opus (Chromium), fall back to whatever the browser supports
    const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "";

    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      // Release the mic stream
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;

      const blob = new Blob(chunksRef.current, {
        type: mimeType || "audio/webm",
      });
      sendToBackend(blob);
    };

    recorder.start();
    setState("recording");

    // Tick duration every second
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  }, [state, sendToBackend, onError]);

  /** Stop recording — triggers onstop → sendToBackend */
  const stop = useCallback(() => {
    stopTimer();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  }, [stopTimer]);

  /** Reset everything back to idle */
  const reset = useCallback(() => {
    stop();
    setState("idle");
    setDuration(0);
    chunksRef.current = [];
  }, [stop]);

  return { state, duration, start, stop, reset };
}
