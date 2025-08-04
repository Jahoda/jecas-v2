---
title: "Živé ukázky"
headline: "Živé ukázky"
description: "Proč používám vlastní nástroj na ukázky zdrojových kódů."
date: "2014-08-01"
last_modification: "2014-08-15"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Pro rychlé testování kousků HTML/CSS/JS existuje řada populárních on-line nástrojů. Nejznámější jsou asi:

  - [JSFiddle](http://jsfiddle.net/)

  - [Codepen.io](http://codepen.io/pen)

Přesto jsem v červenci 2013 spustil svůj vlastní nástroj.

Momentálně běží na adrese [kod.djpw.cz](http://kod.djpw.cz)

Proč? Protože ostatní řešení trpěla a stále trpí věcmi značně komplikujícími používání.

## Funkčnost ve starých prohlížečích

Testovat kusy kódu potřebuji v různých zařízeních a i dost starých.

  - **Codepen** funguje od **IE 10**

  - **JSFiddle** funguje od **IE 9**

Pro starší prohlížeče je potřeba připravit ukázku v **novějším prohlížeči**, vypreparovat surový výsledek a ten zkopírovat do staršího.

A totéž pro každou změnu. Můj nástroj funguje (omezeně) od **IE 7**, včetně okamžitého zobrazování výsledku.

Kromě toho v mé [oblíbené](/opera) **Opeře 12** v JSFiddle není možné **kopírovat text**. A v Codepenu nefunguje **průběžné automatické ukládání obsahu** do [`localStorage`](/zalohovani-formularu).

## Průběžné automatické ukládání

Kromě problémů v **Opeře 12** v Codepenu, neumí JSFiddle průběžné ukládání vůbec.

## Průběžné spouštění kódu

Příjmená věc je **rovnou vidět výsledek** zadaného HTML/CSS/JS kódu.

V JSFiddle taková věc není, byť jde kód spouštět klávesovou zkratkou Ctrl + Enter.

S tím souvisí i drobná vychytávka na **kod.djpw.cz**, kdy je `alert` překryt [vlastní funkcí](/vlastni-alert), která neblokuje prohlížeč, takže je možné pohodlně provádět testovací výpisy z JavaScriptu.

## Přepínání editace a výsledku

Na JSFiddle ani Codepenu nejde pohodlně změnit URL, aby se místo **čistého výsledku** zobrazil **editační režim** a obráceně. Vzhledem k **nefunkčnosti rozhraní** ve starších prohlížečích je zvlášť mrzuté, že není ani možné někde zkopírovat odkaz na čistý výsledek.

Jediná možnost je funkce *Zobrazit pouze obsah rámu*, kterou ale nedisponují všechny prohlížeče.

Mému řešení stačí na konci URL přidat/odebrat spojovník.

## Psaní kódu

V tom jsou všechny 3 nástroje dost podobné. Všude je možné používat [Emmet](/emmet). Jinak kod.djpw.cz nabízí nejvíc.

    **Snippety** podobně funkční jako v [Sublime Text](/sublime-text) (nemají obě známé služby).

  **Vícenásobný kursor** (má jenom Codepen).

  **Napovídání** po stisku Ctrl + Mezerník (nemají oba).

  **Okamžité upozorňování na chyby/nedostatky** v JS/CSS (oba mají až na vyžádání).

## Rychlost

Načítání kod.djpw.cz je oproti ostatním službám bleskurychlé.

Pro srovnání **rychlosti načtení** a možnosti s ukázkou něco dělat je zde ukázka téhož **jednoduchého kódu** ve všech nástrojích.

  - [Codepen](http://codepen.io/anon/pen/KsfEH)

  - [JSFiddle](http://jsfiddle.net/7cSkp/)

  - [kod.djpw.cz](http://kod.djpw.cz/eueb)

## Obrázky

Ve svém nástroji vložím obrázek 200 × 200 px zadáním url „`/i/200`“. [Ukázka](http://kod.djpw.cz/cueb)

## Kontrola nad obsahem

Pokud jsou živé ukázky **významnou součástí webu**, což třeba v případě tohoto webu jsou – bez jejich funkčnosti je plno článků skoro bezcenných – je značné risiko nemít takto strategický obsah pod **vlastní kontrolou**.

## Je kod.djpw.cz nejlepší?

Je tedy **kod.djpw.cz** lepší než Codepen nebo JSFiddle? Jak v čem. Codepen i JSFiddle například nabízí možnost **spolupracovat** na jedné *ukázce* ve více lidech. Taktéž existence **uživatelského profilu**, pohodlná možnost přehledu nad svými ukázkami nebo možnost editace v mém řešení zcela chybí.

### Codepen

Codepen potom nabízí různé **sociální prvky** – komentáře ukázek nebo **žebříčky** zajímavých a populárních ukázek a podobně. Kód navíc umožňuje kromě HTML, CSS a JS zapisovat i alternativně. HTML třeba v [Markdownu](/markdown), pro CSS používat *preprocesory* a v JS využít CoffeScript/LiveScript.

Nakonec výhoda z *kontroly nad obsahem* platí pochopitelně pouze pro provozovatele dané služby.