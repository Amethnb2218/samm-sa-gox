# Proposition de projet pour le Hackathon — Challenge 20 ans ANSD

---

## Nom du projet

**Sàmm Sa Gox** — Intelligence Territoriale Citoyenne

---

## Objectifs du projet

Sàmm Sa Gox est une plateforme web d'aide à la décision qui transforme 20 ans de données statistiques ANSD en diagnostics territoriaux actionnables, accessibles à chaque citoyen sénégalais en wolof et en français, sans connexion internet requise.

**Objectifs spécifiques :**

1. Rendre les statistiques publiques du Sénégal exploitables par les élus locaux, entrepreneurs et journalistes grâce à des diagnostics automatiques pour les 14 régions et 45 départements, en wolof (88% de locuteurs) et en français.

2. Créer un Indice de Développement Territorial (IDT) composite permettant de classer et comparer objectivement les territoires sur 4 dimensions (santé, éducation, économie, infrastructure).

3. Fournir un système d'analyse des écarts par rapport aux normes internationales (OMS, UNESCO, ODD) identifiant les déficits critiques et quantifiant les besoins en infrastructures.

4. Permettre la génération automatique de documents de diagnostic PDC (Plan de Développement Communal) au format officiel, éliminant le recours à un consultant externe (économie de 2 à 5 millions FCFA par commune).

5. Intégrer un agent intelligent bilingue capable de répondre aux questions sur les données en français et en wolof à partir des données réelles.

6. Démontrer une architecture de diffusion statistique à coût zéro, entièrement client-side, reproductible par l'ANSD.

---

## Méthodologie de travail détaillée

### Phase 1 — Collecte et structuration des données (Heures 0-12)

- Extraction des indicateurs via l'API World Bank (14 indicateurs clés, séries temporelles 1990-2025, vérifiés août 2026)
- Récupération des limites administratives geoBoundaries (GeoJSON ADM1, licence CC-BY 3.0, 14 régions)
- Structuration des données régionales ANSD (RGPH 2023, EDS-Continue, IPC)
- Conversion en format JSON optimisé pour chargement client-side

### Phase 2 — Développement des moteurs d'analyse (Heures 12-28)

- Construction du moteur de diagnostic territorial (calcul de rang, comparaison, narratif automatique bilingue)
- Développement de l'Indice de Développement Territorial (IDT) — score composite 0-100
- Implémentation du système d'analyse des écarts (7 normes internationales, détection de déficits)
- Module de projections 2030 par régression linéaire
- Score d'opportunité entrepreneuriale (5 facteurs)
- Simulateur d'impact d'investissement public
- Agent intelligent (LLM Groq gratuit + fallback pattern matching local)

### Phase 3 — Interface utilisateur et cartographie (Heures 28-48)

- Développement de l'interface avec Next.js 16 et Tailwind CSS 4
- Carte interactive MapLibre GL JS avec GeoJSON réel du Sénégal (choroplèthe par densité, labels, tooltip)
- Panneaux de diagnostic avec indicateurs, barres de comparaison, narratifs
- Graphiques de tendances SVG (6 séries temporelles)
- Barre de recherche avec autocomplétion
- Design system sobre et professionnel (Inter + Source Serif, palette terracotta/vert)

### Phase 4 — PWA, export PDF et déploiement (Heures 48-60)

- Générateur de document PDC (PDF professionnel 5 pages, format officiel)
- Configuration du Service Worker pour fonctionnement hors-ligne
- Mise en cache des données statiques
- Déploiement sur Vercel (gratuit, CDN global)
- Switch bilingue français/wolof intégral

### Phase 5 — Tests et préparation démo (Heures 60-72)

- Tests fonctionnels sur navigateurs mobiles et desktop
- Préparation de scénarios de démonstration
- Vérification du fonctionnement offline
- Optimisation du temps de chargement initial

---

## Conception

### Architecture technique

```
NAVIGATEUR (tout le calcul se fait ici)
├── Next.js 16 (interface utilisateur + routing)
├── Moteurs d'analyse (IDT, gap analysis, projections, opportunité)
├── MapLibre GL JS (cartographie interactive)
├── jsPDF (export documents officiels)
├── Agent intelligent (pattern matching local)
└── Service Worker (cache offline)

SERVEUR (API route légère)
└── /api/chat → Groq API (LLM Llama 3.1, gratuit)

CDN GRATUIT (fichiers statiques)
├── GeoJSON (limites administratives réelles)
├── JSON (données World Bank, indicateurs)
└── Assets (JS, CSS, fonts)
```

### Principe fondamental

Zéro serveur dédié. Zéro base de données. Zéro coût d'hébergement.

L'analytique s'exécute dans le navigateur de l'utilisateur. Les données sont des fichiers statiques servis par CDN. L'agent IA utilise Groq (gratuit, illimité) avec fallback local si pas de connexion. Une fois en cache, l'application fonctionne hors-ligne.

### Flux utilisateur

1. L'utilisateur arrive → vue nationale avec indicateurs clés, classement IDT, tendances
2. Il recherche ou clique sur une région → diagnostic complet instantané
3. Il consulte : IDT, analyse des écarts, projections 2030, score d'opportunité
4. Il simule l'impact d'un investissement avec le simulateur interactif
5. Il télécharge le diagnostic PDC au format PDF officiel
6. Il pose des questions à l'agent intelligent en français ou wolof
7. Il bascule entre wolof et français à tout moment
8. En mode offline, toutes les fonctionnalités restent accessibles

---

## Outils et technologies utilisés

| Composant | Technologie | Licence | Coût |
|-----------|-------------|---------|------|
| Framework frontend | Next.js 16 (App Router) | MIT | 0 |
| Style | Tailwind CSS 4 | MIT | 0 |
| Cartographie | MapLibre GL JS + geoBoundaries GeoJSON | BSD / CC-BY | 0 |
| Visualisation | SVG natif + graphiques custom | — | 0 |
| Export PDF | jsPDF | MIT | 0 |
| Agent IA | Groq API (Llama 3.1 70B) | Gratuit | 0 |
| Offline | Service Workers (API navigateur) | — | 0 |
| Hébergement | Vercel Free Tier | — | 0 |
| Données géographiques | geoBoundaries (ADM1) | CC-BY 3.0 | 0 |
| Données économiques | API World Bank | Open Data | 0 |
| Normes référence | OMS, UNESCO, ODD | Public | 0 |
| **Coût total** | | | **0 FCFA** |

---

## Méthode de déploiement et d'opérationnalisation

### Déploiement

1. Le code source est hébergé sur GitHub (public)
2. Vercel détecte automatiquement chaque commit et déploie en production (CI/CD)
3. Les fichiers de données sont servis depuis le CDN Vercel (100 GB/mois gratuit)
4. L'application est accessible immédiatement à une URL publique

### Opérationnalisation

- **Mise à jour des données** : un script (`scripts/fetch-worldbank.js`) récupère les derniers indicateurs. Exécution via GitHub Actions (gratuit).
- **Ajout de nouvelles sources** : les publications ANSD sont converties en JSON et ajoutées au dépôt.
- **Scalabilité** : entièrement client-side, l'application supporte un nombre illimité d'utilisateurs simultanés sans coût supplémentaire.
- **Maintenance** : zéro serveur = zéro maintenance serveur. Seules les données doivent être mises à jour.

### Transfert à l'ANSD

L'architecture a été conçue pour que l'ANSD puisse :
1. Forker le dépôt GitHub
2. Ajouter ses propres données (RGPH 2023, EDS, enquêtes ménages)
3. Déployer sur sa propre infrastructure ou rester sur Vercel
4. Étendre le glossaire wolof et ajouter d'autres langues nationales (pulaar, serer, diola)

---

## Profils des membres de l'équipe

| Membre | Rôle | Compétences |
|--------|------|-------------|
| [PRÉNOM 1] | Lead Developer / Chef de projet | Développement fullstack (React, Node.js), architecture cloud, déploiement |
| [PRÉNOM 2] | Data Engineer / Frontend | Traitement de données, visualisation, intégration API, UX |
| [PRÉNOM 3] | Linguiste / Data Analyst | Traduction wolof, analyse statistique, tests utilisateurs |

---

## Livrables attendus

1. **Application web fonctionnelle** déployée et accessible publiquement
2. **Code source complet** sur GitHub avec documentation
3. **10 modules analytiques** : diagnostic, IDT, gap analysis, projections, opportunité, simulateur, PDC generator, chat IA, carte interactive, tendances
4. **Glossaire statistique wolof** : 50+ termes avec définitions
5. **Générateur PDF** : document PDC officiel téléchargeable
6. **Agent intelligent** bilingue (LLM + données réelles)
7. **PWA installable** sur mobile avec fonctionnement offline
8. **Pipeline de données** : scripts d'extraction World Bank

---

## Impact du projet sur la société et sur l'écosystème des données

### Impact social direct

- **559 communes** peuvent générer leur diagnostic territorial sans consultant (économie estimée : 2-5 millions FCFA par commune, soit 1 à 2.8 milliards FCFA d'économie potentielle)
- **88% de la population** (wolofones) accède pour la première fois aux statistiques publiques dans sa langue maternelle
- **Journalistes de radios communautaires** disposent d'une source fiable et compréhensible
- **Entrepreneurs** évaluent le potentiel de marché d'une localité grâce au score d'opportunité
- **Élus locaux** identifient les déficits critiques grâce à l'analyse des écarts OMS/UNESCO

### Impact sur l'écosystème des données

- **Aide à la décision** : premier système au Sénégal qui transforme les données en recommandations actionnables
- **Indice composite inédit** : l'IDT (Indice de Développement Territorial) n'existe dans aucun outil existant
- **Standard ouvert** : architecture reproductible et transposable à d'autres pays africains
- **Pont vers SDMX** : les données structurées peuvent être converties en flux SDMX
- **Culture data** : rend les statistiques accessibles et compréhensibles au niveau local

### Alignement avec les priorités nationales

- **Agenda National de Transformation 2050** : transparence et accès à l'information
- **Décentralisation (Acte III)** : outillage des collectivités locales avec des données actualisées
- **Souveraineté numérique** : solution 100% open source, hébergeable au Sénégal
- **ODD** : contribution directe aux objectifs 9 (infrastructure), 11 (villes durables), 16 (institutions)

---

## Opportunités et perspectives de développement

### Court terme (3-6 mois post-hackathon)

- Intégration des données complètes du RGPH 2023 à la maille commune
- Ajout des 559 communes avec données détaillées
- Extension du glossaire à d'autres langues nationales (pulaar, serer, diola, mandingue)
- Ajout de données satellites (NDVI, pluviométrie) via Open-Meteo API

### Moyen terme (6-12 mois)

- Intégration de données thématiques : carte sanitaire, carte scolaire, données agricoles
- API publique SDMX pour interopérabilité avec les systèmes internationaux
- Partenariat avec les radios communautaires pour la diffusion des diagnostics en wolof
- Module d'alertes : notifications quand un indicateur dépasse un seuil

### Long terme (12-24 mois)

- Adoption par l'ANSD comme outil officiel de diffusion complémentaire
- Extension à d'autres pays de l'UEMOA utilisant le même modèle
- Interface vocale en wolof (exploitant les modèles ASR Kiriku-Wolof)
- Formation des agents statistiques régionaux

### Modèle de pérennisation

Le projet est conçu pour être pérenne sans financement :
- Hébergement gratuit (Vercel/Cloudflare)
- Données publiques (World Bank API, ANSD, OMS)
- Code open source (communauté de contributeurs)
- Pas de dépendance à des API payantes ou services propriétaires
- Agent IA sur Groq (gratuit, sans limite)
