import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#173B67",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-hardik.vercel.app"),
  title: {
    default: "SmartReview — AI-Powered Customer Review Management System",
    template: "%s | SmartReview",
  },
  description:
    "College Minor Project: An AI-powered customer feedback and Google Review acceleration system designed to eliminate review friction and intelligently manage customer sentiment.",
  keywords: [
    "SmartReview",
    "AI review management",
    "Customer feedback system",
    "Google reviews booster",
    "College Minor Project",
    "QR code review standee",
    "Sentiment analysis",
    "Google Gemini AI",
    "Hardik637",
  ],
  authors: [{ name: "Hardik", url: "https://github.com/Hardik637" }],
  creator: "Hardik",
  publisher: "SmartReview",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SmartReview",
    title: "SmartReview — AI-Powered Customer Review Management System",
    description:
      "College Minor Project: An AI-powered customer feedback and Google Review acceleration system designed to eliminate review friction and intelligently manage customer sentiment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartReview — AI-Powered Customer Review Management System",
    description:
      "College Minor Project: AI-powered review generator and sentiment routing platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans antialiased selection:bg-[#173B67] selection:text-white">
        {children}
      </body>
    </html>
  );
}
