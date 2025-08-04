---
title: "Filtrování dat v CSS"
headline: "Jednoduché filtrování dat v čistém CSS"
description: "Při filtrování malého množství položek si lze od Internet Exploreru 9 vystačit jen s CSS."
date: "2013-05-18"
last_modification: "2013-05-18"
status: 1
tags: ["CSS", "Hotová řešení"]
---

input:not(:checked) ~ ul li {display: none}
input#all:checked ~ ul li {display: list-item}
input#rbr:checked ~ ul .rbr {display: list-item}
input#ferrari:checked ~ ul .ferrari {display: list-item}
input#mercedes:checked ~ ul .mercedes {display: list-item}
input#mclaren:checked ~ ul .mclaren {display: list-item}

	Vše
	Red Bull Racing
	Scuderia Ferrari
	Mercedes GP
	McLaren
	
		- Michael Schumacher

		- Fernando Alonso

		- Kimi Räikkönen

		- Lewis Hamilton

		- Jenson Button

		- Sebastian Vettel

		- David Coulthard

		- Mark Webber

## Jak?

Využívá se:

selektoru `:checked` (pro vybraný formulářový prvek `radio` nebo `checkbox`),
selektoru `~` (libovolný sourozenec),
obyčejných tříd – každá položka má třídy podle příslušné skupiny (jedna položka může (ale nemusí) patřit do více skupin).
```
&lt;li class="*ferrari* *mercedes*">Michael Schumacher&lt;/li>
```

Na začátku se všechny položky skryjí (`display: none`) a při
```
input**#id-inputu**:checked ~ ul *.nazev-prislusne-tridy* {display: list-item}
```

… se opět objeví.
Důležité je, aby se bylo *jak dostat* z `input:checked` na jednotlivé položky, `&lt;input>` proto nemůže být hlouběji zanořen.

## Starší prohlížeče

Aby se v nepodporovaných prohlížečích zobrazil alespoň seznam bez možnosti filtrování, položky se schovávají přes `:not(:checked)`. Pokud je tedy prohlížeč dokáže skrýt, dokáže je i zobrazit.
Vyřešit funkčnost pro starší Explorery a jiné by mohl vyřešit jednoduše JS:

Při kliknutí na `&lt;input>` nastavit pro jeho rodiče (`this.parentNode`) třídu (`className`) třeba dle identifikátoru (`this.id`),
zjednodušit CSS a položky zobrazovat při `.trida-rodice .trida-skupiny {}`.

A nebo vytvořit plnohodnotný formulář a data posílat  vyfiltrovat na server.
  
## Vyhledávání textu na stránce

Se špetkou JavaScriptu je možné na webu [vyhledávat](/css-vyhledavani).