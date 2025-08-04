---
title: "Rychlost"
headline: "Rychlost"
description: "Jak zrychlit načítání a vytvořit rychle se načítající stránku."
date: "2014-09-17"
last_modification: "2014-09-17"
status: 0
tags: []
---

## Jak funguje načítání stránky

Pro začátek je vhodné pochopit princip, kterým probíhá načítání stránky.

    Uživatel **zadá adresu domény** do prohlížeče a stiskne Enter. Nebo se na web proklikne.

    Pro danou doménu proběhne tzv. **DNS Lookup** (v překladu hledání v systému doménových jmen, DNS = *Domain Name System*), čímž se z doménového jména zjistí skutečné umístění serveru (IP adresa). To zabere nějaký čas. Výhoda je, že to stačí udělat **pouze jednou**. Potom se IP adresa domény **uloží do cache** a další požadavky i případné načítání dalších stránek DNS Lookup provádět nebude.

    Z toho plyne, že stahování obsahu z více domén znamená více *DNS Lookupů* a potenciální **zdržení stránky**.

    Toto zdržení jde minimalisovat pomocí HTTP hlavičky nebo `&lt;link>` značky  **preconnect**:

        - [Eliminating Roundtrips with Preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)

    Prohlížeč se pokusí s webovým serverem **navázat TCP spojení**. To zabere nějaký čas, protože je tzv. *trojcestné* (three-way handshake). Prohlížeč pošle požadavek na server, ten mu odpoví, prohlížeč odpoví serveru. To všechno pochopitelně bude mít nějakou **časovou prodlevu**.

        - Wikipedie: [Navázání a ukončení spojení v TCP](http://cs.wikipedia.org/wiki/Transmission_Control_Protocol#Nav.C3.A1z.C3.A1n.C3.AD_a_ukon.C4.8Den.C3.AD_spojen.C3.AD)

    Následně (po navázání spojení) konečně **webový server** (například [Apache](/localhost)) dostane HTTP požadavek a může začít připravovat obsah.

    Zde záleží na rychlosti serveru a rychlosti skriptů obsah připravující. Nejrychlejší odpověď bude typicky u **statických souborů** (statické HTML stránky, obrázky, styly, skripty).

    Obsah se následně začně **stahovat do prohlížeče**. Zde se projeví další vlastnost **TCP spojení** nazývaná [Slow-start](http://en.wikipedia.org/wiki/Slow-start). Ta slouží jako ochrana před zahlcením příjemce a funguje tak, že se začíná posílat pomalu a **postupně se zrychluje**.

    V praxi to znamená, že není možné ihned využít **maximální „rychlost“ připojení**, ale rychlost se musí *rozjet*. I tak ale typicky samotné **stažení souboru** netrvá nejdelší dobu celého požadavku. Většinu doby častěji zabere DNS Lookup, navázání spojení a připravení dat na serveru.

    **Velký datový objem** je tedy zpravidla problém pouze pro pomalá připojení, řekněme do  nízkých jednotek megabitů za sekund nebo pro uživatele s **datovým limitem**. Při rychlosti **nad 5 Mbs** už většinu času více zabere samotná režije s **HTTP požadavkem**.

    Příklad požadavku na hlavní stránku `jecas.cz`:

    Je tedy vidět, že TCP se hodí pro dlouhé přenosy velkého objemu dat, místo krátkých přenosů spousty malých souborů, což je případ použití na webové stránce. Jelikož každé spojení má poměrně **vysokou režii**, bývá vhodné jich potřebovat co nejméně.

    Když prohlížeč takto získá obsah stránky, začne v něm hledat **externí objekty**:

      - ikonu webu (*favicon*),

      - obrázky,

      - externí CSS,

      - externí JavaScript,

      - externí objekty (rámy, videa, pluginy a podobně)

    Každý z těchto prvků potom znamená další **HTTP požadavek**, načež externí prvky mohou způsobit zase další požadavky (obrázky v CSS, připojení dalších externích skriptů nebo stylů v JavaScriptu či kompletní načítání stránky v `&lt;iframe>`).

    Zde jde velmi rychle narazit na **limit souběžných HTTP připojení**, který čítá kolem 6 spojení k jedné doméně zároveň (**Firefox**, **Chrome**).

        - [Browserscope](http://www.browserscope.org/?category=network) – přehled maximálních počtů HTTP spojení

    To je další důvod pro minimalisaci jejich počtu. Protože další požadavky budou muset čekat na odbavení těch předchozích.

    Jak se začne do prohlížeče **stahovat obsah**, začne se zpracovávat a [vykreslovat stránka](/vykreslovani).

    Zde hraje roli taková nepěkná věc, kterou je **blokování vykreslování**. Prohlížeče čekají na externí styly a skripty v hlavičce stránky (`&lt;head>`).

    Na CSS se čeká proto, že v opačném případě by musel prohlížeč stránku **vykreslovat vícekrát**. Nejdříve bez stylů, potom se styly (případě ještě v nějakém mezistavu s částečně načtenými styly).

    Pokud je CSS soubor větší nebo zkrátka chceme mít načítání co možná nejrychlejší, řešení je **stěžejní části CSS** umístit přímo do HTML značky `&lt;style>`. Stěžejní části jsou styly pro obsah, který je tzv. *nad ohybem*, což je část stránky ihned viditelná před jakýmkoliv rolováním.

    Na JavaScript se potom čeká kvůli tomu, že používání JS funkcí z externího `*.js` v `on*` HTML atributech nebo `&lt;script>` značkách by se odkazovalo na neexistující (ještě nenačtené) věci.

    Dobrým zvykem bývá dělat stránky pokud možno funkční bez JS, takže nevadí **asynchronní načtení skriptů**.

## Co je cílem?

Pro rychlost reakce se obecně udávají tyto **časové parametry**:

  - odpověď **do 100 milisekund** vypadá jako okamžitá,

  - odpověď **do 1 vteřiny** je sice se znatelnou prodlevou, ale uživatele nějak zvlášť neobtěžuje,

  - **po 10 vteřinách** načítání dojde návštěvníkovi trpělivost a půjde dělat něco jiného (osobně bych 

Cílem je tedy se dostat pod 100 milisekund, pochopitelně je otázka za jako cenu.

## Analysování načítání

Před prováděním konkrétní **optimalisačních technik** je dobré nejdříve prozkoumat, jak si stránka vede.

Užitečný je k tomu zejména nástroj [WebPagetest](http://www.webpagetest.org/), který po zadání URL stránku vyhodnotí a přehledně znázorní **průběh načítání**.

## Odkazy jianm

  - [WebPagetest Documentation](https://sites.google.com/a/webpagetest.org/docs/)

  - [Response Times: The 3 Important Limits](http://www.nngroup.com/articles/response-times-3-important-limits/)

  [CSS Performance Tooling](https://speakerdeck.com/addyosmani/css-performance-tooling)

    Video: [Paul Irish, "Delivering the goods" - Fluent 2014 Keynote](https://www.youtube.com/watch?v=R8W_6xWphtw) ([presentace](https://docs.google.com/presentation/d/1MtDBNTH1g7CZzhwlJ1raEJagA8qM3uoV7ta6i66bO2M/present?slide=id.g3eb97ca8f_1347))

  - TimKadlec.com: [Fast Enough](http://timkadlec.com/2014/01/fast-enough/)

  - [Na co stránka čeká](http://www.jakpsatweb.cz/clanky/na-co-stranka-ceka.html)

  - Google Developers: [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path)

  - [W3C Frame Timing](https://github.com/w3c/frame-timing/wiki/Explainer)

  - MDN: [Tips for authoring fast-loading HTML pages](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Tips_for_authoring_fast-loading_HTML_pages)

  - [5 Ways to Make Your Site Exponentially Smaller and Faster](http://davidwalsh.name/site-speed)

  - [More Weight Doesn't Mean More Wait](http://www.filamentgroup.com/lab/weight-wait.html) – samotná datová velikost nemusí být hlavním faktorem ovlivňující rychlost načtení 

  - [Performance tooling today](http://perf-tooling.today/tools) – 137 nástrojů pro zrychlení stránky

  - [A Beginner’s Guide to Website Speed Optimization](https://kinsta.com/learn/page-speed/)

  - Bocoup: [Smaller, Faster Websites](https://bocoup.com/weblog/smaller-faster-websites)

  - [How Page Load Speed Affects Conversion [Infographic]](http://www.getelastic.com/how-page-load-speed-affects-conversion-infographic/)

backface-visibility
-webkit-backface-visibility: hidden