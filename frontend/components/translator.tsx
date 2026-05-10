"use client";

import { useState } from "react";
import { translateGesture } from "@/lib/api";

export default function Translator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleTranslate = async () => {
    const data = await translateGesture(input);
    setResult(data.result);
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan gesture"
      />

      <button onClick={handleTranslate}>
        Translate
      </button>

      <p>Hasil: {result}</p>
    </div>
  );
}