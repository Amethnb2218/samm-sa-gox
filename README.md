# Sàmm Sa Gox — Comprendre. Comparer. Décider.

Le premier moteur d'intelligence territoriale du Sénégal transformant 20 ans de données ANSD en diagnostics, comparaisons, explications et scénarios d'action — traçables jusqu'à chaque chiffre officiel.

**Challenge 20 ans ANSD — Hackathon 2026**

---

## Concept

Une question → des données ANSD → une réponse territoriale justifiée → une décision.

Le pipeline :

```
DONNÉES ANSD
     ↓
CONFIANCE (officiel / calculé / estimé)
     ↓
COMPARAISON (territoires similaires)
     ↓
ÉCARTS (détection de problèmes)
     ↓
EXPLICATION (pourquoi ce score ?)
     ↓
SCÉNARIOS (et si... ?)
     ↓
ACTION (PDF, recommandations)
```

---

## Fonctionnalités

### 1. Observer — Diagnostic territorial
Fiche complète par région et département. Population, densité, rang national, détection automatique des problèmes prioritaires. Forces et faiblesses identifiées. Narratif en wolof et français.

### 2. Comparer — Territoires similaires
Algorithme de cosine similarity sur 6 dimensions (densité, urbanisation, jeunesse, alphabétisation, couverture sanitaire, accès eau). Identifie les territoires aux caractéristiques comparables et les défis communs.

### 3. Expliquer — Décomposition transparente
Chaque score est décomposé : pourquoi ce résultat ? Combien de points pour chaque facteur ? Quelle source ? Quelle méthodologie ? Pas de boîte noire.

### 4. Agir — Scénarios et PDF
Simulateur "Et si...?" (population +10%, +5 postes de santé, +10 écoles). Générateur de document PDC (5 pages, format officiel). Export PDF prêt pour dépôt en préfecture.

### 5. 20 ans — Évolution temporelle
Comment le territoire a changé depuis la création de l'ANSD. 6 indicateurs nationaux avec évolution et sources datées.

### Data Trust Layer
Chaque chiffre affiche son niveau de confiance :
- **OFFICIEL** — Donnée directe ANSD (RGPH-5, carte sanitaire)
- **CALCULÉ** — Dérivé de données officielles avec formule documentée
- **ESTIMÉ** — Approximation avec limites identifiées

### Moteur de questions guidées
L'utilisateur ne navigue pas dans des menus. Il pose un besoin :
- "Quels sont les principaux problèmes ?"
- "Où investir ?"
- "Quels territoires ressemblent au mien ?"
- "Quels progrès en 20 ans ?"

Le système répond avec les données ANSD.

---

## Stack technique

| Composant | Technologie | Coût |
|-----------|-------------|------|
| Framework | Next.js 16 (App Router) | 0 |
| Style | Tailwind CSS 4 | 0 |
| Cartographie | MapLibre GL JS + geoBoundaries GeoJSON | 0 |
| Moteurs | gap-engine, similarity-engine, explain-engine, scenario-engine, timeline-engine | 0 |
| Export PDF | jsPDF | 0 |
| Agent IA | Groq API (Llama 3.1, gratuit) | 0 |
| Offline | Service Workers (PWA) | 0 |
| Hébergement | Vercel Free Tier | 0 |
| **Total** | | **0 FCFA** |

---

## Sources de données

- **ANSD — RGPH-5 2023** : Population, éducation, habitat, eau, électricité
- **ANSD — Carte sanitaire 2023** : Structures de santé par région
- **ANSD — Carte scolaire 2023** : Établissements par localisation
- **ANSD — Comptes régionaux** : PIB régional
- **OMS** : Normes de couverture sanitaire
- **UNESCO / ODD** : Cibles éducation, eau, énergie

---

## Installation

```bash
git clone https://github.com/Amethnb2218/samm-sa-gox.git
cd samm-sa-gox
npm install
```

## Configuration

Créer `.env.local` :
```
GROQ_API_KEY=votre_cle_groq
```
Clé gratuite : https://console.groq.com/keys (optionnel — le moteur local fonctionne sans)

## Lancement

```bash
npm run dev
```
Ouvrir http://localhost:3000

## Déploiement

```bash
npx vercel --prod
```

---

## Architecture

```
NAVIGATEUR (tout le calcul ici)
├── Next.js (interface + routing)
├── Moteurs d'analyse (7 engines)
│   ├── territory-engine (orchestrateur)
│   ├── gap-engine (détection écarts)
│   ├── similarity-engine (cosine similarity)
│   ├── explain-engine (décomposition scores)
│   ├── scenario-engine (what-if)
│   ├── timeline-engine (20 ans)
│   └── source-engine (traçabilité)
├── confidence.ts (Data Trust Layer)
├── MapLibre GL JS (carte interactive)
├── jsPDF (export documents)
└── Service Worker (cache offline)

CDN GRATUIT
├── GeoJSON (limites ADM1 réelles)
├── JSON (données)
└── Assets (JS, CSS, fonts)
```

---

## Pages

- `/` — Landing page (présentation du projet)
- `/dashboard` — Outil d'analyse principal (Observer, Comparer, Expliquer, Agir, 20 ans)
- `/about` — Informations sur le projet
- `/admin` — Administration (authentification requise)

---

## Licence

MIT
