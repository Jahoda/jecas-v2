---
title: "Grafický editor v prohlížeči"
headline: "Grafický editor v prohlížeči"
description: "Jaké jsou možnosti pro provádění úprav obrázků (zvýraznění, přidání popisků apod.) přímo v prohlížeči."
date: "2014-11-06"
last_modification: "2014-11-24"
status: 1
tags: ["JavaScript", "Rady a nápady", "Obrázky"]
---

Při tvorbě základního **grafického editoru** přímo v prohlížeči máme v zásadě 3 možnosti.

    Jako pozadí plátna použít **původní obrázek** a nad ním vytvářet úpravy překrýváním [absolutně posicovanými](/position#absolute) HTML elementy.

    Při volbě *Uložit* potom souřadnice, rozměry nebo text poslat na server, kde se obrázek překreslí.

    Jedná se o hodně pracnou metodu, neboť se *kreslení* bude muset realisovat dvakrát.

    Použít element [`&lt;canvas>`](/canvas). Do toho lze kreslit poměrně snadno a není problém výsledek uložit převedením na [data URL](/data-uri) (`canvas.toDataURL()`), z čehož výsledný obrázek vyrobí krátký PHP skript, který se může volat [AJAXem](/ajax):

    ```
if (isset($_GET["data"])) {
  $img = str_replace('data:image/png;base64,', '', $_GET["data"]);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $filename = md5($data) . ".png";
  file_put_contents($filename, $data);
  echo $filename; // vrátí název souboru
}
```

    Zásadní nevýhoda `&lt;canvas>`u tkví v tom, že je **nízkoúrovňový** – jednotlivé objekty se ihned po nakreslení stanou **součástí obrázku**. Je proto značně komplikované provádět primitivní úkony jako **přesun nakresleného objektu**, protože se musí *počítat* pixel po pixelu a celé plátno neustále **překreslovat od nuly**.

        - [Jednoduchá ukázka přesunu s překreslováním](http://jsfiddle.net/Zevan/QZejF/3/)

        - [HTML5 Canvas Drag, Drop, and Resize Images](http://www.html5canvastutorials.com/labs/html5-canvas-drag-and-drop-resize-and-invert-images/) – přesun objektů v `&lt;canvas>`u pomocí [KineticJS](http://kineticjs.com/)

    Použít [**SVG**](/svg), kde je každý objekt representován značkou v [DOMu](/dom), a před uložením ho nakreslit do `&lt;canvas>`u, který se potom převede na data URL a uloží.

        - [Ukázka vektorového editoru používající SVG](http://jsvectoreditor.googlecode.com/svn/trunk/index.html)

        - [Raphaël](http://raphaeljs.com/) – JS knihovna zjednodušující práci s vektorovou grafikou

        - [Method Draw](http://editor.method.ac/)

        - [svg-edit](https://code.google.com/p/svg-edit/) ([demo](http://svg-edit.googlecode.com/svn/branches/stable/editor/svg-editor.html))

    [Živá ukázka](http://kod.djpw.cz/jehb) převodu SVG na *data URL*

## Odkazy jinam

  - [Photopea](https://www.photopea.com) – online *Photoshop* – dokáže otevří PSD soubory