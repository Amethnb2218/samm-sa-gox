"use client";

import { useState } from "react";
import { REGIONS } from "@/lib/data";
import { REGION_EXTENDED } from "@/lib/norms";
import { Lang } from "@/lib/wolof";

interface SimulatorProps {
  regionCode: string;
  population: number;
  lang: Lang;
}

export default function Simulator({ regionCode, population, lang }: SimulatorProps) {
  const [investType, setInvestType] = useState<"sante" | "education" | "eau">("sante");

  const data = REGION_EXTENDED.find((r) => r.code === regionCode);
  if (!data) return null;

  const simulations = {
    sante: {
      label_fr: "Construction poste de sante",
      label_wol: "Tabax postu wergu yaram",
      cost: 45,
      unit: "millions FCFA",
      current: data.health_centers,
      norm_per: 10000,
      impact_fr: (count: number) =>
        `+${count} poste(s) de sante couvrirait ${(count * 10000).toLocaleString("fr-FR")} personnes supplementaires. Ratio passerait de ${((data.health_centers / population) * 10000).toFixed(2)} a ${(((data.health_centers + count) / population) * 10000).toFixed(2)} pour 10 000 hab.`,
      impact_wol: (count: number) =>
        `+${count} postu wergu yaram dina musal ${(count * 10000).toLocaleString("fr-FR")} nit. Toll bi dina dem ci ${((data.health_centers / population) * 10000).toFixed(2)} ba ${(((data.health_centers + count) / population) * 10000).toFixed(2)} ci 10 000 nit.`,
    },
    education: {
      label_fr: "Construction ecole primaire",
      label_wol: "Tabax daara",
      cost: 35,
      unit: "millions FCFA",
      current: data.schools,
      norm_per: 5000,
      impact_fr: (count: number) =>
        `+${count} ecole(s) accueillerait ~${(count * 200).toLocaleString("fr-FR")} eleves supplementaires. Ratio passerait de ${((data.schools / population) * 5000).toFixed(2)} a ${(((data.schools + count) / population) * 5000).toFixed(2)} pour 5 000 hab.`,
      impact_wol: (count: number) =>
        `+${count} daara dina jot ~${(count * 200).toLocaleString("fr-FR")} ndaw yi. Toll bi dina dem ci ${((data.schools / population) * 5000).toFixed(2)} ba ${(((data.schools + count) / population) * 5000).toFixed(2)} ci 5 000 nit.`,
    },
    eau: {
      label_fr: "Point d'eau potable",
      label_wol: "Borne fontaine",
      cost: 8,
      unit: "millions FCFA",
      current: Math.round((data.water_rate / 100) * population / 500),
      norm_per: 500,
      impact_fr: (count: number) => {
        const newCoverage = Math.min(100, data.water_rate + (count * 500 / population) * 100);
        return `+${count} point(s) d'eau desservirait ~${(count * 500).toLocaleString("fr-FR")} personnes. Couverture passerait de ${data.water_rate.toFixed(1)}% a ${newCoverage.toFixed(1)}%.`;
      },
      impact_wol: (count: number) => {
        const newCoverage = Math.min(100, data.water_rate + (count * 500 / population) * 100);
        return `+${count} borne fontaine dina musal ~${(count * 500).toLocaleString("fr-FR")} nit. Toll ndox dina dem ci ${data.water_rate.toFixed(1)}% ba ${newCoverage.toFixed(1)}%.`;
      },
    },
  };

  const [count, setCount] = useState(3);
  const sim = simulations[investType];
  const totalCost = count * sim.cost;

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Simulateur d'impact investissement" : "Simulateur d'impact — Investissement public"}
        </p>
      </div>

      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex gap-2">
          {(["sante", "education", "eau"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setInvestType(type)}
              className={`px-3 py-1.5 text-[10px] font-[var(--font-mono)] border transition-colors ${
                investType === type
                  ? "border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[var(--color-sand-light)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]"
              }`}
            >
              {type === "sante" ? (lang === "wol" ? "Wergu yaram" : "Sante") :
               type === "education" ? (lang === "wol" ? "Jang" : "Education") :
               (lang === "wol" ? "Ndox" : "Eau")}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <label className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)] block mb-2">
          {lang === "wol" ? "Limu " : "Nombre : "}{sim.label_fr.toLowerCase()}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="flex-1 h-1 accent-[var(--color-terracotta)]"
          />
          <span className="data-mono text-sm font-bold w-8 text-right">{count}</span>
        </div>
      </div>

      <div className="px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">
            {lang === "wol" ? "Xaalis bi ci yeppam" : "Cout total estime"}
          </span>
          <span className="data-mono font-bold">{totalCost.toLocaleString("fr-FR")} {sim.unit}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--color-text)]" style={{ fontFamily: "var(--font-serif)" }}>
          {lang === "wol" ? sim.impact_wol(count) : sim.impact_fr(count)}
        </p>
      </div>
    </div>
  );
}
