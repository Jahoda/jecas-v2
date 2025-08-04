---
title: "Centrování v CSS"
headline: "Centrování na webových stránkách"
description: "Ucelený popis různých způsobů vertikálního i horizontálního centrování. Se známou i neznámou šířkou nebo výškou."
date: "2013-08-11"
last_modification: "2017-04-25"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

## Horizontální centrování textu (`text-align: center`)

Nejjednoduší je vodorovně vycentrovat text nějakého bloku, třeba odstavce:

`&lt;p style="text-align: center"&gt;text&lt;/p&gt;`

Centrovat je takto možné prostý text nebo cokoliv s:

  `display: inline`,

  `display: inline-**block**`

Právě `inline-block` lze použít pro **centrování menu s neznámou šířkou**, kdy potřebujeme nastavit odkazům `padding` apod.

    .centrovane-menu {text-align: center; background: #8ECCF0}
    .centrovane-menu a {display: inline-block; padding: .3em 1em; text-decoration: none; background: #fff}

    [Odkaz](http://jecas.cz)
    [Delší odkaz](http://jecas.cz)
    [Ještě mnohem delší](http://saintsrow.cz)

**Poznámka**: vlastnost `text-align` se dědí, tj. všechny elementy v předkovi s `text-align: center` budou obsah centrovat, nepřepíše-li se jim `text-align`.

### Rozdíly napříč prohlížeči

**Internet Explorery** do verse 7 (včetně) mají problémy s elementy, co jsou ve výchozím stavu blokové (`&lt;div&gt;`, `&lt;h1&gt;`, `&lt;p&gt;`, …). V těchto prohlížečích jim normálně **nelze nastavit hodnotu `display` na `inline-block`** (elementy budou stále pod sebou — [ukázka](http://kod.djpw.cz/awb)).

Nicméně docílit `inline-block`u pro blokové elementy v starších Explorerech (6 a 7) by [mohlo jít](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=144085#9) použitím `display: inline` a [zapnutím `hasLayout`u](/haslayout) (třeba použitím `zoom: 1`) — [ukázka](http://kod.djpw.cz/hwb).

## Vertikální centrování řádku

Máme-li jeden řádek textu, který má být uprostřed pevně dané výšky, řešení je `line-height` rovný výšce (případně se `height` může vypustit).

Podobného efektu lze docílit i `padding`em, ale musí se dopočítat na požadovanou výšku, což je složitější.

  Text *vysoký* 100 pixelů (`line-height: 100px`).

## Vodorovné centrování bloků (`margin: auto`)

Pokud je nám **známa šířka**, stačí ji blokovému elementu nastavit spolu s `margin: auto` (nezkrácený zápis: `margin-left: auto; margin-right: auto`).

V případě, že element není blokový (`display: block`), musíme ho na blokový *přepnout*. Jinak centrování nebude fungovat. [Ukázka](http://kod.djpw.cz/subb).

Stejně tak nebude centrování přes `margin: auto` fungovat pro [obtékané elementy](/float) (vlastnost `float`).

    .centrovany-blok {margin: auto; width: 300px}
  
  ```
.centrovany-blok {
  **margin: auto**; 
  width: 300px
}
```

Šířku je možné zadávat i v procentech, aby se hezky přizpůsobovala velikosti stránky, ale zůstala stále **vodorovně vycentrovaná**. Příjemné rovněž je, že lze využít (od IE 7) vlastnosti `min-width` a `max-width`.

    .centrovany-blok-procenta {margin: auto; width: 50%; min-width: 200px; max-width: 1000px}
  
  ```
.centrovany-blok-procenta {
  **margin: auto**; 
  width: *50%*;
  min-width: 200px; 
  max-width: 1000px
}
```

### Případ užití

Typicky se takto centrují celé webové stránky:

  - Obalí se nějakým `&lt;div&gt;`em,

  - nastaví se mu např. `margin: auto; width: 960px`.

## Centrování absolutním posicováním

Další možnost, tentokrát pro vystředění **svislé i vodorovné**, je absolutní posice (tj. element s [`position: absolute`](/position#absolute)) — hodí se zejména pro elementy, které absolutní posici samy od sebe potřebují, potřebujeme, aby byly *vyjmuty z toku dokumentu*. Případně se tomuto vyjmutí nevyhneme — potřebujeme například fixní posici (`position: fixed`).

Typický příklad je třeba [CSS vyskakovací okno / lightbox](/magnific-popup).

### Pevná výška/šířka

Známe li rozměry bloku (pozn. absolutně posicovaný element je vždy `block`), který se má centrovat, je potřeba zvolit jedno z následujících řešení:

#### 1) Odečítání `margin`u

  - Nastaví se posice `left` a `top` na polovinu šířky/výšky rodiče (s `position: relative/absolute/fixed`), tj. `50%`,

  - nastaví se rozměry,

  - polovina šířky/výšky se *odečte* záporným `margin`em.

    .absolutne-centrovany {width: 300px; height: 200px; position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -150px}
  
  ```
.absolutne-centrovany {
  position: absolute; 
  top: 50%; left: 50%; 
  height: 200px; width: 300px;  
  margin: -100px 0 0 -150px
}
```

Rozměry šířky/výšky a posunů pomocí `marginu` lze taktéž zadávat procentuálně. Nicméně `min/max-width` logicky použít nejde — byly by potřeba nějaké vlastnosti jako `min/max-**margin**`, a ty neexistují.

#### 2) Absolutní posice + `margin: auto`

Pokud se elementu nastaví:

  - absolutní (nebo fixní) posice,

  - všechny souřadnice na `0` (`left`, `right`, `bottom`, `top`),

  - přidá se `margin: auto`

  - a nakonec se zadají rozměry…

Element bude vycentrovaný.

    .absolute-margin-centrovany {width: 300px; height: 250px; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto}
  
  ```
.absolute-margin-centrovany {
  position: absolute; 
  top: 0; left: 0; 
  bottom: 0; right: 0; 
  margin: auto;
  height: 250px; width: 300px
}
```

Výhoda tohoto řešení je, že se nemusí dopočítávat záporné `margin`y a lze použít `min-*` a `max-*` vlastnosti.

**Nevýhoda** je **slabší podpora napříč prohlížeči** — toto řešení funguje až od **Internet Exploreru 8**, řešení *odečítáním* funguje takřka *všude*.

## Centrování elementu s neznámou výškou a šířkou

### Žádná známá výška

Je-li cílem umístit do okna (s neznámou výškou – `height: 100%`) element s neznámou výškou, od **Internet Exploreru 8** jde využít triku s pseudo-elementem `:before`.

[Živá ukázka](http://kod.djpw.cz/zagb)

Element může být i [posicovaný](/position) [absolutně](http://kod.djpw.cz/abgb) či [fixně](http://kod.djpw.cz/bbgb).

### Neznámá výška obsahu

V případě, že máme obal, kde přesnou výšku **známe**, a v něm vnořený obsah, u kterého ale výšku **neznáme**, jsou v zásadě tři možnosti centrování:

  - Použít `table-cell` hodnotu vlastnosti `display`,

  - obsah **vystředit JavaScriptem** — ten může přeměřit `offsetHeight` a podle toho element přesně naposicovat,

  - rozměr zadat v jednotkách, co se přizpůsobí velikosti písma (například `em`), tak **aby to *hezky vycházelo***, pochopitelně se to při nějaké změně *rozsype*.

První řešení (pomocí CSS) není moc komplikované.

    .table-centrovani {height: 300px; display: table-cell; vertical-align: middle}

    Jako *kontejner* pro obsah s neznámou výškou stačí vytvořit:

```
.table-centrovani {
    height: 300px; 
    display: table-cell; 
    vertical-align: middle
}
```

A vše v tomto *kontejneru* bude **od Internet Exploreru 8** hezky **vertikálně vystředěno**.

#### Řešení pro starší prohlížeče

Pro starší Explorery lze využít triku, kdy se:

  - použije pomocný absolutně posicovaný obal,

  - ten se posune do poloviny (`top: 50%`)

  - a v něm už konečný obsah, který se má centrovat, pošoupneme o polovinu zpět nahoru (`position: relative; top: -50%`)

Speicální kód pro tyto staré prohlížeče lze připojit třeba [podmíněnými komentáři](/podminene-komentare) nebo jiným hackem.

  [Ukázka](http://kod.djpw.cz/qnb) (funkční **jen do** IE 7)

### Neznámá šířka

K **vodorovnému centrování elementu s neznámou šířkou** lze použít už [výše zmíněný](#text-align) `display: inline-block`.

Obě řešení není problém zkombinovat a **vycentrovat element s neznámou výškou i šířkou a horizontálně i vertikálně** najednou.

  .universal-center {height: 250px; width: 300px; vertical-align: middle;
display: table-cell; text-align: center; position: relative; background: #efefef;}

.universal-center-cover {=position: absolute; top: 50%; left: 0; width: 100%}

.universal-center-inner {display: inline-block; background: #fff; padding: 1em;
=position: relative; top: -50%}

        Centrovaný 
 obsah 
 Změnit

#### CSS

```
.universal-center {height: 250px; width: 300px; vertical-align: middle; display: table-cell; text-align: center; position: relative; background: #efefef;}
.universal-center-cover {=position: absolute; top: 50%; left: 0; width: 100%}
.universal-center-inner {display: inline-block; background: #fff; padding: 1em; =position: relative; top: -50%}
```

Pro **Internet Explorer 7** je použit rovnítkový hack (`=`).

#### HTML

```
&lt;div class="universal-center">
  &lt;div class="universal-center-cover">
    &lt;span class="universal-center-inner">
      &lt;p>
        Centrovaný &lt;br> obsah
      &lt;/p>
    &lt;/span>
  &lt;/div>
&lt;/div>
```

Nevalidní použití `&lt;span>`u je z důvodu neochoty přepnout ve starších Explorerech z `display: block` na `inline-block`.

## Centrování flexboxy

Nejelegantnější je nejspíš použití [flexboxů](/flexbox), jenže podpora **až od IE 10** je většinou nedostatečná.

[Živá ukázka](http://kod.djpw.cz/thnb)

## Transformace

Ještě existuje způsob s využitím CSS transformace:

```
element {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%)
}
```

To má nejen jako flexbox špatnou podporu, ale i může rozbíjet vyhlazování textu. **Raději nepoužívat**.