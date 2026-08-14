"use client";

import { computeOpportunityScore } from "@/lib/norms";
import { Lang } from "@/lib/wolof";

interface OpportunityScoreProps {
  regionCode: string;
  population: number;
  area_km2: number;
  lang: Lang;
}

export default function OpportunityScorePanel({ regionCode, population, area_km2, lang }: OpportunityScoreProps) {
  const score = computeOpportunityScore(regionCode, population, area_km2);
  if (score.overall === 0) return null;

  const categoryLabel = {
    tres_forte: { fr: "TRES FORTE", wol: "LU MAG TOROP" },
    forte: { fr: "FORTE", wol: "LU MAG" },
    moderee: { fr: "MODEREE", wol: "DIGGANTE" },
    faible: { fr: "FAIBLE", wol: "NDAW" },
  };

  const categoryColor = {
    tres_forte: "var(--color-terracotta)",
    forte: "var(--color-green)",
    moderee: "var(--color-sand)",
    faible: "var(--color-text-muted)",
  };

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Toll oportinite entreprenariat" : "Score d'opportunite entrepreneuriale"}
        </p>
      </div>

      {/* Score display */}
      <div className="px-4 py-4 border-b border-[var(--color-border)] flex items-center gap-4">
        <div
          className="w-16 h-16 flex items-center justify-center border-2"
          style={{ borderColor: categoryColor[score.category] }}
        >
          <span className="data-mono text-2xl font-bold" style={{ color: categoryColor[score.category] }}>
            {Math.round(score.overall)}
          </span>
        </div>
        <div>
          <p
            className="text-sm font-bold font-[var(--font-mono)]"
            style={{ color: categoryColor[score.category] }}
          >
            {lang === "wol" ? categoryLabel[score.category].wol : categoryLabel[score.category].fr}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
            {lang === "wol"
              ? "Oportinite ngir investissement ci gox gii"
              : "Opportunite d'investissement dans ce territoire"}
          </p>
        </div>
      </div>

      {/* Factors breakdown */}
      <div className="px-4 py-3 space-y-3">
        {score.factors.map((f, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">
                {lang === "wol" ? f.label_wol : f.label_fr}
              </span>
              <span className="data-mono text-[10px] font-medium">
                {Math.round(f.score)}/100
              </span>
            </div>
            <div className="h-1.5 bg-[var(--color-border)]">
              <div
                className="h-full transition-all"
                style={{
                  width: `${Math.min(100, f.score)}%`,
                  backgroundColor: f.score >= 60 ? "var(--color-green)" : f.score >= 40 ? "var(--color-sand)" : "var(--color-terracotta)",
                }}
              />
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5 font-[var(--font-mono)]">
              {f.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
