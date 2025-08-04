---
title: "Markdown"
headline: "Markdown"
description: "Markdown slouží k formátování textu. Výhody a nevýhody, popis syntaxe."
date: "2015-02-05"
last_modification: "2016-04-20"
status: 1
tags: ["Produktivita"]
---

Při vytváření obsahu na internetu se zpravidla hodí nějaké formátování obsahu. Od vytváření odstavců – přes **tučný** a *šikmý* text – až po [odkazy](/odkaz), [seznamy](/seznamy), [obrázky](/obrazky) a vlastní bloky.

V závislosti na tom, jestli se jedná o komentář na [Facebooku](/facebook), diskusní příspěvek nebo třeba článek na blogu, se potom hodí různé způsoby, *jak psát obsah*.

## Syntaxe Markdownu

[Markdown](http://daringfireball.net/projects/markdown/) je ve formátování specifický tím, že nepoužívá otevírací/uzavírací značky jako HTML nebo [BB Code](/bb-code), ale zvláštní řídicí znaky.

Myšlenka MD (Markdownu) je v tom, aby v něm zapsaný obsah jakž takž rozumně vypadal i v naprosto hloupém editoru, který zvládá jen prostý text (například prvek [`&lt;textarea>`](/textarea) na webových stránkách nebo poznámkový blok ve [Windows](/windows)).

### Příklad v Markdownu

```
# Nadpis nejvyšší úrovně
Odstavec s **tučným** a *šikmým textem*
1. číslovaný seznam
2. s několika
2. položkami

## Podnadpis `&lt;h2>`
Zdrojový kód může být `v řádku` nebo jako blok:

  Výpis zdrojového kódu.
> Bloková citace
- nečíslovaný
- seznam

Odstavec s odkazem na [web jecas.cz](http://jecas.cz).

A nakonec obrázek:

![alternativní text](http://jecas.cz/images/jecas.png)
```

Výše uvedený obsah se v HTML zobrazí následovně:

[Ukázka](http://kod.djpw.cz/ymvb)

## Poznámky k MD syntaxi

    U **číslovaného seznamu** není nutné, aby byly položky v pořadí 1, 2, 3. Klidně jde všude uvést jedničky a vše se řádně převede:

    ```
1. položka
1. druhá položka
1. třetí položka
```

    **Řádkový `kód`** se značí zpětným lomítkem ``` (anglicky *backtick* nebo *backquote*).

    Na [české klávesnici](/ceska-klavesnice) je trochu problém tento znak zapsat. Je potřeba použít klávesovou zkratku Pravý Alt + ý.

    **Blokový kód** stačí odsadit tabulátorem nebo 4 mezerami a vynechat před ním jeden řádek.

    Při zvýrazňování syntaxe se častěji používá zápis s třemi zpětnými uvozovkami ````` a určením názvu jazyku:

    ```
```javascript
var s = "Obarvený JS kód";
alert(s);
```
```

    Uvnitř (ne)číslovaných seznamů jde **vytvářet odstavce** (pomocí vynechání řádku a odsazení):

    ```
- První odstavec v seznamu
    
    Druhý odstavec v seznamu
```

    Markdown se může **kombinovat s HTML**. Výjimkou je odsazení (zdrojový kód), kdy se HTML kód převede na [entity](/entity), aby se neinterpretoval.

    Odkazy na stránky, obrázky a jiné soubory jde alternativně zapisovat pomocí odkazů:

    ```
Odstavec a odkaz na [web jecas.cz][2] a odkaz na [diskusi][1].
```

    Cíle odkazů jdou potom nadefinovat třeba na konci souboru:

    ```
[1]: http://diskuse.jakpsatweb.cz
[2]: http://jecas.cz
```

    Kromě číselných identifikátorů jde používat stejným způsobem i řetězce (nezáleží na velikosti písmen).

## Výhody a nevýhody

Hlavní nevýhoda je v nutnosti se učit nový *jazyk*.

Pro běžné uživatele je nejspíš vhodnější visuální [WYSIWYG](/wysiwyg) editor. Pro člověka znalého HTML není potom problém s dobrým editorem psát přímo v HTML.

Syntaxe MD nemá jasná obecná pravidla jako HTML nebo BB kód, kde je jasně stanovená značka a atribut, ale různé prvky se řeší odlišným způsobem.

### Omezení

Má-li si člověk vystačit pouze s Markdown syntaxí, relativně brzo narazí na **omezení v bohatosti syntaxe**.

Například obyčejné vytvoření [HTML tabulky](/html-tabulky) nebo vlastního bloku (elementu [`&lt;div>`](/div-span#div) s vlastní třídou) není v základní implementaci Markdownu možné.

Identifikátory nadpisů sice MD vytváří automaticky, nastavit vlastní ID ale moc elegantní není:

```
# &lt;a name="identifikator">&lt;/a>Nadpis
```

Stejně tak vytvoření [popisku k obrázku](/popis-obrazku), které by se dalo řešit třeba pomocí značek `&lt;figure>` a `&lt;figcaption>` nejde v základní MD syntaxi nějak rozumně vyřešit.

Psát v MD **celé HTML stránky** je tak značně komplikované.

Na druhou stranu omezení se na základní věci má i svoje výhody, protože vlastní bloky jsou oproti standardním HTML prvkům náchylné na problémy při redesignu.

Kvůli omezením Markdownu tak vznikne celkem universální kód.

### Výhody

Díky **rozšířenosti** je Markdown vhodný formát pro jednoduché formátování textu dobře přenositelné mezi různými aplikacemi.

Při **psaní v hloupém editoru** je MD přehlednější a nejspíš i pohodlněji zapisovatelný než HTML nebo BB kód. Při použití editoru se zvýrazňováním syntaxe, [Emmetem](/emmet), snippety a klávesovými zkratkami se ale rozdíly mezi MD a HTML dost stírají.

Výstupem z textu zapsaného v Markdownu je validní HTML. V případě používání HTML je obvykle nutné provádět [opravení/ošetření HTML kódu](/vycisteni-kodu).

## Implementace

Při používání MD na webu jsou dvě možnosti:

  - Zpracovávat Markdown na straně serveru (např. v [PHP](/php)).

  - Převádět syntaxi přímo v prohlížeči [JavaScriptem](/js).

### PHP

Nástroje pro formátování Markdownem v PHP:

    - [Parsedown](http://parsedown.org/) – rychlejší MD v PHP

    - [PHP Markdown Extra](https://michelf.ca/projects/php-markdown/extra/) – Markdown s více možnostmi (vlastní bloky apod.)

### MD v JavaScriptu

Převádění v JS na straně klienta se hodí spíš pro živý náhled, protože umožnit uživatelům, aby do DB vkládali HTML kód většinou není moc bezpečné.

Pro JavaScript se nejčastěji používá knihovna marked:

    - [marked](https://github.com/chjj/marked) – knihovna pro převod MD → HTML pro použití u klienta i na serveru

[Živá ukázka](http://kod.djpw.cz/zpvb) – jednoduchý editor převádějící Markdown do HTML

## Editory

Existuje mnoho editorů podporující Markdown. Existují i pluginy do offline editorů – třeba pro [Sublime Text](/st).

Lepší editory dokáží prvky v Markdownu visuálně odlišovat nebo nabízet rovnou výsledný náhled. Pro pohodlnější psaní jsou hodně užitečné klávesové zkratky.

    - [Dillinger](http://dillinger.io/) – online editor pro psaní v MD

    - [Stackedit](https://stackedit.io/editor) – online editor

      - Sitepoint: [The Best Markdown Editor for Windows](http://www.sitepoint.com/best-markdown-editors-windows/) – desktopové aplikace pro [Windows](/windows)

## Texy!

Existuje více nástrojů pro relativně pohodlné psaní v plaintextu převoditelného do HTML.

Jedním z nich je [Texy!](https://texy.info/cs/) od **Davida Grudla**, které používá trochu jinou syntaxi než MD.

V Texy! je možné používat vlastní bloky, dokáže zajistit české typografické úpravy, ale není tolik rozšířeno jako Markdown.

    V MD jde i **vytvářet tabulky**. Používá se tím znak `|` (na české klávesnici Pravý Alt + W).

-->