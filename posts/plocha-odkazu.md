---
title: "Plocha odkazu"
headline: "Plocha odkazu"
description: "Proč a jak vytvářet klikací plochu kolem odkazu."
date: "2014-12-16"
last_modification: "2014-12-21"
status: 1
tags: ["Rady a nápady", "Odkazy"]
---

Častým nedostatkem na webových stránkách je **malá plocha odkazu**. Zvlášť problematické je to na **dotykových zařízeních** s menšími displeji, kdy je problém malý odkaz **prstem trefit**.

V řadě případů přitom jde plochu odkazu zvětšit prostým **využitím prázdného místa**.

## Menu

Budeme-li mít například následující [menu](/menu):

    .priklad-menu {background: #fff; width: 10em; margin: 0}
    .priklad-menu a {border: 0; text-decoration: none}

    - [První odkaz](#)

    - [Druhý delší odkaz na více řádků](#)

    - [Odkaz](#)

Bylo by lepší, kdyby odkazy *klikaly* po celé šířce, často k tomu stačí jen přidat [`display: block`](/display#block).

    .vetsi-plocha a {display: block;}

    - [První odkaz](#)

    - [Druhý delší odkaz na více řádků](#)

    - [Odkaz](#)

## Klikněte zde

Dále nedostatečnou plochou trpí prosté odkazy typu:

  Pro jako zobrazení klikněte [zde](#).

Zvětšit klikací plochu jde snadno uvedením **výzvy k akci**:

  [Jako zobrazit](#)

Kromě zvětšení plochy je to výhodné i pro uživatele, protože když se při **rychlém pročítání stránky** zastaví na odkazu jakožto **výrazném prvku**, rychle pochopí jeho význam (nemusí číst text okolo).

Obzvlášť důležitý odkaz je rozumné ještě **zvýraznit odlišným stylem**.

    .dulezity-odkaz a {
      display: block;
      margin: auto;
      width: 50%;
      text-align: center;
      color: #fff;
      border: 1px solid;
      border-radius: .5em;
    }
  
  [Jako zobrazit](#)

## Stránkování

Níže uvedené [stránkování](/strankovani) bude nejspíš velmi nepohodlné.

    [1](#) [2](#) **3** [4](#) [5](#)

Šlo by lehce vylepšit přidáním vycpávky (`padding`u):

    .lepsi-strankovani * {padding: .5em 1em; text-align: center;}

    [1](#) [2](#) **3** [4](#) [5](#)

Zrovna v případě stránkování se ale dá celý problém často řešit **úplně jinak** a lépe:

    [&laquo; Předchozí](#) [Další &raquo;](#)

## Příliš velká plocha

Opačným problémem je naopak **příliš velká klikací plocha**. Uživatelé používající pro ovládání **myš** si ji potřebují někam *odložit* – mít kursor v části stránky, která nic nedělá. Hodí se to třeba při **přepínání mezi nemaximalisovanými okny** nebo pro použití **kontextové nabídky**.

Typickým (většinou) špatným příkladem je výpis témat v diskusním fóru, kde „klikají“ celé řádky.

Pro uživatele **dotykových zařízeních** to většinou problém nebývá.

## Odstupy od odkazů

Co je naopak zásadní problém některých [responsivních webů](/responsivni-web) na dotykových zařízeních je nedostatečný prostor mezi jednotlivými odkazy. V kombinaci s **malou plochou** to může totálně znemožnit pohodlné trefení se na požadované místo.

## Testování

Google při testování stránek, jestli se hodí pro mobilní zařízení, posuzuje jako jednu z věcí i právě **velikost a rozestupy mezi odkazy**. Úspěšné stránky potom označuje jako „[mobile-friendly](/google-mobile-friendly)“.

[Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/)