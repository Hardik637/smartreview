"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  Printer,
  Download,
  Star,
  Copy,
  Check,
  Layers,
  QrCode as QrIcon,
  FileDown,
  Loader2,
  Sparkles,
  ShieldCheck,
  Scissors,
  Save,
} from "lucide-react";
import { triggerBirthdayPop } from "@/components/BirthdayPopCelebration";

export default function QRStudioPage() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingMode, setGeneratingMode] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [template, setTemplate] = useState<"midnight" | "minimal" | "tent">("midnight");
  const [headline, setHeadline] = useState("Enjoyed your visit today?");
  const [subheadline, setSubheadline] = useState("Scan with your phone to leave a quick 5-star Google review & support our team!");
  const [copiedLink, setCopiedLink] = useState(false);

  const standeeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/business/me");
        const data = await res.json();
        if (data.success && data.business) {
          setBusiness(data.business);

          const savedHeadline = typeof window !== "undefined" ? localStorage.getItem("smartreview_standee_headline") || localStorage.getItem("welurik_standee_headline") : null;
          const savedSub = typeof window !== "undefined" ? localStorage.getItem("smartreview_standee_subheadline") || localStorage.getItem("welurik_standee_subheadline") : null;
          const savedTpl = typeof window !== "undefined" ? localStorage.getItem("smartreview_standee_template") || localStorage.getItem("welurik_standee_template") : null;

          if (savedHeadline) {
            setHeadline(savedHeadline);
          } else if (data.business.category === "salon") setHeadline("Loved your new look?");
          else if (data.business.category === "restaurant") setHeadline("How was your meal today?");
          else if (data.business.category === "cafe") setHeadline("Enjoyed your coffee & food?");
          else if (data.business.category === "snacks") setHeadline("Loved the taste & snacks today?");

          if (savedSub) setSubheadline(savedSub);
          if (savedTpl === "midnight" || savedTpl === "minimal" || savedTpl === "tent") {
            setTemplate(savedTpl as any);
          }

          const origin = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-flame.vercel.app");
          const reviewUrl = `${origin}/r/${data.business.slug}`;

          // High-density QR code for optical scan precision
          const url = await QRCode.toDataURL(reviewUrl, {
            width: 720,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
            errorCorrectionLevel: "H",
          });
          setQrDataUrl(url);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveDesign = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("smartreview_standee_headline", headline);
        localStorage.setItem("smartreview_standee_subheadline", subheadline);
        localStorage.setItem("smartreview_standee_template", template);
      } catch {}
    }
    triggerBirthdayPop({
      title: "Standee Preferences Saved! 🎨",
      message: "Your headline, sub-headline, and template theme are saved.",
      emoji: "🎉",
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${business?.slug || "business"}-smartreview-qr.png`;
    a.click();
    triggerBirthdayPop({
      title: "QR Code Downloaded! 📱",
      message: "High-resolution optical QR code saved to your device.",
      emoji: "✨",
    });
  };

  const handleCopyLink = () => {
    if (!business?.slug) return;
    const origin = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-flame.vercel.app");
    const reviewUrl = `${origin}/r/${business.slug}`;
    navigator.clipboard.writeText(reviewUrl);
    setCopiedLink(true);
    triggerBirthdayPop({
      title: "Review Link Copied! 📋",
      message: "Direct customer review link copied to your clipboard.",
      emoji: "🔗",
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Pure Native Vector CMYK Renderer (100% /DeviceCMYK, Zero RGB)
  const renderCmykStandee = (
    doc: any,
    offsetX: number,
    offsetY: number,
    activeTemplate: "midnight" | "minimal" | "tent",
    logoBase64?: string
  ) => {
    const isDark = activeTemplate === "midnight";

    // 1. Full Bleed Background in Native CMYK
    if (isDark) {
      // Deep Navy Black (C: 90%, M: 70%, Y: 40%, K: 60%)
      doc.setFillColor(0.90, 0.70, 0.40, 0.60);
    } else {
      // Pure Paper White (C: 0%, M: 0%, Y: 0%, K: 0%)
      doc.setFillColor(0, 0, 0, 0);
    }
    doc.rect(offsetX, offsetY, 4, 6, "F");

    // 2. Eyebrow Tag in Native CMYK
    if (isDark) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0.25, 1.0, 0); // CMYK Process Amber Gold
      doc.text("RATE YOUR EXPERIENCE", offsetX + 2, offsetY + 0.62, { align: "center" });
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0.70, 0.40, 0.10, 0.20); // CMYK Navy Slate
      doc.text("REVIEW US ON GOOGLE", offsetX + 2, offsetY + 0.62, { align: "center" });
    }

    // 3. Business Name in Native CMYK
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    if (isDark) {
      doc.setTextColor(0, 0, 0, 0); // Pure White
    } else {
      doc.setTextColor(0.90, 0.70, 0.40, 0.50); // Navy Process
    }
    const bName = business?.name || "The Coffee House";
    doc.text(bName.length > 24 ? bName.slice(0, 24) + "..." : bName, offsetX + 2, offsetY + 0.95, { align: "center" });

    // 4. Five Gold Stars (Pure CMYK Vector Polygons)
    const drawVectorStar = (cx: number, cy: number, outerR: number, innerR: number) => {
      doc.setFillColor(0, 0.25, 1.0, 0); // CMYK Amber Gold
      const spikes = 5;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      const coords: [number, number][] = [];
      const startX = cx + Math.cos(rot) * outerR;
      const startY = cy + Math.sin(rot) * outerR;
      let prevX = startX;
      let prevY = startY;
      rot += step;
      for (let i = 0; i < spikes * 2 - 1; i++) {
        const r = i % 2 === 0 ? innerR : outerR;
        const currX = cx + Math.cos(rot) * r;
        const currY = cy + Math.sin(rot) * r;
        coords.push([currX - prevX, currY - prevY]);
        prevX = currX;
        prevY = currY;
        rot += step;
      }
      doc.lines(coords, startX, startY, [1, 1], "F", true);
    };

    const starY = offsetY + 1.22;
    const starSpacing = 0.16;
    const starStartX = offsetX + 2 - (2 * starSpacing);
    for (let i = 0; i < 5; i++) {
      drawVectorStar(starStartX + i * starSpacing, starY, 0.065, 0.03);
    }

    // 5. White Rounded QR Frame Container
    doc.setFillColor(0, 0, 0, 0);
    const containerW = 2.4;
    const containerH = 2.4;
    const containerX = offsetX + (4 - containerW) / 2;
    const containerY = offsetY + 1.48;
    doc.roundedRect(containerX, containerY, containerW, containerH, 0.25, 0.25, "F");

    if (!isDark) {
      doc.setDrawColor(0, 0, 0, 0.15);
      doc.setLineWidth(0.01);
      doc.roundedRect(containerX, containerY, containerW, containerH, 0.25, 0.25, "S");
    }

    // 6. Vector QR Code in 100% Process Black
    const origin = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-flame.vercel.app");
    const reviewTargetUrl = `${origin}/r/${business?.slug || "business"}`;
    const qr = QRCode.create(reviewTargetUrl, { errorCorrectionLevel: "H" });
    const size = qr.modules.size;
    const qrW = 2.0;
    const cellSize = qrW / size;
    const qrX = offsetX + (4 - qrW) / 2;
    const qrY = containerY + (containerH - qrW) / 2;
    doc.setFillColor(0, 0, 0, 1.0);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (qr.modules.get(r, c)) {
          doc.rect(qrX + c * cellSize, qrY + r * cellSize, cellSize, cellSize, "F");
        }
      }
    }

    // 7. Headline
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    if (isDark) {
      doc.setTextColor(0, 0.25, 1.0, 0);
    } else {
      doc.setTextColor(0.90, 0.70, 0.40, 0.50);
    }
    doc.text(headline || "Enjoyed your visit today?", offsetX + 2, offsetY + 4.35, { align: "center" });

    // 8. Subheadline
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    if (isDark) {
      doc.setTextColor(0.20, 0.10, 0, 0.35);
    } else {
      doc.setTextColor(0.20, 0.10, 0, 0.55);
    }
    const sub = subheadline || "Scan with your phone to leave a quick 5-star Google review & support our team!";
    doc.text(sub, offsetX + 2, offsetY + 4.62, { align: "center", maxWidth: 3.1 });

    // 9. Clean Subtle Footer Divider Line
    if (isDark) {
      doc.setDrawColor(0.20, 0.10, 0, 0.70);
    } else {
      doc.setDrawColor(0, 0, 0, 0.12);
    }
    doc.setLineWidth(0.01);
    doc.line(offsetX + 0.35, offsetY + 5.38, offsetX + 3.65, offsetY + 5.38);

    // 10. Official SmartReview Branding Footer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    if (isDark) {
      doc.setTextColor(0, 0, 0, 0);
    } else {
      doc.setTextColor(0.90, 0.70, 0.40, 0.50);
    }
    doc.text("Powered by SmartReview", offsetX + 0.5, offsetY + 5.60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(0.20, 0.10, 0, isDark ? 0.35 : 0.55);
    doc.text("AI Customer Review System", offsetX + 3.5, offsetY + 5.60, { align: "right" });
  };

  // High-Resolution 100% CMYK Vector PDF Engine
  const handleDownloadPDF = async (format: "4x6" | "a4" = "4x6", openPrintView = false) => {
    if (!business) return;

    let printWin: Window | null = null;
    if (openPrintView && typeof window !== "undefined") {
      printWin = window.open("", "_blank");
      if (printWin) {
        printWin.document.write(
          "<!DOCTYPE html><html><head><title>Opening 4x6 Standee...</title></head><body style='font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#173B67;color:#ffffff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;'><div style='text-align:center;'><h2 style='margin:0 0 8px 0;font-size:18px;'>⚡ Generating 4\" × 6\" Standee Print Document</h2><p style='color:#BFDBFE;font-size:13px;margin:0;'>Opening print dialog with exact 4\" × 6\" dimensions...</p></div></body></html>"
        );
      }
    }

    try {
      setGeneratingPdf(true);
      setGeneratingMode(openPrintView ? "print" : format);

      const { jsPDF } = await import("jspdf");

      if (format === "4x6") {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: [4, 6],
        });

        pdf.setProperties({
          title: `${business.name || "Business"} - Exact 4x6 CMYK Standee Card`,
          subject: "Commercial 4x6 CMYK Vector Standee",
          author: "SmartReview System",
          creator: "SmartReview",
        });

        renderCmykStandee(pdf, 0, 0, template);

        if (openPrintView) {
          pdf.autoPrint();
          const blobUrl = URL.createObjectURL(pdf.output("blob"));
          if (printWin) {
            printWin.location.href = blobUrl;
          } else {
            pdf.save(`${business.slug || "business"}-standee-4x6.pdf`);
          }
        } else {
          pdf.save(`${business.slug || "business"}-standee-4x6.pdf`);
        }
      } else if (format === "a4") {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "a4",
        });

        const pageWidth = 8.27;
        const pageHeight = 11.69;
        const cardW = 4.0;
        const cardH = 6.0;
        const startX = (pageWidth - cardW) / 2;
        const startY = (pageHeight - cardH) / 2;

        pdf.setProperties({
          title: `${business.name || "Business"} - 4x6 Standee on A4 Cut Sheet`,
          subject: "4x6 CMYK Standee with Cut Lines for A4 Desktop Printers",
          author: "SmartReview System",
          creator: "SmartReview",
        });

        renderCmykStandee(pdf, startX, startY, template);

        pdf.setLineDashPattern([0.05, 0.05], 0);
        pdf.setDrawColor(0.20, 0.10, 0, 0.40);
        pdf.setLineWidth(0.012);
        pdf.rect(startX, startY, cardW, cardH, "S");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(0.20, 0.10, 0, 0.70);
        pdf.text(
          "✂  Cut along dashed rectangle for exact 4\" × 6\" acrylic standee card (101.6 × 152.4 mm)",
          pageWidth / 2,
          startY - 0.22,
          { align: "center" }
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(0.20, 0.10, 0, 0.50);
        pdf.text(
          "Printer Setting: Scale 100% (Actual Size / Do not select 'Fit to Page')",
          pageWidth / 2,
          startY + cardH + 0.25,
          { align: "center" }
        );

        if (openPrintView) {
          pdf.autoPrint();
          const blobUrl = URL.createObjectURL(pdf.output("blob"));
          if (printWin) {
            printWin.location.href = blobUrl;
          } else {
            pdf.save(`${business.slug || "business"}-standee-4x6-on-A4.pdf`);
          }
        } else {
          pdf.save(`${business.slug || "business"}-standee-4x6-on-A4.pdf`);
        }
      }

      triggerBirthdayPop({
        title: format === "4x6" ? "4\" × 6\" Standee PDF Ready! 🖨️" : "A4 Print Sheet Ready! ✂️",
        message: "Your CMYK vector print document has been generated with pure precision.",
        emoji: "🎉",
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      if (printWin) printWin.close();
      alert("Could not generate PDF. Please try again.");
    } finally {
      setGeneratingPdf(false);
      setGeneratingMode("");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#173B67] border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
              Vector CMYK Format
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              Exact 4&quot; × 6&quot; Portrait (101.6 × 152.4 mm)
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">QR Standee Studio</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export print-ready 4&quot; × 6&quot; vertical acrylic standees and table tents for counter displays.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* PRIMARY: Download Exact 4x6 CMYK PDF */}
          <button
            type="button"
            onClick={() => handleDownloadPDF("4x6", false)}
            disabled={generatingPdf || loading}
            className="py-2.5 px-4 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-subtle transition-all active:scale-[0.98] disabled:opacity-50"
            title="Download true 4x6 inch PDF in CMYK color format"
          >
            {generatingPdf && generatingMode === "4x6" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            {generatingPdf && generatingMode === "4x6" ? "Generating..." : "Download 4\" × 6\" PDF"}
          </button>

          {/* SECONDARY: Print 4x6 Card */}
          <button
            type="button"
            onClick={() => handleDownloadPDF("4x6", true)}
            disabled={generatingPdf || loading}
            className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-subtle transition-all active:scale-[0.98] disabled:opacity-50"
            title="Open native 4x6 print dialog directly"
          >
            {generatingPdf && generatingMode === "print" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Printer className="w-4 h-4" />
            )}
            Print 4&quot; × 6&quot; Card
          </button>

          {/* TERTIARY: Download A4 Sheet with 4x6 Cut Guidelines */}
          <button
            type="button"
            onClick={() => handleDownloadPDF("a4", false)}
            disabled={generatingPdf || loading}
            className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 border border-slate-200"
            title="Download on A4 paper with dashed scissors cut guidelines for standard office printers"
          >
            {generatingPdf && generatingMode === "a4" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Scissors className="w-3.5 h-3.5 text-slate-600" />
            )}
            A4 Cut Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Customizer Controls */}
        <div className="lg:col-span-5 space-y-6 no-print">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-700" /> Standee Layout
                </h2>
                <span className="text-[10px] font-bold text-[#173B67] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  4&quot; × 6&quot; Layout
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your print theme for acrylic counter stands or table tents.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "midnight", name: "Executive Navy", desc: "Navy blue & gold theme" },
                { id: "minimal", name: "Classic Minimal", desc: "Clean white acrylic aesthetic" },
                { id: "tent", name: "Table Tent", desc: "Foldable double-sided card" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    template === t.id
                      ? "border-[#173B67] bg-[#173B67] text-white shadow-subtle"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800"
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    {t.id === "midnight" && <Sparkles className="w-3 h-3 text-amber-300" />}
                    {t.name}
                  </p>
                  <p className={`text-[9.5px] mt-0.5 line-clamp-1 ${template === t.id ? "text-blue-100" : "text-slate-500"}`}>
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>

            <hr className="border-slate-100" />

            {/* Text Customization */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Text</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sub-headline Note</label>
                <textarea
                  rows={2}
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3478C8] font-medium text-slate-900 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveDesign}
                className="w-full py-2.5 px-3 bg-[#173B67] hover:bg-[#1C4982] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-subtle cursor-pointer active:scale-98"
              >
                <Save className="w-3.5 h-3.5 text-blue-200" /> Save Standee Preferences
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadQR}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download QR
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Printable 4" x 6" Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[340px] sm:max-w-[360px] mb-3 flex items-center justify-between no-print">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3478C8] animate-pulse"></span>
              Live 4&quot; × 6&quot; Preview
            </span>
            <span className="text-[11px] font-mono font-bold text-[#173B67] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Print Ready
            </span>
          </div>

          <div
            id="printable-standee"
            ref={standeeRef}
            className="w-full max-w-[340px] sm:max-w-[360px] aspect-[4/6] bg-[#173B67] rounded-2xl shadow-card border border-slate-300 overflow-hidden transition-all duration-300 mx-auto flex flex-col justify-between"
          >
            {/* TEMPLATE: EXECUTIVE NAVY */}
            {template === "midnight" && (
              <div className="h-full w-full p-6 text-center flex flex-col items-center justify-between bg-[#173B67] text-white select-none">
                <div className="w-full space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                    Rate Your Experience
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                    {business?.name || "The Coffee House"}
                  </h3>
                  <div className="flex items-center justify-center gap-1 pt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                </div>

                <div className="my-auto p-3.5 bg-white rounded-2xl shadow-md">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Review QR Code"
                      className="w-40 h-40 rounded-xl object-contain mx-auto"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-slate-100 flex items-center justify-center rounded-xl">
                      <QrIcon className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="w-full space-y-1 mb-2">
                  <h4 className="text-xs font-bold text-amber-300">{headline}</h4>
                  <p className="text-[10.5px] text-blue-100/80 max-w-[250px] mx-auto leading-relaxed">
                    {subheadline}
                  </p>
                </div>

                <div className="w-full pt-3 mt-auto border-t border-white/10 flex items-center justify-between text-[10px] text-blue-200/80 font-medium">
                  <span className="font-bold text-white tracking-tight">SmartReview AI System</span>
                  <span className="text-[9.5px] font-mono text-blue-200">Google Review Partner</span>
                </div>
              </div>
            )}

            {/* TEMPLATE: CLASSIC MINIMAL */}
            {template === "minimal" && (
              <div className="h-full w-full p-6 text-center flex flex-col items-center justify-between bg-white text-slate-900 select-none">
                <div className="w-full space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                    Review Us On Google
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {business?.name || "The Coffee House"}
                  </h3>
                  <div className="flex items-center justify-center gap-1 pt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="my-auto p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  {qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="Review QR Code"
                      className="w-40 h-40 rounded-xl object-contain mx-auto"
                    />
                  )}
                </div>

                <div className="w-full space-y-1 mb-2">
                  <h4 className="text-xs font-bold text-slate-900">{headline}</h4>
                  <p className="text-[10.5px] text-slate-500 max-w-[240px] mx-auto leading-relaxed">{subheadline}</p>
                </div>

                <div className="w-full pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span className="font-bold text-[#173B67] tracking-tight">SmartReview AI System</span>
                  <span className="text-[9.5px] text-slate-400 font-mono">Google Review Partner</span>
                </div>
              </div>
            )}

            {/* TEMPLATE: TABLE TENT */}
            {template === "tent" && (
              <div className="h-full w-full p-5 text-center flex flex-col items-center justify-between bg-white border border-slate-200 select-none">
                <div className="w-full border-b border-dashed border-slate-300 pb-1.5 mb-1">
                  <p className="text-[8.5px] font-bold uppercase tracking-widest text-slate-400">
                    ✂️ 4&quot; × 6&quot; Fold along center line for Table Tent
                  </p>
                </div>

                <div className="w-full space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{business?.name || "The Coffee House"}</h3>
                  <p className="text-xs text-slate-600 font-semibold">{headline}</p>
                </div>

                <div className="my-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {qrDataUrl && (
                    <img src={qrDataUrl} alt="Review QR" className="w-32 h-32 object-contain mx-auto" />
                  )}
                </div>

                <div className="w-full space-y-1 mb-2">
                  <p className="text-[10.5px] text-slate-500 font-medium max-w-[240px] mx-auto">{subheadline}</p>
                  <div className="flex items-center justify-center gap-1 text-amber-400 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="w-full pt-2 mt-auto border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-500 font-medium">
                  <span className="font-bold text-[#173B67]">SmartReview AI</span>
                  <span className="text-[9px] text-slate-400 font-mono">Google Review Partner</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
