---
title: "Skrývání a odkrývání"
headline: "Skrývání a odkrývání textu"
description: "Rozbalení a sbalení obsahu po kliknutí."
date: "2013-05-30"
last_modification: "2013-11-17"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Přepínání vzhledu"]
---

Pokud je na webu hodně textu, který nemusí návštěvníka tolik zajímat, může být vhodné takový text **rozbalit** až na vyžádání po **kliknutí** na [tlačítko/odkaz](/odkaz-tlacitko). Ideální postup, jak **zobrazit/skrýt** obsah, je JavaScriptem **pouze měnit CSS třídu** a vše ostatní řešit kaskádovými styly. (Obdobným způsobem lze velice snadno i měnit vzhled a podobně.)

## Řešení

    /* schování tlačítka */
    .js .live .schovat div {display: none}
    /* nastylování „ikony“ plus nebo mínus */
    .live button span:before {content: "+"; display: inline-block; margin-right: .5em; padding: 0 .4em; border-radius: 3px; background: #fff; color: #000}
    /* ikona minus bude mít pomlčku */
    .live button span.skryt:before {content: "–"}
    /* když je obsah schovaný, schováme popisek „Skrýt“ */
    .live .schovat .skryt {display: none}
    /* když je obsah zobrazený, schováme popisek „Zobrazit“ */
    .live .ukazat .zobrazit {display: none} 

    function prohodit(element, prvniTrida, druhaTrida) {
	  element.className = element.className == prvniTrida ? druhaTrida : prvniTrida;
    }

    **ZobrazitSkrýt
    Text ke skrytí.

Vytvoříme element,
```
&lt;div class=**schovat**>
	&lt;div>*Obsah*&lt;/div>
&lt;/div>
```

  pomocí CSS jeho obsah **skryjeme**
```
.**schovat** div {display: none}
```

a nyní jen stačí přes JS prohazovat třídu.
```
function prohodit(element, prvniTrida, druhaTrida) {
	element.className = element.className == prvniTrida ? druhaTrida : prvniTrida;
}
```

### Co použít jako `element`

Je-li přepínací tlačítko (odkaz) poblíž obsahu (co se má skrývat/odkrývat), vše obalíme do společného `&lt;div>`u, ke kterému se z tlačítka dostaneme přes `this.parentNode`.
```
&lt;button onclick="prohodit(**this.parentNode**, 'schovat', 'ukazat')">
	Zobrazit/Skrýt
&lt;/button>
```

Je-li tlačítko někde jinde, přidáme `&lt;div>`u atribut `id` a použijeme `document.getElementById("id")`.

Velkou výhodou změny třídy je to, že potom lze přes CSS pracovat i s přepínacím tlačítkem.
```
.schovat button {/* obsah je schovaný */}
.ukazat button {}
```

### Plynulé skrývání a odkrývání

Skrývání a zobrazování obsahu může být díky [animaci i hezky plynulé](/animace-skryt).

## Vypnutý JavaScript

V případě [vypnutého JavaScriptu](/vypnuty-js) by v každém případě **měl obsah býti vidět**.
Asi nejelegantnější je nastavovat pomocí JS třídu pro nějaký hodně nadřazený element.
```
&lt;body>
&lt;script> document.body.className+=' js' &lt;/script>
```

… a všechny *skrývací akce* začínat selektorem `.js`:
```
**.js** .schovat div {display: none}
```

## Rozklikávání/přepínání částí stránky

Obdobným principem lze docílit **přepínání jednotlivých *skupin*** na stránce. Kdy kliknutí na nadpis ostatní položky skryje a zobrazí právě tu, **na kterou bylo kliknuto**.

  .js .obal div div {display: none; padding: .3em .5em}
  .js .obal div.show div {display: block}
  .js .obal h3 {cursor: pointer}
  .obal div {background: #efefef}
  .obal div h3 {background: #0D6AB7; color: #fff; padding: .3em .5em}
  .obal div.show h3 {background: #1081DD}

    ### HTML

    HTML kód je celkem obyčejný, jednotlivé přepínané části jsou `&lt;div>`y; obsah, který se má zjevit až po rozkliknutí, je rovněž v samostatném obalu, který se při změně třídy nadřazeného `&lt;div>`u zviditelní.

    ### CSS

    V CSS se využívá třídy `js`, kterou má `&lt;body>`, tj. všechny styly, které používá JavaScript, jsou takto prefixovány.

    ### JavaScript

    JS navěsí na nadpisy (značky `&lt;h3>`) funkci, která nejprve projde všechny obalové `&lt;div>`y a *vymaže* jim případnou třídu viditelnosti. Následně se tomu právě zakliknutému třída (`className`) pro zobrazení přiřadí.

    ### Možné rozšíření

      Má-li nějaká část být zobrazena rovnou při načtení stránky, stačí prosté přiřazení třídy viditelnosti pro obalový element dané skupiny, tj. `&lt;div class=**show**>`.
      Díky nastavování třídy `show` lze podle ní velice snadno vzhledově odlišit rozkliknutou část od ostatních.

var el = document.getElementById("obal");
el.className += " js";

function clearAll() {
	var div = el.getElementsByTagName("div");
	for (var i = 0; i