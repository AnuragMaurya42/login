"use client";

import { useState } from "react";

const InstaLogo = () => (
  <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
    <defs>
      <radialGradient id="ig_grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="26" fill="url(#ig_grad)" />
    <rect x="18" y="18" width="64" height="64" rx="18" fill="none" stroke="white" strokeWidth="5" />
    <circle cx="50" cy="50" r="16" fill="none" stroke="white" strokeWidth="5" />
    <circle cx="72" cy="28" r="5" fill="white" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  page: { minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", padding: "20px 16px" },
  card: { background: "#fff", border: "1px solid #dbdbdb", borderRadius: "4px", padding: "40px 40px 28px", width: "100%", maxWidth: "350px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" },
  logoWrap: { marginBottom: "28px" },
  wordmark: { fontSize: "38px", letterSpacing: "-1px", color: "#262626", marginBottom: "22px", lineHeight: 1, backgroundImage: "linear-gradient(45deg, #fd5949, #d6249f, #285AEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  inputWrap: { width: "100%", position: "relative", marginBottom: "6px" },
  input: { width: "100%", padding: "9px 36px 7px 10px", border: "1px solid #dbdbdb", borderRadius: "3px", fontSize: "13px", fontFamily: "inherit", background: "#fafafa", color: "#262626", outline: "none", boxSizing: "border-box" },
  inputFocus: { borderColor: "#a2a2a2", background: "#fff" },
  eyeBtn: { position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" },
  btn: { width: "100%", padding: "8px", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginBottom: "10px", transition: "opacity 0.15s" },
  btnGradient: { background: "linear-gradient(to right, #fd5949, #d6249f, #285AEB)", color: "#fff" },
  forgotWrap: { width: "100%", textAlign: "center", marginTop: "4px" },
  forgotLink: { fontSize: "12px", color: "#385185", textDecoration: "none" },
  card2: { background: "#fff", border: "1px solid #dbdbdb", borderRadius: "4px", padding: "20px 40px", width: "100%", maxWidth: "350px", textAlign: "center", fontSize: "14px", color: "#262626", marginBottom: "20px" },
  switchLink: { color: "#0095f6", fontWeight: 600, cursor: "pointer" },
  appRow: { display: "flex", gap: "10px", marginBottom: "20px" },
  alert: { padding: "9px 13px", borderRadius: "4px", fontSize: "13px", marginBottom: "12px", width: "100%", textAlign: "center" },
  success: { background: "#e8f5e9", border: "1px solid #a5d6a7", color: "#2e7d32" },
  error: { background: "#fff3f3", border: "1px solid #ffcdd2", color: "#c62828" },
  tabRow: { display: "flex", width: "100%", borderBottom: "1px solid #dbdbdb", marginBottom: "20px" },
  tab: { flex: 1, padding: "10px 0", background: "none", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#8e8e8e", borderBottom: "2px solid transparent", marginBottom: "-1px" },
  tabActive: { color: "#262626", borderBottom: "2px solid #262626" },
  termsText: { fontSize: "12px", color: "#8e8e8e", textAlign: "center", lineHeight: 1.5, marginTop: "6px" },
  termsLink: { color: "#385185", textDecoration: "none" },
  orRow: { display: "flex", alignItems: "center", gap: "14px", width: "100%", margin: "4px 0 12px" },
  orLine: { flex: 1, height: "1px", background: "#dbdbdb" },
  orText: { fontSize: "12px", fontWeight: 600, color: "#8e8e8e", letterSpacing: "1px" },
};

export default function InstagramPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [alert, setAlert] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const inp = (name: string): React.CSSProperties => ({ ...S.input, ...(focused === name ? S.inputFocus : {}) });
  const change = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const switchTab = (t: "login" | "signup") => { setTab(t); setAlert(null); setForm({}); setShowPass(false); };

  async function submit() {
    if (!form.email || !form.password) {
      return setAlert({ msg: "Please fill in all required fields.", type: "error" });
    }
    setLoading(true);
    setAlert(null);
    if (tab === "signup") {
      try {
        const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "instagram", ...form }) });
        const data = await res.json();
        if (res.ok) { setAlert({ msg: "✅ Account created!", type: "success" }); setTimeout(() => switchTab("login"), 1500); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Can't reach server.", type: "error" }); }
    } else {
      try {
        const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "instagram", identifier: form.email, password: form.password }) });
        const data = await res.json();
        if (res.ok) { const name = data.user?.firstName || data.user?.username || form.email; setAlert({ msg: `Welcome back, ${name}! 📸`, type: "success" }); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Can't reach server.", type: "error" }); }
    }
    setLoading(false);
  }

  return (
    <div style={S.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap'); input::placeholder{color:#8e8e8e;} input::-ms-reveal{display:none;} input::-ms-clear{display:none;}`}</style>

      <div style={S.card}>
        <div style={S.logoWrap}><InstaLogo /></div>
        <div style={{ ...S.wordmark, fontFamily: "'Grand Hotel', cursive" }}>Instagram</div>

        {alert && <div style={{ ...S.alert, ...(alert.type === "success" ? S.success : S.error) }}>{alert.msg}</div>}

        {tab === "login" ? (
          <>
            <div style={S.inputWrap}>
              <input name="email" type="text" placeholder="Phone number, username, or email" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
            </div>
            <div style={{ ...S.inputWrap, marginBottom: 10 }}>
              <input name="password" type={showPass ? "text" : "password"} placeholder="Password" style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
              {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
            </div>
            <button style={{ ...S.btn, ...S.btnGradient, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Logging in…" : "Log in"}</button>
            <div style={S.forgotWrap}><a href="#" style={S.forgotLink}>Forgot password?</a></div>
          </>
        ) : (
          <>
            <div style={S.tabRow}>
              {(["login", "signup"] as const).map(t => (
                <button key={t} style={{ ...S.tab, ...(tab === t ? S.tabActive : {}) }} onClick={() => switchTab(t)}>{t === "login" ? "Log In" : "Sign Up"}</button>
              ))}
            </div>
            {[["email","text","Mobile Number or Email"],["firstName","text","Full Name"],["username","text","Username"]].map(([name,type,ph]) => (
              <div key={name} style={S.inputWrap}>
                <input name={name} type={type} placeholder={ph} style={inp(name)} value={form[name] || ""} onChange={change} onFocus={() => setFocused(name)} onBlur={() => setFocused("")} />
              </div>
            ))}
            <div style={{ ...S.inputWrap, marginBottom: 6 }}>
              <input name="password" type={showPass ? "text" : "password"} placeholder="Password" style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
              {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
            </div>
            <button style={{ ...S.btn, ...S.btnGradient, marginTop: 6, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Signing up…" : "Sign up"}</button>
            <p style={S.termsText}>By signing up, you agree to our <a href="#" style={S.termsLink}>Terms</a>, <a href="#" style={S.termsLink}>Privacy Policy</a>.</p>
          </>
        )}
      </div>

      {tab === "login" && (
        <div style={S.card2}>
          Don't have an account?{" "}<span style={S.switchLink} onClick={() => switchTab("signup")}>Sign up</span>
        </div>
      )}

      <p style={{ fontSize: "13px", color: "#262626", marginBottom: "12px" }}>Get the app.</p>
      <div style={S.appRow}>
        
      </div>
    </div>
  );
}