---
title: "Flow"
headline: "Flow"
description: "Vlastnosti <code>flow-from</code> a <code>flow-into</code> umožňují pohodlně přeskupovat obsah mezi elementy."
date: "2013-10-13"
last_modification: "2014-05-30"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

```
.prvni {
  flow-into: identifikator;
}
.druhy {
  flow-from: identifikator;
}
```

Tento kód zajistí, že bez **změny HTML kódu** se obsah z elementu `.prvni` přesune od elementu `.druhy`.

## Podpora

Momentální podpora je špatná. V **Chrome** nějaký čás `flow-*` fungovalo (ve versích 15–18). V novějších by se měla dát zapnout podpora v `about:flags` přes položku *experimentální funkce Web Platform* (`chrome://flags/#enable-experimental-web-platform-features`). Nicméně v **Chrome 35** to k úspěchu nevedlo.

**Internet Explorer** 10 a [11](/ie11) podporují *přetékání* mezi elementy pouze pro značku `&lt;iframe>`.

## Využití

Při dostatečné podpoře by to pomohlo hodně při vytváření [responsivního designu](/responsive). Typický problém, kdy se vícesloupcový layout přeskládává do jedné *nudle*. V takovém případě musí být celé sloupce souvisle pod sebou.

CSS vlastnosti `flow-*` umožní přeskládat obsah klidně na přeskáčku. Tj. kus z prvního sloupce, kus z druhého a podobně.

## Odkazy jinam

  - Webdesigner Depot: [Introducing CSS Regions](http://www.webdesignerdepot.com/2013/09/introducing-css-regions/)

  - Smashing Magazine: [Killer Responsive Layouts With CSS Regions](http://www.smashingmagazine.com/2013/11/05/killer-responsive-layouts-with-css-regions/)