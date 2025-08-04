---
title: "Jeden sloupec fixní, druhý proměnlivý"
headline: "Jeden sloupec fixní, druhý proměnlivý"
description: "Jak vytvořit dvousloupcové rozvržení, kde je jeden sloupec s pevnou šířkou a druhý se přizpůsobuje šířce okna."
date: "2015-06-15"
last_modification: "2015-09-29"
status: 1
tags: ["CSS", "Hotová řešení", "Responsivní design", "Layout"]
---

I v případě **responsivního webu** s gumovým procentuálním layoutem, který se přizpůsobuje dostupné velikosti okna, je možné sem tam použít **sloupec s fixní šířkou**.

Jak na to?

## Záporný `margin`

První možnost je nejprve vytvořit dva obtékané sloupce ([`float`](/float)):

  - `pravy` s pružnou 100% šířkou

  - `levy` s fixní šířkou 100 pixelů

    .obal--1 {overflow: hidden}
    .obal--1 .sloupec {float: left; color: #fff}
    .obal--1 .pravy {background: #DA3F94; width: 100%}
    .obal--1 .levy {background: #1081DD; width: 100px}    

    Pravý pružný sloupec
    Levý fixní sloupec    

Nyní se sloupci s pružnou 100% šířkou nastaví záporný krajní [`margin`](/margin) o fixní šířce druhého sloupce, čímž se dostanou vedle (přes) sebe:

    .obal--margin {overflow: hidden}
    .obal--margin .sloupec {float: left; color: #fff}
    .obal--margin .pravy {float: right; background: #DA3F94; width: 100%; margin-left: -100px}
    .obal--margin .levy {background: #1081DD; width: 100px; opacity: .8}    

    Pravý pružný sloupec   
    Levý fixní sloupec

Aby se obsah sloupců **nepřekrýval**, přidá se pravému pružnému sloupci levý `padding` o stejné hodnotě jako je šířka fixního sloupce nebo hodnota záporného `margin`u. Pro zachování šířky je nutné použít obsahový box-model – `[box-sizing: border-box](/box-sizing#border-box)`, jinak by se odsazení k šířce přičetlo a sloupce by se vedle sebe opět nevešly.

    .obal--2 {overflow: hidden}
    .obal--2 .sloupec {float: left; color: #fff}
    .obal--2 .pravy {float: right; background: #DA3F94; width: 100%; margin-left: -100px; padding-left: 100px; box-sizing: border-box}
    .obal--2 .levy {background: #1081DD; width: 100px; opacity: .8}    

    Pravý pružný sloupec   
    Levý fixní sloupec

Jak je na ukázce díky [průhlednosti](/opacity) vidět, oba sloupce se stále překrývají. To ale ničemu nevadí, jen není dobré pravému sloupci nastavovat pozadí, ale použít ho pouze pro **vyhrazení prostoru**, kam se vloží další `&lt;div>`.

Větší hodnotou levého `padding`u než levého `margin`u jde snadno vyrobit **odsazení mezi sloupci**:

    .obal {overflow: hidden}
    .obal .sloupec {float: left; color: #fff}
    .obal .pravy {float: right; width: 100%; margin-left: -100px; padding-left: 110px; box-sizing: border-box}
    .obal .levy {background: #1081DD; width: 100px; opacity: .8}    
    .obal .pravy-vnitrek {background: #DA3F94}

      Pravý pružný sloupec
       
    Levý fixní sloupec

### Fixní sloupec vpravo

Měl-li by být fixní sloupec vpravo, stačí jen nahradit `left` za `right` v odsazení (`margin` a `padding`) a obtékání (`float`):

    .obal-vpravo {overflow: hidden}
    .obal-vpravo .sloupec {float: right; color: #fff}
    .obal-vpravo .levy {float: left; width: 100%; margin-right: -100px; padding-right: 110px; box-sizing: border-box}
    .obal-vpravo .pravy {background: #1081DD; width: 100px; opacity: .8}    
    .obal-vpravo .levy-vnitrek {background: #DA3F94}

      Levý pružný sloupec
       
    Pravý fixní sloupec

Na pořadí v HTML kódu nezáleží. První může být levý i pravý sloupec, což se hodí pro následné zrušení sloupců pro **zobrazení na mobilech**.

    - [Samostatná živá ukázka](http://kod.djpw.cz/hkqb) – obtékané sloupce s fixní a proměnlivou šířkou

## Tabulka

Docílit podobného výsledku jde také pomocí tabulky. Tedy přesněji [tabulkových hodnot](/display#table) vlastnosti `display`.

Pokud se nastaví tabulce 100% šířka a jednomu ze sloupců fixní, druhému sloupci se dopočítá.

Řešitelné je i [prohození sloupců](/sachovnicovy-vypis#prohozeni) v HTML kódu.

    - [Živá ukázka](http://kod.djpw.cz/jkqb) – fixní a gumový sloupec pomocí `display: table`

Tabulky bez zadaných rozměrů ale **není moc dobré používat pro layout**, protože prohlížeč do stažení celého obsahu neví, jak bude ve finále tabulka vypadat.

Stejným problémem trpí i [flexboxy](/flexbox).

Nejelegantnější řešení nabízí [grid layout](/display#grid-layout) od Microsoftu, je ale zatím podporován pouze v **IE 10+** a [**MS Edge**](/microsoft-edge).

## Absolutní posicování

V případě, že je jisté, který ze sloupců bude vždy nižší, může se ten nižší [absolutně naposicovat](/position#absolute) do `padding`em vyhrazeného prostoru.

    - [Živá ukázka](http://kod.djpw.cz/kkqb) – absolutně posicovaný sloupec s fixní šířkou

## Odkazy jinam

  - [Make a Layout With Fluid and Fixed-size Columns](http://radiatingstar.com/make-a-layout-with-fluid-and-fixed-size-columns)

  - [2 column div layout: right column with fixed width, left fluid](http://stackoverflow.com/questions/5195836/2-column-div-layout-right-column-with-fixed-width-left-fluid)

  .sloupec,
  .pravy-vnitrek,
  .levy-vnitrek {
    padding: 1.5em 1em; box-sizing: border-box;
  }
  .obal .pravy {
    padding-top: 0;
    padding-right: 0;
  }
  .obal-vpravo .levy {
    padding-top: 0;
    padding-left: 0;
  }