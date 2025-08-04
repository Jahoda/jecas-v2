---
title: "Zjištění skutečných rozměrů obrázku"
headline: "Skutečné rozměry obrázku"
description: "Jak může JavaScript zjistit skutečnou výšku a šířku obrázku."
date: "2013-08-22"
last_modification: "2013-08-22"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V novějších prohlížečích, než je **Internet Explorer 8**, lze použít `obrazek.**naturalWidth**`, respektive `obrazek.**naturalHeight**`.

```
&lt;img src="logo.png" **width=500 height=100** id=obrazek&gt;
```

    function skutecnyRozmer(obr) {
      alert("Skutečná šířka: " + obr.naturalWidth + " a výška: " + obr.naturalHeight);
    }

Skutečný rozměr

Ve starších prohlížečích lze využít načtení pomocného obrázku pomocí `new Image()` (podobně jako při testování, zda [obrázek existuje](/existence-obrazku)).

```
function zjistitSkutecnyRozmer(obr) {
    var pomocnyObrazek = new Image();
    pomocnyObrazek.src = obr.src;
    return {
      sirka: pomocnyObrazek.width, 
      vyska: pomocnyObrazek.height
    };
  }

```

**Použití:**

```
var obrazek = document.getElementById('obrazek');
var skutecna = zjistitSkutecnyRozmer(obrazek);
alert(
  "Skutečná šířka: " + skutecna.sirka + 
  " a výška: " + skutecna.vyska
);

```

    function zjistitSkutecnyRozmer(obr) {
      var pomocnyObrazek = new Image();
      pomocnyObrazek.src = obr.src;
      return {
        sirka: pomocnyObrazek.width, 
        vyska: pomocnyObrazek.height
      };
    }
    
    function vypisSkutecnyRozmer(obrazek) {
      var skutecna = zjistitSkutecnyRozmer(obrazek);
      alert("Skutečná šířka: " + skutecna.sirka + " a výška: " + skutecna.vyska);
    }

Skutečný rozměr