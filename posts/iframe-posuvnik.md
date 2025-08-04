---
title: "Jak skrýt posuvník v <iframe>"
headline: "Jak skrýt posuvník v <code>&lt;iframe></code>"
description: "Jak pomocí CSS skrýt scrollbar u stránky vložené přes <code>&lt;iframe></code>."
date: "2022-12-20"
last_modification: "2022-12-21"
status: 1
tags: ["Hotová řešení", "Scrollování"]
---

Element [`&lt;iframe>`](/ramy#iframe) se v minulosti používal ke skládání stránek, v dnešní době se zpravidla používá pro **vkládání služeb třetích stran** na vlastní stránky.

Typicky věci jako:

  - chatovací okno,

  - nápověda,

  - platební brána,

  - dotazník,

  - reservační kalendáře

Výhoda rámu je v tomto případě hlavně v tom, že jsou obě stránky od sebe **isolované**.

Nepřepisují si tak styly nebo skripty. Komunikace mezi stránkou A a stránkou B obvykle probíhá jen přes [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

Z isolovanosti stránky načítané v `&lt;iframe>` vyplývá, že scrollbar nejde ovlivňovat. Nebo by alespoň neměl jít, protože jde o část stránky v rámu načítané.

## Zákaz scrollování

Jedna možnost, jak se scrollbaru zbavit, je zabránit rolování HTML atributem `scrolling="no"`.

To může být trochu nepraktické, protože se potom nejde dostat k případnému obsahu, který se nevejde.

## Skrytí scrollbaru

Při zachování možnosti rolovat jde využít CSS triku, kdy se pro `&lt;iframe>` nastaví šířka o šířku posuvníku větší (pomocí [`calc`](/calc)).

To se ořízne přes `overflow: hidden` pro obal rámu.

[Šířka posuvníku](/sirka-posuvniku) bývá zpravidla do **17 px**.

```
.no-scrollbar {
    width: 100%;
    overflow: hidden;
}
.no-scrollbar__iframe {
  width: calc(100% + 17px);
}

```

[Živá ukázka](http://kod.djpw.cz/gkid)