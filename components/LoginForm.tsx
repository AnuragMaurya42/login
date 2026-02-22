"use client";

import { useState } from "react";

export type Platform = "snapchat" | "instagram" | "linkedin";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface LoginFormProps {
  platform: Platform;
  accentColor: string;
  accentText: string;
  logo: React.ReactNode;
  tagline: string;
  signupFields: Field[];
  loginFields: Field[];
  bgClass: string;
  cardClass: string;
  inputClass: string;
  btnClass: string;
  fontClass?: string;
}

export default function LoginForm({
  platform,
  accentColor,
  accentText,
  logo,
  tagline,
  signupFields,
  loginFields,
  bgClass,
  cardClass,
  inputClass,
  btnClass,
  fontClass = "",
}: LoginFormProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const fields = tab === "login" ? loginFields : signupFields;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setAlert(null);
    setLoading(true);

    if (tab === "signup") {
      // ── SIGNUP ── required fields check
      const requiredFields = signupFields.filter((f) => f.required);
      for (const f of requiredFields) {
        if (!formData[f.name]?.trim()) {
          setAlert({ msg: `${f.label} is required.`, type: "error" });
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platform, ...formData }),
        });
        const data = await res.json();
        if (res.ok) {
          setAlert({ msg: `✅ Account created! Welcome, ${data.firstName}!`, type: "success" });
          setTimeout(() => { setTab("login"); setFormData({}); }, 1500);
        } else {
          setAlert({ msg: data.message, type: "error" });
        }
      } catch {
        setAlert({ msg: "Server se connect nahi ho pa raha. Check your internet.", type: "error" });
      }

    } else {
      // ── LOGIN ── real DB check via /api/login
      const identifier = formData["email"] || formData["username"] || formData["phone"];
      const password   = formData["password"];

      if (!identifier || !password) {
        setAlert({ msg: "Please fill in all fields.", type: "error" });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platform, identifier, password }),
        });
        const data = await res.json();

        if (res.ok) {
          const name = data.user?.firstName || data.user?.username || identifier;
          setAlert({ msg: `👋 Welcome back, ${name}!`, type: "success" });
        } else {
          setAlert({ msg: data.message, type: "error" });
        }
      } catch {
        setAlert({ msg: "Server se connect nahi ho pa raha.", type: "error" });
      }
    }

    setLoading(false);
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass} ${fontClass} p-4`}>
      <div className={`w-full max-w-md ${cardClass} rounded-3xl p-10 shadow-2xl`}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">{logo}</div>
          <p className="text-sm opacity-50 text-center">{tagline}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden mb-8 border border-white/10">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setAlert(null); setFormData({}); }}
              className={`flex-1 py-3 text-sm font-semibold capitalize transition-all duration-200 ${
                tab === t ? btnClass : "bg-transparent opacity-40 hover:opacity-70"
              }`}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Alert */}
        {alert && (
          <div
            className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium ${
              alert.type === "success"
                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
            }`}
          >
            {alert.msg}
          </div>
        )}

        {/* Fields */}
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold uppercase tracking-widest opacity-50 mb-2">
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={formData[f.name] || ""}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${inputClass}`}
              />
            </div>
          ))}
        </div>

        {tab === "login" && (
          <div className="text-right mt-2">
            <button className="text-xs opacity-60 hover:opacity-100 transition-opacity" style={{ color: accentColor }}>
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-150 disabled:opacity-50 ${btnClass}`}
        >
          {loading ? "Please wait..." : tab === "login" ? "Log In" : "Create Account"}
        </button>

        <p className="text-center text-xs opacity-40 mt-6">
          {tab === "login" ? "New here? " : "Already have an account? "}
          <button
            onClick={() => { setTab(tab === "login" ? "signup" : "login"); setAlert(null); setFormData({}); }}
            className="font-semibold underline underline-offset-2"
            style={{ color: accentColor }}
          >
            {tab === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}