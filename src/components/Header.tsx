"use client";

import { Lang } from "@/lib/wolof";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Header({ lang, onLangChange }: HeaderProps) {
  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", backgroundColor: "var(--color-terracotta)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
          </div>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, fontFamily: "var(--font-serif)" }}>
              Sàmm Sa Gox
            </h1>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", lineHeight: 1, marginTop: "3px" }}>
              Intelligence Territoriale — Sénégal
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", border: "1px solid var(--color-border)" }}>
            <button
              onClick={() => onLangChange("fr")}
              style={{
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor: lang === "fr" ? "var(--color-text)" : "transparent",
                color: lang === "fr" ? "white" : "var(--color-text-muted)",
              }}
            >
              FR
            </button>
            <button
              onClick={() => onLangChange("wol")}
              style={{
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor: lang === "wol" ? "var(--color-text)" : "transparent",
                color: lang === "wol" ? "white" : "var(--color-text-muted)",
              }}
            >
              WOL
            </button>
          </div>
          <span style={{ fontSize: "10px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            ANSD 20 ANS
          </span>
        </div>
      </div>
    </header>
  );
}
