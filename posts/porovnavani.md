---
title: "Porovnávání == a ==="
headline: "Rozdíl mezi == a ==="
description: "Rozdíl mezi porovnáváním hodnota pomocí <code>==</code> a <code>===</code>."
date: "2014-06-17"
last_modification: "2014-06-21"
status: 1
tags: ["JavaScript", "Rady a nápady", "PHP"]
---

Pro porovnávání dvou hodnot existuje v PHP operátor `==`.

```
$a = 1;
if ($a == 1) // něco se provede
```

Porovnávání dvojitým rovnítkem ale má v PHP (ale i v JavaScriptu) svá specifika. Před samotným porovnáním totiž obsah přetypuje.

    Porovnání
    Výsledek

    `0 == "0"`
    `true`

    `0 == 0.0`
    `true`

    `0 == ""`
    `true`

Kladný výsledek porovnávání `0 == ""` už může vypadat trochu divně. Ještě zvláštněji působí:

    Porovnání
    Výsledek

    `'0e1' == 0`
    `true`

    `'1e2' == 100`
    `true`

Zde se budou rovnat různé zápisy čísla. To `1e2` znamená 1 * 10 ^ 2.

Vtipná situace může potom nastat při následujícím porovnání:

    Porovnání
    Výsledek

    `md5('240610708') == md5('QNKCDZO')`
    `true`

Nejedná se o problém v `md5`, ale o to, že:

  - `md5('240610708')` → `**0e**462097431906509019562988736854` → `0`

  - `md5('QNKCDZO')` → `**0e**830400451993494058024219903391` → `0`

Porovnávání dvěma `=` je tedy značně nevyzpytatelné.

## Tři rovná se (`===`)

Použití `===` potom zajistí, že výše uvedené konstrukce skončí jako `false`.

    Porovnání
    Výsledek

    `0 === "0"`
    `false`

    `0 === 0.0`
    `false`

    `0 === ""`
    `false`

    `'0e1' === 0`
    `false`

## Automatický převod `==` na `===`

Některé editory/IDE navrhují používat rovnou `===`.

Důrazně ale varuji před **automatickým nahrazením** `==` za `===`, snadno to může vytvořit fatální chybu v případě, že programátor s chováním dvou rovnítek (a přetypováním) počítal.