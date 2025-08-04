---
title: "Box-decoration-break"
headline: "Box-decoration-break"
description: "Vlastnost <code>box-decoration-break</code> upravuje chování stylu elementu při zalomení řádku."
date: "2014-10-14"
last_modification: "2014-10-15"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Podpora

Funguje mimo **IE**, v některých ostatních prohlížečích jen s [prefixy](/css-prefixy).

## Řádkové prvky

Když nějakému **řádkovému prvku** (`display: inline`) přidáme rámeček, [stín](/box-shadow) nebo [pozadí s přechodem](/gradient), může se v případě jeho zalomení stát ne úplně pěkná věc. Efekt se rozdělí na několik řádků.

    .dekorace {
      border: 1px solid #0D6AB7;
      border-radius: 5px;
      padding: .4em; 
      line-height: 250%;
      background: #fff;
      box-shadow: 5px 5px 5px #1081DD;
    }
  
  Text
 s *dekorací* se zalomí do několika řádků.

Pokud není pravděpodobné, že v elementu se zvláštní dekorací bude něco hodně dlouhého, asi nejlepší řešení je **zrušit zalamování**:

```
element {
  white-space: nowrap;
}
```

Pro ostatní případy se může hodit právě `box-decoration-break`. Při nastavení na `clone` dekorační efekt **skončí na konci řádku**, aby na novém zase začal odznovu. Nerozlišuje se, jestli je zalomení **přirozené** nebo vyvolané značkou `&lt;br>`.

## Zápis

Hodnota `clone` způsobí zduplikování celého vzhledu na každý **jednotlivý řádek**, další možná hodnota je `slice`, která je výchozí – tj. jako by se `box-decoration-break` vůbec **nepoužilo**.

```
element {
  /* dekorace */
  box-decoration-break: **clone**;
  -webkit-box-decoration-break: clone;
  -ms-box-decoration-break: clone;
  -o-box-decoration-break: clone;
}
```

    .dekorace-clone {
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: clone;
      -o-box-decoration-break: clone;
    }
  
  Text
 s *dekorací* se zalomí do několika řádků.

[Samostatná ukázka](http://kod.djpw.cz/hlgb) ([ukázka s obrázkovým gradientem](http://kod.djpw.cz/mlgb) – přechod začne odznovu na každém řádku)

V ideálním případě by se měla výše uvedená ukázka zobrazovat takto:

Zajímavě se chová **IE**, který vykresluje nezávisle na vlastnosti `box-decoration-break` něco mezi `clone` a `slice`:

## Blokové elementy

Klonování efektu pomocí `box-decoration-break` jde použít i u blokových elementů – význam to má u [zobrazení ve sloupcích](/column) (korektně funguje jen ve **Firefoxu**).

    .dekorace-obal {
      margin: 2em 0;
      -webkit-columns: 3;
      -moz-columns: 3;
      -ms-columns: 3;
      -o-columns: 3;
      columns: 3;
    }
    .dekorace-block {
      display: block;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: slice;
      -o-box-decoration-break: clone;      
    }

    Text s *dekorací* se zalomí do několika sloupců. Jak se bude efekt napojovat je možné ovlivnit.

[Samostatná ukázka](http://kod.djpw.cz/ilgb)

Vypadat by to mělo následovně.

## Odkazy jinam

  - [DevDocs](http://devdocs.io/css/box-decoration-break)

  - [W3C](http://dev.w3.org/csswg/css-break/#break-decoration)