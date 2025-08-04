---
title: "Barva podle odrolování na stránce"
headline: "Barva podle odrolování na stránce"
description: "Jak pouze v CSS měnit pozadí elementu v závislosti na odscrollování na stránce."
date: "2020-03-13"
last_modification: "2020-03-15"
status: 1
tags: ["CSS", "Hotová řešení", "Scrollování"]
---

Poměrně zajímavý efekt mají zprávy ve [Facebook](/facebook) Messengeru:

V závislosti na umístění ve *viewportu* mají různou barvu. Tentýž element je dole červený a nahoře modrý. **Během rolování mění svoji barvu**.

Je až skoro překvapivé, jak jednoduché je takový efekt vyrobit. Stačí k tomu pouhé 2 vlastnosti:

  - obrázkové pozadí s barevným přechodem – lze vytvořit přímo v CSS pomocí [gradientu](/gradient): `background-image: linear-gradient(#0D6AB7, #DA3F94)`

  - fixní obrázkové pozadí – obrázkový gradient se zafixuje pomocí `background-attachment: fixed`

Jako obrázek samozřejmě nemusí posloužit pouze CSS gradient, ale může jít o **obrázek libovolný**.

[Samostatná živá ukázka](http://kod.djpw.cz/pevc)

## Využití

Kromě již zmíněných zpráv na Facebooku se podobný efekt může hodit pro zvýraznění čehokoliv během scrollování.

[Ukázka zvýraznění nadpisů](http://kod.djpw.cz/qevc) při *příjezdu* elementu do viewportu.

## Řešení v JavaScriptu

V JS jde zjistit počet pixelů, o které [je odrolováno](/odrolovani#odrolovano), a podle toho s barvou libovolně manipulovat.

CSS řešení je ale podstatně jednodušší.

## Výkon

V dávných dobách bývaly s v CSS fixovaným pozadím přes `background-attachment: fixed` značné výkonnostní problémy:

  Na pomalejších počítačích (CPU pod 400, záleží hlavně na grafické kartě) způsobuje hodnota fixed pomalejší rolování, protože se to musí přepočítávat.

    **Yuhů**, [Background-attachment](https://www.jakpsatweb.cz/css/background-attachment.html) na JPW

Dnes už to takový problém není. Nicméně fakt, že se plocha s obrázkovým fixním pozadím musí neustále přepočítávat ([překreslovat](/vykreslovani)), platí stále. Je dobré si to při používání podobných efektů uvědomit.