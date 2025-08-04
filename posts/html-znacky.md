---
title: "Druhy HTML značek"
headline: "Různé druhy HTML značek"
description: "Dělení HTML značek podle způsobu jejich otevírání a uzavírání. "
date: "2013-09-28"
last_modification: "2013-09-30"
status: 1
tags: ["HTML", "HTML značky"]
---

## HTML značky

V jazyce HTML mají různé elementy různá pravidla pro zapisování **počátečních a koncových značek**.

### Počáteční i koncová značka povinná

Některé elementy mají **povinnou &lt;počáteční&gt; i &lt;/koncovou&gt; značku**. Například `&lt;div&gt;`, `&lt;span&gt;`, `&lt;b&gt;`, `&lt;h1&gt;` apod.
    Takové značky v případě ručního neukončení teoreticky ukončí až konec dokumentu a validátor bude hlásit chybu. Často se označují jako **značky párové**.

### Koncová značka volitelná

Další kategorie má **povinnou jen značku počáteční** a koncová značka je volitelná. Uzavření elementu se potom **odvodí z kontextu**. Patří sem odstavce (`&lt;p&gt;`), položky seznamů (`&lt;li&gt;`, `&lt;dd&gt;`, `&lt;dt&gt;`), řádky a buňky tabulek (`&lt;tr&gt;`, `&lt;th&gt;`, `&lt;td&gt;`) nebo formulářový prvek `&lt;option&gt;`.
    Vychází se z jednoduchých pravidel, že například v odstavci / položce seznamu / buňcě tabulky nemůže být další odstavec / položka seznamu / buňka tabulky nebo jiný blokový element, takže se před takovou značkou element **automaticky sám ukončí**.
      V následujícím kódu tedy element `&lt;div&gt;` ukončí odstavec.

    ```
&lt;p&gt;Odstavec bude ukončen automaticky.
&lt;div&gt;
&lt;/div&gt;
```

### Zakázaná ukončovací značka

Třetí skupina elementů má **koncovou značku zakázanou**, jde o tagy jako `&lt;img&gt;`, `&lt;input&gt;`, `&lt;br&gt;` nebo `&lt;hr&gt;`. Prohlížeče zpravidla omylem uvedenou *zakázanou* koncovou značku ignorují. Někdy se tyto elementy **označují jako *nepárové***.
  
### Počáteční i koncová značka volitelná

Poslední skupina má **počáteční i koncovou značku volitelnou**. Takové elementy **jsou v kódu povinné**, a nejspíš proto se v případě vynechání vytvoří samy bez přičinění autora webu.

Nic ale nebrání je ručně zapsat.

  Jedná se o značky jako `&lt;html&gt;`, `&lt;head&gt;`, `&lt;body&gt;` nebo `&lt;tbody&gt;`.

Tyto elementy se vytvářejí a ukončují rovněž **na základě kontextu**. Pokud zapíšeme [následující kód](http://kod.djpw.cz/vgc) (v [HTML 5 validní](http://validator.w3.org/check?uri=http%3A%2F%2Fkod.djpw.cz%2Fvgc-&charset=%28detect+automatically%29&doctype=HTML5&group=0)).

    ```
&lt;title&gt;Titulek stránky&lt;/title&gt;
&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;Buňka tabulky.
&lt;/table&gt;
```

    Prohlížeč může postupovat zhruba následovně:

      - Nalezne značku `&lt;title&gt;`, ta ale musí být v elementu `&lt;head&gt;`, takže ho prohlížeč vytvoří. Element `&lt;head&gt;` ale zase musí být v `&lt;html&gt;` → vytvoří se `&lt;html&gt;`.

      - Prohlížeč narazí na `&lt;table&gt;`, tabulka (jakýkoliv obsah) musí být v elementu `&lt;body&gt;` → vytvoří se napřed `&lt;body&gt;`.

      - Element `&lt;tr&gt;` nemůže být jen tak v tabulce, takže prohlížeč vytvoří `&lt;tbody&gt;`.

      - Značka `&lt;/table&gt;` ukončí `&lt;tr&gt;` i `&lt;td&gt;`.

      - Konec dokumentu ukončí `&lt;body&gt;` a `&lt;html&gt;`.

    Lze se o tom přesvědčit ve [vývojářských nástrojích](/vyvojarske-nastroje):

## Význam v praxi

Z neuzavírání nebo neotevírání zbytečných značek reálně **nehrozí žádné risiko**, že by prohlížeč zavření značek špatně domyslel.
  
  Někteří tvůrci webů zastávají přístup:

Všechny značky ukončuji, takže mě nějaké členění na párové, nepárové, povinně nepárové a nepovinné nemusí zajímat.

Problém je, že:

  - Skupinu se **zakázanou ukončovací značkou** je potřeba znát tak jako tak.

  Znalost pravidel ukončování může **předejít nevysvětlitelným chybám**, kdy se nekorektním zanořením ukončí značka jinak, než to vypadá v HTML kódu.
    ```
&lt;p style="color: red"&gt;Odstavec bude červený automaticky.
  &lt;div&gt;
    Obsah oddílu červený nebude, odstavec se ukončí před ním 
    a koncová značka odstavce tak nemá co ukončovat.
  &lt;/div&gt;
&lt;/p&gt;
```

  - Neznalost chování `&lt;tbody&gt;` může zaskočit při zkoumání tabulky ve vývojářských nástrojích. A rozlišování dokumentu na část `&lt;head&gt;` a `&lt;body&gt;` celkem postrádá smysl.

### HTML editory a volitelné značky

Skoro by se dalo říct: **proč psát zbytečné značky**, které si prohlížeč **snadno domyslí**?

Problém je špatná znalost editorů správného chování při uzavírání HTML značek.

Neuzavírání např. odstavců potom třeba selže při odsazování.

```
&lt;p&gt;První odstavec
  &lt;p&gt;Druhý odstavec
    &lt;p&gt;Třetí odstavec
```

Použít funkci pro sbalení „neukončené“ HTML značky nebo si nechat označit obsah „neukončené“ značky asi bude problém.

Kromě toho často přímo **editory umí ukončovat značky tak nějak automaticky**. Například s nástrojem [Emmet](/emmet) (nebo přímo v [Sublime Text](/sublime-text) editoru) nás nějaké ukončování trápit nemusí, protože HTML značky je možné zapisovat jako `znacka` + Tab a *párovost* značky se sama určí.

## Odkazy jinam

  - [Jak funguje HTML](http://atd.havrlant.net/jak-funguje-html)