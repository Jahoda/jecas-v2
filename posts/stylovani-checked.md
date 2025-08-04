---
title: "Vylepšené stylování checkboxů"
headline: "Pokročilé stylování <code>checkbox</code>u"
description: "Díky <a href='/css-selektory#checked'>selektoru <code>:checked</code></a> lze v podporujících prohlížečích (Explorer 9 a novější) vytvářet zaškrtávací <code>&lt;input></code>y neotřelé podoby."
date: "2013-06-10"
last_modification: "2013-06-11"
status: 1
tags: ["CSS", "Stylování elementů", "Hotová řešení"]
---

Stačí k tomu pouze CSS. Kromě selektoru `:checked` se využívá přechodů pomocí `transition` (IE 10+). Podobného efektu jako u `checkbox`u lze docílit i u [`&lt;input type=radio>`](/input#type-radio).

/* koule */
label.koule {width: 50px; height: 20px; display: block; border: 1px solid #000; border-radius: 25px; padding: 5px; cursor: pointer; background: #fff}
.koule .status {width: 20px; height: 20px; display: block; background: red; border-radius: 50%; transition: all .2s; }
input:checked + label.koule .status {background: green; margin-left: 30px}
input:focus + label.koule {outline: #000 dotted 1px}

/* zapnuto/vypnuto */
.zapvyp .status {width: 120px; display: block; border: 1px solid #000; cursor: pointer; background: #fff}
.zapvyp .indicator {width: 50px; display: block; background: green; transition: all .2s; padding: 5px; text-align: center; color: #fff; font-weight: bold; font-family: "Arial"; line-height: 100%}
.zapvyp .indicator:after {content: "ano";}

input:checked + label.zapvyp .indicator {background: red; margin-left: 60px;}
input:checked + label.zapvyp .indicator:after {content: "ne"}
input:focus + label.zapvyp > .status {outline: #000 dotted 1px}

## Ukázky

(Jen pro test, že se řádně zaškrtává) 

Souhlasíte? 

## Jak to funguje?

Skryje se skutečný `checkbox`/`radio`,
**vedle** něj v kódu se umístí *atrapa*,
atrapa **musí být** tvořena značkou `&lt;label>` (nebo být uvnitř `&lt;label>`u),
lze ji při zaškrtnutí stylovat jako `input:checked + .atrapa {}`.

Podstatné je, aby se bylo *jak dostat* ze skutečného formulářového prvku na atrapu, tj. aby šlo použít selektor přímého (`E + F`) nebo libovolného sourozence (`E ~ F`).

## Problémy

Kromě toho, že je funkčnost zdejšího řešení zatím omezená napříč prohlížeči, je potřeba uvážit, zda uživatel pochopí, jak to celé funguje. **Chamurappi** se na diskusi JPW zajímavě vyjádřil ohledně risik spojených s řádným pochopením těchto ovládacích prvků z pohledu uživatele. A zároveň dobře zformuloval konkrétní řešení pro starší prohlížeče (níže).

## CSS a JS fallback

Výše uvedená ukázka je relativně funkční od Exploreru 9 (s přechodovou animací od IE 10), pro starší prohlížeče ji tedy nezbývá než vypnout nebo funkčnost doplnit JavaScriptem.

### CSS

Stačí využít nějaký selektor, který funguje shodně s `:checked` až od IE 9.
Například by šlo použít kořenový selektor (`:root`).
```
.atrapa {display: none}
:root .atrapa {display: block}
:root input.checkbox-ke-skryti {display: none}
```

### JavaScript

Javascriptový fallback, který by atrapu nerušil, by vypadal tak, že by se přidal `onclick="this.className = this.checked ? 'checked' : '';"` a krom pseudotřídy `:checked` by se atrapa chytala i třídy `.checked`.

Kombinace
Oba fallbacky je možné zkombinovat a atrapy vypínat jen v prohlížečích starších než IE 9 bez zapnutého JavaScriptu.
```
.atrapa {display: none}
:root .atrapa, 
**.js** .atrapa {display: block}

:root input.checkbox-ke-skryti, 
**.js** input.checkbox-ke-skryti {display: none}
```

## Odkazy jinam

  - [Stylování formulářů](/vzhled-formularu)

  - [iCheck](http://fronteed.com/iCheck/) — JS atrapa `radio` a `checkbox` [`&lt;input>`ů](/input)

  - [Switchery](http://abpetkov.github.io/switchery/) — JS atrapa checkboxů ve stylu iOS 7

  - [Různé efekty přepínání](http://codepen.io/mallendeo/pen/eLIiG)

  - [Switch Button #2](http://codepen.io/maturo/pen/dxAhE)