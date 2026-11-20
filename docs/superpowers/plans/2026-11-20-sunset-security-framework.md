# Sunset Security Framework — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site satirique d'une page qui présente la « sécurité par obsolescence » comme une méthodologie de cabinet, avec une grille de maturité interactive.

**Architecture:** Page statique autonome, sans build : `index.html` porte le contenu, `styles.css` les tokens et la mise en page, `score.js` la logique pure de notation (testable sous Node), `app.js` le câblage DOM et les interactions. Aucune dépendance, aucun serveur requis à l'exécution.

**Tech Stack:** HTML, CSS, JavaScript vanilla (ES5-compatible pour `score.js`, modules non requis), `node --test` pour les tests de logique, favicon SVG.

**Spec:** `docs/superpowers/specs/2026-11-20-sunset-security-framework-design.md`

**Note sur les commits :** le dossier n'est pas un dépôt git et le livrable est une archive autonome. Chaque tâche se termine donc par une vérification plutôt que par un commit ; l'initialisation d'un dépôt se fera à la demande.

## Global Constraints

- Contenu en français ; nom, marque et jargon en anglais.
- Zéro dépendance externe, zéro police téléchargée, zéro requête réseau à l'exécution.
- Trois fichiers de code : `index.html`, `styles.css`, `app.js`, plus `score.js` et `tests/score.test.js`.
- La page doit s'ouvrir correctement en `file://` (pas de `type="module"`, pas de `fetch`).
- Accent unique vert acide `#C6FF4A` sur fond `#07080A` ; rouge `#FF5A3C` réservé au bouton d'extinction.
- `prefers-reduced-motion: reduce` désactive ticker, transitions et animations du radar.
- Aucune donnée saisie n'est envoyée ni stockée.
- Ton : le narrateur ne doute jamais, aucun clin d'œil méta avant le pied de page.

## Review Focus

- **Score incomplet** : tant que les huit critères ne sont pas répondus, l'affichage doit rester à « — » et non à un niveau trompeur.
- **Téléchargement de zéro octet** : certains navigateurs annulent un téléchargement vide ; le fichier doit bien arriver à 0 octet et porter un nom crédible.
- **Extinction** : le bouton doit être atteignable au clavier, réversible, et ne pas piéger l'utilisateur dans un écran noir.
- **Mouvement réduit** : ticker et radar doivent rester lisibles et immobiles quand `prefers-reduced-motion` est actif.
- **Petite largeur** : à 320 px, aucun débordement horizontal, la grille passe en une colonne.

---

### Task 1: Ossature, tokens et hero

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `assets/favicon.svg`

**Interfaces:**
- Consumes: rien.
- Produces: `:root` tokens (`--bg`, `--fg`, `--muted`, `--accent`, `--danger`, `--line`), la classe `.wrap` (largeur max 1180 px), et les ancres `#manifeste`, `#avantages`, `#methode`, `#maturite`, `#preuves`, `#offres`, `#faq`, `#contact` présentes dans le DOM.

- [ ] **Step 1: Créer `index.html` avec l'ossature et le hero**

Structure : `<header class="topbar">` (ticker + nav + CTA), `<main>` contenant huit `<section>` vides portant les ancres ci-dessus, `<footer>`. Le hero contient le label `OBSOLESCENCE-AS-A-SERVICE · DEPUIS 2019`, le titre `LA SÉCURITÉ PAR SOUSTRACTION.`, le paragraphe de promesse, deux boutons (`#cta-maturite` vers `#maturite`, `#cta-manifeste`), et une bande de trois chiffres : `−87 %`, `0`, `4,9/5`.

- [ ] **Step 2: Créer `styles.css` avec les tokens et la typographie**

Tokens exacts : `--bg:#07080A; --surface:#0D0F12; --fg:#E8EDE6; --muted:#8A938A; --accent:#C6FF4A; --danger:#FF5A3C; --line:#1E2320;`. Pile de titres : `-apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif` avec `letter-spacing:-0.03em` et capitales sur les `h1`. Pile mono : `ui-monospace, "SF Mono", Menlo, Consolas, monospace`, `letter-spacing:0.16em`, `text-transform:uppercase` pour `.label`. Grille de fond discrète via `repeating-linear-gradient` sur `body`.

- [ ] **Step 3: Créer `assets/favicon.svg`**

Un disque vert acide à moitié couché sur une ligne d'horizon, 32×32, fond transparent.

- [ ] **Step 4: Vérifier le rendu**

Ouvrir `file:///home/brice/repos/securite%20par%20obsolescence/index.html` dans l'outil navigateur, prendre une capture en 1440×900, et confirmer : fond noir, titre en capitales serrées, accent vert sur le mot « SOUSTRACTION », aucun débordement horizontal.

---

### Task 2: Contenu statique des sections

**Files:**
- Modify: `index.html` (sections `#manifeste`, `#avantages`, `#methode`, `#preuves`, `#offres`, `#faq`, `#contact`)
- Modify: `styles.css` (cartes, listes, tableaux)

**Interfaces:**
- Consumes: les ancres et tokens de la Task 1.
- Produces: la classe `.card` (carte sombre, bordure 1 px `--line`, padding 24 px) et `.grid-3` (trois colonnes, une seule sous 780 px), utilisées par les tâches suivantes.

- [ ] **Step 1: Section constat inversé**

Trois chiffres avec source fictive : « 73 % des CVE concernent des logiciels encore maintenus », « 1,4 nouvelle vulnérabilité introduite par mise à jour », « 100 % des systèmes éteints n'ont jamais été compromis ». Titre : « Le problème n'est pas votre SI. C'est qu'il tourne. »

- [ ] **Step 2: Six avantages en `.card` dans une `.grid-3`**

Titres exacts : `Surface d'attaque nulle`, `Zéro CVE`, `Conformité par disparition`, `Souveraineté radicale`, `Budget à ROI garanti`, `Attractivité des talents`. Chaque carte : un titre, deux phrases, et un chiffre en mono.

- [ ] **Step 3: Méthode SSF™ en quatre phases**

`01 Cartographie de l'inutile` (semaines 1–2), `02 Décommissionnement assisté` (semaines 3–8), `03 Célébration` (semaine 9), `04 Entretien du vide` (permanent). Chaque phase affiche un livrable : `Matrice RACI de la disparition`, `Registre des actifs inexistants`, `Pot de départ par application`, `Comité d'extinction mensuel`.

- [ ] **Step 4: Verbatim documentaire, témoignages, offres, FAQ, contact**

Verbatim en trois répliques horodatées `[00:42]`, `[00:44]`, `[01:03]`. Trois témoignages attribués (DSI groupe industriel, CIO mutuelle, Head of Nothing). Trois offres : `Sunset Starter` 0 €, `Sunset Enterprise` sur devis, `Sunset Sovereign` 2 M€/an. Quatre questions de FAQ dont « Êtes-vous certifiés ISO 27001 ? » → « Nous sommes certifiés ISO 0. ». Contact : formulaire `#form-audit` avec trois champs et bouton, plus l'adresse `bonjour@sunset.framework`.

- [ ] **Step 5: Pied de page**

Mention `Site satirique. Aucune DSI n'a été éteinte.`, badge `ISO 0`, badge `SOC 0`, lien `Manifeste (PDF, 0 Ko)`.

- [ ] **Step 6: Vérifier le contenu**

Dans l'outil navigateur, extraire le texte de la page et confirmer la présence de `Surface d'attaque nulle`, `Cartographie de l'inutile`, `ISO 0`, `Aucune DSI n'a été éteinte`. Prendre une capture du bas de page.

---

### Task 3: Logique de notation (TDD)

**Files:**
- Create: `tests/score.test.js`
- Create: `score.js`

**Interfaces:**
- Consumes: rien.
- Produces: `SSFScore.computeScore(answers: number[]): number`, `SSFScore.levelFor(score: number): {index:number, name:string, verdict:string}`, `SSFScore.LEVELS: Array<{min:number, name:string, verdict:string}>`.

- [ ] **Step 1: Écrire les tests qui échouent**

```js
const test = require('node:test');
const assert = require('node:assert');
const { computeScore, levelFor } = require('../score.js');

test('somme les huit réponses', () => {
  assert.strictEqual(computeScore([3,3,3,3,3,3,3,3]), 24);
  assert.strictEqual(computeScore([0,0,0,0,0,0,0,0]), 0);
  assert.strictEqual(computeScore([1,2,3,0,1,2,3,0]), 12);
});

test('refuse une saisie invalide', () => {
  assert.throws(() => computeScore([1,2,3]), RangeError);
  assert.throws(() => computeScore([4,0,0,0,0,0,0,0]), RangeError);
  assert.throws(() => computeScore([-1,0,0,0,0,0,0,0]), RangeError);
});

test('mappe le score sur six niveaux', () => {
  assert.strictEqual(levelFor(0).index, 0);
  assert.strictEqual(levelFor(3).index, 0);
  assert.strictEqual(levelFor(4).index, 1);
  assert.strictEqual(levelFor(7).index, 1);
  assert.strictEqual(levelFor(8).index, 2);
  assert.strictEqual(levelFor(11).index, 2);
  assert.strictEqual(levelFor(12).index, 3);
  assert.strictEqual(levelFor(15).index, 3);
  assert.strictEqual(levelFor(16).index, 4);
  assert.strictEqual(levelFor(19).index, 4);
  assert.strictEqual(levelFor(20).index, 5);
  assert.strictEqual(levelFor(24).index, 5);
});

test('refuse un score hors bornes', () => {
  assert.throws(() => levelFor(25), RangeError);
  assert.throws(() => levelFor(-1), RangeError);
  assert.throws(() => levelFor(3.5), RangeError);
});
```

- [ ] **Step 2: Lancer les tests pour les voir échouer**

Run: `node --test tests/score.test.js`
Expected: FAIL, `Cannot find module '../score.js'`.

- [ ] **Step 3: Implémenter `score.js`**

Enveloppe IIFE exposant `globalThis.SSFScore`, avec `module.exports` si présent (pour Node). Noms et verdicts des niveaux, dans l'ordre : `Digital natif`, `Conscient`, `Défini`, `Gouverné`, `Optimisé`, `Absent`. Paliers `min` : 0, 4, 8, 12, 16, 20. `levelFor` lève `RangeError` si le score n'est pas un entier entre 0 et 24.

- [ ] **Step 4: Lancer les tests pour les voir passer**

Run: `node --test tests/score.test.js`
Expected: PASS, 4 tests.

---

### Task 4: Grille de maturité interactive

**Files:**
- Modify: `index.html` (section `#maturite`)
- Modify: `styles.css` (grille de questions, radar, verdict)
- Modify: `app.js` (créer)

**Interfaces:**
- Consumes: `SSFScore.computeScore`, `SSFScore.levelFor`, `SSFScore.LEVELS`, `#maturite`.
- Produces: `renderScore()` (recalcule et redessine), `drawRadar(canvas, values)`, l'élément `#score-value`, `#score-level`, `#score-verdict`, `canvas#radar`, `#radar-fallback`.

- [ ] **Step 1: Écrire le markup de la grille**

Huit critères, chacun avec quatre boutons radio nommés `critere-<n>` et les valeurs `0` à `3`, libellés `Pas encore`, `En cours`, `Déployé`, `Éteint`. Les huit critères : `Gouvernance de l'extinction`, `Inventaire de l'inutile`, `Discipline de non-patch`, `Documentation de l'absence`, `Culture du vide`, `Métriques de disparition`, `Souveraineté par le néant`, `Budget non dépensé`. Bloc de résultat contenant `#score-value` (affiché `—` au départ), `#score-level`, `#score-verdict`, et `<canvas id="radar" width="360" height="360">` avec `#radar-fallback` en texte.

- [ ] **Step 2: Câbler le calcul dans `app.js`**

Charger `score.js` avant `app.js`. `renderScore()` lit les huit groupes ; si un groupe n'a pas de réponse, affiche `—`, `Niveau en attente`, et un verdict `Répondez aux huit critères.` ; sinon appelle `computeScore`, puis `levelFor`, puis `drawRadar` avec les valeurs normalisées `answer / 3`.

- [ ] **Step 3: Dessiner le radar**

`drawRadar(canvas, values)` : huit axes répartis sur 2π, trois cercles de grille, polygone d'accent semi-transparent, points d'accent. Si `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, dessiner sans animation ; sinon, animer le polygone sur 400 ms.

- [ ] **Step 4: Vérifier dans le navigateur**

Cliquer les huit réponses à `3` : `#score-value` affiche `24`, le niveau affiche `Absent`, le radar est plein. Recharger et cliquer une seule réponse : `#score-value` affiche `—`. Vérifier qu'un clic au clavier (Tab puis Espace) sur un radio met bien le score à jour.

---

### Task 5: Gags et interactions

**Files:**
- Modify: `app.js`
- Modify: `index.html` (ticker, bannière cookies, bouton d'extinction, formulaire)
- Modify: `styles.css` (états, overlay d'extinction)

**Interfaces:**
- Consumes: les sections et identifiants des tâches précédentes.
- Produces: `#cookie-banner`, `#extinction`, `#extinction-overlay`, `#obsolescence-meter`, `#form-audit`.

- [ ] **Step 1: Livre blanc de zéro octet**

Les deux déclencheurs (`#cta-manifeste`, lien du pied de page) créent un `Blob` vide de type `application/pdf` et déclenchent un téléchargement nommé `SSF-Manifeste-2026.pdf`. Vérifier : le fichier téléchargé fait 0 octet.

- [ ] **Step 2: Bannière cookies**

Bandeau fixe en bas au premier chargement : « Ce site n'utilise aucun cookie. Nous les avons supprimés. » Un seul bouton `Merci` le retire et écrit une clé `localStorage` `ssf-cookies-ack`. Si `localStorage` lève une exception, retirer la bannière sans erreur.

- [ ] **Step 3: Bouton d'extinction**

Bouton `#extinction` portant `ÉTEINDRE LE SITE`. Au clic : overlay plein écran noir, texte `Système éteint.` puis `Sécurité maximale.`, et un bouton `Rallumer` qui restaure la page. L'overlay reçoit le focus, `Échap` le ferme, et le focus revient au bouton d'origine.

- [ ] **Step 4: Compteur d'obsolescence**

Dans la barre de navigation, `#obsolescence-meter` affiche `OBSOLESCENCE 0 %` et progresse linéairement avec la profondeur de défilement jusqu'à `100 %`, sans jamais reculer.

- [ ] **Step 5: Formulaire factice**

À la soumission de `#form-audit` : `preventDefault`, remplacer le formulaire par `Merci. Votre demande a été archivée, puis supprimée.` Aucune requête réseau ne doit apparaître dans l'onglet réseau.

- [ ] **Step 6: Vérifier chaque gag**

Dans l'outil navigateur : déclencher le téléchargement et vérifier la taille, cliquer `Merci` et confirmer la disparition de la bannière, éteindre et rallumer au clavier, faire défiler jusqu'en bas et lire `OBSOLESCENCE 100 %`, soumettre le formulaire et confirmer l'absence de requête.

---

### Task 6: Responsive, accessibilité, finition

**Files:**
- Modify: `styles.css`
- Modify: `index.html` (attributs ARIA, ordre de tabulation)

**Interfaces:**
- Consumes: tout ce qui précède.
- Produces: la version livrable.

- [ ] **Step 1: Points de rupture**

Sous 780 px : `.grid-3` en une colonne, nav repliée en liens de section, hero en 32 px, radar en 280 px. À 320 px de large, vérifier `document.documentElement.scrollWidth === 320`.

- [ ] **Step 2: Accessibilité**

Lien d'évitement `Aller au contenu`, `aria-current` sur la nav, libellés associés aux champs du formulaire, `aria-live="polite"` sur `#score-verdict`, focus visible (`outline: 2px solid var(--accent)`), contrastes du texte courant supérieurs à 4,5:1.

- [ ] **Step 3: Mouvement réduit**

Avec `prefers-reduced-motion: reduce` émulé : le ticker est immobile, les transitions durent 0 ms, le radar s'affiche sans animation.

- [ ] **Step 4: Vérification finale**

Captures en 1440×900 et 390×844, parcours clavier complet du haut jusqu'au formulaire, console vide, aucune requête réseau hors `file://`.

---

## Auto-revue

- Couverture de la spec : les douze blocs sont répartis dans les Tasks 1, 2, 4 et 5 ; les interactions de la spec (score, livre blanc, extinction, cookies, compteur) sont en Task 5 ; les contraintes d'accessibilité et de mouvement réduit en Task 6.
- Les cinq lignes de Review Focus ont chacune leur vérification dans la tâche qui possède le code concerné.
- Les signatures `computeScore`, `levelFor` et `drawRadar` sont identiques entre la définition (Task 3) et l'usage (Task 4).
- Les valeurs exactes de la spec (couleurs, paliers, libellés, noms des offres) sont recopiées, pas résumées.
