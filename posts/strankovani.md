---
title: "Stránkování"
headline: "Stránkování"
description: "Jak správně řešit stránkování na webové stránce."
date: "2014-09-30"
last_modification: "2016-02-25"
status: 1
tags: ["SEO", "Rady a nápady", "Responsivní design"]
---

V případě, že je na stránce hodně obsahu, obvykle se používá **stránkování**. Na jedné HTML stránce tak nejsou stovky položek, ale třeba jen 20 s tím, že na následující položky vedou **stránkovací odkazy**.

Typicky stránkování vypadá nějak následovně (ukázka pochází z výsledků hledání na [Seznamu](/seznam)):

## Proč stránkovat

Hlavním smyslem dělení obsahu na jednotlivé stránky je:

  - **nezahltit návštěvníka** hromadou obsahu,

  - udržet stránku v **rozumné datové velikosti**

Podle těchto bodů by se měl odvíjet **počet položek na stránku**.

### Články na více stránkách

Některé weby dělí na více stránek dokonce i **články**. To je zpravidla pro návštěvníky obtěžující, zvlášť v případě, že načítání není bleskurychlé.

Cílem tohoto nešťastného počínání je typicky snaha provozovatele webu **získat více *impresí*** reklam (počet zobrazení), které jsou na webu umístěny.

Reklamní bannery se někdy prodávají na základě stanoveného počtu zobrazení, které jde tímto kouskováním obsahu navýšit.

## Proč nepoužívat stránkování

  Cílem by mělo být, aby návštěvníci stránkování nepotřebovali.

Pro uživatele bývá zpravidla výhodnější, když není **zavalen stovkami položek**, ze kterých si má vybírat.

Ideální je tedy nabídnout **kvalitní filtrování obsahu**, čímž jde zúžit obsah, který se má zobrazit. Bývá lepší zobrazit pár hodně relevantních záznamů, než nutit uživatele, aby se přehraboval stovkami méně relevantními.

## Číselné stránkování

Používat pro stránkování čísla je většinou ta nejpoužívanější, nejsnazší ale zároveň **nejhorší** možnost.

Proč?

Čísla symbolisující jednotlivé stránky zpravidla nenesou žádnou informaci.

Uživatel nebude vědět, že se potřebuje dostat na stranu 508, 464 nebo 713.

## Stránkování podle časového období

U **chronologicky řazených** položek se nabízí použít **kalendář** – tj. vyfiltrovat záznamy z určitého časového období.

Mít tedy místo stránek „1“, „2“, „3“ a podobně stránky například „leden 2016“, „únor 2016“ a tak dál.

Problém **stránkování podle časového období** je ale zase v tom, že nezajišťuje **rovnoměrné rozdělení**.

Půjde-li o stránkování archivu blogu, kde jede měsíc přibude 100 článků a druhý měsíc článek jen jeden, bude ve stránkování značný nepoměr.

## Ovládací prvky stránkování

Klasické stránkování jde zpravidla rozdělit na následující části:

  - Odkazy pro **další a předchozí** stánku.

  - Odkazy pro **první a poslední** stránku.

  - **Čísla** jednotlivých stránek.

Protože většina stránkování je na internetu udělaná tak, že se obsah postupně přelévá mezi stránkami – tj. **nový obsah odsouvá ten starý na další stránky**, není moc použitelné volit stránky podle jednotlivých čísel.

  Co bylo dnes na straně 8, může být za týden na straně 18.

Pro ovládání stránkování jsou tak nejdůležitější **odkazy *Předchozí* a *Další***.

Z toho plyne, že tyto odkazy by měly být dostatečně velké; **větší než čísla stránek**. Mít stránkování representované pouze pomocí šipek &laquo; a &raquo;, ← a → nebo &lt; a &gt;, tak nemusí být úplně šťastné řešení.

Nabízí se tedy připsat slova *Zpět*/*Vpřed* a podobně.

U stránkování se také občas hodí možnost pro **návrat na první stranu**. V případě, že by si návštěvník chtěl procházet obsah *odzadu*, ocení naopak ještě tlačítko na **poslední stranu**.

Odkazy na začátek/konec se zpravidla realisují prostřednictvím čísel stránek, kdy odkazy na stranu 1 a na stranu poslední jsou neustále vypsány.

V praxi to může vypadat nějak takto:

### Držení posice

Při vytváření ovládacích tlačítek pro *Předchozí* a *Další* stránku je dobré myslet na to, aby tyto odkazy stále **držely svou posici**.

Jak je vidět na následující animaci, zobrazení původně neviditelného tlačítka *Prev* způsobí posunutí tlačítka *Next*.

Nejjednodušší řešení je vypisovat odkaz pro předchozí stranu i na první straně. A buď  ho skrýt pomocí CSS, aby stále zabíralo prostor (`visibility: hidden`), nebo mu změnit styl, aby vypadalo jako neaktivní – třeba pomocí [průhlednosti](/opacity).

  &laquo; Předchozí
  [1](#)
  [2](#)
  [3](#)
  [&raquo; Další](#)

## Responsivní stránkování

V době používání webů ze zařízení s různě velkou obrazovkou je nutné, aby se stránkování dokázalo **přizpůsobovat různému prostoru**, který pro něj bude dostupný.

Pro klasické stránkování s odkazy „Předchozí“/„Další“ i čísly stránek je asi nejlepší použít CSS [tabulkové hodnoty](/display#tabulkove) vlastnosti [`display`](/display#tabulkove) a některé položky v [`@media` pravidlu](/media) skrýt:

[Živá ukázka](http://kod.djpw.cz/mbpb)

Kvůli nedostatku místa se obvykle klasická podoba stránkování musí redukovat. To ve finále znamená ponechat třeba jen tlačítka předchozí a další.

Případně zobrazit pouze tlačítko typu „Zobrazit dalších 20 záznamů“.

## Nekonečné načítání dalších položek

Pro zjednodušení zobrazení dalších položek, když už návštěvník všechny projel, bývá k vidění technika, která **donekonečna donačítává další obsah** s ohledem na to, jak návštěvník roluje stránkou.

Výhoda je zřejmá – prosté odrolování bývá pro uživatele snazší než kliknutí na odkaz *Další*, takže uživatel typicky uvidí více obsahu.

Tato technika má ale i své nevýhody.

    Není možné mít na stránce s nekonečným rolováním **patičku** pod obsahem. Ta by logicky nebyla rozumně dosažitelná.

    Pokud se do stránky stále přidává nový obsah a žádný předchozí se nemaže, může být po načtení hromady položek stránka **výkonově náročná**.

    Často je problém po opuštění stránky s načteným množstvím položek, použít funkci *Zpět*. Většina realisací nekonečného rolování potom není schopna zobrazit obsah, který člověk předtím viděl.

    Uživatelé mají na základě této zkušenosti **nižší ochotu klikat** na položky přidané *nekonečným rolováním*.

## Stránkování a SEO

Špatně udělané stránkování je z **pohledu vyhledávačů problematické**. Bohužel špatně udělané stránkování má drtivá většina webových stránek – včetně těch používajících třeba populární redakční systém [WordPress](/wordpress).

Špatně udělané stránkování se projevuje tím, že se na jednotlivých URL **mění obsah**.

### Příklad

První strana je na adrese:

```
example.com
```

Po kliknutí na *Další* se přejde na URL typu:

```
example.com/**page/2/**
```

Problém ze [SEO](/seo) pohledu je v tom, že po přidání nové položky na první stranu, se ty starší odsunou dále, což je **přemístí na jiné URL**. Poslední položka první strany se dostane na první místo stránky druhé a podobně.

  Na často se měnící stránkování nemá cenu uživatele posílat, protože tam stejně už pravděpodobně nenajde to, co tam bylo.

  Dušan Janovský, [O fulltextovém vyhledávání na Seznam.cz](http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/)

Pro vyhledávač je tedy složité zajistit, aby se mezi **zaindexováním** a zobrazením ve **výsledcích hledání** nezměnil obsah. Hrozí, že návštěvník klikne na výsledek vedoucí na stranu 3, ale vlivem přidání nového obsahu už na ní hledaný obsah nebude. To vypadá jako chyba vyhledávače, což není v jeho zájmu, takže takové **stránky nemá příliš rád**.

Dobře udělané stránkování by tedy mělo zobrazovat nejstarší obsah na URL s „`page=1`“ a nové položky přidávat na nové adresy.

### Stránkování od konce

Pro vyhledávač správně udělané stránkování by mělo zajistit, že na jednotlivých stránkách bude stále stejný obsah. Tedy jednotlivé položky se nebudou přelévat napříč různými URL.

Postup, kterým stránkování s pokud možno zachováním stejného obsahu na URL může fungovat, popsal v komentářích **Yuhů**:

  Kdysi jsme to na Novinkách dělali tak, že archivní stránky měly deset položek, titulka taky deset a nejmladší archivní 7 až 16 položek. Ve chvíli, kdy se na nejmladší archivní chtěla přidat sedmnáctá položka, se vytvořila nová archivní se sedmi položkami, přičemž šest se přeneslo z té předchozí, kde se v tu chvíli smazaly. Podle mě nejlepší ze špatných řešení.

### Zákaz indexování

V ohlasech na tento článek zazněly názory, že je zbytečné, aby stránkovaný obsah vyhledávač indexoval.

  Odpověď je `robots=noindex,follow` na všechny další stránky ve stránkování kromě první.

  — Jan Tichý na [Twitteru](https://twitter.com/jantichy/status/703160014060392448)

V případě špatně udělaného stránkování a hodně četného přidávání obsahu, kdy je ve finále obsah jednotlivých stránek stejně nestálý, jde celkem universálně souhlasit.

Při dobře udělaném stránkování (se stálým obsahem) mohou ale vzniknout potenciálně **zajímavé stránky**, kam má smysl, aby návštěvníci z vyhledávání chodili.

Příkladem mohou být komentáře rozdělené do více stránek. Stejně tak x-tá stránka výpisu seznamu článků/produktů může nabízet kombinaci obsahu zajímavější než detail konkrétního článku/produktu a přivést tak na web návštěvníky z vyhledávání.

Risikem ale nejspíš může být **duplicita** v situaci, kdy se například hodnotný popis kategorie bude vyskytovat na všech stránkách.

### Atribut `rel="prev/next"`

Strojově čitelně jde odkazy na předchozí/další stranu označit [atributem `rel`](/odkaz#rel) pro odkaz `&lt;a>`.

Stejně tak jde předchozí a další stránku uvést `&lt;link>` značkou v [hlavičce](/html-kostra#head). Někteří návštěvníci mohou mít prohlížeč (či rozšíření), které tyto značky umí využít a usnadnit tak navigaci.

## Odkazy jinam

  - CSS Tricks: [Thoughts on Pagination](http://css-tricks.com/thoughts-pagination/)

  - Sitepoint: [Pagination and SEO: Red Flags and Best Practices](http://www.sitepoint.com/pagination-seo-red-flags-best-practices/)