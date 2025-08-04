---
title: "Posicování v CSS"
headline: "CSS vlastnost <code>position</code>"
description: "CSS rozlišuje statickou, relativní, absolutní a fixní posici. K čemu je co dobré?"
date: "2013-09-09"
last_modification: "2015-10-06"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Statická (`position: static`)

Výchozí hodnota všech elementů. Má tedy smysl jen pro *přebíjení* dříve přenastavených hodnot…

Vlastnosti `top`, `left`, `right` a `bottom` jsou ignorovány.

## Relativní (`position: relative`)

Umožňuje snadno posunout element ze svého přirozeného umístění.

```
element {position: relative; top: -2px; left: -2px}
```

Tučné **slovo** je relativně posunuto o 2 pixely nahoru a vlevo.

var reltest = document.getElementById("reltest");

Zapnout/vypnout relativní posici

### Využití

Občas se hodí k [drobným posunům](/stejne-vysoke-sloupce#ramecek), výhoda je, že relativním posunem **není ovlivňován** žádný další prvek na stránce — tudíž všechno ostatní zůstane na svém místě. Relativně posicovaný element zabere na původním místě prostor, ale klidně je ve skutečnosti někde jinde.

  Problém ale může být, že výchozí umístění relativně posicovaného elementu **je ovlivňována okolím**, proto je `position: relative` krajně nevhodné třeba pro stavbu celého layoutu, ač by se to na první pohled mohlo zdát jako dobrý nápad.

.relativni-layout div {background: #efefef; padding: 10px; border: 1px solid #ccc;
  margin: 10px; line-height: 20px}

.levy {width: 100px}
.pravy {width: 400px; position: relative;
  top: -52px; left: 130px
}

  Levý
  Pravý

var relayout = document.getElementById("relayout").getElementsByTagName("div")[0];

Nicméně stačí přidat nějaký obsah do levého sloupce, což změní výšku, což odsune pravý element níže, a celá *křehká sestava* se rozpadne.

Občas se relativní posun může hodit k **rychlému *zalepení* rozhozeného vzhledu**, ale z výše uvedeného důvodu to moc systémové řešení není.

Mnohem častěji se `position: relative` používá při posicování absolutním pro omezení rámce, kde se absolutně posicuje.

## Absolutní (`position: absolute`)

Zatímco elementy s hodnotami `static` a `relative` jsou ovlivňovány okolím a stejně tak okolní elementy ovlivňují – *zabírají jim místo* – **absolutní posice** element **vyjme z běžného toku dokumentu**.

Najednou se všechno s neabsolutní posicí začne (skoro) chovat jako by tam absolutně posicovaný element vůbec nebyl.

```
element {position: absolute; top: -5px; left: 20px}
```

Tučné **slovo** je absolutně umístěno.

var abstest = document.getElementById("abstest");

Zapnout/vypnout absolutní posici

### Hranice

Konkrétní umístění (vlastnosti `top`, `left`, `right`, `bottom`) se nepočítají nijak náhodně, ale od nejbližšího elementu, který *vytváří hranice* — to je libovolný nadřazený element s `position: relative`, `position: absolute` nebo `position: fixed`.

Nejvyšší hranicí je *okno prohlížeče*, proto v případě, že se na stránce relativní nebo absolutní posice zatím nepoužívají, přidání čemukoliv `position: absolute; left: 0; top: 0` *vyhodí* tento element do levého horního rohu.

### Bez umístění

Zvláštní případ použití je `position: absolute` bez zadání konkrétního umístění (`left`, `top`, `bottom`, `right`). V takovém případě zůstane element na svém místě, ale neovlivňuje své okolí.

Tučné **slovo** je absolutně umístěno bez umístění.

var abstest2 = document.getElementById("abstest2");

Zapnout/vypnout absolutní posici

### Využití

Absolutní posicování má výhodu, že lze obsah v kódu uvedený někde na konci umístit na začátek stránky. Rovněž se `position: absolute` hodí všude tam, kde je potřeba něco umístit na přesné místo, **nezávisle na okolí**.

Na druhou stranu to může být i nevýhoda — absolutně posicovaný element je vyjmut z toku dokumentu, a tudíž **nemůže reagovat na změny rozměrů** ostatních prvků.

Absolutní posici jde teoreticky i [relativně rozumně](/stejne-vysoke-sloupce#absolute) využít ke stavbě rozložení stránky, i když obtékání bývá zpravidla výhodnější.

## Fixní posice (`position: fixed`)

Poslední druh umístění je fixní. To je dobré k tomu, když má nějaký element být viděn neustále (nezávisle na případném odrolování stránky).

Tato vlastnost není podporovaná v Internet Exploreru běžícím v [QUIRK režimu](/doctype#quirk).

Od absolutního posicování se kromě fixování elementu liší ještě v tom, že cokoliv s `position: fixed` má jako *hranici* okno prohlížeče. Tedy **není možné vytvořit *hranici* vlastní**.

### Využití

Fixovaná posice se hodí pro neustále viditelnou navigaci, hlavičku či nějakou reklamu.

Nastavit element jako fixní je také možné až v momentě, kdy by měl [zmizet z viditelné části obrazovky](/sidebar) (obdobně se dá i vytvořit [fixní menu](/fixni-menu)).

## Sticky posice (`position: sticky`)

Nejnovější hodnota vlastnosti `position` sloužící k přilepení elementu ke kraji okna při scrollování. Věnuje se jí celý samostatný článek:

      [Jak funguje CSS `position: sticky`](/position-sticky)

## Překrývání `z-index`

    Jednotlivé elementy se mohou překrývat, což řeší vlastnost `z-index`.

    Bez jejího použití jsou nejvýše ty elementy, které jsou **později v kódu**. Jejím užitím lze toto chování změnit.

    V případě **záporné hodnoty** (např. `z-index: -1`) se absolutně posicovaný element dostane za běžný text.

    Vlastnost `z-index` se projeví **jen** u elementů s absolutní, relativní nebo fixní posicí. Pokud je tedy překrýváno něco, co nechceme, a není to posicované, řešení je přidat `position: relative` a vyšší `z-index`.

    Relativní posice totiž bez uvedení `left`/`top`/`bottom`/`right` **nezmění umístění elementu**. Je ale třeba dát pozor na to, že `position: relative` změní počátek pro posicování **absolutní**.

### Ukázka

Jednotlivé elementy jsou v kódu v pořadí červená, modrá, zelená; kliknutím lze `z-index` zvýšit.

  0
  0
  0

Jak je vidět z ukázky, při nastavování `z-index`ů je třeba myslet na to, že *pozdější vyhrává*.

Další zajímavosti ohledně `z-index`u jsou v anglickém článku:

    - [What You May Not Know About the Z-Index Property](http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/what-you-may-not-know-about-the-z-index-property/) – co jste možná nevěděli o vlastnosti `z-index`

## `top`, `left`, `bottom`, `right`

CSS vlastnosti `top`, `left`, `bottom` a `right` se používají pouze pro posicování.

U statického elementu (`position: static`) nedělají nic.

Hodnota za těmito vlastnostmi určuje **vzdálenost** shora (`top`), zleva (`left`), zdola (`bottom`), zprava (`right`).

Následující element bude **10 pixelů** od horní hranice vymezené nadřazeným posicovaným elementem.

```
element {
  position: absolute;
  top: 10px;
}
```

### Záporná hodnota

Délková hodnota může být i záporná, tím se element dostane **mimo hranice** (v případě, že nebude oříznut pomocí `overflow: hidden`).

```
element {
  position: absolute;
  top: **-10px**;
}
```

### 100% hodnota

Někdy se používají konstrukce:

```
top: 100%
```

Tím se horní hrana absolutně posicovaného elementu dostane přesně pod dolní hranu posicovaného rodiče.

Analogicky to funguje pro `left`, `bottom` a `right`.

### Priorita směrů

  - Umístění zleva (`left`) má přednost před `right`.

  - Umístění shora (`top`) má přednost před `bottom`.

Tento element tedy bude umístěn 10 pixelů zleva a shora:

```
element {
  width: 10px;
  height: 10px;
  **left: 10px;**
  right: 10px;
  **top: 10px;**
  bottom: 10px;
}
```

[Živá ukázka](http://kod.djpw.cz/kuqb) – přebíjení směrů posicování

Jde si tím **zkrátit zápis při posicování dvou prvků**, kdy jeden má být vlevo a druhý vpravo:

```
.levy, .pravy {
  position: absolute;
  right: 0;
  width: 10px;
  /* další společné styly */
}
.levy {
  left: 0;
}
```

Nemusí se tak psát:

```
.levy, .pravy {
  …
  left: 0;
}
.pravy {
  left: auto;
  right: 0;
}
```

Toto chování platí pouze pro případ, že **absolutně posicovaný element  má nastaveny rozměry**. V opačném případě uvedení hodnot všech stran způsobí **roztažení**.

[Živá ukázka](http://kod.djpw.cz/muqb) – roztažení elementu

.z-index div {position: absolute; width: 50px; height: 50px;
  text-align: center; line-height: 50px; color: #fff; cursor: pointer;
  z-index: 0; border-radius: 50%}
.z-index div:hover {border: 2px solid #000; margin: -2px}
.z-index p {background: #fff}
.prvni {background: red; left: 5px; top: 5px}
.druhy {background: blue; left: 45px; top: 5px}
.treti {background: green; left: 25px; top: 40px}

function umisteni(el) {
  el.innerHTML++;
  el.style.zIndex = el.innerHTML;
}