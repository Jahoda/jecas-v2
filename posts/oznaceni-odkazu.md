---
title: "Označení externích odkazů"
headline: "Označení interních a externích odkazů"
description: "Odlišení interních a externích odkazů a odkazů na soubory čistě v CSS."
date: "2013-10-15"
last_modification: "2013-10-15"
status: 1
tags: ["CSS", "CSS selektory", "Hotová řešení", "Odkazy"]
---

/* reset */
  .text .live a[href^="/"] {background: none}

S vyhynutím **IE 6** je bezpečně možné používat přímo v CSS [selektory atributů](/css-selektory#atributovy).

To vytváří prostor pro relativně jednoduchý způsob zaměření odkazů vedoucí:

  - na **cizí web**,

  - na jinou **interní stránku**,

  - na **soubor určitého typu**.

Pro tyto účely je zajímavý selektor hledající **začátek** nebo **konec** atributu `href`.

  Adresa začíná…
  ```
E[atribut**^**="hodnota"]
```

  Adresa končí…
  ```
E[atribut**$**="hodnota"]
```

## Odkaz na cizí web

Pokud se pro **interní odkazy** neuvádí absolutní cesta a pro **externí** ano, bude v drtivé většině případů **externí odkaz** cokoliv začínající na `http://` nebo `https://`.

```
a[href^="http://"], a[href^="https://"] {color: red}
```

Pokud by se **absolutní cesty** používaly i pro interní odkazy, stačí pro danou doménu výše uvedené pravidlo *přebít*.

```
a[href^="http://jecas.cz"] {color: green}
```

.cizi a[href^="http://"], .cizi a[href^="https://"] {color: red}
.cizi a[href^="http://jecas.cz"] {color: green}

      [Saints Row](http://saintsrow.cz)
      [DJPW](http://djpw.cz) 
      [Je čas](http://jecas.cz)  

## Odkaz na vlastní web

**Relativní odkaz** na **vlastní web** bude začínat zpravidla na `/` nebo `.`

```
a[href^="/"], a[href^="."] {color: green}
```

.vlastni a[href^="/"], .vlastni a[href^="."] {color: green}    

      [Saints Row](http://saintsrow.cz)
      [DJPW](http://djpw.cz) 
        [Průhlednost](/opacity)
          [Opera](./opera)

## Odkaz na soubor

Při odkazování na soubor určitého typu lze nastavit specifický styl podle přípony, tedy konce odkazu. V tomto případě bude odkaz na PNG soubor červený.

```
a[href$=".png"] {color: red}
```

  .soubor a[href$=".png"] {color: red}
  
    Odkaz na [stránku](/blur) a [obrázek](/files/blur/ie9.png).

## Ilustrační ikona

Odkaz je ještě možné vyzdobit ikonou. Od **Internet Exploreru 7** ji lze docela úspěšně brát z `favicon.ico`.

Nejprve nadefinovat pro **externí odkazy** umístění obrázku:

```
.ikona a[href^="http://"] {
  background: left center no-repeat; padding-left: 20px; background-size: 16px
}
```

A pro jednotlivé stránky nastavit `favicon.ico` jako obrázek na pozadí.

```
a[href^="**http://jecas.cz**"] {background-image: url(**http://jecas.cz/favicon.ico**)}
```

    .ikona a[href^="http://"] {background: left center no-repeat; padding-left: 20px; background-size: 16px}
    .ikona a[href^="http://saintsrow.cz"] {background-image: url(http://saintsrow.cz/favicon.ico)}
    .ikona a[href^="http://diskuse.jakpsatweb.cz"] {background-image: url(http://diskuse.jakpsatweb.cz/favicon.ico)}
    .ikona a[href^="http://seznam.cz"] {background-image: url(http://seznam.cz/favicon.ico)}
    .ikona a[href^="http://jecas.cz"] {background-image: url(http://jecas.cz/favicon.ico)}    

          [Saints Row](http://saintsrow.cz)
      [DJPW](http://diskuse.jakpsatweb.cz) 
        [Je čas](http://jecas.cz)
          [Seznam.cz](http://seznam.cz)

V případě, že se z dané stránky na **jiné weby** s faviconou odkazuje často, je vhodné všechny ikony **spojit do jednoho [CSS spritu](/css-sprite)**.

## Textový popisek

Kromě ikony můžeme i něco připsat vlastností `[content](/content-attr)`.

```
a[href^="http://jecas.cz"]:before {content: "jecas.cz"; background: #0D6AB7; color: #fff}
```

  .odkaz a[href^="http://jecas.cz"]:before {content: "jecas.cz"; background: #0D6AB7; color: #fff}
  
    [Automatické obnovení stránky](http://jecas.cz/livereload)