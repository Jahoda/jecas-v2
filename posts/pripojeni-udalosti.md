---
title: "Připojování událostí v JS"
headline: "Navázání událostí v JavaScriptu"
description: "Jaké existují postupy pro <i>navěšení</i> JavaScriptové události na element. Výhody a nevýhody různých řešení."
date: "2014-03-03"
last_modification: "2017-07-30"
status: 1
tags: ["JavaScript", "JS události"]
---

Chceme-li na stránce vykonat nějakou JS akci, zpravidla si vytvoříme funkci, která se ve vhodný okamžik (při spuštění vhodné události) spustí.

## HTML atribut

Asi nejjednodušší možnost je použít HTML atribut.

```
&lt;button **onclick**="akce()">
  Tlačítko
&lt;/button>
```

[Ukázka](http://kod.djpw.cz/tecb)

Výhodné je, že z HTML kódu je ihned patrné, že se tlačítko používá pro spouštění JS akcí.

Někomu ale může přijít umisťování JS kódu do HTML jako *nečisté řešení*.

### Celé kusy JS

Do `on*` atributů je možné psát i celé bloky kódu, to ale příliš nedoporučuji.

  - Takový kód není **znovupoužitelný**.

  - Psaním do řetězce se ve většině editorů připravíme o barvení kódu. A nakonec si tím i *vyplácáme* jedny [uvozovky](/uvozovky).

## Pseudo-odkaz

Pro [klikací události](/udalosti-mysi#kliknuti) je možné využít běžný HTML odkaz:

```
&lt;a href="**javascript:**akce()">
  Odkaz
&lt;/a>
```

[Ukázka](http://kod.djpw.cz/uecb)

Puntičkářům se na tomto způsobu nebude líbit, že bez podpory JavaScriptu je na stránce **nefunkční odkaz**. Řešení je toto tlačítko při absenci JS [skrýt přes CSS](/vypnuty-js).

## Nastavování vlastností

První z možností, která odděluje HTML a JS kód, vypadá následovně. V HTML kódu se prvek, ke kterému připojíme událost, poznačí třeba pomocí [`id`](/id-class) (nebo se zajistí, aby se dal rozumně vybrat přes [`querySelector`](/queryselector)).

```
&lt;button **id**="tlacitko">
  Tlačítko
&lt;/button>
```

Pod tento HTML kód se připojí skript, který si element (v tomto případě podle ID) najde a **nastaví mu událost**.

```
// Najití elementu
var element = document.getElementById("tlacitko");
// Nastavení události
element.**onclick** = akce;

```

[Ukázka](http://kod.djpw.cz/vecb)

Trochu ošemetné je, že nás může svádět napsat dle zvyku z HTML atributů něco jako:

```
element.onclick = akce**()**;
```

To většinou ale není žádoucí, protože jako událost chceme zpravidla připojit danou funkci a **ne její výsledek**, což by způsobily právě ty dvě závorky (funkce by se zavolala a do `onclick`u by se přidal její výsledek).

### Více funkcí

Má-li se po kliknutí (nebo jiné události) provést více funkcí, řeší se to zpravidla vytvořením **anonymní funkce**.

```
element.onclick = function() {
  akce();
  akce2();
};
```

Zde už je záměrem funkci `akce` a funkci `akce2` zavolat, proto ty `()`.

## Akce přes `setAttribute`

Připojit událost jde dále metodou `setAttribute`:

```
element.setAttribute("onclick", "akce()");
```

Tím se pro vybraný `element` docílí podobného efektu jako při použití `on*` HTML atributu.

Stejně tak trpí toto řešení totožným problémem: psaní skriptu do textového řetězce. Omezuje to znovupoužitelnost a v editoru může být problém se zvýrazňováním syntaxe.

## Metody `addEventListener`/`attachEvent`

Poslední možnost je používat metodu `addEventListener`, resp. `attachEvent` pro starší než **IE 9**.

```
element.addEventListener("click", akce);
```

Pro **IE 8** a starší stačí vybrat nějaký [polyfill](https://gist.github.com/eirikbacker/2864711).

Metodě `addEventListener` se jako první parametr předává název události. Ale už bez `on`, takže např. `click`, `mousemove` a podobně. Druhý parametr je potom funkce, která se má při spuštění události provést. Opět je možné používat i funkci anonymní:

```
element.addEventListener("click", function() {
  akce();
});
```

Asi hlavní výhoda tohoto postupu je, že umožňuje pohodlně navazovat do jedné události několik funkcí ([ukázka](http://kod.djpw.cz/xecb)). Obdobný [postup](http://kod.djpw.cz/wecb) by u předchozího způsobu nastavil jen tu poslední akci.