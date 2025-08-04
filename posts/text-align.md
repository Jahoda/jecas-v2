---
title: "Text-align"
headline: "Text-align"
description: "CSS vlastnost <code>text-align</code> nastavuje zarovnání písma."
date: "2014-11-26"
last_modification: "2014-11-27"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Ve své základní podobě (zarovnání vlevo, vpravo, na střed či do bloku) je široce podporovaná napříč prohlížeči.

## Co jde zarovnat

V aktuálních prohlížečích funguje `text-align` pouze na řádkové (`[display](/display): inline`) nebo řádkově-blokové (`display: inline-block`) prvky.

Dříve šlo v **IE** v [QUIRK režimu](/doctype#quirk) přes `text-align` zarovnávat i bloky. Ve **Firefoxu** a **Chrome** jde toto chování simulovat hodnotami s [CSS prefixy](/css-prefixy). [Ukázka](http://kod.djpw.cz/gcib).

Různým způsobům centrování se věnuje samostatný článek.

    - [Centrování v CSS](/centrovani)

## Dědičnost

Zarovnání pomocí `text-align` od rodiče **dědí** jeho potomci.

```
&lt;div>Bude vlevo (výchozí)&lt;/div>
&lt;div style="text-align: **center**">
  &lt;div>Bude uprostřed&lt;/div>
  &lt;div style="text-align: **right**">
    &lt;div>Bude vpravo&lt;/div>
  &lt;/div>
&lt;/div>
```

[Ukázka](http://kod.djpw.cz/jdib)

## Základní zarovnávání

  `left`
  
    ```
text-align: left
```

    Výchozí chování u textu psaného zleva doprava (`ltr` – *left to right*).

  `right`
  
    ```
text-align: right
```

    Zarovnání textu k pravé straně.

  `center`
  
    ```
text-align: center
```

    Zarovnání textu na střed.

  `justify`
  
    ```
text-align: justify
```

    Zarovnání textu do bloku jako je tomu běžné například u **novinových sloupků**. Používání `text-align: justify` je trochu problematické s ohledem na fakt, že ne všechny prohlížeče umí **dělit text uprostřed slova**. Při **zarovnání do bloku** tak snadno vznikají tzv. **řeky**, kdy jsou mezi jednotlivými slovy nepřirozeně velké mezery.

    Rozdělování slov spojovníkem na konci řádku jde v něterých prohlížečích zapnout CSS vlastností [`hyphens`](/hyphens).

## Začátek a konec

Mimo **IE** fungují dále hodnoty označující **začátek a konec řádku** (v závislosti na směru psaní textu).

  `start`
  
    ```
text-align: start
```

    V případě u nás běžného psaní zleva doprava je `start` ekvivalentem `text-alight: left`.

  `end`
  
    ```
text-align: end
```

    Zarovnání textu na konec řádku, což se chová v podporovaných prohlížečích jako `right`.

## Zarovnání posledního řádku

Zvlášť v případě zarovnání do bloku `(text-align: justify`) je většinou cílem, aby se **poslední řádek** do bloku nezarovnával.

Prohlížeče tak činí – poslední řádek zarovnávají na začátek řádku. Vlastností `text-align-**last**` je možné toto chování změnit a poslední řádek bloku například **vycentrovat**.

Nastavení zarovnání posledního řádku funguje ve všech **IE** (od **IE 5.5**) a ve **Firefoxu** s prefixem.

[Ukázka](http://kod.djpw.cz/mcib) centrovaného posledního řádku.

## Specifikace

CSS specifikace do budoucna počítá, že `text-align` bude zkratka pro:

  - `text-align-**last**` – zarovnání posledního řádku

  - `text-align-**all**` – zarovnání všech řádků

## Zarovnání podle znaku

CSS specifikace dále počítá s možností zarovnávat podle **určitého znaku** – třeba podle **desetinné čárky** nebo **jednotek**.

```
text-align: ".";
text-align: start ".";
text-align: "." end;
```

U následujícího seznamu by se to velmi hodilo:

    - 10,1

    - 5,55

    - 105,55

    - 5,525

Bohužel to v žádném prohlížeči **nefunguje**.

### Pevný počet desetinných míst

Nejrychlejší řešení, jak se o takové zarovnání pokusit, je zajistit **pevný počet desetinných míst**, nastavit šířku a zarovnat obsah doprava.

    - 10,018

    - 5,550

    - 105,550

    - 5,111

Dobře bude fungovat ale jen u **neproporcionálních písem**, která mají všechny číslice stejně široká.

### Tabulka

Další možnost je **tabulka**. Ať už klasická nebo v CSS s využitím [tabulkových hodnot](/display#tabulkove) vlastnosti `display`.

  .desetinne-zarovnani {
      display: table;
      border-collapse: collapse;
  }
  
  .desetinne-zarovnani li {
      display: table-row;
  }
  
  .desetinne-zarovnani span {
      display: table-cell;
  }
  
  .desetinne-zarovnani .cislo {
      text-align: right;
  }  

    - 10,518

    - 0,8

    - 5810,58

    - 10,18

[Samostatná ukázka](http://kod.djpw.cz/jcib)

To funguje zdánlivě hezky, ale jen do chvíle, kdy bude nutné **text kopírovat** — rozdělení do sloupců totiž způsobí vložení tabulátorů mezi ně.

```
10	,	518
```

### Pevná šířka celého čísla

Jako funkční postup se zdá obalení **celého čísla** `&lt;span>`em a nastavení jeho **šířky a zarovnání doprava**:

  .pevna-sirka .cele-cislo {
      display: inline-block;
      text-align: right;
      width: 2em;
  }

    - 10,518

    - 0,8

    - 810,58

    - 10,18

[Samostatná ukázka](http://kod.djpw.cz/kcib)

Potřebný HTML kód pro správné zarovnání je potom ideální **generovat na straně serveru**.

Další nevýhoda kromě úprav HTML je, že pevná šířka není universální pro různě dlouhá čísla. To by mohl vyřešit kousek JavaScriptu, co **čísla přeměří** a šířku nastaví podle toho nejdelšího.

  .zarovnat-cisla .cele-cislo {
      display: inline-block;
      text-align: right;
  }

První blok:

    - 10,518

    - 0,8

    - 810,58

    - 10,18

Druhý blok:

    - 1,8

    - 100 010,518

    - 0,8

    - 1 810,58

    - 10,18

  var kZarovnani = document.querySelectorAll(".zarovnat-cisla");
  
  for (var i = kZarovnani.length; i--; ) {
      var cisla = kZarovnani[i].querySelectorAll(".cele-cislo");
      
      var sirka = 0;
      for (var j = cisla.length; j--; ) {
          var sirkaCisla = cisla[j].offsetWidth;
          sirka = (sirkaCisla > sirka) ? sirkaCisla : sirka;
      }
      
      for (var j = cisla.length; j--; ) {
          cisla[j].style.width = sirka + "px";
      }    
  }

[Samostatná ukázka](http://kod.djpw.cz/ncib)

## Odkazy

  - DevDocs: [`text-align`](http://devdocs.io/css/text-align)

  - W3C: [Text Alignment: the ‘text-align’ shorthand](http://dev.w3.org/csswg/css-text/#justification)