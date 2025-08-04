---
title: "Aktivní element v JavaScriptu"
headline: "Aktivní element v JavaScriptu"
description: "Jak zjistit element, který vyvolal JS událost."
date: "2015-01-24"
last_modification: "2015-01-24"
status: 1
tags: ["JavaScript", "JS události"]
---

Kromě přístupu, kdy se na jednotlivé elementy [připojují události](/pripojeni-udalosti), existuje ještě jedna možnost. Události odchytávat na celém dokumentu a až následně zkoumat, který element **událost vyvolal**.

Zjistit takový element jde z objektu `event`.

Aktivní element se potom nachází v `event.**target**` nebo `event.**srcElement**` ve starších prohlížečích. Kromě toho je nutné sjednotit i práci se samotným `event`em.

```
function akce(e, el) {
  e = window.event || e;
  var aktivni = (e.target || e.srcElement);
}
document.onclick = akce;
```

[Živá ukázka](http://kod.djpw.cz/jvjb)

## Využití

Občas může použití tohoto způsobu zpracovávání událostí **usnadnit práci**. Není potřeba připojovat obsluhu události pro jednotlivé elementy, ale naopak se až v připojené funkci rozhodne, že se má *něco dělat*.

Třeba při používání [klávesových zkratek](/klavesy) se tak snadno vytvoří výjimka pro formulářová pole.

  *[data-oznacen] {
    outline: 5px solid #0D6AB7;
  }

function akce(e, el) {
  e = window.event || e;
  var target = (e.target || e.srcElement);
  if (target.hasAttribute("data-oznacen")) {
    target.removeAttribute("data-oznacen");
  }
  else {
    target.setAttribute("data-oznacen", "");
  }
}

document.onclick = akce;