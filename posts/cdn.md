---
title: "K čemu slouží CDN?"
headline: "K čemu slouží CDN?"
description: "Má smysl používat pro připojení CSS a JS souborů CDN?"
date: "2016-01-23"
last_modification: "2016-02-08"
status: 1
tags: ["Zrychlování webu", "Hosting"]
---

CDN je zkratka anglického *Content delivery network*, česky tedy **síť pro doručování obsahu**.

V praxi to funguje tak, že požadovaná data nejsou umístěna jen na jednom serveru, ale jsou distribuována na více serverech po světě. Návštěvník, jehož prohlížeč začne požadovat určitý obsah, tak bude připojen na server, který *má blíž*.

Od získávání dat z blíže umístěného serveru se očekává lepší odezva a vyšší rychlost. Použít CDN je tak zajímavé hlavně pro weby, kam přistupují lidé z celého světa.

## Zrychlení odezvy

Takto vypadá odezva tohoto webu z různých částí světa (je hostovaný v ČR). Je vidět, že mimo Evropu a USA není rychlost odezvy ideální.

Pro testování rychlosti existují hotové nástroje:

    - Nástroje pro kontrolu stránky: [Rychlost a odezva](/kontrola-stranky#rychlost)

## Rozložení zátěže

Replikování obsahu na více serverů si lépe poradí s nárazovou vyšší návštěvností.

## Pohodlné použití

Připojit externí JS/CSS z CDN je nejspíš pohodlnější a rychlejší než stahování, kopírování a začleňování knihoven lokálně do projektu.

Pro rychlé testování se tak připojování skriptů z CDN hodí. Často se skripty z CDN připojují u různých online editorů pro psaní HTML/CSS/JS ukázek typu [kod.djpw.cz](http://kod.djpw.cz).

Prakticky každou známou knihovnu jde najít na CDN. Tvůrci tomu chodí hodně naproti, protože bez nabízení CDN si značná část lidí připojí knihovnu z umístění, které se používá jako ukázka dané knihovny na jejím webu, a při masovém používání to může být problém.

    - [cdnjs](https://cdnjs.com/libraries) – k vyhledání přes 1700 různých knihoven

    - [BootstrapCDN](https://www.bootstrapcdn.com/) – soubory populárního CSS frameworku

    - [jQuery CDN](https://code.jquery.com/) – CDN pro připojení jQuery

## Cacheování obsahu

Při tvorbě webů se někdy z CDN načítají hotové knihovny třetích stran jako třeba **jQuery**, CSS framework [Bootstrap](/bootstrap-rychlokurs), různé [lightbox skripty](/lightbox) a podobně.

Pro použití cizí knihovny ve vlastním projektu je připojení z CDN často pohodlnější než stahování a kopírování potřebných souborů.

**Idea kešování** je taková, že v případě, kdy by populární knihovny připojovali všichni ze stejné URL pomocí CDN, nemusely by se znovu a znovu stahovat na každém webu, ale už by je obsahovala *cache* prohlížeče.

Má to bohužel problémy:

## Nevýhody CDN pro CSS/JS

### Výpadek CDN

První nevýhoda je v tom, že při **výpadku CDN** se web špatně zobrazí (např. se nenačte CSS) nebo bude špatně fungovat (nenačte se JavaScript). Teoreticky může něco adresu z CDN na rozdíl od samotného webu zablokovat. To vede k obtížně vysvětlitelným chybám.

Připojováním externích souborů se zároveň ztíží **offline vývoj**. Jde-li web/aplikaci vyvíjet na [localhostu](/localhost), při výpadku internetu budou externí soubory logicky chybět.

### Spojení na další doménu

V případě, že člověk nemá požadovaný obsah z CDN už nakešovaný, **vytváření spojení na novou doménu** bude trvat déle než získání souboru ze stejné domény, odkud dorazil HTML kód.

### Různé verse knihoven

Napříč weby se používají **různé verse CSS/JS knihoven**, někdy i hodně staré, které si nikdo moc nedovolí updatovat na novější, protože není jasné, zda by se tím něco nerozbilo. Taktéž stejný soubor jde připojit z různých CDN. Úspora tedy nebude tak výrazná.

### Bezpečnost

Posledním probléme je **bezpečnost**. Připojením `*.js` souboru z cizí CDN se do webu dostane obsah, nad kterým nemá provozovatel kontrolu a může napáchat hodně škody, pokud ho někdo se zlými úmysly nežádoucím způsobem upraví.

Prohlížeče **Firefox 43**, **Chrome 45** a **Opera 32** ([aktuální podpora](http://caniuse.com/#feat=subresource-integrity)) zavedly podporu atributu `integrity`. Ten slouží k uvedení hashe pro ověření integrity obsahu CSS/JS souboru.

```
&lt;link 
href="https://examplecdn.com/bootstrap.min.css" 
rel="stylesheet" 
**integrity**="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw="
>
```

Prohlížeč v takovém případě musí před aplikováním připojeného CSS/JS spočítat jeho hash a porovnat ho s hodnotou atributu `integrity`. Pokud se neshodují, skript nebo styl se nesmí provést.

    - MDN: [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) – vysvětlení kontroly integrity

Ačkoliv se tento problém snaží prohlížeče řešit, spousta návštěvníků používá prohlížeče, které tuto ochranu nenabízejí.

Druhá věc je, že dle [principu holubníku](http://cs.wikipedia.org/wiki/Dirichletův_princip) musí teoreticky nastat případ, kdy pro různé soubory vyjde stejný hash.

### Zahrnutí knihoven do prohlížeče

Jako řešení by se mohlo zdát zahrnutí známých knihoven přímo do prohlížeče. Takové potenciální risiko ale výrobci prohlížečů nejspíš těžko podstoupí.

Myšlenku jednoho společného skriptu pro více webů ale razí [AMP HTML](/amp-html), kde je přímo vyžadováno připojení skriptu z dané CDN.

Pravděpodobnější scénář, který podporuje i vývoj v poslední letech, je zahrnutí vychytávek z populárních knihoven do HTML/CSS/JS specifikací.

## Odkazy jinam

  - Wikipedie: [Content delivery network](http://cs.wikipedia.org/wiki/Content_delivery_network)