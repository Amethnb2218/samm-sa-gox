export const WOLOF_GLOSSARY: Record<string, { fr: string; wol: string }> = {
  population: { fr: "Population", wol: "Waay-dëkk" },
  region: { fr: "Region", wol: "Gox gu mag" },
  department: { fr: "Departement", wol: "Departemaa" },
  commune: { fr: "Commune", wol: "Komiin" },
  density: { fr: "Densite", wol: "Nijaay nit ci kaadam" },
  growth: { fr: "Croissance", wol: "Yokk" },
  health: { fr: "Sante", wol: "Wergu yaram" },
  education: { fr: "Education", wol: "Jang" },
  economy: { fr: "Economie", wol: "Koom-koom" },
  poverty: { fr: "Pauvrete", wol: "Njaboot" },
  employment: { fr: "Emploi", wol: "Liggey" },
  agriculture: { fr: "Agriculture", wol: "Tawwu suuf" },
  water: { fr: "Eau", wol: "Ndox" },
  electricity: { fr: "Electricite", wol: "Kuraa" },
  school: { fr: "Ecole", wol: "Daara" },
  hospital: { fr: "Hopital", wol: "Opitaal" },
  market: { fr: "Marche", wol: "Marse" },
  road: { fr: "Route", wol: "Yoon" },
  birth_rate: { fr: "Taux de natalite", wol: "Toll wu juddu" },
  death_rate: { fr: "Taux de mortalite", wol: "Toll wu dee" },
  literacy: { fr: "Alphabetisation", wol: "Xam bind" },
  infant_mortality: { fr: "Mortalite infantile", wol: "Dee gu ndaw yi" },
  life_expectancy: { fr: "Esperance de vie", wol: "Lu nit miin a dund" },
  gdp: { fr: "PIB", wol: "Alalu reew mi" },
  inflation: { fr: "Inflation", wol: "Yokku njeg" },
  fertility: { fr: "Fecondite", wol: "Sago" },
  households: { fr: "Menages", wol: "Negu keur yi" },
  urbanization: { fr: "Urbanisation", wol: "Dund ci dund-dëkk" },
  rainfall: { fr: "Pluviometrie", wol: "Taw" },
  indicator: { fr: "Indicateur", wol: "Nataal xam-xam" },
  average: { fr: "Moyenne", wol: "Diggante" },
  total: { fr: "Total", wol: "Tolof-tolof" },
  male: { fr: "Homme", wol: "Goor" },
  female: { fr: "Femme", wol: "Jigeen" },
  youth: { fr: "Jeunes", wol: "Ndaw yi" },
  elderly: { fr: "Personnes agees", wol: "Mag yi" },
  rural: { fr: "Rural", wol: "Diwaan wi" },
  urban: { fr: "Urbain", wol: "Dund-dëkk" },
  senegal: { fr: "Senegal", wol: "Senegaal" },
  diagnostic: { fr: "Diagnostic territorial", wol: "Seetu gox gi" },
  compared_to: { fr: "Par rapport a", wol: "Su nettali ak" },
  above_average: { fr: "Au-dessus de la moyenne", wol: "Ci kaw diggante bi" },
  below_average: { fr: "En-dessous de la moyenne", wol: "Ci suuf diggante bi" },
};

export type Lang = "fr" | "wol";

export function t(key: string, lang: Lang): string {
  const entry = WOLOF_GLOSSARY[key];
  if (!entry) return key;
  return lang === "wol" ? entry.wol : entry.fr;
}

export function generateNarrative(
  name: string,
  population: number,
  region: string,
  indicators: {
    density?: number;
    literacy?: number;
    healthCenters?: number;
    schools?: number;
    nationalAvgDensity?: number;
  },
  lang: Lang
): string {
  if (lang === "wol") {
    let text = `${name} am na ${population.toLocaleString("fr-FR")} nit ci biir gox gu mag gi ${region}.`;
    if (indicators.density && indicators.nationalAvgDensity) {
      if (indicators.density > indicators.nationalAvgDensity) {
        text += ` Nijaay nit ci kaadam bi (${Math.round(indicators.density)} nit/km²) moo gën diggante bi reew mi (${Math.round(indicators.nationalAvgDensity)} nit/km²).`;
      } else {
        text += ` Nijaay nit ci kaadam bi (${Math.round(indicators.density)} nit/km²) nekk na ci suuf diggante bi reew mi (${Math.round(indicators.nationalAvgDensity)} nit/km²).`;
      }
    }
    if (indicators.healthCenters !== undefined) {
      text += ` Am na ${indicators.healthCenters} postu wergu yaram.`;
    }
    if (indicators.schools !== undefined) {
      text += ` Am na ${indicators.schools} daara.`;
    }
    return text;
  }

  let text = `${name} compte ${population.toLocaleString("fr-FR")} habitants dans la région de ${region}.`;
  if (indicators.density && indicators.nationalAvgDensity) {
    if (indicators.density > indicators.nationalAvgDensity) {
      text += ` Sa densité (${Math.round(indicators.density)} hab/km²) est supérieure à la moyenne nationale (${Math.round(indicators.nationalAvgDensity)} hab/km²).`;
    } else {
      text += ` Sa densité (${Math.round(indicators.density)} hab/km²) est inférieure à la moyenne nationale (${Math.round(indicators.nationalAvgDensity)} hab/km²).`;
    }
  }
  if (indicators.healthCenters !== undefined) {
    text += ` La commune dispose de ${indicators.healthCenters} poste(s) de santé.`;
  }
  if (indicators.schools !== undefined) {
    text += ` Elle compte ${indicators.schools} établissement(s) scolaire(s).`;
  }
  return text;
}
