---
title: "CSS content"
headline: "CSS vlastnost <code>content</code>"
description: "CSS vlastnost <code>content</code> slouží k zapisování obsahu do stránky z kaskádových stylů."
date: "2014-04-11"
last_modification: "2014-04-11"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Zápis

```
element:before {
  content: "Textový obsah před";
}
element:after {
  content: "Textový obsah po";
}
```

## Podpora

Vlastnost `content` (česky obsah) umožňuje nastavit elementu **textový obsah**. Funguje od **IE 8** a dá se používat **jen** na [pseudo-elementech `:before` a `:after`](/css-selektory#before-after). (V prohlížeči **Opera 12** a starších, jde `content`em i přepisovat původní obsah samotného elementu.)

    .test-content:before {
          content: "Ahoj ";
    }
  
  světe! („Ahoj“ je vypsané pomocí CSS.)

## Využití

K čemu ale `content` **využít**? Vypisovat text přes CSS místo přímého umístění do HTML není nic převratného.

    První případ je, když se má někde něco vypisovat a není možné / nechce se nám upravovat HTML.

    Třeba si můžeme nají na stránce všechny elementy `&lt;small>`, dát jejich obsah do závorky a připsat k tomu „Poznámka:“. 

        .poznamky small:before {
          content: "(Poznámka: ";
        }
        .poznamky small:after {
          content: ")";
        }

        Kobercovka

        Fytopuf.

    Vypsat na stránce nějaký symbol/ikonu.

        .ikony .fajfka:before {
          content: "✔ ";
        }
        .ikony .kriz:before {
          content: "✖ ";
        }

        Kobercovka

        Strouhanka

    Dobrý zdroj obdobných symbolů je stránka [CopyPasteCharacter.com](http://copypastecharacter.com/).

    Vložit do elementu **obrázek**. Nemusí se používat `background` a nastavovat rozměry nebo opakování. Funguje to skoro jako vložení obrázku značkou `&lt;img>` (jen obrázek neroztáhne výšku řádku, ale naopak se přizpůsobí).

    ```
element:before {
  content: url("adresa-obrazku.png");
}
```

    Vypisovat do stránky obsah atributů pomocí [`attr`](/content-attr).

    *Vyvolat* uvozovky nastavené vlastností [`quotes`](/quotes).

    Vytvářet v CSS automatické číslování přes [`counter`](/counter).

### Vodorovný seznam

Tímto posutpme snadno vytvoříme vodorovný seznam s odrážkami.

.vodorovny-seznam ul {text-align: center; padding-left: 0;}
.vodorovny-seznam li {display: inline; padding-left: 1em; color: #0D6AB7}
.vodorovny-seznam li:before {content: "● "; color: #DA3F94; padding-right: 1em;}
.vodorovny-seznam li:first-child:before {display: none;}

    - Kobercovka
- Strouhanka
- Šroubovák
Stativ

Pomocí selektoru `:first-child` je navíc možné skrýt odrážku **před prvním elementem**.

## Animace vlastnosti `content`

  - CSS Tricks: [Animating the `content` Property](https://css-tricks.com/animating-the-content-property/)