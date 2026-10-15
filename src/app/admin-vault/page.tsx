"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Users,
  Building2,
  CreditCard,
  Activity,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
  Lock,
  ArrowRight,
  Eye,
} from "lucide-react";

import Logo from "@/components/Logo";

interface BusinessData {
  name: string;
  slug: string;
  category: string;
  location: string;
  googleReviewUrl: string;
  isPro: boolean;
}

interface UserItem {
  id: string;
  email: string;
  createdAt: string;
  lastLoginAt: string | null;
  loginCount: number;
  lastLoginProvider: string;
  isPro: boolean;
  planName: string;
  trialEndsAt: string | null;
  business: BusinessData | null;
}

interface LoginLog {
  id: string;
  email: string;
  timestamp: string;
  provider: string;
  userAgent?: string;
  businessSlug?: string;
}

interface AdminData {
  stats: {
    totalUsers: number;
    totalBusinesses: number;
    proUsers: number;
    estimatedRevenue: number;
    loginsToday: number;
  };
  users: UserItem[];
  recentLogins: LoginLog[];
}

export default function AdminVaultPage() {
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "logins">("users");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<"all" | "pro" | "trial" | "unpaid">("all");

  // Action status
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized: This private vault is restricted to project administrators.");
        setLoading(false);
        return;
      }
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json);
      } else {
        setError(json.error || "Failed to load admin telemetry.");
      }
    } catch {
      setError("Network error while connecting to Admin API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleInspectDashboard = async (user: UserItem) => {
    try {
      const slug = user.business?.slug;
      setActionLoading(`inspect_${user.id}`);
      setActionMessage(null);

      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug || undefined,
          email: user.email,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("smartreview_dashboard_cache");
          } catch {}
        }
        setActionMessage(`✓ Opening dashboard for ${json.businessName || user.business?.name || user.email}...`);
        router.push(`/dashboard?impersonate=${encodeURIComponent(json.slug || slug || "")}`);
      } else {
        alert(json.error || "Failed to switch into client dashboard.");
      }
    } catch {
      alert("Network error while attempting to check client dashboard.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePro = async (user: UserItem) => {
    try {
      setActionLoading(user.email);
      setActionMessage(null);
      const newStatus = !user.isPro;

      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          slug: user.business?.slug,
          isPro: newStatus,
          planName: newStatus ? "Lifetime License (Admin Granted)" : "Unpaid",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setActionMessage(`✓ ${user.email} is now ${newStatus ? "PRO" : "UNPAID"}`);
        // Optimistic UI update
        setData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            users: prev.users.map((u) =>
              u.email.toLowerCase() === user.email.toLowerCase()
                ? {
                    ...u,
                    isPro: newStatus,
                    planName: newStatus ? "Lifetime License (Admin Granted)" : "Unpaid",
                    trialEndsAt: newStatus ? u.trialEndsAt : null,
                    business: u.business ? { ...u.business, isPro: newStatus } : null,
                  }
                : u
            ),
            stats: {
              ...prev.stats,
              proUsers: newStatus ? prev.stats.proUsers + 1 : Math.max(0, prev.stats.proUsers - 1),
              estimatedRevenue: newStatus
                ? prev.stats.estimatedRevenue + 1999
                : Math.max(0, prev.stats.estimatedRevenue - 1999),
            },
          };
        });
      } else {
        alert(json.error || "Failed to update membership");
      }
    } catch {
      alert("Failed to send update request");
    } finally {
      setActionLoading(null);
    }
  };

  const handleExportCSV = () => {
    if (!data || !data.users.length) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const headers = [
      "Email",
      "Registered Date",
      "Last Login",
      "Login Count",
      "Login Method",
      "Is Pro",
      "Plan Name",
      "Business Name",
      "Category",
      "Location",
      "Public Funnel Link",
    ];

    const rows = data.users.map((u) => [
      `"${u.email}"`,
      `"${u.createdAt}"`,
      `"${u.lastLoginAt || ""}"`,
      u.loginCount || 1,
      `"${u.lastLoginProvider || ""}"`,
      u.isPro ? "YES" : "NO",
      `"${u.planName || ""}"`,
      `"${u.business?.name || ""}"`,
      `"${u.business?.category || ""}"`,
      `"${u.business?.location || ""}"`,
      `"${origin}/r/${u.business?.slug || ""}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `smartreview_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimestamp = (isoString?: string | null) => {
    if (!isoString) return "Never";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date";
    const diffHours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMins = Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60)));
      return `${diffMins}m ago`;
    }
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtered Users
  const filteredUsers = (data?.users || []).filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      u.email?.toLowerCase().includes(q) ||
      (u.business?.name && u.business.name.toLowerCase().includes(q)) ||
      (u.business?.location && u.business.location.toLowerCase().includes(q)) ||
      (u.business?.category && u.business.category.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (planFilter === "pro") return u.isPro;
    if (planFilter === "trial") return (u.planName || "").toLowerCase().includes("trial");
    if (planFilter === "unpaid") return !u.isPro;

    return true;
  });

  // Access Denied Screen
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center shadow-card space-y-4">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-100">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-[#173B67]">Admin Vault Restricted</h1>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {error}
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full py-3 bg-[#173B67] hover:bg-[#0F2643] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Sign In as Administrator
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 pb-16 font-sans">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center shrink-0">
              <Logo className="h-7 sm:h-8" />
            </Link>
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#173B67] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs shrink-0">
              <ShieldCheck className="w-3 h-3 text-[#3478C8]" />
              Super Admin Vault
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={fetchAdminData}
              disabled={loading}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Refresh User Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#173B67]" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-[#173B67] hover:bg-[#0F2643] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Export All Users to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <Link
              href="/dashboard"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Back to Business Dashboard"
            >
              <span className="text-xs">Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#173B67] tracking-tight flex items-center gap-2">
              <span>Platform Intelligence</span>
              <span className="text-[11px] sm:text-xs bg-blue-50 text-[#173B67] border border-blue-200 font-bold px-2.5 py-0.5 rounded-full">
                Live
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Monitor registered businesses, track user signups, inspect logins, and grant Pro licenses.
            </p>
          </div>

          {actionMessage && (
            <div className="bg-blue-50 border border-blue-200 text-[#173B67] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 animate-in fade-in self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3478C8] shrink-0" />
              <span>{actionMessage}</span>
            </div>
          )}
        </div>

        {/* 4 Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Registered Users */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                Total Users
              </span>
              <div className="w-8 h-8 bg-blue-50 text-[#3478C8] rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#173B67]">
              {loading ? "..." : data?.stats.totalUsers || 0}
            </div>
            <p className="text-[10px] text-slate-500 font-normal truncate">Registered accounts</p>
          </div>

          {/* Total Active Businesses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                Businesses
              </span>
              <div className="w-8 h-8 bg-blue-50 text-[#173B67] rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#173B67]">
              {loading ? "..." : data?.stats.totalBusinesses || 0}
            </div>
            <p className="text-[10px] text-slate-500 font-normal truncate">Active storefronts</p>
          </div>

          {/* Paid Pro Licenses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                Pro Licenses
              </span>
              <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              {loading ? "..." : data?.stats.proUsers || 0}
            </div>
            <p className="text-[10px] text-slate-600 font-semibold">
              ₹{((data?.stats.estimatedRevenue || 0)).toLocaleString("en-IN")} total volume
            </p>
          </div>

          {/* Today's Logins */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Logins Today
              </span>
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#173B67]">
              {loading ? "..." : data?.stats.loginsToday || 0}
            </div>
            <p className="text-[10px] text-slate-500 font-normal">Active sessions in 24h</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pt-2 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === "users"
                ? "bg-[#173B67] text-white border-[#173B67] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:text-[#173B67]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Accounts ({data?.users.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("logins")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === "logins"
                ? "bg-[#173B67] text-white border-[#173B67] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:text-[#173B67]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#3478C8]" />
            <span>Login Audit ({data?.recentLogins.length || 0})</span>
          </button>
        </div>

        {/* TAB 1: WHO REGISTERED */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {/* Search & Filter Pill Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email, business name, or location..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#173B67]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(["all", "pro", "trial", "unpaid"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setPlanFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer shrink-0 ${
                      planFilter === filter
                        ? "bg-[#173B67] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Directory Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Client / Account</th>
                      <th className="py-3 px-4">Registered Date</th>
                      <th className="py-3 px-4">Last Login</th>
                      <th className="py-3 px-4">Storefront Details</th>
                      <th className="py-3 px-4">Plan Status</th>
                      <th className="py-3 px-4 text-center">Inspect Dashboard</th>
                      <th className="py-3 px-4 text-right">Membership</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                          Loading user directory...
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                          No users found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSuperAdmin =
                          user.email.toLowerCase() === "nitin.sharmaji0512@gmail.com" ||
                          user.email.toLowerCase() === "nitin.sharmaji2405@gmail.com" ||
                          user.email.toLowerCase() === "hardic122@gmail.com";
                        return (
                          <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* User Info */}
                            <td className="py-3.5 px-4">
                              <div
                                onClick={() => handleInspectDashboard(user)}
                                className="flex items-center gap-2.5 cursor-pointer group/user p-1 -m-1 rounded-xl transition-all"
                                title="Click to inspect this client's dashboard"
                              >
                                <div className="w-8 h-8 rounded-full bg-[#173B67] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                                  {user.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 group-hover/user:text-[#3478C8] flex items-center gap-1.5 transition-colors">
                                    <span className="truncate max-w-[170px] sm:max-w-[210px]">
                                      {user.email}
                                    </span>
                                    {isSuperAdmin && (
                                      <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-1.5 py-0.2 rounded">
                                        ADMIN
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                                    <span>{user.lastLoginProvider || "credentials"}</span>
                                    <span>•</span>
                                    <span>{user.loginCount || 1} logins</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Registered Date */}
                            <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                              <div>{formatTimestamp(user.createdAt)}</div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>

                            {/* Last Login */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-semibold text-slate-700">
                                {formatTimestamp(user.lastLoginAt)}
                              </div>
                            </td>

                            {/* Business Storefront */}
                            <td className="py-3.5 px-4">
                              {user.business ? (
                                <div
                                  onClick={() => handleInspectDashboard(user)}
                                  className="space-y-0.5 cursor-pointer group/biz p-1 -m-1 rounded-xl transition-all"
                                  title="Click to check this client's dashboard"
                                >
                                  <div className="font-semibold text-slate-900 group-hover/biz:text-[#3478C8] flex items-center gap-1.5">
                                    <span>{user.business.name}</span>
                                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium capitalize">
                                      {user.business.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px]">
                                    {user.business.location && (
                                      <span className="text-slate-400 truncate max-w-[120px]">
                                        📍 {user.business.location}
                                      </span>
                                    )}
                                    {user.business.slug && (
                                      <a
                                        href={`/r/${user.business.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-[#3478C8] hover:underline flex items-center gap-0.5 font-semibold shrink-0"
                                        title="Preview Customer Review Funnel"
                                      >
                                        <span>Funnel</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleInspectDashboard(user)}
                                  className="text-[11px] text-slate-400 hover:text-slate-700 italic flex items-center gap-1 cursor-pointer"
                                  title="View client onboarding workspace"
                                >
                                  <span>Onboarding pending</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </td>

                            {/* Plan Status Badge */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {user.isPro ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  {user.planName || "LIFETIME PRO"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                                  <XCircle className="w-3 h-3 text-slate-400" />
                                  UNPAID
                                </span>
                              )}
                            </td>

                            {/* Check Dashboard Action */}
                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                              <button
                                type="button"
                                disabled={actionLoading === `inspect_${user.id}`}
                                onClick={() => handleInspectDashboard(user)}
                                className="px-3 py-1.5 bg-[#173B67] hover:bg-[#0F2643] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all mx-auto"
                                title={`Inspect dashboard for ${user.business?.name || user.email}`}
                              >
                                {actionLoading === `inspect_${user.id}` ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5 text-[#3478C8]" />
                                )}
                                <span>Inspect</span>
                              </button>
                            </td>

                            {/* 1-Click Pro Toggle Action */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                disabled={actionLoading === user.email}
                                onClick={() => handleTogglePro(user)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all ${
                                  user.isPro
                                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                }`}
                              >
                                {actionLoading === user.email ? (
                                  <span className="flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    Updating...
                                  </span>
                                ) : user.isPro ? (
                                  "Revoke Pro"
                                ) : (
                                  "Grant Pro ⚡"
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHO LOGGED IN */}
        {activeTab === "logins" && (
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#173B67]">Chronological Login Events</h3>
                <p className="text-[11px] text-slate-500 font-normal">
                  Real-time security audit log of user authentications
                </p>
              </div>
              <span className="text-[10px] font-bold bg-[#173B67] text-white px-2.5 py-0.5 rounded-full shrink-0">
                {data?.recentLogins.length || 0} Events Recorded
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">User Account</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Login Method</th>
                    <th className="py-3 px-4">Client / Device Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                        Loading login telemetry...
                      </td>
                    </tr>
                  ) : !data?.recentLogins.length ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                        No login events recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data.recentLogins.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <span>{log.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                          <div className="font-semibold text-slate-800">{formatTimestamp(log.timestamp)}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                              log.provider.includes("Google")
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : log.provider.includes("Registration")
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-slate-100 text-slate-800 border-slate-300"
                            }`}
                          >
                            {log.provider}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[10px] text-slate-500 font-mono max-w-[280px] truncate">
                          {log.userAgent || "Desktop Browser"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
