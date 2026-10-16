import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | SmartReview — AI Review Management System",
  description: "Terms and conditions governing the use of SmartReview.",
};

export default function TermsOfServicePage() {
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
            <FileText className="w-3.5 h-3.5 text-[#3478C8]" /> Service Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#173B67] tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-card text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SmartReview, you agree to comply with these terms. SmartReview provides an AI-assisted customer review and feedback management platform for businesses.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">2. Google Policy Compliance</h2>
            <p>
              SmartReview provides an AI-assisted review drafting assistant and private customer grievance resolution channel. Business owners agree not to use review gating to bribe customers, solicit fake reviews, or violate Google Maps Content Policies. SmartReview does not guarantee specific star ratings or removal of organic negative reviews on Google Maps.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">3. Lifetime License Scope</h2>
            <p>
              A Lifetime License granted under the ₹1,999 deal provides perpetual software access for one business entity, including future platform updates, QR Standee generation, and a generous monthly quota of AI generations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#173B67]">4. Account Responsibility</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their credentials and for all activities that occur under their account.
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
