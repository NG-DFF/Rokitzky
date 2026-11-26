# W. Rokitzky AG, Website

Statische Website ohne Build. Vercel veröffentlicht den Ordner so, wie er im Repository liegt.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `js/content.js` | Alle Texte und Daten (Bereiche, Schwerpunkte, Standorte, Stellen, Fragen) |
| `js/app.js` | Seitenvorlagen, Router, Animationen |
| `css/site.css` | Gestaltung |
| `vendor/` | Schrift Afacad Flux, GSAP 3.15.1 und Lenis 1.3.27, lokal statt über Google Fonts und jsDelivr |
| `img/` | Bilder als WebP, höchstens 250 KB, Querformat 2000 bis 2400 px breit, Handy-Ausschnitte (`-t`, `-m`) 1067 × 1600 px |
| `api/anfrage.js` | Vercel Function für Kontaktformular, Kurzbewerbung und Lehre |
| `favicon.svg`, `apple-touch-icon.png` | Icons (Browser und Startbildschirm iPhone, 180 × 180 px) |
| `scripts/shell.html` | Vorlage für Kopf, Navigation und Footer aller Seiten |
| `scripts/prerender.mjs` | Erzeugt aus Vorlage und Inhalten das fertige HTML jeder Seite |
| `index.html`, `leistungen/…`, `unternehmen/…` usw. | Fertiges HTML, erzeugt von `scripts/prerender.mjs`. Nicht von Hand ändern. |
| `404.html`, `sitemap.xml`, `robots.txt` | Ebenfalls erzeugt |

## Adressen

`/`, `/leistungen/`, `/leistungen/<bereich>/`, `/leistungen/<schwerpunkt>/`, `/unternehmen/`, `/referenzen/`, `/mitarbeitende/`, `/karriere/`, `/karriere/<stelle>/`, `/kontakt/`, `/impressum/`, `/datenschutz/`.
Alte Ankeradressen wie `/#retrofit` leitet `app.js` auf die neue Adresse weiter.

Jede Seite liegt als fertiges HTML vor (Titel, Beschreibung, canonical, Open Graph, JSON-LD, Inhalt). Suchmaschinen und KI-Crawler lesen den Inhalt ohne JavaScript. Mit JavaScript übernimmt `app.js` die Seite und wechselt danach ohne Neuladen zwischen den Seiten.

## Nach jeder Änderung an Texten, Vorlagen oder `scripts/shell.html`

```bash
cd scripts
npm install                      # einmalig
npx playwright install chromium  # einmalig
node prerender.mjs
```

Danach alle geänderten Dateien committen. Kopf, Navigation und Footer immer in `scripts/shell.html` ändern, nie in den erzeugten Dateien.

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Seitentitel | Muster «{Thema} im Kanton Zürich \| Rokitzky», höchstens 60 Zeichen. Feste Seiten: `META` in `js/app.js`. Bereiche und Schwerpunkte: `title` oder `seo` in `js/content.js`. |
| Beschreibung für Google | 120 bis 155 Zeichen. Feste Seiten: `META` in `js/app.js`. Bereiche, Schwerpunkte und Stellen: `desc` in `js/content.js`. |
| Standorte | `locations` in `js/content.js`. Kontakt, Karte, Footer und JSON-LD lesen von dort. |
| Zahl der Lernenden | `company.lernende` in `js/content.js` (Satz und Titel). |
| Offene Stellen | `jobs` in `js/content.js`. Jede Stelle erhält eine eigene Seite unter `/karriere/<slug>/` mit Stellenangebot im JSON-LD. |
| Drohnenvideo | `HERO_VIDEO` in `js/app.js`: MP4 (H.264) und WebM unter `media/`, je höchstens 4 MB, ohne Ton, dazu ein Posterbild. Bei reduzierter Bewegung bleibt es beim Standbild. |

Sichtbare Texte ohne Bindestriche und Gedankenstriche (Ausnahme UID und MWST), Schweizer Schreibweise mit ss, Wir-Form, Kundschaft per Sie, Lernende per Du.

## Offene Punkte im Code

| Marke | Datei | Inhalt |
| --- | --- | --- |
| `TODO K01` | `js/content.js` | Adressen und Telefonnummern Hinwil und Zürich |
| `TODO K02` | `js/app.js` | Teamseite: Entscheid Variante A oder B (B05) |
| `TODO K03` | `js/content.js` | Offene Stellen, Ansprechperson Bewerbungen, Recruiting-Video |
| `TODO K04` | `js/content.js` | Zahl der Lernenden |
| `TODO K05` | `js/app.js` | UID und MWST im Impressum bestätigen |
| `TODO K06` | `js/app.js` | Eigene Referenzen statt eingebetteter Liste |
| `TODO K07` | `js/content.js` | Retrofit und Schwerpunkte inhaltlich ausbauen |
| `TODO K08`, `TODO K11` | `js/app.js` | Freigabe Datenschutzerklärung; Abschnitt Tracking, falls Meta Ads dazukommen |
| `TODO K09` | `js/app.js` | Drohnenvideo |
| `TODO B15` | `js/content.js` | Rechts-PDFs nach `/docs/` übernehmen |
| `TODO B23` | `js/app.js` | Dunkle Version der SQS-Zeichen, danach Filter in `css/site.css` entfernen |

## Lokal ansehen

```bash
python3 -m http.server 8080
```

Dann http://localhost:8080/ öffnen.

## Kontaktformular und Bewerbungen

Die Formulare senden an `api/anfrage.js` (Vercel Function). Der Versand läuft über Resend. In Vercel unter Settings, Environment Variables setzen:

| Variable | Inhalt |
| --- | --- |
| `RESEND_API_KEY` | Pflicht. Ohne Schlüssel zeigt die Website die Fehlermeldung mit Telefonnummer, nie eine falsche Dankesmeldung. |
| `MAIL_FROM` | Absender, z. B. `Website Rokitzky <noreply@rokitzky.ch>`. Die Domain muss in Resend bestätigt sein. Bis dahin eine bestätigte Neroli-Domain verwenden. |
| `MAIL_TO_INFO` | Allgemeine Anfragen, Standard `info@rokitzky.ch` |
| `MAIL_TO_SERVICE` | Themen Service und Pikett, Standard `service@rokitzky.ch` |
| `MAIL_TO_JOBS` | Kurzbewerbung, Lehre, Schnuppertag, Standard wie `MAIL_TO_INFO` |

Für Tests vor dem Livegang `MAIL_TO_*` auf eigene Adressen setzen, damit Rokitzky keine Testmails erhält.
Spamschutz: verstecktes Feld und Mindestzeit von 2,5 Sekunden zwischen Anzeigen und Absenden.
Die Antwortadresse jeder Mail ist die Mailadresse aus dem Formular.

## Livegang

* `siteUrl` in `js/content.js` auf die Hauptadresse setzen (z. B. `https://www.rokitzky.ch`), danach `node prerender.mjs`. Damit stimmen canonical, og:url, og:image, JSON-LD, `sitemap.xml` und `robots.txt`.
* In `vercel.json` den Header `X-Robots-Tag: noindex, nofollow` entfernen.
* Rechts-PDFs in `/docs/` ablegen und in `js/content.js` relativ verlinken (TODO B15), sonst sind die Links nach der Umstellung der Domain defekt.
* Umgebungsvariablen für Resend setzen und Formular, Kurzbewerbung und Lehre einmal live absenden.
* Repository auf privat stellen.
* Übrige Punkte: Checkliste Livegang im Prüfdokument vom 26.11.2026.
