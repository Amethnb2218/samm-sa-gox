"use client";

import { useEffect, useRef, useState } from "react";
import { REGIONS } from "@/lib/data";
import { Lang } from "@/lib/wolof";

interface RegionMapProps {
  selectedCode: string | null;
  onSelect: (code: string) => void;
  lang?: Lang;
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

export default function RegionMap({ selectedCode, onSelect, lang = "fr" }: RegionMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let cancelled = false;

    async function initMap() {
      // @ts-ignore - dynamic import for maplibre
      const maplibreModule = await import("maplibre-gl");
      const maplibregl = (maplibreModule as any).default || maplibreModule;
      await import("maplibre-gl/dist/maplibre-gl.css");

      if (cancelled || !mapContainer.current) return;

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap",
            },
          },
          layers: [
            {
              id: "osm-tiles",
              type: "raster",
              source: "osm",
              paint: { "raster-opacity": 0.3, "raster-saturation": -0.8 },
            },
          ],
        },
        center: [-14.5, 14.5],
        zoom: 5.8,
        maxZoom: 9,
        minZoom: 5,
        attributionControl: false,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        if (cancelled) return;

        map.addSource("regions", {
          type: "geojson",
          data: "/data/senegal-regions.geojson",
        });

        map.addLayer({
          id: "regions-fill",
          type: "fill",
          source: "regions",
          paint: {
            "fill-color": [
              "match",
              ["get", "name"],
              ...REGIONS.flatMap((r) => {
                const density = r.population / r.area_km2;
                const maxDensity = 7841;
                const norm = Math.min(density / maxDensity, 1);
                const red = Math.round(197 + (183 - 197) * norm);
                const green = Math.round(168 + (71 - 168) * norm);
                const blue = Math.round(125 + (42 - 125) * norm);
                const name = Object.entries(NAME_TO_CODE).find(([, c]) => c === r.code)?.[0] || "";
                return [name, `rgb(${red},${green},${blue})`];
              }),
              "#E5E5E3",
            ],
            "fill-opacity": 0.85,
          },
        });

        map.addLayer({
          id: "regions-line",
          type: "line",
          source: "regions",
          paint: {
            "line-color": "#FAFAF8",
            "line-width": 1.5,
          },
        });

        map.addLayer({
          id: "regions-highlight",
          type: "line",
          source: "regions",
          paint: {
            "line-color": "#1A1A1A",
            "line-width": 2.5,
          },
          filter: ["==", "name", ""],
        });

        map.addLayer({
          id: "regions-labels",
          type: "symbol",
          source: "regions",
          layout: {
            "text-field": ["get", "name"],
            "text-size": 11,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-anchor": "center",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
          },
          paint: {
            "text-color": "#1A1A1A",
            "text-halo-color": "rgba(255,255,255,0.9)",
            "text-halo-width": 1.5,
          },
        });

        setMapLoaded(true);
        mapRef.current = map;
      });

      map.on("mousemove", "regions-fill", (e: any) => {
        if (e.features?.length) {
          const name = e.features[0].properties.name;
          const code = NAME_TO_CODE[name];
          setHovered(code || null);
          map.setFilter("regions-highlight", ["==", "name", name]);
          map.getCanvas().style.cursor = "pointer";
        }
      });

      map.on("mouseleave", "regions-fill", () => {
        setHovered(null);
        map.setFilter("regions-highlight", ["==", "name", ""]);
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "regions-fill", (e: any) => {
        if (e.features?.length) {
          const name = e.features[0].properties.name;
          const code = NAME_TO_CODE[name];
          if (code) onSelect(code);
        }
      });
    }

    initMap();
    return () => { cancelled = true; };
  }, [onSelect]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const selectedName = selectedCode
      ? Object.entries(NAME_TO_CODE).find(([, c]) => c === selectedCode)?.[0] || ""
      : "";
    mapRef.current.setPaintProperty("regions-fill", "fill-opacity", [
      "case",
      ["==", ["get", "name"], selectedName],
      1,
      0.7,
    ]);
  }, [selectedCode, mapLoaded]);

  const hoveredRegion = hovered ? REGIONS.find((r) => r.code === hovered) : null;

  return (
    <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", margin: 0 }}>
          {lang === "wol" ? "Nataal gox yi" : "Carte des régions"}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>faible</span>
          <div style={{ width: "48px", height: "6px", background: "linear-gradient(to right, #C5A87D, #B7472A)", borderRadius: "1px" }} />
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>forte</span>
        </div>
      </div>

      <div style={{ position: "relative", height: "320px" }}>
        {hoveredRegion && (
          <div style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            backgroundColor: "rgba(26,26,26,0.92)",
            color: "white",
            padding: "6px 12px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            zIndex: 10,
            pointerEvents: "none",
          }}>
            <span style={{ fontWeight: 600 }}>{hoveredRegion.name}</span>
            <span style={{ opacity: 0.7, marginLeft: "8px" }}>
              {hoveredRegion.population.toLocaleString("fr-FR")} hab · {Math.round(hoveredRegion.population / hoveredRegion.area_km2)} hab/km²
            </span>
          </div>
        )}
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
