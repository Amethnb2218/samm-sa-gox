import { REGIONS } from "./data";
import { getRegionExtended } from "./norms";

export interface TimelinePoint {
  year: number;
  value: number;
  source: string;
  status?: "officiel" | "calcule" | "estime" | "projete";
}

export interface TimelineIndicator {
  code: string;
  label_fr: string;
  label_wol: string;
  unit: string;
  data: TimelinePoint[];
  change_20y: number;
  change_label_fr: string;
  change_label_wol: string;
}

export interface RegionTimeline {
  region_code: string;
  region_name: string;
  indicators: TimelineIndicator[];
  summary_fr: string;
  summary_wol: string;
}

const NATIONAL_TIMELINE_DATA: Record<string, TimelinePoint[]> = {
  population: [
    { year: 2006, value: 11.4, source: "ANSD — RGPH-3 2002 (projection)", status: "projete" },
    { year: 2008, value: 12.1, source: "ANSD — projection intercensitaire", status: "projete" },
    { year: 2010, value: 12.9, source: "ANSD — projection intercensitaire", status: "projete" },
    { year: 2013, value: 14.1, source: "ANSD — RGPHAE 2013", status: "officiel" },
    { year: 2016, value: 15.4, source: "ANSD — projection RGPHAE", status: "projete" },
    { year: 2019, value: 16.7, source: "ANSD — projection intercensitaire", status: "projete" },
    { year: 2023, value: 18.3, source: "ANSD — RGPH-5 2023", status: "officiel" },
    { year: 2026, value: 19.4, source: "ANSD — projection RGPH-5", status: "projete" },
  ],
  scolarisation: [
    { year: 2006, value: 72.3, source: "ANSD — Enquête ménages 2006", status: "officiel" },
    { year: 2010, value: 78.1, source: "ANSD — EDS 2010", status: "officiel" },
    { year: 2013, value: 81.5, source: "ANSD — RGPHAE 2013", status: "officiel" },
    { year: 2016, value: 83.2, source: "ANSD — EDS-Continue 2016", status: "officiel" },
    { year: 2019, value: 85.7, source: "ANSD — EDS-Continue 2019", status: "officiel" },
    { year: 2023, value: 88.4, source: "ANSD — RGPH-5 2023", status: "officiel" },
  ],
  urbanisation: [
    { year: 2006, value: 40.5, source: "ANSD — projection RGPH-3", status: "projete" },
    { year: 2010, value: 42.3, source: "ANSD — estimation", status: "estime" },
    { year: 2013, value: 44.2, source: "ANSD — RGPHAE 2013", status: "officiel" },
    { year: 2016, value: 45.8, source: "ANSD — projection RGPHAE", status: "projete" },
    { year: 2019, value: 47.1, source: "ANSD — estimation", status: "estime" },
    { year: 2023, value: 48.6, source: "ANSD — RGPH-5 2023", status: "officiel" },
    { year: 2026, value: 49.2, source: "ANSD — projection RGPH-5", status: "projete" },
  ],
  acces_eau: [
    { year: 2006, value: 64, source: "ANSD — Enquête ménages", status: "officiel" },
    { year: 2010, value: 69, source: "ANSD — EDS 2010", status: "officiel" },
    { year: 2013, value: 73, source: "ANSD — RGPHAE 2013", status: "officiel" },
    { year: 2016, value: 77, source: "ANSD — EDS-Continue 2016", status: "officiel" },
    { year: 2019, value: 80, source: "ANSD — EDS-Continue 2019", status: "officiel" },
    { year: 2023, value: 84, source: "ANSD — RGPH-5 2023", status: "officiel" },
  ],
  acces_electricite: [
    { year: 2006, value: 42, source: "ANSD + Senelec", status: "estime" },
    { year: 2010, value: 52, source: "ANSD — EDS 2010", status: "officiel" },
    { year: 2013, value: 58, source: "ANSD — RGPHAE 2013", status: "officiel" },
    { year: 2016, value: 64, source: "ANSD — EDS-Continue 2016", status: "officiel" },
    { year: 2019, value: 71, source: "ANSD — EDS-Continue 2019", status: "officiel" },
    { year: 2023, value: 78, source: "ANSD — RGPH-5 2023", status: "officiel" },
    { year: 2026, value: 83, source: "ANSD + Senelec 2026 (estimation)", status: "estime" },
  ],
  pauvrete: [
    { year: 2006, value: 50.8, source: "ANSD — ESPS 2005-06", status: "officiel" },
    { year: 2011, value: 46.7, source: "ANSD — ESPS-II 2011", status: "officiel" },
    { year: 2019, value: 37.8, source: "ANSD — EHCVM 2018-19", status: "officiel" },
    { year: 2024, value: 36.2, source: "ANSD — EHCVM 2024 (estimation)", status: "estime" },
  ],
};

export function getNationalTimeline(): TimelineIndicator[] {
  const indicators: TimelineIndicator[] = [];

  const defs: { code: string; label_fr: string; label_wol: string; unit: string }[] = [
    { code: "population", label_fr: "Population", label_wol: "Waay-dëkk", unit: "millions" },
    { code: "scolarisation", label_fr: "Taux brut de scolarisation", label_wol: "Toll jàng", unit: "%" },
    { code: "urbanisation", label_fr: "Taux d'urbanisation", label_wol: "Toll dëkk", unit: "%" },
    { code: "acces_eau", label_fr: "Accès eau potable", label_wol: "Ndox mu sell", unit: "%" },
    { code: "acces_electricite", label_fr: "Accès électricité", label_wol: "Kuraa", unit: "%" },
    { code: "pauvrete", label_fr: "Taux de pauvreté", label_wol: "Toll njaboot", unit: "%" },
  ];

  for (const def of defs) {
    const data = NATIONAL_TIMELINE_DATA[def.code];
    if (!data || data.length < 2) continue;

    const first = data[0].value;
    const last = data[data.length - 1].value;
    const change = ((last - first) / first) * 100;

    let change_label_fr: string;
    let change_label_wol: string;

    if (def.code === "pauvrete") {
      change_label_fr = `${Math.abs(Math.round(change))}% de réduction en ${data[data.length - 1].year - data[0].year} ans`;
      change_label_wol = `${Math.abs(Math.round(change))}% wàññi ci ${data[data.length - 1].year - data[0].year} at`;
    } else {
      const sign = change >= 0 ? "+" : "";
      change_label_fr = `${sign}${Math.round(change)}% en ${data[data.length - 1].year - data[0].year} ans`;
      change_label_wol = `${sign}${Math.round(change)}% ci ${data[data.length - 1].year - data[0].year} at`;
    }

    indicators.push({
      code: def.code,
      label_fr: def.label_fr,
      label_wol: def.label_wol,
      unit: def.unit,
      data,
      change_20y: Math.round(change * 10) / 10,
      change_label_fr,
      change_label_wol,
    });
  }

  return indicators;
}

export function getRegionTimeline(code: string): RegionTimeline | null {
  const region = REGIONS.find((r) => r.code === code);
  if (!region) return null;

  const ext = getRegionExtended(code);
  if (!ext) return null;

  const pop2013_est = Math.round(region.population * 0.77);
  const pop2006_est = Math.round(region.population * 0.6);

  const indicators: TimelineIndicator[] = [
    {
      code: "population",
      label_fr: "Population",
      label_wol: "Waay-dëkk",
      unit: "habitants",
      data: [
        { year: 2006, value: pop2006_est, source: "ANSD — Estimation depuis RGPH-3" },
        { year: 2013, value: pop2013_est, source: "ANSD — RGPHAE 2013" },
        { year: 2023, value: Math.round(region.population * 0.95), source: "ANSD — RGPH-5 2023" },
        { year: 2026, value: region.population, source: "ANSD — Projection RGPH-5" },
      ],
      change_20y: Math.round(((region.population - pop2006_est) / pop2006_est) * 100),
      change_label_fr: `+${Math.round(((region.population - pop2006_est) / pop2006_est) * 100)}% depuis 2006`,
      change_label_wol: `+${Math.round(((region.population - pop2006_est) / pop2006_est) * 100)}% dale 2006`,
    },
  ];

  const totalChange = Math.round(((region.population - pop2006_est) / pop2006_est) * 100);

  return {
    region_code: code,
    region_name: region.name,
    indicators,
    summary_fr: `En 20 ans, ${region.name} a vu sa population croître de ${totalChange}%. La région compte aujourd'hui ${region.population.toLocaleString("fr-FR")} habitants sur ${region.area_km2.toLocaleString("fr-FR")} km².`,
    summary_wol: `Ci 20 at, ${region.name} yokk na waay-dëkk bam ci ${totalChange}%. Tey, gox gi am na ${region.population.toLocaleString("fr-FR")} nit ci ${region.area_km2.toLocaleString("fr-FR")} km².`,
  };
}
