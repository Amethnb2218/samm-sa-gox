"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RegionMap from "@/components/RegionMap";
import DataProof from "@/components/DataProof";
import { buildTerritoryIntelligence } from "@/lib/territory-engine";
import { computeWhatIf } from "@/lib/scenario-engine";
import { getNationalTimeline } from "@/lib/timeline-engine";
import { Lang } from "@/lib/wolof";
import GuidedQuestions from "@/components/GuidedQuestions";
import PDCGenerator from "@/components/PDCGenerator";

type Tab = "observer" | "comparer" | "expliquer" | "agir" | "timeline";

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("observer");
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const intel = selectedCode ? buildTerritoryIntelligence(selectedCode) : null;
  const scenarioResult = intel && activeScenario ? computeWhatIf(selectedCode!, activeScenario) : null;
  const nationalTimeline = getNationalTimeline();

  const tabs: { key: Tab; fr: string; wol: string }[] = [
    { key: "observer", fr: "Observer", wol: "Xool" },
    { key: "comparer", fr: "Comparer", wol: "Semm" },
    { key: "expliquer", fr: "Expliquer", wol: "Teral" },
    { key: "agir", fr: "Agir", wol: "Jef" },
    { key: "timeline", fr: "20 ans", wol: "20 at" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <Header lang={lang} onLangChange={setLang} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <SearchBar lang={lang} onSelect={(code) => { setSelectedCode(code); setActiveTab("observer"); }} />
          {intel && (
            <button
              onClick={() => { setSelectedCode(null); setActiveScenario(null); }}
              className="btn-secondary"
              style={{ padding: "8px 14px", fontSize: "11px" }}
            >
              {lang === "wol" ? "Dellu" : "Vue nationale"}
            </button>
          )}
        </div>

        {/* Layout grid */}
        <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "20px" }}>
          {/* Left sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <RegionMap selectedCode={selectedCode} onSelect={(code) => { setSelectedCode(code); setActiveTab("observer"); }} lang={lang} />
            {intel && <GuidedQuestions lang={lang} onSelect={(action) => setActiveTab(action as Tab)} />}
          </div>

          {/* Main content */}
          <div>
            {!intel ? (
              <div>
                {/* Demo suggestion */}
                <div style={{ marginBottom: "16px", padding: "14px 20px", backgroundColor: "var(--color-terracotta-bg)", border: "1px solid rgba(168,66,42,0.15)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text)" }}>
                      {lang === "wol" ? "Jëm ci Kaffrine ngir xool demo bi" : "Essayez avec Kaffrine pour une démonstration complète"}
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                      {lang === "wol" ? "Gox gi am na jafe-jafe yu bari te am na doole" : "Région contrastée : électricité 57%, eau 97%, pauvreté 62%"}
                    </p>
                  </div>
                  <button
                    onClick={() => { setSelectedCode("KF"); setActiveTab("observer"); }}
                    className="btn-primary"
                    style={{ padding: "8px 16px", fontSize: "11px", whiteSpace: "nowrap" }}
                  >
                    Kaffrine →
                  </button>
                </div>
                <NationalView lang={lang} nationalTimeline={nationalTimeline} />
              </div>
            ) : (
              <div className="fade-in">
                {/* Tab navigation */}
                <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--color-border)", marginBottom: "20px" }}>
                  {tabs.map((t, i) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      style={{
                        padding: "12px 20px",
                        fontSize: "12px",
                        fontWeight: activeTab === t.key ? 600 : 400,
                        color: activeTab === t.key ? "var(--color-terracotta)" : "var(--color-text-muted)",
                        borderBottom: activeTab === t.key ? "2px solid var(--color-terracotta)" : "2px solid transparent",
                        background: "none",
                        border: "none",
                        borderBottomWidth: "2px",
                        borderBottomStyle: "solid",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span className="data-mono" style={{ fontSize: "10px", marginRight: "6px", opacity: 0.5 }}>{String(i + 1).padStart(2, "0")}</span>
                      {lang === "wol" ? t.wol : t.fr}
                    </button>
                  ))}
                </div>

                {/* OBSERVER */}
                {activeTab === "observer" && (
                  <div className="fade-in">
                    {/* Territory header */}
                    <div className="card" style={{ marginBottom: "16px" }}>
                      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                            {lang === "wol" ? "Seetu gox gi" : "Diagnostic territorial"}
                          </span>
                          <h2 style={{ fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: 600, marginTop: "4px" }}>
                            {intel.diagnostic.name}
                          </h2>
                          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                            {intel.diagnostic.type === "region" ? "Region" : "Departement"} — {intel.diagnostic.region}
                          </p>
                        </div>
                        {intel.idt && (
                          <div style={{ textAlign: "right" }}>
                            <span className="data-mono" style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-terracotta)" }}>{intel.idt.total}</span>
                            <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>/100</span>
                            <p style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "2px" }}>{lang === "wol" ? intel.idt.category_wol : intel.idt.category_fr}</p>
                          </div>
                        )}
                      </div>
                      {/* Key metrics */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--color-border)" }}>
                        <div style={{ padding: "14px 20px" }}>
                          <span className="label-caps" style={{ fontSize: "9px" }}>Population</span>
                          <p className="data-mono" style={{ fontSize: "18px", fontWeight: 700, marginTop: "4px", lineHeight: 1 }}>
                            <DataProof proof={{
                              value: intel.diagnostic.population.toLocaleString("fr-FR"),
                              label: "Population totale",
                              source: "ANSD",
                              publication: "RGPH-5 2023, Tableau I-15",
                              year: 2023,
                              territory: `Sénégal / ${intel.diagnostic.name}`,
                              level: "Régional",
                              unit: "habitants",
                              method: "Dénombrement exhaustif RGPH-5",
                              status: "officiel",
                            }}>
                              {intel.diagnostic.population.toLocaleString("fr-FR")}
                            </DataProof>
                          </p>
                          <span className="badge badge-official" style={{ marginTop: "6px" }}>OFFICIEL</span>
                        </div>
                        <div style={{ padding: "14px 20px", borderLeft: "1px solid var(--color-border)" }}>
                          <span className="label-caps" style={{ fontSize: "9px" }}>Densité</span>
                          <p className="data-mono" style={{ fontSize: "18px", fontWeight: 700, marginTop: "4px", lineHeight: 1 }}>
                            <DataProof proof={{
                              value: `${Math.round(intel.diagnostic.density)} hab/km²`,
                              label: "Densité de population",
                              source: "Sàmm Sa Gox",
                              publication: "Calcul : population RGPH-5 / superficie geoBoundaries",
                              year: 2023,
                              territory: `Sénégal / ${intel.diagnostic.name}`,
                              level: "Régional",
                              unit: "habitants/km²",
                              method: "Population (RGPH-5) ÷ Superficie (geoBoundaries ADM1)",
                              status: "calcule",
                            }}>
                              {Math.round(intel.diagnostic.density)} hab/km²
                            </DataProof>
                          </p>
                          <span className="badge badge-calculated" style={{ marginTop: "6px" }}>CALCULÉ</span>
                        </div>
                        <div style={{ padding: "14px 20px", borderLeft: "1px solid var(--color-border)" }}>
                          <span className="label-caps" style={{ fontSize: "9px" }}>Superficie</span>
                          <p className="data-mono" style={{ fontSize: "18px", fontWeight: 700, marginTop: "4px", lineHeight: 1 }}>
                            {intel.diagnostic.area_km2.toLocaleString("fr-FR")} km²
                          </p>
                          <span className="badge badge-official" style={{ marginTop: "6px" }}>OFFICIEL</span>
                        </div>
                      </div>
                    </div>

                    {/* Priorities */}
                    {intel.priorities.length > 0 && (
                      <div className="card" style={{ marginBottom: "16px" }}>
                        <div className="card-header">
                          <span className="label-caps">
                            {lang === "wol" ? "Jafe-jafe yi gena am doole" : "Problemes prioritaires"}
                          </span>
                        </div>
                        <div className="card-body" style={{ padding: "0" }}>
                          {intel.priorities.map((p, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", borderBottom: i < intel.priorities.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                              <span style={{
                                fontSize: "9px",
                                fontFamily: "var(--font-mono)",
                                fontWeight: 700,
                                padding: "3px 8px",
                                borderRadius: "2px",
                                backgroundColor: p.severity === "critique" ? "#FEF2F2" : "#FFF7ED",
                                color: p.severity === "critique" ? "var(--color-critical)" : "var(--color-warning)",
                                border: `1px solid ${p.severity === "critique" ? "#FECACA" : "#FED7AA"}`,
                              }}>
                                {p.severity === "critique" ? "CRITIQUE" : "ALERTE"}
                              </span>
                              <span style={{ fontSize: "13px", fontWeight: 500, flex: 1 }}>{lang === "wol" ? p.domain_wol : p.domain}</span>
                              <span className="data-mono" style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                                ecart {Math.abs(p.gap_pct)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths / Weaknesses */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div className="card">
                        <div className="card-header">
                          <span className="label-caps" style={{ color: "var(--color-green)" }}>
                            {lang === "wol" ? "Doole yi" : "Forces"}
                          </span>
                        </div>
                        <div className="card-body">
                          {(lang === "wol" ? intel.strengths_wol : intel.strengths_fr).map((s, i) => (
                            <p key={i} style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", lineHeight: 1.5 }}>
                              <span style={{ color: "var(--color-green)", marginRight: "6px" }}>+</span>{s}
                            </p>
                          ))}
                          {intel.strengths_fr.length === 0 && <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Aucune force majeure detectee</p>}
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                            {lang === "wol" ? "Jafe-jafe yi" : "Faiblesses"}
                          </span>
                        </div>
                        <div className="card-body">
                          {(lang === "wol" ? intel.weaknesses_wol : intel.weaknesses_fr).map((w, i) => (
                            <p key={i} style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", lineHeight: 1.5 }}>
                              <span style={{ color: "var(--color-terracotta)", marginRight: "6px" }}>-</span>{w}
                            </p>
                          ))}
                          {intel.weaknesses_fr.length === 0 && <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Aucune faiblesse majeure detectee</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* COMPARER */}
                {activeTab === "comparer" && (
                  <div className="fade-in">
                    <div className="card" style={{ marginBottom: "16px" }}>
                      <div className="card-header">
                        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                          {lang === "wol" ? "Gox yi mu melni" : "Territoires similaires"}
                        </span>
                        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "6px" }}>
                          {lang === "wol"
                            ? `Gox yi gena melni ${intel.diagnostic.name} ci 6 dimensions`
                            : `Régions présentant des caractéristiques comparables à ${intel.diagnostic.name} (similarité cosinus sur 6 dimensions : densité, urbanisation, jeunesse, alphabétisation, santé, eau)`}
                        </p>
                      </div>
                      <div className="card-body" style={{ padding: 0 }}>
                        {intel.similar.length === 0 ? (
                          <p style={{ padding: "20px", fontSize: "13px", color: "var(--color-text-muted)" }}>Disponible uniquement pour les regions.</p>
                        ) : (
                          intel.similar.map((s, i) => (
                            <div key={s.code} style={{ padding: "16px 20px", borderBottom: i < intel.similar.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "14px", fontWeight: 600 }}>{s.name}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <div className="progress-bar" style={{ width: "60px" }}>
                                    <div className="progress-fill" style={{ width: `${s.similarity}%`, backgroundColor: "var(--color-navy-muted)" }} />
                                  </div>
                                  <span className="data-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-navy)" }}>{s.similarity}%</span>
                                </div>
                              </div>
                              {s.shared_weaknesses.length > 0 && (
                                <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "6px" }}>
                                  {lang === "wol" ? "Jafe-jafe yu bokk : " : "Defis communs : "}{s.shared_weaknesses.join(", ")}
                                </p>
                              )}
                              {s.shared_strengths.length > 0 && (
                                <p style={{ fontSize: "11px", color: "var(--color-green)", marginTop: "3px" }}>
                                  {lang === "wol" ? "Doole yu bokk : " : "Forces communes : "}{s.shared_strengths.join(", ")}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Gap analysis table */}
                    {intel.gaps.length > 0 && (
                      <div className="card">
                        <div className="card-header">
                          <span className="label-caps">
                            {lang === "wol" ? "Seetu ecart yi" : "Analyse des ecarts vs normes"}
                          </span>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                            <thead>
                              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <th style={{ textAlign: "left", padding: "10px 20px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontWeight: 500 }}>Domaine</th>
                                <th style={{ textAlign: "right", padding: "10px 12px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontWeight: 500 }}>Actuel</th>
                                <th style={{ textAlign: "right", padding: "10px 12px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontWeight: 500 }}>Objectif</th>
                                <th style={{ textAlign: "right", padding: "10px 12px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontWeight: 500 }}>Ecart</th>
                                <th style={{ textAlign: "center", padding: "10px 20px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontWeight: 500 }}>Statut</th>
                              </tr>
                            </thead>
                            <tbody>
                              {intel.gaps.map((g, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                  <td style={{ padding: "10px 20px", fontWeight: 500 }}>{lang === "wol" ? g.domain_wol : g.domain}</td>
                                  <td className="data-mono" style={{ textAlign: "right", padding: "10px 12px" }}>{g.current}</td>
                                  <td className="data-mono" style={{ textAlign: "right", padding: "10px 12px" }}>{g.target}</td>
                                  <td className="data-mono" style={{ textAlign: "right", padding: "10px 12px", color: g.gap_pct < 0 ? "var(--color-critical)" : "var(--color-green)", fontWeight: 600 }}>{g.gap_pct}%</td>
                                  <td style={{ textAlign: "center", padding: "10px 20px" }}>
                                    <span style={{
                                      fontSize: "9px",
                                      padding: "2px 8px",
                                      fontFamily: "var(--font-mono)",
                                      fontWeight: 600,
                                      borderRadius: "2px",
                                      backgroundColor: g.severity === "critique" ? "#FEF2F2" : g.severity === "alerte" ? "#FFF7ED" : "var(--color-green-bg)",
                                      color: g.severity === "critique" ? "var(--color-critical)" : g.severity === "alerte" ? "var(--color-warning)" : "var(--color-green)",
                                    }}>
                                      {g.severity.toUpperCase()}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* EXPLIQUER */}
                {activeTab === "expliquer" && intel.idt && (
                  <div className="fade-in">
                    <div className="card" style={{ marginBottom: "16px" }}>
                      <div className="card-header">
                        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                          {lang === "wol" ? "Ndax lan? — Teral score bi" : "IDT — Indice expérimental Sàmm Sa Gox"}
                        </span>
                        <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "6px", fontStyle: "italic" }}>
                          {"Indice calculé par Sàmm Sa Gox à partir de données publiques. Ne constitue pas un indicateur officiel de l'ANSD."}
                        </p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "12px" }}>
                          <span className="data-mono" style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-terracotta)", lineHeight: 1 }}>{intel.idt.total}</span>
                          <span style={{ fontSize: "15px", color: "var(--color-text-muted)" }}>/ {intel.idt.max_possible} — {lang === "wol" ? intel.idt.category_wol : intel.idt.category_fr}</span>
                        </div>
                      </div>
                      <div className="card-body">
                        {intel.idt.contributions.map((c, i) => (
                          <div key={i} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: i < intel.idt!.contributions.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                              <span style={{ fontSize: "13px", fontWeight: 600 }}>{lang === "wol" ? c.factor_wol : c.factor}</span>
                              <span className="data-mono" style={{ fontSize: "14px", fontWeight: 700, color: c.direction === "positive" ? "var(--color-green)" : "var(--color-terracotta)" }}>
                                {c.points}/25
                              </span>
                            </div>
                            <div className="progress-bar" style={{ marginBottom: "8px" }}>
                              <div className="progress-fill" style={{ width: `${(c.points / 25) * 100}%`, backgroundColor: c.direction === "positive" ? "var(--color-green)" : "var(--color-terracotta)" }} />
                            </div>
                            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{lang === "wol" ? c.detail_wol : c.detail_fr}</p>
                            <p className="label-caps" style={{ fontSize: "9px" }}>Source : {c.source}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Methodology */}
                    <div style={{ padding: "16px 20px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-sand-light)", border: "1px solid var(--color-border)" }}>
                      <span className="label-caps" style={{ display: "block", marginBottom: "8px" }}>Méthodologie</span>
                      <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                        {intel.idt.methodology_fr}
                      </p>
                      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "8px", fontStyle: "italic" }}>
                        {"Cet indice est calculé par Sàmm Sa Gox et ne constitue pas un indicateur officiel de l'ANSD."}
                      </p>
                    </div>
                  </div>
                )}

                {/* AGIR */}
                {activeTab === "agir" && (
                  <div className="fade-in">
                    <div className="card" style={{ marginBottom: "16px" }}>
                      <div className="card-header">
                        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                          {lang === "wol" ? "Su... ? — Scenarios" : "Et si... ? — Simulation"}
                        </span>
                        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "6px" }}>
                          Sélectionnez un scénario pour simuler son impact sur le territoire.
                        </p>
                      </div>
                      <div className="card-body">
                        <div style={{ display: "grid", gap: "8px" }}>
                          {intel.scenarios.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setActiveScenario(s.id)}
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                padding: "12px 16px",
                                border: activeScenario === s.id ? "2px solid var(--color-terracotta)" : "1px solid var(--color-border)",
                                borderRadius: "var(--radius-sm)",
                                backgroundColor: activeScenario === s.id ? "var(--color-terracotta-bg)" : "transparent",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 500,
                                transition: "all 0.15s ease",
                              }}
                            >
                              {lang === "wol" ? s.label_wol : s.label_fr}
                            </button>
                          ))}
                        </div>
                      </div>
                      {scenarioResult && (
                        <div style={{ borderTop: "1px solid var(--color-border)" }}>
                          <div style={{ padding: "16px 20px", backgroundColor: "var(--color-terracotta-bg)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-terracotta)", padding: "2px 8px", border: "1px solid var(--color-terracotta)", borderRadius: "2px" }}>SIMULATION</span>
                            </div>
                            <p style={{ fontSize: "13px", lineHeight: 1.7, fontFamily: "var(--font-display)" }}>
                              {lang === "wol" ? scenarioResult.summary_wol : scenarioResult.summary_fr}
                            </p>
                          </div>
                          <div style={{ padding: "16px 20px" }}>
                            {scenarioResult.scenario.impacts.map((imp, i) => (
                              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < scenarioResult.scenario.impacts.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                                <span style={{ fontSize: "12px" }}>{lang === "wol" ? imp.indicator_wol : imp.indicator_fr}</span>
                                <span className="data-mono" style={{ fontSize: "12px" }}>
                                  {imp.before} → <strong style={{ color: imp.change_pct > 0 ? "var(--color-green)" : "var(--color-critical)" }}>{imp.after}</strong> {imp.unit}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
                            <p style={{ fontSize: "10px", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                              {"Ce résultat est une simulation de Sàmm Sa Gox et ne constitue pas une prévision officielle de l'ANSD."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <PDCGenerator diagnostic={intel.diagnostic} lang={lang} />
                  </div>
                )}

                {/* TIMELINE 20 ans */}
                {activeTab === "timeline" && intel.timeline && (
                  <div className="fade-in">
                    <div className="card">
                      <div className="card-header">
                        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                          20 ans — {intel.diagnostic.name}
                        </span>
                        <p style={{ fontSize: "14px", fontFamily: "var(--font-display)", marginTop: "8px", lineHeight: 1.6 }}>
                          {lang === "wol" ? intel.timeline.summary_wol : intel.timeline.summary_fr}
                        </p>
                      </div>
                      <div className="card-body">
                        {intel.timeline.indicators.map((ind, idx) => (
                          <div key={ind.code} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: idx < intel.timeline!.indicators.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: 500 }}>{lang === "wol" ? ind.label_wol : ind.label_fr}</span>
                              <span className="data-mono" style={{ fontSize: "12px", color: "var(--color-green)", fontWeight: 600 }}>
                                {lang === "wol" ? ind.change_label_wol : ind.change_label_fr}
                              </span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: `repeat(${ind.data.length}, 1fr)`, gap: "4px" }}>
                              {ind.data.map((pt, i) => (
                                <div key={i} style={{
                                  textAlign: "center",
                                  padding: "8px 4px",
                                  backgroundColor: i === ind.data.length - 1 ? "var(--color-terracotta-bg)" : "var(--color-bg-subtle)",
                                  borderRadius: "var(--radius-sm)",
                                  border: i === ind.data.length - 1 ? "1px solid var(--color-terracotta)20" : "1px solid var(--color-border)",
                                }}>
                                  <div className="label-caps" style={{ fontSize: "9px", marginBottom: "4px" }}>{pt.year}</div>
                                  <div className="data-mono" style={{ fontSize: "12px", fontWeight: 600 }}>
                                    {ind.unit === "habitants" ? (pt.value / 1000).toFixed(0) + "k" : pt.value.toLocaleString("fr-FR")}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sources */}
                {intel && (
                  <div className="card" style={{ marginTop: "16px" }}>
                    <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="label-caps">Sources utilisees</span>
                      <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{intel.sources.length} references</span>
                    </div>
                    <div className="card-body">
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {intel.sources.map((s) => (
                          <span key={s.id} className={`badge badge-${s.type === "officiel" ? "official" : s.type === "calcule" ? "calculated" : "estimated"}`}>
                            {s.name} ({s.year})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NationalView({ lang, nationalTimeline }: { lang: Lang; nationalTimeline: ReturnType<typeof getNationalTimeline> }) {
  return (
    <div className="card fade-in">
      <div className="card-header">
        <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
          {lang === "wol" ? "Senegaal — 20 at ANSD" : "Senegal — 20 ans ANSD"}
        </span>
        <h2 style={{ fontSize: "20px", fontFamily: "var(--font-display)", fontWeight: 600, marginTop: "6px" }}>
          {lang === "wol" ? "Jem ci gox gi ngir xool seetu bi" : "Selectionnez une region pour commencer"}
        </h2>
        <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "6px" }}>
          {lang === "wol"
            ? "Teral nataalu ANSD ci 20 at yi — cliquez ci kaart bi walla seeke ci kaw"
            : "Cliquez sur la carte ou utilisez la recherche pour selectionner un territoire."}
        </p>
      </div>
      <div className="card-body">
        <span className="label-caps" style={{ display: "block", marginBottom: "16px" }}>
          {lang === "wol" ? "Nataal Senegal — 20 at" : "Evolution nationale — 20 ans"}
        </span>
        {nationalTimeline.map((ind) => (
          <div key={ind.code} style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "13px", fontWeight: 500 }}>{lang === "wol" ? ind.label_wol : ind.label_fr}</span>
              <span className="data-mono" style={{ fontSize: "12px", color: ind.change_20y >= 0 && ind.code !== "pauvrete" ? "var(--color-green)" : "var(--color-terracotta)", fontWeight: 600 }}>
                {lang === "wol" ? ind.change_label_wol : ind.change_label_fr}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", alignItems: "center" }}>
              {ind.data.map((pt, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div className="label-caps" style={{ fontSize: "9px" }}>{pt.year}</div>
                  <div className="data-mono" style={{ fontSize: "12px", fontWeight: 600, marginTop: "2px" }}>{pt.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

