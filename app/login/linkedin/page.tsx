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

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
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
  label: { display: "block", fontSize: "15px", fontWeight: 600, color: "#181818", marginBottom: "5px" },
  inputWrap: { position: "relative", marginBottom: "14px" },
  input: { width: "100%", padding: "13px 44px 13px 14px", border: "1.5px solid #c0c0c0", borderRadius: "4px", fontSize: "15px", fontFamily: "inherit", color: "#181818", background: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" },
  inputFocus: { borderColor: "#0A66C2", boxShadow: "0 0 0 1px #0A66C2" },
  eyeBtn: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" },
  forgotLink: { display: "block", color: "#0A66C2", fontSize: "14px", fontWeight: 600, marginBottom: "18px", textDecoration: "none" },
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
  const [showPass, setShowPass] = useState(false);
  const [alert, setAlert] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const inp = (name: string): React.CSSProperties => ({ ...S.input, ...(focused === name ? S.inputFocus : {}) });
  const change = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const switchTab = (t: "login" | "signup") => { setTab(t); setAlert(null); setForm({}); setShowPass(false); };

  async function submit() {
    if (!form.email || !form.password) return setAlert({ msg: "Please fill in all required fields.", type: "error" });
    setLoading(true); setAlert(null);
    if (tab === "signup") {
      try {
        const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "linkedin", ...form }) });
        const data = await res.json();
        if (res.ok) { setAlert({ msg: "✅ Account created! You can now sign in.", type: "success" }); setTimeout(() => switchTab("login"), 1500); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Can't reach server.", type: "error" }); }
    } else {
      try {
        const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "linkedin", identifier: form.email, password: form.password }) });
        const data = await res.json();
        if (res.ok) { const name = data.user?.firstName || form.email; setAlert({ msg: `Welcome back, ${name}! 💼`, type: "success" }); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Can't reach server.", type: "error" }); }
    }
    setLoading(false);
  }

  return (
    <div style={S.page}>
      <style>{`input::placeholder{color:#aaa;} input::-ms-reveal{display:none;}`}</style>
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

              <label style={S.label}>Email or phone</label>
              <div style={S.inputWrap}>
                <input name="email" type="text" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
              </div>

              <label style={S.label}>Password</label>
              <div style={{ ...S.inputWrap, marginBottom: 8 }}>
                <input name="password" type={showPass ? "text" : "password"} style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
                {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
              </div>

              <a href="#" style={S.forgotLink}>Forgot password?</a>
              <button style={{ ...S.btn, ...S.btnBlue, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>

              <p style={S.joinText}>New to LinkedIn?{" "}<span style={S.joinLink} onClick={() => switchTab("signup")}>Join now</span></p>
            </div>
            <p style={S.terms}>By clicking Continue, you agree to LinkedIn's{" "}<a href="#" style={S.termsLink}>User Agreement</a>,{" "}<a href="#" style={S.termsLink}>Privacy Policy</a>.</p>
          </>
        ) : (
          <div style={S.card}>
            <h1 style={{ ...S.h1, fontSize: "24px", marginBottom: "16px" }}>Make the most of your professional life</h1>
            {alert && <div style={{ ...S.alert, ...(alert.type === "success" ? S.success : S.error) }}>{alert.msg}</div>}

            <div style={S.grid2}>
              <div>
                <label style={S.label}>First name</label>
                <div style={{ ...S.inputWrap, marginBottom: 0 }}>
                  <input name="firstName" type="text" placeholder="First name" style={{ ...inp("firstName"), marginBottom: 0 }} value={form.firstName || ""} onChange={change} onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")} />
                </div>
              </div>
              <div>
                <label style={S.label}>Last name</label>
                <div style={{ ...S.inputWrap, marginBottom: 0 }}>
                  <input name="lastName" type="text" placeholder="Last name" style={{ ...inp("lastName"), marginBottom: 0 }} value={form.lastName || ""} onChange={change} onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")} />
                </div>
              </div>
            </div>
            <div style={{ height: 14 }} />

            <label style={S.label}>Email or phone number</label>
            <div style={S.inputWrap}>
              <input name="email" type="text" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
            </div>

            <label style={S.label}>Password (6+ characters)</label>
            <div style={S.inputWrap}>
              <input name="password" type={showPass ? "text" : "password"} style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
              {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
            </div>

            <button style={{ ...S.btn, ...S.btnBlue, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Joining…" : "Agree & Join"}</button>
            <p style={{ ...S.joinText, border: "none", paddingTop: 0 }}>Already on LinkedIn?{" "}<span style={S.joinLink} onClick={() => switchTab("login")}>Sign in</span></p>
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