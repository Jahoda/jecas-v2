---
title: "Word-spacing"
headline: "Word-spacing"
description: "CSS vlastnost <code>word-spacing</code> upravuje velikost mezer mezi slovy."
date: "2015-08-27"
last_modification: "2015-09-30"
status: 1
tags: ["CSS", "CSS vlastnosti", "Písma"]
---

.velke-mezery {
      word-spacing: 1em;  
    }
  
  Tento text má velké mezery mezi slovy.

Pro upravení rozestupů mezi **písmeny** slouží vlastnost [`letter-spacing`](/letter-spacing).

## Zápis

```
element {
  word-spacing: 1em;    
}
```

Hodnotu jde zadat několika způsoby:

    **Výchozí mezera**:

    ```
word-spacing: **normal**
```

    Výchozí hodnota odpovídá nule.

    **Délkové jednotky** (kromě procent):

    ```
word-spacing: **1em**
```

Kromě zvětšení jde mezery i **zmenšit nebo zrušit**. Zmenšení se provede zadáním dostatečně velké **záporné hodnoty**.

    .male-mezery {
      word-spacing: -0.1em;
    }
    .bez-mezer {
      word-spacing: -.25em;
    }    
  
  Text s normálními mezerami.

  Text s menšími mezerami mezi slovy.

  Text bez mezer mezi slovy.

Prohlížeče používající vykreslovací jádra **Gecko** a **Blink** (např. **Firefox** a **Chrome**) při záporné hodnotě převyšující šířku mezery začnou překrývat slova přes sebe. Stará **Opera 12** a **IE**/[**Edge**](/microsoft-edge) tímto problémem netrpí.

    .zaporne-mezery {
      word-spacing: -10em;
      text-align: center;
    }    
  
  Slova se překrývají

Srovnání zobrazení v různých prohlížečích:

## Podpora

Široce podporovaná vlastnost ve všech běžně používaných prohlížečích.

Chování se liší při používání **záporných hodnot**.

## Využití

Hodně málo používaná vlastnost.

    - [Nejpoužívanější CSS vlastnosti](/cetnost-css) – přehled nejpoužívanějších CSS vlastností

Měnit výchozí mezery mezi slovy většinou není potřeba.

### Odsazení

Použít `word-spacing` jde třeba pro jednoduché **vodorovné odsazení několika položek**. Například odkazů v [menu](/menu):

.menu-odsazeni {
    word-spacing: 2em;
    background: #fff;
    display: inline-block;
    padding: 1em 2em;
}

.menu-odsazeni a {
    word-spacing: 0;
}

    [Odkaz](#)
    [Víceslovný odkaz](#)
    [Odkaz](#)

Pro obalový element se nastaví `word-spacing` o rozměru odsazení a pro jednotlivé položky se zase vrátí na nulu (výchozí hodnotu).

```
.obal-menu {word-spacing: 1em}
.obal-menu a {word-spacing: 0}
```

[Samostatná ukázka](http://kod.djpw.cz/nnqb)

### Zarovnání do bloku

Při použití blokového zarovnání písma ([`text-align: justify`](/text-align#justify)) se k přesnému roztažení na šířku využívá **automatické zvětšení mezer mezi slovy**.

V takovém případě jsou odstupy mezi slovy typicky stejné nebo větší než hodnota vlastnosti `word-spacing`.

    .mezery-justify {
      text-align: justify;
      width: 14em;
      border: 1px solid;
      padding: 1em;
    }
  Mezery mezi slovy v textu zarovnaném do bloku se zvětší, aby se obsah přesně roztáhl ke krajům bloku.

Změnou hodnoty `word-spacing` se v tomto případě ničeho použitelnějšího nedocílí. Ve staré **Opeře 12** dokáže text při větším záporném `word-spacing`u, než odpovídá šířce mezery, opustit svůj obal.

## Odkazy jinam

  - Jak psát web: [Word-spacing](http://www.jakpsatweb.cz/css/word-spacing.html)

  - MDN: [`word-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)