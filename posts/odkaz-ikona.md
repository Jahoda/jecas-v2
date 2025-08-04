---
title: "Ikonka vedle odkazu"
headline: "Ikona vedle odkazu"
description: "Jak přidat a zarovnat ikonku vedle odkazu, který má podtržení."
date: "2015-10-30"
last_modification: "2015-11-17"
status: 1
tags: ["CSS", "Hotová řešení", "Odkazy"]
---

Pro [označení odkazu](/oznaceni-odkazu) se někdy používají ikony:

  Označení **externího odkazu**.

  - Znázornění typu souboru (JPG, GIF, ZIP apod.)

  - Označení **jazyku** odkazu.

  Označení webu, kam odkaz vede.

## Přidání ikonky

Ikonku jde přidat několika způsoby:

    Jako **pozadí odkazu**. Prostor pro obrázek s ikonou se potom připraví `padding`em:

    ```
a.ikonka {
  background: url(ikona.png) no-repeat right center;
  padding-right: 20px;
}
```

    **Prázdný element** – uvnitř [`&lt;a>`](/odkaz) bude prázdný `&lt;span>`:

    ```
&lt;a href="…">
  Text odkazu
  &lt;span class="ikona">&lt;/span>
&lt;/a>
```

    Ikona potom bude mít nastaveny rozměry a obrázek na pozadí.

    ```
.ikona {
  background: url(ikona.png);
  width: 16px;
  height: 16px;
}

```

    Výhoda tohoto postupu spočívá v tom, že je ikonku jednoduché přesunout před/za odkaz. Také je jednoduší pro element o přesných rozměrech připravit [CSS sprite](/css-sprite).

    Nevýhodou je nutnost upravit HTML kód.

    V případě ikony v [SVG](/svg) není nutné používat rozměry v pixelech, ale ikona se může přizpůsobovat velikosti textu:

        ```
.ikona {
  background: url(ikona.svg);
  width: 1em;
  height: 1em;
  background-size: contain;
}

```

    **Pseudo-element** `:before`/`:after` funguje jako prázdný element a nevyžaduje změnu HTML kódu.

    **Obrázek** `&lt;img>` je nejjednodušší řešení přidání ikonky.

    Někteří lidé zastávají názor, že do `&lt;img>` ilustrační grafika nepatří, takže se jim takové řešení nelíbí.

## Podtržení

V případě, že odkaz s ikonkou **má být podtržen**, vzniká trochu nehezká situace, kdy je podtržení v mezeře mezi obrázkem/ikonou a textem.

    .ikonka {
      background: url("/favicon.ico") center left no-repeat;
      background-size: 100%;
      display: inline-block;
      width: 16px;
      height: 16px;
    }
  
  Odkaz na [ Je čas](http://jecas.cz).

Co s tím?

Pokud se prázdný element s ikonkou **vyčlení mimo obsah odkazu**, je po problému:

  Odkaz na  [Je čas](http://jecas.cz).

Toto řešení má ale problém jiný – **ikonka nebude klikací**. A to může vadit.

### Odsazení ikonky

Asi nejsnazší řešení je zrušit mezeru v kódu a odsazení vytvořit CSS vlastností [`margin`](/margin):

    .ikonka-odsazeni {
      margin-right: .3em;
    }
  
  Odkaz na [Je čas](http://jecas.cz).

Ikonka už ale potřebuje zvláštní třídy pro odsazení zleva a zprava.

### Pozadí odkazu

Při vložení ikonky jako pozadí bez dalšího elementu bude podtržení jen pod textem.

    .ikonka2 {
      background: url("/favicon.ico") center left no-repeat;
      background-size: contain;
      padding-left: 20px;  
    }
  
  Odkaz na [Je čas](http://jecas.cz).

### Pseudo-element

Ikonku jde vložit i pomocí `:before`/`:after`. Potom je opět nutné odsazení zajistit přes `margin`:

    .ikonka-pe:before {
      background: url("/favicon.ico") center left no-repeat;
      background-size: 100%;
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: .3em;
    }
  
  Odkaz na [Je čas](http://jecas.cz).

## Zarovnání ikonky

Pro svislé zarovnání ikonky na řádku existují dvě možnosti:

  Zarovnání CSS vlastností `vertical-align`.

  „Ruční“ posun ikonky pomocí [`position: relative`](/position#relative).

Výchozí zarovnání řádkového prvku je na spodek řádku (`vertical-align: baseline`).

Jak je vidět, pro ikonku nižší, než je výška řádku, je asi nejlepší možnost `vertical-align: middle`.

Kromě klíčových slov jde u `vertical-align` použít délkové jednotky – například `em`, které stanoví vzdálenost elementu od posice `baseline`.

Následující element tak bude lehce **nad** *baseline*:

```
element {
  vertical-align: 0.2em;
}
```

  .live a {
    text-decoration: underline;
    border-bottom: 0;
  }