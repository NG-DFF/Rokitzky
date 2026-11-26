# W. Rokitzky AG, Website

Statische Website ohne Build. Vercel veröffentlicht den Ordner so, wie er im Repository liegt.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `js/content.js` | Alle Texte und Daten (Bereiche, Schwerpunkte, Standorte, Fragen) |
| `js/app.js` | Seitenvorlagen, Router, Animationen |
| `css/site.css` | Gestaltung |
| `scripts/shell.html` | Vorlage für Kopf, Navigation und Footer aller Seiten |
| `scripts/prerender.mjs` | Erzeugt aus Vorlage und Inhalten das fertige HTML jeder Seite |
| `index.html`, `leistungen/…`, `unternehmen/…` usw. | Fertiges HTML, erzeugt von `scripts/prerender.mjs`. Nicht von Hand ändern. |
| `404.html`, `sitemap.xml`, `robots.txt` | Ebenfalls erzeugt |

## Adressen

`/`, `/leistungen/`, `/leistungen/<bereich>/`, `/leistungen/<schwerpunkt>/`, `/unternehmen/`, `/mitarbeitende/`, `/karriere/`, `/kontakt/`, `/impressum/`, `/datenschutz/`.
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
* Übrige Punkte: Checkliste Livegang im Prüfdokument vom 26.11.2026.
