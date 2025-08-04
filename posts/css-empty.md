---
title: "CSS selektor :empty"
headline: "CSS selektor <code>:empty</code>"
description: "CSS selektor <code>:empty</code> zaměří element, ve kterém vůbec nic není."
date: "2015-09-13"
last_modification: "2015-09-16"
status: 1
tags: ["CSS", "CSS selektory"]
---

Pro zachycení pomocí `:empty` **nesmí** být v elementu:

  - Jiný HTML element.

  - Libovolný text.

  - Mezera nebo odřádkování.

Tedy CSS pravidlo:

```
div:empty {
  display: none;
}
```

Skryje pouze:

```
&lt;div>&lt;/div>
```

Případně se jako *empty* bere i HTML komentář:

```
&lt;div>&lt;!-- komentář -->&lt;/div>
```

## Podpora

CSS selektor `:empty` je funkční od **Internet Exploreru 9**.

## Využití

Asi nejzajímavější je využití v případě, kdy není jisté, jestli bude ve značce nějaký obsah (třeba se vypisuje JavaScriptem), a takový element má nějaký padding, pozadí nebo rámeček.

    .test-empty {
      padding: 1em;
      background: #fff;
      border-left: 5px solid #ccc
    }
  
  Element s odsazením a rámečkem

Pokud by v něm žádný obsah nebyl, zobrazilo by se něco jako:

Skrytí značky pomocí `:empty` tento případ elegantně řeší bez nutnosti zobrazovat/skrývat element JavaScriptem změnou vlastnosti [`display`](/display).