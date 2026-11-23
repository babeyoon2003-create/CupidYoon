import type { Metadata, Viewport } from "next";
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
  title: "CupidYoon - Romantic Digital Gifts & Moments ✨",
  description: "ချစ်ရသူအတွက် တစ်သက်မမေ့နိုင်မယ့် Interactive Digital Birthday & Love Gifts",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CupidYoon",
  },
  openGraph: {
    title: "CupidYoon - Romantic Digital Gifts & Moments ✨",
    description: "ချစ်ရသူအတွက် တစ်သက်မမေ့နိုင်မယ့် အထူးလက်ဆောင်",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#140b22",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="my"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
