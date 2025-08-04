---
title: "HTML atribut scoped"
headline: "HTML atribut <code>scoped</code>"
description: "HTML 5.1 přichází s možností validně používat element <code>&lt;style></code> i mimo část <code>&lt;head></code>."
date: "2013-06-23"
last_modification: "2014-11-15"
status: 1
tags: ["HTML", "Rady a nápady", "HTML atributy"]
---

Tedy používat jej tam, kde to odjakživa také funguje, tj. kdekoliv ve stránce. Aby to nebylo tak jednoduché, podle návrhu jsou ohledně `&lt;style>` dva způsoby použití:

  - normálně **v hlavičce** (jako doposud),

  - **kdekoliv** ve stránce právě s atributem `scoped`

Atribut `scoped` je boolean.

## Podpora

Atribut `scoped` funguje od **Firefoxu 21**. Na okamžik se objevil i ve **Chrome** (po zapnutí experimentálních vlastností), ale v **Chrome 37** už tato možnost **byla vyřazena**.

    - Vývojáři jádra Blink (používá **Chrome** a **Opera 15+**): [Intent to remove &lt;style scoped>](https://groups.google.com/a/chromium.org/forum/#!searchin/blink-dev/scoped/blink-dev/R1x18ZLS5qQ/Bjuh_cENhlQJ)

## Využití

V podporovaných prohlížečích `&lt;style scoped>` zajistí aplikaci daného CSS jen v rámci svého rodiče (na příkladu element `&lt;div>`). Deklarace `p {color: red}` proto nepřebarví všechny **všechny odstavce** na stránce, ale jen ten v daném *scope* (prostoru ohraničeného nejbližším nadřazeným elementem – s pojmem *scope* se je možné setkat i v [JavaScriptu](/scope) nebo jiných programovacích jazycích).

```
&lt;head&gt;
  &lt;style&gt;
    p {color: blue}
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;p&gt;Modrý odstavec&lt;/p&gt;
  &lt;div&gt;
    &lt;style **scoped**&gt;
      p {color: red}
    &lt;/style&gt;      
  &lt;p&gt;Červený odstavec&lt;/p&gt;
  &lt;/div&gt;
&lt;/body>
```

[Živá ukázka](http://kod.djpw.cz/fmhb)

Zatím se ale nabízí spíš využití ve formě **umlčení HTML 5 validátoru** při používání `&lt;style>` v těle dokumentu. Je zde ale risiko, že prohlížeče začnou `scoped` podporovat. A takto zapsaný styl začne fungovat jinak, než bylo očekáváno.