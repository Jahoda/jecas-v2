---
title: "Vícenásobné CSS pozadí"
headline: "Více obrázků na pozadí"
description: "Jak v CSS jednomu elementu přiřadit více obrázků na pozadí."
date: "2013-11-18"
last_modification: "2013-11-18"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady", "Obrázky"]
---

Při vytváření graficky složitějších webů se můžeme dostat do situace, kdy pro dosažení požadovaného vzhledu potřebujeme **více než jeden obrázek** na pozadí.

Více obrázků je potřeba zejména tehdy, když se `&lt;div>` s obrázkovým pozadím má **roztahovat dle obsahu**.

Budeme-li tento obrázek chtít použít jako `background` nějakého elementu a umožnit roztahování dle **délky obsahu**. Budeme ho muset **rozřezat**:

  - V případě, že bude stačit **natahování do výšky**, na vrchní část, shora dolů opakující se prostředek a spodek.

  - V případě **natahování do šířky i výšky** potom obdobně ještě na levou část, opakující se prostředek a pravou část.

Pro potřebu ukázky ignoruji, že zrovna takto **jednoduchý rámeček** by šel řešit **čistě v CSS**.

## Řešení

Máme tedy tři obrázky, které budeme **nastavovat jako pozadí**.

    Vršek
    
    `no-repeat`

    Střed
    
    `repeat-y`

    Spodek
    
    `no-repeat`

## Multiple backgrounds

Od **IE 9** fungují tzv. **Multiple backgrounds**, které umožňují jako hodnotu CSS vlastnosti `background` čárkami oddělit **více pozadí najednou**.

Zápis je možné provádět buď přímo do sdružené vlastnosti `background`.

```
background: #fff url(prvni.jpg) no-repeat center center, #000 url(druhy.jpg) repeat-x bottom center
```

Nebo rozepsaně:

```
background-color: #fff, #000;
background-image: url(prvni.jpg), url(druhy.jpg);
background-repeat: no-repeat, repeat-x;
background-position: center center, bottom center;

```

    .ramecek {width: 160px; padding: 10px 20px; 
      background: 
        url(/files/vice-obrazku/ramecek-vrsek.png) no-repeat left top, 
        url(/files/vice-obrazku/ramecek-spodek.png) no-repeat left bottom, 
        url(/files/vice-obrazku/ramecek-stred.png) repeat-y}

    Obsah s obrázkovým rámečkem. Rámeček je řešen přes *Multiple backgrounds*.

    Přidat obsah

## Více `&lt;div>`ů

Pro prohlížeče **IE 8** a starší je nutné použít jinou techniku. Obalit obsah, kde chceme **vícenásobné pozadí**, do více obalů, kde každý z nich bude mít **jednu část pozadí**.

    .ramecek-stred {background: url(/files/vice-obrazku/ramecek-stred.png) repeat-y; width: 200px}
    .ramecek-vrsek {background: url(/files/vice-obrazku/ramecek-vrsek.png) no-repeat left top}
    .ramecek-spodek {background: url(/files/vice-obrazku/ramecek-spodek.png) no-repeat left bottom; padding: 10px 20px}

        Obsah s obrázkovým rámečkem. Rámeček je řešen přes tři vnořené `&lt;div>`y.

        Přidat obsah

Trochu záludné na tomto řešení je, že **rozměry** je nutné zadávat pro první obal, ale `padding` zase pro ten poslední (nejvnitřnější).

## Posicování

Kromě **zanořených** elementů s pozadím, se dá neopakující se obrázky umístit do `&lt;div>`ů a [absolutně naposicovat](/position#absolute).

    .ramecek-obal {background: url(/files/vice-obrazku/ramecek-stred.png) repeat-y; width: 160px; padding: 10px 20px; position: relative;}
    .posicovany {background: url(/files/vice-obrazku/ramecek-vrsek.png); position: absolute; top: 0; left: 0; width: 200px; height: 20px;}
    .spodek {background: url(/files/vice-obrazku/ramecek-spodek.png); top: auto; bottom: 0}

    Obsah s obrázkovým rámečkem. Rámeček je řešen přes absolutně posicovaný vršek a spodek.

    Přidat obsah