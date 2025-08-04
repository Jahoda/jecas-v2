---
title: "Fullscreen"
headline: "Režim celé obrazovky"
description: "Jak je možné stránku přepnout do fullscreenu (režimu celé obrazovky)."
date: "2015-01-18"
last_modification: "2015-01-19"
status: 1
tags: ["JavaScript", "CSS", "CSS selektory"]
---

Prohlížeče mají obvykle tzv. *režim přes celou obrazovku*, kdy **zmizí ovládací prvky** prohlížeče i operačního systému a stránka se **zobrazí přes celý monitor**.

Obvykle se do **fullscreenu** přepíná klávesou F11. Přepnout zpět je možné opětovným stiskem F11 (někdy i klávesou Esc).

Pomocí JS metody `requestFullscreen` jde přepnout do fullscreenu i **pouze určitý prvek stránky**.

## Využití

Použít režim přes celou obrazovku se hodí v celé řadě případů – při použití HTML přehrávače značkou `&lt;video>`, při vytváření HTML her nebo aplikací. U online editorů pro **psaní textu** jde fullscreenem vytvořit *režim nerušeného psaní*. Fullscreen se hodí i pro prohlížení **obrázkové galerie**.

## Podpora v prohlížečích

V některých prohlížečích funguje pouze **s prefixy**.

  - **Chrome 15+** (s prefixem `webkit`)

  - **Firefox 9+** (s prefixem `moz`)

  - **Internet Explorer 11+** (s prefixem `ms`)

  - **Opera 12.10**

  - **Safari 5** (s prefixem `webkit`)

Po přepnutí na celou obrazovku obvykle prohlížeč **zobrazí upozornění** s postupem, jak se přepnout zpátky.

  Hláška v **Chrome**

  Volby režimu celé obrazovky ve **Firefoxu**

  Povolení fullscreenu v **Internet Exploreru**

Upozornění po chvíli **zmizí** a uživatel to může **zapomenout**, takže je lepší přidat tlačítko, co fullscreen vypne.

## Použití

Následující funkce `zapnoutFullscreen` přepne předaný element do režimu přes celou obrazovku. Kód je tak komplikovaný kvůli prefixům pro různé prohlížeče.

```
function zapnoutFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } 
  else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } 
  else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } 
  else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
}
```

function zapnoutFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } 
  else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } 
  else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } 
  else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
}  

### Vypnutí fullscreenu

Pro ukončení režimu celé obrazovky existuje metoda `exitFullscreen`. Opět má různou podobu napříč prohlížeči.

  - **Firefox** – `moz**Cancel**FullScreen()`,

  - **Webkit** – `webkitExitFullscreen()`,

  - **IE** – `msExitFullscreen()`

## Ukázka

Přepnout samotný článek do fullscreenu

Jak je vidět na funkci předchozího tlačítka, výchozí podoba elementu v **režimu na celou obrazovku** nemusí vypadat nejlépe.

Bez úprav je pozadí fullscreenu v některých prohlížečích černé (**Firefox**, **IE**), takže na něm není černý text bez explicitně nastaveného kontrastního pozadí vidět. Dále je potom nemožné obsahem elementu **rolovat**.

## CSS selektor `:fullscreen`

Pro pohodlné stylování existuje v CSS pseudo-třída `:fullscreen`. Nestačí ji psát jen s [CSS prefixy](/css-prefixy), ale **Firefox** a **Webkit** mají v názvu vlastnoti spojovník, tj. `-moz-full**-**screen` a `-webkit-full**-**screen`.

Selektory s prefixy nelze řetězit za sebe, ale deklarace se musí duplikovat:

```
element:-webkit-full-screen {/* styly */}
element:-moz-full-screen {/* styly */}
element:-ms-fullscreen {/* styly */}
```

Pseudo-třídu `:fullscreen` dostane **pouze element**, na který se použije JS metoda `requestFullscreen`.

[Živá ukázka](http://kod.djpw.cz/wpjb-)

## Blokování kláves

Aby se dalo fullscreenu „zbavit“ nemusí po jeho aktivaci fungovat odchytávání kláves Esc nebo F11, které slouží k jeho ukončení.

    - [Ovládání webu klávesami v JavaScriptu](/klavesy)

Kód Esc je `27` a F11 `122`, v režimu přes celou obrazovku je napříč prohlížeči nejde odchytávat (Esc ruší fullscreen, F11 v **Chrome** funguje jako Esc).

[Živá ukázka](http://kod.djpw.cz/cqjb-)

## Fullscreen z `&lt;iframe>`

Zapnout fullscreen nejde „ven“ z **vnořeného rámu**.

## Automatické přepnutí na celou obrazovku

Přepnout do fullscreenu bez **přímé akce uživatele** není možné.

[Živá ukázka](http://kod.djpw.cz/hqjb-)

Vysvětluje to **chybové varování**, které takový pokus vyvolá:

  Failed to execute 'requestFullScreen' on 'Element': API can only be initiated by a user gesture.

## Odkazy jinam

  - MDN: [Using fullscreen mode](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)

  - WHATWG: [Fullscreen API](https://fullscreen.spec.whatwg.org/)