---
title: "Je uživatel online?"
headline: "Je uživatel online?"
description: "Jak zjistit, jestli je uživatel webové aplikace online nebo offline."
date: "2015-09-29"
last_modification: "2015-10-01"
status: 1
tags: ["JavaScript", "AJAX", "Offline"]
---

Díky tomu, že se webová stránka po načtení stáhne do prohlížeče návštěvníka, může následně fungovat i bez **připojení k internetu** (dokud nedojde k interakci vyžadující připojení).

Při použití [lokálního úložiště](/localstorage) a obsluhy stránky JavaScriptem nebo při použití *Service Workeru* jde potom obsahový web klidně celý stáhnout, aby fungoval i offline.

U webových stránek a aplikací, které mají lidé spuštěné delší dobu a je možné, že během jejich používání **vypadne připojení,** se nabízí **výpadek návštěvníkovi oznámit**.

## Proč detekovat offline stav

Znázornit, že je problém s přípojením, je dobré z několika důvodů:

  V případě nedostupného připojení uživatel nic netuše klikne na nějaký odkaz, čímž mu zmizí aktuální obsah a zobrazí se mu chybová stránka prohlížeče:

    Je-li výpadek kvůli **přetížení na straně serveru** a ne u klienta, na chybové stránce bude klávesou F5 neustále obnovovat stránku a dále server vytěžovat.

Pokud by na stránce bylo šetrné upozornění, mohl by si návštěvník alespoň dočíst, co už je načteno.

Jednoduchým skriptem jde potom **znázorňovat pokus o navázání spojení**. Ať už skutečně nebo takovou ilusi alespoň vytvářet, aby návštěvník neměl důvod bušit do F5.

Na problémy s připojením upozorňuje například *Chat* na [Facebooku](/facebook), který zobrazuje odpočítávání do dalšího pokusu o připojení:

## Řešení v JavaScriptu

V JavaScriptu existuje vlastnost [`onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) objektu `navigator`:

```
if (navigator.onLine) {
  // online
}
else {
  // offline
}
```

Zdá se být značně nespolehlivou, navíc se liší její chování napříč prohlížeči. **Internet Explorer 8+** a **Firefox 40** a starší se tváří jako offline jen při zapnutí *Offline režimu* v prohlížeči.

  function stavPripojeni() {
      document.getElementById("stav-pripojeni").className = 
        navigator.onLine ? 'online': 'offline';
  }
  stavPripojeni();
  window.addEventListener("offline", stavPripojeni);
  window.addEventListener("online", stavPripojeni);  

Samostatná [ukázka](http://kod.djpw.cz/rmqb) použití `navigator.onLine`.

### AJAX

Mnohem spolehlivější je použít [AJAX](/ajax). Při spuštění AJAXové akce potom zároveň spouštět časovač, který ji po neúnosně dlouhé době ukončí. **Úspěšné dokončení** tento časovač naopak zruší.

```
var casovac;
function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  var casovac = setTimeout(function() {
    // Požadavek se nestihl provést v limitu 10 vteřin
    xhr.abort();
  }, 10 * 1000);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // Požadvak dopadl OK, zruší se časovač
      clearTimeout(casovac);
      callback(xhr.responseText);
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
```

Při nesplnění limitu potom stačí zobrazit hlášku, že **je problém s přípojením**.

Použít časovač pro kontrolu průběhu AJAXu je dobré i pro znázornění načítání, aby uživatel věděl, že se něco děje:

    - [Průběh načítání AJAXu](/nacitani-ajax)

## Odkazy jinam

    - MDN: [NavigatorOnLine.onLine](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine)

    - HTML5 Rocks: [Working Off the Grid with HTML5 Offline](http://www.html5rocks.com/en/mobile/workingoffthegrid/)

#stav-pripojeni:before {
    content: "";
    display: inline-block;
    margin-right: .5em;
    width: .8em;
    height: .8em;
    background: green;
    border-radius: 50%;
}

#stav-pripojeni.online:after {
    content: "ONLINE";
}

#stav-pripojeni.offline:after {
    content: "OFFLINE";
}
#stav-pripojeni.offline:before {
    background: red;
}