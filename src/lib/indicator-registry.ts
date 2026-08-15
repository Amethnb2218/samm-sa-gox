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

// Source vérifiée : ANSD — RGPH-5, 18 août 2023 (résultats définitifs)
// Référence : https://www.ansd.sn/recensement/rgph-5-2023
// Total vérifié : 18 126 390
export const REGIONAL_POPULATION_RGPH5: {
  code: string;
  name: string;
  population: number;
  population_2013: number;
  area_km2: number;
  status: ConfidenceLevel;
  note: string;
}[] = [
  { code: "DK", name: "Dakar", population: 4004427, population_2013: 3137196, area_km2: 535, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "DL", name: "Diourbel", population: 2080335, population_2013: 1497455, area_km2: 4860, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "FK", name: "Fatick", population: 906918, population_2013: 714392, area_km2: 7010, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KF", name: "Kaffrine", population: 820405, population_2013: 566992, area_km2: 11057, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KL", name: "Kaolack", population: 1336719, population_2013: 960875, area_km2: 5310, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KD", name: "Kédougou", population: 245146, population_2013: 151357, area_km2: 16904, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "KG", name: "Kolda", population: 914798, population_2013: 662455, area_km2: 13752, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "LG", name: "Louga", population: 1125908, population_2013: 874193, area_km2: 25619, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "MT", name: "Matam", population: 831629, population_2013: 562539, area_km2: 28830, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "SL", name: "Saint-Louis", population: 1202442, population_2013: 908942, area_km2: 19010, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "SE", name: "Sédhiou", population: 589266, population_2013: 452994, area_km2: 7353, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "TC", name: "Tambacounda", population: 987151, population_2013: 681310, area_km2: 42613, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "TH", name: "Thiès", population: 2463678, population_2013: 1788864, area_km2: 6586, status: "officiel", note: "RGPH-5 résultats définitifs" },
  { code: "ZG", name: "Ziguinchor", population: 617568, population_2013: 549151, area_km2: 7329, status: "officiel", note: "RGPH-5 résultats définitifs" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// =============================================================================
// INDICATEURS AGRICULTURE — AGRIDATA / RGPH-5 (niveau national)
// Source : https://agridata.ansd.sn/dataset
// Organisme : DSDS/ANSD
// Note : Ces données existent au niveau communal dans le RGPH-5 mais
// les fichiers AGRIDATA consultés ne fournissent que le total national.
// La désagrégation régionale est dans les rapports régionaux PDF (avril 2026).
// =============================================================================
export const AGRIDATA_NATIONAL: RegisteredIndicator[] = [
  {
    id: "menages_agricoles_2023",
    label_fr: "Ménages agricoles (au sens large)",
    label_wol: "Waa kër yu bëy",
    value: 909638,
    unit: "ménages",
    year: 2023,
    geography_level: "national",
    source: "ANSD — DSDS",
    publication: "RGPH-5, module Agriculture intégré",
    source_url: "https://agridata.ansd.sn/dataset/nombredemenagesagricolesrgph",
    status: "officiel",
    methodology: "Somme des ménages déclarant une activité agricole (au sens large : culture, élevage, pêche, sylviculture)",
    limitations: "Niveau communal existe mais non disponible dans le fichier XLS consulté. Désagrégation régionale : voir rapports régionaux RGPH-5.",
    date_accessed: "2026-08-15",
  },
  {
    id: "abattoirs_2023",
    label_fr: "Nombre d'abattoirs",
    label_wol: "Xar-xasu mala",
    value: 107,
    unit: "infrastructures",
    year: 2023,
    geography_level: "national",
    source: "ANSD — DSDS",
    publication: "RGPH-5, module Agriculture",
    source_url: "https://agridata.ansd.sn/dataset/nombredabattoirsrgph",
    status: "officiel",
    methodology: "Somme des infrastructures d'abattage inventoriées lors du RGPH-5",
    limitations: "Niveau communal existe dans le RGPH-5 mais le fichier XLS ne fournit que le total national.",
    date_accessed: "2026-08-15",
  },
  {
    id: "foirails_2023",
    label_fr: "Nombre de foirails (marchés à bétail)",
    label_wol: "Marse gu mala",
    value: 46,
    unit: "infrastructures",
    year: 2023,
    geography_level: "national",
    source: "ANSD — DSDS",
    publication: "RGPH-5, module Agriculture",
    source_url: "https://agridata.ansd.sn/dataset/nombredefoirailsrgph",
    status: "officiel",
    methodology: "Somme des foirails inventoriés lors du RGPH-5",
    limitations: "Niveau communal existe dans le RGPH-5 mais le fichier XLS ne fournit que le total national.",
    date_accessed: "2026-08-15",
  },
  {
    id: "menages_agricoles_2013",
    label_fr: "Ménages agricoles 2013 (comparaison)",
    label_wol: "Waa kër yu bëy 2013",
    value: 755532,
    unit: "ménages",
    year: 2013,
    geography_level: "national",
    source: "ANSD",
    publication: "RGPHAE 2013",
    status: "officiel",
    methodology: "Dénombrement RGPHAE 2013",
    limitations: "",
    date_accessed: "2026-08-15",
  },
];

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
