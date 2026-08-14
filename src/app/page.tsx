"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RegionMap from "@/components/RegionMap";
import DiagnosticPanel from "@/components/DiagnosticPanel";
import NationalOverview from "@/components/NationalOverview";
import ComparisonChart from "@/components/ComparisonChart";
import ChatData from "@/components/ChatData";
import { buildDiagnostic } from "@/lib/data";
import { Lang } from "@/lib/wolof";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const diagnostic = selectedCode ? buildDiagnostic(selectedCode) : null;

  return (
    <div className="flex flex-col h-full">
      <Header lang={lang} onLangChange={setLang} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <SearchBar lang={lang} onSelect={setSelectedCode} />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left column */}
          <div className="lg:col-span-5 space-y-4">
            <RegionMap selectedCode={selectedCode} onSelect={setSelectedCode} />
            <ComparisonChart selectedCode={selectedCode} lang={lang} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-7">
            {diagnostic ? (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedCode(null)}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-[var(--font-mono)] flex items-center gap-1"
                >
                  <span>&larr;</span>
                  {lang === "wol" ? "Dellu ci toll bi" : "Retour vue nationale"}
                </button>
                <DiagnosticPanel diagnostic={diagnostic} lang={lang} />
              </div>
            ) : (
              <NationalOverview lang={lang} onSelectRegion={setSelectedCode} />
            )}
          </div>
        </div>

        {/* Chat-to-Data */}
        <div className="mt-6">
          <ChatData lang={lang} />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)]">
            <span>
              {lang === "wol"
                ? "Jerinju yi : ANSD, Banque Mondiale, geoBoundaries"
                : "Sources : ANSD, Banque Mondiale, geoBoundaries"}
            </span>
            <span>Challenge 20 ans ANSD — 2026</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
