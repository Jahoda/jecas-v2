---
title: "JS akce u odkazu"
headline: "JS akce po kliknutí na odkaz"
description: "Na co si dát pozor při obsluhování odkazu JavaScriptem."
date: "2015-01-13"
last_modification: "2015-01-13"
status: 1
tags: ["JavaScript", "Hotová řešení", "JS události", "Odkazy"]
---

Při vytváření webové aplikace, která funguje i **bez podpory JavaScriptu**, se často setkáme s tím, že odkaz má normální cíl, ale v případě zapnutého JS bude obsloužen skriptem.

    - [Detekce zapnutého JavaScriptu](/vypnuty-js)

Pro **odkaz**, který bude umět načítat obsah [AJAXem](/ajax) to může vypadat následovně:

```
&lt;a href="url-stranky" **onclick="nacistAjaxem(this.href)"**>
  Odkaz
&lt;/a>
```

Při použití **obrázkové galerie**:

```
&lt;a href="velky-obrazek.jpg" **onclick="otevritGalerii(this.href)"**>
  &lt;img src="maly-obrazek.jpg">
&lt;/a>
```

Funkce v `[onclick](/udalosti-mysi#kliknuti)` potom provede JS akci a stornuje **standardní funkci odkazu**, třeba pomocí „`return false`“.

## Způsob otevření odkazu

Celé to ale není tak jednoduché, odkaz jde totiž typicky otevřít **více způsoby**:

  - kliknutím **levého tlačítka**,

  - otevřením **prostředním tlačítkem** (kolečkem), což typicky otevírá obsah na pozadí,

  - otevřením přes [kontextové menu](/kontextova-nabidka) vyvolané **pravým tlačítkem**,

  - kliknutím levého tlačítka při stisknuté klávese Ctrl (otevře na pozadí) nebo Shift (otevře do nového okna)

Kromě otevření přes kontextové menu vyvolají všechny případy `onclick`, ač by bylo **očekávávané chování** pro kolečko nebo použití Shift/Ctrl **otevření odkazu v nové záložce** (na popředí/pozadí).

Kliknutí na následující odkaz je obslouženo JavaScriptem, i když to není zrovna ideální.

    Kliknout

## Řešení

Zajistit v určitých případech standardní chování jde pomocí využití **objektu** `event`, z kterého jde zjistit číslo stisknutého tlačítka (`event.which` – levé tlačítko má číslo `1`) nebo stisknuté klávesy (`event.shiftKey || event.metaKey || event.ctrlKey`).

function kliknuti(e, el) {
    e = e || window.event;
    // je stisknutá klávesa
    if (e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
    }    
    // levé tlačítko
    if (e.which !== 1) {
        return;
    }    
    // akce
    alert("Akce odkazu s cílem: " + el.href);
    return false;
}  

    JS akce se vyvolá pouze při levém tlačítku

[Samostatná živá ukázka](http://kod.djpw.cz/oljb)

## Akce bez URL

Problém nastane u JS akcí, které nemají URL. Při touze otevřít odkaz na pozadí zkrátka **neexistuje URL**, kterou by prohlížeč mohl nalistovat.

Pokud akce nemá URL, asi nejmenší zlo se mi zdá použít obyčejný `onclick` a jako cíl odkazu uvést alespoň nějakou URL, což bude lepší než **prázdná stránka** „`about:blank`“, která se otevře u odkazů typu:

```
&lt;a href="**javascript**:akce()">
  Odkaz
&lt;/a>
```

Případně přidat do JS aplikace *fiktivní* URL není s využitím [`pushState`](/zmena-url) zase takový problém.