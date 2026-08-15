import { REGIONS } from "./data";
import { getRegionExtended } from "./norms";

export interface Scenario {
  id: string;
  label_fr: string;
  label_wol: string;
  variable: string;
  change_pct: number;
  impacts: ScenarioImpact[];
}

export interface ScenarioImpact {
  indicator_fr: string;
  indicator_wol: string;
  before: number;
  after: number;
  change_pct: number;
  unit: string;
  methodology: string;
}

export interface WhatIfResult {
  scenario: Scenario;
  summary_fr: string;
  summary_wol: string;
  feasibility_fr: string;
}

export function computeWhatIf(code: string, scenarioId: string): WhatIfResult | null {
  const region = REGIONS.find((r) => r.code === code);
  const ext = getRegionExtended(code);
  if (!region || !ext) return null;

  const pop = region.population;
  const density = pop / region.area_km2;

  switch (scenarioId) {
    case "pop_plus_10": {
      const newPop = Math.round(pop * 1.1);
      const newDensity = newPop / region.area_km2;
      const currentHealthRatio = ext.health_centers / (pop / 10000);
      const newHealthRatio = ext.health_centers / (newPop / 10000);
      const currentSchoolRatio = ext.schools / (pop / 5000);
      const newSchoolRatio = ext.schools / (newPop / 5000);

      return {
        scenario: {
          id: "pop_plus_10",
          label_fr: "Population +10%",
          label_wol: "Waay-dëkk +10%",
          variable: "population",
          change_pct: 10,
          impacts: [
            {
              indicator_fr: "Densité",
              indicator_wol: "Nijaay nit",
              before: Math.round(density),
              after: Math.round(newDensity),
              change_pct: 10,
              unit: "hab/km²",
              methodology: "Population projetée / superficie constante",
            },
            {
              indicator_fr: "Couverture sanitaire",
              indicator_wol: "Wergu yaram",
              before: Math.round(currentHealthRatio * 100) / 100,
              after: Math.round(newHealthRatio * 100) / 100,
              change_pct: Math.round(((newHealthRatio - currentHealthRatio) / currentHealthRatio) * 100),
              unit: "postes/10k hab",
              methodology: "Infrastructures constantes / population augmentée de 10%",
            },
            {
              indicator_fr: "Couverture scolaire",
              indicator_wol: "Toll daara",
              before: Math.round(currentSchoolRatio * 100) / 100,
              after: Math.round(newSchoolRatio * 100) / 100,
              change_pct: Math.round(((newSchoolRatio - currentSchoolRatio) / currentSchoolRatio) * 100),
              unit: "étab./5k hab",
              methodology: "Infrastructures constantes / population augmentée de 10%",
            },
          ],
        },
        summary_fr: `Si la population de ${region.name} augmente de 10% (${pop.toLocaleString("fr-FR")} → ${newPop.toLocaleString("fr-FR")}), la pression sur les infrastructures sanitaires et éducatives s'accentue : la couverture sanitaire passe de ${currentHealthRatio.toFixed(2)} à ${newHealthRatio.toFixed(2)} postes/10k hab.`,
        summary_wol: `Su waay-dëkk ${region.name} yokk na 10%, wergu yaram bi ak jàng bi dina am jafe-jafe bu gëna am doole.`,
        feasibility_fr: "Scénario réaliste sur un horizon de 5-8 ans au rythme de croissance actuel (2.3%/an).",
      };
    }

    case "invest_sante": {
      const currentRatio = ext.health_centers / (pop / 10000);
      const newCenters = ext.health_centers + 5;
      const newRatio = newCenters / (pop / 10000);
      const costEstimate = 5 * 150;

      return {
        scenario: {
          id: "invest_sante",
          label_fr: "+5 postes de santé",
          label_wol: "+5 postu wergu yaram",
          variable: "health_centers",
          change_pct: Math.round((5 / ext.health_centers) * 100),
          impacts: [
            {
              indicator_fr: "Couverture sanitaire",
              indicator_wol: "Wergu yaram",
              before: Math.round(currentRatio * 100) / 100,
              after: Math.round(newRatio * 100) / 100,
              change_pct: Math.round(((newRatio - currentRatio) / currentRatio) * 100),
              unit: "postes/10k hab",
              methodology: "Ajout de 5 postes de santé au parc existant",
            },
          ],
        },
        summary_fr: `L'ajout de 5 postes de santé à ${region.name} améliorerait la couverture de ${currentRatio.toFixed(2)} à ${newRatio.toFixed(2)} postes/10k hab. Coût estimé : ${costEstimate} millions FCFA (construction + équipement).`,
        summary_wol: `Su ñu tànn 5 postu wergu yaram ci ${region.name}, couverture bi dina yokk dale ${currentRatio.toFixed(2)} ba ${newRatio.toFixed(2)}. Njëg : ${costEstimate} miliyoŋ FCFA.`,
        feasibility_fr: `Coût estimé : ${costEstimate} millions FCFA. Sources de financement possibles : budget communal, PUDC, partenaires au développement.`,
      };
    }

    case "invest_education": {
      const currentRatio = ext.schools / (pop / 5000);
      const newSchools = ext.schools + 10;
      const newRatio = newSchools / (pop / 5000);
      const costEstimate = 10 * 200;

      return {
        scenario: {
          id: "invest_education",
          label_fr: "+10 établissements scolaires",
          label_wol: "+10 daara",
          variable: "schools",
          change_pct: Math.round((10 / ext.schools) * 100),
          impacts: [
            {
              indicator_fr: "Couverture scolaire",
              indicator_wol: "Toll daara",
              before: Math.round(currentRatio * 100) / 100,
              after: Math.round(newRatio * 100) / 100,
              change_pct: Math.round(((newRatio - currentRatio) / currentRatio) * 100),
              unit: "étab./5k hab",
              methodology: "Ajout de 10 établissements au parc existant",
            },
          ],
        },
        summary_fr: `L'ajout de 10 établissements scolaires améliorerait la couverture éducative de ${currentRatio.toFixed(2)} à ${newRatio.toFixed(2)} étab./5k hab. Coût estimé : ${costEstimate} millions FCFA.`,
        summary_wol: `Su ñu tànn 10 daara ci ${region.name}, jàng bi dina yokk. Njëg : ${costEstimate} miliyoŋ FCFA.`,
        feasibility_fr: `Coût estimé : ${costEstimate} millions FCFA. Horizon : 3-5 ans. Aligné avec le Programme d'Amélioration de la Qualité de l'Éducation (PAQE).`,
      };
    }

    default:
      return null;
  }
}

export function getAvailableScenarios(): { id: string; label_fr: string; label_wol: string }[] {
  return [
    { id: "pop_plus_10", label_fr: "Et si la population augmente de 10% ?", label_wol: "Su waay-dëkk bi yokk 10% ?" },
    { id: "invest_sante", label_fr: "Et si on ajoute 5 postes de santé ?", label_wol: "Su ñu tànn 5 postu wergu yaram ?" },
    { id: "invest_education", label_fr: "Et si on construit 10 écoles ?", label_wol: "Su ñu tabax 10 daara ?" },
  ];
}
