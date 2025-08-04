---
title: "Zablokování psaní do <input>u"
headline: "Jak zakázat psaní do <code>&lt;input></code>u"
description: "V jakých případech a jak zamezit psaní do formulářového políčka."
date: "2014-10-05"
last_modification: "2014-10-05"
status: 1
tags: ["HTML", "Formuláře", "Rady a nápady"]
---

Občas potřebujeme na webové stránce zabránit uživateli měnit hodnotu [vstupního políčka `&lt;input>`](/input).

## Způsoby zabránění

### Atribut `readonly`

```
&lt;input **readonly**>
```

Obsah políčka nezměníme, ale jeho obsah půjde normálně **označit nebo zkopírovat** (to se někdy hodí pro [nabídnutí obsahu](/oznaceni-textu) ke [zkopírování](/kopirovat)).

Při odeslání formuláře se obsah políčka **odešle na server**.

  ">

Použití `readonly` vytváří risiko, že uživatel nepochopí, že je **políčko pouze ke čtení**. Obyčejný `&lt;input>` i `&lt;input>` s `readonly` mohou na první pohled **vypadat totožně**.

Zaměřit pole **pouze ke čtení** jde v CSS:

  - [atributovým selektorem](/css-selektory#atributovy) – `input[readonly]` (**IE 7+**)

  - [selektorem `:read-only`](/css-selektory#read-only) – `input:read-only` (**IE 12+**)

První způsob má mnohem lepší **podporu v prohlížečích**, selektor `:read-only` nefunguje ani v [**IE 11**](/ie11).

Další menší nevýhoda je při **kopírování**, kdy obsah nejde uložit do schránky funkcí *Vyjmout* (klávesovou zkratkou Ctrl + X). Někteří uživatelé vyjmutí používají raději než kopírování, protože je **visuálně potvrzené** (označený obsah zmizí).

### Atribut `disabled`

```
&lt;input **disabled**>
```

Atibut `disabled` celkově **zablokuje formulářové pole**. Nepůjde změnit a ani dokonce nebude možné do něj kliknout a vybrat si jeho obsah.

Zablokované políčko se při odeslání formuláře **nepřenese na server**.

Zaměřit *disablované* pole v CSS jde rovněž **atributovým selektorem** (`input[readonly]` – **IE 7+**) nebo méně podporovaným [`input:disabled`](/css-selektory#disabled) (**IE 9+**).

V **IE 9** a starších a **Opeře 12** nejde `disabled` plně stylovat. Barvu (`color`) zablokovaného políčka tam nezměníme. [Ukázka](http://kod.djpw.cz/ldgb).

Také na zablokovaném `&lt;input>`u není možné vyvolat například [událost onclick](/udalosti-mysi#onclick) ([ukázka](http://kod.djpw.cz/mdgb)), [odTabovat na něj](/tabindex) nebo u něj vyvolat `:focus`.

### Nepoužívat `&lt;input>`

Poslední možnost je pro výpis obsahu, který **nemá být určen k editaci**, vůbec nepoužít formulářové políčko, ale spokojit se např. s obyčejným elementem `&lt;span>`.

Má-li obsah být i odeslaný na server, řešení je duplikování obsahu do skrytého formulářového pole (`&lt;input type="hidden">`).

### Značka `&lt;output>`

Pro výsledky uživatelských akcí je určena [značka `&lt;output>`](/output). Nefunguje ale ani v **IE 11**.

## Nikomu nevěřte

Že je políčko pouze ke čtení (`readonly`), zablokované (`disabled`) či skryté ([type="hidden"](/input#type-hidden)) **nezaručuje, že do něj návštěvník nemůže nic napsat**.

S použitím [vývojářských nástrojů](/vyvojarske-nastroje) není žádný problém atribut **odmazat nebo změnit**.

## Co zvolit?

Rozhodování se pro ten či onen postup není úplně snadné. Následující faktory je ale dobré zvážit

    Atribut `disabled` je ze hry při snaze o možnost plnohodnotného stylování v **IE 9** a starších.

    V případě, že obsah **nikdy nepotřebujeme poslat na server**, není potřeba `&lt;input>` používat.

    Když pole někdy odesílat chceme a někdy ne, **přidání/odebrání atributu** je asi nejsnazší řešení.

    Políčko `readonly` bude nejspíš vždy vhodné styly odlišit od políčka, kam se dá psát.

    Na druhou stranu bez použití `&lt;input>`u může zase být někdy nutné vytvořit nějaký – políčku podobný – styl.

    ```
input, **.jako-input** {
  /* společné styly */
}
**.jako-input** {
  /* odlišení */
}
```

    Zde se nabízí použít `&lt;input>` nebo `&lt;span>` v závislosti na tom, co bude **jednoduší nastylovat**.

    K formulářovému políčku je v JS [elegantnější přístup](/js-prvky-formulare) než k obyčejnému elementu.

    ```
jmenoFormulare.jmenoReadOnlyPolicka.value = "hodnota";
```

## Nastavení `readonly` a `disabled` JavaScriptem

```
var policko = jmenoFormulare.nazevPolicka;
policko.**readOnly** = true;
policko.**disabled** = true;
```

U `readonly` se používá v JS [*camelCase*](http://cs.wikipedia.org/wiki/CamelCase), tj. `read**O**nly`.

  Zapnout/vypnout     
    
        disabled

        readonly

[Samostatná ukázka](http://kod.djpw.cz/odgb)