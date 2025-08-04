---
title: "Capture"
headline: "Capture"
description: "Vyfocení obrázku nebo nahrání videa z mobilu přímo na web."
date: "2014-11-26"
last_modification: "2014-11-26"
status: 0
tags: []
---

Pokud chceme na mobilní webové aplikaci umožnit uživateli **vyfocení obrázku** nebo **natočení videa**, jde k tomu použít standardní formulářové [políčko pro **upload**](/input#type-file).

```
&lt;input type="file" accept="image/*">
```

Po kliknutí do něj nabídne **mobilní operační systém** jako jednu z možností **vytvoření fotografie** (popř. videa).

HTML atribut `capture` potom řeší přímé určení, že se bude fotit.

```
&lt;input type="file" accept="image/*" **capture="camera"**>
```

```
&lt;input type="file" accept="image/*;**capture=camera**">
```

## Odkazy jinam

  - HTML5Rocks: [Capturing Audio &amp; Video in HTML5](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)

  - W3C: [HTML Media Capture](http://dev.w3.org/2009/dap/camera/)