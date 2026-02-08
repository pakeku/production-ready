"use client";

import { useState } from "react";
import { useTheme, Button } from "@repo/ui";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    accent: "#6750A4",
    accentLight: isDark ? "#D0BCFF" : "#EADDFF",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: colors.background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: 20,
    }}>
      <style>{`
        input:focus { outline: 2px solid ${colors.accent}; border-color: transparent !important; }
      `}</style>

      <div style={{
        width: "100%",
        maxWidth: 420,
        backgroundColor: colors.backgroundStrong,
        borderRadius: 24,
        padding: 40,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 32, color: colors.accent }}>✦</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.text }}>Self-Service</span>
          </div>
          <p style={{ fontSize: 14, color: colors.subtle, margin: 0 }}>Admin Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@hotel.com"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: 15,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                backgroundColor: colors.background,
                color: colors.text,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: colors.text, display: "block", marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: 15,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                backgroundColor: colors.background,
                color: colors.text,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" style={{ width: 16, height: 16, accentColor: colors.accent }} />
              <span style={{ fontSize: 14, color: colors.subtle }}>Remember me</span>
            </label>
            <a href="#" style={{ fontSize: 14, color: colors.accent, textDecoration: "none" }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px 24px",
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: colors.accent,
              color: "white",
              border: "none",
              borderRadius: 12,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: colors.subtle, marginTop: 24 }}>
          Need access? <a href="/" style={{ color: colors.accent, textDecoration: "none" }}>Contact your administrator</a>
        </p>
      </div>
    </div>
  );
}
