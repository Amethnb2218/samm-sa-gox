"use client";

import { useState, useRef, useEffect } from "react";
import { searchTerritories } from "@/lib/data";
import { Lang } from "@/lib/wolof";

interface SearchBarProps {
  lang: Lang;
  onSelect: (code: string) => void;
}

export default function SearchBar({ lang, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchTerritories>>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (value.length >= 1) {
      const r = searchTerritories(value);
      setResults(r);
      setOpen(r.length > 0);
    } else {
      setResults([]);
      setOpen(false);
    }
  }

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
      <div style={{ position: "relative" }}>
        <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "var(--color-text-muted)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          placeholder={lang === "wol" ? "Seeke sa gox..." : "Rechercher un territoire..."}
          style={{
            width: "100%",
            padding: "10px 12px 10px 36px",
            fontSize: "13px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-bg-card)",
            outline: "none",
            transition: "border-color 0.15s ease",
          }}
          onFocusCapture={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--color-terracotta-muted)"; }}
          onBlurCapture={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--color-border)"; }}
        />
      </div>
      {open && results.length > 0 && (
        <ul style={{
          position: "absolute",
          zIndex: 9999,
          top: "100%",
          left: 0,
          right: 0,
          marginTop: "4px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          maxHeight: "240px",
          overflowY: "auto",
          listStyle: "none",
          padding: "4px",
          margin: 0,
        }}>
          {results.map((r) => (
            <li key={r.code} style={{ margin: 0, padding: 0 }}>
              <button
                onClick={() => {
                  onSelect(r.code);
                  setQuery(r.name);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  fontSize: "13px",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background-color 0.1s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={{ fontWeight: 500 }}>{r.name}</span>
                <span className="label-caps" style={{ fontSize: "9px" }}>
                  {r.type} — {r.region}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
