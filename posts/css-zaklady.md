---
title: "Základy CSS"
headline: "Základy CSS"
description: "K čemu je CSS dobré a jak ho rychle začít používat."
date: "2016-02-01"
last_modification: "2016-02-01"
status: 0
tags: ["CSS", "CSS selektory", "Rady a nápady"]
---

CSS (anglicky *Cascading Style Sheets*) je velmi rozšířený způsob, jak upravovat visuální vzhled dokumentů na internetu. V češtině se CSS běžně nazývá spojením **kaskádové styly**.

Pomocí CSS pravidel se nejčastěji upravuje podoba HTML značek.

## Zápis CSS

Jednoduché použití CSS na HTML značku pro [nadpis `&lt;h1>`](/nadpisy) může vypadat následovně:

```
h1 {
  color: red;
}
```

Tento kód způsobí, že obsah následujícího HTML kódu:

```
&lt;h1>Text&lt;/h1>
```

Bude červený. Proč to tak bude?

    `h1` je tzv. **CSS selektor**, kterým se zaměří prvek na stránce ([selektorů](/css-selektory) je velké množství), tento selektor zaměří všechny značky `&lt;h1>`, které se na stránce vyskytují

  `{` a `}` jsou složené závorky a obalují všechny předpisy pro daný selektor (na [české klávesnici](/ceska-klavesnice) je lze zapsat jako Pravý Alt + B/N)

    `color` je **CSS vlastnost** – všech vlastností je obrovské množství – konkrétně `color` slouží pro nastavení barvy

  `:` – pomocí dvojtečky se odděluje název vlastnosti od její hodnoty

  `red` – **CSS hodnota** přiřazená k vlastnosti před dvojtečkou

  `;` – středník odděluje více párů *vlastnost – hodnota*, za poslední dvojicí se psát nemusí, ale je to docela dobrý zvyk

    Mezery a odřádkování jsou v předchozí ukázce CSS pouze pro přehlednost. Zápis „`h1{color:red;}`“ povede ke stejnému výsledku.

[Živá ukázka](http://kod.djpw.cz/jbub) – nejjednodušší použití CSS na HTML dokument

## Připojení CSS

Aby se mohly kaskádové styly v HTML stránce projevit, musí se nějak **připojit**.

### Značka `&lt;style>`

Nejrychlejší a nejsnazší je vložit CSS předpisy do HTML značky `&lt;style>`, která se obvykle přidává před samotný obsah do hlavičky stránky (volitelná značka [`&lt;head>`](/html-kostra#head)).

```
&lt;head>
  **&lt;style>**
    h1 {
      color: red;
    }
  **&lt;/style>**
&lt;/head>
&lt;h1>Červený text&lt;/h1>

```

U vícestránkového webu by se ale muselo CSS se značkou `&lt;style>` kopírovat na všechny podstránky. Velké weby navíc mají styly značně rozsáhlé a datově objemné, takže by se totéž CSS muselo znovu a znovu stahovat s každou stránkou.

Proto se CSS ve značce `&lt;style>` moc nepoužívá. Případně jen pro menší množství pravidel.

### Atribut `style`

Psát CSS jde i přímo k jednotlivým HTML značkám do atributu `style`.

```
&lt;h1 **style**="color: red">Červený text&lt;/h1>
```

Tento postup nazývaný jako **inline zápis** se ale používá jen výjimečně, protože je obtížnější takový kód spravovat. Navíc se obvykle CSS předpisy používají opakovaně, takže by neustálé opakování kódu nebylo moc elegantní.

Měli-li by být všechny nadpisy `&lt;h1>` červené, musela by mít každá tato značka `style="color: red"`. Při vyčlenění CSS a zaměření pomocí selektorů to stačí napsat jednou.

### Externí CSS

Asi nejčastěji se používá **externí CSS soubor**. Někde v adresáři s webem se vytvoří soubor s příponou `*.css` (třeba `styl.css`) a jednotlivé CSS předpisy se píší přímo do něj.

Tento soubor se potom připojí ze všech stránek, kde je potřeba, značkou `&lt;link>` (před obsahem v části `&lt;head>`):

```
&lt;link rel="stylesheet" href="**styl.css**">
```

Pomocí `rel="stylesheet"` se prohlížeč dozví, že se jedná o soubor se styly.

Občas se je možné setkat s připojením stylů vypadajícím následovně:

```
&lt;link rel="stylesheet" **type="text/css"** href="styl.css">
```

Uvádění typu je zbytečné, protože „`text/css`“ je výchozí typ pro `rel="stylesheet"`.

    - [Nejjednodušší HTML + CSS kostra](https://gist.github.com/Jahoda/b220c02d7fc01f93a091) s externím stylem

## CSS vlastnosti

Pro základní ovládnutí CSS je dále nutné znát asi deset [CSS vlastností](/css-vlastnosti).

### Vzhled textu

  - [`font`](/font) – nastavení fontu, velikosti písma (`font-size`) nebo výšky řádku (`[line-height](/font#line-height)`)

  - `color` – barva textu

  - `[text-align](/text-align)` – zarovnání textu

  - [stylování odkazů](/odkaz#stylovani)

### Vzhled bloků

  - `[margin](/margin)` – vytváření rozestupů mezi bloky

  - `background` – pozadí

  - `border` – rámeček

  - `[display`](/display) – různá podoba zobrazení (řádkové/blokové)

  - `[float](/float)` – obtékání je základní způsob, jak něco dostat vedle sebe

  - `[position](/position)` – posicování elementů