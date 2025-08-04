---
title: "Fixní menu při scrollování"
headline: "Fixní menu při rolování"
description: "Jak při odrolování stránky zafixovat menu na horní hraně obrazovky."
date: "2013-11-02"
last_modification: "2013-11-03"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Menu v CSS", "Fixní posice"]
---

Obdobnou technikou jako u [fixního postranního panelu](/sidebar) lze zajistit i u [vodorovného menu](/vodorovne-menu), aby se při odrolování o více než je jeho umístění odshora **přilepilo k horní straně okna** a tam zůstalo.

    .menu3 {list-style: none; padding: 0; margin: 0; text-align: center}
    .menu3 li {display: inline}
    .menu3 a {text-decoration: none; border-bottom: 0; background: #fff; padding: 5px; display: inline-block; width: 100px; line-height: 40px}
    .fixni-menu {position: fixed; left: 0; top: 0; width: 100%; background: #8ECCF0; text-align: center; z-index: 1}    

      - [Odkaz](#)

      - [Odkaz](#)

      - [Odkaz](#)

      - [Odkaz](#)

      - [Odkaz](#)

    var menu = document.getElementById('fixni-menu');
    window.onscroll = function () {
      menu.className = (
        document.documentElement.scrollTop + document.body.scrollTop > menu.parentNode.offsetTop
        && document.documentElement.clientHeight > menu.offsetHeight
      ) ? "fixni-menu" : "";
    }

**Zafixování** se provede až přes CSS třídu, kterou nastaví JavaScript v momentě, kdy je vzdálenost navigace shora menší než hodnota, o kterou **je už odrolováno**.

Díky nastavování třídy místo `element.style.position = "fixed"` je pohodlnější upravování dalších stylů — při **zafixování** může být vhodné například menu zjednodušit nebo zmenšit.

## Vycentrování menu

Trochu nešikovné je, že se [fixní posice](/position#fixed) musí dopočítat od okrajů celého okna (ne od nadřazeného elementu s `position: relative` jako u absolutního posicování).

  - První možnost je [centrovat](/centrovani) nastavením `left: 50%`, přesné šířky a **záporného `margin`u** o polovině šířky.

  - Kromě toho je možné vytvořit **fixní element** se 100% šířkou, naposicovat ho do levého horního rohu (`left: 0; top: 0`) a až v rámci **tohoto *obalu*** centrovat navigaci. Potom není problém použít centrování přes `margin: auto` nebo `text-align: center` pro `inline`/`inline-block` elementy.

## Fixní menu

Pokud navigace bude **úplně nahoře** (nebo tam, kde může být i při rolování – třeba **vedle obsahu**) už při načtení stránky, stačí samotné `position: fixed` bez JavaScriptové *šaškárny*.

## A ještě…

… trochu vycpávky, aby se zafixování mohlo projevit.

## Další hotová řešení

  - [StickUp](http://lirancohen.github.io/stickUp/) (kromě fixování i [zvýrazňuje aktivní položku](/zvyrazneni-odrolovani))

  - [Headroom.js ](http://wicky.nillia.ms/headroom.js/playroom/)