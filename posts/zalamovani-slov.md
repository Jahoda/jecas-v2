---
title: "Zalamování slov"
headline: "Zalamování dlouhých slov"
description: "Jak si poradit s dlouhými slovy, které by mohly narušit layout stránky."
date: "2014-07-03"
last_modification: "2017-05-16"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

Při vytváření layoutu webové stránky i aplikace čelíme výzvě, jak vyřešit stav, kdy se text nevejde do stanoveného prostoru. Zvlášť v případě, kdy mají **návštěvníci** možnost **vkládat obsah na stránku**, je tento problém rozhodně nutné řešit.

    .obal-sloupce {
      width: 100px;
      padding: 0 .5em;
      background: #fff;
    }

    Krátký obsah

    NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

Na ukázce je vidět, jak i při nastavení šířky text z obalu vyleze.

## Možná řešení

### CSS vlastnost `word-wrap`

```
element {
  word-wrap: break-word;
}
```

    NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

### Zalamování textu v tabulkách

Problém s tímto řešením může nastat v [**tabulce**](/tabulky), kde `word-wrap` zdánlivě nic nedělá.

      NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

Řešení je nastavit **buňce** maximální šířku (`max-width`) třeba na nulu:

      NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

Nebo použít **fixní layout** tabulky (`table-layout: fixed`):

      NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

### Vlastnost `word-break`

I v jiných případech nemusí fungovat `word-wrap`. Třeba element s [`display: inline-block`](/display#inline-block) obsahující dlouhé slovo klidně vyleze ze svého rodiče.

Tento problém vyřeší `word-break`.

```
element {
  word-break: break-all;
}
```

    - [Živá ukázka](http://kod.djpw.cz/yahc) – zalamování dlouhých slov v `inline-block`

### CSS vlastnost `hyphens`

Vlastnost [`hyphens`](/hyphens) s problémem nijak nepomůže.

### Oříznutí `overflow: hidden`

```
element {
  overflow: hidden;
}
```

Přetékání nastavené na hodnotu `hidden` sice problém vyřeší, ale obsah *zmizí*.

    NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde

Další tipy jsou v samostatném článku [Oříznutí textu](/oriznuti-textu).

### Rozdělení na straně serveru

V PHP je možné funkcí `wordwrap` automaticky rozdělit dlouhá slova v textu.

```
// Slovo delší 50 znaků rozdělí mezerou
$text = wordwrap($text, 50, " ", true);
```

U tohoto řešení je si potřeba dát pozor na pár věcí:

    Používat ho jen na **výstupu**. To zjednoduší případnou změnu čísla udávajícího počet znaků.

    Rozlámání slov **rozbije odkazy**. Zatímco dlouhá slova nemají moc opodstatnění, v případě odkazů je situace jiná. Typicky mívají minimálně desítky znaků, někdy se ale může délka blížit i stovce (tato stránka má URL dlouhou document.write((window.location+"").length) znaků).

    Řešením je odkazy převádět na klikací a **text odkazu zkrátit**. Osobně mi ale přijde lepší **použít CSS**, protože ani slova rozlámaná na určitý počet nejsou zárukou správného zobrazení. Stačí mít v prohlížeči nebo operačním systému **větší písmo** a přesně spočítaný počet znaků bude k ničemu.

## Výška řádku `line-height`

Při možnosti, že se text rozdělí na více řádku, je **velmi vhodné** použít rozumnou hodnotu CSS vlastnosti `line-height`.

Jinak budou jednotlivé řádky na sebe nepěkně nalepeny.

  Dva ošklivě
 nalepené řádky.