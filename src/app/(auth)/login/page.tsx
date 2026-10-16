"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Auto-fill remembered email from localStorage
    try {
      const savedEmail = localStorage.getItem("smartreview_remembered_email") || localStorage.getItem("welurik_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {}

    // 2. Seamless session check: If already logged in, take straight to dashboard
    fetch("/api/business/me")
      .then((r) => {
        if (r.ok) return r.json();
        return null;
      })
      .then((d) => {
        if (d && d.success && d.business) {
          const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
          const fromRoute = params?.get("from");
          window.location.href = fromRoute || "/dashboard";
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (typeof window !== "undefined") {
      try {
        if (rememberMe && email.trim()) {
          localStorage.setItem("smartreview_remembered_email", email.trim());
        } else {
          localStorage.removeItem("smartreview_remembered_email");
        }
      } catch {}
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("smartreview_dashboard_cache");
            sessionStorage.removeItem("welurik_dashboard_cache");
          } catch {}
        }
        const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        const fromRoute = params?.get("from");
        window.location.href = fromRoute || data.redirect || "/dashboard";
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch {
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] academic-bg text-slate-900 font-sans selection:bg-[#173B67] selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Top Brand Header */}
      <header className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-6 flex items-center justify-between z-10">
        <Link href="/" className="group hover:opacity-90 transition-opacity flex items-center">
          <Logo height={36} />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">New to SmartReview?</span>
          <Link
            href="/signup"
            className="text-xs font-bold text-[#173B67] px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-subtle transition-all"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Centered Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="w-full max-w-[420px] bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sign In to SmartReview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Access your business dashboard, QR standees, & analytics
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@yourbusiness.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3478C8] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700" htmlFor="password">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-[#3478C8] hover:text-[#173B67] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3478C8] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#173B67] rounded border-slate-300 focus:ring-[#3478C8]"
                />
                <span>Remember my email</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-subtle hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign-in & Academic Assurance */}
          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                Or continue with
              </span>
            </div>

            <div className="pt-2">
              <GoogleAuthButton text="Sign in with Google" />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3478C8]" />
              <span>256-Bit Encrypted JWT Session Authentication</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 z-10">
        SmartReview &copy; 2026. All rights reserved.
      </footer>
    </div>
  );
}
