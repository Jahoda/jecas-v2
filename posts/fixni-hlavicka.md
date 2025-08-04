---
title: "Proč nepoužívat fixní hlavičku"
headline: "Proč nepoužívat fixní hlavičku"
description: "Proč se vyhnout fixování záhlaví/menu k hornímu okraji obrazovky."
date: "2015-08-22"
last_modification: "2015-08-22"
status: 0
tags: ["Responsivní design", "Fixní posice"]
---

Některé weby při odrolování **zafixují navigaci** k hornímu okraji. Jde to zajistit trochou JavaScriptu:

    - [Fixní menu při rolování](/fixni-menu) – jak při odrolování stránky zafixovat menu na horní hraně obrazovky

## Zmenšení prostoru

Zásadní problém zafixované vodorovné navigace tkví v **omezení dostupného prostoru** pro obsah.

Mohlo by se zdát, že je to problém jen mobilních zařízení s **malou obrazovkou**, ale ani monitory a displeje desktopů nebo notebooků nemají výšku na rozdávání, protože je většina **širokoúhlých**.

Jedno z nejvíce rozšířených rozlišení **1366 × 768** (pohybuje se někde kolem 20 %) má výšku podobně malou jako větší mobily při orientaci *portrait* (na výšku).

Navíc na desktopu ze svislého prostoru ubere místo:

  - Hlavní systémová lišta (cca **40 px**).

  - Záhlaví prohlížeče (cca **60 px**).

  - Lišta záložek, kterou někdo používá (cca **30 px**).

  - Někteří uživatelé používají ještě další vlastní lišty.

Nakonec tak zbude pro samotný obsah webu něco přes 600 pixelů na výšku, což není mnoho.

Výška fixní hlavičky může mít třeba **30 pixelů**, což znamená, že bude neustále **užírat cca 5 % dostupného místa**.

Asi nejextrémnější situace nastává u mobilních telefonů při zobrazení webu na šířku. V tomto případě fixní hlavička zabere klidně 1/5 prostoru.

## Proč fixní

Při aplikaci zafixované hlavičky (nebo jiného fixního obsahu) je tak vhodné mít **dobrý důvod**, proč to udělat.

  Dobrým důvodem není, že to vypadá *cool* a mají to na nějakém jiném webu.

Prostor, který je neustále viditelný a snižuje tak dostupné místo pro ostatní obsah, by **měl obsahovat něco hodně důležitého**. Je k úvaze, jestli je běžná navigace tak důležitá, aby se tím neustálý zábor místa ospravedlnil.

Další možný problém stále fixní navigace je **odvádění pozornosti od obsahu**.

Nabízí se také možnost odkazy na ostatní stránky přidávat přímo do obsahu, kde to dává smysl. Nebo mít na konci stránku zmíněné možnosti „**Kam dál**“, odkaz pro **návrat na hlavní stranu** a podobně.

Hezky je to vyřešeno třeba na [Jak psát web](http://www.jakpsatweb.cz):

Hodit se může také **drobečková navigace** umístěná i pod obsahem na konci stránky:

## Zobrazení při rolování vzhůru

Některé weby problém s místem a odváděním pozornosti fixního obsahu řeší jeho zobrazováním **na základě směru rolování**.

Pokud člověk po příchodu na stránku začne rolovat směrem dolů, hlavička neustále viditelná (fixní) nebude. Zobrazí se až při rolování směrem nahoru.

Vychází se z předpokladu, že pohybem vzhůru dává návštěvník najevo, že se chce dostat na hlavičku, která je nahoře.

Bohužel uživatel může mít tendenci vyjet vzhůru i v případě, že se chce jen dostat k obsahu, který přejel. V takovém případě ho zobrazení fixního obsahu nejspíš naštve, protože mu překryje obsah, ke kerému se chce dostat.

Tuto situaci jde částečně řešit tak, že se při rolování vzhůru (navíc třeba ještě s nějakou tolerancí) fixní prvek umístí nad horní hranu – tím nepřekryje obsah, ale bude nutné se k němu ještě déle prorolovat.

## Krátké stránky

Zajímavý způsob, jak se nutnosti fixní navigace (nebo jiného obsahu) vyhnout, je vytvářet stránky dostatečné krátké na to, aby potom  nebyl problém odrolovat na začátek.

## Odkazy jinam

  - [Fixed Headers on Mobile: A/B Tested](http://exisweb.net/abtest-fixed-navbar)

  - [Fixed Positioning in Mobile Browsers](http://bradfrost.com/blog/mobile/fixed-position/)