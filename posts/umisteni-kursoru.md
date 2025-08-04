---
title: "Posice kursoru v poli"
headline: "Umístění kursoru v poli"
description: "Jak v JavaScriptu zjistit posici, na které je kursor v textovém poli."
date: "2015-02-19"
last_modification: "2015-11-10"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

Při **okamžité validaci** formulářových polí se může hodit znát místo, kde je zrovna kursor.

Od **IE 9** je možné zjistit aktuální místo kursoru z vlastnosti `selectionStart`. Zjišťovat posici má smysl hlavně při události `onkeyup` (po uvolnění klávesy).

```
&lt;input
  onkeyup="alert(this.**selectionStart**)"
>
```

    Zobrazit posici kursoru: 

## Změna umístění kursoru

Pomocí `selectionStart` jde i umístit kursor na vybrané místo.

```
input.selectionStart = 0; // začátek na 0
```

Následující pole bude mít po vybrání (`onfocus`) kursor před zavináčem:

**Chrome** a [**Edge**](/microsoft-edge) mají problém s označením výběru při focusu.

Je možné použít `onclick`, ale potom je vidět poskočení kursoru z konce na začátek:

**Nejlepšího výsledku** napříč prohlížeči jde nejspíš dosáhnout pomocí obalení do časovače při použití `onfocus`:

### Konec výběru `selectionEnd`

Kromě vlastnosti `selectionStart` existuje ještě `selectionEnd`, která znamená konec výběru. Nastavením odlišného startu a konce jde potom označit vybranou část políčka:

  Označit 3–5

Výběr se začíná číslovat od nuly, takže `selectionStart = 2` přesune začátek výběru za 2. znak.

## Starší IE

Pro **IE 8** a starší je pro stejnou funkčnost nutné použít `document.selection.createRange()` a metody `moveStart`/`moveEnd`.

```
var sel = document.selection.createRange();
sel.moveStart('character', -pole.value.length);
posice = sel.text.length;
```

Oba postupy potom stačí zkombinovat.

[Živá ukázka](http://kod.djpw.cz/qpkb)