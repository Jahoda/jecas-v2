---
title: "CSS @supports"
headline: "CSS pravidlo <code>@supports</code>"
description: "Pravidlem <code>@supports</code> lze v CSS testovat dostupnost CSS vlastností."
date: "2013-11-21"
last_modification: "2017-08-14"
status: 1
tags: ["CSS", "Hacky", "CSS pravidla"]
---

Ve všech prohlížečích **kromě IE** (ani v [IE 11](/ie11)) je funkční pravidlo `@supports`. K čemu je to dobré?

```
@supports (color: #000) {
  p {color: red}
}
```

Pokud prohlížeč podporuje **vlastnost** `color` a je možné jí dát **hodnotu** `#000` (a pokud podporuje `@supports`, pochopitelně), nastaví se barva odstavce na červenou. [Ukázka](http://kod.djpw.cz/vns).

## Zápis

Pravidla `@supports` je možné kombinovat přes přkazy:

  - `and` (musí splňovat **obě** podmínky),
 
  - `or` (musí splňovat **alespoň jednu** z podmínek),

  - `not` (**nesmí splňovat**/podporovat danou vlastnost).

## CSS hacky

Jako užitečné využití mě v zásadě napadá jen **odlišení stylů pro různé prohlížeče** (CSS hackování), protože prohlížeče zpravidla nemají s **neznámou deklarací problémy**.

Pro **Internet Explorer** (všech versí) využijeme toho, že `@supports` nezná. A pro ostatní prohlížeče nachystáme nějakou symbolickou podmínku (třeba testování `color`).

```
element {/* vlastnosti pro IE */}
@supports (color: #000) {
  element {/* přepsání vlastností pro ostatní prohlížeče */}
}
```

Pro odlišení ostatních prohlížečů stačí testovat [prefixované](/css-prefixy) vlastnosti (projdou jen v konkrétním prohlížeči).

```
/* **IE** a starší prohlížeče */
@supports (-webkit-transform: none) {/* **Webkit** */}
@supports (-moz-transform: none) {/* **Firefox** */}
@supports (-ms-ime-align:auto) {/* **Edge** */}
@supports (-o-transform: none) {/* **Opera** */}
```

Na následující [ukázce](http://kod.djpw.cz/aos) bude mít odstavec v **IE**, **Opeře 12**, **Firefoxu 22+** a **Chromu 28+** různé barvy.

### Nebezpečí a problémy

Udržování hacků je do budoucna poměrně náročné, a proto je ideální se jim raději vyhnout.

Dále se může stát, že starší minifikátor kódu bude mít se `@supports` pravidlem problém.

## JavaScriptové testování podpory

V prohlížečích znalých `@suppport`u (kromě **Opery 12**) je možné používat i elegantní **testování CSS vlastností** v JS ([ukázka](http://kod.djpw.cz/eos)):

```
if (CSS.supports("vlastnost", "hodnota")) {
}
```