/* Arabe du Coran — application (JavaScript sans dépendance). */
(() => {
  "use strict";

  const CUR = window.CURRICULUM, VOC = window.VOCAB, VERSES = window.VERSETS;
  const BY_ID = new Map(VOC.map(w => [w.id, w]));
  const LESSONS = CUR.flatMap((b, bi) => b.lecons.map((l, li) => ({ ...l, bloc: b, bi, li })));

  // ————————————————— Icônes (traits) —————————————————
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M8 7h7"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    chev: '<path d="M9 18l6-6-6-6"/>',
    play: '<path d="M7 5v14l11-7z"/>',
    stop: '<rect x="7" y="7" width="10" height="10" rx="1"/>',
    speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    ear: '<path d="M6 8.5a6 6 0 1 1 12 0c0 3-2 4-3 5.5s-1 3.5-3 4.5-4 0-4-2"/><path d="M9 9a3 3 0 0 1 6 0"/>',
    layers: '<path d="M12 3 2 8l10 5 10-5z"/><path d="M2 13l10 5 10-5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
    tree: '<path d="M12 21v-7"/><path d="M12 14 7 9M12 14l5-5M12 10V3"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="12" cy="3" r="1.5"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    sort: '<path d="M3 6h18M6 12h12M10 18h4"/>',
    puzzle: '<path d="M4 7h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H4v-3a2 2 0 1 0 0-4z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    flame: '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2c0-4 2-8 2-8z"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'
  };
  const ic = (n, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;

  // ————————————————— État —————————————————
  const KEY = "arabe-coran-v2";
  const DEF = { lessons: {}, srs: {}, games: {}, streak: 0, lastDay: null,
    settings: { from: 80, to: 90, sound: true, theme: "auto", arSize: 1.6 } };
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { S = null; }
  if (!S) {
    S = structuredClone(DEF);
    try { // reprise de la progression de la v1
      const old = JSON.parse(localStorage.getItem("arabe-coran-v1") || "null");
      if (old && old.lessons) for (const [id, v] of Object.entries(old.lessons)) if (v.stars) S.lessons[id] = { best: 60 + v.stars * 10, done: true };
    } catch {}
  }
  S.settings = Object.assign({}, DEF.settings, S.settings);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
  const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
  const addDays = n => new Date(Date.now() + n * 864e5 - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  function activity() {
    const t = today();
    if (S.lastDay !== t) { S.streak = S.lastDay === addDays(-1) ? S.streak + 1 : 1; S.lastDay = t; }
    save();
  }

  // ————————————————— Utilitaires —————————————————
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $("#app");
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ar = t => `<span class="ar" lang="ar">${t}</span>`;
  const strip = t => t.replace(/[ً-ٰٟۖ-ۭـ]/g, "");
  const rt = r => `<bdi dir="rtl" lang="ar">${r}</bdi>`;
  const plain = h => h.replace(/<[^>]+>/g, "");
  const pad = n => String(n).padStart(3, "0");
  const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const TYPE = { v: "verbe", n: "nom", a: "adjectif", p: "particule", pr: "pronom / outil", np: "nom propre" };
  const pct = x => Math.round(x * 100);
  let toastT;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }

  function applySettings() {
    document.documentElement.style.setProperty("--ar-size", S.settings.arSize + "rem");
    if (S.settings.theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", S.settings.theme);
  }

  // ————————————————— Plage de fréquence —————————————————
  const COV = [0, 80, 85, 90, 95];
  const idxAt = p => p <= 0 ? 0 : (VOC.findIndex(w => w.c >= p) + 1 || VOC.length);
  const inRange = () => VOC.slice(idxAt(S.settings.from), idxAt(S.settings.to));
  const upTo = () => VOC.slice(0, idxAt(S.settings.to));
  function rangeBox(onChange) {
    const s = S.settings;
    const opt = (v, sel, lbl) => `<option value="${v}" ${v === sel ? "selected" : ""}>${lbl}</option>`;
    const html = `<div class="range-box">
        <label>Mots de</label>
        <select id="rFrom">${COV.slice(0, -1).map(v => opt(v, s.from, v ? v + " %" : "0 %")).join("")}</select>
        <label>à</label>
        <select id="rTo">${COV.slice(1).map(v => opt(v, s.to, v + " %")).join("")}</select>
        <label>du texte</label>
      </div>
      <p class="range-note" id="rNote"></p>`;
    const bind = () => {
      const note = () => {
        const a = idxAt(s.from), b = idxAt(s.to);
        $("#rNote").textContent = `${b - a} mots, du rang ${a + 1} au rang ${b}. Les ${b} mots les plus fréquents couvrent ${s.to} % du texte coranique.`;
      };
      $("#rFrom").onchange = e => { s.from = +e.target.value; if (s.to <= s.from) s.to = COV[COV.indexOf(s.from) + 1]; save(); onChange ? onChange() : route(); };
      $("#rTo").onchange = e => { s.to = +e.target.value; if (s.from >= s.to) s.from = COV[COV.indexOf(s.to) - 1]; save(); onChange ? onChange() : route(); };
      note();
    };
    return { html, bind };
  }

  // ————————————————— Audio —————————————————
  const audio = new Audio();
  audio.preload = "auto";
  let audioBtn = null;
  const wordUrl = loc => { const [s, a, w] = loc.split(":"); return `https://audio.qurancdn.com/wbw/${pad(s)}_${pad(a)}_${pad(w)}.mp3`; };
  const verseUrl = ref => { const [s, a] = ref.split(":"); return `https://verses.quran.com/Alafasy/mp3/${pad(s)}${pad(a)}.mp3`; };
  function setBtn(b, st) { if (!b) return; b.classList.toggle("playing", st === "play"); b.classList.toggle("loading", st === "load"); }
  function stopAudio() { audio.pause(); setBtn(audioBtn, null); audioBtn = null; }
  function play(url, btn) {
    if (btn && audioBtn === btn && !audio.paused) { stopAudio(); return Promise.resolve(); }
    stopAudio();
    audioBtn = btn || null; setBtn(audioBtn, "load");
    audio.src = url;
    const p = audio.play();
    return (p && p.then ? p : Promise.resolve()).then(() => setBtn(audioBtn, "play")).catch(err => {
      setBtn(audioBtn, null); audioBtn = null;
      if (err && err.name === "NotAllowedError") toast("Touchez le bouton pour écouter.");
      else toast("Audio indisponible : vérifiez votre connexion.");
    });
  }
  audio.onended = () => { setBtn(audioBtn, null); audioBtn = null; };
  audio.onerror = () => { if (audioBtn) { setBtn(audioBtn, null); audioBtn = null; toast("Audio indisponible : vérifiez votre connexion."); } };
  const playBtn = (url, label = "Écouter") => `<button class="play" data-audio="${esc(url)}">${ic("play")}${label}</button>`;
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-audio]");
    if (b) { e.preventDefault(); e.stopPropagation(); play(b.dataset.audio, b); }
  });

  // ————————————————— Sons d'interface —————————————————
  let actx;
  function tone(freqs, dur = .09, vol = .06) {
    if (!S.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      let t = actx.currentTime;
      for (const f of freqs) {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur); t += dur * .85;
      }
    } catch {}
  }
  const sGood = () => tone([740, 988]);
  const sBad = () => tone([196], .14, .05);
  const sDone = () => tone([523, 659, 784], .11);

  // ————————————————— Mise en page —————————————————
  const TABS = [["", "home", "Accueil"], ["parcours", "book", "Parcours"], ["entrainement", "target", "Entraînement"], ["lexique", "list", "Lexique"], ["reglages", "gear", "Réglages"]];
  function chrome(title, back) {
    $("#appbar").innerHTML = back
      ? `<a class="icon-btn" href="${back}" aria-label="Retour">${ic("back")}</a><h1>${esc(title)}</h1>${streakChip()}`
      : `<div class="brand"><div class="logo">ع</div><h1>${esc(title)}</h1></div>${streakChip()}`;
  }
  const streakChip = () => S.streak ? `<span class="streak" title="Jours d'affilée">${ic("flame")}${S.streak} j</span>` : "";
  function tabs(active) {
    $("#tabs").innerHTML = TABS.map(([h, i, l]) => `<a href="#/${h}" class="${active === (h || "home") ? "on" : ""}">${ic(i)}${l}</a>`).join("");
  }

  // ————————————————— Routeur —————————————————
  let cleanup = null;
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    stopAudio();
    const [page = "", arg] = location.hash.replace(/^#\/?/, "").split("#")[0].split("/");
    const tab = { "": "home", lecon: "parcours", exercices: "parcours", jeu: "entrainement", mot: "lexique" }[page] || page;
    tabs(tab);
    window.scrollTo(0, 0);
    const views = { "": home, parcours, lecon: () => lecon(arg), exercices: () => exercices(arg), entrainement, jeu: () => jeu(arg), lexique, mot: () => mot(+arg), reglages };
    (views[page] || home)();
  }
  window.addEventListener("hashchange", route);

  // ————————————————— Progression —————————————————
  const done = id => !!S.lessons[id]?.done;
  const nextLesson = () => LESSONS.find(l => !done(l.id)) || null;
  const mastered = () => VOC.filter(w => (S.srs[w.id]?.box || 0) >= 3);
  const dueCount = () => Object.entries(S.srs).filter(([, c]) => c.due <= today()).length;
  const TOTAL_N = VOC.reduce((s, w) => s + w.n, 0) / (VOC[VOC.length - 1].c / 100);

  // ————————————————— Accueil —————————————————
  function home() {
    chrome("Arabe du Coran");
    const nl = nextLesson();
    const nDone = LESSONS.filter(l => done(l.id)).length;
    const m = mastered();
    const cov = m.reduce((s, w) => s + w.n, 0) / TOTAL_N * 100;
    const due = dueCount();
    app.innerHTML = `<div class="fade-in">
      <div class="page-head"><div class="eyebrow">${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</div><h2>As-salâmu ʿalaykum</h2><p>Comprendre le Coran, mot par mot et règle par règle.</p></div>
      ${nl ? `<div class="card hero"><div class="deco">ق</div>
        <div class="eyebrow">Bloc ${nl.bi + 1} · Leçon ${nl.li + 1}</div>
        <h3>${esc(nl.titre)}</h3><div class="ar" lang="ar">${nl.ar}</div>
        <p>${esc(nl.resume)}</p>
        <a class="btn" href="#/lecon/${nl.id}">${nDone ? "Continuer" : "Commencer"} ${ic("chev")}</a></div>`
        : `<div class="card"><h3>Parcours terminé</h3><p class="muted">Toutes les leçons sont validées. Continuez l'entraînement pour ancrer le lexique.</p></div>`}
      <div class="kpis">
        <div class="kpi"><div class="v">${nDone}<small> / ${LESSONS.length}</small></div><div class="l">Leçons validées</div></div>
        <div class="kpi"><div class="v">${m.length}</div><div class="l">Mots maîtrisés</div></div>
        <div class="kpi"><div class="v">${cov.toFixed(1)}<small> %</small></div><div class="l">du texte couvert par ces mots</div></div>
        <div class="kpi"><div class="v">${due}</div><div class="l">Révisions du jour</div></div>
      </div>
      <div class="btn-row" style="margin-bottom:8px">
        <a class="btn" href="#/jeu/cartes">${ic("cards")}Réviser${due ? ` (${due})` : ""}</a>
        <a class="btn secondary" href="#/entrainement">${ic("target")}S'entraîner</a>
      </div>
      <div class="section-title">Progression par bloc</div>
      <div class="list">${CUR.map((b, bi) => {
        const n = b.lecons.filter(l => done(l.id)).length;
        return `<a class="row" href="#/parcours#b${bi}"><span class="num ${n === b.lecons.length ? "done" : ""}">${bi + 1}</span>
          <span class="grow"><span class="t1">${esc(b.titre)}</span><span class="progress" style="margin-top:7px"><i style="width:${n / b.lecons.length * 100}%"></i></span></span>
          <span class="xs muted">${n}/${b.lecons.length}</span></a>`;
      }).join("")}</div>
    </div>`;
  }

  // ————————————————— Parcours —————————————————
  function parcours() {
    chrome("Parcours");
    app.innerHTML = `<div class="fade-in"><div class="page-head"><h2>Parcours</h2><p>8 blocs de grammaire (nahw) et de morphologie (sarf), dans l'ordre le plus utile pour lire le Coran. Toutes les leçons sont ouvertes.</p></div>
      ${CUR.map((b, bi) => {
        const n = b.lecons.filter(l => done(l.id)).length;
        return `<section class="bloc" id="b${bi}">
          <div class="bloc-head"><div><div class="eyebrow">Bloc ${bi + 1}</div><h3>${esc(b.titre)}</h3><div class="ar" lang="ar">${b.ar}</div></div><span class="bloc-meta">${n}/${b.lecons.length}</span></div>
          <p class="small muted" style="margin:0 0 10px">${esc(b.objectif)}</p>
          <div class="list">${b.lecons.map((l, li) => {
            const st = S.lessons[l.id];
            return `<a class="row" href="#/lecon/${l.id}"><span class="num ${st?.done ? "done" : ""}">${st?.done ? ic("check") : li + 1}</span>
              <span class="grow"><span class="t1">${esc(l.titre)}</span><span class="t2">${esc(l.resume)}</span></span>
              ${st ? `<span class="score">${st.best} %</span>` : ""}<span class="chev">${ic("chev")}</span></a>`;
          }).join("")}</div></section>`;
      }).join("")}</div>`;
    const anchor = location.hash.split("#")[2];
    if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  // ————————————————— Leçon —————————————————
  function section(s) {
    if (s.t === "p") return `<p>${s.html}</p>`;
    if (s.t === "tip") return `<div class="tip"><span class="tip-label">À retenir</span>${s.html}</div>`;
    if (s.t === "table") return `<div class="table-wrap"><table><thead><tr>${s.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${s.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    if (s.t === "ex") return `<figure class="example" style="margin-left:0;margin-right:0">
        <div class="verse q" lang="ar">${s.ar}</div>
        <div class="meta"><span class="ref">Sourate ${s.ref.split(":")[0]}, verset ${s.ref.split(":")[1]}</span>${playBtn(verseUrl(s.ref), "Réciter")}</div>
        <p class="fr">${esc(s.fr)}</p>${s.note ? `<div class="note">${s.note}</div>` : ""}</figure>`;
    return "";
  }
  function lecon(id) {
    const l = LESSONS.find(x => x.id === id);
    if (!l) { location.hash = "#/parcours"; return; }
    chrome(`Leçon ${l.bi + 1}.${l.li + 1}`, "#/parcours");
    const i = LESSONS.indexOf(l), nx = LESSONS[i + 1];
    app.innerHTML = `<article class="fade-in">
      <div class="lesson-title"><div class="eyebrow">Bloc ${l.bi + 1} · ${esc(l.bloc.titre)}</div><h2>${esc(l.titre)}</h2><div class="ar" lang="ar">${l.ar}</div></div>
      <div class="prose">${l.contenu.map(section).join("")}</div>
      <div class="card flat" style="margin-top:8px"><div class="card-head"><h3>Exercices</h3><span class="muted small">${l.exercices.length} questions</span></div>
        <p class="small muted" style="margin:0 0 12px">Validez la leçon avec au moins 60 % de bonnes réponses.${S.lessons[id] ? ` Meilleur score : ${S.lessons[id].best} %.` : ""}</p>
        <a class="btn block" href="#/exercices/${id}">Commencer les exercices</a></div>
      ${nx ? `<a class="row card flat" style="padding:14px 16px" href="#/lecon/${nx.id}"><span class="grow"><span class="t2">Leçon suivante</span><span class="t1">${esc(nx.titre)}</span></span>${ic("chev")}</a>` : ""}
    </article>`;
  }

  // Moteur d'exercices : QCM et « toucher le mot »
  function runExercises(list, { back, title, onEnd, again }) {
    let i = 0, score = 0;
    const show = () => {
      if (i >= list.length) return finish();
      const e = list[i];
      let body;
      if (e.type === "tap") {
        body = `<p class="question">${e.q}</p>
          <div class="card flat" style="padding:6px"><div class="tap-verse">${e.words.map(([n, w]) => `<button class="tap-word" data-n="${n}">${w}</button>`).join("")}</div>
          <div class="meta center" style="padding:0 0 10px"><span class="xs muted">${e.ref}</span> ${playBtn(verseUrl(e.ref), "Réciter")}</div></div>`;
      } else {
        const arOnly = e.options.every(o => /^[؀-ۿ\s‌-‏]+$/.test(strip(plain(o)).trim()));
        body = `<p class="question">${e.q}</p>${e.ar ? `<div class="q-ar ar" lang="ar">${e.ar}</div>` : ""}
          <div class="options">${e.options.map((o, k) => `<button class="option ${arOnly ? "ar-opt ar" : ""}" data-k="${k}"><span class="key">${"ABCD"[k]}</span><span>${o}</span></button>`).join("")}</div>`;
      }
      app.innerHTML = `<div class="fade-in">
        <div class="ex-top"><div class="progress"><i style="width:${i / list.length * 100}%"></i></div><span class="count">${i + 1} / ${list.length}</span></div>
        ${body}<div id="fb"></div></div>`;
      const answer = (ok, why) => {
        if (ok) { score++; sGood(); } else sBad();
        $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"} fade-in"><span class="h">${ok ? "Correct" : "Incorrect"}</span>${why || ""}</div>
          <button class="btn block sticky-next" id="nx">${i + 1 < list.length ? "Continuer" : "Voir le résultat"}</button>`;
        $("#nx").onclick = () => { i++; show(); };
        $("#nx").focus({ preventScroll: true });
      };
      if (e.type === "tap") {
        $$(".tap-word").forEach(b => b.onclick = () => {
          const ok = e.answer.includes(+b.dataset.n);
          $$(".tap-word").forEach(x => { x.disabled = true; if (e.answer.includes(+x.dataset.n)) x.classList.add(ok ? "good" : "hint"); });
          if (!ok) b.classList.add("bad", "shake");
          answer(ok, e.why);
        });
      } else {
        $$(".option").forEach(b => b.onclick = () => {
          const k = +b.dataset.k, ok = k === e.answer;
          $$(".option").forEach(x => x.disabled = true);
          $$(".option")[e.answer].classList.add("good");
          if (!ok) b.classList.add("bad", "shake");
          answer(ok, e.why);
        });
      }
    };
    const finish = () => {
      activity();
      const r = score / list.length;
      const extra = onEnd ? onEnd(score, list.length) : "";
      result({ r, title: r >= .9 ? "Excellent" : r >= .6 ? "Validé" : "À retravailler", sub: `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${list.length}`, extra, again, back });
    };
    show();
  }
  function result({ r, title, sub, extra = "", again, back }) {
    if (r >= .6) sDone();
    const C = 2 * Math.PI * 52;
    app.innerHTML = `<div class="card result fade-in">
      <div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" stroke="var(--line)" stroke-width="10" fill="none"/>
        <circle cx="60" cy="60" r="52" stroke="${r >= .6 ? "var(--primary)" : "var(--gold)"}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - r)}" style="transition:stroke-dashoffset .8s"/></svg>
        <div class="val">${pct(r)} %</div></div>
      <h3>${title}</h3><p class="muted">${sub}</p>${extra}
      <div class="btn-row" style="margin-top:16px;flex-direction:column">
        <button class="btn block" id="again">Recommencer</button>
        <a class="btn secondary block" href="${back}">Retour</a></div></div>`;
    $("#again").onclick = again;
  }
  function exercices(id) {
    const l = LESSONS.find(x => x.id === id);
    if (!l) { location.hash = "#/parcours"; return; }
    chrome(l.titre, "#/lecon/" + id);
    const prep = () => l.exercices.map(e => {
      if (e.type !== "qcm") return e;
      const idx = shuffle(e.options.map((_, k) => k));
      return { ...e, options: idx.map(k => e.options[k]), answer: idx.indexOf(e.answer) };
    });
    const go = () => runExercises(prep(), {
      back: "#/lecon/" + id, again: go,
      onEnd: (s, t) => {
        const p = pct(s / t), prev = S.lessons[id];
        S.lessons[id] = { best: Math.max(prev?.best || 0, p), done: (prev?.done) || p >= 60 };
        save();
        const i = LESSONS.indexOf(l), nx = LESSONS[i + 1];
        return p >= 60 && nx ? `<a class="btn quiet" href="#/lecon/${nx.id}" style="margin-top:8px">Leçon suivante : ${esc(nx.titre)} ${ic("chev")}</a>` : "";
      }
    });
    go();
  }

  // ————————————————— Lexique —————————————————
  let lexState = { q: "", t: "", scope: "range", limit: 60 };
  function lexique() {
    chrome("Lexique");
    const rb = rangeBox(() => lexique());
    const types = [["", "Tous"], ["v", "Verbes"], ["n", "Noms"], ["a", "Adjectifs"], ["p", "Particules"], ["pr", "Pronoms / outils"], ["np", "Noms propres"]];
    app.innerHTML = `<div class="fade-in">
      <div class="page-head"><h2>Lexique</h2><p>${VOC.length} lemmes classés par fréquence réelle dans le Coran. Ils couvrent 95 % du texte.</p></div>
      <div class="card flat" style="padding:14px 16px">${rb.html}</div>
      <div class="toolbar"><label class="search">${ic("search")}<input id="q" placeholder="Rechercher : français, arabe, racine" value="${esc(lexState.q)}" autocomplete="off"></label>
        <select id="scope"><option value="range">Plage choisie</option><option value="all">Tout le lexique</option></select></div>
      <div class="chips" id="types">${types.map(([k, l]) => `<button class="chip ${lexState.t === k ? "on" : ""}" data-t="${k}">${l}</button>`).join("")}</div>
      <p class="small muted" id="count"></p>
      <div class="list" id="list"></div>
      <button class="btn secondary block" id="more">Afficher plus</button></div>`;
    rb.bind();
    $("#scope").value = lexState.scope;
    const draw = () => {
      const q = strip(lexState.q.trim().toLowerCase()).replace(/[أإآٱ]/g, "ا");
      const base = lexState.scope === "all" ? VOC : inRange();
      const res = base.filter(w => (!lexState.t || w.t === lexState.t) && (!q ||
        w.fr.toLowerCase().includes(q) || strip(w.ar).replace(/[أإآٱ]/g, "ا").includes(q) || w.r.replace(/\s/g, "").includes(q.replace(/\s/g, ""))));
      $("#count").textContent = `${res.length} résultat${res.length > 1 ? "s" : ""}`;
      $("#list").innerHTML = res.slice(0, lexState.limit).map(w => {
        const box = S.srs[w.id]?.box || 0;
        return `<a class="row w-row" href="#/mot/${w.id}"><span class="rank">#${w.id}</span>
          <span class="grow"><span class="t1">${esc(w.fr)}</span><span class="t2">${TYPE[w.t]}${w.r ? " · " + rt(w.r) : ""} · ${w.n} occ.${box >= 3 ? ` · <span class="badge ok">maîtrisé</span>` : ""}</span></span>
          <span class="w">${w.ar}</span></a>`;
      }).join("") || `<div class="row muted">Aucun mot.</div>`;
      $("#more").classList.toggle("hidden", res.length <= lexState.limit);
    };
    $("#q").oninput = e => { lexState.q = e.target.value; lexState.limit = 60; draw(); };
    $("#scope").onchange = e => { lexState.scope = e.target.value; draw(); };
    $$("#types .chip").forEach(b => b.onclick = () => { lexState.t = b.dataset.t; $$("#types .chip").forEach(x => x.classList.toggle("on", x === b)); lexState.limit = 60; draw(); });
    $("#more").onclick = () => { lexState.limit += 100; draw(); };
    draw();
  }

  function formsOf(w) {
    if (w.t === "v") return [
      ["Accompli", "الْمَاضِي", w.ar], ["Inaccompli", "الْمُضَارِع", w.pres], ["Impératif", "الْأَمْر", w.imp],
      ["Participe actif", "اسْم الْفَاعِل", w.fa], ["Participe passif", "اسْم الْمَفْعُول", w.pp], ["Masdar", "الْمَصْدَر", w.masdar]];
    if (w.t === "n" || w.t === "a") {
      const f = [[w.sg ? "Forme" : "Singulier", w.sg ? "" : "الْمُفْرَد", w.ar]];
      if (w.sg) f.push(["Singulier", "الْمُفْرَد", w.sg]);
      else f.push(["Pluriel", "الْجَمْع", w.pl]);
      return f;
    }
    return [];
  }
  function mot(id) {
    const w = BY_ID.get(id);
    if (!w) { location.hash = "#/lexique"; return; }
    chrome(w.fr, "#/lexique");
    const [s, a, n] = w.loc.split(":").map(Number);
    const vs = VERSES[`${s}:${a}`] || [];
    const fam = w.r ? VOC.filter(x => x.r === w.r && x.id !== w.id).slice(0, 12) : [];
    const c = S.srs[w.id];
    const forms = formsOf(w);
    app.innerHTML = `<div class="fade-in">
      <div class="card word-hero">
        <div class="big">${w.ar}</div><div class="mean">${esc(w.fr)}</div>
        <div class="tags"><span class="badge">${TYPE[w.t]}</span>${w.vf && +w.vf > 1 ? `<span class="badge">forme ${ROMAN[+w.vf]}</span>` : ""}${w.g ? `<span class="badge">${w.g === "f" ? "féminin" : "masculin"}</span>` : ""}
          ${w.r ? `<span class="badge gold">racine ${rt(w.r)}</span>` : ""}<span class="badge">rang ${w.id}</span><span class="badge">${w.n} occurrences</span>${c ? `<span class="badge ${c.box >= 3 ? "ok" : ""}">révision : niveau ${c.box}</span>` : ""}</div>
        ${w.note ? `<p class="small muted" style="margin:12px 0 0">${esc(w.note)}</p>` : ""}
      </div>
      ${forms.length ? `<div class="section-title">${w.t === "v" ? "Formes du verbe" : "Formes"}</div>
        <div class="list"><div class="forms">${forms.map(([l, la, v]) => `<div class="form"><div class="lbl">${l}${la ? ` · ${ar(la)}` : ""}</div><div class="val ${v ? "" : "none"}">${v || "non usité"}</div></div>`).join("")}</div></div>` : ""}
      <div class="section-title">Dans le Coran</div>
      <div class="card"><div class="context-verse">${vs.map((t, k) => k + 1 === n ? `<mark>${t}</mark>` : t).join(" ")}</div>
        <div class="btn-row" style="margin-top:12px;align-items:center;justify-content:space-between"><span class="small muted" style="flex:0 0 auto">Sourate ${s}, verset ${a}</span>
          <span style="flex:0 0 auto;display:flex;gap:8px">${playBtn(wordUrl(w.loc), "Le mot")}${playBtn(verseUrl(`${s}:${a}`), "Le verset")}</span></div></div>
      ${fam.length ? `<div class="section-title">Même racine</div><div class="list">${fam.map(x => `<a class="row w-row" href="#/mot/${x.id}"><span class="rank">#${x.id}</span><span class="grow"><span class="t1">${esc(x.fr)}</span><span class="t2">${TYPE[x.t]}</span></span><span class="w">${x.ar}</span></a>`).join("")}</div>` : ""}
    </div>`;
  }

  // ————————————————— Entraînement —————————————————
  const GAMES = [
    { id: "cartes", i: "cards", t: "Révision espacée", d: "Chaque mot revient au moment où vous allez l'oublier." },
    { id: "quiz", i: "check", t: "Sens des mots", d: "Arabe → français et français → arabe." },
    { id: "ecoute", i: "ear", t: "Écoute", d: "Reconnaître un mot récité dans le Coran." },
    { id: "formes", i: "layers", t: "Formes verbales", d: "Inaccompli, impératif, participe, masdar." },
    { id: "pluriels", i: "copy", t: "Pluriels", d: "Retrouver le pluriel d'un nom ou d'un adjectif." },
    { id: "racines", i: "tree", t: "Familles de racines", d: "Repérer tous les mots issus d'une racine." },
    { id: "sprint", i: "timer", t: "Contre-la-montre", d: "Un maximum de bonnes réponses en 60 secondes." },
    { id: "paires", i: "grid", t: "Paires", d: "Associer chaque mot arabe à son sens." },
    { id: "tri", i: "sort", t: "Nature des mots", d: "Nom, verbe ou particule ?" },
    { id: "lettres", i: "puzzle", t: "Orthographe", d: "Reconstituer un mot lettre par lettre." }
  ];
  function entrainement() {
    chrome("Entraînement");
    const rb = rangeBox(() => entrainement());
    app.innerHTML = `<div class="fade-in">
      <div class="page-head"><h2>Entraînement</h2><p>Choisissez la tranche de vocabulaire à travailler : tous les exercices s'y adaptent.</p></div>
      <div class="card flat" style="padding:14px 16px">${rb.html}</div>
      <div class="games">${GAMES.map(g => `<a class="game" href="#/jeu/${g.id}"><span class="gi">${ic(g.i)}</span><span><b>${g.t}</b><span>${g.d}</span>${S.games[g.id] ? `<span class="best">Record : ${S.games[g.id]}</span>` : ""}</span></a>`).join("")}</div></div>`;
    rb.bind();
  }
  function jeu(id) {
    const g = GAMES.find(x => x.id === id);
    if (!g) { location.hash = "#/entrainement"; return; }
    chrome(g.t, "#/entrainement");
    ({ cartes: gCartes, quiz: gQuiz, ecoute: gEcoute, formes: gFormes, pluriels: gPluriels, racines: gRacines, sprint: gSprint, paires: gPaires, tri: gTri, lettres: gLettres })[id]();
  }
  const record = (id, v) => { if (v > (S.games[id] || 0)) S.games[id] = v; activity(); };
  const pool = (f = () => true, min = 8) => { let p = inRange().filter(f); if (p.length < min) p = upTo().filter(f); if (p.length < min) p = VOC.filter(f); return p; };
  const distract = (w, list, key, n = 3) => sample(list.filter(x => x.id !== w.id && x[key] && x[key] !== w[key]), n);
  const gameExercises = (id, list, rerun) => runExercises(list, { back: "#/entrainement", again: rerun, onEnd: s => { record(id, s); return ""; } });

  // Révision espacée (Leitner)
  const BOX = [0, 1, 3, 7, 16, 35, 90];
  function gCartes() {
    const t = today();
    const range = inRange();
    const due = VOC.filter(w => S.srs[w.id] && S.srs[w.id].due <= t);
    const fresh = range.filter(w => !S.srs[w.id]).slice(0, Math.max(0, 10 - Math.min(due.length, 10)));
    const deck = [...shuffle(due).slice(0, 20), ...fresh];
    if (!deck.length) {
      app.innerHTML = `<div class="card result fade-in"><h3>Rien à réviser</h3><p class="muted">Tous les mots de la tranche choisie sont à jour. Revenez demain, ou élargissez la tranche.</p><a class="btn" href="#/entrainement">Retour</a></div>`;
      return;
    }
    let i = 0, known = 0;
    const show = () => {
      if (i >= deck.length) { record("cartes", known); return result({ r: known / deck.length, title: "Session terminée", sub: `${known} mot${known > 1 ? "s" : ""} su${known > 1 ? "s" : ""} sur ${deck.length}`, again: gCartes, back: "#/entrainement" }); }
      const w = deck[i], isNew = !S.srs[w.id];
      const f = formsOf(w).slice(1).filter(x => x[2]);
      app.innerHTML = `<div class="fade-in">
        <div class="hud"><span>${i + 1} / ${deck.length}</span><span class="badge ${isNew ? "gold" : ""}">${isNew ? "nouveau" : "révision"}</span></div>
        <div class="flash" id="fc"><div class="inner">
          <div class="face"><div class="big">${w.ar}</div><span class="badge">${TYPE[w.t]}</span><span class="xs muted" style="margin-top:14px">Touchez pour voir la réponse</span></div>
          <div class="face back"><div class="ar" lang="ar" style="font-size:1.9rem">${w.ar}</div><div class="mean">${esc(w.fr)}</div>
            ${f.length ? `<div class="mini-forms">${f.map(([l, , v]) => `<span>${v}<em>${l.toLowerCase()}</em></span>`).join("")}</div>` : ""}
            <div class="xs muted">${w.r ? "racine " + rt(w.r) + " · " : ""}rang ${w.id}</div>
            <div style="margin-top:8px">${playBtn(wordUrl(w.loc), "Écouter")}</div></div></div></div>
        <div class="grade hidden" id="grade"><button class="btn secondary" id="no">À revoir</button><button class="btn" id="yes">Je savais</button></div>
        <button class="btn secondary block" id="flip">Afficher la réponse</button></div>`;
      const flip = () => { $("#fc").classList.add("flipped"); $("#grade").classList.remove("hidden"); $("#flip").classList.add("hidden"); };
      $("#fc").onclick = e => { if (!e.target.closest("[data-audio]")) flip(); };
      $("#flip").onclick = flip;
      const grade = ok => {
        const c = S.srs[w.id] || { box: 0 };
        c.box = ok ? Math.min(c.box + 1, BOX.length - 1) : 1;
        c.due = addDays(BOX[c.box]);
        S.srs[w.id] = c; save();
        ok ? (known++, sGood()) : sBad();
        i++; show();
      };
      $("#yes").onclick = () => grade(true);
      $("#no").onclick = () => grade(false);
    };
    show();
  }

  function gQuiz() {
    const p = pool();
    const qs = sample(p, 10).map(w => {
      const same = p.filter(x => x.t === w.t).length > 6 ? p.filter(x => x.t === w.t) : p;
      const opts = shuffle([w, ...distract(w, same, "fr")]);
      return Math.random() < .65
        ? { type: "qcm", q: "Que signifie ce mot ?", ar: w.ar, options: opts.map(o => esc(o.fr)), answer: opts.indexOf(w), why: `${ar(w.ar)} : ${esc(w.fr)}${w.r ? ` · racine ${rt(w.r)}` : ""}` }
        : { type: "qcm", q: `Comment dit-on « ${esc(w.fr)} » ?`, options: opts.map(o => o.ar), answer: opts.indexOf(w), why: `${ar(w.ar)} : ${esc(w.fr)}` };
    });
    gameExercises("quiz", qs, gQuiz);
  }

  function gEcoute() {
    const p = pool(w => w.t !== "p");
    const rounds = sample(p, 8);
    let i = 0, score = 0;
    const surface = w => { const [s, a, n] = w.loc.split(":").map(Number); return (VERSES[`${s}:${a}`] || [])[n - 1] || w.ar; };
    app.innerHTML = `<div class="card result fade-in"><div class="listen-btn" style="cursor:default">${ic("speaker")}</div><h3>Écoute</h3>
      <p class="muted">Vous allez entendre 8 mots tels qu'ils sont récités dans le Coran. Choisissez le mot entendu.</p>
      <button class="btn" id="start">Commencer</button></div>`;
    const show = () => {
      if (i >= rounds.length) { record("ecoute", score); return result({ r: score / rounds.length, title: "Écoute terminée", sub: `${score} / ${rounds.length}`, again: gEcoute, back: "#/entrainement" }); }
      const w = rounds[i];
      const opts = shuffle([w, ...sample(p.filter(x => x.id !== w.id && surface(x) !== surface(w)), 3)]);
      app.innerHTML = `<div class="fade-in"><div class="ex-top"><div class="progress"><i style="width:${i / rounds.length * 100}%"></i></div><span class="count">${i + 1} / ${rounds.length}</span></div>
        <button class="listen-btn" id="lb" data-audio="${wordUrl(w.loc)}">${ic("speaker")}</button>
        <p class="center small muted">Touchez pour réécouter</p>
        <div class="options">${opts.map((o, k) => `<button class="option ar-opt q" data-k="${k}">${surface(o)}</button>`).join("")}</div><div id="fb"></div></div>`;
      play(wordUrl(w.loc), $("#lb"));
      $$(".option").forEach(b => b.onclick = () => {
        const o = opts[+b.dataset.k], ok = o === w;
        $$(".option").forEach(x => x.disabled = true);
        $$(".option")[opts.indexOf(w)].classList.add("good");
        if (!ok) b.classList.add("bad", "shake");
        ok ? (score++, sGood()) : sBad();
        $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"} fade-in"><span class="h">${ok ? "Correct" : "Incorrect"}</span>${surface(w)} (${w.loc}) vient de ${ar(w.ar)} : ${esc(w.fr)}</div>
          <button class="btn block sticky-next" id="nx">Continuer</button>`;
        $("#nx").onclick = () => { i++; show(); };
      });
    };
    $("#start").onclick = show;
  }

  function gFormes() {
    const F = [["pres", "l'inaccompli", "الْمُضَارِع"], ["imp", "l'impératif", "الْأَمْر"], ["fa", "le participe actif", "اسْم الْفَاعِل"], ["masdar", "le masdar", "الْمَصْدَر"], ["pp", "le participe passif", "اسْم الْمَفْعُول"]];
    const verbs = pool(w => w.t === "v" && w.pres, 10);
    const qs = [];
    for (const w of shuffle(verbs)) {
      const avail = F.filter(([k]) => w[k]);
      if (!avail.length) continue;
      const [k, lbl, la] = avail[Math.floor(Math.random() * avail.length)];
      const others = distract(w, verbs.length > 12 ? verbs : VOC.filter(x => x.t === "v"), k);
      if (others.length < 3) continue;
      const opts = shuffle([w, ...others]);
      qs.push({ type: "qcm", q: `Quel est ${lbl} (${ar(la)}) de ce verbe ?`, ar: `${w.ar}`, options: opts.map(o => o[k]), answer: opts.indexOf(w),
        why: `${ar(w.ar)} (${esc(w.fr)}) : ${F.filter(([kk]) => w[kk]).map(([kk, , la2]) => `${ar(la2)} ${ar(w[kk])}`).join(" · ")}` });
      if (qs.length >= 10) break;
    }
    gameExercises("formes", qs, gFormes);
  }

  function gPluriels() {
    const nouns = pool(w => (w.t === "n" || w.t === "a") && w.pl, 10);
    const qs = sample(nouns, 10).map(w => {
      const opts = shuffle([w, ...distract(w, nouns.length > 12 ? nouns : VOC.filter(x => x.pl), "pl")]);
      return { type: "qcm", q: `Quel est le pluriel de ce mot ?`, ar: w.ar, options: opts.map(o => o.pl), answer: opts.indexOf(w), why: `${ar(w.ar)} (${esc(w.fr)}) → ${ar(w.pl)}` };
    });
    gameExercises("pluriels", qs, gPluriels);
  }

  function gRacines() {
    const fams = {};
    for (const w of VOC) if (w.r && w.r.split(" ").length === 3) (fams[w.r] = fams[w.r] || []).push(w);
    const range = new Set(inRange().map(w => w.r));
    let roots = Object.keys(fams).filter(r => fams[r].length >= 3 && range.has(r));
    if (roots.length < 5) roots = Object.keys(fams).filter(r => fams[r].length >= 3);
    const rounds = sample(roots, 5);
    let i = 0, score = 0, lives = 3;
    const show = () => {
      if (i >= rounds.length || lives <= 0) { record("racines", score); return result({ r: score / rounds.length, title: "Familles de racines", sub: `${score} famille${score > 1 ? "s" : ""} complète${score > 1 ? "s" : ""} sans erreur sur ${rounds.length}`, again: gRacines, back: "#/entrainement" }); }
      const r = rounds[i];
      const good = sample(fams[r], Math.min(4, fams[r].length));
      const bad = sample(VOC.filter(w => w.r && w.r !== r && w.t !== "p"), 9 - good.length);
      const all = shuffle([...good, ...bad]);
      let left = good.length, err = 0;
      app.innerHTML = `<div class="fade-in"><div class="hud"><span>Racine ${i + 1} / ${rounds.length}</span><span class="lives">${[0, 1, 2].map(k => `<i class="${k < lives ? "" : "off"}"></i>`).join("")}</span></div>
        <div class="card center"><div class="root-big">${r}</div><p class="small muted" style="margin:4px 0 0">Touchez les <b>${good.length}</b> mots issus de cette racine.</p></div>
        <div class="wgrid">${all.map((w, k) => `<button class="wbtn" data-k="${k}">${w.ar}</button>`).join("")}</div>
        <p class="center small muted" id="info" style="min-height:1.6em;margin-top:12px"></p></div>`;
      $$(".wbtn").forEach(b => b.onclick = () => {
        const w = all[+b.dataset.k]; b.disabled = true;
        $("#info").innerHTML = `${ar(w.ar)} : ${esc(w.fr)} · racine ${rt(w.r)}`;
        if (w.r === r) { b.classList.add("good"); sGood(); if (--left === 0) { if (!err) score++; i++; setTimeout(show, 700); } }
        else { b.classList.add("bad", "shake"); sBad(); err++; lives--; $(".lives").innerHTML = [0, 1, 2].map(k => `<i class="${k < lives ? "" : "off"}"></i>`).join(""); if (lives <= 0) setTimeout(show, 700); }
      });
    };
    show();
  }

  function gSprint() {
    const p = pool();
    let score = 0, errors = 0, left = 60, alive = true;
    const tick = setInterval(() => { left--; const t = $("#tm"); if (t) t.style.width = left / 60 * 100 + "%"; const s = $("#sec"); if (s) s.textContent = left; if (left <= 0) end(); }, 1000);
    cleanup = () => { alive = false; clearInterval(tick); };
    const end = () => { if (!alive) return; cleanup(); cleanup = null; record("sprint", score); result({ r: score / Math.max(1, score + errors), title: `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""}`, sub: `${errors} erreur${errors > 1 ? "s" : ""} en 60 secondes · record : ${S.games.sprint || score}`, again: gSprint, back: "#/entrainement" }); };
    const show = () => {
      if (!alive) return;
      const w = p[Math.floor(Math.random() * p.length)];
      const opts = shuffle([w, ...distract(w, p, "fr")]);
      app.innerHTML = `<div><div class="hud"><span><b id="sec">${left}</b> s</span><span>Score <b>${score}</b></span></div>
        <div class="timer"><i id="tm" style="width:${left / 60 * 100}%"></i></div>
        <div class="big-word">${w.ar}</div>
        <div class="options">${opts.map((o, k) => `<button class="option" data-k="${k}"><span class="key">${"ABCD"[k]}</span><span>${esc(o.fr)}</span></button>`).join("")}</div></div>`;
      $$(".option").forEach(b => b.onclick = () => {
        if (opts[+b.dataset.k] === w) { score++; sGood(); show(); }
        else { errors++; sBad(); b.classList.add("bad", "shake"); $$(".option")[opts.indexOf(w)].classList.add("good"); $$(".option").forEach(x => x.disabled = true); setTimeout(show, 650); }
      });
    };
    show();
  }

  function gPaires() {
    const words = sample(pool(w => w.fr.length < 28), 6);
    const cards = shuffle(words.flatMap(w => [{ w, a: true }, { w, a: false }]));
    let open = [], found = 0, moves = 0, lock = false;
    app.innerHTML = `<div class="fade-in"><div class="hud"><span>Coups : <b id="mv">0</b></span><span>Paires : <b id="fd">0</b> / 6</span></div>
      <div class="memory">${cards.map((c, k) => `<button class="mcard" data-k="${k}"><span class="dot"></span></button>`).join("")}</div></div>`;
    $$(".mcard").forEach(b => b.onclick = () => {
      const c = cards[+b.dataset.k];
      if (lock || b.classList.contains("show")) return;
      b.classList.add("show"); if (c.a) b.classList.add("arw");
      b.innerHTML = c.a ? c.w.ar : esc(c.w.fr);
      open.push(b);
      if (open.length < 2) return;
      moves++; $("#mv").textContent = moves;
      const [x, y] = open.map(o => cards[+o.dataset.k]);
      if (x.w === y.w && x.a !== y.a) {
        open.forEach(o => o.classList.add("ok")); open = []; found++; $("#fd").textContent = found; sGood();
        if (found === 6) setTimeout(() => { record("paires", Math.max(0, 20 - moves)); result({ r: Math.min(1, 6 / moves * 1.5), title: "Toutes les paires trouvées", sub: `en ${moves} coups`, again: gPaires, back: "#/entrainement" }); }, 600);
      } else {
        lock = true; sBad();
        setTimeout(() => { open.forEach(o => { o.classList.remove("show", "arw"); o.innerHTML = `<span class="dot"></span>`; }); open = []; lock = false; }, 900);
      }
    });
  }

  function gTri() {
    const cat = w => ({ N: "n", V: "v", P: "p" })[w.p] || "n";
    const p = pool();
    const words = shuffle([...sample(p.filter(w => cat(w) === "n"), 5), ...sample(p.filter(w => cat(w) === "v"), 4), ...sample(VOC.filter(w => cat(w) === "p" && !w.ar.includes("ـ")), 3)]);
    let i = 0, score = 0;
    const show = () => {
      if (i >= words.length) { record("tri", score); return result({ r: score / words.length, title: "Nature des mots", sub: `${score} / ${words.length}`, again: gTri, back: "#/entrainement" }); }
      const w = words[i];
      app.innerHTML = `<div class="fade-in"><div class="ex-top"><div class="progress"><i style="width:${i / words.length * 100}%"></i></div><span class="count">${i + 1} / ${words.length}</span></div>
        <div class="card flat big-word">${w.ar}</div>
        <div class="bins"><button class="bin" data-c="n">Nom<span class="ar">اسْم</span></button><button class="bin" data-c="v">Verbe<span class="ar">فِعْل</span></button><button class="bin" data-c="p">Particule<span class="ar">حَرْف</span></button></div><div id="fb"></div></div>`;
      $$(".bin").forEach(b => b.onclick = () => {
        const ok = b.dataset.c === cat(w);
        $$(".bin").forEach(x => { x.disabled = true; if (x.dataset.c === cat(w)) x.classList.add("good"); });
        if (!ok) b.classList.add("bad", "shake");
        ok ? (score++, sGood()) : sBad();
        const why = cat(w) === "n" && (w.t === "a" || w.t === "pr" || w.t === "p") ? " En grammaire arabe, c'est un nom (اسْم)." : "";
        $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"} fade-in">${ar(w.ar)} : ${esc(w.fr)} → <b>${{ n: "nom", v: "verbe", p: "particule" }[cat(w)]}</b>.${why}</div><button class="btn block sticky-next" id="nx">Continuer</button>`;
        $("#nx").onclick = () => { i++; show(); };
      });
    };
    show();
  }

  function gLettres() {
    const words = sample(pool(w => { const s = strip(w.ar); return w.t !== "p" && !/[\sـ]/.test(s) && s.length >= 3 && s.length <= 7; }), 6);
    let i = 0, score = 0;
    const show = () => {
      if (i >= words.length) { record("lettres", score); return result({ r: score / words.length, title: "Orthographe", sub: `${score} mot${score > 1 ? "s" : ""} du premier coup sur ${words.length}`, again: gLettres, back: "#/entrainement" }); }
      const w = words[i], target = [...strip(w.ar)];
      const tiles = shuffle(target.map((c, k) => ({ c, k })));
      let built = [], tries = 0;
      const draw = () => {
        app.innerHTML = `<div class="fade-in"><div class="ex-top"><div class="progress"><i style="width:${i / words.length * 100}%"></i></div><span class="count">${i + 1} / ${words.length}</span></div>
          <div class="card center"><div class="xs muted">Écrivez en arabe</div><div style="font-size:1.25rem;font-weight:650">${esc(w.fr)}</div><div class="xs muted">${TYPE[w.t]}${w.r ? " · racine " + rt(w.r) : ""}</div></div>
          <div class="assembled">${built.map(t => t.c).join("") || "&nbsp;"}</div>
          <div class="slots">${target.map((_, k) => `<div class="slot ${built[k] ? "f" : ""}">${built[k] ? built[k].c : ""}</div>`).join("")}</div>
          <div class="tiles">${tiles.map((t, k) => `<button class="tile ${built.includes(t) ? "used" : ""}" data-k="${k}">${t.c}</button>`).join("")}</div>
          <div class="center" style="margin-top:14px"><button class="btn quiet" id="undo">${ic("undo")}Effacer</button></div><div id="fb"></div></div>`;
        $$(".tile").forEach(b => b.onclick = () => { built.push(tiles[+b.dataset.k]); tone([520], .04, .03); built.length === target.length ? check() : draw(); });
        $("#undo").onclick = () => { built.pop(); draw(); };
      };
      const check = () => {
        const ok = built.map(t => t.c).join("") === target.join("");
        draw(); $$(".tile, #undo").forEach(x => x.disabled = true);
        if (ok) {
          if (!tries) score++; sGood();
          $("#fb").innerHTML = `<div class="feedback good fade-in"><span class="h">Correct</span>${ar(w.ar)} : ${esc(w.fr)}</div><button class="btn block sticky-next" id="nx">Continuer</button>`;
          $("#nx").onclick = () => { i++; show(); };
        } else { tries++; sBad(); $("#fb").innerHTML = `<div class="feedback bad fade-in">Ce n'est pas l'ordre attendu. Réessayez.</div>`; setTimeout(() => { built = []; draw(); }, 900); }
      };
      draw();
    };
    show();
  }

  // ————————————————— Réglages —————————————————
  let installEvt = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; });
  function reglages() {
    chrome("Réglages");
    const st = S.settings;
    const rb = rangeBox(() => reglages());
    app.innerHTML = `<div class="fade-in">
      <div class="page-head"><h2>Réglages</h2></div>
      <div class="section-title">Vocabulaire</div>
      <div class="card flat">${rb.html}</div>
      <div class="section-title">Affichage</div>
      <div class="list">
        <div class="setting"><div class="l"><b>Thème</b></div><select id="theme"><option value="auto">Automatique</option><option value="light">Clair</option><option value="dark">Sombre</option></select></div>
        <div class="setting"><div class="l"><b>Taille de l'arabe</b><span class="ar" lang="ar" style="font-size:var(--ar-size)">بِسْمِ اللَّهِ</span></div><input type="range" id="size" min="1.2" max="2.4" step="0.1" value="${st.arSize}"></div>
        <div class="setting"><div class="l"><b>Sons d'interface</b><span>Signal discret pour les bonnes et mauvaises réponses</span></div><label class="switch"><input type="checkbox" id="snd" ${st.sound ? "checked" : ""}><span></span></label></div>
      </div>
      <div class="section-title">Installer l'application</div>
      <div class="card flat">${installEvt ? `<button class="btn block" id="inst">${ic("download")}Installer sur cet appareil</button>` :
        `<p class="small" style="margin:0"><b>iPhone (Safari)</b> : bouton Partager, puis « Sur l'écran d'accueil ».<br><b>Android (Chrome)</b> : menu ⋮, puis « Installer l'application ».</p>`}
        <p class="small muted" style="margin:10px 0 0">Les leçons et le lexique fonctionnent hors connexion. L'audio nécessite une connexion.</p></div>
      <div class="section-title">Progression</div>
      <div class="card flat"><p class="small muted" style="margin:0 0 12px">Votre progression est enregistrée sur cet appareil.</p><button class="btn secondary block" id="reset">Réinitialiser la progression</button></div>
      <div class="section-title">Sources</div>
      <div class="card flat small muted">
        <p style="margin:0 0 8px">Texte, lemmes, racines et fréquences : <b>Quranic Arabic Corpus</b> (morphologie v0.4, version corrigée par furqan.co).</p>
        <p style="margin:0 0 8px">Audio : récitation mot à mot et récitation des versets par Mishary Alafasy, via Quran.com.</p>
        <p style="margin:0">Les traductions sont des sens de travail, à compléter par une traduction de référence.</p></div>
    </div>`;
    rb.bind();
    $("#theme").value = st.theme;
    $("#theme").onchange = e => { st.theme = e.target.value; save(); applySettings(); };
    $("#size").oninput = e => { st.arSize = +e.target.value; save(); applySettings(); };
    $("#snd").onchange = e => { st.sound = e.target.checked; save(); };
    if ($("#inst")) $("#inst").onclick = async () => { installEvt.prompt(); await installEvt.userChoice; installEvt = null; reglages(); };
    let armed = false;
    $("#reset").onclick = e => {
      if (!armed) { armed = true; e.target.textContent = "Confirmer la réinitialisation"; e.target.style.color = "var(--err)"; return; }
      S = structuredClone(DEF); save(); applySettings(); location.hash = "#/";
    };
  }

  // ————————————————— Démarrage —————————————————
  applySettings(); route();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js");
})();
