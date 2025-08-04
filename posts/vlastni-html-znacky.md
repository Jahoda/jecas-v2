---
title: "Vlastní HTML značky"
headline: "Vytváření vlastních HTML značek"
description: "Je možné si kromě standardních HTML tagů vytvořit nějaké vlastní?"
date: "2013-08-29"
last_modification: "2017-04-21"
status: 1
tags: ["HTML", "HTML značky", "Hotová řešení"]
---

Prohlížeč v podstatě cokoliv začínajícího `&lt;` a nějakým písmenem považuje za HTML značku.

  Pokud takovou **značku zná a má nějaký speciální význam**, převezme její obsah či atributy a na jejím místě zobrazí nějakou svou *komponentu*.

    Typickým příkladem jsou **formulářové prvky**, například značka [`&lt;input&gt;`](/input), která vykreslí *, nebo třeba [značka `&lt;progress&gt;`](/progress) vykreslí v podporovaných prohlížečích průběh*.

  - Když daná značka žádnou komponentu vykreslovat nemá, což **je většina značek** (např. `&lt;div&gt;`, `&lt;span&gt;`, `&lt;h1&gt;` apod. nebo i **vlastní značky**), **pouze se vypíše obsah** mezi počáteční a koncovou značkou.

Známé značky potom mají v prohlížečích před-připravené CSS styly (zhruba [následující](http://www.w3.org/TR/CSS2/sample.html)), tudíž třeba `&lt;h1&gt;` se zobrazí velkým tučným písmem s odsazením. Nic nám ale nebrání **známé i neznámé značky dále stylovat**.

## Vlastní značka

Zapíšeme HTML:

```
&lt;ctverec barva=modry>&lt;/ctverec>
```

Přidáme trochu CSS:

```
ctverec {display: block; width: 50px; height: 50px}
ctverec[barva=modry] {background: blue}
```

A čtverec zapsaný vlastní značkou je na světě:

    /* pro starší než IE 9 */
    // document.createElement("ctverec");
    var znacky = "ctverec obdelnik kruh";
    znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
  
  ctverec {display: block; width: 50px; height: 50px}
ctverec[barva=modry] {background: blue}

### Co na to specifikace?

HTML specifikace přímo počítá s vytvářením vlastních značek. Aby nedocházelo ke konfliktu s existujícími značkami, mají mít vlastní tagy v názvu `–`.

    - W3C: [Custom elements: valid custom element name](https://www.w3.org/TR/custom-elements/#prod-potentialcustomelementname)

Příklad se značkou `&lt;ctverec>` tedy neodpovídá specifikaci. V praxi nicméně bude fungovat. Jedině hrozí risiko, že někdy v budoucnu vznikne oficiální značka stejného názvu.

### Starší prohlížeče

V IE 8 a starších se normálně neobjeví nic, protože stylovat neznámé značky neumí.

Dá se tomu ale pomoci skriptem:

```
document.createElement("nazev-znacky");
```

Popřípadě *registrování* vlastních značek víc automatisovat.

```
var znacky = "ctverec obdelnik kruh";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
```

## HTML 5 značky

Jako vlastní HTML značky se chovají i [elementy z HTML 5](/html-kostra#semanticke-znacky) jako `&lt;header&gt;`, `&lt;footer&gt;`, `&lt;article&gt;` a podobně, tj. **starší prohlížeče je neznají** a **není možné je stylovat**.

### HTML 5 značky v IE 8 a starších

Stačí použít výše uvedený postup pro vlastní značky i s HTML 5 značkami. A nejspíš skript připojit [podmíněnými komentáři](/podminene-komentare) jen pro IE 8 a starší.

```
&lt;!--[if lte IE 8]>
&lt;script>
var znacky = "article aside audio bb canvas datagrid datalist details dialog eventsource figure figcaption footer header hgroup mark menu meter nav output progress section time video";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
&lt;/script>
&lt;![endif]-->
```

## Používat, nebo ne?

Z důvodu zmíněné nekompatibility se nabízí otázka, zda vlastní HTML značky nebo *neznámé* HTML5 značky používat.

  Z pohledu vývojáře
  Mohou vlastní/HTML5 značky zpřehlednit a zrychlit psaní. Místo `&lt;div class=header&gt;` stačí napsat `&lt;header&gt;`.

  Z pohledu návštěvníka
  Momentálně **nenabízejí vlastní značky téměř nic navíc**, jen vytváří komplikace uživatelům starších Explorerů, ve kterých je celý web s využitím vlastní značek závislý na JavaScriptu, který navíc ještě zdržuje načítání.

## Odkazy jinam

  [HTML5 Shiv](https://github.com/afarkas/html5shiv) 
  Hotové řešení *registrující* HTML 5 značky pro starší prohlížeče řeší i výchozí CSS a jde *hotlinkovat*.

      Hotlinkování se zrovna v tomto případě ukázalo jako nepraktické, protože URL níže přestala fungovat.

      Hromada webů je tak teď kvůli tomu rozbitá v **Internet Exploreru 8**.

    ```
&lt;!--[if IE]>
&lt;script src="http://html5shiv.googlecode.com/svn/trunk/html5.js">&lt;/script>
&lt;![endif]-->
```

    Připojit vzdáleně HTML5 Shiv je možné například z [CDNJS](https://cdnjs.com/libraries/html5shiv/), ale nejbezpečnější s ohledem do budoucna je použít lokální kopii.

  Hudba budoucnosti 

        - [Custom Elements: defining new elements in HTML](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)

        - [A Detailed Introduction To Custom Elements](http://coding.smashingmagazine.com/2014/03/04/introduction-to-custom-elements/)

        - [Custom Elements for Custom Applications](https://hacks.mozilla.org/2014/03/custom-elements-for-custom-applications-web-components-with-mozillas-brick-and-x-tag/)