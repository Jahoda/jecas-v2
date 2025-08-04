---
title: "Výpočet průměru a mediánu v PHP/JS"
headline: "Výpočet průměru a mediánu v PHP/JS"
description: "Jak v jazyce PHP nebo v JavaScriptu spočítat medián."
date: "2016-02-01"
last_modification: "2016-02-15"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

Při zjišťování nějaké hodnoty z velkého množství dat bývá obvyklé počítat průměr. Ten je ale bohužel hodně náchylný na ovlivnění extrémně malými nebo extrémně velkými hodnotami.

Jak průměr a medián spočítat v PHP?

## Průměr

Spočítat průměrnou hodnotu pole je poměrně jednoduché. Stačí součet hodnot (funkce `array_sum`) vydělit jejich počtem:

```
function prumer($pole) {
  return array_sum($pole) / count($pole);
}
echo prumer(
  array(1, 3, 5)
); // 3

```

## Medián

Medián je zajímavější tím, že se rovná **prostřední hodnotě**, když se čísla seřadí podle velikosti.

Z pěti čísel `1, 2, **2**, 3, 9` tak bude medián odpovídat `2`, protože je uprostřed.

Pro výpočet stačí tedy nejprve pole seřadit funkcí `sort` a následně vypsat prostřední položku. Ta se zjistí vydělením počtu všech položek pole (spočítá je funkce `count`) číslem dvě a zaokrouhlením (funkce `round`). Protože jsou indexy pole číslovány od nuly, ještě se odečte jednička.

Výpočet mediánu v PHP potom může vypadat následovně:

```
function median($pole) {
  sort($pole);
  return $pole[round(count($pole) / 2) - 1];
}
echo median(
  array(1, 2, 2, 3, 9)
); // 2
```

Nudná matematická teorie ohledně mediánu je případně na následujících stránkách:

    - Matematika.cz: [Medián](http://www.matematika.cz/median)

    - Wikipedie: [Medián](https://cs.wikipedia.org/wiki/Medián)

## Průměr a medián v JS

### Medián v JS

Výpočet mediánu jde poměrně snadno přepsat do JS:

```
function median(pole) {
  pole = pole.sort();
  return pole[Math.round(pole.length / 2) - 1];
}
alert(median(
    [1, 2, 2, 3, 9]
));
```

### Průměr v JS

V JavaScriptu je počítání průměru pole trochu obtížnější, protože oproti PHP nemá zabudovanou funkci pro **součet hodnot pole**.

#### Součet pole v JS

Jednoduchá implementace PHP funkce `array_sum` do JavaScriptu by mohla vypadat následovně:

```
function array_sum(array) {
  return array.reduce(function(a, b) {
    return a + b;
  });
}
```

S ní už je výpočet průměru v JS jednoduchý:

```
function prumer(pole) {
  return array_sum(pole) / pole.length;
}
```

[Živá ukázka](http://kod.djpw.cz/ybub)

## Kalkulačka mediánu a průměru

  function spocitat(value) {
      var bezCarek = value.trim().replace(/\,/g, "");
      var pole = bezCarek.split(" ");
      vysledek.innerHTML = "Medián je: " + median(pole);
      vysledek.innerHTML += "
Průměr je: " + prumer(pole);
  }

  function median(pole) {
    pole = pole.sort();
    console.log(pole);
    return pole[Math.round(pole.length / 2) - 1];
  }

  function array_sum(array) {
    return array.reduce(function(a, b) {
      return parseFloat(a) + parseFloat(b);
    });
  }

  function prumer(pole) {
    return array_sum(pole) / pole.length;
  }    
  
  1, 2, 2, 3, 9

    spocitat(cislaArea.value);
    // http://kod.djpw.cz/amub