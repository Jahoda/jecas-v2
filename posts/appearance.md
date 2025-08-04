---
title: "CSS vlastnost appearance"
headline: "CSS <code>appearance</code>"
description: "Systémový vzhled elementů pomocí CSS vlastnosti <code>appearance</code>."
date: "2016-11-01"
last_modification: "2016-11-01"
status: 1
tags: ["CSS", "Stylování elementů", "CSS vlastnosti"]
---

Kromě neutrálních značek [`&lt;div>` a `&lt;span>`](/div-span), které se bez patřičného stylování zobrazují bez zvláštních stylů, existují elementy, které visuální podobu přebírají z operačního systému – typicky prvky [formulářů](/formulare).

Vlastností `appearance` jde tento vzhled přiřadit *normálním* HTML značkám. (*Appearance* znamená v angličtině vzhled.)

Symbolický zápis může vypadat následovně:

```
.jako-tlacitko {
  appearance: button; 
}
```

Po přiřazení této třídy pro běžný `&lt;div>` vznikne něco jako [`&lt;button>`](/button).

    Text v „tlačítku“

Jedná se **pouze** o visuální změnu. Veškeré chování je jinak stejné jako u obyčejného elementu.

## Podpora

Podpora chybí v **Internet Exploreru** / [**MS Edge**](/microsoft-edge) a pro **Chrome**/**Operu**/**Safari**/**Firefox** je nutné použí [CSS prefixy](/css-prefixy). Navíc se od sebe liší hodnoty pro `-webkit-` a `-moz-` prefix.

Možných hodnot existuje obrovské množství:

    - DevDocs: [`-webkit-appearance`](http://devdocs.io/css/-webkit-appearance)

    - DevDocs: [`-moz-appearance`](http://devdocs.io/css/-moz-appearance)

V praxi jakž takž rozumně fungují hodnoty nastavující tlačítko, [checkbox](/input#type-checkbox) a [radio přepínač](/input#type-radio).

  - `appearance: button` – Tlačítko

  - `appearance: checkbox` – &nbsp;&nbsp;&nbsp; checkbox

  - `appearance: radio` – &nbsp;&nbsp;&nbsp; checkbox

## `appearance: none`

Možná nejzajímavější hodnota vlastnosti `appearance` je `none`. Ta totiž dokáže vypnout výchozí vzhled formulářových prvků a umožnit jejich vlastní stylování.

```
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
```

Výsledek může vypadat třeba takto:

    #vlastni-checkbox {
      -webkit-appearance: none;
      -moz-appearance: none; 
      width: 1.5em; 
      height: 1.5em; 
      background: #fff;
      border: 2px solid #0D6AB7;
      border-radius: 5px;
      vertical-align: bottom;
    }
    #vlastni-checkbox:checked {
      background: #0D6AB7;
    }

  Vlastní styl checkboxu

Vzhledem k nespolehlivosti vlastnosti `appearance` je ale pořád osvědčenější postup používat atrapy pomocí [značky `&lt;label>`](/label-for):

    - [Pokročilé stylování `checkbox`u](/stylovani-checked)

## Odkazy jinam

  - CSS Tricks: [`appearance`](https://css-tricks.com/almanac/properties/a/appearance/)