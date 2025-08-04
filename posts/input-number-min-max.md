---
title: "Různá šířka číselného pole s min/max"
headline: "Různá šířka <code>&lt;input type=number></code> s <code>min</code>/<code>max</code>"
description: "Proč má <code>&lt;input type=number></code> různou výchozí šířku v závislosti na <code>min</code>/<code>max</code> atributech."
date: "2025-03-25"
last_modification: "2025-03-25"
status: 1
tags: ["CSS", "Stylování elementů", "Formuláře"]
---

I přes značné posuny je stylování HTML formulářů stále jednou z největších výzev.

Do hry zde vstupují **výchozí styly** prohlížeče a operačního systému.

Jedna taková specialita je různá šířka číselného pole.

Prohlížeč se snaží podle omezeného rozmezí čísel chytře určovat šířku `&lt;input>`u.

Může to způsobovat dost divné stavy, když se právě atributy `min` a `max` používají pro validaci na straně klienta.

Zvlášť v případě, kdy jsou dynamické, může docházet k nepěknému poskakování.

Jak je vidět na ukázce, v závislosti na minimální/maximální hodnotě prohlížeč přizpůsobuje šířku políčka.

   (min 0, max 100)

   (min 0, max 10000)

   (min 0, max 1.7976931348623157e308) 

   (max 10000)

   (text)

[Samostatná živá ukázka](https://kod.djpw.cz/onnd)

Dělá to pouze při vyplnění obou atributů.

## Řešení

Bohužel 100% universální a uspokojivé řešení neznám.

V některých případech to **nemusí vadit**.

Ono obecně nastavovat šířku políčka podle očekávaného obsahu je rozumné pro lepší pochopení formuláře ze strany uživatele.

Vadí-li to, asi nejsnazší je nastavit políčku pevnou šířku (`width`).

Výchozí šířka `&lt;input>`u je ale proměnlivá napříč prohlížeči. Pro stejnou šířku s textovými políčky (`&lt;input type=text>`) je tak potřeba explicitně nastavit šířku i pro ně.

V macOS pozoruji následující výchozí rozměry textových políček:

  - **Safari** – 148 × 19 px

  - **Chrome**, **Edge**, **Brave** – 153 × 21 px

  - **Firefox** – 189 × 21 px

### Dostupná šířka

Cesta k sjednocení může být i nastavení šířky na dostupnou a následné omezení, aby políčko nebylo zbytečně široké.

```
input {
    width: -webkit-fill-available;
    max-width: 8ch;
}
```

Jednotka `ch` zde representuje šířku číslice `0` v aktuálním fontu políčka. Jde tak přibližně docílit šířky dle očekávaného počtu číslic.

Atribut `size` totiž u číselného políčka nic nedělá.

### Šířka podle obsahu

Docela zajímavá je vlastnost `field-sizing: content`, kdy se šířka obsahu přizpůsobuje šířce obsahu.

Může to jít hezky zkombinovat s minimální šířkou. Ale funguje jen v **Chrome**.

```
input {
    field-sizing: content;
    min-width: 8ch;
}
```

## Odkazy

    StackOverflow:
    [input number max attribute resizes field](https://stackoverflow.com/questions/33283901/input-number-max-attribute-resizes-field)

    MDN: [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing)