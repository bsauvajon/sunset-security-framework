# Sunset Security Framework

> La sécurité par ancienneté.

Site satirique d'une page qui présente l'obsolescence comme une méthodologie de
sécurité : le système reste allumé, en ligne et inchangé, et le temps fait le
travail. Les outils offensifs modernes ne parlent plus son protocole ; plus
personne ne sait s'en servir, y compris dans l'organisation qui l'héberge.

**Site en ligne :** https://bsauvajon.github.io/sunset-security-framework/

## Lancer en local

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur, ou :

```bash
python3 -m http.server 8765
```

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Contenu et structure de la page |
| `styles.css` | Direction visuelle, responsive, mouvement réduit |
| `score.js` | Logique pure de notation (testable sous Node) |
| `app.js` | Grille interactive, radar, compteur, interactions |
| `tests/score.test.js` | Tests de la logique de score |
| `docs/` | Spec de design et plan d'implémentation |

## Tests

```bash
node --test tests/score.test.js
```

## Avertissement

Site satirique. Aucun système n'a été mis à jour. Aucune DSI n'a été éteinte.
Tous les chiffres, clients, témoignages et certifications sont inventés.
