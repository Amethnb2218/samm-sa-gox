"use client";

import Link from "next/link";
import { REGIONS } from "@/lib/data";
import { computeAllIDT } from "@/lib/idt";
import { useState, useEffect } from "react";
import HeroMap from "@/components/HeroMap";

export default function LandingPage() {
  const [count, setCount] = useState(0);
  const totalPop = REGIONS.reduce((s, r) => s + r.population, 0);
  const idtResults = computeAllIDT();

  useEffect(() => {
    const target = totalPop;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [totalPop]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Navigation */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(250,249,246,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", backgroundColor: "var(--color-baobab)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <div>
              <span style={{ fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Sàmm Sa Gox
              </span>
              <span style={{ fontSize: "10px", color: "var(--color-text-muted)", marginLeft: "8px", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
                SÉNÉGAL
              </span>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "none", fontWeight: 500 }}>
              Explorer
            </Link>
            <Link href="/about" style={{ fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "none", fontWeight: 500 }}>
              Méthodologie
            </Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: "8px 16px", fontSize: "12px" }}>
              {"Lancer l'analyse"}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ paddingTop: "130px", paddingBottom: "60px", position: "relative" }}>
        {/* Subtle topographic background pattern */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "50%", opacity: 0.03, background: "repeating-linear-gradient(0deg, transparent, transparent 40px, var(--color-baobab) 40px, var(--color-baobab) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--color-baobab) 40px, var(--color-baobab) 41px)", pointerEvents: "none" }} />
        <div className="hero-grid" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ width: "32px", height: "2px", backgroundColor: "var(--color-baobab)" }} />
              <span className="label-caps" style={{ color: "var(--color-baobab)", fontSize: "10px" }}>
                Challenge 20 ans ANSD · 2006–2026
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", fontFamily: "var(--font-display)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em", color: "var(--color-text)" }}>
              {"L'intelligence territoriale du Sénégal, accessible et vérifiable"}
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-text-secondary)", marginTop: "20px", maxWidth: "460px" }}>
              {"Observer, comparer, expliquer et simuler le développement des 14 régions. Chaque chiffre est tracé jusqu'à sa source ANSD."}
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/dashboard" className="btn-primary">
                Explorer les territoires
              </Link>
              <Link href="#methode" className="btn-secondary">
                Comprendre la méthode
              </Link>
            </div>
            {/* Quick stats */}
            <div style={{ marginTop: "36px", display: "flex", gap: "24px" }}>
              {[
                { value: "14", label: "régions" },
                { value: "18,1M", label: "habitants" },
                { value: "RGPH-5", label: "2023" },
              ].map((s, i) => (
                <div key={i}>
                  <span className="data-mono" style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-baobab)" }}>{s.value}</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginLeft: "4px" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hide-mobile" style={{ display: "flex", justifyContent: "center" }}>
            <HeroMap />
          </div>
        </div>
      </section>

      {/* Parcours — Pipeline */}
      <section id="methode" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "56px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "32px", height: "2px", backgroundColor: "var(--color-terre)" }} />
            <span className="label-caps" style={{ color: "var(--color-terre)" }}>Parcours analytique</span>
          </div>
          <h2 style={{ fontSize: "26px", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            {"De l'observation à la décision"}
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "40px", maxWidth: "480px" }}>
            Chaque étape construit sur la précédente. Chaque résultat est vérifiable.
          </p>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { step: "01", title: "Observer", desc: "Diagnostic territorial : population, densité, alertes, forces et faiblesses.", color: "var(--color-baobab)" },
              { step: "02", title: "Comparer", desc: "Territoires statistiquement similaires sur 6 dimensions normalisées.", color: "var(--color-ocean)" },
              { step: "03", title: "Expliquer", desc: "Décomposition transparente du score IDT. Sources et méthode visibles.", color: "var(--color-terre)" },
              { step: "04", title: "Agir", desc: "Scénarios « Et si...? ». Impact simulé sur l'indice territorial.", color: "var(--color-sahel)" },
            ].map((f) => (
              <div key={f.step} style={{ padding: "24px 20px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-bg)" }}>
                <span className="data-mono" style={{ fontSize: "11px", color: f.color, fontWeight: 700 }}>{f.step}</span>
                <h3 style={{ fontSize: "17px", fontWeight: 600, marginTop: "8px", fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{f.title}</h3>
                <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "8px", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDT Ranking */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px" }}>
        <div className="idt-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "56px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ width: "32px", height: "2px", backgroundColor: "var(--color-ocean)" }} />
              <span className="label-caps" style={{ color: "var(--color-ocean)" }}>Indice IDT</span>
            </div>
            <h2 style={{ fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "14px" }}>
              Indice de Développement Territorial
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "14px" }}>
              Score sur 100 points répartis en 4 dimensions : santé, éducation, infrastructure et dynamisme économique.
            </p>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.6, fontStyle: "italic" }}>
              {"Indice expérimental Sàmm Sa Gox. Ne constitue pas un indicateur officiel de l'ANSD."}
            </p>
            <div style={{ marginTop: "20px" }}>
              <Link href="/dashboard" style={{ fontSize: "13px", color: "var(--color-baobab)", textDecoration: "none", fontWeight: 500 }}>
                Voir le détail par région →
              </Link>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {idtResults.slice(0, 7).map((r, i) => (
                <div key={r.code} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "11px 14px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: i === 0 ? "var(--color-baobab-bg)" : "transparent",
                }}>
                  <span className="data-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-muted)", width: "20px" }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500, flex: 1 }}>{r.name}</span>
                  <div className="progress-bar" style={{ width: "80px" }}>
                    <div className="progress-fill" style={{ width: `${r.score}%`, backgroundColor: r.score >= 60 ? "var(--color-baobab)" : r.score >= 40 ? "var(--color-sahel)" : "var(--color-terre)" }} />
                  </div>
                  <span className="data-mono" style={{ fontSize: "12px", fontWeight: 600, width: "36px", textAlign: "right" }}>
                    {r.score.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Trust */}
      <section style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-warm)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "56px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "32px", height: "2px", backgroundColor: "var(--color-sahel)" }} />
            <span className="label-caps" style={{ color: "var(--color-sahel)" }}>Traçabilité</span>
          </div>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
            Chaque chiffre a une source
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "32px", maxWidth: "480px" }}>
            {"Sàmm Sa Gox distingue clairement les données officielles, calculées, estimées ou indisponibles. Aucune donnée n'est inventée."}
          </p>
          <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { label: "OFFICIEL", desc: "Publiée par l'ANSD", color: "var(--color-baobab)", bg: "var(--color-baobab-bg)" },
              { label: "CALCULÉ", desc: "Dérivé de sources officielles", color: "var(--color-ocean)", bg: "var(--color-ocean-bg)" },
              { label: "ESTIMÉ", desc: "Approximation documentée", color: "var(--color-warning)", bg: "var(--color-sahel-bg)" },
              { label: "INDISPONIBLE", desc: "Non publié à ce jour", color: "var(--color-text-muted)", bg: "var(--color-bg-subtle)" },
            ].map((t) => (
              <div key={t.label} style={{ padding: "18px 16px", borderRadius: "var(--radius-md)", backgroundColor: t.bg, border: "1px solid var(--color-border)" }}>
                <span className="data-mono" style={{ fontSize: "10px", fontWeight: 700, color: t.color }}>{t.label}</span>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "6px" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
          Commencez par choisir un territoire
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
          14 régions du Sénégal · Données RGPH-5 2023 · Zéro inscription · Zéro coût
        </p>
        <Link href="/dashboard" className="btn-primary" style={{ padding: "14px 32px" }}>
          Accéder à la plateforme
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "24px", backgroundColor: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "22px", height: "22px", backgroundColor: "var(--color-baobab)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "8px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 500 }}>Sàmm Sa Gox</span>
              <span style={{ fontSize: "10px", color: "var(--color-text-muted)", marginLeft: "8px" }}>Intelligence territoriale du Sénégal</span>
            </div>
          </div>
          <div style={{ fontSize: "10px", color: "var(--color-text-muted)", textAlign: "right" }}>
            <p>Sources : ANSD RGPH-5 2023 · geoBoundaries · OMS · UNESCO</p>
            <p style={{ marginTop: "2px" }}>Challenge 20 ans ANSD · 2006–2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
