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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-flame.vercel.app"),
  title: {
    default: "SmartReview — AI-Powered Customer Review Management System",
    template: "%s | SmartReview",
  },
  description:
    "An AI-powered customer feedback and Google Review management system designed to make leaving reviews effortless and resolve customer feedback privately.",
  keywords: [
    "SmartReview",
    "AI review management",
    "Customer feedback system",
    "Google reviews booster",
    "QR code review standee",
    "Sentiment analysis",
    "Google Gemini AI",
  ],
  authors: [{ name: "SmartReview" }],
  creator: "SmartReview",
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
      "An AI-powered customer feedback and Google Review management system designed to make leaving reviews effortless and resolve customer feedback privately.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartReview — AI-Powered Customer Review Management System",
    description:
      "Intelligent review generation and private customer feedback management platform.",
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
