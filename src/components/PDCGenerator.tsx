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

    const margin = 18;
    const pageW = 210;
    const contentW = pageW - 2 * margin;
    let y = 0;

    const TERRACOTTA = [183, 71, 42] as const;
    const DARK = [26, 26, 26] as const;
    const MUTED = [100, 100, 100] as const;
    const LIGHT_BG = [250, 250, 248] as const;
    const GREEN = [45, 95, 45] as const;
    const RED = [180, 30, 30] as const;
    const AMBER = [180, 120, 0] as const;

    function addFooter(pageNum: number, totalPages: number) {
      doc.setDrawColor(220, 220, 218);
      doc.line(margin, 282, pageW - margin, 282);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...MUTED);
      doc.text(`Sàmm Sa Gox — Intelligence Territoriale Citoyenne`, margin, 287);
      doc.text(`${diagnostic.name} — Diagnostic Territorial`, pageW / 2, 287, { align: "center" });
      doc.text(`${pageNum}/${totalPages}`, pageW - margin, 287, { align: "right" });
    }

    function newPage() {
      doc.addPage();
      y = 25;
    }

    function checkPage(needed = 20) {
      if (y + needed > 270) { newPage(); }
    }

    function sectionTitle(num: string, text: string) {
      checkPage(18);
      y += 4;
      doc.setFillColor(...TERRACOTTA);
      doc.rect(margin, y - 4, 4, 12, "F");
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...DARK);
      doc.text(`${num}. ${text}`, margin + 8, y + 4);
      y += 14;
      doc.setDrawColor(220, 220, 218);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
    }

    function subTitle(text: string) {
      checkPage(12);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...DARK);
      doc.text(text, margin, y);
      y += 6;
    }

    function para(text: string, indent = 0) {
      checkPage(8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(text, contentW - indent);
      for (const line of lines) {
        checkPage(5);
        doc.text(line, margin + indent, y);
        y += 4.2;
      }
      y += 2;
    }

    function tableRow(cells: string[], widths: number[], isHeader = false, statusColor?: readonly [number, number, number]) {
      checkPage(8);
      const rowH = 7;
      if (isHeader) {
        doc.setFillColor(...LIGHT_BG);
        doc.rect(margin, y - 4.5, contentW, rowH, "F");
      }
      doc.setFontSize(8.5);
      let x = margin;
      for (let i = 0; i < cells.length; i++) {
        doc.setFont("helvetica", isHeader ? "bold" : "normal");
        if (statusColor && i === 0) {
          doc.setTextColor(...statusColor);
        } else {
          doc.setTextColor(isHeader ? DARK[0] : 60, isHeader ? DARK[1] : 60, isHeader ? DARK[2] : 60);
        }
        doc.text(cells[i], x + 2, y - 1);
        x += widths[i];
      }
      doc.setDrawColor(235, 235, 233);
      doc.line(margin, y + 1, pageW - margin, y + 1);
      y += rowH;
    }

    function keyValue(key: string, value: string, indent = 0) {
      checkPage(6);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...MUTED);
      doc.text(key, margin + indent, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...DARK);
      doc.text(value, margin + 65 + indent, y);
      y += 5.5;
    }

    // ============================================
    // PAGE DE GARDE
    // ============================================
    doc.setFillColor(...TERRACOTTA);
    doc.rect(0, 0, pageW, 8, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text("REPUBLIQUE DU SENEGAL", margin, 25);
    doc.text("Un Peuple — Un But — Une Foi", margin, 31);
    doc.setDrawColor(220, 220, 218);
    doc.line(margin, 36, margin + 40, 36);

    doc.setFontSize(9);
    doc.text("Agence Nationale de la Statistique", margin, 45);
    doc.text("et de la Démographie (ANSD)", margin, 50);

    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TERRACOTTA);
    doc.text("DIAGNOSTIC", margin, 80);
    doc.text("TERRITORIAL", margin, 92);

    doc.setFontSize(18);
    doc.setTextColor(...DARK);
    doc.text(diagnostic.name.toUpperCase(), margin, 112);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(`${diagnostic.type === "region" ? "Région" : "Département"} — ${diagnostic.region}`, margin, 122);

    // Info box
    doc.setFillColor(...LIGHT_BG);
    doc.rect(margin, 140, contentW, 35, "F");
    doc.setDrawColor(...TERRACOTTA);
    doc.rect(margin, 140, contentW, 35, "S");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text("INFORMATIONS DU DOCUMENT", margin + 5, 149);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(`Date de génération : Août 2026`, margin + 5, 157);
    doc.text(`Sources : ANSD (RGPH 2023), Banque Mondiale, OMS, UNESCO`, margin + 5, 163);
    doc.text(`Plateforme : Sàmm Sa Gox — Intelligence Territoriale Citoyenne`, margin + 5, 169);

    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text("Ce document constitue une base statistique pour l'élaboration du Plan de", margin, 210);
    doc.text("Développement Communal (PDC) conformément aux dispositions du Code", margin, 215);
    doc.text("des Collectivités Territoriales du Sénégal.", margin, 220);

    doc.setFillColor(...TERRACOTTA);
    doc.rect(0, 289, pageW, 8, "F");

    // ============================================
    // PAGE 2 : DONNÉES GÉNÉRALES
    // ============================================
    newPage();

    sectionTitle("01", "DONNÉES GÉNÉRALES");

    keyValue("Territoire :", diagnostic.name);
    keyValue("Type :", diagnostic.type === "region" ? "Région" : "Département");
    keyValue("Région :", diagnostic.region);
    keyValue("Population (2026) :", diagnostic.population.toLocaleString("fr-FR") + " habitants");
    keyValue("Superficie :", diagnostic.area_km2.toLocaleString("fr-FR") + " km²");
    keyValue("Densité :", Math.round(diagnostic.density) + " hab/km²");
    keyValue("Rang national :", `#${diagnostic.rank.value} sur ${diagnostic.rank.total} (par densité)`);

    y += 8;
    sectionTitle("02", "POSITIONNEMENT NATIONAL");

    const colWidths = [60, 40, 40, 34];
    tableRow(["Indicateur", "Valeur", "Moy. nationale", "Écart"], colWidths, true);

    for (const ind of diagnostic.indicators) {
      const ecart = ind.value - ind.national_avg;
      const ecartStr = (ecart >= 0 ? "+" : "") + ecart.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
      tableRow(
        [
          ind.label_fr,
          `${ind.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ${ind.unit}`,
          `${ind.national_avg.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ${ind.unit}`,
          ecartStr,
        ],
        colWidths,
        false,
        ecart >= 0 ? GREEN : RED
      );
    }

    y += 8;
    sectionTitle("03", "SYNTHÈSE NARRATIVE");
    const narrative = generateNarrative(
      diagnostic.name,
      diagnostic.population,
      diagnostic.region,
      {
        density: diagnostic.density,
        nationalAvgDensity: REGIONS.reduce((s, r) => s + r.population, 0) / REGIONS.reduce((s, r) => s + r.area_km2, 0),
      },
      "fr"
    );
    para(narrative);

    // ============================================
    // PAGE 3 : ANALYSE DES ÉCARTS
    // ============================================
    newPage();

    sectionTitle("04", "ANALYSE DES ÉCARTS — NORMES INTERNATIONALES");

    para("Comparaison des indicateurs régionaux aux standards internationaux (OMS, UNESCO, ODD). Les écarts identifient les priorités d'investissement.");
    y += 3;

    const gapWidths = [12, 52, 30, 28, 52];
    tableRow(["", "Indicateur", "Valeur", "Norme", "Recommandation"], gapWidths, true);

    const gaps = computeGaps(diagnostic.code, diagnostic.population);
    for (const gap of gaps) {
      const statusIcon = gap.status === "critique" ? "●" : gap.status === "alerte" ? "◐" : "○";
      const statusColor = gap.status === "critique" ? RED : gap.status === "alerte" ? AMBER : GREEN;
      tableRow(
        [
          statusIcon,
          gap.norm.label_fr,
          gap.current_value.toFixed(1),
          `${gap.norm.standard} (${gap.norm.source})`,
          gap.recommendation_fr || "Conforme",
        ],
        gapWidths,
        false,
        statusColor
      );
    }

    y += 6;
    para("● Critique   ◐ Alerte   ○ Conforme", 0);

    // ============================================
    // PAGE 4 : OPPORTUNITÉ ÉCONOMIQUE
    // ============================================
    newPage();

    sectionTitle("05", "SCORE D'OPPORTUNITÉ ÉCONOMIQUE");

    const opp = computeOpportunityScore(diagnostic.code, diagnostic.population, diagnostic.area_km2);
    const catLabels: Record<string, string> = {
      tres_forte: "TRÈS FORTE",
      forte: "FORTE",
      moderee: "MODÉRÉE",
      faible: "FAIBLE",
    };

    // Score box
    doc.setFillColor(...LIGHT_BG);
    doc.rect(margin, y - 3, contentW, 18, "F");
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TERRACOTTA);
    doc.text(`${Math.round(opp.overall)}/100`, margin + 5, y + 8);
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.text(catLabels[opp.category] || opp.category, margin + 40, y + 8);
    y += 22;

    subTitle("Décomposition par facteur :");
    y += 2;

    const factorWidths = [65, 25, 84];
    tableRow(["Facteur", "Score", "Détail"], factorWidths, true);
    for (const f of opp.factors) {
      tableRow([f.label_fr, `${Math.round(f.score)}/100`, f.detail], factorWidths);
    }

    y += 10;
    sectionTitle("06", "RECOMMANDATIONS STRATÉGIQUES");

    const critiques = gaps.filter((g) => g.status === "critique");
    const alertes = gaps.filter((g) => g.status === "alerte");

    if (critiques.length > 0) {
      subTitle("Priorités immédiates (déficits critiques) :");
      for (const g of critiques) {
        para(`• ${g.recommendation_fr}`, 3);
      }
      y += 3;
    }

    if (alertes.length > 0) {
      subTitle("Actions à moyen terme (alertes) :");
      for (const g of alertes) {
        para(`• ${g.recommendation_fr}`, 3);
      }
      y += 3;
    }

    para("Ce diagnostic constitue une base pour l'élaboration du Plan de Développement Communal (PDC) et les demandes de financement auprès des partenaires au développement (Banque Mondiale, AFD, BAD, UE).");

    // ============================================
    // FOOTERS
    // ============================================
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      if (i > 1) addFooter(i - 1, totalPages - 1);
    }

    doc.save(`diagnostic-territorial-${diagnostic.name.toLowerCase().replace(/\s+/g, "-")}-2026.pdf`);
  }

  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", margin: 0 }}>
          {lang === "wol" ? "Sàkku PDC" : "Générateur de document PDC"}
        </p>
        <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>
          {lang === "wol"
            ? "Wàcc bataaxal PDC bi ci 1 jëm — 5 xët, prêt pour préfecture"
            : "Document de 5 pages au format officiel, prêt pour dépôt en préfecture"}
        </p>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <button
          onClick={generate}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.03em",
            backgroundColor: "var(--color-terracotta)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {lang === "wol" ? "TÉLÉCHARGER DIAGNOSTIC PDC (PDF)" : "TÉLÉCHARGER DIAGNOSTIC PDC (PDF)"}
        </button>
      </div>
    </div>
  );
}
