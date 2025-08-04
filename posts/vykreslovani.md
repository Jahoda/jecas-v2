---
title: "Jak probíhá vykreslování stránky"
headline: "Jak funguje vykreslování stránky"
description: "Co prohlížeč dělá s webovou stránkou při vykreslování. "
date: "2014-11-13"
last_modification: "2014-11-13"
status: 1
tags: ["Prohlížeče"]
---

## Vykreslovací jádro

Postup, kterým se ze zdrojových kódů (HTML, CSS, JavaScript) vytvoří finální podoba stránky, se mírně liší v jednotlivých **vykreslovacích jádrech**. V dnešní době se používají převážně tyto.

  - Blink (**Chrome 28+**, **Opera 15+**)

  - WebKit (**Safari**)

  - Gecko (**Firefox**)

  - Trident (**Internet Explorer**)

  - Presto (**Opera 12** a starší)

Jádro **Blink** vzešlo z **WebKitu**, který **Chrome** dříve používal.

  Seznam více vykreslovacích jader je [na Wikipedii](http://en.wikipedia.org/wiki/List_of_layout_engines).

Cílem *vykreslovacího enginu* je tedy *nakreslit* ze zdrojových kódů „obrázek“ stránky a ten následně **překreslovat** při akcích vyvolaných návštěvníkem nebo programátorem, to může být například.

  - **Najetí myší** na odkaz. Zobrazí se odkaz v jiné podobě díky stylu pro `:hover`.

  - **Kliknutí** na tlačítko, které vyvolá JavaScriptovou akci vypisující do stránky obsah.

  - **Zobrazení** nějakého prvku stránky po určité době díky JS časovači (`setTimeout`).

  - **Rolování** po stránce nebo **změna velikosti** písma či okna.

## Průběh vykreslování

Po stažení potřebných dat (HTML kód a styly) je prohlížeč začíná aplikovat a sestavovat z nich stránku.

    Nejprve si připraví [DOM](/dom) (*Document Object Model*) – tedy strom z HTML kódu. V tomto procesu se domyslí značky s [nepovinnými](/html-znacky#koncova-volitelna) koncovými nebo i počátečními tagy, opraví se případné *chyby* jako překřížené značky a podobně.

    Podobný proces nastane i s **CSS**, z kterého vznikne CSSOM (*CSS Object Model*), kde se kromě *opravných* činností musejí smíchat příslušné styly:

      - **výchozí styl** prohlížeče,

      - **externí/interní CSS**,

      - **inline styly** a **HTML atributy**,

      - **uživatelské** styly

    Z HTML stromu (DOMu) a CSS se potom připraví tzv. **renderovací/vykreslovací strom**, kde už se pro jednotlivé jeho potomky aplikují CSS pravidla, což znamená, že se do renderovacího stromu nedostanou například skryté elementy (`display: none`).

    Každý viditelný prvek je potom representován položkou ve vykreslovacím stromu, kde má uvedeny rozměry, rámeček, odsazení ([margin``](/margin)) a podobně. Těchto položek může být pro jeden element i více (třeba odstavce mají vlastní „box“ pro každý řádek).

    Po sestavení vykreslovacího stromu může konečně prohlížeč ***nakreslit* výslednou stránku**.

## Překreslování

Z pohledu pozdější **manipulace se stránkou JavaScriptem** je zajímavé překreslování stránky, kdy JS mění DOM nebo styly. Uživatel potom může **vykreslovací strom** ovlivňovat rolováním nebo změnou velikosti okna.

Rozlišují se 2 základní typy překreslování:

  - **Layout** (někdy také označováno jako **reflow**)

  - **Paint** (popř. *draw*, *redraw*)

### Layout

*Layout* znamená, že se musí přepočítat část vykreslovacího stromu nebo i celý strom. Nastává u vlastností, které mohou ovlivňovat okolí. Těch je většina. Nebo při manipulaci s DOMem (přidávání elementů apod.), scrollování či změně velikosti okna. Pár příkladů CSS vlastností.

    Původně skrytý text.

    Zobrazení původně skrytého elementu pomocí `display: none` odsune následující obsah, takže se musí překresilt.

    Přidání rámečku taktéž způsobí odsunutí.

### Paint

*Paint* se provádí i po *Layoutu*, ale někdy je možné provést jen *Paint*. Třeba u **změny barvy** pozadí, rámečku, změny průhlednosti ([`opacity`](/opacity)) a podobně.

  - [CSS Triggers](http://csstriggers.com/) – jakým způsobem CSS vlastnosti ovlivňují překreslování stránky

## Optimalisace překreslování

Pro vyšší výkon se prohlížeče snaží **vykreslování optimalisovat**. Dělají to tak, že se nevykresluje při každé změně jednotlivého prvku vykreslovacího stromu:

```
element.style.vlastnost = 'hodnota';
```

Ale požadavky z JavaScriptu na změnu více prvků se dají do fronty a překreslení se provede dávkově (najednou).

Bohužel tuto funkci jde **snadno narušit** špatně napsaným JavaScriptem. Existují totiž vlastnosti, které pro správnou funkčnost potřebují zjistit aktuální stav, což znamená, že před jejich použitím musí prohlížeč aktuální stav **překreslit**, potom se provedou další změny a další překreslení a tak dál.

Jedná se například o `offset*` vlastnosti (`offsetTop`, `offseTLeft`, `offsetHeight`, `offsetWidth`), `client*`, `scroll*`, pochopitelně vlastnosti [zjišťující aktuální styl](/zjisteni-css) a podobně.

  - [Kompletní seznam JS metod způsobující překreslení](http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html)

### Příklad

Budeme-li chtít `element` zvětšit o 10 px na šířku i výšku:

```
element.style.width = element.offsetWidth + 10 + "px";
element.style.height = element.offsetHeight + 10 + "px";
```

Tento kód donutí zbytečně překreslit stránku na druhém řádku, kde se zjišťuje `offsetHeight` (jedna z vlasností, co způsobí překreslení).

Řešením je nejprve zjišťovat hodnoty a až potom je najednou nastavovat:

```
var novaSirka = element.offsetWidth + 10 + "px";
var novaVyska = element.offsetHeight + 10 + "px";
element.style.width = novaSirka;
element.style.height = novaVyska;
```

V tomto jednoduchém případě to vyjde dost nastejno, ale při manipulaci s hodně objekty, je zásada „nejdřív zjistit všechny hodnoty a až potom je měnit“ užitečná.

U změny vlastností **500 elementů** oběma způsoby je rozdíl poměrně dobře patrný. Vytvořit dva cykly (jeden si uloží hodnoty všech prvků a druhý je změní) místo jednoho se vyplatí.

[Ukázka](http://kod.djpw.cz/ckhb)

## Rolování na stránce

Rolování po stránce je velmi častá akce (je prakticky na každém webu), při které musí prohlížeč stránku (občas složitě) překreslovat.

Aby bylo rolování plynulejší, prohlížeč se po rozebrání DOMu snaží určit, které části budou při posunu **vypadat stále stejně**. Z nich potom vytvoří *obrázek* (vrstvu). Těchto vrstev může být na stránce více a různě se seskupovat. Když se potom na stránce při rolování něco změní, prohlížeč překreslí jen danou část.

V ideálním případě toho samozřejmě prohlížeč při rolování **překresluje co nejméně**, což má positivní efekt na plynulost.

Problematické jsou hlavně **velké fixované prvky**, které naruší velkou oblast předpřipravené vrstvy. Vykreslovacímu jádru totiž nestačí jen *jednoduše* posouvat statickou kombinaci vrstev, ale musí se zjišťovat, co je překrýváno fixním prvkem a co ne.

Taktéž **fixní obrázky** prosvítající za obsahem (textem) bývají z tohoto důvodu problematické. Prohlížeče používající Blink/WebKit navíc často trpí tím, že jsou zdržovány při scrollování i fixními prvky, co zrovna nejsou vidět. Většinou ale pomůže:

```
.fixni {
  -webkit-backface-visibility: hidden
}
```

Značně komplikované jsou potom *parallax efekty*, které při scrollování posouvají nějakými prvky, což je snad vůbec ta **nejhorší kombinace**, co si vykreslovací jádro může přát.

## Měření plynulosti vykreslování

Zatímco rychlost **prvního načtení stránky** je dána spíš rychlostí a objemem přenášených dat. Interakce se stránkou už může negativně poznamenat **pomalé překreslování**.

Některé větší záseky jsou většinou viditelné přímo. Zjistit **přehled o rychlosti renderování** je ale možné i ze záložky *Timeline* ve [vývojářských nástrojích](/vyvojarske-nastroje) **Chrome**.

V ideálním případě by se *framerate* (počet snímků) měl držet nad 60 FPS (počet snímků za vteřinu), což přibližně odpovídá obnovovací frekvenci zobrazovacích zařízení.

Vývojářské nástroje sice umí zvýraznit **překreslovanou oblast**, zjistit, co způsobuje propad FPS, jde jedině ručně — **vypínáním jednotlivých částí vzhledu** (např. fixní posice, pozadí a podobně).

## Odkazy jinam

  - [Rendering: repaint, reflow/relayout, restyle](http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/)

  - Sitepoint.com: [10 Ways to Minimize Reflows and Improve Performance](http://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/) – 10 rad, kterých se držet pro maximálně rychlé vykreslování

  Paul Irish: 
What forces layout / reflow – přehled JS vlastností, co způsobují překreslení