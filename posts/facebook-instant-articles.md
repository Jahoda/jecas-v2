---
title: "Jak na Facebook Instant Articles"
headline: "Jak na Facebook Instant Articles"
description: "Instant Articles je technologie pro rychlé zobrazování obsahu na Facebooku. Jak začít?"
date: "2016-04-18"
last_modification: "2016-04-19"
status: 1
tags: ["Facebook", "Zrychlování webu"]
---

Vzhledem k tomu, že na špatném mobilním připojení mohou být běžné webové stránky pomalé, vznikají pokusy o nabídnutí obsahu co možná nejrychleji.

[Google](/google) přišel s technologií [AMP HTML](/amp-html).  Pokus o rychlé zobrazování obsahu od Facebooku se potom jmenuje **Instant Articles**:

    - [Instant Articles](https://developers.facebook.com/docs/instant-articles) – oficiální dokumentace

## Jak začít

Nejprve je nutné *okamžité články* [povolit](https://www.facebook.com/instant_articles/signup) pro danou Facebook stránku:

Tím se odkryje možnost v nastavení Facebook stránky:

V nastavení je potom krok za krokem popsán postup, jak instantních článku docílit.

## Požadavky

Je nutné prokázat vlastnictví stránky přidáním `&lt;meta>` značky do jejího kódu.

Na rozdíl od AMP se obsah článků při použití Instant Articles ukládá na servery Facebooku. Načíst nové články jde asi nejsnadněji pomocí RSS. Jde použít i Facebook API.

### RSS zdroj pro Instant Articles

Oproti standardnímu RSS zdroji vyžadují Instant Articles navíc plný obsah článku ve značce `&lt;content:encoded>`. Je k tomu nutné použít obal pomocí CDATA.

Jeden článek v RSS zdroji vhodný pro IA tak bude vypadat třeba následovně:

```
&lt;item>
  &lt;title>Odkaz pro poslání SMS&lt;/title>
  &lt;link>http://jecas.cz/sms-odkaz&lt;/link>
  &lt;guid>http://jecas.cz/sms-odkaz&lt;/guid>
  &lt;description>Jak dát na stránku odkaz pro předvyplnění SMS.&lt;/description>
  **&lt;content:encoded>**
    &lt;![CDATA[
      Obsah &lt;b>včetně&lt;/b> HTML značek.
    ]]>
  &lt;/content:encoded>
  &lt;pubDate>2016-04-05T07:29:07+0200&lt;/pubDate>
  &lt;author>Bohumil Jahoda&lt;/author>
&lt;/item>
```

Povinné jsou pouze prvky `&lt;title>`, `&lt;link>` a `&lt;/content:encoded>`.

    - [Publishing Through Your RSS feed](https://developers.facebook.com/docs/instant-articles/publishing/setup-rss-feed)

Dále je kvůli značce `&lt;content>` potřeba do elementu `&lt;rss>` přidat odkaz na jmenný prostor:

```
&lt;rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/">
```

Úpravy pro použití na Facebooku mohou způsobit, že RSS zdroj bude nevalidní.

    - [Feed Validation Service](https://validator.w3.org/feed/) – validátor RSS zdrojů

Například nebude vyhovovat formát značky `&lt;author>`. Značka `&lt;pubDate>` potom vyžaduje datum ve formátu *ISO-8601* místo *RFC-822*.

Při použití [Nette](/nette) a šablonovacího systému Latte jde požadované datum vypsat následovně:

```
&lt;pubDate>
  {$datumClanku|date:'Y-m-d\\TH:i:sO'}
&lt;/pubDate>
```

Zdá se tedy výhodnější vytvořit speciální variantu RSS jen pro Facebook.

Do RSS se také dostane plný obsah příspěvku. Pokud to vadí, jde přidat i HTTP ověření, aby plný obsah z RSS nemohl stahovat někdo nepovolaný.

Po přidání RSS zdroje s články by se jejich obsah měl za chvíli načíst.

Je možné mít ještě jeden *Development* zdroj určený pro testování funkčnosti.

### Logo

Logo je jedinou věcí, kterou je třeba upravit ve stylech Instant Articles. Musí se nahrát [PNG obrázek](/format-obrazku#png) o rozměrech 690 × 132 pixelů a víc.

Jinak jde vzhled článku omezeně upravovat v editoru na Facebooku (zejména barva písma).

## Kontrola článků

Prohlédnout si naimportované články potom jde na stránce *Publishing Tools → Instant Articles*:

V případě problémů s články se zobrazuje žlutý vykřičník. Při zvolení editace jsou chyby znázorněny a popsány.

### Pravidla pro obsah článku

Je možné, že obsah produkovaný pro běžnou HTML stránku nebude pro Instant Articles vyhovovat. Následuje popis některých problémů, které je třeba řešit.

    Všechny **[odkazy](/odkaz) musí být absolutní**. Tedy:

    ```
&lt;a href="/jiny-clanek">
```

    Nahradit na:

    ```
&lt;a href="**http://example.com**/jiny-clanek">
```

    Totéž platí pro HTML #kotvy.

    [**Nadpisy**](/nadpisy) mohou být pouze o úrovních `&lt;h1>` a `&lt;h2>`.

    U běžných stránek bývá obvyklé, že `&lt;h1>` je název článku a nižší nadpisy značí podnadpisy. V Instant Articles je hlavní nadpis v části `&lt;header>`, takže se nabízí všechny úrovně o jednu posunout.

    V kódu by neměly být prázdné elementy. To platí i pro obrázky obalené do odstavce:

    ```
&lt;p>&lt;img src="obrazek.png">&lt;/p>
```

    Cílové obrázky vložené značkou `&lt;img>` musí existovat (nesmí vracet chybu 404 apod.).

    Obrázky musí být obaleny značkou [`&lt;figure>`](/popis-obrazku#figure). Nemohou volně ležet v obsahu. Ideálně by měly mít i popisek v `&lt;figcaption>`.

    HTML [seznamy](/seznamy) mohou obsahovat pouze nadpisy a odstavce. Každá položka seznamu je omezena na maximálně jeden element.

    Není tedy možné do jednoho `&lt;li>` vložit dva odstavce, není možné zanořit více seznamů do sebe a není možné v seznamech používat obrázky.

    Není možné používat značku [`&lt;svg>`](/svg).

U stránek s pokročilejším formátováním tak příprava pro Instant Articles dá nějakou práci.

### Schválení

Aby mohl být obsah dostupný přes IA, musí se nejprve nahrát alespoň 10 článků, které musí být ručně schváleny. Má to trvat jednotky dní.

## Závěr

Okamžité články jde zatím z pohledu **konsumenta obsahu** používat jen v posledních versích Facebook aplikace pro iOS a Android.

U AMP platí, že nejrychlejší stránku je možné udělat bez AMP. V případě Instant Articles je situace trochu jiná, protože obsah článků je **uložen na serveru Facebooku**, čímž se minimálně ušetří doba potřebná k navázání spojení s novou doménou.

Navázání okamžitých článků na nativní FB aplikaci přináší značnou výhodu díky tomu, že při kliknutí na odkaz není nutné přeskakovat do prohlížeče a potom se složitě přepínat zpátky.