"use client";

import { computeGaps, GapResult } from "@/lib/norms";
import { Lang } from "@/lib/wolof";

interface GapAnalysisProps {
  regionCode: string;
  population: number;
  lang: Lang;
}

export default function GapAnalysis({ regionCode, population, lang }: GapAnalysisProps) {
  const gaps = computeGaps(regionCode, population);
  if (gaps.length === 0) return null;

  const critiques = gaps.filter((g) => g.status === "critique");
  const alertes = gaps.filter((g) => g.status === "alerte");
  const conformes = gaps.filter((g) => g.status === "conforme");

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Nettali ak norme yi — Jafe-jafe yi" : "Analyse des ecarts — Conformite aux normes"}
        </p>
      </div>

      {/* Summary bar */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-red-600" />
          <span className="text-[10px] font-[var(--font-mono)]">
            {critiques.length} {lang === "wol" ? "xewat" : "critique(s)"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-amber-500" />
          <span className="text-[10px] font-[var(--font-mono)]">
            {alertes.length} {lang === "wol" ? "diggante" : "alerte(s)"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[var(--color-green)]" />
          <span className="text-[10px] font-[var(--font-mono)]">
            {conformes.length} {lang === "wol" ? "baax" : "conforme(s)"}
          </span>
        </div>
      </div>

      {/* Gap items */}
      <div className="divide-y divide-[var(--color-border)]">
        {gaps.map((gap) => (
          <GapItem key={gap.norm.key} gap={gap} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function GapItem({ gap, lang }: { gap: GapResult; lang: Lang }) {
  const label = lang === "wol" ? gap.norm.label_wol : gap.norm.label_fr;
  const statusColor =
    gap.status === "critique" ? "bg-red-600" :
    gap.status === "alerte" ? "bg-amber-500" : "bg-[var(--color-green)]";
  const statusLabel =
    gap.status === "critique" ? (lang === "wol" ? "XEWAT" : "CRITIQUE") :
    gap.status === "alerte" ? (lang === "wol" ? "DIGGANTE" : "ALERTE") :
    (lang === "wol" ? "BAAX" : "CONFORME");

  const recommendation = lang === "wol" ? gap.recommendation_wol : gap.recommendation_fr;

  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1.5 h-1.5 ${statusColor}`} />
            <span className="text-xs font-medium">{label}</span>
          </div>
          <div className="flex items-baseline gap-3 ml-3.5">
            <span className="data-mono text-sm font-semibold">
              {gap.current_value.toFixed(gap.current_value < 10 ? 2 : 1)}
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)]">
              vs {gap.norm.standard} ({gap.norm.source})
            </span>
          </div>
        </div>
        <span className={`text-[9px] font-bold font-[var(--font-mono)] px-1.5 py-0.5 ${statusColor} text-white`}>
          {statusLabel}
        </span>
      </div>
      {recommendation && (
        <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 ml-3.5 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
          {recommendation}
        </p>
      )}
    </div>
  );
}
