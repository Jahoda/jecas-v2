---
title: "Výška podle šířky v CSS"
headline: "Výška závislá na šířce"
description: "Jak v CSS nastavit výšku v závislosti na procentuální i pevné šířce."
date: "2014-09-10"
last_modification: "2014-09-10"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

Při tvorbě webu, který má být [responsivní](/mobilni-web), se můžeme dostat do situace, kdy je šířka neznámá (zadána **v procentech**) a výšku potřebujeme takovou, aby se v určitém poměru odvozovala od výšky.

**Poznámka**: Nastavování výšky (`height`) často značí špatný postup. V případě, že v elementu s *natvrdo* nastavenou výškou bude nějaký text, je prakticky nemožné zajistit, aby se při **různých velikostech písma** řádně vešel.

## Řešení

Celý trik spočívá v tom, že procentuální hodnota vlastnosti `padding` se **počítá z šířky rodiče**. Stačí tedy:

  - výšku vynulovat (`height: 0`),

  - spodní `padding` nastavit na požadovaný procentuální podíl na šířce,

  - použít obsahový [box model](/box-model) (`box-sizing: content-box` – výchozí), který sčítá okraje a právě `padding` připočítává do výsledných rozměrů (výška je ale nulová, takže ji celou zajistí právě `padding`).

```
.box {
  height: 0;
  padding-bottom: 25%;
}
```

Níže uvedený `&lt;div>` má vždy čtvrtinovou výšku (25 %) oproti šířce, přesvědčte se změnou šířky jeho rodiče.

  function upravitSirku(el) {
    document.querySelector(".podle-vysky").parentNode.style.width = el.value + "%";
  }

0 %  100 %

    .podle-vysky {
      height: 0;
      padding-bottom: 25%;
      background: #0D6AB7;
    }

## Pevná šířka v pixelech

Je-li potřeba, aby byla výška závislá na šířce, ale ta má být **zadaná v pixelech**, není to problém. Obal elementu, co má mít výšku podle šířky, zkrátka bude mít rozměry v `px`. [Ukázka](http://kod.djpw.cz/aofb).

## Proč spodní `padding?`

**Natáhnout výšku** je možné i horním `padding`em nebo kombinací (`padding-top` + `padding-bottom`). V případě samostatného `padding-top` to však má nevýhodu, že do elementu nepůjde rozumně **vkládat obsah**, protože celý začátek obsahu zabere právě `padding`.

Teoreticky to jde řešit odečtením [`margin`u](/margin) ([ukázka](http://kod.djpw.cz/cofb)) nebo [absolutně posicovaným](/position: absolute) dalším elementem uvnitř ([ukázka](http://kod.djpw.cz/dofb)).

Použít kombinaci může mít smysl právě pro **cílené odsazení** obsahu shora bez dalšího vnořeného `&lt;div>`u ([ukázka](http://kod.djpw.cz/bofb)).

## Přetečení

V případě, že by se obsah náhodou nevešel do vymezeného prostoru, nabízí se:

  - **oříznutí** (`overflow: hidden` – [ukázka](http://kod.djpw.cz/fofb)),

  - **zobrazení rolovací lišty** (`overflow: auto` – [ukázka](http://kod.djpw.cz/gofb)), k tomu se ale hodí spíš ono *absolutní posicování*, jinak by se spodní `padding` započítal do výšky a vytvořil by ve **Webkitu** nežádoucí prostor na konci obsahu ([ukázka](http://kod.djpw.cz/eofb)).

## Řešení v JavaScriptu

Ve stanoveném podílu lze výšku nastavovat i **JavaScriptem**. Jako výška se v takovém případě použije vydělená vlastnost `clientWidth`.

```
el.style.height = (el.clientWidth / 4) + "px";
```

[Ukázka obou postupů](http://kod.djpw.cz/hofb)