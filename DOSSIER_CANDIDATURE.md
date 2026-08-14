# Proposition de projet pour le Hackathon — Challenge 20 ans ANSD

---

## Nom du projet

**Samm Sa Gox** — Intelligence Territoriale Citoyenne

---

## Objectifs du projet

Samm Sa Gox est une application web qui transforme 20 ans de donnees statistiques ANSD en diagnostics territoriaux accessibles a chaque citoyen senegalais, en wolof et en francais, sans connexion internet requise.

**Objectifs specifiques :**

1. Rendre les statistiques publiques du Senegal accessibles en wolof (88% de locuteurs) et en francais, sous forme de diagnostics territoriaux automatiques pour les 14 regions et 45 departements.

2. Eliminer la barriere technique qui empeche les elus locaux, entrepreneurs et journalistes d'exploiter les donnees ANSD en transformant les publications PDF en donnees structurees interrogeables.

3. Demontrer une architecture de diffusion statistique a cout zero, entierement client-side, reproductible par l'ANSD pour moderniser son infrastructure de diffusion.

4. Fournir un outil de comparaison territoriale permettant aux 559 communes de se situer par rapport aux moyennes nationales et regionales sur les indicateurs cles (demographie, sante, education, economie).

---

## Methodologie de travail detaillee

### Phase 1 — Collecte et structuration des donnees (Heures 0-12)

- Extraction des indicateurs via l'API World Bank (1400+ indicateurs, series temporelles 1990-2025)
- Recuperation des limites administratives geoBoundaries (GeoJSON ADM1-ADM3, licence CC-BY)
- Extraction des donnees regionales/departementales des publications ANSD (RGPHAE 2013, EDS-Continue, IPC)
- Conversion en format Parquet optimise pour requetes analytiques

### Phase 2 — Developpement du moteur analytique (Heures 12-28)

- Integration de DuckDB WASM pour l'execution de requetes SQL directement dans le navigateur
- Construction des fonctions de diagnostic territorial (calcul de rang, comparaison, narratif automatique)
- Implementation du glossaire statistique wolof (50+ termes) et du systeme de generation de narratifs bilingues

### Phase 3 — Interface utilisateur (Heures 28-48)

- Developpement de l'interface avec Next.js et Tailwind CSS
- Carte interactive des regions avec coloration par densite
- Panneaux de diagnostic avec indicateurs, barres de comparaison, et narratifs
- Barre de recherche avec autocompletion (regions, departements, communes)

### Phase 4 — PWA et deploiement (Heures 48-60)

- Configuration du Service Worker pour le fonctionnement hors-ligne
- Mise en cache des donnees statiques (Parquet, GeoJSON) dans le navigateur
- Deploiement sur Vercel (gratuit, CDN global)
- Tests de performance sur connexions lentes (3G)

### Phase 5 — Tests et preparation demo (Heures 60-72)

- Tests fonctionnels sur navigateurs mobiles et desktop
- Preparation de 3 scenarios de demonstration
- Verification du fonctionnement offline
- Optimisation du temps de chargement initial

---

## Conception

### Architecture technique

```
NAVIGATEUR (tout le calcul se fait ici)
├── Next.js (interface utilisateur)
├── DuckDB WASM (moteur SQL analytique)
├── Observable Plot (visualisations)
├── MapLibre GL (cartographie)
└── Service Worker (cache offline)

CDN GRATUIT (stockage statique uniquement)
├── Fichiers Parquet (donnees structurees)
├── GeoJSON (limites administratives)
└── Assets statiques (JS, CSS, fonts)
```

### Principe fondamental

Zero serveur. Zero base de donnees. Zero cout d'hebergement.

Toute l'analytique s'execute dans le navigateur de l'utilisateur grace a DuckDB WASM. Les donnees sont stockees en format Parquet sur un CDN gratuit et chargees a la demande. Une fois en cache, l'application fonctionne entierement hors-ligne.

### Flux utilisateur

1. L'utilisateur arrive sur l'application → vue nationale avec indicateurs cles
2. Il recherche ou clique sur une region/departement → diagnostic territorial instantane
3. Le diagnostic affiche : population, densite, rang, comparaison nationale, narratif en wolof/francais
4. Il peut basculer entre wolof et francais a tout moment
5. En mode offline, toutes les fonctionnalites restent accessibles

---

## Outils et technologies utilises

| Composant | Technologie | Licence | Cout |
|-----------|-------------|---------|------|
| Framework frontend | Next.js 16 | MIT | 0 |
| Style | Tailwind CSS 4 | MIT | 0 |
| Moteur analytique | DuckDB WASM | MIT | 0 |
| Visualisation | Observable Plot / D3.js | ISC / BSD | 0 |
| Cartographie | MapLibre GL JS | BSD | 0 |
| Format de donnees | Apache Parquet | Apache 2.0 | 0 |
| Offline | Service Workers (API navigateur) | — | 0 |
| Export PDF | jsPDF | MIT | 0 |
| Hebergement | Vercel Free Tier | — | 0 |
| Donnees geographiques | geoBoundaries | CC-BY 3.0 | 0 |
| Donnees economiques | API World Bank | Open | 0 |
| **Cout total** | | | **0 FCFA** |

---

## Methode de deploiement et d'operationnalisation

### Deploiement

1. Le code source est heberge sur GitHub (public)
2. Vercel detecte automatiquement chaque commit et deploie en production (CI/CD)
3. Les fichiers de donnees (Parquet, GeoJSON) sont servis depuis le CDN Vercel (100 GB/mois gratuit)
4. Le domaine personnalise samm-sa-gox.vercel.app est immediatement accessible

### Operationnalisation

- **Mise a jour des donnees** : un script automatise (`scripts/fetch-worldbank.js`) recupere les derniers indicateurs de la Banque Mondiale et regenere les fichiers Parquet. Execution mensuelle via GitHub Actions (gratuit).
- **Ajout de nouvelles sources** : les publications ANSD sont converties en Parquet et ajoutees au depot. Pas besoin de modifier l'application.
- **Scalabilite** : etant entierement client-side, l'application supporte un nombre illimite d'utilisateurs simultanees sans cout supplementaire.
- **Maintenance** : zero serveur = zero maintenance serveur. Seules les donnees doivent etre mises a jour.

### Transfert a l'ANSD

L'architecture a ete concue pour que l'ANSD puisse :
1. Forker le depot GitHub
2. Ajouter ses propres donnees (RGPHAE, EDS, enquetes menages)
3. Deployer sur sa propre infrastructure ou rester sur Vercel
4. Etendre le glossaire wolof et ajouter d'autres langues nationales

---

## Profils des membres de l'equipe

| Membre | Role | Competences |
|--------|------|-------------|
| [PRENOM 1] | Lead Developer / Chef de projet | Developpement fullstack (React, Node.js), architecture cloud, deploiement | 
| [PRENOM 2] | Data Engineer / Frontend | Traitement de donnees, visualisation (D3.js), integration API, UX |
| [PRENOM 3] | Linguiste / Data Analyst | Traduction wolof, analyse statistique, tests utilisateurs |

---

## Livrables attendus

1. **Application web fonctionnelle** deployee et accessible publiquement
2. **Code source** complet sur GitHub avec documentation
3. **Pipeline de donnees** : scripts d'extraction et conversion (World Bank, ANSD PDF, geoBoundaries)
4. **Glossaire statistique wolof** : 50+ termes avec definitions
5. **Documentation technique** : architecture, guide de contribution, guide de mise a jour des donnees
6. **PWA installable** sur mobile Android/iOS avec fonctionnement offline

---

## Impact du projet sur la societe et sur l'ecosysteme des donnees

### Impact social direct

- **559 communes** pourront generer leur diagnostic territorial sans consultant (economie estimee : 2-5 millions FCFA par commune, soit 1 a 2.8 milliards FCFA d'economie potentielle pour l'ensemble du territoire)
- **88% de la population** (wolofones) accede pour la premiere fois aux statistiques publiques dans sa langue maternelle
- **Journalistes de radios communautaires** disposent d'une source de donnees fiable et comprehensible pour leurs productions
- **Entrepreneurs** peuvent evaluer le potentiel de marche d'une localite avant d'investir

### Impact sur l'ecosysteme des donnees

- **Demonstration de faisabilite** : prouve qu'une infrastructure de diffusion statistique moderne peut fonctionner a cout zero
- **Standard ouvert** : toute l'architecture est reproductible et transposable a d'autres pays africains
- **Pont vers SDMX** : les donnees structurees en Parquet peuvent etre converties en flux SDMX, accelerant l'adoption du standard par l'ANSD
- **Culture data** : en rendant les statistiques accessibles et comprehensibles, Samm Sa Gox contribue a developper une culture de decision basee sur les donnees au niveau local

### Alignement avec les priorites nationales

- **Agenda National de Transformation 2050** : transparence et acces a l'information
- **Decentralisation** : outillage des collectivites locales avec des donnees actualisees
- **Souverainete numerique** : solution 100% open source, hebergeable au Senegal

---

## Opportunites et perspectives de developpement

### Court terme (3-6 mois post-hackathon)

- Integration des donnees du RGPH 2023 (nouveau recensement) des leur publication
- Ajout des 559 communes avec donnees detaillees
- Extension du glossaire a d'autres langues nationales (pulaar, serer, diola, mandingue)
- Fonctionnalite d'export PDF du diagnostic (pour les dossiers PDC des communes)

### Moyen terme (6-12 mois)

- Integration d'un module de requetes en langage naturel (wolof/francais → SQL) via un modele de traduction leger
- Ajout de donnees thematiques : sante (carte sanitaire), education (carte scolaire), agriculture (donnees campagnes)
- API publique SDMX pour permettre a d'autres applications de consommer les donnees structurees
- Partenariat avec les radios communautaires pour la diffusion des diagnostics en wolof

### Long terme (12-24 mois)

- Adoption par l'ANSD comme outil officiel de diffusion complementaire
- Extension a d'autres pays de l'UEMOA utilisant le meme modele
- Module de suivi temporel : alertes automatiques quand un indicateur evolue significativement
- Interface vocale en wolof (exploitant les modeles ASR Kiriku-Wolof)
- Formation des agents statistiques regionaux a l'utilisation et la mise a jour de l'outil

### Modele de perennisation

Le projet est concu pour etre perenne sans financement :
- Hebergement gratuit (Vercel/Cloudflare)
- Donnees publiques (World Bank API, ANSD)
- Code open source (communaute de contributeurs)
- Pas de dependance a des API payantes ou services proprietaires
