---
title: "CSS šipky (trojúhelníky)"
headline: "Generátor CSS šipek"
description: "Generátor šipek/trojúhelníků přímo v CSS pomocí okrajů. Funkční i ve starých IE."
date: "2014-01-15"
last_modification: "2014-01-18"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Nastavením vyšší šířky **okrajů** a vynulováním **výšky a šířky** můžeme docílit vykreslení trojúhelníku přímo v CSS (více o [kreslení pomocí CSS](/css-kresleni)).

Jelikož zápis není na první pohled úplně intuitivní, hodí se pro vytváření potřebných šipek použít generátor výsledného CSS.

  .nahled {border: 1px solid #fff; display: inline-block; margin: .1em}

function vykreslit() {
  var border = document.getElementById("borderWidth").value;
  var borderSide = document.getElementById("borderSideWidth").value;
  var color = document.getElementById("color").value;
  var css = ".sipka {border: " + border + " solid transparent; width: " + document.getElementById("width").value + "; height: " + document.getElementById("height").value + "; display: inline-block; position: relative}\n";
  var posun = (parseInt(border)/2) + "px";
  css += ".sipka.dolu {border-top: " + borderSide + " solid " + color + "; top: " + posun + "}\n";
  css += ".sipka.vlevo {border-right: " + borderSide + " solid " + color + "; left: -" + posun + "}\n";
  css += ".sipka.vpravo {border-left: " + borderSide + " solid " + color + "; left: " + posun + "}\n";  
  css += ".sipka.nahoru {border-bottom: " + borderSide + " solid " + color + "; top: -" + posun + "}\n";    
  document.getElementById("vystup").innerHTML = css;
  document.getElementById("sipky").innerHTML = css;
}

Šířka okraje: 

Šířka barevného okraje: 

Šířka (`width`): 

Výška (`height`): 

Barva: 

  Přegenerovat

```

```

  vykreslit();
  var inputs = document.getElementById("generator").getElementsByTagName("input");
  for (var i = 0; i 

[Samostatný generátor](http://kod.djpw.cz/pfbb).