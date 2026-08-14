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

// Projections 2026 basees sur RGPH 2023 (taux de croissance intercensitaire par region)
export const REGIONS: Region[] = [
  { code: "DK", name: "Dakar", population: 4312500, area_km2: 550, departments: [
    { code: "DK-DA", name: "Dakar", region: "Dakar", population: 1198000, area_km2: 83 },
    { code: "DK-GU", name: "Guediawaye", region: "Dakar", population: 362000, area_km2: 12 },
    { code: "DK-PI", name: "Pikine", region: "Dakar", population: 1285000, area_km2: 95 },
    { code: "DK-RU", name: "Rufisque", region: "Dakar", population: 542500, area_km2: 360 },
    { code: "DK-KE", name: "Keur Massar", region: "Dakar", population: 925000, area_km2: 40 },
  ]},
  { code: "DL", name: "Diourbel", population: 1987000, area_km2: 4824, departments: [
    { code: "DL-DI", name: "Diourbel", region: "Diourbel", population: 223000, area_km2: 1181 },
    { code: "DL-BA", name: "Bambey", region: "Diourbel", population: 375000, area_km2: 1351 },
    { code: "DL-MB", name: "Mbacke", region: "Diourbel", population: 1389000, area_km2: 2292 },
  ]},
  { code: "FK", name: "Fatick", population: 960000, area_km2: 7535, departments: [
    { code: "FK-FA", name: "Fatick", region: "Fatick", population: 385000, area_km2: 2646 },
    { code: "FK-FO", name: "Foundiougne", region: "Fatick", population: 393000, area_km2: 3168 },
    { code: "FK-GO", name: "Gossas", region: "Fatick", population: 182000, area_km2: 1721 },
  ]},
  { code: "KF", name: "Kaffrine", population: 832000, area_km2: 11181, departments: [
    { code: "KF-KA", name: "Kaffrine", region: "Kaffrine", population: 327000, area_km2: 3836 },
    { code: "KF-BI", name: "Birkelane", region: "Kaffrine", population: 149000, area_km2: 1982 },
    { code: "KF-KO", name: "Koungheul", region: "Kaffrine", population: 239000, area_km2: 3534 },
    { code: "KF-MA", name: "Malem Hodar", region: "Kaffrine", population: 117000, area_km2: 1829 },
  ]},
  { code: "KL", name: "Kaolack", population: 1178000, area_km2: 5357, departments: [
    { code: "KL-KA", name: "Kaolack", region: "Kaolack", population: 504000, area_km2: 1624 },
    { code: "KL-GU", name: "Guinguineo", region: "Kaolack", population: 203000, area_km2: 1601 },
    { code: "KL-NI", name: "Nioro du Rip", region: "Kaolack", population: 471000, area_km2: 2132 },
  ]},
  { code: "KD", name: "Kedougou", population: 213000, area_km2: 16800, departments: [
    { code: "KD-KE", name: "Kedougou", region: "Kedougou", population: 101000, area_km2: 5600 },
    { code: "KD-SA", name: "Salemata", region: "Kedougou", population: 50000, area_km2: 5600 },
    { code: "KD-SD", name: "Saraya", region: "Kedougou", population: 62000, area_km2: 5600 },
  ]},
  { code: "KG", name: "Kolda", population: 847000, area_km2: 13718, departments: [
    { code: "KG-KO", name: "Kolda", region: "Kolda", population: 404000, area_km2: 4894 },
    { code: "KG-ME", name: "Medina Yoro Foulah", region: "Kolda", population: 229000, area_km2: 5765 },
    { code: "KG-VE", name: "Velingara", region: "Kolda", population: 214000, area_km2: 3059 },
  ]},
  { code: "LG", name: "Louga", population: 1089000, area_km2: 24874, departments: [
    { code: "LG-LO", name: "Louga", region: "Louga", population: 407000, area_km2: 5765 },
    { code: "LG-KE", name: "Kebemer", region: "Louga", population: 393000, area_km2: 3823 },
    { code: "LG-LI", name: "Linguere", region: "Louga", population: 289000, area_km2: 15286 },
  ]},
  { code: "MT", name: "Matam", population: 742000, area_km2: 25083, departments: [
    { code: "MT-MA", name: "Matam", region: "Matam", population: 296000, area_km2: 7536 },
    { code: "MT-KA", name: "Kanel", region: "Matam", population: 274000, area_km2: 10537 },
    { code: "MT-RA", name: "Ranerou", region: "Matam", population: 172000, area_km2: 7010 },
  ]},
  { code: "SL", name: "Saint-Louis", population: 1115000, area_km2: 19044, departments: [
    { code: "SL-SL", name: "Saint-Louis", region: "Saint-Louis", population: 454000, area_km2: 4127 },
    { code: "SL-DA", name: "Dagana", region: "Saint-Louis", population: 394000, area_km2: 6047 },
    { code: "SL-PO", name: "Podor", region: "Saint-Louis", population: 267000, area_km2: 8870 },
  ]},
  { code: "SE", name: "Sedhiou", population: 612000, area_km2: 7341, departments: [
    { code: "SE-SE", name: "Sedhiou", region: "Sedhiou", population: 231000, area_km2: 2500 },
    { code: "SE-BO", name: "Bounkiling", region: "Sedhiou", population: 214000, area_km2: 2841 },
    { code: "SE-GO", name: "Goudomp", region: "Sedhiou", population: 167000, area_km2: 2000 },
  ]},
  { code: "TC", name: "Tambacounda", population: 961000, area_km2: 42364, departments: [
    { code: "TC-TA", name: "Tambacounda", region: "Tambacounda", population: 387000, area_km2: 10400 },
    { code: "TC-BA", name: "Bakel", region: "Tambacounda", population: 296000, area_km2: 16000 },
    { code: "TC-GD", name: "Goudiry", region: "Tambacounda", population: 165000, area_km2: 8964 },
    { code: "TC-KP", name: "Koumpentoum", region: "Tambacounda", population: 113000, area_km2: 7000 },
  ]},
  { code: "TH", name: "Thies", population: 2310000, area_km2: 6601, departments: [
    { code: "TH-TH", name: "Thies", region: "Thies", population: 948000, area_km2: 1880 },
    { code: "TH-MB", name: "Mbour", region: "Thies", population: 940000, area_km2: 1725 },
    { code: "TH-TI", name: "Tivaouane", region: "Thies", population: 422000, area_km2: 2996 },
  ]},
  { code: "ZG", name: "Ziguinchor", population: 703000, area_km2: 7352, departments: [
    { code: "ZG-ZI", name: "Ziguinchor", region: "Ziguinchor", population: 327000, area_km2: 1458 },
    { code: "ZG-BI", name: "Bignona", region: "Ziguinchor", population: 274000, area_km2: 3740 },
    { code: "ZG-OU", name: "Oussouye", region: "Ziguinchor", population: 102000, area_km2: 2154 },
  ]},
];

export const NATIONAL_INDICATORS: Indicator[] = [
  { code: "POP_TOTAL", name_fr: "Population totale", name_wol: "Waay-dëkk yeppam", value: 19367000, year: 2026, unit: "habitants", source: "Banque Mondiale (proj.)" },
  { code: "GDP_GROWTH", name_fr: "Croissance PIB", name_wol: "Yokk alal", value: 6.68, year: 2025, unit: "%", source: "Banque Mondiale" },
  { code: "INFLATION", name_fr: "Inflation", name_wol: "Yokku njeg", value: 1.46, year: 2025, unit: "%", source: "Banque Mondiale" },
  { code: "POP_GROWTH", name_fr: "Croissance demographique", name_wol: "Yokku waay-dëkk", value: 2.3, year: 2025, unit: "%", source: "Banque Mondiale" },
  { code: "LIFE_EXP", name_fr: "Esperance de vie", name_wol: "Lu nit miin a dund", value: 69, year: 2024, unit: "ans", source: "Banque Mondiale" },
  { code: "LITERACY", name_fr: "Taux d'alphabetisation", name_wol: "Toll xam bind", value: 50.4, year: 2023, unit: "%", source: "Banque Mondiale" },
  { code: "ELECTRICITY", name_fr: "Acces electricite", name_wol: "Toll kuraa", value: 82.9, year: 2024, unit: "%", source: "Banque Mondiale" },
  { code: "INTERNET", name_fr: "Penetration internet", name_wol: "Toll internet", value: 60.1, year: 2024, unit: "%", source: "Banque Mondiale" },
  { code: "UNEMPLOYMENT", name_fr: "Chomage", name_wol: "Baaxul liggey", value: 2.74, year: 2025, unit: "%", source: "Banque Mondiale/OIT" },
  { code: "INFANT_MORT", name_fr: "Mortalite infantile", name_wol: "Dee gu ndaw yi", value: 28.9, year: 2024, unit: "pour 1000", source: "Banque Mondiale" },
  { code: "URBAN", name_fr: "Taux d'urbanisation", name_wol: "Toll dund-dëkk", value: 49.2, year: 2025, unit: "%", source: "Banque Mondiale" },
  { code: "FERTILITY", name_fr: "Indice de fecondite", name_wol: "Toll sago", value: 4.2, year: 2024, unit: "enfants/femme", source: "Banque Mondiale" },
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
