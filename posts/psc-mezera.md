---
title: "Mezera v PSČ"
headline: "Mezera v PSČ"
description: "Jak a zda vůbec automaticky odsazovat uživatelem zadané znaky PSČ do formulářového políčka."
date: "2014-04-28"
last_modification: "2015-07-24"
status: 1
tags: ["Hotová řešení", "Formuláře", "Rady a nápady"]
---

Při zadávání poštovního směrovacího čísla může někoho napadnout, že by se jednotlivé číslice mohly **automaticky odsazovat**.

Obyvyklý formát PSČ sestává ze tří čísel, mezery a dalších dvou čísel. Například:

  155 00

(Více informací o poštovních směrovacích číslech je k nalezení na [Wikipedii](http://cs.wikipedia.org/wiki/Poštovní_směrovací_číslo).)

Z technického hlediska není problém automaticky po zadání třetího znaku přidat mezeru.

    function pridatMezeru(el) {
      if (el.value.length == 3) {
        el.value += " ";
      }
    }
  
  PSČ: 

Najednou ale zjišťujeme, že je to zcela **nedostatečné** – je potřeba řešit následující případy a otázky:

  - Automatickou mezeru by mělo být **možné smazat**.

  - Když člověk zadá třetí číslo chybně a bude ho chtít **smazat** klávesou Backspace, má se mazat číslo, nebo mezera?

  - Co s obsahem **vloženým ze schránky** nebo vybraným z uložených hodnot v prohlížeči?

  - Nebude uživatele plést, že se mu pole **mění pod rukama**?

Něco je řešitelné [inteligentnějším scriptem](http://digitalbush.com/projects/masked-input-plugin/).

PSČ: 

$("#psc").mask("999 99", {placeholder: " "});

[Samostatná ukázka](http://kod.djpw.cz/aobb)

Je dobré si **určit přínos**, který automatické vložení mezery přináší. Asi by to mělo být **minimalisování chyb při zadávání**, kdy vložení mezery celé *PSČ* zpřehlední.

Zavedení doplňování mezery nám rozdělí uživatele do dvou skupin:

  - Díky automatickému doplnění mezery si **všimnou překlepu** a PSČ tak bude v méně případech omylem špatně vyplněné.

  - Nestandardní chování a *měnění pod rukama* bude uživatele **obtěžovat**.

A ta klíčová otázka je, **které skupině dát přednost**. Či zda vůbec není zvláštní políčko pro PSČ [nadbytečné](/chyby-formularu#hodne-policek). Existenci poštovního směrovacího čísla je navíc možné relativně snadno ověřit oproti databási PSČ, která je dostupná na webu [České pošty](http://www.ceskaposta.cz/ke-stazeni/zakaznicke-vystupy).

Otázku automatického vkládání mezer můžeme řešit ale i např. při zadávání **telefonního čísla**, které už ověřovat moc nejde. Nepříjemné chování, kdy se obsah `&lt;input>`u mění pod rukama, vyřeší i *přeformátování* až při opuštění políčka (JS událost `onblur`) – bohužel toho si zase ale uživatel už **nemusí všimnout**…

## Odkazy jinam

    [Input Masking](https://github.com/estelle/input-masking) – zobrazení požadovaného formátu přímo v `&lt;input>`u

  - [Politespace](https://github.com/filamentgroup/politespace) ([demo](http://filamentgroup.github.io/politespace/demo/demo.html)) – přidání mezery při opuštění formulářového pole (`onblur`)

  - [Numeral.js](http://numeraljs.com/) – nástroj pro formátování a manipulování s číslicemi

  - [Debata na DJPW o vhodnosti přidávání mezery](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=154566)