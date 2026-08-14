"use client";

import { TerritoryDiagnostic } from "@/lib/data";
import { Lang, generateNarrative } from "@/lib/wolof";
import IndicatorBar from "./IndicatorBar";
import GapAnalysis from "./GapAnalysis";
import OpportunityScorePanel from "./OpportunityScore";
import PDCGenerator from "./PDCGenerator";
import Simulator from "./Simulator";
import IDTPanel from "./IDTPanel";
import Projections from "./Projections";

interface DiagnosticPanelProps {
  diagnostic: TerritoryDiagnostic;
  lang: Lang;
}

export default function DiagnosticPanel({ diagnostic, lang }: DiagnosticPanelProps) {
  const narrative = generateNarrative(
    diagnostic.name,
    diagnostic.population,
    diagnostic.region,
    {
      density: diagnostic.density,
      nationalAvgDensity: diagnostic.indicators[0]?.national_avg,
    },
    lang
  );

  return (
    <div className="space-y-4">
      {/* Main card */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
                {lang === "wol" ? "Seetu gox gi" : "Diagnostic territorial"}
              </p>
              <h2 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                {diagnostic.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)]">
                {diagnostic.type === "region" ? "REGION" : "DEPT"}
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                {diagnostic.region}
              </p>
            </div>
          </div>
        </div>

        {/* Key figures */}
        <div className="grid grid-cols-3 border-b border-[var(--color-border)]">
          <div className="px-4 py-3 border-r border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-[var(--font-mono)]">
              {lang === "wol" ? "Waay-dekk" : "Population"}
            </p>
            <p className="data-mono text-lg font-semibold mt-0.5">
              {diagnostic.population.toLocaleString("fr-FR")}
            </p>
          </div>
          <div className="px-4 py-3 border-r border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-[var(--font-mono)]">
              {lang === "wol" ? "Yaatu" : "Superficie"}
            </p>
            <p className="data-mono text-lg font-semibold mt-0.5">
              {diagnostic.area_km2.toLocaleString("fr-FR")} <span className="text-xs text-[var(--color-text-muted)]">km2</span>
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-[var(--font-mono)]">
              {lang === "wol" ? "Nijaay" : "Densite"}
            </p>
            <p className="data-mono text-lg font-semibold mt-0.5">
              {Math.round(diagnostic.density)} <span className="text-xs text-[var(--color-text-muted)]">hab/km2</span>
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-sand-light)]">
          <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
            {narrative}
          </p>
        </div>

        {/* Indicators */}
        <div className="px-4 py-2">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)] mb-2">
            {lang === "wol" ? "Nataal xam-xam yi" : "Indicateurs demographiques"}
          </p>
          {diagnostic.indicators.map((ind) => (
            <IndicatorBar key={ind.key} indicator={ind} lang={lang} />
          ))}
        </div>

        {/* Rank */}
        <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)]">
            {lang === "wol" ? "Rang ci nijaay nit" : "Rang densite population"}
            {" "}
            <span className="font-bold text-[var(--color-terracotta)]">
              #{diagnostic.rank.value} / {diagnostic.rank.total}
            </span>
          </span>
        </div>
      </div>

      {/* IDT - Indice de Développement Territorial */}
      {diagnostic.type === "region" && (
        <IDTPanel regionCode={diagnostic.code} lang={lang} />
      )}

      {/* Gap Analysis */}
      {diagnostic.type === "region" && (
        <GapAnalysis regionCode={diagnostic.code} population={diagnostic.population} lang={lang} />
      )}

      {/* Projections 2030 */}
      {diagnostic.type === "region" && (
        <Projections regionCode={diagnostic.code} population={diagnostic.population} lang={lang} />
      )}

      {/* Opportunity Score */}
      {diagnostic.type === "region" && (
        <OpportunityScorePanel
          regionCode={diagnostic.code}
          population={diagnostic.population}
          area_km2={diagnostic.area_km2}
          lang={lang}
        />
      )}

      {/* Investment Simulator */}
      {diagnostic.type === "region" && (
        <Simulator
          regionCode={diagnostic.code}
          population={diagnostic.population}
          lang={lang}
        />
      )}

      {/* PDC Generator */}
      {diagnostic.type === "region" && (
        <PDCGenerator diagnostic={diagnostic} lang={lang} />
      )}
    </div>
  );
}
