"use client";

import { useState } from "react";
import { REGIONS } from "@/lib/data";

interface RegionMapProps {
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

const REGION_PATHS: Record<string, { path: string; cx: number; cy: number }> = {
  SL: { path: "M 180 30 L 220 25 L 240 40 L 230 60 L 200 65 L 170 50 Z", cx: 205, cy: 45 },
  MT: { path: "M 240 40 L 310 30 L 330 55 L 300 70 L 260 65 L 230 60 Z", cx: 280, cy: 50 },
  LG: { path: "M 130 50 L 200 65 L 230 60 L 260 65 L 240 100 L 180 110 L 120 90 Z", cx: 185, cy: 80 },
  DK: { path: "M 95 115 L 110 110 L 115 120 L 105 125 Z", cx: 105, cy: 118 },
  TH: { path: "M 115 110 L 160 105 L 170 130 L 140 140 L 110 130 Z", cx: 140, cy: 120 },
  DL: { path: "M 160 105 L 200 100 L 210 130 L 180 140 L 170 130 Z", cx: 185, cy: 120 },
  FK: { path: "M 170 130 L 210 130 L 220 160 L 190 170 L 160 155 Z", cx: 190, cy: 150 },
  KL: { path: "M 200 100 L 240 100 L 240 140 L 220 160 L 210 130 Z", cx: 220, cy: 125 },
  KF: { path: "M 240 100 L 290 95 L 300 130 L 270 150 L 240 140 Z", cx: 265, cy: 120 },
  TC: { path: "M 290 95 L 350 80 L 370 120 L 340 150 L 300 130 Z", cx: 325, cy: 115 },
  KD: { path: "M 340 150 L 370 120 L 390 140 L 380 170 L 350 175 Z", cx: 365, cy: 150 },
  KG: { path: "M 200 190 L 250 180 L 270 200 L 250 220 L 210 215 Z", cx: 235, cy: 200 },
  SE: { path: "M 150 185 L 200 190 L 210 215 L 180 225 L 145 210 Z", cx: 178, cy: 205 },
  ZG: { path: "M 100 195 L 150 185 L 145 210 L 130 225 L 100 215 Z", cx: 125, cy: 205 },
};

export default function RegionMap({ selectedCode, onSelect }: RegionMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const maxDensity = Math.max(...REGIONS.map((r) => r.population / r.area_km2));

  function getColor(code: string): string {
    const region = REGIONS.find((r) => r.code === code);
    if (!region) return "#E5E5E3";
    if (code === selectedCode) return "var(--color-terracotta)";
    const density = region.population / region.area_km2;
    const intensity = Math.min(density / maxDensity, 1);
    const r = 197 + Math.round((183 - 197) * intensity);
    const g = 168 + Math.round((71 - 168) * intensity);
    const b = 125 + Math.round((42 - 125) * intensity);
    return `rgb(${r},${g},${b})`;
  }

  const hoveredRegion = hovered ? REGIONS.find((r) => r.code === hovered) : null;

  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
          Carte — Densité de population
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>faible</span>
          <div style={{ width: "48px", height: "8px", background: "linear-gradient(to right, #C5A87D, #B7472A)" }} />
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>forte</span>
        </div>
      </div>

      <div style={{ padding: "16px", position: "relative" }}>
        {/* Tooltip */}
        {hoveredRegion && (
          <div style={{
            position: "absolute",
            top: "8px",
            left: "16px",
            backgroundColor: "var(--color-text)",
            color: "white",
            padding: "4px 10px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            zIndex: 10,
          }}>
            {hoveredRegion.name} — {Math.round(hoveredRegion.population / hoveredRegion.area_km2)} hab/km²
          </div>
        )}

        <svg viewBox="60 10 350 230" style={{ width: "100%", height: "auto" }}>
          {Object.entries(REGION_PATHS).map(([code, { path }]) => (
            <path
              key={code}
              d={path}
              fill={getColor(code)}
              stroke={code === hovered ? "var(--color-text)" : "var(--color-bg)"}
              strokeWidth={code === hovered ? "2" : "1.5"}
              style={{ cursor: "pointer", transition: "opacity 0.15s" }}
              opacity={hovered && hovered !== code ? 0.6 : 1}
              onClick={() => onSelect(code)}
              onMouseEnter={() => setHovered(code)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
