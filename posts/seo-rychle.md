---
title: "8 rad, jak rychle zlepšit SEO"
headline: "Rychlé zlepšení SEO"
description: "Jak co nejrychleji upravit stránku, aby měla lepší výsledky ve vyhledávání."
date: "2015-05-06"
last_modification: "2015-11-26"
status: 1
tags: ["SEO", "Rady a nápady"]
---

Obecně je **optimalisace pro vyhledávače** ([SEO](/seo)) běh na dlouhou trať (řádově měsíce a víc), přesto existují některé věci, které jde udělat prakticky okamžitě a **dlouhodobě zlepší posici webu ve vyhledávačích** i použitelnost pro návštěvníky.

## Oprava rozbitých odkazů

Je možné, že na webu proběhla **změna URL** a starý tvar se správně nepřesměroval na nový. Na web tudíž míří odkazy, které zbytečně končí **chybou 404**.

Případně odkazy na neexistující stránky mohly vzniknout překlepem nebo byla cílová stránka odkazu smazána.

Odhalit nefunkční odkazy jde programem [Xenu's Link Sleuth](http://home.snafu.de/tilman/xenulink.html):

    - [Kontrola funkčnosti odkazů](/odkaz#funkcnost) – návod k použití **Xenu** pro prověření odkazů na webu

**Xenu** upozorní na nefunkční **interní odkazy** (v rámci vlastního webu). Jde zjistit i nefunkční odkazy pryč z webu – i takové je dobré opravit, protože nefunkční externí odkazy mohou snižovat hodnotu stránky: vyhledávač nechce posílat hledající na stránky, které se odkazují na jiné neexistující stránky.

Pro zjištění odkazů příchozích odkazů na neexistující stránky z **cizích webů**  jde použít nejlépe logování chybových stránek 404. A následně zajistit přesměrování, je-li kam.

## Zrychlení webu

Pokud se po přechodu na stránku její obsah **dlouho načítá**, může návštěvníkovi dojít trpělivost. Z tohoto důvodu není v zájmu vyhledávače nabízet hledajícím lidem **pomalé stránky**.

Rychlé opuštění webu kvůli dlouhému načítání a návrat na výsledky hledání navíc zvýší **míru okamžitého opuštění**. Vyhledávač tak může dát příště přednost jiným výsledkům, z kterých lidé neutíkají.

Více o rychlosti a její vliv na vyhledávače je v samostatném článku:

    - [Vliv rychlosti webu na SEO](/seo-rychlost) + popis největších zabijáků rychlosti webu

Nástroje pro testování rychlosti jsou uvedeny zde: 

    - Nástroje pro kontrolu a analysování stránky: [Rychlost a odezva stránky](/kontrola-stranky#rychlost)

## Optimalisace pro mobilní zařízení

Při **vyhledávání z mobilů a tabletů** vyhledávač [Google](/google) upřednostňuje stránky, které se na mobilních zařízeních dobře zobrazují.

Proto se hodí opravit [chyby v použitelnosti na mobilech](/oprava-chyb-pouzitelnosti).

## Titulky a popisy

**Vybudovat kvalitní obsah**, co bude přivádět relevantní návštěvníky, zpravidla nejde přes noc.

Pokud ale web nemá tisíce podstránek, dá se si celkem rychle pohrát s **názvy stránek** (obsahem zázračné SEO značky `&lt;title>`).

    - Jak psát web: [Zázračný SEO html tag](http://www.jakpsatweb.cz/seo/zazracny-tag-title.html)

Slova v titulku berou vyhledávače jako **hodně významná**. Kromě toho se objevují ve **výsledcích hledání** (SERPu – *Search engine results page*), a to má značný vliv na míru prokliku.

Kromě titulku se v SERPu objevuje i úryvek stránky nebo její **popis** ze značky `&lt;meta>` description, pokud popisek dobře odpovídá vyhledanému dotazu.

Do HTML kódu se popisek pro zobrazení ve vyhledávači zadá následovně:

```
&lt;meta name="description" content="Popis stránky">
```

## Struktura obsahu

Obsah stránky je pro přehlednost dobré strukturovat. Text by měl být minimálně rozdělený do [odstavců](/odstavec) (HTML značka `&lt;p>`), jednotlivé bloky je dobré vyznačit [nadpisy](/nadpisy) (`&lt;h1>`, `&lt;h2>`, `&lt;h3>` apod.), hodí se i číslované, nečíslované a jiné [seznamy](/seznamy).

U delší stránek pomůže vytvořit [obsah](/toc) (*table of contents*) odkazující na jednotlivé části pomocí #kotev. Vyhledávač [Seznam](/seznam) je potom přidává do úryvku ve výsledcích hledání pod název stránky:

## Interní prolinkování

Aby vyhledávač stránku **zaindexoval**, musí na ni odněkud vést odkaz (nebo být uvedena v [souboru `sitemap.xml`](/sitemap) či [ručně přidána](/pridat-url)).

Ideální je tedy na každou stránku odkázat z vlastního webu. Kromě **umístění odkazů do navigace** je dobré se odkazovat na ostatní stránky i v textu (pokud to dává smysl). Vyhledávač z toho může lépe pochopit důležitost a vztahy mezi stránkami.

## Popisky obrázků

Zdroj návštěvnosti je i **vyhledávání obrázků**. Když už si dá člověk práci s tvorbou vlastních obrázku nebo fotografií, je dobré jim vyplnit popisek do atributu `alt`, aby vyhledávač lépe věděl, co na obrázku je.

    - [Popis obrázku](/popis-obrazku) – různé způsoby, jak přidat obrázku popisek

## Odstranění nekalých praktik

Je možné, že se na stránce vyskytují zakázané prvky, které mají za cíl **oklamat vyhledávač**. Jde těžko rozpoznat, jestli takové prvky aktuálně **škodí, pomáhají nebo mají neutrální efekt**.

Pro dlouhodobé **stabilní umístění ve vyhledávačích** se je dobré těmto praktikám vyhnout, protože dřív nebo později je vyhledávače nejspíš **dokáží rozpoznat**.

Jedná se třeba o:

### Skrytý text

Do stránky se vloží po obsahové stránce téměř nečitelný text **nahuštěný klíčovými slovy**, který se **pomocí CSS skryje**. Uživatel ho tak neuvidí, protože jinak by stránku jako podezřelou opustil.

V zájmu vyhledávače není návštěvníky posílat na stránky, kde se hledaný obsah ve viditelné podobě nezobrazuje. Stránce se **skrytým obsahem** se tedy nabízí snížit váhu.

### Nesmyslné přeplnění klíčovými slovy

Na základě této praktiky vznikla variace vtipu o příchodu do baru:

  SEO konzultant přijde do baru, hospody, pivnice, restaurace, restaurace praha…

Ve snaze vměstnat do textu potřebná slovní spojení se často dojde do stavu, kdy je text **špatně čitelný pro lidi**.

Anglicky se tato technika nazývá *keyword stuffing* (vycpávka klíčovými slovy). Vypadá to nějak takto:

  Prodáváme luxusní doutníkové humidory. Naše luxusní doutníkové humidory se vyrábějí výhradně ručně. Pokud uvažujete o koupi luxusního doutníkového humidoru, kontaktujte našeho specialistu na luxusní doutníkové humidory na adrese luxusni.doutnikove.humidory@example.cz.

  Nápověda Google pro webmastery: [Tapetování klíčovými slovy](https://support.google.com/webmasters/answer/66358?hl=cs)

### Duplicitní obsah

Jedná se o případ, kdy se vytvoří kopie stránky se **zaměněním hlavního klíčového slova**.

Člověk prodávající fytopufy v celé ČR si vytvoří weby na doménách `fytopufy-praha.cz`, `fytopufy-kolin.cz`, `fytopufy-plzen.cz` a podobně. Tyto weby se potom obsahově liší jen tím, že je v textech nahrazené jméno města/vesnice.

### Automaticky generovaný obsah

Podobnou věcí jako duplicity je i automatické generování obsahu. Protože vytvořit kvalitní obsah je hodně nákladné, vytvoří se místo toho skript, který bude vytěžovat obsah z různých zdrojů a lepit to dohromady.

## Odkazy jinam

  - Sitepoint: [Improve SEO Ranking in 24 Hours](http://www.sitepoint.com/improve-seo-ranking/) – jak zlepšit web po technické stránce s ohledem na SEO

  - Backlinko: [Google Ranking Factors](http://backlinko.com/google-ranking-factors) – seznam 200 faktorů, které mohou mít vliv na umístění ve vyhledávači

  - Northcutt: [Google Ranking Factors: 260+ Facts &amp; Myths](https://northcutt.com/wr/google-ranking-factors/) – přehled hodnoticích faktorů s rozlišením jejich vlivu