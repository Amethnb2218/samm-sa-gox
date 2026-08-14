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
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: "28rem" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => { if (results.length > 0) setOpen(true); }}
        placeholder={lang === "wol" ? "Seeke sa gox... (Dakar, Thies, Pikine...)" : "Rechercher une localite... (Dakar, Thies, Pikine...)"}
        style={{
          width: "100%",
          padding: "8px 12px",
          fontSize: "14px",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-card)",
          outline: "none",
        }}
      />
      {open && results.length > 0 && (
        <ul style={{
          position: "absolute",
          zIndex: 9999,
          top: "100%",
          left: 0,
          right: 0,
          marginTop: "2px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxHeight: "240px",
          overflowY: "auto",
          listStyle: "none",
          padding: 0,
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
                  fontSize: "14px",
                  border: "none",
                  borderBottom: "1px solid var(--color-border)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-sand-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={{ fontWeight: 500 }}>{r.name}</span>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
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
