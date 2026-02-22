"use client";

import { useState } from "react";

const SnapLogo = () => (
  <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
    <path d="M50 10C33.43 10 20 23.43 20 40v18c0 3.31-2.69 6-6 6v4c3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6h2c2.21 0 4 1.79 4 4v2h60v-2c0-2.21 1.79-4 4-4h2c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6v-4c-3.31 0-6-2.69-6-6V40C80 23.43 66.57 10 50 10z" fill="#FFFC00" />
    <circle cx="38" cy="44" r="5" fill="#111" />
    <circle cx="62" cy="44" r="5" fill="#111" />
    <path d="M40 58c2 4 8 6 10 6s8-2 10-6" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  page: { minHeight: "100vh", background: "#FFFC00", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", padding: "24px 16px" },
  wrap: { width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", alignItems: "center" },
  title: { fontSize: "30px", fontWeight: 800, color: "#000", margin: "10px 0 24px", letterSpacing: "-0.5px" },
  card: { background: "#fff", borderRadius: "20px", padding: "28px 24px 24px", width: "100%", boxShadow: "0 2px 20px rgba(0,0,0,0.09)" },
  tabRow: { display: "flex", borderBottom: "2px solid #f0f0f0", marginBottom: "22px" },
  tab: { flex: 1, padding: "10px 0", background: "none", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", borderBottom: "3px solid transparent", marginBottom: "-2px", color: "#aaa" },
  tabActive: { color: "#000", borderBottom: "3px solid #FFFC00" },
  inputWrap: { position: "relative", marginBottom: "11px" },
  input: { width: "100%", padding: "13px 44px 13px 15px", border: "1.5px solid #e2e2e2", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit", outline: "none", background: "#f7f7f7", color: "#000", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s" },
  inputFocus: { borderColor: "#000", background: "#fff" },
  eyeBtn: { position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" },
  forgotLink: { display: "block", textAlign: "center", color: "#888", fontSize: "13px", marginBottom: "14px", marginTop: "4px", textDecoration: "none" },
  btn: { width: "100%", padding: "14px", borderRadius: "60px", border: "none", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: "10px", transition: "opacity 0.15s" },
  btnYellow: { background: "#FFFC00", color: "#000" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "11px" },
  terms: { fontSize: "11.5px", color: "#999", textAlign: "center", lineHeight: 1.55, marginTop: "14px" },
  termsLink: { color: "#000", fontWeight: 600, textDecoration: "none" },
  bottomText: { marginTop: "18px", fontSize: "13.5px", color: "#444", textAlign: "center" },
  bottomLink: { color: "#000", fontWeight: 700, cursor: "pointer" },
  alert: { padding: "10px 14px", borderRadius: "9px", fontSize: "13px", marginBottom: "14px" },
  success: { background: "rgba(0,180,70,0.08)", border: "1px solid rgba(0,180,70,0.25)", color: "#007a30" },
  error: { background: "rgba(210,40,40,0.07)", border: "1px solid rgba(210,40,40,0.2)", color: "#c00" },
};

export default function SnapchatPage() {
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
    if (!form.email || !form.password) return setAlert({ msg: "Email/phone aur password dono required hain.", type: "error" });
    setLoading(true); setAlert(null);
    if (tab === "signup") {
      try {
        const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "snapchat", email: form.email, phone: form.phone || "", firstName: form.firstName || "", lastName: form.lastName || "", password: form.password }) });
        const data = await res.json();
        if (res.ok) { setAlert({ msg: "✅ Account ban gaya! Ab login karo.", type: "success" }); setTimeout(() => switchTab("login"), 1500); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Server se connect nahi ho pa raha.", type: "error" }); }
    } else {
      try {
        const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "snapchat", identifier: form.email, password: form.password }) });
        const data = await res.json();
        if (res.ok) { const name = data.user?.firstName || form.email; setAlert({ msg: `👻 Welcome back, ${name}!`, type: "success" }); }
        else setAlert({ msg: data.message, type: "error" });
      } catch { setAlert({ msg: "Server se connect nahi ho pa raha.", type: "error" }); }
    }
    setLoading(false);
  }

  return (
    <div style={S.page}>
      <style>{`input::placeholder{color:#aaa;} input::-ms-reveal{display:none;}`}</style>
      <div style={S.wrap}>
        <SnapLogo />
        <h1 style={S.title}>Snapchat</h1>

        <div style={S.card}>
          <div style={S.tabRow}>
            {(["login", "signup"] as const).map(t => (
              <button key={t} style={{ ...S.tab, ...(tab === t ? S.tabActive : {}) }} onClick={() => switchTab(t)}>
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {alert && <div style={{ ...S.alert, ...(alert.type === "success" ? S.success : S.error) }}>{alert.msg}</div>}

          {tab === "login" ? (
            <>
              <div style={S.inputWrap}>
                <input name="email" type="text" placeholder="Email, Phone, or Username" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
              </div>
              <div style={{ ...S.inputWrap, marginBottom: 4 }}>
                <input name="password" type={showPass ? "text" : "password"} placeholder="Password" style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
                {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
              </div>
              <a href="#" style={S.forgotLink}>Forgot your password?</a>
              <button style={{ ...S.btn, ...S.btnYellow, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Logging in…" : "Log In"}</button>
            </>
          ) : (
            <>
              <div style={S.grid2}>
                <input name="firstName" type="text" placeholder="First Name" style={inp("firstName")} value={form.firstName || ""} onChange={change} onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")} />
                <input name="lastName" type="text" placeholder="Last Name" style={inp("lastName")} value={form.lastName || ""} onChange={change} onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")} />
              </div>
              <div style={S.inputWrap}>
                <input name="email" type="email" placeholder="Email" style={inp("email")} value={form.email || ""} onChange={change} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
              </div>
              <div style={S.inputWrap}>
                <input name="phone" type="tel" placeholder="Phone (optional)" style={inp("phone")} value={form.phone || ""} onChange={change} onFocus={() => setFocused("phone")} onBlur={() => setFocused("")} />
              </div>
              <div style={{ ...S.inputWrap }}>
                <input name="password" type={showPass ? "text" : "password"} placeholder="Password" style={inp("password")} value={form.password || ""} onChange={change} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} />
                {form.password && <button style={S.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}><EyeIcon open={showPass} /></button>}
              </div>
              <button style={{ ...S.btn, ...S.btnYellow, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>{loading ? "Creating…" : "Sign Up & Accept"}</button>
              <p style={S.terms}>By tapping "Sign Up & Accept", you agree to our{" "}<a href="#" style={S.termsLink}>Privacy Policy</a> and{" "}<a href="#" style={S.termsLink}>Terms of Service</a>.</p>
            </>
          )}
        </div>

        <p style={S.bottomText}>
          {tab === "login"
            ? <> Don't have an account?{" "}<span style={S.bottomLink} onClick={() => switchTab("signup")}>Sign up</span></>
            : <> Already have an account?{" "}<span style={S.bottomLink} onClick={() => switchTab("login")}>Log in</span></>
          }
        </p>
      </div>
    </div>
  );
}