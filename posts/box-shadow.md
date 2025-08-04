---
title: "Box-shadow"
headline: "Box-shadow"
description: "Vlastnost <code>box-shadow</code> umí vytvořit CSS stín kolem elementu."
date: "2014-04-24"
last_modification: "2019-10-14"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Pro vytvoření stínu kolem textu slouží CSS vlastnost [`text-shadow`](/text-shadow).

## Podpora

Dobře podporovaná vlastnost napříč všemi běžnými prohlížeči.

## Zápis

```
element {
  box-shadow: **10px 5px** *5px* red;
}
```

  function el(id) {
    return document.getElementById(id);
  }
  function upravitStin() {
    var css = (el("umisteni").checked ? (el("umisteni").value + " ") : "") + el("x").value + "px " + el("y").value + "px " + el("rozmazani").value + "px " + el("velikost").value + "px " + el("barva").value;
    el("test").style.boxShadow = css;
    el("test-css").innerHTML = css;
  }

  Vnitřní stín
  
    Jako první hodnotu je ještě možné zadat `inset`, což vytvoří stín uvnitř elementu.

    Tuto hodnotu jde uvést i jako poslední. V některých prohlížečích funguje i kdekoliv jinde mezi umístěním a barvou, ale minimálně **Edge** nebo **Safari** si s tím neporadí.

  Umístění
  
    V ukázce výše první dvě hodnoty udávají umístění stínu.

        První hodnota je **horisontální** (vodorovná). Čím větší hodnota bude nastavená, tím **vpravo** bude stín větší. Přehodit stín **doleva** je možné zadáním záporné hodnoty. -100  100        

        Druhá hodnota je **vertikální** (svislá). Nastavuje velikost stínu **dole**. Nebo **nahoře** při zadání záporné hodnoty. -100  100

  Rozmazání
  
    Další hodnota určuje, jak moc bude stín rozmazaný. Při nulové hodnotě tedy bude vypadat jako obyčejný rámeček. 0  100

  Velikost
  
    Dokáže roztáhnout stín všemi směry. 0  100

  Barva
  
    Poslední hodnota je barva stínu. 

## Pokročilé

### Průhledný stín

Barvu stínu je možná zadávat přes [`rgba()`](/opacity#rgba), to může vytvořit poloprůhledný stín.

### Kulaté rohy

Vlastnost `box-shadow` ctí i [`border-radius`](/border-radius). Kolem kulatého rohu proto bude kulatý stín.

## Vícenásobné stíny

Pro jeden element je možné zadat více stínů. Stačí je oddělit čárkami.

```
element {
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 
              0 2px 2px rgba(0, 0, 0, .1), 
              0 4px 4px rgba(0, 0, 0, .1), 
              0 8px 8px rgba(0, 0, 0, .1);
}
```

Je poměrně běžné tímto způsobem docílit *hezčích*/plynulejších stínů:

  .obycejny-stin {
    box-shadow: 0 4px 4px rgba(0, 0, 0, .3);
  }
  
  .hezci-stin {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 
                0 2px 2px rgba(0, 0, 0, .1), 
                0 4px 4px rgba(0, 0, 0, .1), 
                0 8px 8px rgba(0, 0, 0, .1);
  }  

  Obyčejný jeden stín

  Hezčí vícenásobný stín

Více třeba v samostatném článku:

    - Tobias Bjerrome Ahlin: [Smoother &amp; sharper shadows with layered box-shadows](https://tobiasahlin.com/blog/layered-smooth-box-shadows/)

## Historie

CSS stíny fungují od **IE 9**. Ve starších Internet Explorerech šlo stín vytvořit přes [*starou* CSS vlastnost `filter`](http://msdn.microsoft.com/en-us/library/ms533086(v=vs.85).aspx). Pro starší **Webkit**, **Firefox** nebo **Operu** se používala vlastnost s [CSS prefixy](/css-prefixy).

Když `box-shadow` ještě moc nefungoval, řešily se stíny buď obrázky, nebo mnoha obalovými elementy, které měly například 1px rámečky, což stín simulovalo.

## Odkazy

  - [Shine.js](http://bigspaceship.github.io/shine.js/) – dynamické generování stínů v JavaScriptu.

  - [brumm.af/shadows](https://brumm.af/shadows) – nástroj pro generování hezkých stínů