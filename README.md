# PixelPause

Kleine responsive Browser-Spielseite: Reaktionstest mit fünf Versuchen und lokal gespeichertem Rekord. Keine Abhängigkeiten, kein Build und kein Backend.

## Veröffentlichen

Alle Dateien aus diesem Repository direkt als statische Website ausliefern. Einstieg: `index.html`. Kein Build-Befehl nötig; Ausgabeverzeichnis ist das Repository-Hauptverzeichnis (`.`). Für die Werbeintegration auf einer eigenen Domain mit HTTPS bereitstellen. `sw.js` muss unter `/sw.js` erreichbar sein. GitHub Pages unter einem Repository-Unterpfad stellt diese Root-Adresse nicht automatisch bereit.

Lokal ohne Werbung prüfen: `python3 -m http.server 8000`, dann `http://localhost:8000` öffnen. Der Reaktionstest funktioniert unabhängig von den externen Werbeskripten; deren Verhalten kann auf localhost abweichen.

## Eingebaute Werbecodes

- Im HTML-Head: `https://quge5.com/88/tag.min.js`, Zone `301077`, `async`, `data-cfasync="false"`.
- Service-Worker-Datei: `sw.js`, Domain `3nbf4.com`, Zone `12106121`.

Die Codes wurden wie vorgegeben übernommen. Eine zusätzliche eigene Service-Worker-Registrierung ist nicht eingebaut. Eine Domainfreigabe, Anbieter-Konfiguration und das Hosting werden separat eingerichtet. Es gibt keine automatischen Seitenneuladungen, Klicks, Belohnungen oder garantierten Einnahmen. Vor öffentlicher Nutzung Betreiber-/Datenschutzangaben und die passende Einwilligung für die verwendeten Werbeformate ergänzen.

Der Rekord wird nur im Browser unter `pixelpause-best-median` gespeichert. Ohne lokalen Speicher bleibt das Spiel benutzbar. Bedienen per Touch, Maus oder mit der Tastatur auf dem fokussierten Spielbutton.

## Dateien

- `index.html`: Seite und Werbetag
- `style.css`: responsive Gestaltung
- `app.js`: Spiel und lokaler Rekord
- `sw.js`: bereitgestellter Anbieter-Code
