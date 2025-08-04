---
title: "Vlastní HTML atributy"
headline: "Vlastní atributy v HTML"
description: "Jak je to s vytvářením a používáním atributů s vlastními názvy v HTML stránce."
date: "2014-02-05"
last_modification: "2014-02-05"
status: 1
tags: ["HTML", "HTML značky", "Rady a nápady"]
---

Podobně jako je možné si vytvářet [vlastní HTML elementy](/vlastni-html-znacky) (od **IE 9** plně funkční včetně možnosti stylování), dá se totéž dělat i s atributy. S těmi je to dokonce ještě lepší — pro stylování je lze využít už v **IE 7**.

```
&lt;style>
  div[**barva**=*cervena*] {color: red}
&lt;/style>
&lt;div **barva**="*cervena*">
  Červený div.
&lt;/div>
```

[Živá ukázka](http://kod.djpw.cz/erbb). Použití je bezproblémové. Pochopitelně v případě, že se omylem náhodou netrefíme do existujícího atributu. Prohlížeče neznámý atribut nijak neřeší, ale **umožní stylování** [atributovým selektorem](/css-selektory#atributovy).

Jediná nevýhoda bude možná **teoreticky lehce nižší rychlost** než při klasickém stylování [třídami nebo identifikátory](/id-class), ale zatím jsem nic takového nepostřehl. Otázka je spíš, co to v CSS přinese navíc.

Od **IE 8** je možné [číst hodnotu i přímo v CSS](/content-attr).

Mimochodem, atributový selektor má nižší váhu než `class` nebo `id`.

## Vlastní atributy a JavaScript

Zajímavé mi přijde až používání v JavaScriptu. Nestandardní atributy se dobře hodí k uložení nějaké hodnoty, **označení stavu aplikace** nebo označení elementů se společnými znaky.

Zejména to ukládání stavů do vlastních atributů mi přijde „čistší“, než je používání [běžných tříd](/prepinani-trid). Je tak hezky odděleno samotné stylování vzhledu a stylování *funkcí* (např. [skrytí obsahu](/zobrazit-skryt)).

### Výběr elementů podle vlastní atributů

Od **IE 8**, který umí metody [`querySelector`/`querySelectorAll`](/queryselector), je výběr těchto elementů velmi jednoduchý.

```
var cerveneDivy = document.querySelectorAll("div[barva=cervena]");
```

(Pro **IE 7** by případně `querySelector` mohl jít [dodělat](http://www.codecouch.com/2012/05/adding-document-queryselectorall-support-to-ie-7/) [polyfillem](https://gist.github.com/connrs/2724353).)

V případě, že bychom chtěli najít libovolné elementy s požadovaným atributem, řešení je hvězdičkový selektor.

```
var cerveneDivy = document.querySelectorAll("*****[barva=cervena]");
```

[Živá ukázka](http://kod.djpw.cz/grbb).

### Nastavování a čtení atributů

Odlišnost oproti běžným atributů je v získávání/nastavování hodnoty.

Je nutné používat metody `getAttribute`/`setAttribute` (poznámka: pro standardní atributy jsou [lepší standardní vlastnosti DOMu](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=90307).)

```
var element = document.querySelector("*[barva]");
element.getAttribute("barva"); // obsah atributu „barva“
element.setAttribute("barva", "**novaHodnota**); // nastaví obsah
```

[Ukázka](http://kod.djpw.cz/hrbb)

## Data atributy, nebo vlastní?

Podle specifikace by *vlastní atributy* měly začínat prefixem `data-`. Má smysl se tohoto držet?

  - Dle vlastní libosti pojmenované atributy **neprojdou validátorem** (validátor je vyhodnotí jako nepovolené pro danou značku). To `data-atribut`y toleruje.

  - U `data-` prefixu by nemělo hrozit, že se námi vymyslený atribut **dostane do specifikace**, prohlížeče mu začnou přisuzovat nějaký význam a web se tak **rozbije**.

  - Pojmenování atributu jako `data-nazev-atributu` místo prostého `nazev-atributu` může člověku, co detailně nezná všechny HTML atributy, **pomoci v orientaci**. Na první pohled je vidět, že je atribut *vlastní*.

  - Jinak je to asi jedno.