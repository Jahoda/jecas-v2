---
title: "CSS gradient"
headline: "Gradienty v CSS"
description: "Jak vytvořit barevný přechod (gradient) přímo v CSS bez použití obrázku."
date: "2014-03-04"
last_modification: "2014-03-25"
status: 1
tags: ["CSS", "Obrázky", "CSS funkce"]
---

Barevné přechody je v CSS možné vytvářet přes:

  - vlastnost `filter` pro **IE 9**

  - `background-image` pro **IE 10** a novější

V prohlížečích starších než **Opera 12.1**, **Firefox 16**, **Chrome 26** se používají ještě [CSS prefixy](/css-prefixy).

## Příklad

Nejjednodušší použití CSS gradientu může vypadat v případě lineárního přechodu takto:

```
.prechod {
  background-image: **linear-gradient**(#0D6AB7, #DA3F94);
}
```

    .prechod {
      background-image: linear-gradient(
        #0D6AB7, 
        #DA3F94
      );
    }
  
  &nbsp;

## Lineární gradient

Funkci `linear-gradient` se předávají různé parametry ovlivňující výchozí podobu celého přechodu. Symbolický zápis veškerých možností vypadá následovně.

```
.prechod {
  background-image: linear-gradient(
    **směr**, 
    **první barva** *umístění*,
    **druhá barva** *umístění*
  )
}
```

### Směr

První parametr určuje, jakým směrem se má přechod ubírat. Výchozí nastavení je shora dolů.

  - `to top` – zdola nahoru,
  
  - `to bottom` – shora dolů,
  
  - `to right` – zleva doprava,
  
  - `to left` – zprava doleva

Kromě toho existují i šikmé směry, například `to bottom right`:

    .prechod-sikmy {
      background-image: linear-gradient(to bottom right, #0D6AB7, #DA3F94);
    }
  
  &nbsp;
&nbsp;

### Umístění barev

Délkovými jednotkami (pixely, procenta apod.) je možné nastavit, kde se daná barva má *aplikovat*.

Výchozí chování je, že první barva začíná (tj. `0%`) a druhá končí (tj. `100%`).

Takto se přechod změní při nastavení procent na `60` a `90`.

    .prechod-umisteni {
      background-image: linear-gradient(
        to bottom right, 
        #0D6AB7 60%, 
        #DA3F94 90%
      );
    }
  
  &nbsp;
&nbsp;

### Více barev

Přechod může mít **libovolný počet** barev.

    .prechod-vice-barev {
      background-image: linear-gradient(
        to bottom right, 
        #1081DD, 
        #8ECCF0 40%, 
        #0D6AB7 60%, 
        #DA3F94 90%
      );
    }
  
  &nbsp;
&nbsp;

## Radiální gradient

Další typ *gradientu* je kruhový (radiální). Zápis je obdobný jako u lineárního.

```
.prechod-radialni {
  background-image: **radial-gradient**(#0D6AB7, #DA3F94);
}
```

    .prechod-radialni {
      background-image: radial-gradient(
        #0D6AB7, 
        #DA3F94
      );
    }
  
  &nbsp;
&nbsp;
&nbsp;

### Tvar

První parametr udává *tvar* kruhového přechodu.

  - `ellipse` – výchozí podoba, přechod se roztáhne přes celý prostor elementu.

  - `circle` – přechod bude mít podobu kruhu.

    .prechod-circle {
      background-image: radial-gradient(
        circle,
        #0D6AB7, 
        #DA3F94
      );
    }
  
  &nbsp;
&nbsp;
&nbsp;

V případě, že chceme mít vidět celý kruh (když element s přechodem na pozadí není čtvercový), stačí přidat za tvar (`circle`) `closest-side`:

    .prechod-closest-side {
      background-image: radial-gradient(
        circle closest-side,
        #0D6AB7, 
        #DA3F94
      );
    }
  
  &nbsp;
&nbsp;
&nbsp;

### Umístění

**Umístění barev** funguje stejně jako u *lineárního přechodu*. Je ale možné změnit střed, odkud přechod *začíná*, zapsáním `at top|bottom|left|right` a *šikmých* kombinací.

    .prechod-at {
        width: 100px;
        height: 100px;
      background-image: radial-gradient(
        circle at top right,
        #0D6AB7, 
        #DA3F94
      );
    }

## Opakující se gradient

Poslední typ gradientu je **opakování přechodu do nekonečna**.

```
.prechod-opakovani {
  background-image: **repeating-linear-gradient**(
    #0D6AB7, #DA3F94 50%
  );
}
```

    .prechod-repeating {
      height: 100px;
      background-image: repeating-linear-gradient(
        #0D6AB7,
        #DA3F94 50%
      );
    }

Opakovat se může přechod lineární i radiální:

  - `repeating-**linear**-gradient`,

  - `repeating-**radial**-gradient`

### Proužky

Zajímavější využití **opakujících se přechodů** je vytvoření proužků.

    .prechod-prouzky {
      height: 100px;
      background-image: repeating-linear-gradient(
        #0D6AB7,
        #0D6AB7 10%,
        #DA3F94 10%,
        #DA3F94 20%
      );
    }

### Otočení

Jde i přechod otočit (např. `-45deg`) a vytvořit tak třeba **šikmé pruhy**:

    .prechod-otoceny {
      height: 100px;
      background-image: repeating-linear-gradient(
        -45deg,
        #0D6AB7,
        #0D6AB7 5px,
        #DA3F94 5px,
        #DA3F94 10px
      );
    }

## Přechody vlastností filter

Pro **IE 9** a starší je možné některé přechody vytvořit vlastností `filter`. Vytvořit se tak dá ale nejspíš **jen přechod lineární**:

```
.prechod {
  filter: progid:DXImageTransform.Microsoft.Gradient(
    startColorStr="#0D6AB7", 
    endColorStr="#DA3F94"
  );
}
```

Více o [gradientech přes `filter`](http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx).

## Fallback

*Fallback* pro plnohodnotné CSS přechody tedy může být:

  - CSS vlastnost `filter` pro **IE 9** a starší (třeba s méně dokonalým přechodem).

  - Prostá barva bez přechodu. Když se gradient nastaví jako `background-image`, nastavená vlastnost `background-color` *přežije*.

  - Obyčejný obrázek.

V případě každého webu je pochopitlně nutno zvážit, co se [vyplatí realisovat](/prohlizece-optimalisace#kalkulace).

## Generátor CSS gradientů

Pro pohodlnou tvorbu gradientů existují tzv. generátory gradientů.

  ColorSpace: Generate a 3-Color-Gradient

  - [Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor/)

  - [CSS Gradient Background Maker](http://ie.microsoft.com/testdrive/graphics/cssgradientbackgroundmaker/)

Nutno přiznat, že výsledný kód plný prefixů není **úplně elegantní** ([ukázka](http://kod.djpw.cz/fncb)).