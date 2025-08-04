---
title: "Vložení sitemap na Seznam a Google"
headline: "Jak přidat sitemapu do Seznamu a Google"
description: "Mapu webu v souboru <code>sitemap.xml</code> je vhodné přidat do Googlu, Seznamu nebo Bingu. Jak na to?"
date: "2014-10-16"
last_modification: "2015-12-26"
status: 1
tags: ["SEO", "Seznam", "Google", "Bing"]
---

V případě rozsáhlejšího webu se hodí vytvořit jeho **strojově čitelnou mapu** – tzv. soubor sitemap.

## Proč mapu webu vytvářet

*Sitemapa* není rozhodně nezbytná součást webu. Může se ale hodit pro **usnadnění procházení webu vyhledávači**.

Normálně roboti vyhledávačů procházejí jednotlivé stránky a v kódu hledají [odkazy `&lt;a href>`](/odkaz) na další stránky, které by ještě mohly **zaindexovat**.

Vygenerovaná mapa webu `sitemap.xml` potom obsahuje strojově čitelný seznam všech adres webu – to může vyhledávači usnadnit **nacházení nových stránek** – pro objevení nových stránek stačí porovnat adresy v souboru `sitemap.xml`.

Mapa webu se hodí i v případě, kdy na všechny podstránky **nevedou odkazy** nebo jsou hodně *zahrabané* v struktuře webu. Ideální ale samozřejmě je se tomuto stavu vyhnout.

  Podle mých testů je v Googlu vyhledatelná i stránka, na kterou nevede žádný odkaz, ale je v `sitemap.xml`, u Seznamu ne.

## Co to je `sitemap.xml`?

Mapa webu je **XML soubor** obsahující primárně **adresy** jednotlivých stránek. Kromě URL jde uvést i další věci jako datum poslední úpravy, prioritu stránky nebo frekvenci četnosti změn.

Zpravidla se mapa webu nachází na adrese:

```
example.com/**sitemap.xml**
```

Ale není to podmínkou.

### Příklad sitemapy

Příklad jedné `&lt;url>` položky v mapě webu (všechny adresy se vkládají do nadřazené značky `&lt;urlset>`):

```
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  &lt;url>
    &lt;loc>http://jecas.cz/sitemap&lt;/loc>
    &lt;lastmod>2015-12-26T08:10:11+00:00&lt;/lastmod>
    &lt;changefreq>always&lt;/changefreq>
    &lt;priority>1.0&lt;/priority>
  &lt;/url>
&lt;/urlset>
```

### Musí se jmenovat `sitemap.xml`?

XML soubor s mapou webu může mít libovolné jméno nebo příponu. Používat `sitemap.xml` je jen zažitá konvence.

Mapu webu je klidně možné **dynamicky generovat** v [PHP](/php) a podobně – většinou se tak i děje, protože sestavovat stovky nebo tisíce položek ručně není reálné. Jen je potřeba souboru přidat hlavičku `Content-Type: application/xml`.

Je-li získání všech stránek časově náročné, je lepší mapu webu generovat do statického souboru při každé změně (přidávání/odebírání/upravování stránek).

## Maximální velikost mapy webu

Podle [specifikace](http://www.sitemaps.org/protocol.html#index) je omezení velikosti mapy webu následující:

  - Maximálně **50 000 URL**.

  - Datová velikost do **10 MB** před gzip kompresí. Google má datový limit 50 MB.

### Sitemap index

Pokud jeden nebo oba limity nestačí, je potřeba seznam adresy **rozdělit do více souborů**.

K tomu slouží tzv. *sitemapindex*. Do souboru `sitemap.xml` se neuvedou URL stránek ale odkazy na dílčí mapy webu. Ty jde různě rozdělit třeba podle měsíců:

```
&lt;sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  &lt;sitemap>
    &lt;loc>
      http://example.com/sitemap-2015-12.xml
    &lt;/loc>
  &lt;/sitemap>
&lt;/sitemapindex>
```

Odkazovaný soubor `sitemap-2015-12.xml` už potom obsahuje odkazy na stránky webu.

Sitemap index se může pro jistotu používat i pro menší počty URL.

## Sitemapa v `robots.txt`

Soubor `robots.txt` umožňuje předat pokyny robotům vyhledávačů, jde do něj i umístit odkaz na mapu webu:

```
Sitemap: http://example.com/**sitemap.xml**
```

## Vytvoření sitemapy ve Wordpressu

Pro redakční systém [WordPress](/wordpress) existuje plugin **Google XML Sitemaps**. Stránky v mapě webu rozděluje po měsících, dokáže po přidání nebo úpravě článku dát vědět Google nebo Bingu o změně. Zároveň přidává odkaz na *sitemap* do `robots.txt`.

    - [Google XML Sitemaps](https://wordpress.org/plugins/google-sitemap-generator/) – stránka pluginu na Wordpress.org

## Přidat sitemap na Seznam

Seznam nenabízí žádný **formulář pro vložení/načtení sitemapy** jako existuje třeba pro [ruční přidání URL](/pridat-url). Jediná možnost, jak ho informovat o vytvoření mapy webu, je uvést tuto informaci v souboru `robots.txt`:

Slouží k tomu prosté:

```
Sitemap: http://example.com/**sitemap.xml**
```

Doporučení ohledně **používání mapy webu na Seznamu**:

    - Seznam.cz nápověda: [Sitemaps](http://napoveda.seznam.cz/cz/sitemaps/)

## Google

Google má formulář pro nahrání mapy webu ve své službě pro webmastery **Search Console**.

    - [Google Search Console](https://www.google.com/webmasters/)

V *Procházení* → *Soubory Sitemap* je vpravo nahoře tlačítko *Přidat/otestovat soubor sitemap*:

    - Google Search Console Help: [Build a sitemap](https://support.google.com/webmasters/answer/183668?hl=en&amp;topic=8476)

## Bing

Vyhledávač **Bing** má podobně jako **Google** nástroje pro webmastery.

    - [Nástroje pro správce webů Bing](https://www.bing.com/webmaster)

Sitemapu jde přidat po vybrání webu v nabídce *Konfigurace mého webu* → *Soubory Sitemaps*:

## Jiné využití `sitemap.xml`

Kromě vyhledávačů může mapa webu posloužit i nástrojům pro vytěžování obsahu stránek. V mapě webu mají kompletní seznam všech URL webu na zlatém podnose.

## RSS vs. sitemap

Vyhledávače dokáží jako strojově čitelný zdroj obsahu použít i RSS/Atom exporty. Ty ale většinou kvůli úsporám přenášení dat obsahují pouze několik nejnovějších záznamů.

V `sitemap.xml` bývá seznam všech stránek.

## HTML mapa webu

Protože v XML souboru `sitemap.xml` si lidský návštěvník moc nepočte, některé weby obsahují mapy webu i v HTML podobě pro lidi.

Při určitém počtu stránek a stromové struktuře to může být užitečné. U webu se stovkami stránek a nejasnou hierarchií je asi pohodlnější způsob navigace **interní vyhledávání**.

## Odkazy jinam

  - Sitemaps.org: [Sitemaps XML format](http://www.sitemaps.org/protocol.html)

  - Wikipedie: [Sitemap](http://cs.wikipedia.org/wiki/Sitemap)