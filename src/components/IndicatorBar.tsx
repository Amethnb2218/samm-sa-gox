"use client";

import { IndicatorValue } from "@/lib/data";
import { Lang } from "@/lib/wolof";

interface IndicatorBarProps {
  indicator: IndicatorValue;
  lang: Lang;
}

export default function IndicatorBar({ indicator, lang }: IndicatorBarProps) {
  const label = lang === "wol" ? indicator.label_wol : indicator.label_fr;
  const isAbove = indicator.value > indicator.national_avg;
  const maxVal = Math.max(indicator.value, indicator.national_avg) * 1.2;
  const valuePct = (indicator.value / maxVal) * 100;
  const avgPct = (indicator.national_avg / maxVal) * 100;

  return (
    <div className="py-3 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium text-[var(--color-text)]">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="data-mono text-sm font-semibold">
            {indicator.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)]">{indicator.unit}</span>
        </div>
      </div>

      <div className="relative h-4 bg-[var(--color-border)]">
        <div
          className="absolute top-0 left-0 h-full transition-all"
          style={{
            width: `${valuePct}%`,
            backgroundColor: isAbove ? "var(--color-terracotta)" : "var(--color-green)",
          }}
        />
        <div
          className="absolute top-0 h-full w-px bg-[var(--color-text)]"
          style={{ left: `${avgPct}%` }}
        />
        <div
          className="absolute -top-4 text-[9px] text-[var(--color-text-muted)] font-[var(--font-mono)]"
          style={{ left: `${avgPct}%`, transform: "translateX(-50%)" }}
        >
          {lang === "wol" ? "moy." : "moy. nat."}
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Rang" : "Rang"} {indicator.rank}/{indicator.total}
        </span>
        <span
          className="text-[10px] font-medium font-[var(--font-mono)]"
          style={{ color: isAbove ? "var(--color-terracotta)" : "var(--color-green)" }}
        >
          {indicator.delta_pct > 0 ? "+" : ""}
          {indicator.delta_pct.toFixed(1)}% vs national
        </span>
      </div>
    </div>
  );
}
