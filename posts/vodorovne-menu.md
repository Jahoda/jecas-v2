---
title: "Vodorovné menu"
headline: "Horizontální navigace"
description: "Různé možnosti, jak vytvořit vodorovné menu s odkazy vedle sebe."
date: "2013-10-26"
last_modification: "2013-10-27"
status: 1
tags: ["CSS", "Hotová řešení", "Menu v CSS"]
---

Asi nejjednodušší možnost vytvoření navigace s odkazy vedle sebe je prosté *naházení* odkazů do `&lt;div&gt;`u.

  function trida(el, trida) {
    if (el.className.match(trida)) {
      el.className = el.className.replace(trida, "");
    }
    else {
      el.className += " " + trida;
    }
  }

    .nepodtrhnout a {text-decoration: none; border-bottom: 0}
    .barvy a {background: #fff}
    .padding a {padding: .3em}
    .vycentrovat {text-align: center}

    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)

    var menu1 = document.getElementById("menu1");

To není úplně špatné:

  - jednotlivé odkazy můžeme zbavit podtržení (`text-decoration: none`),

  - nějak hezky obarvit (`background: #fff`),

  - přidat odsazení (`padding: .3em`),

  - nebo položky vycentrovat (`text-align: center` pro nadřazený element)

Jakmile ale bude potřeba **měnit výšku nebo šířku** jednotlivých odkazů, narazíme na problém, protože odkazy jsou řádkové. Naštěstí existují způsoby, jak dostat vedle sebe i bloky.

## Inline-block

Přidáním `display: inline-block` pro získáme **výhodu řádkových i blokových elementů** najednou.

    .menu2 a {text-decoration: none; border-bottom: 0; background: #fff; padding: .3em; display: inline-block}
    .vycentrovat {text-align: center}
    .rozmery a {width: 100px; line-height: 40px}

    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)
    [Odkaz](#)

    var menu2 = document.getElementById("menu2");

Vše bude fungovat jako dřív a navíc půjde měnit rozměry. Bezproblémové centrování je samozřejmost.

## Obtékání

Druhá možnost je položky menu nechat [obtékat](/float). Nicméně nevidím důvod pro použití obtékání místo řešení s `inline-block`. Nenapadá mě žádná výhoda takového postupu.

Snad jen může být problém v mezerách mezi položkami, které vzniknou při `inline-block` řešení a umístěním každného odkazu v HTML kódu na zvláštní řádek. Řešením je **umístit všechny odkazy ihned za sebe** nebo odřádkování zakomentovat.

```
   &lt;a href=#&gt;Odkaz&lt;/a&gt;&lt;!--
--&gt;&lt;a href=#&gt;Odkaz&lt;/a&gt;
```

Nebo nakonec opravdu použít ten `float`.

    .floatovane {list-style: none; padding: 0; margin: 0; overflow: hidden;}
    .floatovane li {display: inline}
    .floatovane a {text-decoration: none; border-bottom: 0; background: #fff; padding: .3em; float: left; width: 100px; line-height: 40px; text-align: center;}

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

Kromě nevýhody, že je nutné řešit [clearování](/float#clear) bude obtíženější obtékané menu [vycentrovat](/centrovani).

## Sémantika

Někdo by mohl namítat, že menu patří do značky `&lt;menu&gt;` nebo alespoň seznamu (`&lt;ul&gt;`) a odkazy do položek `&lt;li&gt;`. Osobně se domnívám, že takové strukturování **prakticky nikdo neocení** a je to jen práce navíc. Ale nic neřešitelného to také nepředstavuje.

V podstatě stačí jen vynulovat `margin` a `padding`, odstranit odrážky (`listy-style: none`) a z položek udělat třeba řádkové elementy (`display: inline`).

    .menu3 {list-style: none; padding: 0; margin: 0; text-align: center}
    .menu3 li {display: inline}
    .menu3 a {text-decoration: none; border-bottom: 0; background: #fff; padding: 5px; display: inline-block; width: 100px; line-height: 40px}
    .fixni-menu {position: fixed; left: 50%; margin-left: -280px; top: 0; z-index: 100; background: #1081DD; padding: 5px}
    .fixni-menu a {color: #fff}    

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

    - [Odkaz](#)

    var menu3 = document.getElementById("menu3");

## Fixní menu

Vodorovné menu není problém na stránce zafixovat ([`position: fixed`](/position#fixed)), může být samozřejmě i [fixované jen někdy](/fixni-menu) podobně jako [boční panel](/sidebar).

**Vycentrování fixního menu** lze zajistit přes `left: 50%; margin-left: -(polovina šířky)`.