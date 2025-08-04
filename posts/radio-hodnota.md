---
title: "Hodnota vybraného radio inputu"
headline: "Hodnota zaškrtnutého <code>radio</code> <code>&lt;input></code>u"
description: "Jak v JavaScriptu zjistit hodnotu označeného radio políčka."
date: "2015-03-04"
last_modification: "2015-03-04"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

Při vytváření [formulářů](/formulare) se v případě, že má návštěvník volit **jednu z několika možností**, hodí použít [`&lt;input type="radio">`](/input#type-radio).

Vytvoření skupiny políček, aby šlo vždy vybrat **pouze jedno**, se docílí použitím stejného názvu (`name`). Hodnota políčka se potom uvádí do atributu `value`.

    function radioValue(radioCollection) {
      for (var i = radioCollection.length - 1; i >= 0; i--) {
        if (radioCollection[i].checked) {
          return radioCollection[i].value;
        }
      }
      return false;
    }    

    Nevím

    Netuším

    Možná

      Co je vybráno?

Častou chybou při používání radio přepínačů je absence [značky `&lt;label>`](/label-for), kterou jde umožnit vybrání možnosti i kliknutím na popisek.

    - [20 nejhorších chyb formulářů](/chyby-formularu) – přehled nedostatků, kterým se vyvarovat při tvorbě formuláře

## Zjištění hodnoty JavaScriptem

Zjistit hodnotu vybrané položky není úplně snadné jako u obyčejné textové položky, kde je text políčka ve vlastnosti `value`.

Nezbývá než všechna radia projít [cyklem](/js-cykly), který vrátí hodnotu prvního a jediného vybraného přepínače (že je `&lt;input>` zaškrtnutý se pozná z vlastnosti `checked`):

```
function radioValue(radioCollection) {
  for (var i = radioCollection.length - 1; i >= 0; i--) {
    if (radioCollection[i].checked) {
      return radioCollection[i].value;
    }
  }
  return false;
}
```

Této funkci stačí předat kolekci radio prvků.

```
var hodnota = radioValue(
  document.jmenoFormulare.nazevRadioPolicek
);
```

    - [Přístup k prvkům formuláře](/js-prvky-formulare) – různé způsoby, jak zaměřit elementy formuláře

### Použití `querySelectoru`

Metoda [querySelector``](/queryselector) nabízí jinou možnost bez použití cyklu, jak z vybraného přepínače získat jeho hodnotu. Selektor [`:checked`](/css-selektory#checked) limituje funkčnost na **IE 9** a novější.

```
document.querySelector(
  'input[name="**nazevRadioPolicek**"]:checked'
).value;
```

    - [Samostatná ukázka získání `value` pomocí cyklu](http://kod.djpw.cz/duub)

    - [Samostatná ukázka získání hodnoty querySelectorem](http://kod.djpw.cz/euub)

### Hodnota vybraného radia v jQuery

V **jQuery** se dá použít obdobný postup jako s `querySelector`em i ve starších **IE**.

```
$(
  'input[name=**nazevRadioPolicek**]:checked'
).val();
```