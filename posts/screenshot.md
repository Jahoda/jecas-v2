---
title: "Jak udělat screenshot webu"
headline: "Screenshot webu"
description: "Jak z webové stránky vytvořit obrázek (screenshot)."
date: "2015-07-28"
last_modification: "2015-08-03"
status: 1
tags: ["Produktivita", "Rady a nápady", "Obrázky"]
---

Pro **zachycení obrázku webové stránky** existuje minimálně 6 následujících možností:

    Použít standardní **klávesu pro zachycení obrazovky** PrintScreen (na některých klávesnicích Prt Scr) a výsledek vložit do grafického editoru a uložit. Klávesovou zkratkou Alt + PrintScreen jde zachytit obsah pouze **aktuálního okna**.

    **Speciální program** typu *Výstřižky* ve Windows, kde jde v obrázku provádět i jednoduché úpravy:

    Další šikovný program na tvorbu screenshotů je [ShareX](http://getsharex.com/).

    Celý proces tvorby a sdílení screenshotů dokáže **ohromně zrychlit**. Po stisknutí některé z klávesových zkratek rovnou nahraje obrázek na vybrané úložiště a zkopíruje do schránky odkaz.

    Prohlížeč [Microsoft Edge](/microsoft-edge) dostupný ve [Windows 10](/windows-10) má přímo v sobě zabudovanou funkci pro **zachycení obrázku stránky** s možností zvýrazňování a psaní poznámek:

    Do prohlížečů podporující rozšíření jako je **Chrome**, **Opera** nebo **Firefox** existují doplňky pro **zachycení celé stránky** včetně obsahu „pod ohybem“, který se zobrazí až po odrolování.

    Existuje jich obrovské množství (stačí zadat *screenshot* nebo *screen capture* do hledání rozšíření). Osvědčil se mi nástroj **FireShot**:

        [FireShot](http://getfireshot.com/) – tvorba screenshotů celé stránky ve Firefoxu, Chrome, IE i Opeře

    Pro **automatisované získávání obrázku webu** na straně serveru existuje řada služeb nabízející API.

    Obrázek se v takovém případě vygeneruje v prohlížeči někde na cizím serveru.

          [Jak získat náhled webu?](/nahled-webu) – seznam služeb pro tvorbu screenshotů

    Přibližný obrázek webu jde **vytvořit v JavaScriptu** na straně klienta pomocí kreslení na plátno [`&lt;canvas>`](/canvas).

    Skriptem se projde celý [DOM](/dom) stránky, zjistí se styly jednotlivých elementů (metoda [`getComputedStyle`](/zjisteni-css)) a podle toho se stránka prvek po prvku nakreslí na plátno.

      [html2canvas](http://html2canvas.hertzen.com/) – hotové řešení převádějící HTML na obrázek

    Po kliknutí na následující tlačítko se textový obsah tohoto článku nakreslí do `&lt;canvas>`u a přidá na konec stránky (může to chvíli trvat):

        function screenShot(sourceElement) {
            html2canvas(sourceElement).then(function(canvas) {
                sourceElement.appendChild(canvas);
            });
            
        }  

        Vytvořit screenshot

  .text canvas {
      border: 5px solid #000;
      max-width: 100%;
  }