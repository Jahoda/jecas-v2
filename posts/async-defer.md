---
title: "Připojení JavaScriptu s async a defer"
headline: "Připojení JavaScriptu s <code>async</code> a <code>defer</code>"
description: "Různé způsoby připojení JavaScriptu na stránku, aby se nezdržovalo načítání stránky."
date: "2014-10-31"
last_modification: "2016-02-06"
status: 1
tags: ["JavaScript", "Zrychlování webu"]
---

Při zrychlování načítání webové stránky je způsob připojení JavaScriptu jedna z věcí, která může mít značný vliv na rychlost.

Týká se to hlavně první návštěvy webu. Po uložení skriptů do cache už na způsobu připojení skriptu tolik nezáleží, jelikož se obsah nemusí znovu stahovat.

Zjednodušenou situaci načítání JS při různých způsobech připojení ilustruje následující obrázek:

## Samotná značka `&lt;script>`

```
&lt;script src="velkyJavaScript.js">&lt;/script>
```

Protože v externím JS by mohlo být něco vypisováno metodou `document.write`, prohlížeč při objevení externího JS přeruší parsování HTML kódu stránky do doby, než se skript stáhne a provede.

Zjednodušeně se říká, že obyčejná značka `&lt;script>` **blokuje vykreslování**.

Umístit externí JS do [hlavičky](/html-kostra#head) nebo před obsah je tak spolehlivým zabijákem dobrého dojmu z rychlosti načítání.

U aplikace zcela nefunkční [bez JavaScriptu](/bez-javascriptu) to ale tolik nevadí, protože by stejně do stažení skriptu nešlo nic dělat (i když i tam bývá dobré něco uživateli zobrazit, aby věděl, že se něco děje). U běžných obsahových webů je to ale zpravidla **nežádoucí**.

### Umístění skriptu na konec

Možné snadné řešení blokování vykreslování je umístit JavaScript až na konec HTML kódu (před `&lt;/body>`) nebo alespoň pod kritický obsah.

Problém tohoto postupu je někdy v tom, že se JS začne stahovat později (až po stažení skoro celého HTML). Jsou-li na stránce nějaké prvky závislé na JavaScriptu, mohou být pozorovatelnou dobu nefunkční, protože JS ještě nebude stažen a vyhodnocen.

Případně se skript vůbec nestihne načíst a spustit do doby, než návštěvník stránku opustí – to někdy vadí u měřicích kódů, protože se taková návštěva nezapočítá.

U méně důležitého skriptu to ale může být optimální chování, protože stahování skriptu nebude zdržovat důležitější obsah jako třeba obrázky, které se začnou stahovat dříve (budou výš v HTML kódu).

## Připojení skriptu skriptem

V některých případech je vhodné, když se splní dvě podmínky zároveň:

    JavaScript se začne stahovat a vyhodnocovat co nejdříve.

    Stahování neblokuje vykreslování stránky

Rozšířil se kvůli tomu postup připojování externího JS pomocí interního skriptu v značce `&lt;script>`:

```
&lt;script>
function nacistJs(url) {
  var script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};
nacistJs('velkyJavaScript.js');
&lt;/script>
```

Tento postup používá drtivá většina služeb, které se vkládají JavaScriptem: [Google Analytics](/ga), [sdílecí tlačítka](/sdileci-tlacitka) od Facebooku, externí [komentářové služby](/komentare) a podobně.

Kromě toho, že tímto způsobem připojené JS soubory se mohou provést v různém pořadí nezávisle na pořadí jejich připojení, má tento postup ještě dva problémy:

### Preload scanner

Prohlížeče na HTML kód aplikují tzv. *preload scanner*. Jedná se o mechanismus, který v kódu hledá značky s odkazy na soubory, které může začít stahovat bez nutnosti cokoliv vykreslovat.

Týká se to například [obrázků](/obrazky) vložených značkou `&lt;img>` (kvůli tomu se [vždycky stahují](/zacatek-stahovani-obrazku)), značky `&lt;link>` pro připojení CSS nebo značky `&lt;script>`.

Použití blokujícího JS tak může někdy být rychlejší než jeho připojení JavaScriptem, právě kvůli tomu, že se díky preload scanneru začne dřív stahovat.

### CSS blokuje JavaScript

Připojení skriptu JavaScriptem čeká na vyhodnocení JS kódu připojovací funkce. To je například pozdrženo načítáním a zpracováváním CSS (sestavováním CSSOM).

JavaScript ve značce `&lt;script>` musí čekat na stažení a vyhodnocení CSS pro případ, že by například potřeboval zjišťovat rozměry prvků, které jsou logicky ovlivňovány přes CSS.

Připojení skriptu skriptem by tedy (když už) mělo proběhnout před připojením CSS, má-li se začít stahovat brzo.

Související:

    - [Jak funguje vykreslování stránky](/vykreslovani)

## Značka `&lt;script async>`

Výhody obyčejného `&lt;script>`u a připojování JavaScriptem kombinuje atribut `async`.

```
&lt;script src="velkyJavaScript.js" **async**>&lt;/script>
```

Díky němu adresa souboru neunikne preload scanneru, ale zároveň skript nebude blokovat vykreslení stránky během doby svého stahování.

Nevýhody `async`?

### Pořadí spuštění JS

Při použití `async` **není jasné, kdy se skript spustí** (stejně jako při připojení skriptu skriptem) – to může být problém při připojování více skriptů, které jsou na sobě závislé, protože se může dřív provést první i druhý.

### Asynchronní jQuery

Připojit asynchronně například knihovnu typu jQuery a vlastní externí skript jQuery využívající tak není bez úprav dost dobře možné. Při použití atributu `async` by se ve vlastním skriptu mohly volat metody ještě nenačteného jQuery.

V případě, že je všechen JS kód [spojen dohromady](/slouceni-js-css), to problém není. Od slučování souborů se ale se zlepšováním podpory HTTP/2 bude v budoucnu nejspíš ustupovat, protože u tohoto protokolu přináší víc nevýhod než výhod.

V praxi se to dá řešit proměnnými v interním `&lt;script>`u, kam se ukládá stav s přehledem načtených skriptů. Každý externí skript potom obsahuje funkci pro spuštění všeho, kde se testuje, jestli už se všechny potřebné soubory provedly.

Další nevýhoda je **podpora v prohlížečích**. V **IE 9** a starších a v **Android Browseru 2.3** a starších se `async` ignoruje, takže potom takové `&lt;script>`y blokují vykreslování.

## `&lt;script defer>`

I staré **Internet Explorery** ale podporují atribut `defer`. Ten sice funguje trochu jinak než `async`, ale blokování vykreslování dokáže odstranit.

### Rozdíly `defer` a `async`

    Skript s atributem `defer` se provede až po zparsování celého HTML. Skript s `async` ihned, až se dostahuje.

    Použití `defer`u by mělo zajistit provedení JS v uvedeném pořadí. Podle všeho ale tato vlastnost není v **IE 9** a starších [úplně spolehlivá](https://github.com/h5bp/lazyweb-requests/issues/42).

Atribut `defer` tedy sice zabrání blokování vykreslování, ale skript se u velkých a náročných stránek provede hodně pozdě. U měřicích skriptů to může způsobovat nezapočítání návštěvy, když se uživatel přesune jinam dřív, než se dokončí parsování HTML a následné vykonání skriptu.

## `&lt;script async defer>`

Pro pohodlné připojení skriptu objevitelného *preload scannerem*, který nezablokuje během svého stahování vykreslování stránky, se oba atributy kombinují.

```
&lt;script src="velkyJavaScript.js" **async** *defer*>&lt;/script>
```

Tento postup se nejspíš dá označit jako nejlepší možné řešení připojování JS, který není pro stránku úplně nepostradatelný, nezáleží u něj na pořadí spuštění více externích souborů a je vhodné, aby se začal stahovat trochu dřív než na konci stránky.

Funkce je následující:

  Prohlížeče s podporou `async` načtou skript bez blokování stránky a spustí okamžitě po stažení.

   Prohlížeče s podporou `defer`u načtou skript rovněž bez blokování, ale spustí jej až po dokončení parsování HTML.

  Prohlížeče s podporou `async` i `defer` budou tím pádem `defer` ignorovat.

Poznámka: Atributy `async` a `defer` nemají vliv na interní JS kód mezi `&lt;script>` a `&lt;script>`. Účinkují jen u externích skriptů.

## Resource Hints

Prohlížeče     **Chrome 46+**,    **Firefox 39+** a    **Opera 33+** podporují tzv. *Resource Hints*. Jde o mechanismus, jak dát prohlížeči s předstihem vědět o souborech, které bude potřeba stahovat.

V odpovědi serveru stačí přidat HTTP hlavičku `Link` a prohlížeč může začít stahovat obsah, aniž by ještě začal parsovat HTML:

```
Link: &lt;https://example.com/velkyJavaScript.js>; rel=prefetch;
```

    - W3C: [Resource Hint](https://w3c.github.io/resource-hints/)

## Závěr

Nedá se universálně říct, který postup připojení skriptu je nejlepší. Záleží na konkrétním záměru s jakým se skript má načítat a na prohlížečích, které mají být podporované.

## Odkazy jinam

  - Ilya Grigorik: [Script-injected "async scripts" considered harmful](https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/) – problémy v rychlosti při připojování skriptu skriptem

  - David Grudl: [Rychlejší stránky s Google Universal Analytics](http://phpfashion.com/rychlejsi-stranky-s-google-universal-analytics) – přepsání připojování skriptu do `async` + `defer` podoby

  - Growing with the Web: [async vs defer attributes](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html) – stručný přehled o načítání s `async`/`defer`/ničím

  - HTML5 Rocks: [Deep dive into the murky waters of script loading](http://www.html5rocks.com/en/tutorials/speed/script-loading/)