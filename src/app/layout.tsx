import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvestCalc - 投資・資産運用計算機",
  description: "複利計算、つみたてNISA、iDeCo、住宅ローンなど、投資・資産運用に関する計算を簡単に行える実用ツール集。将来の資産形成をシミュレーションして賢い投資計画を立てましょう。",
  keywords: ["投資計算", "複利計算", "つみたてNISA", "iDeCo", "住宅ローン", "資産運用", "シミュレーション"],
  authors: [{ name: "InvestCalc" }],
  openGraph: {
    title: "InvestCalc - 投資・資産運用計算機",
    description: "複利計算、つみたてNISA、iDeCo、住宅ローンなど、投資・資産運用に関する計算を簡単に行える実用ツール集",
    type: "website",
    locale: "ja_JP",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
