"use client";

import { useState } from "react";

export default function DictionaryPage() {
  const [query, setQuery] = useState("");

  const dictionary: Record<string, string> = {
    "1": "Halo",
    "2": "Terima Kasih",
    "3": "Tolong",
    "4": "Ya",
    "5": "Tidak",
  };

  const result = dictionary[query];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[400px]">
        <h1 className="text-xl font-bold text-center mb-4">
          Dictionary
        </h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari gesture (contoh: 1)"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="mt-4">
            <h2 className="font-semibold mb-2">Daftar Gesture</h2>
            <ul className="text-sm space-y-1">
                {Object.entries(dictionary).map(([key, value]) => (
                <li key={key}>
                    {key} → {value}
                </li>
                ))}
            </ul>
        </div>

        {result ? (
          <p className="text-center text-lg">
            Arti: <strong>{result}</strong>
          </p>
        ) : query ? (
          <p className="text-center text-red-500">
            Tidak ditemukan
          </p>
        ) : null}
      </div>
    </div>
  );
}