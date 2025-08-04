---
title: "CSS test"
headline: "CSS test"
description: "Otestujte své znalosti v CSS testu."
date: "2015-10-05"
last_modification: "2015-10-05"
status: 0
tags: []
---

Funkce [`calc()`](/calc) slouží k počítání hodnot v CSS – např. `width: calc(10em + 5px)`.

  Bude fungovat v media queries?

  ```
@media (max-width: **calc(10em + 5px)**) {
}
```

     Ano
     Ne

    Výpočty v pravidlu `@media` bohužel nefungují.

  Liší se u vlastnosti `z-index` hodnoty `0` a `auto`?

     Ano
     Ne

    Hodnota `0` vytvoří novou skupinu, kde se `z-index` počítá, což ovlivní `z-index` u potomků této skupiny.

        - Z-index: [Rozdí mezi `0` a `auto`](/z-index#nula-auto)

  Jak široký bude element s následujícím předpisem:

  ```
.element {
  width: 200px;
  min-width: 300px;
  max-width: 100px;
}
```

     100 pixelů
     200 pixelů
     300 pixelů

    Šířka bude 300 pixelů, protože `min-width` přepíše `height`.

  Jak široký bude element s následujícím předpisem:

  ```
.element {
  width: 200px;
  max-width: 100px;
}
```

     100 pixelů
     200 pixelů

    Šířka bude 100 pixelů, protože `max-width` má přednost před `width`.

  Třídy `.cervena` a `.modra` nastavují odpovídající barvu textu. Co když tyto třídy nepozorný kodér přiřadí do dvou atributů `class`?

  ```
&lt;div class="cervena" class="modra">
  Text
&lt;/div>
```

  Jakou barvu bude *Text* mít?

     červenou (první vyhraje)
     modrou
     výchozí (atribut `class` bude nedefinovaný)

    Text bude červený. Opakované použití HTML atributu se nijak neprojeví.

  Co se stane, když autor webu umístí `&lt;meta charset>` značku pro kódování na špatné místo:

  ```
&lt;!doctype html>
**&lt;meta charset="utf-8">**
&lt;html>
  &lt;head>
	&lt;title>Žluťoučký&lt;/title>
```

  Zobrazí se ve *žluťoučkém* titulku správně diakritika?

     ano
     ne, protože `&lt;meta>` patří do `&lt;head>`

    Titulek i veškerý další obsah se zobrazí v pořádku. Značky `&lt;html>` i `&lt;head>` jsou nepovinné a prohlížeč si je na správných místech sám domyslí a na špatných je automaticky ignoruje.

.question {
  border-top: 2px solid;
  padding-top: 1em;
}