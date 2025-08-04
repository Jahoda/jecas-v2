---
title: "Odkaz na kotvu a fixní menu"
headline: "Odkaz na kotvu a fixní hlavička"
description: "Při použití fixního menu/hlavičky se stane nepěkná věc, že při odkazu na kotvu je cíl skryt pod menu. Co s tím?"
date: "2014-01-06"
last_modification: "2014-01-10"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Scrollování", "Fixní posice"]
---

Problém je v tom, že prohlížeč odroluje **přesně na kotvu** a její cíl (třeba nadpis) je tím pádem skryt pod fixním prvkem. [Živá ukázka](http://kod.djpw.cz/syab) problému.

## Řešení

      Přidat nadpisu, který má kotvu, vrchní `padding` ve výšce **fixního prvku** a elementu před stejný rozměr odečíst záporným `margin-bottom` ([ukázka](http://kod.djpw.cz/tyab)).

      Do nadpisu umístit **další element**, který bude mít ID místo nadpisu. Tento element se [relativně posune](/position#relative) o výšku fixní navigace nahoru ([ukázka](http://kod.djpw.cz/uyab)).

      Pravděpodobně není možné použít [`::before`.](/css-selektory#before-after)

  - Posun **zajistit JavaScriptem**.

## JavaScriptové odsunutí

Vyřešit překrývání fixní navigací může být rozumné i JavaScriptem — první ani druhé CSS řešení není úplně ideální:

  - Pravděpodobně bude nutné mít specifický HTML kód (generovat kotvy jako prázdné `&lt;span>`y v druhém případě a mít čemu dát záporný `margin-bottom` v případě prvním).

  - Spoléhá se na **konkrétní výšku**, což většinou nevěstí nic odbrého. Stačí když se menu roztáhne na dva řádky a přestane to fungovat.

Co tedy udělá JS? Po kliknutí na odkaz spočítá výšku fixního menu (`offsetHeight`) a o tuto výšku [odroluje](/odrolovani).

[Živá ukázka](http://kod.djpw.cz/aibb)

```
function kotva(kotva) {
  location.hash = kotva.hash;
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  top = top - document.getElementById("menu").offsetHeight;
  document.body.scrollTop = document.documentElement.scrollTop = top;  
  return false;
}
```