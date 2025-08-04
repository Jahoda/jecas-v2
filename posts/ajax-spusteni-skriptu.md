---
title: "Spuštění JS načteného AJAXem"
headline: "Vykonání JS načteného AJAXem"
description: "Jak provést JavaScript, který je ve stránce načítané AJAXem."
date: "2015-10-18"
last_modification: "2015-10-21"
status: 1
tags: ["JavaScript", "Hotová řešení", "AJAX"]
---

S využitím [`history.pushState`](/zmena-url) a změnou URL bez znovunačtení stránky není problém celý web načítat [AJAXem](/ajax).

Jeden menší problém ale AJAXem stahovaný obsah má – **vykonání skriptů** ve značce `&lt;script>`.

Stránka obsahující následující skript, který nastaví barvu jejího odstavce na červenou, se po načtení AJAXem nevykoná.

```
&lt;p>Stránka&lt;/p>
&lt;script>
  document.querySelectorAll("p")[0].style.color = "red";
&lt;/script>
```

## Příkaz `eval`

Callback funkce pro nastavení obsahu stránky, která dostane obsah AJAXem získané stránky, může vypadat následovně:

```
function vypsat(data) {
  var obsah = document.getElementById("obsah");
  obsah.innerHTML = data;
  // oživení skriptů
  var scripty = obsah.getElementsByTagName('script');
  for (var i = 0; i &lt; scripty.length; i++) {
    **eval**(scripty[i].innerHTML);			
  }
}
```

Na začátku se nastaví asynchronně získaný obsah do elementu `#obsah`. V něm se následně najdou značky `&lt;script>` a jejich kód se provede pomocí `eval`u.

Odstavec z předchozí ukázky už bude červený.

### Volání funkce

Co ale v případě, že bude mít stahovaná stránka ve značce `&lt;script>` definici funkce, která se má později volat:

```
&lt;p>Stránka&lt;/p>
&lt;script>
  function naCerveno() {
    document.querySelectorAll("p")[0].style.color = "red";
  }
&lt;/script>
&lt;button onclick="naCerveno()">Načerveno&lt;/button>
```

Použití `eval`u proměnnou/funkci `naCerveno` nevytvoří.

## Vytvoření `&lt;script>`u

Další možnost je dynamicky vytvořit nové značky `&lt;script>`, vložit do nich příslušný kód a přidat je do stránky:

```
// Vytvoření značky
var novyScript = document.createElement("script");
// Nastavení obsahu skriptu do innerHTML
novyScript.innerHTML = scripty[i].innerHTML;
// Přidání skriptu do stránky
document.body.appendChild(novyScript);
```

Celý kód:

```
function vypsat(data) {
  var obsah = document.getElementById("obsah");
  obsah.innerHTML = data;
  // oživení skriptů
  var scripty = obsah.getElementsByTagName('script');
  for (var i = 0; i &lt; scripty.length; i++) {
    var novyScript = document.createElement("script");
    novyScript.innerHTML = scripty[i].innerHTML;
    document.body.appendChild(novyScript);
  }
}
```

Při tomto postupu není problém s voláním definované funkce.

## Skript v `&lt;img onload>`

Bez nutnosti procházet na stránce jednotlivé skripty a oživovat je se dá využít umístění skriptu do `on*` atributu, který se sám zavolá.

K tomu jde použít událost `onload` u obrázku. Pokud se jako `src` uvede soubor, který se stejně načítá, nezpůsobí to ani zbytečné stahování dat.

```
&lt;img src="logo.png" **onload**="// JS kód">
```

Použít by šla i událost `onerror`, ale bylo by kvůli ní nutné načíst něco neexistujícího.

Onload jde použít pouze ke spuštění nadeklarované funkce. V něm vytvořené funkce by se musely přiřazovat do `window`, aby byly dostupné:

```
onload="window.naCerveno = function() {…}"
```

## Oddělení JS a HTML

Někteří lidé zastávají myšlenku **striktního oddělení HTML kódu a JavaScriptu**.

JS funkce jsou ve zvláštním souboru a jednotlivým elementům jsou až následně přiřazovány.

```
element.onclick = naCerveno;
```

Skript si tedy nejprve najde potřebný element a nastaví mu, co má dělat při požadované události.

    - [Navázání událostí v JavaScriptu](/pripojeni-udalosti)

Při tomto postupu stačí na AJAXem vypsaný obsah všechny události navázat.