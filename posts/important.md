---
title: "CSS !important"
headline: "CSS <code>!important</code>"
description: "Klíčové slovo <code>!important</code> slouží k posílení a přebíjení CSS vlastností."
date: "2015-10-17"
last_modification: "2015-10-17"
status: 1
tags: ["CSS", "CSS selektory"]
---

V angličtině *important* znamená **důležitý**. Slouží tedy k zvýšení důležitosti CSS hodnot.

Při utváření [CSS selektorů](/css-selektory) mají různé selektory různou sílu.

  Nejníže je universální hvězdičkový selektor:
    ```
* {color: red}
```

  Trochu silnější jsou selektory elementů a pseudo-elementů:
    ```
input,
:before {
  color: green;
}
```

  Ještě silnější jsou třídy, atributy a pseudo-třídy:
    ```
.cerveny,
[type=text],
:hover {
  color: blue;
}
```

  Nejsilnější jsou `#id`:
    ```
#cerny {
  color: black;
}
```

Proto když se výchozí styly přidají do CSS, textové políčko [`&lt;input>`](/input) bude černé:

```
&lt;input type="text" **id="cerny"** class="cerveny" value="Text">
```

Vždy vyhrává selektor z nejsilnější skupiny. Tedy následující selektor:

```
html.svetle body.tmave .policko input[type="text"] {
}
```

Bude hravě přebit pomocí:

```
#idecko {
}
```

[Ukázka](http://kod.djpw.cz/bfrb)

## Síla `!important`

Klíčové spojení „`!important`“ se používá pro posílení dané CSS hodnoty:

```
p {
  color: red **!important**;
}
p#modry {
  color: blue;
}
```

Odstavec s `id="modry"` bude červený, ačkoliv selektor `p#modry` je mnohem silnější než `p` – díky `!important`.

Zapisuje se za hodnotu, kterou má posílit. Je jedno, jestli se pro přehlednost použije mezi hodnotou a `!important` mezera nebo ne. Může tam být klidně i odřádkování. *Bílé znaky* mohou být i mezi vykřičníkem a *important*.

Někde se uvádí, že *important* **znemožní přepsání jinou CSS vlastnosti**.

  Když chci, aby nějaká dřívější deklarace převládla, napíšu do deklarace řetězec „`! important`“. Taková deklarace potom nebude přehlušena žádnou pozdější.

  – **Yuhů**, Jak psát web: [Skládání stylů](http://www.jakpsatweb.cz/css/css-tridy-class.html#skladani)

Není to úplně přesné:

## Přebíjení `!important`ů

```
p {
  color: red !important;
}
p.modry {
  color: blue !important;
}
```

Bude [odstavec](/odstavec) červený, nebo modrý?

Pokud na sebe narazí dvě deklarace používající `!important`, použijí se opět klasická pravidla síly selektorů.

Odstavec `&lt;p class="modry">` tak bude modrý, protože `p.modry` je silnější selektor. Použití `!important` v tomto případě pouze *srovná síly*.

## Nejsilnější nastavení hodnoty

V případě nastavení stylu prostřednictvím atributu `style` jsou přebity hodnoty nastavené libovolným selektorem:

```
&lt;style>
#modry {
  color: blue;
}
&lt;/style>
&lt;p id="modry" style="color: red">
  Červený odstavec
&lt;/p>
```

S výjimkou `!important`. Tento odstavec bude modrý:

```
&lt;style>
#modry {
  color: blue **!important**;
}
&lt;/style>
&lt;p id="modry" style="color: red">
  Modrý odstavec
&lt;/p>
```

Použil-li by se `!important` v řádkovém atributu `style`, byl by odstavec opět červený.

Nejsilnější nastavení hodnoty v CSS je tedy proveditelné prostřednictvím  `!important` uvnitř atributu `style`.

I to jde ale překonat změnou vlastnosti JavaScriptem:

```
modry.style.color = "green !important";
```

## Využití

Important **není obecně moc dobré používat**, protože má moc velkou sílu. Obecně je dobré držet sílu CSS zápisu co nejnižší, protože je potom jednodušší jeho úprava – to platí kromě `!important` i pro CSS selektory.

V případě, že je problém nějakou vlastnost přepsat, bývá lepší zkusit snížit sílu předchozího selektoru než vytvářet nový silnější. Není-li na výběr, je asi nejlepší možnost selektor opakovat:

Bude-li existovat zbytečně silný selektor `table tr td.cerveny`.

```
table tr td.zvyraznit {
  color: red;
}
```

Jde přebít následovně (dvě třídy jsou silnější než jedna):

```
.zvyraznit.zvyraznit {
  color: blue;
}
```

Pro udržování **nízké síly selektorů** je vhodný postup [BEM](/bem), kde se pro stylování používají pouze CSS třídy. Vyžaduje to ale vyšší nároky na HTML kód, kde musí být třída u všeho, co se má stylovat.

### Přebíjení atributu `style`

[**Chamurappi**](http://webylon.info) zmínil na [diskusi JPW](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=156043#13) případy, kdy `!important` používá – pro **přebíjení atributu `style`**:

Já občas používám    
  `!important`   ve spolupráci s naskriptovanými věcmi. 

  Pokud skriptem měním třeba nějaké souřadnice    
  `left`   a    
  `top`   (tzn. měním vlastně přímo atribut    
  `style`, který mívá běžně nejvyšší prioritu) a tyto hodnoty se mají v nějakém stavu ignorovat, přebíjím je tím, že jim přes nějakou třídu společného rodiče nastavím výchozí hodnoty s    
  `!important`  em (není-li možné jim dát    
  `position: static`  ). 

  Nebo jiný případ — server mi generuje do HTML    
  `style="background-image: url(obrázek.jpg)"`   (jelikož jen on zná URL obrázku) a já zatím nechci, aby se obrázek načítal, tak dám co nejdříve skriptem rodičovi třídu, která nastaví dotyčným elementům    
  `background-image: none !important`. 

  A ještě třetí možnost využití, v    
  `contenteditable`   mívá uživatel velkou volnost v tom, co vloží. Může běžně vložit formátovaný kus DOMu ze schránky či přetažením. Pokud se mu nechci plést pod prsty, ale jen jemně naznačit, že velké růžové písmo nebude velké, ani růžové, že element s obrázkem na pozadí nemůže mít pozadí, že    
  `&lt;input>`   či    
  `&lt;iframe>`   ve výsledku neuvidí a že vloženým obrázkům nemůže změnit velikost, také k tomu používám supersilné CSS předpisy s    
  `!important`em. 

  Nepotřebuji-li přebíjet atribut    
  `style`, nemám pro    
  `!important` rozumné využití.      

  — **Chamurappi**

## Odkazy jinam

  - [The Importance of !important: Forcing Immutability in CSS](http://csswizardry.com/2016/05/the-importance-of-important/) – kdy se ještě může hodit použít `!important`