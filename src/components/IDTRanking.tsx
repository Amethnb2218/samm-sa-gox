"use client";

import { computeAllIDT } from "@/lib/idt";
import { Lang } from "@/lib/wolof";

interface IDTRankingProps {
  lang: Lang;
  onSelectRegion: (code: string) => void;
}

export default function IDTRanking({ lang, onSelectRegion }: IDTRankingProps) {
  const allIDT = computeAllIDT();
  const avg = allIDT.reduce((s, r) => s + r.score, 0) / allIDT.length;

  const categoryColor = {
    eleve: "#2D5F2D",
    moyen_sup: "#4A8C4A",
    moyen_inf: "#C4A87D",
    faible: "#B7472A",
  };

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
            {lang === "wol" ? "Classement IDT — Indice Yokkute Gox gi" : "Classement IDT — Indice de Developpement Territorial"}
          </p>
          <span className="data-mono text-[10px] text-[var(--color-text-muted)]">
            moy: {(avg * 100).toFixed(0)}/100
          </span>
        </div>
        <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
          {lang === "wol"
            ? "4 dimension : wergu yaram, jang, koom-koom, mbiri"
            : "4 dimensions : sante, education, economie, infrastructure"}
        </p>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {allIDT.map((r) => (
          <button
            key={r.code}
            onClick={() => onSelectRegion(r.code)}
            className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[var(--color-sand-light)] transition-colors text-left"
          >
            <span
              className="data-mono text-xs font-bold w-5"
              style={{ color: categoryColor[r.category] }}
            >
              {String(r.rank).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">{r.name}</span>
                <span className="data-mono text-sm font-bold" style={{ color: categoryColor[r.category] }}>
                  {(r.score * 100).toFixed(0)}
                </span>
              </div>
              <div className="flex gap-1 mt-1">
                {Object.entries(r.dimensions).map(([key, val]) => (
                  <div key={key} className="flex-1 h-1 bg-[var(--color-border)]">
                    <div
                      className="h-full"
                      style={{
                        width: `${val * 100}%`,
                        backgroundColor: val >= 0.6 ? "#2D5F2D" : val >= 0.4 ? "#C4A87D" : "#B7472A",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
