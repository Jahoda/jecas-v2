---
title: "Indexování JavaScriptu"
headline: "Indexování JavaScriptu"
description: "Jak se vyhledávače Google a Seznam vypořádají s obsahem v JavaScriptu. Dokáží takový obsah indexovat?"
date: "2016-03-14"
last_modification: "2016-03-22"
status: 1
tags: ["JavaScript", "SEO", "Rady a nápady"]
---

Mezi webmastery se má obecně za to, že JavaScript není moc přívětivý pro vyhledávače a textový obsah by tak měl mít na JS nezávislou alternativu.

Je možné se setkat i s názory typu:

  Vyhledávač vidí stránku jako při vypnutí CSS a JavaScriptu.

Skutečnost je ale trochu jiná…

## Google

Google v květnu 2014 oznámil, že jeho robot zpracovává JavaScript a CSS podobně jako prohlížeč běžného návštěvníka:

    - [Understanding web pages better](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html) – Googlebot interpretuje JS a CSS

Z tohoto důvodu je vhodné, aby web v souboru `robots.txt` neblokoval pro Googlebota soubory s externími styly a skripty. Některé weby to dělají kvůli snížení zátěže na server vyvolaný roboty, Google ale v takovém případě dostane o stránce zkreslený výsledek.

### Indexování AJAXu

Kvůli provádění JS nemá robot Google problém ani s [AJAXem](/ajax). Není tak už nutné používat postup s [_escaped_fragment_](/zmena-url#hash), na který si vyhledávač převedl URL s *hasbangem* (`example.com/**#!**url`).

    - [Deprecating our AJAX crawling scheme](https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html)

Díky podpoře JavaScriptu jsou tak na Google normálně indexovány například komentáře ze služeb typu [Disqus nebo Facebook](/komentare#sluzby), které se bez JavaScriptu vůbec nezobrazí.

### Skrytý obsah

Interpretace JavaScriptu/CSS může mít kromě positivních efektů i své stinné stránky. Například kvůli tomu robot Google nemusí zaindexovat obsah, který se zobrazí až po kliknutí.

Jde o různé přepínání obsahu v záložkách nebo sbalení obsahu pod tlačítko *Zobrazit více*.

Důvod je prostý – uživatel tento obsah po příchodu na stránku neuvidí, a to moc není v zájmu vyhledávače, protože to vypadá jako jeho chyba. Více v samostatném článku:

    - [Google a skrytý text](/skryty-text)

### Co z JS Google umí?

Nezdá se, že by interpretace JavaScriptu v podání Googlebota byla odlišná od běžného prohlížeče.

Google tak nemá problém s:

  - přesměrováním pomocí JavaScriptu,

  - dynamicky přidávaným obsahem (včetně AJAXu),

  - odkazy fungujícími pouze s JavaScriptem,

  - dynamickou změnou titulku stránky

Test věci, se kterými si Google poradí:

    - [We Tested How Googlebot Crawls Javascript And Here’s What We Learned](http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157)

## Seznam

Pokud je pro web zajímavá návštěvnost z vyhledávání na Seznamu, na weby funkčních pouze s JavaScriptem je lepší zapomenout.

Seznambot vlivy JavaScriptu a CSS na stránku při standardním indexování téměř ignoruje. Zeptal jsem se na to **Yuhůa**:

  Seznam momentálně javascript zpracovává málo. V plánu je rozšíření
indexování javascriptu, ale s dlouhým výhledem.
  
  To, co nyní děláme, se omezuje na některé typy jednoduchých
přesměrování. Jako že třeba jednoduše zapsané `location.replace` poznáme
a interpretujeme jako přesměrování.
  
  — **Yuhů**

Dynamický obsah přidaný na stránku skriptem tedy dohledatelný nebude.

Za jednu z dalších schopností Seznambota lehce související s indexováním AJAXových aplikací lze považovat podporu hashbangu (nejde ale o příliš doporučovaný postup):

    - [Indexace AJAX pomocí hashbang](http://napoveda.seznam.cz/cz/ajax-indexace/)

JavaScript a CSS svým způsobem plně interpretuje [Screenshotátor](/nahled-seznam) – zvláštní robot Seznamu sloužící ke snímání screenshotů stránek, které se potom zobrazují ve výsledcích hledání.

## Uživatelé

I v případě podpory JS ze strany všech relevantních vyhledávačů je vhodné brát ohledy na lidské návštěvníky.

JavaScript může v některých případech selhat nebo se nestihnout načíst a je hloupé, když kvůli tomu nebude dostupný textový obsah, který by se bez JS obešel.

Jistější postup tak je zobrazovat obsah co nejstabilnější cestou (HTML) a JavaScriptem řešit jen rozšiřující funkce, co nejsou úplně kritické.

Více v článku:

    - [Má web fungovat bez JavaScriptu?](/bez-javascriptu)