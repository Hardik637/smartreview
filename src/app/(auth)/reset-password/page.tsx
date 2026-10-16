"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, Loader2, RefreshCw } from "lucide-react";
import Logo from "@/components/Logo";
import { verifyFirebaseResetCode, confirmFirebasePasswordReset } from "@/lib/firebase-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const oobCode = searchParams.get("oobCode") || searchParams.get("token") || searchParams.get("code") || "";

  const [verifying, setVerifying] = useState(true);
  const [codeValid, setCodeValid] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkCode() {
      if (!oobCode) {
        setVerifying(false);
        setCodeValid(false);
        return;
      }

      const res = await verifyFirebaseResetCode(oobCode);
      if (res.valid) {
        setCodeValid(true);
        if (res.email) setUserEmail(res.email);
      } else {
        setCodeValid(false);
      }
      setVerifying(false);
    }

    checkCode();
  }, [oobCode]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await confirmFirebasePasswordReset(oobCode, newPassword);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "This password reset link is invalid or has expired.");
      }
    } catch {
      setError("Something went wrong while updating your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-card">
        <Loader2 className="w-8 h-8 animate-spin text-[#173B67] mx-auto" />
        <p className="text-xs font-semibold text-slate-600">Verifying secure password reset link...</p>
      </div>
    );
  }

  if (!codeValid) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-center shadow-card">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-slate-900">Link Invalid or Expired</h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            This password reset link is invalid or has expired. Please request a new link to reset your password.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <Link
            href="/forgot-password"
            className="w-full py-3 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs sm:text-sm font-bold shadow-subtle flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Request a new reset link</span>
          </Link>
          <Link
            href="/login"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-center shadow-card">
        <div className="w-12 h-12 bg-blue-50 text-[#173B67] rounded-full flex items-center justify-center mx-auto border border-blue-200">
          <CheckCircle2 className="w-6 h-6 text-[#3478C8]" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-slate-900">Password Updated Successfully</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Your password has been changed. You can now sign in with your new password.
          </p>
        </div>

        <Link
          href="/login"
          className="w-full py-3 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs sm:text-sm font-bold shadow-subtle flex items-center justify-center gap-2"
        >
          <span>Continue to Login</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 text-left shadow-card">
      {userEmail && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
          Resetting password for: <span className="text-slate-900 font-bold">{userEmail}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full py-3 px-4 bg-[#173B67] hover:bg-[#1C4982] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-subtle hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating Password...</span>
            </div>
          ) : (
            <>
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] academic-bg text-slate-900 font-sans selection:bg-[#173B67] selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-6 flex items-center justify-between z-10">
        <Link href="/" className="group hover:opacity-90 transition-opacity flex items-center">
          <Logo height={36} />
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-[440px] w-full mx-auto px-4 sm:px-6 py-6 my-auto z-10 space-y-5 text-center">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Enter your new password below to secure your business account.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-card">
              <Loader2 className="w-8 h-8 animate-spin text-[#173B67] mx-auto" />
              <p className="text-xs font-semibold text-slate-600">Loading...</p>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </main>

      <footer className="max-w-6xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-400 font-medium z-10 border-t border-slate-200">
        SmartReview &copy; 2026. All rights reserved.
      </footer>
    </div>
  );
}
