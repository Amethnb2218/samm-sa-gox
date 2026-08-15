# Dossier de candidature — Challenge 20 ans ANSD 2026

---

## Nom du projet

**Sàmm Sa Gox** — Intelligence Territoriale

---

## Slogan

Transformer les statistiques publiques en intelligence territoriale vérifiable.

---

## URL

https://samm-sa-gox.onrender.com

---

## Dépôt source

https://github.com/Amethnb2218/samm-sa-gox

---

## Objectifs du projet

Sàmm Sa Gox est une plateforme web qui transforme les données statistiques publiques de l'ANSD en outil d'intelligence territoriale exploitable par les décideurs, chercheurs, journalistes et citoyens.

**Ce que Sàmm Sa Gox permet :**

1. **Observer** un territoire : population, densité, indicateurs sociaux, alertes prioritaires
2. **Comparer** avec des territoires statistiquement similaires (similarité cosinus sur 6 dimensions)
3. **Expliquer** pourquoi un territoire obtient son score (décomposition transparente de l'IDT)
4. **Simuler** l'impact d'un investissement ou d'une évolution ("Et si...?")
5. **Vérifier** chaque chiffre jusqu'à sa source ANSD (Data Trust Layer)

**Ce que Sàmm Sa Gox n'est pas :**

- Ce n'est pas un dashboard de visualisation générique
- Ce n'est pas un outil d'IA générative
- Ce n'est pas un remplacement des publications ANSD

C'est une couche d'intelligence explicable au-dessus des statistiques publiques.

---

## Innovation

| Aspect | Ce qui existe | Ce que Sàmm Sa Gox apporte |
|---|---|---|
| Accès | PDF statiques | Interface web interactive |
| Langue | Français uniquement | Bilingue français/wolof |
| Traçabilité | Aucune | Chaque chiffre cliquable → source + méthode + statut |
| Comparaison | Manuelle | Moteur automatique de similarité (6 dimensions) |
| Explication | Tableaux bruts | Décomposition transparente des scores |
| Simulation | Inexistante | Scénarios "Et si...?" avec impact quantifié |
| Coût | Consultants externes | 0 FCFA, tout est gratuit et open source |

---

## Données utilisées

### Sources ANSD vérifiées

| Donnée | Source exacte | Statut |
|---|---|---|
| Population 14 régions | RGPH-5 2023, Tableau I-15 | OFFICIEL |
| Population 2013 | RGPHAE 2013 | OFFICIEL |
| Alphabétisation 10+ | RGPH-5 2023, Chapitre 2, Tableau II-5 | OFFICIEL |
| Électricité+solaire par région | RGPH-5 2023, Chapitre 8, Tableau VIII-10 | CALCULÉ |
| Accès eau potable par région | RGPH-5 2023, Chapitre 8, Tableau VIII-12 | CALCULÉ |
| Ménages agricoles national | AGRIDATA/RGPH-5 | OFFICIEL |
| Abattoirs national | AGRIDATA/RGPH-5 | OFFICIEL |
| Foirails national | AGRIDATA/RGPH-5 | OFFICIEL |
| Structure par âge | RGPH-5 2023, Tableau I-15 | OFFICIEL |

### Données estimées (clairement marquées)

| Donnée | Source | Statut affiché |
|---|---|---|
| Postes de santé par région | Estimations carte sanitaire | ESTIMÉ |
| Écoles par région | Estimations carte scolaire | ESTIMÉ |
| Taux de pauvreté | EHCVM 2018-19 | ESTIMÉ |
| Urbanisation par région | Estimations ANSD | ESTIMÉ |

### Principe fondamental

**Aucune donnée inventée.** Chaque valeur est tracée. Les estimations sont marquées ESTIMÉ. Les calculs sont documentés avec leur formule.

---

## Méthodologie — IDT (Indice de Développement Territorial)

Score composite sur 100 points calculé par Sàmm Sa Gox.

**Ne constitue pas un indicateur officiel de l'ANSD.**

### 4 dimensions (25 points chacune)

| Dimension | Indicateur | Normalisation | Source |
|---|---|---|---|
| Santé | Postes sanitaires / 10 000 hab | Ratio vs norme OMS (1.5) | Estimations |
| Éducation | Taux alphabétisation 10+ | Ratio vs objectif 75% | RGPH-5 Chap. 2 |
| Infrastructure | Moy. (eau + électricité) | Ratio vs objectif 95% | RGPH-5 Chap. 8 |
| Économie | Densité + urbanisation | Proxy composite | RGPH-5 |

### Formule

```
IDT = min(25, santé_ratio × 25)
    + min(25, alphabétisation / 75 × 25)
    + min(25, (eau + électricité) / 2 / 95 × 25)
    + min(25, (densité/100 × 0.4 + urbanisation/100 × 0.6) × 25)
```

### Pondérations

Les quatre dimensions sont pondérées équitablement (25% chacune) afin d'éviter d'introduire une hiérarchie arbitraire en l'absence de pondération officielle.

### Limites

- La dimension santé repose sur des estimations (non RGPH-5)
- La dimension économie utilise un proxy (pas de PIB régional disponible)
- Les pondérations égales sont un choix méthodologique assumé

---

## Moteur de similarité

Identifie les territoires statistiquement comparables.

**Méthode** : similarité cosinus sur vecteurs normalisés (min-max)

**6 dimensions** :
1. Densité de population
2. Taux d'urbanisation
3. Ratio jeunes (<15 ans)
4. Taux d'alphabétisation
5. Couverture sanitaire
6. Accès eau potable

**Interprétation** : un score de 95% signifie que deux territoires ont des profils proportionnellement très proches sur ces 6 dimensions.

---

## Architecture technique

```
NAVIGATEUR (tout le calcul)
├── Next.js 16 (interface + routing)
├── 7 moteurs d'analyse
│   ├── territory-engine (orchestrateur)
│   ├── gap-engine (écarts vs normes)
│   ├── similarity-engine (cosinus 6D)
│   ├── explain-engine (décomposition IDT)
│   ├── scenario-engine (simulations)
│   ├── timeline-engine (20 ans)
│   └── source-engine (traçabilité)
├── MapLibre GL JS (carte interactive)
├── Data Trust Layer (confiance)
└── jsPDF (export documents)

HÉBERGEMENT
└── Render.com (Free Tier, auto-deploy)
```

**Coût total : 0 FCFA**

---

## Outils et technologies

| Composant | Technologie | Licence | Coût |
|---|---|---|---|
| Framework | Next.js 16 | MIT | 0 |
| Style | Tailwind CSS 4 | MIT | 0 |
| Cartographie | MapLibre GL JS | BSD | 0 |
| Géographie | geoBoundaries ADM1 | CC-BY | 0 |
| Export PDF | jsPDF | MIT | 0 |
| Hébergement | Render.com Free | — | 0 |
| Données | ANSD, OMS, UNESCO | Public | 0 |

---

## Profils des membres de l'équipe

| Membre | Rôle | Compétences |
|---|---|---|
| Mouhamed | Lead Developer / Data Engineer | Développement fullstack (React, Node.js, Next.js), architecture cloud, traitement de données statistiques |
| [Membre 2] | Frontend / UX | Interface utilisateur, design system, cartographie |
| [Membre 3] | Data Analyst / Linguiste | Analyse statistique, traduction wolof, validation données |

---

## Démonstration (3 minutes)

### Parcours recommandé : Kaffrine

1. **Landing** (5s) — "Transformer les statistiques publiques en intelligence territoriale"
2. **Clic Kaffrine** (15s) — Sélection via carte ou recherche
3. **Observer** (30s) — Population 753k, IDT ~40, alerte électricité 57%
4. **Comparer** (20s) — Tambacounda identifié comme territoire similaire
5. **Expliquer** (25s) — Décomposition 4 dimensions, infrastructure faible
6. **DataProof** (15s) — Clic sur population → source RGPH-5, Tableau I-15
7. **Agir** (25s) — "Et si eau +15 points?" → impact sur IDT
8. **20 ans** (15s) — Évolution nationale avec distinction observé/projeté
9. **Conclusion** (10s) — "Chaque chiffre a une source. Chaque résultat a une méthode."

---

## Impact

- **Décideurs locaux** : diagnostic territorial instantané sans consultant
- **Chercheurs** : données vérifiables avec méthode documentée
- **Journalistes** : chiffres traçables pour l'investigation data
- **Citoyens** : accès en wolof aux statistiques de leur territoire
- **ANSD** : modèle de diffusion statistique innovant et reproductible

---

## Perspectives

- Intégration des rapports régionaux RGPH-5 (14 régions, données détaillées)
- Extension aux 45 départements puis 559 communes
- Ajout de langues nationales (pulaar, serer, diola)
- Partenariat avec les radios communautaires pour diffusion en wolof
- API publique pour interopérabilité

---

## Ce qui différencie Sàmm Sa Gox

Ce n'est pas un dashboard. C'est une chaîne de raisonnement :

**DONNÉE** → **PREUVE** → **COMPARAISON** → **EXPLICATION** → **DÉCISION**

Chaque étape est vérifiable. Chaque chiffre a une source. Chaque résultat a une méthode.
