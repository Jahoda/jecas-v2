---
title: "Margin, border a absolutní posicování"
headline: "Margin, border a absolutní posicování"
description: "Jak se chová <code>margin</code> a <code>border</code> u absolutně posicovaných elementů."
date: "2014-10-13"
last_modification: "2014-10-14"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

Fakt, že něco [absolutně naposicujeme](/position#absolute) – tj. umístíme přesně na určité místo vlastnostmi `top`/`bottom`, `left`/`right` – nemusí znamenat, že to na daném místě **skutečně bude**.

Změnit posici elementu s `position: absolute` dokáže vlastnost [`margin`](/margin).

    .obal {position: relative; background: #efefef;}
    .obal > span {position: absolute; right: 0; bottom: 0; background: #ccc;}
    .obal .s-marginem {margin: 1em}

    Obsah je v obalu s `position: relative`.

    Obsah.

    Abs. posicovaný element (`bottom: 0; right: 0`)

Přidat/odebrat `margin`

Jak je vidět, přidání `margin`u element **posune**.

To na jednu stranu může být výhodné chování, na stranu druhou to může nepříjemně překvapit u elementů, které mají různý `margin` **napříč prohlížeči**. To je třeba [element `&lt;button>`](/button), který má v **Chrome** 2px `margin` a jinde má nulu.

[Živá ukázka](http://kod.djpw.cz/algb) rozdílu v **Chrome**.

## Hranice obalu

Další zajímavá věc je, kde se nacházejí hranice obalu s `position: relative`, kam se potom prvek absolutně umisťuje.

Vezmeme-li si obecné znázornění boxu, pomyslný bod „`top: 0; left: 0`“ se nachází na hranici mezi `padding`em a `border`em.

Někdy je cílem, aby například rámeček boxu **splýval s rámečkem** absolutně posicovaného tlačítka.

Řešení je buď **záporný `margin`** o rozměrech rámečku, nebo záporné souřadnice `top`/`bottom`, `left`/`right` – rovněž o tloušťku rámečku.

[Ukázka obou postupů](http://kod.djpw.cz/blgb)

Problém nastane, když budeme potřebovat obalu nastavit `overflow: hidden`, protože rámeček se v podstatě nachází mimo obsah + `padding` (jak znázorňuje předchozí obrázek), takže bude **oříznut**.

[Živá ukázka](http://kod.djpw.cz/clgb)

Řešení je umístit oba prvky s rámečkem na stejnou úroveň v HTML kódu. [Ukázka](http://kod.djpw.cz/dlgb).

Nebo rámeček vytvořit vlastností [`box-shadow`](/box-shadow) (**IE 9+**). [Ukázka](http://kod.djpw.cz/flgb).