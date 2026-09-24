# Arabe du Coran

Application web installable (PWA) pour apprendre l'arabe **uniquement avec le vocabulaire du Coran**, en suivant un programme de nahw (grammaire) et de sarf (morphologie) organisé en blocs.

**Ouvrir l'app :** https://blaze940.github.io/arabe-coran/

## Contenu
- **Parcours** : 8 blocs de leçons, dans un ordre pensé pour comprendre le Coran le plus vite possible. Le bloc 1 est disponible, les autres arrivent.
- **Jeux** : cartes mémoire (révision espacée), quiz éclair, paires, pluie de mots, famille de racines, le trieur, construis le mot.
- **Vocabulaire** : mots fréquents (révision) et mots plus rares (approfondissement), avec racine et thème.

## Installer sur le téléphone
- iPhone (Safari) : Partager ⬆️ → « Sur l'écran d'accueil »
- Android (Chrome) : menu ⋮ → « Installer l'application »

## Structure
- `data/curriculum.js` : blocs, leçons, exercices
- `data/vocab.js` : vocabulaire
- `data/racines.js` : familles de racines
- `app.js`, `style.css`, `index.html` : l'application
- `sw.js` : fonctionnement hors ligne (changer `VERSION` à chaque mise à jour)
