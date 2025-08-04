---
title: "Odstavec v HTML"
headline: "HTML odstavec"
description: "HTML značka <code>&lt;p></code> slouží k uspořádávání textu do odstavců."
date: "2015-07-13"
last_modification: "2015-08-13"
status: 1
tags: ["HTML", "HTML značky"]
---

U webových stránek bývá zvykem, že delší text bývá pro lepší přehlednost **členěn do odstavců**. Slouží k tomu bloková značka `&lt;p>` (*p* pochází z anglického *paragraph* = odstavec).

## Zápis odstavců

```
**&lt;p>**
  Text v odstavci.
**&lt;/p>**
```

Odstavec má v HTML **nepovinnou [uzavírací značku](/html-znacky#koncova-volitelna)** – automaticky se uzavře o jiný **blokový element**. To může způsobovat problémy, protože se tak odstavec může uzavřít jinde, než autor stránky zamýšlel.

V následujícím příkladu bude odstavec ukončen [seznamem `&lt;ul>`](/seznamy#ul) a ukončovací značka „`&lt;/p>`“ **bude ignorována**.

```
&lt;p>
  Text v odstavci.
  **&lt;ul>**
    &lt;li>Pokus o položku seznamu v odstavci
  &lt;/ul>
  Domnělé pokračování odstavce
&lt;/p>
```

Stejně tak dokáže odstavec předčasně ukončit i značka `&lt;div>`, [nadpisy `&lt;h1–6>`](/nadpisy), seznamy, tabulky, bloková citace, další spousta značek a nebo **jiný odstavec** – není tedy možné vytvořit *odstavec v odstavci*.

```
&lt;p>První odstavec
&lt;p>Druhý odstavec ukončí ten první
```

Pokud je potřeba stylovat blok, kde má být text i například seznam, nezbývá než použít jako obal element `&lt;div>`.

### Blokový element v HTML a CSS

Je rozdíl mezi blokovým elementem v HTML a blokovou hodnotou `block` u CSS vlastnosti [`display`](/display).

Zda nějaká značka odstavec ukončí, **není závislé na CSS**. Pro vložení visuálního bloku do odstavce jde tedy použít řádkovou značku – např. `&lt;span>` – a nastavit ji `display: block`.

```
&lt;p>
  Text v odstavci.
  **&lt;span style="display: block">**
    Jako blok.
  &lt;/span>
  Pokračování odstavce.
&lt;/p>
```

## Atributy odstavce

Odstavec podporuje pouze [obecné atributy](/obecne-atributy). K tomu navíc:

  `align`
  
    Dřívější HTML specifikace uváděly atribut `align` pro zarovnání obsahu v odstavci. Atribut stále funguje, jde nahradit CSS vlastností [`text-align`](/text-align). V HTML5 je [nevalidní](/validita).

      Odstavec zarovnaný vlevo (výchozí chování).

      Odstavec zarovnaný vpravo.

      Odstavec zarovnaný na střed.

## Styl odstavce

Ve výchozích stylech má odstavec horní a dolní odsazení (CSS vlastnost [`margin`](/margin)).

Symbolický zápis:

```
p {
  margin: 1em 0;
}
```

Při umístění **dvou odstavců za sebou** se potom odsazení tzv. [*slévá*](/margin#spojovani). Tj. mezi dvěma odstavci **nebude** mezera `2em`, ale jen `1em`, protože se v takovém případě používá hodnota rovna vyššímu `margin`u z obou elementů.

### CSS reset

Řada tvůrců u stránek odsazení odstavce [resetují](/css-reset) na nulu.

```
/* spousta elementů*/, 
p {
  margin: 0;
}
```

A následně si odsazení nastavují podle umístění odstavce.

V praxi se nezdá být problém odstavci globálně **vůbec nic nenastavovat** a ponechat mu výchozí hodnoty, které jsou zpravidla použitelné.

### Odsazení prvního řádku

U textů v českých knihách nebo novinách bývá zvykem, že se odstavec tvoří **odsazením začátku řádku**:

Na webu není potřeba **šetřit papírem a místem**, takže styl odstavců zpravidla sestává z **horního a dolního odsazení** realisované CSS vlastností [`margin`](/margin).

  První odstavec.

  Druhý odstavec.

Případné **odsazení prvního řádku** jde ale snadno vytvořit vlastností `text-indent`.

    .odsazeny {
      text-indent: 1em;
      max-width: 20em;
    }
  
  Delší první odstavec, který je přes více řádků. První řádek odstavce je odsazen pomocí CSS.

  Krátký odstavec.

Občas se toto odsazování ještě vylepšuje tak, že se zleva neodsazuje **první odstavec po nadpisu** nebo jiném bloku; jde toho docílit CSS [selektorem přímého sourozence](/css-selektory#primy-sourozenec) (funkční od **IE 7**).

```
p + p {
 text-indent: 1em;
}
```

Zleva bude odsazen pouze odstavec, který následuje po odstavci. [Ukázka](http://kod.djpw.cz/efob).

## Text mimo odstavec

Odsazení odstavce se často hodí, takže je docela pohodlné do něj obalovat jakýkoliv text. Třeba položky [formuláře](/formulare):

```
&lt;p>
  &lt;label>Jméno: &lt;input name="jmeno">&lt;/label>
&lt;/p>

Striktní specifikace HTML 4.01 dokonce zakazovala do některých kontextů obsah bez použití odstavce vůbec umístit.

Třeba při vložení prostého textu přímo do `&lt;body>`:

## „Ruční“ tvoření odstavce

Simulovat podobu odstavců jde teoreticky **zalomením řádku** [značkou `&lt;br>`](/odradkovani#br).

Text
**&lt;br>&lt;br>**
Další text
```

Výsledek se potom vzhledově blíží k použití odstavců:

  Text

Další text

Jedná se ale o nouzové řešení, **když není možné odstavec použít**, jinak je dobré se tomu vyhnout.

Značka `&lt;br>` by se nikdy neměla používat k visuálnímu odsazování, ale skutečně jen k **zalomení**.

## Odsazení odstavcem

Vytvářením prázdných odstavců jde rychle zvyšovat **svislý odstup** mezi částmi webu.

Dosahuje se toho prázdným odstavcem s **pevnou mezerou** `&amp;nbsp;`:

```
&lt;p>&amp;nbsp;&lt;/p>
```

Občas takový kód leze z [WYSIWYG editorů](/wysiwyg). V praxi je dobré se tomu vyhnout – takové „odsazení“ je do budoucna většinou špatně udržovatelné.

  Obsah.

  &nbsp;

  &nbsp;

  Další obsah odsazený odstavci.