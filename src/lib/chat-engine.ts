import { REGIONS, getAllDepartments, NATIONAL_INDICATORS } from "./data";
import { REGION_EXTENDED } from "./norms";
import { computeAllIDT } from "./idt";
import { Lang } from "./wolof";

export interface ChatResponse {
  answer_fr: string;
  answer_wol: string;
  data?: { label: string; value: number }[];
  type: "text" | "number" | "comparison" | "ranking";
}

interface Pattern {
  regex: RegExp;
  handler: (matches: RegExpMatchArray) => ChatResponse;
}

function findRegion(name: string) {
  const q = name.toLowerCase().trim();
  return REGIONS.find((r) => r.name.toLowerCase().includes(q));
}

function findDept(name: string) {
  const q = name.toLowerCase().trim();
  return getAllDepartments().find((d) => d.name.toLowerCase().includes(q));
}

const PATTERNS: Pattern[] = [
  {
    regex: /(?:population|combien d['']?habitants?|waay.?d[eë]kk).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      if (!r) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      return {
        answer_fr: `La region de ${r.name} compte ${r.population.toLocaleString("fr-FR")} habitants (estimation 2026).`,
        answer_wol: `Gox gu mag gi ${r.name} am na ${r.population.toLocaleString("fr-FR")} nit (2026).`,
        type: "number",
        data: [{ label: r.name, value: r.population }],
      };
    },
  },
  {
    regex: /(?:densite|nijaay).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      if (!r) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      const d = Math.round(r.population / r.area_km2);
      return {
        answer_fr: `La densite de ${r.name} est de ${d} hab/km2 (population ${r.population.toLocaleString("fr-FR")}, superficie ${r.area_km2.toLocaleString("fr-FR")} km2).`,
        answer_wol: `Nijaay nit ci ${r.name} mooy ${d} nit/km2.`,
        type: "number",
        data: [{ label: r.name, value: d }],
      };
    },
  },
  {
    regex: /(?:poste|centre|hopital|sante|wergu yaram).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      const ext = REGION_EXTENDED.find((x) => x.code === r?.code);
      if (!r || !ext) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      const ratio = ((ext.health_centers / r.population) * 10000).toFixed(2);
      return {
        answer_fr: `${r.name} dispose de ${ext.health_centers} postes de sante pour ${r.population.toLocaleString("fr-FR")} habitants, soit ${ratio} pour 10 000 hab. (norme OMS : 1.0).`,
        answer_wol: `${r.name} am na ${ext.health_centers} postu wergu yaram ci ${r.population.toLocaleString("fr-FR")} nit — ${ratio} ci 10 000 nit (norme OMS : 1.0).`,
        type: "number",
        data: [{ label: "Actuel", value: parseFloat(ratio) }, { label: "Norme OMS", value: 1.0 }],
      };
    },
  },
  {
    regex: /(?:ecole|daara|scol).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      const ext = REGION_EXTENDED.find((x) => x.code === r?.code);
      if (!r || !ext) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      return {
        answer_fr: `${r.name} compte ${ext.schools} ecoles primaires pour ${r.population.toLocaleString("fr-FR")} habitants.`,
        answer_wol: `${r.name} am na ${ext.schools} daara ci ${r.population.toLocaleString("fr-FR")} nit.`,
        type: "number",
        data: [{ label: r.name, value: ext.schools }],
      };
    },
  },
  {
    regex: /(?:plus|region).{0,10}(?:peuple|dense|populeu)/i,
    handler: () => {
      const sorted = [...REGIONS].sort((a, b) => (b.population / b.area_km2) - (a.population / a.area_km2));
      const top = sorted[0];
      return {
        answer_fr: `La region la plus dense est ${top.name} avec ${Math.round(top.population / top.area_km2)} hab/km2.`,
        answer_wol: `Gox gi gën a nëbb mooy ${top.name} ak ${Math.round(top.population / top.area_km2)} nit/km2.`,
        type: "ranking",
        data: sorted.slice(0, 5).map((r) => ({ label: r.name, value: Math.round(r.population / r.area_km2) })),
      };
    },
  },
  {
    regex: /(?:plus|region).{0,10}(?:pauvre|defavorise|njaboot)/i,
    handler: () => {
      const sorted = [...REGION_EXTENDED].sort((a, b) => b.poverty_rate - a.poverty_rate);
      const top = sorted[0];
      const region = REGIONS.find((r) => r.code === top.code);
      return {
        answer_fr: `La region la plus pauvre est ${region?.name} avec un taux de pauvrete de ${top.poverty_rate}%.`,
        answer_wol: `Gox gi gën a seqet mooy ${region?.name} ak ${top.poverty_rate}% njaboot.`,
        type: "ranking",
        data: sorted.slice(0, 5).map((r) => ({ label: REGIONS.find((reg) => reg.code === r.code)?.name || "", value: r.poverty_rate })),
      };
    },
  },
  {
    regex: /(?:classement|rang|idt|indice|yokkute)/i,
    handler: () => {
      const idt = computeAllIDT();
      return {
        answer_fr: `Classement IDT : 1. ${idt[0].name} (${(idt[0].score * 100).toFixed(0)}), 2. ${idt[1].name} (${(idt[1].score * 100).toFixed(0)}), 3. ${idt[2].name} (${(idt[2].score * 100).toFixed(0)}). Derniere : ${idt[13].name} (${(idt[13].score * 100).toFixed(0)}).`,
        answer_wol: `Classement IDT : 1. ${idt[0].name} (${(idt[0].score * 100).toFixed(0)}), 2. ${idt[1].name} (${(idt[1].score * 100).toFixed(0)}), 3. ${idt[2].name} (${(idt[2].score * 100).toFixed(0)}). Mujj : ${idt[13].name} (${(idt[13].score * 100).toFixed(0)}).`,
        type: "ranking",
        data: idt.slice(0, 5).map((r) => ({ label: r.name, value: Math.round(r.score * 100) })),
      };
    },
  },
  {
    regex: /(?:population|nit).{0,5}(?:senegal|senegaal|total|nationale)/i,
    handler: () => {
      const total = REGIONS.reduce((s, r) => s + r.population, 0);
      return {
        answer_fr: `La population du Senegal est estimee a ${total.toLocaleString("fr-FR")} habitants en 2026.`,
        answer_wol: `Senegaal am na ${total.toLocaleString("fr-FR")} nit ci 2026.`,
        type: "number",
        data: [{ label: "Senegal 2026", value: total }],
      };
    },
  },
  {
    regex: /(?:eau|ndox).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      const ext = REGION_EXTENDED.find((x) => x.code === r?.code);
      if (!r || !ext) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      return {
        answer_fr: `L'acces a l'eau potable dans la region de ${r.name} est de ${ext.water_rate}%.`,
        answer_wol: `Toll ndox mu sell ci ${r.name} mooy ${ext.water_rate}%.`,
        type: "number",
        data: [{ label: r.name, value: ext.water_rate }, { label: "Objectif ODD", value: 100 }],
      };
    },
  },
  {
    regex: /(?:electricite|kuraa|courant).{0,20}(dakar|thies|thi[eè]s|diourbel|fatick|kaffrine|kaolack|kedougou|k[eé]dougou|kolda|louga|matam|saint.?louis|sedhiou|s[eé]dhiou|tambacounda|ziguinchor)/i,
    handler: (m) => {
      const r = findRegion(m[1]);
      const ext = REGION_EXTENDED.find((x) => x.code === r?.code);
      if (!r || !ext) return { answer_fr: "Region non trouvee.", answer_wol: "Gox gi amul.", type: "text" };
      return {
        answer_fr: `Le taux d'acces a l'electricite dans la region de ${r.name} est de ${ext.electricity_rate}%.`,
        answer_wol: `Toll kuraa ci ${r.name} mooy ${ext.electricity_rate}%.`,
        type: "number",
        data: [{ label: r.name, value: ext.electricity_rate }, { label: "Objectif ODD", value: 100 }],
      };
    },
  },
];

export function processQuery(query: string): ChatResponse {
  const q = query.toLowerCase().trim();

  for (const pattern of PATTERNS) {
    const match = q.match(pattern.regex);
    if (match) {
      return pattern.handler(match);
    }
  }

  return {
    answer_fr: "Je n'ai pas compris la question. Essayez : \"population Dakar\", \"postes de sante Kedougou\", \"region la plus pauvre\", \"classement IDT\".",
    answer_wol: "Degguma laaj bi. Jeemal : \"waay-dekk Dakar\", \"postu wergu yaram Kedougou\", \"gox gi gën a seqet\", \"classement IDT\".",
    type: "text",
  };
}
