---
title: "Rychlé kliknutí a vyvolání události"
headline: "Rychlé kliknutí a vyvolání události"
description: "Jak zajistit, aby ovládací prvky uživatelského rozhraní reagovaly správně i na rychlé kliknutí."
date: "2014-01-27"
last_modification: "2014-01-28"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady", "JS události"]
---

## Problém

Ovládací prvky běžných JS aplikací zpravidla provádějí nějakou [událost při kliknutí myši](/udalosti-mysi) (`onclick`).

  Kliknout

Co nepěkného se může stát? V situaci, kdy uživatel bude chtít kliknout na více věcí v **rychlém sledu**, se snadno stane, že pohyb myši v momentě kliknutí událost `onclick` **nespustí**.

Toto může nastat ve třech **reálných** případech:

  - uživatel tlačítko myši stlačí, potom si uvědomí, že **kliknout nechce**, a tak odjede pryč, aby akci nevyvolal,

  - uživatel je tak rychlý, že chce na prvky klikat *za jízdy*, tudíž akci nevyvolá,

  - uživatel má problémy s přesností a kliknutí bez (lehkého) posunu myši je pro něj **obtížné**.

Kromě bodu 1 jsou to situace **nežádoucí**. A nepomůže ani použití tlačítka (`&lt;button>`) nebo odkazu.

  [Kliknout odkazem](javascript:alert('Kliknuto'))
  Kliknout tlačítkem

## Řešení

Odstranit tento problém umí událost `onmousedown`.

  [Kliknout odkazem](javascript://akce)
  Kliknout tlačítkem

Výhodné to může být i v rychlosti aplikace (`onmousedown` člověk provede běžně o desítky milisekund dříve než `onclick`). Problém ale je v *rozmyslení si kliknutí*.

Docela funkční mi přijde postup, kdy se při `onmousedown` požadovaná akce připraví do `onmouseup` (puštění tlačítka nad elementem) a `onmouseout` (odjetí myší z elementu). A z `onmouseout` se akce po nějaké době (cca 80 milisekund) vyhodí [časovačem](/odpocitavani).

[Živá ukázka](http://kod.djpw.cz/ymbb) srovnávající oba přístupy.

Pokud se výsledek akce má získávat [AJAXem](/ajax), nabízí se požadavek na soubor zavolat již při `onmousedown`, ale zobrazit až při *potvrzení* kliknutí (`onmouseup`/`onmouseout`).

    function kliknout(el, callback) {
      el.onmouseup = el.onmouseout = function() {
        callback();
        el.onmouseup = el.onmouseout = null;
      } 
      setTimeout(function() {
        el.onmouseout = null;
      }, 80);
    }
  
  Chytře klikající tlačítko