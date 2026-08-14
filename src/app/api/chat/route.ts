import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { REGIONS } from "@/lib/data";
import { REGION_EXTENDED } from "@/lib/norms";
import { computeAllIDT } from "@/lib/idt";

const SYSTEM_PROMPT = `Tu es l'assistant de Samm Sa Gox, une plateforme d'intelligence territoriale du Senegal. Tu reponds aux questions sur les statistiques des 14 regions du Senegal en te basant UNIQUEMENT sur les donnees ci-dessous. Reponds de maniere concise, factuelle, avec des chiffres precis. Si on te parle en wolof, reponds en wolof. Si en francais, reponds en francais.

DONNEES REGIONALES DU SENEGAL (2026) :
${REGIONS.map((r) => {
  const ext = REGION_EXTENDED.find((e) => e.code === r.code);
  const density = Math.round(r.population / r.area_km2);
  return `${r.name}: pop=${r.population.toLocaleString("fr-FR")}, superficie=${r.area_km2}km2, densite=${density}hab/km2, postes_sante=${ext?.health_centers || "?"}, ecoles=${ext?.schools || "?"}, medecins=${ext?.doctors || "?"}, alphabetisation=${ext?.literacy_rate || "?"}%, electricite=${ext?.electricity_rate || "?"}%, eau_potable=${ext?.water_rate || "?"}%, pauvrete=${ext?.poverty_rate || "?"}%`;
}).join("\n")}

IDT (Indice de Developpement Territorial, score /100) :
${computeAllIDT().map((r) => `${r.rank}. ${r.name}: ${(r.score * 100).toFixed(0)}/100`).join(", ")}

Population totale Senegal 2026: ~19.4 millions
Croissance PIB 2025: 6.68% (Banque Mondiale)
Inflation 2025: 1.46%
Mortalite infantile: 28.9 pour 1000 (2024)
Acces electricite: 82.9% (2024)
Norme OMS postes sante: 1 pour 10 000 habitants
Norme UNESCO ecoles: 1 pour 5 000 habitants

REGLES :
- Reponds en 2-4 phrases maximum
- Toujours citer les chiffres exacts
- Si la question porte sur une comparaison, donne les chiffres des deux territoires
- Si tu ne connais pas la reponse, dis-le clairement
- Ne fabrique JAMAIS de donnees`;

export async function POST(req: NextRequest) {
  try {
    const { question, lang } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY non configuree" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
      temperature: 0.1,
      max_tokens: 300,
    });

    const answer = completion.choices[0]?.message?.content || "Pas de reponse.";

    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Erreur API" }, { status: 500 });
  }
}
