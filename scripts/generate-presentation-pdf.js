const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const doc = new jsPDF({ unit: "mm", format: "a4" });
const margin = 20;
const pageW = 210;
const contentW = pageW - 2 * margin;
let y = 20;

function addPage() { doc.addPage(); y = 20; }
function checkPage(n = 15) { if (y + n > 275) addPage(); }

function h1(text) {
  checkPage(20);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(183, 71, 42);
  doc.text(text, margin, y);
  y += 10;
  doc.setTextColor(26, 26, 26);
}

function h2(text) {
  checkPage(12);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 26);
  doc.text(text, margin, y);
  y += 8;
}

function h3(text) {
  checkPage(10);
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text(text, margin, y);
  y += 6;
}

function p(text) {
  checkPage(8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  const lines = doc.splitTextToSize(text, contentW);
  for (const line of lines) { checkPage(5); doc.text(line, margin, y); y += 4.8; }
  y += 2;
  doc.setTextColor(26, 26, 26);
}

function bullet(text) {
  checkPage(8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, contentW - 6);
  doc.text("-", margin + 2, y);
  for (let i = 0; i < lines.length; i++) { checkPage(5); doc.text(lines[i], margin + 7, y); y += 4.8; }
  y += 1;
}

function sep() { y += 3; doc.setDrawColor(220, 220, 218); doc.line(margin, y, pageW - margin, y); y += 5; }

// ===================== CONTENU =====================

// PAGE DE GARDE
doc.setFontSize(11);
doc.setFont("helvetica", "normal");
doc.setTextColor(100, 100, 100);
doc.text("CHALLENGE 20 ANS ANSD — HACKATHON 2026", margin, 35);
doc.text("Presentation du projet", margin, 42);

doc.setFontSize(32);
doc.setFont("helvetica", "bold");
doc.setTextColor(183, 71, 42);
doc.text("Samm Sa Gox", margin, 70);

doc.setFontSize(14);
doc.setTextColor(26, 26, 26);
doc.setFont("helvetica", "normal");
doc.text("Intelligence Territoriale Citoyenne", margin, 82);

doc.setFontSize(10);
doc.setTextColor(80, 80, 80);
y = 100;
p("Diagnostic territorial automatique de chaque region et departement du Senegal.");
p("Analyse des ecarts aux normes internationales (OMS, UNESCO, ODD).");
p("Score d'opportunite entrepreneuriale par territoire.");
p("Simulateur d'impact des investissements publics.");
p("Generateur de documents PDC prets pour la prefecture.");
p("Bilingue wolof/francais. Offline. Zero serveur. Zero cout.");

doc.setFontSize(9);
doc.setTextColor(150, 150, 150);
doc.text("Aout 2026", margin, 265);
doc.text("Application web : samm-sa-gox.vercel.app", margin, 271);

// PAGE 2 - LE PROBLEME
addPage();
h1("LE PROBLEME");
sep();
h3("1. Les donnees existent mais sont inaccessibles");
p("L'ANSD est champion africain de la production statistique (score SPI 81.4/100). Mais son site web est en panne (certificat SSL invalide), ses plateformes de diffusion (ANADS, Open Data) sont hors service, et toutes les publications sont en PDF non exploitable.");

h3("2. Zero interface en langues nationales");
p("88% des Senegalais parlent wolof. 100% des statistiques publiques sont en francais technique. Les conseillers municipaux, les journalistes radio, les citoyens sont exclus.");

h3("3. Les elus n'ont pas d'outils");
p("Chaque commune doit produire un Plan de Developpement Communal (PDC) avec diagnostic statistique. Cout actuel : 2-5 millions FCFA de consultant + 3 mois d'attente. Pour 559 communes, c'est 1 a 2.8 milliards FCFA de depenses evitables.");

h3("4. Les entrepreneurs naviguent a l'aveugle");
p("Aucun outil ne permet de connaitre le potentiel economique d'un territoire : densite de population, pouvoir d'achat, infrastructures, lacunes en services. L'information existe mais est emprisonnee.");

// PAGE 3 - LA SOLUTION
addPage();
h1("LA SOLUTION : SAMM SA GOX");
sep();
p("Samm Sa Gox transforme 20 ans de donnees ANSD en intelligence territoriale actionnable. Ce n'est PAS un dashboard. C'est un outil de decision.");
y += 3;

h2("6 modules integres :");
y += 2;

h3("Module 1 — Diagnostic Territorial Automatique");
p("Chaque region et departement dispose d'une fiche complete : population, densite, rang national, comparaison avec la moyenne. Narratif explicatif genere automatiquement en wolof ET en francais.");

h3("Module 2 — Analyse des Ecarts (Gap Analysis)");
p("Compare chaque territoire aux normes internationales : OMS (sante), UNESCO (education), ODD (eau, electricite, pauvrete). Identifie les deficits critiques et quantifie les besoins : 'Il manque 12 postes de sante pour atteindre la norme OMS.'");

h3("Module 3 — Score d'Opportunite Entrepreneuriale");
p("Evalue le potentiel economique de chaque territoire sur 5 facteurs : taille du marche, pouvoir d'achat, infrastructures, lacunes en services, niveau d'education. Score de 0 a 100 avec categorisation.");

h3("Module 4 — Simulateur d'Impact Investissement");
p("L'utilisateur choisit un type d'investissement (sante, education, eau) et voit l'impact immediat : 'Si vous construisez 5 postes de sante, la couverture passe de 0.72 a 0.84 pour 10 000 hab.' Avec estimation du cout.");

h3("Module 5 — Generateur de Document PDC");
p("Genere un PDF officiel de 5 pages : diagnostic complet, analyse des ecarts, recommandations chiffrees. Format pret pour depot en prefecture. Remplace un consultant a 3 millions FCFA.");

h3("Module 6 — Interface Bilingue Wolof/Francais");
p("Tout le contenu est disponible en wolof et en francais. Glossaire de 50+ termes statistiques traduits. Les narratifs sont generes dans les deux langues.");

// PAGE 4 - POUR QUI
addPage();
h1("POUR QUI ?");
sep();

h3("Maires et elus locaux (559 communes)");
bullet("Generer le diagnostic statistique du PDC en 1 clic (gratuit vs 3M FCFA)");
bullet("Identifier les deficits prioritaires pour les demandes de financement");
bullet("Simuler l'impact des investissements avant decision");
bullet("Presenter les donnees en wolof lors des conseils communautaires");

h3("Entrepreneurs et investisseurs");
bullet("Evaluer le potentiel d'un territoire avant implantation");
bullet("Identifier les zones a forte demande non satisfaite (opportunites)");
bullet("Comparer les regions/departements sur des criteres economiques");

h3("Journalistes");
bullet("Acceder aux statistiques en wolof pour les radios communautaires");
bullet("Identifier les territoires en situation critique (sujet d'enquete)");
bullet("Exporter des donnees chiffrees pour articles");

h3("Chercheurs et ONG");
bullet("Acceder a des donnees structurees sans naviguer les PDF ANSD");
bullet("Comparer les territoires sur des indicateurs standardises");
bullet("Utiliser les analyses des ecarts pour cibler les interventions");

h3("ANSD");
bullet("Demonstrateur de ce que pourrait etre l'infrastructure de diffusion moderne");
bullet("Vitrine des 20 ans de donnees produites");
bullet("Modele reproductible (open source, zero cout)");

// PAGE 5 - INNOVATION TECHNIQUE
addPage();
h1("INNOVATION TECHNIQUE");
sep();

h3("Zero serveur — Tout dans le navigateur");
p("DuckDB WASM execute les requetes SQL analytiques directement dans le navigateur de l'utilisateur. Aucun serveur backend, aucune base de donnees, aucun cout de calcul. L'application supporte un nombre illimite d'utilisateurs sans infrastructure.");

h3("Offline-first (PWA)");
p("Service Workers mettent en cache toutes les donnees au premier chargement. L'application fonctionne SANS internet — essentiel pour les zones rurales du Senegal ou la connectivite est intermittente.");

h3("Donnees verifiees Banque Mondiale");
p("14 indicateurs avec series temporelles completes (1990-2025), mis a jour automatiquement via l'API World Bank. Toutes les donnees sont tracables et sourcees.");

h3("Architecture reproductible");
p("Le modele technique (Next.js + DuckDB WASM + Parquet sur CDN) est transposable a n'importe quel pays. Un fork du depot + remplacement des donnees = meme outil pour le Mali, la Cote d'Ivoire, le Burkina Faso.");

h3("Cout total de possession : 0 FCFA");
p("Hebergement Vercel (gratuit), donnees publiques (World Bank API), code open source. Aucune dependance a un service payant. Perenne sans financement.");

// PAGE 6 - DEMONSTRATION
addPage();
h1("SCENARIO DE DEMONSTRATION");
sep();
p("Voici ce que les juges verront en 3 minutes :");
y += 3;

h3("30 secondes — Le probleme");
p("'Le site ansd.sn est en panne. Les donnees sont en PDF. Aucun elu local ne peut y acceder. Samm Sa Gox resout ca.'");

h3("60 secondes — Le diagnostic");
p("Clic sur 'Kedougou' (region la plus defavorisee). Diagnostic instantane : population, densite, rang #14/14. Narrative en wolof. Les juges voient : 'CRITIQUE : il manque 15 postes de sante, 85 ecoles.'");

h3("30 secondes — Le simulateur");
p("'Si on construit 10 postes de sante (450M FCFA), la couverture passe de 0.84 a 1.31 pour 10 000 hab — au-dessus de la norme OMS.' L'elu peut justifier sa demande de budget.");

h3("30 secondes — Le PDF PDC");
p("Clic sur 'Generer diagnostic PDC'. Un PDF de 5 pages se telecharge. Format officiel. Pret pour la prefecture. Gratuit. Ce document remplace un consultant a 3 millions.");

h3("30 secondes — Offline + Wolof");
p("Couper le wifi. L'app fonctionne toujours. Basculer en wolof. Tout est traduit. '88% des Senegalais peuvent enfin lire les statistiques de leur pays.'");

// PAGE 7 - IMPACT CHIFFRE
addPage();
h1("IMPACT CHIFFRE");
sep();

h3("Economie directe");
bullet("559 communes x 3M FCFA (cout consultant PDC) = 1.68 milliard FCFA d'economie potentielle");
bullet("Temps divise par 90 (3 mois -> 1 jour pour un diagnostic)");

h3("Inclusion");
bullet("88% de la population (wolofones) accede pour la premiere fois aux statistiques");
bullet("Offline : zones rurales incluses meme sans internet stable");

h3("Transparence");
bullet("Chaque citoyen peut verifier les donnees de sa commune");
bullet("Comparaison inter-territoriale transparente (rang national)");

h3("Aide a la decision");
bullet("Simulateur d'impact quantifie les resultats AVANT l'investissement");
bullet("Gap analysis oriente les priorites budgetaires");

h3("Reproductibilite");
bullet("Open source, zero cout, transposable a toute l'UEMOA");
bullet("L'ANSD peut l'adopter comme outil officiel de diffusion");

// DERNIERE PAGE
addPage();
h1("RESUME");
sep();
y += 5;

doc.setFontSize(11);
doc.setFont("helvetica", "bold");
const resumeLines = [
  "Samm Sa Gox n'est pas un dashboard.",
  "",
  "C'est l'outil que chaque maire utilise pour generer son PDC.",
  "C'est l'outil que chaque entrepreneur consulte avant d'investir.",
  "C'est l'outil que chaque journaliste wolof utilise pour informer.",
  "C'est l'outil que l'ANSD montre comme vitrine de 20 ans de travail.",
  "",
  "Zero serveur. Zero cout. Wolof. Offline.",
  "Indispensable.",
];
for (const line of resumeLines) {
  doc.text(line, margin, y);
  y += 7;
}

// Footer on all pages
const pages = doc.getNumberOfPages();
for (let i = 1; i <= pages; i++) {
  doc.setPage(i);
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Samm Sa Gox — Presentation projet | Page ${i}/${pages}`, margin, 290);
}

const outPath = path.join(__dirname, "..", "PRESENTATION_SAMM_SA_GOX.pdf");
fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
console.log("PDF genere : " + outPath);
