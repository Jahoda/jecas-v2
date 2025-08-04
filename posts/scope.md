---
title: "Scope v JavaScriptu"
headline: "Scope v JavaScriptu"
description: "Co to je a k čemu slouží „scope“ při programování v JavaScriptu."
date: "2013-12-29"
last_modification: "2014-02-18"
status: 1
tags: ["JavaScript"]
---

Česky by se *scope* dalo přeložit asi jako „rámec působnosti“. V JavaScriptu to zjednodušeně znamená **odkud jsou jaké proměnné viditelné**.

První tzv. *globální scope* (`object Window`) je automaticky v každém JS kódu. Vytvářením **funkcí** si můžeme snadno vytvořit další v tomto globálním.

```
var promenna = "Ahoj"; // Proměnná v globálním scope
var funkce = function() {
  var druhaPromenna = "Nazdar"; // Proměnná v lokálním scope funkce
}
```

Celé to funguje tak, že:

  - Z globálního scope se nedostaneme k proměnné `druhaPromenna`.

  - Z lokálního scope se ale k proměnné `promenna` *nadřazeného* globálního scope **dostaneme**.

  - Uvnitř funkce `funkce` můžeme číst nebo měnit hodnotu `promenna`.

  - Ale mimo naší funkci bude proměnná `druhaPromenna` nedostupná.

Zároveň nehrozí, že se proměnná uvnitř funkce **omylem přepíše stejně nazvanou proměnnou** z nadřazeného bloku (*scope*). To je asi hlavní výhoda a smysl.

Jednotlivá scope se do sebe mohou prakticky **libovolně zanořovat** — tj. vytvořit další funkci uvnitř další funkce atd. Pořád platí výše uvedená jednoduchá pravidla.

## Nejjednodušší scope

V některých kódech **hotových knihoven** (nebo u **uživatelských JS** pro prohlížeče) můžeme pozorovat, že jsou obaleny nějak takto:

```
(function() {
  // vlastní kód
})();

```

To právě vytvoří **nepojmenovanou funkci**, která se rovnou zavolá, ale všechen kód se bude odehrávat ve **vlastním privátním scope**. Proto se na [ukázce](http://kod.djpw.cz/ptbb) proměnná v globálním *rámci* nepřenastaví na jinou hodnotu.

## Klíčové slovo `this`

Klíčové slovo `this` se hodí jako *zkratka* k nadřazenému objektu:

```
var objekt = {};
objekt.funkce = function() {
  // v **this** bude *objekt*
}
objekt.dalsiFunkce = function() {
  // zavolat předchozí funkci můžeme jako:
  // 1) objekt.funkce();
  // 2) **this**.funkce();
}

```

Často se to používá při nastavování (`onNěco`) událostí:

```
document.getElementById("tlacitko").onclick = function() {
  // nějaká akce
  // element, na který bylo kliknuto je v this
}
```

[Ukázka](http://kod.djpw.cz/qtbb).

Pozor, pokud v této funkci vytvoříme funkci další (zanoříme další scope), v `this` bude už něco jiného.

```
document.getElementById("tlacitko").onclick = function() {
  // v **this** je tlačítko
  var funkce = function() {
    // v **this** je globální scope (object Window)
  }
}
```

Řešení je si `this` uložit do lokální proměnné.

```
document.getElementById("tlacitko").onclick = function() {
  var tlacitko = this;
  var funkce = function() {
    // v proměnné **tlacitko** je tlačítko
  }
}
```

## Číslo indexu v cyklu

Často potřebujeme nějaké sadě elementů přiřadit v [cyklu](/js-cykly) akci a zároveň v té akci pracovat s **indexem**.

```
var odkazy = document.getElementsByTagName("a");
for (var i = 0; i &lt; odkazy.length; i++) {
  odkazy[i].onclick = function() {
    alert(i);
  }
}
```

Uvedený kód možná trochu překvapivě u všech odkazů vypíše stejné číslo – **index po posledním průchodu cyklem**. [Živá ukázka](http://kod.djpw.cz/hegb)

Řešení je vytvořit další *scope*.

```
for (var i = 0; i &lt; odkazy.length; i++) {
  odkazy[i].onclick = (function(cisloIndexu) {
    return function() {alert(cisloIndexu)};
  })(i)
}
```

[Živá ukázka](http://kod.djpw.cz/jegb)