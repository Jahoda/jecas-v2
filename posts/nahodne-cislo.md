---
title: "Generátor náhodných čísel"
headline: "Zobrazení náhodného čísla"
description: "Jak vygenerovat náhodné číslo z určitého rozsahu v JavaScriptu a PHP."
date: "2015-02-15"
last_modification: "2015-02-21"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

.nahodne button {
      min-width: 4em;
      padding: .5em;
      font-size: 150%;
      margin: auto;
      display: block;
    }

      Náhodné číslo 1 až 10

      Ano, nebo ne?

## Generátor kódu pro náhodná čísla

Následující generátor po zadání nejnižšího a nejvyššího čísla připraví JS/PHP kód, který slouží k vygenerování náhodného čísla z daného rozsahu.

  Od:  (včetně)

  Do:  (včetně)

  Počet možných čísel: 

  Vygenerovat  
  
  **JavaScript**:

  ```
var nahodne = Math.floor((Math.random() * 10) + 1);
```

  **PHP**:

  ```
mt_rand(1, 10);
```

## Náhodné číslo v JavaScriptu

V JS se pro generování náhodného čísla používá `Math.random()`.

```
var nahodne = Math.random();
```

V proměnné `nahodne` bude něco mezi 0 a 1, například `0.6577748781199532`. Vyjít může i přesná nula, ale vždy bude číslo menší než 1.

Protože je zpravidla nutné mít čísla celá, násobí se to celé počtem požadovaných čísel. Tj. pro vygenerování deseti čísel:

```
nahodne = nahodne * 10;
```

Obsah `nahodne` teď bude něco jako `6.577748781199532`. Pro dosažení celých čísel se potom provede **zaokrouhlení**.

```
nahodne = Math.floor(nahodne);
```

A výsledkem je `6`. Metoda `Math.floor` zaokrouhluje dolů, takže výsledek bude nabývat hodnot 0 až 9. Použití jiného způsobu zaokrouhlení (`Math.round`/`Math.ceil`) by vedlo k nerovnoměrnému rozdělení jednotlivých čísel.

Následný obrázek srovnává četnosti jednotlivých čísel při různých způsobech zaokrouhlení.

[Skript pro výpočet četnosti](http://kod.djpw.cz/etkb)

Je-li cílem dostat místo 0–9 číslo z rozsahu 1 až 10, stačí přičíst jedničku.

```
nahodne = nahodne + 1;
```

## Náhodné číslo PHP

V PHP existuje funkce `mt_rand`, které se přímo zadává rozsah čísel, ze kterých se má výsledek vygenerovat.

Obě čísla parametrů znamenají **včetně**, takže následující kód vygeneruje čísla 1–10.

```
mt_rand(1, 10);
```

## Stále stejné náhodné číslo

Zvlášť při malém počtu čísel a malém počtu opakování se může stát, že bude nějaké číslo padat podezřele často.

  Četnost náhodných čísel z rozsahu 0–9 při pouhých deseti opakováních

Pokud prvek náhody nemusí být matematicky **přesný**, ale jde hlavně o dojem uživatele, dá se tomu trochu pomoci. Například zabránit vygenerování téhož čísla dvakrát po sobě.

[Ukázka](http://kod.djpw.cz/otkb) – nikdy se nevygeneruje stejné číslo dvakrát za sebou

Pokud je navíc cílem **zobrazit všechny náhodné** položky, hodí se ještě požadovat, aby se nějaké číslo mohlo vygenerovat podruhé až v okamžiku, kdy každé číslo z rozsahu už alespoň jednou padlo.

[Živá ukázka](http://kod.djpw.cz/stkb)

V případě **PHP** je nutné vygenerovaná náhodná čísla někam ukládat – například do pole `$_SESSION`.

## Využití

Na základě vygenerování náhodného čísla se dá potom i [vypisovat náhodný obsah](/random).

  var priklad = document.getElementById("priklad");
  var kolik = document.getElementById("kolik");
  var od = document.getElementById("od");
  var odPhp = document.getElementById("od-php");
  var doPhp = document.getElementById("do-php");
  function prepocitat(form) {
    form.kolik.value = form.do.value - form.od.value + 1;
    // JS
    kolik.innerHTML = form.kolik.value;
    od.innerHTML = form.od.value;
    
    // PHP
    odPhp.innerHTML = form.od.value;
    doPhp.innerHTML = form.do.value;
    
    priklad.innerHTML = Math.floor((Math.random() * parseFloat(form.kolik.value)) + parseFloat(form.od.value));
  }

  #priklad {
    margin-left: 1em;
  }