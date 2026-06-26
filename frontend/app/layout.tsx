import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sapa Isyarat — Aplikasi Bahasa Isyarat Indonesia",
  description:
    "Aplikasi real-time untuk menerjemahkan bahasa isyarat SIBI menggunakan kamera. Membantu komunikasi antara komunitas Tuli dan pendengar di Indonesia.",
  keywords: ["bahasa isyarat", "SIBI", "tunarungu", "sign language", "Indonesia"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}