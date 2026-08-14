"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Lang } from "@/lib/wolof";
import Link from "next/link";

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <div className="flex flex-col h-full">
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <Link
          href="/"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-[var(--font-mono)] flex items-center gap-1 mb-6"
        >
          <span>&larr;</span> Accueil
        </Link>

        <article className="space-y-6">
          <header>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Lu mu tax Samm Sa Gox" : "A propos de Samm Sa Gox"}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Challenge 20 ans ANSD — Hackathon 2026
            </p>
          </header>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-base font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Jafe-jafe bi" : "Le probleme"}
            </h2>
            <p>
              {lang === "wol"
                ? "ANSD di na jox xam-xam yu bari ci reew mi, waaye kenn menul ko jot. Dossiye yi neppewuñu ci PDF, site bi tasaarewul, API amul, te wolof amul ci loxo."
                : "L'ANSD produit des statistiques de qualite mondiale, mais leur acces reste difficile. Les donnees sont emprisonnees dans des PDF, les plateformes de diffusion sont instables, aucune API publique n'existe, et aucune interface n'est disponible en langues nationales."}
            </p>

            <h2 className="text-base font-semibold mt-6" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Njaarig bi" : "La solution"}
            </h2>
            <p>
              {lang === "wol"
                ? "Samm Sa Gox mooy jumtukaay bi di jox nit kii seetu gox gi ci wolof ak ci francais, te dara du fay."
                : "Samm Sa Gox transforme 20 ans de donnees ANSD en diagnostics territoriaux accessibles a chaque citoyen, en wolof et en francais, gratuitement et meme sans connexion internet."}
            </p>

            <h2 className="text-base font-semibold mt-6" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Nan la jottee" : "Comment ca marche"}
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-[var(--color-terracotta)] font-bold data-mono text-xs mt-0.5">01</span>
                <span>{lang === "wol" ? "Seeke sa gox (region, departement)" : "Recherchez votre territoire (region, departement)"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-terracotta)] font-bold data-mono text-xs mt-0.5">02</span>
                <span>{lang === "wol" ? "Am diagnostic bu fees ci sa loxo" : "Obtenez un diagnostic complet instantanement"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-terracotta)] font-bold data-mono text-xs mt-0.5">03</span>
                <span>{lang === "wol" ? "Nettali sa gox ak yeneen gox yi" : "Comparez votre territoire avec les autres"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-terracotta)] font-bold data-mono text-xs mt-0.5">04</span>
                <span>{lang === "wol" ? "Yeb diagnostic bi ci PDF" : "Exportez le diagnostic en PDF pour vos dossiers"}</span>
              </li>
            </ul>

            <h2 className="text-base font-semibold mt-6" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Mbiri teknoloosi" : "Architecture technique"}
            </h2>
            <p>
              {lang === "wol"
                ? "Dara du fay. Serveur amul. Loxo rekk mooy di liggey — navigateur bi mooy di calcule. DuckDB WASM mooy di jottali donnees yi ci biir navigateur bi."
                : "Zero serveur, zero cout. Toute l'analytique SQL s'execute dans votre navigateur grace a DuckDB WASM. Les donnees en format Parquet sont servies depuis un CDN gratuit. Une fois chargees, l'application fonctionne hors-ligne."}
            </p>

            <h2 className="text-base font-semibold mt-6" style={{ fontFamily: "var(--font-serif)" }}>
              {lang === "wol" ? "Jerinju yi" : "Sources de donnees"}
            </h2>
            <ul className="text-sm space-y-1 text-[var(--color-text-muted)]">
              <li>ANSD — Recensement General (RGPHAE 2013), EDS-Continue, IPC</li>
              <li>Banque Mondiale — API World Development Indicators</li>
              <li>geoBoundaries — Limites administratives ADM1-ADM3 (CC-BY)</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
