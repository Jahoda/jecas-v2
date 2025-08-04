---
title: "Má rychlost načítání vliv na SEO?"
headline: "Vliv rychlosti webu na SEO"
description: "Může rychlost webové stránky ovlivnit její umístění ve vyhledávání?"
date: "2015-02-26"
last_modification: "2015-11-23"
status: 1
tags: ["SEO", "Zrychlování webu"]
---

Jelikož **algoritmy vyhledávačů**, které řadí výsledky, **nejsou veřejné**, o vlivu konkrétního faktoru lze pouze spekulovat. K odhadu vlivu rychlosti stránky na výsledky vyhledávání jde brát v úvahu:

    **Selský rozum** – cílem vyhledávače je posílat návštěvníky na stránky, které obsahují odpověď na hledaný dotaz nebo řeší problém, který hledající člověk má.

    Pro maximální spokojenost by se člověk měl k požadované informaci dostat co nejdříve.

    Vyhledávače mají příjem z reklamy, kterou prodávají u vybraných klíčových slov. Nabízením kvalitních výsledků motivují návštěvníky více hledat => vyšší příjmy z reklamy.

    **Vlastní testy a pokusy** – je možné vytvořit více stránek rozdílným způsobem a sledovat, která si vede lépe. Aby je ale vyhledávače nechápaly jako duplicitní, musí mít odlišný obsah, čímž jsou výsledky měření zkreslené.

    Obecně je hodně obtížné určit, co má jaký dopad, protože SEO úspěch stránky závisí na mnoha faktorech, které se navíc průběžně mění.

    Když po úpravách návštěvnost z vyhledávání vzroste, může to být dobře zvoleným postupem, ale také mohla návštěvnost vzrůst navzdory úpravám a bez nich by byla ještě větší.

    Déle lépe cílená menší návštěvnost z vyhledávání bude typicky zajímavější než vyšší a méně relevantní.

## Míra opuštění stránky

Nepochybně má dlouhé načítání stránky vliv na míru okamžitého opuštění stránky (anglicky *bounce rate*).

Tolerance návštěvníků při **čekání na načtení stránky** se liší člověk od člověka nebo na základě aktuálního hledání.

Pokud hledající při vyhledávání populárního hesla spěchá, má na výběr více výsledků, takže moc dlouho čekat na načítání nevydrží, vrátí se na výsledky vyhledávání a zkusí nějaký jiný výsledek.

Okamžitý návrat tak vyhledávač může vyhodnotit jako negativní signál pro pomalý web, protože hledajícímu nepomohl.

Tato míra opuštění stránky není úplně měřitelná nástrojem typu [Google Analytics](/ga), protože když se nenačte stránka, nenačte se často ani měřicí skript.

## Jak otestovat rychlost

Pro rychlé odhalení prostoru ve zrychlování se hodí nástroj přímo od **Googlu**:

    [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) – testování rychlosti stránky na mobilu i desktopu

Detailní znázornění průběhu načítání jednotlivých součástí stránky, dobu vykreslení a další nabízí WebPagetest:

    [Webpagetest.org](http://www.webpagetest.org/) – detailní pohled na průběh načítání stránky

Podobný přehled je i ve [vývojářských nástrojích](/vyvojarske-nastoje) v záložce *Síť*.

## Jak rychlá by stránka měla být?

  Čím rychlejší, tím lepší.

Podle čísel z [Chrome Dev Summit 2015](/chrome-dev-summit-2015#svet-online) se **prodleva 1 vteřina rovná o 11 % nižšímu počtu zobrazených stránek**. Lidé mají zkrátka menší tendenci kliknout na další odkaz na stránce, když tuší, že se bude načítat dlouho.

Při používání pomalého mobilního internetu s omezeným datovým objemem může být potom pomalost stránky důvodem web vůbec nenavštívit.

Jako obecné vnímání rychlosti se většinou uvažuje následující.

  - Do **100 milisekund** je odezva stránky brána jako okamžitá.

  - **100–300 ms** znamená skoro nepostřehnutelné lehké zdržení.

  - **0,3–1 vteřina** už je postřehnutelná, ale člověk se stále na web soustředí.

  - **1 vteřina** a víc – „přepnutí“ myšlenek na něco jiného.

Ideální je se tak **vejít do 1 vteřiny**. To nutně neznamená, že do té doby musí být načtena celá stránka – stačí alespoň nějaký obsah, který už může návštěvník prohlížet.

Při optimalisaci rychlosti je nutné brát v úvahu také návratnost. Zrychlovat rychlou stránku o pár milisekund už se nemusí vyplatit.

## Největší zabijáci rychlosti

    **Přesměrování** – na mobilním připojení s pomalou odezvou může jedno přesměrování znamenat ztrátu stovek milisekund, aniž by se něco užitečného dělo.

    Pokud web například přesměrovává na [mobilní subdoménu](/mobilni-web#moznosti) `m.example.com`, automaticky tím prodlouží načítání o stovky milisekund.

  **Odezva serveru** – pokud server dlouho generuje odpověď pro prohlížeč, typicky se ještě nemohou stahovat žádná data.

  Sestavování stránky na serveru při používání náročných redakčních systémů a frameworků může zabrat stovky milisekund až vteřiny.

    Vyřešit tento problém jde použitím cache – složitě vygenerované stránky se uloží do statického souboru. Pokud se stránka často mění, je použití cache složitější. Nezbývá než najít úzká hrdla aplikace a pokusit se je odstranit.

    Pokud načítání stránky trvá dlouho, protože je zkrátka nutné provést nějaké náročné výpočty, je asi jediná možnost tyto náročné věci rozdělit na více stránek. Případně je načítat asynchronně [AJAXem](/ajax).

    **Blokující CSS/JS** – externí skripty a styly umístěné v [hlavičce `&lt;head>`](/html-kostra#head) většinou blokují [vykreslování stránky](/vykreslovani). Do jejich stažení a zpracování se nic nezobrazí.

    Vyřešit blokování vykreslení stránky kvůli čekání na CSS soubory jde pomocí jejich [dynamického načtení JavaScriptem](/nacitani-css) a vložením základních stylů pro první vykreslení do HTML kódu pomocí značky `&lt;style>`.

    JS soubory potom stačí připojit na konci stránky. Anebo je připojit s atributy `async` a `defer`, čímž se zabrání blokování vykreslování.

    **Webové fonty** – na stahování externích fontů se ve většině prohlížečů čeká. Do té doby se na stránce nezobrazí vůbec žádný text.

    Většina prohlížečů alespoň po 3 vteřinách, kdy na stránce není co číst, přepne na záložní font.

    Toto chování je většinou dobré změnit JavaScriptem, aby se text zobrazil hned:

        CSS `@font-face`: [Stahování webových fontů](/font-face#stahovani)

    **Velký počet HTTP spojení** – HTTP protokol má problém se stahování velkého množství souborů. Pokud se na stránce stahují desítky malých obrázkových ikon, samotné vytvoření požadavku trvá déle než stažení obsahu.

    Řešení je obrázky sloučit do [CSS sprite](/css-sprite). Podobná situace je i s CSS a JS soubory, které je také dobré [spojit do jednoho](/slouceni-js-css).

    Opačná situace je u novějšího protokolu **HTTP/2**, který spojování v podstatě řeší sám a je naopak kvůli lepšímu kešování a stahování pouze potřebného obsahu vhodné soubory nespojovat.

    **Nezapnutá gzip komprese** – u textového obsahu (HTML, CSS, JS, [SVG](/svg)) jde gzip kompresí výrazně snížit objem přenášených dat. Klidně třeba na 10–20 % původní velikosti.

    Gzip komprese funguje tak, že se opakované výskyty téhož řetězce nahradí odkazem na první výskyt. Proto se hodí pro text, ale už ne třeba pro [JPG obrázky](/format-obrazku#jpg).

    Zapnout kompresi jde přidáním pár řádků do souboru `.htaccess`:

          [Enable gzip compression](https://varvy.com/pagespeed/enable-compression.html) – návod na zapnutí gzip komprese

    **Krátká platnost cache** – při opakovaném načítání by se mělo co nejvíce souborů načítat z cache (CSS, JS, obrázky).

    Platnost souborů v keši je tak dobré nastavit na hodně dlouho. Případné vynucení stažení aktuální verse jde vyřešit přejmenováním souborů – stačí místo `styl.css` připojit `styl.css?v=2` a podobně.

    V souboru `.htaccess` jde použít následující:

    ```
# zapnutí
ExpiresActive On

# výchozí expirace 0 minut
ExpiresDefault A0

# expirace 30 000 000 vteřin (cca rok) po přístupu (A - access)
ExpiresByType application/x-javascript A30000000
ExpiresByType text/css A30000000
ExpiresByType image/gif A30000000
ExpiresByType image/jpeg A30000000
ExpiresByType image/png A30000000
ExpiresByType image/x-icon A30000000
```

    **Stahování obsahu z více domén** – stahování externích objektů z různých domén prodlužuje dobu načítání o navázání spojení s každou další doménou – musí se provést *DNS Lookup* apod.

## Rychlost jako hodnoticí signál

**John Mueller** z Google se ohledně rychlosti jako hodnoticího signálu [vyjádřil následovně](https://www.seroundtable.com/google-pagespeed-ranking-factor-20197.html):

  I don't know how much of that [PageSpeed ranking factor] is still used at the moment. So we do say we have a small factor in there for pages that are really slow to load where we take that into account. But I don't know how much that's actually still actually still a problem in ranking.

Podle toho je tedy rychlost spíš malým hodnoticím faktorem.

Pořád zde ale hraje roli vyšší míra opuštění u pomalých webů a menší ochota návštěvníků je procházet.

Pomalá odezva serveru potom může zpomalovat indexování robotem vyhledávače.

  [Google Mobile Displaying "Slow" Label In Search Results For Slow Sites?](https://www.seroundtable.com/google-slow-label-19914.html) – zobrazení popisku „Pomalé“ ve výsledcích hledání

  - [Page Load Takes Two-Seconds? Google May Slow Crawling Your Site](https://www.seroundtable.com/google-crawl-slow-tw0-seconds-20070.html) – pomalé načítání může způsobit horší indexování