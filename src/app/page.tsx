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
        backgroundColor: "rgba(248,247,244,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "30px", height: "30px", backgroundColor: "var(--color-terracotta)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <span style={{ fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              Samm Sa Gox
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
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
      <section style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="hero-grid" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <span style={{ width: "24px", height: "1px", backgroundColor: "var(--color-terracotta)" }} />
              <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>
                Challenge 20 ans ANSD 2026
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 4.5vw, 44px)", fontFamily: "var(--font-display)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", color: "var(--color-text)" }}>
              Transformer les statistiques publiques en intelligence territoriale
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--color-text-secondary)", marginTop: "20px", maxWidth: "480px" }}>
              {"Observer, comparer, expliquer et simuler le développement des 14 régions du Sénégal. Chaque chiffre est tracé jusqu'à sa source."}
            </p>
            <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/dashboard" className="btn-primary">
                Explorer les territoires
              </Link>
              <Link href="#methode" className="btn-secondary">
                Comprendre la méthode
              </Link>
            </div>
          </div>
          <div className="hide-mobile" style={{ display: "flex", justifyContent: "center" }}>
            <HeroMap />
          </div>
        </div>
      </section>

      {/* Metrics bar */}
      <section style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div className="metrics-grid" style={{ maxWidth: "1120px", margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {[
            { value: count.toLocaleString("fr-FR"), label: "Habitants couverts", sub: "RGPH-5 2023" },
            { value: "14", label: "Régions analysées", sub: "Couverture nationale" },
            { value: "4×25", label: "Score IDT", sub: "Dimensions du développement" },
            { value: "9", label: "Sources tracées", sub: "ANSD, OMS, UNESCO" },
          ].map((m, i) => (
            <div key={i}>
              <p className="data-mono" style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text)", lineHeight: 1 }}>
                {m.value}
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-secondary)", marginTop: "6px" }}>{m.label}</p>
              <p className="label-caps" style={{ marginTop: "4px", fontSize: "9px" }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parcours */}
      <section id="methode" style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", backgroundColor: "var(--color-terracotta)" }} />
          <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>Parcours analytique</span>
        </div>
        <h2 style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "12px" }}>
          {"De l'observation à la décision"}
        </h2>
        <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "48px", maxWidth: "560px" }}>
          Un parcours structuré en 4 étapes pour comprendre chaque territoire, identifier ses enjeux et simuler des scénarios de développement.
        </p>

        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {[
            { step: "01", title: "Observer", desc: "Population, densité, IDT, écarts aux normes, forces et faiblesses du territoire." },
            { step: "02", title: "Comparer", desc: "Territoires similaires, dimensions partagées, analyse des écarts vs objectifs." },
            { step: "03", title: "Expliquer", desc: "Décomposition du score IDT, contribution de chaque facteur, sources et méthode." },
            { step: "04", title: "Agir", desc: "Scénarios « Et si... ? », simulation d'impact, génération de document de planification." },
          ].map((f) => (
            <div key={f.step} style={{ backgroundColor: "var(--color-bg-card)", padding: "28px 24px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
              <span className="data-mono" style={{ fontSize: "11px", color: "var(--color-terracotta)", fontWeight: 600 }}>{f.step}</span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginTop: "10px", fontFamily: "var(--font-display)" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "10px", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IDT Ranking */}
      <section style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px" }}>
          <div className="idt-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ width: "24px", height: "1px", backgroundColor: "var(--color-terracotta)" }} />
                <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>Indice IDT</span>
              </div>
              <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "16px" }}>
                Indice de Développement Territorial
              </h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                Score composite sur 100 points répartis en 4 dimensions égales : couverture sanitaire, alphabétisation, infrastructure (eau + électricité) et dynamisme économique.
              </p>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                Calculé par Sàmm Sa Gox à partir des données ANSD RGPH-5 2023. Ne constitue pas un indicateur officiel.
              </p>
              <div style={{ marginTop: "24px" }}>
                <Link href="/dashboard" style={{ fontSize: "13px", color: "var(--color-terracotta)", textDecoration: "none", fontWeight: 500 }}>
                  Voir le détail par région →
                </Link>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {idtResults.slice(0, 7).map((r, i) => (
                  <div key={r.code} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 16px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: i === 0 ? "var(--color-terracotta-bg)" : "transparent",
                  }}>
                    <span className="data-mono" style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-muted)", width: "24px" }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 500, flex: 1 }}>{r.name}</span>
                    <div className="progress-bar" style={{ width: "100px" }}>
                      <div className="progress-fill" style={{ width: `${r.score}%`, backgroundColor: r.score >= 60 ? "var(--color-green)" : r.score >= 40 ? "var(--color-sand)" : "var(--color-terracotta)" }} />
                    </div>
                    <span className="data-mono" style={{ fontSize: "13px", fontWeight: 600, width: "44px", textAlign: "right" }}>
                      {r.score.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Trust */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", backgroundColor: "var(--color-terracotta)" }} />
          <span className="label-caps" style={{ color: "var(--color-terracotta)" }}>Traçabilité</span>
        </div>
        <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "16px" }}>
          Chaque chiffre a une source
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "32px", maxWidth: "520px" }}>
          {"Sàmm Sa Gox distingue clairement les données officielles, calculées, estimées ou indisponibles. Aucune donnée n'est inventée."}
        </p>
        <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { label: "OFFICIEL", desc: "Source ANSD publiée", color: "var(--color-green)", bg: "var(--color-green-bg)" },
            { label: "CALCULÉ", desc: "Dérivé de sources officielles", color: "var(--color-navy)", bg: "#EFF6FF" },
            { label: "ESTIMÉ", desc: "Approximation documentée", color: "var(--color-warning)", bg: "#FFFBEB" },
            { label: "INDISPONIBLE", desc: "Non publié à ce jour", color: "var(--color-text-muted)", bg: "var(--color-bg-subtle)" },
          ].map((t) => (
            <div key={t.label} style={{ padding: "20px", borderRadius: "var(--radius-md)", backgroundColor: t.bg, border: `1px solid ${t.color}20` }}>
              <span className="data-mono" style={{ fontSize: "11px", fontWeight: 700, color: t.color }}>{t.label}</span>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "8px" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
            Commencez par choisir un territoire
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "28px" }}>
            14 régions du Sénégal, données RGPH-5 2023, zéro inscription, zéro coût.
          </p>
          <Link href="/dashboard" className="btn-primary" style={{ padding: "14px 32px" }}>
            Accéder à la plateforme
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "20px 24px", backgroundColor: "var(--color-bg-subtle)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "20px", height: "20px", backgroundColor: "var(--color-terracotta)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "8px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
              Samm Sa Gox — Challenge 20 ans ANSD 2026
            </span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
            Sources : ANSD RGPH-5 2023 · geoBoundaries · OMS · UNESCO
          </span>
        </div>
      </footer>
    </div>
  );
}
