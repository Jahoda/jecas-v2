---
title: "Text-decoration"
headline: "Text-decoration"
description: "Vlastnost <code>text-decoration</code> slouží k „vyzdobení“ běžného textu."
date: "2014-11-16"
last_modification: "2018-06-25"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Z historických má `text-decoration` dva režimy.

    Ve své původní podobě umožňuje podtržení, nadtržení, přeškrtnutí a v **Opeře 12** blikání. Kromě blikání funguje napříč prohlížeči.

    V novější podobě funguje v **Chrome 57**, **Opeře 44** a s [prefixy](/css-prefixy) ve **Firefoxu 6+** a **Safari 7.1+** jako *zkratka*. V těchto prohlížečích `text-decoration` zahrnuje další vlastnosti:

      - `text-decoration-color`

      - `text-decoration-line`

      - `text-decoration-style`

## Původní `text-decoration`

Symbolický zápis původní podoby vypadá následovně:

```
element {
  text-decoration: **styl** (nebo víc stylů);
}
```

  `text-decoration: none`
  
    Zruší *dekoraci* textu. Často se používá u odkazů, když jsou zvýrazněny jinak než podtržením (třeba jako [tlačítko](/odkaz-tlacitko)).

  `text-decoration: underline`
  
    Podtrhne text. Obecně není moc dobré texty kromě odkazů podtrhávat, protože uživatelé bývají zvyklí, že právě **podtržení značí odkaz**. Navíc podtržení textu snižuje **čitelnost**.

    Někdy se podtrhávání odkazů řeší tak, že se `text-decoration` vypne a podtržení zajistí spodní rámeček (`border-bottom`) nebo obrázek (`background`). Umožňuje si to lépe pohrát se vzdáleností podtržení od textu nebo vytvořit jinou **barvu** podtržení než textu — s `text-decoration: underline` to jde jen pomocí vnořeného elementu ([ukázka](http://kod.djpw.cz/iohb)).

    Kromě odkazů jsou ve výchozím stylu podtrženy i značky `&lt;u>` a `&lt;ins>`.

    Občas se používá, když něco, co není odkaz, má **jako odkaz vypadat** a spouštět nějakou JavaScriptovou akci.

  `text-decoration: overline`
  
    „Čára“ nad slovem. Těžko najít využití. Na nějakém webu jsem to viděl použité pro označení odkazů. Raději bych zůstal u zažitého **podtržení**.

    Dle komentáře od uživatele **odpad** se (`overline`) dost hodí u značení signálů (v elektrotechnice) – jako negovaný vstup/výstup.

  `text-decoration: line-through`
  
    Přeškrtnutý text.

    Výchozí vzhled přeškrtnutí mají i značky  [`&lt;s>`](/s) , `&lt;del>` a `&lt;strike>`.

    Využití se moc nenabízí. Když má být něco přeškrtnuté, bývá vhodné použít přímo HTML značku – `&lt;del>` nebo `&lt;s>` v závislosti na případu užití.

  `text-decoration: blink`
  
    Podpora blikání byla z prohlížečů s ohledem na (ne)příjemnost blikání pro uživatele **odebrána**. Totéž se týká i blikání značky `&lt;blink>`.

    Nahradit se dá například CSS animací pomocí vlastnosti `animation` nebo JavaScriptovým časovačem. Příklady jsou na [Wikipedii](http://en.wikipedia.org/wiki/Blink_element).

### Skládání dekorací

Jednotlivé *dekorace* jde skládat, takže jde vytvořit text, který je podtržený, přeškrtnutý i nadtržený ([ukázka](http://kod.djpw.cz/johb)).

## Nové `text-decoration`

V novější podobě je `text-decoration` zkratka pro `text-decoration-**něco**` vlastnosti.

```
element {
  text-decoration: 
    [text-decoration-line] 
    [text-decoration-style]
    [text-decoration-color]
}

```

### `text-decoration-line`

Původní hodnoty `text-decoration` se staly součástí vlastnosti `text-decoration-**line**`. Je tedy shodné s *původním* `text-decoration`.

### `text-decoration-style`

Udává styl čáry z `text-decoration-line`.

  - `solid` — výchozí  čára

  - `double` — dvojitá  čára

  - `dotted` — tečkovaná čára

  - `dashed` — čárkovaná čára

  - `wavy` — vlnovka

[Samostatná ukázka](http://kod.djpw.cz/kohb) (nepodporuje **Edge**/**IE** a starší verse ostatních prohlížečů)

### `text-decoration-color`

Jedná se o nastavení barvy čáry. Díky tomu lze elegantně řešit problém různé barvy odkazu a podtržení ([ukázka](http://kod.djpw.cz/nohb)).

Případně v kombinaci s `text-decoration-style: wavy` konečně vytvořit **podtržení červenou vlnovkou** bez nutnosti používat obrázek.

  Text podtržený červenou vlnovkou

### `text-decoration-skip`

Hodně užitečná vlastnost, která dlouhou dobu chyběla. Umožňuje nepodtrhnout mezery slov nebo části písmen, které se nyní **kříží s podtržením**.

S `text-decoration-skip: ink` vypadá podtržení následovně:

Podporuje **Chrome 57** a **Opera 44**. Dále potom od **Chrome 64** a **Opery 51** (konec [ledna 2018](https://www.chromestatus.com/feature/5631679087509504)) je výchozí hodnota, která přeskakuje podtržení:

  .chytre-podtrzeni {
    text-decoration: underline;
    text-decoration-skip: ink;
  }
  Chytré podtržení textu, kdy se podtržení vyhne písmenům.

Pro hezčí podtržení tedy není v těchto prohlížeči třeba nic dělat.

Případně jde vypnout pomocí `text-decoration-skip-ink: none`.

Bez `text-decoration-skip: ink` se podobného efektu dosahovalo dost krkolomně.

    - [Lepší podtržení odkazu](/podtrzeni)

    - MDN: [`text-decoration-skip`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip)

### `text-underline-position`

[Specifikace](http://dev.w3.org/csswg/css-text-decor-3/#text-underline-position-property)

Upravuje umístění podtržení. Z výchozího stavu:

Jde pomocí hodnoty `under` přesunout podtržení níže:

## Podpora nového podtržení v prohlížečích

Podpora se postupně zlepšuje. U některých vlastností jde podporu brát jako *nice to have* – drobně zlepší uživatelských dojem v podporovaných prohlížečích bez zhoršení stavu v těch ostatních.

Staré prohlížeče, co znají `text-decoration` jako samostatnou vlastnost a ne zkratku, budou brát nové vlastnosti jako **neznámé hodnoty**, takže zahodí celou deklaraci ([ukázka](http://kod.djpw.cz/mohb)).

Takže pro to, aby se zobrazila alespoň **základní čára**, je nutné zdvojení jako například u [`rgba()` barev](/rgba).

```
element {
  text-decoration: underline;
  text-decoration: underline double;
}
```

## Odkazy jinam

  - CSS tricks: [More Control over Text Decoration](https://css-tricks.com/more-control-over-text-decoration/)