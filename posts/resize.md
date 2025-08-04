---
title: "CSS resize"
headline: "CSS resize"
description: "Možnost roztahovat element pomocí CSS vlastnosti <code>resize</code>."
date: "2013-11-20"
last_modification: "2013-11-22"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

V **Opeře 12** funguje `resize` nejspíš jen u značek `&lt;textarea>` a ` &lt;input>`; v **Opeře 17** založené na Webkitu už `resize` funguje všude. Ve **Firefoxu** a **Chrome** také není problém. **IE** (včetně [IE 11](/ie11)) se zatím vůbec nechytá.

Co umí? Umožňuje bez JavaScriptu uživateli **měnit rozměry** libovolného elementu (třeba `&lt;div>`u).

    Tento element je možné ve **Firefoxu**, **Chromu** a **Webkit Opeře** roztahovat.

CSS změna rozměrů bude fungovat jen při **nastaveném** `overflow` na libovolnou hodnotu (`auto`, `scroll`), pochopitelně kromě výchozího `overflow: visible`.

Stanovit maximální a minimální **rozměry** roztahování jde vlastnostmi `min-width` a `max-width` / `min-height` a `max-height`. Samotné `height` nebo `width` platí zároveň jako **minimální možný rozměr**.

## Zápis

Zápis vlastnosti `resize` je dost jednoduchý.

```
element {
  resize: both;
}
```

Může nabývat **čtyřech hodnot**:

  - `both` — roztahování do **obou** stran,

  - `horizontal` — roztahování **do strany**,

  - `vertical` — roztahování **do výšky**,
  
  - `none` — **zruší** možnost změn rozměrů (má smysl třeba pro `&lt;textarea>`, kde bývá výchozí `resize: both`).

    Tento element je možné ve **Firefoxu**, **Chromu** a **Webkit Opeře** roztahovat jen **vodorovně**.

    ` ↔ `

    Tento element je možné ve **Firefoxu**, **Chromu** a **Webkit Opeře** roztahovat jen **svisle**.

    ` ↕ `

## Roztahování formulářových prvků

Doplnění od **Kolesovy plavkyně**:

  Textareu lze ve výchozím nastavení roztahovat (jako by měla resize: both).
  Nebo roztahování zakázat.
  Textarea s „disabled“ v Opeře 12 roztahovat nejde, ale „roztahovátko“ se ukazuje. V jiných prohlížečích roztahování funguje.

Textový `&lt;input>` jde v **Opeře** roztahovat jen vodorovně i při nastavení `resize: both`, v **Chrome** nejde roztáhnout vůbec, přestože se symbol pro roztažení ukazuje.

## Resize kursor (`cursor`)

Kursor do **resizovací podoby** je možné změnit následovně:

```
element {
  cursor: se-resize; /* both */
  cursor: e-resize; /* vodorovně */
  cursor: n-resize; /* svisle */
}
```