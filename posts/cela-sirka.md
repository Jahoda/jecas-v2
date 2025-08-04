---
title: "Hlavička a patička přes celou šířku"
headline: "Části webu přes celou šířku"
description: "Jak jen některé části webu roztáhnout přes celou šířku."
date: "2015-02-24"
last_modification: "2015-02-27"
status: 1
tags: ["CSS", "Hotová řešení", "Layout"]
---

Rozlišení monitorů často nabízí mnohem **větší šířku**, než by pro webovou stránku stačila – pokud je na stránce hodně textového obsahu, stejně není s ohledem na čitelnost rozumné mít text v dlouhých řádcích.

    - Responsivní design webu: [Maximální délka řádků](/responsivni-web#typografie) kolem 80 znaků

Proto se maximální šířka zpravidla omezuje. Slouží k tomu CSS vlastnost `max-width`.

Někdy se pro atraktivnější vzhled roztahují hlavička, patička nebo nějaká jiná část přes celou šířku s tím, že samotný obsah má šířku omezenou a je [vycentrován](/centrovani).

## CSS řešení

Docílit roztažení mimo hlavní centrovaný blok jde více způsoby.

Jako výchozí bod může posloužit tento obyčejný centrovaný layout s maximální šířkou:

    - [Obyčejná centrovaná stránka](http://kod.djpw.cz/dzkb)

### Obrázkové pozadí

Na vršek a spodek webu se nastaví barevné pozadí o výšce hlavičky/patičky. Právě kvůli nutnosti **pevné výšky** se jedná o řešení hodně nepraktické.

Nastavování výšky na pevnou hodnotu ve většině případů nevěstí nic dobrého.

### Posicování

Vytvořit *barevné pozadí* pomocí [absolutního posicování](/position#absolute) se hodí zvlášť v případě, kdy by bylo problematické upravovat HTML kód.

Toto řešení využívá toho, že se na základě výšky patičky/hlavičky vytvoří element s hodně velkou šířkou, nastaví se mu levá záporná posice a pomocí `z-index`u se zastrčí za obsah.

Aby posicované pozadí **nevytvořilo vodorovný posuvník**, ořízne se stránka ve vodorovném směru (`overflow-x: hidden`).

    - [Ukázka s využitím posicování](http://kod.djpw.cz/azkb)

### Použití obalu

Nejlepší řešení se zdá použít pro každou část stránky, která má mít pozadí přes celou šířku, další obalový element a každou část **centrovat samostatně**.

```
&lt;div style="background: blue">
  &lt;div style="max-width: 900px; margin: auto">
    Hlavička
  &lt;/div>
&lt;/div>
```

Obalový element potom má nastavenou pouze barvu pruhu *mimo obsah* a veškeré další stylování (centrování, nastavení maximální šířky a podobně) se provádí u vnitřního elementu.

    - [Ukázka s využitím obalového elementu](http://kod.djpw.cz/czkb)