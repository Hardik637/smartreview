"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans flex flex-col justify-between p-6 relative selection:bg-[#173B67] selection:text-white">
      {/* Top Brand Nav */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 py-4">
        <Link href="/" className="group hover:opacity-85 transition-opacity">
          <Logo className="h-8 sm:h-9" />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-[#173B67] hover:text-[#3478C8] flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white shadow-xs"
        >
          <Home className="w-3.5 h-3.5" /> Back Home
        </Link>
      </header>

      {/* Main 404 Card */}
      <main className="max-w-md w-full mx-auto my-auto text-center space-y-6 z-10">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-card space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-[#173B67]">
            <Sparkles className="w-3.5 h-3.5 text-[#3478C8]" /> Page Not Found
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold text-[#173B67] tracking-tight">
            404
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            The review page or dashboard route you're looking for doesn't exist or has been moved.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-[#173B67] hover:bg-[#0F2643] text-white font-bold rounded-xl text-xs shadow-card transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
            </Link>
            <Link
              href="/r/the-coffee-house"
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200 transition-all"
            >
              View Demo Funnel
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-slate-500 font-medium py-4 z-10">
        SmartReview — AI-Powered Customer Review Management System • College Minor Project
      </footer>
    </div>
  );
}
