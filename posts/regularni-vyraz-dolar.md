---
title: "Znak $ v regulárním výrazu"
headline: "Znak dolaru v regulárním výrazu"
description: "Jak zapsat znak dolaru v regulárním výrazu v PHP."
date: "2014-03-26"
last_modification: "2014-03-28"
status: 1
tags: ["PHP", "Regulární výrazy"]
---

Znak dolaru (`$`) má v regulárních výrazech zvláštní význam. Značí konec řetězce nebo konec řádku.

  **Zapsat** na [české klávesnici](/ceska-klavesnice) jde klávesovou zkratkou Pravý Alt + ů.

V případě, že je cílem najít v textu něco s dolarem, nabízí se znak `$` **escapovat** (`\$`).

```
$vysledek = preg_match("~**\$**~", "0.50 $"); // true
```

Výsledek bude dle očekávání kladný. Když znak dolaru v testovaném řetězci nebude, měl by výsledek vrátit `false`.

```
$vysledek = preg_match("~\$~", "0.50 €"); // **true**
```

Jenže vrací také `true`. Proč? PHP řetězce v dvojitých *uvozovkách* zpracovává tak, že se escapování dolaru vypustí. Domnívám se, že je to z toho důvodu, že dolar má v ouvozovkovaném řetězci význam jako označení případné proměnné.

```
$promenna = "kobercovka";
echo "Vypisuji $promenna"; // Vypisuji kobercovka
echo "Vypisuji \$promenna"; // Vypisuji $promenna
```

A to escapování se před předání do funkce `preg_match` ztratí.

Řešení je naštěstí prosté, používat v regulárních výrazech **jednoduché uvozovky**.

```
$vysledek = preg_match(**'**~\$~**'**, "0.50 €"); // false
$vysledek = preg_match(**'**~\$~**'**, "0.50 $"); // true
```

A nebo přidat další **zpětné lomítko** pro escapování dolaru.

```
$vysledek = preg_match("~**\\**$~", "0.50 €"); // false
```

## Odkazy jinam

    - [Uvozovky v PHP](/uvozovky#php) – rozdíl mezi jednoduchými a dvojitými uvozovkami