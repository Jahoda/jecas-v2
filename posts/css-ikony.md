---
title: "CSS ikony"
headline: "CSS ikony"
description: "Ikony bez obrázků v čistém CSS."
date: "2013-11-24"
last_modification: "2013-12-30"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

Chceme-li stránkou obohatit a zpřehlednit ikonami, existují různé možnosti:

    Použít **běžný obrázek** (ideálně jako [CSS sprite](/css-sprite)).

    Použít tzv. [*font icons*](/font-ikony) (**ikony z písma**). To funguje tak, že se na stránku připojí speciální font, který místo běžných znaků obsahuje **grafické symboly** ikon.

    *Nakreslit* ikonu přímo **v CSS**.

Obecné techniky [*kreslení* v CSS](/css-kresleni) už jsem popisoval. Při tvorbě **CSS ikon** je *jen* stačí vhodně kombinovat.

U složitějších podob ikon, kde je potřeba více elementů, si lze vypomoci přes [`:before`/`:after`](/css-selektory#before-after). A ušetřit tím pár značek, které by jinak **musely být v kódu**.

Z jednoho elementu tedy můžeme udělat **tři**, případně přidat další element a získat tak **šest částí**, což už stačí i na složité výtvory. Ne jen **primitivní šipku**.

    .ico {width: 36px; height: 36px; display: inline-block; position: relative; background: #fff;}
    .ico:before, .ico:after {position: absolute; content: ""} 
    .sipka:before {border: 10px solid transparent; border-bottom-color: #1081DD; left: 8px; top: -5px}
    .sipka:after {width: 4px; height: 20px; background: #1081DD; left: 16px; top: 10px}
  
  **

## Výhody a nevýhody

Výhody **ikonek v CSS** jsou:

  - šetření **HTTP požadavků** (stačí přidat do CSS definici ikon, nic dalšího **se nemusí stahovat**),

  - snadná **změna barev a rozměrů** bez ztráty kvality (pokud s tím ikonky počítají).

Jako nevýhody lze považovat:

    **Komplikovanější upravování** a rozšiřování. Je jednodušší překreslit obrázek, než laborovat s CSS v `:before` a `:after` *elementech* a obávat se limitu daným **počtem elementů** pro ikony stanovených.

    **Slabší podpora** některých pro kreslení podstatných CSS vlastností (například [kulaté rohy](/border-radius)). **Plnohodnotnou podobu** je reálné očekávat až od **IE 9**.

    Další věc je **datová velikost**. Při komplikovanějších podobách využívajících lehce nestandardní CSS vlastnosti, může být **CSS kód ikony** zaneřáděn duplicitními deklaracemi lišící se jen [prefixy](/css-prefixy). A ve výsledku tak být objemnější než běžný **obrázek**.

    Nakonec bude u CSS ikon mnohem slabší výběr **hotových setů ikon** rovnou k použití.

## Hotové ikony

Odkazy na zajímavější kolekce CSS ikon.

### UIPlayGround CSS 3 Icons

[Web](http://www.uiplayground.in/css3-icons/)

## Odkazy jinam

### SVG ikony

  - [SVG Icons FTW](http://tympanus.net/codrops/2013/11/27/svg-icons-ftw)

  - [Proč používat SVG ikony](http://ianfeather.co.uk/ten-reasons-we-switched-from-an-icon-font-to-svg/)

### Font ikony

  - [Fontastic](http://fontastic.me/)

  - [Elusive Icons: The iconic font and CSS toolkit](http://elusiveicons.com/)