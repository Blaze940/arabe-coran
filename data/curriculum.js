/* Programme : blocs → leçons.
   Une leçon avec `contenu` est disponible ; sans `contenu`, elle est « à venir ».
   Types de sections : p (paragraphe HTML), ex (exemple coranique), table, tip (encadré).
   Types d'exercices : qcm. */
window.CURRICULUM = [
  {
    id: "b1",
    titre: "Les fondations du mot",
    ar: "أَسَاسُ الْكَلِمَةِ",
    objectif: "Reconnaître n'importe quel mot du Coran : sa nature, sa racine, son schème, son genre, son nombre et les petits mots qui l'entourent.",
    lecons: [
      {
        id: "b1l1",
        titre: "Nom, verbe, particule",
        ar: "الاسْمُ وَالْفِعْلُ وَالْحَرْفُ",
        resume: "Les trois seules catégories de mots en arabe, et comment les reconnaître à l'œil.",
        contenu: [
          { t: "p", html: "Pour les grammairiens arabes, tout mot (<span class='ar'>كَلِمَة</span>) appartient à l'une de trois catégories seulement. C'est la toute première question à se poser devant un mot du Coran." },
          { t: "table", head: ["Catégorie", "Définition", "Exemples"], rows: [
            ["<b>Nom</b> <span class='ar'>اسْم</span>", "Désigne un être, une chose, une qualité ; n'est pas lié au temps. Inclut adjectifs, pronoms, participes, masdars.", "<span class='ar'>اللَّه ، كِتَاب ، رَحِيم ، هُوَ</span>"],
            ["<b>Verbe</b> <span class='ar'>فِعْل</span>", "Une action ou un état lié à un temps (passé, présent/futur, impératif).", "<span class='ar'>خَلَقَ ، يَعْلَمُ ، اقْرَأْ</span>"],
            ["<b>Particule</b> <span class='ar'>حَرْف</span>", "N'a de sens complet qu'avec un autre mot : prépositions, conjonctions, négations…", "<span class='ar'>مِنْ ، فِي ، ثُمَّ ، لَا ، إِنَّ</span>"]
          ]},
          { t: "p", html: "<b>Indices du nom</b> : il peut porter l'article <span class='ar'>الـ</span>, le tanwîn (<span class='ar'>ـٌ ـٍ ـً</span>), être précédé d'une préposition, ou être au génitif (kasra finale)." },
          { t: "p", html: "<b>Indices du verbe</b> : il peut être précédé de <span class='ar'>قَدْ</span>, <span class='ar'>سَـ</span>, <span class='ar'>لَمْ</span>, <span class='ar'>لَنْ</span> ; il porte des préfixes (<span class='ar'>أ ن ي ت</span>) au présent ou des suffixes de personne au passé (<span class='ar'>ـتُ ـنَا ـوا</span>)." },
          { t: "ex", ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", fr: "Lis, au nom de ton Seigneur qui a créé.", ref: "96:1", note: "<span class='ar'>اقْرَأْ</span> et <span class='ar'>خَلَقَ</span> : verbes · <span class='ar'>اسْم</span>, <span class='ar'>رَبّ</span>, <span class='ar'>الَّذِي</span> : noms · <span class='ar'>بِـ</span> : particule. <span class='ar'>اسْم</span> est au génitif car précédé de <span class='ar'>بِـ</span> : preuve que c'est un nom." },
          { t: "ex", ar: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", fr: "Certes, les croyants réussissent.", ref: "23:1", note: "<span class='ar'>قَدْ</span> (particule) annonce un verbe : <span class='ar'>أَفْلَحَ</span>. <span class='ar'>الْمُؤْمِنُونَ</span> porte l'article : c'est un nom." },
          { t: "tip", html: "Astuce : un mot qui porte <span class='ar'>الـ</span> ou du tanwîn n'est <b>jamais</b> un verbe." }
        ],
        exercices: [
          { type: "qcm", q: "Quelle est la nature de ce mot ?", ar: "الرَّحِيمِ", options: ["Nom", "Verbe", "Particule"], answer: 0, why: "Il porte l'article <span class='ar'>الـ</span> et une kasra : c'est un nom (un adjectif est un nom en arabe)." },
          { type: "qcm", q: "Quelle est la nature de ce mot ?", ar: "خَلَقَ", options: ["Nom", "Verbe", "Particule"], answer: 1, why: "Action au passé, schème <span class='ar'>فَعَلَ</span> : verbe." },
          { type: "qcm", q: "Quelle est la nature de ce mot ?", ar: "ثُمَّ", options: ["Nom", "Verbe", "Particule"], answer: 2, why: "« Puis » : une conjonction, donc une particule." },
          { type: "qcm", q: "Dans <span class='ar'>قُلْ هُوَ اللَّهُ أَحَدٌ</span> (112:1), quel mot est un verbe ?", options: ["<span class='ar'>قُلْ</span>", "<span class='ar'>هُوَ</span>", "<span class='ar'>أَحَدٌ</span>"], answer: 0, why: "<span class='ar'>قُلْ</span> = « dis ! », impératif du verbe <span class='ar'>قَالَ</span>. <span class='ar'>هُوَ</span> est un pronom (nom), <span class='ar'>أَحَدٌ</span> porte le tanwîn (nom)." },
          { type: "qcm", q: "Lequel de ces indices prouve qu'un mot est un nom ?", options: ["Il est précédé de <span class='ar'>قَدْ</span>", "Il porte le tanwîn", "Il commence par <span class='ar'>يَـ</span>"], answer: 1, why: "Le tanwîn n'existe que sur les noms. <span class='ar'>قَدْ</span> et le préfixe <span class='ar'>يَـ</span> signalent un verbe." },
          { type: "qcm", q: "Dans <span class='ar'>لَمْ يَلِدْ وَلَمْ يُولَدْ</span> (112:3), que sont <span class='ar'>يَلِدْ</span> et <span class='ar'>يُولَدْ</span> ?", options: ["Des noms", "Des verbes", "Des particules"], answer: 1, why: "Précédés de <span class='ar'>لَمْ</span>, avec le préfixe <span class='ar'>يـ</span> : verbes au présent (inaccompli)." }
        ]
      },
      {
        id: "b1l2",
        titre: "Racine et schème",
        ar: "الْجَذْرُ وَالْوَزْنُ",
        resume: "La clé du vocabulaire coranique : 3 consonnes + un moule = un sens prévisible.",
        contenu: [
          { t: "p", html: "La plupart des mots arabes sont construits sur une <b>racine</b> (<span class='ar'>جَذْر</span>) de trois consonnes qui porte le sens général, coulée dans un <b>schème</b> (<span class='ar'>وَزْن</span>) qui précise le type de mot." },
          { t: "p", html: "Les grammairiens représentent les trois consonnes par <span class='ar'>ف ع ل</span> : 1<sup>re</sup> radicale = <span class='ar'>ف</span>, 2<sup>e</sup> = <span class='ar'>ع</span>, 3<sup>e</sup> = <span class='ar'>ل</span>. Ainsi <span class='ar'>كَاتِب</span> est sur le schème <span class='ar'>فَاعِل</span>." },
          { t: "table", head: ["Schème", "Sens habituel", "Racine ع ل م", "Racine ك ت ب"], rows: [
            ["<span class='ar'>فَعَلَ / فَعِلَ</span>", "verbe de base", "<span class='ar'>عَلِمَ</span> savoir", "<span class='ar'>كَتَبَ</span> écrire"],
            ["<span class='ar'>فِعْل</span>", "masdar (l'action)", "<span class='ar'>عِلْم</span> science", "—"],
            ["<span class='ar'>فَاعِل</span>", "celui qui fait", "<span class='ar'>عَالِم</span> savant", "<span class='ar'>كَاتِب</span> scribe"],
            ["<span class='ar'>مَفْعُول</span>", "ce qui subit", "<span class='ar'>مَعْلُوم</span> connu", "<span class='ar'>مَكْتُوب</span> écrit"],
            ["<span class='ar'>فَعِيل</span>", "qualité intense / permanente", "<span class='ar'>عَلِيم</span> omniscient", "—"],
            ["<span class='ar'>فِعَال</span>", "nom / masdar", "—", "<span class='ar'>كِتَاب</span> livre, écrit"],
            ["<span class='ar'>أَفْعَل</span>", "plus… (comparatif)", "<span class='ar'>أَعْلَم</span> plus savant", "—"]
          ]},
          { t: "ex", ar: "وَاللَّهُ عَلِيمٌ حَكِيمٌ", fr: "Et Allah est Omniscient, Sage.", ref: "ex. 4:26", note: "Deux mots sur <span class='ar'>فَعِيل</span> : <span class='ar'>عَلِيم</span> (ع ل م) et <span class='ar'>حَكِيم</span> (ح ك م). Ce schème exprime une qualité stable : très fréquent pour les Noms d'Allah." },
          { t: "ex", ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", fr: "Louange à Allah, Seigneur des mondes.", ref: "1:2", note: "<span class='ar'>الْعَالَمِينَ</span> vient aussi de ع ل م : les « mondes », ce par quoi le Créateur est connu." },
          { t: "tip", html: "Pour trouver la racine : enlève l'article, les préfixes et suffixes, puis les lettres « de service » (<span class='ar'>ا و ي م ت</span>) quand elles appartiennent au schème. Il reste trois consonnes." }
        ],
        exercices: [
          { type: "qcm", q: "Quelle est la racine de ce mot ?", ar: "مَسْجِد", options: ["م س ج", "س ج د", "م ج د"], answer: 1, why: "Schème <span class='ar'>مَفْعِل</span> (lieu) : <span class='ar'>م</span> est une lettre du schème. Racine س ج د = se prosterner → lieu de prosternation." },
          { type: "qcm", q: "Sur quel schème est construit ce mot ?", ar: "رَحِيم", options: ["<span class='ar'>فَاعِل</span>", "<span class='ar'>فَعِيل</span>", "<span class='ar'>مَفْعُول</span>"], answer: 1, why: "ر ح م dans le moule <span class='ar'>فَعِيل</span> : qualité permanente." },
          { type: "qcm", q: "Quelle est la racine de ce mot ?", ar: "الْمُؤْمِنُونَ", options: ["م ء ن", "ء م ن", "م ن و"], answer: 1, why: "On retire <span class='ar'>الـ</span>, le préfixe <span class='ar'>مُـ</span> (participe) et le suffixe <span class='ar'>ـُونَ</span> (pluriel) : ء م ن, la racine de la foi et de la sécurité." },
          { type: "qcm", q: "Que signifie probablement <span class='ar'>شَاكِر</span> (racine ش ك ر = remercier) ?", options: ["Celui qui remercie", "Ce qui est remercié", "Remerciement"], answer: 0, why: "Schème <span class='ar'>فَاعِل</span> = celui qui fait l'action." },
          { type: "qcm", q: "Que signifie probablement <span class='ar'>مَغْضُوب</span> (1:7), racine غ ض ب = colère ?", options: ["Celui qui se met en colère", "Celui contre qui on est en colère", "La colère"], answer: 1, why: "Schème <span class='ar'>مَفْعُول</span> = celui qui subit l'action. <span class='ar'>غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ</span>." },
          { type: "qcm", q: "Quel mot n'est PAS de la même racine que les autres ?", options: ["<span class='ar'>كِتَاب</span>", "<span class='ar'>مَكْتُوب</span>", "<span class='ar'>كَبِير</span>"], answer: 2, why: "<span class='ar'>كَبِير</span> vient de ك ب ر (grandeur). Les deux autres viennent de ك ت ب." }
        ]
      },
      {
        id: "b1l3",
        titre: "Défini, indéfini et l'article",
        ar: "الْمَعْرِفَةُ وَالنَّكِرَةُ",
        resume: "Tanwîn, article الـ, lettres solaires et lunaires.",
        contenu: [
          { t: "p", html: "Un nom est soit <b>indéfini</b> (<span class='ar'>نَكِرَة</span>) soit <b>défini</b> (<span class='ar'>مَعْرِفَة</span>). L'indéfini se marque en général par le <b>tanwîn</b> : <span class='ar'>كِتَابٌ</span> = « un livre ». Le défini se marque par l'article <span class='ar'>الـ</span> : <span class='ar'>الْكِتَابُ</span> = « le livre »." },
          { t: "p", html: "Un nom ne peut jamais porter <b>à la fois</b> <span class='ar'>الـ</span> et le tanwîn." },
          { t: "ex", ar: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ", fr: "Voici le Livre, nul doute à son sujet ; une guidée pour les pieux.", ref: "2:2", note: "<span class='ar'>الْكِتَابُ</span> est défini (article). <span class='ar'>هُدًى</span> est indéfini (tanwîn) : « une guidée »." },
          { t: "p", html: "<b>Lettres solaires et lunaires.</b> Devant 14 lettres dites <b>solaires</b> (<span class='ar'>ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span>), le <span class='ar'>ل</span> de l'article ne se prononce pas et la lettre suivante est doublée (shadda). Devant les 14 lettres <b>lunaires</b>, le <span class='ar'>ل</span> se prononce avec un soukoun." },
          { t: "ex", ar: "وَالشَّمْسِ وَضُحَاهَا ۝ وَالْقَمَرِ إِذَا تَلَاهَا", fr: "Par le soleil et sa clarté ! Par la lune quand elle le suit !", ref: "91:1-2", note: "<span class='ar'>الشَّمْس</span> : ash-shams (lettre solaire, ل muet). <span class='ar'>الْقَمَر</span> : al-qamar (lettre lunaire, ل prononcé). D'où leurs noms !" },
          { t: "p", html: "<b>Autres noms définis sans article</b> : les noms propres (<span class='ar'>مُوسَىٰ</span>, <span class='ar'>مَكَّة</span>), les pronoms (<span class='ar'>هُوَ</span>), les démonstratifs (<span class='ar'>هَٰذَا</span>), les relatifs (<span class='ar'>الَّذِي</span>), et un nom annexé à un défini (<span class='ar'>رَبُّكَ</span> « ton Seigneur », vu au bloc 2)." },
          { t: "tip", html: "Le nom <span class='ar'>اللَّه</span> est défini par nature ; sa lettre <span class='ar'>ل</span> est doublée." }
        ],
        exercices: [
          { type: "qcm", q: "Ce mot est-il défini ou indéfini ?", ar: "رَسُولٌ", options: ["Défini", "Indéfini"], answer: 1, why: "Tanwîn <span class='ar'>ـٌ</span> : « un messager »." },
          { type: "qcm", q: "Comment se prononce l'article dans ce mot ?", ar: "النَّاس", options: ["al-nâs (ل prononcé)", "an-nâs (ل muet, ن doublé)"], answer: 1, why: "<span class='ar'>ن</span> est une lettre solaire." },
          { type: "qcm", q: "Laquelle de ces lettres est lunaire ?", options: ["<span class='ar'>ر</span>", "<span class='ar'>ص</span>", "<span class='ar'>ج</span>"], answer: 2, why: "<span class='ar'>الْجَنَّة</span> : al-janna, ل prononcé. Moyen mnémotechnique des lettres lunaires : <span class='ar'>ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ</span>." },
          { type: "qcm", q: "Quelle forme est impossible ?", options: ["<span class='ar'>الْكِتَابُ</span>", "<span class='ar'>كِتَابٌ</span>", "<span class='ar'>الْكِتَابٌ</span>"], answer: 2, why: "Jamais l'article et le tanwîn ensemble." },
          { type: "qcm", q: "Dans <span class='ar'>إِنَّ الْإِنسَانَ لَفِي خُسْرٍ</span> (103:2), quel mot est indéfini ?", options: ["<span class='ar'>الْإِنسَانَ</span>", "<span class='ar'>خُسْرٍ</span>"], answer: 1, why: "<span class='ar'>خُسْرٍ</span> porte le tanwîn : « en perdition »." },
          { type: "qcm", q: "<span class='ar'>هُوَ</span> est-il défini ?", options: ["Oui, les pronoms sont définis", "Non, il n'a pas l'article"], answer: 0, why: "Pronoms, noms propres, démonstratifs et relatifs sont définis sans article." }
        ]
      },
      {
        id: "b1l4",
        titre: "Genre et nombre",
        ar: "الْمُذَكَّرُ وَالْمُؤَنَّثُ ، الْمُفْرَدُ وَالْمُثَنَّى وَالْجَمْعُ",
        resume: "Masculin et féminin, singulier, duel et les trois sortes de pluriel.",
        contenu: [
          { t: "p", html: "<b>Genre.</b> Le féminin se marque surtout par le <span class='ar'>ة</span> (tâ' marbûṭa) : <span class='ar'>مُؤْمِن → مُؤْمِنَة</span>. D'autres féminins : terminaison <span class='ar'>ـَىٰ</span> ou <span class='ar'>ـَاء</span> (<span class='ar'>الدُّنْيَا ، السَّمَاء</span>), et certains mots féminins par nature (<span class='ar'>أَرْض ، نَفْس ، شَمْس ، نَار</span>)." },
          { t: "p", html: "<b>Nombre.</b> L'arabe a trois nombres : singulier, <b>duel</b> (exactement deux) et pluriel." },
          { t: "table", head: ["", "Nominatif", "Accusatif / Génitif", "Exemple coranique"], rows: [
            ["Duel", "<span class='ar'>ـَانِ</span>", "<span class='ar'>ـَيْنِ</span>", "<span class='ar'>جَنَّتَانِ</span> (55:46)"],
            ["Pluriel masc. sain", "<span class='ar'>ـُونَ</span>", "<span class='ar'>ـِينَ</span>", "<span class='ar'>الْمُؤْمِنُونَ / الْمُتَّقِينَ</span>"],
            ["Pluriel fém. sain", "<span class='ar'>ـَاتٌ</span>", "<span class='ar'>ـَاتٍ</span>", "<span class='ar'>الصَّالِحَات ، آيَات</span>"]
          ]},
          { t: "p", html: "<b>Pluriel brisé</b> (<span class='ar'>جَمْع التَّكْسِير</span>) : la racine est gardée mais le schème change. C'est le plus fréquent et il faut l'apprendre avec le mot : <span class='ar'>قَلْب → قُلُوب</span>, <span class='ar'>رَسُول → رُسُل</span>, <span class='ar'>نَهْر → أَنْهَار</span>, <span class='ar'>عَبْد → عِبَاد</span>." },
          { t: "ex", ar: "وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ", fr: "Et pour celui qui aura craint la comparution devant son Seigneur, deux jardins.", ref: "55:46", note: "<span class='ar'>جَنَّة</span> + <span class='ar'>ـَانِ</span> = deux jardins." },
          { t: "ex", ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", fr: "N'est-ce point par l'évocation d'Allah que les cœurs se tranquillisent ?", ref: "13:28", note: "<span class='ar'>الْقُلُوب</span> : pluriel brisé de <span class='ar'>قَلْب</span>." },
          { t: "tip", html: "Règle d'or coranique : un pluriel de <b>non-humains</b> (choses, animaux) s'accorde au <b>féminin singulier</b> : <span class='ar'>تِلْكَ آيَاتُ اللَّهِ</span> (« ces signes », avec <span class='ar'>تِلْكَ</span> féminin singulier)." }
        ],
        exercices: [
          { type: "qcm", q: "Quel est le nombre de ce mot ?", ar: "الْمُسْلِمِينَ", options: ["Duel", "Pluriel masculin sain", "Pluriel brisé"], answer: 1, why: "Terminaison <span class='ar'>ـِينَ</span> (acc./gén.) d'un pluriel masculin sain." },
          { type: "qcm", q: "Quel est le singulier de <span class='ar'>رُسُل</span> ?", options: ["<span class='ar'>رِسَالَة</span>", "<span class='ar'>رَسُول</span>", "<span class='ar'>مُرْسَل</span>"], answer: 1, why: "<span class='ar'>رَسُول</span> → pluriel brisé <span class='ar'>رُسُل</span>." },
          { type: "qcm", q: "<span class='ar'>تُكَذِّبَانِ</span> (55:13) s'adresse à combien de destinataires ?", options: ["Un", "Deux", "Plusieurs"], answer: 1, why: "La terminaison <span class='ar'>ـَانِ</span> est celle du duel : les hommes et les djinns." },
          { type: "qcm", q: "Quel mot est féminin ?", options: ["<span class='ar'>نَفْس</span>", "<span class='ar'>قَلْب</span>", "<span class='ar'>يَوْم</span>"], answer: 0, why: "<span class='ar'>نَفْس</span> est féminin par nature : <span class='ar'>كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ</span> (3:185), avec <span class='ar'>ذَائِقَة</span> au féminin." },
          { type: "qcm", q: "Quel est le pluriel de <span class='ar'>آيَة</span> ?", options: ["<span class='ar'>آيَات</span>", "<span class='ar'>آيُونَ</span>", "<span class='ar'>أَيْوَاء</span>"], answer: 0, why: "Pluriel féminin sain : <span class='ar'>آيَات</span>." },
          { type: "qcm", q: "Pourquoi <span class='ar'>تِلْكَ آيَاتُ اللَّهِ</span> utilise-t-il un démonstratif féminin singulier ?", options: ["Parce que <span class='ar'>آيَات</span> est un pluriel de non-humains", "Par erreur de copie", "Parce que <span class='ar'>اللَّه</span> est féminin"], answer: 0, why: "Pluriel de non-humains → accord au féminin singulier." }
        ]
      },
      {
        id: "b1l5",
        titre: "Les pronoms",
        ar: "الضَّمَائِرُ",
        resume: "Pronoms isolés et suffixés : ils sont partout dans le Coran.",
        contenu: [
          { t: "p", html: "Les pronoms <b>isolés</b> (<span class='ar'>ضَمَائِر مُنْفَصِلَة</span>) sont des mots indépendants. Les pronoms <b>suffixés</b> (<span class='ar'>ضَمَائِر مُتَّصِلَة</span>) se collent à un nom (possessif), un verbe (complément) ou une préposition." },
          { t: "table", head: ["Personne", "Isolé", "Suffixé", "Exemple"], rows: [
            ["il", "<span class='ar'>هُوَ</span>", "<span class='ar'>ـهُ</span>", "<span class='ar'>رَبُّهُ</span> son Seigneur"],
            ["elle", "<span class='ar'>هِيَ</span>", "<span class='ar'>ـهَا</span>", "<span class='ar'>ضُحَاهَا</span> sa clarté"],
            ["eux deux", "<span class='ar'>هُمَا</span>", "<span class='ar'>ـهُمَا</span>", "<span class='ar'>بَيْنَهُمَا</span>"],
            ["ils", "<span class='ar'>هُمْ</span>", "<span class='ar'>ـهُمْ</span>", "<span class='ar'>عَلَيْهِمْ</span>"],
            ["elles", "<span class='ar'>هُنَّ</span>", "<span class='ar'>ـهُنَّ</span>", "<span class='ar'>لَهُنَّ</span>"],
            ["tu (m.)", "<span class='ar'>أَنْتَ</span>", "<span class='ar'>ـكَ</span>", "<span class='ar'>رَبُّكَ</span>"],
            ["tu (f.)", "<span class='ar'>أَنْتِ</span>", "<span class='ar'>ـكِ</span>", "<span class='ar'>رَبُّكِ</span>"],
            ["vous deux", "<span class='ar'>أَنْتُمَا</span>", "<span class='ar'>ـكُمَا</span>", "<span class='ar'>رَبِّكُمَا</span> (55:13)"],
            ["vous (m.)", "<span class='ar'>أَنْتُمْ</span>", "<span class='ar'>ـكُمْ</span>", "<span class='ar'>دِينُكُمْ</span>"],
            ["vous (f.)", "<span class='ar'>أَنْتُنَّ</span>", "<span class='ar'>ـكُنَّ</span>", "<span class='ar'>بُيُوتِكُنَّ</span>"],
            ["je", "<span class='ar'>أَنَا</span>", "<span class='ar'>ـي / ـنِي</span>", "<span class='ar'>دِينِ(ي)</span>, <span class='ar'>فَاعْبُدْنِي</span>"],
            ["nous", "<span class='ar'>نَحْنُ</span>", "<span class='ar'>ـنَا</span>", "<span class='ar'>اهْدِنَا</span>"]
          ]},
          { t: "p", html: "<b>Après un kasra ou un <span class='ar'>ي</span></b>, <span class='ar'>ـهُ ـهُمْ</span> deviennent <span class='ar'>ـهِ ـهِمْ</span> : <span class='ar'>فِيهِ ، عَلَيْهِمْ</span>." },
          { t: "p", html: "Avec un verbe, « me » s'écrit <span class='ar'>ـنِي</span> (avec un <span class='ar'>ن</span> de protection) : <span class='ar'>فَاعْبُدْنِي</span> « adore-moi »." },
          { t: "ex", ar: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", fr: "À vous votre religion, et à moi ma religion.", ref: "109:6", note: "<span class='ar'>لَكُمْ</span> = <span class='ar'>لِـ</span> + <span class='ar'>كُمْ</span>. <span class='ar'>دِينِ</span> = <span class='ar'>دِينِي</span> dont le <span class='ar'>ي</span> est sous-entendu (fréquent en fin de verset)." },
          { t: "ex", ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", fr: "C'est Toi que nous adorons, et c'est Toi dont nous implorons le secours.", ref: "1:5", note: "<span class='ar'>إِيَّا</span> + <span class='ar'>كَ</span> : pronom complément placé en tête pour l'exclusivité (« Toi seul »)." },
          { t: "ex", ar: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", fr: "C'est Nous qui avons fait descendre le Rappel, et c'est Nous qui en sommes les gardiens.", ref: "15:9", note: "<span class='ar'>نَحْنُ</span> isolé, <span class='ar'>ـنَا</span> suffixé (<span class='ar'>إِنَّا = إِنَّ + نَا</span>), <span class='ar'>ـهُ</span> dans <span class='ar'>لَهُ</span>." }
        ],
        exercices: [
          { type: "qcm", q: "Que signifie le suffixe dans <span class='ar'>قُلُوبُهُمْ</span> ?", options: ["leurs (m.)", "vos", "nos"], answer: 0, why: "<span class='ar'>ـهُمْ</span> = leurs (masculin pluriel) : leurs cœurs." },
          { type: "qcm", q: "Comment dit-on « nous » (pronom isolé) ?", options: ["<span class='ar'>أَنْتُمْ</span>", "<span class='ar'>نَحْنُ</span>", "<span class='ar'>هُمْ</span>"], answer: 1, why: "<span class='ar'>نَحْنُ</span>." },
          { type: "qcm", q: "Dans <span class='ar'>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</span> (1:6), que représente <span class='ar'>ـنَا</span> ?", options: ["Le sujet : nous guidons", "Le complément : guide-nous", "Un possessif : notre"], answer: 1, why: "Collé à un verbe à l'impératif, <span class='ar'>ـنَا</span> est complément : « guide-nous »." },
          { type: "qcm", q: "Pourquoi écrit-on <span class='ar'>فِيهِ</span> et non <span class='ar'>فِيهُ</span> ?", options: ["Le ه prend un kasra après un ي ou un kasra", "C'est un féminin", "C'est un duel"], answer: 0, why: "Harmonisation vocalique : <span class='ar'>ـهُ → ـهِ</span> après i/î/y." },
          { type: "qcm", q: "<span class='ar'>رَبِّكُمَا</span> signifie :", options: ["votre Seigneur (à vous deux)", "notre Seigneur", "leur Seigneur"], answer: 0, why: "<span class='ar'>ـكُمَا</span> = vous deux." },
          { type: "qcm", q: "Dans <span class='ar'>وَلِيَ دِينِ</span>, que signifie <span class='ar'>لِيَ</span> ?", options: ["pour lui", "à moi", "à nous"], answer: 1, why: "<span class='ar'>لِـ</span> + <span class='ar'>ـي</span> = à moi." }
        ]
      },
      {
        id: "b1l6",
        titre: "Démonstratifs et relatifs",
        ar: "أَسْمَاءُ الْإِشَارَةِ وَالْأَسْمَاءُ الْمَوْصُولَةُ",
        resume: "« Ceci, cela, ceux-là » et « celui qui, ce que ».",
        contenu: [
          { t: "table", head: ["", "Proche (ceci)", "Lointain (cela)"], rows: [
            ["masc. sing.", "<span class='ar'>هَٰذَا</span>", "<span class='ar'>ذَٰلِكَ</span>"],
            ["fém. sing.", "<span class='ar'>هَٰذِهِ</span>", "<span class='ar'>تِلْكَ</span>"],
            ["pluriel", "<span class='ar'>هَٰؤُلَاءِ</span>", "<span class='ar'>أُولَٰئِكَ</span>"]
          ]},
          { t: "ex", ar: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", fr: "Ceux-là sont sur une guidée de leur Seigneur, et ce sont eux qui réussissent.", ref: "2:5", note: "Le lointain <span class='ar'>أُولَٰئِكَ</span> exprime souvent l'élévation du rang, pas seulement la distance." },
          { t: "ex", ar: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ", fr: "Ce Coran guide vers ce qui est le plus droit.", ref: "17:9", note: "<span class='ar'>هَٰذَا</span> + nom défini = « ce Coran »." },
          { t: "p", html: "<b>Relatifs</b> (<span class='ar'>الْأَسْمَاء الْمَوْصُولَة</span>) : ils relient un nom à une proposition qui le décrit (la <span class='ar'>صِلَة</span>)." },
          { t: "table", head: ["Relatif", "Emploi"], rows: [
            ["<span class='ar'>الَّذِي</span>", "celui qui / que (m. sing.)"],
            ["<span class='ar'>الَّتِي</span>", "celle qui (f. sing.), et pluriel de non-humains"],
            ["<span class='ar'>الَّذِينَ</span>", "ceux qui (m. pl.) : extrêmement fréquent"],
            ["<span class='ar'>اللَّاتِي / اللَّائِي</span>", "celles qui (f. pl.)"],
            ["<span class='ar'>مَنْ</span>", "celui qui, quiconque (êtres doués de raison)"],
            ["<span class='ar'>مَا</span>", "ce que (choses)"]
          ]},
          { t: "ex", ar: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ", fr: "Ceux qui croient à l'invisible.", ref: "2:3", note: "<span class='ar'>الَّذِينَ</span> + phrase verbale (la ṣila)." },
          { t: "ex", ar: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ", fr: "Béni soit Celui dans la main de qui est la royauté.", ref: "67:1", note: "Remarque le pronom de rappel <span class='ar'>ـهِ</span> dans <span class='ar'>بِيَدِهِ</span>, qui renvoie à <span class='ar'>الَّذِي</span>." },
          { t: "tip", html: "<span class='ar'>مَا</span> et <span class='ar'>مَنْ</span> ont plusieurs emplois (relatif, interrogatif, négation pour <span class='ar'>مَا</span>, conditionnel). On les reverra au bloc 7. Le contexte tranche." }
        ],
        exercices: [
          { type: "qcm", q: "Traduisez <span class='ar'>ذَٰلِكَ</span> :", options: ["ceci", "cela (m.)", "celle-là"], answer: 1, why: "<span class='ar'>ذَٰلِكَ</span> : démonstratif lointain masculin." },
          { type: "qcm", q: "Quel démonstratif pour <span class='ar'>آيَاتُ اللَّهِ</span> (lointain) ?", options: ["<span class='ar'>أُولَٰئِكَ</span>", "<span class='ar'>تِلْكَ</span>", "<span class='ar'>ذَٰلِكَ</span>"], answer: 1, why: "Pluriel de non-humains → féminin singulier : <span class='ar'>تِلْكَ آيَاتُ اللَّهِ</span>." },
          { type: "qcm", q: "Complétez : <span class='ar'>صِرَاطَ ___ أَنْعَمْتَ عَلَيْهِمْ</span> (1:7)", options: ["<span class='ar'>الَّذِي</span>", "<span class='ar'>الَّتِي</span>", "<span class='ar'>الَّذِينَ</span>"], answer: 2, why: "« Ceux que Tu as comblés » : masculin pluriel, confirmé par <span class='ar'>عَلَيْهِمْ</span>." },
          { type: "qcm", q: "Dans <span class='ar'>اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</span>, à qui renvoie <span class='ar'>الَّذِي</span> ?", options: ["À <span class='ar'>اسْم</span>", "À <span class='ar'>رَبّ</span>", "Au lecteur"], answer: 1, why: "« Ton Seigneur qui a créé »." },
          { type: "qcm", q: "Quel relatif pour « ce que » (une chose) ?", options: ["<span class='ar'>مَنْ</span>", "<span class='ar'>مَا</span>", "<span class='ar'>الَّذِينَ</span>"], answer: 1, why: "<span class='ar'>لَا أَعْبُدُ مَا تَعْبُدُونَ</span> (109:2) : je n'adore pas ce que vous adorez." },
          { type: "qcm", q: "<span class='ar'>هَٰؤُلَاءِ</span> signifie :", options: ["ceux-ci", "ceux-là", "celui-ci"], answer: 0, why: "Pluriel proche." }
        ]
      }
    ]
  },
  {
    id: "b2", titre: "La phrase et les cas", ar: "الْجُمْلَةُ وَالْإِعْرَابُ",
    objectif: "Lire une phrase coranique en comprenant qui fait quoi, grâce aux cas.",
    lecons: [
      { id: "b2l1", titre: "La phrase nominale", ar: "الْمُبْتَدَأُ وَالْخَبَرُ", resume: "Sujet + attribut sans verbe « être » : اللَّهُ الصَّمَدُ." },
      { id: "b2l2", titre: "Les trois cas", ar: "الرَّفْعُ وَالنَّصْبُ وَالْجَرُّ", resume: "Nominatif, accusatif, génitif : signes principaux et secondaires." },
      { id: "b2l3", titre: "Les prépositions", ar: "حُرُوفُ الْجَرِّ", resume: "مِنْ، إِلَى، عَنْ، عَلَى، فِي، بِـ، لِـ، كَـ et le groupe prépositionnel." },
      { id: "b2l4", titre: "L'annexion", ar: "الْإِضَافَةُ", resume: "رَبِّ الْعَالَمِينَ : la construction la plus fréquente du Coran." },
      { id: "b2l5", titre: "L'adjectif et l'accord", ar: "النَّعْتُ", resume: "الصِّرَاطَ الْمُسْتَقِيمَ : accord en cas, genre, nombre et définition." },
      { id: "b2l6", titre: "La phrase verbale", ar: "الْفِعْلُ وَالْفَاعِلُ وَالْمَفْعُولُ بِهِ", resume: "Verbe, sujet, complément d'objet, et l'accord du verbe." }
    ]
  },
  {
    id: "b3", titre: "Le verbe", ar: "الْفِعْلُ",
    objectif: "Conjuguer et reconnaître le verbe sain à tous ses temps et modes.",
    lecons: [
      { id: "b3l1", titre: "L'accompli (passé)", ar: "الْفِعْلُ الْمَاضِي", resume: "Les 14 personnes de فَعَلَ." },
      { id: "b3l2", titre: "L'inaccompli (présent-futur)", ar: "الْفِعْلُ الْمُضَارِعُ", resume: "Préfixes أ ن ي ت et suffixes." },
      { id: "b3l3", titre: "L'impératif et l'interdiction", ar: "الْأَمْرُ وَالنَّهْيُ", resume: "اقْرَأْ، اعْبُدُوا، لَا تَقْنَطُوا." },
      { id: "b3l4", titre: "Les négations", ar: "النَّفْيُ", resume: "مَا، لَا، لَمْ، لَنْ، لَيْسَ : chacune son temps." },
      { id: "b3l5", titre: "Subjonctif et apocopé", ar: "الْمَنْصُوبُ وَالْمَجْزُومُ", resume: "Après أَنْ، لَنْ، لِـ، كَيْ / لَمْ، لَا الناهية، الشرط." },
      { id: "b3l6", titre: "Le passif", ar: "الْمَبْنِيُّ لِلْمَجْهُولِ", resume: "خُلِقَ، يُولَدُ، أُنزِلَ." }
    ]
  },
  {
    id: "b4", titre: "Les formes verbales", ar: "الْأَفْعَالُ الْمَزِيدَةُ",
    objectif: "Deviner le sens d'un verbe à partir de sa forme (II à X) : l'outil le plus rentable pour le vocabulaire coranique.",
    lecons: [
      { id: "b4l1", titre: "Le principe des formes", ar: "الْمُجَرَّدُ وَالْمَزِيدُ", resume: "Pourquoi 10 formes, et comment les repérer." },
      { id: "b4l2", titre: "Formes II et III", ar: "فَعَّلَ وَفَاعَلَ", resume: "نَزَّلَ، عَلَّمَ / جَاهَدَ، قَاتَلَ." },
      { id: "b4l3", titre: "Forme IV", ar: "أَفْعَلَ", resume: "أَنزَلَ، أَرْسَلَ، أَسْلَمَ." },
      { id: "b4l4", titre: "Formes V et VI", ar: "تَفَعَّلَ وَتَفَاعَلَ", resume: "تَذَكَّرَ، تَوَكَّلَ / تَبَارَكَ، تَسَاءَلَ." },
      { id: "b4l5", titre: "Formes VII et VIII", ar: "انْفَعَلَ وَافْتَعَلَ", resume: "انقَلَبَ / اتَّقَى، اخْتَلَفَ، اهْتَدَى." },
      { id: "b4l6", titre: "Forme X", ar: "اسْتَفْعَلَ", resume: "اسْتَغْفَرَ، اسْتَكْبَرَ، نَسْتَعِينُ." },
      { id: "b4l7", titre: "Les masdars des formes", ar: "مَصَادِرُ الْمَزِيدِ", resume: "تَنزِيل، جِهَاد، إِسْلَام، اسْتِغْفَار…" }
    ]
  },
  {
    id: "b5", titre: "Les dérivés", ar: "الْمُشْتَقَّاتُ",
    objectif: "Reconnaître participes, adjectifs et noms dérivés, qui forment la majorité des noms du Coran.",
    lecons: [
      { id: "b5l1", titre: "Participe actif", ar: "اسْمُ الْفَاعِلِ", resume: "كَافِر، مُؤْمِن، مُسْلِم, forme I et formes augmentées." },
      { id: "b5l2", titre: "Participe passif", ar: "اسْمُ الْمَفْعُولِ", resume: "مَغْضُوب، مَعْلُوم، مُنزَل" },
      { id: "b5l3", titre: "Adjectifs et intensifs", ar: "الصِّفَةُ الْمُشَبَّهَةُ وَصِيَغُ الْمُبَالَغَةِ", resume: "رَحِيم، غَفُور، عَلَّام، رَحْمَٰن." },
      { id: "b5l4", titre: "Comparatif et superlatif", ar: "اسْمُ التَّفْضِيلِ", resume: "أَكْبَر، أَعْلَم، أَحْسَن، الْحُسْنَىٰ." },
      { id: "b5l5", titre: "Noms de lieu, de temps, d'instrument", ar: "اسْمُ الْمَكَانِ وَالزَّمَانِ وَالْآلَةِ", resume: "مَسْجِد، مَوْعِد، مِيزَان." }
    ]
  },
  {
    id: "b6", titre: "Les verbes faibles", ar: "الْفِعْلُ الْمُعْتَلُّ",
    objectif: "Maîtriser les verbes contenant و، ي ou hamza : une grande partie des verbes les plus fréquents du Coran (قَالَ، كَانَ، جَاءَ، أَتَى).",
    lecons: [
      { id: "b6l1", titre: "Verbes hamzés", ar: "الْمَهْمُوزُ", resume: "أَمَنَ → آمَنَ، أَخَذَ، قَرَأَ، سَأَلَ." },
      { id: "b6l2", titre: "Verbes assimilés", ar: "الْمِثَالُ", resume: "وَعَدَ → يَعِدُ، وَجَدَ، وَضَعَ." },
      { id: "b6l3", titre: "Verbes creux", ar: "الْأَجْوَفُ", resume: "قَالَ → يَقُولُ → قُلْ ; كَانَ، خَافَ، جَاءَ." },
      { id: "b6l4", titre: "Verbes défectueux", ar: "النَّاقِصُ", resume: "دَعَا، هَدَى، أَتَى، نَسِيَ." },
      { id: "b6l5", titre: "Verbes sourds (doublés)", ar: "الْمُضَعَّفُ", resume: "ظَنَّ، مَدَّ، ضَلَّ، يَمُدُّ." }
    ]
  },
  {
    id: "b7", titre: "Outils de la phrase", ar: "النَّوَاسِخُ وَالْأَدَوَاتُ",
    objectif: "Les petits mots qui changent tout : إِنَّ، كَانَ، إِلَّا، إِنْ، لَوْ…",
    lecons: [
      { id: "b7l1", titre: "كَانَ et ses sœurs", ar: "كَانَ وَأَخَوَاتُهَا", resume: "وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا : l'attribut à l'accusatif." },
      { id: "b7l2", titre: "إِنَّ et ses sœurs", ar: "إِنَّ وَأَخَوَاتُهَا", resume: "إِنَّ، أَنَّ، لَكِنَّ، كَأَنَّ، لَعَلَّ، لَيْتَ." },
      { id: "b7l3", titre: "Particules de temps et d'insistance", ar: "قَدْ ، سَـ ، سَوْفَ ، لَامُ التَّوْكِيدِ", resume: "قَدْ أَفْلَحَ، لَقَدْ، سَوْفَ تَعْلَمُونَ." },
      { id: "b7l4", titre: "La condition", ar: "الشَّرْطُ", resume: "إِنْ، إِذَا، لَوْ، مَنْ، مَا." },
      { id: "b7l5", titre: "Exception et restriction", ar: "الِاسْتِثْنَاءُ وَالْحَصْرُ", resume: "لَا إِلَٰهَ إِلَّا اللَّهُ، إِنَّمَا." },
      { id: "b7l6", titre: "L'interrogation", ar: "الِاسْتِفْهَامُ", resume: "أَ، هَلْ، مَا، مَنْ، كَيْفَ، أَيْنَ، مَتَىٰ، أَنَّىٰ." }
    ]
  },
  {
    id: "b8", titre: "Compléments et style coranique", ar: "الْمَنْصُوبَاتُ وَالْأَسَالِيبُ",
    objectif: "Les accusatifs « mystérieux » et les tournures propres au Coran.",
    lecons: [
      { id: "b8l1", titre: "Le complément d'état", ar: "الْحَالُ", resume: "Dans quel état se fait l'action." },
      { id: "b8l2", titre: "Le complément absolu", ar: "الْمَفْعُولُ الْمُطْلَقُ", resume: "وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا." },
      { id: "b8l3", titre: "Compléments de but, de temps et de lieu", ar: "الْمَفْعُولُ لِأَجْلِهِ وَفِيهِ", resume: "Pourquoi, quand, où." },
      { id: "b8l4", titre: "Le tamyîz et les nombres", ar: "التَّمْيِيزُ وَالْعَدَدُ", resume: "أَحَدَ عَشَرَ كَوْكَبًا." },
      { id: "b8l5", titre: "L'apostrophe", ar: "النِّدَاءُ", resume: "يَا أَيُّهَا الَّذِينَ آمَنُوا، رَبَّنَا." },
      { id: "b8l6", titre: "Serment et emphase", ar: "الْقَسَمُ وَالتَّوْكِيدُ", resume: "وَالْعَصْرِ، لَـ، نُونُ التَّوْكِيدِ." }
    ]
  }
];
