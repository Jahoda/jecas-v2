---
title: "BEM: způsob zápisu CSS"
headline: "BEM – způsob zápisu CSS"
description: "BEM (Block, Element, Modifier) je postup, kterým zapisovat CSS pravidla a pojmenovávat CSS třídy."
date: "2015-04-02"
last_modification: "2015-04-03"
status: 1
tags: ["CSS", "Rady a nápady"]
---

```
.blok {}
.blok__element {}
.blok--modifikator {}
```

Nejjednodušší příklad použití této konvence pojmenování tříd může vypadat následovně.

```
&lt;button class="tlacitko tlacitko--dulezite">
  &lt;span class="tlacitko__popis">Koupit za&lt;/span>
  &lt;span class="tlacitko__cena">500 Kč&lt;/span>
&lt;/button> 
```

S CSS selektory:

```
.tlacitko {}
.tlacitko--dulezite {}
.tlacitko__popis {}
.tlacitko__cena {}
```

  Block
  
    **B**lokem je v tomto případě třída `tlacitko`.

  Element
  
    **E**lementy jsou potomci bloku, tedy třídy `tlacitko__popis` a `tlacitko__cena`.

  Modifier
  
    **M**odifikátorem je třída `tlacitko--dulezite`.

## Principy BEM

Hlavní princip BEMu boří jeden z hlavních pilířů kaskádových stylů – kaskádovitost. Vůbec se nepoužívá **zanořování**. Každý element má svou třídu, podle které je jednoznačně identifikován.

To má některé výhody.

### Zanořování a dědičnost

HTML/CSS kodér se nemusí tolik prát s dědičností a sílou selektorů. Síla selektorů je pouze na úrovni prosté třídy.

Původní příklad bez použití BEMu by mohl vypadat následovně.

```
&lt;button class="tlacitko dulezite">
  &lt;span class="popis">Koupit za&lt;/span>
  &lt;span class="cena">500 Kč&lt;/span>
&lt;/button> 
```

Adekvátní CSS by vypadalo následovně:

```
.tlacitko {}
.tlacitko.dulezite {}
.tlacitko .popis {}
.tlactiko .cena {}
```

Problém potom může nastat v případě, že by někde na stránce měl existovat blok s názvem `popis`:

```
&lt;div class="popis">
…
&lt;/div>
```

Jeho styly pro selektor `.popis {}` by se potom promítly i do `&lt;button class="tlacitko popis">`. Stejně tak by se styly pro blok `.dulezite` promítly do `&lt;button class="tlacitko dulezite">`.

Konflikt tak při používání BEMu může nastat jen na úrovni bloků, což je menší risiko, než při zanořování selektorů.

### Srozumitelnost kódu

Jelikož se styly nemohou dědit napříč různými bloky a každý stylovaný element má svou CSS třídu, je snazší k HTML elementu dohledat jeho selektor. Není kvůli tomu nutné používat [vývojářské nástroje](/vyvojarske-nastroje). Na druhou stranu to přináší nároky na **vyšší složitost HTML kódu**, kde se píší třídy i v místech, kdy by šlo použít obecný kontext (`.navigace a`).

```
&lt;div class="navigace">
  &lt;a href="#" class="navigace__odkaz">Odkaz&lt;/a>
  &lt;a href="#" class="navigace__odkaz">Odkaz&lt;/a>
&lt;/div>
```

Používání konvence BEM tedy přináší něco za něco. Vyžaduje sice trochu více psaní, výsledek ale může být srozumitelný a **lépe přenositelný mezi projekty**, protože je menší risiko, že dojde ke kolisi v názvech.

## Používat BEM?

Postup *Block, Element, Modifier* může být užitečný jako společná konvence při práci hodně lidí nad stejným CSS, kdy je jasně patrné, co která třída je.

Jde použít i nějaký kompromis, kdy se alespoň v rámci bloku používají třídy s názvem bloku na začátku:

```
&lt;button class="tlacitko tlacitko-dulezite">
  &lt;span class="tlacitko-popis">Koupit za&lt;/span>
  &lt;span class="tlacitko-cena">500 Kč&lt;/span>
&lt;/button> 
```

Nebo si zvolit jinou konvenci pro znázornění elementu a modifikátoru. Například **Martin Michálek** [nepoužívá](http://www.vzhurudolu.cz/prirucka/bem) spojovníky v názvech tříd, takže může používat následující zjednodušení.

```
.blok {}
.blok-element {}
.blok--modifikator {}
```

Omezit kolise v názvech tříd může i postup, který popsal **Pepa Linha**:

    - [Pište CSS jako znovupoužitelné komponenty](http://blog.webdream.cz/css/piste-css-jako-znovupouzitelne-komponenty)

To spočívá v tom, že tzv. blok z metodiky BEM zapíše s prefixem „`c-`“, načež všechny třídy, co k němu patří, do něj zanořuje s využitím CSS preprocesoru.

```
.c-blok {  
  .element {}
  &amp;.-modifikator {}
}
```

Výhodou je, že se v HTML kódu nemusejí neustále opakovat názvy bloků u elementů a modifikátorů. Nevýhoda je potom menší *neprůstřelnost* k stejně pojmenovaným třídám a vyšší váha selektorů.

## Odkazy jinam

  - CSS Tricks: [BEM 101](https://css-tricks.com/bem-101/)

  - CSS Wizardry: [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

    - CSS Wizardry: [BEMIT: Taking the BEM Naming Convention a Step Further](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)

  - BEM.info: [BEM – Technology for creating web applications](https://en.bem.info/)

  - David Berner: [Battling BEM – 5 common problems and how to avoid them](https://medium.com/fed-or-dead/battling-bem-5-common-problems-and-how-to-avoid-them-5bbd23dee319)