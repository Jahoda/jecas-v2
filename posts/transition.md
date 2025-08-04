---
title: "CSS transition"
headline: "Animace v CSS pomocí transition"
description: "CSS vlastností <code>transition</code> lze na stránce docílit přechodových animací bez JavaScriptu."
date: "2013-06-05"
last_modification: "2013-06-06"
status: 1
tags: ["CSS", "CSS vlastnosti", "Animace"]
---

Funkční od Internet Exploreru 10.

## K čemu je to dobré?

Při určitých událostech (třeba najetí myší na element – `:hover`) lze již hromadu let změnit vzhled elementu.

    button.prebarvit {background: red}
    button.prebarvit:hover {background: green}
  
  Najeďte

CSS vlastnosti `transition-*` řeší jen plynulost této změny. Tedy vytvoří plynulý přechod mezi již vytvořenými stavy.

    button.prebarvit-plynule {background: red; transition: background 0.5s}
    button.prebarvit-plynule:hover {background: green}
  
  Najeďte

## Jak animovat?

Pro vytváření efektních přechodů existují 4 vlastnosti, které lze zapsat zkráceně jako `transition`.

`transition-property`
Která CSS vlastnost se má animovat, lze animovat v zásadě všechno u čeho to má smysl (celý seznam).

`transition-duration`
Délka animace, zadává se v sekundách (např. `transition-duration: 1s`).

`transition-timing-function`
Slouží k ovlivňování průběhu animace, tj. že se třeba ze začátku bude animovat pomalu a postupně animace zrychlí.
Průběh (rychlost v jednotlivých fází) animace lze poměrně detailně nastavovat (Ukázka). 

`transition-delay`
Nastavení zpoždění animace po jejím vyvolání. Čas se zadává rovněž v sekundách.

Zkrácený zápis `transition` bude vypadat následovně: ```
transition: **animovaná vlastnost** **délka animace** **typ animace** **za jak dlouho začne**
```

Konkrétní kód:
```
transition: opacity 1s ease-in-out 2s
```

Potom zajistí animaci vlastnosti `opacity` v délce 1 vteřiny stylem `ease-in-out`, která začne 2 vteřiny po vyvolání akce.
Zápis funguje chytře, takže projde i:
```
transition: opacity 1s 2s
```

A bude fungovat podobně jako předchozí. S tím, že průběh animace bude výchozí (tedy `ease`). *Povinné* je v zásadě zadat jen co se má animovat a jak dlouho.

.animace {background: #0D6AB7; display: block; width: 135px; height: 80px; color: #fff; text-decoration: none; text-align: center; position: relative; transition: all .5s}
.animace span {bottom: -20px; opacity: 0; position: absolute; left: 25px; transition: all 1s}
.animace span+span {bottom: 150px}
.animace:hover span {bottom: 25px; opacity: 1}
.animace:hover span+span {bottom: 5px}
.animace:hover {width: 200px; padding-left: 50px}

    web o
    webdesignu

## Události

Kdy lze přechodové animace `transition` použít?

U pseudo-tříd uživatelských akcí (`:active`, `:hover` a `:focus`),
pseudo-třídy zaškrtnutí `:checked`,
a pseudo-třídy zaměření `:target`.

## Použití

```
element {background: white; **transition: background 1s**}
element*:hover* {background: black}
```

## Více animací

Chceme-li animovat více vlastností, lze je buď oddělit čárkou, nebo použít magické `all` (bude se animovat všechno).
```
/* vše se za 1 sekundu zanimuje */ 
element {transition: **all** 1s}
```

Při oddělování čárkami lze volit odlišné časování a styl animování jednotlivých CSS vlastností. Využitím `transition-delay` potom lze dosáhnout spouštění animací po sobě.
```
element {transition: background 1s, left 1s 1s}
```

Kód výše vytvoří sekundovou animaci pozadí, po které se spustí sekundová animace vlastnosti `left`.

## Prefixy

Někde lze vidět používání `transition` s prefixy.
```
element {-o-transition: , -webkit-transition: , -moz-transition: }
```

To je víceméně zbytečné, neboť současné verse Opery, Firefoxu i Chromu rozumí samotnému `transition` a starší prohlížeče těchto značek používá minimum návštěvníků. Proto pokud se nepoužívá nějaký **CSS preprocesor**, který prefixy sám doplní, zdá se zbytečné si takto zanášet kód.

## Zdroje a odkazy

W3C: CSS Transitions
  - [Ukázky různých animací](http://h5bp.github.io/Effeckt.css/)