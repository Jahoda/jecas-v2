---
title: "InnerHTML"
headline: "JS vlastnost <code>innerHTML</code>"
description: "Jak funguje vlastnost <code>innerHTML</code> v JavaScriptu. Různé způsoby vypisování obsahu v JS."
date: "2014-02-21"
last_modification: "2014-10-16"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

Napříč prohlížeči široce podporovaná metoda `innerHTML` slouží v JS k:

  - **získání HTML** obsahu nějakého elementu,

  - **nastavení HTML obsahu** do nějakého elementu.

## Získání obsahu

Po získání elementu (metodami [`getElement*`](/getelement), [`querySelector`](/queryselector)em a podobně) jde pracovat s jeho vlastností `innerHTML`. Třeba HTML obsah elementu s identifikátorem „`element`“ vypsat hláškou `alert`.

```
&lt;div id="**element**">*Obsah*&lt;/div>
&lt;script>
  var el = document.getElementById("**element**");
  alert(el.innerHTML); // vypíše „*Obsah*“
&lt;/script>
```

[Ukázka](http://kod.djpw.cz/wmgb)

## Nastavení `innerHTML`

Zajímavější je nepochybně nějaké HTML za pomoci JavaScriptu nastavovat. Díky tomu je možné do stránky **dynamicky vypisovat obsah**.

```
&lt;div id="**prazdny-element**">&lt;/div>
&lt;script>
  var el = document.getElementById("**prazdny-element**");
  el.innerHTML = "*Obsah*";
&lt;/script>
```

Tento kód vloží do prázdného `&lt;div>`u *Obsah*. [Ukázka](http://kod.djpw.cz/vmgb)

**Upozornění**: Důležitý obsah by měl být přímo v HTML. S obsahem vypsaným JavaScriptem mohou mít problémy vyhledávače.

## Jak `innerHTML` funguje?

Při nastavení `innerHTML` musí prohlížeč projít obsah řetězce a podle toho poupravit celý [DOM (Document Object Model)](/dom) daného elementu.

Z toho plyne pár úskalí, na která je si dobré **dát pozor**.

### Úprava `innerHTML` v cyklu

Mějme následující kód, který si najde seznam a v [cyklu](/js-cykly) do něj vloží 10 položek.

```
var element = document.getElementById("seznam");
for (var i = 1; i &lt;= 10; i++) {
  element.innerHTML += "&lt;li>" + i + "&lt;/li>";
}
```

[Ukázka](http://kod.djpw.cz/xmgb)

Funkční to bude, ale **zbytečně neefektivní** – každý jednotlivý průchod cyklu bude manipulovat s *DOMem* celého elementu.

Lepší řešení proto je si obsah ukládat do **pomocné proměnné** a pomocí `innerHTML` ho nastavit najednou:

```
var element = document.getElementById("seznam");
var obsah = "";
for (var i = 1; i &lt;= 10; i++) {
  obsah += "&lt;li>" + i + "&lt;/li>";
}
element.innerHTML = obsah;
```

[Ukázka](http://kod.djpw.cz/ymgb)

### Připojení obsahu

Konstrukce `element.innerHTML **+=** "&lt;p>něco&lt;/p>"` je obecně ve většině případů **dost nešťastná**.

Kvůli přidání *něčeho* se musí **znovu vytvořit celý DOM** `element`u. Kromě toho, že to u složitějších věcí dlouho trvá, se tím *zresetuje* dosavadní stav – například vyplněná **políčka formulářů** a podobně. (Někdy se to ale může hodit – třeba u [resetování `&lt;input type="file">`](/input-file).)

[Ukázka](http://kod.djpw.cz/angb)

## Vlastnost `insertAdjacentHTML`

Řešením na překreslování DOMu při změně `innerHTML` je metoda `insertAdjacentHTML`.

Funguje ve všech aktuálních versích prohlížečů (**IE 4+**, **Chrome 1+**, **Firefox 8+**, **Opera 7+**).

```
element.insertAdjacentHTML(umisteni, obsah);
```

První parametr `umisteni` určuje, kam se obsah má vložit:

  - `beforebegin` – před element

  - `afterbegin` – na začátek elementu

  - `beforeend` – před konec elementu

  - `afterend` – za element

U prostého odstavce vypadají posice následovně.

```
&lt;!-- beforebegin -->
&lt;p>
  &lt;!-- afterbegin -->
  Obsah
  &lt;!-- beforeend -->
&lt;/p>
&lt;!-- afterend -->
```

Druhý parametr `obsah` je potom text / HTML kód, který se má vložit.

[Ukázka](http://kod.djpw.cz/engb)

## Vlastnosti `textContent` a `innerText`

Pro získávání/nastavování obsahu, který **neobsahuje HTML**, existují vlastnosti podobné jako `innerHTML`.

Vlastnosti `textContent` i `innerText` fungují obdobně, jen mají **různou podporu v prohlížečích**.

  - `textContent` – funguje od **IE 9**

  - `innerText` – funguje všude kromě **Firefoxu**

[Ukázka](http://kod.djpw.cz/dngb)

Kvůli těmto rozdílům je snazší používat `innerHTML`. V případě, že je vyloženě cílem získat obsah **bez HTML značek**, je možné obě vlastnosti sjednotit.

```
var text = element.textContent || element.innerText;
```

## Odkazy jinam

  - DevDocs: [Node.textContent](http://devdocs.io/dom/node.textcontent)

  - MDN: [Element.insertAdjacentHTML()](https://developer.mozilla.org/en-US/docs/Web/API/element.insertAdjacentHTML)

  - John Resig: [DOM insertAdjacentHTML](http://ejohn.org/blog/dom-insertadjacenthtml/)