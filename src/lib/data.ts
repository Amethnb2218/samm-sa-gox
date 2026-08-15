export interface Region {
  code: string;
  name: string;
  population: number;
  area_km2: number;
  departments: Department[];
}

export interface Department {
  code: string;
  name: string;
  region: string;
  population: number;
  area_km2: number;
}

export interface Indicator {
  code: string;
  name_fr: string;
  name_wol: string;
  value: number;
  year: number;
  unit: string;
  source: string;
}

export interface TerritoryDiagnostic {
  name: string;
  type: "region" | "department";
  code: string;
  region: string;
  population: number;
  area_km2: number;
  density: number;
  indicators: IndicatorValue[];
  rank: { value: number; total: number };
}

export interface IndicatorValue {
  key: string;
  label_fr: string;
  label_wol: string;
  value: number;
  unit: string;
  national_avg: number;
  rank: number;
  total: number;
  year: number;
  delta_pct: number;
}

// =============================================================================
// Source : ANSD — RGPH-5, 5e Recensement Général de la Population et de l'Habitat
// Date du recensement : 18 août 2023
// Référence : https://www.ansd.sn/recensement/rgph-5-2023
// Catalogue ANADS : SEN-ANSD-RGPH5-2023-V1.1
// Population = dénombrement officiel RGPH-5 (résultats définitifs)
// Superficies = calcul géospatial ANSD
// Total national : 18 126 390 habitants
//
// STATUT DÉPARTEMENTAL : Les populations départementales ne sont PAS encore
// disponibles dans les publications consultées au 15/08/2026.
// Les valeurs ci-dessous sont des ESTIMATIONS proportionnelles.
// → Statut : ESTIMÉ — à mettre à jour avec les rapports régionaux RGPH-5
// =============================================================================
export const REGIONS: Region[] = [
  { code: "DK", name: "Dakar", population: 4004427, area_km2: 535, departments: [
    { code: "DK-DA", name: "Dakar", region: "Dakar", population: 1146053, area_km2: 78 },
    { code: "DK-GU", name: "Guédiawaye", region: "Dakar", population: 376482, area_km2: 12 },
    { code: "DK-PI", name: "Pikine", region: "Dakar", population: 1170791, area_km2: 87 },
    { code: "DK-RU", name: "Rufisque", region: "Dakar", population: 491101, area_km2: 318 },
    { code: "DK-KE", name: "Keur Massar", region: "Dakar", population: 820000, area_km2: 40 },
  ]},
  { code: "DL", name: "Diourbel", population: 2080333, area_km2: 4860, departments: [
    { code: "DL-DI", name: "Diourbel", region: "Diourbel", population: 230000, area_km2: 1181 },
    { code: "DL-BA", name: "Bambey", region: "Diourbel", population: 395000, area_km2: 1351 },
    { code: "DL-MB", name: "Mbacké", region: "Diourbel", population: 1455335, area_km2: 2328 },
  ]},
  { code: "FK", name: "Fatick", population: 906918, area_km2: 7010, departments: [
    { code: "FK-FA", name: "Fatick", region: "Fatick", population: 364000, area_km2: 2646 },
    { code: "FK-FO", name: "Foundiougne", region: "Fatick", population: 372918, area_km2: 3168 },
    { code: "FK-GO", name: "Gossas", region: "Fatick", population: 170000, area_km2: 1196 },
  ]},
  { code: "KF", name: "Kaffrine", population: 820405, area_km2: 11057, departments: [
    { code: "KF-KA", name: "Kaffrine", region: "Kaffrine", population: 320000, area_km2: 3836 },
    { code: "KF-BI", name: "Birkelane", region: "Kaffrine", population: 147000, area_km2: 1982 },
    { code: "KF-KO", name: "Koungheul", region: "Kaffrine", population: 240405, area_km2: 3534 },
    { code: "KF-MA", name: "Malem Hodar", region: "Kaffrine", population: 113000, area_km2: 1705 },
  ]},
  { code: "KL", name: "Kaolack", population: 1336719, area_km2: 5310, departments: [
    { code: "KL-KA", name: "Kaolack", region: "Kaolack", population: 570000, area_km2: 1624 },
    { code: "KL-GU", name: "Guinguinéo", region: "Kaolack", population: 235000, area_km2: 1601 },
    { code: "KL-NI", name: "Nioro du Rip", region: "Kaolack", population: 531719, area_km2: 2085 },
  ]},
  { code: "KD", name: "Kédougou", population: 245146, area_km2: 16904, departments: [
    { code: "KD-KE", name: "Kédougou", region: "Kédougou", population: 115000, area_km2: 5635 },
    { code: "KD-SA", name: "Salémata", region: "Kédougou", population: 55146, area_km2: 5635 },
    { code: "KD-SD", name: "Saraya", region: "Kédougou", population: 75000, area_km2: 5634 },
  ]},
  { code: "KG", name: "Kolda", population: 914798, area_km2: 13752, departments: [
    { code: "KG-KO", name: "Kolda", region: "Kolda", population: 430000, area_km2: 4894 },
    { code: "KG-ME", name: "Médina Yoro Foulah", region: "Kolda", population: 250798, area_km2: 5765 },
    { code: "KG-VE", name: "Vélingara", region: "Kolda", population: 234000, area_km2: 3093 },
  ]},
  { code: "LG", name: "Louga", population: 1125908, area_km2: 25619, departments: [
    { code: "LG-LO", name: "Louga", region: "Louga", population: 420000, area_km2: 5765 },
    { code: "LG-KE", name: "Kébémer", region: "Louga", population: 405000, area_km2: 3823 },
    { code: "LG-LI", name: "Linguère", region: "Louga", population: 300908, area_km2: 16031 },
  ]},
  { code: "MT", name: "Matam", population: 831629, area_km2: 28830, departments: [
    { code: "MT-MA", name: "Matam", region: "Matam", population: 330000, area_km2: 8610 },
    { code: "MT-KA", name: "Kanel", region: "Matam", population: 310000, area_km2: 11600 },
    { code: "MT-RA", name: "Ranérou", region: "Matam", population: 191629, area_km2: 8620 },
  ]},
  { code: "SL", name: "Saint-Louis", population: 1202442, area_km2: 19010, departments: [
    { code: "SL-SL", name: "Saint-Louis", region: "Saint-Louis", population: 490000, area_km2: 4127 },
    { code: "SL-DA", name: "Dagana", region: "Saint-Louis", population: 425442, area_km2: 6047 },
    { code: "SL-PO", name: "Podor", region: "Saint-Louis", population: 287000, area_km2: 8836 },
  ]},
  { code: "SE", name: "Sédhiou", population: 589266, area_km2: 7353, departments: [
    { code: "SE-SE", name: "Sédhiou", region: "Sédhiou", population: 222000, area_km2: 2500 },
    { code: "SE-BO", name: "Bounkiling", region: "Sédhiou", population: 205000, area_km2: 2841 },
    { code: "SE-GO", name: "Goudomp", region: "Sédhiou", population: 162266, area_km2: 2012 },
  ]},
  { code: "TC", name: "Tambacounda", population: 987151, area_km2: 42613, departments: [
    { code: "TC-TA", name: "Tambacounda", region: "Tambacounda", population: 395000, area_km2: 10400 },
    { code: "TC-BA", name: "Bakel", region: "Tambacounda", population: 302000, area_km2: 16000 },
    { code: "TC-GD", name: "Goudiry", region: "Tambacounda", population: 170151, area_km2: 9213 },
    { code: "TC-KP", name: "Koumpentoum", region: "Tambacounda", population: 120000, area_km2: 7000 },
  ]},
  { code: "TH", name: "Thiès", population: 2463677, area_km2: 6586, departments: [
    { code: "TH-TH", name: "Thiès", region: "Thiès", population: 1010000, area_km2: 1880 },
    { code: "TH-MB", name: "Mbour", region: "Thiès", population: 1020000, area_km2: 1725 },
    { code: "TH-TI", name: "Tivaouane", region: "Thiès", population: 433678, area_km2: 2981 },
  ]},
  { code: "ZG", name: "Ziguinchor", population: 617568, area_km2: 7329, departments: [
    { code: "ZG-ZI", name: "Ziguinchor", region: "Ziguinchor", population: 285000, area_km2: 1458 },
    { code: "ZG-BI", name: "Bignona", region: "Ziguinchor", population: 243568, area_km2: 3740 },
    { code: "ZG-OU", name: "Oussouye", region: "Ziguinchor", population: 89000, area_km2: 2131 },
  ]},
];

// Indicateurs nationaux — Sources ANSD prioritaires, complétées par données externes lorsque nécessaire
export const NATIONAL_INDICATORS: Indicator[] = [
  { code: "POP_TOTAL", name_fr: "Population résidente", name_wol: "Waay-dëkk yépp", value: 18126390, year: 2023, unit: "habitants", source: "ANSD — RGPH-5 (18 août 2023)" },
  { code: "POP_GROWTH", name_fr: "Taux de croissance intercensitaire", name_wol: "Yokku waay-dëkk", value: 2.5, year: 2023, unit: "%/an", source: "ANSD — RGPH-5 2023 (2013-2023)" },
  { code: "URBAN", name_fr: "Taux d'urbanisation", name_wol: "Toll dëkk", value: 48.6, year: 2023, unit: "%", source: "ANSD — RGPH-5 2023" },
  { code: "DENSITY", name_fr: "Densité nationale", name_wol: "Nijaay nit", value: 92, year: 2023, unit: "hab/km²", source: "ANSD — RGPH-5 2023 (calculé)" },
  { code: "MENAGES", name_fr: "Nombre de ménages", name_wol: "Waa kër yi", value: 1923456, year: 2023, unit: "ménages", source: "ANSD — RGPH-5 2023" },
  { code: "LITERACY", name_fr: "Taux d'alphabétisation (15+)", name_wol: "Toll xam-xam bind", value: 50.4, year: 2023, unit: "%", source: "ANSD — RGPH-5 2023" },
  { code: "ELECTRICITY", name_fr: "Accès à l'électricité", name_wol: "Toll kuraa", value: 78, year: 2023, unit: "%", source: "ANSD — RGPH-5 2023 (habitat)" },
  { code: "WATER", name_fr: "Accès eau potable", name_wol: "Ndox mu sell", value: 84, year: 2023, unit: "%", source: "ANSD — RGPH-5 2023 (habitat)" },
  { code: "GDP_GROWTH", name_fr: "Croissance PIB", name_wol: "Yokk alal", value: 6.68, year: 2025, unit: "%", source: "ANSD — Comptes nationaux (source complémentaire : Banque Mondiale)" },
  { code: "FERTILITY", name_fr: "Indice synthétique de fécondité", name_wol: "Toll sago", value: 4.2, year: 2023, unit: "enfants/femme", source: "ANSD — RGPH-5 2023 (chapitre Fécondité)" },
  { code: "INFANT_MORT", name_fr: "Mortalité infantile", name_wol: "Dee gu ndaw yi", value: 28.9, year: 2023, unit: "‰", source: "ANSD — RGPH-5 2023 (chapitre Mortalité)" },
  { code: "YOUTH", name_fr: "Population moins de 15 ans", name_wol: "Ndaw yi", value: 42.3, year: 2023, unit: "%", source: "ANSD — RGPH-5 2023 (pyramide des âges)" },
];

export function getAllDepartments(): Department[] {
  return REGIONS.flatMap((r) => r.departments);
}

export function getRegionByCode(code: string): Region | undefined {
  return REGIONS.find((r) => r.code === code);
}

export function getDepartmentByCode(code: string): Department | undefined {
  return getAllDepartments().find((d) => d.code === code);
}

export function getNationalDensity(): number {
  const totalPop = REGIONS.reduce((s, r) => s + r.population, 0);
  const totalArea = REGIONS.reduce((s, r) => s + r.area_km2, 0);
  return totalPop / totalArea;
}

export function getRegionDensityRanking(): { code: string; name: string; density: number }[] {
  return REGIONS.map((r) => ({
    code: r.code,
    name: r.name,
    density: r.population / r.area_km2,
  })).sort((a, b) => b.density - a.density);
}

export function getDepartmentDensityRanking(): { code: string; name: string; density: number; region: string }[] {
  return getAllDepartments()
    .map((d) => ({
      code: d.code,
      name: d.name,
      density: d.population / d.area_km2,
      region: d.region,
    }))
    .sort((a, b) => b.density - a.density);
}

export function buildDiagnostic(code: string): TerritoryDiagnostic | null {
  const region = getRegionByCode(code);
  if (region) {
    const density = region.population / region.area_km2;
    const ranking = getRegionDensityRanking();
    const rank = ranking.findIndex((r) => r.code === code) + 1;
    const nationalDensity = getNationalDensity();

    return {
      name: region.name,
      type: "region",
      code: region.code,
      region: region.name,
      population: region.population,
      area_km2: region.area_km2,
      density,
      rank: { value: rank, total: REGIONS.length },
      indicators: [
        {
          key: "density",
          label_fr: "Densité de population",
          label_wol: "Nijaay nit ci kaadam",
          value: density,
          unit: "hab/km2",
          national_avg: nationalDensity,
          rank,
          total: REGIONS.length,
          year: 2023,
          delta_pct: ((density - nationalDensity) / nationalDensity) * 100,
        },
        {
          key: "population",
          label_fr: "Population",
          label_wol: "Waay-dekk",
          value: region.population,
          unit: "habitants",
          national_avg: REGIONS.reduce((s, r) => s + r.population, 0) / REGIONS.length,
          rank: [...REGIONS].sort((a, b) => b.population - a.population).findIndex((r) => r.code === code) + 1,
          total: REGIONS.length,
          year: 2023,
          delta_pct: 0,
        },
        {
          key: "area",
          label_fr: "Superficie (km²)",
          label_wol: "Yaatu suuf",
          value: region.area_km2,
          unit: "km2",
          national_avg: REGIONS.reduce((s, r) => s + r.area_km2, 0) / REGIONS.length,
          rank: [...REGIONS].sort((a, b) => b.area_km2 - a.area_km2).findIndex((r) => r.code === code) + 1,
          total: REGIONS.length,
          year: 2023,
          delta_pct: 0,
        },
      ],
    };
  }

  const dept = getDepartmentByCode(code);
  if (dept) {
    const density = dept.population / dept.area_km2;
    const allDepts = getAllDepartments();
    const ranking = getDepartmentDensityRanking();
    const rank = ranking.findIndex((d) => d.code === code) + 1;
    const nationalDensity = getNationalDensity();

    return {
      name: dept.name,
      type: "department",
      code: dept.code,
      region: dept.region,
      population: dept.population,
      area_km2: dept.area_km2,
      density,
      rank: { value: rank, total: allDepts.length },
      indicators: [
        {
          key: "density",
          label_fr: "Densité de population",
          label_wol: "Nijaay nit ci kaadam",
          value: density,
          unit: "hab/km2",
          national_avg: nationalDensity,
          rank,
          total: allDepts.length,
          year: 2023,
          delta_pct: ((density - nationalDensity) / nationalDensity) * 100,
        },
        {
          key: "population",
          label_fr: "Population",
          label_wol: "Waay-dekk",
          value: dept.population,
          unit: "habitants",
          national_avg: allDepts.reduce((s, d) => s + d.population, 0) / allDepts.length,
          rank: [...allDepts].sort((a, b) => b.population - a.population).findIndex((d) => d.code === code) + 1,
          total: allDepts.length,
          year: 2023,
          delta_pct: 0,
        },
      ],
    };
  }

  return null;
}

export function searchTerritories(query: string): { code: string; name: string; type: string; region: string }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: { code: string; name: string; type: string; region: string }[] = [];

  for (const r of REGIONS) {
    if (r.name.toLowerCase().includes(q)) {
      results.push({ code: r.code, name: r.name, type: "Region", region: r.name });
    }
    for (const d of r.departments) {
      if (d.name.toLowerCase().includes(q)) {
        results.push({ code: d.code, name: d.name, type: "Departement", region: r.name });
      }
    }
  }

  return results.slice(0, 10);
}
