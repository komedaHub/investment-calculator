import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "投資かんたん計算 - 投資・資産運用計算サイト",
  description: "複利計算、つみたてNISA、iDeCo、住宅ローンなど、投資・資産運用に関する計算を簡単に行える実用ツール集。将来の資産形成をシミュレーションして賢い投資計画を立てましょう。",
  keywords: ["投資計算", "複利計算", "つみたてNISA", "iDeCo", "住宅ローン", "資産運用", "シミュレーション"],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "投資かんたん計算 - 投資・資産運用計算サイト",
    description: "複利計算、つみたてNISA、iDeCo、住宅ローンなど、投資・資産運用に関する計算を簡単に行える実用ツール集",
    type: "website",
    locale: "ja_JP",
    url: "https://example.com",
    siteName: "投資かんたん計算",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "投資かんたん計算 - 投資・資産運用計算ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "投資かんたん計算 - 投資・資産運用計算サイト",
    description: "複利計算、つみたてNISA、iDeCo、住宅ローンなど、投資・資産運用に関する計算を簡単に行える実用ツール集",
    images: ["/twitter-card.png"],
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
      <head>
        <StructuredData type="home" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
