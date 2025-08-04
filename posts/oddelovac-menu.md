---
title: "Oddělovač položek v navigaci"
headline: "Oddělovač položek v menu"
description: "Jakými způsoby v CSS lze realisovat oddělovač položek v menu."
date: "2015-09-16"
last_modification: "2015-09-18"
status: 1
tags: ["CSS", "Hotová řešení", "Menu v CSS"]
---

Vodorovná navigace často potřebuje pro přehlednost nebo visuální atraktivitu mít mezi jednotlivými položkami oddělovač.

## Oddělovací znak

První možnost, jak oddělovač vytvořit, je použít přímo nějaký znak.

Typicky se používá svislá čára `|`. (Na [české klávesnici](/ceska-klavesnice) jde zapsat zkratko Ctrl + W).

  [Odkaz](#) | [Další odkaz](#) | [Poslední odkaz](#)

Kromě svislé čáry je občas k vidění i puntík (HTML [entita](/entity) `&amp;middot;`):

  [Odkaz](#) &middot; [Další odkaz](#) &middot; [Poslední odkaz](#)

Nebo větší `&amp;bull;`:

  [Odkaz](#) &bull; [Další odkaz](#) &bull; [Poslední odkaz](#)

Jaký znak se použije, je celkem jedno.

Díky tomu, že obsah odkazu je obalen značkou [`&lt;a>`](/odkaz), není problém s odlišným stylováním odkazu a oddělovače (třeba jinou barvou).

Pro pohodlnější stylování se nabízí případně oddělovač obalit `&lt;span>`em.

### Nevýhody oddělovacího znaku

  Fandům **HTML sémantiky** může vadit, že menu není v [seznamu](/seznamy). To by sice šlo řešit, ale navíc je ještě v kódu znak, který slouží pouze k visuálním účelům.

  Při **automatickém generování** navigace se musí v HTML šabloně řešit, aby oddělovač nebyl za poslední položkou.

  Vzhled není pouze v CSS.

## CSS oddělovač

Oddělovač jde vykouzlit čistě v CSS. Buď přímo znakem pomocí CSS vlastnosti `content` použité u `:before`/`:after` (funkční od **IE 8**), nebo třeba rámečkem (`border`).

Při vytvoření oddělovače kaskádovými styly může být navigace bez problémů v seznamu `&lt;ul>`.

### CSS znak

S použitím znaku `|` v CSS to může vypadat následovně:

    .css-menu {
      margin: 0;
      padding: 0;
    }
    .css-menu li {
      display: inline-block;
    }
    .css-menu li:before {
      content: " | ";
    }
    .css-menu li:first-child:before {
      display: none;
    }     

    - [Odkaz](#)

    - [Další odkaz](#)

    - [Poslední odkaz](#)

Skrytí oddělovače před prvním odkazem se zajistí selektorem `:first-child`.

Šlo by použít i `:last-child` pro zaměření naopak **posledního elementu**, tento selektor ale funguje až od **IE 9** (`:first-child` už od **IE 7**), takže je lepší využívat raději selektor prvního potomka.

Zaměřit všechny elementy kromě prvního by šlo i pomocí [selektoru přímého sourozence](/css-selektory#primy-sourozenec) `li + li` (funkční od **IE 7**).

### Rámeček `border`

Pro flexibilnější oddělovač nezávislý na písmu se hodí použít přímo CSS rámeček:

    .css-ramecek-menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .css-ramecek-menu li {
      float: left;
      border-left: 1px solid #000;
      padding: 0 .5em;
    }
    .css-ramecek-menu li:first-child {
      border: 0;
      padding-left: 0;
    }     

    - [Odkaz](#)

    - [Další odkaz](#)

    - [Poslední odkaz](#)

### Posicovaný oddělovač

Měl-li by být svislý oddělovač například nižší, než je výška odkazu, bylo by s rámečkem položky seznamu `&lt;li>` složité pořízení.

V takovém případě se hodí udělat oddělovač opět přes `:before`/`:after` a [absolutně](/position#absolute) ho naposicovat, jak je potřeba:

    .css-posicovany-ramecek {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .css-posicovany-ramecek li {
      float: left;
      position: relative;
      padding: 0 .5em;
    }
    .css-posicovany-ramecek li:before {
      content: "";
      position: absolute;
      left: 0;
      top: .8em;
      height: .5em;              
      border-left: 1px solid #000;
    }
    .css-posicovany-ramecek li:first-child {          
      padding-left: 0;            
    }
    .css-posicovany-ramecek li:first-child:before {
      border: 0;
    }     

    - [Odkaz](#)

    - [Další odkaz](#)

    - [Poslední odkaz](#)

### Řešení bez `:first-child`

V dávných dobách, kdy se ještě ladily weby pro **Internet Explorer 6**, který selektor `:first-child` neznal, šlo skrýt první oddělovač záporným [`margin`em](/margin) v šířce rámečku a `oveflow: hidden` – [ukázka](http://kod.djpw.cz/afqb).

Tento postup funguje dodnes, ale může být špatně srozumitelný.

## Obrázkový oddělovač

Oddělovač položek pomocí obrázku je potom asi nejjednodušší realisovat prostřednictvím `background`u pro položku `&lt;li>`.

    .obrazkove-menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }
    .obrazkove-menu li {
      float: left;
      padding-left: 25px;
      margin-right: 10px;
      background: url(/files/oddelovac-menu/oddelovac.png) left center no-repeat;
    }
    .obrazkove-menu li:first-child {
      background: none;
      padding-left: 0;
    }     

    - [Odkaz](#)

    - [Další odkaz](#)

    - [Poslední odkaz](#)

Umístění obrázku doprostřed mezi dvě položky se zajistí přesně spočítanou kombinací vlastností `padding` a `margin` v závislosti na šířce obrázku.