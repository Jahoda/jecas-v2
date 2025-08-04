---
title: "Skloňování"
headline: "České skloňování"
description: "Jak v JS, PHP nebo CSS správně vytvořit skloňování slov pro české prostředí."
date: "2015-01-26"
last_modification: "2015-01-27"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

Pokud se má na stránce automaticky vypisovat něco ve stylu „5 nových komentářů“, je třeba **řešit skloňování**.

Bez správného ohýbání slov by web mohly hyzdit texty typu:

  - 2 nových komentářů

  - Nových komentářů: 1

## Skloňování počtu v češtině

Zatímco angličtina rozlišuje mezi jedničkou a vším ostatním (*1 comment* vs. *2 comment**s***), čeština je v tomto komplikovanější.

  - *1 komentář*

  - *2, 3, 4 komentáře*

  - *5* a více *komentářů*

Při psaní českého textu aplikace jsou proto potřeba **tři různé tvary**.

## Skloňování v JavaScriptu

Funkce zajišťující správné skloňování musí zvolit česky korektní tvar na základě **počtu**. Aby funkce fungovala i pro **záporná čísla** převádí se počet na číslo **kladné** – absolutní hodnotu (`Math.abs`).

```
function sklonovani(pocet, slova) {
  pocet = Math.abs(pocet);
  if (pocet == 1) return slova[0];
  if (pocet &lt; 5 &amp;&amp; pocet > 0) return slova[1];
  return slova[2];
}
```

Použití je následovné (tvary pro jednotlivé počty se předávají jako pole):

```
var pocetKomentaru = 5;
alert(
  sklonovani(
    **pocetKomentaru**, 
    ['komentář', 'komentáře', 'komentářů']
  )
);
```

webů

function sklonovani(pocet, slova) {
  pocet = Math.abs(pocet);
  if (pocet == 1) return slova[0];
  if (pocet  0) return slova[1];
  return slova[2];
}
function pocet(el) {
    el.nextSibling.innerHTML = sklonovani(
        el.value, 
        ['web', 'weby', 'webů']
    );
}

[Samostatná ukázka](http://kod.djpw.cz/bxjb)

## Skloňování slov v PHP

PHP a JS jsou si hodně podobné.

    - [Převedení PHP do JavaScriptu](/php2js)

Skloňující funkce tedy bude velmi podobná jako v JavaScriptu.

```
function sklonovani($pocet, $slova) {
  $pocet = abs($pocet);
  if ($pocet == 1) return $slova[0];
  if ($pocet &lt; 5 &amp;&amp; $pocet > 0) return $slova[1];
  return $slova[2];
}
```

Použití:

```
echo sklonovani(
  3, // tři komentáře 
  array('komentář', 'komentáře', 'komentářů')
);
```

## Správný tvar slov v CSS

I v prostém HTML/CSS jde skloňování nouzově vyřešit.

Dá-li se zajistit výpis počtu do CSS třídy, správného tvaru slov se docílí vypsáním v CSS vlastností [`content`](/content).

    - [Skloňování v CSS](/programovani-css)