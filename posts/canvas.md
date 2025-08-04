---
title: "HTML Canvas"
headline: "HTML <code>&lt;canvas></code>"
description: "Canvas je HTML značka pro kreslení v prohlížeči pomocí JavaScriptu."
date: "2014-11-06"
last_modification: "2016-01-04"
status: 1
tags: ["HTML", "JavaScript", "HTML značky"]
---

Anglický výraz *canvas* jde přeložit do češtiny jako **plátno**.

Před `&lt;canvas>`em byl prakticky jediný způsob, jak něco JavaScriptem na stránce nakreslit, vytváření HTML elementů a jejich vhodné stylování.

    - [Kreslení v CSS](/css-kresleni) – vytváření různých tvarů v CSS

Canvas umožňuje libovolně kreslit doslova pixel po pixelu.

## Podpora

Kreslení do `&lt;canvas>`u je široce podporováno napříč prohlížeči.

Nejméně zastaralý prohlížeč, kde podpora chybí, je **Internet Explorer 8**.

Mobilní prohlížeč **Opera Mini** potom neumí `&lt;canvas>` animovat.

## Zápis

Značka `&lt;canvas>` sama o sobě nedělá prakticky nic.

Kromě [globálních atributů](/obecne-atributy) (`id`, `title` a podobně) podporuje pouze nastavení rozměrů přes `width` a `height` (jednotky `px` se neuvádí, byť se s jejich přítomností dokáží prohlížeče vypořádat).

```
&lt;canvas width="300" height="300" id="platno">
  &lt;p>Prohlížeč nepodporuje canvas.&lt;/p>
&lt;/canvas>
```

Do obsahu značky jde umístit obsah pro prohlížeče, co `&lt;canvas>` neznají – tedy například **IE 8** a starší.

## Kreslení

Aby se plátno nějak projevilo, musí se na něj něco nakreslit. To se dělá JavaScriptem:

```
var canvas = document.getElementById("platno");
var ctx = canvas.getContext("2d");
```

První řádek [vybere](/getelement) značku `&lt;canvas>`, druhý si vytáhne její 2D kontext (existuje ještě 3D kontext).

Do *kontextu* je nyní možné psát a kreslit. [Ukázka](http://kod.djpw.cz/oiqb):

    Prohlížeč nepodporuje canvas.

    var platno = document.getElementById("platno");
    var ctx = platno.getContext("2d");
    
    ctx.fillStyle = "#0D6AB7";
    ctx.fillRect(10, 10, 100, 100);
    
    ctx.fillStyle = "#1081DD";
    ctx.fillRect(0, 0, 100, 100);
    
    ctx.moveTo(110, 60);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0D6AB7';
    ctx.lineTo(280, 60);
    ctx.stroke();
    
    ctx.fillStyle = "#0D6AB7";
    ctx.font = 'bold 30pt Arial';
    ctx.fillText('Je čas', 150, 50);
    
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(50, 50, 20, 0, 2 * Math.PI, false);
    ctx.fill();    

Pro lepší pochopení jsou ideální ukázky na stránce html5canvastutorials.com, kde jde přímo upravovat kód a rovnou vidět, jak se výsledek mění:

      - [HTML5 Canvas Tutorials](http://www.html5canvastutorials.com/) – živé ukázky kreslení různých tvarů do `&lt;canvas>`u

## Specifika „plátna“

Kreslení do *canvasu* je maximálně nízkoúrovňové. Pokud se na plátno nakreslí čára, plátno to *nijak neví* – pouze se v něm přebarvily pixely na místě, kudy čára vede.

Zpětně tedy není možné zjistit, kudy čára vedla, a třeba ji jednoduše přesunout jinam. Canvas funguje podobně jako staré malování ve [Windows](/windows).

V praxi se to řeší tak, že jsou informace o nakreslených položkách uloženy v JS objektu a při změnách se celé plátno překreslí.

Kreslení do `&lt;canvas>`u je hodně rychlé, takže překreslování moc nevadí.

## Využití

### Úprava obrázků

Asi nejzajímavější je využití pro úpravu obrázků. Díky `&lt;canvas>`u existuje řada grafických editorů fungujících přímo v prohlížeči:

    - [Grafické editory v prohlížeči](/graficky-editor) – využívající *canvas* nebo [SVG](/svg)

Pro **základní úpravy obrázků**, jako je změna rozměrů, otočení nebo převrácení, není díky plátnu a JS nutné tyto operace provádět na straně serveru. To šetří výkon serveru a zlepšuje rychlost odezvy u uživatele, protože se každá úprava nemusí přenášet tam a zase zpátky.

### Grafy

Pro kreslení grafů pomocí JS je *canvas* možné řešení. Pro interaktivní grafy je ale jednodušší používat SVG – jednotlivé prvky grafu u SVG jsou prvky [DOMu](/dom), takže je pohodlnější na ně navázat různé [JS události](/js-udalosti).

    - [Vytváření grafů v JavaScriptu](/grafy)

### Hry

Většina **náročnějších her** běžících v prohlížeči vykresluje svůj obsah do plátna tvořeného značkou `&lt;canvas>`.

Pro prohlížečové hry existují hotové enginy (2D i 3D), takže není obvykle nutné se starat o vykreslování na té nejnižší úrovni.

Jednodušší 2D hry se obejdou i bez *canvasu* a vystačí si s prostou manipulací HTML elementů.

## Odkazy jinam

  - MDN: [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  
  - [Introduction to HTML5 canvas](http://thenewcode.com/19/Introduction-to-HTML5-canvas)