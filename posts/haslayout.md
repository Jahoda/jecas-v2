---
title: "IE hasLayout"
headline: "Vlastnost <code>hasLayout</code>"
description: "Co je zač CSS vlastnost <code>hasLayout</code> a k čemu ji využít."
date: "2013-10-02"
last_modification: "2013-10-04"
status: 1
tags: ["CSS", "Hacky"]
---

Týká se **jen Internet Explorerů**, oficiální definice zní: *hodnota indikuje, zda má element „layout“*. To není nic moc jasného.
Osobně bych to popsal jako takovou **magickou vlastnost**, kterou má smysl zkusit zapnout jako poslední možnost při vytváření webu, když se v Internet Exploreru na rozdíl od ostatních prohlížečů **něco špatně zobrazuje**.

Někdy zapnutí `hasLayout`u umožní, co by jinak nešlo. Třeba:

  - nabídne další [způsob clearování](/float#after),

  - umožní z výchozích blokových elementů udělat [`inline-block`](/centrovani#rozdily-inline-block).

## HTML značky s layoutem

Ve výchozím stavu mají `hasLayout` zapnutý značky `&lt;html&gt;`, `&lt;body&gt;`, tabulky, obrázky (`&lt;img&gt;`), `&lt;iframe&gt;`, formulářové prvky a ještě pár zpravidla obstrarožních elementů.

**Běžně používané značky** jako odkazy (`&lt;a&gt;`), `&lt;div&gt;`y, `&lt;span&gt;`y nebo **odstavce** (`&lt;p&gt;`) `hasLayout` zapnutý nemají.

## CSS vlastnosti zapínající layout

Pro elementy, co mají `hasLayout` ve výchozím stavu vypnutý, existuje jeho **zapnutí přes CSS**. Není na to nějaké přepínátko, ale `hasLayout` zapínají **určité vlastnosti**.

Může to být **výška** (`height`), **šířka** (`width`), **obtékání** (`[float](/float)`), `display: inline-block`, **absolutní posicování** (`[position: absolute](/position#absolute)`) nastavené na **jinou než výchozí hodnotu** nebo **svislý** (od 90° pootočený) **text** — `writing-mode: tb-rl`.

Nakonec **zapnout layout** umí ještě vlastnost `zoom` — ta je výhodná v tom, že při nastavení na `1` nic neovlivní (pokud se tedy dříve nepoužívala ke skutečnému zoomování), ale jen zapne `hasLayout`.

```
element {
  zoom: 1;
}
```

Teoreticky by se mohla zapsat jen pro IE [podmíněným komentářem](/podminene-komentare) (pokud nemá řvát CSS validátor) nebo nějakým jiným hackem (třeba rovnítkovým — `=zoom: 1` — to už ale validátor neumlčí). Nicméně neexplorerové ji ignorují, takže nevadí ani v originální podobě.

## Odkazy

  - Vlastnost `hasLayout` na [MSDN](http://msdn.microsoft.com/en-us/ie/ms530764(v=vs.85))