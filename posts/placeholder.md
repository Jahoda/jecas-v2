---
title: "Placeholder"
headline: "HTML atribut <code>placeholder</code>"
description: "HTML atribut <code>placeholder</code> slouží k zadání ukázkové hodnoty do formulářového pole."
date: "2014-02-15"
last_modification: "2014-02-15"
status: 1
tags: ["HTML", "JavaScript", "Stylování elementů", "Rady a nápady", "HTML atributy"]
---

```
&lt;input type="text" **placeholder**="text">
&lt;textarea **placeholder**="text">
&lt;/textarea>
```

Od **IE 10** je možné nastavit bez JavaScriptu do značky `[&lt;input>](/input)` nebo `&lt;textarea>` nějakou hodnotu jako příklad, která po **kliknutí do políčka zmizí**.

    Zadejte e-mail: 

[Samostatná ukázka](http://kod.djpw.cz/rybb).

Je otázka, jestli je současná implementace tohoto atributu v prohlížečích vyhovující. **Firefox** a **Chrome** totiž obsah `placeholder`u neodstraní **ihned po kliknutí**, ale až když se v poli začne psát.

Mám trochu obavu, že člověk, co do pole klikne a ve zmíněných prohlížečích **neuvidí žádnou odezvu**, bude chtít text smazat klávesou Delete nebo Backspace, což ale **nepůjde**.

**Internet Explorer** a *stará* **Opera 12** obsah `placeholder`u odstraní už při kliknutí (`focus`u).

## Řešení v JavaScriptu

Možná je proto stále lepší staré dobré řešení v JavaScriptu, kde se dá rozumné chování zajistit jednotně ve všech prohlížečích.

Kromě **smazání výchozí hodnoty** existuje i řešení, kdy se políčko **označí**, takže půjde rovnou přepsat správnou hodnotou.

### Smazání výchozí hodnoty

Využít lze události `onfocus` a `onblur`. Původní hodnota `value` se nachází ve vlastnosti `defaultValue`.

[Samostatná ukázka](http://kod.djpw.cz/sybb).

### Označení obsahu

Označení celého formulářového pole vypadá dost podobně. Jen se místo vymazání `value` při `focus`u celé pole označí přes `select()`. Pro správnou funkčnost v **Chrome** je nutné ještě **stornovat** událost `onmouseup`.

[Samostatná ukázka](http://kod.djpw.cz/jgcb).

### Animovaný placeholder

[Hotové řešení](https://github.com/jackrugile/placeholdem) placeholderu, jehož text mizí / objevuje se po jednotlivých písmenkách.

    Placeholdem(document.querySelectorAll('.animovany-placeholder'));

## Stylování `placeholder`u

Pro nastavení stylu textu zadaného do atributu `placeholder` existují pseudotřídy `::placeholder` nebo `::input-placeholder` navíc s [prefixy pro různé prohlížeče](/css-prefixy).

  Opera 12
  
    Stylování `placeholder`u neumožňuje.

  Chrome
  
    Ač je v názvu selektoru `input`, funguje i pro `&lt;textarea>`.

    ```
::-webkit-input-placeholder {
  /* styl */
}
```

  Firefox
  
    Do **Firefoxu 18**.

    ```
:-moz-placeholder {
  /* styl */ 
}
```

    V novějších potom s dvojtečkou navíc.

    ```
**:**:-moz-placeholder {
  /* styl */ 
}
```

    Pan **habendorf** doplnil, že ve **Firefoxu** má *placeholder* poloviční [průhlednost](/opacity) (`opacity: 0.5`), která způsobuje, že barvy nastavené pro placeholder nemají ve výsledku plnou sytost. [Ukázka](http://kod.djpw.cz/fmcb). Není-li takové chování žádoucí, stačí přidat `opacity: 1`.

  Internet Explorer
  
    **IE 10+**

    ```
:-ms-input-placeholder {
  /* styl */ 
}
```

[Ukázka](http://kod.djpw.cz/vybb) pro všechny prohlížeče.

Pozor, zápis se sloučením všech selektorů k jedné deklaraci nebude fungovat. Prohlížeče si *vylámou zuby* na selektorech konkurence a **styly se neaplikují**.

```
::-webkit-input-placeholder, 
:-moz-placeholder, 
::-moz-placeholder, 
:-ms-input-placeholder {
  /* společný styl, **nebude fungovat** */ 
}
```

## Placeholder jako popisek

Použití `placeholder`u místo popisku formuláře je vždy dobré zvážit. Může se stát, že uživatel klikne do políčka dříve, než si přečte a zapamatuje, co tam má vyplnit.

Tím se může dostat do dost svízelné situace, kdy se už k popisku dostane jen nepohodlným **obnovením celé stránky**.

## Odkazy jinam

  - Implementace `placeholder`u pro starší prohlížeče v jQuery: [Making HTML5 Placeholder Input Fields Cross-Browser with jQuery](http://scotch.io/quick-tips/making-html5-placeholder-input-fields-cross-browser-with-jquery)

  - Řešení stylovatelnosti ve staré Opeře: [How to style the &lt;input> placeholder?](http://my.opera.com/community/forums/topic.dml?id=1279012&t=1392458099&page=1#comment11456462)

  - [Animovaný placeholder](http://placeholdem.jackrugile.com/)