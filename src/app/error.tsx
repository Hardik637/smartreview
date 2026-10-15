"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans flex flex-col justify-between p-6 relative selection:bg-[#173B67] selection:text-white">
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 py-4">
        <Link href="/" className="group hover:opacity-85 transition-opacity">
          <Logo className="h-8 sm:h-9" />
        </Link>
      </header>

      {/* Main Error Box */}
      <main className="max-w-md w-full mx-auto my-auto text-center space-y-6 z-10">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#173B67] tracking-tight">
            Something Went Wrong
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            An unexpected error occurred while processing your request. Please try reloading the page.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto px-6 py-3 bg-[#173B67] hover:bg-[#0F2643] text-white font-bold rounded-xl text-xs shadow-card transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" /> Go Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-slate-500 font-medium py-4 z-10">
        SmartReview — AI-Powered Customer Review Management System • College Minor Project
      </footer>
    </div>
  );
}
