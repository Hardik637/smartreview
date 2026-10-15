import React from "react";

interface LogoProps {
  inverted?: boolean;
  style?: React.CSSProperties;
  className?: string;
  height?: number;
  width?: number;
  showSubtitle?: boolean;
}

export default function Logo({
  inverted = false,
  style = {},
  className = "",
  height,
  width,
  showSubtitle = true,
}: LogoProps) {
  const primaryColor = inverted ? "#FFFFFF" : "#173B67";
  const accentColor = inverted ? "#93C5FD" : "#3478C8";
  const textColor = inverted ? "#FFFFFF" : "#0F172A";
  const badgeBg = inverted ? "rgba(255,255,255,0.12)" : "rgba(23, 59, 103, 0.08)";
  const badgeText = inverted ? "#BFDBFE" : "#173B67";

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      style={style}
    >
      {/* SmartReview AI Emblem SVG */}
      <svg
        width={height ? height : 36}
        height={height ? height : 36}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect
          width="40"
          height="40"
          rx="10"
          fill={primaryColor}
        />
        {/* Soft Accent Gradient Backdrop */}
        <circle cx="28" cy="12" r="10" fill={accentColor} fillOpacity="0.35" />
        {/* Chat / Shield Outline */}
        <path
          d="M12 12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V22C28 23.1046 27.1046 24 26 24H18L13 28V24C12.4477 24 12 23.5523 12 23V12Z"
          fill={accentColor}
          fillOpacity="0.25"
          stroke={inverted ? "#FFFFFF" : "#FFFFFF"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Centered Star / Sparkle */}
        <path
          d="M20 13L21.3 16.5L25 17L22 19.5L23 23L20 21L17 23L18 19.5L15 17L18.7 16.5L20 13Z"
          fill="#F59E0B"
        />
        {/* AI Sparkle Dot */}
        <circle cx="26" cy="13" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Brand Wordmark */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className="text-lg sm:text-xl font-black tracking-tight"
            style={{ color: textColor }}
          >
            Smart<span style={{ color: accentColor }}>Review</span>
          </span>
          {showSubtitle && (
            <span
              className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ backgroundColor: badgeBg, color: badgeText }}
            >
              AI
            </span>
          )}
        </div>
        <span
          className="text-[9.5px] font-semibold tracking-wide text-slate-500 hidden sm:block mt-0.5"
          style={{ color: inverted ? "#94A3B8" : "#64748B" }}
        >
          Customer Review System
        </span>
      </div>
    </div>
  );
}
