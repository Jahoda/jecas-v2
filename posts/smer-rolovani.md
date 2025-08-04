---
title: "Detekce směru scrollování"
headline: "Zjištění směru rolování"
description: "Jak JavaScriptem zjistit, jakým směrem uživatel na stránce roluje."
date: "2014-09-23"
last_modification: "2014-09-23"
status: 1
tags: ["JavaScript", "Hotová řešení", "Scrollování"]
---

## Událost `onscroll`

JS událost, která se provede při každém **posunu po stránce**, se jmenuje `onscroll`.

```
window.onscroll = function () {
  // kód se vykoná při rolování
}
```

## Vlastnosti `scrollTop` a `scrollLeft`

Údaje o odrolování jsou ve vlastnostech:

  - `scrollTop` – odrolováno **shora**

  - `scrollLeft` – **zleva**

Pokud nás zajímá rolování vrámci celé stránky, budeme zjišťovat `scrollTop` a `scrollLeft` u elementu `&lt;body>`.

```
var zleva = document.documentElement.scrollLeft + document.body.scrollLeft;
var shora = document.documentElement.scrollTop + document.body.scrollTop;
```

Proč se pro spočítání `scrollX` sčítá `document.body` s `document.documentElement`? Je to kvůli **Chrome**, kde je potřebná hodnota v `document.body.scrollX`, zatímco v ostatních prohlížečích v `document.documentElement.scrollX`.

## Určení směru

Směr rolování určíme na základě změny hodnot `zleva` a `shora` při porovnávání s předchozím rolováním.

  - V případě, že se nerovná minulá a současná **vodorovná** (`scrollLeft`) posice => roluje se do strany.

  - V případě, že se nerovná minulá a současná **svislá** (`scrollTop`) posice => roluje se svisle.

Porovnáním **větší**/**menší** potom zjistíme i směr.

[Živá ukázka](http://kod.djpw.cz/pwfb) (při rolování se vypíše směr)