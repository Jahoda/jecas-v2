---
title: "Shadow DOM"
headline: "Shadow DOM"
description: "Shadow DOM je technologie, která umožňuje vytvářet zapouzdřené komponenty s isolovaným CSS a JavaScriptem. Podíváme se na to, jak funguje a jak ji využít."
date: "2018-10-29"
last_modification: "2018-10-29"
status: 0
tags: ["shadow-dom", "web-components", "css", "js", "html"]
format: "markdown"
---

Shadow DOM je klíčovou součástí specifikace Web Components, která umožňuje vytvářet zapouzdřené HTML komponenty s isolovaným CSS a JavaScriptem. Tato technologie řeší problém s globálními styly a konflikty v CSS.

## Co je Shadow DOM?

Shadow DOM vytváří isolovaný DOM strom, který je připojen k elementu, ale je oddělený od hlavního dokumentu. To znamená, že styly a skripty uvnitř Shadow DOM neovlivňují zbytek stránky a naopak.

```html
<div id="host">
  <p>Tento text je v light DOM</p>
</div>

__PROTECTED_BLOCK_1__
```

## Režimy Shadow DOM

### Open mode
```javascript
const shadow = element.attachShadow({mode: 'open'});
```
V open režimu je Shadow DOM přístupný zvenčí pomocí `element.shadowRoot`.

### Closed mode
```javascript
const shadow = element.attachShadow({mode: 'closed'});
```
V closed režimu je Shadow DOM zcela isolovaný a není přístupný zvenčí.

## Praktický příklad

Vytvoříme vlastní komponentu s Shadow DOM:

```html
<my-button>Klikni na mě</my-button>

__PROTECTED_BLOCK_2__
```

## Slot element

Slot umožňuje vkládat obsah z light DOM do Shadow DOM:

```html
<my-card>
  <h2 slot="title">Nadpis karty</h2>
  <p slot="content">Obsah karty</p>
</my-card>

__PROTECTED_BLOCK_3__
```

## CSS pseudo-selectory

### ::slotted()
Styluje elementy vložené přes slot:
```css
::slotted(h2) {
  color: blue;
}
```

### :host
Styluje host element:
```css
:host {
  display: block;
  margin: 10px;
}

:host(:hover) {
  background: #f0f0f0;
}
```

### :host-context()
Styluje host na základě kontextu:
```css
:host-context(.dark-theme) {
  background: #333;
  color: white;
}
```

## Browser support

Shadow DOM je podporován ve všech moderních prohlížečích:

– Chrome 67+
– Firefox 63+
– Safari 10.1+
– Edge 79+

## Polyfill

Pro starší prohlížeče můžete použít polyfill:

```html
__PROTECTED_BLOCK_4__
```

## Výhody Shadow DOM

1. **Izolace stylů** – CSS uvnitř Shadow DOM neovlivňuje zbytek stránky
2. **Zapouzdření** – komponenty jsou samostatné a znovupoužitelné
3. **Bezpečnost** – JavaScript uvnitř Shadow DOM má omezený přístup
4. **Modularita** – snadné vytváření a distribuce komponent

## Nevýhody

1. **Složitost** – větší křivka učení
2. **Debugging** – obtížnější ladění v DevTools
3. **Kompatibilita** – potřeba polyfillů pro starší prohlížeče

## Závěr

Shadow DOM je mocná technologie pro vytváření zapouzdřených webových komponent. I když má své výzvy, poskytuje elegantní řešení pro izolaci stylů a logiky komponent.

## Užitečné odkazy

– [MDN: Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
– [Web Components specifikace](https://w3c.github.io/webcomponents/spec/shadow/)
– [Rob Dodson: Which elements support shadow DOM?](https://robdodson.me/which-elements-support-shadow-dom/)
– [Mozilla Developer Tools support for Web Components](https://blog.nightly.mozilla.org/2018/09/06/developer-tools-support-for-web-components-in-firefox-63/)