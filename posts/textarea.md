---
title: "Textarea"
headline: "Textarea"
description: "HTML značka <code>&lt;textarea></code> – jaká jsou její specifika."
date: "2014-06-24"
last_modification: "2014-07-05"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

Pro psaní delších textů na webu:

  - článků,

  - komentářů,

  - diskusních příspěvků,

  - zpráv do chatu

A pro další případy, kdy potřebujeme **více řádků** editovatelného textu, se používá značka `&lt;textarea>` (v překladu textová oblast).

  Obsah

## Atributy

Většinu atributů má `&lt;textarea>` [společných](/input#obecne-atributy) se značkou `&lt;input>`.

Textarea nemá atribut `value`, obsah se zadává mezi počáteční a koncovou značku (počáteční i koncová značka je [povinná](/html-znacky#povinne)).

```
&lt;textarea>
  Obsah
&lt;/textarea>
```

  `name`
  Jméno políčka, podle kterého se dá následně zpracovávat na serveru.
  
  `cols`
  Počet *sloupců*. V podstatě nastavuje šířku pole. Je možné nahradit CSS vlastností `width`.
  
  `rows`
  Počet *řádků*. Stanovuje výšku políčka. Je možné nahradit CSS vlastností [`height`](/height). Někdo tyto atributy důsledně vyplňuje kvůli **zobrazení bez kaskádových stylů**.  
  
  `wrap`
  Atribut `wrap` může nabývat hodnoty `soft` (výchozí) a `hard`. Použití `wrap=hard` spolu s omezením počtu znaků na řádek (atribut `cols`) by mělo zajistit, že v `&lt;textarea>` nemůže vzniknout řádek delší než hodnota v `cols`. Podpora napříč prohlížeči je špatná. Navíc vždy takové ošetření musíme dělat na straně serveru. [Zalamovat slova](/zalamovani-slov) jde i v CSS přes `word-wrap: break-word`.    
  
  `disabled`
  Pole je úplně zablokované. Nejde na něm vyvolat `onclick` a neodešle se na server.  
  
  `autofocus`
  Po načtení stránky dá políčku rovnou `focus` ([ukázka](http://kod.djpw.cz/zbeb)). Osobně takové chování nemám příliš rád, neboť **přesun kursoru** do pole typicky **zablokuje ovládání klávesami**.  
  
  `placeholder`
  Předvyplní políčko hodnotou, která **po aktivování zmizí**. Zároveň se nebude odesílat na server. Detailní popis [atributu `placehodler`](/placeholder) je na samostatné stránce.  
  
  `spellcheck`
  Zapne nebo vypne **kontrolu pravopisu**.   
  
  `maxlength`
  Maximální počet znaků, co lze do políčka napsat.
  
  `required`
  Pole musí být vyplněno.  

## Změna velikosti

Kromě **IE** umí prohlížeče automaticky měnit velikost `&lt;textarea>` přes tažením za okraje. Zakázat to jde CSS vlastností [`resize`](/resize).

## Přístup v JavaScriptu

Aktuální obsah pole se nachází ve vlastnosti `value`.

```
var textarea = document.getElementsByTagName("textarea")[0];
alert(textarea.value);
```

V případě, že je v poli nějaký předvyplněný text, je možné ho získat i přes [`innerHTML`](/innerhtml). Také jde obsah do `innerHTML` nastavit, ovšem po jakékoliv editaci už nebude vidět – **přebije** ho `value`, která se potom i odešle na server.

[Ukázka rozdílů `innerHTML` a `value`](http://kod.djpw.cz/bceb)

Původní hodnota (`value`) v době načtení stránky je dostupná skrz JS vlastnost `defaultValue`.

```
alert(textarea.**defaultValue**);
```

## Formátování

Textarea jde docela dobře stylovat ([ukázka](http://kod.djpw.cz/fceb)).

Častým přáním je v ní odlišně zvýrazňovat jednotlivá slova. To běžně možné není. Je nutné použít [element s `contenteditable`](/vlastni-wysiwyg).

## Výchozí posuvník v IE

V **Internet Exploreru** má `&lt;textarea>` automaticky svislý posuvník. Zbavit se ho můžeme nastavení `overflow: auto`. [Ukázka](http://kod.djpw.cz/cceb).

## Počet znaků a slov

Jak počítat [počty znaků a slov](/pocet-znaku) je popsáno na samostatné stránce.

## Neinterpretování HTML značek

Zvláštní vlastnost textového pole tkví v jisté podobnosti se značkou `&lt;xmp>`. Do `&lt;textarea>` je totiž možné stejně tak vepsat prakticky libovolné HTML bez převádění na entity, aniž by se provedlo.

    # Nadpis

    Odstavec.

Jediný problém je další `&lt;textarea>`, přesněji řečeno její koncová značka. [Ukázka `&lt;textarea>`](http://kod.djpw.cz/dceb) / [ukázka značky `&lt;xmp>`](http://kod.djpw.cz/eceb).

Někdy se `&lt;textarea>` také používá pro [pohodlné označování textu](/oznaceni-textu).