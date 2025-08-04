---
title: "Načítání webu v IFRAME"
headline: "Načítání webu v <code>&lt;iframe></code>"
description: "Je rozumné blokovat načítání webu v <code>&lt;iframe></code>? Jaká jsou risika a výhody."
date: "2016-03-03"
last_modification: "2016-03-04"
status: 1
tags: ["HTML", "Rady a nápady", "Bezpečnost"]
---

Značkou [`&lt;iframe>`](/ramy#iframe) jde do jedné stránky vložit obsah cizí, aniž by se obě stránky ovlivňovaly. Stránka v rámu se chová podobně jako by byla načtená v jiné záložce – návštěvník je v ní přihlášen a podobně.

Kvůli tomu se do rámů běžně vkládají různé prvky jako videa z [YouTube](/youtube), [sdílecí tlačítka](/sdileci-tlacitka) z [Facebooku](/facebook) nebo [Twitteru](/twitter) a další věci.

Řada webů se snaží bránit tomu, aby šly do `&lt;iframe>` načíst (a prohlížeče tomu jdou vstříc). Proč?

## Clickjacking

Clickjacking je postup, kdy útočník přiměje oběť kliknout na nějaký prvek – třeba tlačítko, avšak místo kliknutí na tlačítko se na dané místo umístí obsah jiné stránky v `&lt;iframe>`.

Obsah rámu, kam se ve skutečnosti klikne, se 100% zprůhlední pomocí [`opacity`](/opacity). Oběť tak nemusí nic poznat.

Díky tomu jde s trochou snahy zajistit, aby uživatel vykonal nějakou akci. Často se clickjacking používá pro získávání *Like* na Facebooku:

    - [Clickjacking na Facebooku](/clickjacking)

## Zabránění načítání do rámu

Zabránit načtení do rámu z cizích domén (a ochránit se tak před clickjackingem) jde pomocí HTTP hlavičky:

```
X-FRAME-OPTIONS: SAMEORIGIN
```

Funguje to od **IE 8**, **Chrome 4**, **Firefox 3.6** a **Safari 4**.

V [PHP](/php) to může vypadat následovně:

```
&lt;?php
header('X-Frame-Options: SAMEORIGIN');
?>
```

Případně jde přímo stanovit doménu, která může web do rámu načíst (nepodporuje **Chrome** a **Safari**):

```
X-FRAME-OPTIONS: ALLOW-FROM http://jecas.cz/
```

## Je clickjacking problém?

Řada tvůrců brání načtení do rámu automaticky nezávisle na povaze stránky.

U typických **obsahových stránek** nebo aplikací (kde není uživatel přihlášen) ale kliknutí na místo, které si útočník vybral, nepřináší významné risiko.

Hlavička omezující zobrazení v rámu se tak může aplikovat jen na důvěrných stránkách.

Blokováním načtení stránky v rámu se totiž provozovatel webu připravuje o některé **hezké možnosti**, byť nejde o kritické věci:

### Přebarvení stránky

Před časem jsem vytvořil nástroj pro rychlé přebarvení stránky pomocí [filtru `hue-rotate`](/filter#hue-rotate):

    - [Přebarvení webu](http://kod.djpw.cz/jgub-)

### Google Analytics

Například [Google Analytics](/ga) umožňuje na stránce zobrazené v rámu zobrazit informace ohledně četnosti klikání.

Při blokování rámů se musí náhled stránky zobrazit mimo Google Analytics.

### Responsivní náhledy

Díky načtení do rámu jde rychle najednou zhodnotit zobrazení stránky v různých rozlišeních. Umí to třeba [Google Resizer](http://design.google.com/resizer).

Nástroj Google Resizer není ale zdaleka kritický. Pro podrobnější testování responsivních webů je užitečnější použít [vývojářské nástroje](/vyvojarske-nastroje) (F12).

## Blokovaní obsahu

Některé weby proti zobrazování v rámu bojují z jiného důvodu – nechtějí být například spojovány se stránkou, která jejich obsah zobrazuje.

Tomu se bohužel nejde na úrovni webových technologií bránit, protože vždycky jde stránku stáhnout/[zkopírovat](/kopirovani):

    - [Získání obsahu cizí stránky](/stazeni-stranky)

Zobrazení staženého obsahu tak může být ve finále ještě horší, než vložení pomocí `&lt;iframe>`.