---
title: "Nová stránka v JavaScriptu"
headline: "Nová stránka v JavaScriptu"
description: "Jak v JavaScriptu vytvořit novou HTML stránku."
date: "2015-02-13"
last_modification: "2015-10-02"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V některých případech se může hodit vytvořit skriptem novou stránku. Je sice možné měnit [DOM](/dom) té stávající, ale to způsobí **přepsání původního obsahu** a s tím spojenou **nemožnost návratu**.

    function novaStranka(html) {
      var stranka = window.open("", "_self");
      var tlacitkoZpet = 'Zpět

';
      stranka.document.write(html + tlacitkoZpet);
    }

    Otevřít předchozí odstavec do nové stránky

Po různém testování jsem došel k následujícímu kódu:

```
var html = "&lt;p>HTML obsah stránky&lt;/p>";
var stranka = window.open("", "_self");
stranka.document.write(html);
```

[Živá ukázka](http://kod.djpw.cz/ojkb-)

Bohužel v prohlížečích **Chrome** a **Opera** nefunguje funkce zpět. V **IE**/[**Edge**](/microsoft-edge), **Firefoxu** a staré **Opeře** řešení funguje, jak má.

Akce *Zpět* (JS akce `history.back()`) v prohlížečích vycházejících z jádra **Blink** nevede na stránku, ze které se nová stránka vytvořila, ale už na tu předchozí.

Případně není vůbec kam jít zpět:

Jediná možnost, jak se *vrátit*, je tak pomocí *reloadu*:

```
`location.reload()`
```

V takovém případě už je ale rovnou možné **přepsat DOM původní stránky**:

## Přepsání celého obsahu stránky

Pokud je cílem, aby **zůstal společný obsah** stránky jako hlavička, navigace a podobně, jde změnit pouze obsahový `&lt;div>`:

```
document.**getElementById("obsah")**.innerHTML = "HTML kód";
```

Pro změnu celého obsahu při zachování stylů a skriptů připojených v `&lt;head>` je ideální přepsat `&lt;body>`:

```
document.**body**.innerHTML = "HTML kód";
```

Kompletní změnu zajistí přepsání `documentElement`u (značka `&lt;html>`):

```
document.**documentElement**.innerHTML = "HTML kód";
```

    - [Elementy `documentElement` a `body` v JavaScriptu](/documentelement-body)

## Objekt `history` a `pushState`

V **Chrome** a nové **Opeře** je nejspíš jediná možnost, jak docílit nové stránky s možností návratu, použít `history.pushState`.

    - [Změna URL bez obnovení stránky](/zmena-url)

Takové řešení funguje až od **IE 10** a je pracnější na realisaci, ale dokáže zajistit, že různý obsah bude na různých URL, což je čistší řešení, než když toho na jedné URL může být víc – například kvůli **odkazování**.

## Nové okno

Další možnost je obsah otevřít v [novém vyskakovacím okně](/nove-okno) – to půjde alespoň zavřít. Takový postup se často využívá pro přípravu stránky k tisku:

    - Vytisknutí stránky: [Zvláštní stránka vytvořená JavaScriptem](/tisk#js)