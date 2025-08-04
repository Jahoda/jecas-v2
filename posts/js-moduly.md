---
title: "Moduly v JavaScriptu"
headline: "Vytváření modulů v JavaScriptu"
description: "Jak psát složitější věci v JavaScriptu. Obalit společné funkce do „modulů“."
date: "2013-12-12"
last_modification: "2014-02-26"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady"]
---

Pro využívání JS na stránce není nutné vymýšlet nějaké třídy, dokonce ani funkce.

Nejjednodušší příkazy je možné psát **přímo do atributů událostí** (`onmouseover`, `onclick`, `onsubmit` a podobně).

```
&lt;button onclick='alert("test")'>Tlačítko&lt;/button>
```

Nebo **přímo do stránky** do značky `&lt;script>` (případně do externího JS):

```
&lt;script>
  alert("test");
&lt;/script>
```

Při složitějších skriptech začne dávat smysl **používat funkce**. Kromě řešení opakujícího se kódu to má tu výhodu, že funkce vytvoří nový *scope*, což ohraničí kód funkce před „narušením z venku“ a naopak. Nestane se potom, že by si různé řádky nesouvisejících skriptů třeba **přepisovaly proměnné** (více o [scope](/scope) v samostatném článku).

```
function funkce(parametr) {
  var hlaska = "Vypisuji: " + parametr;
  alert(hlaska);
}
```

Pokud by byla deklarována proměnná `hlaska` mimo funkci, nebude tato proměnná (mimo funkci) přepsána ([ukázka](http://kod.djpw.cz/etbb)).

```
var hlaska = "Ahoj";
function funkce() {
  var hlaska = "Dobrý den"; 
}
funkce();
// Vypíše "Ahoj"
alert(hlaska);
```

Takto je možné stavět i rozsáhlé věci — zkrátka se připojí jeden JS soubor plný funkcí a ty se různé volají. Pro přehlednost se související funkce mohou rozdělit do zvláštních `*.js` souborů (a pro rychlejší načítání [automaticky opět sloučit do jednoho](/slouceni-js-css)).

Nevýhoda tohoto postupu je v tom, že všechny nesouvisející funkce jsou v jednom *scope*. A pokud by nějaké související funkce chtěly sdílet společné proměnné, mohou opět kolidovat s funkcemi nesouvisejícími a jejich proměnnými.

## Moduly

Řešením je související kód obalit do společného *scope* a utvořit tzv. **modul**.

Příklad jednoduchého *modulu* je následující kód pro vložení textu do HTML odstavce.

```
var Modul = {
  slovo : "vypisuji",
  funkce : function(parametr) {
    document.getElementById("vypis").innerHTML += this.veta + " " + parametr + " ";
  }
}
```

  - V rámci modulu existuje *proměnná* `slovo` a *funkce* `funkce`.

  V rámci modulu se k proměnným/funkcím dá dostat přes:    
    
      - Název modulu a vlastnost — `Modul.slovo`

      - Nebo využít klíčové slovo `this` — `this.slovo`

Z kódu mimo tento modul se dostaneme ke všem *vlastnostem* (těm položkám *vlevo od dvojtečky*) pochopitelně jen přes uvedení názvu modulu.

```
&lt;button onclick="Modul.funkce('parametr')">Tlačítko&lt;/button>
```

[Živá ukázka](http://kod.djpw.cz/jtbb)

### Jiný způsob

Docílit podobného výsledku je možné i jiným postupem — obalením souvisejících funkcí do další funkce, která funkce, které se využívají *zvnějšku*, vrátí pomocí příkazu `return`.

Zároveň se tato obalová funkce rovnou zavolá (to ty závorky `()` za uzavírací „`}`“), aby se výše uvedené provedlo.

```
var Modul = function() {
  var slovo = "vypisuji";
  var funkce = function(parametr) {
    document.getElementById("vypis").innerHTML += slovo + " " + parametr + " ";
  }
  return {funkce: funkce};
}();
```

Tento kód dělá to samé, co dříve uvedený, s tím rozdílem, že se nepůjde dostat k `Modul.slovo` (ven se vrací jen funkce `funkce`).

[Živá ukázka](http://kod.djpw.cz/itbb).

Výhoda tohoto postupu je v tom, že kvůli nutnosti `return`ovat obsah přístupný zvenčí, je ihned patrné, jak se modul používá. Proto je vhodné vracet opravdu jen to, co se dál využívá. Zároveň není možné **manipulovat s modulem zvenčí** způsobem, který nebyl zamýšlen.

Další výhoda je snazší *překlopení* původního kód v prostých funkcí do podoby modulů.

## Různý zápis funkcí

**Poznámka**: Následující zápis funkce.

```
var funkce = function(parametr) {
  // něco
}
```

Je v podstatě shodný s *původním* zápisem:

```
function funkce(parametr) {
  // něco
}
```

Pan **e** doplnil rozdíl, který mezi těmito zápisy panuje. V případě vytváření funkcí přes `var funkce = function(){}` bude tato funkce dostupná až pod jejím vytvořením. V případě, že bychom ji volali v kódu výše, bude `undefined`.

```
funkce(); // undefined
var funkce = function() {
  alert("F");
}
funkce(); // alert(F)
```

Druhů způsob s tímto problém nemá. [Ukázka](http://kod.djpw.cz/pqcb).