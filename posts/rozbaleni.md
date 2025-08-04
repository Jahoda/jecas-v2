---
title: "Plynule zobrazit/skrýt obsah"
headline: "Plynulé rozbalení obsahu"
description: "Jak pomocí CSS animace a JavaScriptu plynule rozbalit původně skrytý obsah."
date: "2015-03-22"
last_modification: "2015-03-22"
status: 1
tags: ["Hotová řešení", "Animace", "Přepínání vzhledu"]
---

Méně důležitý obsah na stránce může být užitečné nejprve skrýt a následně zobrazit až na vyžádání uživatele.

Skutečně by se mělo jednat o **méně důležitý obsah**, protože [Google](/google) mu může [snížit váhu](/skryty-text).

    - [Přepínání vzhledu](/prepinani-vzhledu) – různé způsoby změny vzhledu

Nejjednodušší je při kliknutí na tlačítko „Zobrazit více“ [přepnout CSS třídu](/prepinani-trid) nebo [vlastní atribut](/toggle-data-atributy) a na základě toho nastavit (ne)viditelnost:

  - `display: none` pro skrytí,

  - `display: block` (nebo jinou hodnotu vlastnosti [`display`](/display)) pro zobrazení

## Animace rozkrytí

Jeden z populárních efektů je *rozbalení* obsahu postupným přidáváním výšky. Od **IE 10** jde výšku (`height`) animovat přímo v CSS pomocí vlastnosti [`transition`](/transition).

Jde tak docílit plynulého zobrazování jen v CSS.

    - [Animované skrytí obsahu](/animace-skryt) – příklady čistě CSS animací pro zobrazení/skrytí textu

Bohužel zrovna při animování výšky je u CSS problém v tom, že ji není možné **animovat přesně**. Nejde plynule animovat z neznámé výšky na nulu.

Jde to obejít použitím `max-height` – pro zobrazený stav nastavit `max-height` na hodnotu zaručeně vyšší než je skutečná výška. Nevýhoda je **závislost na výšce** a fakt, že animace nepoběží **přesně stanovenou dobu** (část doby animace proběhne bez viditelné změny, protože je obsah nižší než aktuální `max-height`).

## Kombinace JS a CSS

Pro lepší výsledek je proto nutné si výšku přeměřit a nastavit JavaScriptem. Její plynulou změnu už zajistí klasické CSS `transition`. Při [zapnutém JS](/vypnuty-js) (`&lt;body>` bude mít třídu `js`) bude přepínatelný obsah neviditelný (`display: none`).

```
.js .toggle-content {
  overflow: hidden;
  display: none;
  transition: height .2s;
}
```

### Zobrazení

JS kód pro **zobrazení** obsahu:

```
// zobrazení elementu
content.style.display = "block";
// vynulování výšky, aby se přizpůsobila obsahu
content.style.height = "";
// [zjištění výšky elementu](/zjisteni-rozmeru#rozmery-elementu) v pixelech
var height = content.offsetHeight;
// nastavení výšky na nulu
content.style.height = 0;
// [překreslení](/vykreslovani#optimalisace)
content.offsetHeight;
// nastavení výšky pro animaci
content.style.height = height + "px";
// přidání atributu s informací, že je otevřeno
content.setAttribute("data-open", "1"); 
```

Za pozornost stojí hlavně řádek:

```
// překreslení
content.offsetHeight;
```

To slouží k tomu, aby prohlížeče element v každém případě překreslily a animace se projevila. Bez toho by ve **Firefoxu** nebylo první rozkliknutí plynulé.

### Skrytí obsahu

Skrytí už je úplně prosté. Stačí nastavit výšku na `0` a odebrat atribut znázorňující otevření.

```
content.style.height = 0;
content.removeAttribute("data-open");
```

Přidávat/odebírat data-atribut není nutné, ale je to snadný způsob jak později určit, jestli je obsah zobrazený nebo skrytý.

```
if (content.getAttribute("data-open")) {
  hide(content);
}
else {
  show(content);
}
```

## Demo

Celá ukázka potom může vypadat následovně:

    - [Ukázka plynulé změny výšky](http://kod.djpw.cz/yolb)

V prohlížečích nepodporujících `transition` není zobrazení/skrytí plynulé.