"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, ChevronLeft, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Logo from "@/components/Logo";
import { sendFirebasePasswordReset } from "@/lib/firebase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Handle resend countdown cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await sendFirebasePasswordReset(email.trim());
      if (result.success) {
        setSubmitted(true);
        setCooldown(60); // 60-second anti-abuse cooldown
      } else {
        setError(result.error || "Unable to send password reset email. Please try again.");
      }
    } catch {
      setError("Something went wrong while sending the reset email. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setError("");
    try {
      await sendFirebasePasswordReset(email.trim());
      setCooldown(60);
    } catch {
      setError("Something went wrong while sending the reset email. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] academic-bg text-slate-900 font-sans selection:bg-[#173B67] selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-6 flex items-center justify-between z-10">
        <Link href="/" className="group hover:opacity-90 transition-opacity flex items-center">
          <Logo height={36} />
        </Link>
        <Link
          href="/login"
          className="text-xs font-bold text-[#173B67] px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-subtle transition-all flex items-center gap-1.5"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </header>

      {/* Centered Recovery Container */}
      <main className="max-w-[440px] w-full mx-auto px-4 sm:px-6 py-6 my-auto z-10 space-y-5 text-center">
        {/* Title Header */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 font-medium">
            Enter your business email address to receive a secure password reset link.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 text-left shadow-card">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Business Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@yourbusiness.com"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 px-4 bg-[#173B67] hover:bg-[#1C4982] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-subtle hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-blue-50 text-[#173B67] rounded-full flex items-center justify-center mx-auto border border-blue-200">
                <CheckCircle2 className="w-6 h-6 text-[#3478C8]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Reset Link Dispatched</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  If an account exists for <span className="font-bold text-slate-900">{email}</span>, we&apos;ve sent a password reset link. Please check your inbox and spam folder.
                </p>
              </div>

              {/* Cooldown & Resend Action */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || loading}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>{cooldown > 0 ? `Resend email in ${cooldown}s` : "Resend password reset email"}</span>
                </button>

                <Link
                  href="/login"
                  className="text-xs font-bold text-[#173B67] hover:underline pt-1"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Back Link */}
        <p className="text-xs text-slate-500 font-medium">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-[#173B67] underline hover:text-[#3478C8]">
            Sign in here
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-400 font-medium z-10 border-t border-slate-200">
        SmartReview System &copy; 2026 • College Minor Project by Hardik
      </footer>
    </div>
  );
}
