---
title: "CSS @media queries"
headline: "CSS pravidlo <code>@media</code>"
description: "Pravidlo <code>@media</code> se používá k omezení platnosti CSS jen za určitých podmínek."
date: "2014-10-14"
last_modification: "2015-12-17"
status: 1
tags: ["CSS", "Responsivní design", "CSS pravidla"]
---

Typický **příklad užití** vypadá nějak takto:

```
@media (max-width: 40em) {
  .obsah {
    width: 50%;
  }
}
```

Kód výše zajistí, že se obsah bloku `@media` aplikuje jen za podmínky, kdy je maximální šířka (`max-width`) okna prohlížeče `40em`.

Do `@media` bloku se mezi složené závorky zapisují běžné [CSS selektory](/css-selektory), takže v tomto případě bude značka s třídou `.obsah` při splnění podmínek široká 50 %.

Nejčastěji se pravidlo `@media` využívá v případě [responsivního layoutu](/responsive), kdy umožňuje stránku upravovat v závislosti na **velikosti obrazovky** (okna prohlížeče – tzv. *viewportu*).

## Media queries

Kvůli tomu, že se do závorek za `@media` zadávají **dotazy na splnění určitých podmínek**, nazývá se tato technologie často anglickým termínem **media queries** (doslovný překlad *media dotazy*).

Další častá označení jsou *conditional rules* (podmíněná pravidla) nebo *media rules* (media pravidla).

## Podpora

Základní `@media` podmínky jsou podporovány od **Internet Exploreru 9**. Případná nefunkčnost v **IE 8** nebo jiných starších prohlížečích nemusí moc vadit v případě, že se media queries používají pouze pro přizpůsobení stylu pro **mobilní zařízení** a styl mimo `@media` je určen pro desktopové monitory.

Starší **IE** než **8** se na mobilech prakticky nepoužívají, takže nepodporování tolik nevadí.

## Použití v praxi

Velmi častý případ je, že stránka má pro zobrazení na velkém monitoru **vícesloupcové rozvržení**, které by se na malou obrazovku mobilu nevešlo.

Bude-li rozložení například následující dvousloupcové:

```
.levy {
  width: 30%;
  float: left;
}
.pravy {
  width: 70%;,
  float: right;
}
```

Pro užší šířku (`40em`) se bude hodit sloupce přeskládat pod sebe. Toho se docílí třeba nastavením 100% šířky:

```
@media (max-width: 40em) {
  .levy, .pravy {
    width: 100%;
  }
}
```

[Samostatná živá ukázka](http://kod.djpw.cz/txob)

Možný je i obrácený postup, kdy jsou *výchozí* styly určené pro zobrazení na mobilu a až v `@media` je doplněno vícesloupcové rozložení.

```
.levy, .pravy {
  /* společné deklarace */
}
```

Pro šířku `40em` a větší se sloupce přeskládají vedle sebe.

```
@media (min-width: 40em) {
  .levy {
    width: 30%;
    float: left;
  }
  .pravy {
    width: 70%;,
    float: right;
  }
}
```

## Jaké breakpointy zvolit?

Místa, kde se mají začít aplikovat určitá pravidla, se nazývají *break-pointy* – body zlomu, kde se díky `@media` podmínkám mění zobrazení.

Existují 3 postupy, jak `@media` podmínky používat:

    Začít od **nejmenší šířky** mobilních zařízení (cca 320 pixelů). Postupně rozšiřovat okno a ve chvíli, kdy už je prostor značně nevyužitý, přidat podmínku:

    ```
@media (**min-width**: *XX*em) {
}
```

    Začít od velikosti, kterou na webu uvidí nejvíce návštěvníků ([Jak široký web udělat?](/sirka-stranky)).

    Pomocí `@media` pravidel potom upravovat styly:

        Směrem **dolu**:

            ```
@media (**max-width**: *XX*em) {
}
```

        Směrem **nahoru**:

            ```
@media (**min-width**: *XX*em) {
}
```

    Začít od **největší šířky** a postupně přidávat break-pointy dle omezení maximální šířky:

    ```
@media (**max-width**: *XX*em) {
}
```

### Nepodporované prohlížeče

Konkrétní postup se většinou volí s ohledem na prohlížeče neznalé media-queries.

Pokud výchozí styl, který **IE 8** uvidí, bude pro mobily, ale tento prohlížeč se používá výhradně na desktopu, bude jeho uživatel zbytečně odbyt osekaným vzhledem. Proto by se nabízelo začít běžnou desktopovou velikostí a zobrazení na mobilech mít až `@media`.

Někdy se tento postup volí záměrně, aby se ve starých prohlížečích nemuselo řešit špatné zobrazení layoutu – zkrátka se tam žádný layout nezobrazí.

Jiná možnost je psát CSS [mobile-first](/mobile-first) (nejdříve pro mobily) a nějakým automatisačním nástrojem vyřešit vygenerování desktopového CSS bez `@media` pravidel pro prohlížeče typu **IE 8**.

Nakonec je možné podporu `@media` pro staré prohlížeče vyřešit JavaScriptem. Ten si stránku přeměří, stáhne AJAXem CSS soubor, vypreparuje z něj příslušné styly a aplikuje na stránku.

Nevýhoda je, že staré prohlížeče běží většinou na slabém HW a další JS jim dvakrát nepomůže.

    - [Respond.js](https://github.com/scottjehl/Respond) – doplnění podpory `min-width`/`max-width` media-queries do **IE 6–8**

## Proč `em` jednotky

Hodnoty v `@media` podmínkách je dobré zadávat v `em` jednotkách, protože se dobře vypořádají s případnou změnou velikosti písma.

Pokud by byly v pixelech, při změně výchozí velikosti písma by přestaly prostorově odpovídat.

Breakpointy se nejčastěji vytváří s ohledem na textový obsah. Zvětšení písma v operačním systému nebo v prohlížeči ovlivní výchozí hodnotu, z které se počítají rozměry `em` v `@media` pravidlech.

### Příklad

**Výchozí velikost písma** je typicky **16 pixelů**. Platí tak tedy, že `1em = 16px`.

Pokud se sloupce mají přeskládat při šířce 800 px, kdy už má text ve sloupcích příliš málo prostoru, nabízelo by se použít:

```
@media (max-width: 800px) {
  .levy, .pravy {
    width: 100%;
  }
}
```

Problém je v tom, že při větší výchozí velikosti písma by to chtělo přeskládat dřív – s ohledem na velikost písma.

Správné zobrazení v momentě před přeskládáním při výchozí velikosti písma:

Co ale když se zvětší písmo při `@media` pravidlech v pixelech?

Pokud by hodnota byla přepočítaná do `em`, stránka by se ve stejné velikosti okna už dávno přeskládala pod sebe:

[Ukázka](http://kod.djpw.cz/slsb-) – problematické nastavení break-pointů v pixelech

## Kam psát breakpointy

V počátcích responsivního designu se pomocí `@media` pravidel často dělil vzhled **třemi breakpointy** na desktop, tablet a mobil.

```
/* všechny styly pro desktop */
…
@media (max-width: 960px) {
  /* všechny styly pro tablet */
  …
}
@media (max-width: 480x) {
  /* všechny styly pro mobil */
  …
}
```

Postupně se od tohoto postupu upustilo, protože [šířka stránky](/sirka-stranky) je značně proměnlivá napříč zařízeními a **hranice mezi mobilem, tabletem a desktopem nejsou ostré**.

Break-pointy se tedy v ideálním případě nepoužívají přesně 3, ale přidávají se v momentě, kdy je to potřeba – když obsah neoptimálně využívá dostupný prostor.

Z tohoto důvodu je nejspíš i přehlednější psát `@media` podmínky ke každému elementu (komponentě).

```
/* výchozí styl */
.hlavicka {…}
@media (max-width: 60em) {
  /* styl pro menší šířku */
  .hlavicka {…}
}
@media (max-width: 40em) {
  /* styl pro ještě menší šířku */
  .hlavicka {…}
}
```

Pomocí CSS preprocesorů je možné používat nějaký jiný zápis bez nutnosti opakovat selektory, který se následně do standardního CSS automaticky přeloží.

## Podmínky na šířku elementu

Praktické by bylo, kdyby šlo kromě podmínek zohledňující velikost okna reagovat i na rozměry elementu.

To bohužel není momentálně čistě v CSS možné.

## Všechny `@media` podmínky

Byť se `@media` nejčastěji používá v souvislosti s podmínkou na **minimální nebo maximální šířku**, existuje celá řada dalších pravidel, která jsou **různě podporována v prohlížečích**.

### Media typy

Dřívější návrhy CSS specifikace počítaly s různými typy `@media` pravidel vázanými na konkrétní **typ koncového zařízení** – typicky obrazovka, tisk, televise, projektor a podobně.

Aktuálně se ve specifikaci nachází a v praxi používá:

  `all`
  
    Pro všechna zařízení.

  `screen`
  
    Pro všechny obrazovky.

  `print`
  
    Pro vytvoření [tiskového stylu](/tisk):

    ```
@media print {
  * {color: black; background: #fff}
}
```

  `speech`
  
    Hlasové čtečky.

Ve starší CSS 2.1 specifikaci se nacházely ještě následující typy, které jsou nyní zavržené: `tty`, `tv`, `projection`, `handheld`, `braille`, `embossed`, `aural`

### Media vlastnosti

Protože **odlišovat styly podle typu zařízení** je podobně nešikovné kvůli přílišné obecnosti jako odlišování podle **názvu prohlížeče**, byly vymyšleny tzv. media vlastnosti.

Pro podmínku (ne)aplikování stylu tak jde použít jednotlivé vlastnosti zařízení; řada věcí není moc dobře podporovaná:

      Název
      Význam

    `width`
      Šířka viewportu
    
    `height`
      Výška viewportu
    
    `aspect-ratio`
      Poměr výšky a šířky
    
    `orientation`
      Orientace zařízení, existují dvě hodnoty:
      
        - `portrait` – na výšku

        - `landscape` – na šířku

    `resolution`
      Hustota pixelů daného zařízení. Typicky uváděné v jednotkách `dpi`.
    
    `scan`
      Způsob zobrazování například na TV (`interlace`/`progressive`).
    
    `grid`
      Detekce primitivních displejů, co zobrazují pouze v mřížce.
    
    `update-frequency`
      Obnovovací frekvence zařízení (`none`, `slow`, `normal`).
    
    `overflow-block`
      Co udělá zařízení s blokem, který se dostane mimo viewport (`none`, `scroll`, `optional-paged`, `page`).
    
    `overflow-inline`
      Půjde řádek, který přeteče z viewportu doscrollovat (`none`, `scroll`).
    
    `color`
      Počet bitů barev, které zvládá cílové zařízení.
    
    `color-index`
      Počet barev, které zvládá cílové zařízení.
    
    `monochrome`
      Detekce černobílé obrazovky.
    
    `inverted-colors`
      Detekce invertovaných barev (`none`/`inverted`).
    
    `pointer`
      Je primární vstupní zařízení *ukazatel* (myš, prst) a jak je přesný (`none`, `coarse` – nepřesný, `fine` – přesný).
    
    `hover`
      Umí primární vstupní zařízení vytvořit `hover` (`none` – neumí, `on-demand` – je to trochu komplikovanější, např. delší podržení prstu na mobilech, `hover` – v pořádku, např. myš).
    
    [`any-pointer`](/media-any#pointer)
      Je k disposici alespoň nějaký ukazatel a jak je přesný.
    
    [`any-hover`](/media-any#hover)
      Existuje alespoň nějaká možnost, jak vyvolat hover.
    
    `light-level`
      Intensita okolního světla (hodnoty `dim`, `normal` a `washed`).
    
    `scripting`
      Podpora JavaScriptu.
    
    `device-width`
      (Zavržené)
    
    `device-height`
      (Zavržené)
    
    `device-aspect-ratio`
      (Zavržené)

      `-webkit-transform-3d`
      
        Podpora 3D transformací.

      `-webkit-transform-2d`
      
        Podpora 2D transformací.

      `-webkit-transition`
      
        Podpora [`transition`](/transition).

      `-webkit-animation`
      
        Podpora animací přes CSS vlastnost [`animation`](/animation).

## Spojování `@media` pravidel

V některých případech je potřeba pravidla spojovat. Ve smyslu logických operátorů `and` a `or`.

### And

Musí platit obě podmínky:

```
@media 
  (min-width: 20em) and (max-width: 30em) {
  /* Aplikuje se jen při šířce 20–30em */
}
```

### Or

Pro vyznačení *nebo* se **nepoužívá** klíčové slovo `or`, ale pravidla se oddělují čárkou:

```
@media 
  (min-width: 30em) and (max-width: 40em),
  (max-width: 20em) {
  /* Aplikuje se jen při šířce 30–40em nebo do šířky 20 em */
}
```

Tento zápis se v praxi hodí v případě, kdy při nějaké šířce například zmizí široký sloupec, čímž se uvolní místo v hlavním obsahu.

    - StackOverflow: [Media queries: max-width OR max-height](http://stackoverflow.com/questions/11404744/media-queries-max-width-or-max-height)

V **IE 9** až **[IE 11](/ie11)** nastává zajímavá věc při spojení `@media (min-width: 9999px) and (min-width: 0)`, pravidla se totiž aplikují:

      - [Živá ukázka](http://kod.djpw.cz/xurb) – chyba `and` v **Internet Exploreru**

## Odkazy jinam

  - CSS Tricks: [The At-Rules of CSS](https://css-tricks.com/the-at-rules-of-css/)

  - Vzhůru dolů: [CSS3 Media Queries – podmíněné zobrazení pro média](http://www.vzhurudolu.cz/prirucka/css3-media-queries)

  - DevDocs: [`@media`](http://devdocs.io/css/@media)