---
title: "CSS blend"
headline: "CSS blend"
description: "CSS vlastnost <code>background-blend-mode</code> slouží ke smíchání barvy s obrázkem."
date: "2014-03-01"
last_modification: "2014-10-17"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

V případě, že nastavíme nějakému elementu obrázek na pozadí a zároveň barvu, `background-blend-mode` umožní tyto dvě složky *smíchat* (anglicky blend). Obrázek tedy **nemusí být průhledný**, aby se za ním barva projevila.

Míchání popdporuje **Chrome 35**, **Firefox 30**, **Safari 7.1** i **Opera 22**. **IE** zatím nikoliv.

Symbolický zápis vypadá následovně.

```
element {
  background-image: url(url obrázku);
  background-color: barva pozadí;
  **background-blend-mode**: typ;
}
```

Za `typ` se potom zadává něco z mnoha hodnot: `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosit`.

Nejlepší bude si to vyzkoušet (typů je možné zadávat i několik zároveň – při zápisu CSS se oddělí čárkou).

.blend {
    background-image: url(http://jecas.cz/files/blend/1.jpg);
    width: 100%;
    height: 0;
    padding-top: 50%;
    background-color: #0D6AB7;
    background-size: cover;
}

.blend-obal ul {list-style: none; padding: 0;}
.blend-obal li {display: inline}
.blend-obal label {white-space: nowrap;}

Obrázek
    
        krajina
        káva
        moře
        koncert
        louka

Barva na pozadí 

Typ `background-blend-mode`:

-  `normal`

-  `multiply`

-  `screen`

-  `overlay`

-  `darken`

-  `lighten`

-  `color-dodge`

-  `color-burn`

-  `hard-light`

-  `soft-light`

-  `difference`

-  `exclusion`

-  `hue`

-  `saturation`

-  `color`

-  `luminosity`

var blendTest = document.getElementById('blend-test');
(function() {
var policka = document.getElementById('blend-obal').getElementsByTagName("input");

for (var i = policka.length; i--; ) {
    policka[i].onchange = namichat;
}

function namichat() {
    var blendMode = [];
    for (var i = policka.length; i--; ) {
        if (policka[i].checked) {
            blendMode.push(policka[i].name);
        }
    }
    blendTest.style.backgroundBlendMode = blendMode.join(",");
}
    
})();

[Test na samostatné stránce](http://kod.djpw.cz/bogb-)

## Vlastnost `mix-blend-mode`

Pro míchání **libovolných elementů** (ne jen obrázku a barevného pozadí) existuje vlastnost `mix-blend-mode`. Podpora v prohlížečí je ale zatím nedostatečná. V **Chrome** a **Opeře** se musí zapnout v `chrome://flags`, resp. `opera://flags`.

## Odkazy jinam

  - Dev.Opera: [Getting to Know CSS Blend Modes](https://dev.opera.com/articles/getting-to-know-css-blend-modes/)

  - Adobe Web Platform: [CSS Blend Modes](http://webplatform.adobe.com/blend-modes/)

  - Bennett Feely: [CSS Blend Modes could be the next big thing in Web Design](https://medium.com/@bennettfeely/css-blend-modes-could-be-the-next-big-thing-in-web-design-6b51bf53743a)

  - DevDocs: [background-blend-mode](http://devdocs.io/css/background-blend-mode)

  - MDN: [background-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode)

  - CSS-Tricks: [Basics of CSS Blend Modes](http://css-tricks.com/basics-css-blend-modes/)

  Demosthenes.info: Better Diagrams with SVG and Blend Modes
CSS / BLEND MODES