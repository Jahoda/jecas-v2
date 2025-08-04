---
title: "Přístup k prvkům formuláře v JS"
headline: "Přístup k prvkům formuláře v JS"
description: "Jakými způsoby je možné získávat hodnoty prvků formuláře v JavaScriptu."
date: "2014-03-23"
last_modification: "2014-03-24"
status: 1
tags: ["JavaScript", "Formuláře"]
---

V případě, že chceme nějakým způsobem pracovat s políčky formuláře (kontrolovat jejich hodnotu, zjišťovat [počet znaků](/pocet-znaku) nebo třeba odeslat obsah [`&lt;input>`ů](/input) na server [AJAXem](/ajax)), je hned několik různých možností, jak k políčkům nebo formuláři přistupovat.

      Přidat políčkům/formuláři [`id`](/id-class) a hledat je metodou `getElementById`:

    ```
var policko = document.getElementById('**id-policka**')
```

    Od **IE 8** případně využitím [`querySelector`u](/queryselector).
  
  - Používat názvy formuláře a názvy položek (atributy `name`).

## Název formuláře a názvy polí

```
&lt;form action=".?" **name**="*jmenoFormulare*">
    &lt;input type="text" **name**="*jmenoPolicka*">
    &lt;button **name**="*jmenoTlacitka*">Tlačítko&lt;/button>
&lt;/form>
```

Pro tento formulář platí, že:

    K **formuláři** se dostaneme prostým uvedením jeho jména.

    ```
**jmenoFormulare**.style.background = "red";
```

    Tento kód tedy pozadí formuláře změní na červenou.

    K **prvkům formuláře**, ať se jedná o vstupní políčka nebo odesílací tlačítka, se dostaneme následovně:

    ```
var policko = jmenoFormulare.**jmenoPolicka**;
var tlacitko = jmenoFormulare.**jmenoTlacitka**;
```

[Samostatná ukázka](http://kod.djpw.cz/omcb) nastavení barev formuláři při přístupu přes hodnoty atributů `name`.

### Alternativní způsob

Kromě psaní přímo názvů formuláře a jeho prvků existuje přístup přes `document.forms`:

```
var formular = document.forms["**jmenoFormulare**"];
```

Pro prvky formuláře bude tento styl zápisu vypadat následovně:

```
var policko = document.forms["*jmenoFormulare*"]["**jmenoPolicka**"];
var tlacitko = document.forms["*jmenoFormulare*"]["**jmenoTlacitka**"];
```

Kromě názvů se ještě dá využít **číselných indexů**:

```
var prvniFormular = document.forms["**0**"];
var prvniPolickoPrvnihoFormulare = document.forms["**0**"]["**0**"];
```

Číselné indexy se hodí hlavně při [procházení elementů cyklem](/js-cykly).

## Procházení formulářů a jejich prvků cyklem

### Projití všemi formuláři

```
var formulare = document.forms;
for (var i = 0; i &lt; formulare.length; i++) {
  // formulare[i];
}
```

### Projití všemi prvky formuláře

```
var prvkyFormulare = document.forms["formular"];
for (var i = 0; i &lt; prvkyFormulare.length; i++) {
  // prvkyFormulare[i];
}
```

## Získání hodnoty

Většinou nás z formulářových políček zajímá hlavně **hodnota**, tj. vlastnost `value`. Lehce se na to zapomene.

```
var hodnota = jmenoFormulare.jmenoPrvku.**value**;
```

### Číslo

V případě, že je potřeba s hodnotou políčka pracovat jako s číslem, je na místě obsah `value` převést. Existují různé způsoby:

  Přenásobit jedničkou:
  ```
var ciselnaHodnota = policko.value * 1;
```

  Použít funkci `Number` nebo `parseInt`/`parseDouble` (v závislosti, zda je možné zadat celé/desetinné číslo):
  ```
var ciselnaHodnota = Number(policko.value);
var ciselnaHodnota = parseInt(policko.value);
```

## Odeslání formuláře

Při odeslání formuláře se zavolá událost `onsubmit`. Toho lze využít v případě, že je potřeba odesílání řídit JavaScriptem. Například **zkontrolovat položky** a v případě neúspěchu vypsat chybovou hlášku a odeslání zablokovat pomocí `return false`.

Pro zpracovávání formuláře skriptem je elegantní přidat do `onsubmit`u zavolání vlastní funkce a předat jí formulář jako argument.

```
&lt;form action=".?" **onsubmit**="return *kontrola*(this)">
  &lt;input type="text" name="*jmenoPolicka*">
```

Funkce pro kontrolu. K jednotlivým prvkům se pohodlně dostaneme.

```
function *kontrola*(formular) {
  alert(formular.*jmenoPolicka*.value);
  return false;
}
```

[Živá ukázka](http://kod.djpw.cz/ancb).

### Událost `onclick`

Častá *chyba* je odesílání vázat **jen** na [JS události myši](/udalosti-mysi) jako `onclick`, protože tyto události nezachytí například odeslání klávesou Enter.