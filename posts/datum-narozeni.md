---
title: "UX políčka pro datum narození"
headline: "UX políčka pro datum narození"
description: "Jak usnadnit uživatelům zadávání data narození."
date: "2022-05-02"
last_modification: "2023-01-07"
status: 1
tags: ["Formuláře", "UX"]
---

U [webových formulářů](/formulare) existuje spoustu možností, jak uživatelům **znepříjemnit jejich používání**.

      [20 největších chyb formulářů na webu](/chyby-formularu)

Výzvou k řešení je způsob pro **zadání data narození**. Existuje několik způsobů, jak ho nechat uživatele zadávat.

## Textové pole

Jedno z nejjednodušších řešení je obyčejný textový [`&lt;input>`](/input).

    Datum narození

    Např. 30. 1. 1970

Má to několik problémů:

    Textové pole na dotykových zařízeních se SW klávesnicí nezobrazuje optimální **rozložení klávesnice** s preferováním čísel.

    Pro textové pole se zobrazí alfanumerická klávesnice, kde nejde přímo zadávat čísla:

    Uživatel **nezná formát**, ve kterém má datum zadat.

    ```
30.1.1970
30. 1. 1970
30.01.1970
30/1/1970
1/30/1970
1970-01-30
```

    Kvůli tomu může být obtížná **validace**, aby si poradila s různými možnostmi.

    Zvlášť problém je v tom, že napříč zeměmi je zvykem mít různé pořadí dnů a měsíců.

    Například u data `4/12/1970` není možné se 100% jistotou rozhodnout, zda se jedná o 12. duben nebo 4. prosinec.

## Systémový datepicker

Většinou se pro datum dobře hodí tzv. [datepicker](/datepicke). Typicky se jedná o políčko, které po kliknutí zobrazí kalendář.

Dosáhnout toho jde snadno přes `&lt;input type="date">`:

    Datum narození

Nevýhoda je v tom, že si toto políčko různé prohlížeče implementují různě.

Třeba **Safari** v **macOS** zobrazí následující věc.

V mobilním **iOS** v **iPhone** potom:

V desktopovém **Chromu**:

Je celkem zřejmé, že zadávat datum narození těmito způsoby je zvlášť pro dříve narozené celkem problematické. Musí se probrat množstvím položek, aby našli svůj rok.

Na mobilu je problém, že **datum nelze zadat ručně**. Datum ani není možné odněkud zkopírovat do políčka.

## Výběr přes `&lt;select>`

Tento formulářový prvek je většinou [nejlepší nepoužívat](/select-pouzitelnost).

Ani zadávání data narození není výjimka:

    Datum narození

      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
      11
      12
      13
      14
      15
      16
      17
      18
      19
      20
      21
      22
      23
      24
      25
      26
      27
      28
      29
      30
      31

      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
      11
      12

      1970
      1971
      1972
      1973
      1974
      1975
      1976
      1977
      1978
      1979
      1980
      1981
      1982
      1983
      1984
      1985
      1986
      1987
      1988
      1989
      1990
      1991
      1992
      1993
      1994
      1995
      1996
      1997
      1998
      1999

V tomto případě nenabízí nic moc navíc oproti `&lt;input type="date">`. Navíc trpí nemožností ručního zadání data i na desktopu.

### Více textových polí

Relativně rozumný může být přístup rozdělení dnů, měsíců a roků na samostatná políčka:

    Datum narození

      Den

      Měsíc

      Rok

Uživatel v tomto případě **jasně ví, co má kam zadat**. Validace je jednoduchá – stačí obsah pole převést na číslo (ignorovat jiné znaky něž číslice).

Díky atributu `pattern="[0-9]*"` se na dotykových zařízení zobrazí číselná klávesnice:

Má to ale i nevýhody:

    Více políček komplikuje vyplnění formuláře (další klikání navíc).

    Není možné celé datum narození zkopírovat a vložit.

    Automatické vyplňování formulářů bude mít pravděpodobně problém rozpadnout datum narození do 3 polí.

## Vlastní datepicker

Velmi dobré řešení může být vlastní datepicker uzpůsobený pro datum z dávné minulosti.

Tj. postupně nechat zadávat rok, měsíc a nakonec den. A umožnit přepínání pro případ chyby.

Je ale relativně pracné něco takového napsat, takže se nabízí hledat takové hotové řešení, které splňuje podmínky pro pohodlné zadávání.

## Odkazy jinam

    GOV.UK Design System: [Dates](https://design-system.service.gov.uk/patterns/dates/)

    Smashing Magazine: [Frustrating Design Patterns That Need Fixing: Birthday Picker](https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-birthday-picker/)