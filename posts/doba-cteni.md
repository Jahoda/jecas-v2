---
title: "Doba čtení stránky"
headline: "Doba čtení stránky"
description: "Jak zobrazit přibližnou dobu, kterou zabere čtení stránky."
date: "2015-08-22"
last_modification: "2015-09-11"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

Aby se čtenář nezalekl příliš **dlouhého článku**, lze mu pomoci zobrazením **přibližné doby**, kterou bude k přečtení potřebovat.

Čtení tohoto článku zabere přibližně **5 minut**.

Jak na to?

Je potřeba zjistit:

  - Přibližnou **rychlost čtení**.

  - **Počet slov**, které článek obsahuje.

## Jak rychle člověk čte?

Podle různých propagátorů rychločtení přečte běžný člověk **125–250 slov za minutu**. Většina lidí totiž čte text slovo po slově zvlášť, což vede ke zmíněnému tempu.

Rychločtenáři potom zvládají číst za minutu třeba **600 slov**.

Pro výpočet doby čtení tedy může posloužit třeba **200 slov**.

## Počet slov v textu

Počet slov ze souvislého textu jde zjistit počítáním bílých znaků / mezer.

      [Počet znaků a slov v textu](/pocet-znaku) – počítání znaků a slov v JavaScriptu

    ```
var slov = text.match(/\b/g).length/2;
```

Pokud se mají slova počítat v HTML stránce, je třeba nejprve **odstranit HTML značky**:

V **PHP** k tomu existuje funkce `strip_tags`:

```
$bezZnacek = strip_tags("HTML kód");
```

V **JavaScriptu** jde využít vlastností `textContent` (funkční od **IE 9**) a `innerText` (funkční ve starých **Internet Explorerech**):

```
var obsah = document.getElementById("obsah");
var bezZancek = obsah.textContent || obsah.innerText || "";
```

### Hotové řešení v JavaScriptu

Když se výše uvedené techniky spojí a přidá se ještě [české skloňování](/sklonovani), výsledek je na světě:

 Čtení tohoto článku zabere **5 minut**.

  function sklonovani(pocet, slova) {
    pocet = Math.abs(pocet);
    if (pocet == 0) return slova[0];
    if (pocet == 1) return slova[1];
    if (pocet  0) return pocet + " " + slova[2];
    return pocet + " " + slova[3];
  }  
  
  function dobaCteni(doba) {
    var content = doba.parentNode.parentNode;
    var RYCHLOST_CTENI = 200;
  
    var bezZnacek = content.textContent || content.innerText || "";
    var slov = bezZnacek.match(/\b/g).length/2;
    var minut = Math.round(slov / RYCHLOST_CTENI);
  
    doba.innerHTML = sklonovani(minut, ["chvilku", "minutu", "minuty", "minut"]);    
  }
  dobaCteni(document.getElementById("doba"));
  dobaCteni(document.getElementById("doba2"));

### Doba čtení článku v PHP

V PHP jde nad obsahem vyčištěným od HTML značek použít funkci `str_word_count`. Pro použití na **český text** je nutné předat navíc české znaky jako třetí argument.

```
$string = "Příliš žluťoučký kůň úpěl ďábelské ódy.";
$pocetSlov = str_word_count(
  $string, 
  0, 
  "ěščřžýáíéůúďňóť"
);
```

Celý kód:

```
define("RYCHLOST_CTENI", 200);
$bezZnacek = strip_tags("HTML kód");
$slov = str_word_count($bezZnacek, 0, "ěščřžýáíéůúďňóť");
$minut = round($slov / RYCHLOST_CTENI);
echo $minut;

```

## Zbývá X minut četní

Zajímavé by mohlo být navíc průběžně zobrazovat, kolik minut ještě **bude čtení trvat**.

  [Živá ukázka](http://kod.djpw.cz/fbqb) – průběžné zobrazování zbývajícího času

Jde to udělat tak, že se **spočítá počet slov pro každý element**. A následně se počet už přečteného určí podle posledního elementu, který je ve viewportu (je viditelný).

Jestli element už byl ve *viewportu*, jde zjistit třeba takto:

```
function inViewPort(el) {
  var coords = el.getBoundingClientRect();
  return (
    coords.top >= 0 &amp;&amp; coords.left >= 0 &amp;&amp; coords.top
  ) 
  &lt;= (
    window.innerHeight || document.documentElement.clientHeight
  );
}
```

Případně by **přečtené procento článku** šlo počítat z počtu odrolovaných pixelů a celkových pixelů výšky článku. V případě používání vysokých obrázků nebo podobných prvků to ale **nebude moc přesné**.

### Problém

Ukazovat výše uvedeným způsobem zbývající čas je problematické. Z toho, kam návštěvník odroloval, přesně nevypovídá, kam až dočetl. Různí lidé čtou obsah webů různým způsobem a možnost, jak **sledovat, kam návštěvník zrovna kouká**, není běžně dostupná.

Zobrazování přesného času tak může být matoucí.

## Měření doby čtení

Dobu čtení stránky by také šlo odhadovat na základě průměrné doby čtení **ostatních uživatelů**.

Aby toto měření nezkreslovali uživatelé, co si **stránku otevřou a odejdou pryč**, muselo by se testovat, jestli [je stránka aktivní](/aktivni-stranka).

Uložit dobu čtení by se potom nabízelo před [opuštěním stránky](/onbeforeunload). V podporovaných prohlížečích pomocí [Beacon API](/beacon).

## Odkazy jinam

  - [A Better Reading Time Counter for Web Pages](http://thenewcode.com/1038/A-Better-Reading-Time-Counter-for-Web-Pages-Part-1)