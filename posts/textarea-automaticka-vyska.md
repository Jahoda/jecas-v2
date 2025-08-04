---
title: "Textarea s automatickou výškou"
headline: "Automatická výška <code>&lt;textarea></code>"
description: "Jak zajistit, aby se výška textového pole přizpůsobovala délce textu."
date: "2014-07-18"
last_modification: "2016-05-29"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

Při použití pole pro psaní delšího textu ([`&lt;textarea>`](/textarea)) čelíme dilematu, jak ho udělat vysoké. Nízká výška způsobí uživateli, co bude chtít zapsat **delší text**, značné nepohodlí. Naopak vysoká `&lt;textarea>` bude zase zabírat možná zbytečně hodně místa.

Prohlížeče kromě **IE 11** a starších umožňují provést změnu velikosti **tažením myši**, slouží k tomu CSS vlastnost [`resize`](/resize).

Co ale velikost uzpůsobovat automaticky v závislosti na **obsahu**?

## Počítání znaků

Asi první, co člověka napadne, je [počítat v `&lt;textarea>` znaky](/pocet-znaku) a **odřádkování** a nějak podle toho vypočítat výšku.

Přepočet výšky je nutný provádět při události [`oninput`](/oninput) (pro starší prohlížeče `onkeyup` + `onpaste` + `oncut` + `onfocus`).

Vzhledem k různým proporcím různých písmen je téměř nemožné dosáhnout přesného výsledku.

## Zjištění výšky `scrollHeight`

Asi nejlepší možnost je při změně obsahu nastavit výšku na `0` a z vlastnosti `scrollHeight` získat rozměry, které se následně nastaví jako výška.

V případě okrajového [box modelu](/box-model) je ještě nutno připočíst `offsetHeight`.

Skript si při inicialisaci nastaví pro `&lt;textarea>` do `data-*` atributu aktuální výšku, která se bude brát jako minimální. Výchozí minimální výšku tak jde zadat přes `height` nebo atributem `rows`.

.pole {
    box-sizing: border-box;
}

var AutoHeightArea = function() {
    var originalArea;
    
    var addEvent = function(element, evnt, funct) {
        if (element.attachEvent)
            return element.attachEvent('on' + evnt, funct);
        else
            return element.addEventListener(evnt, funct, false);
    };
    
    var resize = function() {
        var minHeight = originalArea.getAttribute("data-original-height");
        originalArea.style.height = "0";
        var newHeight = originalArea.scrollHeight + originalArea.offsetHeight;
        if (minHeight > newHeight) {
            newHeight = minHeight;
        }
        originalArea.style.height = newHeight + "px";
    };

    var init = function(area) {
        originalArea = area;
        originalArea.setAttribute("data-original-height", area.offsetHeight);
        addEvent(originalArea, "paste", resize);
        addEvent(originalArea, "cut", resize);
        addEvent(originalArea, "input", resize);
        addEvent(originalArea, "keyup", resize);
    };
    return {
        init : init
    };
}();

    AutoHeightArea.init(document.getElementById("pole"));

[Samostatná živá ukázka](http://kod.djpw.cz/rhyb)

## Využití `contenteditable`

Poslední možnost je použít `contenteditable` atrapu. Skutečná `&lt;textarea>` se schová pomocí `display: none` a místo ní se vloží obyčejný `&lt;div>`, který umožňuje zapisovat text. Při **odeslání formuláře** se potom obsah `&lt;div>`u překopíruje do skutečného pole, které se tak řádně odešle na server.

Jde si tak vytvořit i primitivní [WYSIWYG editor](/vlastni-wysiwyg).

Jelikož se jedná o obyčejný `&lt;div>`, automatické roztahování bude jeho běžná vlastnost.

    .div-contenteditable {
      background: #fff;
      border: 1px solid #ccc;
      padding: .2em;
    }
  
  Automatická výška „&lt;textarea>“

[Živá ukázka](http://kod.djpw.cz/wmeb-)

Nevýhoda tohoto postupu tkví ve větší pracnosti s převedením obsahu do požadované formy. Z políčka vyleze míst *plain textu* HTML, které se navíc bude lišit napříč prohlížeči.

Například odřádkování někde vytváří nové odstavce (`&lt;p>`), jinde `&lt;div>` a někde pro změnu `&lt;br>`.

## Odkazy jinam

  - [jQuery Autosize](http://www.jacklmoore.com/autosize/) – plugin do **jQuery** zajišťující automatickou výšku (může být i **plynule animovaná**).

  - [Stretchy](http://leaverou.github.io/stretchy/) – automatická velikost elementů `&lt;textarea>` i [`&lt;input>`](/input)