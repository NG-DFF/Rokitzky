/* Inhalte W. Rokitzky AG. Fakten aus rokitzky.ch und den Unterlagen von Rokitzky, keine erfundenen Angaben. */
window.SITE = {
  /* Adresse für canonical, og:url, og:image, JSON-LD und sitemap.xml. Beim Livegang auf https://www.rokitzky.ch setzen
     und danach scripts/prerender.mjs laufen lassen (README). */
  siteUrl: 'https://rokitzky-website.vercel.app',

  company: {
    name: 'W. Rokitzky AG',
    phone: '044 312 34 41', phoneHref: '+41443123441',
    pikett: '076 434 17 17', pikettHref: '+41764341717',
    mail: 'info@rokitzky.ch', serviceMail: 'service@rokitzky.ch'
  },

  locations: [
    { id: 'wallisellen', name: 'Wallisellen', role: 'Hauptsitz', street: 'Kriesbachstrasse 3b', city: '8304 Wallisellen', phone: '044 312 34 41', href: '+41443123441' },
    { id: 'winterthur', name: 'Winterthur', role: 'Standort', street: 'Riedhofstrasse 67', city: '8408 Winterthur', phone: '052 551 88 99', href: '+41525518899' },
    { id: 'hinwil', name: 'Hinwil', role: 'Standort' },
    { id: 'zuerich', name: 'Zürich', role: 'Standort' }
  ],

  /* Die fünf Bereiche der bisherigen Website */
  areas: [
    {
      slug: 'heizung-kaelte', zu: 'zu Heizung und Kälte', no: '01', band: 'Wir reparieren auch Anlagen, die nicht von uns sind.', title: 'Heizung und Kälte', img: 'heizung-schweissen', pos: '62% 72%', bandImg: 'heli-dach', bandMpos: '76% 50%', cta: ['weste-anschlagen-t', '50% 76%', 'weste-anschlagen', '50% 50%'],
      short: 'Wir planen, bauen, warten und sanieren Heizungsanlagen und Kälteanlagen.',
      lead: 'Ob Neubau oder Sanierung: Wir planen und bauen Heizungsanlagen und Kälteanlagen, halten sie instand und ersetzen bestehende Anlagen. Planern stehen wir als Experten und Berater zur Seite.',
      items: ['Wir planen und bauen neue Heizungsanlagen und Kälteanlagen', 'Wir halten Heizungsanlagen und Kälteanlagen instand', 'Wir sanieren und ersetzen bestehende Anlagen', 'Wir konzipieren Heizsysteme und stehen Planern als Experten und Berater zur Seite', 'Wir reparieren alle Anlagen für Heizung, Lüftung und Klima, auch die, die nicht von uns installiert wurden'],
      related: ['kaelteanlagen', 'sanierungen', 'retrofit', 'waermepumpen-service']
    },
    {
      slug: 'lueftung-klima', zu: 'zu Lüftung und Klima', no: '02', band: 'Seit über 50 Jahren für ein gutes Gebäudeklima.', title: 'Lüftung und Klima', img: 'lueftung-montage', pos: '50% 40%', bandImg: 'holzdecke', bandMpos: '100% 50%', cta: ['lueftung-service-t', '50% 37%', 'lueftung-service', '50% 50%'],
      short: 'Lüftungsanlagen und Klimaanlagen für ein gutes Raumklima.',
      lead: 'Wir konzipieren und bauen Lüftungsanlagen und Klimaanlagen, sanieren und warten sie und verbessern das Raumklima in bestehenden Gebäuden. Zudem beraten wir und erstellen Expertisen.',
      items: ['Wir konzipieren und bauen Lüftungsanlagen und Klimaanlagen', 'Wir sanieren und warten Lüftungsanlagen', 'Wir überprüfen und verbessern das Raumklima', 'Wir beraten und erstellen Expertisen'],
      related: ['lueftungsanlagen', 'klimaanlagen', 'lueftungsreinigung', 'brandschutzklappen']
    },
    {
      slug: 'sanitaer', zu: 'zu Sanitär', no: '03', band: 'Wir planen, installieren und unterhalten Sanitäranlagen.', title: 'Sanitär', img: 'sanitaer-flex', pos: '50% 40%', bandImg: 'pressfittings', bandMpos: '51% 50%', cta: ['rohrgang-team-t', '50% 55%', 'rohrgang-team', '50% 50%'],
      short: 'Vom Einfamilienhaus bis zum ganzen Quartier.',
      lead: 'Wir planen Sanitäranlagen für ein Einfamilienhaus oder ein ganzes Quartier und installieren sie in einer einzelnen Nasszelle oder in einer ganzen Überbauung. Danach unterhalten wir die Systeme.',
      items: ['Wir planen und konzipieren Sanitäranlagen für ein Einfamilienhaus oder ein ganzes Quartier', 'Wir installieren Sanitäranlagen in einer einzigen Nasszelle oder in einer ganzen Überbauung', 'Wir sorgen für Warmwasser, Kaltwasser und Abwasser', 'Wir unterhalten die Systeme', 'Wir erstellen Gutachten und überprüfen Konzepte'],
      related: ['sanierungen', 'umbauten', 'service-wartung']
    },
    {
      slug: 'erneuerbare-energien', zu: 'zu erneuerbaren Energien', no: '04', band: 'Erneuerbare Energien für neue und bestehende Anlagen.', title: 'Erneuerbare Energien', img: 'speicher', pos: '50% 50%', bandImg: 'photovoltaik', bandMpos: '28% 50%', cta: ['weste-dach-t', '50% 58%', 'weste-dach', '50% 50%'],
      short: 'Wärmepumpen, Speicher und thermische Solaranlagen in der Haustechnik.',
      lead: 'Wir binden Wärmepumpen, Speicher und thermische Solaranlagen in die Haustechnik ein und ergänzen bestehende Systeme. Wir kennen uns mit Nahwärmeverbunden und Spezialanlagen aus, bauen Anlagen zur Energierückgewinnung und erstellen Energiesimulationen und Gebäudesimulationen.',
      items: ['Wir binden Wärmepumpen, Speicher und thermische Solaranlagen in die Haustechnik ein', 'Wir ergänzen bestehende Systeme für Heizung, Lüftung und Klima', 'Wir kennen uns mit Nahwärmeverbunden und Spezialanlagen aus', 'Wir bauen Anlagen zur Energierückgewinnung', 'Wir konzipieren und stehen beratend zur Seite', 'Wir erstellen Energiesimulationen und Gebäudesimulationen'],
      related: ['energetische-modernisierung', 'waermepumpen-service', 'retrofit']
    },
    {
      slug: 'service-unterhalt', zu: 'zu Service und Unterhalt', no: '05', band: 'Pikettdienst rund um die Uhr: 076 434 17 17.', title: 'Service und Unterhalt', img: 'service-check', pos: '62% 45%', bandImg: 'service-tablet', bandMpos: '30% 50%', cta: ['abstimmung-t', '50% 71%', 'abstimmung', '50% 50%'],
      short: 'Wartung, Service und Pikettdienst rund um die Uhr.',
      lead: 'Wir kümmern uns nach der Inbetriebnahme um Service und Unterhalt Ihrer Anlagen für Heizung, Lüftung, Klima und Sanitär, kennen die Servicezyklen und planen die regelmässigen Wartungen über die gesamte Lebensdauer, auch bei Anlagen, die nicht wir installiert haben.',
      items: ['Wir kümmern uns nach der Inbetriebnahme um Service und Unterhalt', 'Wir kennen die Servicezyklen und planen die regelmässigen Wartungen', 'Wir betreuen auch Anlagen, die nicht wir installiert haben', 'Unser Pikettdienst ist 24/7 erreichbar: 076 434 17 17'],
      related: ['service-wartung', 'wartungsvertraege', 'stoerungsdienst-pikett', 'waermepumpen-service']
    }
  ],

  /* Schwerpunkte für Google und KI Suche */
  groups: [
    { id: 'klima', title: 'Klima und Kälte', items: ['klimaanlagen', 'kaelteanlagen', 'retrofit'] },
    { id: 'lueftung', title: 'Lüftung', items: ['lueftungsanlagen', 'lueftungsreinigung', 'brandschutzklappen'] },
    { id: 'service', title: 'Service', items: ['service-wartung', 'wartungsvertraege', 'stoerungsdienst-pikett', 'waermepumpen-service'] },
    { id: 'sanierung', title: 'Sanierung', items: ['sanierungen', 'umbauten', 'energetische-modernisierung'] }
  ],

  focus: {
    'klimaanlagen': {
      title: 'Klimaanlagen', zu: 'zu Klimaanlagen', group: 'klima', img: 'klima-kleber', m: 'klima-kleber-t', pos: '50% 50%', mpos: '20% 50%', cta: ['klima-kran-t', '50% 71%', 'klima-kran', '50% 50%'],
      h1: 'Klimaanlagen', sub: 'Planung, Einbau und Service',
      lead: 'Wir konzipieren und bauen Klimaanlagen, warten sie und verbessern das Raumklima in bestehenden Gebäuden.',
      items: ['Beratung und Planung', 'Einbau und Inbetriebnahme', 'Wartung und Service', 'Ersatz und Modernisierung bestehender Anlagen', 'Störungsbehebung über den Pikettdienst'],
      faq: [
        ['Übernehmen Sie Planung, Einbau und Service?', 'Ja. Wir konzipieren, bauen und warten Klimaanlagen und begleiten die Anlage über die ganze Lebensdauer.'],
        ['Warten Sie auch Klimaanlagen, die Sie nicht selbst eingebaut haben?', 'Ja. Wir planen die Servicezyklen auch für Anlagen, die nicht von uns gebaut wurden.']
      ]
    },
    'kaelteanlagen': {
      title: 'Kälteanlagen', zu: 'zu Kälteanlagen', group: 'klima', img: 'kaelte-kran', m: 'kaelte-kran-t', pos: '50% 50%', mpos: '34% 50%', cta: ['kran-fuehren-t', '50% 65%', 'kran-fuehren', '50% 50%'],
      h1: 'Kälteanlagen', sub: 'Planung, Bau, Wartung und Sanierung',
      lead: 'Wir planen, bauen, warten und sanieren Kälteanlagen und reparieren auch Anlagen, die nicht von uns stammen.',
      items: ['Planung und Bau', 'Wartung und Service', 'Sanierung bestehender Kälteanlagen', 'Reparaturen an Fremdanlagen', 'Pikettdienst rund um die Uhr'],
      faq: [
        ['Reparieren Sie auch Kälteanlagen anderer Installateure?', 'Ja. Wir reparieren und warten auch Anlagen, die nicht von uns gebaut wurden.'],
        ['Was tun bei einer Störung ausserhalb der Bürozeiten?', 'Unser Pikettdienst ist 24/7 unter 076 434 17 17 erreichbar.']
      ]
    },
    'retrofit': {
      title: 'Retrofit', zu: 'zu Retrofit', group: 'klima', img: 'monteur-himmel', m: 'monteur-himmel-t', pos: '50% 50%', mpos: '100% 50%', cta: ['weste-kranlast-t', '50% 76%', 'weste-kranlast', '50% 50%'],
      h1: 'Retrofit', sub: 'Bestehende Anlagen modernisieren',
      lead: 'Nicht jede Anlage muss ersetzt werden. Wir prüfen den Bestand, erweitern bestehende Haustechnik gezielt und binden neue Komponenten und erneuerbare Energien sauber ein.',
      items: ['Analyse der bestehenden Anlage', 'Gezielte Erweiterung bestehender Haustechnik', 'Einbindung erneuerbarer Energien', 'Service nach dem Umbau'],
      faq: [
        ['Lohnt sich ein Retrofit statt einer neuen Anlage?', 'Das hängt vom Zustand der Anlage ab. Wir prüfen den Bestand vor Ort und besprechen mit Ihnen, was sinnvoll ist.'],
        ['Arbeiten Sie auch an Anlagen anderer Hersteller?', 'Ja. Wir arbeiten auch an Anlagen, die nicht von uns gebaut wurden.']
      ]
    },
    'lueftungsanlagen': {
      title: 'Lüftungsanlagen', zu: 'zu Lüftungsanlagen', group: 'lueftung', img: 'halle-geraete', m: 'halle-geraete-t', pos: '50% 50%', mpos: '28% 50%', cta: ['halle-team-t', '50% 76%', 'halle-team', '50% 50%'],
      h1: 'Lüftungsanlagen', sub: 'Planung, Bau und Service',
      lead: 'Wir planen und bauen Lüftungsanlagen, betreuen sie im Service und verbessern das Raumklima in bestehenden Gebäuden. Dazu beraten wir und erstellen Gutachten.',
      items: ['Planung und Bau', 'Service und Wartung', 'Verbesserung des Raumklimas', 'Beratung und Gutachten', 'Wärmerückgewinnung'],
      faq: [
        ['Können Sie das Raumklima in einem bestehenden Gebäude verbessern?', 'Ja. Die Verbesserung des Raumklimas in bestehenden Gebäuden gehört zu unseren Aufgaben, inklusive Beratung und Gutachten.'],
        ['Bauen Sie auch Lüftungsanlagen mit Wärmerückgewinnung?', 'Ja. Wärmerückgewinnung ist Teil unserer Leistungen.']
      ]
    },
    'lueftungsreinigung': {
      title: 'Lüftungsreinigung', zu: 'zur Lüftungsreinigung', group: 'lueftung', img: 'rohre-detail', m: 'rohre-detail-t', pos: '50% 50%', mpos: '88% 50%', cta: ['geraet-oeffnen-team-t', '50% 71%', 'geraet-oeffnen-team', '50% 50%'],
      h1: 'Lüftungsreinigung', sub: 'Reinigung, Filterwechsel und Dokumentation',
      lead: 'Wir reinigen Lüftungsanlagen, wechseln Filter und dokumentieren den Zustand Ihrer Anlage.',
      items: ['Reinigung von Lüftungsanlagen', 'Filterwechsel', 'Kontrolle und Dokumentation', 'Empfehlungen für die nächsten Servicezyklen'],
      faq: [
        ['Kann die Reinigung mit der Wartung kombiniert werden?', 'Ja. Wir stimmen Reinigung und Wartung aufeinander ab.'],
        ['Reinigen Sie auch Anlagen, die Sie nicht gebaut haben?', 'Ja. Wir betreuen auch Anlagen anderer Installateure.']
      ]
    },
    'brandschutzklappen': {
      title: 'Brandschutzklappen', zu: 'zu Brandschutzklappen', group: 'lueftung', img: 'decke-installationen', m: 'decke-installationen-t', pos: '50% 50%', mpos: '42% 50%', cta: ['begehung-decke-t', '50% 65%', 'begehung-decke', '50% 50%'],
      h1: 'Brandschutzklappen', sub: 'Kontrolle und Instandhaltung',
      lead: 'Brandschutzklappen müssen im Ernstfall funktionieren. Wir kontrollieren Brandschutzklappen in Lüftungsanlagen, dokumentieren den Zustand und beheben Mängel.',
      items: ['Funktionskontrolle', 'Dokumentation', 'Instandsetzung bei Mängeln', 'Abstimmung mit Service und Lüftungsreinigung'],
      faq: [
        ['Kann die Kontrolle mit dem Lüftungsservice kombiniert werden?', 'Ja. Wir stimmen die Kontrolle der Brandschutzklappen mit Service und Reinigung ab.'],
        ['Erhalte ich eine Dokumentation?', 'Ja. Wir dokumentieren den Zustand der kontrollierten Brandschutzklappen.']
      ]
    },
    'service-wartung': {
      title: 'Service und Wartung', zu: 'zu Service und Wartung', group: 'service', img: 'steuerung-service', m: 'steuerung-service-t', pos: '50% 50%', mpos: '82% 50%', cta: ['monteur-kniend-t', '50% 37%', 'monteur-kniend', '50% 50%'],
      h1: 'Service und Wartung', sub: 'Für Heizung, Lüftung, Klima, Kälte und Sanitär',
      lead: 'Nach der Inbetriebnahme kümmern wir uns um Service und Unterhalt. Wir warten Ihre Anlagen regelmässig, planen die Servicezyklen über die ganze Lebensdauer und sind bei Störungen rund um die Uhr erreichbar.',
      items: ['Regelmässige Wartung', 'Servicezyklen über die ganze Lebensdauer', 'Service auch für Fremdanlagen', 'Pikettdienst 24/7'],
      faq: [
        ['Warten Sie auch Anlagen, die Sie nicht selbst gebaut haben?', 'Ja. Wir planen Servicezyklen auch für Anlagen anderer Installateure.'],
        ['Wie erreiche ich den Service?', 'Per Mail an service@rokitzky.ch oder telefonisch unter 044 312 34 41. Bei Störungen über den Pikettdienst 076 434 17 17.']
      ]
    },
    'wartungsvertraege': {
      title: 'Wartungsverträge', zu: 'zu Wartungsverträgen', group: 'service', img: 'service-kleber', m: 'service-kleber-t', pos: '50% 50%', mpos: '20% 50%', cta: ['tablet-weste-t', '50% 37%', 'tablet-weste', '50% 50%'],
      h1: 'Wartungsverträge', sub: 'Servicezyklen über die ganze Lebensdauer',
      lead: 'Mit einem Wartungsvertrag planen wir die Servicezyklen Ihrer Anlage über die ganze Lebensdauer. Die Wartungen führen wir regelmässig nach Plan durch.',
      items: ['Regelmässige Wartung nach Plan', 'Persönliche Betreuung', 'Auch für Anlagen anderer Installateure', 'Pikettdienst rund um die Uhr'],
      faq: [
        ['Gibt es Wartungsverträge auch für bestehende Anlagen?', 'Ja. Wir übernehmen den Service auch für Anlagen, die nicht von uns gebaut wurden.'],
        ['Wie kommen wir zu einem Wartungsvertrag?', 'Schreiben Sie an service@rokitzky.ch. Wir besprechen Ihre Anlage und machen Ihnen ein Angebot.']
      ]
    },
    'stoerungsdienst-pikett': {
      title: 'Störungsdienst und Pikett', zu: 'zu Störungsdienst und Pikett', group: 'service', img: 'speicher-steuerung', m: 'speicher-steuerung-t', pos: '50% 50%', mpos: '0% 50%', cta: ['westen-tuer-t', '50% 63%', 'westen-tuer', '50% 50%'],
      h1: 'Pikettdienst 24/7', sub: 'Störungsdienst rund um die Uhr',
      lead: 'Seit 2013 erreichen Sie unseren Pikettdienst rund um die Uhr, auch nachts und am Wochenende.',
      items: ['Erreichbar 24/7 unter 076 434 17 17', 'Für Heizung, Lüftung, Klima, Kälte und Sanitär', 'Auch nachts und am Wochenende', 'Den Pikettdienst gibt es seit 2013'],
      faq: [
        ['Wann ist der Pikettdienst erreichbar?', 'Rund um die Uhr, 24/7, unter 076 434 17 17.'],
        ['Seit wann gibt es den Pikettdienst?', 'Seit 2013, rund um die Uhr unter 076 434 17 17.']
      ]
    },
    'waermepumpen-service': {
      title: 'Wärmepumpenservice', zu: 'zum Wärmepumpenservice', group: 'service', img: 'waermepumpe-service', m: 'waermepumpe-service-t', pos: '50% 50%', mpos: '30% 50%', cta: ['aussengeraet-team-t', '50% 32%', 'aussengeraet-team', '50% 50%'],
      h1: 'Wärmepumpenservice', sub: 'Einbindung, Wartung und Störungsbehebung',
      lead: 'Wir binden Wärmepumpen in bestehende und neue Anlagen ein, warten sie und sind bei Störungen über den Pikettdienst rund um die Uhr erreichbar.',
      items: ['Einbindung von Wärmepumpen und Speichern', 'Wartung und Service', 'Störungsbehebung 24/7', 'Erweiterung bestehender Anlagen'],
      faq: [
        ['Warten Sie auch Wärmepumpen, die Sie nicht eingebaut haben?', 'Ja. Wir übernehmen den Service auch für Anlagen anderer Installateure.'],
        ['Was tun, wenn die Wärmepumpe ausfällt?', 'Rufen Sie unseren Pikettdienst an: 076 434 17 17, rund um die Uhr.']
      ]
    },
    'sanierungen': {
      title: 'Sanierungen', zu: 'zu Sanierungen', group: 'sanierung', img: 'technikgang', m: 'technikgang-t', pos: '50% 50%', mpos: '40% 50%', cta: ['installationen-schacht-t', '50% 76%', 'installationen-schacht', '50% 50%'],
      h1: 'Sanierungen', sub: 'Heizung, Lüftung, Klima, Kälte und Sanitär',
      lead: 'Wir sanieren Heizungsanlagen, Kälteanlagen, Lüftungsanlagen und Sanitäranlagen. Zuerst prüfen wir den Bestand, dann besprechen wir mit Ihnen die Möglichkeiten.',
      items: ['Heizungssanierung', 'Sanierung von Kälteanlagen', 'Lüftungssanierung', 'Sanitärsanierung', 'Umstieg auf erneuerbare Energien'],
      faq: [
        ['Begleiten Sie die Sanierung von der Planung bis zum Service?', 'Ja. Wir planen, führen aus und übernehmen danach den Service.'],
        ['Können erneuerbare Energien eingebunden werden?', 'Ja. Wir binden Wärmepumpen, Speicher und Solarthermie in bestehende Anlagen ein.']
      ]
    },
    'umbauten': {
      title: 'Umbauten', zu: 'zu Umbauten', group: 'sanierung', img: 'decke-klima', pos: '50% 20%', cta: ['umbau-jacken-t', '50% 50%', 'umbau-jacken', '50% 50%'],
      h1: 'Umbauten', sub: 'Haustechnik bei Umbau und Erweiterung',
      lead: 'Bei Umbauten passen wir die Haustechnik an: Wir erweitern bestehende Anlagen, planen neue Installationen und führen alles sauber aus.',
      items: ['Erweiterung bestehender Haustechnik', 'Neue Installationen für Heizung, Lüftung und Sanitär', 'Planung und Ausführung', 'Service nach dem Umbau'],
      faq: [
        ['Übernehmen Sie alle Gewerke der Haustechnik?', 'Wir können Heizung und Kälte, Lüftung und Klima, Sanitär sowie Service und Unterhalt und koordinieren diese Bereiche im eigenen Haus.'],
        ['Arbeiten Sie auch für Planer?', 'Ja. Wir unterstützen Planerinnen und Planer auch als Fachberater.']
      ]
    },
    'energetische-modernisierung': {
      title: 'Energetische Modernisierung', zu: 'zur energetischen Modernisierung', group: 'sanierung', img: 'heizung-rohre', m: 'heizung-rohre-t', pos: '50% 50%', mpos: '27% 50%', cta: ['umbau-team-t', '50% 63%', 'umbau-team', '50% 50%'],
      h1: 'Energetische Modernisierung', sub: 'Erneuerbare Energien und Wärmerückgewinnung',
      lead: 'Wir modernisieren Haustechnik energetisch: mit Wärmepumpen, Speichern und Solarthermie, mit Wärmerückgewinnung und der Anbindung an Wärmeverbünde. Energiesimulationen und Gebäudesimulationen zeigen, was sich lohnt.',
      items: ['Wärmepumpen, Speicher und Solarthermie', 'Wärmerückgewinnung', 'Anbindung an Wärmeverbünde', 'Energiesimulation und Gebäudesimulation'],
      faq: [
        ['Kennen Sie sich mit Wärmeverbünden aus?', 'Ja. Wir kennen uns mit Nahwärmeverbunden und Spezialanlagen aus und binden Anlagen an Wärmeverbünde an.'],
        ['Können Sie vorab berechnen, was eine Modernisierung bringt?', 'Ja. Wir erstellen Energiesimulationen und Gebäudesimulationen.']
      ]
    }
  },

  timeline: [
    ['1970', 'Gründung in Embrach', 'Werner Rokitzky startet als Einmannbetrieb in Embrach.'],
    ['1972', 'Erster Mitarbeiter', 'Aus dem Einmannbetrieb wird ein Zweimannbetrieb: Ein Sanitärinstallateur wird eingestellt.'],
    ['1985', 'Erster Lehrling', 'Der erste Lehrling als Sanitärinstallateur beginnt seine Lehre bei Rokitzky.'],
    ['1987', 'W. Rokitzky AG', 'Aus der Einzelfirma wird die Aktiengesellschaft W. Rokitzky AG.'],
    ['2011', 'Generationenwechsel', 'Werner Rokitzky verkauft seine AG an die nächste Generation.'],
    ['2013', 'Pikettdienst', 'Wir führen den Pikettdienst ein. Seither sind wir rund um die Uhr erreichbar: 076 434 17 17.'],
    ['2019', 'Über 50 Mitarbeitende', 'Wir zählen mehr als fünfzig festangestellte Mitarbeiterinnen und Mitarbeiter.'],
    ['2020', 'K3 Handwerkcity', 'Wir beziehen unsere neuen Büroräume in der K3 Handwerkcity in Wallisellen.'],
    ['2023', 'Winterthur', 'Wir beziehen unsere neuen Büroräume im Gewerbehaus Taggenberg in Winterthur.'],
    ['Heute', 'Über 80 Mitarbeitende', 'Vier Standorte: Wallisellen, Winterthur, Hinwil und Zürich.']
  ],


  portraits: ['portrait-1', 'portrait-2', 'portrait-3', 'portrait-4', 'portrait-5', 'portrait-6', 'portrait-7'],
  apprenticeships: ['Heizungsinstallateur/in EFZ', 'Sanitärinstallateur/in EFZ', 'Gebäudetechnikplaner/in EFZ', 'Lüftungsanlagenbauer/in EFZ', 'Kaufmann/Kauffrau EFZ'],

  /* TODO K03: Offene Stellen von Rokitzky. Jede Stelle bekommt eine eigene Seite /karriere/<slug>/ mit JobPosting für Google for Jobs.
     Nur bestätigte Angaben eintragen. Beispiel:
     { slug: 'servicetechniker-heizung', title: 'Servicetechniker/in Heizung', pensum: '100 %', ort: 'Wallisellen', loc: 'wallisellen',
       start: 'nach Vereinbarung', anstellung: 'FULL_TIME', datePosted: '2026-12-01', validThrough: '2027-03-31',
       lead: 'Ein Satz zur Stelle.', aufgaben: ['…'], profil: ['…'], angebot: ['…'] } */
  jobs: [],

  /* TODO K03: Ansprechperson für Bewerbungen (Name oder Funktion). Bis dahin gelten Hauptnummer und info@rokitzky.ch. */
  careerContact: null,

  /* TODO K03/K09: Recruitingvideos für die Karriereseite, z. B. { src: '/media/recruiting.mp4', poster: '/img/….webp', title: '…' } */
  recruitingVideo: null,
  documents: ['Bewerbungsschreiben', 'Lebenslauf', 'Alle Zeugnisse'],

  team: {
    owners: [["Michele Fiorito", "Inhaber und CEO", "michele-fiorito"], ["Siniša Stojković", "Inhaber und COO", "sinisa-stojkovic"], ["Vincenzo Aquilino", "Inhaber, Mitglied der Geschäftsleitung", "vincenzo-aquilino"]],
    groups: [
      {"id": "leitung", "title": "Geschäftsleitung und Administration", "people": [["Dietmar Zipper", "Mitglied der Geschäftsleitung", "dietmar-zipper"], ["Aurora Machado", "Assistentin der Geschäftsleitung", "aurora-machado"], ["Luisa Salza", "Finanzen und Administration", "luisa-salza"], ["Edyta Manuszewska", "Buchhaltung und HR", "edyta-manuszewska"], ["Maria Ciardo", "Finanzen und Mahnwesen", "maria-ciardo"], ["Aleksandra Stevanovic", "Mitarbeiterin Kalkulation", "aleksandra-stevanovic"], ["Jetmir Berisha", "Kaufmännischer Angestellter Kalkulation", "jetmir-berisha"], ["Vincent Aquilino", "Technischer Sachbearbeiter", "vincent-aquilino"]]},
      {"id": "heizung", "title": "Heizung und Kälte", "people": [["Fatlum Iseni", "Abteilungsleiter Heizung und Kälte", "fatlum-iseni"], ["Patrick Roshardt", "Senior Projektleiter Heizung und Kälte", "patrick-roshardt"], ["Aleksandar Jovanovic", "Projektleiter Heizung und Kälte", "aleksandar-jovanovic"], ["Driton Hoti", "Projektleiter Heizung und Kälte", "driton-hoti"], ["Faton Maroca", "Projektleiter Heizung und Kälte", "faton-maroca"], ["Ricardo Fernandes", "Projektleiter Heizung und Kälte", "ricardo-fernandes"], ["Mustafa Aliji", "Junior Projektleiter Heizung und Kälte", "mustafa-aliji"], ["Benjamin Hamiti", "Teamleiter Heizung und Kälte", "benjamin-hamiti"], ["Rasim Shala", "Teamleiter Heizung und Kälte", "rasim-shala"], ["Asim Polisi", "Montageleiter Heizung und Kälte", "asim-polisi"], ["Bojan Maksimovic", "Montageleiter Heizung und Kälte", "bojan-maksimovic"]]},
      {"id": "lueftung", "title": "Lüftung und Klima", "people": [["Gert Müller", "Senior Projektleiter Lüftung und Klima", "gert-muller"], ["Anna Bernhard", "Projektleiterin Lüftung und Klima", "anna-bernhard"], ["Christian Klepel", "Projektleiter Lüftung und Klima", "christian-klepel"], ["Dani De Masi", "Projektleiter Lüftung und Klima", "dani-de-masi"], ["Michel Kwizera", "Projektleiter Lüftung und Klima", "michel-kwizera"], ["Salvatore Toma", "Projektleiter Lüftung", "salvatore-toma"], ["Yanick Wüthrich", "Junior Projektleiter Lüftung", "yanick-wuthrich"], ["Timeo Cantore", "Teamleiter Lüftung und Klima", "timeo-cantore"], ["Antonio Marques", "Chefmonteur Lüftung", "antonio-marques"], ["Francesco Bisanti", "Montageleiter Lüftung und Klima", "francesco-bisanti"]]},
      {"id": "sanitaer", "title": "Sanitär", "people": [["Jovan Mitrovic", "Abteilungsleiter Sanitär", "jovan-mitrovic"], ["Nenad Petkovic", "Projektleiter Sanitär", "nenad-petkovic"], ["David Borsi", "Sicherheitsbeauftragter und Montageleiter Sanitär", "david-borsi"]]},
      {"id": "service", "title": "Service", "people": [["Antonio Li Fraine", "Abteilungsleiter Service", "antonio-li-fraine"], ["Ekrem Kasami", "Abteilungsleiter Service HLKS", "ekrem-kasami"], ["René Glauser", "Abteilungsleiter Service HLKS", "rene-glauser"], ["Kristian Grgic", "Serviceleiter Lüftung und Klima", "kristian-grgic"], ["Alfredo Lenti", "Servicetechniker Lüftung und Klima", "alfredo-lenti"], ["Maximilian Nebel", "Servicetechniker Sanitär und Heizung", "maximilian-nebel"], ["Oleksii Rubel", "Servicetechniker Sanitär", "oleksii-rubel"], ["Roger Glauser", "Servicetechniker HLKS", "roger-glauser"], ["Srdan Stevanovic", "Servicetechniker Heizung und Kälte", "srdan-stevanovic"]]},
      {"id": "koordination", "title": "Koordination und Elektro", "people": [["Besir Iseni", "Baustellenkoordinator", "besir-iseni"], ["Orhan Salimovic", "Baustellenkoordinator", "orhan-salimovic"], ["Georg Braun", "Teamleiter Elektro und MSRL", "georg-braun"]]},
      {"id": "lernende", "title": "Lernende", "people": [["Ajan Bunjaku", "Lernender Gebäudetechnikplaner Heizung", "ajan-bunjaku"], ["Albin Mustafa", "Lernender Gebäudetechnikplaner Heizung", "albin-mustafa"], ["Anees Aljlji", "Lernender Heizungsinstallateur", "anees-aljlji"], ["Asim Hakaj", "Lernender Heizungsinstallateur", "asim-hakaj"], ["Bleon Haxhaj", "Lernender Sanitärinstallateur", "bleon-haxhaj"], ["Blertan Ramani", "Lernender Heizungsinstallateur", "blertan-ramani"], ["Dani Ramic", "Lernender Gebäudetechnikplaner Heizung", "dani-ramic"], ["David Medaglia", "Lernender Kaufmann", "david-medaglia"], ["Diego Wechsler", "Lernender Gebäudetechnikplaner Lüftung", "diego-wechsler"], ["Elio Föstl", "Lernender Gebäudetechnikplaner Sanitär", "elio-fostl"], ["Elisa Carole Sandra Imhof", "Lernende Gebäudetechnikplanerin Lüftung", "elisa-carole-sandra-imhof"], ["Emir Aliji", "Lernender Gebäudetechnikplaner Heizung", "emir-aliji"], ["Ertian Polisi", "Lernender Gebäudetechnikplaner Heizung", "ertian-polisi"], ["Francesco Esposito", "Lernender Gebäudetechnikplaner Lüftung", "francesco-esposito"], ["Illia Rybalka", "Lernender Heizungsinstallateur", "illia-rybalka"], ["Imran Odzini", "Lernender Gebäudetechnikplaner Lüftung", "imran-odzini"], ["Isa Emschi", "Lernender Gebäudetechnikplaner Heizung", "isa-emschi"], ["Isadora Bosshard", "Lernende Kauffrau", "isadora-bosshard"], ["Leon Ajrizi", "Lernender Gebäudetechnikplaner Lüftung", "leon-ajrizi"], ["Leon Zahiri", "Lernender Gebäudetechnikplaner Lüftung", "leon-zahiri"], ["Marko Stevanovic", "Lernender Heizungsinstallateur", "marko-stevanovic"], ["Milan Stevanovic", "Lernender Heizungsinstallateur", "milan-stevanovic"], ["Nenad Mihajlovic", "Lernender Heizungsinstallateur", "nenad-mihajlovic"], ["Nico Roshardt", "Lernender Heizungsinstallateur", "nico-roshardt"], ["Victor Manuel Leon Contreras", "Lernender Heizungsinstallateur", "victor-manuel-leon-contreras"], ["Yannis Rüd", "Lernender Gebäudetechnikplaner Lüftung", "yannis-rud"]]}
    ]
  },

  /* TODO B15: Die drei PDFs liegen noch auf der heutigen Website und verschwinden beim Livegang.
     Dateien in /docs/ ablegen und hier relativ verlinken, z. B. '/docs/IGCH-Verhaltenskodex-v01.06.26.pdf'. */
  legal: [
    ['Verhaltenskodex', 'https://rokitzky.ch/assets/images/IGCH-Verhaltenskodex-v01.06.26.pdf'],
    ['Verhaltenskodex für Lieferanten', 'https://rokitzky.ch/assets/images/IGCH-Verhaltenskodex-f%C3%BCr-Lieferanten-v01.06.26.pdf'],
    ['Whistleblower Richtlinie', 'https://rokitzky.ch/assets/images/IGCH-Whistleblower-Richtlinie-v01.06.26.pdf']
  ],

  social: [
    ['Instagram', 'https://www.instagram.com/w.rokitzky/'],
    ['LinkedIn', 'https://ch.linkedin.com/company/w-rokitzky-ag'],
    ['Facebook', 'https://www.facebook.com/RokitzkyAG/']
  ]
};
