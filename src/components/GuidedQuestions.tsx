"use client";

import { Lang } from "@/lib/wolof";

interface GuidedQuestionsProps {
  lang: Lang;
  onSelect: (action: string) => void;
}

const QUESTIONS = [
  { id: "problems", fr: "Quels sont les principaux problèmes de ce territoire ?", wol: "Lan mooy jafe-jafe yi gëna am doole ci gox gi ?", action: "observer" },
  { id: "invest", fr: "Où investir dans ce territoire ?", wol: "Fan la war a tànn xaalis ci gox gi ?", action: "agir" },
  { id: "similar", fr: "Quels territoires ressemblent au mien ?", wol: "Yan gox yi mel ni sama gox ?", action: "comparer" },
  { id: "progress", fr: "Quels progrès en 20 ans ?", wol: "Lan mooy yokk yi ci 20 at ?", action: "timeline" },
  { id: "impact", fr: "Quel impact si on investit ?", wol: "Lan la mën a wax su ñu tànn xaalis ?", action: "agir" },
  { id: "compare", fr: "Comment se positionne ce territoire ?", wol: "Naka la gox gi toog ci diggante yeneen yi ?", action: "comparer" },
];

export default function GuidedQuestions({ lang, onSelect }: GuidedQuestionsProps) {
  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
          {lang === "wol" ? "LAN NGAY BËGG A XAAM ?" : "QUE VOULEZ-VOUS SAVOIR ?"}
        </p>
      </div>
      <div style={{ padding: "12px 16px" }}>
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
              marginBottom: "6px",
              border: "1px solid var(--color-border)",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              transition: "background-color 0.1s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-sand-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <span style={{ fontSize: "10px", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", width: "12px" }}>→</span>
            <span>{lang === "wol" ? q.wol : q.fr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
