# Arabe du Coran

Application web installable (PWA) pour apprendre l'arabe **avec le seul vocabulaire du Coran**, et la grammaire (nahw) et la morphologie (sarf) utiles pour le comprendre.

**Ouvrir l'app :** https://blaze940.github.io/arabe-coran/

## Contenu
- **Parcours** : 8 blocs, 47 leçons, 253 exemples coraniques vérifiés mot pour mot, plus de 400 exercices (QCM et « touchez le mot dans le verset »).
- **Lexique** : 1 645 lemmes classés par fréquence réelle, soit 95 % du texte. On choisit la tranche à travailler : 0–80 %, 80–85 %, 85–90 %, 90–95 %. Pour chaque verbe : accompli, inaccompli, impératif, participes et masdar. Pour chaque nom : pluriel et genre. Chaque mot a un exemple dans le Coran et son audio.
- **Entraînement** : révision espacée, sens des mots, écoute, formes verbales, pluriels, familles de racines, contre-la-montre, paires, nature des mots, orthographe.

## Sources
- Texte, lemmes, racines et fréquences : Quranic Arabic Corpus (morphologie v0.4, version corrigée [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology)).
- Audio : récitation mot à mot et versets (Mishary Alafasy) via Quran.com.

## Structure
- `data/curriculum.js` : blocs, leçons, exercices
- `data/vocab.js` : lexique (rang, fréquence, couverture cumulée, formes)
- `data/versets.js` : versets cités par le lexique
- `index.html`, `style.css`, `app.js` : l'application
- `sw.js` : fonctionnement hors ligne (changer `VERSION` à chaque mise à jour)
