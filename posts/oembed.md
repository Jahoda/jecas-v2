---
title: "Získání obsahu stránky přes oEmbed"
headline: "Získání obsahu stránky přes oEmbed"
description: "Formát oEmbed slouží k pohodlnému získání obsahu stránky bez nutnosti jejího parsování."
date: "2015-12-13"
last_modification: "2015-12-14"
status: 1
tags: ["Hotová řešení", "PHP", "Získávání obsahu"]
---

Při vkládání odkazů uživateli (typicky do komentářů, příspěvků v diskusních fórech nebo na sociálních sítí) už se v dnešní době málokdo spokojí s prostým odkazem.

Lepší je něco takového:

Pokud se má na odkazující stránce zobrazit náhled odkazu, musí se odkazovaná stránka stáhnout.

    - [Získání obsahu cizí stránky](/stazeni-stranky) – jak v PHP a JavaScriptu získat obsah z cizí webové stránky

Tímto postupem se získá pouze HTML kód, ze kterého je nutné následně vyzobat potřebný obsah.

## Získání titulku stránky v PHP

Například titulek stránky jde v [PHP](/php) získat několika způsoby:

### Regulární výrazy

```
$page = file_get_contents("**http://example.com**");
preg_match("/&lt;title>(.*)&lt;\/title>/i", $page, $matches);
echo $matches[1];
```

### Práce s DOMem

Nebo funkcemi pro práci s HTML [DOMem](/dom).

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('**http://example.com**');
$title = $dokument->getElementsByTagName('title');
echo $title->item(0)->nodeValue;
```

Nebo s využitím XPath:

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('**http://example.com**');
$xpath = new DOMXPath($dokument);
echo $xpath->query('//title')->item(0)->nodeValue;
```

Obdobným způsobem by šlo ze stránky dostávat i další věci.

### Open Graph

```
&lt;meta property="og:title" content="Titulek">
```

Pro lepší podobu sdílení odkazu na sociálních sítích obsahuje řada webů tzv. *og:* meta tagy*, kde je typicky uveden titulek, popisek a obrázek článku.

    - [The Open Graph protocol](http://ogp.me/)

Příklad použití `&lt;meta>` značek pro zobrazení náhledu odkazu:

    - [Náhled odkazu na Twitteru a Facebooku](/nahled-twitter)

Získání obsahu z `og:` značek může být spolehlivější než z obecných HTML značek.

V PHP existuje funkce `get_meta_tags`, ale zrovna s `&lt;meta property>`, které Open Graph používá, si neporadí. Nejsnazší je asi použít XPath:

```
$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://jecas.cz');
$xpath = new DOMXPath($dokument);
$ogTitle = $xpath->query("**//meta[@property='og:title']**")->item(0);
echo $ogTitle->getAttribute("content");
```

## Formát oEmbed

Parsování uvedené výše má řadu problémů:

    **Stahuje se zbytečně více dat**, než by stačilo. Pro získání jedné značky `&lt;title>` se stahuje úplně celá HTML stránka.

    Zvlášť v případě pokročilejšího parsování je regulární výraz velmi **citlivý na změnu cílové stránky** a snadno tak přestane fungovat.

Formát oEmbed se tyto problémy snaží řešit universálním API pro nabízení embedovaného obsahu.

    - [oEmbed](http://oembed.com/) – stránka projektu

Podporované služby potom nabízí tzv. *endpoint*, kam se pošle adresa, pro kterou je třeba získat obsah a ta ho vrátí:

### Získání YouTube videa

Celou URL stránky s videem stačí poslat na endpoint:

```
http://www.youtube.com/oembed?url=**https://www.youtube.com/watch?v=6HT-yirOGoo**
```

A ten vrátí následující [JSON](/json).

```
{  
   "type":"video",
   "thumbnail_width":480,
   "provider_name":"YouTube",
   "title":"Responsivn\u00ed navigace",
   "thumbnail_height":360,
   "provider_url":"https:\/\/www.youtube.com\/",
   "version":"1.0",
   "height":270,
   "author_name":"Bohumil Jahoda",
   "html":"\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/6HT-yirOGoo?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e",
   "author_url":"https:\/\/www.youtube.com\/user\/bohumiljahoda",
   "width":480,
   "thumbnail_url":"https:\/\/i.ytimg.com\/vi\/6HT-yirOGoo\/hqdefault.jpg"
}
```

Jak je vidět v JSONu, k disposici je i HTML kód pro vložení videa přímo do stránky.

Na stránce oEmbed je seznam služeb, které tento formát podporují.

    - [providers.json](http://oembed.com/providers.json) – seznam dostupných zdrojů

Mezi zdroji je kromě YouTube, třeba i Instagram, SoundCloud nebo Flickr.

[Facebook](/facebook) tam chybí, ačkoliv oEmbed endpointem disponuje:

    - [Facebook: oEmbed Endpoints for Embeddable Facebook Content](https://developers.facebook.com/docs/plugins/oembed-endpoints)

Stejně tak [Twitter](/twitter), který ale vyžaduje ID aplikace: 

    - [Twitter GET statuses/oembed](https://dev.twitter.com/rest/reference/get/statuses/oembed)

## WordPress

V redakčním systému [WordPress](/wordpress) se je možné s použitím této techniky embedování setkat při psaní příspěvků. Vložené URL u známých služeb jsou automaticky nahrazeny příslušným obsahem.

    - [WordPress Codex: Embeds](https://codex.wordpress.org/Embeds)

## Noembed

Pro embedování obsahu ze zdrojů, které nejsou na stránce oEmbed, je možné použít Noembed.

    - [Noembed](http://www.noembed.com/) — oEmbed everything

Výsledek dokáže vracet i ve formátu [JSONP](/ajax#jsonp), takže ani není nutné výstup z endpointu zpracovávat vlastním serverem, ale vše se může odehrávat v JavaScriptu.

Po vložení URL ze schránky (Ctrl + V) do následujícího pole by se u známých služeb měl zobrazit výsledek:

    function noembed(url) {
      var endpoint = 'http://noembed.com/embed?url=' + url + '&callback=vypsat';
      var skript = document.createElement("script");
      skript.src = endpoint;
      document.body.appendChild(skript);
    }
    function vypsat(data) {
      document.getElementById("vystup").innerHTML = data.html;
    }
  
  Vložit URL: