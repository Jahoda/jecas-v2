---
title: "Poskakování kvůli scrollbaru"
headline: "Poskakování stránky kvůli posuvníku"
description: "Jak zabránit, aby obsah stránky poskakoval v závislosti na posuvníku."
date: "2014-12-14"
last_modification: "2023-08-06"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady", "Scrollování"]
---

Pokud je obsah stránky [centrovaný](/centrovani#margin-auto) a některé stránky **jsou krátké**, takže se neobjeví **svislý posuvník** (zpravidla na pravé straně), způsobí přechod mezi dlouhou stránkou (s posuvníkem) a krátkou (bez posuvníku) **nepěkné poskočení.**

U webových aplikací k podobné situaci často dochází, když se obsah stahuje asynchronně a během načítání se tak výška stránky změní.

Existují dvě bezpracné možnosti jako vytvářet stránky **delší** (vyšší) nebo:

  Neřešit.

  [Plaváček](http://plavacek.net)

## CLS

CLS je zkratka *Cumulative Layout Shift* pro metriku označující neočekávané **poskakování layoutu**.

Tuto nepříjemnou věc může způsobovat řada věcí – posuvník může být jedna z nich.

Jde o to, že zobrazivší se posuvník během načítání zmenší dostupnou šířku. Tím dost často dojde k potřebě stávající obsah překreslit.

Tento problém se týká hlavně **webových aplikací** / [SPA](/spa) a průběžného načítání.

U klasického webu generovaného čistě na serveru má zpravidla prohlížeč obsah dostupný rovnou, takže dokáže rovnou rozhodnout, jestli (ne)bude posuvník potřeba.

      Web.dev: [Cumulative Layout Shift](https://web.dev/cls/)

## Minimální výška

Vlastností `min-height` lze zadat minimální výšku obsahu na hodnotu, která posuvník vytvoří. Může to být ale **matoucí/nepříjemné pro uživatele**, protože mohou kvůli tomu **zbytečně rolovat**.

[Živá ukázka](http://kod.djpw.cz/frib)

## Přidání posuvníku

Jednoduchou konstrukcí jde přidat posuvník i v případech, že není potřeba – **bude neaktivní** (zašedlý).

Má to trochu nevýhodu, že je potom na stránce posuvník vždy a může ji to trochu hyzdit.

```
html {
  overflow-y: scroll;
}
```

[Živá ukázka](http://kod.djpw.cz/erib)

## CSS vlastnost `scrollbar-gutter`

Poměrně nová CSS vlastnost `scrollbar-gutter` (nepodporuje ji **Safari**) dokáže upravit přístup prohlížeče k posuvníku.

Zvlášť užitečná je hodnota `stable`:

```
html {
  scrollbar-gutter: stable;
}
```

Tím se zajistí, že prohlížeč pro daný element **vždy** vyhradí místo pro posuvník.

[Živá ukázka](http://kod.djpw.cz/exjd)

Trochu problém u ní je, že v případě aplikování přímo pro `&lt;html>` logicky vyhrazuje místo u ní.

Chová se to dost podobně, jako by se přidalo vnitřní odsazení přes `padding`.

Pokud se tedy pozadí stránky nastavuje až v nějakém vnořeném elementu, výsledek může být visuálně dost podobný jako neaktivní posuvník.

[Živá ukázka](http://kod.djpw.cz/fxjd)

      MDN: [scrollbar-gutter](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter)

## Vlastní posuvník

Jedno z možných řešení je si **posuvník zajišťovat po svém** — prostým vhodně ostylovaným `&lt;div>`em, který bude absolutně posicovaný, takže nebude ovlivňovat **vykreslení obsahu**.

    - Vlastní vzhled scrollbaru: [Posuvník v JavaScriptu](/styl-posuvniku#js)

Nestandardní *scrollbar* ale nemusí být pro návštěvníky úplně ideální.

  I kdyby měla náhrada vyřešené rolování kolečkem, klávesnicí i dotykem (se zachováním setrvačnosti) a autoscroll, nikdy nebude respektovat uživatelské nastavení, jako je třeba velikost a plynulost posunu. Dojem, že na stránce je cosi divného, je pak silnější, než kdyby obsahový blok cukal o pár pixelů do strany.

  [Chamurappi](http://webylon.info)

## Odečtení šířky

S využitím jednotky `vw` (*viewport* — rozměry okna) a počítání [`calc`](/calc) je možné dopočítat šířku posuvníku a nastavit ji jako levý `margin` **čistě v CSS**. Řešení je funkční od **IE 9**.

```
html {
    margin-left: calc(100vw - 100%);
}
```

Bude to fungovat tak, že v případě **krátké stránky** bude levý margin nulový (šířka *viewportu* se bude rovnat šířce elementu `&lt;html>`).

V případě **dlouhé stránky** bude *viewport* šírší o šířku posuvníku. O tuto šířku se potom dlouhá stránka *odšťouchne* zleva.

[Živá ukázka](http://kod.djpw.cz/jrib-)

## Změření šířky posuvníku

Je-li potřeba dynamicky reagovat na šířku posuvníku, docela elegantní řešení je změřit šířku JavaScriptem a nastavit ji do [CSS proměnné](/var).

Posuvník totiž dokáže být v různých prohlížečích a systémech **různě široký**.

V **macOS** navíc ještě mění svou šířku na základě toho, jestli je či není připojena myš.

```
function setScrollbarWidthVariable() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    let scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}

setScrollbarWidthVariable()
```

Tento kód nastaví proměnnou `scrollbar-width`, která bude kdekoliv dostupná k použití:

```
.cokoliv {
  width: var(--scrollbar-width);
}
```

[Živá ukázka](http://kod.djpw.cz/hxjd)

## Poskakování obsahu za modálem

Při zobrazování obsahu v modálu se typicky pro celou stránku vypíná scrollování, protože modál bude mít scrollbar vlastní.

```
.is-modal-open {
  overflow: hidden;
}
```

Zde je opět vhodné odšťouchnout obsah, aby neposkaoval. Třeba průhledným `border`em:

```
.is-modal-open {
  overflow: hidden;
  border-right: var(--scrollbar-width) solid transparent;
}
```