---
title: "Parsování HTML v PHP"
headline: "Parsování HTML v PHP"
description: "Jak v PHP parsovat HTML stránku a získat z ní potřebná data."
date: "2013-11-04"
last_modification: "2016-01-20"
status: 1
tags: ["Hotová řešení", "PHP", "Získávání obsahu"]
---

V případě, že je potřeba získat z nějaké stránky data pro vlastní použití, bývá v ideálním případě k disposici obsah ve strojově čitelné podobě:

  Ve formátu [JSON](/json).

    Pro přímé vložení obsahu se používá [oEmbed](/oembed).

    Existují i méně používané formáty jako [CSV](http://cs.wikipedia.org/wiki/CSV) (jednotlivé položky jsou odděleny čárkami), [SOAP](http://cs.wikipedia.org/wiki/SOAP) (založený na XML) a podobně.

Není-li strojově čitelný formát k disposici, je nutné **parsovat HTML**.

## Regulární výrazy

První možnost je požadovaná data vyzobat regulárními výrazy.

V PHP se k tomu používají funkce [`preg_match`](http://php.net/manual/en/function.preg-match.php) nebo [`preg_match_all`](http://php.net/manual/en/function.preg-match-all.php).

Regulární výrazy je potřeba šít přesně na míru konkrétnímu zdrojovému kódu stahovaného webu. Vzhledem k tomu, že svou roli zde hraje každý znak, změna HTML kódu cílové stránky snadno způsobí nefunkčnost.

### Získání obsahu značky

Pro ilustraci poslouží následující příklad pro získání titulku stránky:

```
$page = file_get_contents("http://example.com");
preg_match("/&lt;title>(.*)&lt;\/title>/i", $page, $matches);
echo $matches[1];
```

Nejprve se funkcí `file_get_contents` [stáhne obsah externí stránky](/stazeni-stranky), načež se funkcí `preg_match` vybere obsah značky [`&lt;title>`](/html-kostra#title).

Řada lidí se regulárních výrazů bojí. Naštěstí existují další způsoby:

## PHP DOM

V PHP existují funkce pro práci přímo s [HTML DOMem](/dom). V takovém případě se ze získaného HTML řetězce nejprve sestaví DOM (*Document Object Model*) a nad ním jde potom používat metody typu [`getElement*`](/getelement) známé z JavaScriptu.

Jedná se o třídu [DOMDocument](http://php.net/manual/en/class.domdocument.php).

Při použití této třídy je postup získávání obsahu trochu méně závislý na změnách zdrojového kódu. Už nejde o každý znak v HTML, ale o podobu výsledného DOMu.

Oproti JavaScriptu asi nejvíce chybí [`querySelector`](/queryselector) umožňující vybírat HTML značky pomocí [CSS selektorů](/css-selektory).

Získat obsah značky `&lt;title>` pomocí PHP metod DOMu jde následovně:

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://example.com');
$title = $dokument->getElementsByTagName('title');
echo $title->item(0)->nodeValue; // hodnota první položky
```

Externí stránku lze načíst přímo přes `loadHTMLFile`.

### Vypsání všech odkazů

Jednotlivé vybrané značky mají další metody, třeba `getAttribute`, která umožňuje získat hodnotu HTML atributu.

Procházet kolekci elementů jde cyklem `foreach`.

Následující příklad vypíše všechny odkazy na této stránce:

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://jecas.cz/php-parsovani-html');
$odkazy = $dokument->getElementsByTagName('a');
foreach ($odkazy as $odkaz) {
  echo "&lt;li>" . $odkaz->getAttribute("href");
}
```

### Vypsání HTML obsahu značky

Položky DOMu v PHP nemají vlastnost `innerHTML` jako v JavaScriptu. Pro získání HTML kódu tak slouží metoda `saveHTML` volaná nad `DOMDocument`em – předává se jí požadovaný element:

```
$dokument->saveHTML($odkaz);
```

## XPath

Nejsilnější možnosti pro vybírání obsahu nabízí [XPath](http://php.net/manual/en/class.domxpath.php) (v něčem je i mocnější než CSS selektory).

XPath se naroubuje na `DOMDocument`:

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://example.com');
$xpath = new DOMXPath($dokument);
```

Následně jde titulek stránky vybrat pomocí prostého:

```
echo $xpath->query('//title')->item(0)->nodeValue;
```

### XPath vs. CSS

Pro rychlé pochopení, jak v XPath funguje výběr elementů, je ideální srovnání se selektory v CSS:

    CSS    XPath

    `*`    `//*`

    `div`    `//div`

    `div h1`    `//div//h1`

    `div > h1`    `//div**/**h1`

    `div#id`    `//div[@id='id']`

    `div.trida`    `//div[@class='trida']`

    `div[title]`    `//div[@title]`

    `p:first-child`    `//p[1]`

    `h1 + p`    `//h1/following-sibling::p[1]`

Jak je vidět, libovolný potomek se značí `//`, přímý potomek potom jen jedním `/`, atributy se uvádějí do hranatých závorek se zavináčem.

### Výběr podle třídy

Vybírání elementu podle třídy je při použití XPath odlišné oproti pravidlům CSS. V případě více přiřazených tříd se element nevybere – XPath vyžaduje přesnou shodu hodnoty atributu.

Chování blíže podobné CSS jde zajistit tímto zdlouhavým zápisem ([vysvětlení](http://stackoverflow.com/questions/8808921/selecting-a-css-class-with-xpath/9133579#9133579)):

```
//*[contains(concat(" ", normalize-space(@class), " "), " trida ")]
```

Při použití stručnějšího zápisu:

```
`//*[contains(@class, 'trida')]`
```

By se chybně zachytil i element s třídou `jina-trida`.

Další možnosti XPathu jsou popsány v následujícím přehledu:

    - [Xpath cheatsheet](http://ricostacruz.com/cheatsheets/xpath.html)

## CSS selektory v PHP

Možnost používat v PHP přímo CSS selektory nabízí několik hotových knihoven. Je ale možné, že budou pomalejší než XPath.

    - [PHP Simple HTML DOM Parser](http://simplehtmldom.sourceforge.net/)

    - Symfony: [CssSelector Component](https://github.com/symfony/css-selector)