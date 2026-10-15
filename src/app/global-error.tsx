"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fatal root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#F4F6F9] min-h-screen text-slate-900 font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-4 shadow-card">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-[#173B67] tracking-tight">
            System Level Error
          </h1>

          <p className="text-xs text-slate-600 font-normal leading-relaxed">
            A critical system error occurred. Please refresh the application or return shortly.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-[#173B67] hover:bg-[#0F2643] text-white font-bold rounded-xl text-xs shadow-card transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
