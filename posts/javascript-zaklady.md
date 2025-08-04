---
title: "Základy JavaScriptu"
headline: "Základy JavaScriptu"
description: "Jak a proč používat JavaScript na HTML stránkách."
date: "2016-02-04"
last_modification: "2016-02-04"
status: 0
tags: []
---

JavaScript (zkratka JS) je programovací jazyk používaný k rozšíření funkčnosti webů. Běží v prohlížeči návštěvníka. Zjednodušeně řečeno slouží k modifikaci HTML a CSS, která proběhne po vyvolání uživatelské akce.

  Klikněte zde

V JS jde psát i aplikace běžící na serveru, tím se ale tento přehled nezaobírá.

## Připojení JS

Aby se mohlo začít skriptovat, musí se JS nějakým způsobem dostat do HTML stránky.

Způsoby připojení JavaScriptu jsou velmi podobné [připojování CSS](/css-zaklady#pripojeni):

### Značka `&lt;script>`

Pro umístění JS kódu přímo do HTML stránky existuje element `&lt;script>`:

```
&lt;p>
  Obsah stránky.
&lt;/p>
**&lt;script>**
  alert("Hláška z JS");
&lt;/script>
```

Uvedený kód se spustí v momentě, kdy na něj prohlížeč při načítání narazí. V případě, že JS manipuluje s HTML prvky na stránce, je pořadí vložení JS kódu naprosto klíčové.

#### Atribut type

Často je možné se setkat se zápisem:

```
&lt;script **type**="text/javascript">
```

Tento atribut je zbytečné uvádět, protože `text/javascript` je výchozí typ.

Při vymyšlení si vlastní hodnoty atributu `type` se bude obsah uvnitř ignorovat. Někdy se toho využívá pro HTML šablony v JavaScriptu, protože obsah `&lt;script>`u s neexistujícím `type` je skriptem přístupný.

#### Atribut `language`

V hodně starých stránkách může být `&lt;script>` uveden s atributem `language`.

```
&lt;script **language**="javascript">
```

Pochází to z doby, kdy nebylo jasné, jaký jazyk se pro skriptování bude používat. Jelikož převládl JavaScript, není tento atribut k ničemu potřebný.

### Připojení externího `*.js`

Větší nebo na více stránkách používané skripty se obvykle vyčleňují do zvláštního souboru s příponou `*.js`.

Pro připojení externího JS se používá rovněž značka `&lt;script>`, tentokrát ale s atributem `src` pro uvedení cesty k souboru.

```
&lt;script **src**="skript.js">&lt;/script>
```

Při uvedení adresy skriptu už **není možné** umístit další JS kód dovnitř značky `&lt;script>`. Následující kód je **chybný**:

```
&lt;script src="skript.js">
  alert("Tady nic být nemůže");
&lt;/script>
```

### HTML atribut

Vzhledem k tomu, že se JS používá hodně často k obsluze různých událostí (například kliknutí na tlačítko), jde kód zapsat do HTML atributu příslušné události.

```
&lt;button **onclick**="*alert('Hláška v JS')*">
  Tlačítko
&lt;/button>
```

Psaní JS do HTML atributu není moc pohodlné. Jednak kvůli nedostatku [uvozovek](/uvozovky) (hned se vyplácají na obalení hodnoty atributu), potom kvůli nižší přehlednosti (většina editorů neumí u JS v atributu zvýrazňovat syntaxi) a nakonec je v takovém případě JS kód roztroušen všude možně po dokumentu.

HTML atributy se proto pro JS vůbec nepoužívají nebo se do nich uvádí jen malé množství kódu (například volání funkce).

## Umí JS víc než HTML/CSS?

JavaScript používaný „na straně klienta“ (běžící v prohlížeči uživatele) je v podstatě odkázaný na schopnost HTML/CSS.

  Sám o sobě JS v podstatě nic neumí.

Výstupem JavaScriptu je tak HTML/CSS, tedy dokáže pouze to, co dokáže HTML/CSS.

## Manipulace s HTML/CSS

Nejčastěji se JS používá pro změny HTML nebo CSS.