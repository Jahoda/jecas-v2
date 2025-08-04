---
title: "Plynulý přesun focusu"
headline: "Plynulý přesun <code>focus</code>u"
description: "Plynulé přesouvání <code>focus</code>u mezi jednotlivými položkami formuláře."
date: "2013-10-24"
last_modification: "2013-12-09"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře", "Rady a nápady"]
---

Části návštěvníků, která se mezi formulářovými položkami přesouvá klávesou Tab, lze zvýšit pohodlí při přeskakování mezi položkami **plynulým přesouváním „`focus` efektu“**.

Běžný formulář (zvlášť potom v případě, že pro [pseudotřídu `:focus`](/css-selektory#uzivatelske-akce) jeho položek není nastaven výrazný styl) může být pro uživatele nepřehledný tím, že po odTabování **není na první pohled jasné, kam se kursor přesunul**.

Zajímavým řešením je plynulé přesunutí orámování tlačítka, políčka nebo jiného prvku na další/předchozí — tj. po stisknutí klávesy Tab, respektive Shift + Tab.

    Checkbox
   Radio
  CSSHTMLJavaScript Select
  Tlačítko

## Hotové řešení

[Web](http://n12v.com/focus-transition/)

Stačí přilinkovat na stránku:

```
&lt;script src="[flying-focus.js](http://n12v.com/focus-transition/flying-focus.js)">&lt;/script>
```

(Možné je i použití jako uživetelský skript / plugin do prohlížeče.)

  Druhá verse [Flying focusu](http://n12v.com/focus-transition-2/) nabízí nové druhy zvýrazňovacích animací.

## Odkazy

  - [Shrinking Button Outlines](http://www.heydonworks.com/article/shrinking-button-outlines) — zvýraznění `:focus` efektu [animací](/transition).