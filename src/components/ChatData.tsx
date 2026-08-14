"use client";

import { useState } from "react";
import { processQuery, ChatResponse } from "@/lib/chat-engine";
import { Lang } from "@/lib/wolof";

interface ChatDataProps {
  lang: Lang;
}

export default function ChatData({ lang }: ChatDataProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    // First: try pattern-based (instant, offline)
    const patternResult = processQuery(query);

    // Then: try AI (if API configured)
    setLoading(true);
    setAiResponse(null);
    setResponse(patternResult);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query, lang }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.answer) {
          setAiResponse(data.answer);
        }
      }
    } catch {
      // Fallback to pattern-based (already set)
    }
    setLoading(false);
  }

  const suggestions = lang === "wol"
    ? ["Waay-dekk Dakar", "Postu wergu yaram Kedougou", "Gox gi gen a seqet", "Classement IDT", "Nettali Dakar ak Thies"]
    : ["Population Dakar", "Postes de sante Kedougou", "Region la plus pauvre", "Classement IDT", "Comparer Dakar et Thies"];

  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            {lang === "wol" ? "Agent intelligent — Laajal donnees yi" : "Agent intelligent — Interroger les donnees"}
          </p>
          <p style={{ fontSize: "9px", color: "var(--color-text-muted)", marginTop: "2px" }}>
            {lang === "wol" ? "Bind ci wolof walla francais" : "Posez votre question en francais ou wolof"}
          </p>
        </div>
        <span style={{ fontSize: "8px", padding: "2px 6px", border: "1px solid var(--color-green)", color: "var(--color-green)", fontFamily: "var(--font-mono)" }}>
          LLM + DATA
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "wol" ? "Ex: Ndax Kedougou am na postu wergu yaram bu nekk?" : "Ex: Combien de postes de sante a Kedougou?"}
          style={{
            flex: 1,
            padding: "10px 12px",
            fontSize: "13px",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "12px",
            fontWeight: 600,
            backgroundColor: loading ? "var(--color-text-muted)" : "var(--color-terracotta)",
            color: "white",
            border: "none",
            cursor: loading ? "wait" : "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {loading ? "..." : (lang === "wol" ? "LAAJ" : "DEMANDER")}
        </button>
      </form>

      {/* Suggestions */}
      {!response && !aiResponse && (
        <div style={{ padding: "0 16px 12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); }}
              style={{
                padding: "4px 10px",
                fontSize: "10px",
                border: "1px solid var(--color-border)",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* AI Response */}
      {aiResponse && (
        <div style={{ padding: "16px", borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-sand-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", backgroundColor: "var(--color-green)", borderRadius: "50%" }} />
            <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--color-green)" }}>REPONSE IA</span>
          </div>
          <p style={{ fontSize: "13px", lineHeight: 1.7, fontFamily: "var(--font-serif)" }}>
            {aiResponse}
          </p>
        </div>
      )}

      {/* Pattern-based Response (fallback or complement) */}
      {response && response.type !== "text" && response.data && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--color-border)" }}>
          {!aiResponse && (
            <p style={{ fontSize: "13px", lineHeight: 1.6, fontFamily: "var(--font-serif)", marginBottom: "10px" }}>
              {lang === "wol" ? response.answer_wol : response.answer_fr}
            </p>
          )}
          <div style={{ marginTop: "8px" }}>
            {response.data.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "10px", width: "80px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                  {d.label}
                </span>
                <div style={{ flex: 1, height: "6px", backgroundColor: "var(--color-border)" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, (d.value / Math.max(...response.data!.map((x) => x.value))) * 100)}%`,
                      backgroundColor: i === 0 ? "var(--color-terracotta)" : "var(--color-green)",
                    }}
                  />
                </div>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 600, width: "70px", textAlign: "right" }}>
                  {d.value.toLocaleString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback text only */}
      {response && !aiResponse && response.type === "text" && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-serif)" }}>
            {lang === "wol" ? response.answer_wol : response.answer_fr}
          </p>
        </div>
      )}

      {(response || aiResponse) && (
        <div style={{ padding: "8px 16px", borderTop: "1px solid var(--color-border)" }}>
          <button
            onClick={() => { setResponse(null); setAiResponse(null); setQuery(""); }}
            style={{ fontSize: "10px", color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)" }}
          >
            {lang === "wol" ? "Seqal" : "Nouvelle question"}
          </button>
        </div>
      )}
    </div>
  );
}
