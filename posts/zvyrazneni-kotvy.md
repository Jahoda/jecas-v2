---
title: "Zvýraznění aktivní kotvy"
headline: "Zvýraznění aktivované kotvy (<code>:target</code>)"
description: "Pokud se v rámci stránky používají odkazy na jednotlivé <code>#části</code>, může být vhodné zvýrazněním ukázat, kam odkaz mířil."
date: "2013-05-12"
last_modification: "2013-05-12"
status: 1
tags: ["CSS", "CSS selektory", "Hotová řešení", "Scrollování"]
---

.content menu a {color: #fff}

## Selektor `:target`

Od Internet Exploreru 9 (včetně) lze použít jednoduché řešení **bez JavaScriptu v prostém CSS**:

```
:target {background: #FFCFA4;}
```

Po kliknutí se v podporovaných zařízeních celý tento blok zvýrazní. (Zrušit.)

### Využití

Kromě zvýraznění aktivní kotvy lze `:target` použít k vytvoření „záložek“ přepínatelných bez načítání dalších stránek.

menu {margin: 0; padding: 0}
menu li {display: inline}
menu a {display: inline-block; background: #0D6AB7; padding: 10px; color: #fff; text-decoration: none; font-weight: bold; font-variant: small-caps;}
.tab {background: #efefef; border: 1px solid #ccc; padding: .3em; display: none;}
.tabs .default {display: block;}
.tab:target {display: block;}

    HTML
    CSS
    JS
    PHP

		HTML je značkovací jazyk.

		CSS není značkovací jazyk.

		JavaScript je klientský skriptovací jazyk.

		PHP je serverový skriptovací jazyk.

Podobného efektu lze dosáhnout i bez použití `:target`u. Stačí jednotlivým záložkám (elementy `.tab`) nastavit pevnou výšku. Jejich rodiči (element `.tabs`) `overflow: hidden` + tutéž pevnou výšku a zbytek už zařídí odkazy na kotvy.

.obal {height: 50px; overflow: hidden}
.obal div {height: 50px; color: #fff}
#i {background: red}
#ii {background: blue}
#iii {background: green}  

    První
    Druhý
    Třetí

Odkaz na [druhý](#ii), [třetí](#iii) a [první](#i).

## Zvýraznění kotvy pomocí JS

Pro starší prohlížeče nezbývá než na `:target` zapomenout a do CSS přidat zvláštní `.target` třídu. ```
:target, **.target** {/* styly pro zvýraznění */}
```

A tu potom přidávat JavaScriptem v závislosti na hodnotě kotvy, která se nachází v `location.hash`.

Stačí-li zvýraznění jen po načtení stránky, kód je velmi prostý.

```
var hash = location.hash.substr(1); // první znak je #
var element = document.getElementById(hash);
if (element) {
	element.className+= " target";
}
```

Má-li JavaScript reagovat na průběžnou změnu `hash`e lze používat od IE 8 včetně `window.onhashchange` a pro starší časovač. Nebo mít používané `hash`e u elementů s přesnou výškou v nějakém neviditelném objektu a tam odchytávat `onscroll`.
Testovat dostupnost `onhashchange` lze pomocí.

```
if ("onhashchange" in window) {
	// onhashchange funguje
}
```