export interface Norm {
  key: string;
  label_fr: string;
  label_wol: string;
  standard: number;
  unit: string;
  source: string;
  direction: "min" | "max";
  category: "sante" | "education" | "infrastructure" | "economie";
}

export const NORMS: Norm[] = [
  {
    key: "health_centers_per_10k",
    label_fr: "Postes de sante pour 10 000 hab.",
    label_wol: "Postu wergu yaram ci 10 000 nit",
    standard: 1,
    unit: "postes/10k",
    source: "Norme OMS",
    direction: "min",
    category: "sante",
  },
  {
    key: "doctors_per_10k",
    label_fr: "Medecins pour 10 000 hab.",
    label_wol: "Doktoor ci 10 000 nit",
    standard: 1,
    unit: "medecins/10k",
    source: "Norme OMS (minimum)",
    direction: "min",
    category: "sante",
  },
  {
    key: "school_per_5k",
    label_fr: "Ecoles primaires pour 5 000 hab.",
    label_wol: "Daara ci 5 000 nit",
    standard: 1,
    unit: "ecoles/5k",
    source: "Norme UNESCO",
    direction: "min",
    category: "education",
  },
  {
    key: "literacy_rate",
    label_fr: "Taux d'alphabetisation",
    label_wol: "Toll xam bind",
    standard: 75,
    unit: "%",
    source: "Objectif ODD 4",
    direction: "min",
    category: "education",
  },
  {
    key: "electricity_rate",
    label_fr: "Taux d'acces electricite",
    label_wol: "Toll kuraa",
    standard: 100,
    unit: "%",
    source: "Objectif ODD 7",
    direction: "min",
    category: "infrastructure",
  },
  {
    key: "water_rate",
    label_fr: "Taux d'acces eau potable",
    label_wol: "Toll ndox mu sell",
    standard: 100,
    unit: "%",
    source: "Objectif ODD 6",
    direction: "min",
    category: "infrastructure",
  },
  {
    key: "poverty_rate",
    label_fr: "Taux de pauvrete",
    label_wol: "Toll njaboot",
    standard: 10,
    unit: "%",
    source: "Objectif ODD 1 (2030)",
    direction: "max",
    category: "economie",
  },
];

export interface RegionExtendedData {
  code: string;
  health_centers: number;
  doctors: number;
  schools: number;
  literacy_rate: number;
  electricity_rate: number;
  water_rate: number;
  poverty_rate: number;
}

// Estimations basees sur les derniers rapports ANSD/MSAS/MEN disponibles
export const REGION_EXTENDED: RegionExtendedData[] = [
  { code: "DK", health_centers: 312, doctors: 890, schools: 1450, literacy_rate: 72.3, electricity_rate: 97.5, water_rate: 95.2, poverty_rate: 18.5 },
  { code: "DL", health_centers: 98, doctors: 62, schools: 520, literacy_rate: 38.2, electricity_rate: 68.4, water_rate: 78.6, poverty_rate: 48.2 },
  { code: "FK", health_centers: 65, doctors: 28, schools: 310, literacy_rate: 35.8, electricity_rate: 52.3, water_rate: 72.1, poverty_rate: 55.7 },
  { code: "KF", health_centers: 48, doctors: 18, schools: 245, literacy_rate: 28.4, electricity_rate: 38.7, water_rate: 64.3, poverty_rate: 62.1 },
  { code: "KL", health_centers: 72, doctors: 35, schools: 380, literacy_rate: 37.5, electricity_rate: 58.2, water_rate: 75.8, poverty_rate: 49.8 },
  { code: "KD", health_centers: 18, doctors: 8, schools: 72, literacy_rate: 22.1, electricity_rate: 28.5, water_rate: 48.7, poverty_rate: 71.3 },
  { code: "KG", health_centers: 52, doctors: 22, schools: 285, literacy_rate: 31.6, electricity_rate: 35.8, water_rate: 58.4, poverty_rate: 63.8 },
  { code: "LG", health_centers: 68, doctors: 32, schools: 345, literacy_rate: 33.7, electricity_rate: 55.6, water_rate: 71.2, poverty_rate: 52.4 },
  { code: "MT", health_centers: 45, doctors: 19, schools: 215, literacy_rate: 26.8, electricity_rate: 42.3, water_rate: 62.8, poverty_rate: 58.6 },
  { code: "SL", health_centers: 78, doctors: 45, schools: 375, literacy_rate: 42.5, electricity_rate: 72.8, water_rate: 82.4, poverty_rate: 38.5 },
  { code: "SE", health_centers: 38, doctors: 14, schools: 195, literacy_rate: 27.3, electricity_rate: 32.4, water_rate: 55.2, poverty_rate: 66.4 },
  { code: "TC", health_centers: 55, doctors: 21, schools: 298, literacy_rate: 29.5, electricity_rate: 36.2, water_rate: 56.8, poverty_rate: 60.2 },
  { code: "TH", health_centers: 145, doctors: 125, schools: 720, literacy_rate: 55.8, electricity_rate: 85.2, water_rate: 88.6, poverty_rate: 28.4 },
  { code: "ZG", health_centers: 48, doctors: 24, schools: 235, literacy_rate: 45.2, electricity_rate: 58.7, water_rate: 68.5, poverty_rate: 47.2 },
];

export interface GapResult {
  norm: Norm;
  current_value: number;
  gap: number;
  gap_pct: number;
  status: "conforme" | "alerte" | "critique";
  recommendation_fr: string;
  recommendation_wol: string;
  needed: number;
}

export function computeGaps(regionCode: string, population: number): GapResult[] {
  const data = REGION_EXTENDED.find((r) => r.code === regionCode);
  if (!data) return [];

  const results: GapResult[] = [];

  for (const norm of NORMS) {
    let currentValue: number;
    let needed = 0;

    switch (norm.key) {
      case "health_centers_per_10k":
        currentValue = (data.health_centers / population) * 10000;
        needed = Math.max(0, Math.ceil((norm.standard * population) / 10000) - data.health_centers);
        break;
      case "doctors_per_10k":
        currentValue = (data.doctors / population) * 10000;
        needed = Math.max(0, Math.ceil((norm.standard * population) / 10000) - data.doctors);
        break;
      case "school_per_5k":
        currentValue = (data.schools / population) * 5000;
        needed = Math.max(0, Math.ceil((norm.standard * population) / 5000) - data.schools);
        break;
      case "literacy_rate":
        currentValue = data.literacy_rate;
        needed = 0;
        break;
      case "electricity_rate":
        currentValue = data.electricity_rate;
        needed = 0;
        break;
      case "water_rate":
        currentValue = data.water_rate;
        needed = 0;
        break;
      case "poverty_rate":
        currentValue = data.poverty_rate;
        needed = 0;
        break;
      default:
        continue;
    }

    const gap = norm.direction === "min"
      ? norm.standard - currentValue
      : currentValue - norm.standard;

    const gap_pct = (gap / norm.standard) * 100;

    let status: GapResult["status"];
    if (gap <= 0) status = "conforme";
    else if (gap_pct < 30) status = "alerte";
    else status = "critique";

    let recommendation_fr = "";
    let recommendation_wol = "";

    if (status !== "conforme") {
      if (norm.key === "health_centers_per_10k") {
        recommendation_fr = `Il manque ${needed} poste(s) de sante pour atteindre la norme OMS.`;
        recommendation_wol = `Dafa soxla ${needed} postu wergu yaram ngir yem ak norme OMS bi.`;
      } else if (norm.key === "doctors_per_10k") {
        recommendation_fr = `Il manque ${needed} medecin(s) pour atteindre le minimum OMS.`;
        recommendation_wol = `Dafa soxla ${needed} doktoor ngir yem ak norme OMS bi.`;
      } else if (norm.key === "school_per_5k") {
        recommendation_fr = `Il manque ${needed} ecole(s) primaire(s) pour la norme UNESCO.`;
        recommendation_wol = `Dafa soxla ${needed} daara ngir yem ak norme UNESCO bi.`;
      } else if (norm.key === "literacy_rate") {
        recommendation_fr = `Taux d'alphabetisation ${currentValue.toFixed(1)}% vs objectif 75%. Deficit de ${gap.toFixed(1)} points.`;
        recommendation_wol = `Toll xam bind ${currentValue.toFixed(1)}% vs 75%. Jafe-jafe ${gap.toFixed(1)} poñ.`;
      } else if (norm.key === "electricity_rate") {
        recommendation_fr = `Couverture electrique ${currentValue.toFixed(1)}%. ${(100 - currentValue).toFixed(1)}% de la population non couverte.`;
        recommendation_wol = `Kuraa ${currentValue.toFixed(1)}%. ${(100 - currentValue).toFixed(1)}% ci nit yi amul kuraa.`;
      } else if (norm.key === "water_rate") {
        recommendation_fr = `Acces eau potable ${currentValue.toFixed(1)}%. ${(100 - currentValue).toFixed(1)}% de la population non couverte.`;
        recommendation_wol = `Ndox mu sell ${currentValue.toFixed(1)}%. ${(100 - currentValue).toFixed(1)}% ci nit yi amul ndox.`;
      } else if (norm.key === "poverty_rate") {
        recommendation_fr = `Taux de pauvrete ${currentValue.toFixed(1)}% vs objectif ODD <10%. ${(currentValue - 10).toFixed(1)} points au-dessus.`;
        recommendation_wol = `Toll njaboot ${currentValue.toFixed(1)}% vs ODD <10%. ${(currentValue - 10).toFixed(1)} poñ ci kow.`;
      }
    }

    results.push({
      norm,
      current_value: currentValue,
      gap: Math.max(0, gap),
      gap_pct: Math.max(0, gap_pct),
      status,
      recommendation_fr,
      recommendation_wol,
      needed,
    });
  }

  return results;
}

export interface OpportunityScore {
  overall: number;
  category: "tres_forte" | "forte" | "moderee" | "faible";
  factors: { label_fr: string; label_wol: string; score: number; detail: string }[];
}

export function computeOpportunityScore(regionCode: string, population: number, area_km2: number): OpportunityScore {
  const data = REGION_EXTENDED.find((r) => r.code === regionCode);
  if (!data) return { overall: 0, category: "faible", factors: [] };

  const density = population / area_km2;
  const factors: OpportunityScore["factors"] = [];

  // Factor 1: Market size (population density)
  const densityScore = Math.min(100, (density / 100) * 100);
  factors.push({
    label_fr: "Taille du marche (densite)",
    label_wol: "Yaatu marse bi (nijaay nit)",
    score: densityScore,
    detail: `${Math.round(density)} hab/km2`,
  });

  // Factor 2: Purchasing power (inverse poverty)
  const purchasingScore = Math.max(0, 100 - data.poverty_rate);
  factors.push({
    label_fr: "Pouvoir d'achat",
    label_wol: "Dooleel jey",
    score: purchasingScore,
    detail: `Pauvrete: ${data.poverty_rate}%`,
  });

  // Factor 3: Infrastructure (electricity + water avg)
  const infraScore = (data.electricity_rate + data.water_rate) / 2;
  factors.push({
    label_fr: "Infrastructures (eau + electricite)",
    label_wol: "Mbiri (ndox + kuraa)",
    score: infraScore,
    detail: `Elec: ${data.electricity_rate}%, Eau: ${data.water_rate}%`,
  });

  // Factor 4: Service gaps (opportunity = what's missing)
  const healthGap = Math.max(0, 1 - (data.health_centers / population) * 10000);
  const schoolGap = Math.max(0, 1 - (data.schools / population) * 5000);
  const gapScore = ((healthGap + schoolGap) / 2) * 100;
  factors.push({
    label_fr: "Lacunes en services (opportunite)",
    label_wol: "Jafe-jafe ci jariñ yi (oportinite)",
    score: gapScore,
    detail: `Deficits sante/education = demande non satisfaite`,
  });

  // Factor 5: Education level (workforce quality)
  const educScore = data.literacy_rate;
  factors.push({
    label_fr: "Niveau education (main-d'oeuvre)",
    label_wol: "Toll jang (nit yi miin liggey)",
    score: educScore,
    detail: `Alphabetisation: ${data.literacy_rate}%`,
  });

  const overall = factors.reduce((s, f) => s + f.score, 0) / factors.length;

  let category: OpportunityScore["category"];
  if (overall >= 70) category = "tres_forte";
  else if (overall >= 50) category = "forte";
  else if (overall >= 35) category = "moderee";
  else category = "faible";

  return { overall, category, factors };
}
