---
title: "Z-index"
headline: "Z-index"
description: "K čemu je CSS vlastnost <code>z-index</code> a jak mít v jejím užívání systém."
date: "2015-10-04"
last_modification: "2018-01-04"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Vlastnost `z-index` slouží pro upravení chování **překrývání elementů přes sebe**. Písmeno `z` v názvu značí osu Z.

Má vliv pouze na [posicované](/position) elementy, tj. hodnota `position` jiná než výchozí `static` (například `absolute`, `relative` nebo `fixed`).

## Výchozí chování `z-index`u

Výchozí chování CSS je takové, že element později umístěný v [HTML](/html) kódu bude nejvíc nahoře (nejvíc vepředu v ose Z).

Čtvereček na ukázce tak překryje *první element*:

    .relativni-1 {
      position: relative;
    }
    .absolutni-1 {
      position: absolute;
      top: 2em;
      width: 1em;
      height: 1em;
      background: #1081DD;
    }
  
  První element

Při opačném pořadí v kódu bude čtvereček **pod** *druhým elementem*:

  Druhý element

Toto chování překrývání se týká pouze nestaticky posicovaných prvků. Cokoliv s výchozím `position: static` bude překryto čímkoliv s `relative`/`absolution`/`fixed`, **nezávisle na umístění v kódu**:

  Druhý element se statickou posicí

## Zápis `z-index`u

Hodnoty `z-index`u nabývají následujících hodnot:

  `auto`
  
    Výchozí hodnota. Totéž jako žádný `z-index`.

  `z-index: -1`
  
    Záporný `z-index` typicky vede ke schování elementu za obsah.

  `z-index: 1`
  
    Kladná hodnota potom zajistí posun elementu před ostatní.

  `z-index: 0`  
  
    Pouze vytvoří novou *skupinu*, ve které se počítají `z-index`y.

### Rozdíl mezi `z-index: auto` a `0`

Na první pohled se může zdát, že hodnoty `auto` i `0` dělají to samé. Tedy nedělají nic.

Není tomu tak. Nulová hodnota způsobí vytvoření nové skupiny.

Vlastnost `z-index` totiž postihuje i vnořené nestatické elementy uvnitř svého rodiče.

V případě neuvedení `z-indexu` nebo `z-index: auto` bude světlemodrý element, který je potomkem tmavěmodrého, překrývat růžový element (protože 1000 > 1).

V případě uvedení `z-index: 0` by se vytvořila z tmavěmodrého elementu nová skupina, kde se úrovně počítají od nuly a nebylo by tak možné se z ní dostat nad růžový element:

## Test chování `z-index`u

Překrývání elementů při změně `z-index`u je možné pozorovat na následující ukázce.

      `auto`
&minus;+
    `auto`
&minus;+
    `auto`
&minus;+

## Systém v indexech

Docela problematické je udržet v číslech indexů nějaký systém. Typicky kodér v momentě, kdy potřebuje něco překrýt, použije nějaké číslo v řádu desítek nebo stovek, aby měl jistotu, že to zafunguje. Třeba:

```
.ikona {
  z-index: 999;
}
```

Potom je například potřeba přidat na stránku fixní lištu:

```
.lista {
  z-index: 10;
}
```

A problém bude na světě. Drobná ikonka bude překrývat lištu.

Potenciálně problematické elementy lze rozdělit do následujících skupin:

  - Drobné posicované elementy.

  - [Fixní](/fixed) lišty a panely.

  - [Lightboxy](/lightbox) a překryvná okna.

  - Dialogová okna, [hlášky](/vlastni-alert), [indikace načítání](/css-spinner).

Teoreticky by se mohlo nabízet mít pro každou skupinu stanovené rozmezí. Například:

```
.obycejny-element {z-index: 100}
.fixni-lista {z-index: 200}
.lightbox {z-index: 300}
.hlaska {z-index: 400}
.nacitani {z-index: 401}
```

Bohužel při používání stylů a skriptů třetích stran kvůli tomu může nastat problém.

Lepší postup mi tak přijde držet `z-index` co nejnižší (podobně jako sílu [CSS selektorů](/css-selektory)) a zvedat ho po jedničkách, když už nejde jinak.

Vysoký `z-index` jde případně v jistém smyslu [*resetovat*](#nula-auto) přidáním obalu s nízkým nebo nulovým `z-index`em. I to má ale problém, protože se potom z vnořeného elementu nepůjde dostat *výš*, ani kdyby to bylo potřeba.

## Minimální/maximální hodnota

Podle specifikace je hodnota `z-index`u typu *integer*. To znamená rozsah od &minus;2 147 483 648 až do 2 147 483 647.

Maximální hodnota je tedy **2147483647**. Využívají toho některé externí skripty třetích stran (třeba fixní lišta „ověřeno zákazníky“ od Heureka), které si webmasteři připojují do stránky. Zajistí se tak v případě posicování překrytí původního obsahu.

Některé starší prohlížeče se liší v této maximální hodnotě:

  - Maximální hodnota v **Safari 3** a starších je **16777271**.

  - **Firefox 2** a starší při překročení hodnoty **2147483647** skryje element.

  - **Firefox 3** při překročení nastaví hodnotu na **0**.

  - Ostatní prohlížeče berou překročení jako maximální hodnotu integeru.

## Odkazy jinam

  - [How z-index Works](http://bitsofco.de/2015/how-z-index-works/)

.z-index div {position: absolute; width: 100px; height: 100px;
    text-align: center; padding-top: 1em; color: #fff; border-radius: 50%; box-sizing: border-box}
.sz-index div:hover {border: 2px solid #000; margin: -2px}
.z-index p {background: #fff}
.prvni {background: #0D6AB7; left: 5px; top: 5px}
.druhy {background: #DA3F94; left: 90px; top: 5px}
.treti {background: #1081DD; left: 50px; top: 80px}

function umisteni(el, smer) {
var parent = el.parentNode;
var kod = parent.getElementsByTagName("code")[0];
var value = kod.innerHTML;
if (value == "auto") {
  value = (smer == 1) ? 0 : -1;
}
else if ((value == 0 && smer == -1) || (value == -1 && smer == 1)) {
  value = "auto";
}
else {
  value = parseInt(value) + smer;
}
kod.innerHTML = value;
parent.style.zIndex = value;
}

  .live {
    position: relative;
  }
  .zIndexLive {
    background: transparent;
  }
  .zIndexLive button {
    transition: .2s;
  }
  .zIndexLive button:hover {
    background: #fff;
        color: #000;
  }