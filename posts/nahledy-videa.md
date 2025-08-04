---
title: "Náhledy videa"
headline: "Více náhledů videa"
description: "Jak při najetí myší na náhled videa zobrazovat další náhledy."
date: "2013-11-03"
last_modification: "2013-11-07"
status: 1
tags: ["CSS", "Hotová řešení", "YouTube", "Video"]
---

**Jeden obrázek** pro dostatečnou představu o obsahu vide nemusí stačit. Proto se nabízí **při najetí myší na obrázek** automaticky zobrazit náhledy z **jiné části videa**.

Pro optimalisaci počtu HTTP spojení a pro zajištění, že další obrázky **budou včas načtené**, může být vhodné umístit všechny náhledy z různých částí videa do jednoho obrázku (tzv. CSS spritu). V následujících ukázkách náhledů ze **serveru YouTube** ale budou použity **jednotlivé obrázky**, protože je tak YT [přímo nabízí](/youtube-lazy-loading#nahledy), nicméně zásadní rozdíl mezi řešením CSS spritem a jednotlivými obrázky není.

## Automatická smyčka náhledů

První možnost je při najetí myší (v CSS `:hover`, v JavaScriptu `onmouseover`) **s prodlevou** obrázky prohazovat. To může řešit buď JS **časovač**, nebo **od IE 10** [animace v CSS](/animation). V [ukázce](http://kod.djpw.cz/bwc) se používá JS časovač.

  /* reset stylů webu */
  .live img {display: inline}
  .live a, .live a:hover {border: 0; background: none;}

    var casovac;
    function nahledy(img) {
      var i = 1;
      casovac = setInterval(function() {
        var predchozi = i + ".jpg";
        i++;
        if (i > 3) i = 1;    
        img.src = img.src.replace(predchozi, (i + ".jpg"));
      }, 500);
    }    
    function zrusit() {
      clearTimeout(casovac);
    }

## Ruční procházení náhledů

Předchozí řešení není úplně špatné, ale možná by bylo lepší, kdyby si šlo nějak **zvolit, který obrázek si chci prohlédnout**.

Nabízí se proto umístit *do náhledu* pro každý jeden obrázek nějakou plochu, která **po najetí** zobrazí vybraný náhled.

Řešení je **čistě v CSS** ([samostatná ukázka](http://kod.djpw.cz/gwc)).

  - V obalovém `&lt;div>`u jsou vedle sebe [absolutně naposicovány](/position#absolute) plochy reagující na `:hover`.

  - Kromě **prvního obrázku** jsou nejprve všechny ostatní skryté.

  - Při `:hover`u na ploše se pomocí [selektoru příméhou sourozence](/css-selektory#primy-sourozenec) zobrazí odpovídající obrázek, který v kódu **následuje** *plochu*.

    .nahled {width: 120px; height: 95px; overflow: hidden; position: relative; display: inline-block; zoom: 1; =display: inline}
    
    .nahled .plocha {position: absolute; width: 40px; height: 90px; left: 0; top: 0; z-index: 1;
      background: url(nesmysl-pro-ie); border-bottom: 5px solid #666;}
    .nahled .druha {left: 40px;}
    .nahled .treti {left: 80px;}
    
    .nahled img {display: none; position: absolute; left: 0; top: 0; z-index: 0}
    .nahled .prvni+img {display: block;}
    .nahled .plocha:hover+img {display: block;}
    .nahled .plocha:hover {border-color: red;}

### Prázdný element v IE

V Explorerech je normálně ignorován element bez obsahu, pokud nemá pozadí. Řešení je nějaké nastavit a **neviditelnou aktivní oblast** vytvořit stoprocentním [zprůhledněním](/opacity) (`opacity: 0; filter: alpha(opacity=0);`) nebo nastavením nějakého **obrázku na pozadí** — obrázek to může být **libovolný**:

  - jednopixelový průhledný,
 
  - obrázek, co se na stránce již používá (aby se nevytvářel další HTTP požadavek), naposicovaný (`background-position`) někam minus 1000 pixelů mimo (aby nebyl vidět)

  - nebo klidně **obrázek neexistující** (to je použito v ukázce).