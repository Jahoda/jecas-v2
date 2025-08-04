---
title: "Zvýraznění podle rolování"
headline: "Označení odkazu na kotvu, pokud je na ní odrolováno"
description: "U jednostránkových webů s <a href=\"/fixni-menu\">fixní navigací</a> (s odkazy na #kotvy) může být vhodné právě viditelnou (aktivní) položku zvýraznit."
date: "2013-05-31"
last_modification: "2013-06-05"
status: 1
tags: ["JavaScript", "Hotová řešení", "Menu v CSS", "Scrollování"]
---

body {position: relative;}
.menu {right: 0; position: absolute;}
menu {position: fixed; list-style: none; padding: 0}
menu a {background: #fff; display: block; padding: .2em 1em}

.menu a.active {color: #fff; text-decoration: none; background: #0D6AB7;}

		- [Ukázka](#ukazka)

		- [Jak na to](#jak)

		- [Hotová JS funkce](#priklad)

		- [Další možnosti](#moznosti)

		## Ukázka

		Při odrolování na nadpis by se měla v menu (vpravo vedle stránky) zvýraznit příslušná položka.

		## Jak na to

          Při **rolování** (`window.onscroll`) se
          zjistí o kolik pixelů je **odscrollováno** (vlastnost `scrollTop`),
          zjistí se posice **souřadnice** hlídaného elementu (`offsetTop`),
          elementu, který podmínky splňuje, se **nastaví třída** `active`.

		## Příklad

		```
function setActive() {
	// Vybereme &lt;div>y z #content, každý symbolisuje jeden oddíl
	var div = document.getElementById("content").getElementsByTagName("div");
	// Vybereme odkazy z prvního elementu menu
	// Odkazů na oddíly by mělo být stejně jako &lt;div>ů
	var a = document.getElementsByTagName("menu")[0].getElementsByTagName("a");
	// Sjednocení napříč prohlížeči -- Pro Webkit je "document.body"
	var top = document.documentElement.scrollTop + document.body.scrollTop;
	var el;
	// Projdeme všechny &lt;div>y
	for (var i = 0; i &lt; div.length; i++) {
		// Všem odkazům se zruší případná třída
		a[i].className = "";
		if (div[i].offsetTop &lt; top) {
			// Uložíme si do proměnné element ke zvýraznění
			el = a[i];
		}
	};
	if (el) {
		// Zvýraznění elementu
		el.className = "active";
	}
}
// Při události onscroll se bude zvýrazňovat
window.onscroll = setActive;
```

		## Další možnosti

      Jak je v této ukázce vidět, funguje to tak, že při najetí na *začátek* (tj. jen co kousíček elementu zmizí pod horní okraj) se elementu **přiřadí třída**.
        To nemusí být ideální, protože u *nízkých* částí a vysokého okna prohlížeče se zvýraznění **nemusí vůbec projevit**.
Východiskem je: 

všem částem (tedy `#content > div`) nastavit nějakou minimální výšku (`min-height`),
element za „narolovaný“ považovat v momentě, kdy už se objeví dole na obrazovce (dopočítat se tohoto stavu lze vlastností `offsetHeight`).

### Změna `#kotvy` v adresním řádku

Spolu se zvýrazněním aktivního odkazu je možné zároveň změnit URL, tedy `location.hash`, podle právě viditelné oblasti.
  Háček ale je, že při takové změně prohlížeč může znovu **poskočit na onu kotvu** a kazit tak plynulé rolování. Vyřešit tento problém by mohlo jít použitím **prefixu** pro všechna `id`. Ta by přepsal JavaScript. V adresním řádku potom bude `#kotva` a JavaScript zajistí, aby se zvýraznil element `#**prefix**-kotva`. Na původní kotvu prohlížeč nezareaguje, protože na stránce (modifikované skriptem) ve skutečnosti nebude (bude tam právě ta prefixovaná).

function setActive() {
	var div = document.getElementById("content").getElementsByTagName("div");
	var a = document.getElementsByTagName("menu")[0].getElementsByTagName("a");
	var top = document.documentElement.scrollTop + document.body.scrollTop;

	var el;
	for (var i = 0; i 

## Rozdíly mezi `documentElement.scrollTop` a `body.scrollTop`

  V [quirku](/doctype#quirk) jsou v **IE** obě hodnoty stejné, v ostatních prohlížečích funguje jen `document.body.scrollTop`.
    Ve standardním režimu ctí **Chrome** `document.body.scrollTop`, ostatní prohlížeče `document.documentElement.scrollTop`.