---
title: "JS tooltip"
headline: "JS tooltip"
description: "JavaScriptový popisek po najetí myší na ikonu nebo text."
date: "2014-03-03"
last_modification: "2014-06-23"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

O možnosti vytvoření lepšího [atributu `title`](/atribut-title) čistě v CSS už jsem psal. Tento článek pojednává o **JavaScriptovém řešení**.

Zatímco u obyčejných **obsahových webů** doporučuji obyčejné `title` popisky spíš nepoužívat (text napsat do závorky). U webových aplikací, kde jsou k ovládání často dostupné jen ikony, je vysvětlující *tooltip* naopak vítaná záležitost.

Výchozí `title` trpí pro tuto potřebu zásadním nedostatkem – **neobjevuje se ihned**. Návštěvník tedy najede nechápavě na ikonu, nic se zdánlivě neděje, takže často odjede pryč, aniž by se mu popisek objevil.

Na první pohled by se [CSS tooltip](/tooltip) mohl zdát jako dostatečný. Nicméně v případě pokročilejších funkcí v praxi dřív nebo později narazíme na **limity CSS**.

    CSS tooltip nastavuje elementům, které mají mít popisek, [relativní posici](/position#relative). Máme-li tedy element posicovaný absolutně, budeme muset řešit přebíjení těchto hodnot.

    Potřebujeme-li pro element `overflow: hidden`, je to konečná, protože se tím **ořízne i popisek**.

    JavaScriptem lze zajistit **inteligentní umístění** tam, kde je místo. U CSS řešení se umístění bude muset určovat ručně.

    Budeme-li chtít popiskem pohybovat při **pohybu nad elementem**, CSS na to bude krátké.

    U uživatelského rozhraní fungující ve **více vrstvách** bude v CSS dost obtížné zajistit, aby se vše překrývalo, jak má.

## Hotové řešení

Hotové řešení jednoduchého popisku. Projde všechny `title` na stránce, nahradí je [data-atributy](/vlastni-html-atributy) – to proto, aby původní popisky *neotravovaly*.

Jako potomek elementu `&lt;body>` se vytvoří element pro zobrazování popisku. Ten se nakonec při najetí na značku s popiskem objeví na posici této značky.

Při odjetí myši se s menší časovou prodlevou popisek skryje.

*[data-title] {color: red}
.tooltip {position: fixed; background: #000; color: #fff; padding: .2em .5em; display: none}

  Text s prvním a druhým popiskem.

  A ještě text s třetím a čtvrtým popiskem.

var Tooltip = function() {
    var elements;
    var ttEl;
    var activeTt;
    var timer;
    
    var init = function() {
        elements = document.querySelectorAll("[title]");
        ttEl = document.createElement("div");
        ttEl.className = "tooltip";
        document.body.appendChild(ttEl);

        for (var i = 0; i 

[Samostatná živá ukázka](http://kod.djpw.cz/tbeb)