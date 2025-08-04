---
title: "Filtr blur"
headline: "Rozmazání obsahu"
description: "Rozmazávání obsahu v různých prohlížečích."
date: "2013-10-12"
last_modification: "2013-10-14"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

Podobně jako u [průhlednosti](/opacity) nebo [otáčení](/rotace) panuje i u **rozmazávání** nejednotnost napříč prohlížeči.

CSS vlastnost [`filter`](/filter) je zajímavá tím, že ji velmi odlišně podporují prohlížeče **Internet Explorer** (už od prastaré verse 4 do IE9) a **současné prohlížeče**.

## IE 9 a starší

Jak filtry fungují v těchto Explorerech je popsáno na JPW včetně [živých příkladů](http://www.jakpsatweb.cz/css/css-filtry-priklady.html) ([screenshot z IE 9](/files/blur/ie9.png)). Tedy je vidět, že funguje i kýžený **filtr pro rozmazání**:

```
element {
  filter: blur;
}

```

Filtry **ve starších IE** se **dost špatně** [testují](/prohlizece). IETester ani přepnutí režimu v Internet Exploreru 10 **neodpovídá** skutečnému IE.

## Chrome

[Ukázka](http://kod.djpw.cz/yoc)

Chrome (a jiné prohlížeče založené na Webkitu) podporují novou podobu CSS vlastnosti `filter` (zatím s [prefixem](/css-prefixy)). Rozmazání potom vypadá následovně:

```
element {
  *-webkit-*filter: blur**(**2px**)**;
}
```

Hodnota v závorkách stanovuje **intensitu romazání**. Lze očekávat, že tento postup by v budoucnu mohly podporovat všechny prohlížeče.

## Firefox

[Ukázka](http://kod.djpw.cz/xoc)

Firefox (jádro Gecko) podporuje vytvoření filtru v [SVG](/svg) (stačí umístit do HTML kódu nebo přes protokol `data:`):
  ```
&lt;svg>
    &lt;filter id="rozmazany-filtr">
        &lt;feGaussianBlur stdDeviation="2" />
    &lt;/filter>
&lt;/svg>
```

A následně filtr připojit přes CSS zápis:

```
element { filter: **url**(#rozmazany-filtr) }
```

Výše uvedené způsoby pro Gecko a Webkit lze spojit a filtr pro IE9 (a starší IE) připojit [podmíněným komentářem](/podminene-komentare). 

## Internet Explorer 10 a Opera 12

Tyto prohlížeče umí rozmazávat jen přímo SVG elementy, popř. `&lt;image&gt;` obrázky. Situace je stejná jako u [černobílého filtru](/cernobily-obrazek#ie10). Při trochu jiném zápisu rozmazávacího filtru zafunguje **shození IE 10 do staršího režimu**:

```
&lt;meta http-equiv="X-UA-Compatible" content="IE=9">
```

**Filtr**:

```
filter:progid:DXImageTransform.Microsoft.Blur(pixelradius='2', shadowopacity='0.0');
```

[Ukázka](http://kod.djpw.cz/qqc-) (Měla by kromě Opery fungovat všude.)

## Jiné způsoby rozmazávání

### Stín

Stačí-li **rozmazat jen písmo**, docílí se toho i vlastností `text-shadow` (funkční od **IE 10**).

  Rozmazaný text

### Duplikování elementu

Pokud se obsah k rozmazání několikrát naklonuje a s [průhledností](/opacity) umístí vždy s [lehkým posunem](/position#relative), získáme tak rovněž efekt rozmazání.

    .duplikovani {position: relative; height: 4em; width: 100%}
    .duplikovani p {position: absolute; top: 0; opacity: .25}

  Rozmazaný text

  Rozmazaný text

  Rozmazaný text

  Rozmazaný text

Duplikování obsahu by s ohledem na smysluplnost HTML kódu měl dělat JavaScript.

[Ukázka](http://kod.djpw.cz/epc)

## Odkazy

  - DJPW: [Windows Aero Effect na webu – jak na to?](http://djpw.cz/152121)

  - Vlastnost [`filter`](http://devdocs.io/css/filter) v DevDocs

  - [Motion Blur Experiment](http://codepen.io/lbebber/pen/zxpMZw/) – rozmazání elementu při jeho přesunutí