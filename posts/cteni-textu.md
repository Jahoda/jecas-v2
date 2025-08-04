---
title: "Čtení textu na webu"
headline: "Přečtení textu webu"
description: "Jak obsah webové stránky přečíst hlasem."
date: "2015-07-27"
last_modification: "2015-08-06"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP", "Hlas"]
---

V některých případech se může hodit textový obsah webu **přehrát strojovým hlasem**:

  - Přečtení obsahu obrázků, které slouží jako [ochrana proti spamu](/spam).

  - Další způsob, jak může návštěvník konsumovat obsah. I když v tomto případě je značně lepší, když je obsah **skutečně namluven**.

Pro technickou realisaci je k tomu nutná **hlasová čtečka** (skript, kterému se předá text a on vrátí zvukový soubor). Za tímto účelem jde použít čtečku, kterou používá **Google překladač** (`translate.google.com`) a jakž takž umí i česky.

  Kousek předchozího odstavce přečtený Google překladačem:

Google překladač na následující adrese vrátí text z parametru `q` jako zvuk:

```
http://translate.google.com/translate_tts?tl=cs&amp;q=Text
```

Zdá se ale, že pro přímé přehrání na stránce pomocí značky `&lt;audio>` je potřeba používat **placené Google Translate API**.

Existují dva způsoby, jak toto omezení pro vyzkoušení alespoň krátkodobě obejít:

## Stažení zvuku PHP skriptem

Pro obejití ochrany jde nahrávku pustit přes vlastní skript.

```
&lt;?php 
$url = "http://translate.google.com/translate_tts?tl=cs&amp;q=" 
      . urlencode($_GET["str"]);
$data = file_get_contents($url);
header("Content-Type: audio/mpeg");
echo $data;
```

Přehrání v JavaScriptu je potom s využitím HTML 5 `&lt;audio>` velice jednoduché:

```
function prehrat(str) {
    var url = "./cist.php?str=" + encodeURIComponent(str); 
    var a = new Audio(url);
    a.play();
}	
```

## Přehrání vložením do rámu

V **Google Chrome** se obsah přehraje při vložení do rámu.

    function prehrat(str) {
        var url = "http://translate.google.com/translate_tts?ie=UTF-8&tl=cs&q=" + str;
        prehravac.src = url;
    }	    

    ▶ Přehrát název tohoto článku

Samostatná ukázka:

    - [Přehrávání textu pomocí Google překladače](http://kod.djpw.cz/hoob)

## Omezení Googlu

Při četném používání nejspíš Google získá podezření.

  Naše systémy zjistily, že vaše počítačová síť je zdrojem neobvyklého provozu. Účelem této stránky je zkontrolovat, zda požadavky odesíláte skutečně vy, a ne robot.

Je potom nutné opsat kód pro ověření.

## Odkazy jinam

  - [Čtení daného textu na webu](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=163998)

    function prehrat(str) {
      var url = "/files/cteni-textu/cist.php?str=" + encodeURIComponent(str); 
      var a = new Audio(url);
      a.play();
    }	    

-->