---
title: "Jak funguje position: sticky"
headline: "Jak funguje CSS <code>position: sticky</code>"
description: "CSS <code>sticky</code> posice umožňuje bez JS zafixovat element ke kraji okna při rolování."
date: "2015-06-02"
last_modification: "2020-03-18"
status: 1
tags: ["CSS", "CSS vlastnosti", "Scrollování", "Fixní posice"]
---

*Sticky* je v překladu něco jako *lepkavý* – element se při rolování dokáže „přilepit“ k okraji.

```
.sticky {
  position: sticky;
  top: 0;
}
```

Vlastnost [`position`](/position) měla dlouhé roky 4 možné hodnoty:

  - `position: static` – výchozí hodnota

  - `position: relative` – relativní posun oproti původnímu umístění bez ovlivnění okolí

  - `position: absolute` – vyjmutí z původního místa

  - `position: fixed` – vyjmutí z původního místa + zafixování

Hodnota `sticky` je tak trochu kombinací výše uvedeného. 

Když je *sticky* element uvnitř *viewportu*, chová se jako `static`/`relative`, tedy se nijak neprojevuje.

Po opuštění okna se potom chová jako `absolute` (zobrazení mimo přirozené umístění) a `fixed` (zafixování na jednom místě).

## Podpora

Velmi dobře podporovaná vlastnost. Nefunguje v akorát v pomalu mizícím **IE 11**.

Řešení pro **IE 11** je buď použít JavaScript, nebo *sticky* oželet, pokud to není nezbytné pro ovládání webu.

Pro starší verse ostatních prohlížečů se hodí přidat [CSS prefix](/css-prefixy) – `position: -webkit-static`.

  ## Použití

  Použití je na první pohled velmi jednoduché, stačí elementu přidat `position: sticky` a nějaké umístění, např. `top: 0`.

    .sticky-element {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
    }

    Nefunkční sticky element

  Jak je vidět na předchozím příkladu, nic to nedělá.

  Co takhle? Funkční sticky element.
  
  [Samostatná živá ukázka](http://kod.djpw.cz/bgvc) – nejjednodušší sticky element

  Trik je v tom, že *sticky* element si **automaticky určí svého rodiče jako oblast pro přilepování**.

  Pokud tedy v nadřazeném elementu není žádný další obsah, nic se nestane:

  ```
&lt;div&gt;
  &lt;div class="sticky-element"&gt;
    Nic se nestane
  &lt;/div&gt;
&lt;/div&gt;
```

  Je třeba to udělat následovně:

  ```
&lt;div&gt; &lt;!-- sticky kontejner --&gt;
  &lt;div class="sticky-element"&gt;
    Funkční sticky obsah
  &lt;/div&gt;
  Další obsah
&lt;/div&gt;
```

  Toto chování se hodí k tomu, že se *sticky* element může zase odlepit, když celý jeho rodič (sticky kontejner) opustí viewport.

[Živá ukázka](http://kod.djpw.cz/kfvc) – přichytávání nadpisů

### Umístění sticky elementu

Obsah není nutné přichytávat jen nahoru (`top: 0`). Není problém použít `bottom: 0`:

[Živá ukázka](http://kod.djpw.cz/lfvc) – přichytávání patičky

V případě vodorovného scrollování se hodí i vlastnosti `right` nebo `left`.

Hodnoty potom mohou být běžné délkové jednotky, nemusí to být nutně jen `0`.

### Vlastnost `z-index`

Umístění v ose Z funguje stejně jako [`z-index`](/z-index) u ostatních způsobů posicování.

## Využití

*Lepkavá* posice je velmi užitečná k nahrazení leckdy komplikovaných JS řešení:

    - [Fixní menu při rolování](/fixni-menu)

    - [Jak vytvořit fixovaný banner?](/sidebar)

Podobné věci jde udělat pouze v CSS.

[Živá ukázka](http://kod.djpw.cz/agvc) – přichytávací fixní menu

## Fixní sloupce a řádky tabulky

Hodně užitečná je `sticky` posice u [tabulek](/html-tabulky). Jde tak elegantně zafixovat řádek i sloupec bez dalších omezení (výška/šířka obsahu).

U tabulek se sticky chová trochu jinak – `position: sticky` se aplikuje na buňky (`&lt;tr&gt;` a `&lt;th&gt;`) a celá tabulka je potom *sticky kontejner*.

Není možné fixovat přímo značku `&lt;thead&gt;`.

### Fixní řádek

Pro **zafixování řádku** nahoru tedy stačí jeho buňkám nastavit `position: sticky` a `top: 0`:

[Živá ukázka](http://kod.djpw.cz/ofvc) – fixní záhlaví tabulky

### Fixní sloupec

Pro **přichycení sloupce** je postup velmi podobný.

Sloupci, který má být fixovaný, se přidá `position: sticky` a `right: 0` nebo `left: 0` (podle toho, jestli jde o první/poslední sloupec řádku).

Aby celá stránka **neměla posuvník**, je třeba ještě obalit tabulku do něčeho s `overflow-x: auto`:

[Živá ukázka](http://kod.djpw.cz/vfvc) – fixní sloupec tabulky

### Fixní řádek i sloupec zároveň

Kombinací obou postupů jde fixovat řádek i sloupec zároveň.

Je k tomu ale nejspíš nutné nastavit obalu tabulky pevnou nebo maximální výšku a `overflow: auto`, aby se měl řádek kam přichytit.

Pro maximální výšku se hodí použít viewport jednotky (např. `100vh` pro tabulku přes celou výšku).

Nevýhoda tohoto postupu je v tom, že jsou na stránce dva svislé posuvníky:

[Živá ukázka](http://kod.djpw.cz/ufvc) – tabulka s fixní řádkem i sloupcem.

## Odkazy jinam

  - [CSS Position Sticky - How It Really Works!](https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46)

  - Google Developers: [An event for CSS position:sticky](https://developers.google.com/web/updates/2017/09/sticky-headers)

  - [position: sticky](http://html5-demos.appspot.com/static/css/sticky.html)

  - [Sticky Positioning with Nothing but CSS](http://webdesign.tutsplus.com/tutorials/sticky-positioning-with-nothing-but-css--cms-24042)

  - [How to Create Sticky Navigation with CSS or jQuery](http://designmodo.com/sticky-navigation-css-jquery/)