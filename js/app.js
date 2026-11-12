/* W. Rokitzky AG, Website Prototyp. Hash Router, Seitenvorlagen und Animationen (GSAP, ScrollTrigger, SplitText, Lenis). */
(() => {
  const S = window.SITE, B = window.BRAND;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const HAS_GSAP = !!window.gsap;
  document.documentElement.classList.toggle('js', HAS_GSAP && !REDUCE);

  /* Drohnenvideo: sobald die Datei vorliegt, hier eintragen (z. B. 'media/hero-drohne.mp4'). */
  const HERO_VIDEO = null;

  /* ---------- SVG ---------- */
  const svg = {
    wordmark: () => `<svg viewBox="${B.wordmark.viewBox}" role="img" aria-label="rokitzky"><path fill="currentColor" fill-rule="evenodd" d="${B.wordmark.d}"/></svg>`,
    icon: () => `<svg viewBox="${B.icon.viewBox}" aria-hidden="true"><path fill="#4d6182" d="${B.icon.hex}"/><path fill="#fff" d="${B.icon.r}"/></svg>`,
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
  const btn = (href, label, cls = 'btn--solid', icon = svg.arrow(), extra = '') => `<a class="btn ${cls}" href="${href}" ${extra}>${label}${icon ? ' ' + icon : ''}</a>`;
  const tel = (cls = 'btn--ghost') => `<a class="btn ${cls} btn--tel" href="tel:${S.company.pikettHref}"><span class="pulse" aria-hidden="true"></span>Pikett 24/7: ${S.company.pikett}</a>`;
  const img = (name, alt = '', pos = '50% 50%', eager = false) => `<img src="img/${name}.webp" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="object-position:${pos}">`;
  const ruleBox = (label, hex = false, light = false) => `<div class="rulebox ${hex ? 'rulebox--hex' : ''}" data-reveal><span class="rule"></span>${hex ? svg.mark() : ''}<span class="lbl ${light ? 'lbl--light' : ''}">${label}</span></div>`;
  const focusBy = (slug) => S.focus[slug];
  const groupOf = (gid) => S.groups.find(g => g.id === gid);
  const areaBy = (slug) => S.areas.find(a => a.slug === slug);
  const locNames = 'Wallisellen, Winterthur, Hinwil und Zürich';

  /* ---------- page parts ---------- */
  function hero(o) {
    const crumb = o.crumb ? `<nav class="hero__crumb" aria-label="Brotkrumen" data-hero="fade">${o.crumb.map((c, i) => (i ? '<span aria-hidden="true">/</span>' : '') + (c[1] ? `<a href="${c[1]}">${c[0]}</a>` : `<span aria-current="page">${c[0]}</span>`)).join('')}</nav>` : '';
    const slides = (o.slides || [{ src: o.img, m: o.m, pos: o.pos, alt: o.alt || '' }]).map((s, i) => s.m
      ? `<picture class="hero__still" data-slide="${i}"><source media="(max-width: 820px)" srcset="img/${s.m}.webp"><img src="img/${s.src}.webp" alt="${s.alt || ''}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} style="object-position:${s.pos || '50% 50%'}"></picture>`
      : `<img class="hero__still" data-slide="${i}" src="img/${s.src}.webp" alt="${s.alt || ''}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} style="object-position:${s.pos || '50% 50%'}">`).join('');
    const tArr = Array.isArray(o.title) ? o.title : [o.title];
    const longest = Math.max(...tArr.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).map(w => w.length));
    const lines = tArr.map(l => `<span class="split-line ln"><span style="display:block">${l}</span></span>`).join('');
    return `<section class="hero ${o.home ? '' : 'hero--sub'} ${o.dim ? 'hero--dim' : ''}" data-hero>
      <div class="hero__media" data-hero-media>${slides}</div>
      <div class="hero__shade"></div>
      <div class="wrap hero__in">
        <div>
          ${crumb}
          ${o.kicker ? `<p class="hero__kicker" data-hero="fade">${svg.mark()}<span>${o.kicker}</span></p>` : ''}
          <h1 class="${o.home ? 'display' : 'h1'}${longest > 13 ? ' is-long' : ''}" id="page-title">${lines}</h1>
          ${o.sub ? `<p class="hero__sub" data-hero="fade">${o.sub}</p>` : ''}
          ${o.btns ? `<div class="btns" data-hero="fade">${o.btns}</div>` : ''}
        </div>
        ${o.ring === false ? '' : ringLock('hero__ring')}
      </div>
      <div class="hero__foot" data-hero="fade"><div class="wrap">
        <div class="hero__locs">${S.locations.map(l => `<span>${l.name}</span>`).join('')}</div>
        <span class="hero__scroll"><i></i>${o.home ? 'Seit 1970' : 'Persönlich &amp; Verbindlich'}</span>
      </div></div>
    </section>`;
  }

  const ctaBlock = (title = 'Persönlich &amp; Verbindlich', text = 'Sprechen wir über Ihr Projekt. Wir hören zu, schauen genau hin und verbauen, was wir besprochen haben.', pic = ['action-team', '45% 45%']) => `
    <section class="cta" aria-label="Kontakt">
      <div class="cta__media" data-parallax="10">${img(pic[0], '', pic[1])}</div>
      <div class="slate" data-reveal>
        <span class="lbl lbl--light">So erreichen Sie uns</span>
        <h2 class="h2">${sw(title)}</h2>
        <p>${text}</p>
        <div class="btns">${btn('#kontakt', 'Kontakt aufnehmen', 'btn--white')}${btn('mailto:' + S.company.mail, S.company.mail, 'btn--ghost', svg.mail())}${tel()}</div>
      </div>
    </section>`;

  const marquee = () => {
    const words = ['Heizung', 'Lüftung', 'Klima', 'Kälte', 'Sanitär', 'Service', 'Erneuerbare Energien'];
    const row = words.map(w => `<span>${w}<i>${svg.hexFill()}</i></span>`).join('');
    return `<div class="mq" aria-hidden="true"><div class="mq__track">${row}${row}</div></div>`;
  };

  const faqBlock = (items, title = 'Häufige Fragen') => `
    <section class="sec wrap" aria-labelledby="faq-t">
      <div class="sec__head"><div>${ruleBox('Gut zu wissen')}<h2 class="h2" id="faq-t" data-split>${title}</h2></div><p class="muted" data-reveal>Ihre Frage ist nicht dabei? Schreiben Sie uns an <a class="link" href="mailto:${S.company.mail}">${S.company.mail}</a> oder rufen Sie an: ${S.company.phone}.</p></div>
      <div class="faq" data-reveal>${items.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}<i>${svg.plus()}</i></summary><p class="a">${a}</p></details>`).join('')}</div>
    </section>`;

  const generalFaq = [
    ['Arbeiten Sie auch an Anlagen, die Sie nicht selbst gebaut haben?', 'Ja. Wir reparieren und warten auch Anlagen anderer Installateure und planen ihre Servicezyklen.'],
    ['Gibt es einen Notdienst?', `Ja. Unser Pikettdienst ist seit 2013 rund um die Uhr erreichbar: ${S.company.pikett}.`],
    ['Wo sind Ihre Standorte?', `Unser Hauptsitz ist in Wallisellen, weitere Standorte haben wir in Winterthur, Hinwil und Zürich.`]
  ];

  const topicsGrid = () => `<div class="tgroups">${S.groups.map(g => `<div class="tgroup" data-reveal><span class="tgroup__t">${svg.hex()}${g.title}</span><div class="tchips">${g.items.map(s => `<a class="tchip" href="#${s}">${focusBy(s).title}${svg.arrow()}</a>`).join('')}</div></div>`).join('')}</div>`;
  const markImgs = () => `<img class="mark" src="img/toplehrbetrieb.svg" alt="Toplehrbetrieb Gebäudetechnik" loading="lazy" width="350" height="108"><img class="mark" src="img/gebaeudetechniker.svg" alt="Wir, die Gebäudetechniker" loading="lazy" width="350" height="157"><span class="mark mark--iso" role="img" aria-label="ISO zertifiziert">${svg.icon()}<b>ISO</b><small>zertifiziert</small></span>`;
  const marks = (plain = false) => `<div class="marks ${plain ? 'marks--plain' : ''}" data-reveal>${plain ? '' : '<span class="marks__lbl">Ausgezeichnet und zertifiziert</span>'}<div class="marks__row">${markImgs()}</div></div>`;
  const quoteRotator = () => `<div class="qrot" data-qrot data-reveal>${S.quotes.map(([q, a], i) => `<figure class="qrot__item${i ? '' : ' is-on'}"><blockquote>«${q}»</blockquote><figcaption>${a}</figcaption></figure>`).join('')}<div class="qrot__dots" aria-hidden="true">${S.quotes.map((_, i) => `<i class="${i ? '' : 'is-on'}"></i>`).join('')}</div></div>`;
  const portraitWall = () => {
    const P = S.portraits, cols = [[0, 3, 6], [1, 4], [2, 5]];
    return `<div class="pwall" data-pwall>${cols.map((c, k) => `<div class="pwall__col" data-parallax-y="${[-5, 4, -2][k]}">${c.filter(i => P[i]).map((i, j) => `<img class="pwall__img${j ? '' : ' is-on'}" src="img/${P[i]}.webp" alt="Mitarbeiter von Rokitzky" loading="lazy">`).join('')}</div>`).join('')}</div>`;
  };
  const valuesGrid = () => `<div class="values">${S.values.map(([t, d], i) => `<div class="value" data-reveal><span class="value__no">${svg.hexFill()}<span>0${i + 1}</span></span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;
  const teamBlock = (title = 'Wir sind nur so gut wie sie.', lead = 'Über 80 Mitarbeiterinnen und Mitarbeiter in Wallisellen, Winterthur, Hinwil und Zürich. Wer zusammen lachen kann, kann auch zusammen anpacken.', btns = true) => `
    <div class="wrap team">
      <div class="team__txt">
        ${ruleBox('Mitarbeiter &amp; Unternehmenskultur')}
        <h2 class="h2" data-split>${title}</h2>
        <p class="lead" data-reveal style="margin-top:1.4rem">${lead}</p>
        ${quoteRotator()}
        ${btns ? `<div class="btns" data-reveal>${btn('#mitarbeitende', 'Arbeiten bei Rokitzky')}${btn('#karriere', 'Offene Stellen und Lehre', 'btn--ghost')}</div>` : ''}
      </div>
      ${portraitWall()}
    </div>`;

  const steps = () => `<div class="steps">${[
    ['Besprechen', 'Wir hören zu, schauen uns Ihr Gebäude und Ihre Anlage an und klären, was Sie brauchen.'],
    ['Planen', 'Wir planen die Lösung, die zu Ihrem Gebäude passt, und legen offen, was wir vorschlagen.'],
    ['Ausführen', 'Wir verbauen, was wir besprochen haben. Sauber, termingerecht und verbindlich.'],
    ['Betreuen', 'Service, Wartung und Pikettdienst über die ganze Lebensdauer Ihrer Anlage.']
  ].map(([t, d], i) => `<div class="step" data-reveal><b><i>${svg.hexFill()}<span>0${i + 1}</span></i>${t}</b><p>${d}</p></div>`).join('')}</div>`;

  /* ---------- pages ---------- */
  function pageHome() {
    return `
    ${hero({
      home: true,
      slides: [
        { src: 'hero-funken', m: 'hero-funken-m', pos: '64% 50%', alt: 'Monteur von Rokitzky kürzt ein Lüftungsrohr, die Funken fliegen' },
        { src: 'hero-dach', m: 'hero-dach-m', pos: '50% 42%', alt: 'Monteure von Rokitzky auf dem Dach einer Baustelle' },
        { src: 'team-dach', m: 'team-dach-m', pos: '40% 55%', alt: 'Drei Monteure von Rokitzky besprechen sich auf dem Dach neben einem Lüftungsgerät' }
      ],
      kicker: 'Heizung | Lüftung | Klima | Kälte | Sanitär',
      title: ['Wir verbauen,', `was wir ${sw('besprechen.')}`],
      sub: 'Seit 1970 planen, bauen, warten und sanieren wir Haustechnik. Persönlich und verbindlich, mit Pikettdienst rund um die Uhr.',
      btns: btn('#dienstleistungen', 'Unsere Dienstleistungen', 'btn--white') + tel()
    })}

    <section class="stmt wrap" aria-label="Unser Anspruch">
      ${ruleBox('Fachwissen &amp; Service', true)}
      <p class="stmt__big" data-words><span class="w">Zu</span> <span class="w">heiss?</span> <span class="w">Zu</span> <span class="w">kalt?</span> <span class="w accent">Rokitzky!</span></p>
      <div class="stmt__grid">
        <p class="lead" data-reveal>Wir kennen unsere Stärken und unsere Grenzen, in der Planung wie in der Ausführung.</p>
        <div class="stmt__facts" data-reveal>
          <p>Wir finden für Ihr Gebäude die Lösung, die passt, und bleiben auch nach der Inbetriebnahme für Sie da.</p>
          <a class="link" href="#unternehmen">Mehr über Rokitzky ${svg.arrow()}</a>
        </div>
      </div>
    </section>

    <section class="sec wrap" aria-labelledby="dl-t" style="padding-top:0">
      <div class="sec__head">
        <div>${ruleBox('Was wir tun')}<h2 class="h2" id="dl-t" data-split>Dienstleistungen</h2></div>
        <p class="lead" data-reveal>Heizung, Kälte, Lüftung, Klima und Sanitär aus einer Hand. Mit Service, der nach der Inbetriebnahme weitergeht.</p>
      </div>
      <div class="slist">${S.areas.map(a => `
        <a class="srow" href="#${a.slug}" data-cimg="img/${a.img}.webp" data-reveal>
          <span class="srow__no">${svg.hexLine()}<span>${a.no}</span></span>
          <span class="srow__t">${a.title}</span>
          <span class="srow__d">${a.short}</span>
          <span class="srow__a">${svg.arrow()}</span>
          <span class="srow__thumb">${img(a.img, '', a.pos)}</span>
        </a>`).join('')}
      </div>
    </section>

    <section class="sec sec--paper sec--tight" aria-labelledby="sp-t">
      <div class="wrap">
        <div class="sec__head">
          <div>${ruleBox('Unsere Schwerpunkte')}<h2 class="h2" id="sp-t" data-split>Wonach suchen Sie?</h2></div>
          <p class="lead" data-reveal>Wählen Sie Ihr Thema und kommen Sie direkt zur passenden Seite.</p>
        </div>
        ${topicsGrid()}
      </div>
    </section>

    <section class="sec sec--navy pk on-dark" aria-labelledby="pk-t">
      <div class="wrap pk__grid">
        <div>
          ${ruleBox('Störungsdienst und Pikett', true, true)}
          <h2 class="h2" id="pk-t" data-split>24/7 persönlich für Sie da.</h2>
          <a class="pk__num" href="tel:${S.company.pikettHref}" data-reveal>${S.company.pikett}</a>
          <p class="lead" data-reveal>Seit 2013 ist unser Pikettdienst rund um die Uhr erreichbar. Heizung, Lüftung, Klima, Kälte oder Sanitär: Wir kommen.</p>
          <div class="btns" data-reveal style="margin-top:2rem">${btn('tel:' + S.company.pikettHref, 'Jetzt anrufen', 'btn--white', svg.phone())}${btn('#stoerungsdienst-pikett', 'Mehr zum Pikettdienst', 'btn--ghost')}</div>
        </div>
        <div class="pk__media" data-img>${img('van-tall', 'Fahrzeuge von Rokitzky mit Logo und Ring Heizung Lüftung Sanitär', '50% 30%')}${ringLock('pk__ring')}</div>
      </div>
    </section>


    <section class="sec wrap" aria-labelledby="un-t">
      <div class="split">
        <div class="split__media morph" data-morph>${img('service-check-tall', 'Servicetechniker von Rokitzky kontrolliert ein Thermometer an einer Anlage', '50% 40%')}</div>
        <div class="split__txt">
          ${ruleBox('Unternehmen')}
          <h2 class="h2" id="un-t" data-split>Seit 1970. Persönlich geblieben.</h2>
          <p data-reveal>Was 1970 als Einmannbetrieb in Embrach begann, ist heute ein inhabergeführtes Handwerksunternehmen mit über 80 Mitarbeitenden. Uns tragen Zuverlässigkeit und die Nähe zu unseren Kundinnen und Kunden.</p>
          <div class="mini-tl" data-reveal>
            <div><b>1970</b><span>Start in Embrach</span></div>
            <div><b>1987</b><span>W. Rokitzky AG</span></div>
            <div><b>2013</b><span>Pikettdienst 24/7</span></div>
            <div><b>2020</b><span>K3 Handwerkcity</span></div>
          </div>
          <div class="btns" data-reveal>${btn('#unternehmen', 'Unsere Geschichte')}</div>
        </div>
      </div>
    </section>

    <section class="sec sec--paper" aria-label="Mitarbeitende">${teamBlock()}<div class="wrap">${marks()}</div></section>

    ${mapSection()}
    ${ctaBlock()}`;
  }

  function mapSection(heading = 'Vier Standorte. Ein Team.') {
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
          <h2 class="h2" id="map-t" data-split>${heading}</h2>
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
    ${hero({ img: 'umbau-hebebuehne', pos: '45% 30%', alt: 'Monteur von Rokitzky mit Helm und Warnweste auf einer Hebebühne', crumb: [['Home', '#start'], ['Dienstleistungen']], kicker: 'Fachwissen &amp; Service', title: ['Dienstleistungen'], sub: 'Zu heiss? Zu kalt? Rokitzky! Heizung, Kälte, Lüftung, Klima, Sanitär, Service und erneuerbare Energien aus einer Hand.', btns: btn('#kontakt', 'Projekt besprechen', 'btn--white') + tel() })}
    <section class="sec wrap intro" aria-label="Einleitung">
      <div>${ruleBox('Was wir tun')}<p class="lead" data-reveal>Wir kennen unsere Stärken und unsere Grenzen, in der Planung wie in der Ausführung. Deshalb sagen wir klar, was wir können, und verbauen, was wir besprochen haben.</p></div>
      <ul class="checks" data-reveal>${S.areas.map(a => `<li>${svg.hex()}<a href="#${a.slug}">${a.title}</a></li>`).join('')}</ul>
    </section>
    <section class="sec wrap" style="padding-top:0" aria-label="Bereiche">
      <div class="areas-big">${S.areas.map(a => `
        <article class="area" id="b-${a.slug}">
          <div class="area__media" data-img>${img(a.img, a.title, a.pos)}</div>
          <div>
            <span class="area__no" data-reveal>${a.no}</span>
            <h2 class="h2" data-split>${a.title}</h2>
            <p data-reveal>${a.lead}</p>
            <ul class="checks" data-reveal>${a.items.slice(0, 4).map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
            <div class="btns" data-reveal>${btn('#' + a.slug, 'Mehr zu ' + a.title)}</div>
          </div>
        </article>`).join('')}
      </div>
    </section>
    ${marquee()}
    <section class="sec sec--paper" aria-labelledby="sp2-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Unsere Schwerpunkte')}<h2 class="h2" id="sp2-t" data-split>Alle Themen im Überblick</h2></div><p class="lead" data-reveal>Von der Klimaanlage bis zur Brandschutzklappe: Jede Leistung hat ihre eigene Seite.</p></div>
      ${topicsGrid()}
    </div></section>
    ${faqBlock(generalFaq)}
    ${ctaBlock()}`;
  }

  function pageArea(a) {
    const rel = a.related.map(focusBy).filter(Boolean);
    return `
    ${hero({ img: a.img, pos: a.pos, alt: a.title, crumb: [['Home', '#start'], ['Dienstleistungen', '#dienstleistungen'], [a.title]], kicker: 'Dienstleistungen ' + a.no, title: [a.title], sub: a.short, btns: btn('#kontakt', 'Projekt besprechen', 'btn--white') + tel() })}
    <section class="sec wrap intro" aria-label="Leistungen">
      <div>${ruleBox('Was wir für Sie tun')}<p class="lead" data-reveal>${a.lead}</p></div>
      <ul class="checks" data-reveal>${a.items.map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
    </section>
    <section class="band" aria-label="Unser Versprechen">${img(a.img, '', a.pos)}<div class="slate" data-reveal><span class="lbl lbl--light">Unser Versprechen</span><p class="h2" style="margin:.8rem 0 0">${a.band}</p></div></section>
    <section class="sec sec--paper" aria-labelledby="rel-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Schwerpunkte')}<h2 class="h2" id="rel-t" data-split>Passende Themen</h2></div><p class="lead" data-reveal>Vertiefen Sie, was für Ihr Gebäude wichtig ist.</p></div>
      <div class="cards">${rel.map((f, i) => `<a class="card card--img" href="#${Object.keys(S.focus).find(k => S.focus[k] === f)}" data-reveal>${img(f.img, '', f.pos)}<span class="lbl">${groupOf(f.group).title}</span><div><h3>${f.title}</h3><p>${f.sub}</p></div><span class="card__go">Zur Seite ${svg.arrow()}</span></a>`).join('')}</div>
    </div></section>
    ${faqBlock(generalFaq)}
    ${ctaBlock()}`;
  }

  function pageFocus(slug, f) {
    const g = groupOf(f.group);
    const siblings = g.items.filter(s => s !== slug).map(s => [s, focusBy(s)]);
    const parent = S.areas.find(a => a.related.includes(slug));
    const faq = [...f.faq, generalFaq[1], generalFaq[2]];
    return `
    ${hero({ img: f.img, pos: f.pos, alt: f.title, crumb: [['Home', '#start'], ['Dienstleistungen', '#dienstleistungen'], [g.title], [f.title]], kicker: g.title, title: [f.h1], sub: `${f.sub}. Von unseren Standorten in ${locNames}.`, btns: btn('#kontakt', 'Anfrage stellen', 'btn--white') + tel() })}
    <section class="sec wrap intro" aria-label="Leistungen">
      <div>${ruleBox(f.title + ' bei Rokitzky')}<p class="lead" data-reveal>${f.lead}</p></div>
      <ul class="checks" data-reveal>${f.items.map(i => `<li>${svg.hex()}${i}</li>`).join('')}</ul>
    </section>
    <section class="sec sec--paper" aria-labelledby="st-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('So arbeiten wir')}<h2 class="h2" id="st-t" data-split>Persönlich und verbindlich</h2></div><p class="lead" data-reveal>Vom ersten Gespräch bis zum Service: Sie haben einen Partner, der hält, was besprochen ist.</p></div>
      ${steps()}
    </div></section>
    ${faqBlock(faq, 'Fragen zu ' + f.title)}
    <section class="sec sec--paper" aria-labelledby="mo-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox(g.title)}<h2 class="h2" id="mo-t" data-split>Das könnte Sie auch interessieren</h2></div></div>
      <div class="cards">${siblings.map(([s, x]) => `<a class="card" href="#${s}" data-reveal><span class="lbl">${g.title}</span><div><h3>${x.title}</h3><p>${x.sub}</p></div><span class="card__go">Zur Seite ${svg.arrow()}</span></a>`).join('')}${parent ? `<a class="card card--img" href="#${parent.slug}" data-reveal>${img(parent.img, '', parent.pos)}<span class="lbl">Bereich</span><div><h3>${parent.title}</h3><p>${parent.short}</p></div><span class="card__go">Zum Bereich ${svg.arrow()}</span></a>` : ''}</div>
    </div></section>
    ${ctaBlock()}`;
  }

  function pageCompany() {
    return `
    ${hero({ img: 'team-dach', m: 'team-dach-m', pos: '35% 55%', alt: 'Monteure von Rokitzky besprechen sich auf dem Dach einer Baustelle', crumb: [['Home', '#start'], ['Unternehmen']], kicker: 'Unternehmen seit 1970', title: ['Seit 1970.', 'Persönlich geblieben.'], sub: 'Vom Einmannbetrieb in Embrach zum inhabergeführten Unternehmen mit über 80 Mitarbeitenden. Geblieben ist, was uns ausmacht: Zuverlässigkeit und Nähe zu unseren Kundinnen und Kunden.', btns: btn('#kontakt', 'Kontakt', 'btn--white') + btn('#mitarbeitende', 'Mitarbeitende', 'btn--ghost') })}
    <section class="sec wrap intro" aria-label="Über uns">
      <div>${ruleBox('Persönlich &amp; Verbindlich', true)}<p class="lead" data-reveal>Persönlich und verbindlich: Das ist unser Anspruch an jede Anlage und an jede Begegnung. Wir verbauen, was wir besprechen, und bleiben auch nach der Inbetriebnahme für Sie da.</p></div>
      <div class="facts" style="grid-template-columns:1fr 1fr" data-reveal>
        <div class="fact"><span class="fact__n">1970</span><span class="fact__t">gegründet in Embrach</span></div>
        <div class="fact"><span class="fact__n">80+</span><span class="fact__t">Mitarbeitende</span></div>
      </div>
    </section>
    <section class="sec sec--paper" aria-labelledby="tl-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Geschichte')}<h2 class="h2" id="tl-t" data-split>Vom Einmannbetrieb zu Rokitzky</h2></div><p class="lead" data-reveal>Über fünf Jahrzehnte Haustechnik im Kanton Zürich.</p></div>
      <div class="tl" data-tl><span class="tl__line"><span class="tl__fill"></span></span>
        ${S.timeline.map(([y, t, d]) => `<div class="tl__item" data-reveal><span class="tl__y">${y}</span><span class="tl__dot">${svg.hexFill()}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
      </div>
    </div></section>
    ${mapSection('Vier Standorte im Kanton Zürich')}
    <section class="sec wrap" aria-labelledby="zp-t">
      <div class="sec__head"><div>${ruleBox('Qualität und Partner')}<h2 class="h2" id="zp-t" data-split>Geprüft und gut vernetzt</h2></div></div>
      <div class="cgrid">
        <div class="ccard" data-reveal><span class="lbl">Zertifikate</span><h3>Geprüfte Qualität</h3><p>Wir verfügen über Qualitätszertifikate und werden regelmässig auditiert. Als Toplehrbetrieb bilden wir jedes Jahr 15 bis 20 Lernende aus.</p></div>
        <div class="ccard" data-reveal><span class="lbl">Wärmeverbund</span><h3>Holz AG für Energie</h3><p>2011 gebaut: ein Wärmeverbund mit 2 MW Holzschnitzelheizung.</p><a href="https://www.holzag.ch" target="_blank" rel="noopener">Zur Holz AG für Energie</a></div>
        <div class="ccard" data-reveal><span class="lbl">Hauptsitz</span><h3>K3 Handwerkcity</h3><p>Seit 2020 arbeiten wir in der K3 Handwerkcity in Wallisellen.</p><a href="https://www.k3-handwerkcity.ch" target="_blank" rel="noopener">Zur K3 Handwerkcity</a></div>
      </div>
      ${marks()}
      <div class="chips" style="margin-top:2rem" data-reveal>${S.legal.map(([t, u]) => `<a class="chip" href="${u}" target="_blank" rel="noopener">${t} (PDF)</a>`).join('')}</div>
    </section>
    ${ctaBlock()}`;
  }

  const personCard = ([n, r, slug], big = false) => `<figure class="person${big ? ' person--big' : ''}"${big ? ' data-reveal' : ''}><div class="person__img"><img src="img/team/${slug}${big ? '-xl' : ''}.webp" alt="${n}, ${r}" loading="lazy" decoding="async" width="${big ? 450 : 300}" height="${big ? 600 : 400}"></div><figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`;

  function pageTeam() {
    const T = S.team;
    return `
    ${hero({ img: 'hero-dach', pos: '55% 45%', alt: 'Monteure von Rokitzky auf dem Dach einer Baustelle', crumb: [['Home', '#start'], ['Mitarbeitende']], kicker: 'Mitarbeiter &amp; Unternehmenskultur', title: ['Wir sind nur', 'so gut wie sie.'], sub: 'Leitungen, Pumpen und Regelungen sind das Werk vieler Hände. Über 80 Mitarbeiterinnen und Mitarbeiter sorgen in Wallisellen, Winterthur, Hinwil und Zürich dafür, dass alles läuft.', btns: btn('#karriere', 'Offene Stellen und Lehre', 'btn--white') })}
    <section class="sec" aria-labelledby="own-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Rokitzky persönlich', true)}<h2 class="h2" id="own-t" data-split>Die Inhaber</h2></div><p class="lead" data-reveal>Michele Fiorito, Siniša Stojković und Vincenzo Aquilino führen die W. Rokitzky AG als Inhaber.</p></div>
      <div class="owners">${T.owners.map(p => personCard(p, true)).join('')}</div>
    </div></section>
    <section class="sec sec--paper" aria-labelledby="tm-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Mitarbeitende')}<h2 class="h2" id="tm-t" data-split>Unser Team</h2></div><p class="lead" data-reveal>Mit Namen und Funktion: die Menschen, die bei uns planen, montieren, warten, ausbilden und organisieren.</p></div>
      <div class="tfilter" aria-label="Team nach Bereich filtern" data-reveal>
        <button type="button" class="tchip is-on" data-tf="all" aria-pressed="true">Alle</button>
        ${T.groups.map(g => `<button type="button" class="tchip" data-tf="${g.id}" aria-pressed="false">${g.title}</button>`).join('')}
      </div>
      ${T.groups.map(g => `<div class="tgrp" data-tg="${g.id}" data-reveal><h3 class="tgrp__t">${svg.hex()}<span>${g.title}</span><i>${g.people.length}</i></h3><div class="people">${g.people.map(p => personCard(p)).join('')}</div></div>`).join('')}
    </div></section>
    <section class="sec" aria-labelledby="ab-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Arbeiten bei Rokitzky', true)}<h2 class="h2" id="ab-t" data-split>Was uns im Alltag trägt</h2></div>${quoteRotator()}</div>
      ${valuesGrid()}
      ${marks()}
    </div></section>
    <section class="band" aria-label="Zitat">${img('team-dach', '', '40% 50%')}<div class="slate" data-reveal><span class="lbl lbl--light">Aus dem Team</span><p class="h2" style="margin:.8rem 0 0">Wer zusammen lachen kann, kann auch zusammen ${sw('anpacken.')}</p></div></section>
    <section class="sec sec--navy on-dark" aria-labelledby="jobs-t"><div class="wrap split">
      <div class="split__media" data-img>${img('service-check-tall', 'Servicetechniker von Rokitzky bei der Arbeit', '50% 35%')}</div>
      <div class="split__txt">
        ${ruleBox('Offene Stellen und Lehre', true, true)}
        <p class="bigquote" id="jobs-t" data-reveal>«Ich arbeite gern dort, wo man mir vertraut.»</p>
        <p data-reveal>Hier bekommen Sie Aufgaben, bei denen Sie selber denken und entscheiden. Fachkräfte und Lernende finden bei uns ein Team, auf das man sich verlassen kann.</p>
        <div class="btns" data-reveal>${btn('#karriere', 'Offene Stellen und Lehre', 'btn--white')}${btn('mailto:' + S.company.mail, 'Bewerbung senden', 'btn--ghost', svg.mail())}</div>
      </div>
    </div></section>
    ${ctaBlock()}`;
  }

  function pageCareer() {
    return `
    ${hero({ img: 'action-team-wide', m: 'action-team-tall', pos: '55% 40%', alt: 'Mitarbeitende von Rokitzky in Warnwesten in einer Technikzentrale', crumb: [['Home', '#start'], ['Mitarbeitende', '#mitarbeitende'], ['Karriere']], kicker: 'Karriere und Lehre bei Rokitzky', title: ['Wir waren alle', 'einmal neu.'], sub: 'Ob erfahrene Fachkraft oder Lernende: Bei uns übernehmen Sie Verantwortung und lernen jeden Tag dazu. Jedes Jahr bilden wir 15 bis 20 Lernende in fünf Berufen aus.', btns: btn('mailto:' + S.company.mail, 'Jetzt bewerben', 'btn--white', svg.mail()) })}
    <section class="sec" aria-labelledby="ar-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Arbeiten bei Rokitzky', true)}<h2 class="h2" id="ar-t" data-split>So arbeiten wir zusammen</h2></div>${quoteRotator()}</div>
      ${valuesGrid()}
    </div></section>
    <section class="sec sec--navy on-dark" aria-labelledby="os-t"><div class="wrap intro">
      <div>${ruleBox('Offene Stellen', true, true)}<h2 class="h2" id="os-t" data-split>Fachkräfte in der Gebäudetechnik</h2><p class="lead" data-reveal style="margin-top:1.4rem">Sie bringen Erfahrung in Heizung, Lüftung, Klima, Kälte oder Sanitär mit? Bei uns übernehmen Sie Verantwortung auf Baustellen in Wallisellen, Winterthur, Hinwil und Zürich, mit einem Team, auf das man sich verlassen kann.</p></div>
      <div class="ccard" data-reveal><span class="lbl">Bewerbung</span><h3>Online bewerben</h3><p>Senden Sie uns Ihre Unterlagen per Mail. Wir melden uns persönlich.</p><a class="btn btn--solid" href="mailto:${S.company.mail}" style="justify-self:start;margin-top:.6rem">${S.company.mail} ${svg.arrow()}</a></div>
    </div></section>
    <section class="sec sec--paper" aria-labelledby="le-t"><div class="wrap">
      <div class="sec__head"><div>${ruleBox('Lehre bei Rokitzky', true)}<h2 class="h2" id="le-t" data-split>15 bis 20 Lernende pro Jahr</h2></div><div data-reveal><p class="lead">Als Toplehrbetrieb Gebäudetechnik bilden wir in fünf Berufen aus. Bei uns gibt es Schnuppertage, Praktika und Lehrstellen.</p>${marks(true)}</div></div>
      <div class="cards cards--jobs">${S.apprenticeships.map((b, i) => `<a class="card" href="mailto:${S.company.mail}?subject=Lehrstelle%20${encodeURIComponent(b)}" data-reveal><span class="lbl">Lehrberuf 0${i + 1}</span><div><h3>${b}</h3></div><span class="card__go">Lehrstelle anfragen ${svg.arrow()}</span></a>`).join('')}</div>
      <div class="tips">
        <div>${ruleBox('Was wir Berufseinsteigern raten')}<p class="bigquote bigquote--ink" data-reveal>Wir waren alle einmal neu.</p></div>
        <div class="tips__list">${S.tips.map(([t, d]) => `<div class="tip" data-reveal><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
      </div>
      <div class="intro" style="margin-top:clamp(3rem,6vw,5rem)">
        <div>${ruleBox('Bewerbungsunterlagen')}<p class="lead" data-reveal>Senden Sie uns Ihre Unterlagen als PDF an ${S.company.mail}.</p></div>
        <ul class="checks" data-reveal>${S.documents.map(d => `<li>${svg.hex()}${d}</li>`).join('')}</ul>
      </div>
    </div></section>
    ${ctaBlock('Persönlich &amp; Verbindlich', 'Fragen zur Lehre oder zu offenen Stellen? Wir nehmen uns Zeit für Sie.', ['team-dach', '40% 55%'])}`;
  }

  function pageContact() {
    const [w, wi] = S.locations;
    return `
    ${hero({ dim: true, ring: false, img: 'van-wide', pos: '40% 50%', alt: 'Servicefahrzeug von Rokitzky', crumb: [['Home', '#start'], ['Kontakt']], kicker: 'Kontakt', title: ['So erreichen', 'Sie uns.'], sub: 'Persönlich und verbindlich, an vier Standorten und mit Pikettdienst rund um die Uhr.', btns: btn('mailto:' + S.company.mail, S.company.mail, 'btn--white', svg.mail()) + tel() })}
    <section class="sec wrap" aria-label="Kontaktdaten">
      <div class="cgrid">
        <div class="ccard ccard--navy" data-reveal><span class="lbl lbl--light">Pikett 24/7</span><strong>${S.company.pikett}</strong><p>Störungsdienst rund um die Uhr, persönlich für Sie da.</p><a href="tel:${S.company.pikettHref}">Jetzt anrufen</a></div>
        <div class="ccard" data-reveal><span class="lbl">Hauptsitz</span><h3>${w.name}</h3><p>W. Rokitzky AG<br>${w.street}<br>${w.city}</p><a href="tel:${w.href}">${w.phone}</a></div>
        <div class="ccard" data-reveal><span class="lbl">Standort</span><h3>${wi.name}</h3><p>W. Rokitzky AG<br>${wi.street}<br>${wi.city}</p><a href="tel:${wi.href}">${wi.phone}</a></div>
        <div class="ccard" data-reveal><span class="lbl">Allgemein</span><h3>Mail</h3><p>Für Anfragen, Offerten und Bewerbungen.</p><a href="mailto:${S.company.mail}">${S.company.mail}</a></div>
        <div class="ccard" data-reveal><span class="lbl">Service</span><h3>Service</h3><p>Für Wartung, Service und Wartungsverträge.</p><a href="mailto:${S.company.serviceMail}">${S.company.serviceMail}</a></div>
        <div class="ccard" data-reveal><span class="lbl">Standorte</span><h3>Hinwil und Zürich</h3><p>Kontakt über den Hauptsitz in Wallisellen.</p><a href="tel:${S.company.phoneHref}">${S.company.phone}</a></div>
      </div>
    </section>
    <section class="sec sec--paper" aria-labelledby="fo-t"><div class="wrap intro">
      <div>${ruleBox('Anfrage')}<h2 class="h2" id="fo-t" data-split>Worum geht es?</h2><p class="lead" data-reveal style="margin-top:1.4rem">Beschreiben Sie kurz Ihr Anliegen. Wir melden uns persönlich bei Ihnen.</p></div>
      <form class="form" id="form" data-reveal novalidate>
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Telefon<input name="tel" type="tel" autocomplete="tel"></label>
        <label class="full">Mail<input name="mail" type="email" autocomplete="email" required></label>
        <label class="full">Thema<select name="thema"><option>Bitte wählen</option>${S.areas.map(a => `<option>${a.title}</option>`).join('')}${Object.values(S.focus).map(f => `<option>${f.title}</option>`).join('')}<option>Offene Stellen und Lehre</option></select></label>
        <label class="full">Nachricht<textarea name="msg"></textarea></label>
        <div class="full btns"><button class="btn btn--solid" type="submit">Anfrage senden ${svg.arrow()}</button><span class="muted" style="font-size:.9rem">Prototyp: Das Formular wird beim Livegang angebunden.</span></div>
      </form>
    </div></section>
    ${mapSection()}`;
  }

  /* ---------- routing ---------- */
  const META = {
    start: { t: 'W. Rokitzky AG | Heizung, Lüftung, Klima, Kälte und Sanitär | Wallisellen, Winterthur, Hinwil, Zürich', d: 'Heizung, Kälte, Lüftung, Klima, Sanitär, Service und erneuerbare Energien seit 1970. Pikettdienst 24/7. Standorte in Wallisellen, Winterthur, Hinwil und Zürich.', label: 'Gebäudetechnik seit 1970', nav: 'start', fn: pageHome },
    dienstleistungen: { t: 'Dienstleistungen | W. Rokitzky AG', d: 'Heizung und Kälte, Lüftung und Klima, Sanitär, erneuerbare Energien sowie Service und Unterhalt aus einer Hand.', label: 'Fachwissen & Service', nav: 'dienstleistungen', fn: pageServices },
    unternehmen: { t: 'Unternehmen | W. Rokitzky AG seit 1970', d: 'Inhabergeführtes Handwerksunternehmen seit 1970 mit über 80 Mitarbeitenden und Standorten in Wallisellen, Winterthur, Hinwil und Zürich.', label: 'Unternehmen seit 1970', nav: 'unternehmen', fn: pageCompany },
    mitarbeitende: { t: 'Mitarbeitende | W. Rokitzky AG', d: 'Über 80 Mitarbeiterinnen und Mitarbeiter. Rokitzky persönlich, offene Stellen und Lehre.', label: 'Mitarbeiter & Unternehmenskultur', nav: 'mitarbeitende', fn: pageTeam },
    karriere: { t: 'Karriere und Lehre | W. Rokitzky AG', d: 'Offene Stellen und Lehre bei Rokitzky: 15 bis 20 Lernende pro Jahr in fünf Berufen der Gebäudetechnik.', label: 'Mitarbeiter & Unternehmenskultur', nav: 'mitarbeitende', fn: pageCareer },
    kontakt: { t: 'Kontakt | W. Rokitzky AG | Pikett 24/7 076 434 17 17', d: 'Kontakt W. Rokitzky AG: Wallisellen 044 312 34 41, Winterthur 052 551 88 99, Pikettdienst 24/7 076 434 17 17.', label: 'Persönlich & Verbindlich', nav: 'kontakt', fn: pageContact }
  };
  function resolve(hash) {
    const k = (hash || '').replace(/^#/, '') || 'start';
    if (META[k]) return { key: k, ...META[k], html: META[k].fn() };
    const a = areaBy(k);
    if (a) return { key: k, t: `${a.title} | W. Rokitzky AG`, d: a.lead, label: 'Fachwissen & Service', nav: 'dienstleistungen', html: pageArea(a), area: a };
    const f = focusBy(k);
    if (f) return { key: k, t: `${f.title} in ${locNames} | W. Rokitzky AG`, d: f.lead, label: 'Fachwissen & Service', nav: 'dienstleistungen', html: pageFocus(k, f), focus: f };
    return null;
  }
  function ldFor(r) {
    const base = 'https://www.rokitzky.ch/';
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }];
    if (r.key !== 'start') crumbs.push({ '@type': 'ListItem', position: 2, name: r.t.split(' | ')[0], item: base + r.key });
    const g = [{ '@type': 'BreadcrumbList', itemListElement: crumbs }];
    if (r.focus) {
      g.push({ '@type': 'Service', name: r.focus.title, serviceType: r.focus.title, description: r.focus.lead, provider: { '@id': base + '#organisation' }, areaServed: ['Wallisellen', 'Winterthur', 'Hinwil', 'Zürich'] });
      g.push({ '@type': 'FAQPage', mainEntity: [...r.focus.faq, generalFaq[1]].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
    }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': g });
  }

  const main = $('#main'), hd = $('#hd'), wipe = $('#wipe');
  let lenis = null, ctx = null, busy = false, current = '';

  function render(hash, opts = {}) {
    const r = resolve(hash) || resolve('#start');
    current = r.key;
    if (cycle) { cycle.kill(); cycle = null; }
    timers.forEach(clearTimeout); timers = [];
    if (ctx) { ctx.revert(); ctx = null; }
    if (window.ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    main.innerHTML = r.html;
    document.body.dataset.page = r.key;
    document.title = r.t;
    let md = $('meta[name="description"]'); md.setAttribute('content', r.d);
    $('#ld-page').textContent = ldFor(r);
    $('#hdLabel').textContent = r.label;
    $$('.hd__nav a').forEach(a => a.classList.toggle('is-active', a.dataset.nav === r.nav));
    hd.classList.remove('is-solid', 'is-hidden');
    closeMenu(); closeMega();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0);
    bindPage();
    animatePage(opts);
    if (!opts.initial) main.focus({ preventScroll: true });
  }

  /* ---------- page transition (hexagon wipe) ---------- */
  function hexPoly(cx, cy, r) {
    const p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i; p.push(`${(cx + r * Math.cos(a)).toFixed(1)}px ${(cy + r * Math.sin(a)).toFixed(1)}px`); }
    return `polygon(${p.join(',')})`;
  }
  function go(hash, x = innerWidth / 2, y = innerHeight / 2) {
    if (busy) return;
    if (hash === '#' + current) { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (!HAS_GSAP || REDUCE) { location.hash = hash; return; }
    busy = true;
    const o = { r: 0 }, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) * 1.2;
    const icon = $('.wipe__icon', wipe);
    gsap.set(wipe, { yPercent: 0 });
    gsap.timeline()
      .to(o, { r: R, duration: .62, ease: 'power3.inOut', onUpdate: () => { wipe.style.clipPath = hexPoly(x, y, o.r); } })
      .to(icon, { opacity: 1, scale: 1, duration: .25, ease: 'power2.out' }, .3)
      .add(() => { location.hash = hash; render(hash, { fromWipe: true }); })
      .to(icon, { opacity: 0, duration: .2 }, '+=.04')
      .to(wipe, { yPercent: -100, duration: .66, ease: 'power3.inOut' }, '<')
      .add(() => { wipe.style.clipPath = hexPoly(innerWidth / 2, innerHeight / 2, 0); gsap.set(wipe, { yPercent: 0 }); busy = false; });
  }
  window.addEventListener('hashchange', () => { if (!busy) render(location.hash); });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const h = a.getAttribute('href');
    if (h === '#main' || h === '#') return;
    if (!resolve(h)) return;
    e.preventDefault();
    go(h, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
  });

  /* ---------- header, mega menu, mobile menu ---------- */
  function buildChrome() {
    $$('[data-svg]').forEach(el => {
      const k = el.dataset.svg;
      el.innerHTML = k === 'wordmark' ? svg.wordmark() : k === 'icon' ? svg.icon() : k === 'hexwhite' ? svg.hexFill() : k === 'ringlock' ? ringLock('hero__ring') : '';
    });
    $('#megaAreas').innerHTML = `<span class="lbl" style="margin-bottom:.6rem">Bereiche</span>` + S.areas.map(a => `<a href="#${a.slug}"><span>${a.no}</span>${a.title}</a>`).join('') + `<a href="#dienstleistungen" style="border:0;color:var(--brand)"><span></span>Alle Dienstleistungen</a>`;
    $('#megaGroups').innerHTML = S.groups.map(g => `<div><h4>${g.title}</h4>${g.items.map(s => `<a href="#${s}">${focusBy(s).title}</a>`).join('')}</div>`).join('');
    $('#menuNav').innerHTML = `<a href="#start">Home</a><a href="#dienstleistungen">Dienstleistungen</a><div class="menu__sub">${S.areas.map(a => `<a href="#${a.slug}">${a.title}</a>`).join('')}<a href="#stoerungsdienst-pikett">Pikettdienst 24/7</a></div><a href="#unternehmen">Unternehmen</a><a href="#mitarbeitende">Mitarbeitende</a><div class="menu__sub"><a href="#karriere">Offene Stellen und Lehre</a></div><a href="#kontakt">Kontakt</a>`;
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
  function openMenu() { document.body.classList.add('menu-open'); $('#burger').setAttribute('aria-expanded', 'true'); $('#menu').setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); }
  function closeMenu() { document.body.classList.remove('menu-open'); $('#burger').setAttribute('aria-expanded', 'false'); $('#menu').setAttribute('aria-hidden', 'true'); lenis && lenis.start(); }
  function footer() {
    const [w, wi] = S.locations;
    return `<div class="wrap">
      <div class="ft__top">
        <div class="ft__brand"><a class="ft__logo" href="#start" aria-label="Zur Startseite">${svg.wordmark()}</a><p class="ft__claim">Persönlich &amp;<br>Verbindlich</p><p>Heizung, Kälte, Lüftung, Klima, Sanitär, Service und erneuerbare Energien seit 1970.</p></div>
        <div><h4>Dienstleistungen</h4><ul>${S.areas.map(a => `<li><a href="#${a.slug}">${a.title}</a></li>`).join('')}<li><a href="#stoerungsdienst-pikett">Pikettdienst 24/7</a></li></ul></div>
        <div><h4>Unternehmen</h4><ul><li><a href="#unternehmen">Unternehmen</a></li><li><a href="#mitarbeitende">Mitarbeitende</a></li><li><a href="#karriere">Karriere und Lehre</a></li><li><a href="#kontakt">Kontakt</a></li>${S.social.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul></div>
        <div><h4>Kontakt</h4><p>W. Rokitzky AG<br>${w.street}, ${w.city}<br><a href="tel:${w.href}">${w.phone}</a></p><p style="margin-top:.8rem">${wi.street}, ${wi.city}<br><a href="tel:${wi.href}">${wi.phone}</a></p><p style="margin-top:.8rem"><a href="mailto:${S.company.mail}">${S.company.mail}</a><br><a href="mailto:${S.company.serviceMail}">${S.company.serviceMail}</a></p><p style="margin-top:.8rem">Pikett 24/7: <a href="tel:${S.company.pikettHref}">${S.company.pikett}</a></p></div>
      </div>
      <div class="ft__big">
        <div class="ft__bl">
        <div class="ft__aw"><span class="ft__awl">Ausgezeichnet und zertifiziert</span><div class="ft__marks">${markImgs()}</div></div>
        <div class="ft__legal"><span>© W. Rokitzky AG</span><a href="https://rokitzky.ch/impressum" target="_blank" rel="noopener">Impressum</a><a href="https://rokitzky.ch/datenschutz" target="_blank" rel="noopener">Datenschutz</a>${S.legal.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`).join('')}</div>
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
    const form = $('#form', main);
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); if (!$('.ok', form)) form.insertAdjacentHTML('beforeend', '<p class="ok">Danke. Im Prototyp wird nichts versendet, beim Livegang geht Ihre Anfrage direkt an info@rokitzky.ch.</p>'); });
    $$('.loc', main).forEach(l => {
      const pin = $(`[data-pin="${l.dataset.loc}"]`, main);
      if (!pin) return;
      l.addEventListener('mouseenter', () => { pin.classList.add('is-on'); l.classList.add('is-on'); HAS_GSAP && gsap.to(pin, { scale: 1.35, duration: .5, ease: 'back.out(3)' }); });
      l.addEventListener('mouseleave', () => { pin.classList.remove('is-on'); l.classList.remove('is-on'); HAS_GSAP && gsap.to(pin, { scale: 1, duration: .5, ease: 'power3.out' }); });
    });
    // cursor image for service rows
    const cimg = $('#cimg'), inner = $('.cimg__in', cimg);
    HAS_GSAP && gsap.set(cimg, { opacity: 0, scale: .6 });
    if (FINE && HAS_GSAP && !REDUCE) {
      const qx = gsap.quickTo(cimg, 'x', { duration: .55, ease: 'power3' }), qy = gsap.quickTo(cimg, 'y', { duration: .55, ease: 'power3' });
      let px = -1, py = -1;
      addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
      hideCimgOnScroll = () => { if (px < 0) return; const el = document.elementFromPoint(px, py); if (!el || !el.closest('[data-cimg]')) gsap.to(cimg, { opacity: 0, scale: .6, duration: .3, overwrite: 'auto' }); };
      $$('[data-cimg]', main).forEach(row => {
        row.addEventListener('mouseenter', (e) => { inner.style.backgroundImage = `url(${row.dataset.cimg})`; gsap.to(cimg, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out' }); qx(e.clientX); qy(e.clientY); });
        row.addEventListener('mousemove', (e) => { qx(e.clientX + 40); qy(e.clientY); });
        row.addEventListener('mouseleave', () => gsap.to(cimg, { opacity: 0, scale: .6, duration: .35, ease: 'power2.in' }));
      });
    }
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
    if (REDUCE) { gsap.set($$('[data-reveal]', main), { clearProps: 'all' }); $$('[data-morph]', main).forEach(m => m.style.setProperty('--m', 400)); return; }
    ctx = gsap.context(() => {
      // hero intro
      const hero = $('[data-hero]', main);
      if (hero) {
        const media = $('[data-hero-media]', hero);
        const slides = $$('.hero__still', media);
        const tl = gsap.timeline({ delay: opts.fromWipe ? .25 : .15 });
        const swm = $$('.sw__mark', hero), ring = $$('.hero__ring', hero);
        tl.from(media, { scale: 1.16, duration: 2.4, ease: 'power3.out' }, 0)
          .from($$('.ln > span', hero), { yPercent: 108, duration: 1.15, stagger: .1, ease: 'power4.out' }, .2)
          .from($$('[data-hero="fade"]', hero), { y: 22, opacity: 0, duration: .9, stagger: .07, ease: 'power3.out' }, .45);
        if (swm.length) tl.from(swm, { clipPath: 'inset(0 100% 0 0)', duration: .9, ease: 'power3.inOut' }, 1.05);
        if (ring.length) tl.from(ring, { scale: .6, opacity: 0, rotate: -40, duration: 1.4, ease: 'power3.out' }, .5);
        gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to($('.hero__in', hero), { yPercent: -10, opacity: .3, ease: 'none', scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true } });
        // ruhige Bildfolge als Platzhalter, bis das Drohnenvideo eingebunden ist
        if (slides.length > 1) startCycle(slides);
        else if (slides[0]) gsap.fromTo(slides[0], { scale: 1.02 }, { scale: 1.1, duration: 16, ease: 'none', repeat: -1, yoyo: true });
        if (HERO_VIDEO && $('[data-slide]', media)) {
          const v = document.createElement('video');
          Object.assign(v, { muted: true, loop: true, autoplay: true, playsInline: true, src: HERO_VIDEO });
          v.className = 'hero__still'; v.style.opacity = 0; media.appendChild(v);
          v.addEventListener('canplay', () => gsap.to(v, { opacity: 1, duration: 1.2 }), { once: true });
        }
      }
      // headings: masked line reveal
      $$('[data-split]', main).forEach(el => {
        const sp = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'sl' });
        gsap.from(sp.lines, { yPercent: 105, duration: 1.05, stagger: .08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
      });
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
        gsap.fromTo(box, { clipPath: 'inset(12% 10% 12% 10% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'power3.out', duration: 1.4, scrollTrigger: { trigger: box, start: 'top 85%' } });
        gsap.fromTo(im, { scale: 1.18, yPercent: -6 }, { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
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
        $$('.pin .halo', m).forEach((h, i) => gsap.to(h, { attr: { r: 34 }, opacity: 0, duration: 2, repeat: -1, delay: i * .4, ease: 'power2.out' }));
      });
    }, main);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  /* ---------- boot ---------- */
  const hexSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${B.icon.viewBox}'><path d='${B.icon.hex}'/></svg>`;
  document.documentElement.style.setProperty('--hexmask', `url("data:image/svg+xml,${encodeURIComponent(hexSvg)}")`);
  buildChrome();
  if (HAS_GSAP) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (!REDUCE && window.Lenis) {
      lenis = new Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', (e) => { ScrollTrigger.update(); syncHeader(e.scroll); hideCimgOnScroll && hideCimgOnScroll(); });
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  if (!lenis) addEventListener('scroll', () => syncHeader(scrollY), { passive: true });
  addEventListener('resize', () => { const h = $('[data-hero]', main); heroBottom = h ? h.offsetHeight : 0; });
  const start = () => render(location.hash, { initial: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
})();
