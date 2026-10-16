"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  Store,
  Sparkles,
  Link as LinkIcon,
  AlertCircle,
  MessageSquare,
  RotateCcw,
  Headphones,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { CATEGORIES, getCategoryById } from "@/lib/categories";
import { parseTopicItem, parseServiceItem } from "@/lib/sanitize-items";
import { triggerBirthdayPop } from "@/components/BirthdayPopCelebration";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Business Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("cafe");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [brandColor, setBrandColor] = useState("#173B67");
  const [phone, setPhone] = useState("");

  // Lists
  const [services, setServices] = useState<string[]>([]);
  const [positiveTopics, setPositiveTopics] = useState<string[]>([]);
  const [issueTopics, setIssueTopics] = useState<string[]>([]);

  // Inputs
  const [newService, setNewService] = useState("");
  const [newPositiveTopic, setNewPositiveTopic] = useState("");
  const [newIssueTopic, setNewIssueTopic] = useState("");

  const isValidGoogleUrl = (url: string) => {
    if (!url || typeof url !== "string") return false;
    const clean = url.trim().toLowerCase();
    return (
      clean.includes("g.page") ||
      clean.includes("maps.app.goo.gl") ||
      clean.includes("search.google.com/local/writereview") ||
      clean.includes("google.com/maps") ||
      clean.includes("goo.gl/maps") ||
      clean.includes("business.google.com") ||
      clean.includes("maps.google.com") ||
      clean.includes("google.")
    );
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/business/me");
        const data = await res.json();
        if (data.success && data.business) {
          const b = data.business;
          const currentCategory = b.category || "cafe";
          const catConfig = getCategoryById(currentCategory);

          setName(b.name || "");
          setCategory(currentCategory);
          setLocation(b.location || "");
          setDescription(b.description || "");
          setGoogleReviewUrl(b.googleReviewUrl || "");
          setBrandColor(b.brandColor || "#173B67");
          setPhone(b.phone || "");

          const loadedServices: string[] = Array.isArray(b.services)
            ? b.services
                .map((s: any) => parseServiceItem(s)?.name)
                .filter((n: any): n is string => Boolean(n && !n.startsWith("{")))
            : [];

          setServices(loadedServices.length > 0 ? loadedServices : [...catConfig.defaultServices]);

          const loadedPositive: string[] = [];
          const loadedIssues: string[] = [];

          if (Array.isArray(b.topics)) {
            b.topics.forEach((t: any) => {
              const parsed = parseTopicItem(t);
              if (!parsed || !parsed.name || parsed.name.startsWith("{")) return;
              if (parsed.type === "issue") {
                loadedIssues.push(parsed.name);
              } else {
                loadedPositive.push(parsed.name);
              }
            });
          }

          setPositiveTopics(
            loadedPositive.length > 0 ? loadedPositive : [...catConfig.positiveTopics]
          );
          setIssueTopics(
            loadedIssues.length > 0 ? loadedIssues : [...catConfig.issueTopics]
          );
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const catConfig = getCategoryById(newCat);
    setServices([...catConfig.defaultServices]);
    setPositiveTopics([...catConfig.positiveTopics]);
    setIssueTopics([...catConfig.issueTopics]);
  };

  const handleResetDefaults = () => {
    const catConfig = getCategoryById(category);
    setServices([...catConfig.defaultServices]);
    setPositiveTopics([...catConfig.positiveTopics]);
    setIssueTopics([...catConfig.issueTopics]);
    triggerBirthdayPop({
      title: "Defaults Reloaded! 🔄",
      message: `Loaded standard keywords for ${catConfig.name}. Remember to click Save below!`,
      emoji: "📋",
    });
  };

  const handleAddService = () => {
    const trimmed = newService.trim();
    if (!trimmed || services.includes(trimmed)) return;
    setServices((prev) => [...prev, trimmed]);
    setNewService("");
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPositiveTopic = () => {
    const trimmed = newPositiveTopic.trim();
    if (!trimmed || positiveTopics.includes(trimmed)) return;
    setPositiveTopics((prev) => [...prev, trimmed]);
    setNewPositiveTopic("");
  };

  const handleRemovePositiveTopic = (index: number) => {
    setPositiveTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddIssueTopic = () => {
    const trimmed = newIssueTopic.trim();
    if (!trimmed || issueTopics.includes(trimmed)) return;
    setIssueTopics((prev) => [...prev, trimmed]);
    setNewIssueTopic("");
  };

  const handleRemoveIssueTopic = (index: number) => {
    setIssueTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const cleanServices = services.map((s) => ({ name: s }));
      const allTopics = [
        ...positiveTopics.map((t) => ({ name: t, type: "positive" })),
        ...issueTopics.map((t) => ({ name: t, type: "issue" })),
      ];

      const res = await fetch("/api/business/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          location,
          description,
          googleReviewUrl,
          brandColor,
          phone,
          services: cleanServices,
          topics: allTopics,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        setSaveError("");
        triggerBirthdayPop({
          title: "Settings Saved Successfully! 🎉",
          message: "Your business profile, keywords & review links are updated and live.",
          emoji: "🎉",
        });
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("smartreview_dashboard_cache");
            sessionStorage.removeItem("welurik_dashboard_cache");
            window.dispatchEvent(new Event("refresh_business"));
          } catch {}
        }
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || "Failed to save settings");
      }
    } catch {
      setSaveError("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-[#173B67] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Keywords & Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure target search keywords, experience tags, and your Google Business review link.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Profile Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-[#173B67]" /> Business Profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Your public identity displayed to customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] text-slate-900 font-medium capitalize"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Address</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. 4th Cross, Indiranagar, Bengaluru"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Google Review URL */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#173B67]" /> Google Business Profile Review URL
              </label>
              {googleReviewUrl && (
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#3478C8] hover:text-[#173B67] inline-flex items-center gap-1"
                >
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              type="url"
              required
              value={googleReviewUrl}
              onChange={(e) => setGoogleReviewUrl(e.target.value)}
              placeholder="https://g.page/r/your-id/review or https://maps.app.goo.gl/..."
              className={`w-full text-xs px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 font-mono text-slate-900 ${
                googleReviewUrl && !isValidGoogleUrl(googleReviewUrl)
                  ? "border-rose-300 focus:ring-rose-500"
                  : "border-slate-200 focus:ring-[#3478C8]"
              }`}
            />
            {googleReviewUrl && googleReviewUrl.trim().length > 0 && (
              <>
                {isValidGoogleUrl(googleReviewUrl) ? (
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-[#173B67] font-medium text-[11.5px]">
                      <span className="w-2 h-2 rounded-full bg-[#3478C8] animate-pulse" />
                      <span>Valid Google Business link format</span>
                    </div>
                    <a
                      href={googleReviewUrl.startsWith("http") ? googleReviewUrl : `https://${googleReviewUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-[11.5px]">
                      <strong>Invalid format:</strong> Please enter a real Google Review link (e.g. <code>g.page/r/...</code> or <code>maps.app.goo.gl/...</code>).
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Keywords & Experience Topics Manager */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Keywords & Experience Topics Manager</h2>
            <p className="text-xs text-slate-400">Manage praise tags, services, and private feedback concern tags.</p>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reload Category Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positive Experience Topics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Experience Praise Topics
              </h3>
              <p className="text-[11px] text-slate-400">Tags customers can select when writing reviews.</p>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[80px] p-3 bg-slate-50 border border-slate-200 rounded-xl">
              {positiveTopics.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No praise tags added yet. Click &quot;Reload Category Defaults&quot; or add below.</span>
              ) : (
                positiveTopics.map((t, idx) => {
                  const label = (typeof t === "string" ? t : (t as any)?.name || "").trim();
                  if (!label) return null;
                  return (
                    <span
                      key={`${label}-${idx}`}
                      className="text-xs bg-white text-slate-900 font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-subtle flex items-center gap-1.5"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() => handleRemovePositiveTopic(idx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newPositiveTopic}
                onChange={(e) => setNewPositiveTopic(e.target.value)}
                placeholder="e.g. Friendly Staff"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8]"
              />
              <button
                type="button"
                onClick={handleAddPositiveTopic}
                className="px-3.5 py-2 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Services / Menu Items */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#3478C8]" /> Target Keyword Services
              </h3>
              <p className="text-[11px] text-slate-400">Products & items to boost Google Search rankings.</p>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[80px] p-3 bg-slate-50 border border-slate-200 rounded-xl">
              {services.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No services added yet. Click &quot;Reload Category Defaults&quot; or add below.</span>
              ) : (
                services.map((s, idx) => {
                  const label = (typeof s === "string" ? s : (s as any)?.name || "").trim();
                  if (!label) return null;
                  return (
                    <span
                      key={`${label}-${idx}`}
                      className="text-xs bg-white text-slate-900 font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-subtle flex items-center gap-1.5"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="e.g. Specialty Brew"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8]"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-3.5 py-2 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Private Feedback Concern Tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4 md:col-span-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" /> Private Feedback Concern Tags
              </h3>
              <p className="text-[11px] text-slate-400">
                Optional tags presented when customers want to message management about an issue privately.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[60px] p-3 bg-slate-50 border border-slate-200 rounded-xl">
              {issueTopics.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No issue tags added yet. Customers can still type freeform messages.</span>
              ) : (
                issueTopics.map((t, idx) => {
                  const label = (typeof t === "string" ? t : (t as any)?.name || "").trim();
                  if (!label) return null;
                  return (
                    <span
                      key={`${label}-${idx}`}
                      className="text-xs bg-white text-slate-900 font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-subtle flex items-center gap-1.5"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() => handleRemoveIssueTopic(idx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={newIssueTopic}
                onChange={(e) => setNewIssueTopic(e.target.value)}
                placeholder="e.g. Wait Time"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8]"
              />
              <button
                type="button"
                onClick={handleAddIssueTopic}
                className="px-3.5 py-2 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Settings saved!
              </span>
            )}
            {saveError && (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> {saveError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto py-3 px-6 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-subtle transition-all active:scale-[0.98] cursor-pointer"
          >
            {saving ? "Saving..." : (
              <>
                <Save className="w-4 h-4" /> Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
