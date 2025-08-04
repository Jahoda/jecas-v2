---
title: "Podmíněné komentáře pro IE"
headline: "Podmíněné komentáře pro Internet Explorer"
description: "Jak rychle a snadno hackovat HTML a CSS v různých historických versích Internet Exploreru."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["HTML", "HTML značky", "Hacky"]
---

S vymizením starších prohlížečů než **IE 10** jsou podmíněné komentáře technikou do musea. A v běžné praxi je člověk těžko využije.

Pokud selžou všechny snahy o sjednocení vzhledu/chování napříč prohlížeči, přichází na řadu hackování, tedy psaní různého kódu pro různý prohlížeč.

Internet Explorer uměl [(do IE 10)](#ie10) tzv. podmíněné komentáře. Tedy speciální HTML komentář, který má v hranatých závorkách nějakou podmínku, například:

&lt;!--[if IE]&gt;
	&lt;p>Nějaký HTML kód&lt;/p>
&lt;![endif]-->

Pozor na to, že v jiných prohlížečích, než je **IE 9** a starší, tyto komentářové podmínky **nefungují**. Výše uvedená konstrukce se projeví jako běžný HTML komentář, tedy nijak.

## Pár dalších příkladů

		Podmínka
		Kde se obsah zobrazí
	
		`if IE`
		ve všech IE
	
		`if lt IE 9`
		ve starších než IE 9 (`lt` znamená lower than – nižší než)
	
		`if gt IE 8`
		v novějších než IE 8 (`gt` znamená greater than – vyšší než)
	
		`if !IE 7`
		všude jinde než v IE 7, pochopitelně taktéž ne v jíných prohlížečích než IE (je to pro ně běžný komentář), vykřičník je negace
	
		`if gte IE 6`
		ve všech IE od verse 6 včetně (`gt**e**` – asi jakože equal = shodné)

Kromě výše uvedených symbolů lze používat i klasické operátory `&amp;` či `|` a podmínky řetězit.

## Použití

	Jedna možnost je pro Explorer(y) vytvářet zvláštní CSS soubory a podmínkou (komentářem) obalit jejich při`&lt;link>`ování ke stránce.

		Nevýhoda je, že uživatel bude zbytečně zdržován dalším HTTP požadavkem na další CSS soubor, který často bude mít jen pár opravných vlastností.
	Proto může být elegantnější pomocí podmíněných komentářů nastavit třídu `ie` pro nějaký hodně nadřazený element (`&lt;html`/`body>`) a pro konkrétní prohlížeč psát selektory začínající právě tou třídou:
		```
.ie h1 {/* pravidla pro nadpis &lt;h1> v IE */}
```

		V HTML lze využít toho, že u elementu `&lt;html>` je volitelné psát počáteční i koncovou značku, takže se nemusíme zaobírat jejím dosazováním pro ostatní prohlížeče.
		&lt;!--[if IE]>&lt;html class="ie">&lt;![endif]-->

## Podmíněné komentáře v IE 10

V Internet Exploreru 10 už podmíněné komentáře nefungují s výjimkou přepnutí do staršího režimu **IE 9**.

&lt;meta http-equiv="x-ua-compatible" content="IE=9">
Čímž se ale přijde o možnosti, co umí IE 10 oproti IE 9.

Proto se jako lepší řešení může nabízet určit prohlížeč na straně serveru. A třeba podle toho přidat CSS třídu.

### Řešení v PHP

Podobně jako u [upravování náhledu na Seznamu](/nahled-seznam#reseni), stačí testovat hlavičku [`user-agent`](/ua):
```
&lt?php 
if (strpos($_SERVER['HTTP_USER_AGENT'], "MSIE")) {
  echo "&lt;html class=ie>";
}
?>
```

Specifikovat konkrétní IE lze testování hodnot jako (`MSIE 6`, `MSIE 7`, `MSIE 8`, `MSIE 9`, `MSIE 10`).

[IE 11](/ie11) už `MSIE` v `user-agent` hlavičce nemá. Detekovat jde ale třeba vykreslovací jádro `Trident/7.0`.

      Tvar podmínky pro **jiné prohlížeče než IE** by vypadal následovně:

```
&lt?php 
if (
  isset($_SERVER['HTTP_USER_AGENT']) &&
  (
    strpos($_SERVER['HTTP_USER_AGENT'], "MSIE") === false ||    
    strpos($_SERVER['HTTP_USER_AGENT'], "Trident/7.0") === false
  )
) {
  echo "&lt;html class=non-ie>";
}
```