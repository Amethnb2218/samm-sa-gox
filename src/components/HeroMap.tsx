"use client";

import { useEffect, useState, useRef } from "react";
import { REGIONS } from "@/lib/data";

interface HeroMapProps {
  onSelect?: (code: string) => void;
}

const NAME_TO_CODE: Record<string, string> = {
  Dakar: "DK",
  Diourbel: "DL",
  Fatick: "FK",
  Kaffrine: "KF",
  Kaolack: "KL",
  Kedougou: "KD",
  Kolda: "KG",
  Louga: "LG",
  Matam: "MT",
  "Saint Louis": "SL",
  Sedhiou: "SE",
  Tambacounda: "TC",
  Thies: "TH",
  Ziguinchor: "ZG",
};

interface GeoFeature {
  properties: { shapeName: string };
  geometry: { type: string; coordinates: number[][][][] | number[][][] };
}

function projectPoint(lon: number, lat: number, bbox: number[], width: number, height: number): [number, number] {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const x = ((lon - minLon) / (maxLon - minLon)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
  return [x, y];
}

function coordsToPath(coords: number[][], bbox: number[], w: number, h: number): string {
  return coords.map((c, i) => {
    const [x, y] = projectPoint(c[0], c[1], bbox, w, h);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join("") + "Z";
}

export default function HeroMap({ onSelect }: HeroMapProps) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch("/data/senegal-regions.geojson")
      .then((r) => r.json())
      .then((data) => setFeatures(data.features));
  }, []);

  const bbox = [-17.6, 12.2, -11.3, 16.8];
  const W = 500;
  const H = 400;

  const hoveredRegion = hovered ? REGIONS.find((r) => r.code === hovered) : null;

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        style={{ maxWidth: "500px" }}
        onMouseMove={(e) => {
          if (svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        }}
      >
        {features.map((feat) => {
          const name = feat.properties.shapeName;
          const code = NAME_TO_CODE[name];
          const isHovered = hovered === code;
          const polys = feat.geometry.type === "MultiPolygon"
            ? (feat.geometry.coordinates as number[][][][])
            : [feat.geometry.coordinates as number[][][]];

          const density = code ? (REGIONS.find(r => r.code === code)?.population || 0) / (REGIONS.find(r => r.code === code)?.area_km2 || 1) : 0;
          const maxD = 7841;
          const norm = Math.min(density / maxD, 1);
          const opacity = 0.4 + norm * 0.5;

          return polys.map((poly, pi) =>
            poly.map((ring, ri) => (
              <path
                key={`${name}-${pi}-${ri}`}
                d={coordsToPath(ring, bbox, W, H)}
                fill={isHovered ? "var(--color-baobab)" : `rgba(27, 94, 59, ${opacity})`}
                stroke="var(--color-bg)"
                strokeWidth={isHovered ? "2.5" : "1.2"}
                style={{ transition: "fill 0.2s ease, stroke-width 0.15s ease", cursor: "pointer" }}
                onMouseEnter={() => setHovered(code || null)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => code && onSelect?.(code)}
              />
            ))
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <div style={{
          position: "absolute",
          left: `${mousePos.x + 12}px`,
          top: `${mousePos.y - 40}px`,
          backgroundColor: "rgba(28,28,28,0.94)",
          color: "white",
          padding: "8px 14px",
          borderRadius: "var(--radius-sm)",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 10,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{ fontWeight: 600, marginBottom: "2px" }}>{hoveredRegion.name}</div>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>
            {(hoveredRegion.population / 1000000).toFixed(1)} M habitants · RGPH-5 2023
          </div>
        </div>
      )}
    </div>
  );
}
