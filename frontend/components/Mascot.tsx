"use client";

/**
 * Isya — maskot resmi Sapa Isyarat
 * Body peach (#F4A07A) so it pops on both navy and light backgrounds.
 *
 * Moods:
 *  wave      — satu tangan melambai (default)
 *  happy     — dua tangan ke atas, mulut lebar
 *  peace     — peace sign
 *  thinking  — tangan di dagu, ada thought bubble
 *  excited   — sama seperti wave tapi senyum lebih lebar
 *  teach     — seolah sedang menjelaskan / menunjuk
 */

export type MascotMood = "wave" | "happy" | "peace" | "thinking" | "excited" | "teach";

interface MascotProps {
  size?: number;
  mood?: MascotMood;
  className?: string;
}

export function Mascot({ size = 100, mood = "wave", className = "" }: MascotProps) {
  const h = Math.round(size * 1.08);

  const C = {
    body:     "#F4A07A",
    bodyDark: "#E8934A",
    cream:    "#FDEEE6",
    navy:     "#1B1F3B",
    blush:    "#E07A40",
    white:    "#FFFFFF",
  };

  const leftArmRaised = ["wave", "happy", "excited", "peace"].includes(mood);
  const rightArmRaised = mood === "happy";

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Isya maskot Sapa Isyarat"
    >
      {/* Shadow */}
      <ellipse cx="50" cy="105" rx="22" ry="3.5" fill={C.navy} opacity="0.14" />

      {/* Body */}
      <ellipse cx="50" cy="92" rx="19" ry="13" fill={C.body} />
      <ellipse cx="50" cy="94" rx="11.5" ry="8" fill={C.cream} opacity="0.7" />

      {/* Right arm */}
      {rightArmRaised ? (
        <path d="M68 84 Q84 74 88 58" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      ) : (
        <path d="M68 86 Q82 86 85 96" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      )}
      {rightArmRaised ? (
        <>
          <circle cx="88" cy="54" r="8.5" fill={C.cream} />
          <circle cx="81.5" cy="47" r="4.5" fill={C.cream} />
          <circle cx="88" cy="44.5" r="4.5" fill={C.cream} />
          <circle cx="94.5" cy="47" r="4.5" fill={C.cream} />
        </>
      ) : (
        <circle cx="85" cy="99" r="7.5" fill={C.cream} />
      )}

      {/* Left arm */}
      {mood === "thinking" ? (
        <path d="M32 84 Q22 82 20 74" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      ) : mood === "teach" ? (
        <path d="M32 84 Q18 76 14 62" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      ) : leftArmRaised ? (
        <path d="M32 84 Q16 74 12 56" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      ) : (
        <path d="M32 88 Q20 90 18 98" stroke={C.bodyDark} strokeWidth="9" strokeLinecap="round" />
      )}

      {/* Ears */}
      <ellipse cx="24" cy="30" rx="10" ry="13.5" fill={C.bodyDark} />
      <ellipse cx="24" cy="31" rx="6" ry="8.5" fill={C.cream} />
      <ellipse cx="76" cy="30" rx="10" ry="13.5" fill={C.bodyDark} />
      <ellipse cx="76" cy="31" rx="6" ry="8.5" fill={C.cream} />

      {/* Head */}
      <circle cx="50" cy="55" r="31" fill={C.body} />

      {/* Eyes */}
      <circle cx="37" cy="50" r="10" fill={C.white} />
      <circle cx="39" cy="51.5" r="5.8" fill={C.navy} />
      <circle cx="42" cy="48" r="2.4" fill={C.white} />
      <circle cx="63" cy="50" r="10" fill={C.white} />
      <circle cx="65" cy="51.5" r="5.8" fill={C.navy} />
      <circle cx="68" cy="48" r="2.4" fill={C.white} />

      {/* Blush */}
      <circle cx="25" cy="63" r="7.5" fill={C.blush} opacity="0.35" />
      <circle cx="75" cy="63" r="7.5" fill={C.blush} opacity="0.35" />

      {/* Nose */}
      <ellipse cx="50" cy="64" rx="3.5" ry="2.5" fill={C.navy} />

      {/* Mouth */}
      {mood === "happy" || mood === "excited" ? (
        <path d="M41 70 Q50 80 59 70" stroke={C.navy} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      ) : mood === "thinking" ? (
        <path d="M44 70 Q50 73 56 70" stroke={C.navy} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M42 70 Q50 77 58 70" stroke={C.navy} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      )}

      {/* Left hand (mood-specific) */}
      {(mood === "wave" || mood === "excited") && (
        <>
          <circle cx="12" cy="52" r="9" fill={C.cream} />
          <circle cx="5.5" cy="45" r="4.8" fill={C.cream} />
          <circle cx="12" cy="42.5" r="4.8" fill={C.cream} />
          <circle cx="18.5" cy="45" r="4.8" fill={C.cream} />
        </>
      )}
      {mood === "happy" && (
        <>
          <circle cx="12" cy="52" r="9" fill={C.cream} />
          <circle cx="5.5" cy="45" r="4.8" fill={C.cream} />
          <circle cx="12" cy="42.5" r="4.8" fill={C.cream} />
          <circle cx="18.5" cy="45" r="4.8" fill={C.cream} />
        </>
      )}
      {mood === "peace" && (
        <>
          <circle cx="12" cy="52" r="9" fill={C.cream} />
          <rect x="8" y="35" width="5" height="14" rx="2.5" fill={C.cream} />
          <rect x="15" y="35" width="5" height="14" rx="2.5" fill={C.cream} />
          <circle cx="10" cy="51" r="3.5" fill={C.cream} />
          <circle cx="19" cy="51" r="3.5" fill={C.cream} />
        </>
      )}
      {mood === "thinking" && (
        <>
          <circle cx="21" cy="72" r="8.5" fill={C.cream} />
          <circle cx="14" cy="66" r="4.5" fill={C.cream} />
          <circle cx="21" cy="63.5" r="4.5" fill={C.cream} />
          <circle cx="28" cy="66" r="4.5" fill={C.cream} />
          <circle cx="36" cy="34" r="2.2" fill={C.body} opacity="0.55" />
          <circle cx="30" cy="27" r="3.2" fill={C.body} opacity="0.42" />
          <circle cx="22" cy="19" r="5" fill={C.body} opacity="0.28" />
        </>
      )}
      {mood === "teach" && (
        <>
          <circle cx="12" cy="56" r="9" fill={C.cream} />
          <rect x="3" y="43" width="5" height="15" rx="2.5" fill={C.cream} transform="rotate(-20 3 43)" />
          <circle cx="16" cy="49" r="4" fill={C.cream} />
          <circle cx="19" cy="55" r="4" fill={C.cream} />
        </>
      )}
    </svg>
  );
}

export default Mascot;
