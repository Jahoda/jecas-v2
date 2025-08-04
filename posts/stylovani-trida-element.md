---
title: "Stylovat třídy, nebo elementy?"
headline: "Stylovat třídy, nebo elementy?"
description: "Je lepší stylovat přímo HTML elementy, nebo všechny styly přiřazovat třídami?"
date: "2016-02-26"
last_modification: "2016-03-03"
status: 1
tags: ["CSS", "Stylování elementů", "Rady a nápady"]
---

Při nastavování vzhledu obecných elementů čelí kodér volbě, zda použít přímo [selektor](/css-selektory) pro název elementu, nebo elementu přidat třídu a zaměřit ho v CSS podle ní.

Následující příklad srovnává obě situace pro [tabulku](/html-tabulky):

    Stylování elementu:

    ```
table {
  /* obecné styly pro všechny tabulky */
}
```

    Použití třídy:

    ```
&lt;table class="table">
```

    A příslušného stylu:

    ```
.table {
  /* styly pro tabulku */
}
```

Kromě tabulek se totéž týká dalších sémantických prvků stránky jako jsou [nadpisy `&lt;h1–6>`](/nadpisy), [seznamy](/seznamy) (`&lt;ul>`, `&lt;ol>`, `&lt;dl>`) a podobně.

## Stylování elementů

Na přímém stylování elementů je hezké, že funguje na libovolný HTML kód.

Do HTML stačí umístit prostou značku a je zaručeno, že bude dobře vypadat. Například při kopírování HTML kódu napříč weby je automaticky zajištěno, že se vzhled přizpůsobí cílové stránce.

Stylování elementů podle selektoru názvu podporuje i původní myšlenku CSS, kdy jde u jednoho dokumentu přepínáním CSS souborů plnohodnotně měnit vzhled (návštěvník by si teoreticky mohl všechny weby zobrazovat v obdobném stylu).

    - [CSS Zen Garden](http://www.csszengarden.com/) – totožné HTML kompletně přestylovatelné změnou CSS

## Stylování přes CSS třídy

I stylování přes třídy má své výhody. Zejména **nedojde ke konfliktům a přebíjení hodnot**. Jsou-li obecné styly pro HTML elementy hodně specifické, bude při požadavku na jiný styl komplikované obecné styly přepisovat.

### Stylování nadpisů třídami

Zajímavá myšlenka je stylovat podle tříd i **nadpisy**. Odbourá se tím risiko zneužití nesprávného nadpisu kvůli vzhledu.

V CSS budou například třídy:

```
.nadpis-stranky {}
.nadpis-hlavni {}
.nadpis-podnadpis {}

```

A při použití už bude jedno, jestli se aplikují na `&lt;h1>`, `&lt;h2>` nebo `&lt;h3>`. Stylování přímo značek `&lt;h1–6>` může lákat ke zneužití pro dané místo nesprávné značky, protože je potřeba, aby nadpis jinak vypadal.

Stylování pomocí CSS tříd ale klade vyšší nároky na postprocessing HTML kódu. Přidávat všem elementům třídy ručně by nebylo moc pohodlné.

Tuto schopnost by tedy měl mít editor, ve kterém je obsah tvořen.

## Další řešení

Specifika obou přístupů je možné kombinovat.

### Základní obecné styly

Na selektory obecných elementů se aplikují jen základní pravidla, která nebude tolik komplikované přepisovat. Řada elementů typicky stejně přebírá výchozí vzhled z CSS prohlížečů.

    - [Příklad výchozích hodnot v CSS ve všech prohlížečích](/css-reset#vychozi)

Změnou těchto vlastností se následné stylování nezkomplikuje (stejně by se musely přebíjet výchozí styly).

### Styly jen pro `.obsah`

Specifické styly aplikované přímo na HTML elementy se mohou aplikovat jen uvnitř nějakého obalu – například obsahové části.

```
.obsah h1 {}
.obsah h2 {}
.obsah table {}
```

Má to ale dva problémy:

    I v obalu se může nacházet box, který bude muset obecný styl složitě přebíjet/resetovat.

    Selektory budou zbytečně silnější, čímž se komplikuje budoucí stylování.

    Pro přestylování nadpisu `&lt;h1 class="nadpis-stranky">` už nebude stačit:

    ```
.nadpis-stranky {}
```

    Ale bude se selektor muset posílit.

### Stylování elementů bez třídy

Stačí-li podpora od **IE 9**, existuje elegantní řešení se [selektorem negace](/css-selektory#negace).

Následující styly se aplikují jen na tabulky, které nemají nastavenou třídu.

```
table:not([class]) {
  /* obecné styly */
}
```

Pro případ `&lt;table class="">` se může přidat ještě:

```
table:not([class]),
table[class=""] {
  /* obecné styly */
}
```

Jakmile se takový element použije s třídou, výchozí pravidla se na něj neaplikují. Při použití bez třídy bude ale automaticky stylovaný.

## Vlastní elementy

Specifický případ nastává u webových aplikací, kde nemusí být tak nutné používat zavedené [HTML značky](/vsechny-html-znacky), ale jde si vytvořit vlastní elementy (třeba značky `&lt;je-cas>` a `&lt;tak-jde-cas>`), které nejsou žádným výchozím vzhledem zatíženy.

```
je-cas,
tak-jde-cas {
  /* styly vlastních elementů */
}
```

Funkčnost vlastním elementům zajistí [JavaScript](/js), který je stejně pro fungování [nezbytný](/bez-javascriptu). Sémantický význam jde potom zajistit atributy `role` (například `role="button"` pro [tlačítko](/tlacitko)). A stylování není od **IE 9** problém.

**Honza Bittner** doplnil, že názvy vlastních elementů by měly podle specifikace obsahovat spojovník. Na funkci to sice nemá vliv, ale přidání spojovníku do názvu je způsob, jak předejít možným kolisím, kdy by se název vlastního elementu shodoval s existující HTML značkou.

## Odkazy jinam

  - CSS Tricks: [Should you have defaults styles for `table`?](https://css-tricks.com/should-you-have-defaults-styles-for-table/)

  - CSS Wizardry: [Managing Typography on Large Apps](http://csswizardry.com/2016/02/managing-typography-on-large-apps/)