---
title: "Font-feature-settings"
headline: "Font-feature-settings"
description: "S CSS vlastností <code>font-feature-settings</code> lze dosáhnout zajímavější typografie u OpenType písem."
date: "2014-05-07"
last_modification: "2014-12-02"
status: 1
tags: ["CSS", "CSS vlastnosti", "Písma"]
---

Pro vytvoření lépe čitelného textu a lepší přenositelnosti písem vznikl tzv. formát **OpenType**. Tento formát umožňuje, aby v souboru s písmy bylo mnohem více symbolů. To má tu výhodu, že *OpenType* písmo může kromě **standardních znaků** a **diakritiky** nabízet i více variant téhož znaku, třeba **závislých na kontextu** a podobně.

Jde tak vytvořit i **spojité písmo**, kde se přirozeně napojují jednotlivé znaky. Daní za to je potom případná **větší datová náročnost**.

## Podpora

Funkční od **IE 10**, **Chrome 16**, **Firefoxu 4**.

## Zápis

Nejprve je potřeba pravidlem [`@font-face`](/font-face) **připojit** *OpenType* písmo:

```
@font-face {  
  font-family: 'Název';  
  src: url('pismo.*otf*') format('**opentype**');  
} 
```

Následně ho nastavit nějakému prvku a konečně použít `font-feature-settings` (momentálně vyžaduje [prefixy](/css-prefixy)):

```
element {
  font-feature-settings: 
    "vlastnost" hodnota, 
    "dalsi-vlastnost" hodnota
}
```

Hodnota bývá většinou `0` nebo `1` ve smyslu zapnuto/vypnuto, jednotlivé hodnoty je možné **kombinovat**. Funkčnost stojí a padá na podpoře dané vlastnosti přímo v **použitém fontu**.

## Vylepšení

Z pohledu webových stránek jsou zajímavé vlastnosti jako je:

    **Kontextové alternativy** – písmena mohou mít různé varianty, které se použijí dle kontextu. Je tak možné vytvořit **spojité písmo**.

    ```
font-feature-settings: "calt" 1
```

    *Calt* je zkratka pro ***C**ontextual **Alt**ernates*.

    Na následujícím pohyblivém obrázku je například písmeno „i“ ve 3 variantách (nespojené, spojené a na začátku slova).

    **Vyrovnání** ([Kerning](http://cs.wikipedia.org/wiki/Kerning)) – přizpůsobení vzdáleností mezi určitými písmeny, aby více lahodily oku.

    ```
font-feature-settings: "kern" 1
```

    Na obrázku *kerning* zmenší zbytečně velkou mezeru mezi „A“ a „T“.

    **Svazování** ([Ligatura](http://cs.wikipedia.org/wiki/Ligatura_(typografie))) – optické spojení více písmen v jeden znak. Příkladem budiž například „fi“ nebo „fl“.

    ```
font-feature-settings: "liga" 1
```

    **Zlomky** – hezčí podoba zápisu zlomků, kdy je čitatel i jmenovatel vertikálně odlišen. Simulovat to někdy lze pomocí [speciálních znaků](/ceska-klavesnice#mocniny-zlomky): 3/4 vs. ¾.

    ```
font-feature-settings: "frac" 1
```

    **Různá velikost čísel** – někdy může lépe vypadat, když mají číslice různou velikost.

    ```
font-feature-settings: "onum" 1
```

    Zkratka `onum` znamená ***O**ldstyle **num**ber* (starý styl čísel). Tento styl používá například písmo **Georgia** ([ukázka](http://kod.djpw.cz/phib)).

  [Nástroj pro testování](http://clagnut.com/sandbox/css3/) [Ukázka od Microsoftu](http://ie.microsoft.com/testdrive/Graphics/opentype/Default.html) 

    - [Seznam všech hodnot](http://www.microsoft.com/typography/otspec/featurelist.htm)

## OpenType písma

Aby speciální vlastnosti mohly fungovat, musí je podporovat dané písmo. Moc jich zatím není a **zdarma** ještě méně.

## Specifikace

V [CSS specifikaci](http://www.w3.org/TR/css3-fonts/#font-rend-props) jsou potom místo zápisu prostřednictvím `font-feature-settings` uvedeny přímo `font-*` vlastnosti.

  - `font-variant-ligatures`

  - `font-kerning`

  - `font-variant-position`

  - `font-variant-caps`

  - `font-variant-numeric`

  - `font-variant-alternates`

## Odkazy jiam

  - Typo.cz: [Co to je OpenType](http://www.typo.cz/databaze/pismolijny-a-distributori/tvorba-a-editace-fontu/opentype/) (česky)

   `font-variant-ligatures`
    
      - Elliot Jay Stocks: [The fine flourish of the ligature](http://elliotjaystocks.com/blog/the-fine-flourish-of-the-ligature/)

      - Meyerweb.com: [CSS3 test: font-variant-ligatures](http://meyerweb.com/eric/css/tests/css3/show.php?p=font-variant-ligatures)

      - W3C: [CSS Fonts Module Level 3](http://dev.w3.org/csswg/css-fonts-3/#font-variant-ligatures-prop)

  - [Using OpenType font features with CSS 3: Part 1](http://blog.fontdeck.com/post/15777165734/opentype-1)

  - Webplatform.org: [font-feature-settings](https://docs.webplatform.org/wiki/css/properties/font-feature-settings)