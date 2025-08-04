---
title: "Co je to polyfill?"
headline: "Co je to polyfill?"
description: "Polyfillem se rozumí automatické alternativní řešení, které dokáže zajistit funkčnost něčeho nepodporovaného."
date: "2014-11-07"
last_modification: "2015-11-12"
status: 1
tags: ["JavaScript", "Prohlížeče"]
---

Typicky se jedná o JavaScriptový kód, který pro nepodporovaný prohlížeč **automaticky doplní určitou funkčnost**, aniž by programátor musel něco dělat.

Technicky vzato polyfill použije nějaké horší, ale v daném prohlížeči nejlepší možné, řešení k dosažení výsledku.

## Výhody a nevýhody

Hlavní výhodou je použití nejlepšího možného standardisovaného řešení v nových prohlížečích bez ztráty času vytvářením dalších řešení pro nepodporované prohlížeče.

Největším risikem použití JS polyfillu je fakt, že daná funkce může být kvůli tomu v horších prohlížečích **závislá na JavaScriptu**, ač by šla konservativnějším řešením vytvořit jen v HTML/CSS.

Zde může nastat paradoxní situace, kdy pro vyšší výkon novějších rychlejších prohlížečů (zpravidla běžících na rychlejším HW) je zvoleno náročnější řešení pro staré pomalé prohlížeče na starém hardwaru.

Extrémní jsou potom situace, kdy se polyfill používá pro věci, co se teprve budou implementovat do prohlížečů.

## Modelový příklad polyfillu

V prohlížečích **IE 6–8** nejde udělat **kulaté rohy** pomocí CSS vlastnosti [`border-radius`](/border-radius).

Na výběr je následující:

    Počítat s tím, že vytvořit čistě v CSS kulaté rohy pro tyto prohlížeče nejde, a proto se **v grafickém návrhu oblým rohům vyhnout**.

    Řídit se tím, že stránka **nemusí vypadat ve všech prohlížečích stejně**, a kulaté rohy ve starších prohlížečích oželet a v nových použít `border-radius`.

    Zvolit konservativní **řešení pomocí obrázků**, které bude bezproblémově fungovat i ve starých prohlížečích, jen ty nové nedostanou nejlepší možné řešení, jaké by mohly. Což není takový problém, protože jsou rychlé a běží typicky na lepším HW.

    Vyvinout dvě řešení – jedno pro nové prohlížeče přes `border-radius` a druhé pomocí obrázků pro ty staré.

    Použít polyfill [`border-radius.htc`](http://code.google.com/p/curved-corner/downloads/detail?name=border-radius.htc), který u elementu s kulatými rohy zjistí hodnotu jeho `border-radius`u (pomocí [`getComputedStyle`](/zjisteni-css)) a kulatý roh nakreslí pomocí VML (*Vector Markup Language* – předchůdce SVG od Microsoftu).

S ohledem na různé vlivy se potom vyplatí použít některý z přístupů. Volba se typicky liší projekt od projektu.

## Příklady

  - [Polyfill `localStorage` pro **IE 7**](/localstorage#ie7)

  - [addEventListener polyfill pro **IE 6+**](https://gist.github.com/eirikbacker/2864711/946225eb3822c203e8d6218095d888aac5e1748e)

## Odkazy jinam

  - [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

  - [Polyfill service](http://cdn.polyfill.io/v1/docs/) – na základě názvu prohlížeče doplní chybějící funkce

  - Martin Michálek: [Polyfill](http://www.vzhurudolu.cz/prirucka/polyfill)

  - Mozilla Hacks: [An easier way of using polyfills](https://hacks.mozilla.org/2014/11/an-easier-way-of-using-polyfills/)

  - Todd Motto: [Polyfills suck, use a featurefill instead](http://toddmotto.com/polyfills-suck-use-a-featurefill-instead/) – používání polyfillů ve vlastních knihovnách bez ovlivňování okolí

  - The new code: [Understanding HTML5 Polyfills, Shivs and Shims](http://thenewcode.com/18/Understanding-HTML5-Polyfills-Shivs-and-Shims)