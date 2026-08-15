import { REGIONS } from "./data";
import { getRegionExtended } from "./norms";

export interface TerritoryVector {
  population_density: number;
  urbanization: number;
  youth_ratio: number;
  literacy: number;
  health_coverage: number;
  water_access: number;
}

export interface SimilarTerritory {
  code: string;
  name: string;
  similarity: number;
  shared_strengths: string[];
  shared_weaknesses: string[];
}

function buildVector(code: string): TerritoryVector | null {
  const region = REGIONS.find((r) => r.code === code);
  const ext = getRegionExtended(code);
  if (!region || !ext) return null;

  return {
    population_density: region.population / region.area_km2,
    urbanization: ext.urbanization_rate || 0,
    youth_ratio: ext.youth_pct || 0,
    literacy: ext.literacy_rate || 0,
    health_coverage: ext.health_centers / (region.population / 10000),
    water_access: ext.water_access_pct || 0,
  };
}

function normalize(vectors: Record<string, TerritoryVector>): Record<string, number[]> {
  const keys: (keyof TerritoryVector)[] = [
    "population_density", "urbanization", "youth_ratio",
    "literacy", "health_coverage", "water_access",
  ];

  const mins = keys.map((k) => Math.min(...Object.values(vectors).map((v) => v[k])));
  const maxs = keys.map((k) => Math.max(...Object.values(vectors).map((v) => v[k])));

  const result: Record<string, number[]> = {};
  for (const [code, vec] of Object.entries(vectors)) {
    result[code] = keys.map((k, i) => {
      const range = maxs[i] - mins[i];
      return range > 0 ? (vec[k] - mins[i]) / range : 0;
    });
  }
  return result;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom > 0 ? dot / denom : 0;
}

function identifyTraits(code: string): { strengths: string[]; weaknesses: string[] } {
  const ext = getRegionExtended(code);
  if (!ext) return { strengths: [], weaknesses: [] };

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if ((ext.literacy_rate || 0) > 55) strengths.push("alphabetisation");
  else if ((ext.literacy_rate || 0) < 40) weaknesses.push("alphabetisation");

  if ((ext.water_access_pct || 0) > 75) strengths.push("acces_eau");
  else if ((ext.water_access_pct || 0) < 50) weaknesses.push("acces_eau");

  if ((ext.urbanization_rate || 0) > 50) strengths.push("urbanisation");
  if ((ext.youth_pct || 0) > 55) strengths.push("jeunesse");

  const region = REGIONS.find((r) => r.code === code);
  if (region) {
    const healthRatio = ext.health_centers / (region.population / 10000);
    if (healthRatio > 1.0) strengths.push("couverture_sante");
    else if (healthRatio < 0.6) weaknesses.push("couverture_sante");
  }

  return { strengths, weaknesses };
}

export function findSimilarTerritories(code: string, topN = 5): SimilarTerritory[] {
  const vectors: Record<string, TerritoryVector> = {};
  for (const r of REGIONS) {
    const v = buildVector(r.code);
    if (v) vectors[r.code] = v;
  }

  if (!vectors[code]) return [];

  const normalized = normalize(vectors);
  const target = normalized[code];
  const targetTraits = identifyTraits(code);

  const similarities: SimilarTerritory[] = [];

  for (const r of REGIONS) {
    if (r.code === code || !normalized[r.code]) continue;

    const sim = cosineSimilarity(target, normalized[r.code]);
    const otherTraits = identifyTraits(r.code);

    const shared_strengths = targetTraits.strengths.filter((s) => otherTraits.strengths.includes(s));
    const shared_weaknesses = targetTraits.weaknesses.filter((w) => otherTraits.weaknesses.includes(w));

    similarities.push({
      code: r.code,
      name: r.name,
      similarity: Math.round(sim * 100),
      shared_strengths,
      shared_weaknesses,
    });
  }

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
}
