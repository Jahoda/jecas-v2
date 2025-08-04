---
title: "Animace"
headline: "Animace na webových stránkách"
description: "Jak na webu vytvářet animace a přechody v HTML, CSS a JS."
date: "2013-08-02"
last_modification: "2013-08-04"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Animace"]
---

O animování v samotném CSS pojednává článek [animace pomocí `transition`](/transition). S tím si nevystačíme vždy (lze používat jen [pár událostí](/transition#udalosti)). Pro zajímavější výtvory je třeba zkombinovat CSS se špetkou JavaScriptu.

## JavaScript + CSS `transition`

Je to relativně jednoduché, postupuje se podobně jako u čistého CSS a událostí (`:hover`, `:focus` apod.), jen se reaguje na změnu třídy (`.zmena`), kterou [prohazuje JavaScript](/zobrazit-skryt).

.barva button {background: red; transition: background 1s}
.barva button.zmena {background: green}

  Přebarvit kliknutím

### CSS

```
button {*background*: red; **transition**: *background* 1s}
button.zmena {*background*: green}
```

Vytvořit lze ledasco.

[Více CSS 3 animací ovládaných JavaScriptem](http://h5bp.github.io/Effeckt.css/)

## Čistý JavaScript

Nesmíme zapomínat, že CSS přechody fungují až od Internet Exploreru 10, tedy návštěvníci starších prohlížečů budou o takové animační efekty ochuzeni.

  - Jedna možnost je smířit se s tím — animace většinou nebývají pro web klíčové.

  - Další možnost je animovaný obrázek GIF (půjde použít jen někdy).

  - Nakonec zbývá řízení celé animace JavaScriptem (tomu se věnuje zbytek článku).

Podstata řešení je vytvořit časovač, který za danou dobu v daných intervalech bude měnit určitou CSS vlastnost. Tento časovač bude ve funkci a zároveň bude tuto funkci rekursivně volat.

function zmena(tlacitko) {
  tlacitko.style.opacity = Math.round((tlacitko.style.opacity-0.1) * 100) / 100;
  if (tlacitko.style.opacity) {
    setTimeout(function() { zmena(tlacitko) }, 30);
  }
}

  Plynule
  skrýt
  změnou
  průhlednosti

### JS funkce

```
function **zmena**(tlacitko) {
  tlacitko.style.opacity = Math.round((tlacitko.style.opacity-0.1) * 100) / 100;
  if (tlacitko.style.opacity) 
    setTimeout(function() { **zmena**(tlacitko) }, 30);
}
```

  - Tato funkce se spustí třeba po kliknutí na tlačítko (`onclick="zmena(this)"`).

  - Nejprve se vezme současná hodnota `opacity`,

  - odečte se `0.1` (tj. 10 %),

  - provede se zaokrouhlení a již zaokrouhlená hodnota se použije jako nová hodnota průhlednosti,

  - pokud průhlednost není nula/`false`, spustí se funkce časovačem znovu.

Detailněji popsaná universálnější technika animování v JS je na:

[javascript.info](http://javascript.info/tutorial/animation)

### JS frameworky

Většina JS frameworků (jako [třeba jQuery](http://api.jquery.com/animate/)) taktéž nabízejí pohodlné hotové funkce pro animování nebo dokonce hotové základní animace jako zmizení, odlétnutí, zmenšení a podobně.