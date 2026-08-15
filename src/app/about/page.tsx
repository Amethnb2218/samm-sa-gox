"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Lang } from "@/lib/wolof";
import Link from "next/link";

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <Header lang={lang} onLangChange={setLang} />
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>
        <Link
          href="/"
          style={{ fontSize: "12px", color: "var(--color-text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "32px" }}
        >
          ← Accueil
        </Link>

        <article>
          <header style={{ marginBottom: "40px" }}>
            <span className="label-caps" style={{ color: "var(--color-terracotta)", marginBottom: "8px", display: "block" }}>
              Challenge 20 ans ANSD — 2026
            </span>
            <h1 style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {lang === "wol" ? "Lu mu tax Sàmm Sa Gox" : "Méthodologie et sources"}
            </h1>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: 1.7 }}>
              {lang === "wol"
                ? "Sàmm Sa Gox mooy jumtukaay bi di jox nit kii seetu gox gi ci wolof ak ci français."
                : "Sàmm Sa Gox transforme les statistiques publiques du Sénégal en intelligence territoriale exploitable. Chaque chiffre est tracé."}
            </p>
          </header>

          {/* Probleme */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              {lang === "wol" ? "Jafe-jafe bi" : "Le constat"}
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              {lang === "wol"
                ? "ANSD di na jox xam-xam yu bari ci reew mi, waaye kenn menul ko jot."
                : "L'ANSD produit des statistiques de qualité internationale, mais leur exploitation par les décideurs locaux, chercheurs ou citoyens reste limitée. Les données sont dispersées dans des PDF, sans API unifiée ni interface en langues nationales."}
            </p>
          </section>

          {/* IDT */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              Indice de Développement Territorial (IDT)
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "16px" }}>
              Score composite sur 100 points calculé par Sàmm Sa Gox. Ne constitue pas un indicateur officiel ANSD.
            </p>
            <div className="card" style={{ overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                    <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 600 }}>Dimension</th>
                    <th style={{ textAlign: "center", padding: "10px 16px", fontWeight: 600 }}>Poids</th>
                    <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 600 }}>Indicateur</th>
                    <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 600 }}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Santé", poids: "25 pts", ind: "Postes sanitaires / 10 000 hab vs norme 1.5", src: "ANSD Carte sanitaire" },
                    { dim: "Éducation", poids: "25 pts", ind: "Taux alphabétisation 10+ vs objectif 75%", src: "RGPH-5 2023 Chap. 2" },
                    { dim: "Infrastructure", poids: "25 pts", ind: "Moy. accès eau + électricité vs 95%", src: "RGPH-5 2023 Chap. 8" },
                    { dim: "Économie", poids: "25 pts", ind: "Densité + urbanisation (proxy)", src: "RGPH-5 2023" },
                  ].map((r) => (
                    <tr key={r.dim} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "10px 16px", fontWeight: 500 }}>{r.dim}</td>
                      <td className="data-mono" style={{ textAlign: "center", padding: "10px 16px", color: "var(--color-terracotta)" }}>{r.poids}</td>
                      <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)" }}>{r.ind}</td>
                      <td style={{ padding: "10px 16px", fontSize: "11px", color: "var(--color-text-muted)" }}>{r.src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "12px", fontStyle: "italic" }}>
              {"Les pondérations égales (4 × 25) sont un choix assumé par simplicité. L'utilisateur est informé que toute pondération est une décision méthodologique, non une vérité scientifique."}
            </p>
          </section>

          {/* Data Trust */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              Traçabilité des données
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "16px" }}>
              Chaque donnée est classée selon son niveau de fiabilité :
            </p>
            <div style={{ display: "grid", gap: "8px" }}>
              {[
                { label: "OFFICIEL", desc: "Donnée publiée par l'ANSD dans un rapport officiel (RGPH-5, EDS, etc.)", cls: "badge-official" },
                { label: "CALCULÉ", desc: "Dérivée de deux données officielles ou plus (ex : densité = population / superficie)", cls: "badge-calculated" },
                { label: "ESTIMÉ", desc: "Approximation basée sur des sources externes ou des proxys documentés", cls: "badge-estimated" },
                { label: "INDISPONIBLE", desc: "Donnée non publiée à ce jour — aucune valeur inventée", cls: "badge-unavailable" },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 16px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
                  <span className={`badge ${t.cls}`} style={{ flexShrink: 0, marginTop: "2px" }}>{t.label}</span>
                  <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{t.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              Sources de données
            </h2>
            <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 2 }}>
              <p>ANSD — RGPH-5 2023 (Population, Alphabétisation, Habitat, Électricité, Eau)</p>
              <p>ANSD — RGPHAE 2013 (Population historique)</p>
              <p>ANSD — AGRIDATA (Ménages agricoles, Abattoirs, Foirails)</p>
              <p>geoBoundaries — Limites administratives ADM1 Sénégal (CC-BY)</p>
              <p>OMS — Normes couverture sanitaire</p>
              <p>UNESCO — Objectifs alphabétisation</p>
              <p>ODD — Objectifs Développement Durable 2030</p>
            </div>
          </section>

          {/* Limites */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              Limites connues
            </h2>
            <ul style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 2, paddingLeft: "16px" }}>
              <li>Données santé (postes, médecins) et éducation (écoles) : estimées, pas issues du RGPH-5</li>
              <li>Taux de pauvreté : source EHCVM, pas RGPH-5 — marqué ESTIMÉ</li>
              <li>Données départementales : non disponibles en accès libre</li>
              <li>Accès eau potable : calculé à partir du Tableau VIII-12 (sources améliorées)</li>
              <li>{"Dimension économique de l'IDT : proxy (densité + urbanisation), pas PIB régional"}</li>
            </ul>
          </section>

          {/* Architecture */}
          <section style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>
              Architecture technique
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              {"Application Next.js statique. Toute la logique s'exécute dans le navigateur. Zéro serveur, zéro coût d'exploitation. Carte interactive MapLibre GL JS avec GeoJSON réel. Fonctionne hors-ligne après premier chargement."}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
