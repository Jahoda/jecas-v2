---
title: "Formátování měny v Kč"
headline: "Formátování měny v Kč"
description: "Jak formátovat peněžní částku v korunách se všemi náležitostmi."
date: "2016-02-12"
last_modification: "2016-02-12"
status: 0
tags: []
---

Při počítání finančních částek bývá rozdíl mezi číslem získaným v programovacím jazyce a vhodnou podobou pro presentování uživatelům.

Částku spočítanou skriptem ve tvaru:

```
1016.5
```

By bylo lepší zobrazovat (třeba) jako:

```
1 016,50 Kč
```

Pro zobrazování částky v korunách platí následující pravidla:

    Bývá zvykem po **3 znacích oddělovat** číslice mezerou. Tedy oddělit tisíce, miliony, miliardy a podobně.

    V češtině se pro oddělení **desetinných míst** používá čárka místo tečky běžné v programování nebo některých jiných jazycích.

    Je-li částka i v **haléřích**, má obsah za desetinnou čárkou **2 desetinná místa**.

    Zkratka pro koruny `Kč` se píše s **velkým počátečním písmenem**.

    Aby se uprostřed částky nezalomil řádek, mezery se používají tzv. [pevné](/ceska-klavesnice#nbsp) (`&amp;nbsp;`).

## Formátování Kč v JavaScriptu

```
var koruny = function(castka) {
  castka = castka.toFixed(0).replace(/./g, function(c, i, a) {
      return ((a.length - i) % 3 === 0) ? ' ' + c : c;
  });
  return castka;
};
```

## Odkazy jinam

  - [Localizing Dates, Currency, and Numbers with Php-Intl](https://www.sitepoint.com/localizing-dates-currency-and-numbers-with-php-intl/) – jak v PHP lokalisovat kalendářní data, měnu a čísla