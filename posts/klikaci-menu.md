---
title: "Menu reagujicí na kliknutí"
headline: "Rozklikávací menu"
description: "JavaScriptové menu otvírající/zavírající se po kliknutí."
date: "2013-06-25"
last_modification: "2013-06-26"
status: 1
tags: ["JavaScript", "Hotová řešení", "Menu v CSS"]
---

/* reset místních stylů */ 
.popup a {border: 0}

.popup ul {height: 2em}
.popup ul ul {height: auto}
.popup {background: #0D6AB7; border: 2px solid #0D6AB7}
.popup li {margin-left: 1em; float: left}
.popup li li {display: block; float: none; margin: 0}
.popup a {float: left; width: 200px; text-decoration: none; text-align: center; background: #1081DD; color: #fff; line-height: 2em}
.popup ul ul a {width: 100%; display: inline-block}
.popup li a:hover {background: #efefef; color: #000}
/* submenu */
.popup ul ul {display: none; position: absolute; top: 100%; left: -1px; background: #fff; border: 1px solid #0D6AB7; border-top: 0; width: 200px}
.popup li {position: relative; }
.popup ul {padding: 0; margin: 0; list-style: none}
/* rozbalení */
.popup .show a {background: #fff; color: #000}
.popup .show li, li.show {background: #fff; color: #000}
.popup .show ul {display: block}

document.documentElement.onclick = closeAll;

function showHide(e, el) {
	var el = el.parentNode;

	if (el.className != "show") {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	}
	closeAll();
	el.className = el.className == '' ? 'show' : '';
}

function closeAll() {
	var items = document.getElementById("menu").getElementsByTagName("li");
	for (var i = items.length - 1; i >= 0; i--) {
		items[i].className = "";
	};
}

  [Rozbalit](#)
		
          - [Odkaz](#prvni)

          - [Odkaz](#)

          - [Odkaz](#)

          - [Odkaz](#)

  [Rozbalit](#)
		
          - [Odkaz](#)

          - [Odkaz](#)

          - [Odkaz](#)

          - [Odkaz](#)

## Požadavky

  - Rozbalení/sbalení při kliknutí na položku,

  - sbalení při kliknutí někam mimo.

## Postup řešení

Základ je jednoduché [prohazování třídy](/zobrazit-skryt). S tím, že rozbalovaná část je absolutně posicovaná.

Celé to komplikuje až *vypínání* menu při kliknutí mimo.

  Vytvoří se funkce pro schování libovolné položky z `#menu` (odstraní případnou třídu, která submenu zviditelňuje),
  ```
function closeAll() {
	var items = document.getElementById("**menu**").getElementsByTagName("li");
	for (var i = items.length - 1; i >= 0; i--) {
		items[i].className = "";
	};
}
```

  ta se zavolá při kliknutí někam do stránky.
  ```
document.documentElement.onclick = closeAll;
```

### „Probublávání“

Bohužel při kliknutí na položku, která rozkrývá podseznam, událost probublá i na `documentElement`, takže se submenu vzápětí ihned skryje.

Řešení je *vypnutí* této vlastnosti. Ve starších Explorerech funguje jen:

```
event.cancelBubble = true;
```

Ve všech novějších prohlížečích potom:

```
event.stopPropagation();
```

Aby to nebylo tak jednoduché, Firefox (Gecko) potřebuje na rozdíl od ostatních prohlížečů `event` předat do funkce.

```
&lt;a onclick="funkce(**event**)" href="#">Rozbalit&lt;/a>
```

Kód sjednocující chování napříč prohlížeči proto značně nabobtná.

```
function nazevFunkce(e) {
	e.cancelBubble = true; // vypnutí pro starší Explorery
	if (e.stopPropagation) e.stopPropagation(); // vypnutí pro ostatní
    // vlastní kód funkce
}
```

Výhoda potom je, že máme kód funkční ve všech prohlížečích (minimálně od IE 6).