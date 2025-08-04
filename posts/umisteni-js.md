---
title: "Kam umístit JavaScript do HTML"
headline: "Umístění JavaScriptu v HTML kódu"
description: "Do jakého místa HTML kódu stránky umístit externí nebo interní JavaScript."
date: "2015-01-15"
last_modification: "2015-01-15"
status: 0
tags: []
---

Při používání JavaScriptu v HTML existuje spoustu způsobů, jak a kam vložit JS kód, který bude s HTML elementy pracovat. **Špatné pořadí** HTML a JS dokáže **znefunkčnit** celý JS kód a někdy se špatně odhaluje.

Ať už jde o interní (kód mezi `&lt;script>` a `&lt;/script>`) nebo externí JS (připojený přes `&lt;script src="">&lt;/script>`), může být kdekoliv v:

  - hlavičce webu (sekce `&lt;head>`)

  - těle stránky (sekce `&lt;body>`)

## Vliv na načítání

Čím „výš“ je skript umístěn, tím dříve může být **načten a vykonán**. Na druhou stranu načítání a zpracování externího (neasynchronního) skriptu **přeruší vykreslování** zbytku webu.

Připojení velkého JS nad textovým obsahem webu tedy způsobí, že návštěvník nic nevidí do doby stažení a vykonání celého souboru.

Pro **maximální rychlost načítání** HTML obsahu je tedy vhodné skripty umisťovat na samý konec stránky (před pomyslnou ukončovací značku `&lt;/body>`). Ne vždy je to ale ideální postup, protože pokud je stránka do jisté míry závislá na JS, tak se sice obsah rychle načte, ale oživení skripty může přijít později, než by bylo potřeba. Například nebude fungovat JS akce tlačítka, protože příslušný kód ještě nebyl načten a vykonán.

Častý případ to je u [hamburger navigací](/hamburger-menu), které po kliknutí před načtením JS nic nedělají a pro uživatele vytváří **efekt nefunkčního webu**.

### URL se stavem aplikace

Řada těchto problémů jde vyřešit tím, že se pro typická [rozklikávání obsahu](/css-rozbalovani) nepoužívá JavaScript. Případně se rozbalování obsahu apod. bere jako **stav aplikace**, který se může přenášet v URL parametrech.

Tlačítko pro zobrazení menu tak může symbolicky vypadat následovně:

```
&lt;a href="?zobrazitMenu=true" onclick="zobrazitSkrytMenu(); return false">
  Menu
&lt;/a>
```

Do doby načtení a zpracování JS se uživateli načte totožná stránka s parametrem `zobrazitMenu`, díky kterému se menu zobrazí už na úrovni HTML. Pokud na tlačítko klikne až po stažení a zpracování JS, o zobrazení se postará skript a žádná další stránka se načítat nebude.

### JS aplikace

Je-li webová stránka plně závislá na JS, dává smysl nezbytné skripty začít stahovat co nejdříve a umístit je proto klidně už do `&lt;head>`.

Nebo dokonce použít [resource hint](/async-defer#resource-Hints) a odkaz na externí JS posílat už v HTTP hlavičce:

```
Link: &lt;https://example.com/velkyJavaScript.js>; rel=prefetch;
```

Blokování vykreslování potom nemusí vadit, protože vykreslená stránka by bez načteného JS stejně nic nedělala.

## Atribut `async`

Atribut `async` funguje od **IE 10**, **Firefoxu 3.6**, **Chrome 8** a **Opery 15**. Umožňuje docílit dvou věcí najednou:

  - začít načítat externí JavaScript co nejdříve,

  - nezablokovat vykreslování stránky

Zapisuje se následovně (a kvůli kompatibilitě se často používá ještě s `defer`):

```
&lt;script src="externi.js" **async** *defer*>&lt;/script>
```

    - [Připojení JavaScriptu s `async` a `defer`](/async-defer) – více informací o (a)synchronním připojování JS

Tímto způsobem není problém skript připojit i jinde než na konci stránky, protože **nebude blokovat vykreslování**. Pouze jeho stahování může zpomalit stahování jiných externích objektů (styly, [obrázky](/obrazky), [videa](/video), [fonty](/pisma) a podobně). V jakém místě skript připojit proto závisí na prioritách daného webu.

## Čekání na vytvoření DOMu

Asynchronní JS má ze své povahy svou specifickou vlastnost v tom, že se může vykonat prakticky v libovolnou dobu.

U synchronního JS se je možné spolehnout, že HTML elementy nebo jiné JS soubory nacházející se před připojením externího skriptu jsou dostupné a elementy/skripty po připojení ještě ne. U asynchronního mohou nastat oba případy.

### Příklad synchronního JS

Jako příklad může posloužit následující synchronní kód:

```
&lt;div id="neco">…&lt;/div>
&lt;script src="funkce.js">&lt;/script>
&lt;script src="**synchronni-skript.js**">&lt;/script>
&lt;div id="neco-jineho">…&lt;/div>
```

Pokud bude výše uvedený `synchronni-skript.js` chtít pracovat s elementem `#neco` pomocí funkce ze souboru `funkce.js`, bude to OK. Pokud bude chtít pracovat s elementem `#neco-jineho`, nepůjde to, protože tento element ještě v daném momentu nebude v DOMu.

### Příklad asynchronního JS

Případ s použitím `async` se na první pohled moc neliší:

```
&lt;div id="neco">…&lt;/div>
&lt;script src="funkce.js">&lt;/script>
&lt;script src="**asynchronni-skript.js**" *async*>&lt;/script>
&lt;div id="neco-jineho">…&lt;/div>
```

Podstatně se ale liší funkčnost:

    Soubor `funkce.js` 

To se někdy hodí – typicky u **měřicích skriptů** typu [Google Analytics](/ga), kdy není třeba manimulovat s DOMem stránky.

Pokud se tedy skript připojí asynchronně na začátku stránky a potřebuje pracovat s elementy na stránce, je třeba zajistit, aby se spustil v určitou dobu, kdy už potřebné elementy budou v DOMu.

## Čekání na načtení

```
window.addEventListener('load', function () {
    console.log(jQuery.fn.jquery);
});
```

    StackOverflow: Javascript run inline script after load async resources

    - [How to wait for DOM elements to show up in modern browsers](http://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663)