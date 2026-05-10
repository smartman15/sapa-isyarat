"use client";

import { useEffect, useRef } from "react";
import type { Results, NormalizedLandmark } from "@mediapipe/hands";

export type LandmarkPoint = {
  x: number;
  y: number;
  z: number;
};

type UseHandDetectionOptions = {
  onLandmarks: (hands: LandmarkPoint[][]) => void;
};

/**
 * Initializes MediaPipe Hands, opens the webcam, and calls onLandmarks
 * on every frame where at least one hand is detected.
 *
 * Loads MediaPipe WASM files from CDN to avoid Next.js bundling issues.
 * Cleans up camera stream and animation loop on unmount.
 */
export function useHandDetection(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { onLandmarks }: UseHandDetectionOptions
) {
  // Store callback in a ref so the effect doesn't restart when it changes
  const onLandmarksRef = useRef(onLandmarks);
  useEffect(() => {
    onLandmarksRef.current = onLandmarks;
  }, [onLandmarks]);

  useEffect(() => {
    let active = true;
    let animFrameId = 0;
    let stream: MediaStream | null = null;

    async function init() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      // Dynamic import — MediaPipe uses browser APIs not available in SSR
      const { Hands } = await import("@mediapipe/hands");

      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: Results) => {
        if (!active) return;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
              for (const point of landmarks) {
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

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const detected: LandmarkPoint[][] = results.multiHandLandmarks.map(
            (hand: NormalizedLandmark[]) =>
              hand.map((lm: NormalizedLandmark) => ({ x: lm.x, y: lm.y, z: lm.z }))
          );
          onLandmarksRef.current(detected);
        }
      });

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
        });
        video.srcObject = stream;
        await video.play();

        const processFrame = async () => {
          if (!active) return;
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            await hands.send({ image: video });
          }
          animFrameId = requestAnimationFrame(processFrame);
        };
        animFrameId = requestAnimationFrame(processFrame);
      } catch (err) {
        console.error("Camera access error:", err);
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
