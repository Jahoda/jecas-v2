---
title: "Má redakční systém vliv na SEO?"
headline: "Vliv redakčního systému na SEO"
description: "Může mít použitý redakční systém a jeho šablona vliv na umístění stránky ve vyhledávání?"
date: "2015-12-03"
last_modification: "2015-12-07"
status: 1
tags: ["SEO", "Redakční systémy"]
---

Použít redakční systém (CMS – *Content Management System*) je dnes běžný způsob, jak vytvářet webové stránky. Přináší to dvě hlavní výhody:

  Automatické [skládání společných částí](/include) stránek dohromady (hlavička, menu, patička apod.).

  Pohodlnější vytváření obsahu. Psaní textů bez nutnosti používat HTML ve [WYSIWYG editoru](/wysiwyg), snazší nahrávání obrázků a podobně.

Jaký může mít redakční systém vliv na SEO?

## Rychlost

Doba načítání stránky může mít vliv na její SEO (ne)úspěchy. Více o tom v samostatném článku:

    - [Má rychlost načítání vliv na SEO?](/seo-rychlost)

Generování výsledného HTML v redakčním systému bude prakticky vždy pomalejší, než by bylo bez něj.

Redakční systémy se snaží být universální, takže obsahují i funkcionalitu, kterou každý nevyužije. Tyto zbytečné funkce potom prodlužují dobu běhu skriptu.

Zvlášť problematické jsou často **pluginy** třetích stran. Proto bývá dobré zapnutí každého pluginu zvažovat a testovat.

### Použít cache

Nejlepší řešení pomalosti redakčních systémů je **kešovat výsledné HTML**.

U webů, které se moc často nemění, jde bez problémů kešovat úplně celé stránky a mít tak celý web ve statické podobě. Potom je rychlost webu vytvořeného redakčním systému srovnatelná s použitím prostého HTML.

    - [ZenCache](https://zencache.com/) – kešování stránek ve WordPressu

Existují dokonce redakční systémy, které mají výstup pouze v statickém HTML a dynamicky stránky vůbec generovat neumí.

    - [Hexo.io](http://programio.havrlant.cz/hexoio/) – skutečný next-gen blogovací systém

### Dynamické servírování stránek

Běžné redakční systémy fungují tak, že při požadavku na `example.com/stranka` udělají následující:

    Připojí se do SQL database.

    Zjistí, který obsah přísluší dané URL.

    Vyberou z DB potřebný obsah (článek, položky menu, poslední komentáře, související články apod.).

    Serverový skript tato data nastrká do šablony a výsledné HTML pošle prohlížeči.

Problém je, že do této doby návštěvník **zírá na prázdnou stránku**, protože mu ještě žádný obsah nedorazil.

Tato doba se nazývá TTFB (*time to first byte* – čas do stažení prvního bytu). 

Je extrémně důležité držet tuto hodnotu co nejníže, protože do této doby nevidí návštěvník žádnou odezvu.

### Doba vygenerování stránky

Následující tabulka obsahuje orientační přehled doby do prvního bytu při sestavení jednoduché stránky.

  Typ
    Čas
  Statické HTML
    20 ms  
  Jednoduché PHP
    40 ms
  [Nette Framework](/nette)
    70 ms
  [WordPress](/wordpress)
    200 ms
  Joomla
    400 ms  

Je-li cílem dosáhnout dojmu prakticky okamžité reakce – hranice 100 milisekund – je použití nejpopulárnějších redakčních systémů bez úpravy téměř nemožné.

### Doba stažení šablony

Použitá šablona webu potom může negativně nebo positivně ovlivnit další průběh načítání (po stažení HTML kódu).

Zvlášť v případě, že šablona používá hodně CSS, JavaScriptu, [webových fontů](/ceska-pisma) nebo velkých obrázků, bývá vykreslování obsahu značně pomalé.

Při nepoužívání protokolu HTTP/2 je problematické i velké množství HTTP spojení, které dobu načtení značně prodlužují. Základní postup řešení je:

  Spojit všechny grafické prvky šablony do jednoho [spritu](/css-sprite).

  Nejnutnější část CSS pro vykreslení obsahu *nad ohybem* (obsah viditelný bez rolování) vložit přímo do [hlavičky](/html-kostra#head) do značky `&lt;style>`, ostatní CSS spojit do jednoho souboru a [načíst asynchronně](/nacitani-css).

  JS soubory se skripty [spojit do jediného souboru](/slouceni-js-css) a připojit na konci stránky nebo asynchronně pomocí atributu `async`/`defer`.

## Omezení

Problematické na používání CMS je omezení v přidávání nových funkcí. Některé redakční systémy mohou být obtížně rozšiřitelné.

Na druhou stranu hodně věcí je řešitelných pluginy, takže rozšiřování funkcí populárních redakčních systémů je často snazší než programování vlastního řešení.

Z pohledu SEO je po technické stránce obsahu důležité:

    **Unikátní titulek** – značka `&lt;title>` je [zázračný SEO tag](/seo-rychle#titulek-popis). Redakční systém by měl umožnit každé stránce nastavit unikátní titulek.

    Kvůli větší variabilitě se hodí i **odlišný hlavní nadpis od titulku**.

    Drtivá většina redakčních systémů používá pro `&lt;title>` i `&lt;h1>` stejný obsah.

    Ve WordPressu jde odlišný titulek od názvu článku nastavit pomocí pluginu:

          [SEO Ultimate](https://wordpress.org/plugins/seo-ultimate/)

    **Popisek `&lt;meta name=description>`** – popisek stránky se občas zobrazuje ve výsledcích hledání. Dobrý popisek může vést k vyšší míře prokliku.

    Hodí se proto, když ho umí RS nastavit.

    **Tvar URL** – řada systémů generuje identifikátory článků bez možnosti zásahu.

    ```
example.com/?id=18
example.com/nazev-clanku-tupe-prevedeny-na-mala-pismena
```

    Pokud je v silách tvůrců obsahu vymýšlet smysluplné URL, je dobré, když jdou v systému ručně nastavit. Automatický převod názvu stránky na malá písmena nemusí být ideální.

    URL stránky se rovněž zobrazuje ve výsledcích hledání a na dalších místech, takže se hodí v ní mít klíčová slova vystihující obsah.

          [10 rad pro vytvoření nejlepší URL](/tvar-url)

## Bezpečnost

Ačkoliv vlastní na koleně psané systémy nejsou v průměru o nic bezpečnější než populární redakční systémy typu **WordPressu**, rozšířené systémy jsou častějším terčem útoků, protože je útok na ně zajímavější – jde najednou napadnout minimálně tisíce instalací.

Pro snížení risika napadení se nabízí systém často updatovat. Bohužel v případě pluginů třetích stran je to složitější, protože může nastat případ, kdy rozšířený plugin převezme/koupí člověk s nekalými úmysly, aby do něj implementoval škodlivý kód.

Napadené weby jsou vyhledávači negativně hodnoceny.

## Překlad do češtiny

U anglických redakčních systémů a jejich šablon může být problém s překladem do češtiny.

V lepším případě jde texty ručně přeložit. Řada systémů ale nepočítá například s [českým skloňováním](/sklonovani), takže optimálního výsledku je často obtížné dosáhnout.

Někdy bývá problém s formátem kalendářního data.

Nečeský obsah stránek je ze SEO pohledu nevýhodný, protože česky hledající člověk mu nemusí rozumět.

S češtinou může být další problém v případě, že šablona používá [webfonty](/font-face), které neznají českou diakritiku. České znaky se potom zobrazují jiným fontem – takové chování zhoršuje čitelnost a celkový dojem ze stránky.

## Důvěryhodnost webu

U nejrozšířenějších redakčních systémů jsou výchozí šablony značně profláknuté.

Stránka s tuctovým vzhledem na výchozí šabloně **nepůsobí na návštěvníky důvěryhodně**. U stránky s vlastním vzhledem je na první pohled vidět, že si autor dal s webem nějakou práci – ne jen nainstaloval redakční systém, takže je vyšší šance, že si dal i práci s obsahem.

Výchozí vzhled některé návštěvníky odradí v případě, že mají negativní zkušenosti s jinými weby používajícími tutéž šablonu. To ovlivní míru okamžitého opuštění stránky.

Vzhledem k tomu, že vyhledávače používají **strojové učení**, může robot vyhledávače dojít k tomu, že weby postavené na výchozí šabloně jsou v průměru méně hodnotné a přenést toto negativní hodnocení i na web se skvělým obsahem – ale běžícím na výchozí šabloně.

Někteří lidé se z těchto důvodu snaží použitý RS maskovat.