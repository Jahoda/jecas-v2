---
title: "JS úložiště Local Storage"
headline: "Úložiště <code>localStorage</code>"
description: "Local Storage je úložiště v prohlížeči klienta přístupné JavaScriptem. K čemu se hodí?"
date: "2015-03-13"
last_modification: "2015-09-16"
status: 1
tags: ["JavaScript"]
---

Lokální úložiště má využití v případě, kdy je potřeba návštěvníkovi uložit nějaká data, která **není potřeba přenášet na server**.

To je třeba případ **průběžného ukládání obsahu formulářů**, které se díky lokálnímu úložišti může provádět velmi často, takže v případě nějakého problému přijde uživatel maximálně o pár znaků textu.

    - [Automatické zapamatování formulářů](/zalohovani-formularu)

Někdy se `localStorage` používá i pro **ukládání nastavení**, ale to může být lepší vázat na uživatelský profil, aby bylo přenositelné mezi různými zařízeními, které uživatel používá.

## Cookies

Dříve se pro ukládání používaly zpravidla **cookies** – ty mají ale jistá omezení a problémy:

    Při všech HTTP požadavcích se **odesílají na server**, což limituje jejich velikost a zvětšuje objem přenášených dat.

    Bezpečná velikost napříč prohlížeči je **4 kB** pro všechny cookies na dané doméně, bezpečný maximální počet sušenek je **20**. Novější prohlížeče mají limity velkorysejší. Do velikosti se započítává i název cookie, nastavení expirace a podobně.

        - [Browser Cookie Limits](http://browsercookielimits.squawky.net/) – limity v současných prohlížečích

    Kvůli nepotřebnosti přenášení cookie se někdy servírují statické soubory (styly, skripty, obrázky), které sušenky k ničemu nevyžadují, z jiné domény.

    Práce s cookies není v JavaScriptu úplně pohodlná.

    Nastavování cookie probíhá prostřednictvím `document.cookie`. Přidání 2 sušenek vypadá následovně:

    ```
document.cookie = "nazev=hodnota";
document.cookie = "nazev2=hodnota2";
```

    Pro **získání všech cookies a jejich hodnot** se musí řetězec z `document.cookie` rozsekávat podle středníku a rovnítka, protože obsah `document.cookie` bude po předchozím použití následující:

    ```
nazev=hodnota; nazev2=hodnota2
```

    Aby byla manipulace s cookies pohodlnější, lze použít nějakou sadu funkcí:

        - MDN: [A little framework: a complete cookies reader/writer with full unicode support](https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#A_little_framework_a_complete_cookies_readerwriter_with_full_unicode_support)

## Ukládání větších dat do cookie

Pro ukládání větších dat pomocí cookie tak bylo před `localStorage` nutné používat hybridní způsob, kdy je v cookie pouze identifikátor, ke kterému se data ukládají na server.

## Lokální úložiště

Lokální úložiště funguje od **Internet Exploreru 8**. Z aktuálních rozšířených prohlížečů chybí podpora v mobilním prohlížeči **Opera Mini**.

Použití je elegantní:

### Uložení hodnoty `setItem`

```
localStorage.setItem("nazev-polozky", "hodnota");
```

### Přečtení hodnoty `getItem`

```
var obsah = localStorage.getItem("nazev-polozky");
```

### Odstranění položky `removeItem`

```
localStorage.removeItem("nazev-polozky");
```

### Odstranění všech dat `clear`

```
localStorage.clear();
```

## Platnost dat v `localStorage`

Data v lokálním úložišti zpravidla vydrží hodně dlouho. Nemají **omezenou dobu platnosti** jako `cookie` a běžní uživatelé je většinou nemažou.

## Velikost úložiště

Do `localStorage` se ve většině prohlížečů vejde 10 MB dat (**Chrome 40**, **Firefox 34**, **IE 9, 10, 11**). Prohlížeče **Safari** podporují 5 MB a **Android Browser 4.3** jen 2 MB.

Bezpečná velikost je tedy **2 megabyty**.

    - HTML5 Rocks: [Working with quota on mobile browsers](http://www.html5rocks.com/en/tutorials/offline/quota-research/) – přehled velikosti úložišť v prohlížečích

## Ukládání JSONu

Někdy se hodí ukládat do `localStorage` celé [JS objekty](/json). Lokální úložiště je velmi *hloupé* a umí ukládat pouze **řetězce**. Takže se objekt musí na řetězec převést.

### Uložení JSONu

JavaScriptový objekt se převede pomocí `JSON.stringify`:

```
var objekt = {
  "klic" : "hodnota",
  "klic 2" : "hodnota 2"
}
localStorage.setItem(
  "nazev-polozky", 
  **JSON.stringify**(objekt)
);
```

### Získání JSONu

Pro převodu řetězce zpět na JSON se použije `JSON.parse`:

```
var data = localStorage.getItem("nazev-polozky");
if (data) {
  var objekt = **JSON.parse**(data);
}
```

## Anonymní režim

V privátním/anonymním režimu **Safari**, **iOS Safari** a **Android browser** nepodporují nastavování položek do `localStorage` (stejně tak do `sessionStorage`).

Aplikace používající úložiště by s tím měla počítat.

Ostatní prohlížeče data uchovají pouze **do zavření** anonymního okna.

  - [Don’t Forget to Check Private Browsing Mode when Testing](http://arbitraryreason.com/dont-forget-to-check-private-browsing-mode-when-testing/)

## Zobrazení `localStorage` v prohlížeči

Pro testování se může hodit podívat, jaké položky v lokálním úložišti jsou.

Ve [vývojářských nástrojích](/vyvojarske-nastroje) (klávesa F12) jsou všechna úložiště dostupná na záložce *Resources*/*Zdroje*:

## Lokální úložiště jako cache

Ukládáním potřebných souborů do `localStorage` lze v některých případech **zrychlit načítání stránky** oproti standardnímu cacheování v prohlížeči:

    - [Smartphone Browser localStorage is up to 5x Faster than Native Cache (New Research)](http://www.mobify.com/blog/smartphone-localstorage-outperforms-browser-cache/)

Je ale nutné řešit, aby se případná neaktuální data při změně obnovovala a podobně.

## Starší prohlížeče

Pro starší prohlížeče nepodporující `localStorage` je dobré **testovat podporu**, aby volání metod nad `localStorage` zbytečně nevyhazovalo chyby.

```
if (window.localStorage) {
  // prohlížeč podporuje lokální úložiště
}
```

### Internet Explorer 7

Starší **IE** dokáží místo `localStorage` používat `userData`. [**Chamurappiho**](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=151480#4) [polyfill](/polyfill) pro starší **Explorery**:

```
if(!window.localStorage &amp;&amp; document.documentElement.addBehavior) window.localStorage = (function(name)
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

## Session storage

Kromě `localStorage` existuje ještě velmi podobné `sessionStorage`.

Liší se tím, že se jeho obsah **smaže po zavření prohlížeče**. Prohlížeče **Safari** a **Android Browser** ho navíc nelimitují maximální velikostí dat.

Použití v JavaScriptu je potom obdobné. Jen se `localStorage` přepíše na `sessionStorage`:

```
**sessionStorage**.setItem("nazev-polozky", "hodnota");
```

Pro přečtení obsahu potom:

```
var obsah = sessionStorage.getItem("nazev-polozky");
```

## Odkazy jinam

  - MDN: [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/window/localStorage)

  - Sitepoint: [HTML5 Local Storage Revisited](http://www.sitepoint.com/html5-local-storage-revisited/)