# Sàmm Sa Gox — Intelligence Territoriale Citoyenne

Plateforme de diagnostic territorial pour les 14 régions et 45 départements du Sénégal.  
Bilingue wolof/français. Fonctionne hors-ligne. Zéro serveur. Zéro coût.

**Challenge 20 ans ANSD — Hackathon 2026**

---

## Fonctionnalités

### Diagnostic Territorial
Fiche complète par région et département : population, densité, rang national, comparaison avec la moyenne nationale. Narratif explicatif généré automatiquement en wolof et en français.

### Indice de Développement Territorial (IDT)
Score composite 0-100 basé sur 4 dimensions (santé, éducation, économie, infrastructure). Méthodologie PNUD adaptée. Classement des 14 régions.

### Analyse des Écarts (Gap Analysis)
Compare chaque territoire aux normes internationales OMS, UNESCO et ODD. Identifie les déficits critiques et quantifie les besoins.

### Projections 2030
Régression linéaire sur données historiques. Projette les besoins futurs en postes de santé, écoles, et infrastructures.

### Score d'Opportunité Entrepreneuriale
Évalue le potentiel économique sur 5 facteurs : taille du marché, pouvoir d'achat, infrastructures, lacunes en services, niveau d'éducation.

### Simulateur d'Impact
Simule l'effet d'un investissement public (santé, éducation, eau) avec estimation du coût et mesure de l'impact sur les indicateurs.

### Générateur de Document PDC
Génère un PDF de 5 pages au format officiel, prêt pour dépôt en préfecture. Inclut diagnostic, analyse des écarts, et recommandations.

### Agent Intelligent (Chat-to-Data)
Interrogez les données en français ou en wolof. Répond avec des chiffres réels. Motorisé par Groq (Llama 3.1, gratuit) avec fallback local.

### PWA Offline
Installable sur mobile. Fonctionne sans connexion internet après le premier chargement.

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router) |
| Style | Tailwind CSS 4 |
| Analytique | DuckDB WASM (client-side) |
| Visualisation | SVG natif + graphiques custom |
| LLM | Groq API (Llama 3.1, gratuit) |
| Export PDF | jsPDF |
| Offline | Service Workers (PWA) |
| Hébergement | Vercel (gratuit) |

---

## Installation

```bash
git clone https://github.com/[VOTRE-REPO]/samm-sa-gox.git
cd samm-sa-gox
npm install
```

## Configuration

Créer un fichier `.env.local` :

```
GROQ_API_KEY=votre_cle_groq
```

Obtenir une clé gratuite : https://console.groq.com/keys

L'agent intelligent fonctionne sans clé (fallback sur le moteur local), mais avec la clé il répond à toute question.

## Lancement

```bash
npm run dev
```

Ouvrir http://localhost:3000

## Mise à jour des données

```bash
node scripts/fetch-worldbank.js
```

## Déploiement

```bash
npx vercel --prod
```

Ou connecter le dépôt GitHub à Vercel pour déploiement automatique à chaque commit.

---

## Sources de données

- **ANSD** — RGPH 2023, EDS-Continue, IPC mensuel
- **Banque Mondiale** — API World Development Indicators (14 indicateurs, séries 1990-2025)
- **geoBoundaries** — Limites administratives ADM1-ADM3 (CC-BY 3.0)
- **OMS / UNESCO / ODD** — Normes de référence pour l'analyse des écarts

---

## Architecture

```
NAVIGATEUR (tout le calcul se fait ici)
├── Next.js (interface utilisateur)
├── DuckDB WASM (moteur SQL analytique)
├── Service Worker (cache offline)
└── Moteur de chat local (pattern matching)

SERVEUR (API route légère)
└── /api/chat → Groq API (LLM gratuit)

CDN GRATUIT (fichiers statiques)
├── GeoJSON (limites administratives)
├── JSON (données World Bank)
└── Assets (JS, CSS, fonts)
```

---

## Coût total : 0 FCFA

Hébergement Vercel gratuit, API Groq gratuite, données publiques, code open source.

---

## Licence

MIT
