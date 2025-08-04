---
title: "CSS animace"
headline: "CSS vlastnost <code>animation</code>"
description: "Animování prvků na stránce pomocí čistého CSS s využitím <code>@keyframes</code>."
date: "2013-06-18"
last_modification: "2013-09-25"
status: 1
tags: ["CSS", "CSS vlastnosti", "Animace"]
---

Kromě přechodů [`transition`](/transition) existují i **plnohodnotnější animace v čistém CSS**. Podporováno od **Internet Exploreru 10**. Pro prohlížeče založené na Webkitu je nutnou používat [prefix](/css-prefixy) `-webkit-`.

## Klíčové snímky (`keyframes`)

Animace se složí z jednotlivých klíčových snímků. **Jednotlivé kroky** mohou být buď **znázorněny procenty**, nebo v případě, kdy stačí jen dva stavy, lze místo procent **použít klíčová slova** `from` a `to` (ekvivalent `0%` a `100%`).

```
@keyframes jmeno-animace {
  0%   {background: blue}
  50% {background: yellow}
  100% {background: red}
}
```

## Animace (`animation`)

Výše nadefinované klíčové snímky se přiřadí danému elementu, syntaxe je dost podobná vlastnosti [`transition`](/transition):

```
element {
  animation: jmeno-animace 5s linear;
}
```

Vlastnost `animation` je zkrácenina všech `animation-*` vlastností. Název a doba trvání jsou *povinné*.

`animation-name`
  **Název animace**, která se má selektoru přiřadit.

`animation-duration`
  **Délka animace**, zadává se v sekundách (např. `animation-duration: 1s`).

`animation-timing-function`
  Slouží k ovlivňování **průběhu animace**, tj. že se třeba ze začátku bude animovat rychle a konec animace bude pomalejší (výchozí hodnota `ease`). Nebo může být průběh lineární (`linear`).

    Průběh (rychlost v jednotlivých fází) animace lze poměrně detailně nastavovat (Ukázka). 

  `animation-delay`
  Nastavení **zpoždění animace** po jejím vyvolání. Čas se zadává rovněž v sekundách.

  `animation-iteration-count`
  **Počet opakování** dané animace. Výchozí hodnota je **1**, jiným číslem lze požadovaný počet opakování, **nekonečné přehrávání** zajistí klíčové slovo `infinite`.

  `animation-direction`
  **Směr animace**, možné hodnoty jsou:

    - `normal` — výchozí hodnota; animace běží od 0% ke 100%, potom v případě opakování skočí na 0%,

    - `reverse` — animace běží od 100% k 0%, potom v případě opakování skočí na 100%,

    - `alternate` — má význam jen u více opakování a při každém změní svůj *směr*, tj. nejprve poběží z 0% ke 100%, potom se vrátí k 0%, zase poběží ke 100% a tak dále,

    - `alternate-reverse` — totéž jen se začne od 100%.

    `animation-fill-mode`
  Upřesňuje, zda se mají hodnoty prvního nebo posledního snímku **projevovat i při skončení animace**.

    - `none` — výchozí hodnota; před animováním s nic nemění, po skončení animace se vše vrátí k normálu,

    - `forwards` — po skončení animace zůstane stav posledního snímku,

    - `backwards` — v případě prodlevy před zahájením animace (`animation-delay`) se nastaví s předstihem hodnoty prvního snímku,

    - `both` — kombinace výše uvedeného.

    `animation-play-state`
  Umožňuje **zastavení** a opětovné spuštění animace.

    - `running` — výhozí hodnota; animace běží,

    - `paused` — animace je pozastavena, opětovné spuštění naváže v okamžiku předchozího pozastavení.

### Více animací

Jeden element může používat animací více. Mají-li `animation-*` hodnoty být různé pro každou animaci zvlášť, hodnoty se oddělují čárkou (`,`).

```
element {animation: prvni-animace 5s, druha-animace 2s}
```

## Vyvolání animace

Animace může být *spuštěna* třemi způsoby:

  - **ihned po načtení** stránky — pokud by se výše uvedená animace přiřadila např. pro `&lt;h1&gt;`, po načtení nadpisy změní své pozadí,

  - **přes CSS** pomocí [selektorů uživatelské akce](/css-selektory#uzivatelske-akce) (`:hover`, `:focus` apod.),

  - **přidáním třídy JavaScriptem** — animace se přiřadí speciální `.třídě`, kterou při nějaké akci [nastaví JS](/prepinani-trid).

## Test animace

Prostor pro vyzkoušení (nefunguje ve starších Explorerech než 10).

@keyframes animace
{
0%   {background: blue; width: 50px}
100% {background: red; width: 150px}
}
@-webkit-keyframes animace
{
0%   {background: blue; width: 50px}
100% {background: red; width: 150px}
}

.animace span {
  display: block; background: blue; width: 50px; height: 50px;
}

function animator() {
  var animace = document.getElementById("animace");
  animace.innerHTML = "";
  
  var obal = document.getElementById("nastaveni-animace");
  
  var css = "animation-name: animace; -webkit-animation-name: animace;\n";
  css += projit(obal.getElementsByTagName("input"));
  css += projit(obal.getElementsByTagName("select"));
  
  var animator = document.createElement("span");
  animator.style.cssText = css
  animace.appendChild(animator);
  
  document.getElementById("vystup").innerHTML = css;
}

function vlastnostHodnota(prefix, el) {
  var vystup = prefix + el.id + ": " + el.value + (el.title ? el.title : "");
  vystup += "; -webkit-" + vystup + ";\n";
  return vystup;
}

function projit(els) {
  var prefix = "animation-";
  var css = "";
  for (i = 0; i 

  Délka animace: 
    
  Zpoždění animace: 
    
  Opakování animace: 
    
      1
      nekonečné

  Směr animace: 
    
      normální
      obrácený
      tam a zpátky
      tam a zpátky obrácený

  Při začátku/skončení animace:
    
      nic
      zůstane poslední
      nastaví první
      nastaví první + zůstane poslední

  Přehrávat/zastavit animaci:
    
      běží
      zastaveno

Spustit animaci
  ```

```

## Odkazy a zajímavé animace

  - [Odpočítávání](http://kod.djpw.cz/gfc) ([vlákno na DJPW](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=151050))

  - [CSSNTH](http://bennettfeely.com/cssynth/)

  - [Improve the payment experience with animations](https://medium.com/p/3d1b0a9b810e)

  - [Bounce.js](http://bouncejs.com/): Generátor CSS animací

Knihovny animací:

  - [Hover.css v2](http://ianlunn.github.io/Hover/)

  - [Effeckt.css](http://h5bp.github.io/Effeckt.css/)

  - [animate.css](https://github.com/daneden/animate.css/)