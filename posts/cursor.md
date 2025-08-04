---
title: "CSS cursor"
headline: "Kursor myši"
description: "Jak pomocí CSS měnit kursor myši nebo si vytvořit kursor vlastní."
date: "2014-11-01"
last_modification: "2014-11-14"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

CSS vlastnost `cursor` umí u daného elementu změnit vzhled klasického ukazatele myši. Kromě několika kursorů známých z prostředí **operačního systému** jde taktéž připojit vlastní obrázkový ukazatel.

## Všechny možné hodnoty

Následující tabulka obsahuje všechny možné hodnoty kursoru včetně ukázky (po najetí myší).

    Zápis
    Význam a ukázka

	`cursor: auto`
	Kursor se přizpůsobí kontextu

	`cursor: default`
	Výchozí šipka

	`cursor: none`
	Kursor zmizí, nefunguje ve staré **Opeře**

	`cursor: context-menu`
	Kontextové menu. Pouze **IE** a stará **Opera**

	`cursor: help`
	Nápověda

	`cursor: pointer`
	Ručička jako u odkazů

	`cursor: progress`
	Načítání s kursorem šipky

	`cursor: wait`
	Samotné *přesýpací hodiny*

  Výběr

	`cursor: cell`
	Výběr buňky

	`cursor: crosshair`
	Kříž

	`cursor: text`
	Výběr textu (výchozí kursor u obyčejného textu)

	`cursor: vertical-text`
	Vertikální výběr textu

  Drag &amp; Drop

	`cursor: alias`
	Vytvoření zástupce (aliasu)

	`cursor: copy`
	Kopírování

	`cursor: move`
	Přesun

	`cursor: no-drop`
	Obsah není možné pustit

	`cursor: not-allowed`
	Obsah není možné chytit (**Firefox** a **Chrome** zobrazují stejně jako `no-drop`)

  Změna velikosti

	`cursor: e-resize`
	šipky znázorňující možnost změny velikosti ↓

	`cursor: n-resize`

	`cursor: ne-resize`

	`cursor: nw-resize`

	`cursor: s-resize`

	`cursor: se-resize`

	`cursor: sw-resize`

	`cursor: w-resize`

	`cursor: ew-resize`

	`cursor: ns-resize`

	`cursor: nesw-resize`

	`cursor: nwse-resize`

	`cursor: col-resize`
	Změna velikosti sloupce

	`cursor: row-resize`
	Změna velikosti výšky řádku

	`cursor: all-scroll`
	Scrollování do všech stran (**Firefox** a **Chrome** zobrazují stejně jako `move`)

  Zoomování

	`cursor: zoom-in`
	Přiblížení

	`cursor: zoom-out`
	Oddálení

  Uchopení

	`cursor: grab`
`cursor: -webkit-grab`
	Možnost uchopit (**Chrome** vyžaduje prefix)

	`cursor: grabbing`
`cursor: -webkit-grabbing`
	Obsah už byl uchopen

## Častěji používané

Z dlouhého seznamu všech možných hodnot stojí za pozornost hlavně následující:

  `cursor: pointer`
  
    Vypadá jako odkaz, taže se hodí k zvýraznění [neodkazů](/odkaz-tlacitko) (popř. tlačítek), na které lze kliknout.

  `cursor: help`
  
    Zobrazení nápovědy po najetí na text. Často se kompinuje s tečkovaným podtržením.

    ```
.help {
  cursor: help; 
  border-bottom: 1px dotted #000;
}
```

    Nutno ale zajistit, aby se k obsahu v `title` dostal člověk na mobilním zařízení.

  `cursor: wait`/`cursor: progress`
  
    Může posloužit jako snadná indikace načítání. Třeba při čekání na [AJAXový](/ajax) požadavek.

  `cursor: not-allowed`
  
    Hodí se jako doprovodná indikace zablokovaného tlačítka nebo políčka, kam se [nesmí psát](/zablokovani-inputu).

## Vlastní kursor myši

```
body {
  cursor: url('vlastni-kursor.cur'), default;
}
```

### Podporované formáty

Vytvořit si vlastní kursor jde připojením obrázkového souboru. **Firefox**, **Chrome** a nová **Opera** podporují téměř libovolné [formáty obrázků](/format-obrazku) (PNG, GIF, JPG, [SVG](/svg)), ikony (ICO) nebo skutečné kursory (CUR).

Maximální povolená velikost je 128 × 128, větší **bude ignorován**.

**IE** podporuje pouze ICO, CUR a ANI (ten umožňuje i animaci – [ukázka](http://kod.djpw.cz/xkhb) pouze pro **IE** – funguje i v [**IE 11**](/ie11)).

  Převést PNG na ikonu umí například online nástroj [ConvertIco](http://www.convertico.com/).

Při zápisu vlastního kursoru je **nutné** za URL obrázku uvést klasický typ pro případ, že by se obrázek (ještě) nenačetl. Bez toho **vlastní kursor nebude fungovat**.

```
body {
  cursor: url('vlastni-kursor.cur'), **default**;
}
```

### Souřadnice

Pro určení místa, kde má kursor reagovat je možné přímo za `url` s obrázkem uvést souřadnice.

Výchozí chování je, že kursor *kliká* vlevo nahoře. Zvyšováním hodnot souřadnic tak můžeme přesunout na aktivní plochu doprava dolů.

V případě, že má kursor reagovat uprostřed, zadáme poloviční hodnoty šířky a výšky.

```
body {
  cursor: url('vlastni-kursor.cur') **16 16**, default;
}
```

Bohužel ale nastavení souřadnic rozbije kursor v **Internet Exploreru** (celá deklarace bude neplatná).

Element má vlastní kursor jako *.cur.

  Element má vlastní kursor jako *.ico.

Element má vlastní kursor jako *.png o rozměrech 32 × 32.

Element má vlastní kursor jako *.png rozměrů 128 × 128 a nastaveny souřadnice doprostřed.

[Samostatná ukázka](http://kod.djpw.cz/rkhb)

## Odkazy jinam

  - MDN: [Using URL values for the cursor property](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor/url)

  - Teststranek: [Test vlastních kurzorů](http://teststranek.kvalitne.cz/css-kurzory/)