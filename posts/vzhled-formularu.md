---
title: "Stylování formulářových prvků"
headline: "Vlastní vzhled formulářů"
description: "Jak vytvořit originálně vypadající formulář, aniž by házel uživatelům klacky pod nohy?"
date: "2013-05-24"
last_modification: "2013-05-24"
status: 1
tags: ["CSS", "Formuláře"]
---

Nejprve je dobré si uvědomit, že pokud se formuláře nechají víceméně úplně být, dostanou relativně funkční vzhled od prohlížeče / operačního systému.

Třeba takové tlačítko ([`&lt;input type=submit>`](/input#type-submit) nebo [`&lt;button>`](/button)) má při ponechání výchozího vzhledu klidně 5 stavů (obrázky jsou z Google Chrome v OS Windows 7):

  Výchozí stav, kdy se *nic neděje*. 
    Při najetí myší na tlačítko (`:hover`). 
      Při stlačení tlačítka (`:active`). 
        Pokud je tlačítko vybráno (typicky) klávesou Tab (`:focus`). 
          Tlačítko je zablokované (atribut `disabled`). 

Jak je vidět, bez sebemenší práce a kódu navíc docela pěkné a funkční tlačítko.

Takovému tlačítku lze měnit [`margin`](/margin), `padding`, styl a barvu písma a hromadu dalších věcí, problém ale nastane, **když se formulářovému prvku sáhne na rámeček** (`border`) **nebo pozadí** (`background`). To celou výše uvedenou funkčnost a styl totálně rozhází. Nezbývá tedy než si všech pět stylů nadefinovat ručně.

## Vlastní styl

	Vstupní pole
	Běžné `&lt;input type=text>` nebo pole [`&lt;textarea>`](/textarea) lze stylovat docela rozumně.
		Snad jediný zádrhel je v Explorerech (do IE 8 včetně) při nastavení `padding`u a přeplnění pole — IE takový text posune natěsno k levému kraji `padding` ne`padding`.

	Tlačítka
	
Co se týče tlačítek (`&lt;input type=submit>` nebo `&lt;button>`), zdá se bez nějakého [hackování](/hacky) nebo bez komplikování kódu nemožné dosáhnout 100% shodného chování napříč prohlížeči. 

	Opera a Internet Explorer všech versí při kliknutí (`:active`) nepatrně posouvají text doprava dolů. V Opeře lze toto chování odbourat pomocí [`position: relative`](/position#relative) pro tlačítko, v Exploreru ale nejspíš možnost zbavit se tohoto efektu není.
	Chrome narozdíl od ostatních prohlížečů při kliknutí a podržení myši nad tlačítkem nevyvolává `:focus`.

	Element `&lt;select>` a `&lt;input>`y `checkbox` a `radio`
	Zde už je situace v podstatě beznadějná. Změnou rámečku nebo pozadí se přepneme na *styl Windows 95*:
		  Položka
		A puntík, zaškrtávátko nebo šipku pro rozbalení není možnost změnit.
          Stylování `&lt;select&gt;` je podrobněji popsáno v článku [Stylování `&lt;select&gt;`u](/stylovani-selectu).

## Řešení v JavaScriptu

Pro napříč prohlížeči shodné formuláře s vlastním vzhledem je tedy potřeba formulářové prvky *nepoužívat*. Přesněji řečeno je schovat a viditelné části *formuláře* sestavit z `&lt;div>`ů a `&lt;span>`ů.
Existují hotová řešení:
	
		PrettyForm
		Jednoduchá a přísupná knihovna podporující i věci jako ovládání klávesnicí. Funkční i v prehistorických prohlížečích. (Vlákno na DJPW.)
		[Selectmenu](http://wiki.jqueryui.com/w/page/12138056/Selectmenu)
		Plugin do jQuery UI řešící `&lt;select>`y. Funkční napříč prohlížeči.
		[Select2](http://ivaynberg.github.io/select2/)
		Taktéž jQuery plugin pro pokročilejší `&lt;select>`y. Funkční až od IE 8.

## Na co si dát pozor

„Nepřechytračit“ uživatele, tj. nezměnit chování formuláře v dobré víře tak, že bude pro uživatele nepředvídatelné.
V **případě použití obrázků** dbát na kontrast (viditelnost) prvků i v případě, že se obrázky nenačtou.
Pokud možno zachovat obvyklé chování, zejména možnost ovládat formulář klávesnicí ([`tabindex`](/tabindex) atd.).

## Odkazy jinam

    [Native form elements](http://nativeformelements.com/) – nativní vzhled formulářových prvků