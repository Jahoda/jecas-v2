---
title: "Ikona přehrávání v titulku"
headline: "Ikona přehrávání v <code>&lt;title></code>"
description: "Symbol přehrávání ▶ v titulku stránky jako je u videí na YouTube."
date: "2014-03-26"
last_modification: "2014-03-26"
status: 1
tags: ["JavaScript", "Hotová řešení", "YouTube"]
---

Při přehrávání videa na YT si je možné povšimnout šipky na začátku titulku. V případě, že má člověk otevřeno více záložek téže stránky, docela se to hodí. Je totiž ihned jasné, **která záložka něco přehrává**.

Tuto **šipku**/trojúhelník znázorňuje znak `▶`.

  Symbol přehrávání můžeme umístit rovnou do kódu (poznámka: některé editory, třeba [Sublime Text](/sublime-text), s tím mohou mít problém, ale výsledek v prohlížeči by měl být OK).

  Použít **HTML entitu** `&amp;#9654;` nebo `&amp;#x25b6;`.

  V JS použít escape sekvenci `\u25b6`.

## Nastavení ikony

Nastavit tuto šipku JavaScriptem je potom možné změnou `document.title`.

```
document.title = "▶" + document.title;
```

Nebo:

```
document.title = "\u25b6 " + document.title;
```

Nebo:

```
document.title = "&amp;#9654; " + document.title;
```

## Odstranění šipky

Při *zastavení* je na místě šipku smazat, to jde zajistit buď kompletním **přepsáním** `document.title`, nebo odstraněním šipky funkcí `replace`:

```
document.title = document.title.replace("\u25b6 ", "");
```

## Ukázka

Jednoduchá ukázka, která přidává/odebírá *šipku* z titulku (`document.title`).

    function prepnoutPrehravani(el) {
      if (el.hasAttribute("data-vypnuto")) {
        document.title = "\u25b6 " + document.title;
        el.removeAttribute("data-vypnuto");
        el.innerHTML = "Vypnout";
      }
      else {
        document.title = document.title.replace("\u25b6 ", "");
        el.setAttribute("data-vypnuto", "");
        el.innerHTML = "Zapnout";
      }
    }

    Zapnout

Manipulovat JavaScriptem s `&lt;title>` je vůbec docela užitečné a není důvod se toho bát. Dá se tak snadno znázorňovat.

  - Již zmíněné **přehrávání videa/hudby**.

  - Zobrazit **počet nepřečtených** zpráv/příspěvků (používá Facebook nebo Twitter).

  - Signalisovat, že je na stránce **rozepsaný příspěvek** (používá [DJPW](http://djpw.cz)).