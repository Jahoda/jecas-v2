---
title: "Šířka posuvníku"
headline: "Šířka rolovací lišty"
description: "Jaká je šířka posuvníku v různých prohlížečích."
date: "2015-10-04"
last_modification: "2017-09-08"
status: 1
tags: ["Prohlížeče", "Scrollování"]
---

Rolovací lišta (posuvník, *scrollbar*) je nedílnou součástí stránky v **desktopových prohlížečích** v případě, že se obsah nevejde do vymezeného prostoru.

Posuvník **ubírá prostor pro stránku** – zmenšuje *viewport*.

To může způsobovat [poskakování stránky](/poskakovani-posuvnik) v případech, kdy:

    Na webu jsou hodně krátké stránky, které posuvník nepotřebují. Při přechodu mezi dlouhou stránkou s posuvníkem a krátkou **obsah poskočí**.

    U vyskakovacího překryvného obsahu (tzv. [lightboxu](/vstupni-stranka)) se zpravidla blokuje možnost rolovat v původní stránce.

    To se dělá přes `overflow: hidden`, což posuvník odstraní.

Kromě toho prostor ubraný posuvníkem **nemá vliv** na [`@media` pravidla](/media). Media queries se tak aplikují i v případě, že je viewport fakticky menší právě o šířku scrollbaru.

## Rozměry posuvníku

    &nbsp;
    
      &nbsp;

  Aktuální šířka posuvníku je: **** pixelů

    sirka.innerHTML = (bez.offsetWidth - s.offsetWidth);
    testSirky.style.display = "none";

Posuvníky ve [**Windows 10**](/windows-10) mají v **Chrome**, **Firefoxu**, **Internet Exploreru** šířku **17 pixelů**.

V **Opeře** na **Windows 10** potom **15 pixelů**.

Další výjimkou je [**Edge**](/microsoft-edge) s šířkou **12 pixelů**.

V mobilních prohlížečích a na **OS X** se potom posuvník zobrazuje jen někdy (když se začne rolovat) a **neubírá prostor pro stránku**. V těchto zařízeních by se měla ukazovat **nula**.

Nejrozmanitější je velikost rolovacích lišt v **Linuxu**, například v **Ubuntu 14.04** má posuvník ve **Firefoxu** 15 pixelů a v **Chrome** jen 13.

  Zobrazuje se vám nějaká jiná šířka nebo pozorujete jiné chování? Dejte mi prosím vědět do komentářů.

## Zjištění šířky posuvníku

Na nějakou **universální šířku** tedy nejde spoléhat. Maximálně jde orientačně vycházet z toho, že posuvník má šířku do cca 20 pixelů.

Pokud je potřeba počítat s **přesnými rozměry**, je nutné rozměr posuvníku spočítat v konkrétním prohlížeči.

Jak?

Třeba změřit šířku obyčejného `&lt;div>`u a potom jinému `&lt;div>`u natvrdo přidat posuvník pomocí `overflow-y: scroll`, dát do něj další `&lt;div>`, který už bude užší o šířku scrollbaru.