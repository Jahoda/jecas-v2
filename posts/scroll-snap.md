---
title: "Přichytávací rolování v CSS"
headline: "Přichytávací rolování v CSS"
description: "CSS vlastnost <code>scroll-snap</code> dokáže řídit rolování, aby přeskakovalo mezi jednotlivými elementy."
date: "2015-07-28"
last_modification: "2016-03-08"
status: 1
tags: ["CSS", "CSS vlastnosti", "Scrollování"]
---

Jeden z celkem populárních efektů je **rozdělit** stránku na jednotlivé *obrazovky* – obsah takové stránky je typicky rozdělen do několika `&lt;div>`ů, kde každý zabírá 100 % výšky. To jde od **Internet Exploreru 9** snadno zajistit jednotkou „výška viewportu“ – `vh` (*viewport height*).

[Živá ukázka](http://kod.djpw.cz/dpob)

Efekt `scroll-snap` potom spočívá v **převzetí kontroly rolování**, kdy se při odrolování dolů rovnou přeskočí celá stránka.

Vlastnosti `scroll-snap*` dokáží tento efekt zajistit bez [JavaScriptu](/js).

## Kdy snap rolování použít?

Změnit tak zažitou věc, jako je **rolování**, hrozí snadným **zmatením uživatelů**.

Rolování přeskakující obrazovky je v několika bodech **problematické**:

    Stránka roztažená přesně přes celou výšku **vypadá ukončeně**. Návštěvníka tak nemusí napadnout, že má vůbec kam rolovat pro zobrazení dalšího obsahu.

    To je naštěstí řešitelné šipkou u dolního okraje nebo zobrazením kusu další stránky, aby bylo jasné, že je kam pokračovat.

    Lidé web nečtou jako knihu. Tedy nečtou web tak, že po přečetní celé obrazovky textu přeskočí o další celou obrazovku. Místo toho průběžně rolují, aby se aktuálně čtený text udržoval v **úrovni očí**.

    Efekt přeskakování při rolování se tedy **nehodí pro rozsáhlejší textový obsah**.

    V případě souvislých bloků obsahu, což jsou například **fotografie** nebo **videa**, může být takové chování žádoucí.

    Řada JS efektů je tak **špatně udělaných**, že po odrolování kolečko zablokují a přehrají zdlouhavou animaci přejezdu na další stránku. Projít rychle takový web je utrpení.

    Občas se během přehrávání první rolovací animace **zařadí další povely kolečka do fronty**, což způsobí následné samovolné hýbání webu.

## Podpora `scroll-snap`

**IE 10** podporuje *snap* u dotykových zařízení. [**IE 11**](/ie11)/[**Edge**](/microsoft-edge) je podporuje všude. Vždy s [prefixy](/css-prefixy) `-ms-`.

**Firefox 39+** podporuje bez prefixů a **Safari 9.2+** s prefixem `-webkit-`. **Chrome**/**Opera** zatím nic.

    - Can I use: [CSS Scroll snap points](http://caniuse.com/#feat=css-snappoints)

## Vlastnosti `scroll-snap-*`

[Živá ukázka](http://kod.djpw.cz/wqub)

### `scroll-snap-type`

Slouží pro *zapnutí/vypnutí* přichycovacího rolování.

  `none`
  
    Roluje se normálně.

  `mandatory`
  
    Hodí se pro případy, kdy má každé rolování vyvolat *snap* (přichycení) na další místo.

    [Živá ukázka `mandatory`](http://kod.djpw.cz/yqub)

  `proximity`
  
    Automatické odrolování při lehkém posunu může být pro uživatele otravné. Hodnota `proximity` se hodí pro případy, kdy má být přichytávání méně agresívní.

    Je možné rolovat i mezi jednotlivými *snap pointy*. Při přiblížení se k nim rolování přichytne.

    [Živá ukázka `proximity`](http://kod.djpw.cz/zqub)

Pro nastavení odlišného chování pro vodorovné a svislé rolování existují ještě odvozené vlastnosti:

  - `scroll-snap-type-x` – vodorovný směr

  - `scroll-snap-type-y` – svisle

### `scroll-snap-destination`

Nastavuje body pro přichycení. Vlastnost má dvě hodnoty – vzdálenost zleva a shora. Je potřeba zadat obě, i když je cílem přichytávání jen v jednom směru.

Určuje první místo přichycení a nastavuje se pro obal jednotlivých elementů.

Místo přichycení jednotlivých prvků se potom nastavuje pro potomky ve vlastnosti `scroll-snap-coordinate`…

### `scroll-snap-coordinate`

Nastavuje se pro potomky scrollovacího elementu. Pro přeskakování po celých obrazovkách stačí nastavit `scroll-snap-destination` i `scroll-snap-coordinate` na stejnou hodnotu.

```
.obal {
  …
  scroll-snap-destination: 0 0;
}
.potomek {
  scroll-snap-coordinate: 0 0;
}

```

Pro přichycení *mimo* poslouží uvedení odlišné hodnoty. Kladné hodnoty stanovují umístění od dolní hrany, záporné od horní.

Následující `potomek` se přichytí 5 pixelů shora.

```
.obal {
  …
  scroll-snap-destination: 0 0;
}
.potomek {
  scroll-snap-coordinate: 0 -5px;
}

```

Párů hodnot jde zadat více. Potom se element přichytí během rolování na každém z nich.

## Odkazy jinam

  - [Thinking Ahead: CSS Scroll Snap Points](http://blog.teamtreehouse.com/css-scroll-snap-points)

  - DevDocs: [`scroll-snap-type`](http://devdocs.io/css/scroll-snap-type)

  - Sitepoint: [Intuitive Scrolling Interfaces with CSS Scroll Snap Points](http://www.sitepoint.com/intuitive-scrolling-interfaces-with-css-scroll-snap-points/)