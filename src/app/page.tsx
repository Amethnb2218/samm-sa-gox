"use client";

import Link from "next/link";
import { REGIONS, NATIONAL_INDICATORS } from "@/lib/data";
import { computeAllIDT } from "@/lib/idt";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [count, setCount] = useState(0);
  const totalPop = REGIONS.reduce((s, r) => s + r.population, 0);
  const idtResults = computeAllIDT();

  useEffect(() => {
    const target = totalPop;
    const duration = 2000;
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
      {/* Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(250,250,248,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "var(--color-terracotta)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              Sàmm Sa Gox
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/dashboard" style={{ fontSize: "12px", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
              DASHBOARD
            </Link>
            <Link href="/about" style={{ fontSize: "12px", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
              A PROPOS
            </Link>
            <Link href="/admin" style={{ fontSize: "12px", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
              ADMIN
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(135deg, transparent 0%, rgba(183,71,42,0.03) 100%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: "680px" }}>
            <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", letterSpacing: "0.1em", marginBottom: "16px" }}>
              CHALLENGE 20 ANS ANSD — HACKATHON 2026
            </p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "var(--font-serif)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--color-text)" }}>
              L&apos;intelligence territoriale du S&eacute;n&eacute;gal,{" "}
              <span style={{ color: "var(--color-terracotta)" }}>pour chaque S&eacute;n&eacute;galais</span>
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--color-text-muted)", marginTop: "24px", maxWidth: "560px" }}>
              Diagnostic de chaque r&eacute;gion et d&eacute;partement. Analyse des &eacute;carts. Projections 2030. Score d&apos;opportunit&eacute;.
              Le tout en wolof et en fran&ccedil;ais, hors-ligne, &agrave; co&ucirc;t z&eacute;ro.
            </p>
            <div style={{ marginTop: "36px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/dashboard" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                backgroundColor: "var(--color-terracotta)",
                color: "white",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}>
                ACCEDER AU DASHBOARD
              </Link>
              <Link href="/about" style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "var(--font-mono)",
              }}>
                EN SAVOIR PLUS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter */}
      <section style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>
              {count.toLocaleString("fr-FR")}
            </p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>Habitants couverts</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>14</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>R&eacute;gions analys&eacute;es</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>45</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>D&eacute;partements</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>10</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>Modules d&apos;analyse</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-green)" }}>0 FCFA</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>Co&ucirc;t total</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", letterSpacing: "0.1em", marginBottom: "12px" }}>
          FONCTIONNALITES
        </p>
        <h2 style={{ fontSize: "28px", fontFamily: "var(--font-serif)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "48px" }}>
          Un outil complet d&apos;aide &agrave; la d&eacute;cision
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "var(--color-border)" }}>
          {[
            { num: "01", title: "Diagnostic territorial", desc: "Fiche complète par région et département avec narratif automatique en wolof et français." },
            { num: "02", title: "Indice de développement (IDT)", desc: "Score composite 0-100 sur 4 dimensions. Classement unique des 14 régions." },
            { num: "03", title: "Analyse des écarts", desc: "Comparaison aux normes OMS, UNESCO et ODD. Identification des déficits critiques." },
            { num: "04", title: "Projections 2030", desc: "Régression linéaire. Besoins futurs en santé, éducation et infrastructure chiffrés." },
            { num: "05", title: "Score d'opportunité", desc: "Évalue le potentiel économique sur 5 facteurs pour guider l'investissement." },
            { num: "06", title: "Simulateur d'impact", desc: "Simule l'effet d'un investissement public avec coût et impact calculés en temps réel." },
            { num: "07", title: "Générateur PDC (PDF)", desc: "Document officiel 5 pages prêt pour dépôt en préfecture. Remplace un consultant." },
            { num: "08", title: "Agent intelligent", desc: "Posez vos questions en wolof ou français. Répond avec les données réelles du territoire." },
            { num: "09", title: "Carte interactive", desc: "MapLibre GL JS avec GeoJSON réel. Choroplèthe, labels, tooltip au survol, clic pour explorer." },
          ].map((f) => (
            <div key={f.num} style={{ backgroundColor: "var(--color-bg-card)", padding: "28px 24px" }}>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>{f.num}</span>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginTop: "8px", fontFamily: "var(--font-serif)" }}>{f.title}</h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "8px", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IDT Preview */}
      <section style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", letterSpacing: "0.1em", marginBottom: "12px" }}>
            CLASSEMENT IDT 2026
          </p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--font-serif)", fontWeight: 600, marginBottom: "32px" }}>
            Indice de D&eacute;veloppement Territorial — Top 5
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {idtResults.slice(0, 5).map((r, i) => (
              <div key={r.code} style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "12px 16px",
                border: "1px solid var(--color-border)",
              }}>
                <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", width: "32px" }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, flex: 1 }}>{r.name}</span>
                <div style={{ width: "120px", height: "6px", backgroundColor: "var(--color-border)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${r.score}%`, backgroundColor: "var(--color-terracotta)" }} />
                </div>
                <span style={{ fontSize: "13px", fontFamily: "var(--font-mono)", fontWeight: 600, width: "50px", textAlign: "right" }}>
                  {r.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link href="/dashboard" style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--color-terracotta)", textDecoration: "none" }}>
              VOIR LE CLASSEMENT COMPLET →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontFamily: "var(--font-serif)", fontWeight: 600, marginBottom: "16px" }}>
          Explorez les donn&eacute;es du S&eacute;n&eacute;gal
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          Aucune inscription requise. Fonctionne hors-ligne. 100% gratuit.
        </p>
        <Link href="/dashboard" style={{
          display: "inline-flex",
          padding: "16px 40px",
          backgroundColor: "var(--color-text)",
          color: "white",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
        }}>
          LANCER LE DIAGNOSTIC
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
            S&agrave;mm Sa Gox — Challenge 20 ans ANSD — 2026
          </span>
          <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
            Sources : ANSD, Banque Mondiale, geoBoundaries, OMS, UNESCO
          </span>
        </div>
      </footer>
    </div>
  );
}
