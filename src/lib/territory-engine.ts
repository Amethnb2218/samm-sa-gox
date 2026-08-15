import { REGIONS, buildDiagnostic, TerritoryDiagnostic } from "./data";
import { computeGapAnalysis, getPriorityDomains, Gap } from "./gap-engine";
import { findSimilarTerritories, SimilarTerritory } from "./similarity-engine";
import { explainIDTScore, ExplainedScore } from "./explain-engine";
import { getRegionTimeline, RegionTimeline } from "./timeline-engine";
import { getAvailableScenarios } from "./scenario-engine";
import { getSourcesForRegion } from "./source-engine";
import { ConfidenceLevel } from "./confidence";

export interface TerritoryIntelligence {
  diagnostic: TerritoryDiagnostic;
  idt: ExplainedScore | null;
  gaps: Gap[];
  priorities: Gap[];
  similar: SimilarTerritory[];
  timeline: RegionTimeline | null;
  scenarios: { id: string; label_fr: string; label_wol: string }[];
  sources: { id: string; name: string; year: number; type: ConfidenceLevel }[];
  strengths_fr: string[];
  weaknesses_fr: string[];
  strengths_wol: string[];
  weaknesses_wol: string[];
}

export function buildTerritoryIntelligence(code: string): TerritoryIntelligence | null {
  const diagnostic = buildDiagnostic(code);
  if (!diagnostic) return null;

  const idt = diagnostic.type === "region" ? explainIDTScore(code) : null;
  const gaps = diagnostic.type === "region" ? computeGapAnalysis(code) : [];
  const priorities = diagnostic.type === "region" ? getPriorityDomains(code) : [];
  const similar = diagnostic.type === "region" ? findSimilarTerritories(code, 4) : [];
  const timeline = diagnostic.type === "region" ? getRegionTimeline(code) : null;
  const scenarios = getAvailableScenarios();
  const rawSources = getSourcesForRegion(code);

  const strengths_fr: string[] = [];
  const weaknesses_fr: string[] = [];
  const strengths_wol: string[] = [];
  const weaknesses_wol: string[] = [];

  for (const gap of gaps) {
    if (gap.severity === "conforme") {
      strengths_fr.push(`${gap.domain} : conforme aux normes (${gap.current} vs objectif ${gap.target})`);
      strengths_wol.push(`${gap.domain_wol} : nekk na ci normu bi`);
    } else if (gap.severity === "critique" || gap.severity === "alerte") {
      weaknesses_fr.push(`${gap.domain} : écart de ${Math.abs(gap.gap_pct)}% (${gap.current} vs objectif ${gap.target})`);
      weaknesses_wol.push(`${gap.domain_wol} : ${Math.abs(gap.gap_pct)}% ci suuf normu bi`);
    }
  }

  if (idt) {
    for (const c of idt.contributions) {
      if (c.direction === "positive" && c.points >= 18) {
        strengths_fr.push(`${c.factor} : score élevé (${c.points}/25)`);
        strengths_wol.push(`${c.factor_wol} : score bu baax (${c.points}/25)`);
      }
    }
  }

  return {
    diagnostic,
    idt,
    gaps,
    priorities,
    similar,
    timeline,
    scenarios,
    sources: rawSources.map((s) => ({ id: s.id, name: s.name, year: s.year, type: s.type })),
    strengths_fr,
    weaknesses_fr,
    strengths_wol,
    weaknesses_wol,
  };
}
