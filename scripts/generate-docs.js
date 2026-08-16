const { jsPDF } = require("jspdf");
const { applyPlugin } = require("jspdf-autotable");
applyPlugin(jsPDF);
const path = require("path");

// === DOCUMENT 1: RESUME ===
function generateResume() {
  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("SAMM SA GOX", 105, y, { align: "center" });
  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Intelligence Territoriale du Senegal", 105, y, { align: "center" });
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Challenge 20 ans ANSD - Hackathon 2026 | EQUIPE_N_309", 105, y, { align: "center" });
  doc.setTextColor(0);
  y += 12;

  doc.setDrawColor(27, 94, 59);
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
  y += 10;

  // Probleme
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("1. PROBLEME", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const prob = doc.splitTextToSize("L'ANSD produit des statistiques de qualite internationale (RGPH-5 2023, EDS, EHCVM), mais leur exploitation par les decideurs locaux, chercheurs et citoyens reste limitee. Les donnees sont dispersees dans des PDF, sans interface unifiee ni outil d'analyse territoriale accessible.", 170);
  doc.text(prob, 20, y);
  y += prob.length * 5 + 6;

  // Solution
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("2. SOLUTION", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const sol = doc.splitTextToSize("Samm Sa Gox transforme les statistiques publiques du Senegal en intelligence territoriale verifiable. Le parcours : OBSERVER (diagnostic) -> COMPARER (territoires similaires) -> EXPLIQUER (decomposition IDT) -> AGIR (scenarios 'Et si...?'). Chaque chiffre est trace jusqu'a sa source ANSD.", 170);
  doc.text(sol, 20, y);
  y += sol.length * 5 + 6;

  // Innovation
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("3. INNOVATION", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const inno = [
    "- Data Trust Layer : chaque donnee est classee OFFICIEL / CALCULE / ESTIME / INDISPONIBLE",
    "- IDT (Indice de Developpement Territorial) : score 4x25 pts, transparent et reproductible",
    "- Moteur de similarite : cosinus sur 6 dimensions normalisees",
    "- Scenarios : simulation d'impact sur l'IDT, clairement marques comme non-predictifs",
    "- Bilingue francais/wolof",
    "- Zero serveur, zero cout, code source ouvert",
  ];
  inno.forEach(line => { doc.text(line, 20, y); y += 5; });
  y += 6;

  // Donnees
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("4. DONNEES ANSD UTILISEES", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.autoTable({
    startY: y,
    head: [["Indicateur", "Source", "Statut"]],
    body: [
      ["Population 14 regions", "RGPH-5 2023, Tableau I-15", "OFFICIEL"],
      ["Alphabetisation 10+", "RGPH-5 Chap.2, Tableau II-5", "OFFICIEL"],
      ["Electricite + solaire", "RGPH-5 Chap.8, Tableau VIII-10", "CALCULE"],
      ["Acces eau potable", "RGPH-5 Chap.8, Tableau VIII-12", "CALCULE"],
      ["Menages agricoles", "AGRIDATA / RGPH-5", "OFFICIEL"],
      ["Sante (postes, medecins)", "Estimations", "ESTIME"],
      ["Pauvrete", "EHCVM 2018-19", "ESTIME"],
    ],
    theme: "grid",
    headStyles: { fillColor: [27, 94, 59], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 20, right: 20 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Architecture
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("5. ARCHITECTURE TECHNIQUE", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const arch = [
    "- Framework : Next.js 16 (App Router) + Tailwind CSS 4",
    "- Cartographie : MapLibre GL JS + geoBoundaries ADM1",
    "- 7 moteurs analytiques : territory, gap, similarity, explain, scenario, timeline, source",
    "- Export PDF : jsPDF",
    "- Hebergement : Render.com (Free Tier, auto-deploy)",
    "- Cout total : 0 FCFA",
  ];
  arch.forEach(line => { doc.text(line, 20, y); y += 5; });
  y += 6;

  // URL
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("6. ACCES", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Application : https://samm-sa-gox.onrender.com", 20, y);
  y += 5;
  doc.text("Code source : https://github.com/Amethnb2218/samm-sa-gox", 20, y);
  y += 10;

  // Demo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("7. DEMO RECOMMANDEE (3 min)", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const demo = [
    "1. Landing -> 'Explorer les territoires'",
    "2. Selectionner KAFFRINE (electricite 57%, eau 97%, pauvrete 62%)",
    "3. OBSERVER : population, IDT, alertes prioritaires",
    "4. COMPARER : Tambacounda identifie comme territoire similaire",
    "5. EXPLIQUER : decomposition IDT 4 dimensions avec sources",
    "6. DATA PROOF : clic sur population -> source RGPH-5, Tableau I-15",
    "7. AGIR : scenario 'Et si acces eau +15 points?' -> impact IDT",
    "8. 20 ANS : evolution nationale avec distinction observe/projete",
  ];
  demo.forEach(line => { doc.text(line, 20, y); y += 5; });

  doc.save(path.join(__dirname, "..", "RESUME_SAMM_SA_GOX.pdf"));
  console.log("RESUME_SAMM_SA_GOX.pdf genere");
}

// === DOCUMENT 2: DONNEES ===
function generateDonnees() {
  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SAMM SA GOX - SOURCES DE DONNEES", 105, y, { align: "center" });
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Inventaire complet des sources utilisees | Challenge 20 ans ANSD 2026", 105, y, { align: "center" });
  doc.setTextColor(0);
  y += 10;
  doc.setDrawColor(27, 94, 59);
  doc.line(20, y, 190, y);
  y += 10;

  // Principe
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("PRINCIPE FONDAMENTAL", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const princ = doc.splitTextToSize("Aucune donnee n'est inventee. Chaque valeur est classee selon son statut : OFFICIEL (publiee par l'ANSD), CALCULE (derivee de donnees officielles avec formule documentee), ESTIME (approximation avec limites identifiees), INDISPONIBLE (non publiee).", 170);
  doc.text(princ, 20, y);
  y += princ.length * 5 + 8;

  // Table principale
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DONNEES REGIONALES (14 REGIONS)", 20, y);
  y += 5;

  doc.autoTable({
    startY: y,
    head: [["Indicateur", "Source", "Publication", "Tableau", "Annee", "Statut"]],
    body: [
      ["Population", "ANSD", "RGPH-5 2023", "I-15", "2023", "OFFICIEL"],
      ["Superficie", "geoBoundaries", "ADM1 Senegal", "-", "2023", "OFFICIEL"],
      ["Alphabetisation 10+", "ANSD", "RGPH-5 Chap. 2", "II-5", "2023", "OFFICIEL"],
      ["Electricite (reseau+solaire)", "ANSD", "RGPH-5 Chap. 8", "VIII-10", "2023", "CALCULE"],
      ["Acces eau (sources ameliorees)", "ANSD", "RGPH-5 Chap. 8", "VIII-12", "2023", "CALCULE"],
      ["Population 2013", "ANSD", "RGPHAE 2013", "-", "2013", "OFFICIEL"],
      ["Structure par age", "ANSD", "RGPH-5 2023", "I-15", "2023", "OFFICIEL"],
      ["Menages agricoles", "ANSD", "AGRIDATA", "-", "2023", "OFFICIEL"],
      ["Abattoirs", "ANSD", "AGRIDATA", "-", "2023", "OFFICIEL"],
      ["Foirails", "ANSD", "AGRIDATA", "-", "2023", "OFFICIEL"],
      ["Postes de sante", "Estimations", "Carte sanitaire", "-", "2023", "ESTIME"],
      ["Medecins", "Estimations", "Carte sanitaire", "-", "2023", "ESTIME"],
      ["Ecoles", "Estimations", "Carte scolaire", "-", "2023", "ESTIME"],
      ["Taux pauvrete", "ANSD", "EHCVM 2018-19", "-", "2019", "ESTIME"],
      ["Urbanisation", "ANSD", "Estimations RGPH", "-", "2023", "ESTIME"],
    ],
    theme: "grid",
    headStyles: { fillColor: [27, 94, 59], fontSize: 7 },
    bodyStyles: { fontSize: 7 },
    columnStyles: { 0: { cellWidth: 35 }, 5: { cellWidth: 18 } },
    margin: { left: 15, right: 15 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Methodes de calcul
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("METHODES DE CALCUL", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const methods = [
    "ELECTRICITE = colonne 'Electricite' + colonne 'Solaire' du Tableau VIII-10",
    "EAU = somme des 6 categories de sources ameliorees du Tableau VIII-12 :",
    "  (robinet logement + robinet cour + robinet voisin + robinet public + puits forage + puits protege)",
    "DENSITE = Population RGPH-5 / Superficie geoBoundaries",
    "",
    "IDT (Indice de Developpement Territorial) :",
    "  Sante = min(25, postes_10k_hab / 1.5 * 25)",
    "  Education = min(25, alphabetisation / 75 * 25)",
    "  Infrastructure = min(25, (eau + electricite) / 2 / 95 * 25)",
    "  Economie = min(25, (densite/100*0.4 + urbanisation/100*0.6) * 25)",
    "  IDT = Sante + Education + Infrastructure + Economie (max 100)",
    "",
    "SIMILARITE = cosinus(vecteur_A, vecteur_B) sur 6 dimensions normalisees min-max",
    "  Dimensions : densite, urbanisation, jeunesse, alphabetisation, sante, eau",
  ];
  methods.forEach(line => { doc.text(line, 20, y); y += 4.5; });
  y += 8;

  // Timeline
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DONNEES TEMPORELLES NATIONALES (20 ANS)", 20, y);
  y += 5;

  doc.autoTable({
    startY: y,
    head: [["Indicateur", "Annees", "Sources", "Statut"]],
    body: [
      ["Population", "2006-2026", "RGPH-3, RGPHAE 2013, RGPH-5 2023, projections", "OFFICIEL + PROJETE"],
      ["Scolarisation", "2006-2023", "Enquetes menages, EDS, RGPH", "OFFICIEL"],
      ["Urbanisation", "2006-2026", "RGPH + estimations ANSD", "OFFICIEL + ESTIME"],
      ["Acces eau", "2006-2023", "Enquetes menages, EDS, RGPH", "OFFICIEL"],
      ["Acces electricite", "2006-2026", "ANSD + Senelec", "OFFICIEL + ESTIME"],
      ["Pauvrete", "2006-2024", "ESPS, EHCVM", "OFFICIEL + ESTIME"],
    ],
    theme: "grid",
    headStyles: { fillColor: [27, 94, 59], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 20, right: 20 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Normes
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("NORMES DE REFERENCE", 20, y);
  y += 5;

  doc.autoTable({
    startY: y,
    head: [["Norme", "Valeur", "Source"]],
    body: [
      ["Postes sante / 10 000 hab", "1.0 minimum", "OMS"],
      ["Medecins / 10 000 hab", "1.0 minimum", "OMS"],
      ["Ecoles / 5 000 hab", "1.0 minimum", "UNESCO"],
      ["Alphabetisation", "75%", "ODD 4"],
      ["Acces electricite", "100%", "ODD 7"],
      ["Acces eau potable", "100%", "ODD 6"],
      ["Taux pauvrete", "< 10%", "ODD 1"],
    ],
    theme: "grid",
    headStyles: { fillColor: [27, 94, 59], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 20, right: 20 },
  });

  doc.save(path.join(__dirname, "..", "DONNEES_SAMM_SA_GOX.pdf"));
  console.log("DONNEES_SAMM_SA_GOX.pdf genere");
}

generateResume();
generateDonnees();
console.log("Documents generes avec succes.");
