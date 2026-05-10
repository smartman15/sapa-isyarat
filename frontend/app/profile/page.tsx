"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("User");
  const [textSize, setTextSize] = useState("medium");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[400px]">
        <h1 className="text-xl font-bold text-center mb-4">
          Profile Settings
        </h1>

        {/* Nama */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Nama</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Ukuran teks */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Ukuran Teks</label>
          <select
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="small">Kecil</option>
            <option value="medium">Sedang</option>
            <option value="large">Besar</option>
          </select>
        </div>

        {/* Preview */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-center">
          <p
            className={
              textSize === "small"
                ? "text-sm"
                : textSize === "large"
                ? "text-xl"
                : "text-base"
            }
          >
            Preview teks
          </p>
        </div>
      </div>
    </div>
  );
}