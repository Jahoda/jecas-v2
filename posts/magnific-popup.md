---
title: "„Lightbox“ Magnific Popup"
headline: "Magnific Popup – zajímavý lightbox skript"
description: "Rozumně napsaný, universální a dobře použitelný lightbox skript."
date: "2013-05-09"
last_modification: "2013-12-07"
status: 1
tags: ["Frameworky", "Lightbox"]
---

[Web Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/) [Dokumentace](http://dimsemenov.com/plugins/magnific-popup/documentation.html)

Na stránce projektu se lze podívat na hezké řešení vyskakovacích oken pomocí lightboxu.

Zajímavý je rovněž [postup tvorby](http://coding.smashingmagazine.com/2013/05/02/truly-responsive-lightbox/), ze kterého je vidět, že autor věděl, co dělá.

  - Celé vyskakovací okno je **tvořeno pomocí CSS** a plynule se přizpůsobuje velikosti plochy prohlížeče, nemůže se stát, že JavaScript šířku/výšku špatně vypočte,

  - Magnific Popup **neprovádí zdlouhavé otravné animace**, 

  - obrázky v galerii lze **pohodlně přednačítat** a dokonce nastavit počet preloadovaných obrázků zvlášť pro přechod zpět i vpřed,

  - **lze ovládat klávesami** (šipky doprava a doleva, klávesou `Esc` se lightbox zavře),

  - rozumný HTML kód a [funkčnost bez JS](/vypnuty-js) — co by se s JS mělo otvírat ve vyskakovacím okně se *otevře* běžným odkazem,

  - **možnost vyskakovací okno lehce vypnout** např. při nízké šířce okna,

  - ovládací prvky jsou *nakresleny* pomocí CSS, **neplýtvá se tedy HTTP spojeními** na obrázek/obrázky,

  - **předvídatelné ovládání**, jednotlivé prvky kolem sebe mají *polštář*, ve kterém jsou stále klikací,

  - **kvalitní dokumentace**.

Nevýhody?

  - Dobře funkční až od **Internet Exploreru 8**, částečně od **IE 7**.

  - Pro frameworkové odpůrce: závislé na jQuery/Zepto.js.

## Příklady použití

### Vstupní stránka

Kromě zobrazení na vyžádání (po kliknutí na tlačítko a podobně) je možné lightbox zobrazit **ihned po načtení**. [Ukázka](http://kod.djpw.cz/gnv) (další možnosti [vytvoření vstupní stránky](/vstupni-stranka)).

Jako `src` je možné nastavit i **kus HTML kódu**.

```
window.onload = function (){
  $.magnificPopup.open({
      items: [
        {
          src: $('&lt;div class="popup">Vstupní vyskakovací okno&lt;/div>'),      
        }
      ]
  });
}
```

### Zobrazení HTML stránky

Docílit se dá nejen zobrazování obrázků, ale i jiných HTML stránek.

  V `&lt;iframe>`. [Ukázka](http://kod.djpw.cz/env).
  ```
$("#tlacitko").magnificPopup({
    items: [{
        type: 'iframe',
        src: 'http://example.com',       
      }]
});

```

  Z **vlastní domény** to jde kromě toho i [AJAXem](/ajax).
    ```
&lt;a href="/url-stranky" class="**ajax**">Odkaz, jehož cíl se načte AJAXem do lightboxu&lt;/a>
&lt;script>
  $('.**ajax**').magnificPopup({type: 'ajax'});
&lt;/script>
```

## Odkazy jianm

  - [PhotoSwipe](http://photoswipe.com/)