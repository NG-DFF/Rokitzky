# W. Rokitzky AG, Website Prototyp

Statische Seite ohne Build. Alles liegt in diesem Ordner: index.html, css, js, img.

## Auf Vercel veröffentlichen

Variante A, über GitHub (empfohlen, danach geht jede Änderung automatisch online):
1. Repo in GitHub anlegen und diesen Ordner hineinlegen.
2. In Vercel auf «Add New Project», das Repo importieren, Framework «Other», keine Build Einstellungen nötig.
3. Deploy. Die Adresse lautet dann zum Beispiel rokitzky-website.vercel.app.

Variante B, direkt vom Mac:
1. Ordner entpacken, im Terminal in den Ordner wechseln.
2. `npx vercel --prod` ausführen und dem Dialog folgen (Login mit dem Neroli Vercel Konto).

## Hinweise

* Die Datei vercel.json setzt «noindex», damit Google den Prototyp nicht indexiert. Vor dem Livegang auf rokitzky.ch diesen Eintrag entfernen.
* Navigation über Anker (#dienstleistungen, #kontakt usw.), dadurch funktioniert jede Seite ohne Server Regeln.
* Schrift Afacad Flux kommt von Google Fonts, GSAP und Lenis von jsDelivr.
* Das Kontaktformular sendet im Prototyp nichts.
