---
title: "Obrázkový text"
headline: "Text v obrázku"
description: "Jak vyřešit situaci, kdy má být textový obsah v obrázku z hlediska přístupnosti, použitelnosti a SEO."
date: "2015-04-26"
last_modification: "2015-05-07"
status: 1
tags: ["CSS", "Hotová řešení", "Obrázky"]
---

Pro **zajímavější grafické ztvárnění textu** se může nabízet sáhnout po obrázku, na kterém bude text vylepšený v grafickém editoru.

První rada zní: **Psaní textu do obrázku se vyhnout.**

    Text z obrázku půjde **složitě kopírovat**. Zároveň [kopírování](/kopirovani) nezabrání, ani kdyby to bylo cílem.

    Bude pravděpodobně složitější v budoucnu **provádět úpravy obsahu**, který je v obrázku.

    Obrázek s textem je komplikovaný s ohledem na [responsivní layout webu](/responsive). Obrázek bude mít pevnou šířku a na menších obrazovkách půjde jen **zmenšit**, což může vést k **horší čitelnosti**. Obyčejný text se dokáže inteligentně přeskládat do více řádků.

    Obrázkový text bude většinou **datově náročnější**.

## Náhrada textu v obrázku

Vývoj CSS vede tím směrem, že se stále více a více věcí, co šlo dřív řešit jen obrázky, dá nahradit **CSS vlastnostmi**. Pokud jde o zajímavější písmo nápisu, jde zase přímo na webu použít **zvláštní font**.

    - [Česká písma z Google Fonts](/ceska-pisma) – 250 zajímavých písem podporujících českou diakritiku

### Vzhled textu v CSS

Pro úpravu vzhledu textu jde použít následující.

  - Barva – `color`

  - Velikost – [`font-size`](/font#size)

  - Tučnost – [`font-weight`](/font#weight)

  - Kursiva – [`font-style`](/font#style)
  
  - Malá velká písmena – [`font-variant: small-caps`](/font#variant)
  
  - Velká písmena – `text-transform: uppercase`
  
    - Stín písma – [`text-shadow`](/text-shadow)

  - Obrázkové pozadí místo barvy písmen – [`background-clip`](/background-clip#text)
  
  - Rámeček okolo písmen – [`text-stroke`](/text-stroke)
  
  - Odraz písma (celého boxu) – [`box-reflect`](/box-reflect)

  - Přeškrtnutí, podtržení nebo nadtržení – [`text-decoration`](/text-decoration)
  
  - Proložení písmen – `letter-spacing: 2px`
  
  - Větší mezery mezi slovy – `word-spacing: 1em`
  
  - Jde vytvořit [pozadí pouze za písmeny](/pozadi-textu).
    
  - Textem jde [rotovat](/rotace), [otáčet](/flip) nebo na něj aplikovat [CSS filtry](/filter).

Docílit nápaditějšího vzhledu textu tak jde i pouze s využitím CSS, při zachování všech výhod prostého textu.

Pro zajímavější stylování je možné obalit jednotlivá písmena textu JavaScriptem a stylovat je samostatně:

    - [Lettering.JS](http://letteringjs.com/) – jQuery plugin pro obalení písmen do samostatných elementů

## Přístupný text v obrázku

Pokud není zbytí a na stránce musí být text v obrázku, nejjednodušší je použít značku `&lt;img>` a textový obsah umístit do atributu `alt`.

```
&lt;img src="text.png" **alt**="Text z obrázku">
```

S ohledem na [SEO](/seo) se někteří tvůrci uchylují k řešení, kdy v HTML kódu je text z obrázku nějakým způsobem **skrytý** a vidět je jen obrázkový nápis vytvořen pomocí CSS pozadí (`background-image`).

    .obrazkovy {
      background: url('/files/obrazek-text/text-obrazek.png'); 
      width: 470px; 
      height: 246px;      
    }
    .obrazkovy span {
      display: none;
    }

    Text zkrášlený přímo v grafickém editoru

Skrytí jde provést pomocí `display: none`. Někdy jsou ale k vidění i odlišné konstrukce, které **schování textu** provádějí jiným způsobem ve snaze ošálit robota, že skrytý text není skrytý.

Pokud v kódu je něco jako:

```
text-indent: -9999px;
```

Je to přesně ten případ.

### Optimální řešení

Pokud je nutné text řešit obrázek, je ideální obrázek naposicovat před text. Bude to mít výhodu v tom, že i **před stažením obrázku** bude návštěvník text vidět (byť v méně hezké podobě).

Zobrazit/skrýt překryvný obrázek

    .ir, .ir div {       
      width: 470px; 
      height: 246px;      
      position: relative;
    }
    .ir div {
      background: url('/files/obrazek-text/text-obrazek.png');
      position: absolute;
      top: 0;
      left: 0;
    }
    /* Jen pro lepší styl písma */
    .ir {
      background: #fff;
      font-size: 45px;
      line-height: 1.2;
      padding: 1em;
      box-sizing: border-box;
      font-family: sans-serif;
    }

    Text zkrášlený přímo v grafickém editoru

  .ir div.skryt-pozadi {
    background: none;
  }