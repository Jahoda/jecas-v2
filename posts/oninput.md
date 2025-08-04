---
title: "Událost oninput"
headline: "JS událost <code>oninput</code>"
description: "JavaScriptová událost <code>oninput</code> zachytí práci s formulářovými políčky."
date: "2014-05-01"
last_modification: "2014-05-12"
status: 1
tags: ["JavaScript", "JS události"]
---

Odchytávání stavu, že uživatel *něco dělá* s formulářovým elementem [`&lt;input>`](/input) není úplně jednoduché.

## Událost `onchange`

### `&lt;input type=text>`

Například událost `onchange` u značky `&lt;input>` reaguje, až když se ztratí `:focus`.

### `&lt;input type=range>`

U [`&lt;input type=range>`](/input#type-range) je potom pro některé prohlížeče změna už samotné přesouvání jezdce a jinde se `onchange` vyvolá až při uvolnění tlačítka myši.

### `&lt;select>`

    1
    2
    3

### `&lt;input type=radio>`

## Události `onkeyup`, `onkeydown`, `onkeypress`

Pokud jsme tedy v textovém `&lt;input>`u chtěli reagovat na každé **napsané písmeno**, bylo nutné odchytávat **stisk klávesy**.

### `onkeyup`

### `onkeydown`

### `onkeypress`

### `onpaste`

Problém pochopitelně nastane, když návštěvník bude chtít obsah vkládat ze **schránky** přes **kontextové menu** myší a podobně. Potom je řešení potřebnou událost spustit i při `onpaste` a pro případ, že se obsah přesune do pole myší ještě pro `onfocus`.

## Událost `oninput`

Událost `oninput`, funkční od **IE 9** by tuto nejednotnost měla řešit a spouštět se vždy, když se s políčkem nějak pracuje.

Kromě staré **Opery 12** všechny prohlížeče vyvolají `oninput` jen u textového pole, `&lt;input type=range>` a `&lt;textarea>`.

### Textové políčko

### Posuvník

### Textarea

### Zaškrtávátko

U následujících prvků už `oninput` v nových prohlížečích nic nedělá.

### Přepínač

V **Opeře 12** je zajímavé, že se `oninput` vyvolá na obou `&lt;input>`ech.

### Roletový výběr

    1
    2
    3

  .live .zmena {display: inline-block; background: #fff; padding: 0 .2em; margin: 0 .2em}

  function zmena(el) {
    var span = document.createElement("span");
    span.className = "zmena";
    span.innerHTML = "Změna";
    el.parentNode.appendChild(span);
  }