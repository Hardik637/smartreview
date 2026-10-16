"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Printer,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  Play,
  Cpu,
  Github,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is SmartReview and how does it help my business?",
      a: "SmartReview helps local businesses collect more 5-star Google reviews while keeping negative feedback private. Happy customers get quick review drafting assistance to post their thoughts in seconds, while unhappy customers are guided to a private feedback form so you can resolve complaints directly.",
    },
    {
      q: "How does the AI review assistant work?",
      a: "When a customer rates their experience 4 or 5 stars, they select a few quick highlights describing what they liked (such as great service, quality, or atmosphere). Google Gemini AI drafts a genuine, well-worded review that the customer can tweak and copy straight to your Google Business Profile with one tap.",
    },
    {
      q: "What happens if a customer has a complaint?",
      a: "If a customer rates 1 to 3 stars, SmartReview routes them to a private message form instead of Google. Their comments go straight to your private dashboard inbox, giving you the chance to address their concerns before they turn into a damaging public review.",
    },
    {
      q: "Is SmartReview compliant with Google Review policies?",
      a: "Yes. SmartReview is fully compliant with Google guidelines. Customers always have the option to visit your Google profile directly, and the system never offers paid incentives or rewards for reviews.",
    },
    {
      q: "How long does setup take?",
      a: "Less than 5 minutes. You can register your account, connect your Google Review link, and download your customized QR standee printables immediately.",
    },
  ];

  return (
    <div className="academic-bg min-h-screen text-slate-900 font-sans selection:bg-[#173B67] selection:text-white relative overflow-x-hidden">
      {/* Blueprint grid subtle pattern */}
      <div className="academic-grid absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-80" />

      {/* Ambient background soft glow */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[#3478C8]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[5%] w-[450px] h-[450px] bg-[#173B67]/8 rounded-full blur-[130px] pointer-events-none -z-10" />



      {/* 
        ========================================================================
        NAVBAR
        ========================================================================
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 z-40 relative">
        <header className="w-full bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3 shadow-subtle flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center">
            <Logo height={34} />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-[#173B67] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#173B67] transition-colors">Features</a>
            <a href="#faq" className="hover:text-[#173B67] transition-colors">FAQ</a>
            <Link
              href="/r/the-coffee-house"
              className="text-[#3478C8] font-bold hover:text-[#173B67] transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-current" /> Live Demo
            </Link>
          </nav>

          {/* Auth & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex text-xs font-semibold text-slate-700 hover:text-[#173B67] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-xs sm:text-[13px] font-bold text-[#173B67] hover:text-[#235FA9] px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="text-xs sm:text-[13px] font-bold text-white bg-[#173B67] hover:bg-[#1C4982] px-4 sm:px-5 py-2 rounded-xl shadow-subtle hover:shadow transition-all"
            >
              Get Started
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-elevated space-y-3 z-50"
            >
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                Project FAQ
              </a>
              <Link
                href="/r/the-coffee-house"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-[#3478C8]"
              >
                Try Customer Demo Funnel
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                Admin Dashboard
              </Link>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#173B67] rounded-xl shadow-subtle"
                >
                  Create Business Account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 
        ========================================================================
        HERO SECTION
        ========================================================================
      */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: Title & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Smart Customer Review & Reputation System</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Get More 5-Star Reviews. <br />
              <span className="text-[#173B67]">Catch Negative Feedback</span> <br />
              <span className="text-[#3478C8]">Before It Goes Public.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Make it effortless for happy customers to leave detailed Google reviews in seconds, while routing complaints straight to your private inbox to resolve.
            </p>

            {/* Key Value Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>1-Tap Google Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>Private Feedback Inbox</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>Print-Ready QR Standees</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-sm font-bold shadow-subtle hover:shadow transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Demo button */}
              <Link
                href="/r/the-coffee-house"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold border border-slate-300 shadow-subtle transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#3478C8]" />
                <span>Test Live Customer Demo</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Google Gemini AI Overview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#173B67] flex items-center justify-center text-white shadow-subtle">
                    <Sparkles className="w-5 h-5 text-[#93C5FD]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#173B67]">
                      Google Gemini AI
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Review Writing Assistant</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#173B67] border border-blue-200">
                  Smart Assistant
                </span>
              </div>

              {/* Engine Description */}
              <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                <p>
                  Most customers want to leave a good review, but don&apos;t know what to write. SmartReview uses <strong>Google Gemini AI</strong> to turn simple customer tags into genuine, complete reviews in seconds.
                </p>

                <div className="bg-[#F0F4F9] border border-[#C3D3E7]/70 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-[#3478C8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#173B67]">How It Works for Customers</h4>
                      <p className="text-[11.5px] text-slate-600 mt-0.5">
                        Customers tap a few tags highlighting what they loved (e.g. friendly staff, fast service, cozy atmosphere). Gemini writes a warm, personalized review draft they can review and copy straight to Google.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11.5px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8]" />
                    <span>Helps customers write genuine, detailed reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11.5px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8]" />
                    <span>Highlights specific services and products naturally</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11.5px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8]" />
                    <span>1-tap copy & post directly to Google</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Customer Experience</span>
                <Link
                  href="/r/the-coffee-house"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B67] hover:text-[#3478C8] transition-colors"
                >
                  <span>See How Customers Experience It</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        HOW IT WORKS: 3-STEP PIPELINE
        ========================================================================
      */}
      <section id="how-it-works" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200/70">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Simple Process</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How It Works</h2>
          <p className="text-sm text-slate-600">
            A seamless experience that turns happy customers into reviews and gives unhappy ones a direct way to be heard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#173B67] text-white flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Customer Scans QR</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Place custom QR standees on tables or checkout counters. Customers simply scan with their phone camera—no app download required.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#3478C8] text-white flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Star Rating & Routing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ratings of 4–5 stars unlock the review writing assistant. Ratings of 1–3 stars route to your private feedback inbox so you can resolve issues quickly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#173B67] text-white flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">3. 1-Tap Post to Google</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Happy customers tap a few highlights, get a well-written review draft, and paste it straight to your Google Business Profile with one tap.
            </p>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FEATURES GRID
        ========================================================================
      */}
      <section id="features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200/70">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Platform Features</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Built for Local Businesses</h2>
          <p className="text-sm text-slate-600">
            Everything you need to gather genuine reviews, handle complaints privately, and protect your reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Review Writing Assistant</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Helps customers write genuine, detailed reviews highlighting what makes your business unique and worth visiting.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Print-Ready Standees</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Download and print clean, professional acrylic standees and counter cards ready for display directly from your browser.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Real-Time Analytics</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Track customer scans, review clicks, rating averages, and popular feedback topics in one simple dashboard.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Private Feedback Inbox</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Receive customer complaints directly so you can resolve them privately before they turn into public 1-star reviews.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Google Policy Compliant</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Built strictly within Google guidelines. Customers always have the option to visit your public Google profile directly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Custom Industry Presets</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pre-configured topic presets tailored for cafes, restaurants, salons, clinics, gyms, and retail shops.
            </p>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FAQ SECTION
        ========================================================================
      */}
      <section id="faq" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200/70">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Questions & Answers</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-subtle"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-[#173B67] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                    openFaq === index ? "rotate-180 text-[#173B67]" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        FOOTER
        ========================================================================
      */}
      <footer className="w-full border-t border-slate-200 bg-white py-12 px-4 sm:px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Logo height={30} />
            <span className="hidden sm:inline text-slate-300">|</span>
            <p>
              SmartReview &copy; 2026. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <Link href="/privacy" className="hover:text-[#173B67] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#173B67] transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-[#173B67] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
