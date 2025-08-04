---
title: "Časování v JavaScriptu"
headline: "Časovače v JavaScriptu"
description: "Jaké nabízí JavaScript možnosti pro vytváření animací. A jak docílit toho, aby byly plynulé. "
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
---

Pokud chceme na webu něco pohyblivého/animovaného, nabízejí se 3 řešení:

  - Použít **pohyblivý obrázek** GIF.

  - Použít CSS přechody [`transition`](/transition) nebo vlastnost [`animation` s `@keyframes`](/animation). Tyto CSS animace potom případně **spouštět JavaScriptem**.

  - Celou animaci řídit JavaScriptem, který bude měnit CSS vlastnosti (např. umístění, rozměry, [průhlednost](/opacity) a podobně) nebo třeba vypisovat nějaký obsah.

## Opakované spouštění `setInterval`

První funkce slouží pro opakovaného spouštění libovolného JS kódu. Funkce `setInterval` má dva parametry, kde první je kód, co se má spustit, a druhé časová prodleva **v milisekundách**.

Existuje několik způsobů, jak kód pro časovač zapsat.

    Nejjednodušší je místo prvního parametru napsat **řetězec s JS kódem**. Následující příklad do elementu s ID „vypsat“ zapíše každých 1000 milisekund (1 vteřina) tečku.

    ```
setInterval(
  "document.getElementById('vypsat').innerHTML += '.'", 
  1000
);
```

    [Ukázka](http://kod.djpw.cz/lihb)

    Psaní kódu **do řetězce** ale nezančí nic dobrého (jedná se o ekvivalent `eval`u). Proto je lepší se tomuto případu vyhnout. Kromě možných risik při **vyhodnocování** takového kódu si zbytečně snižujeme čitelnost, protože obsah v řetězci neumí většina editorů správně obarvit.

    Funkci `setInterval` proto raději předáme jako první parametr anonymní/nepojmenovanou funkci:

    ```
setInterval(
  function() {
    // opakovaně spouštěný kód
    document.getElementById('vypsat').innerHTML += '.';
  },
  1000
);
```

[Ukázka](http://kod.djpw.cz/kihb)

    Funkci si případně můžeme vytvořit samostatně a `setInterval`u předat jen její název:

    ```
function vypsat() {
  // opakovaně spouštěný kód
  document.getElementById('vypsat').innerHTML += '.';
}
var casovac = setInterval(vypsat, 1000);
```

    Pro pozdější **zrušení časovače** je užitečné si ho přiřadit do proměnné.

    [Ukázka](http://kod.djpw.cz/mihb)

### Zrušení intervalu `clearInterval`

Pokud je *interval* v nějaké proměnné, jde ho na vyžádání zrušit:

```
clearInterval(casovac);
```

[Ukázka](http://kod.djpw.cz/nihb)

## Spuštění po čase `setTimeout`

Na rozdíl od `set**Interval**`u spustí požadovanou akci `set**Timeout**` jen a pouze **jednou**. Jinak jsou si obě funkce dost podobné.

```
var casovac = setTimeout(
  function() {
    // kód se spustí pouze jednou za 1000 milisekund
  },
  1000
);
```

### Zrušení timeoutu `clearTimeout`

Pokud je *timeout* v nějaké proměnné, jde ho na vyžádání zrušit:

```
clearTimeout(casovac);
```

[Ukázka](http://kod.djpw.cz/oihb)

Zajímavá je skutečnost, že je možné rušit rovněž `setInterval` pomocí `clearTimeout` a obráceně.

### Opakované spouštění *timeoutu*

I pomocí `setTimeout` jde *nasimulovat* `setInterval`, tedy zajistit **opakované spouštění**. V případech, kdy chceme, aby další opakování **bylo závislé na tom předchozím**, je to i lepší volba.

Celý princip spočívá v **rekursivním volání** *timeoutu*. Po provedení vlastní části kódu (vypsání) funkce `vypsat` zavolá pomocí `setTimeout` samu sebe.

```
funkce vypsat() {
  // samotný výpis
  setTimeout(vypsat, 1000);
}
vypsat();
```

Jelikož tento kód by **běžel nekonečně**, možná budeme potřebovat způsob, jak ho zastavit. Existují dvě možnosti.

  - Použít `clearTimeout`. [Ukázka](http://kod.djpw.cz/rihb)

  - Ve funkci `vypsat` na základě splnění nějaké podmínky další časovač nevytvářet. [Ukázka](http://kod.djpw.cz/sihb)

## Časování přes `requestAnimationFrame`

Novější způsob, kterým disponují prohlížeče od **IE 10**, je použití metody `requestAnimationFrame`.

Ta se hodí hlavně pro vytváření animací.

Metodě `requestAnimationFrame` je možné jako druhý parametr předat element, kterého se akce v *časovači* bude týkat. V takovém případě se nemusí akce provádět, když je například element mimo viditelnou plochu.

## Metoda `animate`

## Odkazy jinam

  - CSS Tricks: [Using requestAnimationFrame](http://css-tricks.com/using-requestanimationframe/)

  - [Polyfill pro starší prohlížeče](https://gist.github.com/paulirish/1579671) — [zjednodušená podoba](https://gist.github.com/mrdoob/838785)

  - MSDN: [Timing control for script-based animations ("requestAnimationFrame")](http://msdn.microsoft.com/en-us/library/ie/hh920765(v=vs.85).aspx)

  - Paul Irish: [requestAnimationFrame for Smart Animating](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)

  - Creative JS: [requestAnimationFrame](http://creativejs.com/resources/requestanimationframe/)

  - HTML5Rocks:[Web Animations - element.animate() is now in Chrome 36](http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36)

  - GoSquared Blog: [Optimising for 60fps everywhere](https://engineering.gosquared.com/optimising-60fps-everywhere-in-javascript)