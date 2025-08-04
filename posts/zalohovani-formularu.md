---
title: "Zapamatování formulářových polí"
headline: "Automatické zapamatování formulářů"
description: "Při vyplňování delších formulářů se je hodí obsah průběžně ukládat. Jak na to?"
date: "2013-08-16"
last_modification: "2013-09-23"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

## Vhodné úložiště

V první řadě je třeba rozhodnout, kam se budou dočasná data ukládat. K disposici je:

  Na **straně serveru**:
    
      - database,

      - soubory,

      - session

  Na **straně klienta**:
    
      - sušenky (cookies),

      - lokální úložiště (`localStorage`)

### Na straně serveru

Výhoda v ukládání na straně serveru je **lepší trvanlivost a přenositelnost dat**, pochopitelně v případě, že má uživatel nějaký identifikátor (je na webu přihlášen). Potom není problém formulář rozepsat a dopsat (po přihlášení) na úplně jiném zařízení.

Komfortní (časté) **ukládání na serveru** bude vytvářet jistou zátěž, což může být v případě hodně uživatelů problém. Proto může být vhodné řešení, kdy se pravidelně v nízkých časových intervalech zálohuje u klienta; a na server se ukládají jen významnější změny nebo po uplynutí delší doby.

### Na straně klienta

Ukládání **na straně klienta** má nepochybnou výhodu v nezatěžování našeho serveru a rychlosti (jenom zaslání a zpracování HTTP požadavku může zabrat desítky milisekund). Zátěž spojená s průběžným ukládáním se zcela **přenese na klienta**.

Použít je možné **cookies**, tam se ale větší obsah nemusí vejít (většinou se uvádí **maximální velikost cookies** okolo 4 kB), proto se nabízí **lokální úložiště** (`localStorage`).

## Lokální úložiště

Lokální úložiště funguje od **Exploreru 8**, pro starší prohlížeče lze dodělat [podporu](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=151480#4) přes `behavior: url(#default#userData)`:

```
if(!window.localStorage && document.documentElement.addBehavior) window.localStorage = (function(name)
{
  var prefix = "storage-";
  var link = document.createElement("link");
  link.addBehavior("#default#userData");
  document.documentElement.firstChild.appendChild(link);
  return {
    setItem: function(key, value)
    {
      link.setAttribute(prefix + key, value);
      link.save(name);
    },
    getItem: function(key)
    {
      try { link.load(name); } catch(exc) {}
      return link.getAttribute(prefix + key);
    },
    removeItem: function(key)
    {
      link.removeAttribute(prefix + key);
      link.save(name);
    }
  };
})("localStorage");
```

### Použití

    Uložení obsahu
    ```
localStorage.**set**Item("nazev-polozky", "hodnota");
```

    Může se používat s určitým časovým opakováním nebo po nějaké akci (zaškrtnutí políčka ve formuláři, stisknutí klávesy).

    Přečtení obsahu
    ```
var obsah = localStorage.**get**Item("nazev-polozky");
```

    Proběhne při načtení stránky.

    Odstranění obsahu
    ```
localStorage.**remove**Item("nazev-polozky");
```

    Proběhne při **úspěšném** odeslnání formuláře.

Před *používáním* `localStorage` je ještě vhodné **testovat jeho dostupnost**:

```
if (window.localStorage) …
```

### Hotové řešení

**Hotové řešení** průběžného ukládání celých formulářů je například:

[Sisyphus.js](http://sisyphus-js.herokuapp.com/)
  
## Odkazy

  - [Vault.js](http://toddmotto.com/vault-js-html5-local-session-web-storage-api-with-automatic-json-support/) — Web Storage API s automatickou podporou JSONu