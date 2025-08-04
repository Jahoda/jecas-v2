---
title: "Tisk stránky"
headline: "Vytisknutí stránky"
description: "Jak správně připravit webovou stránku pro pohodlné vytištění."
date: "2014-10-28"
last_modification: "2018-08-17"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Rady a nápady"]
---

Ačkoliv s nástupem **chytrých mobilních zařízení** a dostupnějšího internetu není už taková potřeba weby tisknout na papír, stále mohou nastat případy, kdy je žádoucí vhodnou tiskovou podobu připravit.

## Vyvolání dialogu *Tisk*

Usnadnit návštěvníkům stránky tištění jde jednoduchým skriptem. Takto bude vypadat **tlačítko k vytištění** – vyvolá dialog *Tisk*. Totéž se vyvolává většinou klávesovou zkratkou Ctrl + P nebo z nabídky prohlížeče pod položkou *Tisk*.

```
&lt;button onclick="**window.print()**">
  Vytisknout
&lt;/button>
```

  Vytisknout

## Možné přípravy k tisku

Pokud výchozí podoba stránky není úplně ideální, lze tomu po **technické stránce** pomoci třemi způsoby (případně je kombinovat):

    Tiskovou stránku připravit **změnou CSS**, slouží k tomu CSS pravidlo / HTML atribut `@media`/`media`:

    Pro účely tištění **na straně serveru** vygenerovat zjednodušenou podobu téže stránky. Jen pouze s obsahem určeným k tisku.

    Zjednodušenou podobu stránky **připravit JavaScriptem**.

## Tiskový styl

Připojit ke stránce tiskový styl jde buď již zmíněným `@media print` pravidlem (pozor, `print` se nepíše do závorky, když to tak napíšete, tak to nebude fungovat):

```
@media **print** {
  /* styly se aplikují při tisku */
}
```

Nebo značkou `&lt;link>`:

```
&lt;link rel='stylesheet' href='tiskovy-styl.css' media='**print**'>
```

Či přes CSS `@import`:

```
@import url('style/print.css') **print**;
```

Podstatná nevýhoda externího tiskového souboru tkví ve skutečnosti, že **bude zdržovat načítání stránky**, i když nebude potřeba. Styly se stahují, i když se kvůli (`media=print`) nepoužijí. (Více o problematice v anglickém článku [Does a print CSS file slow your site down?](https://www.nccgroup.com/en/blog/2014/10/does-a-print-css-file-slow-your-site-down/).)

Přidání tiskových pravidel do **hlavního CSS** proto vypadá jako lepší volba (pokud těch tiskových pravidel není moc).

V tiskové stylu je obvykle dobré nastavit **černý text na bílém pozadí**, abychom tisknoucímu uživateli zbytečně moc neplýtvali inkoustem či jinou náplní v jeho tiskárně (některé novější prohlížeče to dělají automaticky).

Hodí se odkrýt i obsah **skrytý v atributech**, typicky popisky `title` nebo možná i cíle odkazů (`href`). Jde to snadno kombinací [`content` + `attr()`](/content-attr).

Dilema potom nastává při určování, které prvky stránky **nechat tisknout**, a které schovat pomocí `display: none`, čímž je z tisku vyjmout. Můžeme tím uživateli **nepěkně zavařit**, protože zrovna to, co by chtěl, si třeba nebude moci vytisknout.

Výhodou řešení tiskovým stylem je relativně **nízká pracnost**. Stačí jen použít pár CSS pravidel. Ulehčit práci (ale často i přidat záhadné problémy) při přepisování původních vzhledů umí příkaz `!important`.

```
.menu {
  display: none!important;
}
```

Menu se skryje i v případě, že ho zviditelňuje (`display: block`) **silný selektor**.

    - [Print Stylesheet Approaches: Blacklist vs Whitelist](https://css-tricks.com/print-stylesheet-approaches-blacklist-vs-whitelist/) – 2 postupy, kterými tvořit tiskový styl

## Zvláštní stránka pro tisk

Další možnost je na straně serveru připravit upravenou (zjednodušenou) podobu, kde bude jenom **hlavní obsah**, s minimem CSS. Může to být snazší než přes styly **skrývat různé části** webu.

Zvláštní tiskovou stránku je dobré kvůli vyhledávačům **zakázat indexovat**, aby nehrozil vznik **duplicit**.

Zakázat indexování jde přes `&lt;meta>` značku:

```
&lt;meta name="robots" content="noindex,nofollow,nosnippet,noarchive">
```

**Lepší** je to ale i v souboru [`robots.txt`](http://www.jakpsatweb.cz/robots-txt.html), protože na stránku s `&lt;meta>` tagem mohou roboti zbytečně chodit.

Odkaz na **versi pro tisk** můžeme navíc doplnit o `rel="nofollow"` nebo ho realisovat JavaScriptem, aby lákal roboty co možná nejméně.

Trochu problém může nastat, když někdo bude **stránku pro tisk sdílet**, takže by na ní neměl chybět odkaz na **originální podobu** / hlavní stránku.

Výhoda tohoto postupu je v tom, že má návštěvník **na výběr ze dvou variant**, co si vytiskne.

  - Buď web v **původní podobě**, podobně jako ho vidí na monitoru,

  - nebo ve variantě upravené pro tisk.

## Zvláštní stránka vytvořená JavaScriptem

Zajímavá metoda je samostatnou stránku pro tisk **připravit JavaScriptem**. Odpadá tím pracné vytváření speciální stránky na **serveru**, odpadá tím nutnost zaobírat se případnou duplicitou ve vyhledávačích nebo řešit, co se stane, když speciální stránku bude někdo sdílet. Skriptem vygenerovaná *stránka* pro tisk nebude mít žádnou URL.

**Jak na to?** JavaScriptem si [otevřeme nové okno](/nove-okno#window-open-dalsi) (`window.open`), kam nastrkáme příslušný HTML kód, co chceme tisknout, a **spustíme tisk**.

```
function vytisknout(htmlKod, titulek) {
    var w = 800, // šířka okna
        h = 600, // výška okna
        left = (window.screen.width - w) / 2,
        top = (window.screen.height - h) / 2;
    var okno = window.open(
        '', // URL žádná není
        'oknoTisk', // název okna
        "height=" + h + ", width=" + w + 
        ", left=" + left + ", top=" + top + 
        ", location=no, menubar=yes, status=no, toolbar=no, scrollbars=yes, resizable=yes");
    okno.document.write(
      '&lt;!doctype html>&lt;meta charset="utf-8">&lt;title>' + 
      titulek + 
      '&lt;/title>'
    );
    okno.document.write(htmlKod);
    okno.document.close();
    okno.focus();
    okno.print();
    okno.close();
}
```

Kromě HTML kódu se funkci `vytisknout` předává i `titulek`. Ten se v HTML kódu dá do `&lt;title>` a slouží k ovlivnění textu, který se tiskne do **záhlaví**. Obdobně můžeme připojit případné **externí CSS** nebo styly uvést přímo do značky `&lt;style>`.

Jinak funkce dělá stručně následující:

  - Nastaví rozměr vyskakovacího okna na 800 × 600.

  - Podle [velikosti rozlišení](/zjisteni-rozmeru) umístí okno (přibližně) doprostřed.

  - Jako obsah okna vloží požadovaný HTML kód (`okno.document.write`).

  - Kvůli některým prohlížečům dá pro jistotu oknu `focus`.

  - **Vytiskne stránku** – `okno.print()`.

  - Zavře okno s obsahem pro tisk – `okno.close()`.

### Použití

Použití funkce je prosté. Předá se jí HTML kód – například [`innerHTML`](/innerhtml) požadovaného elementu.

```
&lt;button onclick="
    vytisknout(
        document.getElementById('**id-prvku-pro-tisk**').*innerHTML*, 
        'Titulek tisknuté stránky'
        )">
    Vytisknout element s ID „id-prvku-pro-tisk“
&lt;/button>

```

[Živá ukázka](http://kod.djpw.cz/jygb)

## Zobrazení náhledu tištěné stránky

Uživatelům majícím špatné zkušenosti z tištění webů může vadit, že se vyvolá tiskový dialog, aniž by bylo jasné, **co se ve skutečnosti vytiskne**. Ne všechny prohlížeče disponují náhledem po zavolání `window.print`.

Řešení je umístit **tlačítko přímo vyvolávající tisk** až do vyskakovacího okna a tiskový dialog nevyvolávat automaticky. Neměli bychom zapomenout tlačítko *Tisk* při tisku skrýt:

```
@media print {
  .tlacitko-tisk {display: none}
}
```

Druhá možnost je zajistit tiskový náhled ve vlastní režii přímo na původní stránce. Tj. po kliknutí na nějaké tlačítko aplikovat tiskový styl. A to:

    Dynamickým připojením tiskového CSS jako úplně běžného souboru se styly.

    ```
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '**tiskovy-styl.css**';
document.getElementsByTagName('head')[0].appendChild(link);
```

    Změnit třídu společnému rodiči stránky (`&lt;html>`/`&lt;body>`). [Přidat/odebrat](/prepinani-trid) třídu `nahled-tisku`, která se dále použije ke stylování.

    ```
/* menu tisknou nebudeme */
.nahled-tisku .menu {
  display: none;
}

```

    [Živá ukázka](http://kod.djpw.cz/lygb-)

## Náhled tisku v prohlížeči

Pro testování vzhledu při tisku vlastních webů se hodí funkce **Tiskový náhled**, kterou disponuje většina prohlížečů.

Ve **Firefoxu** a **Chrome** se objeví při volbě *Tisk* z menu. V **Exploreru** je v menu v nabídce *Tisk* → *Náhled*. V nové **Opeře 25** jsem tiskový náhled nenašel.

Ukázka náhledu v **Chrome**. Pozadí je automaticky odebráno.

Pro zkušební tisk bez plýtvání papíru se hodí **tisk do PDF**. **Chrome** to umí přímo. Pro ostatní prohlížeče je řešením instalace tzv. *PDF tiskárny*, což je program, který se tváří jako klasická tiskárna, jen místo mačkání a zasekávání papíru ukládá výstup do PDF.

Úprava barev -webkit-print-color-adjust

Prohlížeče vycházejí z **Webkitu** (**Chrome**, **Opera** apod.) podporují vlastnost `-webkit-print-color-adjust` – ta může mít dvě hodnoty (kromě globálních `initial`, `initial` a `unset`):

    `economy` – výchozí hodnota, při které se netisknou některé grafické prvky jako třeba pozadí, aby se neplýtvalo barvou

    `exact` – web se vytiskne bez úprav