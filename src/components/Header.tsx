"use client";

import Link from "next/link";
import { Lang } from "@/lib/wolof";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Header({ lang, onLangChange }: HeaderProps) {
  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", position: "sticky", top: 0, zIndex: 50, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "var(--color-terracotta)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <div>
              <h1 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                Samm Sa Gox
              </h1>
              <p style={{ fontSize: "10px", color: "var(--color-text-muted)", lineHeight: 1, marginTop: "2px" }}>
                Intelligence territoriale
              </p>
            </div>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <button
              onClick={() => onLangChange("fr")}
              style={{
                padding: "5px 14px",
                fontSize: "11px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: lang === "fr" ? "var(--color-text)" : "transparent",
                color: lang === "fr" ? "white" : "var(--color-text-muted)",
                transition: "all 0.15s ease",
              }}
            >
              FR
            </button>
            <button
              onClick={() => onLangChange("wol")}
              style={{
                padding: "5px 14px",
                fontSize: "11px",
                fontWeight: 600,
                border: "none",
                borderLeft: "1px solid var(--color-border)",
                cursor: "pointer",
                backgroundColor: lang === "wol" ? "var(--color-text)" : "transparent",
                color: lang === "wol" ? "white" : "var(--color-text-muted)",
                transition: "all 0.15s ease",
              }}
            >
              WOL
            </button>
          </div>
          <span className="label-caps" style={{ fontSize: "9px" }}>
            ANSD 20 ans
          </span>
        </div>
      </div>
    </header>
  );
}
