---
title: "Převod PHP na JavaScript"
headline: "Převedení PHP do JavaScriptu"
description: "Jak převést PHP kód do JavaScriptu."
date: "2014-04-09"
last_modification: "2014-04-10"
status: 1
tags: ["JavaScript", "Rady a nápady", "PHP"]
---

V případě, že máme nějaké logické funkce v PHP a potřebujeme je zároveň používat na straně klienta, tj. v JavaScriptu, není (polo)automatický převod výrazně komplikovaný.

## Proměnné

S proměnnými nemusí být potřeba dělat skoro nic. Pro PHP typické **dolary** (`**$**promenna`) na začátcích názvů se sice nabízí odstranit, nicméně ničemu nevadí. Znak dolaru je platným znakem JS proměnné, koneckonců v *proměnné* `$` je ukryta třeba celá knihovna **jQuery**.

Jediné, co může vadit, je nekorektní platnost v různých [prostorech/rámcích (scope)](/scope). Zvlášť u cyklů je lepší použít `var`.

## Funkce

Funkce jsou mezi oběma jazyky asi nejpodobnější. Následující kód například funguje v obou jazycích bez úpravy ([ukázka](http://kod.djpw.cz/qqcb)).

```
function pozdrav($text) {
    return ($text);
}
```

## Skládání řetězců

Významný rozdíl je naopak při skládání řetězců:

  PHP používá tečku.
    ```
echo "Ahoj, " **.** $promenna;
```

  JavaScript znak `+`.
    ```
alert("Ahoj, " **+** promenna);
```

## Cykly

Klasický `for` cyklus od určitého čísla do jiného čísla je skoro identický.

### PHP

```
for ($i = 0; $i &lt;= 10; $i++) {
}
```

### JS

```
for (**var** i = 0; i &lt;= 10; i++) {
}
```

## Procházením polem

### Cyklus `foreach`

Klasický cyklus v PHP:

```
$polozky = array("jedna", "dva", "tri");
foreach ($polozky as $polozka) {
  // $polozka
}
```

Vypadá v JS následovně ([ukázka](http://kod.djpw.cz/rqcb)):

```
var polozky = ["jedna", "dva", "tri"];
for (var polozka in polozky) {
  // polozky[polozka]
}
```

## Podmínky

Podmínky jsou hodně podobné. Asi největší rozdíl je v tom, že `else if` se v JavaScriptu píše s mezerou. PHP připouští obě varianty.

```
if (neco) {
}
else** **if (necoJineho) {
  // bez mezery to skoční v JS chybou
}
else {
}
```

### Ternární operátor

Funguje v obou jazycích podobně:

```
var vysledek = (neco == necemuJinemu) ? "ano" : "ne";
```

## Konstanty

Pro PHP konstantu:

```
&lt;?php
define("KONSTANTA", "hodnota");
```

Má JS klíčové slovo `const`:

```
const KONSTANTA = "hodnota";
```

Ale funguje až od **IE 11** (v **IE 10** a starších nikoliv). Ve staré **Opeře 12** se potom `const` ignoruje – hodnotu proměnné lze stále změnit. Ve **Firefoxu** a **Chrome** skutečné konstanty fungují.

Kvůli **nedostatečné podpoře** je proto lepší psát:

```
**var** KONSTANTA = "hodnota";
```

Jelikož JS hledí na velikost písmen v proměnných, tak ani **nehrozí kolise**. Nebo je řešení si vytvořit *objekt*:

```
var konstanty = {
  prvni : "hodnota",
  druha : "dalsi hodnota"
};
// konstanty.prvni;
```

## PHP funkce v JavaScriptu

Spousta PHP funkcí napodobených v JS je na [stránce phpjs.org](http://phpjs.org/functions/) připravena rovnou k použití.