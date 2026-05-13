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
 * Uses the modern @mediapipe/tasks-vision package loaded from CDN to avoid
 * Next.js bundling/SSR issues. Cleans up camera stream on unmount.
 *
 * react-patterns: callback stored in ref to prevent effect restart on re-render.
 */
export function useHandDetection(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { onLandmarks, onStatusChange }: UseHandDetectionOptions
) {
  // Store callbacks in refs so the effect never needs to re-run on callback changes
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

        // Dynamic import of the modern Tasks Vision API from CDN
        // This avoids Next.js SSR bundling issues with WASM
        const vision = await import(
          // @ts-ignore — CDN import not typed
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/vision_bundle.js"
        );

        const { HandLandmarker, FilesetResolver } = vision;

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

              // Draw landmark dots
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

            // Fire callback only when hands are detected
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

    return () => {
      active = false;
      cancelAnimationFrame(animFrameId);
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoRef, canvasRef]);
}
