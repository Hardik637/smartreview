"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
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
  Copy,
  Check,
  Play,
  QrCode,
  Layers,
  Cpu,
  Database,
  Lock,
  ExternalLink,
  GraduationCap,
  Github,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [copiedSample, setCopiedSample] = useState(false);

  // Close pricing dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPricingDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopySample = () => {
    const text =
      "Absolutely phenomenal coffee and welcoming atmosphere at The Coffee House! The specialty brew was rich and fragrant, and the artisan pastries were fresh. Exemplary customer service throughout!";
    navigator.clipboard.writeText(text);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2500);
  };

  const faqs = [
    {
      q: "What is SmartReview and what problem does it address?",
      a: "SmartReview is an AI-powered customer review acceleration and reputation management platform developed as a college minor project. It eliminates customer 'writer's block' by providing contextual keyword-driven AI review generation for satisfied patrons, while deflecting critical complaints into private feedback channels before they harm public business ratings.",
    },
    {
      q: "How does the AI Review Generator work?",
      a: "When a customer rates an experience 4 or 5 stars, the system displays quick category-specific tags (e.g., 'Fresh Pastries', 'Friendly Staff', 'Fast Service'). Google Gemini AI (with a zero-cost local NLP fallback) instantaneously constructs an authentic, natural paragraph weaving in those key phrases, ready for 1-click copy to Google Reviews.",
    },
    {
      q: "How does private feedback deflection work?",
      a: "If a customer indicates an issue by selecting 1, 2, or 3 stars, SmartReview gracefully routes them to an internal customer satisfaction form. The complaint is stored securely in the business feedback database and alerts the business owner immediately, preventing public 1-star reviews.",
    },
    {
      q: "Does SmartReview comply with Google Review policies?",
      a: "Yes. SmartReview is fully policy compliant. Customers always retain access to post directly to Google Reviews if they choose, and the system never offers prohibited monetary incentives or gifts in exchange for ratings.",
    },
    {
      q: "What technologies were used to engineer this project?",
      a: "The project is engineered with Next.js 14 (App Router & Server Actions), TypeScript, Tailwind CSS, Prisma ORM (SQLite / PostgreSQL), Google Gemini AI API, Razorpay payment gateway integration, Lucide React icons, and deployed on Vercel.",
    },
  ];

  return (
    <div className="academic-bg min-h-screen text-slate-900 font-sans selection:bg-[#173B67] selection:text-white relative overflow-x-hidden">
      {/* Blueprint grid subtle pattern */}
      <div className="academic-grid absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-80" />

      {/* Ambient background soft glow */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[#3478C8]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-[5%] w-[450px] h-[450px] bg-[#173B67]/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Academic Banner */}
      <div className="w-full bg-[#173B67] text-white text-xs py-2 px-4 text-center font-medium border-b border-[#235FA9]/40 flex items-center justify-center gap-2">
        <GraduationCap className="w-4 h-4 text-[#93C5FD]" />
        <span>
          <strong>College Minor Project:</strong> SmartReview — AI-Powered Customer Review Management System by Hardik
        </span>
        <a
          href="https://github.com/Hardik637/smartreview"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[#BFDBFE] hover:text-white underline ml-2 text-[11px]"
        >
          <Github className="w-3 h-3" /> GitHub Repo
        </a>
      </div>

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
            <a href="#architecture" className="hover:text-[#173B67] transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-[#173B67] transition-colors">Pricing</a>
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
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                System Architecture
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                Pricing Plans
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
            {/* Academic Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#3478C8] animate-pulse" />
              <span>College Minor Project • AI & Cloud Architecture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              AI-Powered Customer <br />
              <span className="text-[#173B67]">Review Acceleration</span> & <br />
              <span className="text-[#3478C8]">Feedback Deflection</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Turn satisfied visitors into articulate 5-star Google Reviews with generative AI assistance, while deflecting critical feedback into a private resolution channel.
            </p>

            {/* Key Value Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>Zero Review Writer’s Block</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>Private Feedback Gatekeeping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3478C8]" />
                <span>Printable QR Standees</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-3">
              {/* Primary Call to Action */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setPricingDropdownOpen(!pricingDropdownOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-sm font-bold shadow-subtle hover:shadow transition-all"
                >
                  <span>Explore Subscription Plans</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${pricingDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Popover Options */}
                <AnimatePresence>
                  {pricingDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 right-0 sm:right-auto sm:w-72 mt-2 bg-white border border-slate-200 rounded-xl p-2.5 shadow-elevated z-50 space-y-1.5 text-left"
                    >
                      <Link
                        href="/signup?plan=18m"
                        onClick={() => setPricingDropdownOpen(false)}
                        className="block p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-xs font-bold text-slate-900">Standard Plan • ₹1,999</p>
                        <p className="text-[11px] text-slate-500">18 Months License • QR & AI</p>
                      </Link>
                      <Link
                        href="/signup?plan=24m"
                        onClick={() => setPricingDropdownOpen(false)}
                        className="block p-2.5 rounded-lg bg-blue-50/60 hover:bg-blue-50 transition-colors border border-blue-100"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#173B67]">Pro Plan • ₹2,499</p>
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#3478C8] text-white px-1.5 py-0.5 rounded">Popular</span>
                        </div>
                        <p className="text-[11px] text-slate-600">24 Months License • Unlimited Standees</p>
                      </Link>
                      <Link
                        href="/signup?plan=48m"
                        onClick={() => setPricingDropdownOpen(false)}
                        className="block p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-xs font-bold text-slate-900">Enterprise Plan • ₹3,499</p>
                        <p className="text-[11px] text-slate-500">48 Months License • Multi-Counter</p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Demo button */}
              <Link
                href="/r/the-coffee-house"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold border border-slate-300 shadow-subtle transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#3478C8]" />
                <span>Test Live Customer Funnel</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive System Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-card space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#173B67]/10 flex items-center justify-center text-[#173B67]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#173B67]">SmartReview AI Engine</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Interactive Prototype Preview</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ready
                </span>
              </div>

              {/* Simulated Customer Experience */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Customer Rating</span>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Selected Keyword Tags */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Selected Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Specialty Coffee", "Artisan Pastries", "Cozy Ambience", "Fast WiFi"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold bg-[#F0F4F9] text-[#173B67] border border-[#C3D3E7] px-2.5 py-1 rounded-lg"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Review Output Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#173B67] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#3478C8]" /> Generated Draft
                    </span>
                    <span className="text-slate-400">Tone: Natural</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &quot;Absolutely phenomenal coffee and welcoming atmosphere at The Coffee House! The specialty brew was rich and fragrant, and the artisan pastries were fresh. Exemplary customer service throughout!&quot;
                  </p>
                </div>

                {/* Action button in preview */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopySample}
                    className="flex-1 py-2.5 px-3 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedSample ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 1-Click Copy & Go to Google
                      </>
                    )}
                  </button>
                  <Link
                    href="/r/the-coffee-house"
                    className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                    title="Open live funnel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
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
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Workflow Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How the Review Funnel Operates</h2>
          <p className="text-sm text-slate-600">
            A frictionless customer experience engineered to maximize Google Reviews while protecting private brand reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#173B67] text-white flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Instant QR Scan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Customers scan your tabletop QR standee or tap the NFC token at billing counters using any smartphone camera without app installation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#3478C8] text-white flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Smart Sentiment Routing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Satisfied patrons (4–5 stars) unlock the AI review generator. Critical patrons (1–3 stars) are routed to a private feedback inbox to resolve issues directly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-[#173B67] text-white flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">3. 1-Click Google Publish</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Google Gemini constructs an articulate review based on customer-selected tags. The customer copies it with one tap and pastes it straight to Google Reviews.
            </p>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SYSTEM ARCHITECTURE & ACADEMIC HIGHLIGHTS
        ========================================================================
      */}
      <section id="architecture" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200/70">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Technical Implementation</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">System Architecture & Tech Stack</h2>
          <p className="text-sm text-slate-600">
            Engineered with modern full-stack web technologies and cloud best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#173B67] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Next.js 14 & TypeScript</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              App Router architecture with Server Components, optimized API endpoints, and end-to-end type safety.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#3478C8] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Google Gemini AI Engine</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrated `@google/generative-ai` with hybrid zero-cost local NLP fallback for fast response times.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Prisma ORM & SQLite</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Relational data modeling supporting businesses, review sessions, customer feedback, and analytics metrics.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Security & Rate Limiting</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              JWT session cookies, bcrypt password hashing, and token bucket API rate-limiting against automated abuse.
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
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Platform Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Core Features Built for Real Impact</h2>
          <p className="text-sm text-slate-600">
            A comprehensive suite of tools designed to elevate local business reputation management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Contextual Generator</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automatically embeds specific service keywords into authentic paragraphs, signaling relevance to Google&apos;s local search ranking algorithms.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">QR Studio & PDF Generation</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Create and export print-ready 4&quot; x 6&quot; acrylic standees, table tents, and flyers formatted for commercial print shops directly from your browser.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Analytics & Conversion Tracking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Real-time dashboards monitor scans, generated reviews, Google click-through rates, and frequent keyword topics.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Private Feedback Inbox</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Manage unhappy customer submissions with status tracking (Unread / Resolved) and direct customer contact details.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Policy-Compliant Gatekeeper</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% compliant with Google Review guidelines. All users retain direct access to public review submission if desired.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F9] text-[#173B67] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Category Support</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pre-configured topic profiles for Cafes, Restaurants, Salons, Clinics, Gyms, Auto Services, and Sweet Shops.
            </p>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        PRICING & SUBSCRIPTION SECTION
        ========================================================================
      */}
      <section id="pricing" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-200/70">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3478C8]">Transparent Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Simple, Upfront Project Plans</h2>
          <p className="text-sm text-slate-600">
            Zero hidden fees or recurring subscriptions. Integrated with Razorpay test gateway for grading demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Standard License</h3>
                <p className="text-xs text-slate-500">Ideal for single table or counter</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">₹1,999</span>
                <span className="text-xs text-slate-500">/ 18 months</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 pt-2">
                <li className="flex items-center gap-2">✓ 18 Months Full Access</li>
                <li className="flex items-center gap-2">✓ AI Review Generation</li>
                <li className="flex items-center gap-2">✓ Digital QR Code</li>
                <li className="flex items-center gap-2">✓ Analytics Dashboard</li>
                <li className="flex items-center gap-2">✓ Private Feedback Inbox</li>
              </ul>
            </div>
            <Link
              href="/signup?plan=18m"
              className="w-full py-3 text-center text-xs font-bold text-[#173B67] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Select Standard
            </Link>
          </div>

          {/* Plan 2: Highlighted */}
          <div className="bg-white border-2 border-[#173B67] rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#173B67] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#173B67]">Pro License</h3>
                <p className="text-xs text-slate-500">Best for active retail & cafes</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">₹2,499</span>
                <span className="text-xs text-slate-500">/ 24 months</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 pt-2">
                <li className="flex items-center gap-2 font-semibold text-slate-800">✓ 2 Full Years License</li>
                <li className="flex items-center gap-2">✓ High-Quota AI Engine</li>
                <li className="flex items-center gap-2">✓ Unlimited Printable Standees</li>
                <li className="flex items-center gap-2">✓ Advanced Sentiment Routing</li>
                <li className="flex items-center gap-2">✓ Priority Email Notifications</li>
              </ul>
            </div>
            <Link
              href="/signup?plan=24m"
              className="w-full py-3 text-center text-xs font-bold text-white bg-[#173B67] hover:bg-[#1C4982] rounded-xl shadow-subtle transition-all"
            >
              Get Started with Pro
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Enterprise License</h3>
                <p className="text-xs text-slate-500">Multi-table & chain locations</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">₹3,499</span>
                <span className="text-xs text-slate-500">/ 48 months</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 pt-2">
                <li className="flex items-center gap-2">✓ 4 Full Years License</li>
                <li className="flex items-center gap-2">✓ Maximum AI Quota</li>
                <li className="flex items-center gap-2">✓ Multi-Counter QR Generation</li>
                <li className="flex items-center gap-2">✓ Custom Keyword Management</li>
                <li className="flex items-center gap-2">✓ Dedicated Support Channel</li>
              </ul>
            </div>
            <Link
              href="/signup?plan=48m"
              className="w-full py-3 text-center text-xs font-bold text-[#173B67] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Select Enterprise
            </Link>
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
              SmartReview &copy; 2026 • College Minor Project by <strong>Hardik</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <Link href="/privacy" className="hover:text-[#173B67] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#173B67] transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-[#173B67] transition-colors">Refund Policy</Link>
            <a
              href="https://github.com/Hardik637/smartreview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#173B67] transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
