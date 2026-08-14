"use client";

import { REGIONS } from "@/lib/data";
import { Lang } from "@/lib/wolof";

interface ComparisonChartProps {
  selectedCode: string | null;
  lang: Lang;
}

export default function ComparisonChart({ selectedCode, lang }: ComparisonChartProps) {
  const data = REGIONS.map((r) => ({
    code: r.code,
    name: r.name,
    density: Math.round(r.population / r.area_km2),
  })).sort((a, b) => b.density - a.density);

  const maxDensity = data[0]?.density || 1;

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Nettali nijaay nit ci gox yi" : "Comparaison densite — 14 regions"}
        </p>
      </div>
      <div className="px-4 py-3 space-y-1">
        {data.map((d) => {
          const isSelected = d.code === selectedCode;
          const pct = (d.density / maxDensity) * 100;
          return (
            <div key={d.code} className="flex items-center gap-2">
              <span
                className="text-[10px] w-20 truncate font-[var(--font-mono)]"
                style={{ fontWeight: isSelected ? 700 : 400 }}
              >
                {d.name}
              </span>
              <div className="flex-1 h-3 bg-[var(--color-border)] relative">
                <div
                  className="absolute top-0 left-0 h-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isSelected ? "var(--color-terracotta)" : "var(--color-sand)",
                  }}
                />
              </div>
              <span
                className="data-mono text-[10px] w-12 text-right"
                style={{ fontWeight: isSelected ? 700 : 400 }}
              >
                {d.density}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
