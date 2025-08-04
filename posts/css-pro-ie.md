---
title: "CSS pro IE"
headline: "Zvláštní CSS pro IE"
description: "Jak odlišit Internet Explorer od ostatních prohlížečů a vytvořit zvláštní CSS jen pro IE."
date: "2014-01-02"
last_modification: "2017-11-25"
status: 1
tags: ["CSS", "Hacky", "Prohlížeče"]
---

Při vytváření webu se lze snadno setkat s nejednotnostmi při [testování napříč prohlížeči](/prohlizece) ([Pro které prohlížeče optimalisovat?](/prohlizece-optimalisace)). Leckoho potom může napadnout vytvořit pro problematický prohlížeč **zvláštní HTML, CSS nebo JavaScript**.

Předně je dobré upozornit, že ideální je psát pokud možno **jednotný kód**. Tedy například v případě, že nějaká část webu má v některém z prohlížečů jiný rozměr, pokusit se **odhalit příčinu** než pro různé prohlížeče zadat různé rozměry.

## Řešení častějších rozdílů

V případě nejednotnosti vzhledu napříč prohlížeči je možné zkoušet následující **obecné postupy**.

    Sjednotit [vykreslovací režim](/doctype), který zabrání [odlišnému počítání rozměrů boxů](/box-model). Většinou pomůže mít na první řádce kódu správný [`&lt;!doctype>`](/doctype):
    
    ```
&lt;!doctype html>
```

    Odlišené počítání rozměrů se týká pouze **IE 9** a starších (nebo novějších **IE** při zapnutí režimu kompatibility).

    Srovnání různých výchozích `margin`ů a `padding`ů. Může pomoci [CSS reset](/css-reset).

    Nejjednodušší je tyto vlastnosti globálně vynulovat.

    ```
* {margin: 0; padding: 0}
```

    Nechávat tuto konstrukci v kódu po odhalení problému ale příliš nedoporučuji, protože vynulování bude často nežádoucí. Obvykle bývají výchozí nejednotné hodnoty pořád lepší než odsazení žádné.

      Značné rozdíly panují u [stylování formulářových políček](/stylovani-inputu).

    Jako *poslední záchrana* občas pomůže `overflow: hidden`.

    ```
element {overflow: hidden}
```

    V dávných dobách **IE 7** a starších občas problémy odstraňovalo zapnutí [`hasLayout`](/haslayout)u.

    ```
problematicky-element, problematicky-element * {zoom: 1}
```

V případě, že nic z toho nezafunguje a chybí čas nebo trpělivost problém dále zkoumat, přichází na řadu naservírování odlišného kódu v závislosti na prohlížeči.

## CSS hacky pro IE

### IE 10, 11

Pro **Internet Explorer 10–11** jde využít [`@media`](/media) pravidlo `hight-contrast` s [prefixem](/css-prefixy):

```
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
   /* style pro IE 10-11 */
}
```

### IE 9, IE 10 — Selektorové hacky

Novější Internet Explorery lze odlišit na základě znalosti pokročilejších [CSS selektorů](/css-selektory).

Hezky se k tomu dá zneužít třeba [`:root`](/css-selektory#korenovy), který funguje až od **IE 9**. Ve starších prohlížečích se proto daná vlastnost neprojeví ([ukázka](http://kod.djpw.cz/exab)).

```
element {color: blue} /* vlastnosti pro IE 8 a starší */
:root element {color: red} /* IE 9+ */
```

Pro **IE 10** jde zase zneužít třeba selektor [`:required`](/css-selektory#required), který ve starších prohlížečích nefunguje ([ukázka](http://kod.djpw.cz/dxab)).

Jelikož v **IE 8** tyto selektory ještě nefungují, je možné vytvořit sestavu, co nabídne pro IE 7, 8, 9 a 10 různou podobu ([ukázka](http://kod.djpw.cz/gxab)).

```
element {color: red /* IE 8 */; =color: blue /* IE 7 */}
:root element {color: green /* IE 9 */}
input.hack {display: none}
input.hack:required + element {color: yellow /* IE 10+ */}
```

### IE 7 — rovnítkový hack

V případě, že nějaká vlastnost má platit jen v **IE 7**, není nic jednodušší než před ním připsat rovná se ([ukázka](http://kod.djpw.cz/zwab)).

```
element {**=**color: red}
```

## Podmíněné komentáře (IE 9)

Další způsob, jak naservírovat **pro IE jiné CSS**, jsou [podmíněné komentáře](/podminene-komentare). Nefungují ale už v **IE 10**. Jen když se přepne [zobrazovací režim](/podminene-komentare#ie10) a tím **IE 10** *poníží* na starší.

Podmíněné komentáře se zapisují do HTML kódu, ale není problém pomocí nich připojit CSS soubor jen pro podporovaný **Internet Explorer** (novější prohlížeče než **IE 9** považují podmíněné komentáře za **obyčejný HTML komentář**).

```
&lt;!--[if lt IE 9]>
	&lt;link rel="stylesheet" type="text/css" href="ie8.css">
&lt;![endif]-->
```

Když už se ale má tento hack použít, přijde mi elegantnější nastavit třídu „`ie`“ nějakému [společnému obalu](/stylovani-body) a v CSS psát:

```
.ie element {/* Vlastnosti pro IE */}
```

Ušetří se tím HTTP požadavek na další soubor v příslušných Explorerech.

## Detekce z hlavičky `user-agent`

Na straně serveru (např. v PHP) nebo na straně klienta (v JavaScriptu) je možné přečíst hlavičku `user-agent` a uhodnout z ní prohlížeč návštěvníka.

Použitelně vypadá [Device Detection library](https://github.com/piwik/device-detector) z analytického nástroje Piwik.

Elegantněji moc **spolehlivě** prohlížeče odlišovat nelze. Kvůli tomu, že se občas hackování pomocí detekce `user-agenta` používá, musejí tvůrci prohlížečů při vytvoření nové verse volit `user-agent` s ohledem, aby se pokud možno **nerozbily starší weby**.

Třeba [IE 11](/ie11) už v této hlavičce [nemá](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=5&amp;topic=153994) charakteristické `MSIE`, ale jméno a číslo jádra — `Trident/7.0`.

### User-agent v JavaScriptu

Informace o prohlížeči je v `navigator.userAgent`.

Používáte prohlížeč:

  document.getElementById("ua").innerHTML = navigator.userAgent

(Jinak při nejednotnostech v JavaScriptu je lepší detekovat přímo **konkrétní vlastnosti** než versi prohlížeče. V CSS k tomu bylo dokonce zavedeno [pravidlo `@supports`](/supports).)

### User-agent v PHP

V PHP je stejná hlavička dostupná přes `$_SERVER['HTTP_USER_AGENT']`.

Ještě existujte PHP funkce [`get_browser`](http://php.net/manual/en/function.get-browser.php), ale málo kde funguje.

Podmínky pro různé **IE** mohou vypadat následovně:

```
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0') !== false) // IE 11
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 10') !== false) // IE 10
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 9') !== false) // IE 9
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 8') !== false) // IE 8
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7') !== false) // IE 7
```

### User-agent v CSS

Docela zajímavé řešení je předat si celou hodnotu `user-agent` hlavičky do nějakého rodičovského HTML elementu (třeba `&lt;html>`):

```
&lt;html data-user-agent="Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)">
```

V CSS jde potom použít [hvězdičkový atributový selektor](/css-selektory#atributovy-obsahujici):

```
body[data-user-agent*="MSIE 10"] .ie {
    /* styly pro IE */
}
```

Doplnit hodnotu user-agenta do data-atributu jde na straně serveru prostým vypsáním nebo v JavaScriptu z objektu [`navigator`](/ua#js):

```
document.body.setAttribute("data-user-agent", navigator.userAgent);
```

    - [Živá ukázka](http://kod.djpw.cz/fykc-) – selektory závislé na user-agentovi

## Hláška „máte starý prohlížeč“

Používáte starý prohlížeč, přejděte na moderní, bezpečný, rychlý a superskvělý **Fytopuf 18**.

Před umístěním obdobné hlášky, že web funguje jen v nějakém prohlížeči, doporučuji dobře zvážit, zda nestojí za to problémy raději **odstranit**.

V drtivé většině případů se vyplatí zobrazit stránku alespoň nějak špatně než vůbec. Proto je nutno brát ohled na to, aby se některé prohlížeče nebo dokonce **vyhledávače** od stránky *neodřízly*.

## Odkazy jinam

  BROWSERHACKS
 – rozsáhlý přehled hacků pro jednotlivé prohlížeče s možností filtrování