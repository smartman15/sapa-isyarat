"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home, MessageCircle, BookOpen, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Beranda",  icon: Home,          path: "/home" },
  { label: "Sapa",     icon: MessageCircle, path: "/conversation" },
  { label: "Kamus",   icon: BookOpen,       path: "/dictionary" },
  { label: "Profil",  icon: User,           path: "/profile" },
] as const;

export default function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8E6E0] flex justify-around items-center px-2 pt-3 pb-4">
      {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || pathname.startsWith(path + "/");
        return (
          <button
            key={path}
            onClick={() => router.push(path)}
            className="flex flex-col items-center gap-0.5 flex-1"
          >
            <Icon size={20} className={active ? "text-[#1B1F3B]" : "text-[#C8C5BE]"} />
            <span className={`text-[9px] ${active ? "text-[#1B1F3B] font-semibold" : "text-[#C8C5BE]"}`}>
              {label}
            </span>
            {active && <div className="w-1 h-1 rounded-full bg-[#F4A07A]" />}
          </button>
        );
      })}
    </div>
  );
}
