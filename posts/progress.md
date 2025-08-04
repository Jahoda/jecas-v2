---
title: "Element <progress>"
headline: "HTML značka <code>&lt;progress&gt;</code>"
description: "Značka <code>&lt;progress&gt;</code> slouží k znázornění <i>postupu</i>. Co nabízí za možnosti?"
date: "2013-08-28"
last_modification: "2013-09-10"
status: 1
tags: ["HTML", "HTML značky", "Stylování elementů"]
---

50 % (`value=50 max=100`)

  70 ze 60  (`value=70 max=60`)

Použití je následovné:

```
&lt;progress value="50" max="100">50 %&lt;/progress>
```

  `value`
  Hodnota *postupu*, musí být mezi nulou a hodnotou `max`.
  `max`
  Určuje, jaká hodnota `value` se bude brát jako sto procent. Pokud je `value` větší než `max`, bere se to jako 100 %.

## Podpora

Element `&lt;progress&gt;` je podporován **až od Exploreru 10**, v nepodporovaných zařízeních se objeví obsah mezi počáteční a koncovou značkou.

```
&lt;progress value="50" max="100">**50 %**&lt;/progress>
```

Nicméně vytvořit náhradu za `&lt;progress&gt;` není nijak zvlášť složité:

Teoreticky je možné tuto náhradu umísit do značky:

```
&lt;progress value="**50**" max="100">
  &lt;div class="progress"&gt;
    &lt;div style="width: **50**%&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/progress>
```

Otázka potom je, zda `&lt;progress&gt;` vůbec používat, když už se stejně vytváří atrapa.

## Signalisace načítání

Samotná značka `&lt;progress>` poslouží i jako **jednoduchá indikace načítání**.

[Samostatná živá ukázka](http://kod.djpw.cz/wxib)

## Stylování

Orientace
  Ve Firefoxech lze změnit orientaci na svislou pomocí:

```
progress {-moz-orient: vertical}
```

  50 %

  Vzhled
  Vzhled je přebírán z operačního systému, vypne ho:

    ```
progress {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
```

      50 %

    Kromě toho lze zrušit `border` nebo nastavit rozměry (`width` a `height`).

    Vzhled *obalu* lze nastavit pseudotřídou `::progress-bar`, vzhled *ukazatele* zase přes `::progress-value`. V současné době jsou pro funkčnost alespoň ve Webkitu a Gecku nutny prefixy.