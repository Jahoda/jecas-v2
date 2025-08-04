---
title: "AJAX"
headline: "AJAX"
description: "Asynchronní načítání částí stránek a odesílání formulářů bez obnovení celé stránky."
date: "2013-11-15"
last_modification: "2013-11-16"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady", "AJAX"]
---

Od **IE 7** je napříč prohlížeči nejednodušší funkční řešení následující:

```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) alert(**xhr.responseText**);
}
xhr.open('GET', "*url-stranky*");
xhr.send();
```

Pro případnou podporu **IE 6** a starších je třeba použít `ActiveXObject`.

```
var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
```

## JSON

Zkratka [JSON](/json) znamená *JavaScript Object Notation*, tj. jedná se o textový obsah, který je ve formátu jako se v JS vytváří objekty. Obsah je typu `{klic: "hodnota"}` a v **PHP** jde elegantně vytvořit z běžného pole funkcí [`json_encode`](http://php.net/json_encode).

V `xhr.responseText` bude po vykonání **požadavku na URL** obsah dané stránky (co se stahuje si lze snadno ověřit zadáním stejné URL do prohlížeče). Neřeší se, zda se jedná o **HTML**, **JSON** nebo cokoliv jiného. Tvůrce si tedy může vybrat, který formát bude preferovat a používat.

Pokud není příliš obtížné / je možné stránku na straně serveru upravit tak, aby v určitých situacích (např. speciální parametr v URL) **vracela JSON** pouze s potřebnými daty, bude se s výsledkem z `xhr.responseText` lépe pracovat.

Vyzobávat potřebná data je možné i z původního HTML souboru včetně `&lt;!doctype>`, hlavičky a podobně, a to buď **regulárními výrazy** nebo standardními funkcemi **DOM**u. Je potom ale otázka, zda **asynchronní načítání** vůbec používat. V takovém případě to  vyjde stejně jako **běžný přechod** na cílovou URL (stáhne se stejné množství dat).

## Řešení AJAXu s JSONem

Hotová funkce pro **zpracovávání JSONu získaného AJAXem** může vypadat následovně:

```
function ajax(url, callback) {
  var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) callback(eval('(' + xhr.responseText + ')'));
  };
  xhr.open('GET', url);
  xhr.send();
}
```

**Použití** pro JSON obsah `{url: "http://jecas.cz", nazev: "Je čas"}` ([živá ukázka](http://kod.djpw.cz/cir)):

```
ajax("url-stranky", function(data) {
  alert(data.url); // vypíše „http://jecas.cz“
  alert(data.nazev); // vypíše „Je čas“
});
```

Pro zpracovávání **prostého textu nebo HTML** stačí z funkce `ajax` odstranit `eval` a pracovat s textovým řetězcem ([ukázka](http://kod.djpw.cz/eir)).

## AJAX na jinou doménu

Kvůli bezpečnosti je možné používat AJAX jen v rámci **stejné domény**. Tedy z domény `example.com` se dostaneme na stránku `example.com/stranka`. Ale už ne na `*jiny.*example.com`, `*www.*example.com` (AJAX nefunguje ani na **subdoménách**) nebo `*jiny-*example.com`.

### Řešení je

  - Zajistit, aby potřebný obsah byl dostupný na **URL z téže domény**.

  - Vytvořit na stejné doméně skript, který z cizí domény [stránku stáhne](/stazeni-stranky). K takovému obsahu už se AJAX dostane.

  - Obsah z cizí domény **připojovat jako externí skript** (tzv. JSON**P**).

## JSONP

JSONP je *JavaScriptový objekt s „vycpávkou“*. Funguje to tak, že se běžný JSON umístí do argumentu nějaké funkce (to je ta *vycpávka*) a celé se to připojí jako **externí JavaScript** (připojovat skripty je možné i z **jiné domény**).

Takový JSONP soubor / externí JS (ve skutečnosti třeba v PHP dynamicky generovaný *soubor* na straně serveru) může vypadat následovně:

```
vlastniFunkce({url: "http://jecas.cz", nazev: "Je čas"})
```

V momentě, kdy tento skript připojíme (a on se stáhne a vykoná), se zavolá funkce `vlastniFunkce` (kterou si na cílovém webu nadeklarujeme) a budou jí tak předána data, která může dále libovolně zpracovávat.

Kromě zpracovávání JSONu ale nic nebrání tuto techniku připojování externího skriptu využít s jiným typem dat, tj. třeba vůbec nepoužívat JSON a data rovnou nastavit jako **parametry funkce**:

```
vlastniFunkce("http://jecas.cz", "Je čas")
```

**Potenciální risiko** JSONP řešení je v tom, že si do stránky připojíme cizí skript, který v případě napadení může vytvořit [neřešitelný XSS](/bezpecnost#xss). Proto je tuto techniku vhodné používat jen u **důvěryhodných stránek**.

### Dynamické připojení skriptu

Připojování skriptu může zajišťovat funkce ve stylu.

```
function pripojitJs(url) {
  var s = document.createElement("script");
  s.src = url;
  document.getElementsByTagName("head")[0].appendChild(s);
}

```

[Živá ukázka](http://kod.djpw.cz/elr) JSONP řešení.

## Indikace průběhu

Po vyvolání akce, která začne AJAXem stahovat nějaká data, zvlášť v případě, že to bude **trvat déle**, je vhodné dát uživateli najevo, *že se něco děje*; to může znázorňovat.

  - **Animovaný obrázek**, který se objeví po kliknutí a bude skryt `callback` funkcí.

  - Změna kursoru na `wait` (opět je nutné zajistit *vrácení* kursoru po **dokončení akce**). Toto řešení není moc použitelné u dotykem ovládaných zařízení.

  - Nástroj [PACE](http://github.hubspot.com/pace/docs/welcome/) nabízí hotové řešení **průběhu načítání**.

## Odesílání formulářů AJAXem

AJAXové **odesílání formulářů** se dá řešit dvěma způsoby. Buď projít všechna formulářová pole JavaScriptem a sestavit z nich řetězec ve stylu `prvniPole=hodnota&amp;druhePole=hodnota` ([hotová funkce](http://php.vrana.cz/odeslani-formulare-pres-ajax.php)).

Nebo formulář odesílat do skrytého rámu, který podobně jako JSONP řešení zavolá funkci z původní stránky s předanými daty.

Skript, na který se **formulář odešle** vytvoří výstup:

```
&lt;script>
window.top.window.vlastniFunkce({url: "http://jecas.cz", nazev: "Je čas"});
&lt;/script>
```

Tím se obsah (JSON) předá funkci v nadřazené stránce **skrytému rámu**. Výhoda tohoto řešení je v tom, že o [indikaci](#indikace) se postará prohlížeč standardní cestou.

Pro [AJAXový upload](/upload-bez-refreshe) je to jediná možnost funkční napříč prohlížeči. Tento způsob se dá bez problému **použít i pro běžný formulář**.

## Pseudo AJAX

Pro situace, kde není potřeba **zpětná vazba**, si je možné vystačit bez `XMLHttpRequest`u, JSONP řešení nebo odesílání do skrytého rámu. Chceme-li pouze odeslat nějaká data **bez obnovování stránky**, existují další možnosti.

Před použitím tohoto způsobu je nutné pečlivě zvážit, zda **absence odezvy** nebude pro návštěvníka matoucí.

### HTTP hlavička 204

HTTP hlavička 204 (No Response / No Content) znamená, že byl požadavek úspěšně zpracován, ale výsledkem není žádný výstup k navrácení klientovi. Za následek to má, že prohlížeč na takovou stránku **nepřejde**, ale skript běžící na dané URL se **normálně vykoná**.

```
&lt;?php
header('HTTP/1.0 204 No Content', true, 204);
// Nějaká akce
exit;
```

### Pingnutí obrázkem

Této techniky často využívají různé **měřicí skripty**. Do **HTML kódu** umístíme obrázek s cílem skriptu, který po vykonání své činnosti vrátí průhledný 1px obrázek (aby na stránce nerušil):

```
&lt;img src="akce.php">
```

Případně je možné  pingnutí *obrázkem* provést v JavaScriptu (s generováním prázdného obrázku se nemusíme obtěžovat):

```
var obrazek = new Image();
obrazek.src = "akce.php";
```