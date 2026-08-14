const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const doc = new jsPDF({ unit: "mm", format: "a4" });
const pageW = 210;
const margin = 20;
const contentW = pageW - 2 * margin;
let y = 20;

function addPage() {
  doc.addPage();
  y = 20;
}

function title(text, size = 16) {
  if (y > 260) addPage();
  doc.setFontSize(size);
  doc.setFont("helvetica", "bold");
  doc.text(text, margin, y);
  y += size * 0.5 + 4;
}

function subtitle(text) {
  if (y > 260) addPage();
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(text, margin, y);
  y += 8;
}

function body(text) {
  if (y > 265) addPage();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, contentW);
  for (const line of lines) {
    if (y > 275) addPage();
    doc.text(line, margin, y);
    y += 5;
  }
  y += 3;
}

function bullet(text) {
  if (y > 270) addPage();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, contentW - 5);
  doc.text("-", margin, y);
  for (let i = 0; i < lines.length; i++) {
    if (y > 275) addPage();
    doc.text(lines[i], margin + 5, y);
    y += 5;
  }
  y += 1;
}

function separator() {
  y += 3;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;
}

// ====== CONTENU ======

// Page de garde
doc.setFontSize(20);
doc.setFont("helvetica", "bold");
doc.text("Proposition de projet pour le Hackathon", margin, 50);
doc.setFontSize(14);
doc.text("Challenge 20 ans ANSD", margin, 62);

doc.setFontSize(28);
doc.setTextColor(183, 71, 42);
doc.text("Samm Sa Gox", margin, 90);
doc.setFontSize(12);
doc.setFont("helvetica", "normal");
doc.setTextColor(0, 0, 0);
doc.text("Intelligence Territoriale Citoyenne", margin, 100);

doc.setFontSize(10);
doc.text("Diagnostic territorial de chaque commune du Senegal,", margin, 120);
doc.text("en wolof et en francais, sans connexion internet requise.", margin, 127);

doc.setFontSize(9);
doc.setTextColor(100, 100, 100);
doc.text("Equipe : [A COMPLETER]", margin, 160);
doc.text("Date : Aout 2026", margin, 167);
doc.text("Contact : [A COMPLETER]", margin, 174);
doc.setTextColor(0, 0, 0);

// Page 2 - Nom + Objectifs
addPage();
title("1. Nom du projet");
body("Samm Sa Gox — Intelligence Territoriale Citoyenne");
body("(\"Samm Sa Gox\" signifie \"Surveille/Connais ton quartier\" en wolof)");
separator();

title("2. Objectifs du projet");
body("Samm Sa Gox est une application web qui transforme 20 ans de donnees statistiques ANSD en diagnostics territoriaux accessibles a chaque citoyen senegalais, en wolof et en francais, sans connexion internet requise.");
y += 3;
subtitle("Objectifs specifiques :");
bullet("Rendre les statistiques publiques du Senegal accessibles en wolof (88% de locuteurs) et en francais, sous forme de diagnostics territoriaux automatiques pour les 14 regions et 45 departements.");
bullet("Eliminer la barriere technique qui empeche les elus locaux, entrepreneurs et journalistes d'exploiter les donnees ANSD en transformant les publications PDF en donnees structurees interrogeables.");
bullet("Demontrer une architecture de diffusion statistique a cout zero, entierement client-side, reproductible par l'ANSD pour moderniser son infrastructure de diffusion.");
bullet("Fournir un outil de comparaison territoriale permettant aux 559 communes de se situer par rapport aux moyennes nationales et regionales sur les indicateurs cles.");

// Page 3 - Methodologie
addPage();
title("3. Methodologie de travail detaillee");
subtitle("Phase 1 — Collecte et structuration des donnees (Heures 0-12)");
bullet("Extraction des indicateurs via l'API World Bank (1400+ indicateurs, series 1990-2026)");
bullet("Recuperation des limites administratives geoBoundaries (GeoJSON ADM1-ADM3)");
bullet("Extraction des donnees regionales du RGPH 2023 et publications ANSD");
bullet("Conversion en format Parquet optimise pour requetes analytiques");
y += 3;

subtitle("Phase 2 — Moteur analytique (Heures 12-28)");
bullet("Integration de DuckDB WASM pour requetes SQL dans le navigateur");
bullet("Construction des fonctions de diagnostic territorial (rang, comparaison, narratif)");
bullet("Glossaire statistique wolof (50+ termes) et generation de narratifs bilingues");
y += 3;

subtitle("Phase 3 — Interface utilisateur (Heures 28-48)");
bullet("Developpement avec Next.js et Tailwind CSS");
bullet("Carte interactive des regions (coloration par densite)");
bullet("Panneaux de diagnostic, barres de comparaison, graphiques de tendances");
bullet("Recherche avec autocompletion (regions, departements, communes)");
y += 3;

subtitle("Phase 4 — PWA et deploiement (Heures 48-60)");
bullet("Service Worker pour fonctionnement hors-ligne");
bullet("Cache des donnees statiques (Parquet, GeoJSON) dans le navigateur");
bullet("Deploiement sur Vercel (gratuit, CDN global)");
y += 3;

subtitle("Phase 5 — Tests et demo (Heures 60-72)");
bullet("Tests sur mobile et desktop");
bullet("Preparation de scenarios de demonstration");
bullet("Verification offline et optimisation performance");

// Page 4 - Conception
addPage();
title("4. Conception");
subtitle("Architecture technique");
body("Zero serveur. Zero base de donnees. Zero cout d'hebergement.");
y += 2;
body("Toute l'analytique s'execute dans le navigateur de l'utilisateur grace a DuckDB WASM. Les donnees sont stockees en format Parquet sur un CDN gratuit et chargees a la demande. Une fois en cache, l'application fonctionne entierement hors-ligne.");
y += 3;
body("NAVIGATEUR (tout le calcul se fait ici)");
body("  |-- Next.js (interface utilisateur)");
body("  |-- DuckDB WASM (moteur SQL analytique)");
body("  |-- Observable Plot (visualisations)");
body("  |-- Service Worker (cache offline)");
y += 3;
body("CDN GRATUIT (stockage statique uniquement)");
body("  |-- Fichiers Parquet (donnees structurees)");
body("  |-- GeoJSON (limites administratives)");
body("  |-- Assets statiques (JS, CSS, fonts)");
separator();

subtitle("Flux utilisateur");
bullet("L'utilisateur arrive sur l'application -> vue nationale avec indicateurs cles");
bullet("Il recherche ou clique sur une region/departement -> diagnostic instantane");
bullet("Le diagnostic affiche : population, densite, rang, comparaison, narratif wolof/francais");
bullet("Il peut basculer entre wolof et francais a tout moment");
bullet("En mode offline, toutes les fonctionnalites restent accessibles");
bullet("Export PDF du diagnostic pour les dossiers administratifs");

// Page 5 - Outils
addPage();
title("5. Outils et technologies utilises");
y += 2;
const tools = [
  ["Framework frontend", "Next.js 16", "MIT", "0"],
  ["Style", "Tailwind CSS 4", "MIT", "0"],
  ["Moteur analytique", "DuckDB WASM", "MIT", "0"],
  ["Visualisation", "Observable Plot / D3.js", "ISC/BSD", "0"],
  ["Cartographie", "MapLibre GL JS", "BSD", "0"],
  ["Format donnees", "Apache Parquet", "Apache 2.0", "0"],
  ["Offline", "Service Workers", "API navigateur", "0"],
  ["Export PDF", "jsPDF", "MIT", "0"],
  ["Hebergement", "Vercel Free Tier", "—", "0"],
  ["Geo-donnees", "geoBoundaries", "CC-BY 3.0", "0"],
  ["Donnees eco", "API World Bank", "Open", "0"],
];
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
doc.text("Composant", margin, y);
doc.text("Technologie", margin + 40, y);
doc.text("Licence", margin + 95, y);
doc.text("Cout", margin + 130, y);
y += 5;
doc.setFont("helvetica", "normal");
for (const [comp, tech, lic, cost] of tools) {
  doc.text(comp, margin, y);
  doc.text(tech, margin + 40, y);
  doc.text(lic, margin + 95, y);
  doc.text(cost + " FCFA", margin + 130, y);
  y += 5;
}
y += 3;
doc.setFont("helvetica", "bold");
doc.text("COUT TOTAL : 0 FCFA", margin, y);
doc.setFont("helvetica", "normal");

// Page 6 - Deploiement
addPage();
title("6. Methode de deploiement et d'operationnalisation");
subtitle("Deploiement");
bullet("Code source heberge sur GitHub (public)");
bullet("Vercel detecte chaque commit et deploie automatiquement (CI/CD)");
bullet("Fichiers de donnees servis depuis le CDN Vercel (100 GB/mois gratuit)");
bullet("Domaine accessible immediatement");
y += 3;
subtitle("Operationnalisation");
bullet("Mise a jour des donnees : script automatise recupere les derniers indicateurs World Bank. Execution mensuelle via GitHub Actions (gratuit).");
bullet("Ajout de nouvelles sources : les publications ANSD converties en Parquet sont ajoutees au depot sans modification du code.");
bullet("Scalabilite : entierement client-side, supporte un nombre illimite d'utilisateurs sans cout.");
bullet("Maintenance : zero serveur = zero maintenance. Seules les donnees sont a mettre a jour.");
y += 3;
subtitle("Transfert a l'ANSD");
bullet("L'ANSD peut forker le depot GitHub");
bullet("Ajouter ses propres donnees (RGPH 2023, EDS, enquetes menages)");
bullet("Deployer sur sa propre infrastructure ou rester sur Vercel");
bullet("Etendre le glossaire wolof et ajouter d'autres langues nationales");

// Page 7 - Profils
addPage();
title("7. Profils des membres de l'equipe");
y += 3;
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.text("[PRENOM 1] — Lead Developer / Chef de projet", margin, y);
y += 5;
doc.setFont("helvetica", "normal");
doc.text("Developpement fullstack (React, Node.js), architecture cloud, deploiement", margin + 5, y);
y += 10;
doc.setFont("helvetica", "bold");
doc.text("[PRENOM 2] — Data Engineer / Frontend", margin, y);
y += 5;
doc.setFont("helvetica", "normal");
doc.text("Traitement de donnees, visualisation (D3.js), integration API, UX", margin + 5, y);
y += 10;
doc.setFont("helvetica", "bold");
doc.text("[PRENOM 3] — Linguiste / Data Analyst", margin, y);
y += 5;
doc.setFont("helvetica", "normal");
doc.text("Traduction wolof, analyse statistique, tests utilisateurs", margin + 5, y);
separator();

title("8. Livrables attendus");
bullet("Application web fonctionnelle deployee et accessible publiquement");
bullet("Code source complet sur GitHub avec documentation");
bullet("Pipeline de donnees : scripts d'extraction et conversion");
bullet("Glossaire statistique wolof : 50+ termes avec definitions");
bullet("Documentation technique : architecture, guide de contribution");
bullet("PWA installable sur mobile avec fonctionnement offline");
bullet("Export PDF du diagnostic territorial");

// Page 8 - Impact
addPage();
title("9. Impact du projet sur la societe et sur l'ecosysteme des donnees");
subtitle("Impact social direct");
bullet("559 communes pourront generer leur diagnostic territorial sans consultant (economie : 2-5 M FCFA par commune)");
bullet("88% de la population (wolofones) accede pour la premiere fois aux statistiques dans sa langue");
bullet("Journalistes de radios communautaires disposent d'une source de donnees fiable en wolof");
bullet("Entrepreneurs peuvent evaluer le potentiel d'une localite avant d'investir");
y += 3;
subtitle("Impact sur l'ecosysteme des donnees");
bullet("Demonstration de faisabilite : infrastructure de diffusion statistique a cout zero");
bullet("Standard ouvert : architecture reproductible et transposable a d'autres pays africains");
bullet("Pont vers SDMX : donnees Parquet convertibles en flux SDMX");
bullet("Culture data : statistiques accessibles et comprehensibles au niveau local");
y += 3;
subtitle("Alignement priorites nationales");
bullet("Agenda National de Transformation 2050 : transparence et acces a l'information");
bullet("Decentralisation : outillage des collectivites locales avec des donnees actualisees");
bullet("Souverainete numerique : solution 100% open source, hebergeable au Senegal");

// Page 9 - Perspectives
addPage();
title("10. Opportunites et perspectives de developpement");
subtitle("Court terme (3-6 mois)");
bullet("Integration complete des donnees du RGPH 2023");
bullet("Ajout des 559 communes avec donnees detaillees");
bullet("Extension du glossaire a d'autres langues (pulaar, serer, diola, mandingue)");
bullet("Export PDF enrichi pour les dossiers PDC des communes");
y += 3;
subtitle("Moyen terme (6-12 mois)");
bullet("Module de requetes en langage naturel (wolof/francais -> SQL)");
bullet("Donnees thematiques : carte sanitaire, carte scolaire, donnees agricoles");
bullet("API publique SDMX pour interoperabilite");
bullet("Partenariat radios communautaires pour diffusion en wolof");
y += 3;
subtitle("Long terme (12-24 mois)");
bullet("Adoption par l'ANSD comme outil de diffusion complementaire");
bullet("Extension a d'autres pays de l'UEMOA");
bullet("Module de suivi temporel avec alertes automatiques");
bullet("Interface vocale en wolof (modeles ASR Kiriku-Wolof)");
y += 5;
subtitle("Modele de perennisation");
body("Le projet est concu pour etre perenne sans financement : hebergement gratuit (Vercel/Cloudflare), donnees publiques (World Bank API, ANSD), code open source, zero dependance a des services payants.");

// Save
const outPath = path.join(__dirname, "..", "DOSSIER_CANDIDATURE.pdf");
fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
console.log("PDF genere : " + outPath);
