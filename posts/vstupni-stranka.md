---
title: "Lightboxová vstupní stránka"
headline: "Lightboxová vstupní stránka ihned po načtení"
description: "Jak vytvořit lightbox okno, které po načtení stránky překryje obsah."
date: "2013-05-20"
last_modification: "2013-11-04"
status: 1
tags: ["JavaScript", "CSS", "Lightbox", "Hotová řešení"]
---

V dávných dobách měl každý správný web **vstupní stránku** s odkazem na hlavní web. Dnes jde k tomu využít JavaScript.

Jak jednoduše vytvořit *lightboxové* **vyskakovací okno** ihned po načtení stránky.

Taková věc nemusí být **jen** bezúčelným otravným prvkem, ale může dávat i smysl v případech jako:

  upozornění na nějakou **významnou událost** na stránce,
    upozornění na ***speciální* obsah**,
      **reklama**.

## Jak na to?

### Lightbox

První možnost je použít nějaký **lightbox skript** — třeba [Magnific Popup](/magnific-popup) ihned po načtení stránky ([ukázka](http://kod.djpw.cz/gnv)).

```
$.magnificPopup.open({
    items: [
      {
        src: $('&lt;div class="popup">Vstupní vyskakovací okno&lt;/div>'),
      }
    ]
});
```

Jako obsah (tj. do `src`) je možné umístit **obrázek**, **HTML kód** (jako na ukázce) nebo odkaz na jinou **HTML stránku**.

### Vlastní řešení

Druhá možnost je si potřebný efekt z lightbox skriptu vytvořit *ručně*. V podstatě stačí jen obrázek/element [vycentrovat](/centrovani) a po kliknutí ho [zavřít změnou třídy](/zobrazit-skryt) + vytvořit [částečně průhledný](/opacity) element, co překryje původní obsah.

    .dialog-background {width: 100%; height: 100%; background: #000; opacity: .85; position: fixed; left: 0; top: 0; display: none}
    .dialog {width: 50%; position: fixed; left: 50%; top: 50%; height: 200px; margin-top: -100px; margin-left: -25%; background: #fff; color: #000; display: none;}
    .show .dialog, .show .dialog-background {display: block;}

    function openDialog(id) {
        document.getElementById(id).className+= " show";
        document.documentElement.style.overflow = "hidden";
    }
    
    function closeDialog(id) {
        document.getElementById(id).className = "dialog-cover";
        document.documentElement.style.overflow = "visible";	
    }

        ## Vstupní stránka

        Vlastní vyskakovací obsah ihned po načtení.

        Zavřít

    openDialog("okno");
  
  (Okno se automaticky otevírá při načtení stránky.)