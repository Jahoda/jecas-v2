---
title: "Popis formulářového políčka"
headline: "Popisek formulářového pole"
description: "Jakým způsobem řešit popisky formulářových prvků."
date: "2015-04-29"
last_modification: "2015-04-30"
status: 1
tags: ["Hotová řešení", "Formuláře", "Rady a nápady"]
---

Má-li návštěvník webu vyplnit políčko ve formuláři, je zpravidla nutné ho nějakým způsobem popsat.

      E-mail: 

    *Na uvedený e-mail vám budeme posílat spamy*

Na příkladu je možné pozorovat 3 popisky:

  - název políčka – „E-mail“,

  - příklad hodnoty, kterou má návštěvník vyplnit – „jmeno@domena.cz“ (slouží k tomu atribut `placeholder`),

    - sekundární popisek blíže doplňující význam políčka.

Bývá zvykem, že kliknutí na hlavní popisek tlačítka přesune kursor do políčka (tzv. „dá políčku `focus`“), takže je možné začít psát. Technicky se to řeší pomocí [značky `&lt;label>`](/label-for).

Kvůli [responsivním webům](/responsive) je pro zařízení s úzkou obrazovkou nutné řešit **nedostatek místa**, což vytváří tlak na prostorově úspornější provedení formuláře.

## Otazník obsahující vysvětlení

Prvním způsobem úspory místa je schovat *sekundární popisek* do tlačítka a vysvětlení zobrazovat v tooltipu.

    .popisek {
      background: #0D6AB7;
      color: #fff;
      display: inline-block;
      width: 1.2em;
      line-height: 1.2em;
      text-align: center;
      border-radius: 50%;
      cursor: help;
    }

    E-mail:

    ?

Technické řešení tooltipu potom samozřejmě může být jiné než prostý [atribut `title`](/atribut-title).

    - [JS tooltip](/js-tooltip) – vysvětlující popisek po najetí myší

Zatímco u zařízení **ovládaných myší** nepředstavuje najetí na popisek výrazný problém, horší je to u ovládání dotykem.

Obyčejný atribut `title` je úplně ze hry, protože na řadě zařízení z něj *nejde popisek vymáčknout*. Řešení používající **JavaScript** má zase problém s tím, že vyžaduje od uživatele **vynaložit zvláštní úsilí** a tapnout na otazník. To je zvlášť problematické v situaci, kdy se zrovna píše do políčka a je zobrazena klávesnice, protože dotyk mimo ji skryje.

## Placeholder jako popisek

Prázdný [`&lt;input>`](/input) čekající na vyplnění může vybízet k umístění popisku právě do políčka.

    ?

Od **IE 10** jde takové chování snadno vytvořit [atributem `placeholder`](/placeholder).

```
&lt;input **placeholder**="text">
```

Ačkoliv to může působit elegantně a úsporně s ohledem na prostor, má poměrně zásadní problém.

### Mizení popisku

**Internet Explorer** a **Opera 12** skryjí obsah *placeholderu* **ihned po aktivování políčka**. Pokud tedy člověk rychle klikne do políčka nebo použije klávesu Tab pro přeskočení na další pole, popisku si vůbec **nemusí všimnout** a už se k němu snadno nedostane.

Problém může nastat i v situaci, kdy je uživatel během vyplňování pole něčím **vyrušen**. Začne vyplňovat e-mail, najednou se přepne někam jinam a po návratu k formuláři už vůbec netuší, co vyplňuje. Nezbývá potom než všechno smazat (+ v **IE** kliknout někam mimo) nebo obnovit stránku, aby se popis pole opět objevil.

Závěr je proto ten, že **popisek políčka musí být vždy viditelný**. Případně musí být za každé situace patrné, co se má do políčka vyplnit.

V atributu `placeholder` by tedy nemělo být nic hodně důležitého.

## Přesun popisku

Relativně rozumným řešení je umístění popisku do prostoru tlačítka a jeho **zmenšení a přesunutí** jinam tak, aby byl popisek stále viditelný.

V praxi to může vypadat následovně.

.policko {
    position: relative;
}
.policko label {
    position: absolute;
    left: .2em;
    top: 0;
    transition: all .2s;
    line-height: 1;
}

.policko .focus + label {
    top: -1.2em;
    font-size: 70%;
    background: #fff;
    padding: .2em;
}

    E-mail

    URL

## Odkazy jinam

  - Codrops: [Some More Inspiration for Text Input Effects](http://tympanus.net/codrops/2015/03/18/inspiration-text-input-effects-2/) – různé efekty popisků

  - Osvaldas Valutis: [Placeholder Polyfill with Password Support](http://osvaldas.info/placeholder-polyfill-with-password-support) – podpora `placeholder`u pro **IE 9** a starší

  .zvyraznit {
    outline: 5px solid #0D6AB7;
  }
  [data-zvyraznit]:hover {
    background: #efefef;
  }

  var zvyrazneno;
  var zvyraznovac = document.querySelector("[data-zvyraznovac]");
  var cil = document.querySelector("[data-zvyraznovany=" + zvyraznovac.getAttribute("data-zvyraznovac") + "]");
  var zvyraznovane = zvyraznovac.querySelectorAll("[data-zvyraznit]");
  for (var i = zvyraznovane.length; i--; ) {
      zvyraznovane[i].onmouseover = function() {
          skryt();
          zvyrazneno = cil.querySelector(this.getAttribute("data-zvyraznit"));
          zvyrazneno.className = "zvyraznit";
      };
  }
  zvyraznovac.onmouseout = function() {
    skryt();
  }
  
  function skryt() {
    if (zvyrazneno) zvyrazneno.className = "";
  }
  // http://kod.djpw.cz/lvmb