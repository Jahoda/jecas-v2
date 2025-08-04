---
title: "Oříznutí víceřádkového obsahu"
headline: "Oříznutí víceřádkového obsahu"
description: "Jak oříznout dlouhý text po stanoveném počtu řádek."
date: "2014-09-13"
last_modification: "2014-12-13"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Zatímco [oříznutí jednoho řádku textu](/oriznuti-textu) není zase taková věda, zajistit totéž u **delšího odstavce** s více řádky je komplikovanější.

Standardní elegantní řešení je poměrně obtížné najít.

Ve staré **Opeře 12** existuje nestandardní hodnota CSS `text-overflow` ([ukázka](http://kod.djpw.cz/wqfb)):

```
.tri-tecky-opera {
  text-overflow: **-o-ellipsis-lastline**;
}
```

V **Chrome** je možné využít nestandardní vlastnost `-webkit-line-clamp` ([ukázka](http://kod.djpw.cz/yqfb)):

```
.tri-tecky-chrome {
  display: -webkit-box;
  -webkit-line-clamp: 8; /* počet řádků */
  -webkit-box-orient: vertical;
}
```

Toto řešení není úplně **šikovné**, protože je závislé například na **velikosti písma** – velké písmo vyplní prostor menším počtem řádků řádku.

## Řešení

Oříznout obsah tak nezbývá než pomocí `overflow: hidden`.

```
.oriznuty {
  max-height: 5em;
  line-height: 1.25em;
  overflow: hidden;
}
```

Oříznutí vždy **po celém řádku** zajistí **maximální výška** (`max-height`) v hodnotě násobku **výšky řádku** (`line-height`). Kvůli **zvětšování písma** se hodí použít například jednotky `em`.

Kód z tohoto příkladu tak ořízne obsah po 4 řádcích (`1.25em` * **4 řádky** = `5em`).

[Živá ukázka](http://kod.djpw.cz/doib)

### Znázornění oříznutí

Na řešení výše bude nešikovná skutečnost, že uživatel nepozná, že je **obsah oříznutý** — zkrátka najednou skončí.

Zde se **komplikovanost řešení** zásadně liší na základě dvou případů:

  - Text **vždy přeteče** výšku elementu.

  - Text se občas **vejde**.

V prvním případě stačí do **pravého dolního rohu** [absolutně naposicovat](/position#absolute) překryvný element s **výpustkou** (`…`).

Aby byla jistota, že text neskončí kvůli **zalomení řádku** příliš brzy, je dobré překryvnému elementu nastavit větší šířku.

Jediný potenciální problém je tak **useknutí uprostřed písmena**.

[Živá ukázka](http://kod.djpw.cz/coib)

Problémem useknutí uprostřed písmena netrpí překrytí **plynulým obrázkových přechodem** do ztracena – jde toho docílit pomocí [CSS gradientu](/gradient).

[Živá ukázka](http://kod.djpw.cz/foib)

### Neznámá délka textu

V případě, že se obsah někdy vejde a někdy ne, je situace komplikovanější. Chování vylepší naposicování **překryvného elementu** shora na poslední řádek. Když potom bude obsah vlivem krátkého obsahu nižší, element s **výpustkou** bude mimo oříznutý element a **nebude vidět**.

[Živá ukázka s výpustkou](http://kod.djpw.cz/moib) / [přechodem](http://kod.djpw.cz/noib)

## Zobrazit více

Je-li dobré, aby se **návštěvník** k oříznutému obsahu **mohl dostat**, hodí se přidat odkaz *Zobrazit více*.

S trochou snahy by to šlo od **IE 9** s využitím [`checkboxu`](/stylovani-checked) a selektoru `:checked ~ element` vytvořit čistě v CSS:

[Živá ukázka](http://kod.djpw.cz/ooib)

Elegantnější ale vypadá řešení s trochou JavaScriptu:

[Živá ukázka](http://kod.djpw.cz/koib)

Jediným nedostatkem je zobrazení **zbytečného odkazu** v případě, že text vyjde přesně na stanovený počet řádků. Tomu by šlo předejít zobrazením *Zobrazit více* přes celý **poslední řádek**.

[Živá ukázka](http://kod.djpw.cz/loib)

## Odkazy jinam

  [Řešení čistě v CSS](http://www.mobify.com/blog/multiline-ellipsis-in-pure-css/) – využívá triku s pomocí obtékání

  - [jquery.autoellipsis](http://pvdspek.github.io/jquery.autoellipsis/) – Plugin do jQuery

  - [Diskuse na JPW](http://diskuse.jakpsatweb.cz/?action=vthread&forum=4&topic=159021)