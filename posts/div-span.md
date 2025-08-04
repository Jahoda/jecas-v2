---
title: "HTML div a span"
headline: "HTML značky <code>&lt;div></code> a <code>&lt;span></code>"
description: "Div a span jsou neutrální HTML značky, které se používají k aplikování vzhledu pomocí CSS."
date: "2016-02-01"
last_modification: "2016-02-03"
status: 1
tags: ["HTML", "HTML značky"]
---

Elementy `&lt;div>` a `&lt;span>` jsou hodně zvláštní tím, že na rozdíl od ostatních HTML značek prakticky nemají žádný význam a používají se téměř výhradně pro účely CSS stylování.

Pro účely stylování se těmto značkám přidávají [třídy nebo identifikátory](/id-class).

```
&lt;div class="trida">
  Element stylovaný přes třídu
&lt;/div>
```

Druhé využití je pro obalení skupiny prvků, které potřebují mít stejný atribut (například určení jazyku atributem  [`lang`](/obecne-atributy#lang)) nebo pro manipulaci pomocí [JavaScriptu](/js).

## Rozdíl mezi `&lt;div>` a `&lt;span>`

Jediný rozdíl mezi oběma značkami je v tom, že `&lt;div>` je blokový ([`display: block`](/display#block)) a `&lt;span>` řádkový (`display: inline`).

Před a za značkou `&lt;div>` se tedy zalomí řádek. U `&lt;span>`u nikoliv.

## `&lt;div>`

Název značky je odvozen od anglického *division* = česky oddíl.

Jedná se o blokový element s povinnou počáteční i koncovou značkou. Atributy má pouze [globální](/obecne-atributy).

Protože se pomocí `&lt;div>`ů s oblibou stavěl a staví celý layout stránek, autory HTML specifikací napadlo přidat nové strukturální značky jako jsou `&lt;header>`, `&lt;article>`, `&lt;section>`, `&lt;footer>` a podobně.

    - [Sémantické HTML5 značky](/html-kostra#semanticke-znacky)

Správně by se měly používat místo `&lt;div>`u, kdykoliv to dává smysl. S ohledem na problémy těchto značek ve starších prohlížečích (**IE 8** je neumí stylovat bez použití JS) je k úvaze, jestli přináší tak velkou výhodu, aby mělo smysl je používat místo `&lt;div>`ů.

Psát v CSS místo `.footer` jen `footer` a v HTML `&lt;div class="footer">` nebo `&lt;footer>` není zase takový rozdíl.

## `&lt;span>`

Řádková neutrální značka, která při samotném použití nic nedělá. Například v předchozí větě je každé slovo obalené ve `&lt;span>`u. Jako by nebylo.

Používá se mnohem méně než `&lt;div>` (cca 3× méně). Asi proto, že řádkových značek pro zvýraznění obsahu existuje víc, než je potřeba.

## Sémantika

Protože `&lt;div>` a `&lt;span>` nemají zvláštní sémantický význam, mělo by jejich použití být až poslední možnost, po které tvůrce webu sáhne.

Pomocí stylování není problém celý web sestavit jen z `&lt;div>`ů a `&lt;span>`ů a nahradit tak [nadpisy](/nadpisy), [odstavce](/odstavec) nebo [seznamy](/seznamy).

Někteří začátečníci sahají k tomuto řešení, protože `&lt;div>` a `&lt;span>` mají minimum výchozích CSS pravidel, které tak není nutné přebíjet.

    - [Způsoby CSS resetování](/css-reset)

Není to ale úplně rozumné, protože bez používání odpovídajících HTML značek se z kódu vytratí **čitelnost pro nevisuální zařízení**, jako jsou:

  - roboti některých vyhledávačů,

  - slepí uživatelé odkázaní na hlasové čtečky

I některé velké JS aplikace používají `&lt;div>`/`&lt;span>` místo sémanticky vhodnějších značek. Tam to nemusí vadit, protože požadovaná funkce je zajištěna skriptem, aplikace nepotřebují být indexované vyhledávači a pro přístupnost slouží atributy [`aria`](/aria) a `role`:

    - [Tlačítka na webu: `&lt;div>` nebo `&lt;span>`](/tlacitko#div)

Pro běžné weby ale bývá pohodlnější a snazší volit sémantické značky.