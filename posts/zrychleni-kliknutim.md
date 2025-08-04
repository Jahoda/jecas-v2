---
title: "Zrychlení AJAXové aplikace o 100 ms"
headline: "Zrychlení AJAXové aplikace o 100 ms"
description: "Jak u AJAXové aplikace snadno zrychlit odezvu na kliknutí o 100 milisekund."
date: "2014-12-16"
last_modification: "2014-12-24"
status: 1
tags: ["JavaScript", "Zrychlování webu", "AJAX"]
---

Pokud stránka funguje tak, že při kliknutí na **odkaz/tlačítko** ([`onclick`](/udalosti-mysi#oncick)) zavolá [AJAXový](/ajax) požadavek, který změní část obsahu stránky, můžeme celé odbavení jednoduše zkrátit v průměru o 100 a více milisekund.

Vše, co je potřeba udělat, je rozložit akci do dvou kroků.

  - **stažení** dat,

  - **zobrazení** obsahu

## Jak funguje kliknutí

Standardní průběh kliknutí je takový, že uživatel:

  - **najede** na tlačítko/odkaz (`onmouseover`),

  - **stiskne** levé tlačítko myši (`onmouse**down**`),

  - **uvolní** tlačítko myši (`onmouse**up**`)

Pointa je v tom, že tyto tři kroky mohou trvat běžně kolem **0,5 vteřiny** (mezi stisknutím a uvolněním tlačítka cca **100 milisekund**). Pokud tedy obsah začneme načítat už při (1) **najetí myší** nebo (2) **stisknutí tlačítka**, může být v době (3) **uvolnění tlačítka** už připravený (stažený).

Samotné **přejetí myší** ale může vykonat řadu „planých poplachů“, kdy se data budou načítat zbytečně. Jde tomu pomoci menší prodlevou mezi najetím a přednačítáním.

Při stisknutí tlačítka je sice také možné **zrušit akci** odjetím pryč, ale počet takových případů nebude příliš vysoký.

Vyzkoušejte si, **jak dlouho vám zabere** kliknutí od najetí na tlačítko nebo od jeho stisknutí. Celková doba je závislá i na **velikosti prvku**.

var start, tlacitko;
function zacatek() {
    start = new Date().getTime();
}
function konec(el) {
    var casKonec = new Date().getTime();
    el.innerHTML = casKonec - start + " ms (od stisknutí: " + (casKonec - tlacitko) + " ms)";
}
function kliknuto() {
    tlacitko = new Date().getTime();
}

Kliknutí od najetí trvalo: Kliknout

O tento čas můžeme snadno snížit **odezvu aplikace**.

## Řešení

Při konkrétním použití mohou nastat dva případy.

  - Přednačtení se stihne **před dokončením akce** (uvolnění tlačítka).

  - Načítání bude **pokračovat i po dokončení akce**.

Pro konkrétní řešení si tedy uložíme dva stavy:

  - obsah je připraven – `pripravenaData`

  - na získaný obsah se má přejít – `prejit`

Při **stisknutí** tlačítka se nastaví, že nejsou data připravená a zavolá se funkce pro načtení:

```
pripravenaData = false;
nacist(url);
```

Funkce `nacist` začne **načítat obsah** a v případě dokončení změní proměnnou `pripravenaData`.

```
pripravenaData = true;
```

Při **uvolnění** tlačítka (dokončení akce) se v případě, že jsou data už načtena, **zobrazí obsah**.

```
if (pripravenaData) {
  // zobrazit obsah
}
```

Pokud by obsah **ještě načten nebyl**, změní se proměnná `prejit` na `true`. V takovém případě na základě kladné hodnoty `prejit` funkce `nacist` rovnou zobrazí obsah.

Celý postup demonstruje živá ukázka. Kde se po stisknutí tlačítka myši začne načítat obsah do přednačítacího `&lt;div>`u a po dokončení akce se přesune na **cílové umístění**.

[Živá ukázka](http://kod.djpw.cz/bzib)

### Způsob přednačítání

K úvaze je, zda si (před)načtený obsah pouze **uložit do proměnné** nebo vypsat do **pomocného elementu**. V případě vypsání do pomocného `&lt;div>`u se začnou rovnou načítat i případné **externí objekty** a nový obsah se může [vykreslit](/vykreslovani) už před dokončením akce, což také nejspíš **zrychlí výsledný dojem**.

### Dotyková zařízení

U dotykových zařízení jde místo `onmousedown` a `onmouseup` použít  jejich [`ontouch*` obdoby](/udalosti-mysi#dotykove).

### Otevírání do nového okna

V desktopových prohlížečích je běžné, že uživatelé otevírají odkazy do nové záložky nebo do nové záložky na pozadí klávesami Shift/Ctrl + kliknutí.

Případně si kliknutím **pravého tlačítka** chtějí zkopírovat adresu odkazu a podobně.

V takových případech je nejspíš zbytečné **cokoliv přednačítat** a při stisku jiného tlačítka než levého nebo při přidržení některých kláves proto nic nedělat.

```
if (e.which > 1 || e.metaKey || e.ctrlKey) {
  return;
}
```

    - [Kódy tlačítek u `onmousedown`](/udalosti-mysi#onmousedown)

    - [Klávesy Shift, Ctrl a Alt](/klavesy#shift-ctrl)