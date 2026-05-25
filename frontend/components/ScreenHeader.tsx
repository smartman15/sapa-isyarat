"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  /** Override back destination; default is router.back() */
  backHref?: string;
  /** Extra content to render on the right side */
  right?: React.ReactNode;
  /** Light variant: dark text on light background (default navy) */
  variant?: "navy" | "light";
}

export default function ScreenHeader({
  title,
  backHref,
  right,
  variant = "navy",
}: ScreenHeaderProps) {
  const router = useRouter();

  const navy  = variant === "navy";
  const bg    = navy ? "bg-[#1B1F3B]" : "bg-white border-b border-[#E8E6E0]";
  const text  = navy ? "text-white" : "text-[#1B1F3B]";
  const sub   = navy ? "text-white/50" : "text-[#6B7194]";

  return (
    <div className={`${bg} px-4 pt-5 pb-4 flex items-center gap-3 relative`}>
      {/* Status bar space */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 pt-2">
        <span className={`text-[10px] font-semibold ${sub}`}>9:41</span>
      </div>

      {/* Back button */}
      <button
        onClick={() => (backHref ? router.push(backHref) : router.back())}
        className={`mt-4 w-8 h-8 rounded-lg flex items-center justify-center ${
          navy ? "bg-white/10" : "bg-[#F4F3F0]"
        }`}
      >
        <ChevronLeft size={18} className={text} />
      </button>

      {/* Title */}
      <h1 className={`mt-4 flex-1 text-[16px] font-bold ${text}`}>{title}</h1>

      {/* Right slot */}
      {right && <div className="mt-4">{right}</div>}
    </div>
  );
}
