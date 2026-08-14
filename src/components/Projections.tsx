"use client";

import { computeRegionProjections } from "@/lib/projections";
import { REGION_EXTENDED } from "@/lib/norms";
import { Lang } from "@/lib/wolof";

interface ProjectionsProps {
  regionCode: string;
  population: number;
  lang: Lang;
}

export default function Projections({ regionCode, population, lang }: ProjectionsProps) {
  const data = REGION_EXTENDED.find((r) => r.code === regionCode);
  if (!data) return null;

  const projections = computeRegionProjections(
    regionCode,
    population,
    data.health_centers,
    data.schools
  );

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Seeti lek ci ginnaaw — 2030" : "Projections — Horizon 2030"}
        </p>
        <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
          {lang === "wol" ? "Regression lineaire ci donnees yi am" : "Regression lineaire sur donnees historiques"}
        </p>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {projections.map((proj, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-medium">
                {lang === "wol" ? proj.label_wol : proj.label_fr}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="data-mono text-[10px] text-[var(--color-text-muted)]">
                  {proj.current_year}: {proj.current_value.toLocaleString("fr-FR")}
                </span>
                <span className="text-[var(--color-terracotta)]">&rarr;</span>
                <span className="data-mono text-sm font-bold">
                  {proj.projected_value.toLocaleString("fr-FR")}
                </span>
              </div>
            </div>

            {/* Progress bar showing current vs projected */}
            <div className="h-1.5 bg-[var(--color-border)] mb-2 relative">
              <div
                className="absolute top-0 left-0 h-full bg-[var(--color-text-muted)]"
                style={{ width: `${Math.min(100, (proj.current_value / proj.projected_value) * 100)}%` }}
              />
              <div
                className="absolute top-0 left-0 h-full bg-[var(--color-terracotta)] opacity-30"
                style={{ width: "100%" }}
              />
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? proj.insight_wol : proj.insight_fr}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
