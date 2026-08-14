"use client";

import { TerritoryDiagnostic } from "@/lib/data";
import { Lang } from "@/lib/wolof";

interface ExportPDFProps {
  diagnostic: TerritoryDiagnostic;
  lang: Lang;
}

export default function ExportPDF({ diagnostic, lang }: ExportPDFProps) {
  async function handleExport() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    const title = lang === "wol" ? "Seetu gox gi" : "Diagnostic Territorial";
    const subtitle = `${diagnostic.name} — ${diagnostic.type === "region" ? "Region" : "Departement"}`;

    doc.setFontSize(18);
    doc.text(title, 20, 25);

    doc.setFontSize(14);
    doc.text(subtitle, 20, 35);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Source : ANSD, Banque Mondiale | Genere par Samm Sa Gox`, 20, 43);

    doc.setDrawColor(229, 229, 227);
    doc.line(20, 47, 190, 47);

    doc.setTextColor(26, 26, 26);
    doc.setFontSize(11);

    let y = 57;

    const addRow = (label: string, value: string) => {
      doc.setFont("helvetica", "normal");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "bold");
      doc.text(value, 120, y);
      y += 8;
    };

    addRow(
      lang === "wol" ? "Waay-dekk" : "Population",
      diagnostic.population.toLocaleString("fr-FR") + " habitants"
    );
    addRow(
      lang === "wol" ? "Yaatu suuf" : "Superficie",
      diagnostic.area_km2.toLocaleString("fr-FR") + " km2"
    );
    addRow(
      lang === "wol" ? "Nijaay nit" : "Densite",
      Math.round(diagnostic.density) + " hab/km2"
    );
    addRow(
      lang === "wol" ? "Rang" : "Rang densite",
      `#${diagnostic.rank.value} / ${diagnostic.rank.total}`
    );

    y += 5;
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(lang === "wol" ? "Nataal xam-xam yi" : "Indicateurs", 20, y);
    y += 10;

    doc.setFontSize(10);
    for (const ind of diagnostic.indicators) {
      const label = lang === "wol" ? ind.label_wol : ind.label_fr;
      doc.setFont("helvetica", "normal");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${ind.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ${ind.unit}`,
        120,
        y
      );
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 114, 128);
      doc.text(
        `Moyenne nationale : ${ind.national_avg.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} | Rang : ${ind.rank}/${ind.total}`,
        25,
        y
      );
      doc.setTextColor(26, 26, 26);
      y += 10;
    }

    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(
      "Ce document a ete genere automatiquement par Samm Sa Gox — Intelligence Territoriale Citoyenne",
      20,
      y
    );
    doc.text("Challenge 20 ans ANSD — 2026", 20, y + 5);

    doc.save(`diagnostic-${diagnostic.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  }

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1.5 text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)] transition-colors font-[var(--font-mono)]"
    >
      {lang === "wol" ? "Yeb PDF" : "Exporter PDF"}
    </button>
  );
}
