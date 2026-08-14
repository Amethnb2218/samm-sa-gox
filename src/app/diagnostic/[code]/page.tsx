"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import DiagnosticPanel from "@/components/DiagnosticPanel";
import ComparisonChart from "@/components/ComparisonChart";
import { buildDiagnostic, getRegionByCode, REGIONS } from "@/lib/data";
import { Lang } from "@/lib/wolof";
import Link from "next/link";

export default function DiagnosticPage() {
  const params = useParams();
  const code = params.code as string;
  const [lang, setLang] = useState<Lang>("fr");

  const diagnostic = buildDiagnostic(code);
  const region = getRegionByCode(code);

  if (!diagnostic) {
    return (
      <div className="flex flex-col h-full">
        <Header lang={lang} onLangChange={setLang} />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          <p className="text-sm text-[var(--color-text-muted)]">
            Territoire non trouve. Code : {code}
          </p>
          <Link href="/" className="text-sm text-[var(--color-terracotta)] mt-4 inline-block">
            Retour a l'accueil
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Link
          href="/"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-[var(--font-mono)] flex items-center gap-1 mb-4"
        >
          <span>&larr;</span>
          {lang === "wol" ? "Dellu ci jeego bi" : "Retour a l'accueil"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <DiagnosticPanel diagnostic={diagnostic} lang={lang} />

            {region && (
              <div className="mt-4 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                <div className="px-4 py-3 border-b border-[var(--color-border)]">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
                    {lang === "wol" ? "Departemaa yi ci biir" : "Departements de la region"}
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-[var(--font-mono)]">
                      <th className="text-left px-4 py-2">Nom</th>
                      <th className="text-right px-4 py-2">Population</th>
                      <th className="text-right px-4 py-2">Densite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {region.departments.map((d) => (
                      <tr key={d.code} className="border-b border-[var(--color-border)] last:border-b-0">
                        <td className="px-4 py-2 font-medium">
                          <Link href={`/diagnostic/${d.code}`} className="hover:text-[var(--color-terracotta)]">
                            {d.name}
                          </Link>
                        </td>
                        <td className="text-right px-4 py-2 data-mono">{d.population.toLocaleString("fr-FR")}</td>
                        <td className="text-right px-4 py-2 data-mono">{Math.round(d.population / d.area_km2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <ComparisonChart selectedCode={code} lang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}
