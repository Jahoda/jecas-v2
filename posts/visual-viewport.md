---
title: "VisualViewport API"
headline: "VisualViewport API"
description: "VisualViewport API umožňuje v JS lépe reagovat na velikost viewportu a jeho změny."
date: "2021-03-08"
last_modification: "2021-03-08"
status: 1
tags: ["JavaScript", "Rozlišení"]
---

V některých situacích si pro požadované chování nejde už vystačit s CSS a je potřeba JavaScriptem zjišťovat rozměry viewportu a něco podle nich nastavovat.

Ve světě před mobilními zařízeními šlo celkem snadno zjišťovat [rozměry stránky](/zjisteni-rozmeru) nebo viewportu.

  `window.innerWidth`
  
    Starší šířka viewportu: 

  `window.innerHeight`
  
    Starší výška viewportu: 

Bohužel pro mobilní prohlížeče to úplně použitelné není kvůli různým virtuálním lištám a klávesnicím. Zvlášť u **Safari** v **iOS** se výše uvedené rozměry často liší od reality.

Věčný problém u iPhone bývalo spočítat **výšku SW klávesnice** – přesněji řečeno zbývající plochu kolem klávesnice. Teď to jde snadno:

  `window.visualViewport.height`
  
    Šířka viewportu: 

  `window.visualViewport.width`
  
    Výška viewportu: 

Zkuste si pro vyzkoušení kliknout do pole, aby se klávesnice zobrazila:

Jak je vidět na obrázku – v iOS na iPhone jde konečně zjistit dostupný prostor kromě klávesnice a lišt.

A je to universálně funkční nezávisle na použité SW klávesnici.

Více o VisualViewport API v angličtině na MDN:

      MDN: [Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API)

## Použití

Vše je dostupné v objektu `window.visualViewport`.

Pro pohodlnější práci se může hodit použít proměnnou.

```
var viewport = window.visualViewport
```

  `window.visualViewport.offsetLeft`
  
    Offset zleva: 

  `window.visualViewport.offsetTop`
  
    Offset shora: 

  `window.visualViewport.pageLeft`

  `window.visualViewport.pageTop`

  `window.visualViewport.scale`
  
    Poměr zazoomování: 

Nejlepší je si zkusit zoomovat a posouvat stránkou pro pochopení.

### Události

Existují dvě – `scroll` a `resize`. Pouští se buď při scrollování, nebo při změně velikosti (sem patří i přiblížení/oddálení):

```
window.visualViewport.addEventListener('scroll', funkcePoScrollu)
window.visualViewport.addEventListener('resize', funkcePoResizeNeboZoomu)
```

## Podpora

Nefunguje ve starém **IE 11** a ve **Firefoxu** – to nejsou zase tolik obvyklé mobilní prohlížeče, takže tam si jde vystačit s konstrukcemi typu `widnow.innerWidth` apod.

Zvlášť užitečné se zdá být v **Safari** v **iOS** (podpora od verse 13), kde byl dříve značný problém zjistit skutečnou dostupnou plochu.

Jedná se zatím o experimentální API, takže je možné, že se časem změní.

Kvůli nepodpoře v některých prohlížečích je vhodné detekovat podporu:

```
if (window.visualViewport) {
  // kód pracující s VisualViewport API
}
```

  function reCount() {
    var items = document.getElementsByTagName("tt");
    for (var i = 0; i