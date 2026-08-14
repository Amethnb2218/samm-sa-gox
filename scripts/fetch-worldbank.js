/**
 * Fetches key indicators from World Bank API for Senegal
 * and saves them as JSON for the app to consume.
 * Run: node scripts/fetch-worldbank.js
 */

const fs = require("fs");
const path = require("path");

const INDICATORS = [
  { code: "SP.POP.TOTL", name: "Population totale" },
  { code: "NY.GDP.MKTP.CD", name: "PIB (USD courants)" },
  { code: "NY.GDP.MKTP.KD.ZG", name: "Croissance PIB (%)" },
  { code: "FP.CPI.TOTL.ZG", name: "Inflation (%)" },
  { code: "SP.POP.GROW", name: "Croissance demographique (%)" },
  { code: "SP.DYN.LE00.IN", name: "Esperance de vie" },
  { code: "SE.ADT.LITR.ZS", name: "Alphabetisation adultes (%)" },
  { code: "SI.POV.NAHC", name: "Taux de pauvrete national (%)" },
  { code: "SP.URB.TOTL.IN.ZS", name: "Population urbaine (%)" },
  { code: "SP.DYN.TFRT.IN", name: "Fecondite (enfants/femme)" },
  { code: "SP.DYN.IMRT.IN", name: "Mortalite infantile (pour 1000)" },
  { code: "SL.UEM.TOTL.ZS", name: "Chomage (%)" },
  { code: "SE.PRM.ENRR", name: "Taux brut scolarisation primaire (%)" },
  { code: "SH.MED.BEDS.ZS", name: "Lits hopitaux (pour 1000)" },
  { code: "EG.ELC.ACCS.ZS", name: "Acces electricite (%)" },
  { code: "SH.H2O.BASW.ZS", name: "Acces eau potable (%)" },
];

const BASE_URL = "https://api.worldbank.org/v2/country/SEN/indicator";

async function fetchIndicator(code) {
  const url = `${BASE_URL}/${code}?format=json&per_page=60&date=1990:2025`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json[1]) return null;
    return json[1]
      .filter((d) => d.value !== null)
      .map((d) => ({
        year: parseInt(d.date),
        value: d.value,
      }));
  } catch {
    return null;
  }
}

async function main() {
  console.log("Fetching World Bank data for Senegal...");
  const results = {};

  for (const ind of INDICATORS) {
    process.stdout.write(`  ${ind.code}...`);
    const data = await fetchIndicator(ind.code);
    if (data && data.length > 0) {
      results[ind.code] = {
        name: ind.name,
        data: data.sort((a, b) => a.year - b.year),
      };
      console.log(` ${data.length} points`);
    } else {
      console.log(" SKIP");
    }
  }

  const outPath = path.join(__dirname, "..", "public", "data", "worldbank-sen.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved to ${outPath}`);
  console.log(`${Object.keys(results).length} indicators fetched.`);
}

main();
