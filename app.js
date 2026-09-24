/* Arabe du Coran — application (vanilla JS, sans dépendance). */
(() => {
  "use strict";

  // ————————————————— État persistant —————————————————
  const KEY = "arabe-coran-v1";
  const defaults = {
    xp: 0, streak: 0, lastDay: null,
    lessons: {},          // id → { stars, best }
    srs: {},              // mot arabe → { box, due }
    games: {},            // nom → meilleur score
    settings: { pool: "all", sound: true, theme: "auto", arSize: 1.6, unlockAll: false }
  };
  let S;
  try { S = Object.assign(structuredClone(defaults), JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch { S = structuredClone(defaults); }
  S.settings = Object.assign({}, defaults.settings, S.settings);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };

  const today = () => new Date().toISOString().slice(0, 10);
  function touchStreak() {
    const t = today();
    if (S.lastDay === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak = S.lastDay === y ? S.streak + 1 : 1;
    S.lastDay = t;
  }
  function addXP(n) { S.xp += n; touchStreak(); save(); renderChips(); }

  // ————————————————— Utilitaires —————————————————
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $("#app");
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const ar = t => `<span class="ar" lang="ar">${t}</span>`;
  const strip = t => t.replace(/[ً-ٰٟۖ-ۭ]/g, "");
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const starStr = n => "★".repeat(n) + "☆".repeat(3 - n);

  function applySettings() {
    document.documentElement.style.setProperty("--ar-size", S.settings.arSize + "rem");
    if (S.settings.theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", S.settings.theme);
  }
  function renderChips() { $("#xp").textContent = S.xp; $("#streak").textContent = S.streak; }

  // ————————————————— Sons —————————————————
  let actx;
  function tone(freqs, dur = 0.12, type = "sine") {
    if (!S.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      let t = actx.currentTime;
      freqs.forEach(f => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur);
        t += dur * 0.9;
      });
    } catch {}
  }
  const sGood = () => tone([660, 880]);
  const sBad = () => tone([220, 170], 0.16, "triangle");
  const sWin = () => tone([523, 659, 784, 1046], 0.13);

  // Prononciation (si une voix arabe existe sur l'appareil)
  let arVoice = null;
  function loadVoices() { arVoice = (speechSynthesis.getVoices() || []).find(v => v.lang && v.lang.toLowerCase().startsWith("ar")) || null; }
  if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function say(t) {
    if (!arVoice) return;
    const u = new SpeechSynthesisUtterance(t); u.voice = arVoice; u.lang = arVoice.lang; u.rate = 0.8;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  const sayBtn = t => arVoice ? `<button class="btn ghost" data-say="${esc(t)}" aria-label="Écouter" style="padding:6px 12px">🔊</button>` : "";
  document.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { e.stopPropagation(); say(b.dataset.say); } });

  // ————————————————— Confettis —————————————————
  function confetti() {
    const colors = ["#1f8a70", "#f2a541", "#e0554f", "#4f7cf2", "#9b5de5"];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3800);
    }
  }

  // ————————————————— Mascotte : Houdhoud la huppe —————————————————
  function mascot(mood = "happy") {
    const eye = mood === "sad" ? `<path d="M58 44 q4 -3 8 0" stroke="#2b2a33" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : `<circle cx="62" cy="43" r="4.5" fill="#2b2a33"/><circle cx="63.5" cy="41.5" r="1.5" fill="#fff"/>`;
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="#2b2a33" stroke-width="1.5">
        <path d="M44 30 L30 6 L40 8 L46 26 L46 4 L54 6 L52 26 L62 6 L68 12 L56 30 Z" fill="#f2a541"/>
        <path d="M30 6 L33 12 M46 4 L47 10 M62 6 L60 11" stroke-width="4" stroke="#2b2a33"/>
      </g>
      <ellipse cx="50" cy="62" rx="26" ry="24" fill="#f5c07a" stroke="#2b2a33" stroke-width="1.5"/>
      <ellipse cx="55" cy="45" rx="17" ry="15" fill="#f5c07a" stroke="#2b2a33" stroke-width="1.5"/>
      <path d="M28 58 Q40 50 52 60 Q44 80 30 78 Z" fill="#fff" stroke="#2b2a33" stroke-width="1.5"/>
      <path d="M32 62 L46 60 M31 68 L45 66 M32 74 L42 72" stroke="#2b2a33" stroke-width="3"/>
      <path d="M70 46 L94 52 L70 50 Z" fill="#2b2a33"/>
      ${eye}
      <circle cx="68" cy="52" r="3" fill="#f08a7a" opacity=".6"/>
      <path d="M42 85 L40 94 M56 85 L58 94" stroke="#2b2a33" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }

  // ————————————————— Données dérivées —————————————————
  const CUR = window.CURRICULUM, VOC = window.VOCAB, RAC = window.RACINES;
  const allLessons = CUR.flatMap((b, bi) => b.lecons.map((l, li) => ({ ...l, bloc: b, bi, li })));
  const findLesson = id => allLessons.find(l => l.id === id);
  const isDone = id => (S.lessons[id]?.stars || 0) > 0;
  function isUnlocked(l) {
    if (S.settings.unlockAll) return true;
    const i = allLessons.indexOf(l);
    return i === 0 || isDone(allLessons[i - 1].id);
  }
  const nextLesson = () => allLessons.find(l => l.contenu && !isDone(l.id) && isUnlocked(l));
  function pool() {
    const p = S.settings.pool;
    return VOC.filter(w => p === "all" || (p === "n1" ? w.n === 1 : w.n === 2));
  }
  const typeLabel = { n: "nom", v: "verbe", a: "adjectif", p: "particule" };

  // ————————————————— Routeur —————————————————
  let cleanup = null;
  function setHeader(title, back) {
    $("#title").textContent = title;
    const b = $("#back"); b.hidden = !back; b.onclick = () => { location.hash = back; };
  }
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    const parts = (location.hash.slice(2) || "").split("/");
    const [page, arg] = parts;
    $$(".nav a").forEach(a => a.classList.toggle("on", a.dataset.nav === (page || "home") || (page === "lecon" && a.dataset.nav === "parcours") || (page === "jeu" && a.dataset.nav === "jeux")));
    window.scrollTo(0, 0);
    const views = { "": home, parcours, lecon: () => lecon(arg), jeux, jeu: () => jeu(arg), mots, profil };
    (views[page] || home)();
  }
  window.addEventListener("hashchange", route);

  // ————————————————— Accueil —————————————————
  function home() {
    setHeader("Arabe du Coran");
    const nl = nextLesson();
    const done = allLessons.filter(l => isDone(l.id)).length;
    const avail = allLessons.filter(l => l.contenu).length;
    const due = Object.values(S.srs).filter(c => c.due <= today()).length;
    const hello = S.xp === 0 ? "Salâm ! Je suis Houdhoud, la huppe de Soulaymân. On apprend la langue du Coran ensemble ?"
      : due ? `Tu as ${due} mot${due > 1 ? "s" : ""} à réviser aujourd'hui !` : "Content de te revoir ! On continue ?";
    app.innerHTML = `
      <div class="card hero">${mascot()}<div class="bubble">${hello}</div></div>
      ${nl ? `<div class="card">
        <div class="bloc-num">Bloc ${nl.bi + 1} · Leçon ${nl.li + 1}</div>
        <h2>${nl.titre}</h2>
        <p class="muted small" style="margin:0 0 4px">${ar(nl.ar)}</p>
        <p class="small">${nl.resume}</p>
        <a class="btn block" href="#/lecon/${nl.id}">▶ Continuer</a>
      </div>` : `<div class="card"><h2>Bravo !</h2><p>Tu as terminé toutes les leçons disponibles. Les suivantes arrivent bientôt, en attendant : joue !</p></div>`}
      <div class="card">
        <h2>Ta progression</h2>
        <div class="bar"><i style="width:${Math.round(done / allLessons.length * 100)}%"></i></div>
        <p class="small muted">${done} leçon${done > 1 ? "s" : ""} terminée${done > 1 ? "s" : ""} sur ${allLessons.length} (${avail} disponibles pour l'instant)</p>
      </div>
      <div class="row">
        <a class="btn accent" href="#/jeu/cartes">🃏 Réviser${due ? ` (${due})` : ""}</a>
        <a class="btn ghost" href="#/jeux">🎮 Jouer</a>
      </div>`;
  }

  // ————————————————— Parcours —————————————————
  function parcours() {
    setHeader("Parcours");
    app.innerHTML = CUR.map((b, bi) => {
      const n = b.lecons.filter(l => isDone(l.id)).length;
      return `<section class="card">
        <div class="bloc-head"><span class="bloc-num">Bloc ${bi + 1}</span><span class="small muted">${n}/${b.lecons.length}</span></div>
        <h2>${b.titre}</h2>
        <div class="muted">${ar(b.ar)}</div>
        <p class="small">${b.objectif}</p>
        <ul class="lessons">${b.lecons.map((l, li) => {
          const L = findLesson(l.id);
          const soon = !l.contenu, lock = !soon && !isUnlocked(L), st = S.lessons[l.id]?.stars || 0;
          const cls = soon || lock ? "locked" : st ? "done" : "";
          const dot = soon ? "⏳" : lock ? "🔒" : st ? "✓" : li + 1;
          return `<li><button class="lesson ${cls}" data-id="${l.id}" ${soon || lock ? "disabled" : ""}>
            <span class="dot">${dot}</span>
            <span class="t"><b>${l.titre}</b><span class="small muted">${soon ? "Bientôt" : l.resume}</span></span>
            ${st ? `<span class="stars">${starStr(st)}</span>` : ""}
          </button></li>`;
        }).join("")}</ul>
      </section>`;
    }).join("");
    $$(".lesson:not([disabled])").forEach(b => b.onclick = () => location.hash = "#/lecon/" + b.dataset.id);
  }

  // ————————————————— Leçon —————————————————
  function section(s) {
    if (s.t === "p") return `<p>${s.html}</p>`;
    if (s.t === "tip") return `<div class="tip">${s.html}</div>`;
    if (s.t === "ex") return `<div class="ex">
        <p class="verse ar" lang="ar">${s.ar}</p>
        <div class="row" style="align-items:center"><span class="ref">📖 ${s.ref}</span><span style="flex:0">${sayBtn(s.ar)}</span></div>
        <p class="fr">${s.fr}</p>
        ${s.note ? `<div class="note">${s.note}</div>` : ""}
      </div>`;
    if (s.t === "table") return `<div class="table-wrap"><table><thead><tr>${s.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${s.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    return "";
  }
  function lecon(id) {
    const l = findLesson(id);
    if (!l || !l.contenu) { location.hash = "#/parcours"; return; }
    setHeader(`Leçon ${l.li + 1} · ${l.titre}`, "#/parcours");
    app.innerHTML = `
      <div class="card">
        <div class="bloc-num">Bloc ${l.bi + 1} · ${l.bloc.titre}</div>
        <h2>${l.titre}</h2>
        <div class="muted" style="font-size:1.2rem">${ar(l.ar)}</div>
      </div>
      <div class="card lesson-body">${l.contenu.map(section).join("")}</div>
      <button class="btn block" id="go">🎯 Faire les exercices (${l.exercices.length})</button>`;
    $("#go").onclick = () => runQuiz(
      l.exercices.map(e => {
        const idx = shuffle(e.options.map((_, i) => i));
        return { ...e, options: idx.map(i => e.options[i]), answer: idx.indexOf(e.answer) };
      }),
      {
        back: "#/lecon/" + id,
        onEnd: (score, total) => {
          const r = score / total, st = r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.5 ? 1 : 0;
          const prev = S.lessons[id]?.stars || 0;
          if (st > 0) { S.lessons[id] = { stars: Math.max(prev, st), best: Math.max(S.lessons[id]?.best || 0, score) }; }
          addXP(score);
          return { stars: st, msg: st ? "Leçon validée !" : "Presque ! Relis la leçon et réessaie.", next: st ? nextLesson() : null };
        }
      });
  }

  // Moteur de QCM générique (leçons + jeu QCM)
  function runQuiz(qs, opts) {
    let i = 0, score = 0;
    const show = () => {
      if (i >= qs.length) return end();
      const q = qs[i];
      const arOpts = q.options.every(o => /^[؀-ۿ\s]+$/.test(strip(o)));
      app.innerHTML = `
        <div class="hud"><span>${i + 1} / ${qs.length}</span><span>✅ ${score}</span></div>
        <div class="bar" style="margin-bottom:14px"><i style="width:${i / qs.length * 100}%"></i></div>
        <div class="card pop">
          <p style="margin:0;font-weight:800">${q.q}</p>
          ${q.ar ? `<div class="q-ar ar" lang="ar">${q.ar}</div>` : ""}
          <div class="opts">${q.options.map((o, k) => `<button class="opt ${arOpts ? "ar-opt ar" : ""}" data-k="${k}">${o}</button>`).join("")}</div>
          <div id="fb"></div>
        </div>`;
      $$(".opt").forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.answer;
        $$(".opt").forEach(x => x.disabled = true);
        b.classList.add(ok ? "good" : "bad");
        $$(".opt")[q.answer].classList.add("good");
        if (ok) { score++; sGood(); } else sBad();
        $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"} pop"><b>${ok ? "Bravo ! 🎉" : "Pas tout à fait…"}</b>${q.why ? `<div class="small">${q.why}</div>` : ""}</div>
          <button class="btn block" id="nx" style="margin-top:12px">${i + 1 < qs.length ? "Suivant →" : "Voir mon score"}</button>`;
        $("#nx").onclick = () => { i++; show(); };
      });
    };
    const end = () => {
      const res = opts.onEnd(score, qs.length);
      endScreen({ stars: res.stars, title: res.msg, sub: `${score} / ${qs.length} bonnes réponses`, again: () => runQuiz(shuffle(qs), opts), next: res.next, back: opts.back });
    };
    show();
  }

  function endScreen({ stars, title, sub, again, next, back }) {
    if (stars >= 2) { sWin(); confetti(); }
    app.innerHTML = `<div class="card end pop">
      <div style="width:120px;margin:0 auto">${mascot(stars ? "happy" : "sad")}</div>
      <div class="big-stars" style="color:var(--accent)">${starStr(stars)}</div>
      <h2>${title}</h2><p class="muted">${sub}</p>
      <div class="row" style="flex-direction:column">
        ${next ? `<a class="btn block" href="#/lecon/${next.id}">Leçon suivante : ${next.titre} →</a>` : ""}
        <button class="btn ghost block" id="again">🔁 Rejouer</button>
        <a class="btn ghost block" href="${back}">Retour</a>
      </div></div>`;
    $("#again").onclick = again;
  }

  // ————————————————— Jeux —————————————————
  const GAMES = [
    { id: "cartes", e: "🃏", t: "Cartes mémoire", d: "Révision espacée : chaque mot revient au bon moment." },
    { id: "qcm", e: "✅", t: "Quiz éclair", d: "10 questions, 4 réponses." },
    { id: "paires", e: "🧠", t: "Paires", d: "Retourne les cartes et trouve les paires arabe / français." },
    { id: "pluie", e: "🌧️", t: "Pluie de mots", d: "Attrape le sens avant que le mot touche le sol !" },
    { id: "racines", e: "🌳", t: "Famille de racines", d: "Trouve tous les mots qui viennent de la même racine." },
    { id: "tri", e: "🗂️", t: "Le trieur", d: "Nom, verbe ou particule ? Range chaque mot." },
    { id: "lettres", e: "🧩", t: "Construis le mot", d: "Remets les lettres dans l'ordre." }
  ];
  function poolSeg() {
    const p = S.settings.pool;
    return `<div class="seg" id="poolseg">
      <button data-p="n1" class="${p === "n1" ? "on" : ""}">Mots fréquents</button>
      <button data-p="n2" class="${p === "n2" ? "on" : ""}">Mots rares</button>
      <button data-p="all" class="${p === "all" ? "on" : ""}">Tous</button></div>`;
  }
  function bindPoolSeg(cb) {
    $$("#poolseg button").forEach(b => b.onclick = () => { S.settings.pool = b.dataset.p; save(); cb(); });
  }
  function jeux() {
    setHeader("Jeux");
    app.innerHTML = `${poolSeg()}
      <div class="games">${GAMES.map(g => `<a class="game-tile" href="#/jeu/${g.id}">
        <span class="e">${g.e}</span><b>${g.t}</b><span>${g.d}</span>
        ${S.games[g.id] ? `<span>🏆 ${S.games[g.id]}</span>` : ""}</a>`).join("")}</div>`;
    bindPoolSeg(jeux);
  }
  function jeu(id) {
    const g = GAMES.find(x => x.id === id);
    if (!g) { location.hash = "#/jeux"; return; }
    setHeader(g.e + " " + g.t, "#/jeux");
    ({ cartes: gCartes, qcm: gQcm, paires: gPaires, pluie: gPluie, racines: gRacines, tri: gTri, lettres: gLettres })[id]();
  }
  function best(id, score) { if (score > (S.games[id] || 0)) S.games[id] = score; save(); }
  const gameEnd = (id, score, total, again, unit = "points") => {
    best(id, score); addXP(Math.max(1, Math.round(score / 2)));
    const r = total ? score / total : Math.min(1, score / 20);
    endScreen({ stars: r >= 0.9 ? 3 : r >= 0.6 ? 2 : r > 0 ? 1 : 0, title: r >= 0.9 ? "Excellent !" : r >= 0.6 ? "Bien joué !" : "Continue, tu progresses !", sub: total ? `${score} / ${total}` : `${score} ${unit}`, again, back: "#/jeux" });
  };

  // 🃏 Cartes mémoire (Leitner)
  const BOX_DAYS = [0, 1, 3, 7, 16, 35];
  function gCartes() {
    const t = today();
    const p = pool();
    const due = p.filter(w => S.srs[w.ar] && S.srs[w.ar].due <= t);
    const fresh = shuffle(p.filter(w => !S.srs[w.ar])).slice(0, Math.max(0, 12 - due.length));
    const deck = shuffle([...due, ...fresh]).slice(0, 15);
    if (!deck.length) {
      app.innerHTML = `${poolSeg()}<div class="card end">${mascot()}<h2>Rien à réviser !</h2><p class="muted">Tous les mots de cette sélection sont révisés pour aujourd'hui. Reviens demain, ou change de sélection.</p><a class="btn" href="#/jeux">Autres jeux</a></div>`;
      bindPoolSeg(gCartes); return;
    }
    let i = 0, known = 0;
    const show = () => {
      if (i >= deck.length) return gameEnd("cartes", known, deck.length, gCartes);
      const w = deck[i];
      app.innerHTML = `
        <div class="hud"><span>${i + 1} / ${deck.length}</span><span>${S.srs[w.ar] ? "Révision" : "Nouveau"}</span></div>
        <div class="flash" id="fc"><div class="inner">
          <div class="face"><div class="big ar" lang="ar">${w.ar}</div><div class="small muted">Touche pour retourner</div></div>
          <div class="face back">
            <div class="ar" lang="ar" style="font-size:1.8rem">${w.ar}</div>
            <div class="mean">${w.fr}</div>
            <div class="small muted">${typeLabel[w.t]}${w.r ? " · racine " + ar(w.r) : ""}</div>
            ${sayBtn(w.ar)}
          </div></div></div>
        <div class="row" id="ans" style="visibility:hidden">
          <button class="btn ghost" id="no">😕 À revoir</button>
          <button class="btn" id="yes">😄 Je savais</button>
        </div>`;
      $("#fc").onclick = () => { $("#fc").classList.toggle("flipped"); $("#ans").style.visibility = "visible"; };
      const grade = ok => {
        const c = S.srs[w.ar] || { box: 0 };
        c.box = ok ? Math.min(c.box + 1, BOX_DAYS.length - 1) : 1;
        c.due = new Date(Date.now() + BOX_DAYS[c.box] * 864e5).toISOString().slice(0, 10);
        S.srs[w.ar] = c; save();
        if (ok) { known++; sGood(); } else sBad();
        i++; show();
      };
      $("#yes").onclick = () => grade(true);
      $("#no").onclick = () => grade(false);
    };
    show();
  }

  // ✅ Quiz éclair
  function gQcm() {
    const p = pool();
    const qs = sample(p, 10).map(w => {
      const others = sample(p.filter(x => x.fr !== w.fr), 3);
      const toFr = Math.random() < 0.65;
      const options = shuffle([w, ...others]);
      return toFr
        ? { q: "Que signifie ce mot ?", ar: w.ar, options: options.map(o => esc(o.fr)), answer: options.indexOf(w), why: `${ar(w.ar)} = ${esc(w.fr)}${w.r ? " · racine " + ar(w.r) : ""}` }
        : { q: `Comment dit-on « ${esc(w.fr)} » ?`, options: options.map(o => o.ar), answer: options.indexOf(w), why: `${ar(w.ar)} = ${esc(w.fr)}` };
    });
    runQuiz(qs, { back: "#/jeux", onEnd: (s, t) => { best("qcm", s); addXP(s); const r = s / t; return { stars: r >= 0.9 ? 3 : r >= 0.6 ? 2 : s ? 1 : 0, msg: r >= 0.9 ? "Excellent !" : "Bien joué !" }; } });
  }

  // 🧠 Paires
  function gPaires() {
    const words = sample(pool().filter(w => w.fr.length < 26), 6);
    const cards = shuffle(words.flatMap((w, k) => [{ k, txt: w.ar, isAr: true }, { k, txt: w.fr, isAr: false }]));
    let open = [], found = 0, moves = 0, lock = false;
    app.innerHTML = `<div class="hud"><span>Coups : <span id="mv">0</span></span><span>Paires : <span id="fd">0</span>/6</span></div>
      <div class="memory">${cards.map((c, i) => `<button class="mcard" data-i="${i}"><span class="hid">❓</span></button>`).join("")}</div>`;
    $$(".mcard").forEach(b => b.onclick = () => {
      const i = +b.dataset.i, c = cards[i];
      if (lock || b.classList.contains("show")) return;
      b.classList.add("show"); if (c.isAr) b.classList.add("arw");
      b.innerHTML = c.isAr ? ar(c.txt) : esc(c.txt);
      if (c.isAr) say(c.txt);
      open.push(b);
      if (open.length === 2) {
        moves++; $("#mv").textContent = moves;
        const [a, d] = open.map(x => cards[+x.dataset.i]);
        if (a.k === d.k && a.isAr !== d.isAr) {
          open.forEach(x => x.classList.add("ok")); open = []; found++; $("#fd").textContent = found; sGood();
          if (found === 6) setTimeout(() => { const sc = Math.max(1, 18 - moves); gameEnd("paires", sc, 12, gPaires); }, 600);
        } else {
          lock = true; sBad();
          setTimeout(() => { open.forEach(x => { x.classList.remove("show", "arw"); x.innerHTML = `<span class="hid">❓</span>`; }); open = []; lock = false; }, 900);
        }
      }
    });
  }

  // 🌧️ Pluie de mots
  function gPluie() {
    const p = pool();
    let lives = 3, score = 0, speed = 38, y = 0, cur, raf, last, alive = true;
    app.innerHTML = `<div class="hud"><span class="hearts" id="hp"></span><span>Score : <b id="sc">0</b></span></div>
      <div class="rain" id="rain"><div class="drop ar" lang="ar" id="drop"></div><div class="ground"></div></div>
      <div class="opts" id="ch"></div>`;
    const hp = () => $("#hp").textContent = "❤️".repeat(lives) + "🤍".repeat(3 - lives);
    const H = () => $("#rain").clientHeight - 60;
    function next() {
      cur = pick(); y = 0;
      $("#drop").textContent = cur.ar; $("#drop").style.top = "0px";
      const options = shuffle([cur, ...sample(p.filter(x => x.fr !== cur.fr), 2)]);
      $("#ch").innerHTML = options.map(o => `<button class="opt" data-a="${esc(o.ar)}">${esc(o.fr)}</button>`).join("");
      $$("#ch .opt").forEach(b => b.onclick = () => {
        if (b.dataset.a === cur.ar) { score++; speed += 4; $("#sc").textContent = score; sGood(); next(); }
        else { b.classList.add("bad"); miss(); }
      });
    }
    function pick() { return p[Math.floor(Math.random() * p.length)]; }
    function miss() {
      lives--; hp(); sBad();
      if (lives <= 0) { alive = false; cancelAnimationFrame(raf); setTimeout(() => gameEnd("pluie", score, 0, gPluie, "mots attrapés"), 300); }
      else next();
    }
    function loop(t) {
      if (!alive) return;
      if (last) { y += speed * (t - last) / 1000; $("#drop").style.top = y + "px"; if (y > H()) miss(); }
      last = t; raf = requestAnimationFrame(loop);
    }
    hp(); next(); raf = requestAnimationFrame(loop);
    cleanup = () => { alive = false; cancelAnimationFrame(raf); };
  }

  // 🌳 Famille de racines
  function gRacines() {
    const rounds = sample(RAC, 5);
    let r = 0, lives = 3, score = 0;
    const show = () => {
      if (r >= rounds.length || lives <= 0) return gameEnd("racines", score, rounds.length, gRacines);
      const fam = rounds[r];
      const good = sample(fam.mots, Math.min(4, fam.mots.length));
      const bad = sample(RAC.filter(x => x !== fam).flatMap(x => x.mots), 9 - good.length);
      const all = shuffle([...good.map(m => ({ m, ok: true })), ...bad.map(m => ({ m, ok: false }))]);
      let left = good.length, errors = 0;
      app.innerHTML = `<div class="hud"><span class="hearts">${"❤️".repeat(lives)}${"🤍".repeat(3 - lives)}</span><span>Racine ${r + 1} / ${rounds.length}</span></div>
        <div class="card"><div class="root-show ar" lang="ar">${fam.r}</div><p class="muted" style="text-align:center;margin:0">idée : ${fam.sens} · trouve les <b>${good.length}</b> mots de cette famille</p></div>
        <div class="grid-words">${all.map((x, i) => `<button class="wbtn ar" lang="ar" data-i="${i}">${x.m[0]}</button>`).join("")}</div>
        <div id="info" class="small muted" style="text-align:center;margin-top:10px">&nbsp;</div>`;
      $$(".wbtn").forEach(b => b.onclick = () => {
        const x = all[+b.dataset.i]; b.disabled = true;
        $("#info").innerHTML = `${ar(x.m[0])} = ${esc(x.m[1])}`;
        if (x.ok) {
          b.classList.add("good"); sGood(); left--;
          if (left === 0) { if (!errors) score++; r++; setTimeout(show, 700); }
        } else {
          b.classList.add("bad"); sBad(); errors++; lives--;
          $(".hearts").textContent = "❤️".repeat(Math.max(0, lives)) + "🤍".repeat(3 - Math.max(0, lives));
          if (lives <= 0) setTimeout(show, 700);
        }
      });
    };
    show();
  }

  // 🗂️ Le trieur
  function gTri() {
    const cat = w => (w.t === "v" ? "v" : w.t === "p" ? "p" : "n");
    const p = pool();
    const words = shuffle([...sample(p.filter(w => cat(w) === "n"), 4), ...sample(p.filter(w => cat(w) === "v"), 3), ...sample(VOC.filter(w => w.t === "p"), 3)]);
    let i = 0, score = 0;
    const show = () => {
      if (i >= words.length) return gameEnd("tri", score, words.length, gTri);
      const w = words[i];
      app.innerHTML = `<div class="hud"><span>${i + 1} / ${words.length}</span><span>✅ ${score}</span></div>
        <div class="sort-word ar pop" lang="ar">${w.ar}</div>
        <div class="bins">
          <button class="bin" data-c="n"><span class="e">📦</span>Nom<br><span class="small muted">اسم</span></button>
          <button class="bin" data-c="v"><span class="e">🏃</span>Verbe<br><span class="small muted">فعل</span></button>
          <button class="bin" data-c="p" style="grid-column:span 2"><span class="e">🔗</span>Particule<br><span class="small muted">حرف</span></button>
        </div><div id="fb"></div>`;
      $$(".bin").forEach(b => b.onclick = () => {
        const ok = b.dataset.c === cat(w);
        $$(".bin").forEach(x => x.disabled = true);
        b.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        b.style.background = ok ? "var(--good-soft)" : "var(--bad-soft)";
        if (ok) { score++; sGood(); } else sBad();
        const why = w.t === "a" ? " (en arabe, l'adjectif est un nom)" : (w.t === "n" && !w.r) ? "" : (w.t === "n" && ["بَيْنَ", "عِنْدَ", "قَبْلَ", "بَعْدَ", "كُلّ", "بَعْض", "غَيْر"].includes(w.ar)) ? " (en arabe, c'est un nom même s'il ressemble à un mot-outil)" : "";
        $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"} pop">${ar(w.ar)} = ${esc(w.fr)} → <b>${{ n: "nom", v: "verbe", p: "particule" }[cat(w)]}</b>${why}</div>
          <button class="btn block" id="nx" style="margin-top:10px">Suivant →</button>`;
        $("#nx").onclick = () => { i++; show(); };
      });
    };
    show();
  }

  // 🧩 Construis le mot
  function gLettres() {
    const cands = pool().filter(w => { const s = strip(w.ar); return !/\s/.test(s) && s.length >= 3 && s.length <= 6; });
    const words = sample(cands, 6);
    let i = 0, score = 0;
    const show = () => {
      if (i >= words.length) return gameEnd("lettres", score, words.length, gLettres);
      const w = words[i], target = [...strip(w.ar)];
      const tiles = shuffle(target.map((c, k) => ({ c, k })));
      let built = [], tries = 0;
      const draw = () => {
        app.innerHTML = `<div class="hud"><span>${i + 1} / ${words.length}</span><span>✅ ${score}</span></div>
          <div class="card" style="text-align:center"><div class="muted small">Écris en arabe :</div><div style="font-size:1.4rem;font-weight:800">${esc(w.fr)}</div>
          ${w.r ? `<div class="small muted">indice : racine ${ar(w.r)}</div>` : ""}</div>
          <div class="assembled ar" lang="ar">${built.map(t => t.c).join("") || "&nbsp;"}</div>
          <div class="slots">${target.map((_, k) => `<div class="slot ${built[k] ? "f" : ""} ar">${built[k] ? built[k].c : ""}</div>`).join("")}</div>
          <div class="tiles">${tiles.map((t, k) => `<button class="tile ar ${built.includes(t) ? "used" : ""}" data-k="${k}">${t.c}</button>`).join("")}</div>
          <div class="row" style="margin-top:14px"><button class="btn ghost" id="undo">↩︎ Effacer</button></div>
          <div id="fb"></div>`;
        $$(".tile").forEach(b => b.onclick = () => {
          built.push(tiles[+b.dataset.k]); tone([500], 0.05);
          if (built.length === target.length) check(); else draw();
        });
        $("#undo").onclick = () => { built.pop(); draw(); };
      };
      const check = () => {
        const ok = built.map(t => t.c).join("") === target.join("");
        draw();
        $$(".tile, #undo").forEach(x => x.disabled = true);
        if (ok) {
          if (tries === 0) score++;
          sGood(); say(w.ar);
          $("#fb").innerHTML = `<div class="feedback good pop"><b>Bravo !</b> ${ar(w.ar)} = ${esc(w.fr)}</div><button class="btn block" id="nx" style="margin-top:10px">Suivant →</button>`;
          $("#nx").onclick = () => { i++; show(); };
        } else {
          tries++; sBad();
          $("#fb").innerHTML = `<div class="feedback bad pop">Pas encore… Réessaie !</div>`;
          setTimeout(() => { built = []; draw(); }, 900);
        }
      };
      draw();
    };
    show();
  }

  // ————————————————— Mots —————————————————
  function mots() {
    setHeader("Vocabulaire");
    const themes = [...new Set(VOC.map(w => w.th))];
    let th = "", q = "", lvl = "";
    app.innerHTML = `<input class="search" id="q" placeholder="Chercher (français, arabe ou racine)…" autocomplete="off">
      <div class="filters" id="lv"><button data-l="" class="on">Tous</button><button data-l="1">Fréquents</button><button data-l="2">Rares</button></div>
      <div class="filters" id="th"><button data-t="" class="on">Tous les thèmes</button>${themes.map(t => `<button data-t="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <p class="small muted" id="count"></p><ul class="vlist" id="list"></ul>`;
    const draw = () => {
      const qs = strip(q.trim().toLowerCase());
      const list = VOC.filter(w => (!th || w.th === th) && (!lvl || w.n === +lvl) &&
        (!qs || w.fr.toLowerCase().includes(qs) || strip(w.ar).includes(qs) || w.r.replace(/\s/g, "").includes(qs.replace(/\s/g, ""))));
      $("#count").textContent = `${list.length} mot${list.length > 1 ? "s" : ""}`;
      $("#list").innerHTML = list.map(w => {
        const box = S.srs[w.ar]?.box || 0;
        return `<li><div><div>${esc(w.fr)}</div><div class="small muted">${typeLabel[w.t]}${w.r ? " · " + ar(w.r) : ""} <span class="tag ${w.n === 2 ? "n2" : ""}">${w.n === 1 ? "fréquent" : "rare"}</span> ${box ? "🟢".repeat(Math.min(box, 5)) : ""}</div></div>
          <div class="row" style="flex:0;align-items:center;flex-wrap:nowrap"><span class="w ar" lang="ar">${w.ar}</span>${sayBtn(w.ar)}</div></li>`;
      }).join("");
    };
    $("#q").oninput = e => { q = e.target.value; draw(); };
    $$("#th button").forEach(b => b.onclick = () => { th = b.dataset.t; $$("#th button").forEach(x => x.classList.toggle("on", x === b)); draw(); });
    $$("#lv button").forEach(b => b.onclick = () => { lvl = b.dataset.l; $$("#lv button").forEach(x => x.classList.toggle("on", x === b)); draw(); });
    draw();
  }

  // ————————————————— Réglages —————————————————
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; });
  function profil() {
    setHeader("Réglages");
    const st = S.settings;
    const learned = Object.values(S.srs).filter(c => c.box >= 3).length;
    app.innerHTML = `
      <div class="card"><h2>Statistiques</h2>
        <p style="margin:0">⭐ ${S.xp} étoiles · 🔥 ${S.streak} jour(s) d'affilée<br>📚 ${Object.keys(S.lessons).length} leçon(s) validée(s) · 🧠 ${learned} mot(s) bien ancrés (${Object.keys(S.srs).length} vus)</p></div>
      <div class="card"><h2>Affichage</h2>
        <div class="toggle"><span>Thème</span><select id="theme"><option value="auto">Automatique</option><option value="light">Clair</option><option value="dark">Sombre</option></select></div>
        <div class="toggle"><span>Taille de l'arabe</span><input type="range" id="size" min="1.2" max="2.4" step="0.1" value="${st.arSize}"></div>
        <div class="toggle"><span>Aperçu</span><span class="ar" lang="ar" style="font-size:var(--ar-size)">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span></div>
        <div class="toggle"><span>Sons</span><input type="checkbox" id="snd" ${st.sound ? "checked" : ""}></div>
        <div class="toggle"><span>Débloquer toutes les leçons</span><input type="checkbox" id="unl" ${st.unlockAll ? "checked" : ""}></div>
        <div class="toggle"><span>Voix arabe de l'appareil</span><span class="small muted">${arVoice ? "✅ " + esc(arVoice.name) : "non disponible"}</span></div>
      </div>
      <div class="card"><h2>Installer l'app sur ton téléphone</h2>
        ${deferredPrompt ? `<button class="btn block" id="inst">📲 Installer</button>` : `
        <p class="small"><b>iPhone (Safari)</b> : bouton Partager ⬆️ puis « Sur l'écran d'accueil ».<br>
        <b>Android (Chrome)</b> : menu ⋮ puis « Installer l'application » ou « Ajouter à l'écran d'accueil ».</p>`}
        <p class="small muted">Une fois installée, l'app marche aussi sans connexion.</p></div>
      <div class="card"><h2>Données</h2>
        <p class="small muted">Ta progression est enregistrée sur cet appareil.</p>
        <button class="btn ghost block" id="reset">🗑️ Tout remettre à zéro</button></div>
      <p class="small muted" style="text-align:center">Traductions des versets : sens approchés, à vérifier auprès d'une traduction de référence.</p>`;
    $("#theme").value = st.theme;
    $("#theme").onchange = e => { st.theme = e.target.value; save(); applySettings(); };
    $("#size").oninput = e => { st.arSize = +e.target.value; save(); applySettings(); };
    $("#snd").onchange = e => { st.sound = e.target.checked; save(); };
    $("#unl").onchange = e => { st.unlockAll = e.target.checked; save(); };
    if ($("#inst")) $("#inst").onclick = async () => { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; profil(); };
    let armed = false;
    $("#reset").onclick = e => {
      if (!armed) { armed = true; e.target.textContent = "Appuie encore pour confirmer"; return; }
      S = structuredClone(defaults); save(); applySettings(); renderChips(); location.hash = "#/";
    };
  }

  // ————————————————— Démarrage —————————————————
  applySettings(); renderChips(); route();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js");
})();
