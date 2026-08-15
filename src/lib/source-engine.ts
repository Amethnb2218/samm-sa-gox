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
    name: "Indicateurs éducatifs",
    publication: "ANSD — RGPH-5",
    year: 2023,
    type: "officiel",
    chapter: "Chapitre 4 : Éducation et alphabétisation",
    methodology: "Taux d'alphabétisation = population 15+ sachant lire et écrire / population 15+ totale",
  },
  rgph5_habitat: {
    id: "rgph5_habitat",
    name: "Habitat et cadre de vie",
    publication: "ANSD — RGPH-5",
    year: 2023,
    type: "officiel",
    chapter: "Chapitre 7 : Caractéristiques de l'habitat",
    methodology: "Accès eau = ménages avec source améliorée / total ménages. Accès électricité = ménages connectés / total ménages.",
  },
  carte_sanitaire: {
    id: "carte_sanitaire",
    name: "Carte sanitaire nationale",
    publication: "ANSD / Ministère de la Santé",
    year: 2023,
    type: "officiel",
    methodology: "Inventaire exhaustif des structures sanitaires par région et département",
  },
  carte_scolaire: {
    id: "carte_scolaire",
    name: "Carte scolaire nationale",
    publication: "ANSD / Ministère de l'Éducation",
    year: 2023,
    type: "officiel",
    methodology: "Inventaire des établissements d'enseignement par niveau et localisation",
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
