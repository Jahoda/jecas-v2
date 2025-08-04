---
title: "Výška iframe podle obsahu"
headline: "Automatická výška <code>&lt;iframe></code> podle obsahu"
description: "Definitivní řešení automatického nastavování velikosti <code>&lt;iframe></code> podle výšky obsahu."
date: "2015-09-01"
last_modification: "2015-09-01"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Vnořený [rámec `&lt;iframe>`](/ramy#iframe) je způsob, jak stránku čistě v HTML **sestavit z více samostatných souborů**.

Pokud je dostupné skriptování na straně serveru, bývá lepší stránku z kousků sestavit už tam:

    - [Jednoduchý web v PHP](/include) – složení hlavičky, menu a obsahu v PHP

Při použití `&lt;iframe>` je problém, že není jasné, jakou mu nastavit výšku, **aby se zobrazil obsah celý bez posuvníku**.

Nastavování něčeho jako `height: auto` nemá na funkci vliv.

## Hotové řešení

Naštěstí jde u stránky v rámu spočítat její výšku a tu následně skriptem nastavit jako výšku rámu.

HTML kód rámu bude vcelku obyčejný:

```
&lt;iframe 
  src="stranka.html" 
  frameborder="0" 
  **id="ram"** 
  width="100%" 
  height="500">
&lt;/iframe>
```

Za povšimnutí stojí identifikátor `ram`, podle kterého se s ním bude dále pracovat. Výška 500 pixelů (`height="500"`) je pouze záložní pro případ bez JavaScriptu.

Rámeček (`frameborder`) a stoprocentní šířka (`width="100%"`) by šla nastavit i přes CSS. Pro **IE 8** a starší je ale vypnutí rámečku atributem `frameborder` asi nejrozumnější řešení.

### Zjištění výšky v JS

Kód pro zjištění a nastavení výšky proběhne po načtení obsahu (`onload`):

```
var ram = document.getElementById("ram");
ram.scrolling = "no";
ram.onload = function() {
  var obsah = ram.contentDocument || ram.contentWindow.document;
  ram.style.height = obsah.documentElement.scrollHeight + "px";
};
```

Za povšimnutí stojí:

  - Zabránění zobrazení posuvníku a rolování pomocí `ram.scrolling = "no"`. Posuvník by jinak ubíral místo obsahu. Důležité je toto nastavit v JS, aby se bez skriptování dalo k obsahu rámu dostat.

  - Sjednocení `ram.contentDocument || ram.contentWindow.document` – druhá část slouží pro **IE 7** a starší

  - Pro počítání výšky se používá `scrollHeight`. Hodnota `offsetHeight` by ve většině prohlížečů vracela původní výšku.

  [Samostatná živá ukázka](http://kod.djpw.cz/fupb)

### Změna velikosti stránky

Pokud by šířka iframu nebyla fixní, při zúžení/rozšíření okna se výška obsahu v rámu natáhne nebo zmenší.

Pro docílení lepšího výsledku stačí přepočet provést kromě po načtení obsahu i při `window.onresize`. [Ukázka](http://kod.djpw.cz/gupb)

### Plynulá změna

Nastavení výšky rámu by navíc ještě šlo **animovat** pomocí [CSS transition](/transition):

[Živá ukázka](http://kod.djpw.cz/dupb)

## Automatická výška externího obsahu

Problém nastává při **vkládání obsahu do rámu z jiné domény**. Kvůli bezpečnosti do takové stránky nemá JavaScript přístup. Stránka v rámu se načítá včetně cookies a dalších dat uživatele, takže by bez tohoto omezení bylo možné ovládat libovolnou aplikaci, kde je návštěvník přihlášen.

### Spolupráce autora externího obsahu

Pokud autor obsahu, který se má načítat do rámu, spolupracuje, je možné:

    Změnit způsob vkládání obsahu na **externí JavaScript**, který obsah vloží přímo do stránky bez použití `&lt;iframe>`.

    Má to svá specifika: obsah převezme styl stránky, která ho vkládá. Pomocí externího JS má jeho správce prakticky **neomezenou kontrolu nad webem**. Proto by externí JS z neznámého zdroje neměl být načítán u citlivých stránek.

    Předat informaci o výšce prostřednictvím změny #hashe v URL.

    Umístit do stránky následující kód:

    ```
window.onload = function() {
  var vyska = document.documentElement.scrollHeight;
  window.top.location = "#vyska=" + vyska;
}
```

    Ten do hostiteské stránky předá výšku v kotvě (`location.hash`).

    V nadřazené stránce stačí už jen výšku přečíst a nastavit rámu:

    ```
&lt;iframe src="" width="100%" frameborder="0"
  onload="
    var vyska = window.location.hash.replace('#vyska=', '');
    this.style.height = vyska + 'px';
">
&lt;/iframe>
```

    Tento postup funguje v **Chrome** a **Firefoxu** pouze při uvedení absolutní adresy. V **Internet Exploreru** a staré **Opeře 12** to funguje i při relativní:

    Ukázka externí stránky v rámu s automatickou výškou:

        #ram {
          height: 0; 
          transition: .2s height;
          border: 0;
          width: 100%;
        }

        function nastavitVysku() {
          var vyska = window.location.hash.replace('#vyska=', '');
          if (vyska) {
            ram.style.height = vyska + 'px';
          }          
        }
        window.onhashchange = nastavitVysku;          

      Připojit stránku s absolutní URL
      Připojit stránku s relativní změnou #hashe

### Vlastní řešení

Pokud autor stránky nespolupracuje, je nejspíš jediná možnost stáhnout jeho stránku serverovým skriptem.

V PHP k tomu slouží funkce `file_get_contents`:

    - [Získání obsahu cizí stránky](/stazeni-stranky)

### Přístup k subdoméně

Je-li stránka A na jiné subdoméně než stránka B, měl by pomoci následující JS kód na obou stránkách:

```
document.domain = 'example.com';
```

Více v článku:

    - [Iframe cross domain JavaScript calls](http://madskristensen.net/post/iframe-cross-domain-javascript-calls)