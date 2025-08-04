---
title: "Maximální počet CSS selektorů"
headline: "Maximální možný počet CSS selektorů"
description: "Jaké jsou v prohlížečích omezení pro velikost (složitost) CSS souborů."
date: "2018-03-08"
last_modification: "2018-03-12"
status: 1
tags: ["CSS", "CSS selektory", "Prohlížeče"]
---

V praxi na to většina lidí nejspíš nenarazí, ale existují jisté limity pro počet CSS selektorů.

## Internet Explorer 9 a starší

Aktuálně je limituje hlavně **IE 9** (a nižší) s maximálním počtem **4095** selektorů. Další selektor v pořadí již bude ignorován.

Tento limit je většinou dostatečný, nicméně pro složitější a rozsáhlejší weby už nemusí stačit. Zvlášť při použití nějakého CSS [frameworku](/knihovny) nebo při generování CSS se počet selektorů může tomuto limitu přiblížit.

Spočítat CSS selektory dokáže např. následující nástroj:

    - [CSS selector counter](http://snippet.bevey.com/css/selectorCount.php)

Do tohoto limitu se podle všeho nepočítají [`@media`](/media) pravidla:

    StackOverflow: How are media queries counted in IE's CSS selectors limit?

V případě, že je selektorů 4096 a víc, nezbývá než je rozdělit do více souborů. Zde jsou limity následující:

  - lze připojit až 31 externích stylů,

  - každý styl může přes `@import` připojit dalších 31 externích stylů,

  - `@import`y lze zanořovat do 4 úrovní

Z toho plyne, že při rozdělování je limit dostatečný.

### Automatisace limitu

Pokud se všechny styly [spojují do jednoho souboru](/slouceni-js-css) a hrozí, že by se počet selektorů přiblížil hranici 4095, může se hodit Node.js plugin [css-selector-limit](https://github.com/accordionpeas/css-selector-limit).

## Nové prohlížeče

Od **IE 10** jsou limity vyšší — selektorů může být až **65 534**. Dále platí:

  - připojit jde až 4095 externích stylů,

  - každý může na`@import`ovat dalších 4095,

  - zanořovat `@import`y jde do 4095 úrovní

    - IEInternals: [Stylesheet Limits in Internet Explorer](https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/)

Pro ostatní prohlížeče se mi žádné přesné limity nepodařilo dohledat.

Zdá se, že počet 4096 je relativně bezpečný.

V **Chrome** může záležet také na délce selektoru, navíc bývá problém u selektorů na jednom řádku. Takže místo:

```
.selektor1, .selektor2, …, .selektor1000 {}
```

Pomůže napsat:

```
.selektor1,
.selektor2,
…,
.selektor1000 {}
```

    StackOverflow: How long can a CSS selector be?

## Odkazy jinam

  - Space Ninja: [The Many Exciting CSS Limits of Internet Explorer](https://spaceninja.com/2015/03/31/ie-css-limits/)