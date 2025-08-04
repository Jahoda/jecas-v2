---
title: "CSS pravidlo @document"
headline: "CSS pravidlo <code>@document</code>"
description: "CSS pravidlo <code>@document</code> umí omezit platnost CSS na určité URL."
date: "2014-10-09"
last_modification: "2014-10-09"
status: 1
tags: ["CSS", "CSS pravidla"]
---

## Podpora

Funguje zatím pouze ve **Firefoxu** (od verse 6) s [prefixem](/css-prefixy).

## Zápis

Následující styl bude použit pouze na doméně `jecas.cz`.

```
**@document** domain(jecas.cz) {
    h1 {color: red}
}
```

[Živá ukázka](http://kod.djpw.cz/gfgb)

Kromě omezení na `domain` existují i omezení na **přesnou URL**, **začátek URL** nebo **regulární výraz**.

  `url`
  
    Styly se aplikují jen a pouze na stránce `http://example.com/presna`.

    ```
@document **url**(http://example.com/presna) {
  /* pravidla */
}
```

  `url-prefix`
  
    Styly se aplikují na všech adresách, které začínají na řetězec v `url-prefix`. Tedy například adresa `http://example.com/presne/cokoliv` bude vyhovovat.

    ```
@document url**-prefix**(http://example.com/presne) {
  /* pravidla */
}
```

  `domain`
  
    Styly se aplikují na všech stránkách určené **domény** i **subdomény**.

    ```
@document **domain**(example.com) {
  /* pravidla */
}
```

  `regexp`
  
    Poslední možnost je zadat **regulární výraz**, kterému musí adresa vyhovovat.

    Regulární výraz musíme obalit uvozovkami. Následující pravidlo se tak aplikuje jen na URL, které obsahují řetězec „kod“.

    ```
@document **regexp**(".*kod.*") {
  /* pravidla */
}
```

### Kombinování

V případě, že daný blok CSS má *fungovat* na různých adresách, jde výše uvedené funkce kombinovat (oddělit je čárkou).

```
@document 
  url(http://example.com/presna),
  url-prefix(http://example.com/presne),
  domain(example.com),
  regexp(".*kod.*")
{
  /* pravidla */
}
```

Tato pravidla se proto použijí ve všech případech, kdy vyhoví **alespoň jedno pravidlo**. Používat nějaké logické operátory typu `and` nebo `or` možné není.

## Využití

Hlavní využití se nabízí pro **uživatelské styly**, které mají platit jen na určitých adresách. Ale i v běžném použití by se `@document` mohl hodit, šlo by tak snížit risiko nechtěného přibíjení si pravidel pro různé stránky.

## Odkazy jinam

  - W3C: [Document queries: the ‘@document’ rule](http://www.w3.org/TR/2011/WD-css3-conditional-20110901/#at-document)