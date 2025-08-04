---
title: "Převod inline CSS na externí"
headline: "Převod CSS v HTML na externí styly"
description: "Jak z HTML vybrat id, třídy a inline styly a vytvořit z nich CSS předpis do externího souboru."
date: "2014-01-23"
last_modification: "2014-01-24"
status: 1
tags: ["HTML", "CSS", "Hotová řešení", "Rady a nápady"]
---

Nástroj [extractCSS](http://extractcss.com/) dokáže v HTML kódu najít elementy, které mají nastavenou [třídu nebo ID](/id-class) a vytvořit pro ně CSS předpis. Když element s `class`/`id` bude mít nějaké **inline styly** (např. `style="color: red"`), bude i toto rovnou převedeno do *externího* CSS.

## Využití

K čemu je to dobré? Kromě **extrahování inline stylů** to může posloužit i ke zrychlení tvorby CSS k existujícímu HTML.

Navrhneme si strukturu HTML kódu s třídami a **extractCSS** z toho připraví kostru pro vytváření CSS.

### HTML

```
&lt;div class="obal">
  &lt;div class="hlavicka">&lt;/div>
  &lt;div class="obash">&lt;/div>
  &lt;div class="menu">&lt;/div>
  &lt;div class="paticka">&lt;/div>
&lt;/div>
```

To jde mimochodem s [nástrojem Emmet](/emmet) zapsat jako `.obal>(.hlavicka+.obash+.menu+.paticka)`.

### CSS

[extractCSS](http://extractcss.com/)

Odpovídající a automaticky vygenerovaná CSS kostra bude vypadat následovně:

```
.obal {
}

.hlavicka {
}

.obash {
}

.menu {
}

.paticka {
}
```