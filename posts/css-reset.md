---
title: "CSS resetování"
headline: "Způsoby CSS resetování"
description: "Používat CSS reset, nebo ne? Jaká jsou pro a proti."
date: "2013-10-21"
last_modification: "2015-06-02"
status: 1
tags: ["CSS", "Frameworky", "Rady a nápady"]
---

Pro známé HTML elementy (na rozdíl od [neznámých](/vlastni-html-znacky)) mají prohlížeče své výchozí CSS předpisy.

## Příklad výchozích hodnot

Různé prohlížeče mají trochu odlišné výchozí CSS.

    - **Firefox**: [Výchozí CSS předpisy](http://hg.mozilla.org/mozilla-central/file/tip/layout/style/html.css)
    
    - **Webkit**: [Výchozí CSS](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css)
    
    - **Internet Explorer**: [Přehled výchozích CSS pravidel různých IE](http://www.iecss.com/)
    
    - W3C: [Default style sheet for HTML 4](http://www.w3.org/TR/CSS2/sample.html)

Následující obsah CSS pravidel pochází z W3C specifikace:

```
html, address, blockquote,
body, dd, div, dl, dt, fieldset, form,
frame, frameset, h1, h2, h3, h4, h5, h6, 
noframes, ol, p, ul, center,
dir, hr, menu, pre   { display: block; unicode-bidi: embed }
li              { display: list-item }
head            { display: none }
table           { display: table }
tr              { display: table-row }
thead           { display: table-header-group }
tbody           { display: table-row-group }
tfoot           { display: table-footer-group }
col             { display: table-column }
colgroup        { display: table-column-group }
td, th          { display: table-cell }
caption         { display: table-caption }
th              { font-weight: bolder; text-align: center }
caption         { text-align: center }
body            { margin: 8px }
h1              { font-size: 2em; margin: .67em 0 }
h2              { font-size: 1.5em; margin: .75em 0 }
h3              { font-size: 1.17em; margin: .83em 0 }
h4, p, blockquote, ul, 
fieldset, form, 
ol, dl, dir,
menu            { margin: 1.12em 0 }
h5              { font-size: .83em; margin: 1.5em 0 }
h6              { font-size: .75em; margin: 1.67em 0 }
h1, h2, h3, h4,
h5, h6, b,
strong          { font-weight: bolder }
blockquote      { margin-left: 40px; margin-right: 40px }
i, cite, em,
var, address    { font-style: italic }
pre, tt, code,
kbd, samp       { font-family: monospace }
pre             { white-space: pre }
button, textarea,
input, select   { display: inline-block }
big             { font-size: 1.17em }
small, sub, sup { font-size: .83em }
sub             { vertical-align: sub }
sup             { vertical-align: super }
table           { border-spacing: 2px; }
thead, tbody,
tfoot           { vertical-align: middle }
td, th, tr      { vertical-align: inherit }
s, strike, del  { text-decoration: line-through }
hr              { border: 1px inset }
ol, ul, dir,
menu, dd        { margin-left: 40px }
ol              { list-style-type: decimal }
ol ul, ul ol,
ul ul, ol ol    { margin-top: 0; margin-bottom: 0 }
u, ins          { text-decoration: underline }
br:before       { content: "\A"; white-space: pre-line }
center          { text-align: center }
:link, :visited { text-decoration: underline }
:focus          { outline: thin dotted invert }

@media print {
  h1            { page-break-before: always }
  h1, h2, h3,
  h4, h5, h6    { page-break-after: avoid }
  ul, ol, dl    { page-break-before: avoid }
}

```

## Proč resetovat?

Cílem CSS resetu je **sjednotit výchozí pravidla napříč prohlížeči**, protože různé prohlížeče mohou mít trochu jiné výchozí hodnoty. Nebo nastavit nějaký **jednotný základní vzhled**.

Ohledně *CSS resetování* jsou čtyři možnosti:

  - všechno **vynulovat**,

  - sjednotit **odlišné vlastnosti**,

  - přednastavit nějaké **universální hodnoty**,

  - **neresetovat**.

## Hvězdičkový reset

```
* {
  margin: 0; 
  padding: 0
}
```

Jelikož hlavní rozdíly bývaly v hodnotách [`margin`](/margin) a `padding`, výše uvedený předpis je všem elementům sjednotí tím, že je vynuluje. A to, co se týče délky zápisu CSS pravidel, velmi stručně.

Kromě toho se tento postup může **hodit CSS začátečníkům**, kteří ještě pořádně neví, jaké **výchozí hodnoty daný element má**. Vyresetováním všeho mají jistotu, že se projeví jen vlastnoručně přidané `margin`y a `padding`y.

Dále je na první pohled na stránce patrné, které elementy je **ještě potřeba nastylovat**. **Nevýhodný** je naopak fakt, že **zapomenuté elementy** budou **špatně vypadat** – lepší výchozí hodnoty než žádné.

Hrozba [nenávratného rozhození formulářů](/css-reset-formularu) už není v dnešní době **moc reálná** (pokud se neresetuje i `border` nebo `background`, což [rozhodí systémový vzhled](/vzhled-formularu) formulářových prvků).

## Konkrétní reset / normalisace

Kromě resetování úplně všeho je možnost pečlivě vyjmenovat elementy s různými styly a ty **sjednotit napříč prohlížeči**.

To dělá třeba [normalize.css](http://necolas.github.io/normalize.css/). **Výhoda je**, že elementy, u kterých by se **dalo smířit s výchozím vzhledem**, není třeba po vynulování zvnovu deklarovat. **Nevýhodné** je pravděpodobné zanášení CSS spoustou **předpisů, které se na stránce nevyužijí** a obecně používání CSS, které není 100% pod kontrolou.

## Sjednocení universálními hodnotami

Další způsob je před psaním samotných CSS pravidel připojit CSS přepisy **sjednocují hodnoty ve všech prohlížečích** nastavením na nějaké **použitelné hodnoty**.

Existují hotová řešení (bývají součástní CSS frameworků – [Semantic UI](/semantic-ui), [Kraken](/kraken) nebo [Bootstrap](http://twitter.github.io/bootstrap/)), jejichž použitím se získá **shodný vzhled napříč prohlížeči** a většinou i v nějaké **hezčí podobě**, než bývají výchozí CSS.

Nevýhody jsou **znečištění CSS** spoustou zbytečného kódu, který se buď nepoužije, nebo stejně následně **přepíše**. Kromě toho podobně jako u *čistého CSS* je vhodné znát **výchozí hodnoty** daného frameworku, když je **bude potřeba přepisovat**.

## Neresetovat

Nakonec je i řešení nic předem neresetovat a rovnou **psát vlastní CSS pravidla**. Jak bylo naznačeno, hodí se k tomu **znalost výchozích hodnot** (nebo větší trpělivost při ladění v různých prohlížečích).

## Shrnutí

Těžko **obecně určit nejlepší postup**. Volba by měla záviset na konkrétním použití.

  - Vyhovuje-li výchozí **styl nějakého FW**, nemá většinou smysl **vynalézat kolo**, ale je vhodné framework použít.

  - Naopak v případě, že cílový vzhled frameworku vůbec **neodpovídá** potřebnému vzhledu, moc se jeho použitím nezíská a jen uživatelé budou muset stahovat **zbytečná data navíc**. Kromě toho se snadno **zapomene na přestylování** obsahu ladícího k frameworku, ale neladícího k webu.

  - Je třeba zvážit, zda [normalisace](#normalisace) neřeší jen nepoužité elementy nebo sjednocuje jen elementy, **co by se stejně přestylovaly** — typicky třeba velikost a odsazení nadpisů, často i seznamy nebo formuláře. Podobně u [hvězdičkového resetu](/css-reset#hvezdickovy) je teoreticky zbytečné elementy *vynulovat*, když se stejně vlastní hodnoty **později přepíší vlastními**.

## Odkazy jinam

  - Six Revisions: [The Best CSS Reset Stylesheets](http://sixrevisions.com/css/css-reset-stylesheets/) – seznam různých CSS resetů