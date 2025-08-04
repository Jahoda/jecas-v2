---
title: "Nový řádek v HTML a CSS"
headline: "Odřádkování v HTML a CSS"
description: "Jak v HTML, HTML atributu nebo CSS vložit nový řádek."
date: "2015-03-04"
last_modification: "2015-03-08"
status: 1
tags: ["HTML", "CSS", "Rady a nápady"]
---

## Značka `&lt;br>`

Jelikož je běžné odřádkování klávesou Enter v HTML kódu většinou chápáno jako *nějaký bílý znak* **bez zvláštního významu**, pro vynucení nového řádku slouží značka `&lt;br>` (má zakázanou [koncovou značku](/html-znacky#koncova-zakazana)).

```
&lt;p>
  První řádek**&lt;br>**Druhý řádek
&lt;/p>
```

Výjimkou, kdy se na odřádkování a jiné bílé znaky dbá, je použití CSS předpisu `white-space: pre` – takový styl má jako výchozí značka [`&lt;pre>`](/vypis-kodu).

Následující kód se tak zobrazí stejně jako při použití `&lt;br>`. Každá mezera nebo odřádkování hraje svou roli, proto se konec a začátek značky `&lt;p>` musí *nalepit* na obsah.

```
&lt;p 
  style="**white-space: pre**"
*>*První řádek
Druhý řádek*&lt;*/p>
```

Takový postup je lehce riskantní, protože bílé znaky může narušit editor při formátování kódu nebo případná minifikace HTML kódu.

Značka `&lt;br>` by se neměla používat k vytváření odsazení – k tomu slouží CSS vlastnost [`margin`](/margin). Nový řádek jde vytvořit i obalením obsahu do blokového elementu (CSS předpis [`display: block`](/display#block)).

```
&lt;div>První řádek&lt;/div>
&lt;div>Druhý řádek&lt;/div>
```

Elegantnější je ale většinou použít `&lt;br>` a členit textu do odstavců (`&lt;p>`).

## Nový řádek v HTML atributu

V některých případech je potřeba přidat **zalomení řádku** do HTML atributu – nejčastěji do obecného atributu `title`. Existuje více možností.

### Entita `&amp;#10;`

Nejvýhodnější se zdá být entita `&amp;#10;`, která na daném místě vytvoří nový řádek.

```
&lt;span 
  title="První řádek**&amp;#10;**Druhý řádek"
>
  Text
&lt;/span>
```

  Entita `&amp;#10;`

Kromě v atributu funguje toto zalomení i ve značce s nastaveným zachováváním bílých znaků (`white-space: pre`). Místo zalomení řádku v kódu stačí přidat entitu `&amp;#10;` a výsledek je stejný.

### Odřádkování v kódu

Nový řádek v atributu se vytvoří i v případě, že bude odřádkování přímo ve zdrojovém HTML kódu.

```
&lt;span 
  title="První řádek
Druhý řádek"
>
  Text
&lt;/span>
```

  Odřádkování v kódu

### Odřádkování `\n` nefunguje

V programovacích jazycích se často pro nový řádek používá sekvence znaků `\n`. Jelikož se v HTML pro escapování používají [entity s `&amp;` na začátku](/entity), **nebude** tento postup fungovat a `\n` se normálně vypíše.

  Odřádkování pomocí `\n`

## Odřádkování v `&lt;textarea>`

Textová oblast pro psaní textu – [`&lt;textarea>`](/textarea) – má výchozí styl `white-space: pre`, takže se v ní nový řádek vytvoří buď odřádkováním přímo v kódu nebo entitou `&amp;#10;`.

```
&lt;textarea>První řádek
Druhý řádek**&amp;#10;**Třetí řádek&lt;/textarea>
```

### Atribut `placeholder`

U atributu placeholder je postup stejný jako u `&lt;textarea>` – nový řádek v kódu i entita `&amp;#10;`. Zalomení řádku v `placeholder`u ale nefunguje ve staré **Opeře 12** a ani ve **Firefoxu 38**.

    - [Test zalomení obsahu atributu `placehoder`](http://kod.djpw.cz/vglb)

### Počet řádků

Počet řádků v `&lt;textarea>` jde spočítat JavaScriptem:

    - [Počet znaků a slov v textu](/pocet-znaku) – počítání nejen odřádkování v textu

## Zalomení řádku v CSS

V CSS se potřeba vypsání nového řádku týká například vlastnosti [`content`](/content-attr) (při použití přes `:before`/`:after`). Kaskádové styly nepodporují uvnitř hodnoty vlastnosti řádek zalomit a ani HTML entity, takže se na to musí jít jinak. Řešením je řetězec „`\a`“. Zároveň je nutné přidat `white-space: pre`, aby se zalomení vykreslilo.

```
element:before {
  content: 'První řádek **\a** Druhý řádek';
  white-space: pre;
}
```

Tak jde vypsat víceřádkový text do vlastnosti `content`.

    .zalomeny:before {
      content: 'První řádek \a Druhý řádek';
      white-space: pre;
    }