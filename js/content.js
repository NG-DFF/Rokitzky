/* Inhalte W. Rokitzky AG. Fakten aus rokitzky.ch und den Unterlagen von Rokitzky, keine erfundenen Angaben. */
window.SITE = {
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
      slug: 'heizung-kaelte', no: '01', band: 'Wir verbauen, was wir versprechen.', title: 'Heizung und Kälte', img: 'heizung-schweissen', pos: '62% 72%',
      short: 'Wir planen, bauen, warten und sanieren Heizungsanlagen und Kälteanlagen.',
      lead: 'Ob Neubau oder Sanierung: Wir planen, bauen, warten und sanieren Heizungsanlagen und Kälteanlagen. Als Fachberater unterstützen wir Planer bei der Auslegung, und wir reparieren auch Anlagen, die nicht von uns gebaut wurden.',
      items: ['Planung, Bau und Inbetriebnahme von Heizungsanlagen', 'Planung, Bau und Wartung von Kälteanlagen', 'Sanierung bestehender Anlagen', 'Fachberatung für Planerinnen und Planer bei der Auslegung', 'Reparaturen auch an Fremdanlagen'],
      related: ['kaelteanlagen', 'sanierungen', 'retrofit', 'waermepumpen-service']
    },
    {
      slug: 'lueftung-klima', no: '02', band: 'Gutes Klima ist kein Zufall.', title: 'Lüftung und Klima', img: 'lueftung-montage', pos: '50% 40%',
      short: 'Lüftungsanlagen und Klimaanlagen für ein gesundes Raumklima.',
      lead: 'Gute Luft ist kein Zufall. Wir planen und bauen Lüftungsanlagen und Klimaanlagen, betreuen sie im Service, verbessern das Raumklima bestehender Gebäude und stehen mit Beratung und Gutachten zur Seite.',
      items: ['Planung und Bau von Lüftungsanlagen und Klimaanlagen', 'Service und Wartung', 'Verbesserung des Raumklimas in bestehenden Gebäuden', 'Beratung und Gutachten'],
      related: ['lueftungsanlagen', 'klimaanlagen', 'lueftungsreinigung', 'brandschutzklappen']
    },
    {
      slug: 'sanitaer', no: '03', band: 'Jeder Handgriff sitzt.', title: 'Sanitär', img: 'sanitaer-flex', pos: '50% 40%',
      short: 'Vom Einfamilienhaus bis zum ganzen Quartier.',
      lead: 'Vom Einfamilienhaus bis zum ganzen Quartier planen und installieren wir Sanitäranlagen. Wir warten Warmwasser, Kaltwasser und Abwasser und erstellen Gutachten.',
      items: ['Planung und Installation von Sanitäranlagen', 'Wartung von Warmwasser, Kaltwasser und Abwasser', 'Gutachten', 'Sanitär bei Umbauten und Sanierungen'],
      related: ['sanierungen', 'umbauten', 'service-wartung']
    },
    {
      slug: 'erneuerbare-energien', no: '04', band: 'Wir verbauen, was wir versprechen.', title: 'Erneuerbare Energien', img: 'speicher', pos: '50% 50%',
      short: 'Wärmepumpen, Speicher und Solarthermie, sauber eingebunden.',
      lead: 'Wir binden Wärmepumpen, Speicher und Solarthermie in Ihr Gebäude ein, erweitern bestehende Anlagen, arbeiten mit Wärmeverbünden, bauen Wärmerückgewinnung und erstellen Energiesimulationen und Gebäudesimulationen.',
      items: ['Wärmepumpen, Speicher und Solarthermie', 'Erweiterung bestehender Haustechnik', 'Anbindung an Wärmeverbünde', 'Wärmerückgewinnung', 'Energiesimulation und Gebäudesimulation'],
      related: ['energetische-modernisierung', 'waermepumpen-service', 'retrofit']
    },
    {
      slug: 'service-unterhalt', no: '05', band: '24/7 persönlich für Sie da.', title: 'Service und Unterhalt', img: 'service-check', pos: '62% 45%',
      short: 'Nach der Inbetriebnahme sind wir weiter für Sie da. Rund um die Uhr.',
      lead: 'Nach der Inbetriebnahme fängt unsere Arbeit erst richtig an. Wir warten Ihre Anlagen, planen die Servicezyklen über die ganze Lebensdauer, auch für Anlagen, die wir nicht selbst gebaut haben, und sind mit dem Pikettdienst rund um die Uhr erreichbar.',
      items: ['Wartung nach der Inbetriebnahme', 'Servicezyklen über die ganze Lebensdauer', 'Service auch für Fremdanlagen', 'Pikettdienst 24/7'],
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
      title: 'Klimaanlagen', group: 'klima', img: 'decke-klima', pos: '50% 70%',
      h1: 'Klimaanlagen', sub: 'Planung, Einbau und Service',
      lead: 'Wir beraten, planen, bauen und warten Klimaanlagen. Alles aus einer Hand, vom ersten Gespräch bis zum Service.',
      items: ['Beratung und Planung', 'Einbau und Inbetriebnahme', 'Wartung und Service', 'Ersatz und Modernisierung bestehender Anlagen', 'Störungsbehebung über den Pikettdienst'],
      faq: [
        ['Übernehmen Sie Planung und Einbau aus einer Hand?', 'Ja. Wir beraten, planen, bauen und warten Klimaanlagen und begleiten die Anlage über die ganze Lebensdauer.'],
        ['Warten Sie auch Klimaanlagen, die Sie nicht selbst eingebaut haben?', 'Ja. Wir planen die Servicezyklen auch für Anlagen, die nicht von uns gebaut wurden.']
      ]
    },
    'kaelteanlagen': {
      title: 'Kälteanlagen', group: 'klima', img: 'kaelte-dach', pos: '60% 60%',
      h1: 'Kälteanlagen', sub: 'Planung, Bau, Wartung und Sanierung',
      lead: 'Kälte gehört bei uns zur Haustechnik dazu. Wir planen, bauen, warten und sanieren Kälteanlagen und reparieren auch Anlagen, die nicht von uns stammen.',
      items: ['Planung und Bau', 'Wartung und Service', 'Sanierung bestehender Kälteanlagen', 'Reparaturen an Fremdanlagen', 'Pikettdienst rund um die Uhr'],
      faq: [
        ['Reparieren Sie auch Kälteanlagen anderer Installateure?', 'Ja. Wir reparieren und warten auch Anlagen, die nicht von uns gebaut wurden.'],
        ['Was tun bei einer Störung ausserhalb der Bürozeiten?', 'Unser Pikettdienst ist 24/7 unter 076 434 17 17 erreichbar.']
      ]
    },
    'retrofit': {
      title: 'Retrofit', group: 'klima', img: 'speicher', pos: '35% 50%',
      h1: 'Retrofit', sub: 'Bestehende Anlagen modernisieren',
      lead: 'Nicht jede Anlage muss ersetzt werden. Wir prüfen den Bestand, erweitern bestehende Haustechnik gezielt und binden neue Komponenten und erneuerbare Energien sauber ein.',
      items: ['Analyse der bestehenden Anlage', 'Gezielte Erweiterung bestehender Haustechnik', 'Einbindung erneuerbarer Energien', 'Service nach dem Umbau'],
      faq: [
        ['Lohnt sich ein Retrofit statt einer neuen Anlage?', 'Das hängt vom Zustand der Anlage ab. Wir prüfen den Bestand vor Ort und besprechen mit Ihnen, was sinnvoll ist.'],
        ['Arbeiten Sie auch an Anlagen anderer Hersteller?', 'Ja. Wir arbeiten auch an Anlagen, die nicht von uns gebaut wurden.']
      ]
    },
    'lueftungsanlagen': {
      title: 'Lüftungsanlagen', group: 'lueftung', img: 'lueftung-montage', pos: '50% 35%',
      h1: 'Lüftungsanlagen', sub: 'Planung, Bau und Service',
      lead: 'Wir planen und bauen Lüftungsanlagen, betreuen sie im Service und verbessern das Raumklima in bestehenden Gebäuden. Mit Beratung und Gutachten, wenn es darauf ankommt.',
      items: ['Planung und Bau', 'Service und Wartung', 'Verbesserung des Raumklimas', 'Beratung und Gutachten', 'Wärmerückgewinnung'],
      faq: [
        ['Können Sie das Raumklima in einem bestehenden Gebäude verbessern?', 'Ja. Die Verbesserung des Raumklimas in bestehenden Gebäuden gehört zu unseren Aufgaben, inklusive Beratung und Gutachten.'],
        ['Bauen Sie auch Lüftungsanlagen mit Wärmerückgewinnung?', 'Ja. Wärmerückgewinnung ist Teil unserer Leistungen.']
      ]
    },
    'lueftungsreinigung': {
      title: 'Lüftungsreinigung', group: 'lueftung', img: 'lueftung-halle', pos: '70% 30%',
      h1: 'Lüftungsreinigung', sub: 'Für saubere Anlagen und gute Raumluft',
      lead: 'Eine Lüftungsanlage ist nur so gut wie ihr Zustand. Wir reinigen Lüftungsanlagen, wechseln Filter und halten den Zustand Ihrer Anlage nachvollziehbar fest.',
      items: ['Reinigung von Lüftungsanlagen', 'Filterwechsel', 'Kontrolle und Dokumentation', 'Empfehlungen für die nächsten Servicezyklen'],
      faq: [
        ['Kann die Reinigung mit der Wartung kombiniert werden?', 'Ja. Wir stimmen Reinigung und Wartung aufeinander ab.'],
        ['Reinigen Sie auch Anlagen, die Sie nicht gebaut haben?', 'Ja. Wir betreuen auch Anlagen anderer Installateure.']
      ]
    },
    'brandschutzklappen': {
      title: 'Brandschutzklappen', group: 'lueftung', img: 'lueftung-halle', pos: '50% 50%',
      h1: 'Brandschutzklappen', sub: 'Kontrolle und Instandhaltung',
      lead: 'Brandschutzklappen müssen im Ernstfall funktionieren. Wir kontrollieren Brandschutzklappen in Lüftungsanlagen, dokumentieren den Zustand und beheben Mängel.',
      items: ['Funktionskontrolle', 'Dokumentation', 'Instandsetzung bei Mängeln', 'Abstimmung mit Service und Lüftungsreinigung'],
      faq: [
        ['Kann die Kontrolle mit dem Lüftungsservice kombiniert werden?', 'Ja. Wir stimmen die Kontrolle der Brandschutzklappen mit Service und Reinigung ab.'],
        ['Erhalte ich eine Dokumentation?', 'Ja. Wir dokumentieren den Zustand der kontrollierten Brandschutzklappen.']
      ]
    },
    'service-wartung': {
      title: 'Service und Wartung', group: 'service', img: 'service-check', pos: '62% 45%',
      h1: 'Service und Wartung', sub: 'Für Heizung, Lüftung, Klima, Kälte und Sanitär',
      lead: 'Nach der Inbetriebnahme fängt unsere Arbeit erst richtig an. Wir warten Ihre Anlagen regelmässig, planen die Servicezyklen über die ganze Lebensdauer und sind bei Störungen rund um die Uhr erreichbar.',
      items: ['Regelmässige Wartung', 'Servicezyklen über die ganze Lebensdauer', 'Service auch für Fremdanlagen', 'Pikettdienst 24/7'],
      faq: [
        ['Warten Sie auch Anlagen, die Sie nicht selbst gebaut haben?', 'Ja. Wir planen Servicezyklen auch für Anlagen anderer Installateure.'],
        ['Wie erreiche ich den Service?', 'Per Mail an service@rokitzky.ch oder telefonisch unter 044 312 34 41. Bei Störungen über den Pikettdienst 076 434 17 17.']
      ]
    },
    'wartungsvertraege': {
      title: 'Wartungsverträge', group: 'service', img: 'van-tall', pos: '50% 30%',
      h1: 'Wartungsverträge', sub: 'Planbarer Service über die ganze Lebensdauer',
      lead: 'Mit einem Wartungsvertrag planen wir die Servicezyklen Ihrer Anlage über die ganze Lebensdauer. Sie wissen, wann wir kommen, und wir kennen Ihre Anlage.',
      items: ['Regelmässige Wartung nach Plan', 'Persönliche Betreuung', 'Auch für Anlagen anderer Installateure', 'Pikettdienst rund um die Uhr'],
      faq: [
        ['Gibt es Wartungsverträge auch für bestehende Anlagen?', 'Ja. Wir übernehmen den Service auch für Anlagen, die nicht von uns gebaut wurden.'],
        ['Wie kommen wir zu einem Wartungsvertrag?', 'Schreiben Sie an service@rokitzky.ch. Wir besprechen Ihre Anlage und machen Ihnen ein Angebot.']
      ]
    },
    'stoerungsdienst-pikett': {
      title: 'Störungsdienst und Pikett', group: 'service', img: 'van-wide', pos: '60% 50%',
      h1: 'Pikettdienst 24/7', sub: 'Störungsdienst rund um die Uhr',
      lead: 'Seit 2013 sind wir mit unserem Pikettdienst rund um die Uhr für unsere Kundinnen und Kunden da. Persönlich, auch nachts und am Wochenende.',
      items: ['Erreichbar 24/7 unter 076 434 17 17', 'Heizung, Lüftung, Klima, Kälte und Sanitär', 'Persönlich für Sie da', 'Seit 2013'],
      faq: [
        ['Wann ist der Pikettdienst erreichbar?', 'Rund um die Uhr, 24/7, unter 076 434 17 17.'],
        ['Seit wann gibt es den Pikettdienst?', 'Seit 2013 ist unser Pikettdienst rund um die Uhr für Sie da.']
      ]
    },
    'waermepumpen-service': {
      title: 'Wärmepumpenservice', group: 'service', img: 'speicher', pos: '65% 50%',
      h1: 'Wärmepumpenservice', sub: 'Einbindung, Wartung und Störungsbehebung',
      lead: 'Wir binden Wärmepumpen in bestehende und neue Anlagen ein, warten sie und sind bei Störungen über den Pikettdienst rund um die Uhr erreichbar.',
      items: ['Einbindung von Wärmepumpen und Speichern', 'Wartung und Service', 'Störungsbehebung 24/7', 'Erweiterung bestehender Anlagen'],
      faq: [
        ['Warten Sie auch Wärmepumpen, die Sie nicht eingebaut haben?', 'Ja. Wir übernehmen den Service auch für Anlagen anderer Installateure.'],
        ['Was tun, wenn die Wärmepumpe ausfällt?', 'Rufen Sie unseren Pikettdienst an: 076 434 17 17, rund um die Uhr.']
      ]
    },
    'sanierungen': {
      title: 'Sanierungen', group: 'sanierung', img: 'action-team', pos: '50% 40%',
      h1: 'Sanierungen', sub: 'Heizung, Lüftung, Klima, Kälte und Sanitär',
      lead: 'Wir sanieren Heizungsanlagen, Kälteanlagen, Lüftungsanlagen und Sanitäranlagen. Wir prüfen den Bestand, besprechen die Möglichkeiten und verbauen, was wir besprochen haben.',
      items: ['Heizungssanierung', 'Sanierung von Kälteanlagen', 'Lüftungssanierung', 'Sanitärsanierung', 'Umstieg auf erneuerbare Energien'],
      faq: [
        ['Begleiten Sie die Sanierung von der Planung bis zum Service?', 'Ja. Wir planen, führen aus und übernehmen danach den Service.'],
        ['Können erneuerbare Energien eingebunden werden?', 'Ja. Wir binden Wärmepumpen, Speicher und Solarthermie in bestehende Anlagen ein.']
      ]
    },
    'umbauten': {
      title: 'Umbauten', group: 'sanierung', img: 'decke-klima', pos: '50% 20%',
      h1: 'Umbauten', sub: 'Haustechnik bei Umbau und Erweiterung',
      lead: 'Bei Umbauten passen wir die Haustechnik an: Wir erweitern bestehende Anlagen, planen neue Installationen und führen alles sauber aus.',
      items: ['Erweiterung bestehender Haustechnik', 'Neue Installationen für Heizung, Lüftung und Sanitär', 'Planung und Ausführung', 'Service nach dem Umbau'],
      faq: [
        ['Übernehmen Sie alle Gewerke der Haustechnik?', 'Wir sind in Heizung, Kälte, Lüftung, Klima, Sanitär und Service zuhause und koordinieren diese Bereiche aus einer Hand.'],
        ['Arbeiten Sie auch für Planer?', 'Ja. Wir unterstützen Planerinnen und Planer auch als Fachberater.']
      ]
    },
    'energetische-modernisierung': {
      title: 'Energetische Modernisierung', group: 'sanierung', img: 'heizung-schweissen', pos: '62% 72%',
      h1: 'Energetische Modernisierung', sub: 'Erneuerbare Energien und Wärmerückgewinnung',
      lead: 'Wir modernisieren Haustechnik energetisch: mit Wärmepumpen, Speichern und Solarthermie, mit Wärmerückgewinnung und der Anbindung an Wärmeverbünde. Energiesimulationen und Gebäudesimulationen zeigen, was sich lohnt.',
      items: ['Wärmepumpen, Speicher und Solarthermie', 'Wärmerückgewinnung', 'Anbindung an Wärmeverbünde', 'Energiesimulation und Gebäudesimulation'],
      faq: [
        ['Haben Sie Erfahrung mit Wärmeverbünden?', 'Ja. 2011 haben wir zusammen mit der Holz AG für Energie einen Wärmeverbund mit 2 MW Holzschnitzelheizung gebaut.'],
        ['Können Sie vorab berechnen, was eine Modernisierung bringt?', 'Ja. Wir erstellen Energiesimulationen und Gebäudesimulationen.']
      ]
    }
  },

  timeline: [
    ['1970', 'Hier beginnt unsere Geschichte', 'Werner Rokitzky startet als Einmannbetrieb in Embrach.'],
    ['1972', 'Aus eins wird zwei', 'Aus dem Einmannbetrieb wird ein Zweimannbetrieb: Ein Sanitärinstallateur wird eingestellt.'],
    ['1985', 'Für Nachwuchs sorgen', 'Der erste Lehrling als Sanitärinstallateur beginnt seine Lehre bei Rokitzky.'],
    ['1987', 'Die Firma wächst', 'Aus der Einzelfirma wird die Aktiengesellschaft W. Rokitzky AG.'],
    ['2011', 'Generationenwechsel', 'Werner Rokitzky verkauft seine AG an die nächste Generation. Im gleichen Jahr entsteht mit der Holz AG für Energie ein Wärmeverbund mit 2 MW Holzschnitzelheizung.'],
    ['2013', 'Rund um die Uhr da', 'Unser Pikettdienst ist ab jetzt rund um die Uhr für die Kundschaft da.'],
    ['2019', 'Ziemlich viele Rokitzkys', 'Mehr als fünfzig festangestellte Mitarbeiterinnen und Mitarbeiter.'],
    ['2020', 'K3 Handwerkcity', 'Wir beziehen unsere neuen Büroräume in der K3 Handwerkcity in Wallisellen.'],
    ['2023', 'Winterthur', 'Neue Büroräume im Gewerbehaus Taggenberg in Winterthur.'],
    ['Heute', 'Über 80 Mitarbeitende', 'Vier Standorte: Wallisellen, Winterthur, Hinwil und Zürich.']
  ],


  /* Stimmen aus den Instagram Posts (Montag: Mitarbeiter & Unternehmenskultur) */
  quotes: [
    ['Ich arbeite gern dort, wo man mir vertraut. Hier bekomme ich Aufgaben, bei denen ich selber denken muss und Entscheidungen treffen kann.', 'Mitarbeiter/in, W. Rokitzky AG'],
    ['Auf der Baustelle ist niemand fertig ausgelernt, und wir waren alle einmal neu.', 'Aus dem Rokitzky Team'],
    ['Wenn ein Handgriff misslingt, lachen wir kurz, sprechen es an und machen es besser.', 'Aus dem Rokitzky Team'],
    ['Wir messen lieber zweimal, bevor wir einmal schneiden.', 'Aus dem Rokitzky Team']
  ],
  values: [
    ['Vertrauen', 'Wir geben Verantwortung ab und trauen einander etwas zu. Wer bei uns arbeitet, bekommt Aufgaben, bei denen man selber denkt und entscheidet.'],
    ['Lernen', 'Auf der Baustelle ist niemand fertig ausgelernt. Fehler gehören dazu, solange wir daraus lernen, und Wissen teilen wir im Team.'],
    ['Zusammenhalt', 'Auf der Baustelle ist es oft laut, kalt und eng. Ein guter Spruch zur richtigen Zeit bringt uns durch den Tag. Wer zusammen lachen kann, kann auch zusammen anpacken.'],
    ['Sorgfalt', 'Genauigkeit fängt bei den kleinen Dingen an. Wir messen lieber zweimal, dokumentieren sauber und halten Absprachen ein.']
  ],
  tips: [
    ['Fragt nach', 'Auch wenn die Frage klein scheint. Wer früh fragt, spart sich später Fehler und versteht schneller, wie alles zusammenhängt. Wir waren alle einmal neu.'],
    ['Habt Geduld mit euch', 'Ein sauberer Handgriff braucht Wiederholung, und jeder Fehler gehört zum Lernen dazu. Wer zuhört, genau hinschaut und dranbleibt, wird schneller sicher, als er denkt. Wir helfen euch dabei.']
  ],
  portraits: ['portrait-1', 'portrait-2', 'portrait-3', 'portrait-4', 'portrait-5', 'portrait-6', 'portrait-7'],
  apprenticeships: ['Heizungsinstallateur/in', 'Sanitärinstallateur/in', 'Gebäudetechnikplaner/in', 'Lüftungsanlagenbauer/in', 'Kaufmann/Kauffrau'],
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
