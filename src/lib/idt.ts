import { REGIONS } from "./data";
import { REGION_EXTENDED } from "./norms";

export interface IDTResult {
  code: string;
  name: string;
  score: number;
  rank: number;
  dimensions: {
    sante: number;
    education: number;
    economie: number;
    infrastructure: number;
  };
  category: "eleve" | "moyen_sup" | "moyen_inf" | "faible";
}

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function geometricMean(values: number[]): number {
  const product = values.reduce((p, v) => p * Math.max(0.001, v), 1);
  return Math.pow(product, 1 / values.length);
}

export function computeAllIDT(): IDTResult[] {
  const extended = REGION_EXTENDED;

  const healthRatios = extended.map((r) => {
    const region = REGIONS.find((reg) => reg.code === r.code);
    return region ? (r.health_centers / region.population) * 10000 : 0;
  });
  const literacyRates = extended.map((r) => r.literacy_rate);
  const povertyInverse = extended.map((r) => 100 - r.poverty_rate);
  const infraScores = extended.map((r) => (r.electricity_rate + r.water_rate) / 2);

  const minHealth = Math.min(...healthRatios);
  const maxHealth = Math.max(...healthRatios);
  const minLit = Math.min(...literacyRates);
  const maxLit = Math.max(...literacyRates);
  const minPov = Math.min(...povertyInverse);
  const maxPov = Math.max(...povertyInverse);
  const minInfra = Math.min(...infraScores);
  const maxInfra = Math.max(...infraScores);

  const results: IDTResult[] = extended.map((r, i) => {
    const region = REGIONS.find((reg) => reg.code === r.code);
    const sante = normalize(healthRatios[i], minHealth, maxHealth);
    const education = normalize(literacyRates[i], minLit, maxLit);
    const economie = normalize(povertyInverse[i], minPov, maxPov);
    const infrastructure = normalize(infraScores[i], minInfra, maxInfra);

    const score = geometricMean([sante, education, economie, infrastructure]);

    return {
      code: r.code,
      name: region?.name || "",
      score,
      rank: 0,
      dimensions: { sante, education, economie, infrastructure },
      category: "faible" as IDTResult["category"],
    };
  });

  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => {
    r.rank = i + 1;
    if (r.score >= 0.7) r.category = "eleve";
    else if (r.score >= 0.5) r.category = "moyen_sup";
    else if (r.score >= 0.3) r.category = "moyen_inf";
    else r.category = "faible";
  });

  return results;
}

export function getIDTForRegion(code: string): IDTResult | undefined {
  return computeAllIDT().find((r) => r.code === code);
}
