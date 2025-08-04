---
title: "HTML atribut lang"
headline: "HTML atribut <code>lang</code>"
description: "K čemu slouží a vyplatí se používat HTML atribut <code>lang</code>?"
date: "2014-09-21"
last_modification: "2014-09-21"
status: 1
tags: ["HTML", "HTML atributy"]
---

Jedná se o **universální atribut** (lze ho tedy použít na libovolné HTML značce, i když u některých to nedává smysl) a **určuje jazyk**, ve kterém je příslušný obsah.

Většinou bývá celá stránka jen v jednom jazyce, takže `lang` spatříme nejčastěji u značky `&lt;html>`:

```
&lt;html **lang**="cs">
  &lt;p>
    Celý obsah stránky je česky
  &lt;/p>
```

Není nic proti ničemu následně `lang` umístit do vnořené značky `&lt;div>`, formuláře nebo čehokoliv jiného.

```
&lt;html lang="en">
  &lt;div **lang**="cs">
    Kus obsahu v češtině.
  &lt;/div>
&lt;/html>
```

Funguje to potom tak, že jazyk dané oblasti vždy určuje **nejbližší nadřazený element** s `lang`.

Kódy jazyků by měly být ve formátu *ISO 639-1* ([seznam kódů](http://www.loc.gov/standards/iso639-2/php/English_list.php)). Tj. například:

  - `cs` – čeština

  - `sk` – slovenština

  - `en` – angličtina

  - `de` – němčina

  - `fr` – francouzština

  - `es` – španělština

  - `it` – italština

  - `ru` – ruština

## Využití

Proč se ale **zdržovat** s určením jazyka? Je určení jazyka i využitelné v **praxi**?

    Určení jazyka může pomoci **vyhledávači** nebo **překladači** (např. [Překladač Google](https://translate.google.com/)). Oba typy nástrojů sice mají vymyšleny systémy pro **automatickou detekci**, ale v jistých případech mohou selhat.

    **Kontrola pravopisu** je dostupná ve všech běžných prohlížečích. V případě, že má uživatel více **slovníků**, lze použitím `lang`u nastavit preferovaný jazyk pro kontrolu.

    Týká se to kontroly ve **formulářových polích** ([`&lt;input>`](/input) a [`&lt;textarea>`](/textarea)) nebo [`contenteditable`](/uprava-stranky-designmode).

    Tato funkčnost dle mých testů funguje momentálně jen ve **Firefoxu**. [Pokusná stránka](http://kod.djpw.cz/kvfb) – v podporovaném prohlížeči při dostupnosti českého i anglického slovníku díky `&lt;html **lang="en"**>` podtrhá jako chyby češtinu.

    **Hlasové čtečky** by rovněž mohly volbu jazyka provést na základě atributu `lang`.

    Z pohledu CSS použití `lang`u nabídne selektor [`:lang()`](/css-selektory#lang) (funkční od **IE 8**).

    U **vícejazyčného webu** se hodí mít dostupnou informaci o jazyku dostupnou z CSS/JavaScriptu. Atribut `lang` je nejspíš elegantnější řešení než [třídy nebo ID](/id-class).

    CSS vlastnost [`hyphens`](/hyphens) (= dělení slov na konci řádku spojovníkem) může na základě informace o jazyku fungovat korektně podle pravidel daného jazyka.

Nakonec se nabízí využití pro **změnu klávesnice** na základě jazyka například u mobilních zařízení, aby lépe vyhovovala danému jazyku (diakritika), ale s tím jsem se zatím nesetkal.

## Doporučení

Doporučuji tedy atribut `lang` **správně** používat. To *správně* je dost důležité, protože chybné použití – nastavení jiného `lang`u, než je jazyk stránky – nadělá více škody než užitku.

To se může hravě stát při **okopírování** cizí HTML kostry z anglického prostředí pro použití na české stránce.

## Odkazy jinam

  - W3C: [Why use the language attribute?](http://www.w3.org/International/questions/qa-lang-why.en)

  - W3C: [Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)