"use client";

import { useRef } from "react";

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width="300" />
      <button onClick={startCamera}>Start Camera</button>
    </div>
  );
}