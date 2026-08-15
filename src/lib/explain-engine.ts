import { REGIONS } from "./data";
import { getRegionExtended } from "./norms";

export interface ScoreContribution {
  factor: string;
  factor_wol: string;
  points: number;
  direction: "positive" | "negative";
  detail_fr: string;
  detail_wol: string;
  source: string;
}

export interface ExplainedScore {
  total: number;
  max_possible: number;
  category_fr: string;
  category_wol: string;
  contributions: ScoreContribution[];
  methodology_fr: string;
}

export function explainIDTScore(code: string): ExplainedScore | null {
  const region = REGIONS.find((r) => r.code === code);
  const ext = getRegionExtended(code);
  if (!region || !ext) return null;

  const contributions: ScoreContribution[] = [];
  let total = 0;

  // Santé (max 25)
  const healthRatio = ext.health_centers / (region.population / 10000);
  const healthScore = Math.min(25, Math.round(healthRatio / 1.5 * 25));
  total += healthScore;
  contributions.push({
    factor: "Couverture sanitaire",
    factor_wol: "Wergu yaram",
    points: healthScore,
    direction: healthScore >= 15 ? "positive" : "negative",
    detail_fr: `${healthRatio.toFixed(2)} postes/10k hab (norme : 1.5)`,
    detail_wol: `${healthRatio.toFixed(2)} postu/10k nit (normu : 1.5)`,
    source: "ANSD — Carte sanitaire 2023",
  });

  // Éducation (max 25)
  const literacy = ext.literacy_rate || 0;
  const eduScore = Math.min(25, Math.round(literacy / 75 * 25));
  total += eduScore;
  contributions.push({
    factor: "Alphabétisation",
    factor_wol: "Xam-xam bind",
    points: eduScore,
    direction: eduScore >= 15 ? "positive" : "negative",
    detail_fr: `Taux : ${literacy}% (objectif : 75%)`,
    detail_wol: `Toll : ${literacy}% (normu : 75%)`,
    source: "ANSD — RGPH-5 2023",
  });

  // Infrastructure (max 25)
  const water = ext.water_access_pct || 0;
  const elec = ext.electricity_pct || 0;
  const infraAvg = (water + elec) / 2;
  const infraScore = Math.min(25, Math.round(infraAvg / 95 * 25));
  total += infraScore;
  contributions.push({
    factor: "Infrastructure (eau + électricité)",
    factor_wol: "Njëkk (ndox + kuraa)",
    points: infraScore,
    direction: infraScore >= 15 ? "positive" : "negative",
    detail_fr: `Eau : ${water}%, Électricité : ${elec}% (objectif : 95%)`,
    detail_wol: `Ndox : ${water}%, Kuraa : ${elec}% (normu : 95%)`,
    source: "ANSD — RGPH-5 2023 + Senelec",
  });

  // Économie (max 25)
  const density = region.population / region.area_km2;
  const urban = ext.urbanization_rate || 0;
  const econIndicator = (density / 100) * 0.4 + (urban / 100) * 0.6;
  const econScore = Math.min(25, Math.round(econIndicator * 25));
  total += econScore;
  contributions.push({
    factor: "Dynamisme économique",
    factor_wol: "Koom-koom",
    points: econScore,
    direction: econScore >= 15 ? "positive" : "negative",
    detail_fr: `Densité : ${Math.round(density)} hab/km², Urbanisation : ${urban}%`,
    detail_wol: `Nijaay : ${Math.round(density)} nit/km², Dëkk : ${urban}%`,
    source: "ANSD — RGPH-5 2023",
  });

  let category_fr: string;
  let category_wol: string;
  if (total >= 75) { category_fr = "Développé"; category_wol = "Mu xew"; }
  else if (total >= 55) { category_fr = "Intermédiaire"; category_wol = "Diggante"; }
  else if (total >= 35) { category_fr = "En développement"; category_wol = "Ci yoon wi"; }
  else { category_fr = "Déficitaire"; category_wol = "Jafe-jafe"; }

  return {
    total,
    max_possible: 100,
    category_fr,
    category_wol,
    contributions: contributions.sort((a, b) => b.points - a.points),
    methodology_fr: "Score composite sur 100 points répartis en 4 dimensions de 25 points chacune : Santé (postes/10k hab vs norme 1.5), Éducation (alphabétisation vs objectif 75%), Infrastructure (moyenne eau+électricité vs objectif 95%), Économie (densité + urbanisation). Sources : ANSD RGPH-5 2023, Carte sanitaire, Carte scolaire.",
  };
}
