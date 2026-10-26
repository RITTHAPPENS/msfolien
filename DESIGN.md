# Design: MS-Folientechnik

Welt: die eigene Fahrzeug-Livery als Seitensystem. Dunkel (Marke ist ein schwarzes Leuchtschild mit hellem Logo), harte Ecken, 45-Grad-Schnittkanten.

## Farben
| Token | Wert | Einsatz |
|---|---|---|
| --bg | #0c0e0f | Seitengrund, Header |
| --bg-2 | #121517 | Sektionswechsel, Kacheln |
| --bg-3 | #191d20 | Bild-Platzhalter |
| --line / --line-strong | #262b2f / #353b40 | Trennlinien, Ghost-Buttons |
| --text | #ecedea | Fließtext hell (Folienweiß) |
| --muted | #a6acaf | Sekundärtext |
| --teal | #14a594 | Einziger Akzent: Primärbutton, Diagonalbänder, Kontaktblock |
| --teal-ink | #3dcfbd | Türkis als Text/Icon auf Dunkel |
| --on-teal | #061210 | Text auf Türkis |

Regel: Türkis ist die einzige Akzentfarbe. Auf Türkis immer dunkler Text, nie Weiß.

## Typografie
Archivo (variabel, selbst gehostet, wght 100–900, wdth 62–125).
- H1: 830, wdth 118 %, Versalien, line-height .96
- H2: 760, wdth 112 %, clamp(2rem, 4vw, 3.4rem)
- H3: 760, wdth 108 %
- Body: 400, wdth 100 %, 17px / 1.6

## Formen
- Radius 0 überall, Buttons und Bilder sind gerade Rechtecke.
- Die Schräge ist der Marke vorbehalten und kommt genau zweimal pro Seite vor: Hero (Bildkante + türkises Band, gemeinsamer Winkel `--slant: -22deg`) und die schräge Oberkante des türkisen Kontaktblocks.
- Keine Karten-Hintergründe: Bild + Text stehen direkt auf dem Seitengrund. Bildhöhen kommen aus dem Rahmen (aspect-ratio), nie aus dem Bild.
- Akzentmarker: kleine türkise Quadrate (Ablauf, Tags), sonst keine Deko.

## Bewegung
Eine Signatur, nur im Hero: „Folie aufziehen“, das Hero-Bild wird beim Laden einmal diagonal freigelegt (CSS @property --p). Hero-Text steigt kurz ein. Sonst keine Einblendungen. Bei reduzierter Bewegung alles statisch.

## Komponenten
Header (fix, dunkel), Hero (Text links, Fahrzeug rechts randabfallend), Bento-Leistungen (6 Kacheln + Chips), Projekt-Schiene (Scroll-Snap + Pfeile), Vorteile (Liste mit Icons, sticky Überschrift), Ablauf (4 Stationen auf Linie), Über-uns-Split, Bewertungs-Slot, Kontaktblock, Footer.
Icons: Phosphor Regular als Sprite (assets/img/icons.svg).

## Unterseiten
Page-Hero (Titel links vertikal mittig, Bild rechts mit Diagonalschnitt, kein Vollbild), Gruppen mit `group-head` (H2 + Intro gestapelt), `feature`-Karten mit Bild und Tags, `mini`-Einträge (Text mit Trennlinie) für Leistungen ohne Foto, `design-bento` mit einer türkisen Text-Kachel. Aktiver Menüpunkt: türkise Unterkante.

## Über uns & Kontakt
- Bildplatzhalter (`.ph`): gestreift + gestrichelt, mit Beschreibung, welches Foto hinein soll. Text-Platzhalter (`.ph-text`) in eckigen Klammern mit gestrichelter Linie links. Vor Livegang ersetzen.
- Mission/Vision: zwei Aussagen mit türkiser Oberlinie, kein Kartenrahmen.
- Formular: Label über Feld, Fehler darunter (#ff9585), Validierung beim Absenden, danach live beim Tippen. Anfrage-Art als Auswahl-Kacheln (türkis = gewählt). Erfolgsmeldung ersetzt das Formular.
- Karte: Platzhalter bis zur Einwilligung (CCM19), Link zu Google Maps.
- Footer: Spalten Seiten, Kontakt, Öffnungszeiten, Rechtliches.
