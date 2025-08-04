---
title: "Chytré umístění tooltipu"
headline: "Chytré umístění tooltipu"
description: "Jak umisťovat popisek, aby byl neustále viditelný."
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
---

Při používání webové aplikace na desktopu jde u ovládacích prvků zobrazovat **nápovědu v tooltipu** po přejetí myší.

Nejprimitivnější je využít obecného atributu `title`:

  Tlačítko s popiskem

**Styl a chování** popisku `title` si určuje prohlížeč / operační systém.

Pokud je potřeba mít vlastní styl nebo **zobrazovat popisek ihned** (výchozí chování prohlížečů ho zpravidla zobrazuje až s prodlevou), je nutné ho řešit pomocí CSS/JS.

    - [JS tooltip](/js-tooltip) – hotové řešení popisků

    - [Popisek po najetí myší v CSS](/tooltip)

    - [Stylování atributu `title`](/atribut-title)

## Umístění popisku

Jestli něco systémové/prohlížečové popisky dobře řeší, tak je to inteligentní umisťování popisku, které zajistjí, že se popisek **nezobrazí mimo viditelnou oblast**.

Popisek se totiž v závislosti na umístění prvku, který ho vyvolal může zobrazovat:

  - Vpravo dole – výchozí chování, když je dost místa

  - Vpravo nahoře – pokud pod tlačítkem není dost místa

  - Vlevo nahoře/dole – když není místo vpravo od tlačítka a dola/nahoře

Navíc výchozí popisek zohledňuje **umístění kursoru myši**.

## Řešení

### CSS popisky

Při popiscích **čistě v CSS** je jediná možnost změnu orientace popisku (vlevo/vpravo) zajistit ručním přidáním třídy.

To je poměrně nešikovné, protože:

  - Všechny popisky bude nutné projít a určit na jakou stranu se mají zobrazovat.

  - V případě [responsivního designu](/responsive) není často jasné, **kam se má popiske zobrazit** (situace se mění podle šířky).

  - Situace se mění i při různě dlouhém popisku.

  - Určit svislé umístění je potom nemožné, protože není jasné, jak bude stránka odrolována.

Samotné **umístění popisku** se potom musí řešit [posicováním](/position) – relativní pro popisovaný element, absolutní pro popisek. To znemožňuje použití `overflow: hidden` pro popisovaný obsah, protože by se tím popisek **oříznul**.

### Tooltip v JavaScriptu

Pro lepší chování je tedy nutné zapojit JavaScript a umístění popisku počítat.

Aby nebyl problém s `overflow: hidden` popisek se umístí přímo do nějakého společného elementu.

## Odkazy jinam

  - CSS Ticks: [Collision Detection](http://css-tricks.com/collision-detection/)

  - [Tether](http://github.hubspot.com/tether/) – připojení absolutně posicovaných elementů ke statickým