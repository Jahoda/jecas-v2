---
title: "Popis obrázku"
headline: "Popis obrázku"
description: "Jak na webové stránce přidat k obrázku popisek."
date: "2015-01-02"
last_modification: "2015-01-14"
status: 1
tags: ["HTML", "Rady a nápady", "Obrázky"]
---

Při vložení obrázku na stránku bývá často potřebné k němu uvést nějaký popis.

## Atribut `alt`

Jedno z míst, kam je možné umístit popis obrázku, je HTML atribut `alt`. Zásadní jeho nevýhoda ale je, že jeho obsah **není standardně viditelný**.

```
&lt;img src="obrazek.jpg" alt="**popisek obrázku**">
```

Smysl má tak hlavně pro roboty vyhledávačů.

### Nevidomí návštěvníci

Atribut `alt` může zlepšit zážitek ze stránky **nevidomým návštěvníkům**, kteří používají **hlasové čtečky**.

Pro takové návštěvníky by obrázek:

  - měl mít `alt` vyplněný, jinak na obrázek čtečka neupozorní,

  - neobsahovat totéž, co viditelný popisek – jedná se o duplicitní informaci

    - [Pes Ben](http://validator.webylon.info/docs/pes-ben.html) – co slyší nevidomý u různých způsobů popisu obrázků

Z praktického hlediska je ale tvorba správných popisků **často nemožná/nerentabilní** – například popisovat **stovky obrázků v galerii**.

## HTML kód pro popisek

Aby si běžný návštěvník mohl popis obrázku přečíst, je ho nutné vložit přímo do HTML.

### Značka `&lt;figure>`

HTML 5 přišlo se značkami `&lt;figure>` a `&lt;figcaption>`, které se mimo jiné hodí k obalení obrázku a jeho popisu. Obě značky jsou blokové a `&lt;figure>` má výchozí [`margin`](/margin).

```
&lt;figure>
    &lt;img src='obrazek.jpg' alt='obrázek'>
    &lt;figcaption>Popis obrázku&lt;/figcaption>
&lt;/figure>
```

[Ukázka](http://kod.djpw.cz/fmjb)

Jediná nevýhoda je absence podpory v **IE8** a starších, kterou je kvůli stylování nutné [doplnit skriptem](/vlastni-html-znacky#html5).

### Odstavec

Asi nejjednodušší možná varianta je prosté použití odstavce.

```
&lt;p>
    &lt;img src='obrazek.jpg' alt='obrázek'>
    &lt;br>
    Popis obrázku
&lt;/p>
```

Tento HTML kód ale nedává moc prostoru k **pohodlnému stylování**, takže v případě, že je obtížné formát výsledného kódu obrázku s popiskem **hromadně měnit**, bude lepší navrhnout HTML ve stylu `&lt;figure>` a `&lt;figcaption>`.

### Odkaz

Pro zobrazení miniatury obrázku s popisem, která bude odkazovat na velký obrázek, by mohl HTML kód vypadat následovně:

```
&lt;a href="velky-obrazek.jpg">
  &lt;img src="maly-obrazek.jpg" alt="obrazek">
  &lt;div class="popisek">Popis obrázku&lt;/div>
&lt;/a>
```

## Odkazy jinam

  - MDN: [`&lt;figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)

  - MDN: [`&lt;figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)