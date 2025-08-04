---
title: "Test existence obrázku JavaScriptem"
headline: "Ověření existence obrázku pomocí JS"
description: "Jak JavaScriptem ověřit existenci obrázku?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

K ověření existence stačí obrázek vytvořit (`new Image()`), nastavit mu `src` a:

na událost `onerror` zavěsit kód, který se má provést při neexistenci,
na událost `onload` naopak kód pro existenci.

```
function overitExistenci(url) {
    var isExist = new Image();
    isExist.src = url;
    isExist.onerror = function () {
        alert("Neexistuje");
    };
    isExist.onload = function () {
        alert("Existuje");
    };
}
```