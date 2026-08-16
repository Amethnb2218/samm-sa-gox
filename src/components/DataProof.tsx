"use client";

import { useState } from "react";

export interface ProofData {
  value: string;
  label: string;
  source: string;
  publication: string;
  year: number;
  territory: string;
  level: string;
  unit: string;
  method: string;
  status: "officiel" | "calcule" | "estime" | "indisponible";
}

interface DataProofProps {
  proof: ProofData;
  children: React.ReactNode;
}

const STATUS_CONFIG = {
  officiel: { label: "OFFICIEL", cls: "badge-official", desc: "Valeur publiée par l'ANSD, aucune estimation." },
  calcule: { label: "CALCULÉ", cls: "badge-calculated", desc: "Calculé à partir de données officielles ANSD." },
  estime: { label: "ESTIMÉ", cls: "badge-estimated", desc: "Approximation basée sur sources externes." },
  indisponible: { label: "INDISPONIBLE", cls: "badge-unavailable", desc: "Non publié à ce jour." },
};

export default function DataProof({ proof, children }: DataProofProps) {
  const [open, setOpen] = useState(false);
  const config = STATUS_CONFIG[proof.status];

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", borderBottom: "1px dashed var(--color-border-strong)", transition: "border-color 0.15s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-terre)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-strong)"; }}
      >
        {children}
      </span>

      {open && (
        <>
          <div
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            width: "320px",
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            padding: "16px",
            fontSize: "12px",
          }} className="fade-in">
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <p style={{ fontSize: "10px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {proof.label}
                </p>
                <p className="data-mono" style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>
                  {proof.value}
                </p>
              </div>
              <span className={`badge ${config.cls}`}>{config.label}</span>
            </div>

            {/* Details */}
            <div style={{ display: "grid", gap: "8px", borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
              <ProofRow label="Source" value={proof.source} />
              <ProofRow label="Publication" value={proof.publication} />
              <ProofRow label="Année" value={String(proof.year)} />
              <ProofRow label="Territoire" value={proof.territory} />
              <ProofRow label="Niveau" value={proof.level} />
              <ProofRow label="Unité" value={proof.unit} />
              <ProofRow label="Méthode" value={proof.method} />
            </div>

            {/* Status explanation */}
            <div style={{ marginTop: "12px", padding: "8px 10px", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-sm)", fontSize: "11px", color: "var(--color-text-muted)" }}>
              {config.desc}
            </div>
          </div>
        </>
      )}
    </span>
  );
}

function ProofRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>{label}</span>
      <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "180px" }}>{value}</span>
    </div>
  );
}
