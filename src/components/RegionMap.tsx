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
              paint: { "raster-opacity": 0.08, "raster-saturation": -1 },
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
              ["get", "shapeName"],
              ...REGIONS.flatMap((r) => {
                const density = r.population / r.area_km2;
                const maxDensity = 7841;
                const norm = Math.min(density / maxDensity, 1);
                const red = Math.round(200 + (27 - 200) * norm);
                const green = Math.round(210 + (94 - 210) * norm);
                const blue = Math.round(180 + (59 - 180) * norm);
                const name = Object.entries(NAME_TO_CODE).find(([, c]) => c === r.code)?.[0] || "";
                return [name, `rgb(${red},${green},${blue})`];
              }),
              "#E8E4DC",
            ],
            "fill-opacity": 0.95,
          },
        });

        map.addLayer({
          id: "regions-line",
          type: "line",
          source: "regions",
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 2.5,
          },
        });

        map.addLayer({
          id: "regions-highlight",
          type: "line",
          source: "regions",
          paint: {
            "line-color": "#1C1C1C",
            "line-width": 3,
          },
          filter: ["==", "name", ""],
        });

        map.addLayer({
          id: "regions-labels",
          type: "symbol",
          source: "regions",
          layout: {
            "text-field": ["get", "shapeName"],
            "text-size": 11,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-anchor": "center",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
          },
          paint: {
            "text-color": "#1C1C1C",
            "text-halo-color": "rgba(248,247,244,0.9)",
            "text-halo-width": 1.5,
          },
        });

        setMapLoaded(true);
        mapRef.current = map;
      });

      map.on("mousemove", "regions-fill", (e: any) => {
        if (e.features?.length) {
          const name = e.features[0].properties.shapeName;
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
          const name = e.features[0].properties.shapeName;
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
      ["==", ["get", "shapeName"], selectedName],
      1,
      0.7,
    ]);
  }, [selectedCode, mapLoaded]);

  const hoveredRegion = hovered ? REGIONS.find((r) => r.code === hovered) : null;

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="label-caps">
          {lang === "wol" ? "Nataal gox yi" : "Carte des regions"}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>faible</span>
          <div style={{ width: "40px", height: "4px", background: "linear-gradient(to right, #C8D2B4, #1B5E3B)", borderRadius: "2px" }} />
          <span style={{ fontSize: "9px", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>forte</span>
        </div>
      </div>

      <div style={{ position: "relative", height: "380px" }}>
        {hoveredRegion && (
          <div style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            backgroundColor: "rgba(28,28,28,0.92)",
            color: "white",
            padding: "8px 12px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            zIndex: 10,
            pointerEvents: "none",
            borderRadius: "var(--radius-sm)",
            backdropFilter: "blur(4px)",
          }}>
            <span style={{ fontWeight: 600 }}>{hoveredRegion.name}</span>
            <span style={{ opacity: 0.7, marginLeft: "8px" }}>
              {hoveredRegion.population.toLocaleString("fr-FR")} hab
            </span>
          </div>
        )}
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
