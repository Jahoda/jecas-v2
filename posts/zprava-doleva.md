---
title: "Zprava doleva"
headline: "Zprava doleva"
description: "HTML značky, HTML, atributy a CSS vlastnosti pro text psaný zprava doleva."
date: "2016-01-27"
last_modification: "2016-02-01"
status: 1
tags: ["HTML", "CSS", "HTML značky"]
---

Běžný český nebo evropský kodér se s nimi setkat nemusí, ale v HTML a CSS existuje řada prvků určených pro jazyky psané zprava doleva.

## Atribut `dir`

Jedná se o [globální atribut](/obecne-atributy#dir) použitelný na kterékoliv blokové značce. U webů psaných zprava doleva se obvykle používá u značky [`&lt;html>`](/html-kostra#html).

Jeho použitím jde docílit, že obsah elementu bude vypisován:

  Zprava doleva.

## `&lt;bdi>`

Zkratka BDI znamená *Bi-Directional Isolation*.

Řádková značka hodící se k obalení slova, u kterého není známé, jestli se píše zleva doprava nebo zprava doleva.

Teoreticky by se tak měl obalovat každý uživatelem zadaný řetězec, který může být zapsán oběma směry.

Prohlížeče mají algoritmus pro **automatické rozpoznávání směru textu**. Bez použití `&lt;bdi>` například pro obalení přezdívky uživatele může dojít k nežádoucímu jevu, kdy „přepnutí“ mezi oběma směry proběhne jinde, než by mělo.

   Uživatel **fytopuf**: 5 příspěvků.
   Uživatel **إيان**: 3 příspěvky.

Bez použití `&lt;bdi>` se dvojtečka a číslo zobrazí vlevo od přezdívky. S `&lt;bdi>` se to nestane, protože obsah této značky bude isolován od okolí:

   Uživatel **fytopuf**: 5 příspěvků.
   Uživatel **إيان**: 3 příspěvky.

Podporuje pouze **Chrome 16+** a **Firefox 10+**.

## `&lt;bdo>`

Zkratka BDO znamená *Bi-Directional Override*. Podporuje atribut `dir` pro nastavení směru textu (`ltr`/`rtl`) nezávisle na algoritmu prohlížeče, který požadovaný směr hádá dle obsahu.

  Uprostřed věty bude slovo zprava doleva.

Značka `&lt;bdo>` je velmi dobře podporovaná.

V praxi by se mohla hodit v případech, kdy algoritmus prohlížeče špatně určí žádoucí směr.

Další možné využití je pro různé legrácky.

## CSS vlastnosti

### CSS `direction`

V CSS totéž dělá vlastnost `direction` to samé jako HTML atribut `dir`:

  Zprava doleva.

### `unicode-bidi`

Pro dosažení výsledku značek `&lt;bdi>` nebo `&lt;bdo>` potom existuje CSS vlastnost `unicode-bidi`. Je možné ji kombinovat s `direction`:

    `unicode-bidi: isolate` – ekvivalent značky `&lt;bdi>`. Isoluje obsah, aby ho správně pochopil automatický algoritmus pro určování textu psaného zprava/zleva.

    `unicode-bidi: bidi-override` – ekvivalent `&lt;bdo dir="rtl">`.

    ```
element {
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

Další hodnoty jsou popsány na MDN:

    - MDN: [`unicode-bidi`](https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi)

### `text-align`

V případě webu psaného zprava doleva by tomu mělo odpovídat i zarovnání textu vlastností `text-align`.

Pro vícejazyčné weby jde použít universální hodnoty `start` a `end` (místo `left` a `right` při psaní zleva doprava), které se přizpůsobí nastavenému směru.

Tyto hodnoty nepodporuje [**MS Edge**](/microsoft-edge), všechny **IE** a stará **Opera 12**.

[Živá ukázka](http://kod.djpw.cz/fztb)