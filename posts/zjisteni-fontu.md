---
title: "Jak zjistit název fontu"
headline: "Co je to za font?"
description: "Jak určit, jak se jmenuje písmo na obrázku nebo webu."
date: "2014-06-17"
last_modification: "2016-11-21"
status: 1
tags: ["Rady a nápady", "Písma"]
---

Často chceme zjistit, **jaké písmo webová stránka používá** nebo jaký font je například na obrázku.

## Zjištění fontu z obrázku

Pro určení použitého fontu na základě obrázku existuje dobře funkční nástroj:

### WhatTheFont

[WhatTheFont](http://www.myfonts.com/WhatTheFont/)

Obrázek pro identifikaci písma je možné **nahrát z disku** nebo zadat URL z umístění na webu a následně ověřit, jestli se podařilo správně identifikovat **na obrázku použitá písmena**.

Nástroj WhatTheFont pracuje velmi spolehlivě, ale samozřejmě se může stát, že písmo nenajde. Navíc v řadě případů nabídne více písem a **finální určení proběhne ručně**. Občas ale může být kvůli své popularitě přetížený.

### Fontspring Matcherator

[Fontspring Matcherator](https://www.fontspring.com/matcherator)

Velmi spolehlivý nástroj pro určení fontu. Obrázek s písmem k rozpoznání jde vložit pomocí URL nebo nahrát z disku.

## Font použitý na stránce

Určení písma, kterým je napsán text webu, je potom z principu věci 100%.

Do prohlížeče **Chrome** existují šikovné doplňky / pro ostatní prohlížeče jako *bookmarklet*.

### Type Sample

[Type Sample](http://www.typesample.com)

Po aktivování režimu prohlížení (kliknutí na bookmarklet / ikonu pluginu) se při najetí nad element **objeví použitý font**.

Když se na obsah klikne, je navíc možné daným písmem zkusit napsat **vlastní text**. To se může hodit třeba pro ověření, zda **font umí češtinu** v případě anglického webu a podobně.

### Fontface Ninja

[Fontface Ninja](http://fontface.ninja/)

Velmi podobný je i nástroj **Fontface Ninja**, který umí i některé fonty **stáhnout**.

Občas má ale problémy správné písmo určit, třeba na této stránce.

### Jiné způsoby

    Teoreticky je možné použité písmo vyčíst **přímo z CSS souborů**, ale kvůli dědičnosti to může být oříšek.

    ```
body {
  font-family: "Název písma";
}
```

    U netradičních písem (např. [Google fontů](/ceska-pisma)) jde vypozorovat font na základě jeho připojení v sekci `&lt;head>`:

```
&lt;link href='http://fonts.googleapis.com/css?family=Nazev+pisma' rel='stylesheet'>
```

    Další způsob je s použitím [vývojářských nástrojů](/vyvojarske-nastroje) monitorovat část Síť/Network s stahování písem (záložka *Fonts*).

    S využitím **vývojářských nástrojů** je nakonec snadné zjistit písmo i po kliknutí pravým tlačítkem na text a volbou *Zkontrolovat prvek* a v pravé částí si vybrat *spočítané* (Computed) styly. A tam najít CSS vlastnost `font-family`.

Zjistit [„spočítané“ hodnoty CSS](/zjisteni-css) umí i pár řádků JavaScriptu.

    Ve **vývojářských nástrojích Firefoxu** je u prozkoumávání prvků stránky přímo volba *Písma*, která rovnou zjistí použitý font. Napíše i informaci, jestli je písmo *systémové* nebo *vzdálené* (např. *Google Font*). Tato funkce umí i vypsat všechny písma použitá na stránce.