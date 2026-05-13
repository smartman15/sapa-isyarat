"use client";

import { useEffect, useRef } from "react";

export type LandmarkPoint = {
  x: number;
  y: number;
  z: number;
};

type UseHandDetectionOptions = {
  onLandmarks: (hands: LandmarkPoint[][]) => void;
  onStatusChange?: (status: string) => void;
};

/**
 * Initializes MediaPipe HandLandmarker (Tasks Vision API), opens the webcam,
 * and calls onLandmarks on every frame where at least one hand is detected.
 *
 * react-patterns: callbacks stored in refs so the effect never restarts.
 * debugger finding: Turbopack blocks import("https://...") — must use npm package.
 * Uses @mediapipe/tasks-vision npm package; WASM assets served from CDN.
 */
export function useHandDetection(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { onLandmarks, onStatusChange }: UseHandDetectionOptions
) {
  // react-patterns: store callbacks in refs to avoid restarting the effect
  const onLandmarksRef = useRef(onLandmarks);
  const onStatusChangeRef = useRef(onStatusChange);
  useEffect(() => {
    onLandmarksRef.current = onLandmarks;
  }, [onLandmarks]);
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);

  useEffect(() => {
    let active = true;
    let animFrameId = 0;
    let stream: MediaStream | null = null;

    async function init() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      try {
        onStatusChangeRef.current?.("Loading hand detection model...");

        // react-patterns: dynamic import of npm package (NOT a URL).
        // Turbopack/Webpack support package-name imports, not https:// URLs.
        const { HandLandmarker, FilesetResolver } = await import(
          "@mediapipe/tasks-vision"
        );

        // WASM binary assets are served from CDN — this is the supported approach
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );

        const handLandmarker = await HandLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
            minHandDetectionConfidence: 0.5,
            minHandPresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
          }
        );

        onStatusChangeRef.current?.("Requesting camera access...");

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
        });
        video.srcObject = stream;
        await video.play();

        onStatusChangeRef.current?.("Camera ready — detecting gestures...");

        const ctx = canvas.getContext("2d");

        const processFrame = () => {
          if (!active) return;

          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            const nowMs = performance.now();
            const results = handLandmarker.detectForVideo(video, nowMs);

            // Draw camera feed to canvas
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Draw green landmark dots on detected hands
              if (results.landmarks) {
                for (const hand of results.landmarks) {
                  for (const point of hand) {
                    ctx.beginPath();
                    ctx.arc(
                      point.x * canvas.width,
                      point.y * canvas.height,
                      4,
                      0,
                      2 * Math.PI
                    );
                    ctx.fillStyle = "#00FF00";
                    ctx.fill();
                  }
                }
              }
            }

            // Fire callback only when hands are present in frame
            if (results.landmarks && results.landmarks.length > 0) {
              const detected: LandmarkPoint[][] = results.landmarks.map(
                (hand: Array<{ x: number; y: number; z: number }>) =>
                  hand.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
              );
              onLandmarksRef.current(detected);
            }
          }

          animFrameId = requestAnimationFrame(processFrame);
        };

        animFrameId = requestAnimationFrame(processFrame);
      } catch (err) {
        console.error("Hand detection init error:", err);
        onStatusChangeRef.current?.(
          `⚠️ Camera or model error: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    init();

    // Cleanup: stop animation loop and release camera on unmount
    return () => {
      active = false;
      cancelAnimationFrame(animFrameId);
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoRef, canvasRef]);
}
