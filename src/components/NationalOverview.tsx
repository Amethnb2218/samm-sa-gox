"use client";

import { NATIONAL_INDICATORS, REGIONS } from "@/lib/data";
import { NATIONAL_TRENDS } from "@/lib/trends";
import { Lang } from "@/lib/wolof";
import TrendChart from "./TrendChart";
import IDTRanking from "./IDTRanking";

interface NationalOverviewProps {
  lang: Lang;
  onSelectRegion: (code: string) => void;
}

export default function NationalOverview({ lang, onSelectRegion }: NationalOverviewProps) {
  const sortedRegions = [...REGIONS].sort((a, b) => b.population - a.population);

  return (
    <div className="space-y-4">
      {/* National indicators */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
            {lang === "wol" ? "Senegaal — Nataal xam-xam yi" : "Senegal — Indicateurs nationaux"}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {NATIONAL_INDICATORS.slice(0, 8).map((ind) => (
            <div key={ind.code} className="px-4 py-3 border-b border-r border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)] truncate">
                {lang === "wol" ? ind.name_wol : ind.name_fr}
              </p>
              <p className="data-mono text-base font-semibold mt-0.5">
                {ind.value.toLocaleString("fr-FR")}
                <span className="text-[10px] text-[var(--color-text-muted)] ml-1">{ind.unit}</span>
              </p>
              <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
                {ind.source} ({ind.year})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {NATIONAL_TRENDS.slice(0, 4).map((trend) => (
          <TrendChart
            key={trend.code}
            data={trend.data}
            label={lang === "wol" ? trend.name_wol : trend.name_fr}
            unit={trend.unit}
            lang={lang}
            color={trend.code === "INFANT_MORT" ? "var(--color-green)" : "var(--color-terracotta)"}
          />
        ))}
      </div>

      {/* IDT Ranking */}
      <IDTRanking lang={lang} onSelectRegion={onSelectRegion} />

      {/* Regions table */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
            {lang === "wol" ? "14 Gox yu mag yi" : "14 Regions du Senegal"}
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
              <th className="text-left px-4 py-2">{lang === "wol" ? "Gox" : "Region"}</th>
              <th className="text-right px-4 py-2">{lang === "wol" ? "Waay-dekk" : "Population"}</th>
              <th className="text-right px-4 py-2 hidden sm:table-cell">{lang === "wol" ? "Yaatu" : "Superficie"}</th>
              <th className="text-right px-4 py-2">{lang === "wol" ? "Nijaay" : "Densite"}</th>
            </tr>
          </thead>
          <tbody>
            {sortedRegions.map((r, i) => (
              <tr
                key={r.code}
                onClick={() => onSelectRegion(r.code)}
                className="border-b border-[var(--color-border)] last:border-b-0 cursor-pointer hover:bg-[var(--color-sand-light)] transition-colors"
              >
                <td className="px-4 py-2 font-medium">
                  <span className="data-mono text-[10px] text-[var(--color-text-muted)] mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {r.name}
                </td>
                <td className="text-right px-4 py-2 data-mono">{r.population.toLocaleString("fr-FR")}</td>
                <td className="text-right px-4 py-2 data-mono hidden sm:table-cell">{r.area_km2.toLocaleString("fr-FR")} km²</td>
                <td className="text-right px-4 py-2 data-mono font-medium">
                  {Math.round(r.population / r.area_km2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
