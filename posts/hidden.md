---
title: "Hidden atribut"
headline: "HTML atribut <code>hidden</code>"
description: "HTML atribut <code>hidden</code> jde použít pro skrytí obsahu."
date: "2015-02-16"
last_modification: "2015-02-16"
status: 1
tags: ["HTML", "HTML atributy"]
---

```
&lt;p hidden>
  Obsah odstavce nebude vidět.
&lt;/p>
```

Jedná se o tzv. **globální atribut** – tedy jde použít u všech HTML elementů. Element s atributem `hidden` nebude na stránce vidět – jako by měl nastaveno `[display](/display): none`.

## Podpora

Použití `hidden` zneviditelní obsah od **IE 11**. Pro starší **Internet Explorery** jde teoreticky použít [atributový selektor](/css-selektory#atributovy):

```
[hidden] {
    display: none;
}
```

## Využití

Atribut `hidden` neslouží ke [skrývání/odkrývání textu](/zobrazit-skryt), jak by se mohlo zdát. Neměl by se používat ani k *přepínání záložek*.

Je vhodný k označení obsahu, který ještě nebo už **není relevantní**. Využití má tedy hlavně u **JS aplikací**, kdy jsou na stránce různé bloky kódu, které se nevyužívají najednou.

### Příklad použití

Specifikace uvádí příklad s přihlášením, kdy je zobrazen přihlašovací formulář a skrytý obsah.

Obsah bude skrytý pomocí `hidden`.

```
&lt;form id="prihlaseni">
…
&lt;/form>
&lt;div id="obsah" **hidden**>
…
&lt;/div>
```

Po přihlášení se potom `hidden` prohodí (nastaví pro přihlašovací formulář a zruší pro obsah):

```
document.getElementById("prihlaseni").hidden = true;
document.getElementById("obsah").hidden = false;
```

[Živá ukázka](http://kod.djpw.cz/kmkb)

## Odkazy jinam

  - WHATWG: [The `hidden` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute)

  - MDN: [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)