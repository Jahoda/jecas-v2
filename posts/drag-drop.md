---
title: "Drag & Drop přesouvání v JS"
headline: "Drag & Drop v JavaScriptu"
description: "Jak vytvořit „drag & drop“ přesouvání prvků po stránce v JavaScriptu."
date: "2014-11-15"
last_modification: "2015-01-10"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V některých situacích chceme uživateli umožnit **přesun** nějakého objektu po stránce.

## Posun objektu v CSS

Před samotnou tvorbou JS přesouvání je nutné zvolit technické řešení přesunu v CSS. Nabízejí se dvě základní možnosti:

    Elementu přidat [relativní posici](/position#relative) a měnit mu jeho hodnoty `top` a `left`.

    ```
position: relative;
left: posunX;
top: posunY;
```

    Přesouvat element CSS transformací.

    ```
transform: translate(posunX, posunY);
```

První způsob pomocí relativního posicování má prakticky 100% **podporu napříč prohlížeči**. Přesun transformací funguje od **IE 9**, ale umožní přesouvat bez řešení typu posice a hlavně je **lépe optimalisovaný** s ohledem na výkon.

Prohlížeče si pro elementy přesouvané pomocí `transform: translate` vytvoří **zvláštní vrstvu**, což sníží náročnost na překreslování. U přesunu posicováním se musí změněná plocha v okolí přesouvaného elementu **překreslovat**, což u hodně komplikované stránky může znamenat **pokles FPS** (snímků za vteřinu).

    - [Jak probíhá vykreslování stránky](/vykreslovani)

    - [Why Moving Elements With Translate() Is Better Than Pos:abs Top/left](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)

## Postup v JavaScriptu

    Připravíme si **přesouvatelný element** a potřebné proměnné.

    ```
var presouvany = document.querySelector("#presouvany-element");
var souradnice = {x: 0, y: 0}; // výchozí relativní umístění
var posunSouradnice; // pro zjišťování posunu
var puvodniSouradnice; // souradnice prvku před posunem
```

    Při události [`onmousedown`](/udalosti-mysi#onmousedown) (stisknutí tlačítka) se prvku, co má být možný přetahovat, přidá třída nebo [vlastní atribut](/vlastni-html-atributy). Zároveň se do nějaké proměnné uloží **relativní souřadnice prvku** v době před posunem (při prvním přesunu to bude `0;0`) a do další proměnné **aktuální souřadnice kursoru**.

    Aktuální souřadnice kursoru zjistíme například z `event.pageX`/`event.pageY`.

    ```
presouvany.setAttribute("data-move", "");
puvodniSouradnice = {x : souradnice.x, y: souradnice.y};
posunSouradnice = {
  x: event.pageX,
  y: event.pageY
};
```

    Následně se při posouvání myši v rámci dokumentu (`document.[onmousemove](/udalosti-mysi#onmousemove)`) **zkontroluje přítomnost atributu** `data-move` – kladný výsledek znamená, že je co přesouvat, takže se začne s přesunem. Záporný výsledek potom znamená, že se nic dál dělat nebude (`return`).

    ```
if (!presouvany.hasAttribute("data-move")) return;
```

    Na základě původních hodnot v proměnné `posunSouradnice`, se zjistí **rozdíl oproti začátku posouvání**. Který se přičte k aktuálním souřadnicím.

    ```
var x = souradnice.x + event.pageX - posunSouradnice.x;
var y = souradnice.y + event.pageY - posunSouradnice.y;
```

    V proměnných `x` a `y` bude výsledná hodnota pro nastavení jako `left` a `top` (nebo parametry pro `translate`). Zde může proběhnout případná  **kontrola**, zda člověk nepřesouvá do míst, kam nemá.

    Nyní stačí aktualisovat hodnoty `souradnice.x` a `souradnice.y` a nastavit nový styl.

    ```
souradnice.x = x;
souradnice.y = y;
presouvany.style.left = x + "px";
presouvany.style.top = y + "px";
```

    Případně místo změny `left` a `top` zajistit přesun pomocí `transofrm` (je vhodné použít [CSS prefixy](/css-prefixy):

    ```
presouvany.style.transform = "translate(" + x + "px, " + y + "px)";
```

    Při uvolnění tlačítka (`onmouseup`) odebereme **přesouvací atribut**, čímž se přesouvání ukončí.

    ```
presouvany.removeAttribute("data-move");
```

    Znázornit **možnost přesouvání** pomůže [`cursor: move`](/cursor#move).

[Ukázka s využitím posicování](http://kod.djpw.cz/xmhb) / [transformace](http://kod.djpw.cz/ljjb)

### Dotyková zařízení

Pro dotyková zařízení je třeba nahradit události `on**mouse***` za `on**touch***`.

  - `onmousedown` = `ontouchstart`

  - `onmousemove` = `ontouchmove`

  - `onmouseup` = `ontouchend`

Asi největší odlišnost je v tom, že dotyková zařízení mohou umět **více dotyků najednou**. Zajímat nás bude ale nejspíš jen ten první, takže:

  - `event.pageX` = `event.touches[0].pageX`

  - `event.pageY` = `event.touches[0].pageY`

[Ukázka pro dotyková zařízení](http://kod.djpw.cz/mjjb)

## Odkazy jinam

  - [**Chamurappiho** přesouvání na 15 řádek](http://diskuse.jakpsatweb.cz/?action=vthread&forum=7&topic=153139#3)

  - [Drag &amp; Drop události myši](/udalosti-mysi#drag-drop) – umožňují reagovat na přesunutí elementu na určité místo