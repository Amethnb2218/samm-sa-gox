"use client";

import { useEffect, useRef } from "react";
import { Lang } from "@/lib/wolof";

interface DataPoint {
  year: number;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  label: string;
  unit: string;
  lang: Lang;
  color?: string;
}

export default function TrendChart({
  data,
  label,
  unit,
  lang,
  color = "var(--color-terracotta)",
}: TrendChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length < 2) return;

    const svg = svgRef.current;
    const width = svg.clientWidth || 300;
    const height = 120;
    const padding = { top: 10, right: 10, bottom: 20, left: 40 };
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    const minY = Math.min(...data.map((d) => d.value));
    const maxY = Math.max(...data.map((d) => d.value));
    const minX = Math.min(...data.map((d) => d.year));
    const maxX = Math.max(...data.map((d) => d.year));

    const scaleX = (year: number) => padding.left + ((year - minX) / (maxX - minX)) * innerW;
    const scaleY = (val: number) => padding.top + innerH - ((val - minY) / (maxY - minY || 1)) * innerH;

    const pathD = data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${scaleX(d.year)} ${scaleY(d.value)}`)
      .join(" ");

    svg.innerHTML = "";

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);

    // Y axis labels
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const val = minY + ((maxY - minY) / steps) * i;
      const y = scaleY(val);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(padding.left - 5));
      text.setAttribute("y", String(y + 3));
      text.setAttribute("text-anchor", "end");
      text.setAttribute("font-size", "8");
      text.setAttribute("fill", "#6B7280");
      text.setAttribute("font-family", "var(--font-mono)");
      text.textContent = val.toFixed(val > 100 ? 0 : 1);
      svg.appendChild(text);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(padding.left));
      line.setAttribute("x2", String(width - padding.right));
      line.setAttribute("y1", String(y));
      line.setAttribute("y2", String(y));
      line.setAttribute("stroke", "#E5E5E3");
      line.setAttribute("stroke-width", "0.5");
      svg.appendChild(line);
    }

    // X axis labels
    const yearStep = Math.ceil((maxX - minX) / 5);
    for (let year = minX; year <= maxX; year += yearStep) {
      const x = scaleX(year);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(x));
      text.setAttribute("y", String(height - 3));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "8");
      text.setAttribute("fill", "#6B7280");
      text.setAttribute("font-family", "var(--font-mono)");
      text.textContent = String(year);
      svg.appendChild(text);
    }

    // Line path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "1.5");
    svg.appendChild(path);

    // Latest value dot
    const last = data[data.length - 1];
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(scaleX(last.year)));
    circle.setAttribute("cy", String(scaleY(last.value)));
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", color);
    svg.appendChild(circle);
  }, [data, color]);

  if (data.length < 2) return null;

  const latest = data[data.length - 1];

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="px-4 py-2 border-b border-[var(--color-border)] flex items-baseline justify-between">
        <span className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider">
          {label}
        </span>
        <span className="data-mono text-sm font-semibold">
          {latest.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
          <span className="text-[10px] text-[var(--color-text-muted)] ml-1">{unit} ({latest.year})</span>
        </span>
      </div>
      <div className="px-2 py-2">
        <svg ref={svgRef} width="100%" height="120" className="overflow-visible" />
      </div>
    </div>
  );
}
