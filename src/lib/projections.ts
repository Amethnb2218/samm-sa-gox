export interface Projection {
  label_fr: string;
  label_wol: string;
  current_year: number;
  current_value: number;
  target_year: number;
  projected_value: number;
  trend: "up" | "down" | "stable";
  insight_fr: string;
  insight_wol: string;
}

function linearRegression(points: { x: number; y: number }[]): { slope: number; intercept: number; predict: (x: number) => number } {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y || 0, predict: () => points[0]?.y || 0 };
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n, predict: () => sumY / n };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept, predict: (x: number) => slope * x + intercept };
}

export function projectPopulation(currentPop: number, growthRate: number = 2.3): Projection {
  const target2030 = currentPop * Math.pow(1 + growthRate / 100, 4);
  return {
    label_fr: "Population projetee 2030",
    label_wol: "Waay-dekk ci 2030",
    current_year: 2026,
    current_value: currentPop,
    target_year: 2030,
    projected_value: Math.round(target2030),
    trend: "up",
    insight_fr: `A ${growthRate}% de croissance annuelle, la population atteindra ${Math.round(target2030).toLocaleString("fr-FR")} en 2030.`,
    insight_wol: `Ak ${growthRate}% yokku att, waay-dekk bi dina am ${Math.round(target2030).toLocaleString("fr-FR")} ci 2030.`,
  };
}

export function projectHealthNeeds(population: number, currentCenters: number): Projection {
  const pop2030 = population * Math.pow(1.023, 4);
  const needed2030 = Math.ceil(pop2030 / 10000);
  const deficit = needed2030 - currentCenters;

  return {
    label_fr: "Postes de sante necessaires en 2030",
    label_wol: "Postu wergu yaram ci 2030",
    current_year: 2026,
    current_value: currentCenters,
    target_year: 2030,
    projected_value: needed2030,
    trend: "up",
    insight_fr: deficit > 0
      ? `Il faudra ${deficit} postes de sante supplementaires d'ici 2030 pour maintenir la norme OMS (1/10 000 hab).`
      : `La couverture sanitaire est suffisante pour 2030 si la capacite est maintenue.`,
    insight_wol: deficit > 0
      ? `Dafa soxla ${deficit} postu wergu yaram bu seet ci 2030 ngir yem ak norme OMS.`
      : `Toll wergu yaram dafa yem bu seet ci 2030.`,
  };
}

export function projectSchoolNeeds(population: number, currentSchools: number): Projection {
  const pop2030 = population * Math.pow(1.023, 4);
  const needed2030 = Math.ceil(pop2030 / 5000);
  const deficit = needed2030 - currentSchools;

  return {
    label_fr: "Ecoles necessaires en 2030",
    label_wol: "Daara ci 2030",
    current_year: 2026,
    current_value: currentSchools,
    target_year: 2030,
    projected_value: needed2030,
    trend: "up",
    insight_fr: deficit > 0
      ? `Il faudra ${deficit} ecole(s) supplementaire(s) d'ici 2030 pour la norme UNESCO (1/5 000 hab).`
      : `Le parc scolaire est suffisant pour la projection 2030.`,
    insight_wol: deficit > 0
      ? `Dafa soxla ${deficit} daara bu seet ci 2030 ngir yem ak norme UNESCO.`
      : `Daara yi dafay yem bu seet ci 2030.`,
  };
}

export function projectNormCompliance(
  currentValue: number,
  normTarget: number,
  historicalGrowthPerYear: number
): { year: number | null; message_fr: string; message_wol: string } {
  if (currentValue >= normTarget) {
    return { year: null, message_fr: "Norme deja atteinte.", message_wol: "Norme bi yem na." };
  }
  if (historicalGrowthPerYear <= 0) {
    return { year: null, message_fr: "Aucune progression observee — objectif non atteignable au rythme actuel.", message_wol: "Dara yoqutul — objectif bi mënul a am." };
  }
  const yearsNeeded = Math.ceil((normTarget - currentValue) / historicalGrowthPerYear);
  const targetYear = 2026 + yearsNeeded;
  return {
    year: targetYear,
    message_fr: `Au rythme actuel (+${historicalGrowthPerYear.toFixed(1)}/an), la norme sera atteinte en ${targetYear}.`,
    message_wol: `Ak yokk bi tey (+${historicalGrowthPerYear.toFixed(1)}/att), norme bi dina am ci ${targetYear}.`,
  };
}

export function computeRegionProjections(
  regionCode: string,
  population: number,
  healthCenters: number,
  schools: number
): Projection[] {
  return [
    projectPopulation(population),
    projectHealthNeeds(population, healthCenters),
    projectSchoolNeeds(population, schools),
  ];
}
