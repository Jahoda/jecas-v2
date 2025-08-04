---
title: "Minlength"
headline: "Atribut <code>minlength</code>"
description: "HTML atribut <code>minlength</code> stanovuje minimální počet znaků, který musí být v políčku."
date: "2015-01-27"
last_modification: "2015-02-11"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Atribut `minlength` je opakem [`maxlength`](/maxlength), který naopak nastavuje maximální možnou délku. Dá se použít u značek [`&lt;input>`](/input) a [`&lt;textarea>`](/textarea).

```
&lt;input **minlength**="5">
```

        Zadejte 5+ znaků: 

        Odeslat

[Samostatná živá ukázka](http://kod.djpw.cz/fhkb)

Políčko výše bude vyžadovat **5 a více znaků**. Trochu zajímavé chování nastane při nevyplnění políčka – v takovém případě **validace úspěšně projde** – proto se může hodit kombinace s [`required`](/required).

```
&lt;input *minlength*="5" **required**>
```

## Podpora v prohlížečích

HTML atribut `minlength` funguje zatím pouze v prohlížečích používající jádro **Blink**. Minimální délku pole podporuje minimálně **Chrome 40** a **Opera 27**.

Pro starší prohlížeče nezbývá než použít **JavaScript**:

```
pole.value.length
```

A v každém případě je nutné provést i **validaci na straně serveru**.

## Odkazy jinam

  - WHATWG: [The `minlength` attribute](https://html.spec.whatwg.org/multipage/forms.html#attr-fe-minlength)