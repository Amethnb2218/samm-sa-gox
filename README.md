# Sàmm Sa Gox — Intelligence Territoriale

Transformer les statistiques publiques du Sénégal en intelligence territoriale vérifiable.

**Challenge 20 ans ANSD — Hackathon 2026**

**Live** : https://samm-sa-gox.onrender.com

---

## Concept

Sàmm Sa Gox construit une chaîne complète permettant de transformer une statistique publique en raisonnement territorial vérifiable, puis en scénario de décision.

```
DONNÉES ANSD (RGPH-5 2023)
     ↓
DATA TRUST (officiel / calculé / estimé)
     ↓
OBSERVER (diagnostic territorial)
     ↓
COMPARER (similarité cosinus 6 dimensions)
     ↓
EXPLIQUER (décomposition IDT transparente)
     ↓
AGIR (scénarios "Et si...?" + impact IDT)
     ↓
20 ANS (évolution nationale vérifiée)
```

---

## Fonctionnalités

### Observer — Diagnostic territorial
Population, densité, IDT, alertes prioritaires (écarts vs normes OMS/UNESCO/ODD), forces et faiblesses. Bilingue français/wolof.

### Comparer — Territoires similaires
Similarité cosinus sur 6 dimensions normalisées : densité, urbanisation, jeunesse, alphabétisation, couverture sanitaire, accès eau. Affiche les dimensions qui expliquent la similarité.

### Expliquer — Décomposition IDT
Score composite 4×25 points. Chaque dimension décomposée avec source, valeur, objectif et contribution. Disclaimer : "Indice expérimental Sàmm Sa Gox — non officiel ANSD."

### Agir — Scénarios "Et si...?"
4 simulations (eau +15pts, +5 postes santé, +10 écoles, population +10%). Impact mécanique sur l'IDT. Mention : "Simulation statistique — pas une prévision officielle."

### 20 ans — Évolution nationale
6 indicateurs nationaux (2006-2026) avec distinction visuelle entre données observées, estimées et projetées.

### Data Trust Layer
Chaque chiffre est cliquable → fiche preuve : source, publication, tableau, année, méthode, statut, limites.

### Carte interactive
MapLibre GL JS + GeoJSON geoBoundaries ADM1. Choroplèthe densité, 14 régions, hover tooltip, clic pour analyser.

---

## Données intégrées

| Indicateur | Source | Statut |
|---|---|---|
| Population 14 régions | RGPH-5 2023, Tableau I-15 | OFFICIEL |
| Alphabétisation 10+ | RGPH-5 Chap. 2, Tableau II-5 | OFFICIEL |
| Électricité+solaire | RGPH-5 Chap. 8, Tableau VIII-10 | CALCULÉ |
| Accès eau (sources améliorées) | RGPH-5 Chap. 8, Tableau VIII-12 | CALCULÉ |
| Ménages agricoles | AGRIDATA/RGPH-5 | OFFICIEL |
| Santé (postes, médecins) | Estimations | ESTIMÉ |
| Pauvreté | EHCVM | ESTIMÉ |

---

## IDT — Indice de Développement Territorial

Score composite sur 100 points calculé par Sàmm Sa Gox :

| Dimension | Poids | Indicateur | Source |
|---|---|---|---|
| Santé | 25 pts | Postes/10k hab vs norme OMS 1.5 | Estimations |
| Éducation | 25 pts | Alphabétisation 10+ vs objectif 75% | RGPH-5 Chap. 2 |
| Infrastructure | 25 pts | Moy. eau+électricité vs 95% | RGPH-5 Chap. 8 |
| Économie | 25 pts | Densité + urbanisation (proxy) | RGPH-5 |

Pondérations égales : choix assumé en l'absence de pondération officielle.

---

## Stack technique

| Composant | Technologie | Coût |
|---|---|---|
| Framework | Next.js 16 (App Router) | 0 |
| Style | Tailwind CSS 4 | 0 |
| Cartographie | MapLibre GL JS + geoBoundaries | 0 |
| Moteurs | 7 engines (territory, gap, similarity, explain, scenario, timeline, source) | 0 |
| Export PDF | jsPDF | 0 |
| Hébergement | Render (Free Tier) | 0 |
| **Total** | | **0 FCFA** |

---

## Installation

```bash
git clone https://github.com/Amethnb2218/samm-sa-gox.git
cd samm-sa-gox
npm install
npm run dev
```

Ouvrir http://localhost:3000

## Déploiement

Hébergé sur Render.com — auto-deploy depuis `main`.

---

## Limites connues

- Santé/éducation (postes, écoles) : estimations, pas RGPH-5
- Pauvreté : source EHCVM, marqué ESTIMÉ
- Départements : estimations proportionnelles
- Économie IDT : proxy (densité+urbanisation), pas PIB régional
- Séries temporelles régionales : limitées à la population

---

## Licence

MIT
