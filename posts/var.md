---
title: "Proměnné v CSS"
headline: "Proměnné v CSS – <code>var()</code>"
description: "Proměnné přímo v CSS přes funkci <code>var()</code>."
date: "2013-12-17"
last_modification: "2013-12-17"
status: 1
tags: ["CSS", "CSS funkce"]
---

**Firefox 29** začal podporovat deklaraci a používání proměnných přímo v **čistém CSS** (bez CSS preprocesorů).

## Použití

    Nejprve je potřeba proměnnou **nadeklarovat**:

    ```
body {
  **var-***promenna*: 1em;
}
```

    To se dělá klíčovým slovem `var`, spojovníkem a samotným názvem.

    Při použití se jako hodnota CSS vlastnosti proměnná vyvolá.

    ```
p {
  padding: **var**(*promenna*);
}
```

    [Ukázka](http://kod.djpw.cz/uzx)

## Vlastnosti CSS proměnných

### Dědičnost

I proměnné se v CSS **dědí**. Aby u nějakého elementu šla proměnná vyvolat, musí být deklarována u rodiče. Pro proměnné platné napříč **celým dokumentem** se hodí použít selektor značky `&lt;html>` (nebo [`:root`](/css-selektory#korenovy)).

### Přebíjení proměnných

Podobně funguje i **přebíjení**. Hodnotu proměnné je možné libovolně přepisovat. Projeví se ale jen v potomcích elementu, který ji **přepisuje**.

Na následující [ukázce](http://kod.djpw.cz/wzx) proto bude v **prohlížeči podporujícím proměnné** prostřední odstavec modře orámován.

### Nenastavená proměnná

V případě, že proměnná, kterou chceme pomocí `var()` vyvolat, neexistuje, je možné uvést *fallback* jako druhý argument této funkce:

```
p {
  color: var(neexistuje, green);
}
```

Pokud proměnná `neexistuje` nebude existovat, barva se nastaví na `green`.

### Používání s dalšími CSS funkcemi

Proměnné je možné propojit třeba s [funkcí `calc()`](/calc) a rozměry počítat **násobením** nějaké základní hodnoty ([ukázka](http://kod.djpw.cz/aay)).

```
:root {var-hodnota: 100px}
p {width: calc(var(hodnota) * 2)}
```

Naopak používání `calc()` při deklarování proměnných, zdá se, zatím nefunguje.

## CSS proměnné a JavaScript

S CSS proměnnými by mělo jít manipulovat pomocí JavaScriptu (`style.var`).

  `get`
  
    Získat **hodnotu** proměnné u `element`u zařídí:

    ```
element.style.var.get("promenna");
```

  `set`
  
    Nastaví CSS proměnnou:

    ```
element.style.var.set("promenna", "hodnota");
```

  `has`
  
    Zkontroluje, jestli má element proměnnou nastavenou:

    ```
if (element.style.var.has("promenna")) {
  // má proměnnou „promenna“
}
```

  `delete`
  
    Odstraní proměnnou s daným názvem.

    ```
element.style.var.delete("promenna");
```