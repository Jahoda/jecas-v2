---
title: "HTML značka template"
headline: "HTML značka <code>&lt;template></code>"
description: "HTML tag <code>&lt;template></code> slouží k připravení HTML kódu, který později zpracuje JavaScript."
date: "2013-11-28"
last_modification: "2013-12-11"
status: 1
tags: ["HTML", "HTML značky"]
---

Při vytváření aplikace v JavaScriptu se může hodit mít po ruce kód HTML, který se použije až později při nějaké události. *Šablony* pomocí `&lt;template>` zatím fungují ve **Firefoxu** a **Chrome**. V **IE** ani **Opeře 12** ne.

## Šablona `&lt;template>`

Cokoliv je umístěné do značky `&lt;template>` podporující prohlížeče neřeší do té doby, než obsah JavaScript někde použije. Šablonu je možné umístit takřka **kamkoliv do kódu** (do `&lt;head>`, `&lt;body>`, do tabulky a podobně).

### Vlastnosti šablony

  - **DOM** šablony se nevyhodnocuje.

  - **CSS** se na šablonu neaplikuje.

  - **Obrázky** se před použitím **nenačítají**.

Použití **šablony** může vypadat následovně:

```
&lt;template>
  &lt;p>Obsah ukrytý v šabloně&lt;/p>
&lt;/template>
```

„Aktivování“ obsahu šablony potom může proběhnout jeho **naklonováním** do stránky. Obsah z šablony je nutné dolovat přes `sablona.**content**` (protože není v DOMu stránky).

```
var sablona = document.querySelector('#id-sablony');
document.body.appendChild(sablona.content.cloneNode(true));
```

Před *vložením* do stránky je možné šablony libovolně **JavaScriptem modifikovat**. Třeba **naplnit daty** nějak skriptem vypočtenými a podobně.

```
sablona.content.querySelector("p").innerHTML = 'Ahoj';
```

[Ukázka](http://kod.djpw.cz/onv)

Poznámka: V obsahu šablony (vlastnost `content`) není možné nacházet elementy metodami typu `getElementsByTagName`, je **nutné použít** [`querySelector`](/queryselector).

### Přednačtení (preload)

Načíst nějaký obsah z šablony **dopředu** nejspíš není možné.

Kvůli špatné podpoře šablony napříč prohlížeči **existují alternativy**…

## Skrytý element

Obsahu se přidá `display: none`. Nevýhoda tohoto řešení je, že se tento element přidá do DOMu už při načtení, ačkoliv to není zatím potřeba. Zároveň se **stáhnou případné obrázky** v elementu umístěné.

## JS značka `&lt;script>` s nesmyslným `type`

Zajímavější možnost je umístit obsah k **pozdějšímu použití** do značky `&lt;script>`, které se dá nesmyslný `type`, takže její obsah prohlížeč jako JS kód nevyhodnotí.

```
&lt;script id="sablona" type="nejaky/nesmysl">
  &lt;p>Skrytý obsah, který obnoví JavaScript.&lt;/p>
&lt;/script>
```

Obsah se později může vytáhnout přes `innerHTML`.

```
document.getElementById("sablona").innerHTML
```

[Ukázka](http://kod.djpw.cz/snv)