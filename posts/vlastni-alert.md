---
title: "Vlastní alert"
headline: "Vlastní hláška <code>alert</code>"
description: "Jak si v JavaScriptu vytvořit vlastní hlášky jako je výchozí <code>alert</code>."
date: "2013-12-19"
last_modification: "2017-02-17"
status: 1
tags: ["JavaScript", "Hotová řešení", "Animace"]
---

V **JavaScriptové aplikaci** bývá často potřeba uživatele informovat o nějaké akci, která proběhla [AJAXem](/ajax) na pozadí.

  Zobrazit hlášku

To není úplně špatné, ale někdy je výchozí podoba `alert`u moc agresívní. Pokud vyskočí, **nejde zpravidla dále na stránce nic dělat**. (S tím souvisí i jedna vlastnost `alert`u, která nejde nahradit, to jest **pozastavení skriptů**.)

## Přepsání `alert`u

První možnost je funkci `alert` nahradit, jeho překrytí může vypadat zhruba takto:

```
window.alert = function (hlaska) {
  // nějaké vypsání hlášky
}
```

Nepřijde mi to ale moc chytré. Není-li problém všude na stránce volat vlastní funkci, je vhodnější si originální `alert` ponechat.

## Vlastní hláška

Jak si vlastní hlášku vyrobit.

  /* reset */ 
  #hlaska {margin: 0; font-size: 100%}

#hlaska {background: #DA3F94; color: #fff; position: fixed; width: 50%; left: 50%; margin-left: -25%; padding: .5em; top: -3em; transition: top 1s}
#hlaska.zobrazit {top: 0}

Hláška

function hlaska(text, vycistit) {
  var casovac;
  vycistit = (typeof vycistit === "undefined") ? 3 : vycistit;
  var h = document.getElementById("hlaska");
  if (h.className == "zobrazit" && h.innerHTML == text) return;
  
  h.innerHTML = text;
  h.className = "zobrazit";

  clearTimeout(casovac);
  casovac = setTimeout(function() {
    h.className = "";
  }, vycistit * 1000)
}

  - Na stránku se přidá prázdný `&lt;div>`, který bude mít ID, aby ho JavaScript [našel](/queryselector).

  - Tento element se vhodně nastyluje. Například se může [fixně naposicovat](/position#fixed) k horní straně okna a třeba ještě [vycentrovat](/centrovani#absolute).

  - [Skrývání/zobrazování](/zobrazit-skryt) potom bude řešené [přepínáním tříd](/prepinani-trid) (je možné provést i [plynulé skrývání](/animace-skryt)).

  - Vlastní JS funkce potom nastaví dle parametru obsah (`innerHTML`) a přepne třídu.

  - Automatické **schování hlášky** po nějaké době může zajistit [časovač](/odpocitavani) `setTimeout`.

Použití je prosté. První parametr je text. Druhý je volitelný a určuje **čas, po kterém se hláška skryje** (ve vteřinách):

```
hlaska('Text první hlášky', 5);
```

[Samostatná ukázka](http://kod.djpw.cz/eny)

## Přepsání i zachování výchozího `alert`u

Pan **Kubo2** přišel s dobrou připomínkou, že není problém výchozí `alert` přepsat vlastní hláškou, ale zároveň si ho **nejprve uložit** do proměnné.

Potom můžeme vytvářet *hezké* hlášky funkcí pojmenovanou `alert`, ale mít původní `alert` stále k disposici.

Snad jediné risiko je, že na tuto změnu chování zapomeneme nebo bude kód pro někoho jiného méně srozumitelný.

```
function hlaska(text) {
  // vlastní hláška
}
// Uložíme si originální alert
var puvodniAlert = window.alert;
// Přepíšeme ho vlastní funkcí
window.alert = hlaska;

```

[Ukázka](http://kod.djpw.cz/bgab)

## Odkazy jinam

  - [sweetAlert 2](https://github.com/limonte/sweetalert2) – vlastní alert s plynulou animací