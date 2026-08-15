import { REGIONS } from "./data";
import { getRegionExtended } from "./norms";
import { ConfidenceLevel } from "./confidence";

export interface Gap {
  domain: string;
  domain_wol: string;
  indicator: string;
  current: number;
  target: number;
  gap_pct: number;
  severity: "critique" | "alerte" | "vigilance" | "conforme";
  source_current: string;
  source_target: string;
  confidence: ConfidenceLevel;
  recommendation_fr: string;
  recommendation_wol: string;
  methodology: string;
}

interface GapDefinition {
  domain: string;
  domain_wol: string;
  indicator: string;
  target: number;
  source_target: string;
  unit: string;
  methodology: string;
  getValue: (code: string, population: number) => number | null;
  getSource: () => string;
  getConfidence: () => ConfidenceLevel;
  getRecommendation: (gap_pct: number, region: string) => { fr: string; wol: string };
}

const GAP_DEFINITIONS: GapDefinition[] = [
  {
    domain: "Santé",
    domain_wol: "Wergu yaram",
    indicator: "Postes de santé pour 10 000 habitants",
    target: 1.5,
    source_target: "Norme OMS / Plan National Développement Sanitaire",
    unit: "postes/10k hab",
    methodology: "Nombre de postes de santé (ANSD carte sanitaire) divisé par population (RGPH-5 2023) x 10 000",
    getValue: (code, population) => {
      const ext = getRegionExtended(code);
      if (!ext) return null;
      return ext.health_centers / (population / 10000);
    },
    getSource: () => "ANSD — Carte sanitaire 2023 + RGPH-5",
    getConfidence: () => "calcule",
    getRecommendation: (gap_pct, region) => ({
      fr: `Le territoire de ${region} présente un déficit de ${Math.abs(Math.round(gap_pct))}% en couverture sanitaire par rapport à la norme. Priorité : renforcement du maillage en postes de santé.`,
      wol: `Gox gu ${region} am na jafe-jafe ci wergu yaram bi — ${Math.abs(Math.round(gap_pct))}% ci suuf normu bi. War na am postu wergu yaram yu bees.`,
    }),
  },
  {
    domain: "Éducation",
    domain_wol: "Jàng",
    indicator: "Établissements scolaires pour 5 000 habitants",
    target: 1.0,
    source_target: "Norme UNESCO / Carte scolaire ANSD",
    unit: "établissements/5k hab",
    methodology: "Nombre d'établissements scolaires (ANSD carte scolaire) divisé par population (RGPH-5 2023) x 5 000",
    getValue: (code, population) => {
      const ext = getRegionExtended(code);
      if (!ext) return null;
      return ext.schools / (population / 5000);
    },
    getSource: () => "ANSD — Carte scolaire 2023 + RGPH-5",
    getConfidence: () => "calcule",
    getRecommendation: (gap_pct, region) => ({
      fr: `Le territoire de ${region} accuse un déficit de ${Math.abs(Math.round(gap_pct))}% en infrastructure éducative. Action prioritaire : construction d'établissements scolaires.`,
      wol: `Gox gu ${region} am na jafe-jafe ci jàng bi — ${Math.abs(Math.round(gap_pct))}% ci suuf normu bi. War na am daara yu bees.`,
    }),
  },
  {
    domain: "Eau",
    domain_wol: "Ndox",
    indicator: "Taux d'accès à l'eau potable",
    target: 95,
    source_target: "ODD 6 — Accès universel à l'eau potable d'ici 2030",
    unit: "%",
    methodology: "Pourcentage de ménages ayant accès à une source d'eau améliorée (RGPH-5 2023, chapitre Habitat)",
    getValue: (code) => {
      const ext = getRegionExtended(code);
      return ext?.water_access_pct ?? null;
    },
    getSource: () => "ANSD — RGPH-5 2023 (chapitre Habitat et cadre de vie)",
    getConfidence: () => "officiel",
    getRecommendation: (gap_pct, region) => ({
      fr: `${region} est à ${Math.abs(Math.round(gap_pct))}% de l'objectif ODD 6 (accès universel eau). Priorité : extension du réseau d'adduction d'eau.`,
      wol: `${region} nekkul ci normu ODD 6 bi — ${Math.abs(Math.round(gap_pct))}% ci suuf. War na am ndox mu sell ci gox yépp.`,
    }),
  },
  {
    domain: "Alphabétisation",
    domain_wol: "Xam-xam bind",
    indicator: "Taux d'alphabétisation des 15 ans et plus",
    target: 75,
    source_target: "ODD 4 — Éducation de qualité / Objectif Sénégal 2030",
    unit: "%",
    methodology: "Pourcentage de la population de 15 ans et plus sachant lire et écrire (RGPH-5 2023, chapitre Éducation)",
    getValue: (code) => {
      const ext = getRegionExtended(code);
      return ext?.literacy_rate ?? null;
    },
    getSource: () => "ANSD — RGPH-5 2023 (chapitre Éducation)",
    getConfidence: () => "officiel",
    getRecommendation: (gap_pct, region) => ({
      fr: `${region} présente un retard de ${Math.abs(Math.round(gap_pct))}% en alphabétisation. Recommandation : programmes d'alphabétisation fonctionnelle ciblés.`,
      wol: `${region} am na jafe-jafe ci xam-xam bind — ${Math.abs(Math.round(gap_pct))}%. War na am programa xam-xam bind.`,
    }),
  },
  {
    domain: "Électricité",
    domain_wol: "Kuraa",
    indicator: "Taux d'accès à l'électricité",
    target: 100,
    source_target: "ODD 7 — Accès universel à l'énergie / PUDC Sénégal",
    unit: "%",
    methodology: "Pourcentage de ménages connectés au réseau électrique ou disposant d'énergie solaire (RGPH-5 2023 + Senelec)",
    getValue: (code) => {
      const ext = getRegionExtended(code);
      return ext?.electricity_pct ?? null;
    },
    getSource: () => "ANSD — RGPH-5 2023 + données Senelec",
    getConfidence: () => "officiel",
    getRecommendation: (gap_pct, region) => ({
      fr: `${region} a un déficit de ${Math.abs(Math.round(gap_pct))}% en accès électrique. Le PUDC et les solutions solaires décentralisées sont des leviers prioritaires.`,
      wol: `${region} am na jafe-jafe ci kuraa — ${Math.abs(Math.round(gap_pct))}%. PUDC ak kuraa gu jant mën naa dimbali.`,
    }),
  },
];

export function computeGapAnalysis(code: string): Gap[] {
  const region = REGIONS.find((r) => r.code === code);
  if (!region) return [];

  const gaps: Gap[] = [];

  for (const def of GAP_DEFINITIONS) {
    const current = def.getValue(code, region.population);
    if (current === null) continue;

    const gap_pct = ((current - def.target) / def.target) * 100;

    let severity: Gap["severity"];
    if (gap_pct <= -30) severity = "critique";
    else if (gap_pct <= -15) severity = "alerte";
    else if (gap_pct < 0) severity = "vigilance";
    else severity = "conforme";

    const reco = def.getRecommendation(gap_pct, region.name);

    gaps.push({
      domain: def.domain,
      domain_wol: def.domain_wol,
      indicator: def.indicator,
      current: Math.round(current * 100) / 100,
      target: def.target,
      gap_pct: Math.round(gap_pct * 10) / 10,
      severity,
      source_current: def.getSource(),
      source_target: def.source_target,
      confidence: def.getConfidence(),
      recommendation_fr: reco.fr,
      recommendation_wol: reco.wol,
      methodology: def.methodology,
    });
  }

  return gaps.sort((a, b) => a.gap_pct - b.gap_pct);
}

export function getPriorityDomains(code: string, topN = 3): Gap[] {
  return computeGapAnalysis(code)
    .filter((g) => g.severity === "critique" || g.severity === "alerte")
    .slice(0, topN);
}
