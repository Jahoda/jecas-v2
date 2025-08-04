---
title: "Lazy loading obrázků"
headline: "Lazy loading obrázků"
description: "Načtení obrázků, až když je na ně odrolováno. Různé postupy řešení."
date: "2013-11-27"
last_modification: "2017-02-07"
status: 1
tags: ["Lazy loading", "JavaScript", "Hotová řešení", "Obrázky", "Zrychlování webu"]
---

V případě, že je na stránce **hodně obrázků**, které nejsou ihned po příchodu na stránku vidět, jsou tzv. *pod ohybem*, může být rozumné je načítat až v momentě, kdy na ně návštěvník **odroluje**.

Sníží se tak **objem přenesených dat** i počet **HTTP spojení**.

## Postup

Jak zmíněné načítání při odrolování vytvořit v JavaScriptu:

  - Obrázky mimo **viditelnou oblast** stránky se po načtení skryjí.

  - Při rolování (`window.onscroll`) se zkontroluje, které obrázky mají být vidět, a zobrazí se (donačtou se).

## Skrytí obrázku

První zádrhel je v tom, že skrytí přes `display: none` nestačí, tj. něco jako:

```
&lt;img src='obrazek.png' style='display: none'>
```

Sice obrázek skryje, ale fysickému **stažení obrázku** nezabrání. Naštěstí ale existují [další postupy](http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=153269), jak **načtení opravdu zabránit**:

  Obrázku dát **prázdný/nesmyslný atribut `src`** a ten skutečný až v momentě, kdy se na obrázek odscrolluje. Původní `src` může být v nějakém [vlastním atributu](/vlastni-html-znacky), ze kterého se hodnota skriptem přesune.

  Vložit obrázek jako **CSS pozadí**.

    ```
&lt;div class='obal-obrazku' style="display: none">
  &lt;div style="width: 100px; height: 100px; background: url(obrazek.png)">
  &lt;/div
&lt;div
```

    Tady už `display: none` zafunguje a obrázek se automaticky nenačte.

    Důležité ale je `display: none` přidat rodiči `&lt;div>`u s `background` obrázkem. Jinak se i tak v **některých prohlížečích obrázek stáhne** (test s [rodičem](http://kod.djpw.cz/jxab) / [elementem s pozadím](http://kod.djpw.cz/hxab)).

    Použít značku `&lt;noscript>`. Její obsah se při **zapnutém JS** nevyhodnocuje. Nevýhoda je, že v **IE 7** se z ní nedá přečíst `innerHTML`. I tak ale jde přečíst hodnotu `&lt;noscript>` atributu, což pro uložení adresy obrázku k **pozdějšímu načtení** může stačit ([ukázka](http://kod.djpw.cz/gqt)).

    [Hotové řešení](https://github.com/luis-almeida/unveil) založené na jQuery, které využívá tuto techniku.

  - Vypsat kolem obrázku JavaScriptem [značku `&lt;script>` s neznámým *MIME typem*](/responsivni-komentare#script). Prohlížeč takový kód nevyhodnotí, ale jeho obsah půjde spolehlivě vydolovat z `innerHTML` ([ukázka](http://kod.djpw.cz/iqt)).

  Použít [značku `&lt;template>`](/template). Ta zatím ale nefuguje v žádném **IE**, jen v **Chrome** a **Firefoxu**.

Konkrétní **volba řešení** by měla záviset na požadavcích, zejména s ohledem na **vyhledávače**:

  - První a druhá možnost obrázky pro roboty v podstatě **zneviditelní**. Proto je vhodná jen v případě, že to nevadí / vyhledávač se může k obrázku dostat někde jinde.

  - U značky `&lt;template>` není jasné, jak se k ní budou v budoucnu roboti chovat. Zatím je ale **Googlem indexována**.

  - Vypsání `&lt;script>`u z neznámým MIME typem je značně **nestandardní**.

## Hotové řešení

### HTML

```
&lt;div class="img">
  &lt;script>document.write("&lt;script type='text/lazy-loading'>")&lt;/script>
    &lt;img src="obrazek.png" width="100" height="100">
  &lt;script>document.write("&lt;\/script>")&lt;/script>
&lt;/div>
```

### JS

```
var lazyImages = [];
function inViewPort(img) {
	var coords = img.getBoundingClientRect();
	return (coords.top >= 0 &amp;&amp; coords.left >= 0 &amp;&amp; coords.top) &lt;= (window.innerHeight || document.documentElement.clientHeight);
}
window.onload = function () {
	var imgArea = document; // kde se obrázky hledají
	var images = imgArea.getElementsByTagName("div");
	for (var i = images.length - 1; i > 10; i--) {
		if (images[i].className != "img") continue;        
		lazyImages.push(images[i]);		
	}
}
window.onscroll = function() {
	for (var i = lazyImages.length - 1; i >= 0; i--) {
		if (inViewPort(lazyImages[i])) {
			var hiddenCode = lazyImages[i].getElementsByTagName("script")[1];
			if (hiddenCode) {
				lazyImages[i].innerHTML = hiddenCode.innerHTML;
			}
			lazyImages.splice(i, 1);
		}
	}
}
```

## Alternativní řešení

Problém výše uvedeného postupu může být v tom, že při jakémkoliv rolování se budou vždy procházet všechny obrázky a bude se **kontrolovat jejich posice** a zda jsou vidět (funkce `inViewPort`).

Pokud by to stránku zpomalovalo, nabízí se si při načtení a změně rozměrů stránky ukládat posici obrázků.

Ještě mě napadl jeden postup. K obrázkům vytvořeným jako **CSS pozadí** uložit jejich přibližnou posici do CSS třídy (zaokrouhlenou třeba na stovky — například `top-2000` pro *obrázky*, co jsou přibližně 2000 pixelů od začátku stránky). A při rolování [vytvořit skriptem CSS](/css-vyhledavani#js-css-styl), které obrázek/obrázky s danou třídou zviditelní.

Něco ve smyslu:

```
pridatCss(".top-" + zaokrouhlit(odrolovanoShora + vyskaOkna) + " {display: block}");
```

## Odkazy jinam

  - [be]Lazy.js](http://dinbror.dk/blazy/) – miniaturní knihovna pro lazy loading obrázků; skutečný `src` obrázku maskuje do `data-atributu`

  - [Unveil](http://luis-almeida.github.io/unveil/) – lazy loading plugin pro jQuery/[Zepto](/framework-zepto)