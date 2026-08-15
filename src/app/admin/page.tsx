"use client";

import { useState } from "react";
import Link from "next/link";
import { REGIONS } from "@/lib/data";
import { SOURCES } from "@/lib/source-engine";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "ansd2026") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "380px", padding: "24px" }}>
          <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "32px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ width: "28px", height: "28px", backgroundColor: "var(--color-terracotta)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-serif)" }}>Administration</span>
            </div>
            <form onSubmit={handleLogin}>
              <label style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>
                MOT DE PASSE
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", fontSize: "13px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", outline: "none", marginBottom: "12px" }}
                placeholder="Entrez le mot de passe admin"
              />
              {error && <p style={{ fontSize: "11px", color: "#B71C1C", marginBottom: "8px" }}>{error}</p>}
              <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "var(--color-terracotta)", color: "white", border: "none", fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-mono)", cursor: "pointer" }}>
                CONNEXION
              </button>
            </form>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Link href="/" style={{ fontSize: "11px", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                ← Retour au site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      <header style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", backgroundColor: "var(--color-terracotta)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>SG</span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-serif)" }}>Administration</span>
          <span style={{ fontSize: "9px", padding: "2px 6px", backgroundColor: "var(--color-green)", color: "white", fontFamily: "var(--font-mono)" }}>CONNECTE</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ fontSize: "11px", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>DASHBOARD</Link>
          <button onClick={() => setAuthenticated(false)} style={{ fontSize: "11px", color: "var(--color-terracotta)", background: "none", border: "1px solid var(--color-terracotta)", padding: "4px 10px", cursor: "pointer", fontFamily: "var(--font-mono)" }}>
            DECONNEXION
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: "22px", fontFamily: "var(--font-serif)", fontWeight: 600, marginBottom: "24px" }}>Panneau d&apos;administration</h1>

        {/* Data overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px" }}>
            <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>REGIONS</p>
            <p style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>{REGIONS.length}</p>
          </div>
          <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px" }}>
            <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>SOURCES</p>
            <p style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-terracotta)" }}>{Object.keys(SOURCES).length}</p>
          </div>
          <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px" }}>
            <p style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>DERNIERE MAJ</p>
            <p style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-mono)" }}>Aout 2026</p>
          </div>
        </div>

        {/* Regions table */}
        <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", marginBottom: "24px" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", margin: 0 }}>DONNEES REGIONALES</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-sand-light)" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "9px" }}>Code</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "9px" }}>Region</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "9px" }}>Population</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "9px" }}>Superficie</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "9px" }}>Departements</th>
                </tr>
              </thead>
              <tbody>
                {REGIONS.map((r) => (
                  <tr key={r.code} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{r.code}</td>
                    <td style={{ padding: "8px 12px" }}>{r.name}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)" }}>{r.population.toLocaleString("fr-FR")}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)" }}>{r.area_km2.toLocaleString("fr-FR")} km²</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)" }}>{r.departments.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sources */}
        <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", margin: 0 }}>SOURCES DE DONNEES</p>
          </div>
          <div style={{ padding: "16px" }}>
            {Object.values(SOURCES).map((s) => (
              <div key={s.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 500 }}>{s.name}</p>
                  <p style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{s.publication}</p>
                </div>
                <span style={{ fontSize: "9px", padding: "2px 6px", border: "1px solid var(--color-green)", color: "var(--color-green)", fontFamily: "var(--font-mono)" }}>{s.year}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
