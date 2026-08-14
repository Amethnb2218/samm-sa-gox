"use client";

import { getIDTForRegion, computeAllIDT, IDTResult } from "@/lib/idt";
import { Lang } from "@/lib/wolof";

interface IDTPanelProps {
  regionCode: string;
  lang: Lang;
}

export default function IDTPanel({ regionCode, lang }: IDTPanelProps) {
  const idt = getIDTForRegion(regionCode);
  if (!idt) return null;

  const allIDT = computeAllIDT();

  const categoryLabel = {
    eleve: { fr: "ELEVE", wol: "KOW" },
    moyen_sup: { fr: "MOYEN SUPERIEUR", wol: "DIGGANTE KOW" },
    moyen_inf: { fr: "MOYEN INFERIEUR", wol: "DIGGANTE SUUF" },
    faible: { fr: "FAIBLE", wol: "SUUF" },
  };

  const categoryColor = {
    eleve: "#2D5F2D",
    moyen_sup: "#4A8C4A",
    moyen_inf: "#C4A87D",
    faible: "#B7472A",
  };

  const dimensions = [
    { key: "sante", label_fr: "Sante", label_wol: "Wergu yaram", value: idt.dimensions.sante },
    { key: "education", label_fr: "Education", label_wol: "Jang", value: idt.dimensions.education },
    { key: "economie", label_fr: "Economie", label_wol: "Koom-koom", value: idt.dimensions.economie },
    { key: "infrastructure", label_fr: "Infrastructure", label_wol: "Mbiri", value: idt.dimensions.infrastructure },
  ];

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
          {lang === "wol" ? "Indice Yokkute Gox gi (IDT)" : "Indice de Developpement Territorial (IDT)"}
        </p>
        <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
          {lang === "wol" ? "Methodoloosi PNUD — 4 dimension" : "Methodologie PNUD — 4 dimensions, moyenne geometrique"}
        </p>
      </div>

      {/* Score principal */}
      <div className="px-4 py-4 border-b border-[var(--color-border)] flex items-center gap-5">
        <div
          className="w-20 h-20 flex flex-col items-center justify-center border-2"
          style={{ borderColor: categoryColor[idt.category] }}
        >
          <span className="data-mono text-2xl font-bold" style={{ color: categoryColor[idt.category] }}>
            {(idt.score * 100).toFixed(0)}
          </span>
          <span className="text-[8px] text-[var(--color-text-muted)]">/100</span>
        </div>
        <div>
          <p className="text-xs font-bold font-[var(--font-mono)]" style={{ color: categoryColor[idt.category] }}>
            {lang === "wol" ? categoryLabel[idt.category].wol : categoryLabel[idt.category].fr}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
            {lang === "wol"
              ? `Rang #${idt.rank} ci 14 gox yi`
              : `Rang #${idt.rank} sur 14 regions`}
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-[var(--font-mono)]">
            {lang === "wol" ? "Moy. nationale" : "Moy. nationale"}: {(allIDT.reduce((s, r) => s + r.score, 0) / allIDT.length * 100).toFixed(0)}/100
          </p>
        </div>
      </div>

      {/* Radar-like dimensions */}
      <div className="px-4 py-3 space-y-2.5">
        {dimensions.map((d) => (
          <div key={d.key}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[10px] font-medium">{lang === "wol" ? d.label_wol : d.label_fr}</span>
              <span className="data-mono text-[10px]">{(d.value * 100).toFixed(0)}/100</span>
            </div>
            <div className="h-2 bg-[var(--color-border)] relative">
              <div
                className="absolute top-0 left-0 h-full transition-all"
                style={{
                  width: `${d.value * 100}%`,
                  backgroundColor: d.value >= 0.6 ? "#2D5F2D" : d.value >= 0.4 ? "#C4A87D" : "#B7472A",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mini ranking */}
      <div className="px-4 py-3 border-t border-[var(--color-border)]">
        <p className="text-[9px] text-[var(--color-text-muted)] font-[var(--font-mono)] mb-2">
          {lang === "wol" ? "CLASSEMENT IDT — 14 GOX YI" : "CLASSEMENT IDT — 14 REGIONS"}
        </p>
        <div className="space-y-0.5">
          {allIDT.map((r) => (
            <div
              key={r.code}
              className="flex items-center gap-2"
              style={{ opacity: r.code === regionCode ? 1 : 0.6 }}
            >
              <span className="data-mono text-[9px] w-4">{r.rank}</span>
              <div className="flex-1 h-1.5 bg-[var(--color-border)]">
                <div
                  className="h-full"
                  style={{
                    width: `${r.score * 100}%`,
                    backgroundColor: r.code === regionCode ? categoryColor[r.category] : "#C4A87D",
                  }}
                />
              </div>
              <span className="text-[9px] w-16 truncate font-[var(--font-mono)]" style={{ fontWeight: r.code === regionCode ? 700 : 400 }}>
                {r.name}
              </span>
              <span className="data-mono text-[9px] w-6 text-right">{(r.score * 100).toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
