---
title: "Přidat/odebrat třídu"
headline: "Přepínání tříd v JS"
description: "Přepínání, přidávání a odebírání CSS tříd JavaScriptem."
date: "2013-11-18"
last_modification: "2018-04-09"
status: 1
tags: ["JavaScript", "Hotová řešení", "Přepínání vzhledu"]
---

Chceme-li na stránce provádět [změny vzhledu](/zmena-vzhledu), [zobrazovat a skrývat text](/zobrazit-skryt) nebo obecně provádět nějaké **visuální změny**, existují dva základní postupy:

    Měnit CSS vlastnosti **přímo JavaScriptem** přes vlastnost `style`:

    ```
element.style.color = "red";
element.style.marginTop = "1em";
```

    Pomlčky (spojovníky) v názvech CSS vlastností se v JavaScriptu zapisují tak, že se **spojovník vypustí** a písmeno po něm se zvětší (u [CSS prefixů](/css-prefixy#js) je v **IE** drobná odlišnost).

    Případně se dají všechna pravidla **nastavit najednou** přes `style.cssText`:

    ```
element.style.**cssText** = "color: red; margin-top: 1em";
```

    Změnit **jen třídu** (`className`) a vzhled **řešit v CSS**.

Měnit **jen CSS třídu** bývá většinou lepší postup. Nezanáší se tolik JS kód a CSS je možné psát v běžném a komfortnějším prostředí, než je `cssText` řetězec.

Pochopitelně to **neplatí vždy**. Třeba u **dynamicky nastavovaných rozměrů** nemá smysl si vytvářet stovky tříd typu:

```
.sirka108 {width: 108px}
```

Ale asi bude výhodnější měnit `style.width`.

## Nastavit třídu

Nastavení požadované třídy se provádí změnou `element.className`.

Následující kód nastaví (přepíše) elementu s ID `idecko` třídu na `vlastni-trida`:

```
var **element** = document.getElementById("*idecko*");
element.className = "vlastni-trida";
```

## Přidat třídu

V případě, že element už **nějakou `class` má**, potřebujeme tu novou jen přidat, ale **zachovat původní**:

```
element.className **+**= "** **dalsi-trida";
```

Uvedený kód **přidá** k původní hodnotě `dalsi-trida`. Důležité je si uvědomit, že výsledným obsahem `className` musí být stejný obsah jako při klasickém nastavování tříd v HTML:

```
&lt;div class="prvni-trida** **dalsi-trida">
```

Nesmí se tedy **zapomenout na mezeru** mezi třídami. Mezery okolo jsou nadbytečné, ale ničemu **nevadí**.

## Odebrat třídu

Tady už se musí pro podporu napříč prohlížeči začít trošku víc programovat a pomocí `replace` požadovanou **třídu odstranit**.

```
function odebratTridu(element, trida) {
  element.className = element.className.replace(trida, "");
}
```

## Přidat/odebrat třídu

Pro **přepínání jedné třídy** můžeme použít něco jako:

```
function prepnout(element, trida) {
  if (element.className.match(trida)) {
    element.className = element.className.replace(trida, "");
  }
  else {
    element.className += " " + trida;
  }
}
```

V případě, že element už třídu má, bude mu **odebrána**; pokud ji naopak ještě nemá, **bude přidána**.

## Přepínání dvou tříd

A nakonec **prohazování dvou názvů třídy** bude vypadat následovně:

```
function prohoditTridy(element, trida1, trida2) {
  element.className = element.className == trida2 ? trida1 : trida2;
}
```

## Jakému `element`u třídu měnit?

Důležitá otázka je, kterému elementu třídu měnit/prohazovat/přepínat.

  - Pokud je tlačítko k přepínání **uvnitř elementu**, dá se na něj elegantně dostat přes `parentNode` ([ukázka](http://kod.djpw.cz/fzr)).

  - V ostatních případech je většinou nejlepší **najít element** přes `document.getElementById("idecko")` ([ukázka](http://kod.djpw.cz/hzr)).

## Seznam tříd `classList`

Od **IE 10** funguje v prohlížečích vlastnost `classList`:

  - `element.classList.contains("nazevTridy")` — zjistí, zda element má **nastavenou třídu**,

  - `element.classList.add("nazevTridy")` — **přidá třídu**,
  
  - `element.classList.remove("nazevTridy")` — **odebere třídu**,
  
  - `element.classList.toggle("nazevTridy")` — **přepne třídu** ([ukázka](http://kod.djpw.cz/izr)).

Testovat podporu `classListu` lze třeba přes:

```
if (document.documentElement.classList) {
  // classList funguje
}
```

Použití `classList`u by v **podporovaných prohlížečích** asi mělo být rychlejší. Existuje hotové řešení [Apollo.js](https://github.com/toddmotto/apollo), které právě v podporovaných prohlížečích použije `classList` a jinde *klasické řešení*.

### Pokročilejší `classList`

Mimo **IE** jde v novějších prohlížečích používat ještě užitečnější rozhraní `classList`:

    Druhý parametr v `classList.toggle`:

    ```
element.classList.toggle('prepnout-tridu', **promenna > 10**);
```

    Přidá/odebere třídu podle vyhodnocení podmínky v druhém argumentu.

    Více tříd v `classList.add`/`classList.remove`:

    ```
element.classList.add('prvni-trida', **druha-trida**);
```

    Nahrazení třídy přes `element.classList.replace`:

    ```
element.classList.replace('puvodni-trida', **nova-trida**);
```

    - MDN: [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)