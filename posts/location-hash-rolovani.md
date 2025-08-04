---
title: "Změna location.hash bez odrolování stránky"
headline: "Změna <code>location.hash</code> bez posunu stránky"
description: "Jak změnit <code>location.hash</code> bez posunutí stránky."
date: "2014-01-02"
last_modification: "2014-01-02"
status: 1
tags: ["JavaScript", "Hotová řešení", "Scrollování"]
---

V případě, že se na stránce mění `location.hash` (#mřížka a obsah za ní v URL), prohlížeč zkusí **najít element** s odpovídajícím ID a **odscrollovat k němu**.

Tato funkčnost nemusí být vždy žádoucí. Třeba u [přepínání obsahu](/zobrazit-skryt), kdy chceme umožnit odkazování na příslušnou kotvu, ale poskočení je **zbytečně rušivé**.

## Řešení

Postupů, jak změnit `hash`, ale neodrolovat, existuje několik.

  - **Změnit hash** na něco, co žádný `&lt;element id="idecko">` nezachytí. Nevýhoda je, že tato vygenerovaná adresa nebude bez JavaScriptu fungovat. Kromě toho nepůjde použít CSS selektor [:target](/zvyrazneni-kotvy).

    **Změnit ID elementu** — po vyvolání akce (typicky [kliknutí](/udalosti-mysi#onclick)) se uloží do dočasné proměnné odkaz na element, změní se mu ID, změní se `location.hash`, vrátí se původní ID.

    ```
var element = document.getElementById(obsahHashe);
var puvodniId = element.id;
element.id = puvodniId + "-nesmysl";
location.hash = "#" + puvodniId;
element.id = puvodniId;

```

    [Ukázka](http://kod.djpw.cz/zuab)

    Problém s `:target` selektorem ale přetrvává.

    **[Odrolovat](/odrolovani) na původní posici** změnou `scrollTop` — uloží se o kolik je odrolováno, změní se `hash` a odroluje se zpátky.
    
    ```
var top = document.documentElement.scrollTop + document.body.scrollTop;
location.hash = "#" + idElementu;
document.body.scrollTop = document.documentElement.scrollTop = top;
```

    V některých prohlížečích je třeba [používat](/zvyrazneni-odrolovani#quirk) `body.scrollTop` a jinde `documentElement.scrollTop`.

    [Ukázka](http://kod.djpw.cz/avab)