---
title: "Input"
headline: "HTML značka <code>&lt;input></code>"
description: "Všechny varianty značky <code>&lt;input></code>, možné atributy, vysvětlení a ukázky."
date: "2013-11-19"
last_modification: "2017-02-14"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

## Atribut `type`

Element `&lt;input>` je hodně specifický tím, že může **nabývat mnoha podob**, které stanoví atribut `type`.

Následuje abecední seznam **možných variant**.

  HTML kódVýsledekVýznamPodpora
  
    ```
&lt;input type="button">
```

    Tlačítko bez další akce, je v podstatě nutné uvést text tlačítka do atributu `value`, jinak se nic moc neobjeví.

    Vše

    ```
&lt;input type="checkbox">
```

    Zaškrtávací pole. Kvůli malým rozměrům je vhodné používat [značku `&lt;label>`](/label-for). **Zaškrtnutí** se zapíná atributem `checked`.

    Vše

    ```
&lt;input type="color">
```

    [Výběr barvy](/vyber-barvy) v hexa zápisu.

    Opera, Chrome, Firefox 29

    ```
&lt;input type="date">
```

    Výběr **kalendářních dat** (dny, měsíce, roky).

    Opera, Chrome

    ```
&lt;input type="datetime">
```

    Výběr **kalendářních dat i času** (dny, měsíce, roky, hodiny a minuty).

    Opera

    ```
&lt;input type="datetime-local">
```

    Výběr **kalendářních dat i času** (dny, měsíce, roky, hodiny a minuty) bez **časového pásma**.

    Opera, Chrome

    ```
&lt;input type="email">
```

  input[type=email]:valid {color: green}
  input[type=email]:invalid {color: red}

    Zadávání **e-mailové adresy**. Užitečné jsou [selektory `:valid` a `:invalid`](/css-selektory#validace), které mohou přestylovat políčko v závislosti na platném e-mailu. Zadání více e-mailů by měl zajistit atribut `multiple`.

    IE 10

    ```
&lt;input type="file">
```

    Políčko pro **nahrávání souborů**.

      - Atributem `file` lze omezit typ souborů, **které je možné nahrát**.

      - Atribut `multiple` umožní nahrát víc souborů.

    Vše

    ```
&lt;input type="hidden">
```

    Skryté pole, které se ale při odeslání dostane na server.

    Vše

    ```
&lt;input type="image">
```

    **Obrázkové odesílací tlačítko**, cíl obrázku se zadává do `src`, rozměry do `width` a `height` a popisek do `alt`u.

    Vše

    ```
&lt;input type="month">
```

    Výběr **samotného měsíce**.

    Opera, Chrome

    ```
&lt;input type="number">
```

    Výběr **čísla**. V podporovaných prohlížečích je možné číslo zvyšovat/snižovat šipkami. O kolik se má zvyšovat/snižovat určuje atribut `step`.

    Opera, Chrome, Firefox 29

    ```
&lt;input type="password">
```

    Pole pro **zadávání hesel**, místo znaků se zobrazují puntíky/tečky/hvězdičky.

    Vše

    ```
&lt;input type="radio">
```

    Radio **přepínače**. Na rozdíl od [`checkboxu`](#type-checkbox) lze vytvořit *kolekci* (se stejným atributem `name`), ze které lze vybrat jen **jednu možnost**. Předvybrat políčko umí rovněž atribut `checked`.

    Vše

    ```
&lt;input type="range">
```

    Výběr **čísla z rozsahu**. Hodnotu určí atribut `value`. Maximální hodnota se nastaví atributem `max`, minimální zase `min`. O kolik se dá posouvat určuje atribut `step`.

    [JS řešení](http://andreruffert.github.io/rangeslider.js/) funkční i ve starších prohlížečích.

    IE 10

    ```
&lt;input type="reset">
```

    **Resetuje** celý formulář na původní hodnoty. Resetovat jen něco [může JavaScript](/input-file).

    Vše

    ```
&lt;input type="search">
```

    Pole pro **hledání**. Atribut `autosave` by měl zajistit **ukládání hledaných výrazů**.

    IE 10

    ```
&lt;input type="submit">
```

    Tlačítko pro **odeslání formuláře**, mívá výchozí popisek „Odeslat“.

    Vše

    ```
&lt;input type="tel">
```

  input[type=tel]:valid {color: green}
  input[type=tel]:invalid {color: red}

    Zadávání **telefonního čísla**. Užitečné jsou (jako u [e-mailu](#type-email)) selektory `:valid` a `:invalid`, které mohou přestylovat políčko v závislosti na platnosti.

    IE 10

    ```
&lt;input type="text">
```

    Běžný text (výchozí typ, tj. vytvoří se i bez uvedení `type`).

    Vše

    ```
&lt;input type="time">
```

    Výběr **samotného času**.

    Opera, Chrome

    ```
&lt;input type="url">
```

  input[type=url]:valid {color: green}
  input[type=url]:invalid {color: red}

    Výběr **URL stránky**. Opět je možné použít selektory `:valid` a `:invalid`.

    IE 10

    ```
&lt;input type="week">
```

    Zadávání samotného **týdne**.

    Opera, Chrome, Firefox

## Obecné atributy

Kromě atributů, které fungují snad úplně všude, jako `id`, `class` a `title`, existují i obecné atributy pro `&lt;input>`y:

  `name`
  Jméno políčka, podle kterého se dá následně zpracovávat na serveru.
  
  `value`
  Výchozí hodnota políčka (někdy také popis tlačítka).
  
  `checked`
  Zaškrtne [`checkbox`](#type-checkbox) nebo [`radio`](#type-radio) ihned po načtení stránky.
  
  `list`
  Připojení [našeptávání](/datalist) značkou `&lt;datalist>`.
  
  `inputmode`
  Využití se najde hlavně u **dotykových zařízení** se SW klávesnicí. Atribut `inputmode` by měl umět přepnout typ klávesnice, která se u daného pole objeví.

  `autofocus`
  Po načtení stránky dá políčku rovnou `focus` ([ukázka](http://kod.djpw.cz/ges)).  
  
  `placeholder`
  Předvyplní políčko hodnotou, která **po aktivování zmizí**. Zároveň se nebude odesílat na server ([ukázka](http://kod.djpw.cz/hes)). Detailní popis [atributu `placehodler`](/placeholder) je na samostatné stránce.    
  
  `autocomplete`
  Některé prohlížeče si pamatují **vyplněná data** a umí je později nabízet. Hodnota `on` napovídání zapne, hodnota `off` vypne. 
  
  `spellcheck`
  Zapne nebo vypne **kontrolu pravopisu** ([ukázka](http://kod.djpw.cz/ies)).   

## Ověřování a omezení hodnot

Pro ověřování a omezování hodnot existují od **HTML 5** bohatší nástroje. Užitečné je i rozšíření CSS o selektory [`:valid`/`:invalid`](/css-selektory#validace), které mohou přímo špatně vyplněné pole *zaměřit*.

Jelikož všechny tyto kontroly **nefungují ve starých prohlížečích** a není problém je obejít, je nutné kontrolovat **vždy** [na serveru](/bezpecnost#js-osetreni).

  `maxlength`
  Maximální počet znaků, co lze do políčka napsat.
  
  `pattern`
  [Atribut `pattern`](/atribut-pattern) umožňuje zadat regulární výraz, kterému musí obsah **vyhovovat**.
  
  `required`
  Pole musí být vyplněno.
  
  `min`
  Minimální možná hodnota. Lze použít u čísel a kalendářních dat. Hodnota `min` musí být nižší než `max`.

  `max`
  Maximální možná hodnota. Hodnota musí být **vyšší** než `min`.
  
  `readonly`
  Pole je **jen ke čtení**, nelze mu měnit jeho obsah.  
  
  `step`
  Krok, kterým lze zvyšovat/snižovat hodnotu. Funguje u [čísla](#type-number) a [rozsahu](#type-range).
  
  `disabled`
  Políčko je úplně zablokované. Nejde na něm vyvolat `onclick` a neodešle se na server (pokud není `hidden`).

## Atributy nastavení formuláře

Zajímavým prvkem je možnost **přenastavovat věci**, co normálně řeší značka `&lt;form>`. Nebo dokonce z posice `&lt;input>`u určit, do jakého formuláře **bude patřit**.

  `form`
  Umožňí `&lt;input>` přiřadit do formuláře, aniž by se nacházel v `&lt;form>`. Jako hodnota se zadává atribut `id` cílového formuláře.
  ```
&lt;form id="**idecko**">
&lt;/form>
&lt;input form="**idecko**">
```

  `formaction`
  Přepíše `&lt;form action>`. Má význam jen u **odesílacích tlačítek** (`submit`, `image`).
  
  `formenctype`
  Obdobně přepíše atribut `enctype`.
  
  `formmethod`
  Přepíše/nastaví metodu (na `GET` nebo `POST`), kterou se formulář odešle (`method`).
  
  `formtarget`
  Přepíše/nastaví rám, do kterého se formulář odešle (`target`).  
  
  `formnovalidate`
  Přepíše/nastaví validaci formuláře (`novalidate`).    

## Odkazy jinam

  - Monica Dinosaurescu: [&lt;input&gt; I ♡ you, but you're bringing me down](http://meowni.ca/posts/a-story-about-input/) – historický vývoj formulářových prvků