---
title: "Označení termínu/výrazu v HTML"
headline: "HTML definice termínu"
description: "HTML značka <code>&lt;dfn></code> slouží pro vyznačení slovního spojení termínu/výrazu."
date: "2015-06-23"
last_modification: "2015-06-24"
status: 1
tags: ["HTML", "HTML značky"]
---

Používají-li se v textu stránky **odborné termíny** s vysvětlením, existuje pro ně speciální sémantická značka `&lt;dfn>` (název pochází z anglického *definition*).

Jedná se o řádkový element s [povinnou](/html-znacky#povinne) počáteční i koncovou značkou, zpravidla se zobrazuje kursivou ([`font-style: italic`](/font#style)).

Existují různé způsoby, jak se značka `&lt;dfn>` používá.

## Prosté označení termínu

Termín se obalí značkou `&lt;dfn>` a jako jeho definice se bude chápat nejbližší nadřazený odstavec, definiční seznam nebo nějaký z tzv. sekčních elementů (`&lt;article>`, `&lt;aside>`, `&lt;nav>`, `&lt;section>`).

Příklad:

```
&lt;p>
 &lt;**dfn**>Fytopuf&lt;/**dfn**> je něco jako kládoblah, ale trochu měkčí.
&lt;/p>
```

## Vysvětlení termínu v `title`

Další použití počítá s umístěním vysvětlení termínu do obecného HTML atributu `title`.

```
&lt;p>
  Doporučoval bych vytvořit web o 
  &lt;**dfn** title="něco jako kládoblah, ale trochu měkčí">
    fytopufu
  &lt;/**dfn**>.
&lt;/p>
```

Bohužel atribut `title` je problematický u **dotykových zařízení**, kde je problematické ho u elementu **zobrazit**.

Napomoci tomu může špetka JavaScriptu, která `title` odkryje po kliknutí na element a obsah `title` zobrazí v závorce.

    - [Příklad zobrazení obsahu `title` po kliknutí](http://kod.djpw.cz/uwnb)

## Kombinace s `&lt;abbr>`

Značka `&lt;abbr>` z anglického *abbreviation* (česky *zkratka*) slouží k vysvětlení písmen symbolisujících zkratku.

```
&lt;p>
  Učím se používat 
  &lt;abbr title="Hypertext Markup Language">HTML&lt;/abbr>
&lt;/p>
```

Značku `&lt;abbr>` je možné ještě obalit do `&lt;dfn>`. Titulek zkratky se potom bude chápat jako definice.

```
&lt;p>
  Učím se používat 
  &lt;dfn>
    &lt;abbr title="Hypertext Markup Language">HTML&lt;/abbr>
  &lt;/dfn>
&lt;/p>
```

## Odkaz na termín

Termínu lze přiřadit `id` a následně se na něj odkazovat:

```
&lt;p>
  &lt;**dfn** id="*fytopuf*">Fytopuf&lt;/**dfn**> je 
  něco jako kládoblah, ale trochu měkčí.
&lt;/p>
…
&lt;p>
  Doporučoval bych vytvořit web 
  o &lt;a href="#*fytopuf*">fytopufu&lt;/a>.
&lt;/p>
```

## Použití `&lt;dfn>` v praxi

V praxi se element `&lt;dfn>` moc nepoužívá, protože nepřináší pro návštěvníky nějaký významný rozdíl oproti jiným značkám pro zvýraznění.

Teoreticky by mohl pomoci **robotům vyhledávačů** zpracovávajícím obsah stránek pro jeho lepší pochopení.

## Odkazy jinam

  HTML
    Living Standard: [The `dfn` element](https://html.spec.whatwg.org/multipage/semantics.html#the-dfn-element)
  
  - Mírně související: [Accessible Footnotes with CSS](http://www.sitepoint.com/accessible-footnotes-css/) – jak na přístupné poznámky pod čarou