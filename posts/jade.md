---
title: "Jade"
headline: "Jade"
description: "Jade je šablonovací systém převáděný do HTML."
date: "2016-02-19"
last_modification: "2016-05-13"
status: 1
tags: ["HTML", "Produktivita"]
---

U komplikovanějších (ale i jednoduchých) webů a aplikací si jde usnadnit práci používáním šablonovacího systému. Šablony Jade kromě základních věcí, jako jsou proměnné, podmínky nebo cykly, nabízí i alternativní zápis HTML.

Jade vznikl původně pro Node.js, ale existují i implementace v PHP.

    - [Jade](http://jade-lang.com/) (oficiální web)

    - [jade.php](https://github.com/everzet/jade.php) (Jade v PHP)

## Zápis

Asi nejzajímavější je alternativní psaní HTML elementů a atributů:

```
div.clanek
  p Text v odstavci a 
    a(href="/clanek") odkaz
    |  na článek.
```

Tento kód vytvoří následující HTML:

```
&lt;div class="clanek">
  &lt;p>Text v odstavci a &lt;a href="/clanek">odkaz&lt;/a> na článek.&lt;/p>
&lt;/div>
```

Z ukázky plyne několik zákonitostí:

    Nepoužívají se ostré závorky běžné v &lt;HTML>, ale samotné názvy značek.

    Koncové značky se vynechávají všude – zanoření se vytváří odsazením.

    Třídy a identifikátory jdou zapsat rovnou k elementu `div.trida`, `span#idecko`.

    Ostatní atributy se zapisují do závorek:

    ```
element(atribut="hodnota")
```

    Více atributů se odděluje čárkou:

    ```
element(atribut="hodnota", druhyAtribut="hodnota")
```

    Každý text na začátku řádku se chápe jako název elementu. Toto chování je někdy nežádoucí. Připojit text přímo do elementu jde pomocí roury `|` (na [české klávesnice](/ceska-klavesnice) zkratka Pravý Alt + W).

    Pokud element obsahuje pouze text, jde použít tečka:

    ```
p**.**
  Odstavec zapsaný v kódu
  na
  více řádků
```

    Výsledek bude:

    ```
&lt;p>
  Odstavec zapsaný v kódu
  na
  více řádků
&lt;/p>
```

Na první pohled tedy **Jade** nabízí úspornější psaní HTML. Je otázka, jestli je to taková výhoda. Při používání [Emmetu](/emmet) jde totéž jako v Jade napsat následovně:

```
.clanek>p({Text v odstavci a }+a[href="/clanek"]{odkaz}+{ na článek.})
```

A rozbalit klávesou Tab.

Výhodný ale může být oproti HTML úspornější obsah ve zdrojovém souboru.

## Programování

Šikovná vlastnost Jade je možnost generovat HTML kód na základě skriptu. V HTML šablonách se čas od času některé části opakují a Jade umožňuje dodržet zásadu DRY (*Don't repeat yourself*) takřka 100%.

### Proměnné

Pro opakující se texty jde použít proměnné.

```
- var promenna = "Fytopuf";
div
  p Obsah proměnné se vypíše přes #{promenna}.
```

### Cykly

Data je možné případně i vypisovat cyklem.

Používá se k tom konstrukce `for`. Obsah v cyklu se vypíše pomocí `=`.

```
- var jmena = ["Franta", "Pepa", "Jednička"];
for jmeno in jmena
    div= jmeno

```

### Mixiny

Jde vytvářet i mixiny. Třeba pro universální vkládání obrázků by mohlo existovat něco jako:

```
mixin obrazek(url, popis)
  img(src="#{url}" alt="#{popis}")
```

Použití by bylo následovné:

```
+obrazek("obrazek.png", "Popisek obrázku")
```

## Odkazy

  - Sitepoint: [A Jade Tutorial for Beginners](http://www.sitepoint.com/jade-tutorial-for-beginners/)

  - Sitepoint: [Introduction to JadePHP](http://www.sitepoint.com/introduction-jadephp/)