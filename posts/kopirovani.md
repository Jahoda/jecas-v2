---
title: "Jak zabránit kopírování"
headline: "Jak zabránit zkopírování obsahu"
description: "Dá se kopírování textů, obrázků a zdrojových kódů z webu zabránit? Jak kopírování využít ve svůj prospěch."
date: "2013-11-23"
last_modification: "2015-11-21"
status: 1
tags: ["Rady a nápady"]
---

Ze své podstaty je webová stránka velmi **lehce zkopírovatelná**. Veškerý obsah (**texty**, **obrázky**, **videa**), které se mají zobrazit návštěvníkovi, si totiž jeho prohlížeč **musí nejprve stáhnout** (uložit na disk / do operační paměti).

**Zkopírování celé stránky** proto v podstatě proběhne při každém jejím načtení. A proto je jediná možnost, jak kopírování zabránit, **nedávat obsah na internet**.

Existují ale způsoby, jak **kopírování ztížit** nebo použít ve **svůj prospěch**…

## Kopírování textu

Asi nejjednodušší je zkopírovat text. Označit ho myší a stisknout Ctrl + C. Nebo na něj kliknout pravým tlačítkem a zvolit *Kopírovat*.

Ve snaze kopírování zabránit proto může někoho napadnout zakázat:

  - Klávesovou zkratku Ctrl + C (popř. Ctrl + Insert),

  - zakázat **pravé tlačítko myši**, které vyvolává [kontextovou nabídku](/kontextova-nabidka),

  - zakázat **označování textu** na stránce.

### JS blokující kopírování

Pro zamezení kopírování jde vystornovat události `oncopy` a `oncut`:

```
&lt;body oncopy="return false" oncut="return false">
```

Zakázat kontextovou nabídku zase přes `oncontextmenu`:

```
&lt;body oncontextmenu="return false">
```

[Ukázka](http://kod.djpw.cz/kxt) se všemi těmito překážkami.

Zásadní problém těchto **blokací** (kromě otravného nabourání výchozích funkcí prohlížeče) je skutečnost, že všechny může uživatel vypnout prostým [zakázáním JS](/vyvojarske-nastroje#zakazani). Případně si stránku uložit na disk a tam text získat ze **zdrojového kódu**.

### Text jako obrázek

Všechny tyto problémy by teoreticky řešil text, který **se umístí do obrázku**. Problém je, že takové řešení je **silně nepřístupné** (vyhledávače nejspíš text z obrázku analysovat nebudou).

Kromě toho ani takový postup nezabrání použít na obrázek [optické rozpoznávání znaků](http://cs.wikipedia.org/wiki/OCR).

### Jak kopírování textu využít

Zajímavé [řešení](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=118171) je, když se k většímu množství označeného textu přidá „Zdroj: http://example.com/stranka“.

  - Při kopírování **pár slov** to nijak neobtěžuje (zdroj se nepřidá).

  - Zkopírováním získá stránka **zpětný odkaz**.

  - Může to **potěšit** i návštěvníka, který by zdroj chtěl uvádět.

## Kopírování obrázků

V případě obrázků může rovněž pro málo zkušené návštěvníky fungovat **blokace pravého tlačítka** případně **překrytí** dalším průhledným obrázkem (nebo vložení obrázku jako **CSS pozadí**).

### Překrytí obrázku

Logo je překryto [absolutně posicovaným](/position#absolute) `&lt;div>`em. Kontextová nabídka pro obrázek by se neměla objevovat.

    .obrazek {position: relative}
    .prekryt {width: 135px; height: 35px; background: #fff; opacity: 0; filter: alpha(opacity=0); position: absolute;}

Zkušenější člověk to snadno obejde. Buď si **vypne CSS**, uloží celou stránku s obrázky, najde adresu obrázku ve zdrojovém kódu a tak dále.

Řešení není ani nepřístupný obsah typu **Flashe**. Když už obrázek na obrazovce je, není problém ji *vyfotit* klávesou Print Screen. Případně skutečně vyfotit **fotoaparátem** (ideálně ze stativu).

### Vodoznak

Možný způsob, jak alespoň trochu **využít** kopírování obrázků, je jejich označení vodoznakem / adresou webu. [Řešení v PHP](http://php.vrana.cz/vodotisk.php).

## Hotlinkování obrázků

Hotlinkování je technika, kdy se **cizí objekt** (obrázek, video, JavaScript) připojí na vlastní web. Nevýhodné je být ten, z jehož webu se obrázky připojují jinam.

Nevýhodné je to z důvodu, že to majiteli v zásadě nic nepřináší, ale stojí ho to přenosovou kapacitu. Využít hotlinkování ve svůj prospěch je možné nabídnutí **jiného obsahu obrázku** (reklamy na svůj web) pro návštěvy z **cizího webu**.

### Využití `.htaccess`

Zakázat zobrazování obrázků mimo vlastní web je možné přes:

```
RewriteEngine on
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?**example.com** [NC]
RewriteRule \.(jpg|jpeg|png|gif)$ **novy-obrazek.jpg** [NC,R,L]
```

Druhý řádek zajišťuje, aby se obrázek řádně načetl i při **vypnutém [refereru](/referer)**.

## Kopírování JavaScriptu

Opět: Má-li se na stránce provést JS kód, musí se stáhnout a prohlížeč ho pochopit. Jediná možnost, jak někomu jinému **ztížit využívání skriptu**, je jeho **znečitelnění** (tzv. *obfuskace*). Tam spadá například:

  - Odstranění **formátování** kódu (mezer a tabulátorů),

  - odstranění vysvětlujících **komentářů**,

  - **přejmenování** identifikátorů (názvu proměnných a funkcí) na nesrozumitelné nesmysly,

  - vytvoření **samoúčelných funkcí**, které různé komprimují kód.

Existují různé [online](http://jsbeautifier.org/) [nástroje](http://www.jspretty.com/) (nebo [doplněk do Firefoxu](https://addons.mozilla.org/cs/firefox/addon/javascript-deobfuscator/)) pro opětovné zkrášlení kódu. Ovšem **komentáře** a **smysluplné názvy** proměnných a funkcí plně zrekonstruovat nelze.

Doplnění názvů proměnných (a mnohdy úspěšně) zkouší dělat nástroj [JS NICE](http://www.jsnice.org/).

Použití několika různých obfuskátorů vytvoří tak nečitelný kód, že se často spíš vyplatí napsat ho znovu od nuly. [Takto](http://kod.djpw.cz/ycu) může vypadat funkce pro [přepínání tříd](/prepinani-trid).

O **dekódování obfuskovaného kódu** jsou zajímavé postřehy na [diskusi](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=153249).

### Obfuskátory JavaScriptu

Kompilátory, co dokáží výrazně zmenšit datovou velikost skriptu při zachování stejného výkonu.

    - [Closure Compiler](http://closure-compiler.appspot.com/home)

    - [UglifyJS](http://marijnhaverbeke.nl/uglifyjs)

    - [RegPack](http://siorki.github.io/regPack.html)

Další nástroje se snaží primárně kódu **snížit čitelnost**. Třeba i na úkor výkonu nebo datové velikosti.

    - [Javascript Obfuscator](http://javascriptobfuscator.com/)

    - [Obfuscator Tool](http://www.jsobfuscate.com/index.php)

    - [Free online javascript and html obfuscator](http://obfuscatorjavascript.com/)

## Kopírování HTML a CSS kódu

Co se týče HTML a CSS kódu, je situace dost složitá. V zásadě lze jen obfuskovat názvy [identifikátorů a tříd](/id-class). Jinak je možné odstranit jen **komentáře** a **bílé znaky** (mezery a tabulátory), třeba nástrojem [Clean CSS](http://www.cleancss.com/) — ty je ale možné snadno navrátit (v [HTML](http://www.dirtymarkup.com/) i v [CSS](http://cssbeautify.com/)). Umí to i [Texy! nebo HTML Purifier](/vycisteni-kodu).

### Zakódování CSS

CSS jde trochu **znečitelnit zakódováním** do [Base64](http://www.freeformatter.com/base64-encoder.html) při použití [data URI](/data-uri), jde použít `&lt;link>` nebo `@import` ([živé](http://kod.djpw.cz/ihu) [ukázky](http://kod.djpw.cz/mhu)):

```
@import url("data:text/css;**base64**,*zakódovanýŘetězec*");
```

```
&lt;link rel="stylesheet" type="text/css" href="data:text/css;**base64**,*zakódovanýŘetězec*">
```

Ale má to nevýhody:

  - každý vidí, čím je **zakódováno**,

  - funguje až v **IE 8**,

  - kód je **delší**,

  - [vývojářské nástroje](/vyvojarske-nastroje) použité styly odhalí,

  - při použití `@import`u musí být data **v jednom řádku**, dlouhý řádek přitahuje pozornost,

  - v některých prohlížečích mohou být problémy s obrázky na pozadí (možná při použití relativních cest).