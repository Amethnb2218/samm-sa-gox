"use client";

import { Lang } from "@/lib/wolof";

interface GuidedQuestionsProps {
  lang: Lang;
  onSelect: (action: string) => void;
}

const QUESTIONS = [
  { id: "problems", fr: "Quels problemes prioritaires ?", wol: "Lan mooy jafe-jafe yi ?", action: "observer", icon: "!" },
  { id: "similar", fr: "Territoires comparables ?", wol: "Yan gox yi mel ni ?", action: "comparer", icon: "=" },
  { id: "why", fr: "Comment le score est calcule ?", wol: "Naka la score bi joge ?", action: "expliquer", icon: "?" },
  { id: "invest", fr: "Simuler un investissement", wol: "Seenub xaalis", action: "agir", icon: "+" },
  { id: "progress", fr: "Evolution sur 20 ans", wol: "Yokk yi ci 20 at", action: "timeline", icon: "~" },
];

export default function GuidedQuestions({ lang, onSelect }: GuidedQuestionsProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
          {lang === "wol" ? "Lan ngay begg a xaam ?" : "Explorer"}
        </span>
      </div>
      <div style={{ padding: "8px" }}>
        {QUESTIONS.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.action)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              marginBottom: "2px",
              border: "none",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <span style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", fontWeight: 700, backgroundColor: "var(--color-terracotta-bg)", borderRadius: "2px" }}>
              {q.icon}
            </span>
            <span style={{ color: "var(--color-text-secondary)" }}>{lang === "wol" ? q.wol : q.fr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
