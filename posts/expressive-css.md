---
title: "Expressive CSS"
headline: "Expressive CSS"
description: "Expressive CSS je postup psaní CSS, kde se jednotlivé styly přiřazují pomocí tříd v HTML."
date: "2016-03-18"
last_modification: "2016-03-20"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Mezi kodéry je poměrně silně zakořeněna myšlenka, že názvy tříd by měly nést význam elementu místo popisu vzhledu.

Tedy místo:

```
&lt;div class="nahore">&lt;/div>
&lt;div class="levy-sloupec">
  &lt;p class="cerveny">Důležitý odstavec červenou&lt;/p>
&lt;/div>
&lt;div class="pravy-sloupec">&lt;/div>
```

Psát něco jako:

```
&lt;div class="menu">&lt;/div>
&lt;div class="obsah">
  &lt;p class="dulezity">Důležitý odstavec červenou&lt;/p>
&lt;/div>
&lt;div class="souvisejici">&lt;/div>
```

Má to tu výhodu, že v případě přesunutí obsahu zleva doprava nebo přebarvení odstavce na zelenou se nemusí měnit HTML kód. On by se tedy nemusel měnit ani v prvním případě, ale vznikly by potom lehce komické deklarace:

```
.levy-sloupec {
  float: right;
}
.cerveny {
  color: green;
}
```

## Myšlenka Expressive CSS

    - [Expressive CSS](http://johnpolacek.github.io/expressive-css/) – stránka projektu

Používání Expressive CSS postupu potom dotahuje používání presentačních tříd absolutně.

[Absolutně](/position#absolute) posicovaný element do levého dolního rohu s bílým textem a dvojnásobným odsazením (`padding`) se vytvoří následovně:

```
&lt;div class="abs pos-bottom pos-left text-white pad-2"> 

```

### Inline styly?

Na první pohled to může vypadat jako *inline styly*:

```
&lt;div style="
position: absolute; bottom: 0; left: 0; color: white; padding: 2em
">
```

Rozdíl oproti inline stylům je v tom, že například velikost odsazení nebo barvy jde měnit hromadně v externím CSS.

A ostatní vlastnosti?

Stejně většinou bývají specifické pro jediný selektor, a tak vyjde dost podobně, jestli se bude měnit CSS vlastnost u selektoru `.paticka` v externím CSS nebo se upraví přímo třída v HTML.

## Výhody

Výhoda postupu s expresivními třídami může být v rychlejším vývoji webu, kdy stačí do HTML kódu sázet předpřipravené třídy a do CSS vůbec nezasahovat.

Stejně tak v případě úprav není nutné zkoumat, kde se jaká vlastnost odkud dědí, ale pouze se přepíší třídy v HTML atributu `class`.

Docela běžný je tento způsob při používaní CSS frameworku typu [Bootstrap](/bootstrap-rychlokurs) pro grid (rozložení layoutu stránky), kdy se také visuální podoba stránky určuje přidáváním připravených CSS tříd.

Používání expresivních tříd se může hodit i při práci v týmu s méně zkušenými kodéry, kteří díky tomu dokáží snadněji upravovat a měnit vzhled stránky.

### Datová velikost

Používání těchto tříd má ještě výhodu v datově menším CSS, protože cokoliv jde z CSS tříd sestavovat v HTML bez nutnosti psát nové styly.

## Nevýhody

Expressive CSS rozhodně není universální nejlepší řešení pro všechny případy. Například klade vysoké nároky na šablonovací systém generující HTML kód.

### HTML šablony

Je nutné, aby šablony dodržovaly zásadu DRY (*Don't repeat yourself*) – tedy se stejný kód neopakoval. V opačném případě by hromadné změny stylu stejného kódu na více místech byly dost komplikované.

Při „klasickém“ přístupu se klidně na několika místech použije obyčejné:

```
&lt;div class="komponenta">
```

A vzhled jde jednotně změnit v externím CSS.

U statického webu, kde se kód vypisuje ručně, by používání expresivních tříd bylo spíš na obtíž a složitě udržovatelné.

### Obecný postup

Další možné úskalí je v nestandardnosti používání expresivního CSS. Díky [vývojářským nástrojům](/vyvojarske-nastroje) není problém rychle prototypovat web přímo v prohlížeči včetně ukládání úprav zpět do CSS.

Stejně tak různé další nástroje počítají především s klasickým postupem oddělování HTML a CSS.

## Redesign webu

Případný redesign stránky při používání expresivních tříd se může nejprve zdát jako mnohem komplikovanější. Při obvyklém popisování elementů pomocí tříd jde teoreticky provést celou změnu vzhledu bez zásahu do HTML kódu.

Na druhou stranu při redesignu webu s využitím *Expressive CSS* jde redesign provést zase  **bez změny CSS** – pouze se změní HTML třídy.

Redesign při obvyklém používání tříd, kde se nemusí sáhnout na HTML, je navíc spíš výjimečný. Kromě toho se řada webů při potřebě redesignu stejně vytváří od nuly. Nebo se nikdy redesignovat nebude.

## Kombinování

Relativně běžné je lehké kombinování klasického přístupu s expresivními třídami.

Řada projektů má různé obecné třídy pro provádění rychlých úprav, jako je zarovnávání, [obtékání](/float), clearování nebo nastavování šířek pro urychlení vývoje.

```
.w10 { width: 10px; }
.w20 { width: 20px; }
.w30 { width: 30px; }
.w40 { width: 40px; }
```

## Odkazy jinam

  - John Polacek: [Content &amp; Display Patterns with Expressive CSS](http://johnpolacek.com/content-display-patterns/)

  - Codrops: [Defending Presentational Class Names](http://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/)

  - [Tailwind CSS](https://tailwindcss.com) – framework pro tvorbu UI bez psaní CSS