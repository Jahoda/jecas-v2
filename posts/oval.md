---
title: "Jak vytvořit ovál/elipsu v CSS"
headline: "Elipsa/ovál v CSS"
description: "Jak pomocí CSS nakresli ovál."
date: "2015-04-19"
last_modification: "2015-07-11"
status: 1
tags: ["CSS", "Hotová řešení"]
---

V některých případech se hodí [kreslit pomocí CSS](/css-kresleni) – může to být rychlejší než příprava obrázku v grafickém editoru.

Kruh jde vytvořit pomocí [zakulacení rohů](/border-radius) (CSS vlastnost `border-radius`).

    .kruh {
      border-radius: 100px;
      width: 100px;
      height: 100px;
      background: #0D6AB7;
    }

Udělat z kruhu **ovál** jde potom změnou proporcí elementu (poměr výšky a šířky).

Změnit šířku: 

    .oval {
      border-radius: 100px;
      width: 200px;
      height: 100px;
      background: #0D6AB7;
    }

Pro vytvoření **elipsy** poslouží možnost uvést druhý radius za lomítko.

```
border-radius: 100px / 50px;
height: 100px;
width: 200px;

```

  Změnit výšku: 

  Změnit šířku: 

  Změnit první radius: 

  Změnit druhý radius: 

    .elipsa {
      border-radius: 100px / 50px;
      width: 200px;
      height: 100px;
      background: #0D6AB7;
    }

  function pomer(sirka, el) {
    el.style.width = parseInt(sirka) + "px";
  }
  
  function zmenit(f) {
    var elipsa = document.querySelector('.elipsa');
    var sirkaVypis = f.sirka.value + "px";
    var vyskaVypis = f.vyska.value + "px";
    elipsa.style.width = sirkaVypis;
    elipsa.style.height = vyskaVypis;
    var radius = f.radius1.value + "px / " + f.radius2.value + "px";
    elipsa.style.borderRadius = radius;
    document.getElementById("vypis").innerHTML = radius;
    document.getElementById("vypisSirky").innerHTML = sirkaVypis;
    document.getElementById("vypisVysky").innerHTML = vyskaVypis;
  }