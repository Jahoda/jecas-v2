---
title: "Meta tag viewport"
headline: "Značka <code>&lt;meta name=viewport></code>"
description: "K čemu používat <code>&lt;meta></code> tag <code>name=viewport</code>."
date: "2013-06-28"
last_modification: "2015-08-16"
status: 1
tags: ["HTML", "HTML značky", "Prohlížeče", "Responsivní design"]
---

Dává smysl pro [responsivní weby](/responsivni-web), jelikož prohlížeče v chytrých telefonech a tabletech běžně **zobrazují web „zmenšený“**, aby byl celý vidět, a do čitelné velikosti si jej musí zvětšit až sám uživatel.

**Běžné použití**:

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

## Proč `&lt;meta>` viewport?

Takový mobilní prohlížeč v orientaci na výšku má například skutečnou šířku 480 px, ale tváří se, že má třeba 1024 px. Web se potom vykreslí v rozlišení 1024 pixelů a je **zmenšen** na 480, aby měl návštěvník po načtení přehled o celé stránce a mohl si následně přiblížit, co potřebuje.

Meta tagem `&lt;meta name=viewport&gt;` jde *přemluvit* k jinému chování. To se hodí u responsivních webů, kdy není nutné, aby prohlížeč **předstíral vyšší rozlišení**.

Docílit toho lze zadáváním určitých parametrů do atributu `content`. Pro kombinaci více vlastností je stačí oddělit čárkami.

  `width=device-width`

    Za `=` se zadává buď přesná hodnota v pixelech bez jednotek (pokud je web udělán na nějaké přesné rozlišení), nebo `device-width`, což je skutečná šířka zařízení.

    ```
&lt;!-- šířka 480 px --&gt;
&lt;meta name="*viewport*" content="**width=480**"&gt;
```

    Stavět web pro **přesnou šířku** je v době obrovské rozmanitosti rozlišení značně problematické. Lepší je šířku nastavit podle zařízení.

    ```
&lt;!-- šířka dle zařízení --&gt;
&lt;meta name="*viewport*" content="width=**device-width**"&gt;
```

    Správné zobrazení na malém displeji se potom zajistí v CSS. To se typicky dělá s využitím [Media Queries](/mobilni-web#media-queries).

  `initial-scale=1`

    Měřítko, ve kterém se web automaticky zobrazí. Měřítko 1:1 je `initial-scale=**1**`, vyšší hodnoty jsou zvětšení, menší zmenšení. Stránku nebývá možné zmenšit pod stanovené měřítko, proto je dobré jej zvolit tak, aby stránka nebyla zbytečně velká.

    Měřítko na `1` bývá dobré nastavit i při kombinaci s `width=device-width`. Bez něj může nastat problém s elementy, které jsou mimo plochu – třeba navigace, co „odtlačuje“ obsah.

  `maximum-scale=5`

    Maximální zvětšení. Zadáním hodnoty `0.1` vytvoříme nečitelný a nezvětšitelný web. :–) Analogicky funguje `**min**imum-scale`.

  `user-scalable=no`

    Zabránění měnit velikost.

## Co a kdy použít?

Na stránce, která má CSS styly pro malé displeje, je osvědčené:

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

Změnou ostatních hodnot lze lehce zlepšit zážitek z běžného webu bez vytváření speciálních CSS pravidel. Při špatném použití ale také výrazně zhoršit (nezmenšitelná nebo nezvětšitelná stránka).

## Změna měřítka stránky

U **stránek s fixními rozměry** (třeba šířka 960 pixelů) se může nabízet vyřešit zobrazení na mobilu tak, že se změní měřítko.

Problém je v tom, že různá zařízení mají **různá rozlišení**, takže je nemožné odlišné měřítko od 1:1 nastavit, aby **fungovalo universálně**.

Teoreticky by šlo **měřit rozlišení JavaScriptem** a podle toho nastavovat měřítko. Jde ale spíš o nouzové a ne moc dobré řešení – se skutečným responsivním webem půjde dosáhnout lepších výsledků.

    - [Jak předělat web na responsivní](/prevod-responsivni-design) – postupy, jak ze starého webu udělat responsivní

								Safari 9 now has a 
  
    `shrink-to-fit: no`
     property in the viewport

    [5](#5)
  
   meta element 
  
    as the 
    `initial-scale`
     property has been changed on purpose

    [6](#6)
  
   in the new WebKit version.			

-->

## Odkazy jinam

  - Vzhůru dolů: [Viewport na Windows 8 a 8.1](http://www.vzhurudolu.cz/prirucka/viewport-windows)