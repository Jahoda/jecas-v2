---
title: "Jak organisuji CSS v roce 2014"
headline: "Jak organisuji CSS v roce 2014"
description: "Jak píšu a organisuji CSS v roce 2014."
date: "2014-11-25"
last_modification: "2014-11-25"
status: 0
tags: []
---

Reakce na článek **Martina Michálka**.

    - [Organizace CSS, verze 2014](http://www.vzhurudolu.cz/blog/29-organizace-css-2014)

TLDR: Možná to někoho překvapí, ale v podstatě nijak.

Proč?

## Organisace souborů

V první řadě je třeba si zopdpovědět otázku, proč vlastně kasakádové styly **členit** do podadresářů a více souborů.

V zásadě jediné důvody, proč se vyplatí mít styly rozdělené, je u většího projektu:

  - **práce ve více lidech**,

  - **přehlednost ve versovacím systému**

Je určitě příjemnější, když se v *commitu* ukáže, že se změnil soubor `tlacitka.css` místo `styl.css`. Stejně tak neustále řešit *mergeování* v `styl.css` při práci ve více lidech není žádný med.

Pokud tedy na něčem pracuji sám nebo CSS neversuji používám klidně jediný soubor. S přehledností není problém, protože stejně člověk hledá potřebné části CSS podle selektorů ve veškerém CSS, ne na základě souborů.

I když styly dělím do více souborů, **složkám** se vyhýbám úplně, protože způsobují problémy s **relativními cestami**. Více souborů se používá pouze pro **vývoj** a ve finále se ze všech souborů udělá jeden [zmačkaný soubor](/slouceni-js-css) (v **Nette** používám [WebLoader](http://addons.nette.org/janmarek/webloader)).

Ve vývojovém režimu se používají soubory z:

```
/css/styl.css
/css/menu.css
/css/tlacitka.css
```

V ostrém provozu potom:

```
/cache/spojeny.css
```

V případě, že by spojený CSS soubor byl hodně velký, jeho „kritickou část“ vkládám přímo do hlavičky HTML stránky, do značky `&lt;style>`, aby čekání na CSS soubor **nezdržovalo načítání**.

Relativní adresy na obrázky do složky `/obrazky/` bezproblémů fungují (`../obrazky/obrazek.jpg`). Aby správně fungovaly i se zanořenými složkami, musely by se adresy převádět.

Možná to umí řešit **CSS preprocesory**…

## CSS preprocesory

… ty ale nepoužívám. Proč? Mají přece spoustu výhod.

### Proměnné

Dá se bez nich obejít. V [Sublime Text](/sublime-text) není problém snadno označit stejné hodnoty a najednou je přepsat.

Jindy si jde vystačit s čistým CSS. Pokud budu chtít nadpisy, odkazy a tlačítka napsané super písmem, použiji:

```
h1, a, button {
  font-family: Super písmo;
}
```

### Nesting

Nesting je vlastnost, která umožňuje do sebe zanořovat jednotlivé deklarace.

```
.polozky {
  color: blue;

  .polozka {
    color: red;
  }
}
```

Výsledek bude:

```
.polozky {color: blue}
.polozky .polozka {color: red}
```

Opět to není funkce, bez které by se nedalo žít, navíc to není úplně dobrý postup. Samoúčelně **posilovat selektory** (`.polozky .polozka`) není dobré.

### Skládání souborů

Řeším vlastním PHP skriptem / rozšířením v Nette.

### Mixiny

Používají se k vytvoření jakési funkce, které se předají argumenty a ona vrátí blok kódu. Ukázkový příklad je pro používání CSS vlastností potřebujících [prefixy](/css-prefixy).

Stačí napsat něco jako `border-radius(10px)` a vygeneruje se:

```
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
-ms-border-radius: 10px;
border-radius: 10px;
```

To je hezké, ale podobně poslouží snippety v Sublime Text a upravovat **více hodnot najednou** není podobně jako u náhrady proměnných problém ani tady.

### Rozšíření/dědičnost

Pomocí něčeho jako `@extend` je možné do pravidel jednoho selektoru zakomponovat pravidla jiného.

```
.prvni {color: red}
.druhy {
  @extend .prvni;
  font-weight: bold;
}
```

Z toho vznikne:

```
.prvni, .druhy {color: red}
.druhy {
  font-weight: bold;
}
```

Zde mi není moc jasné, jakou to má přinášet výhodu, když zápis využívající `@extend` je delší.

### Matematické operace

To je docela hezká vlastnost (od **IE 9** funguje přímo v CSS vlastnost [`calc`](/calc)).

Hodně by se hodila tak před 10 lety, když se dělaly weby s **pevným layoutem v pixelech** a nešlo napříč prohlížeči používat okrajový box model ve standardním režimu.

Ale [převod pixelů na em](/responsivni-web#kalkulacka) při určování break-pointů by se hodil i dnes.

### Funkce

Asi nejhezčí věci, co preprocesory nabízí, jsou **funkce pro úpravy barev**.

Použitím jednoduché funkce jde barvy **zesvětlit, ztmavit, invertovat** a podobně. Dá se tím dosáhnout stavu, kdy se pro web nadefinuje jedna nebo dvě hlavní barvy a zbytek odstínů se od toho **odvodí**.

V Sublime Text si jde sice pohodlně **upravovat barvy** prostřednictvím [palety](/pluginy-sublime-text#pluginy), ale dosáhnout výše uvedeného je prakticky nemožné.

### Cykly

S některými preprocesory je možné generovat kód pomocí **cyklů**.

  - [Side Effects in CSS](http://philipwalton.com/articles/side-effects-in-css/)

  - [Can CSS Be Too Modular?](http://csswizardry.com/2015/03/can-css-be-too-modular/)

  - [CSS Best Practices](https://github.com/sezgi/CSS-Best-Practices)