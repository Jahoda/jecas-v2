---
title: "Zjištění CSS hodnot v JavaScriptu"
headline: "Zjištění výsledného CSS v JavaScriptu"
description: "Jak v JavaScriptu zjistit výslednou hodnotu libovolné CSS vlastnosti určitého elementu."
date: "2014-01-24"
last_modification: "2014-10-03"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení"]
---

V některých případech je potřeba v JS *spočítat* výsledné hodnoty CSS vlastností nějakého elementu. To se může hodit třeba při tvorbě **universálního JS + CSS řešení**, kdy nelze spoléhat na výchozí CSS, ale zase je nemůžeme natvrdo přenastavit.

Zatímco pro nastavování CSS vlastností z JavaScriptu stačí jen z názvů CSS vlastností vhodit spojovník a následující písmeno zvětšit:

```
element.style.cssVlastnost = "její hodnota";
element.style.backgroundColor = "red";
```

Nebo veškeré CSS zapsat do `cssText`u.

```
element.style.cssText = "
  css-vlastnost: 'její hodnota'; 
  background-color: 'red'
";
```

Při **čtení stylu** skriptem je to komplikovanější.

```
&lt;style>
  div {color: red}
&lt;style>
&lt;div>&lt;/div>
&lt;script>
  alert(
    document.getElementsByTagName("div")[0].style.color
  );
&lt;/script>
```

Tento kód nevyhodí v `alert`u hodnotu `red`, jak by se mohlo očekávat. [Ukázka](http://kod.djpw.cz/tlbb).

## Řešení

Co tedy s tím? Existují vlastnosti `getComputedStyle` a do **IE 8** `currentStyle`. Ve starších **IE** je ještě drobná odlišnost v tom, že potřebuje název CSS vlastnosti v *camelCase* a ne *se-spojovníkem*.

Funkce sjednocující prohlížeče může vypadat následovně:

```
function getStyle(oElm){
    return window.getComputedStyle ? getComputedStyle(oElm, "") : oElm.currentStyle;
}
```

### Použití

```
var div = document.getElementsByTagName("div")[0];
var sktuecnyRamecek = getStyle(div).border;
```

[Živá ukázka](http://kod.djpw.cz/gobb)