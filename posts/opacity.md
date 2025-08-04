---
title: "CSS průhlednost (opacity)"
headline: "Průhledný obsah v CSS"
description: "Pro zprůhlednění obsahu existují různé možnosti. Nejen CSS vlastnost <code>opacity</code>."
date: "2013-10-01"
last_modification: "2013-10-02"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

Používat úspěšně `opacity` je možné **od Internet Exploreru 9**; ve starších lze totéž simulovat filtrem.

```
.pruhledny {
  filter: alpha(opacity=50); /* 50 ze 100 = 50% průhlednost */
  opacity: 0.5; /* 0.5 z 1 = 50% průhlednost */
}
```

Vlastnost `opacity` nabývá hodnot od nuly do jedné:

  - `0` – element **je úplně průhledný** (není vidět, ale na stránce *překáží*, tj. jako by se použilo `visibility: hidden`),

  - `1` – element **není vůbec průhledný** (jako by se nic nenastavilo),

  `0.5` (popř. zkráceně `.5`) – element je **průhledný z poloviny.**

Pro Exploreří `filter: alpha(opacity=X)` je to podobné, jen hodnota **rovnou v procentech**.

Za elementem `.pruhledny` bude *vykukovat* (prosvítat) pozadí.

  .pruhledny {
    zoom: 1;
    background: rgb(100%, 70%, 100%);
    filter: alpha(opacity=50);
    opacity: 0.5;
    padding: 1em;
  }

    Průhledný element

### Nefunkční `filter: alpha(opacity=50)` v IE

Ve starších Explorerech (IE7) občas zprůhlednění přes vlastnost `filter` **nemusí fungovat**.

Starší IE totiž neumí aplikovat filtry na elementy, co *nemají layout* (`hasLayout`), řešení je prosté — layout zapnout — třeba vlastností `zoom`:

```
.pruhledny {
  zoom: 1; /* zapnutí hasLayoutu pro IE */ 
  filter: …
}
```

## Průhledný obsah, neprůhledný text

Jak je vidět na předchozí ukázce, průhledné je úplně vše. Jelikož text není moc dobře čitelný, hodilo by se mít **průhledný pouze obsah**.

### Průhledná barva — `rgb**a**(…)`

Od **IE9** se při zápisu barev dá použít zprůhlednění. (Ekvivalent `rgba` bez průhlednosti je `rgb` a **funguje spolehlivě napříč prohlížeči**.)

Barva se zadá čtyřmi parametry:

  Rred – červená rozmezí 0–255 nebo 0%–100%
  Ggreen – zelená rozmezí 0–255 nebo 0%–100%
  Bblue – modrá rozmezí 0–255 nebo 0%–100%
  Aaplha – průhlednost hodnota v rozmezí 0–1

Následující elementy mají *stejnou* barvu, ale jinak nastavenou její průhlednost.

    .pruhledny-alpha {overflow: hidden}
    .pruhledny-alpha p {
      padding: 1em;
      width: 4em;
      float: left;
    }
    .a8 {background: rgba(100%, 70%, 100%, 0.8)}
    .a7 {background: rgba(100%, 70%, 100%, 0.7)}
    .a6 {background: rgba(100%, 70%, 100%, 0.6)}
    .a5 {background: rgba(100%, 70%, 100%, 0.5)}
    .a4 {background: rgba(100%, 70%, 100%, 0.4)}
    .a3 {background: rgba(100%, 70%, 100%, 0.3)}
    .a2 {background: rgba(100%, 70%, 100%, 0.2)}

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

Nastavování barev dle průhlednosti se může hodit při **návrhu webu**, když se ještě neví, co bude jak přesně barevné. Nebo v případě, kdy chceme [více barevných versí](/zmena-vzhledu). Stačí určit barevné pozadí a jednotlivé barvy zadávat jako černou nebo bílou o určité průhlednosti. Když se potom přebarví pozadí, *přebarví* se tak i všechny průhledné barvy.

### Absolutně posicovaný element s `opacity`

Druhá možnost, jak docílit **průhledného pozadí bez průhledného textu**, je si připravit samotný průhledný element a za text jej [naposicovat](/position#absolute) a `z-index`em přemístit za text (nutno dát pozor, aby se nedostal ještě *níže* než za požadovaný text – řešení je zvýšit `z-index` pro *obal*).

Výsledek by měl být v podporovaných prohlížečích totožný; v nepodporovaných, tj. **IE8**, **IE7** apod., by na rozdíl od předchozího příkladu tato ukázka měla fungovat.

    .pozadi {
      background: rgb(100%, 70%, 100%);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    .pruhledny-pozadim {overflow: hidden}
    
    .pruhledny-pozadim p {
      position: relative;
      z-index: 1;
      padding: 1em;
      width: 4em;
      float: left;
    }    
    .o8 .pozadi {filter: alpha(opacity=80); opacity: 0.8}
    .o7 .pozadi {filter: alpha(opacity=70); opacity: 0.7}
    .o6 .pozadi {filter: alpha(opacity=60); opacity: 0.6}
    .o5 .pozadi {filter: alpha(opacity=50); opacity: 0.5}
    .o4 .pozadi {filter: alpha(opacity=40); opacity: 0.4}
    .o3 .pozadi {filter: alpha(opacity=30); opacity: 0.3}
    .o2 .pozadi {filter: alpha(opacity=20); opacity: 0.2}

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

### Průhledný obrázek

Další řešení výše uvedeného nebo jen řešení situace, **kdy nestačí obyčejné jednobarevné pozadí**, je vytvoření průhledného obrázku v grafickém editoru ([příklad obrázku](/files/opacity/pruhledne-pozadi.png)), který se nastaví jako pozadí (`background`).

  .pruhledny-obrazek {overflow: hidden; background: url(/files/opacity/pruhledne-pozadi.png) no-repeat left top}
    .pruhledny-obrazek p {
      padding: 1em;
      width: 4em;
      float: left;
    margin-top: 0;
    }  

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element

    Průhledný element