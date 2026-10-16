import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { RefreshCcw, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Refund Policy | SmartReview — AI Review Management System",
  description: "Refund and cancellation policy for SmartReview.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans selection:bg-[#173B67] selection:text-white flex flex-col justify-between">
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <Link href="/" className="group hover:opacity-85 transition-opacity flex items-center">
          <Logo className="h-9 sm:h-[42px]" />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-[#173B67] hover:text-[#3478C8] flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl w-full mx-auto px-6 py-12 space-y-8 flex-1">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#173B67] border border-blue-200 text-xs font-semibold">
            <RefreshCcw className="w-3.5 h-3.5 text-[#3478C8]" /> Transparent Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#173B67] tracking-tight">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-500">Last updated: 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-card text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">1. 7-Day Money-Back Guarantee</h2>
            <p>
              We want all users to be satisfied with SmartReview. If within <strong>7 days</strong> of your initial purchase you determine that our review standee and AI assistant tools do not meet your business needs, contact us for a prompt, 100% full refund.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">2. Refund Processing</h2>
            <p>
              Approved refunds are credited back to your original payment method (UPI account, credit/debit card, or bank account) via Razorpay within <strong>5–7 business days</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">3. How to Request a Refund</h2>
            <p>
              To initiate a refund, submit your Razorpay Order ID or registered business email through our support channel with the subject line "Refund Request".
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto px-6 py-8 text-center text-xs text-slate-500 border-t border-slate-200/80">
        SmartReview — AI-Powered Customer Review Management System • All rights reserved.
      </footer>
    </div>
  );
}
