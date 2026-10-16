"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2, ShieldCheck, Zap, Loader2, Eye, EyeOff, Building2, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setLoading(true);
    setError("");
    setLoadingStep("Creating your business account...");

    try {
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const signupData = await signupRes.json();
      if (!signupData.success) {
        throw new Error(signupData.error || "Failed to create account");
      }

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("smartreview_remembered_email", email.trim());
          localStorage.setItem("welurik_remembered_email", email.trim());
        } catch {}
      }

      router.push("/onboarding");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong during registration");
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
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Already registered?</span>
          <Link
            href="/login"
            className="text-xs font-bold text-[#173B67] px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 shadow-subtle transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Signup Form Container */}
      <main className="max-w-[480px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 my-auto z-10 space-y-5 text-center">
        {/* Title Header */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#173B67] border border-blue-200 px-3 py-1 rounded-full shadow-subtle inline-block">
            Business Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Register Business Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Setup your business review funnel and printable QR standees
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 text-left shadow-card">
          {/* Included Features Box */}
          <div className="bg-[#F0F4F9] rounded-xl p-3.5 border border-[#C3D3E7]/60 space-y-1.5">
            <span className="text-xs font-bold text-[#173B67] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3478C8]" /> Included with your account:
            </span>
            <ul className="space-y-1 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8] shrink-0" />
                <span>Custom QR Standee & 4&quot; x 6&quot; Frame Studio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8] shrink-0" />
                <span>AI-Powered 30-Second Google Review Assistant</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8] shrink-0" />
                <span>Live Analytics Dashboard & Grievance Inbox</span>
              </li>
            </ul>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign-Up */}
          <div className="space-y-3">
            <GoogleAuthButton
              text="Sign up with Google"
              onError={(err) => setError(err)}
              onSuccess={() => setError("")}
            />

            {/* Divider */}
            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                or register with email
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Business / Owner Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. The Coffee House / John Doe"
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Business Email
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2 pt-1 text-[11.5px] text-slate-600 font-medium">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#173B67] focus:ring-[#3478C8]"
              />
              <label htmlFor="terms" className="cursor-pointer leading-tight">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="font-bold text-[#173B67] underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="font-bold text-[#173B67] underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#173B67] hover:bg-[#1C4982] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-subtle hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingStep || "Processing..."}</span>
                </div>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3478C8]" />
              <span>Step 1 of 3: Setup your business funnel</span>
            </div>
          </form>
        </div>

        {/* Bottom Sign-In Link */}
        <p className="text-xs text-slate-500 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#173B67] underline hover:text-[#3478C8]">
            Sign in here
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-4 text-center text-xs text-slate-400 font-medium z-10 flex flex-wrap items-center justify-center gap-4">
        <span>SmartReview &copy; 2026. All rights reserved.</span>
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-slate-600">Terms of Service</Link>
          <span>•</span>
          <Link href="/refund" className="hover:text-slate-600">Refund Policy</Link>
        </div>
      </footer>
    </div>
  );
}
