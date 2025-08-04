---
title: "RSS čtečka v PHP"
headline: "RSS čtečka v PHP"
description: "Jak si v PHP naprogramovat RSS čtečku."
date: "2013-08-16"
last_modification: "2013-08-16"
status: 0
tags: []
---

Pro sledování svých oblíbených webů používám RSS. V době, kdy autoři stránek publikují nové články na [Facebooku](/facebook) a [Twitteru](/twitter), to může působit staromódně, ale RSS má pořád některé výhody:

  - Zprávy z RSS neobsahují tolik „šumu“ jako osobní profily autorů webů, ale jsou v nich pouze články.
  
  - Člověk má jistotu, že se k němu nový obsah dostane.

## Hotová RSS čtečka

Existuje řada online RSS čteček nebo je možné si **stáhnout a nainstalovat RSS čtečku v PHP**.

    - [Tiny Tiny RSS](https://tt-rss.org/gitlab/fox/tt-rss/wikis/home) – celkem známý PHP skript pro RSS

    - [Feedly](https://feedly.com/i/welcome) – populární online RSS

Osobně mi ale žádné z řešení nevyhovuje, tak jsem se rozhodl napsat vlastní.

Tento článek píšu během jeho vývoje, takže je možné, že se nepovede.

Při programování něčeho, co jsem dříve nedělal se snažím **začínat od nejpodstatnějších částí aplikace**. V případě RSS to bude:

  - Získání seznamu zdrojů.

  - Načtení a **parsování RSS zdroje**.

Když se tohle nepovede, nemá smysl pokračovat, protože bez toho zkrátka RSS fungovat nemůže.

## Seznam zdrojů

Primárně používám RSS čtečku ze [staré **Opery 12**](/opera). Ta umožňuje export seznamu zdrojů do universálního formátu **OPML** (*Outline Processor Markup Language*).

**Vyexportovat** seznam zdrojů jde v *Menu → Nastavení → Import a Export → Exportovat seznam zdrojů novinek*:

Získat OPML seznam je možné ve většině RSS čteček.

### OPML export

Soubor `*.opml` je jednoduché XML.

Zajímavé jsou z něj položky `&lt;outline>` v `&lt;body>`, které obsahují názvy a adresy zdrojů.

```
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;opml version="1.0">
  &lt;head>
    &lt;title>Newsfeeds exported from Opera Mail/12.17 (Win32)&lt;/title>
  &lt;/head>
  &lt;body>
    &lt;**outline**
      text="Je čas.cz" 
      title="Je čas.cz" 
      type="rss" 
      xmlUrl="http://jecas.cz/rss" 
    />
  &lt;/body>
&lt;/opml>

```

Projít celý seznam jde velmi snadno pomocí PHP funkce `simplexml_load_file`. V cyklu `foreach` se vyberou všechny položky `&lt;outline>` a vypíše jejich URL zdroje a název:

```
&lt;?php
$import = **simplexml_load_file**("opera-newsfeeds.opml");
foreach($import->body->outline as $feed): ?>
  &lt;div class="feed-list--item">
    &lt;h1>
      &lt;a href="&lt;?=*$feed['xmlUrl']*?>">
        &lt;?=*$feed['title']*?>
      &lt;/a>
    &lt;/h1>
  &lt;/div>
&lt;?php endforeach ?>
```

## Načtení RSS zdroje

Když není problém získat adresy zdrojů, může se začít s jejich načítáním.

Soubor se zprávami daného webu je opět jednoduchý **XML soubor**.

Validní podoba RSS, kterou jsem někde kdysi zkopíroval pro jecas.cz, vypadá následovně:

```
&lt;?xml version="1.0" encoding="utf-8"?> 
&lt;rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  &lt;channel>
    &lt;title>Je čas.cz&lt;/title>
    &lt;link>http://jecas.cz&lt;/link>
    &lt;atom:link href="http://jecas.cz/rss" rel="self" type="application/rss+xml" />
    &lt;description>Poznámky k webdesignu.&lt;/description>
    &lt;language>cs&lt;/language>
    **&lt;item>**
      *&lt;title>Vyšší tlačítko ve Firefoxu&lt;/title>*
      *&lt;link>http://jecas.cz/firefox-vyssi-tlacitko&lt;/link>*
      &lt;guid>http://jecas.cz/firefox-vyssi-tlacitko&lt;/guid>
      *&lt;description>Prohlížeč Firefox má zajímavou vlastnost u formulářových tlačítek. Dělá je vyšší než ostatní prohlížeče.&lt;/description>*
    &lt;/item>
  &lt;/channel>
&lt;/rss>
```

Z RSS zdroje je tedy možné zjistit nějaké **informace o kanálu** (název, stránka, popis), ale zajímavější budou zatím položky `&lt;item>`, které obsahují jednotlivé články.

Projdou se stejně jako OPML zdroj funkcí `simplexml_load_file`.

```
&lt;?php
$feed = simplexml_load_file("http://jecas.cz/rss");
foreach ($feed->channel->item as $item): ?>
  &lt;h2>
    &lt;a href="&lt;?=$item->link?>">
      &lt;?=$item->title?>
    &lt;/a>
  &lt;/h2>
  &lt;div>
    &lt;?=$item->text?>
  &lt;/div>
&lt;?php endforeach ?>
```

Řada zdrojů obsahuje ještě datum vydání – `$item->pubDate` – není ale povinný.

## Asynchronní načítání zpráv

Protože získávání zpráv ze zdroje může nějakou dobu trvat, bude lepší zprávy jednotlivých zdrojů načítat **asynchronně JavaScriptem** – tedy pomocí [AJAXu](/ajax).

Skript pro parsování RSS tak bude samostatný soubor přebírající adresu zdroje z `$_GET["url"]`.

K seznamu zdrojů se potom připojí jednoduchá JS obsluha, která po kliknutí pošle ajaxový požadavek na skript pro přečtení `*.xml` souboru se zprávami.

```
var feeds = document.querySelectorAll(".feed-list a");
var feedsLength = feeds.length;
for (var i = 0; i &lt; feedsLength; i++) {
  feeds[i].onclick = (function(el) {
    return function() {
      ajax(
        "fetchFeed.php?url=" + encodeURIComponent(el.href),
        function(data) {
          // vypsání dat
        }
      );
      return false;				
    }
  })(feeds[i]);
};
```

## Ošetřování výjimek a chyb

Výše uvedené kódy neřeší krajní situace, kdy něco nebude fungovat. Server se zdrojem nebude odpovídat, RSS nebude validní a podobně.

Další potenciální problém je **neošetřování dat** z RSS zdroje. Některé weby v RSS používají HTML kód, což zavání [XSS dírou](/bezpecnost#xss).

Vypisovaný *text* by měl projít funkcí `htmlspecialchars`:

```
$text = htmlspecialchars($text, ENT_QUOTES);
```

## Demo

    - [Ukázka dosavadní podoby RSS čtečky](/files/php-rss-ctecka/rss-demo1/)