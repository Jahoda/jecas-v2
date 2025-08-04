---
title: "Stejně vysoké sloupce"
headline: "Sloupce stejně vysoké"
description: "Různé možnosti, jak zajistit automatické roztažení různě vysokých sloupců na stejnou výšku."
date: "2013-08-20"
last_modification: "2013-08-20"
status: 1
tags: ["CSS", "Hotová řešení", "Layout"]
---

## Obrázkové pozadí

Řešení spočívá v nastavení obrázkového pozadí ([použitý obrázek](/files/stejne-vysoke-sloupce/opakujici.png)) společnému rodiči obou sloupců (sloupce jsou [obtékané](/float)), obrázek na pozadí se **svisle opakuje** (`repeat-y`) a vytváří tak dojem skutečných sloupců.

    .obrazek {width: 500px}
    .obrazek .levy {float: left; width: 150px; background: #34A3E4}
    .obrazek .pravy {float: right; width: 350px; background: #E36FAF}
    .pozadi {background: url("/files/stejne-vysoke-sloupce/opakujici.png") repeat-y}
    .obrazek p {padding: 1em}

    Krátký text

    Více

    krátkých

    odstavců

  var obr = document.getElementById("pozadi");

Podívejte se, jak to bude vypadat s a bez obrázku:

Přepnout obrázek

## Rámeček mezi sloupci

Pokud nepotřebujeme podbarvení sloupců, ale stačí oddělení rámečkem, vystačíme si i bez obrázků. A to tak, že levý i pravý sloupec bude mít nastaven levý, respektive pravý rámeček shodné barvy a jeden ze sloupců se o šířku rámečku posune, aby se rámečky překrývaly.

Posunutí lze vytvořit například [relativním posicováním](/position#relative).

```
.levy {position: relative; left: 1px}
```

    .sloupce {width: 500px}
    .sloupce .levy {float: left; width: 149px; border-right: 1px solid #000; position: relative; left: 1px}
    .sloupce .pravy {float: right; width: 349px; border-left: 1px solid #000}
    .sloupce p {padding: 1em}

    Krátký text

    Více

    krátkých

    odstavců

  var levy = document.getElementById("levy");

Jak by to vypadalo s a bez posunutí:

Přepnout posunutí

## Absolutní posicování

Dosáhnout shodně vysokých sloupců je možné i [absolutním posicováním](/position#absolute).

V případě, že *víme*, že jeden sloupec bude vždy vyšší než druhý. Necháme ten delší natáhnout rodiče a ten kratší roztáhneme absolutním posicováním a třeba `[height](/height): 100%`.

    .posicovani {position: relative; width: 500px}
    .posicovani .levy {width: 150px; background: #34A3E4; position: absolute; height: 100%}
    .posicovani .pravy {float: right; width: 350px; background: #E36FAF}
    .posicovani p {padding: 1em}

    Krátký text

    Více

    krátkých

    odstavců

## Pseudo-elementy

Simulovat sloupce je možné i pseudo-elementy (`before`/`after`). Kdy se pomocí `z-index`u umístí za sloupce absolutně posicované *barvy*, které se roztáhnou po celé výšce. Toto řešení funguje od **IE 8**.

[Samostatná ukázka](http://kod.djpw.cz/cocb).

## Dopočítání výšky JavaScriptem

Lze využít toho, že JS může přeměřit oba sloupce (`offsetHeight`) a vyšší hodnotu potom nižšímu sloupci nastavit. Nevýhoda může být, že takový rozměr přestane platit, pokud se na stránce bude s něčím manipulovat (třeba [skrývat a odkrývat](/zobrazit-skryt)).

Sloupce, kterým se srovnává výška, **musí být jen obaly**, pokud jim přidáme v [obsahovém box modelu](/box-model#content-box) (výchozí ve standardním režimu) `padding` nebo `border`, přestane toto řešení fungovat.

    .scriptem {width: 500px}
    .scriptem .levy {float: left; width: 150px; background: #34A3E4}
    .scriptem .pravy {float: right; width: 350px; background: #E36FAF}
    .scriptem p {padding: 1em}

    Krátký text

    Více

    krátkých

    odstavců

function srovnatVysku(levy, pravy) {
  if (pravy.offsetHeight > levy.offsetHeight) {
    levy.style.height = pravy.offsetHeight + "px";
  }
  else {
    pravy.style.height = levy.offsetHeight + "px";
  }
}

srovnatVysku(document.getElementById("prvni"), document.getElementById("druhy"));

  function puvodniVyska(levy, pravy) {
    var pravyHtml = pravy.innerHTML;
    pravy.innerHTML = levy.innerHTML;
    levy.innerHTML = pravyHtml;
    
    levy.style.height = "auto";
    pravy.style.height = "auto";
}

Původní výšky &amp; prohodit Srovnat

## Flexboxy

Jak je vidět, všechna řešení nejsou moc elegantní. Ovšem je tu naděje v podobě [flexboxů](/flexbox) — problematická podpora napříč prohlížeči (k disposici až od **Internet Exploreru 10**), ale zatím celkem brání rozumnému používání.