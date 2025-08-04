---
title: "Strukturovaná data"
headline: "Strukturovaná data"
description: "Strukturovaná data slouží pro zlepšení čitelnosti HTML kódu pro roboty."
date: "2014-12-03"
last_modification: "2014-12-03"
status: 0
tags: []
---

Ačkoliv se roboti (zejména) vyhledávačů snaží stále zlepšovat své porozumnění obsahu HTML stránky, lze tomu trochu pomoci vhodným použitím HTML značek a právě **strukturovaných dat**. Kromě termínu *strukturovaná data* se je možné setkat i s označením *mikrodata*, dříve potom i s *mikroformáty* či zkratkou *RDFa*.

Dobře podporovaná varianta strukturovaných dat s hodně možnostmi je **schema.org**, na kterém se spolupodílí Microsoft, Google, Yahoo a ruský dominantní vyhledávač Yandex.

    - [Schema.org](http://www.schema.org/docs/schemas.html)

## Příklad

Pro vyznačení dat na stránce se používají 3 atributy:

  - `item**scope**` pro vyznačení *rámce* určitého typu dat,

  - `item**type**` pro určení typu dat v daném *scope*,

  - `item**prop**` pro označení konkrétních položek

### Příklad příspěvku na blogu

Budeme-li tedy chytít vyznačit obsah **příspěvku na blogu**, může to vypadat následovně:

```
&lt;div class="clanek" 
  itemscope 
  itemtype="[http://schema.org/BlogPosting](http://schema.org/BlogPosting)"
>
  &lt;h1 itemprop="name headline">Nadpis článku&lt;/h1>
  &lt;time datetime="2014-12-09" itemprop="datePublished">
    9. prosince 2014
  &lt;/time>
  &lt;div itemprop="articleBody">
  &lt;p>Obsah článku&lt;/p>
  &lt;/div>
&lt;/div>
```

## Výhody ve vyhledávačích

Podle slov na *schema.org* berou na **strukturovaná data** vyhledávače **Bing**, **Google**, **Yahoo!** a **Yandex** ohledy.

Jelikož tyto `item*` atributy jsou **skryté v HTML kódu** a běžný návštěvník je neuvidí, **ideální vyhledávač** by takovou stránku **neměl zvýhodňovat** oproti té, co tyto atributy nepoužívá.

V reálném světě ale mají vyhledávače k ideálu dost daleko, takže stránku používající strukturovaných dat mohou **zpracovat jinak**.

**John Mueller** z [Google](/google) připustil, že by do budoucna strukturovaná data mohla být jedním z hodnitících faktorů:

    - [Google: Structured Markup May Become A Ranking Factor](https://www.seroundtable.com/google-structured-markup-ranking-purposes-20885.html)

Stačí se podívat na stránku pomocí nástroje pro testování strukturovaných dat, kde je většinou vidět, že jednotlivé prvky stránky nejsou **určeny nejlépe**.

    - Google Developers: [Testing Tool](https://developers.google.com/webmasters/structured-data/testing-tool/)

    - Google Webmaster Tools: [Nástroj na testování strukturovaných dat](http://www.google.com/webmasters/tools/richsnippets)

## Odlišený vzhled ve vyhledávání

Hlavní lákadlo plynoucí z použití *schema.org* je ale nejspíš **odlišný vzhled** výsledků vyhledávání, kdy stránka používající mikrodata

## Odkazy jinam

  - [Sitelinks Search Box](http://www.blindfiveyearold.com/sitelinks-search-box)

  - [Jak získat více návštěvníků z vyhledávačů skrze strukturovaná data](http://www.tyinternety.cz/prirucka-marketera/jak-ziskat-vice-navstevniku-z-vyhledavacu-skrze-strukturovana-data/)

  - Search Console Help: [About Structured Data Markup Helper](https://support.google.com/webmasters/answer/3069489?hl=en)

  - GWT: [About microdata](https://support.google.com/webmasters/answer/176035)

  - GWT: [About rich snippets and structured data](https://support.google.com/webmasters/answer/99170)

  - GWT: [Structured data types](https://support.google.com/webmasters/topic/4599102)

  - Wikipedie: [Schema.org](http://en.wikipedia.org/wiki/Schema.org)

  - [Mikroformáty](http://microformats.org/)

  - Google: [Pomocník pro práci se značkami strukturovaných dat](https://www.google.com/webmasters/markup-helper/)

  - [Microdata Generator](http://microdatagenerator.org/) – generátor strukturovaných dat pro lokální firmy

  - Six Revisions: [Semantic HTML for Web Content](http://sixrevisions.com/html/semantic-html-web-content/)