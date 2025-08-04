---
title: "Nejbližší nadřazený element – closest"
headline: "Nejbližší předek elementu  – <code>closest</code>"
description: "JavaScriptovou metodou <code>closest</code> jde získat nejbližší nadřazený element vyhovující selektoru."
date: "2015-03-11"
last_modification: "2015-03-14"
status: 1
tags: ["JavaScript"]
---

Pokud je skriptem vybrán nějaký element, jde se dostat pomocí `parentNode` k jeho nejbližšímu předkovi.

```
&lt;div class="predek">
  &lt;div id="potomek">
  &lt;/div>
&lt;/div>
```

Pro tento HTML kód to v JS vypadá následovně:

```
var potomek = document.getElementById("potomek");
var predek = potomek.**parentNode**;
```

Hodí se to například při [přepínání třídy](/prepinani-trid) společnému obalu tlačítka a obsahu, který se má [zobrazit/skrýt](/zobrazit-skryt). Značný problém tohoto postupu je ale v tom, že je JS kód **hodně závislý na změně HTML** – stačí přidat třeba další obal, a vše přestane fungovat.

Pomocí `closest` jde nadřazený element specifikovat CSS selektorem (selektor se zadává podobně jako u [`querySelector`/`querySelectorAll`](/queryselector)).

## Zápis

Metoda `closest` má jeden povinný parametr, což je CSS selektor.

```
&lt;div class="predek">
  &lt;div>
    &lt;div id="potomek">
    &lt;/div>
  &lt;/div>
&lt;/div>
```

Pro tento HTML kód, kde je mezi potomkem a předkem další `&lt;div>`, jde provést následující:

```
var potomek = document.getElementById("potomek");
var predek = potomek.**closest('.predek')**;
```

Kód vybere nejbližší nadřazený element, co má třídu `predek`.

Zajímavé a trochu zrádné je, že se element může dostat i „sám na sebe“, bude-li vyhovovat zadanému selektoru.

```
potomek.closest('**div**');
```

Tato konstrukce tedy opět vybere potomka (protože se jedná o `&lt;div>`, čímž bude vyhovovat zadanému selektoru).

## Podpora

Metoda `closest` je zatím podporována pouze v následujících prohlížečích:

  - **Firefox 35**,

  - **Chrome 41**,

  - **Opera 18**

Pro nepodporované prohlížeče jde podpora doskriptovat pomocí `parentNode` a `querySelectoru` nebo [`matches`](/matches#js).

    - [Polyfill funkce closest](http://kod.djpw.cz/pmlb)

## `closest()` v jQuery

JS knihovna jQuery disponuje obdobou nativní funkce `closest`.

    - jQuery API: [.closest()](http://api.jquery.com/closest/)

## Odkazy jinam

  - MDN: [Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)