export type ConfidenceLevel = "officiel" | "calcule" | "estime" | "indisponible";

export interface DataSource {
  value: number | null;
  confidence: ConfidenceLevel;
  source: string;
  publication: string;
  year: number;
  methodology?: string;
  limits?: string;
}

export interface MethodologyCard {
  indicator: string;
  definition: string;
  formula?: string;
  unit: string;
  source: string;
  year: number;
  granularity: string;
  type: ConfidenceLevel;
  limits: string;
}

export const CONFIDENCE_LABELS: Record<ConfidenceLevel, { fr: string; wol: string; color: string }> = {
  officiel: { fr: "Donnée officielle ANSD", wol: "Xibaar bu yem bu ANSD", color: "#2D5F2D" },
  calcule: { fr: "Calcul dérivé", wol: "Xisaabu jëfe", color: "#1B4F8A" },
  estime: { fr: "Estimation", wol: "Wànn", color: "#B7472A" },
  indisponible: { fr: "Donnée indisponible", wol: "Xibaar amul", color: "#999999" },
};

export function getConfidenceBadge(level: ConfidenceLevel): string {
  switch (level) {
    case "officiel": return "OFFICIEL";
    case "calcule": return "CALCULE";
    case "estime": return "ESTIME";
    case "indisponible": return "N/D";
  }
}
