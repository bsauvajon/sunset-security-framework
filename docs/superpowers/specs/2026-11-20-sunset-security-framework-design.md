# Sunset Security Framework — design d'une page

**Date** : 2026-11-20
**Statut** : proposition, à valider avant construction
**Taille** : petite livraison (une page statique)

## Intention

Un site satirique d'une seule page qui présente la « sécurité par obsolescence » comme une méthodologie de cabinet de conseil, avec un sérieux absolu. Le lecteur doit rire deux fois : d'abord du pitch, ensuite en reconnaissant une DSI qu'il connaît.

La promesse du site : **chaque composant retiré est un composant qui ne sera jamais compromis.** Tout le reste en découle.

## Pour qui

Des gens de la tech et du conseil qui reconnaîtront la novlangue. Le site se partage par lien, se lit en quatre minutes, et se termine par un score personnel — la vanité et le partage font la diffusion.

## Objectifs

- Tenir sur une page, autonome, ouvrable sans build ni serveur.
- Couvrir : manifeste, avantages, méthode en phases, grille de maturité interactive, preuves sociales, offres, FAQ.
- Provoquer au moins un fou rire et au moins un « c'est trop vrai ».
- Laisser une trace mémorable : un score à annoncer, un bouton à cliquer, une phrase à citer.

## Non-objectifs

- Pas de blog, pas de routing, pas de back-end, pas d'analytics.
- Pas de formulaire réel : rien n'est envoyé, rien n'est stocké.
- Pas de dépendance externe ni de police téléchargée.
- Le mobile doit rester propre, sans être l'écran de référence.

## Anti-objectifs

- Un site qui explique la blague. Aucun clin d'œil méta avant le pied de page.
- Un ton cynique ou méprisant. Le narrateur y croit dur comme fer ; l'humour vient du décalage, jamais des guillemets.
- Des blagues datées ou référentielles (memes, politique, actualité).

## Contraintes

- Contenu en français ; nom, marque et jargon en anglais.
- Trois fichiers, zéro dépendance : `index.html`, `styles.css`, `app.js`.
- Accessibilité : contrastes suffisants, navigation clavier, `prefers-reduced-motion` respecté.

## Approches considérées

1. **HTML/CSS/JS vanilla, trois fichiers, zéro dépendance** — retenue. Portable, ouvrable en double-clic, déposable tel quel sur n'importe quel hébergeur statique, aucune chaîne de build. Coût : DOM manipulé à la main, négligeable pour une page.
2. **Vite + React + Tailwind** — confort de développement, mais dépendances, build obligatoire, livrable non autonome. Machinerie disproportionnée.
3. **Astro ou Next en statique** — routing, SSG, hydratation sans bénéfice pour une page unique.

## Direction visuelle

**A — Big Tech dark.** Fond quasi-noir (`#07080A`), un seul accent vert acide (`#C6FF4A`), grotesque très serré en capitales pour les titres, micro-labels monospace en majuscules espacées, filets à 1 px, texture de grille discrète. Registre : SOC d'une licorne, pas affiche de film. Le rouge (`#FF5A3C`) est réservé à une seule action, le bouton d'extinction.

## Ton

Deux références assumées :

- **Carotte 4.0** : novlangue de la French Tech, vocabulaire de la disruption, sérieux du pitch, corruptions lexicales maison (« extinctif », « obsolescence disruptrive », « soustractif »).
- **Kai Lentit** : interviews corporate en morts-vivants, mockumentaire, verbatims qui répondent à côté avec une assurance totale.

Règles d'écriture : jamais de clin d'œil ; chiffres inventés mais plausibles ; le narrateur ne doute jamais ; chaque blague doit pouvoir être lue au premier degré.

## Structure de la page

1. **Bandeau ticker** défilant + navigation collante avec compteur d'obsolescence.
2. **Hero** : « LA SÉCURITÉ PAR SOUSTRACTION. », sous-titre, deux appels à l'action, bandeau de chiffres clés.
3. **Bandeau clients** : logos en texte, volontairement illisibles.
4. **Le constat inversé** : trois chiffres qui transforment le problème en argument.
5. **Les avantages** : six cartes (surface d'attaque nulle, zéro CVE, conformité par disparition, souveraineté radicale, budget à ROI garanti, attractivité des talents).
6. **La méthode SSF™** : quatre phases, livrables, durée.
7. **La grille de maturité** : huit critères, quatre réponses possibles, score sur 24, radar, niveau 0 à 5.
8. **Verbatim** : extrait d'entretien horodaté, format documentaire.
9. **Témoignages** : trois citations attribuées.
10. **Offres** : trois formules, dont une à 0 € et une sur devis.
11. **FAQ** : quatre questions, réponses sèches.
12. **Appel final + formulaire factice + pied de page** avec mentions satiriques.

## Interactions

- **Grille de maturité** : huit questions à choix unique (0 à 3 points). Score total sur 24, niveau calculé par paliers, radar dessiné en canvas, verdict textuel qui change selon le niveau. Recalcul immédiat, rien n'est envoyé.
- **Livre blanc** : le bouton télécharge un fichier PDF de zéro octet, nommé sérieusement.
- **Extinction** : un bouton rouge éteint la page (fondu au noir, « Système éteint. Sécurité maximale. »), avec un retour possible.
- **Bandeau cookies** : annonce qu'aucun cookie n'est utilisé, car ils ont été supprimés. Un seul bouton : « Merci ».
- **Compteur d'obsolescence** dans la navigation, qui progresse au défilement.

## Ce qui reste au builder

La micro-copie exacte, les noms des clients fictifs, les libellés des huit critères et le dessin précis du radar. Aucune de ces décisions ne change ce qui est construit.

---

## Révision du 2026-11-20 — correction du concept

La première version confondait l'obsolescence avec le décommissionnement : elle racontait qu'on retire des composants jusqu'à ce qu'il ne reste rien. Ce n'est pas l'idée.

**Le concept juste.** Le système reste allumé, en ligne et strictement inchangé. Sa sécurité vient de l'écart qui se creuse dans deux directions :

- **technologique** — les outils offensifs modernes ne parlent plus son protocole ;
- **humain** — plus personne ne sait s'en servir, y compris dans l'organisation qui l'héberge.

C'est un **air gap temporel**, pas une extinction. La valeur est l'ancienneté, pas l'absence.

**Conséquences appliquées.** Titre « La sécurité par ancienneté » ; avantages reformulés autour de l'anachronisme, de la péremption et de l'oubli ; méthode en quatre phases d'élevage (sélection de la relique, mise en jachère, départ des sachants, entretien de l'ignorance) ; grille recentrée sur l'ancienneté, l'illisibilité et la rupture de compétence, avec un niveau 5 « Relique » ; verbatim et témoignages réécrits dans le même rythme ; bouton « Éteindre le site » conservé mais transformé en refus — « Un système éteint ne vieillit plus ».

**Ce qui n'a pas changé.** La structure en douze blocs, la direction visuelle, le ton, les gags du manifeste à zéro octet, du compteur monotone et de la bannière cookies, ainsi que l'ensemble de l'implémentation technique.
