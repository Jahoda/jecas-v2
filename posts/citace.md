---
title: "Citace v HTML"
headline: "Citace v HTML"
description: "Jaké značky se v HTML používají pro označení citovaného textu."
date: "2015-07-07"
last_modification: "2015-07-10"
status: 1
tags: ["HTML", "HTML značky"]
---

Čas od času je vhodné na webu **citovat kus cizího obsahu** (případně citovat sám sebe).

Když se do stránky hodí přidat kus obsahu ze stránky jiné, je někdy **problematické použít prostý odkaz**:

  - odkazem nemusí jít **přesně zaměřit** kýžená část textu,

  - odkaz na jinou stránku by zbytečně **odváděl pozornost** od čtení původní stránky,

  - není jisté, jestli cíl odkazu **vydrží delší dobu** (to není jisté v podstatě nikdy),

  - je žádoucí v textu provést **vlastní úpravy/zvýraznění**,

  - není kam odkázat, protože obsah například **přišel e-mailem** / kontaktním formulářem

Minimálně z těchto důvodů se citace používá.

## Bloková citace `&lt;blockquote>`

Pro citování **většího množství obsahu** slouží element `&lt;blockquote>`. Je blokový s povinnou počáteční i uzavírací značkou. Ve [výchozím stylu](/css-reset#vychozi) prohlížečů má nastaven [`margin`](/margin) přibližně takto:

```
blockquote {
  margin-top: 1.12em;
  margin-right: 40px;
  margin-bottom: 1.12em;
  margin-left: 40px;
}
```

Teoreticky pomocí něj jde citovat i úplně celou stránku, takže může obsahovat prakticky libovolné značky, včetně dalšího `&lt;blockquote>`.

  Citovaný obsah
    
      Citace v odstavci druhé úrovně

Kvůli jednotnosti odsazení mezi citacemi s jedním a více odstavců je dobré používat uvnitř `&lt;blockquote>` ještě značku `&lt;p>`.

### Zdroj citace, atribut `cite`

Značka `&lt;blockquote>` má speciální atribut `cite` pro uvedení zdroje.

```
&lt;blockquote **cite**="http://example.com">
  &lt;p>Citovaný text&lt;/p>
&lt;/blockquote>
```

Vtip je v tom, že tento zdroj se návštěvníkům **nikde nezobrazuje**. Nezbývá tedy než odkaz na zdroj přidat ručně pomocí běžného odkazu.

### Viditelné uvedení zdroje

```
&lt;blockquote cite="**http://example.com**">
  &lt;p>Citovaný text&lt;/p>
  &lt;p>
    — &lt;a href="**http://example.com**">Example.com&lt;/a>
  &lt;/p>
&lt;/blockquote>
```

Výše uvedený zápis ale není úplně v souladu se specifikací značky `&lt;blockquote>`, která tvrdí, že uvnitř má být jen citovaný obsah, což uvedení zdroje jaksi není.

HTML kód citace by měl být ideálně navržen tak, aby šlo strojově určit, co je citace a co už ne.

Kromě ignorování specifikace existují následující způsoby:

#### Zdroj mimo `&lt;blockquote>`

```
&lt;blockquote cite=">http://example.com">
  &lt;p>Citovaný text&lt;/p>
&lt;/blockquote>
**&lt;p>**
— &lt;a href="http://example.com">Example.com&lt;/a>
**&lt;/p>**
```

Tento kód bude pro pohodlnější stylování nejspíš ještě vhodné obalit elementem `&lt;div>`.

#### Značky `&lt;figure>` a `&lt;figcaption>`

HTML 5 značky, které slouží k *popisování objektu* a hodí se i třeba k [popisu obrázku](/popis-obrazku#figure).

```
&lt;figure>
  &lt;blockquote cite="http://example.com">
    &lt;p>Citovaný text&lt;/p>
  &lt;/blockquote>
  **&lt;figcaption>**
  — &lt;a href="http://example.com">Example.com&lt;/a>
  **&lt;/figcaption>**
&lt;/figure>
```

#### Značka `&lt;footer>`

Pro odlišení obsahu citace a uvedení zdroje jde použít i značku `&lt;footer>`.

```
&lt;blockquote cite="http://example.com">
  &lt;p>Citovaný text&lt;/p>
  **&lt;footer>**
    — &lt;a href="http://example.com">Example.com&lt;/a>
  **&lt;/footer>**
&lt;/blockquote>
```

#### Značka `&lt;small>`

Pro obalení autora/zdroje citace by možná mohla posloužit i značka `&lt;small>`.

```
&lt;blockquote cite="http://example.com">
  &lt;p>Citovaný text&lt;/p>
  **&lt;small>**
    — &lt;a href="http://example.com">Example.com&lt;/a>
  **&lt;/small>**
&lt;/blockquote>
```

Příklady s `&lt;footer>` a `&lt;small>` jsou potenciálně risikové v případě, že by tyto značky **obsahovala samotná citace**. To je nejspíš ale minimum případů.

## Řádková citace `&lt;q>`

Stejný význam jako bloková citace `&lt;blockquote>`, jen v řádkovém provedení.

Rovněž značka `&lt;q>` má atribut `cite` pro (neviditelné) uvedení zdroje.

Zajímavé chování ve výchozím CSS je automatické **přidání uvozovek** před a po.

  Obyčejný text v odstavci, následuje citace: Obsah citace

Změnit styl uvozovek jde pomocí pseudo-elementů [`:before`/`:after`](/css-selektory#before-after).

    .jine-uvozovky q:before {
      content: "„";
    }
    .jine-uvozovky q:after {
      content: "“";
    }    
  
  Citace: Obsah citace s českými uvozovkami

Případně uvozovky **úplně zrušit**:

```
q:before, q:after {
  content: "";
}
```

Pro důmyslnější nastavování uvozovek pomocí CSS vlastnosti `content` existuje vlastnost [`quotes`](/quotes) funkční od **Internet Exploreru 8**.

## Název/jméno `&lt;cite>`

Nakonec existuje značka `&lt;cite>`, která slouží k označení nějakého díla (názvu knihy, filmu, článku, básně, písně, divadelní hry, počítačové hry, počítačového programu, právní nebo technické normy a podobně).

Značka `&lt;cite>` podle nejnovějšího návrhu HTML specifikace **neslouží k vyznačení jména** autora.

  A person's name is not the title of a work — even if people call that person a piece of work — and the element (`cite`) must therefore not be used to mark up people's names.

  HTML Living Standard: [The `cite` element](https://html.spec.whatwg.org/multipage/semantics.html#the-cite-element)

Starší zdroje občas uvádí použití `&lt;cite>` právě i pro označení jmen nebo dokonce pro označení citovaného textu. Podle aktuální specifikace by se to ale dělat nemělo.

### Zobrazení

Výchozí zobrazení je řádkové a kursivou (`[font-style](/font#style): italic`).

  Přečetl jsem knihu Fytopuf a kládoblah.

### URL v `&lt;cite>`

Docela zajímavě používají element `&lt;cite>` vyhledávače [Google](/google) a [Bing](/bing). Dávají do něj adresu zobrazeného webu ve výsledcích hledání.

Je tedy otázka, jestli jedna z motivací není ušetření pár znaků v HTML kódu…

## Styl citace

Na webových stránkách je docela populární uvádět **názory zákazníků nebo uživatelů** nějakou visuálně zajímavější formou. Včetně například obrázků citovaných.

Mohlo by to vypadat třeba takto:

[Živá ukázka](http://kod.djpw.cz/mcob)

## Odkazy jinam

  - HTML5 Doctor: [Quoting and citing with `&lt;blockquote&gt;`, `&lt;q&gt;`, `&lt;cite&gt;`, and the cite attribute](http://html5doctor.com/blockquote-q-cite/)

  - HTML5 Doctor: [cite and blockquote – reloaded](http://html5doctor.com/blockquote-q-cite/)

  - Semantika.name: [Citace a zkratky](http://semantika.name/citace-zkratky.html)

  - Jak psát web: [Blockquote](http://www.jakpsatweb.cz/html/bloky.html#blockquote) – pohled do historie