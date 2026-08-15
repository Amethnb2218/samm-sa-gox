"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RegionMap from "@/components/RegionMap";
import { buildTerritoryIntelligence, TerritoryIntelligence } from "@/lib/territory-engine";
import { computeWhatIf } from "@/lib/scenario-engine";
import { getNationalTimeline } from "@/lib/timeline-engine";
import { Lang } from "@/lib/wolof";
import { CONFIDENCE_LABELS } from "@/lib/confidence";
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
    { key: "observer", fr: "1. Observer", wol: "1. Xool" },
    { key: "comparer", fr: "2. Comparer", wol: "2. Sëmm" },
    { key: "expliquer", fr: "3. Expliquer", wol: "3. Tëral" },
    { key: "agir", fr: "4. Agir", wol: "4. Jëf" },
    { key: "timeline", fr: "20 ans", wol: "20 at" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <Header lang={lang} onLangChange={setLang} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 20px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
          <SearchBar lang={lang} onSelect={(code) => { setSelectedCode(code); setActiveTab("observer"); }} />
          {intel && (
            <button
              onClick={() => { setSelectedCode(null); setActiveScenario(null); }}
              style={{ fontSize: "11px", color: "var(--color-text-muted)", background: "none", border: "1px solid var(--color-border)", padding: "6px 12px", cursor: "pointer", fontFamily: "var(--font-mono)" }}
            >
              {lang === "wol" ? "DELLU" : "RETOUR VUE NATIONALE"}
            </button>
          )}
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
          {/* Left: Map + Guided Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <RegionMap selectedCode={selectedCode} onSelect={(code) => { setSelectedCode(code); setActiveTab("observer"); }} lang={lang} />
            {intel && <GuidedQuestions lang={lang} onSelect={(action) => setActiveTab(action as Tab)} />}
          </div>

          {/* Right: Intelligence panel */}
          <div>
            {!intel ? (
              /* National view with 20 ans timeline */
              <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                    {lang === "wol" ? "SENEGAAL — 20 AT ANSD" : "SENEGAL — 20 ANS ANSD"}
                  </p>
                  <h2 style={{ fontSize: "20px", fontFamily: "var(--font-serif)", fontWeight: 600, marginTop: "4px" }}>
                    {lang === "wol" ? "Jëm ci gox gi ngir xool seetu bi" : "Sélectionnez une région pour commencer l'analyse"}
                  </h2>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", marginBottom: "12px" }}>
                    {lang === "wol" ? "20 AT YI ANSD — NATAAL SENEGAL" : "20 ANS ANSD — EVOLUTION NATIONALE"}
                  </p>
                  {nationalTimeline.map((ind) => (
                    <div key={ind.code} style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500 }}>{lang === "wol" ? ind.label_wol : ind.label_fr}</span>
                        <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: ind.change_20y >= 0 && ind.code !== "pauvrete" ? "var(--color-green)" : "var(--color-terracotta)", fontWeight: 600 }}>
                          {lang === "wol" ? ind.change_label_wol : ind.change_label_fr}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginTop: "6px", alignItems: "center" }}>
                        {ind.data.map((pt, i) => (
                          <div key={i} style={{ flex: 1, textAlign: "center" }}>
                            <div style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{pt.year}</div>
                            <div style={{ fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{pt.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Territory Intelligence */
              <div>
                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", marginBottom: "16px" }}>
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      style={{
                        padding: "10px 16px",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: activeTab === t.key ? 700 : 400,
                        color: activeTab === t.key ? "var(--color-terracotta)" : "var(--color-text-muted)",
                        borderBottom: activeTab === t.key ? "2px solid var(--color-terracotta)" : "2px solid transparent",
                        background: "none",
                        border: "none",
                        borderBottomStyle: "solid",
                        cursor: "pointer",
                      }}
                    >
                      {lang === "wol" ? t.wol : t.fr}
                    </button>
                  ))}
                </div>

                {/* TAB: OBSERVER */}
                {activeTab === "observer" && (
                  <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                        {lang === "wol" ? "SEETU GOX GI" : "DIAGNOSTIC TERRITORIAL"}
                      </p>
                      <h2 style={{ fontSize: "22px", fontFamily: "var(--font-serif)", fontWeight: 600, marginTop: "4px" }}>
                        {intel.diagnostic.name}
                      </h2>
                      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                        {intel.diagnostic.type === "region" ? "Région" : "Département"} — {intel.diagnostic.region}
                      </p>
                    </div>
                    {/* Key figures */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "1px solid var(--color-border)" }}>
                      <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border)" }}>
                        <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Population</p>
                        <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-mono)", marginTop: "2px" }}>{intel.diagnostic.population.toLocaleString("fr-FR")}</p>
                        <p style={{ fontSize: "8px", color: "var(--color-green)", fontFamily: "var(--font-mono)" }}>OFFICIEL ANSD</p>
                      </div>
                      <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border)" }}>
                        <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Densité</p>
                        <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-mono)", marginTop: "2px" }}>{Math.round(intel.diagnostic.density)}</p>
                        <p style={{ fontSize: "8px", color: "#1B4F8A", fontFamily: "var(--font-mono)" }}>CALCULÉ</p>
                      </div>
                      <div style={{ padding: "12px 16px" }}>
                        <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>IDT Score</p>
                        <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-mono)", marginTop: "2px", color: "var(--color-terracotta)" }}>{intel.idt ? `${intel.idt.total}/100` : "—"}</p>
                        <p style={{ fontSize: "8px", color: "#1B4F8A", fontFamily: "var(--font-mono)" }}>CALCULÉ</p>
                      </div>
                    </div>
                    {/* Priorities */}
                    {intel.priorities.length > 0 && (
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
                          {lang === "wol" ? "JAFE-JAFE YI GËNA AM DOOLE" : "PROBLEMES PRIORITAIRES DETECTES"}
                        </p>
                        {intel.priorities.map((p, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < intel.priorities.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: p.severity === "critique" ? "#B71C1C" : "#E65100", fontFamily: "var(--font-mono)", width: "70px" }}>
                              {p.severity === "critique" ? "CRITIQUE" : "ALERTE"}
                            </span>
                            <span style={{ fontSize: "12px", fontWeight: 500, flex: 1 }}>{lang === "wol" ? p.domain_wol : p.domain}</span>
                            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                              {p.gap_pct}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Strengths / Weaknesses */}
                    <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--color-green)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                          {lang === "wol" ? "DOOLE YI" : "FORCES"}
                        </p>
                        {(lang === "wol" ? intel.strengths_wol : intel.strengths_fr).map((s, i) => (
                          <p key={i} style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "4px" }}>• {s}</p>
                        ))}
                        {intel.strengths_fr.length === 0 && <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>—</p>}
                      </div>
                      <div>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                          {lang === "wol" ? "JAFE-JAFE YI" : "FAIBLESSES"}
                        </p>
                        {(lang === "wol" ? intel.weaknesses_wol : intel.weaknesses_fr).map((w, i) => (
                          <p key={i} style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "4px" }}>• {w}</p>
                        ))}
                        {intel.weaknesses_fr.length === 0 && <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>—</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: COMPARER */}
                {activeTab === "comparer" && (
                  <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                        {lang === "wol" ? "GOX YI MU MELNI" : "TERRITOIRES SIMILAIRES"}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                        {lang === "wol"
                          ? "Gox yi gëna melni " + intel.diagnostic.name + " ci xam-xam yi"
                          : "Territoires présentant des caractéristiques comparables à " + intel.diagnostic.name}
                      </p>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      {intel.similar.length === 0 ? (
                        <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Disponible uniquement pour les régions.</p>
                      ) : (
                        intel.similar.map((s, i) => (
                          <div key={s.code} style={{ padding: "12px 0", borderBottom: i < intel.similar.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "14px", fontWeight: 600 }}>{s.name}</span>
                              <span style={{ fontSize: "14px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-terracotta)" }}>{s.similarity}%</span>
                            </div>
                            {s.shared_weaknesses.length > 0 && (
                              <p style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                                {lang === "wol" ? "Jafe-jafe yu bokk : " : "Défis communs : "}{s.shared_weaknesses.join(", ")}
                              </p>
                            )}
                            {s.shared_strengths.length > 0 && (
                              <p style={{ fontSize: "10px", color: "var(--color-green)", marginTop: "2px" }}>
                                {lang === "wol" ? "Doole yu bokk : " : "Forces communes : "}{s.shared_strengths.join(", ")}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    {/* Gap comparison */}
                    {intel.gaps.length > 0 && (
                      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--color-border)" }}>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
                          {lang === "wol" ? "SEETU ECART YI" : "ANALYSE DES ECARTS"}
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                              <th style={{ textAlign: "left", padding: "6px 0", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--color-text-muted)" }}>Domaine</th>
                              <th style={{ textAlign: "right", padding: "6px 0", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--color-text-muted)" }}>Actuel</th>
                              <th style={{ textAlign: "right", padding: "6px 0", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--color-text-muted)" }}>Objectif</th>
                              <th style={{ textAlign: "right", padding: "6px 0", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--color-text-muted)" }}>Écart</th>
                              <th style={{ textAlign: "center", padding: "6px 0", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--color-text-muted)" }}>Statut</th>
                            </tr>
                          </thead>
                          <tbody>
                            {intel.gaps.map((g, i) => (
                              <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <td style={{ padding: "8px 0", fontWeight: 500 }}>{lang === "wol" ? g.domain_wol : g.domain}</td>
                                <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{g.current}</td>
                                <td style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{g.target}</td>
                                <td style={{ textAlign: "right", fontFamily: "var(--font-mono)", color: g.gap_pct < 0 ? "#B71C1C" : "var(--color-green)" }}>{g.gap_pct}%</td>
                                <td style={{ textAlign: "center" }}>
                                  <span style={{ fontSize: "9px", padding: "2px 6px", fontFamily: "var(--font-mono)", fontWeight: 600, color: g.severity === "critique" ? "#B71C1C" : g.severity === "alerte" ? "#E65100" : "var(--color-green)" }}>
                                    {g.severity.toUpperCase()}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: EXPLIQUER */}
                {activeTab === "expliquer" && intel.idt && (
                  <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                        {lang === "wol" ? "NDAX LAN? — TËRAL SCORE BI" : "POURQUOI? — EXPLICATION DU SCORE"}
                      </p>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "8px" }}>
                        <span style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>{intel.idt.total}</span>
                        <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>/ {intel.idt.max_possible} — {lang === "wol" ? intel.idt.category_wol : intel.idt.category_fr}</span>
                      </div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      {intel.idt.contributions.map((c, i) => (
                        <div key={i} style={{ marginBottom: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "12px", fontWeight: 500 }}>{lang === "wol" ? c.factor_wol : c.factor}</span>
                            <span style={{ fontSize: "14px", fontFamily: "var(--font-mono)", fontWeight: 700, color: c.direction === "positive" ? "var(--color-green)" : "var(--color-terracotta)" }}>
                              {c.direction === "positive" ? "+" : ""}{c.points} pts
                            </span>
                          </div>
                          <div style={{ height: "4px", backgroundColor: "var(--color-border)", marginTop: "6px" }}>
                            <div style={{ height: "100%", width: `${(c.points / 25) * 100}%`, backgroundColor: c.direction === "positive" ? "var(--color-green)" : "var(--color-terracotta)" }} />
                          </div>
                          <p style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "4px" }}>{lang === "wol" ? c.detail_wol : c.detail_fr}</p>
                          <p style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>Source : {c.source}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "12px 20px", borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-sand-light)" }}>
                      <p style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                        METHODOLOGIE : {intel.idt.methodology_fr}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB: AGIR */}
                {activeTab === "agir" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Scenarios */}
                    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                          {lang === "wol" ? "SU... ? — SCENARIOS" : "ET SI... ? — SCENARIOS"}
                        </p>
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        {intel.scenarios.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setActiveScenario(s.id)}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 12px",
                              marginBottom: "8px",
                              border: activeScenario === s.id ? "2px solid var(--color-terracotta)" : "1px solid var(--color-border)",
                              backgroundColor: activeScenario === s.id ? "var(--color-sand-light)" : "transparent",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            {lang === "wol" ? s.label_wol : s.label_fr}
                          </button>
                        ))}
                      </div>
                      {scenarioResult && (
                        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--color-border)" }}>
                          <p style={{ fontSize: "12px", lineHeight: 1.6, fontFamily: "var(--font-serif)" }}>
                            {lang === "wol" ? scenarioResult.summary_wol : scenarioResult.summary_fr}
                          </p>
                          <div style={{ marginTop: "12px" }}>
                            {scenarioResult.scenario.impacts.map((imp, i) => (
                              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--color-border)", fontSize: "11px" }}>
                                <span>{lang === "wol" ? imp.indicator_wol : imp.indicator_fr}</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>
                                  {imp.before} → <strong style={{ color: imp.change_pct < 0 ? "#B71C1C" : "var(--color-green)" }}>{imp.after}</strong> {imp.unit}
                                </span>
                              </div>
                            ))}
                          </div>
                          <p style={{ fontSize: "9px", color: "var(--color-text-muted)", marginTop: "8px", fontFamily: "var(--font-mono)" }}>
                            {scenarioResult.feasibility_fr}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* PDF */}
                    <PDCGenerator diagnostic={intel.diagnostic} lang={lang} />
                  </div>
                )}

                {/* TAB: TIMELINE (20 ans) */}
                {activeTab === "timeline" && intel.timeline && (
                  <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontFamily: "var(--font-mono)", margin: 0 }}>
                        20 ANS — {intel.diagnostic.name.toUpperCase()}
                      </p>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <p style={{ fontSize: "13px", lineHeight: 1.6, fontFamily: "var(--font-serif)", marginBottom: "16px" }}>
                        {lang === "wol" ? intel.timeline.summary_wol : intel.timeline.summary_fr}
                      </p>
                      {intel.timeline.indicators.map((ind) => (
                        <div key={ind.code} style={{ marginBottom: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "12px", fontWeight: 500 }}>{lang === "wol" ? ind.label_wol : ind.label_fr}</span>
                            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-green)", fontWeight: 600 }}>
                              {lang === "wol" ? ind.change_label_wol : ind.change_label_fr}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                            {ind.data.map((pt, i) => (
                              <div key={i} style={{ flex: 1, textAlign: "center", padding: "6px 0", backgroundColor: i === ind.data.length - 1 ? "var(--color-sand-light)" : "transparent", border: "1px solid var(--color-border)" }}>
                                <div style={{ fontSize: "8px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{pt.year}</div>
                                <div style={{ fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{ind.unit === "habitants" ? (pt.value / 1000).toFixed(0) + "k" : pt.value.toLocaleString("fr-FR")}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {intel && (
                  <div style={{ marginTop: "16px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "12px 20px" }}>
                    <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                      SOURCES UTILISEES
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {intel.sources.map((s) => (
                        <span key={s.id} style={{
                          fontSize: "9px",
                          padding: "3px 8px",
                          border: `1px solid ${CONFIDENCE_LABELS[s.type].color}`,
                          color: CONFIDENCE_LABELS[s.type].color,
                          fontFamily: "var(--font-mono)",
                        }}>
                          {s.name} ({s.year})
                        </span>
                      ))}
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
