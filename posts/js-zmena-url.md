---
title: "Změna adresy v JS"
headline: "Změna adresy JavaScriptem"
description: "JavaScript může měnit URL. Jak a v jakých případech toho využívat."
date: "2014-04-14"
last_modification: "2015-07-16"
status: 1
tags: ["JavaScript", "Hotová řešení", "Google Analytics"]
---

Prohlížeče podporující **stav** (*state*) v objektu `window.history` dokáží měnit tvar URL bez nutnosti přecházet na jinou stránku nebo vůbec dělat cokoliv dalšího.

Tuto funkci podporuje **IE 10**, **Firefox 4**, **Chrome 5**, **Opera 11.5** a novější. Naopak podpora chybí ještě i v **Opeře Mini 8**.

U [AJAXových](/ajax) aplikací jde díky tomu zajistit, že se dá na aktuální stránku odkázat a ta se může **přímo načíst ze serveru**. Zároveň to umožňuje plnohodnotnou funkci **tlačítka Zpět**.

Více v článku:

    - [Změna URL bez obnovení stránky](/zmena-url)

## Změna URL

Tento článek se zabývá samostatnou změnou URL bez dalších navazujících činností. K prosté změně se hodí použít metodu `replaceState` – změna adresy se potom **neuloží do historie**.

Použití je prosté:

```
history.replaceState(
  {}, 
  '', 
  **'nova-url'**
);
```

Metoda `replaceState` má tři parametry:

  - `{}` – objekt stavu, v tomto případě není potřeba

  - **titulek** – nikde se nezobrazuje, může být prázdný

  - **adresa** – adresa, která nahradí tu stávající

Vyzkoušejte:

      Změnit zdejší URL na:
      
      Nastavit

## Využití

Měnit takto URL se hodí třeba k jejich **čištění** různých sledovacích parametrů. Případně pro přidávání parametrů jiných.

### Odstranění UTM parametrů z URL

Asi nejčastěji se používají UTM parametry.

    - Zaklik.cz: [Tagování zdroje UTM parametry](http://www.zaklik.cz/ppc-ucty/utm-parametry/)

Jedná se o řetězce typu:

```
?utm_source=rss&amp;utm_medium=feed&amp;utm_campaign=nazev
```

Případně místo otazníku může být UTM část adresy za mřížkou:

```
**#**utm_source=rss&amp;utm_medium=feed&amp;utm_campaign=nazev
```

Pro odstranění UTM trackovacích parametrů poslouží následující funkce:

```
var odstranitUtm = function() {
    var puvodniAdresa = window.location + "";
    var bezUtm = puvodniAdresa.replace(/([#&amp;?])utm([_a-z0-9\.=]+)/ig, "");
    
    if (puvodniAdresa !== bezUtm &amp;&amp; history.replaceState) {
        history.replaceState({}, '', bezUtm);
    }  
};
```

[Samostatná ukázka](http://kod.djpw.cz/afob-?utm_source=rss&utm_medium=feed&utm_campaign=jecas)

Při používání [Google Analytics](/ga) se hodí funkci pro odstranění parametrů zavolat až jako *callback* po započítání návštěvy:

Tedy rozšířit standardní:

```
ga('send', 'pageview');
```

O zavolání funkce `odstranitUtm`.

```
ga('send', 'pageview', **{'hitCallback': odstranitUtm}**);
```

Sledovací parametry se tak z URL odstraní až po jejich **započtení do Google Analytics**.

  function zmenitUrl() {
    var url = document.getElementById("zmena-url").value;
    history.replaceState({}, '', url);
    return false;
  }