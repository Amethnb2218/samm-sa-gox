import { ConfidenceLevel } from "./confidence";

export interface SourceReference {
  id: string;
  name: string;
  publication: string;
  year: number;
  type: ConfidenceLevel;
  chapter?: string;
  url?: string;
  methodology: string;
}

export const SOURCES: Record<string, SourceReference> = {
  rgph5_pop: {
    id: "rgph5_pop",
    name: "Population par région et département",
    publication: "ANSD — RGPH-5 (5e Recensement Général de la Population et de l'Habitat)",
    year: 2023,
    type: "officiel",
    chapter: "Chapitre 2 : Répartition spatiale de la population",
    methodology: "Dénombrement exhaustif de la population résidente par unité administrative",
  },
  rgph5_education: {
    id: "rgph5_education",
    name: "Alphabétisation par région",
    publication: "ANSD — RGPH-5, Chapitre 2 : Éducation",
    year: 2023,
    type: "officiel",
    chapter: "Tableau II-5 : Taux d'alphabétisation 10+ par région",
    methodology: "Population 10+ alphabétisée (français, arabe ou langue nationale) / population 10+ totale × 100",
  },
  rgph5_habitat: {
    id: "rgph5_habitat",
    name: "Accès eau et électricité par région",
    publication: "ANSD — RGPH-5, Chapitre 8 : Habitat",
    year: 2023,
    type: "calcule",
    chapter: "Tableau VIII-10 (électricité+solaire), Tableau VIII-12 (eau améliorée)",
    methodology: "Électricité = col. Électricité + col. Solaire (Tab. VIII-10). Eau = somme 6 sources améliorées (Tab. VIII-12).",
  },
  carte_sanitaire: {
    id: "carte_sanitaire",
    name: "Infrastructures sanitaires (estimation)",
    publication: "ANSD / Ministère de la Santé — estimations",
    year: 2023,
    type: "estime",
    methodology: "Estimation du nombre de postes de santé et médecins par région. Non vérifié dans RGPH-5.",
  },
  carte_scolaire: {
    id: "carte_scolaire",
    name: "Infrastructures scolaires (estimation)",
    publication: "ANSD / Ministère de l'Éducation — estimations",
    year: 2023,
    type: "estime",
    methodology: "Estimation du nombre d'établissements scolaires par région. Non vérifié dans RGPH-5.",
  },
  comptes_regionaux: {
    id: "comptes_regionaux",
    name: "Comptes régionaux du Sénégal",
    publication: "ANSD — Comptes Nationaux",
    year: 2023,
    type: "officiel",
    chapter: "PIB par région",
    methodology: "Valeur ajoutée par région selon les branches d'activité (méthodologie SCN 2008)",
  },
  projection_rgph5: {
    id: "projection_rgph5",
    name: "Projections démographiques",
    publication: "ANSD — Projections issues du RGPH-5",
    year: 2026,
    type: "calcule",
    methodology: "Projection par composante (fécondité, mortalité, migration) à partir de la base RGPH-5 2023",
  },
  oms_normes: {
    id: "oms_normes",
    name: "Normes de couverture sanitaire",
    publication: "OMS — Health Workforce Requirements",
    year: 2023,
    type: "officiel",
    methodology: "Seuil minimum recommandé de personnels et structures de santé par population",
  },
  odd_2030: {
    id: "odd_2030",
    name: "Objectifs de Développement Durable",
    publication: "Nations Unies — Agenda 2030",
    year: 2015,
    type: "officiel",
    methodology: "Cibles quantifiées par domaine (eau, énergie, éducation, santé)",
  },
};

export function getSourcesForRegion(code: string): SourceReference[] {
  return [
    SOURCES.rgph5_pop,
    SOURCES.rgph5_education,
    SOURCES.rgph5_habitat,
    SOURCES.carte_sanitaire,
    SOURCES.carte_scolaire,
    SOURCES.projection_rgph5,
    SOURCES.oms_normes,
    SOURCES.odd_2030,
  ];
}

export function getSourceById(id: string): SourceReference | null {
  return SOURCES[id] || null;
}
