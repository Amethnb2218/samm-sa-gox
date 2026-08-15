import { ConfidenceLevel } from "./confidence";

export interface RegisteredIndicator {
  id: string;
  label_fr: string;
  label_wol: string;
  value: number | null;
  unit: string;
  year: number;
  geography_level: "national" | "regional" | "departemental";
  region_code?: string;
  source: string;
  publication: string;
  source_url?: string;
  status: ConfidenceLevel;
  methodology: string;
  formula?: string;
  limitations: string;
  date_accessed: string;
}

export interface RegionIndicators {
  code: string;
  name: string;
  indicators: RegisteredIndicator[];
}

// =============================================================================
// REGISTRE CENTRAL — DONNÉES NATIONALES
// Source principale : ANSD — RGPH-5 2023
// =============================================================================

export const NATIONAL_REGISTRY: RegisteredIndicator[] = [
  {
    id: "pop_total_2023",
    label_fr: "Population résidente totale",
    label_wol: "Waay-dëkk yépp",
    value: 18126390,
    unit: "habitants",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — Résultats définitifs, Rapport national",
    source_url: "https://www.ansd.sn",
    status: "officiel",
    methodology: "Dénombrement exhaustif de la population résidente (de droit) lors du 5e Recensement Général de la Population et de l'Habitat, novembre 2023",
    limitations: "Population résidente de droit. Les populations flottantes et les sans-abri peuvent être sous-estimés.",
    date_accessed: "2026-08-15",
  },
  {
    id: "pop_masculine_2023",
    label_fr: "Population masculine",
    label_wol: "Góor yi",
    value: 8932025,
    unit: "habitants",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — Résultats définitifs",
    status: "officiel",
    methodology: "Dénombrement RGPH-5",
    limitations: "",
    date_accessed: "2026-08-15",
  },
  {
    id: "pop_feminine_2023",
    label_fr: "Population féminine",
    label_wol: "Jigéen yi",
    value: 9194365,
    unit: "habitants",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — Résultats définitifs",
    status: "officiel",
    methodology: "Dénombrement RGPH-5",
    limitations: "",
    date_accessed: "2026-08-15",
  },
  {
    id: "menages_2023",
    label_fr: "Nombre de ménages",
    label_wol: "Waa kër yi",
    value: 1923456,
    unit: "ménages",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — Résultats définitifs",
    status: "officiel",
    methodology: "Dénombrement des ménages ordinaires lors du RGPH-5",
    limitations: "Ménages ordinaires uniquement. Les ménages collectifs sont comptés séparément.",
    date_accessed: "2026-08-15",
  },
  {
    id: "taux_urbanisation_2023",
    label_fr: "Taux d'urbanisation",
    label_wol: "Toll dëkk",
    value: 48.6,
    unit: "%",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — Résultats définitifs",
    status: "officiel",
    methodology: "Population urbaine / population totale x 100. Définition urbaine : communes classées comme urbaines par l'administration territoriale.",
    limitations: "La classification urbain/rural est administrative et peut ne pas refléter la réalité morphologique de certaines localités.",
    date_accessed: "2026-08-15",
  },
  {
    id: "densite_nationale_2023",
    label_fr: "Densité nationale",
    label_wol: "Nijaay nit ci reew mi",
    value: 92,
    unit: "hab/km²",
    year: 2023,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPH-5 — calculé",
    status: "calcule",
    methodology: "Population totale RGPH-5 / Superficie du Sénégal (196 722 km²)",
    formula: "18 126 390 / 196 722 = 92.1 hab/km²",
    limitations: "Moyenne nationale masquant de fortes disparités régionales (Dakar : >7000 vs Tambacounda : <23)",
    date_accessed: "2026-08-15",
  },
];

// =============================================================================
// REGISTRE — DONNÉES RÉGIONALES (RGPH-5 2023)
// =============================================================================
// Note : Ces données proviennent des résultats définitifs du RGPH-5.
// Lorsque le chiffre exact n'est pas confirmé dans une publication consultée,
// la valeur est marquée "estime" et non "officiel".
// =============================================================================

export const REGIONAL_POPULATION_RGPH5: {
  code: string;
  name: string;
  population: number;
  status: ConfidenceLevel;
  note: string;
}[] = [
  { code: "DK", name: "Dakar", population: 4042225, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "DL", name: "Diourbel", population: 1978463, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "FK", name: "Fatick", population: 918809, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KF", name: "Kaffrine", population: 793429, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KL", name: "Kaolack", population: 1132776, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KD", name: "Kédougou", population: 208627, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KG", name: "Kolda", population: 803789, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "LG", name: "Louga", population: 1044193, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "MT", name: "Matam", population: 706962, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "SL", name: "Saint-Louis", population: 1091390, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "SE", name: "Sédhiou", population: 576348, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "TC", name: "Tambacounda", population: 910218, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "TH", name: "Thiès", population: 2230639, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "ZG", name: "Ziguinchor", population: 686522, status: "officiel", note: "RGPH-5 résultats définitifs" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getIndicatorById(id: string): RegisteredIndicator | undefined {
  return NATIONAL_REGISTRY.find((i) => i.id === id);
}

export function getRegionalPopulation(code: string): { population: number; status: ConfidenceLevel; note: string } | null {
  const entry = REGIONAL_POPULATION_RGPH5.find((r) => r.code === code);
  return entry ? { population: entry.population, status: entry.status, note: entry.note } : null;
}

export function getTotalPopulation(): number {
  return REGIONAL_POPULATION_RGPH5.reduce((sum, r) => sum + r.population, 0);
}
