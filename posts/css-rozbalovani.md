---
title: "Rozbalování a sbalování obahu v CSS"
headline: "Rozbalování a sbalování obahu v CSS"
description: "Jak skrývat a odkrývat části stránky v čistém CSS bez jakéhokoliv JavaScriptu."
date: "2014-01-15"
last_modification: "2014-01-15"
status: 1
tags: ["CSS", "Hotová řešení", "Přepínání vzhledu"]
---

Když chceme na stránce vytvořit obsah, který **nemá být ihned viditelný**, existuje relativně prosté řešení [skrývání a odkrývání v JavaScriptu](/zobrazit-skryt), které díky [animacím](/animace) může být i [plynulé](/animace-skryt) (ideální je skriptem jen [přepínat třídy](/prepinani-trid)).

Kromě toho je možné od **IE 9** tuto funkci zajistit **čistě v CSS**.

/* Přepínání */
input.rozbalovac {display: none;} /* skrytí inputu */
input[type=checkbox]:checked + .rozbalovaci .obsah {display: block} /* zobrazení obsahu */

.rozbalovaci > .obsah {display: none} /* skrytí obsahu */

/* Styl přepínátka */
.rozbalovaci > label {
  display: block;
  cursor: pointer;
  background: #0D6AB7;
  color: #fff;
  padding: .5em;
}
input[type=checkbox]:checked + .rozbalovaci label {background: #1081DD;}

.rozbalovaci > label:before {content: "+"; background: #fff; color: #000; padding: 0 .3em; margin-right: .5em; border-radius: 3px}
input[type=checkbox]:checked + .rozbalovaci label:before {content: "−"}

.rozbalovaci > .obsah {background: #fff; padding: .5em}

  Klikací nadpis obsahu
  
    Obsah, který se objeví po kliknutí.

[Živá ukázka](http://kod.djpw.cz/ifbb)

## Selektor `:checked`

Řešení využívá [selektoru zaškrtnutí](/css-selektory#checked) (proto je funkčnost limitována tímto selektorem na **IE 9+**), kdy se před skrývaný `&lt;div>` umístí [`&lt;input type=checkbox>`](/input#type-checkbox), který v závislosti na svém **zaškrtnutí** požadovaný obsah skryje/zobrazí.

Totožného principu lze využít i k:

  - [jednoduchému filtrování dat](/css-filtrovani-dat) nebo k 

  - [zajímavějšímu stylu zaškrtávátek](/stylovani-checked).

Zmíněný `checkbox` je potom **skrytý** a *ovládá se* značkou [`&lt;label>` s atributem `for`](/label-for). Symboly plus a [mínus](/ceska-klavesnice#kody) jsou vytvořeny [atributem `content`](/content-attr), nicméně může se jednat o prosté `&lt;span>`y, které snadno v `&lt;label>u` zaměříme:

```
input[type=checkbox]:checked + .rozbalovaci label > **span** {}
```

## Fallback pro starší IE

Záleží-li nám i na starších prohlížečích (**IE 8** a starší), nezbývá než použít JS řešení nebo doplnit podporu [CSS 3 selektorů v IE](/css3-ie).