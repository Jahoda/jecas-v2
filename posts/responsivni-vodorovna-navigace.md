---
title: "Responsivní navigace s neznámou šířkou"
headline: "Responsivní navigace s neznámým počtem položek"
description: "Jak vytvořit lepší horisontální responsivní navigaci, než je pouhé skrývání položek do tlačítka."
date: "2013-12-15"
last_modification: "2013-12-15"
status: 0
tags: []
---

V případě, že má **vodorovná navigace** sestávat z **neznámého počtu položek s neznámou šířkou**, je trochu oříšek vymyslet dobré řešení.

První možnost je počítat při návrhu vzhledu se situací proměnlivého počtu položek a navigaci plánovat jako **víceřádkovou**.

Další způsob je při určité šířce (kdy už se navigace nevejde do jednoho řádku) skrýt menu do tlačítka, pod tzv. *hamburger ikonu*.

    - [Responsivní menu](/responsivni-menu) – skrytí navigace do tlačítka

Nevýhoda tohoto postupu se projeví u navigací, kde mají různé položky **různou důležitost** – v takové situaci by bylo lepší skrýt jen méně důležitý obsah a ten důležitější nechat rovnou viditelný (stranou ponechám námitku, jestli méně důležitý obsah má v navigaci vůbec být).

Následující obrázek ilustruje, co se stane při **zmenšení dostupné šířky**.

V momentě, kdy se nejméně podstatná položka vpravo už nevejde do prostoru, zmizí a místo ní se zobrazí šipka (nebo cokoliv jiného), co další nabídku dokáže zobrazit/skrýt.

## Technické řešení

Uvést myšlenku do praxe jde několika způsoby:

  - Počítat JavaScriptem **šířku jednotlivých položek** a ty, co se nevejdou, v [DOMu](/dom) přesunout do odkrývatelné podnabídky.

  - Využít přirozeného chování CSS, kdy se položky řadí pod sebe, a pouze **omezit výšku na jeden řádek**. Změna výšky z jednoho řádku na neomezenou zajistí odkrývání/skrývání.

## Posuvník

Asi nejsnazší řešení je nastavit menu na jeden řádek zakázáním zalamování (`white-space: nowrap`), nastavit `max-width` na 100 % a přidat volitelný posuvník konstrukcí `overflow: auto`.

V případě, že se všechny položky na obrazovku nevejdou, se zobrazí posuvník.

Na desktopu systémový posuvník nemusí vypadat úplně esteticky. Pokud se ale na desktop / nedotyková zařízení většinou vejdou všechny položky, nemusí to vadit, protože na tabletech a mobilech už velký posuvník obvykle nebývá.

### Znázornění posouvání

Toto řešení má menší problém v tom, že na dotykových zařízeních kvůli absenci posuvníku nemusí být jasné, že má menu další položky.

[Živá ukázka](http://kod.djpw.cz/djdc)

### Omezení výšky

- [Živá ukázka](http://kod.djpw.cz/hxnb) – přeskupování položek

- [Živá ukázka](http://kod.djpw.cz/xnqb) – zobrazení *Více*, jen když je potřeba

### Počítání šířky skriptem

- [Živá ukázka](http://kod.djpw.cz/rxnb) – zobrazení další položek dole

### Řešení v jQuery

- [Živá ukázka](http://kod.djpw.cz/tkob)

## Odkazy jinam

  - [CSS only priority navigation](http://codepen.io/olach/pen/adeMzP/) – řešení pouze v CSS [ukázka](http://kod.djpw.cz/wjwb)

  - [Challenges &amp; Solutions for Your Responsive Navigation](http://blog.teamtreehouse.com/challenges-solutions-responsive-navigation)

#