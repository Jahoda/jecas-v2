---
title: "DOM"
headline: "DOM (Document Object Model)"
description: "Co je to v prostředí HTML stránky DOM (Document Object Model) a jak se liší od zdrojového kódu."
date: "2013-12-29"
last_modification: "2014-02-13"
status: 1
tags: ["HTML"]
---

Stručně řečeno je **DOM** nějaká **stromová struktura**, kterou si prohlížeč vytvoří po zpracování stránky. Podívat se na něj je možné pomocí [vývojářských nástrojů](/vyvojarske-nastroje) (bývá zpravidla na první kartě).

## DOM není zdrojový kód

Ač to tak možná na první pohled vypadá, *Document Object Model* není to samé co zdrojový kód stránky.

**Liší se** v základu ve dvou věcech.

  - Některé [druhy značek](/html-znacky) nemusí v **zdrojovém HTML kódu** být zapsány, ale v DOMu se vytvoří (třeba značky `&lt;html>`, `&lt;head>`, `&lt;body>` nebo `&lt;tbody>` u tabulek).

  - JavaScript může podobu DOMu, která vzešla z HTML zdroje, dále **upravovat**.

Kromě vývojářských nástrojů se přibližná podoba po zpracování **HTML i JS kódů** získá vypsáním [`innerHTML`](/innerhtml).

    document.write("Odstavec vypsaný skriptem

");
    Odstavec v HTML
    
  Výsledný zdrojový kód

## Zdrojový kód vs. DOM

Například tento zdrojový kód. Obsahuje otevírací HTML značku pro odstavec (`&lt;p>`) a trochu JS, který přidá do stránky nadpis (`&lt;h1>`). ([Ukázka](http://kod.djpw.cz/utbb).)

```
&lt;p>Odstavec
&lt;script>
  var nadpis = document.createElement("h1");
  nadpis.innerHTML = "Nadpis stránky";
  document.body.appendChild(nadpis);
&lt;/script>
```

Vytvoří následující podobu DOMu.

## Úpravy DOMu

Co je myšleno takovou úpravou DOMu pomocí JavaScriptu?

  - Změna, přidávání nebo odebírání **atributů** (`element.className = 'novaTrida'`, `setAttribute`, `removeAttribute`).

  - Přidávání nebo odebírání **elementů** (metody `appendChild`, `removeChild` a podobně).

  - Změna **obsahu** elementů (`innerHTML`, `innerText`/`textContent`).

## Výběr elementů

Pro výběr potřebného elementu z HTML DOMu existuje v JavaScriptu několik možností.

  Od **IE 8** se dá používat [`querySelector`](/queryselector) a běžné [CSS selektory](/css-selektory).

  Oblíbené jsou metody `getElement*`:

      - `document.getElementById("idecko")` — vybere jeden element s ID `idecko`

      - `document.getElement**s**ByTagName("div")` — vybere **kolekci** značek `&lt;div>`

      - `document.getElement**s**ByClassName("trida")` — vybere **kolekci** elementů s třídou `trida` (funguje až od **IE 9**)

    Kolekce získané metodami `getElement**s**` se potom většinou [procházejí cykly](/js-cykly).

  Obrázky na stránce je možné získat z `document.images` ([ukázka](http://kod.djpw.cz/vtbb)).

  K formulářům se dostaneme přes `document.jmenoFormulare` a k jejich políčkům přes `document.jmenoFormulare.jmenoPolicka` ([ukázka](http://kod.djpw.cz/wtbb)).

Ještě existují další možnosti, ale ty se zase tak moc nepoužívají a koneckonců jdou nahradit `querySelectorem` / `getElement*` metodami.

## DOM v PHP

Podobné metody jako v JS jde používat i v PHP pro získávání dat z HTML (třeba tak vytahovat data z [cizích stránek](/stazeni-stranky) získaných funkcí `file_get_contents`).

[PHP DOM](http://cz2.php.net/book.dom)

## Odkazy jinam

  - [Writing A Better JavaScript Library For The DOM](http://coding.smashingmagazine.com/2014/01/13/better-javascript-library-for-the-dom/) — knihovna, která vylepšuje klasický DOM