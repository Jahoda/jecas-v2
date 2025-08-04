---
title: "Skrývání a odkrývání s data-atributy"
headline: "Skrývání a odkrývání s data-atributy"
description: "Zobrazování a skrývání obsahu elegantněji s využitím vlastních atributů."
date: "2014-02-06"
last_modification: "2014-05-06"
status: 1
tags: ["JavaScript", "Přepínání vzhledu"]
---

Skrývání a odkrývání obsahu lze vytvořit [pomocí JavaScriptu](/zobrazit-skryt) (a [přepínání tříd](/prepinani-trid)) nebo i [čistě v CSS](/css-rozbalovani) (od **IE 9** pomocí atributu [`:checked`](/css-selektory#checked)).

Další postup může být si přepínatelný obsah označit [vlastními atributy](/vlastni-html-atributy) a nechat JavaScript, ať se o to postará (s využitím [`querySelector`u](/queryselector) – **IE 8** a novější – to jde poměrně jednoduše).

## Použití

  - K **rozklikávacímu tlačítku** napíšu `data-toggle-control="**obsah**"`.

  - K příslušnému obsahu `data-toggle="**obsah**"`.

  - A když má být obsah rovnou otevřený, tak se k tlačítku přidá `data-control-on`.

A je to.

```
&lt;button 
  data-toggle-control="**obsah**"
  data-control-on>
  Tlačítko
&lt;/button>

&lt;div data-toggle="**obsah**">
  Obsah
&lt;/div>

```

  - [Živá ukázka](http://kod.djpw.cz/jzbb)

  - Kód na [GitHubu](https://github.com/Jahoda/js-data-attr-toggle)

Poznámka: skrývání obsahu by se teoreticky správně mělo provádět jen při [zapnutém JS](/vypnuty-js).

## Odkazy jinam

  - [How To Use ngShow and ngHide](http://scotch.io/tutorials/javascript/how-to-use-ngshow-and-nghide)