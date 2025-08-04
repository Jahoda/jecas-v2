---
title: "Jak zjistit počet znaků a slov"
headline: "Počet znaků a slov v textu"
description: "Jak spočítat délku (počet znaků), počet slov, řádků nebo odstavců v textu."
date: "2013-11-25"
last_modification: "2013-12-06"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

U následujícího textu se počítají znaky, slova, řádky a odstavce. Zároveň jsou vypsána slova, co se v textu alespoň **dvakrát opakují**. Čím častěji se opakují, tím mají výraznější barvu. Nejčastěji používané **předložky jsou ignorovány**.

function statistiky(el) {
  var znaku = el.value.length, slov = 0, odstavcu = 0, radku = 0, cetnostSlov = "", cetnost = {};
  
  if (znaku > 0) {  
    /* Přeskakování předložek */
    var preskocitSlova = ["a", "o", "i", "na", "od", "do", "pod", "přes", "u", "v", "ve", "nad", "pod", "k", "při", "po", "se", "s", "to", "pro", "z", "je", "nebo"];
    var preskocit = [];
    for (preskoc in preskocitSlova) {
      preskocit[preskocitSlova[preskoc]] = true;
    }
  
    var pocetMezer = el.value.match(/\b/g);
    slov = pocetMezer ? (pocetMezer.length/2) : 0;
    var pocetOdstavcu = el.value.split(/\n{2,}/);
    odstavcu = pocetOdstavcu ? pocetOdstavcu.length : 0;
    var pocetRadku = el.value.split("\n");
    radku = pocetRadku ? pocetRadku.length : 0;      
    
    /* Výpis opakovaných slov */
    var slova = el.value.toLowerCase().match(/([a-záäéëěíóöôúůüýčďňřŕšťžĺľ]+)/gi);
    for (var i = 0; slova[i]; i++) {
      var slovo = slova[i];      
      if (preskocit[slovo]) continue;
      cetnost[slovo] = cetnost[slovo] || 0;
	  cetnost[slovo]++;
    }
    
    for (slovo in cetnost) {
      cetnostSlov += (cetnost[slovo] > 1 ? "" + slovo + " " : "");
    }
  }
  
  document.getElementById("statistiky").innerHTML = "Znaků: " + znaku + " Slov: " + slov + " Odstavců: " + odstavcu + " Řádků: " + radku + " Opakovaná slova: " + cetnostSlov + "";
}    

    .statistiky .pocet, .statistiky .opakovani {display: inline-block; background: #efefef; padding: 0 .5em}
    .statistiky .opakovani {background: #F07376}
    .statistiky .opak2 {background: #FDEEEE}
    .statistiky .opak3 {background: #FDDFE0}
    .statistiky .opak4 {background: #F9CCCD}
    .statistiky .opak5 {background: #F8AFB1}
    .statistiky .opak6 {background: #E79698}
  
  Jakou má zdejší text délku, kolik slov má tento text? Neopakují se v textu nějaká slova?

  statistiky(document.getElementById("text"));

## Jak to udělat?

Jak všechny uvedené věci **zjišťovat JavaScriptem**? Samostatná [ukázka](http://kod.djpw.cz/stt).

### Počet znaků

Pro formulářové pole (jako je použitá `&lt;textarea>`) stačí prosté:

```
var delka = pole.value.length;
```

K úvaze je, zda obsah nejprve neočistit o **prázdné znaky** funkcí `trim`.

#### Funkce `trim`

Ta funguje až **od IE 9**, ale dá se doskriptovat:

```
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
  }
}
```

Nebo rovnou použít zmíněný regulární výraz `/^\s+|\s+$/g`.

### Počet slov

Kolik slov text obsahuje, se dá zjistit počítáním *konců slov* (v **regulárních výrazech** `\b`).

```
var slov = pole.value.match(/\b/g).length/2;
```

### Počet řádků

Pro spočítání řádku stačí zjistit počet výskutů `\n` v celém textu:

```
var radku = pole.value.split("\n").length;
```

### Počet odstavců

Pro zjišťování, kolik odstavců text tvoří, je nutné vybrat, co **odstavec** bude.

  Nový odstavec tvoří 2 a více odřádkování:
    ```
var odstavcu = pole.value.split(/\n{2,}/).length;
```

  Nový řádek = nový odstavec:
    ```
var odstavcu = pole.value.split(/\n**+**/).length;
```

## Odkazy jinam

  - [Text Analyzer](http://www.online-utility.org/text/analyzer.jsp)

  - [Word Frequency Counter](http://euri.ca/2013/quick-javascript-word-frequency-counter/)

  - [wordfrequency.js](https://gist.github.com/rocktronica/2625413)

  - [Countable](https://github.com/RadLikeWhoa/Countable)