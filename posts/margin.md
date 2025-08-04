---
title: "Margin"
headline: "Margin v CSS"
description: "CSS vlastnost <code>margin</code> slouží k vytvoření odsazení kolem elementu, který má <code>margin</code> nastavený."
date: "2014-01-13"
last_modification: "2014-02-09"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Samotný zápis „`margin`“ je sloučení vlastností pro jednotlivé strany:

  - `margin-top` — odsazení shora

  - `margin-right` — odsazení zprava

  - `margin-bottom` — odsazení zdola

  - `margin-left` — odsazení zleva

Při používání sloučeného názvu (`margin`) se rozměry uvádějí odshora ve směru hodinových ručiček.

```
p {margin: 5px 4px 3px 2px}
/* symbolicky: top, right, bottom, left */
```

Výše uvedený zápis nastaví odstavcům (`&lt;p>`) horní odsazení na `5px`, zprava odsazení `4px` a tak dále.

Mimochodem, odpovídající **nezkrácený** zápis by vypadal následovně.

```
p {
  margin-top: 5px;
  margin-right: 4px;
  margin-bottom: 3px;
  margin-left: 2px;
}
```

Zadáním **jen dvou hodnot** je možné nastavit stejné odsazení shora + zdola (`5px`) a zprava + zleva (`10px`):

```
p {margin: 5px 10px}
```

A konečně zadání hodnoty jedné nastaví stejné odsazení (`10px`) pro všechny strany najednou.

```
p {margin: 10px}
```

Co se stane při zadání **tří hodnot**? Ta poslední (pro levé odsazení – `margin-left`) se nastaví na stejnou hodnotu jako `margin-right` (pravé odsazení). Následující zápisy jsou tedy stejné.

```
.prvni {margin: 1em *2em* 3em}
.druhy {margin: 1em *2em* 3em **2em**}
```

## Centrování `margin`em

Kromě vytváření odsazení kolem elementů má vlastnost `margin` další využití — v [centrování](/centrovani). Stačí k tomu nastavit šířku a pravý i levý `margin` nastavit na hodnotu `auto`.

```
.centrovany-blok {
  margin: auto; 
  width: 300px;
}
```

Uvedený kód rovnou **vynuluje případný horní a dolní** `margin`, protože hodnota `auto` se pro `margin-top`/`margin-bottom` projeví jako nula. [Ukázka](http://kod.djpw.cz/oubb).

## Výchozí hodnoty

Hodně elementů má nějakou nenulovou výchozí hodnotu `margin`u, která může způsobovat problémy ve **správném zobrazení**. Proto se někdy hodí [resetování a sjednocování](/css-reset) napříč prohlížeči.

### Přibližné výchozí hodnoty

    Značky
    Hodnoty
  
  `body``margin: 8px`
  `h1``margin: .67em 0`
  `h2``margin: .75em 0`
  `h3``margin: .83em 0`
  h4, p,
blockquote, ul,
fieldset, form,
ol, dl, dir,
menu`margin: 1.12em 0`
  `blockquote``margin-left: 40px; margin-right: 40px`
    ol, ul, dir,
menu, dd    `margin-left: 40px`
    ol ul, ul ol,
ul ul, ol ol`margin-top: 0px; margin-bottom: 0px`

## „Slévání“ odsazení

(Pozn.: podle [**Plaváčka**](http://www.plavacek.net) je tato situace v české CSS hantýrce známá spíš jako **slučování okrajů**.)

Zajímavá *vlastnost* `margin`u nastává v situaci, kdy jsou v kódu za sebou elementy, co mají nenulové horní a dolní odsazení.

Potom se výsledná velikost *mezery* slije. To funguje tak, že se pro odsazení vybere ta vyšší z dvou hodnot (v případě stejného odsazení zkrátka jen jedna). [Samostatná ukázka](http://kod.djpw.cz/vsbb).

Mezera mezi prvním a druhým odstavcem proto není 55 px (15 px + 40 px), ale jen čtyřicet.

    .obal {background: green;}
    .odstavec {background: yellow; margin: 15px}
    .dva {margin: 40px}

    První odstavec (`margin: 15px`)

    Druhý odstavec (`margin: 40px`)

    Třetí odstavec (`margin: 15px`)

    Čtvrtý odstavec (`margin: 15px`)

Pro **odsazení na stranách toto neplatí**. U [obtékaných](/float) elementů se sousední `margin`y **sečtou**:

Červené čtevrečky na obrázku representují 15px odsazení odstavců 1, 2 a 4. Čtverečky modré potom 20px odsazení odstavce třetího. Jak je vidět, `margin` se normálně **sečte**.

## „Vytečení“ `margin`u

Toto chování už je vidět na předchozí ukázce. Oč jde? V případě, že má první element `margin-top` (horní odsazení) nebo poslední element `margin-bottom` (spodní odsazení), přenese se toto odsazení na rodiče těchto elementů. Přesněji řečeno se opět **slije** (velikost odsazení bude rovna vyšší z hodnot `margin`ů rodiče a jeho prvního potomka).

Jak je vidět na [ukázce](http://kod.djpw.cz/ysbb), zelený element `.obal` má horní i dolní odsazení i přes `margin: 0`.

    .prvni-obal {background: pink}
    .obal {background: green; margin: 0}
    .p {background: yellow; margin: 15px}    
    .cara {height: 5px; background: red;}

      Odstavec.

Typicky se tento *problém* může projevovat na začátku stránky, kdy nadpis nebo i obyčejný `&lt;div>` s `margin-top` stránku odsune. [Ukázka](http://kod.djpw.cz/webb).

Předávání `margin`u na rodiče nenastane v situaci, kdy **rodičovský element** bude mít `padding` nebo `border`.

Jiný způsob odstranění tohoto problému je změna `overflow` na hodnotu `auto` nebo `hidden`.  Margin potom zůstane uvnitř. [Ukázka](http://kod.djpw.cz/etdb).

## Vlastnost `clear` a `margin`

Další zajímavé chování nastává u elementu, který *ukončuje* obtékání (`clear: both`). Neprojeví se u něj `margin-top`. Tedy alespoň v prohlížečích kromě **IE** (ten nemá s horním odsazením problém ani v [jedenácté versi](/ie11)). Ostatní hodnoty `marginu` (`right`, `bottom` a `left`) se projeví standardně.

  - [Ukázka](http://kod.djpw.cz/atbb)

  - [Diskuse](http://diskuse.jakpsatweb.cz/?action=vthread&topic=65135&forum=7)