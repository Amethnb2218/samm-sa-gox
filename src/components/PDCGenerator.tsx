"use client";

import { TerritoryDiagnostic, REGIONS } from "@/lib/data";
import { computeGaps, computeOpportunityScore } from "@/lib/norms";
import { Lang, generateNarrative } from "@/lib/wolof";

interface PDCGeneratorProps {
  diagnostic: TerritoryDiagnostic;
  lang: Lang;
}

export default function PDCGenerator({ diagnostic, lang }: PDCGeneratorProps) {
  async function generate() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const margin = 20;
    const pageW = 210;
    const contentW = pageW - 2 * margin;
    let y = 20;

    function checkPage(needed = 20) {
      if (y + needed > 275) { doc.addPage(); y = 20; }
    }

    function heading(text: string, size = 14) {
      checkPage(15);
      doc.setFontSize(size);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 26, 26);
      doc.text(text, margin, y);
      y += size * 0.4 + 4;
    }

    function para(text: string) {
      checkPage(10);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      const lines = doc.splitTextToSize(text, contentW);
      for (const line of lines) {
        checkPage(5);
        doc.text(line, margin, y);
        y += 4.5;
      }
      y += 3;
    }

    function keyValue(key: string, value: string) {
      checkPage(6);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(key, margin + 3, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 26, 26);
      doc.text(value, margin + 70, y);
      y += 6;
    }

    function line() {
      y += 2;
      doc.setDrawColor(220, 220, 218);
      doc.line(margin, y, pageW - margin, y);
      y += 5;
    }

    // === PAGE DE GARDE ===
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("REPUBLIQUE DU SENEGAL", margin, 30);
    doc.text("Un Peuple - Un But - Une Foi", margin, 36);

    doc.setFontSize(10);
    doc.text("MINISTERE DES COLLECTIVITES TERRITORIALES", margin, 50);

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(183, 71, 42);
    doc.text("DIAGNOSTIC TERRITORIAL", margin, 75);

    doc.setFontSize(16);
    doc.setTextColor(26, 26, 26);
    doc.text(diagnostic.name.toUpperCase(), margin, 88);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`${diagnostic.type === "region" ? "Region" : "Departement"} — ${diagnostic.region}`, margin, 97);

    doc.setFontSize(9);
    doc.text("Document genere automatiquement", margin, 120);
    doc.text("Source des donnees : ANSD (RGPH 2023), Banque Mondiale, OMS, UNESCO", margin, 126);
    doc.text("Plateforme : Samm Sa Gox — Intelligence Territoriale Citoyenne", margin, 132);
    doc.text(`Date de generation : Aout 2026`, margin, 138);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Ce document peut etre utilise comme base statistique pour le Plan de Developpement", margin, 260);
    doc.text("Communal (PDC) conformement aux dispositions du Code des Collectivites Territoriales.", margin, 265);

    // === PAGE 2 : DONNEES DE BASE ===
    doc.addPage();
    y = 20;

    heading("1. DONNEES GENERALES", 14);
    line();
    keyValue("Territoire :", diagnostic.name);
    keyValue("Type :", diagnostic.type === "region" ? "Region" : "Departement");
    keyValue("Region de rattachement :", diagnostic.region);
    keyValue("Population (2026) :", diagnostic.population.toLocaleString("fr-FR") + " habitants");
    keyValue("Superficie :", diagnostic.area_km2.toLocaleString("fr-FR") + " km2");
    keyValue("Densite :", Math.round(diagnostic.density) + " hab/km2");
    keyValue("Rang densite (national) :", `#${diagnostic.rank.value} sur ${diagnostic.rank.total}`);

    y += 5;
    heading("2. POSITIONNEMENT NATIONAL", 14);
    line();

    for (const ind of diagnostic.indicators) {
      keyValue(
        ind.label_fr + " :",
        `${ind.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ${ind.unit} (moy. nat. : ${ind.national_avg.toLocaleString("fr-FR", { maximumFractionDigits: 1 })})`
      );
    }

    // === PAGE 3 : ANALYSE DES ECARTS ===
    doc.addPage();
    y = 20;

    heading("3. ANALYSE DES ECARTS — CONFORMITE AUX NORMES", 14);
    line();

    const gaps = computeGaps(diagnostic.code, diagnostic.population);
    for (const gap of gaps) {
      checkPage(18);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      const statusText = gap.status === "critique" ? "[CRITIQUE]" : gap.status === "alerte" ? "[ALERTE]" : "[CONFORME]";
      const statusColor = gap.status === "critique" ? [180, 30, 30] : gap.status === "alerte" ? [180, 120, 0] : [45, 95, 45];
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(statusText, margin, y);
      doc.setTextColor(26, 26, 26);
      doc.text(gap.norm.label_fr, margin + 25, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(
        `Valeur actuelle : ${gap.current_value.toFixed(2)} | Norme : ${gap.norm.standard} (${gap.norm.source})`,
        margin + 5,
        y
      );
      y += 4.5;
      if (gap.recommendation_fr) {
        doc.setFont("helvetica", "italic");
        doc.text(`> ${gap.recommendation_fr}`, margin + 5, y);
        y += 4.5;
      }
      y += 3;
    }

    // === PAGE 4 : OPPORTUNITE ECONOMIQUE ===
    doc.addPage();
    y = 20;

    heading("4. SCORE D'OPPORTUNITE ECONOMIQUE", 14);
    line();

    const opp = computeOpportunityScore(diagnostic.code, diagnostic.population, diagnostic.area_km2);
    const catLabels = { tres_forte: "TRES FORTE", forte: "FORTE", moderee: "MODEREE", faible: "FAIBLE" };

    keyValue("Score global :", `${Math.round(opp.overall)}/100`);
    keyValue("Categorie :", catLabels[opp.category]);
    y += 5;

    para("Decomposition par facteur :");
    for (const f of opp.factors) {
      keyValue(f.label_fr + " :", `${Math.round(f.score)}/100 — ${f.detail}`);
    }

    y += 5;
    heading("5. RECOMMANDATIONS", 14);
    line();

    const critiques = gaps.filter(g => g.status === "critique");
    const alertes = gaps.filter(g => g.status === "alerte");

    if (critiques.length > 0) {
      para("Priorites immediates (deficits critiques) :");
      for (const g of critiques) {
        para(`  - ${g.recommendation_fr}`);
      }
    }
    if (alertes.length > 0) {
      para("Actions a moyen terme (alertes) :");
      for (const g of alertes) {
        para(`  - ${g.recommendation_fr}`);
      }
    }

    para("Ce diagnostic peut servir de base au Plan de Developpement Communal (PDC) et aux demandes de financement aupres des partenaires au developpement.");

    // === FOOTER ===
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Samm Sa Gox — Diagnostic Territorial | ${diagnostic.name} | Page ${i}/${pageCount}`,
        margin,
        290
      );
    }

    doc.save(`diagnostic-pdc-${diagnostic.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  }

  return (
    <button
      onClick={generate}
      className="w-full px-4 py-3 text-sm font-medium bg-[var(--color-terracotta)] text-white hover:opacity-90 transition-opacity font-[var(--font-mono)] tracking-wide"
    >
      {lang === "wol"
        ? "GENERER DIAGNOSTIC PDC (PDF)"
        : "GENERER DIAGNOSTIC PDC (PDF)"}
    </button>
  );
}
