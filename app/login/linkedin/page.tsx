"use client";

import { useState } from "react";

const LinkedInLogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect width="34" height="34" rx="6" fill="#0A66C2" />
    <rect x="4" y="13" width="5.5" height="16" fill="white" />
    <circle cx="6.75" cy="8" r="3.25" fill="white" />
    <path d="M14 13h5v2.4s1.4-3 5.5-3c4.8 0 4.5 5 4.5 5V29h-5.5V19c0-1.8-.7-3-2.8-3-2.1 0-3.2 1.8-3.2 3v10H14V13z" fill="white" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.1C33.5 33.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.6-7.9 19.6-20 0-1.3-.1-2.7-.4-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5L31.7 34c-2 1.4-4.6 2-7.7 2-5.2 0-9.5-3.3-11.1-8l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.1c-.7 2.4-2.2 4.4-4.3 5.8l5.8 4.9C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 21 21">
    <rect x="0" y="0" width="10" height="10" fill="#F25022" />
    <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
    <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
    <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
  </svg>
);

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f3f2ef", fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" },
  nav: { position: "fixed" as const, top: 0, left: 0, right: 0, background: "#fff", borderBottom: "1px solid #d0ceca", display: "flex", alignItems: "center", padding: "0 24px", height: "52px", zIndex: 100 },
  navLogo: { display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "20px", color: "#0A66C2", letterSpacing: "-0.5px" },
  main: { paddingTop: "80px", width: "100%", maxWidth: "400px" },
  card: { background: "#fff", borderRadius: "8px", padding: "32px 24px 24px", boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)", marginBottom: "16px" },
  h1: { fontSize: "28px", fontWeight: 400, color: "#181818", marginBottom: "4px", lineHeight: 1.25 },
  subtitle: { fontSize: "14px", color: "#666", marginBottom: "22px" },
  ssoBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "13px 14px", border: "1.5px solid rgba(0,0,0,0.6)", borderRadius: "28px", background: "#fff", fontSize: "15px", fontWeight: 600, color: "#181818", cursor: "pointer", fontFamily: "inherit", marginBottom: "12px" },
  divRow: { display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" },
  divLine: { flex: 1, height: "1px", background: "#ccc" },
  divText: { fontSize: "12px", color: "#666", fontWeight: 500 },
  label: { display: "block", fontSize: "15px", fontWeight: 600, color: "#181818", marginBottom: "5px" },
  input: { width: "100%", padding: "13px 14px", border: "1.5px solid #c0c0c0", borderRadius: "4px", fontSize: "15px", fontFamily: "inherit", color: "#181818", background: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s", marginBottom: "14px" },
  inputFocus: { borderColor: "#0A66C2", boxShadow: "0 0 0 1px #0A66C2" },
  forgotLink: { display: "block", textAlign: "center" as const, color: "#0A66C2", fontSize: "14px", fontWeight: 600, marginBottom: "18px", textDecoration: "none" },
  btn: { width: "100%", padding: "14px", borderRadius: "28px", border: "none", fontSize: "16px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  btnBlue: { background: "#0A66C2", color: "#fff" },
  joinText: { textAlign: "center" as const, marginTop: "20px", fontSize: "14px", color: "#666", paddingTop: "18px", borderTop: "1px solid #eee" },
  joinLink: { color: "#0A66C2", fontWeight: 700, cursor: "pointer" },
  terms: { fontSize: "12px", color: "#666", textAlign: "center" as const, lineHeight: 1.55, marginTop: "20px" },
  termsLink: { color: "#0A66C2", textDecoration: "none" },
  footer: { display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: "10px 18px", marginTop: "20px" },
  footerLink: { fontSize: "12px", color: "#666", textDecoration: "none" },
  alert: { padding: "10px 14px", borderRadius: "4px", fontSize: "13px", marginBottom: "14px", textAlign: "center" as const },
  success: { background: "#e8f5e9", border: "1px solid #a5d6a7", color: "#2e7d32" },
  error: { background: "#fff3f3", border: "1px solid #ffcdd2", color: "#c62828" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
};

export default function LinkedInPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const inp = (name: string): React.CSSProperties => ({ ...S.input, ...(focused === name ? S.inputFocus : {}) });
  const change = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const switchTab = (t: "login" | "signup") => { setTab(t); setAlert(null); setForm({}); };

  async function submit() {
    const emailOrPhone = form.email;
    if (!emailOrPhone || !form.password) {
      return setAlert({ msg: "Please fill in all required fields.", type: "error" });
    }
    setLoading(true);
    setAlert(null);

    if (tab === "signup") {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platform: "linkedin", ...form }),
        });
        const data = await res.json();
        if (res.ok) {
          setAlert({ msg: "✅ Account created! You can now sign in.", type: "success" });
          setTimeout(() => switchTab("login"), 1500);
        } else {
          setAlert({ msg: data.message, type: "error" });
        }
      } catch {
        setAlert({ msg: "Can't reach server.", type: "error" });
      }
    } else {
      // Real DB login check
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: "linkedin",
            identifier: emailOrPhone,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          const name = data.user?.firstName || emailOrPhone;
          setAlert({ msg: `Welcome back, ${name}! 💼`, type: "success" });
        } else {
          setAlert({ msg: data.message, type: "error" });
        }
      } catch {
        setAlert({ msg: "Can't reach server.", type: "error" });
      }
    }
    setLoading(false);
  }

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.navLogo}>
          <LinkedInLogo />
          <span style={{ color: "#0A66C2", fontWeight: 800, fontSize: "22px" }}>LinkedIn</span>
        </div>
      </nav>

      <div style={S.main}>
        {tab === "login" ? (
          <>
            <div style={S.card}>
              <h1 style={S.h1}>Sign in</h1>
              <p style={S.subtitle}>Stay updated on your professional world</p>

              {alert && <div style={{ ...S.alert, ...(alert.type === "success" ? S.success : S.error) }}>{alert.msg}</div>}

              <button style={S.ssoBtn}><GoogleIcon /> Continue with Google</button>
              <button style={S.ssoBtn}><MicrosoftIcon /> Sign in with Microsoft</button>

              <div style={S.divRow}><div style={S.divLine} /><span style={S.divText}>or</span><div style={S.divLine} /></div>

              <label style={S.label}>Email or phone</label>
              <input name="email" type="text" placeholder="" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />

              <label style={S.label}>Password</label>
              <input name="password" type="password" placeholder="" style={{ ...inp("password"), marginBottom: 8 }} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />

              <a href="#" style={S.forgotLink}>Forgot password?</a>

              <button style={{ ...S.btn, ...S.btnBlue, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>

              <p style={S.joinText}>
                New to LinkedIn?{" "}
                <span style={S.joinLink} onClick={() => switchTab("signup")}>Join now</span>
              </p>
            </div>

            <p style={S.terms}>
              By clicking Continue, you agree to LinkedIn's{" "}
              <a href="#" style={S.termsLink}>User Agreement</a>,{" "}
              <a href="#" style={S.termsLink}>Privacy Policy</a>.
            </p>
          </>
        ) : (
          <div style={S.card}>
            <h1 style={{ ...S.h1, fontSize: "24px", marginBottom: "16px" }}>Make the most of your professional life</h1>

            {alert && <div style={{ ...S.alert, ...(alert.type === "success" ? S.success : S.error) }}>{alert.msg}</div>}

            <div style={S.grid2}>
              <div>
                <label style={S.label}>First name</label>
                <input name="firstName" type="text" placeholder="First name" style={{ ...inp("firstName"), marginBottom: 0 }} value={form.firstName || ""} onChange={change} onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")} />
              </div>
              <div>
                <label style={S.label}>Last name</label>
                <input name="lastName" type="text" placeholder="Last name" style={{ ...inp("lastName"), marginBottom: 0 }} value={form.lastName || ""} onChange={change} onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")} />
              </div>
            </div>
            <div style={{ height: 14 }} />

            <label style={S.label}>Email or phone number</label>
            <input name="email" type="text" placeholder="" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />

            <label style={S.label}>Password (6+ characters)</label>
            <input name="password" type="password" placeholder="" style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />

            <button style={{ ...S.btn, ...S.btnBlue, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>
              {loading ? "Joining…" : "Agree & Join"}
            </button>

            <div style={S.divRow}><div style={S.divLine} /><span style={S.divText}>or</span><div style={S.divLine} /></div>
            <button style={S.ssoBtn}><GoogleIcon /> Join with Google</button>

            <p style={{ ...S.joinText, border: "none", paddingTop: 0 }}>
              Already on LinkedIn?{" "}
              <span style={S.joinLink} onClick={() => switchTab("login")}>Sign in</span>
            </p>
          </div>
        )}

        <div style={S.footer}>
          {["Help Center", "About", "Privacy & Terms", "Accessibility"].map(l => (
            <a key={l} href="#" style={S.footerLink}>{l}</a>
          ))}
          <span style={{ fontSize: "12px", color: "#999" }}>LinkedIn © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}