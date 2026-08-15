"use client";

import { SourceReference } from "@/lib/source-engine";
import { CONFIDENCE_LABELS, ConfidenceLevel } from "@/lib/confidence";
import { Lang } from "@/lib/wolof";

interface SourceCardProps {
  source: SourceReference;
  lang: Lang;
}

export default function SourceCard({ source, lang }: SourceCardProps) {
  const badge = CONFIDENCE_LABELS[source.type];

  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "12px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600 }}>{source.name}</p>
        <span style={{ fontSize: "8px", padding: "2px 6px", border: `1px solid ${badge.color}`, color: badge.color, fontFamily: "var(--font-mono)", fontWeight: 600, whiteSpace: "nowrap" }}>
          {lang === "wol" ? badge.wol : badge.fr}
        </span>
      </div>
      <table style={{ fontSize: "10px", borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: "3px 0", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", width: "80px" }}>Source</td>
            <td style={{ padding: "3px 0" }}>{source.publication}</td>
          </tr>
          <tr>
            <td style={{ padding: "3px 0", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Année</td>
            <td style={{ padding: "3px 0" }}>{source.year}</td>
          </tr>
          <tr>
            <td style={{ padding: "3px 0", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Type</td>
            <td style={{ padding: "3px 0" }}>{source.type === "officiel" ? "Observation directe" : source.type === "calcule" ? "Calcul dérivé" : "Estimation"}</td>
          </tr>
          {source.chapter && (
            <tr>
              <td style={{ padding: "3px 0", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Chapitre</td>
              <td style={{ padding: "3px 0" }}>{source.chapter}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "3px 0", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Méthode</td>
            <td style={{ padding: "3px 0" }}>{source.methodology}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
