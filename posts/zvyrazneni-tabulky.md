---
title: "Zvýraznění řádků a sloupců tabulky"
headline: "Zvýraznění sloupců/řádků tabulky po najetí"
description: "Jak při najetí myší na tabulku zvýraznit příslušné sloupce a řádky."
date: "2015-02-11"
last_modification: "2015-02-12"
status: 1
tags: ["CSS", "Hotová řešení", "Tabulky"]
---

U rozsáhlejších tabulek může být obtížnější udržet přehled o tom, co k čemu patří. Pomůže **zvýraznění sloupců a řádků** po najetí myší.

## Zvýraznění řádků

Zvýraznit po najetí celý řádek (`&lt;tr>`) jde velmi jednoduše s využitím pseudo-třídy [`:hover`](/css-selektory#uzivatelske-akce).

```
tr:hover {
  background: yellow;
}
```

Mají-li buňky (`&lt;td>`) nastavenou nějakou barvu, je nutné barvit až přímo `tr:hover **td**`, jinak by `:hover` celého řádku nebyl vidět.

    .zvyrazneni-radku tr:hover td {
      background: yellow;
    }

      Text
      Text

      Text
      Text

      Text
      Text

## Zvýraznění sloupců

Hover efekt pro sloupce je o poznání těžší. Existuje sice značka `&lt;col>`, díky které jde efektivně [stylovat celé sloupce](/stylovani-tabulky), ale neumí odchytnout `:hover`.

Nabízí se tedy dvě řešení:

  - JavaScriptem zjistit pořadí sloupce, kde je **kursor myši**, a nastavit příslušnému `&lt;col>` zvýrazňující třídu.

  - Zvýraznění zajistit [absolutně posicovanými](/position#absolute) pseudo-elementy [`:before`/`:after`](/content-attr).

### Zvýraznění sloupce JavaScriptem

    Při pohybu myši v tabulce ([`onmousemove`](/udalosti-mysi#onmousemove)) se z objektu `event` zjistí jeho [`target`](/event-target) (cílový element).

    Pokud cílový element bude buňka (`&lt;td>`), zjistí se její pořadí z vlastnosti `cellIndex`.

    Podle indexu se najde příslušný `&lt;col>` a přidá se mu třída pro zvýraznění.

    Je nezbytné, aby buňky tabulky **neměly nastavené pozadí**, jinak pozadí nastavené pro `&lt;col>` nebude vidět.

    Docílit zrušení zvýraznění při **odjetí myší** jde při události `onmouseout` nebo obalením `&lt;div>`em s mírným `padding`em, který označení „vyčistí“, protože není buňka tabulky.

    table.zvyrazneni-js {
      background: #fff;
    }
    .zvyrazneni-js td {
      background: transparent;
    }
    .zvyrazneni-js tr:hover td, 
    .zvyrazneni-js col.hover {
      background: yellow;
    }

      Text
      Text
      Text

      Text
      Text
      Text

      Text
      Text
      Text

    var aktivniSloupec = false;
    var sloupce = document.querySelector('.zvyrazneni-js').getElementsByTagName("col");
    function zvyraznit(e) {
        if (aktivniSloupec !== false) {
            sloupce[aktivniSloupec].className = "";
        }
        e = e || window.event;
        var bunka = (e.target || e.srcElement);
        if (bunka.tagName == "TD") {
            aktivniSloupec = bunka.cellIndex;
            sloupce[aktivniSloupec].className = "hover";
        }
    }

[Samostatná ukázka](http://kod.djpw.cz/bikb)

### Označení sloupce v CSS

    Buňkám se přidá [relativní posice](/position#relative).

    Při `:hover`u se zobrazí absolutně posicovaný pseudo-element `:before`. Ten bude mít pozadí v barvě zvýraznění, 100% šířku a hodně vysokou výšku, aby bezpečně přesáhla výšku tabulky.

    Protože by tento absolutně posicovaný *zvýrazňovač* vylézal z tabulky, přidá se:

    ```
table {
  overflow: hidden;
}
```

    Pro umístění zvýrazňovače „za text“ se přidá záporný `z-index`.

[Živá ukázka](http://kod.djpw.cz/jhkb)

Těžko soudit, které řešení je lepší. Čistě CSS způsob je možná trochu **snazší na implementaci** (stačí pouze přidat CSS), spoléhání se na velkou výšku ale není úplně stoprocentní.

### Generování CSS

Další možnost je vytvoření stylů pro zvýraznění každého sloupce (pomocí [selektoru `:nth-child`](/css-selektory#n-ty-potomek)) a při najetí měnit jen třídu tabulky podle aktivního sloupečku.

```
.sloupec-1 td:nth-child(1),
.sloupec-2 td:nth-child(2),
.sloupec-3 td:nth-child(3) {
  background: yellow;
}
```

Vygenerovat podobné CSS je ideální nějakým CSS preprocesorem, co umí cykly.

[Živá ukázka](http://kod.djpw.cz/cikb)

### Hrubá síla

Funkční by zřejmě bylo i procházení všech buněk tabulky a měnění tříd, ale obával bych se **problémů s výkonem** u větších tabulek.