/* W. Rokitzky AG, Website. Router mit eigenen Adressen (History API), Seitenvorlagen und Animationen (GSAP, ScrollTrigger, Lenis).
   Jede Seite liegt zusätzlich als fertiges HTML vor (scripts/prerender.mjs). In der Artefakt-Vorschau läuft der Router über Anker (data-router="hash"). */
(() => {
  const S = window.SITE, B = window.BRAND;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const HAS_GSAP = !!window.gsap;
  document.documentElement.classList.toggle('js', HAS_GSAP && !REDUCE);

  /* Drohnenvideo im Titelbild der Startseite (TODO K09): sobald es vorliegt, die Dateien unter media/ ablegen und hier eintragen.
     MP4 (H.264) und WebM, je höchstens 4 MB, ohne Tonspur. Posterbild ist ein Bild aus img/ (Name ohne Endung),
     ohne Angabe das erste Standbild. Bei reduzierter Bewegung und mit aktivem Datensparmodus bleibt es beim Standbild.
     Beispiel: { mp4: 'media/hero-drohne.mp4', webm: 'media/hero-drohne.webm', poster: 'hero-drohne' } */
  const HERO_VIDEO = null;

  /* ---------- SVG ---------- */
  const svg = {
    wordmark: () => `<svg viewBox="${B.wordmark.viewBox}" role="img" aria-label="rokitzky"><path fill="currentColor" fill-rule="evenodd" d="${B.wordmark.d}"/></svg>`,
    icon: () => `<svg viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="#4d6182" d="${B.icon.hex}"/><path fill="#fff" d="${B.icon.r}"/></svg>`,
    burger: () => `<svg viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="#4d6182" d="${B.icon.hex}"/><g class="burg__lines" fill="#fff"><rect x="55" y="54" width="88" height="12" rx="6"/><rect x="55" y="81" width="88" height="12" rx="6"/><rect x="55" y="108" width="88" height="12" rx="6"/></g><path class="burg__x" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" d="M70 58 128 116M128 58 70 116"/></svg>`,
    iconWhite: () => `<svg viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="#fff" d="${B.icon.hex}"/><path fill="#4d6182" d="${B.icon.r}"/></svg>`,
    hex: () => `<svg class="hexmini" viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="currentColor" d="${B.icon.hex}"/></svg>`,
    mark: () => `<svg class="hexmini hexmini--mark" viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="#4d6182" d="${B.icon.hex}"/><path fill="#fff" d="${B.icon.r}"/></svg>`,
    hexLine: () => `<svg viewBox="-4 -4 205.5 182.1" aria-hidden="true"><path d="${B.icon.hex}"/></svg>`,
    hexFill: () => `<svg viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="currentColor" d="${B.icon.hex}"/></svg>`,
    ring: () => `<svg viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="${B.ring.d}"/></svg>`,
    arrow: () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12h15M13.5 6l6 6-6 6"/></svg>`,
    plus: () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
    phone: () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
    mail: () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,
    swoosh: () => `<svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="M4.2 17.6C52 11.6 132 6.9 296.2 3.6c2.6-.05 3.1 2.8.4 3.2C193 9.9 104 15.6 10.6 22.5c-5.3.4-9.6-3.9-6.4-4.9Z"/></svg>`
  };
  const ringLock = (cls = '') => `<div class="ringlock ${cls}" aria-hidden="true"><div class="ring">${svg.ring()}</div><div class="hexc">${svg.iconWhite()}</div></div>`;
  const sw = (t) => `<span class="sw">${t}<span class="sw__mark">${svg.swoosh()}</span></span>`;
  const swLast = (t) => { const i = t.lastIndexOf(' '); return i < 0 ? sw(t) : `${t.slice(0, i)} ${sw(t.slice(i + 1))}`; };
  const swKey = (t) => { const w = t.split(' '); let k = 0; w.forEach((x, i) => { if (x.replace(/[^\p{L}]/gu, '').length >= w[k].replace(/[^\p{L}]/gu, '').length) k = i; }); w[k] = sw(w[k]); return w.join(' '); };
  const btn = (href, label, cls = 'btn--solid', icon = svg.arrow(), extra = '') => `<a class="btn ${cls}" href="${href}" ${extra}>${label}${icon ? ' ' + icon : ''}</a>`;
  const tel = (cls = 'btn--ghost') => `<a class="btn ${cls} btn--tel" href="tel:${S.company.pikettHref}">Pikett 24/7: ${S.company.pikett}</a>`;
  const img = (name, alt = '', pos = '50% 50%', eager = false, m = null, mpos = null) => {
    const tag = `<img class="ob" src="${BASE}img/${name}.webp" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="--op:${pos};--opm:${mpos || pos}">`;
    return m ? `<picture><source media="(max-width: 820px)" srcset="${BASE}img/${m}.webp">${tag}</picture>` : tag;
  };
  const ruleBox = (label, hex = false, light = false) => `<div class="rulebox ${hex ? 'rulebox--hex' : ''}" data-reveal><span class="rule"></span>${hex ? svg.mark() : ''}<span class="lbl ${light ? 'lbl--light' : ''}">${label}</span></div>`;
  const focusBy = (slug) => S.focus[slug];
  const groupOf = (gid) => S.groups.find(g => g.id === gid);
  const areaBy = (slug) => S.areas.find(a => a.slug === slug);
  const locNames = 'Wallisellen, Winterthur, Hinwil und Zürich';
  const jobBy = (slug) => (S.jobs || []).find(j => j.slug === slug);
  const parentOf = (slug) => S.areas.find(a => a.related.includes(slug)) || S.areas[0];

  /* ---------- Adressen ---------- */
  const HASH = document.documentElement.dataset.router === 'hash';
  const PRE = !!window.__PRERENDER__;
  const BASE = (() => { const el = document.querySelector('script[src*="js/app.js"]'); return el ? new URL('../', el.src).pathname : '/'; })();
  const SITE_URL = S.siteUrl.replace(/\/+$/, '');
  const pathOf = (k) => k === 'start' ? '' : k.startsWith('stelle-') ? `karriere/${k.slice(7)}/` : k === 'dienstleistungen' ? 'leistungen/' : (areaBy(k) || focusBy(k)) ? `leistungen/${k}/` : `${k}/`;
  const u = (k = 'start') => HASH ? '#' + k : BASE + pathOf(k);
  const abs = (k = 'start') => SITE_URL + '/' + pathOf(k);
  let pageFaq = [];

  /* ---------- page parts ---------- */
  function hero(o) {
    const crumb = o.crumb ? `<nav class="hero__crumb" aria-label="Brotkrumen" data-hero="fade">${o.crumb.map((c, i) => (i ? '<span aria-hidden="true">/</span>' : '') + (c[1] ? `<a href="${c[1]}">${c[0]}</a>` : `<span aria-current="page">${c[0]}</span>`)).join('')}</nav>` : '';
    const slides = (o.slides || [{ src: o.img, m: o.m, pos: o.pos, mpos: o.mpos, alt: o.alt || '' }]).map((s, i) => s.m
      ? `<picture class="hero__still" data-slide="${i}"><source media="(max-width: 820px)" srcset="${BASE}img/${s.m}.webp"><img src="${BASE}img/${s.src}.webp" alt="${s.alt || ''}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} class="ob" style="--op:${s.pos || '50% 50%'};--opm:${s.mpos || s.pos || '50% 50%'}"></picture>`
      : `<img class="hero__still ob" data-slide="${i}" src="${BASE}img/${s.src}.webp" alt="${s.alt || ''}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} style="--op:${s.pos || '50% 50%'};--opm:${s.mpos || s.pos || '50% 50%'}">`).join('');
    const tArr = Array.isArray(o.title) ? o.title : [o.title];
    const longest = Math.max(...tArr.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).map(w => w.length));
    const lines = tArr.map(l => `<span class="split-line ln"><span style="display:block">${l}</span></span>`).join('');
    return `<section class="hero ${o.home ? 'hero--home' : 'hero--sub'} ${o.dim ? 'hero--dim' : ''}" data-hero>
      <div class="hero__media" data-hero-media>${slides}</div>
      <div class="hero__shade"></div>
      <div class="wrap hero__in">
        <div>
          ${crumb}
          ${o.kicker ? `<p class="hero__kicker" data-hero="fade">${svg.mark()}<span>${o.kicker}</span></p>` : ''}
          <h1 class="${o.home ? 'display' : 'h1'}${longest > 13 ? ' is-long' : ''}" id="page-title" style="--lw:${longest}">${lines}</h1>
          ${o.sub ? `<p class="hero__sub" data-hero="fade">${o.sub}</p>` : ''}
          ${o.btns ? `<div class="btns" data-hero="fade">${o.btns}</div>` : ''}
        </div>
      </div>
      <div class="hero__foot" data-hero="fade"><div class="wrap">
        <div class="hero__locs">${S.locations.map(l => `<span>${l.name}</span>`).join('')}</div>
        <span class="hero__scroll">${o.home ? 'Seit 1970' : 'Persönlich &amp; Verbindlich'}</span>
      </div></div>
    </section>`;
  }

  const ctaBlock = (title = 'Persönlich &amp; Verbindlich', text = `Für Anfragen und Offerten erreichen Sie uns unter ${S.company.phone} oder per Mail. Bei Störungen hilft unser Pikettdienst rund um die Uhr.`, pic = ['action-team', '45% 45%']) => `
    <section class="cta on-dark" aria-label="Kontakt">
      <div class="cta__media">${img(pic[0], '', pic[1], false, pic[2], pic[3])}</div>
      <div class="cta__txt">
        ${ruleBox('So erreichen Sie uns', true, true)}
        <h2 class="h2" data-reveal>${swLast(title)}</h2>
        <p data-reveal>${text}</p>
        <div class="btns" data-reveal>${btn(u('kontakt'), 'Kontakt aufnehmen', 'btn--white')}${btn('mailto:' + S.company.mail, S.company.mail, 'btn--ghost', svg.mail())}${tel()}</div>
      </div>
    </section>`;
  const band = (pic, pos, label, text, m = null, mpos = null) => `<section class="band on-dark" aria-label="${label}">${img(pic, '', pos, false, m, mpos)}<div class="wrap band__in">${ruleBox(label, true, true)}<p class="h2" data-reveal>${swKey(text)}</p></div></section>`;


  const faqBlock = (items, title = 'Häufige Fragen') => (pageFaq.push(...items), `
    <section class="sec wrap" aria-labelledby="faq-t">
      <div class="sec__head"><div>${ruleBox('FAQ')}<h2 class="h2${Math.max(...title.split(' ').map(w => w.length)) > 14 ? ' h2--long' : ''}" id="faq-t">${title}</h2></div><p class="muted" data-reveal>Ihre Frage ist nicht dabei? Schreiben Sie uns an <a class="link" href="mailto:${S.company.mail}">${S.company.mail}</a> oder rufen Sie an: ${S.company.phone}.</p></div>
      <div class="faq" data-reveal>${items.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}<i>${svg.plus()}</i></summary><p class="a">${a}</p></details>`).join('')}</div>
    </section>`);

  const generalFaq = [
    ['Arbeiten Sie auch an Anlagen, die Sie nicht selbst gebaut haben?', 'Ja. Wir reparieren und warten auch Anlagen anderer Installateure und planen ihre Servicezyklen.'],
    ['Gibt es einen Notdienst?', `Ja. Unser Pikettdienst ist seit 2013 rund um die Uhr erreichbar: ${S.company.pikett}.`],
    ['Wo sind Ihre Standorte?', `Unser Hauptsitz ist in Wallisellen, weitere Standorte haben wir in Winterthur, Hinwil und Zürich.`]
  ];

  // TODO B23: dunkle Version der SQS-Zeichen von Rokitzky einsetzen (über Andrej), danach den Filter bei .mark--seal in site.css entfernen.
  const markImgs = () => `<img class="mark" src="${BASE}img/toplehrbetrieb.svg" alt="Toplehrbetrieb Gebäudetechnik" loading="lazy" width="350" height="108"><img class="mark" src="${BASE}img/gebaeudetechniker.svg" alt="Wir, die Gebäudetechniker" loading="lazy" width="350" height="157"><img class="mark mark--seal" src="${BASE}img/iso-9001.webp" alt="SQS Zertifiziertes Managementsystem ISO 9001" loading="lazy" width="240" height="240"><img class="mark mark--seal" src="${BASE}img/iso-14001-45001.webp" alt="SQS Zertifiziertes Managementsystem ISO 14001 und 45001" loading="lazy" width="240" height="240">`;
  const marks = (plain = false) => `<div class="marks ${plain ? 'marks--plain' : ''}" data-reveal>${plain ? '' : '<span class="marks__lbl">Ausgezeichnet und zertifiziert</span>'}<div class="marks__row">${markImgs()}</div></div>`;
  const portraitWall = () => {
    const P = S.portraits, cols = [[0, 3, 6], [1, 4], [2, 5]];
    return `<div class="pwall" data-pwall>${cols.map((c, k) => `<div class="pwall__col" data-parallax-y="${[-5, 4, -2][k]}">${c.filter(i => P[i]).map((i, j) => `<img class="pwall__img${j ? '' : ' is-on'}" src="${BASE}img/${P[i]}.webp" alt="Mitarbeiter von Rokitzky" loading="lazy">`).join('')}</div>`).join('')}</div>`;
  };
  /* TODO K04 (B17): Zahl der Lernenden von Rokitzky bestätigen (pro Jahr neu oder gesamt). Vorkommen: teamBlock, Karriere (Hero, Lehre), Mitarbeitende (Band), META karriere. */
  const teamBlock = (title = 'Über 80 Mitarbeitende.', lead = 'In Wallisellen, Winterthur, Hinwil und Zürich, in Projektleitung, Montage, Service und Administration. Dazu bilden wir jedes Jahr 15 bis 20 Lernende aus.', btns = true) => `
    <div class="wrap team">
      <div class="team__txt">
        ${ruleBox('Mitarbeitende')}
        <h2 class="h2">${title}</h2>
        <p class="lead" data-reveal style="margin-top:1.4rem">${lead}</p>
        ${btns ? `<div class="btns" data-reveal>${btn(u('mitarbeitende'), 'Arbeiten bei Rokitzky')}${btn(u('karriere'), 'Offene Stellen und Lehre', 'btn--ghost')}</div>` : ''}
      </div>
      ${portraitWall()}
    </div>`;


  /* ---------- pages ---------- */
  function pageHome() {
    return `
    ${hero({
      home: true,
      slides: [
        { src: 'westen-tuer', m: 'westen-tuer-m', pos: '50% 50%', mpos: '50% 50%', alt: 'Zwei Mitarbeitende von Rokitzky in Warnwesten mit Logo' },
        { src: 'hero-funken', m: 'hero-funken-m', pos: '64% 50%', alt: 'Monteur von Rokitzky kürzt ein Lüftungsrohr, die Funken fliegen' },
        { src: 'kran-einhub', m: 'kran-einhub-t', pos: '50% 50%', mpos: '72% 50%', alt: 'Monteure von Rokitzky führen eine Kälteanlage am Kran auf das Dach' }
      ],
      kicker: 'Heizung | Lüftung | Klima | Kälte | Sanitär',
      title: ['Persönlich &amp;', sw('verbindlich.')],
      sub: 'Wir verbauen, was wir besprechen. Seit 1970 planen, bauen, warten und sanieren wir Haustechnik, mit Pikettdienst rund um die Uhr.',
      btns: btn(u('dienstleistungen'), 'Unsere Leistungen', 'btn--white') + tel()
    })}

    <section class="stmt wrap" aria-label="Unser Anspruch">
      ${ruleBox('Was wir können', true)}
      <p class="stmt__big" data-words><span class="w">Zu</span> <span class="w">heiss?</span> <span class="w">Zu</span> <span class="w">kalt?</span> <span class="w accent">Rokitzky!</span></p>
      <div class="stmt__grid">
        <p class="lead" data-reveal>Wir wissen, was wir können und was nicht, in der Planung ebenso wie bei der Ausführung.</p>
        <div class="stmt__facts" data-reveal>
          <p>Wir können Heizung und Kälte. Wir können Lüftung und Klima. Wir können Sanitär. Wir können Service und Unterhalt. Wir können erneuerbare Energien.</p>
          <a class="link" href="${u('unternehmen')}">Mehr über Rokitzky ${svg.arrow()}</a>
        </div>
      </div>
    </section>

    <section class="sec wrap" aria-labelledby="dl-t" style="padding-top:0">
      <div class="sec__head">
        <div>${ruleBox('Was wir tun')}<h2 class="h2" id="dl-t">Leistungen</h2></div>
        <p class="lead" data-reveal>Heizung und Kälte, Lüftung und Klima, Sanitär und erneuerbare Energien. Nach der Inbetriebnahme kümmern wir uns um Service und Unterhalt.</p>
      </div>
      <div class="slist">${S.areas.map(a => `
        <a class="srow" href="${u(a.slug)}" data-reveal>
          <span class="srow__t">${a.title}</span>
          <span class="srow__d">${a.short}</span>
          <span class="srow__a">${svg.arrow()}</span>
          <span class="srow__thumb">${img(a.img, '', a.pos)}</span>
        </a>`).join('')}
      </div>
    </section>

    <section class="sec sec--navy pk on-dark" aria-labelledby="pk-t">
      <div class="wrap pk__grid">
        <div>
          ${ruleBox('Störungsdienst und Pikett', true, true)}
          <h2 class="h2" id="pk-t">Rund um die Uhr erreichbar.</h2>
          <a class="pk__num" href="tel:${S.company.pikettHref}" data-reveal>${S.company.pikett}</a>
          <p class="lead" data-reveal>Und wenn ausserplanmässig etwas nicht funktioniert, rufen Sie uns an. Unseren Pikettdienst gibt es seit 2013, rund um die Uhr.</p>
          <div class="btns" data-reveal style="margin-top:2rem">${btn('tel:' + S.company.pikettHref, 'Jetzt anrufen', 'btn--white', svg.phone())}${btn(u('stoerungsdienst-pikett'), 'Mehr zum Pikettdienst', 'btn--ghost')}</div>
        </div>
        <div class="pk__media" data-img>${img('van-tall', 'Fahrzeuge von Rokitzky mit Logo und Ring Heizung Lüftung Sanitär', '50% 30%')}</div>
      </div>
    </section>


    <section class="sec wrap" aria-labelledby="un-t">
      <div class="split">
        <div class="split__media morph" data-morph>${img('service-check-tall', 'Servicetechniker von Rokitzky kontrolliert ein Thermometer an einer Anlage', '50% 40%')}</div>
        <div class="split__txt">
          ${ruleBox('Unternehmen')}
          <h2 class="h2" id="un-t">Seit 1970 im Kanton Zürich.</h2>
          <p data-reveal>Was 1970 als Einmannbetrieb in Embrach begann, ist heute ein inhabergeführter Handwerksbetrieb mit über 80 Mitarbeitenden. Unsere wichtigsten Werte: Verbindlichkeit und Kundennähe.</p>
          <div class="mini-tl" data-reveal>
            <div><b>1970</b><span>Start in Embrach</span></div>
            <div><b>1987</b><span>W. Rokitzky AG</span></div>
            <div><b>2013</b><span>Pikettdienst 24/7</span></div>
            <div><b>2020</b><span>K3 Handwerkcity</span></div>
          </div>
          <div class="btns" data-reveal>${btn(u('unternehmen'), 'Unsere Geschichte')}</div>
        </div>
      </div>
    </section>

    <section class="sec sec--paper" aria-label="Mitarbeitende">${teamBlock()}<div class="wrap">${marks()}</div></section>

    ${mapSection()}
    ${ctaBlock('Sprechen wir über Ihr Projekt.', undefined, ['team-logo-t', '50% 32%', 'team-logo', '50% 50%'])}`;
  }

  function mapSection(heading = 'Vier Standorte im Kanton Zürich') {
    const m = B.map, T = m.towns;
    const order = [['Wallisellen', 'wallisellen', true], ['Winterthur', 'winterthur'], ['Hinwil', 'hinwil'], ['Zürich', 'zuerich']];
    const lab = { Wallisellen: [16, -16, 'start'], Winterthur: [16, -14, 'start'], Hinwil: [16, -14, 'start'], 'Zürich': [-16, 26, 'end'] };
    const pins = order.map(([n, id, hq]) => {
      const [x, y] = T[n]; const [dx, dy, an] = lab[n];
      return `<g transform="translate(${x} ${y})"><g class="pin ${hq ? 'is-hq' : ''}" data-pin="${id}"><circle class="halo" r="22"/><path class="hx" transform="translate(-13 -11.5) scale(.1316)" d="${B.icon.hex}"/><text x="${dx}" y="${dy}" text-anchor="${an}">${n}</text></g></g>`;
    }).join('');
    return `<section class="sec sec--navy on-dark" aria-labelledby="map-t">
      <div class="wrap map__grid">
        <div>
          ${ruleBox('Standorte', true, true)}
          <h2 class="h2" id="map-t">${heading}</h2>
          <div class="locs">${S.locations.map(l => `<div class="loc" data-loc="${l.id}"><h3>${l.name}</h3><span class="role">${l.role}</span>${l.street ? `<p>${l.street}, ${l.city}<br><a href="tel:${l.href}">${l.phone}</a></p>` : `<p>Kontakt über den Hauptsitz: <a href="tel:${S.company.phoneHref}">${S.company.phone}</a></p>`}</div>`).join('')}</div>
        </div>
        <div class="map" data-map>
          <svg viewBox="0 0 ${m.w} ${m.h}" role="img" aria-label="Karte Kanton Zürich mit den Standorten ${locNames}">
            ${m.lakes.map(d => `<path class="lake" d="${d}"/>`).join('')}
            <path class="canton" d="${m.canton}"/>
            ${pins}
          </svg>
        </div>
      </div>
    </section>`;
  }

  function pageServices() {
    return `
    ${hero({ img: 'montage-team', m: 'montage-team-t', pos: '50% 50%', mpos: '14% 50%', alt: 'Zwei Monteure von Rokitzky in Warnwesten montieren eine Kälteanlage', crumb: [['Home', u()], ['Leistungen']], kicker: 'Was wir können', title: ['Leistungen'], sub: 'Zu heiss? Zu kalt? Rokitzky! Wir können Heizung und Kälte, Lüftung und Klima, Sanitär, Service und Unterhalt sowie erneuerbare Energien.', btns: btn(u('kontakt'), 'Projekt besprechen', 'btn--white') + tel() })}
    <section class="sec wrap intro intro--solo" aria-label="Einleitung">
      <div>${ruleBox('Was wir tun')}<p class="lead" data-reveal>Wir wissen, was wir können und was nicht, in der Planung ebenso wie bei der Ausführung. Deshalb sagen wir klar, was wir können, und verbauen, was wir besprochen haben.</p></div>
    </section>
    <section class="sec wrap" style="padding-top:0" aria-label="Bereiche">
      <div class="areas-big">${S.areas.map(a => `
        <article class="area" id="b-${a.slug}">
          <div class="area__media" data-img>${img(a.img, a.title, a.pos)}</div>
          <div>
            <h2 class="h2">${a.title}</h2>
            <p data-reveal>${a.lead}</p>
            <ul class="checks" data-reveal>${a.items.slice(0, 4).map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
            <div class="btns" data-reveal>${btn(u(a.slug), 'Mehr ' + a.zu)}</div>
          </div>
        </article>`).join('')}
      </div>
    </section>
    ${faqBlock(generalFaq)}
    ${ctaBlock(undefined, undefined, ['montage-helme-t', '50% 76%', 'montage-helme', '50% 50%'])}`;
  }

  function pageArea(a) {
    const rel = a.related.map(s => [s, focusBy(s)]).filter(([, f]) => f);
    return `
    ${hero({ img: a.img, pos: a.pos, alt: a.title, crumb: [['Home', u()], ['Leistungen', u('dienstleistungen')], [a.title]], kicker: 'Leistungen', title: [a.title], sub: a.short, btns: btn(u('kontakt'), 'Projekt besprechen', 'btn--white') + tel() })}
    <section class="sec wrap intro" aria-label="Leistungen">
      <div>${ruleBox('Was wir tun')}<p class="lead" data-reveal>${a.lead}</p></div>
      <ul class="checks" data-reveal>${a.items.map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
    </section>
    <section class="sec sec--paper" aria-labelledby="th-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Schwerpunkte')}<h2 class="h2" id="th-t">${a.title} im Detail</h2></div><p class="lead" data-reveal>Zu jedem Thema gibt es eine eigene Seite mit den wichtigsten Fragen und Antworten.</p></div>
      <div class="themen">${rel.map(([s, f]) => `
        <article class="thema" id="t-${s}" data-reveal>
          <h3 class="thema__t">${f.title}</h3>
          <div class="thema__b">
            <p>${f.lead}</p>
            <ul class="thema__l">${f.items.map(i => `<li>${i}</li>`).join('')}</ul>
            <a class="link" href="${u(s)}">Mehr ${f.zu} ${svg.arrow()}</a>
          </div>
        </article>`).join('')}
      </div>
    </div></section>
    ${band(a.bandImg, '50% 50%', 'Persönlich und verbindlich', a.band, a.bandImg + '-t', a.bandMpos)}
    ${faqBlock([...rel.map(([, f]) => f.faq[0]), generalFaq[1]], 'Fragen ' + a.zu)}
    ${ctaBlock(undefined, undefined, a.cta)}`;
  }

  function pageFocus(slug, f) {
    const parent = parentOf(slug);
    const siblings = parent.related.filter(s => s !== slug).map(s => [s, focusBy(s)]).filter(([, x]) => x);
    const faq = slug === 'stoerungsdienst-pikett' ? [...f.faq] : [...f.faq, generalFaq[1]];
    return `
    ${hero({ img: f.img, m: f.m, pos: f.pos, mpos: f.mpos, alt: f.title, crumb: [['Home', u()], ['Leistungen', u('dienstleistungen')], [parent.title, u(parent.slug)], [f.title]], kicker: parent.title, title: [f.h1], sub: `${f.sub}. Von unseren Standorten in ${locNames}.`, btns: btn(u('kontakt'), 'Anfrage stellen', 'btn--white') + tel() })}
    <section class="sec wrap intro" aria-label="Leistungen">
      <div>${ruleBox(f.title + ' bei Rokitzky')}<p class="lead" data-reveal>${f.lead}</p></div>
      <ul class="checks" data-reveal>${f.items.map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
    </section>
    ${faqBlock(faq, 'Fragen ' + f.zu)}
    <section class="sec sec--paper sec--tight" aria-labelledby="mo-t"><div class="wrap more">
      <div>${ruleBox(parent.title)}<h2 class="h2" id="mo-t">Weitere Themen</h2></div>
      <ul class="more__l" data-reveal>${siblings.map(([s, x]) => `<li><a href="${u(s)}"><span>${x.title}</span>${svg.arrow()}</a></li>`).join('')}<li><a href="${u(parent.slug)}"><span>Zurück ${parent.zu}</span>${svg.arrow()}</a></li></ul>
    </div></section>
    ${ctaBlock(undefined, undefined, f.cta)}`;
  }

  function pageCompany() {
    return `
    ${hero({ img: 'team-dach', m: 'team-dach-m', pos: '35% 55%', alt: 'Monteure von Rokitzky besprechen sich auf dem Dach einer Baustelle', crumb: [['Home', u()], ['Unternehmen']], kicker: 'Unternehmen', title: ['Inhabergeführt', 'seit 1970.'], sub: 'Vom Einmannbetrieb in Embrach zum Handwerksbetrieb mit über 80 Mitarbeitenden und vier Standorten.', btns: btn(u('kontakt'), 'Kontakt', 'btn--white') + btn(u('mitarbeitende'), 'Mitarbeitende', 'btn--ghost') })}
    <section class="sec wrap intro intro--solo" aria-label="Über uns">
      <div>${ruleBox('Persönlich &amp; Verbindlich', true)}<p class="lead" data-reveal>Rokitzky ist ein inhabergeführter Handwerksbetrieb mit Tradition. Seit mehr als 50 Jahren sorgen wir für ein gutes Gebäudeklima. Auf dieser Erfahrung basieren unsere wichtigsten Werte: Verbindlichkeit und Kundennähe.</p></div>
    </section>
    <section class="sec sec--paper" aria-labelledby="tl-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Geschichte')}<h2 class="h2" id="tl-t">Vom Einmannbetrieb zu Rokitzky</h2></div><p class="lead" data-reveal>Über fünf Jahrzehnte Haustechnik im Kanton Zürich.</p></div>
      <div class="tl" data-tl><span class="tl__line"><span class="tl__fill"></span></span>
        ${S.timeline.map(([y, t, d]) => `<div class="tl__item" data-reveal><span class="tl__y">${y}</span><span class="tl__dot">${svg.hexFill()}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
      </div>
    </div></section>
    ${mapSection('Vier Standorte im Kanton Zürich')}
    <section class="sec wrap" aria-labelledby="zp-t">
      <div class="sec__head"><div>${ruleBox('Qualität')}<h2 class="h2" id="zp-t">Zertifikate und Referenzen</h2></div></div>
      <div class="cgrid cgrid--2">
        <div class="ccard" data-reveal><span class="lbl">Zertifikate</span><h3>ISO 9001, 14001 und 45001</h3><p>Unser Managementsystem ist von der SQS nach ISO 9001, ISO 14001 und ISO 45001 zertifiziert. Wir lassen unseren Betrieb regelmässig überprüfen.</p></div>
        <div class="ccard" data-reveal><span class="lbl">Referenzen</span><h3>Ausgeführte Projekte</h3><p>Wir haben zahlreiche kleine, grosse und sehr grosse Projekte geplant und ausgeführt.</p><a href="${u('referenzen')}">Referenzobjekte ansehen</a></div>
      </div>
      ${marks()}
      <div class="chips" style="margin-top:2rem" data-reveal>${S.legal.map(([t, u]) => `<a class="chip" href="${u}" target="_blank" rel="noopener">${t} (PDF)</a>`).join('')}</div>
    </section>
    ${ctaBlock(undefined, undefined, ['team-dach-himmel-t', '50% 71%', 'team-dach-himmel', '50% 50%'])}`;
  }

  const personCard = ([n, r, slug], big = false) => `<figure class="person${big ? ' person--big' : ''}"${big ? ' data-reveal' : ''}><div class="person__img"><img src="${BASE}img/team/${slug}${big ? '-xl' : ''}.webp" alt="${n}, ${r}" loading="lazy" decoding="async" width="${big ? 450 : 300}" height="${big ? 600 : 400}"></div><figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`;

  function pageTeam() {
    const T = S.team;
    return `
    ${hero({ img: 'hero-dach', pos: '55% 45%', alt: 'Monteure von Rokitzky auf dem Dach einer Baustelle', crumb: [['Home', u()], ['Mitarbeitende']], kicker: 'Mitarbeitende', title: ['Unser Team.'], sub: 'Über 80 Mitarbeiterinnen und Mitarbeiter in Wallisellen, Winterthur, Hinwil und Zürich.', btns: btn(u('karriere'), 'Offene Stellen und Lehre', 'btn--white') })}
    <section class="sec" aria-labelledby="own-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Führung', true)}<h2 class="h2" id="own-t">Die Inhaber</h2></div><p class="lead" data-reveal>Michele Fiorito, Siniša Stojković und Vincenzo Aquilino führen die W. Rokitzky AG als Inhaber.</p></div>
      <div class="owners">${T.owners.map(p => personCard(p, true)).join('')}</div>
    </div></section>
    <section class="sec sec--paper" aria-labelledby="tm-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Mitarbeitende')}<h2 class="h2" id="tm-t">Das ist Rokitzky</h2></div><p class="lead" data-reveal>Alle Mitarbeiterinnen und Mitarbeiter mit Namen und Funktion.</p></div>
      <div class="tfilter" aria-label="Team nach Bereich filtern" data-reveal>
        <button type="button" class="tchip is-on" data-tf="all" aria-pressed="true">Alle</button>
        ${T.groups.map(g => `<button type="button" class="tchip" data-tf="${g.id}" aria-pressed="false">${g.title}</button>`).join('')}
      </div>
      ${T.groups.map(g => `<div class="tgrp" data-tg="${g.id}" data-reveal><h3 class="tgrp__t">${svg.hex()}<span>${g.title}</span><i>${g.people.length}</i></h3><div class="people">${g.people.map(p => personCard(p)).join('')}</div></div>`).join('')}
    </div></section>
    ${band('team-lachend', '50% 50%', 'Lehre bei Rokitzky', 'Jedes Jahr bilden wir 15 bis 20 Lernende aus.', 'team-lachend-t', '27% 50%')}
    <section class="sec sec--navy on-dark" aria-labelledby="jobs-t"><div class="wrap split">
      <div class="split__media" data-img>${img('weste-logo-nah-t', 'Monteur von Rokitzky in Warnweste mit Logo', '50% 40%')}</div>
      <div class="split__txt">
        ${ruleBox('Offene Stellen und Lehre', true, true)}
        <p class="bigquote" id="jobs-t" data-reveal>Gute Fachleute sind bei uns immer gefragt.</p>
        <p data-reveal>Ob Fachkraft oder Lernende: Bewerben Sie sich mit einer Kurzbewerbung. Unterlagen können Sie später nachreichen.</p>
        <div class="btns" data-reveal>${btn(u('karriere') + (HASH ? '' : '#kurzbewerbung'), 'Kurzbewerbung', 'btn--white')}${btn(u('karriere'), 'Offene Stellen und Lehre', 'btn--ghost')}</div>
      </div>
    </div></section>
    ${ctaBlock(undefined, undefined, ['helm-logo-t', '50% 96%', 'helm-logo', '50% 50%'])}`;
  }

  const careerContact = () => S.careerContact || { title: 'Fragen zur Bewerbung', phone: S.company.phone, phoneHref: S.company.phoneHref, mail: S.company.mail };
  function applyGrid(stelle = '') {
    const c = careerContact();
    return `
    <div class="intro apply" id="kurzbewerbung">
      <div>
        ${ruleBox('Kurzbewerbung', true)}
        <h3 class="h2" id="kb-t">Bewerben ohne Unterlagen.</h3>
        <p class="lead" data-reveal style="margin-top:1.4rem">Name, Telefon und Beruf genügen. Lebenslauf und Zeugnisse können Sie anhängen oder später nachreichen. Wir melden uns bei Ihnen.</p>
        <div class="ccard apply__contact" data-reveal><span class="lbl">Kontakt</span><h3>${c.title}</h3><p><a class="link" href="tel:${c.phoneHref}">${c.phone}</a><br><a class="link" href="mailto:${c.mail}?subject=Bewerbung">${c.mail}</a></p><p class="muted">Lieber per Mail? Schicken Sie Lebenslauf und Zeugnisse an ${c.mail}.</p></div>
      </div>
      <form class="form" id="bewerbung" data-form="bewerbung" data-reveal novalidate>
        ${fld('bewerbung', 'name', 'Name', { req: true, auto: 'name' })}
        ${fld('bewerbung', 'tel', 'Telefon', { req: true, type: 'tel', auto: 'tel' })}
        ${fld('bewerbung', 'beruf', 'Beruf', { req: true, full: true, extra: ' placeholder="Zum Beispiel Heizungsinstallateur EFZ"' })}
        ${fld('bewerbung', 'erfahrung', 'Berufserfahrung', { opts: [['', 'Bitte wählen'], 'Weniger als 3 Jahre', '3 bis 10 Jahre', 'Mehr als 10 Jahre'] })}
        ${fld('bewerbung', 'rueckruf', 'Wann dürfen wir anrufen?', { opts: [['', 'Jederzeit'], 'Vormittags', 'Über Mittag', 'Nachmittags', 'Abends'] })}
        ${fld('bewerbung', 'mail', 'Mail', { type: 'email', auto: 'email', full: true })}
        ${fld('bewerbung', 'cv', 'Lebenslauf (freiwillig)', { type: 'file', full: true, extra: ' accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"', hint: 'PDF, JPG oder PNG, höchstens 3 MB' })}
        ${fld('bewerbung', 'msg', 'Nachricht (freiwillig)', { full: true, area: true })}
        <input type="hidden" name="stelle" value="${stelle}">
        ${formFoot('bewerbung', 'Kurzbewerbung senden')}
      </form>
    </div>`;
  }

  function pageCareer() {
    const jobs = S.jobs || [], v = S.recruitingVideo;
    return `
    ${hero({ img: 'action-team-wide', m: 'action-team-tall', pos: '55% 40%', alt: 'Mitarbeitende von Rokitzky in Warnwesten in einer Technikzentrale', crumb: [['Home', u()], ['Mitarbeitende', u('mitarbeitende')], ['Karriere']], kicker: 'Karriere und Lehre', title: ['Arbeiten und lernen', 'bei Rokitzky.'], sub: 'Bewerben Sie sich mit einer Kurzbewerbung, Unterlagen können Sie später nachreichen. Lehrstellen und Schnuppertage bieten wir in fünf Berufen an.', btns: btn('#kurzbewerbung', 'Kurzbewerbung', 'btn--white') + btn('#lehre', 'Lehre und Schnuppertag', 'btn--ghost') })}
    <section class="sec" aria-labelledby="os-t" id="stellen"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Offene Stellen', true)}<h2 class="h2" id="os-t">Gute Fachleute sind bei uns immer gefragt.</h2></div><p class="lead" data-reveal>${jobs.length ? 'Unsere ausgeschriebenen Stellen. Nichts Passendes dabei? Bewerben Sie sich trotzdem mit einer Kurzbewerbung.' : 'Sie haben Erfahrung in Heizung, Lüftung, Klima, Kälte oder Sanitär und möchten bei uns mitarbeiten? Dann schicken Sie uns eine Kurzbewerbung.'}</p></div>
      ${jobs.length ? `<div class="cards cards--jobs">${jobs.map(j => `<a class="card" href="${u('stelle-' + j.slug)}" data-reveal><span class="lbl">${j.pensum}, ${j.ort}</span><div><h3>${j.title}</h3></div><span class="card__go">Zur Stelle ${svg.arrow()}</span></a>`).join('')}</div>` : ''}
      ${v ? `<video class="rvideo" controls preload="none" playsinline poster="${v.poster || ''}" src="${v.src}" title="${v.title || ''}"></video>` : ''}
      ${applyGrid()}
    </div></section>
    <section class="sec sec--paper" aria-labelledby="le-t" id="lehre"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Lehre bei Rokitzky', true)}<h2 class="h2" id="le-t">15 bis 20 Lernende pro Jahr</h2></div><div data-reveal><p class="lead">Als Toplehrbetrieb bilden wir in fünf Berufen aus. Ob Schnuppertag, Praktikum oder Berufslehre: Bei uns hast du viele Möglichkeiten, ins Berufsleben einzusteigen.</p>${marks(true)}</div></div>
      <div class="cards cards--jobs">${S.apprenticeships.map(b => `<div class="card card--lehre" data-reveal><span class="lbl">Lehrberuf</span><div><h3>${b}</h3></div><div class="card__acts"><button type="button" class="btn btn--solid" data-lehre="${b}" data-anliegen="Schnuppertag">Schnuppertag anfragen ${svg.arrow()}</button><button type="button" class="link" data-lehre="${b}" data-anliegen="Lehrstelle">Lehrstelle anfragen</button></div></div>`).join('')}</div>
      <div class="intro" style="margin-top:clamp(3rem,6vw,5rem)" id="lehre-anfrage">
        <div>${ruleBox('Schnuppertag oder Lehrstelle')}<p class="lead" data-reveal>Wähl deinen Lehrberuf und sag uns, ob du schnuppern möchtest oder dich für eine Lehrstelle bewirbst. Für die Bewerbung brauchen wir diese Unterlagen, gerne als PDF:</p><ul class="checks" data-reveal>${S.documents.map(d => `<li>${svg.hex()}${d}</li>`).join('')}</ul></div>
        <form class="form" id="lehranfrage" data-form="lehre" data-reveal novalidate>
          ${fld('lehranfrage', 'name', 'Name', { req: true, auto: 'name' })}
          ${fld('lehranfrage', 'tel', 'Telefon', { type: 'tel', auto: 'tel', hint: 'Telefon oder Mail genügt' })}
          ${fld('lehranfrage', 'mail', 'Mail', { type: 'email', auto: 'email', full: true })}
          ${fld('lehranfrage', 'lehrberuf', 'Lehrberuf', { req: true, opts: [['', 'Bitte wählen'], ...S.apprenticeships] })}
          ${fld('lehranfrage', 'anliegen', 'Anliegen', { opts: ['Schnuppertag', 'Lehrstelle'] })}
          ${fld('lehranfrage', 'cv', 'Unterlagen (freiwillig)', { type: 'file', full: true, extra: ' accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"', hint: 'PDF, JPG oder PNG, höchstens 3 MB' })}
          ${fld('lehranfrage', 'msg', 'Nachricht (freiwillig)', { full: true, area: true, extra: ' placeholder="Zum Beispiel Schule, Klasse und Wunschtermin"' })}
          ${formFoot('lehranfrage', 'Anfrage senden', true)}
        </form>
      </div>
    </div></section>
    ${ctaBlock('Persönlich &amp; Verbindlich', `Fragen zur Lehre oder zu offenen Stellen? Rufen Sie uns an: ${S.company.phone}.`, ['lernende-t', '50% 63%', 'lernende', '50% 50%'])}`;
  }

  function pageJob(j) {
    const lists = [['Ihre Aufgaben', j.aufgaben], ['Ihr Profil', j.profil], ['Wir bieten', j.angebot]].filter(([, l]) => l && l.length);
    return `
    ${hero({ img: j.img || 'action-team-wide', m: j.img ? null : 'action-team-tall', pos: '55% 40%', alt: '', crumb: [['Home', u()], ['Mitarbeitende', u('mitarbeitende')], ['Karriere', u('karriere')], [j.title]], kicker: `${j.pensum}, ${j.ort}`, title: [j.title], sub: j.lead, btns: btn('#kurzbewerbung', 'Jetzt bewerben', 'btn--white') + btn(u('karriere'), 'Alle Stellen', 'btn--ghost') })}
    <section class="sec wrap" aria-label="Stelle">
      <div class="jobgrid">${lists.map(([t, l]) => `<div data-reveal><h2 class="h3">${t}</h2><ul class="checks">${l.map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul></div>`).join('')}</div>
      <p class="muted" data-reveal style="margin-top:2rem">Pensum ${j.pensum}. Arbeitsort ${j.ort}. Start ${j.start}.</p>
    </section>
    <section class="sec sec--paper" aria-labelledby="kb-t"><div class="wrap">${applyGrid(j.title)}</div></section>
    ${ctaBlock('Persönlich &amp; Verbindlich', `Fragen zur Stelle? Rufen Sie uns an: ${S.company.phone}.`, ['lernende-t', '50% 63%', 'lernende', '50% 50%'])}`;
  }

  /* B13: Referenzliste von referenz-verwaltung.ch (LOSYS) als Einbettung, erst nach Klick geladen (Datenschutz).
     TODO K06: eigene Referenzen mit 6 bis 8 freigegebenen Projekten (Bild, Ort, Gebäudeart, Leistung) auf Startseite und Unternehmen. */
  const REF_EMBED = 'https://referenz-verwaltung.ch/preview/embed?i=gYTzvHf1JRGq';
  function pageReferences() {
    return `
    ${hero({ img: 'kran-einhub', m: 'kran-einhub-t', pos: '50% 50%', mpos: '72% 50%', alt: 'Monteure von Rokitzky führen eine Kälteanlage am Kran auf das Dach', crumb: [['Home', u()], ['Unternehmen', u('unternehmen')], ['Referenzen']], kicker: 'Unternehmen', title: ['Referenzen.'], sub: 'Wir haben zahlreiche kleine, grosse und sehr grosse Projekte geplant und ausgeführt.', btns: btn(u('kontakt'), 'Projekt besprechen', 'btn--white') + tel() })}
    <section class="sec wrap" aria-labelledby="rf-t">
      <div class="sec__head"><div>${ruleBox('Referenzliste', true)}<h2 class="h2" id="rf-t">Unsere Referenzobjekte</h2></div><p class="lead" data-reveal>Hier finden Sie die Liste unserer Referenzobjekte.</p></div>
      <div class="refembed" data-refembed="${REF_EMBED}" data-reveal>
        <div class="refembed__gate">
          <p>Die Liste wird von referenz-verwaltung.ch geladen. Dabei übermittelt Ihr Browser Ihre Internetadresse an diesen Anbieter. Mehr dazu in der <a class="link" href="${u('datenschutz')}">Datenschutzerklärung</a>.</p>
          <button type="button" class="btn btn--solid" data-refload>Referenzliste laden ${svg.arrow()}</button>
        </div>
      </div>
    </section>
    ${ctaBlock(undefined, undefined, ['team-dach-himmel-t', '50% 71%', 'team-dach-himmel', '50% 50%'])}`;
  }

  function pageContact() {
    const withAddr = S.locations.filter(l => l.street), noAddr = S.locations.filter(l => !l.street);
    return `
    ${hero({ dim: true, ring: false, img: 'van-wide', pos: '40% 50%', alt: 'Servicefahrzeug von Rokitzky', crumb: [['Home', u()], ['Kontakt']], kicker: 'Kontakt', title: ['So erreichen', 'Sie uns.'], sub: 'Persönlich und verbindlich, an vier Standorten und mit Pikettdienst rund um die Uhr.', btns: btn('mailto:' + S.company.mail, S.company.mail, 'btn--white', svg.mail()) + tel() })}
    <section class="sec wrap" aria-labelledby="kd-t">
      <h2 class="sr" id="kd-t">Kontaktdaten</h2>
      <div class="cgrid">
        <div class="ccard ccard--navy" data-reveal><span class="lbl lbl--light">Pikett 24/7</span><strong>${S.company.pikett}</strong><p>Störungsdienst rund um die Uhr, auch nachts und am Wochenende.</p>${btn('tel:' + S.company.pikettHref, 'Jetzt anrufen', 'btn--white', svg.phone())}</div>
        ${withAddr.map(l => `<div class="ccard" data-reveal><span class="lbl">${l.role}</span><h3>${l.name}</h3><p>W. Rokitzky AG<br>${l.street}<br>${l.city}</p>${l.phone ? `<a href="tel:${l.href}">${l.phone}</a>` : ''}</div>`).join('')}
        <div class="ccard" data-reveal><span class="lbl">Allgemein</span><h3>Mail</h3><p>Für Anfragen, Offerten und Bewerbungen.</p><a href="mailto:${S.company.mail}">${S.company.mail}</a></div>
        <div class="ccard" data-reveal><span class="lbl">Service</span><h3>Service</h3><p>Für Wartung, Service und Wartungsverträge.</p><a href="mailto:${S.company.serviceMail}">${S.company.serviceMail}</a></div>
        ${noAddr.length ? `<div class="ccard" data-reveal><span class="lbl">${noAddr.length > 1 ? 'Standorte' : 'Standort'}</span><h3>${noAddr.map(l => l.name).join(' und ')}</h3><p>Kontakt über den Hauptsitz in ${S.locations[0].name}.</p><a href="tel:${S.company.phoneHref}">${S.company.phone}</a></div>` : ''}
      </div>
    </section>
    <section class="sec sec--paper" aria-labelledby="fo-t"><div class="wrap intro">
      <div>${ruleBox('Anfrage')}<h2 class="h2" id="fo-t">Worum geht es?</h2><p class="lead" data-reveal style="margin-top:1.4rem">Beschreiben Sie kurz Ihr Anliegen. Wir melden uns persönlich bei Ihnen.</p></div>
      <form class="form" id="anfrage" data-form="anfrage" data-reveal novalidate>
        ${fld('anfrage', 'name', 'Name', { req: true, auto: 'name' })}
        ${fld('anfrage', 'tel', 'Telefon', { type: 'tel', auto: 'tel' })}
        ${fld('anfrage', 'mail', 'Mail', { req: true, type: 'email', auto: 'email', full: true })}
        ${fld('anfrage', 'thema', 'Thema', { full: true, opts: [['', 'Bitte wählen'], ...S.areas.map(a => a.title), 'Pikett und Störung', 'Offene Stellen und Lehre'] })}
        ${fld('anfrage', 'msg', 'Nachricht', { full: true, area: true })}
        ${formFoot('anfrage', 'Anfrage senden')}
      </form>
    </div></section>
    ${mapSection()}`;
  }


  function legalPage(title, crumb, body) {
    return `
    ${hero({ dim: true, img: 'helm-logo', m: 'helm-logo-t', pos: '50% 50%', mpos: '78% 50%', alt: '', crumb: [['Home', u()], [crumb]], kicker: 'W. Rokitzky AG', title: [title] })}
    <section class="sec wrap legal" aria-label="${title}">${body}</section>`;
  }
  /* B16: UID und MWST im amtlichen Format (Ausnahme vom Bindestrichverbot). TODO K05: MWST-Nummer bei Rokitzky bestätigen,
     laut Registerdaten der Zweigniederlassung ist die Firma Mitglied einer MWST-Gruppe. */
  function pageImprint() {
    const [w] = S.locations;
    return legalPage('Impressum', 'Impressum', `
      <div class="legal__grid">
        <div><h2>Betreiberin</h2><p>W. Rokitzky AG<br>${w.street}<br>${w.city}<br>Schweiz</p><p>Telefon <a class="link" href="tel:${w.href}">${w.phone}</a><br><a class="link" href="mailto:${S.company.mail}">${S.company.mail}</a></p></div>
        <div><h2>Registrierung</h2><p>Unternehmensidentifikationsnummer (UID)<br>CHE-102.966.397</p><p>Mehrwertsteuernummer<br>CHE-102.966.397 MWST</p></div>
        <div><h2>Pikettdienst</h2><p>Rund um die Uhr erreichbar<br><a class="link" href="tel:${S.company.pikettHref}">${S.company.pikett}</a></p></div>
        <div><h2>Richtlinien</h2><ul>${S.legal.map(([t, u]) => `<li><a class="link" href="${u}" target="_blank" rel="noopener">${t} (PDF)</a></li>`).join('')}<li><a class="link" href="${u('datenschutz')}">Datenschutz</a></li></ul></div>
      </div>`);
  }
  /* Datenschutzerklärung nach DSG (B03). TODO K08: Freigabe durch Rokitzky und Kontakt für Datenschutzanfragen bestätigen.
     TODO K11: Falls für Meta Ads ein Tracking dazukommt, Abschnitt «Cookies und Tracking» und Cookie-Hinweis ergänzen. */
  function pagePrivacy() {
    const [w] = S.locations;
    const mail = `<a class="link" href="mailto:${S.company.mail}">${S.company.mail}</a>`;
    return legalPage('Datenschutz', 'Datenschutz', `
      <div class="legal__txt">
        <p class="legal__stand">Stand: November 2026</p>
        <h2>Verantwortliche Stelle</h2>
        <p>Verantwortlich für die Bearbeitung Ihrer Personendaten auf dieser Website ist die W. Rokitzky AG, ${w.street}, ${w.city}, Schweiz. Fragen zum Datenschutz beantworten wir unter ${mail} oder <a class="link" href="tel:${S.company.phoneHref}">${S.company.phone}</a>.</p>
        <h2>Grundsatz</h2>
        <p>Wir bearbeiten Personendaten nach dem Schweizer Datenschutzgesetz (DSG) und nur so weit, wie es für den jeweiligen Zweck nötig ist. Unsere Website setzt keine Cookies und verwendet weder Analysewerkzeuge noch Werbedienste. Schrift und Programmbibliotheken liefern wir von unserem eigenen Server aus.</p>
        <h2>Besuch der Website</h2>
        <p>Unsere Website liegt bei Vercel Inc. in den USA. Damit eine Seite angezeigt werden kann, verarbeitet Vercel beim Aufruf technische Angaben: die Internetadresse Ihres Geräts, Datum und Uhrzeit, die aufgerufene Seite sowie Angaben zu Browser und Betriebssystem. Diese Angaben dienen nur dem sicheren und stabilen Betrieb der Website.</p>
        <h2>Kontaktformular, Kurzbewerbung und Anfragen</h2>
        <p>Wenn Sie uns über ein Formular, per Mail oder per Telefon kontaktieren, bearbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten: Name, Kontaktangaben und Ihre Nachricht, bei einer Bewerbung zusätzlich Beruf, Erfahrung und allenfalls Ihren Lebenslauf. Die Formulare übermitteln wir über den Mailversanddienst Resend (Plus Five Five, Inc., USA) an unsere Mailadressen. Resend bearbeitet die Daten in unserem Auftrag und bewahrt die Mails laut eigenen Angaben 30 Tage auf.</p>
        <h2>Empfänger</h2>
        <p>Ihre Daten erhalten nur die Mitarbeitenden der W. Rokitzky AG, die Ihre Anfrage bearbeiten, sowie die oben genannten Dienstleister Vercel (Betrieb der Website) und Resend (Versand der Formulare). Wir verkaufen keine Daten und geben sie nicht für Werbung weiter.</p>
        <h2>Bekanntgabe ins Ausland</h2>
        <p>Vercel und Resend haben ihren Sitz in den USA. Vercel ist nach dem Data Privacy Framework zwischen der Schweiz und den USA zertifiziert; für zertifizierte Unternehmen gilt in den USA ein angemessener Datenschutz. Für Resend stützen wir uns auf die Standardvertragsklauseln im Vertrag mit Resend.</p>
        <h2>Aufbewahrung</h2>
        <p>Anfragen bewahren wir so lange auf, wie es für die Bearbeitung und für gesetzliche Aufbewahrungspflichten nötig ist. Bewerbungsunterlagen löschen wir nach Abschluss des Verfahrens, ausser Sie sind einverstanden, dass wir sie für spätere Stellen aufbewahren.</p>
        <h2>Ihre Rechte</h2>
        <p>Sie können Auskunft über Ihre Personendaten verlangen und diese berichtigen oder löschen lassen. Einer Bearbeitung können Sie widersprechen, soweit keine gesetzliche Pflicht entgegensteht. Schreiben Sie dazu an ${mail}. Zudem können Sie sich bei der Aufsichtsbehörde des Bundes für den Datenschutz (EDÖB) beschweren.</p>
        <h2>Referenzliste</h2>
        <p>Auf der Seite Referenzen können Sie die Liste unserer Referenzobjekte laden. Sie stammt vom Dienst referenz-verwaltung.ch. Erst wenn Sie die Liste laden, übermittelt Ihr Browser Ihre Internetadresse an diesen Anbieter.</p>
        <h2>Links zu sozialen Netzwerken</h2>
        <p>Die Links zu Instagram, LinkedIn und Facebook sind einfache Links. Erst wenn Sie einen davon anklicken, gelangen Sie auf die Seite des jeweiligen Anbieters; dort gilt dessen Datenschutzerklärung.</p>
        <h2>Änderungen</h2>
        <p>Wir passen diese Erklärung an, wenn sich unsere Website oder die eingesetzten Dienste ändern. Es gilt die hier veröffentlichte Fassung.</p>
      </div>`);
  }
  /* ---------- Formulare (B02, B06): Versand über /api/anfrage ---------- */
  const fld = (form, name, label, o = {}) => {
    const id = `${form}-${name}`;
    const attrs = `id="${id}" name="${name}"${o.req ? ' required aria-required="true"' : ''} aria-describedby="${id}-err"${o.auto ? ` autocomplete="${o.auto}"` : ''}${o.type ? ` type="${o.type}"` : ''}${o.extra || ''}`;
    const ctl = o.opts ? `<select ${attrs}>${o.opts.map(v => Array.isArray(v) ? `<option value="${v[0]}">${v[1]}</option>` : `<option>${v}</option>`).join('')}</select>`
      : o.area ? `<textarea ${attrs}></textarea>` : `<input ${attrs}>`;
    return `<div class="fld${o.full ? ' full' : ''}"><label for="${id}">${label}${o.req ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>${ctl}${o.hint ? `<small class="hint">${o.hint}</small>` : ''}<p class="err" id="${id}-err" hidden></p></div>`;
  };
  const formFoot = (form, label, du = false) => `
        <div class="full btns"><button class="btn btn--solid" type="submit">${label} ${svg.arrow()}</button></div>
        <p class="form__note full"><span aria-hidden="true">* Pflichtfeld. </span>${du ? 'Wir verwenden deine Angaben nur, um deine Anfrage zu beantworten.' : 'Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten.'} Mehr dazu in der <a class="link" href="${u('datenschutz')}">Datenschutzerklärung</a>.</p>
        <p class="form__status full" role="status" aria-live="polite"></p>
        <div class="hp" aria-hidden="true"><label for="${form}-website">Website</label><input id="${form}-website" name="website" tabindex="-1" autocomplete="off"></div>`;

  function pageNotFound() {
    return `
    ${hero({ dim: true, img: 'helm-logo', m: 'helm-logo-t', pos: '50% 50%', mpos: '78% 50%', alt: '', kicker: 'Seite nicht gefunden', title: ['Diese Seite', 'gibt es nicht.'], sub: 'Die Adresse ist falsch oder die Seite wurde verschoben.', btns: btn(u(), 'Zur Startseite', 'btn--white') + btn(u('dienstleistungen'), 'Leistungen', 'btn--ghost') + btn(u('kontakt'), 'Kontakt', 'btn--ghost') })}
    <section class="sec wrap" aria-labelledby="nf-t">
      <div class="sec__head"><div>${ruleBox('Leistungen')}<h2 class="h2" id="nf-t">Wohin möchten Sie?</h2></div></div>
      <ul class="more__l" data-reveal>${S.areas.map(a => `<li><a href="${u(a.slug)}"><span>${a.title}</span>${svg.arrow()}</a></li>`).join('')}<li><a href="${u('kontakt')}"><span>Kontakt</span>${svg.arrow()}</a></li></ul>
    </section>`;
  }

  /* ---------- routing ---------- */
  // t = Thema im Seitentitel (Muster «{Thema} im Kanton Zürich | Rokitzky», höchstens 60 Zeichen), d = Beschreibung (120 bis 155 Zeichen)
  const META = {
    start: { t: 'Heizung, Lüftung, Klima, Sanitär', d: 'Heizung, Kälte, Lüftung, Klima, Sanitär, Service und erneuerbare Energien seit 1970. Pikett 24/7. Standorte in Wallisellen, Winterthur, Hinwil und Zürich.', label: 'Gebäudetechnik seit 1970', nav: 'start', fn: pageHome },
    dienstleistungen: { t: 'Leistungen Gebäudetechnik', d: 'Zu heiss? Zu kalt? Rokitzky! Heizung und Kälte, Lüftung und Klima, Sanitär, erneuerbare Energien sowie Service und Unterhalt.', label: 'Leistungen', nav: 'dienstleistungen', fn: pageServices },
    unternehmen: { t: 'Handwerksbetrieb seit 1970', d: 'Inhabergeführter Handwerksbetrieb mit Tradition: seit 1970, über 80 Mitarbeitende und Standorte in Wallisellen, Winterthur, Hinwil und Zürich.', label: 'Unternehmen', nav: 'unternehmen', fn: pageCompany },
    mitarbeitende: { t: 'Über 80 Mitarbeitende', d: 'Über 80 Mitarbeiterinnen und Mitarbeiter in Wallisellen, Winterthur, Hinwil und Zürich. Inhaber, Team, offene Stellen und Lehre.', label: 'Mitarbeitende', nav: 'mitarbeitende', fn: pageTeam },
    karriere: { t: 'Karriere und Lehre', d: 'Bewerben Sie sich bei Rokitzky mit einer Kurzbewerbung, Unterlagen können Sie später nachreichen. Lehrstellen und Schnuppertage in fünf Berufen.', label: 'Karriere', nav: 'karriere', fn: pageCareer },
    impressum: { t: 'Impressum | Rokitzky', d: 'Impressum der W. Rokitzky AG, Kriesbachstrasse 3b, 8304 Wallisellen: Betreiberin der Website, Registrierung mit UID und MWST, Pikettdienst und Richtlinien.', label: 'Impressum', nav: '', fn: pageImprint },
    datenschutz: { t: 'Datenschutz | Rokitzky', d: 'Datenschutzerklärung der W. Rokitzky AG: welche Daten wir beim Besuch der Website und über die Formulare bearbeiten, wozu und welche Rechte Sie haben.', label: 'Datenschutz', nav: '', fn: pagePrivacy },
    referenzen: { t: 'Referenzen Gebäudetechnik', d: 'Referenzobjekte der W. Rokitzky AG: kleine, grosse und sehr grosse Projekte in Heizung, Lüftung, Klima, Kälte und Sanitär.', label: 'Unternehmen', nav: 'unternehmen', fn: pageReferences },
    kontakt: { t: 'Kontakt und Pikett 24/7', d: 'So erreichen Sie uns: 044 312 34 41, info@rokitzky.ch und Pikett 24/7 unter 076 434 17 17. Standorte in Wallisellen, Winterthur, Hinwil und Zürich.', label: 'Kontakt', nav: 'kontakt', fn: pageContact }
  };
  META.notfound = { t: 'Seite nicht gefunden | Rokitzky', d: 'Diese Adresse gibt es nicht oder nicht mehr. Über die Startseite finden Sie unsere Leistungen für Heizung, Kälte, Lüftung, Klima und Sanitär.', label: 'Gebäudetechnik seit 1970', nav: '', fn: pageNotFound, noindex: true };
  const ttl = (x) => x.includes('|') ? x : `${x} im Kanton Zürich | Rokitzky`;
  const fit = (s, n) => { if (s.length <= n) return s; const c = s.slice(0, n - 1); return c.slice(0, c.lastIndexOf(' ')).replace(/[,:;]$/, '') + '…'; };
  const CRUMB = { dienstleistungen: 'Leistungen', unternehmen: 'Unternehmen', referenzen: 'Referenzen', mitarbeitende: 'Mitarbeitende', karriere: 'Karriere', kontakt: 'Kontakt', impressum: 'Impressum', datenschutz: 'Datenschutz' };

  function resolve(k) {
    if (!k) return null;
    if (META[k]) return { key: k, ...META[k], t: ttl(META[k].t), html: META[k].fn() };
    const a = areaBy(k);
    if (a) return { key: k, t: ttl(a.seo || a.title), d: a.desc || fit(a.lead, 155), label: 'Leistungen', nav: 'dienstleistungen', html: pageArea(a), area: a };
    if (k.startsWith('stelle-')) { const j = jobBy(k.slice(7)); if (j) return { key: k, t: [`${j.title} in ${j.ort} | Rokitzky`, `${j.title} | Rokitzky`].find(x => x.length <= 60) || fit(j.title, 49) + ' | Rokitzky', d: j.desc || fit(`${j.title} in ${j.ort}, ${j.pensum}. Bewerben Sie sich mit einer Kurzbewerbung, Unterlagen können Sie später nachreichen.`, 155), label: 'Karriere', nav: 'karriere', html: pageJob(j), job: j }; return null; }
    const f = focusBy(k);
    if (f) return { key: k, t: ttl(f.seo || f.title), d: f.desc || fit(f.lead, 155), label: 'Leistungen', nav: 'dienstleistungen', html: pageFocus(k, f), focus: f };
    return null;
  }
  const isKey = (k) => !!k && k !== 'notfound' && (!!META[k] || !!areaBy(k) || !!focusBy(k) || (k.startsWith('stelle-') && !!jobBy(k.slice(7))));
  function keyOf(pathname) {
    let p = pathname || '/';
    if (BASE !== '/' && p.startsWith(BASE)) p = '/' + p.slice(BASE.length);
    const seg = p.replace(/index\.html$/, '').split('/').filter(Boolean);
    if (!seg.length) return 'start';
    if (seg[0] === 'karriere' && seg.length === 2) return jobBy(seg[1]) ? 'stelle-' + seg[1] : null;
    if (seg[0] === 'leistungen') return seg.length === 1 ? 'dienstleistungen' : seg.length === 2 && (areaBy(seg[1]) || focusBy(seg[1])) ? seg[1] : null;
    return seg.length === 1 && CRUMB[seg[0]] && seg[0] !== 'dienstleistungen' ? seg[0] : null;
  }
  const routes = () => ['start', 'dienstleistungen', ...S.areas.map(a => a.slug), ...Object.keys(S.focus), 'unternehmen', 'referenzen', 'mitarbeitende', 'karriere', ...(S.jobs || []).map(j => 'stelle-' + j.slug), 'kontakt', 'impressum', 'datenschutz'];

  function trail(r) {
    const t = [['Home', 'start']];
    if (r.key === 'start' || r.key === 'notfound') return t;
    if (r.area || r.focus || r.key === 'dienstleistungen') t.push(['Leistungen', 'dienstleistungen']);
    if (r.area) t.push([r.area.title, r.key]);
    else if (r.focus) { const p = parentOf(r.key); t.push([p.title, p.slug], [r.focus.title, r.key]); }
    else if (r.key === 'karriere') t.push(['Mitarbeitende', 'mitarbeitende'], ['Karriere', 'karriere']);
    else if (r.key === 'referenzen') t.push(['Unternehmen', 'unternehmen'], ['Referenzen', 'referenzen']);
    else if (r.job) t.push(['Mitarbeitende', 'mitarbeitende'], ['Karriere', 'karriere'], [r.job.title, r.key]);
    else if (r.key !== 'dienstleistungen') t.push([CRUMB[r.key], r.key]);
    return t;
  }
  const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  function ldFor(r) {
    const org = { '@id': 'https://www.rokitzky.ch/#organisation' };
    const g = [{ '@type': 'WebPage', '@id': abs(r.key) + '#webpage', url: abs(r.key), name: plain(r.t), description: plain(r.d), inLanguage: 'de-CH', publisher: org }];
    const tr = trail(r);
    if (tr.length > 1) g.push({ '@type': 'BreadcrumbList', itemListElement: tr.map(([n, k], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(k) })) });
    const sv = r.focus || r.area;
    if (sv) g.push({ '@type': 'Service', name: sv.title, serviceType: sv.title, description: plain(sv.lead), provider: org, areaServed: ['Wallisellen', 'Winterthur', 'Hinwil', 'Zürich'], url: abs(r.key) });
    if (r.job) {
      const j = r.job, loc = S.locations.find(l => l.id === j.loc) || {};
      const [zip, ...town] = (loc.city || '').split(' ');
      g.push({ '@type': 'JobPosting', title: j.title, description: [j.lead, ...(j.aufgaben || []), ...(j.profil || []), ...(j.angebot || [])].filter(Boolean).map(x => `<p>${x}</p>`).join(''), datePosted: j.datePosted, validThrough: j.validThrough, employmentType: j.anstellung || 'FULL_TIME', directApply: true,
        hiringOrganization: { '@type': 'Organization', name: 'W. Rokitzky AG', sameAs: 'https://www.rokitzky.ch' },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: loc.street, postalCode: zip || undefined, addressLocality: town.join(' ') || j.ort, addressCountry: 'CH' } } });
    }
    if (pageFaq.length) g.push({ '@type': 'FAQPage', mainEntity: pageFaq.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) });
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': g });
  }
  // Organisation im JSON-LD: Hauptsitz und weitere Standorte mit Adresse kommen aus S.locations (B12)
  function ldOrg() {
    const el = $('#ld-org'); if (!el) return;
    let o; try { o = JSON.parse(el.textContent); } catch (e) { return; }
    const tel = (h) => h.replace(/^\+41(\d{2})(\d{3})(\d{2})(\d{2})$/, '+41 $1 $2 $3 $4');
    const adr = (l) => { const [zip, ...c] = l.city.split(' '); return { '@type': 'PostalAddress', streetAddress: l.street, postalCode: zip, addressLocality: c.join(' '), addressCountry: 'CH' }; };
    const [hq, ...rest] = S.locations;
    o.telephone = tel(hq.href); o.address = adr(hq);
    o.department = rest.filter(l => l.street).map(l => ({ '@type': 'HVACBusiness', name: `W. Rokitzky AG ${l.name}`, ...(l.href ? { telephone: tel(l.href) } : {}), address: adr(l) }));
    o.areaServed = S.locations.map(l => l.name);
    el.textContent = JSON.stringify(o);
  }
  function setMeta(attr, key, val) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (val == null) { if (el) el.remove(); return; }
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', val);
  }
  function setHead(r) {
    const url = r.noindex ? null : abs(r.key);
    document.title = plain(r.t);
    setMeta('name', 'description', plain(r.d));
    setMeta('name', 'robots', r.noindex ? 'noindex' : null);
    setMeta('property', 'og:title', plain(r.t));
    setMeta('property', 'og:description', plain(r.d));
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', SITE_URL + '/img/og.jpg');
    let c = document.head.querySelector('link[rel="canonical"]');
    if (!url) { if (c) c.remove(); return; }
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); }
    c.href = url;
  }

  const main = $('#main'), hd = $('#hd'), wipe = $('#wipe');
  let lenis = null, ctx = null, busy = false, current = '', skipHash = false;

  function render(key, opts = {}) {
    pageFaq = [];
    const r = resolve(key) || resolve('notfound');
    current = r.key;
    if (cycle) { cycle.kill(); cycle = null; }
    timers.forEach(clearTimeout); timers = [];
    if (ctx) { ctx.revert(); ctx = null; }
    if (window.ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    main.innerHTML = r.html;
    document.body.dataset.page = r.key;
    setHead(r);
    $('#ld-page').textContent = ldFor(r);
    $('#hdLabel').textContent = r.label;
    $$('.hd__nav a').forEach(a => a.classList.toggle('is-active', a.dataset.nav === r.nav));
    hd.classList.remove('is-solid', 'is-hidden');
    closeMenu(); closeMega();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0);
    bindPage();
    if (PRE) $$('[data-morph]', main).forEach(m => m.style.setProperty('--m', 400));
    else animatePage(opts);
    if (!opts.initial) main.focus({ preventScroll: true });
    document.documentElement.classList.remove('rk-wait');
    window.__RK_READY__ = r.key;
  }

  /* ---------- page transition (hexagon wipe) ---------- */
  function hexPoly(cx, cy, r) {
    const p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i; p.push(`${(cx + r * Math.cos(a)).toFixed(1)}px ${(cy + r * Math.sin(a)).toFixed(1)}px`); }
    return `polygon(${p.join(',')})`;
  }
  function navigate(k) {
    if (HASH) { skipHash = true; location.hash = k; }
    else history.pushState(null, '', u(k));
  }
  function go(k, x = innerWidth / 2, y = innerHeight / 2, anchor = '') {
    if (busy) return;
    if (k === current) { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const after = () => { if (anchor) requestAnimationFrame(() => scrollToId(anchor, true)); };
    if (!HAS_GSAP || REDUCE) { navigate(k); render(k); after(); return; }
    busy = true;
    const o = { r: 0 }, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) * 1.2;
    const icon = $('.wipe__icon', wipe);
    gsap.set(wipe, { yPercent: 0 });
    gsap.timeline()
      .to(o, { r: R, duration: .62, ease: 'power3.inOut', onUpdate: () => { wipe.style.clipPath = hexPoly(x, y, o.r); } })
      .to(icon, { opacity: 1, scale: 1, duration: .25, ease: 'power2.out' }, .3)
      .add(() => { navigate(k); render(k, { fromWipe: true }); after(); })
      .to(icon, { opacity: 0, duration: .2 }, '+=.04')
      .to(wipe, { yPercent: -100, duration: .66, ease: 'power3.inOut' }, '<')
      .add(() => { wipe.style.clipPath = hexPoly(innerWidth / 2, innerHeight / 2, 0); gsap.set(wipe, { yPercent: 0 }); busy = false; });
  }
  addEventListener('popstate', () => { if (!HASH && !busy) render(keyOf(location.pathname) || 'notfound'); });
  addEventListener('hashchange', () => {
    if (!HASH) return;
    if (skipHash) { skipHash = false; return; }
    const k = location.hash.slice(1);
    if (!busy && isKey(k)) render(k);
  });
  function scrollToId(id, instant = false) {
    const el = id && document.getElementById(id);
    if (!el) return false;
    if (lenis) lenis.scrollTo(el, { offset: -90, immediate: instant, force: true });
    else el.scrollIntoView({ behavior: instant || REDUCE ? 'auto' : 'smooth', block: 'start' });
    return true;
  }
  document.addEventListener('click', (e) => {
    const lb = e.target.closest('[data-lehre]');
    if (lb) {
      const f = $('#lehranfrage', main); if (!f) return;
      f.elements.lehrberuf.value = lb.dataset.lehre; f.elements.anliegen.value = lb.dataset.anliegen;
      scrollToId('lehre-anfrage'); setTimeout(() => f.elements.name.focus({ preventScroll: true }), 650);
      return;
    }
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const h = a.getAttribute('href') || '';
    let k = null, anchor = '';
    if (h.startsWith('#')) {
      if (h !== '#main' && !(HASH && isKey(h.slice(1))) && scrollToId(h.slice(1))) { e.preventDefault(); return; }
      if (HASH) k = h.slice(1);
    } else if (!HASH) {
      const url = new URL(h, location.href);
      if (url.origin === location.origin && /^https?:$/.test(url.protocol)) { k = keyOf(url.pathname); anchor = url.hash.slice(1); }
    }
    if (!isKey(k)) return;
    e.preventDefault();
    if (k === current && anchor && scrollToId(anchor)) return;
    go(k, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, anchor);
  });

  /* ---------- header, mega menu, mobile menu ---------- */
  function buildChrome() {
    $('.hd__logo').setAttribute('href', u());
    $$('.hd__nav a[data-nav]').forEach(x => x.setAttribute('href', u(x.dataset.nav)));
    $$('[data-svg]').forEach(el => {
      const k = el.dataset.svg;
      el.innerHTML = k === 'wordmark' ? svg.wordmark() : k === 'burger' ? svg.burger() : k === 'icon' ? svg.icon() : k === 'hexwhite' ? svg.hexFill() : k === 'ringlock' ? ringLock('hero__ring') : '';
    });
    $('#megaAreas').innerHTML = S.areas.map(a => `<a href="${u(a.slug)}"><b>${a.title}</b><span>${a.short}</span></a>`).join('') + `<a class="mega__all" href="${u('dienstleistungen')}">Alle Leistungen im Überblick ${svg.arrow()}</a>`;
    $('#menuNav').innerHTML = `<a href="${u('dienstleistungen')}">Leistungen</a><div class="menu__sub">${S.areas.map(a => `<a href="${u(a.slug)}">${a.title}</a>`).join('')}</div><a href="${u('unternehmen')}">Unternehmen</a><a href="${u('mitarbeitende')}">Mitarbeitende</a><a href="${u('karriere')}">Karriere</a><a href="${u('kontakt')}">Kontakt</a>`;
    $('#ft').innerHTML = footer();
    const trig = $('.has-mega'), mega = $('#mega'); let t;
    const open = () => { clearTimeout(t); mega.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); hd.classList.add('is-solid'); };
    const close = () => { t = setTimeout(() => { mega.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); syncHeader(); }, 140); };
    trig.addEventListener('mouseenter', open); trig.addEventListener('focus', open);
    mega.addEventListener('mouseenter', open); mega.addEventListener('mouseleave', close); trig.addEventListener('mouseleave', close);
    mega.addEventListener('focusout', (e) => { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== trig) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMega(); closeMenu(); } });
    $('#burger').addEventListener('click', () => document.body.classList.contains('menu-open') ? closeMenu() : openMenu());
  }
  function closeMega() { const m = $('#mega'); if (m) { m.classList.remove('is-open'); $('.has-mega').setAttribute('aria-expanded', 'false'); } }
  function openMenu() { $('#menu').inert = false; document.body.classList.add('menu-open'); $('#burger').setAttribute('aria-expanded', 'true'); $('#burger').setAttribute('aria-label', 'Menü schliessen'); lenis && lenis.stop(); }
  function closeMenu() { $('#menu').inert = true; document.body.classList.remove('menu-open'); $('#burger').setAttribute('aria-expanded', 'false'); $('#burger').setAttribute('aria-label', 'Menü öffnen'); lenis && lenis.start(); }
  function footer() {
    return `<div class="wrap">
      <div class="ft__top">
        <div class="ft__brand"><a class="ft__logo" href="${u()}" aria-label="Zur Startseite">${svg.wordmark()}</a><p class="ft__claim">Persönlich &amp;<br>Verbindlich</p><p>Heizung, Kälte, Lüftung, Klima, Sanitär, Service und erneuerbare Energien seit 1970. Standorte in Wallisellen, Winterthur, Hinwil und Zürich.</p></div>
        <div><h2 class="ft__h">Leistungen</h2><ul>${S.areas.map(a => `<li><a href="${u(a.slug)}">${a.title}</a></li>`).join('')}<li><a href="${u('stoerungsdienst-pikett')}">Pikettdienst 24/7</a></li></ul></div>
        <div><h2 class="ft__h">Unternehmen</h2><ul><li><a href="${u('unternehmen')}">Unternehmen</a></li><li><a href="${u('referenzen')}">Referenzen</a></li><li><a href="${u('mitarbeitende')}">Mitarbeitende</a></li><li><a href="${u('karriere')}">Karriere und Lehre</a></li><li><a href="${u('kontakt')}">Kontakt</a></li>${S.social.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul></div>
        <div><h2 class="ft__h">Kontakt</h2>${S.locations.filter(l => l.street).map((l, i) => `<p${i ? ' style="margin-top:.8rem"' : ''}>${i ? '' : 'W. Rokitzky AG<br>'}${l.street}, ${l.city}${l.phone ? `<br><a href="tel:${l.href}">${l.phone}</a>` : ''}</p>`).join('')}<p style="margin-top:.8rem"><a href="mailto:${S.company.mail}">${S.company.mail}</a><br><a href="mailto:${S.company.serviceMail}">${S.company.serviceMail}</a></p><p style="margin-top:.8rem">Pikett 24/7: <a href="tel:${S.company.pikettHref}">${S.company.pikett}</a></p></div>
      </div>
      <div class="ft__big">
        <div class="ft__bl">
        <div class="ft__aw"><span class="ft__awl">Ausgezeichnet und zertifiziert</span><div class="ft__marks">${markImgs()}</div></div>
        <div class="ft__legal"><span>© W. Rokitzky AG</span><a href="${u('impressum')}">Impressum</a><a href="${u('datenschutz')}">Datenschutz</a>${S.legal.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`).join('')}</div>
        </div>
        ${ringLock('ft__ring hero__ring')}
      </div>
    </div>`;
  }
  let heroBottom = 0, lastY = 0, hideCimgOnScroll = null;
  function syncHeader(y = (lenis ? lenis.scroll : scrollY)) {
    const megaOpen = $('#mega').classList.contains('is-open');
    hd.classList.toggle('is-solid', megaOpen || y > Math.max(40, heroBottom - 90));
    const down = y > lastY + 2, up = y < lastY - 2;
    if (!megaOpen && !document.body.classList.contains('menu-open')) {
      if (down && y > 520) hd.classList.add('is-hidden');
      else if (up || y < 200) hd.classList.remove('is-hidden');
    }
    lastY = y;
  }

  /* ---------- Formularversand ---------- */
  const MAILRE = /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]+$/;
  const FORMS = {
    anfrage: {
      check: (v) => [!v.name && ['name', 'Bitte geben Sie Ihren Namen an.'], !MAILRE.test(v.mail) && ['mail', 'Bitte geben Sie eine gültige Mailadresse an.']],
      done: () => `<h3>Danke, Ihre Anfrage ist bei uns angekommen.</h3><p>Wir melden uns persönlich bei Ihnen. Bei einer Störung erreichen Sie unseren Pikettdienst rund um die Uhr unter <a class="link" href="tel:${S.company.pikettHref}">${S.company.pikett}</a>.</p>`
    },
    bewerbung: {
      check: (v) => [!v.name && ['name', 'Bitte geben Sie Ihren Namen an.'], !v.tel && ['tel', 'Bitte geben Sie Ihre Telefonnummer an, damit wir Sie zurückrufen können.'], !v.beruf && ['beruf', 'Bitte geben Sie Ihren Beruf an.'], v.mail && !MAILRE.test(v.mail) && ['mail', 'Bitte prüfen Sie die Mailadresse.']],
      done: () => `<h3>Danke, Ihre Kurzbewerbung ist bei uns angekommen.</h3><p>Wir melden uns bei Ihnen.</p>`
    },
    lehre: {
      du: true,
      check: (v) => [!v.name && ['name', 'Bitte gib deinen Namen an.'], !v.tel && !v.mail && ['tel', 'Bitte gib eine Telefonnummer oder eine Mailadresse an.'], v.mail && !MAILRE.test(v.mail) && ['mail', 'Bitte prüf deine Mailadresse.'], !v.lehrberuf && ['lehrberuf', 'Bitte wähl einen Lehrberuf.']],
      done: () => `<h3>Danke, deine Anfrage ist bei uns angekommen.</h3><p>Wir melden uns bei dir.</p>`
    }
  };
  const toB64 = (file) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1] || ''); r.onerror = no; r.readAsDataURL(file); });
  function bindForm(form) {
    const kind = form.dataset.form, cfg = FORMS[kind]; if (!cfg) return;
    const shown = Date.now(), du = !!cfg.du;
    const status = $('.form__status', form);
    const mark = (name, msg) => {
      const inp = form.elements[name], err = $(`#${form.id}-${name}-err`, form);
      if (inp) inp.setAttribute('aria-invalid', 'true');
      if (err) { err.textContent = msg; err.hidden = false; }
      return inp;
    };
    const failMsg = (code) => code === 'zu_schnell'
      ? (du ? 'Bitte warte einen Moment und sende die Anfrage noch einmal.' : 'Bitte warten Sie einen Moment und senden Sie die Anfrage noch einmal.')
      : code === 'datei' ? (du ? 'Bitte lade eine Datei im Format PDF, JPG oder PNG bis 3 MB hoch.' : 'Bitte laden Sie eine Datei im Format PDF, JPG oder PNG bis 3 MB hoch.')
      : (du ? 'Deine Anfrage konnte leider nicht gesendet werden. Ruf uns bitte an unter ' : 'Ihre Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an unter ')
        + `<a class="link" href="tel:${S.company.phoneHref}">${S.company.phone}</a> ${du ? 'oder schreib an' : 'oder schreiben Sie an'} <a class="link" href="mailto:${S.company.mail}">${S.company.mail}</a>.`;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = new FormData(form), v = {};
      for (const [k, x] of f.entries()) if (typeof x === 'string') v[k] = x.trim();
      $$('.err', form).forEach(x => { x.hidden = true; x.textContent = ''; });
      $$('[aria-invalid]', form).forEach(x => x.removeAttribute('aria-invalid'));
      status.className = 'form__status full'; status.textContent = '';
      const bad = cfg.check(v).filter(Boolean).map(([n, m]) => mark(n, m)).filter(Boolean);
      const file = form.elements.cv && form.elements.cv.files && form.elements.cv.files[0];
      if (file && (file.size > 3 * 1024 * 1024 || !/^(application\/pdf|image\/jpeg|image\/png)$/.test(file.type))) bad.push(mark('cv', failMsg('datei')));
      if (bad.length) { bad[0].focus(); return; }
      const btn = $('button[type="submit"]', form), label = btn.innerHTML;
      btn.disabled = true; btn.textContent = 'Wird gesendet';
      try {
        const data = { ...v, kind, page: location.pathname, t: Date.now() - shown };
        if (file) data.attachment = { name: file.name, type: file.type, data: await toB64(file) };
        const res = await fetch(BASE + 'api/anfrage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const j = await res.json().catch(() => ({}));
        if (!res.ok || !j.ok) {
          if (j.error === 'felder' && Array.isArray(j.fields)) { const m = j.fields.map(n => mark(n, du ? 'Bitte prüf dieses Feld.' : 'Bitte prüfen Sie dieses Feld.')).filter(Boolean); if (m[0]) m[0].focus(); }
          throw new Error(j.error || String(res.status));
        }
        form.innerHTML = `<div class="form__done full" tabindex="-1">${cfg.done(v)}</div>`;
        $('.form__done', form).focus();
      } catch (err) {
        status.className = 'form__status full is-err';
        status.innerHTML = failMsg(err && err.message);
        btn.disabled = false; btn.innerHTML = label;
      }
    });
  }

  /* ---------- per page bindings ---------- */
  function bindPage() {
    const h = $('[data-hero]', main); heroBottom = h ? h.offsetHeight : 0;
    const tfs = $$('[data-tf]', main);
    tfs.forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.tf;
      tfs.forEach(x => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      $$('[data-tg]', main).forEach(g => { g.hidden = v !== 'all' && g.dataset.tg !== v; });
      const vis = $$('[data-tg]:not([hidden])', main), shown = $$('[data-tg]:not([hidden]) .person', main);
      if (HAS_GSAP) {
        gsap.to(vis, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', overwrite: true });
        gsap.fromTo(shown, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .018, ease: 'power3.out', overwrite: true });
        ScrollTrigger.refresh();
      } else vis.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    }));
    $$('form[data-form]', main).forEach(bindForm);
    $$('[data-refload]', main).forEach(bt => bt.addEventListener('click', () => {
      const box = bt.closest('[data-refembed]');
      box.innerHTML = `<iframe class="refembed__frame" src="${box.dataset.refembed}" title="Referenzobjekte der W. Rokitzky AG" loading="eager"></iframe>`;
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }));
    $$('.loc', main).forEach(l => {
      const pin = $(`[data-pin="${l.dataset.loc}"]`, main);
      if (!pin) return;
      l.addEventListener('mouseenter', () => { pin.classList.add('is-on'); l.classList.add('is-on'); HAS_GSAP && gsap.to(pin, { scale: 1.35, duration: .5, ease: 'back.out(3)' }); });
      l.addEventListener('mouseleave', () => { pin.classList.remove('is-on'); l.classList.remove('is-on'); HAS_GSAP && gsap.to(pin, { scale: 1, duration: .5, ease: 'power3.out' }); });
    });
  }

  /* ---------- animations ---------- */
  let cycle = null, timers = [];
  function startRotators() {
    $$('[data-pwall]', main).forEach(w => $$('.pwall__col', w).forEach((col, k) => {
      const imgs = $$('.pwall__img', col); if (imgs.length < 2) return;
      let i = 0;
      const step = () => { imgs[i].classList.remove('is-on'); i = (i + 1) % imgs.length; imgs[i].classList.add('is-on'); timers.push(setTimeout(step, 4200)); };
      timers.push(setTimeout(step, 2400 + k * 1300));
    }));
    $$('[data-qrot]', main).forEach(q => {
      const items = $$('.qrot__item', q), dots = $$('.qrot__dots i', q); let i = 0;
      const step = () => { items[i].classList.remove('is-on'); dots[i].classList.remove('is-on'); i = (i + 1) % items.length; items[i].classList.add('is-on'); dots[i].classList.add('is-on'); timers.push(setTimeout(step, 5600)); };
      timers.push(setTimeout(step, 5600));
    });
  }
  function heroVideo(media, still) {
    const v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
    ['muted', 'playsinline', 'loop'].forEach(x => v.setAttribute(x, ''));
    v.setAttribute('aria-hidden', 'true'); v.disablePictureInPicture = true;
    const mob = still.tagName === 'PICTURE' && matchMedia('(max-width: 820px)').matches;
    v.poster = HERO_VIDEO.poster ? `${BASE}img/${HERO_VIDEO.poster}.webp` : mob ? $('source', still).srcset : (still.currentSrc || still.src || $('img', still).src);
    [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(([k, type]) => { if (HERO_VIDEO[k]) { const s = document.createElement('source'); s.src = BASE + HERO_VIDEO[k]; s.type = type; v.appendChild(s); } });
    v.className = 'hero__still hero__video ob'; v.style.opacity = 0; v.style.zIndex = 999; media.appendChild(v);
    v.addEventListener('playing', () => { if (cycle) { cycle.kill(); cycle = null; } gsap.to(v, { opacity: 1, duration: 1.2 }); }, { once: true });
    const pr = v.play(); if (pr && pr.catch) pr.catch(() => {});
  }
  function startCycle(slides) {
    let z = 2, i = 0;
    gsap.set(slides, { opacity: 0 }); gsap.set(slides[0], { opacity: 1, zIndex: z });
    const show = (first) => {
      const sl = slides[i % slides.length];
      if (!first) { gsap.set(sl, { zIndex: ++z, opacity: 0 }); gsap.to(sl, { opacity: 1, duration: 1.6, ease: 'power1.inOut' }); }
      gsap.fromTo(sl, { scale: 1.03, xPercent: 0 }, { scale: 1.15, xPercent: i % 2 ? 1.5 : -1.5, duration: 8.5, ease: 'none' });
      i++; cycle = gsap.delayedCall(6.4, show);
    };
    show(true);
  }
  function animatePage(opts) {
    if (!HAS_GSAP) { startRotators(); return; }
    startRotators();
    if (REDUCE) { const rv = $$('[data-reveal]', main); if (rv.length) gsap.set(rv, { clearProps: 'all' }); $$('[data-morph]', main).forEach(m => m.style.setProperty('--m', 400)); return; }
    ctx = gsap.context(() => {
      // hero intro
      const hero = $('[data-hero]', main);
      if (hero) {
        const media = $('[data-hero-media]', hero);
        const slides = $$('.hero__still', media);
        const tl = gsap.timeline({ delay: opts.fromWipe ? .25 : .15 });
        const swm = $$('.sw__mark', hero), ring = $$('.hero__ring', hero);
        tl.from(media, { scale: 1.16, duration: 2.4, ease: 'power3.out' }, 0)
          .from($$('.ln > span', hero), { yPercent: 130, duration: 1.15, stagger: .1, ease: 'power4.out' }, .2)
          .from($$('[data-hero="fade"]', hero), { y: 22, opacity: 0, duration: .9, stagger: .07, ease: 'power3.out' }, .45);
        if (swm.length) tl.from(swm, { clipPath: 'inset(0 100% 0 0)', duration: .9, ease: 'power3.inOut' }, 1.05);
        if (ring.length) tl.from(ring, { scale: .6, opacity: 0, rotate: -40, duration: 1.4, ease: 'power3.out' }, .5);
        gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to($('.hero__in', hero), { yPercent: -10, opacity: .3, ease: 'none', scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true } });
        // ruhige Bildfolge als Platzhalter, bis das Drohnenvideo eingebunden ist
        if (slides.length > 1) startCycle(slides);
        else if (slides[0]) gsap.fromTo(slides[0], { scale: 1.02 }, { scale: 1.1, duration: 16, ease: 'none', repeat: -1, yoyo: true });
        if (HERO_VIDEO && hero.classList.contains('hero--home') && slides[0] && !(navigator.connection && navigator.connection.saveData)) heroVideo(media, slides[0]);
      }
      // rules draw
      $$('.rule', main).forEach(r => gsap.from(r, { scaleX: 0, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: r, start: 'top 90%' } }));
      // generic reveal
      ScrollTrigger.batch($$('[data-reveal]', main), {
        start: 'top 88%', once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: .08, ease: 'power3.out', overwrite: true })
      });
      // image reveal and parallax
      $$('[data-img]', main).forEach(box => {
        const im = $('img', box);
        gsap.fromTo(im, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      $$('[data-parallax]', main).forEach(el => gsap.fromTo(el, { yPercent: -(+el.dataset.parallax) }, { yPercent: +el.dataset.parallax, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      $$('[data-parallax-y]', main).forEach(el => gsap.fromTo(el, { yPercent: 0 }, { yPercent: +el.dataset.parallaxY, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
      $$('.band', main).forEach(b => gsap.fromTo($('img', b), { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } }));
      // statement: words light up while scrolling
      $$('[data-words]', main).forEach(p => gsap.fromTo($$('.w', p), { opacity: .1, y: 30 }, { opacity: 1, y: 0, stagger: .2, ease: 'power2.out', scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 45%', scrub: .6 } }));
      // swoosh under headings outside hero
      $$('.sw__mark', main).forEach(m => { if (!m.closest('[data-hero]')) gsap.from(m, { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: m, start: 'top 85%' } }); });
      // Hexagon öffnet sich zum ganzen Bild
      $$('[data-morph]', main).forEach(m => {
        gsap.fromTo(m, { '--m': 58 }, { '--m': 330, ease: 'none', scrollTrigger: { trigger: m, start: 'top 78%', end: 'center 40%', scrub: .8 } });
        gsap.fromTo($('img', m), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      // counters
      $$('[data-count]', main).forEach(n => {
        const to = +n.dataset.count, from = +(n.dataset.from || 0), o = { v: from };
        gsap.to(o, { v: to, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: n, start: 'top 88%' }, onUpdate: () => { n.textContent = Math.round(o.v); } });
      });
      // timeline progress
      $$('[data-tl]', main).forEach(t => gsap.to($('.tl__fill', t), { scaleY: 1, ease: 'none', scrollTrigger: { trigger: t, start: 'top 65%', end: 'bottom 60%', scrub: .5 } }));
      // pikett image parallax
      $$('.pk__media img', main).forEach(i => gsap.fromTo(i, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: i.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      // map: draw the canton, then drop the pins
      $$('[data-map]', main).forEach(m => {
        const c = $('.canton', m), L = c.getTotalLength();
        gsap.set(c, { strokeDasharray: L, strokeDashoffset: L });
        const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 75%' } });
        tl.to(c, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' })
          .from($$('.lake', m), { opacity: 0, duration: 1 }, .6)
          .from($$('.pin', m), { scale: 0, opacity: 0, duration: .7, stagger: .1, ease: 'back.out(2.2)' }, .5);
      });
    }, main);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  /* ---------- boot ---------- */
  const hexSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${B.icon.viewBox}'><path d='${B.icon.hex}'/></svg>`;
  document.documentElement.style.setProperty('--hexmask', `url("data:image/svg+xml,${encodeURIComponent(hexSvg)}")`);
  buildChrome();
  if (HAS_GSAP) {
    gsap.registerPlugin(ScrollTrigger);
    if (!REDUCE && !PRE && window.Lenis) {
      lenis = new Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', (e) => { ScrollTrigger.update(); syncHeader(e.scroll); hideCimgOnScroll && hideCimgOnScroll(); });
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  if (!lenis) addEventListener('scroll', () => syncHeader(scrollY), { passive: true });
  addEventListener('resize', () => { const h = $('[data-hero]', main); heroBottom = h ? h.offsetHeight : 0; });
  function initialKey() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (HASH) return isKey(h) ? h : 'start';
    if (isKey(h)) { history.replaceState(null, '', u(h)); return h; }
    return keyOf(location.pathname) || 'notfound';
  }
  if (PRE) window.__RK__ = { siteUrl: SITE_URL, routes: () => routes().map(k => ({ key: k, path: u(k) })) };
  ldOrg();
  const start = () => { render(initialKey(), { initial: true }); const h = decodeURIComponent(location.hash.slice(1)); if (h && !isKey(h)) setTimeout(() => scrollToId(h, true), 80); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
})();
