---
title: "Data URI"
headline: "Data URI"
description: "Data URI je způsob, jak obsah externího souboru zapsat přímo do HTML/CSS."
date: "2014-10-21"
last_modification: "2015-11-16"
status: 1
tags: ["HTML", "Zrychlování webu"]
---

Nejčastěji se *Data URI* používá pro obrázky.

    V **HTML** značce `&lt;img>:`

    ```
&lt;img src="**data:**image/png;base64,*samotná data obrázku*>
```

    V **CSS** jako pozadí:

    ```
background: url("**data:**image/png;base64,*samotná data obrázku*");
```

Pomocí `data:` tak jde vložit do HTML obrázek, aniž by se musel někam zvlášť nahrávat (funkční od **IE 8**):

Řetězec *data* na začátku je jakýsi pseudo-protokol, pomocí kterého prohlížeč pochopí, že má místo dotazu na externí soubor použít následující data.

Pro běžné [formáty obrázků](/format-obrazku) se obsah typicky kóduje pomocí *base64*.

## Převod na data URI

Převést obrázek na *data URI* umí prohlížeče podporující třídu `FileReader`, která umí číst soubory určené k [uploadu](/upload#filereader) (**IE 10+**).

Stačí sem požadovaný soubor vložit a zobrazí se jeho data URI (soubor se nikam nenahrává).

  Převést soubor na data URI

### PHP

V PHP může vložení externího obrázku přes `data:` vypadat následovně:

```
$obrazek = file_get_contents("logo.png");
$dataUrl = "data:image/png;base64," . base64_encode($obrazek);
echo "&lt;img src='" . $dataUrl . "'>";
```

Šablonovací systém **Latte** v [Nette Frameworku](/nette) na to má přímo [makro](https://doc.nette.org/cs/2.1/default-helpers#toc-datastream) `dataStream`:

```
&lt;img src="{$img|dataStream}">
```

### JavaScript

V JavaScriptu od **IE 10** funguje přímo metoda `[btoa](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa)`.

Případě existují online převodníky do *base64*:

    - [Base64 encoder and decoder](http://www.mobilefish.com/services/base64/base64.php)

## Využití `data:` protokolu

Nejčastěji se data URI používá ke snížení počtu **HTTP spojení**. Pokud není použit protokol HTTP/2, režie navázání spojení pro získáním jednotlivého souboru je mnohem větší než samotné stažení dat.

Při velkém počtu souborů hraje navíc roli **maximální počet souběžných spojení**, kvůli kterému musí soubory čekat ve frontě.

Pokud se data obrázku vloží přímo do HTML kódu, zobrazí se ve chvíli, kdy na ně prohlížeč narazí.

### Srovnání rychlosti

Při simulované rychlosti připojení **2G** (pomocí [vývojářských nástrojů](/vyvojarske-nastroje) v **Chrome**), jsem načetl stránku s 500 obrázky o celkové velikosti **1,5 MB**:

    Při běžném přípojení značkou `&lt;img src="obrazek.png">` trvalo načtení průměrně **65 vteřin**.

    Při použití *inline* obrázků pomocí data URL trvalo totéž cca **45 vteřin**.

Může se tedy zdát, že používání obrázků přes `data:` je dobrý nápad a vede ke zrychlení.

Jenže…

Data URI přinesou zrychlení při **prvním načtení**, ale potom se situace otočí.

Stránka bez data URI se při opakovaném načtení z cache kompletně stáhne a zobrazí v čase kolem **30 vteřin**, navíc se přenese jen cca desetina dat, protože všechny obrázky vrátí hlavičku *304 Not Modified*, takže se znovu nestahují a vezmou se z cache prohlížeče.

Další věc je vykreslení obsahu HTML stránky – jelikož je HTML kód prošpikován daty obrázků, stáhne se jako celek později.

Při použití **externích obrázků** se HTML dotáhne rychleji, takže návštěvník vidí kompletní textový obsah dříve a obrázky se jen načtou později.

Mít v HTML kódu inline obrázky tak není moc rozumné.

V případě **CSS** je situace podobná. Vložené data-obrázky prodlouží stažení celého CSS souboru. Pokud jsou v něm i obecné styly a nenačítá se asynchronně (tj. blokuje [vykreslení stránky](/vykreslovani)), tak bude návštěvník do dotažení obrázků koukat na prázdnou stránku.

Při použití obrázků přes `data:` v CSS je tak dobré:

    Mít všechny deklarace data-obrázků ve zvláštním CSS souboru.

    Načítat CSS s data-obrázky [asynchronně](/nacitani-css).

I tak přetrvávají další problémy:

  Změna jediného obrázku **invaliduje cache** všech obrázků na stránce.

  Různé stránky zpravidla potřebují různé obrázky. Při použití data URI se **stáhnout vždy úplně všechny**, i když se na stránce nepoužijí.

Podrobněji se problematikou *inline* obrázku zabývá článek:

      Performance Calendar: [Why Inlining Everything Is NOT The Answer](http://calendar.perfplanet.com/2011/why-inlining-everything-is-not-the-answer/)

## Vše v jednom

Občas se zápis externích souborů přes `data:` používá kvůli omezeným možnostem nebo pohodlnosti instalace.

Může být pohodlnější si do stránky připojit hotový skript – třeba pro [lightboxovou](/lightbox) galerii, který sestává z jediného `*.js` souboru, co v sobě má obrázky i styly. Není tak nutné přemýšlet co kam nakopírovat a podobně.

V případech, kdy není na stránku možné nahrát soubor, ale jde zapisovat HTML, je pseudo-protokol data způsob, jak na takovou stránku vložit obrázek.

## Base64 a SVG

Pro vložení [SVG](/svg) přes data URI je zbytečné base64 používat. Naopak je to dokonce škodlivé, protože to způsobí větší datovou velikost.

    - CSS Tricks: [Probably Don’t Base64 SVG](http://css-tricks.com/probably-dont-base64-svg/)

## Data URI vs. CSS sprite

Zápisem obrázků přes data URI jde nahradit používání [obrázkových spritů](/css-sprite) (spojení všech obrázků do jednoho a jejich vybírání pomocí `background-position`).

Data-obrázky jsou v CSS pohodlnější na používání.

Nevýhoda je teoreticky nefunkčnost v prehistorických prohlížečích (např. **IE 7**). A nutnost řešit asynchronní načítání CSS souboru s data-obrázky.

    - [DataURI vs CSS Sprites – Understanding Which One Performs Better](http://www.onextrapixel.com/2015/03/21/datauri-vs-css-sprites-understanding-which-one-performs-better/)

## Odkazy jinam

  - MDN: [data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs)

function zpracovat(el) {
    var soubory = el.files;
    for (var i = 0; i ";
        nahledy.appendChild(pre);
    };
    reader.readAsDataURL(soubor);    
}