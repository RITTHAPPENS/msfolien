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
- Radius 0 überall.
- Primär- und dunkle Buttons: unten rechts 12px abgeschrägt.
- Bildkacheln: oben rechts 36px abgeschrägt (Bento), Galerie unten rechts.
- Diagonalbänder in Türkis parallel zur Hero-Bildkante (ca. 22 Grad aus der Senkrechten).
- Kontaktblock: vollflächig Türkis mit schräger Oberkante.

## Bewegung
Eine Signatur: „Folie aufziehen“. Bilder mit `data-wipe` werden beim Einscrollen diagonal freigelegt, eine türkise Rakelkante läuft mit (CSS @property --p, IntersectionObserver). Hero-Text steigt einmal kurz ein. Bei reduzierter Bewegung alles statisch sichtbar.

## Komponenten
Header (fix, dunkel), Hero (Text links, Fahrzeug rechts randabfallend), Bento-Leistungen (6 Kacheln + Chips), Projekt-Schiene (Scroll-Snap + Pfeile), Vorteile (Liste mit Icons, sticky Überschrift), Ablauf (4 Stationen auf Linie), Über-uns-Split, Bewertungs-Slot, Kontaktblock, Footer.
Icons: Phosphor Regular als Sprite (assets/img/icons.svg).

## Unterseiten
Page-Hero (Titel links, Bild rechts mit Diagonalschnitt, kein Vollbild), Sprungleiste (sticky unter dem Header), Gruppen mit `group-head` (H2 + Intro gestapelt), `feature`-Karten mit Bild und Tags, `mini`-Einträge (Text mit türkisem Schnittmarker) für Leistungen ohne Foto, `design-bento` mit einer türkisen Text-Kachel. Aktiver Menüpunkt: türkise Unterkante.
