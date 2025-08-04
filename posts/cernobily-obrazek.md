---
title: "Černobílý efekt obrázku"
headline: "Černobílý styl obrázku"
description: "Jak v CSS zajistit černobílý styl běžného obrázku. Napříč prohlížeči stále panují rozdíly."
date: "2013-06-14"
last_modification: "2013-06-14"
status: 1
tags: ["CSS", "Hotová řešení"]
---

## Internet Explorer 6–9

V Explorerech lze od pradávna využít vlastnost `filter`:
  
```
element {filter: gray}
```

## Google Chrome

V Chrome funguje *nová* [prefixovaná](/css-prefixy) vlastnost [`filter`](/filter).
```
-webkit-filter: grayscale(100%)
```

## Firefox

Ve Firefoxu pro změnu funguje zadání filtru jako [SVG](/svg):
```
element {
filter: url("data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\'>&lt;filter id=\'grayscale\'>&lt;feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/>&lt;/filter>&lt;/svg>#grayscale")
}
```

.cernobily {
	filter: url("data:image/svg+xml;utf8,#grayscale");
	filter: gray;
	-webkit-filter: grayscale(1)
}

Funkční v IE 6-9, Firefox, Chrome

## Internet Explorer 10 a Opera

Paradoxní situace nastává u IE 10, kde už staré dobré filtry nefungují. A nové filtry **ještě** nefungují (ani s prefixem `-ms-`). Jedno řešení je [shodit Explorer do režimu 9](/podminene-komentare#ie10) (`gray` filtr je jeden z mála, spolu s [průhledností](/opacity), co takto funguje), druhé použít na stránce `&lt;svg>`.

V Opeře pochopitelně zbývá jen druhá možnost. Taktéž řešení pomocí SVG bude funkční i v Chromu a Firefoxu (ne ale v IE 9 a starších).

### Řešení pomocí `&lt;svg>` v HTML

Vytvoří se `&lt;svg>` kontejner,
vytvoří se nějaké ty [filtry](http://blogs.msdn.com/b/ie/archive/2011/10/14/svg-filter-effects-in-ie10.aspx) (lze použít [generátor](http://ie.microsoft.com/testdrive/Graphics/hands-on-css3/hands-on_svg-filter-effects.htm)),
vloží se obrázek jako `&lt;image>`, na který se použije výše vytvořený filter.

#### Ukázka

## Pseudo černobílost

Lehce podobný efekt lze vytvořit překrytím obrázku průhledným elementem s černým pozadím.

.jakocernobily {background: #666; display: block; width: 100px; overflow: hidden}
.jakocernobily img {opacity: .3; filter: alpha(opacity=30)}
.jakocernobily a:hover img {opacity: 1; filter: alpha(opacity=100) }

## Hudba budoucnosti

V budoucnu by ideálně mělo v prohlížečích fungovat prosté `filter: grayscale(100%)`, jak nyní (byť s prefixem) funguje v Chrome. Případně alespoň s prefixem pro daný prohlížeč.

## Zdroje a odkazy

[Černobílé obrázky napříč prohlížeči](http://www.karlhorky.com/2012/06/cross-browser-image-grayscale-with-css.html) (anglicky), [ukázka](http://jsfiddle.net/KDtAX/487/),
[O *nových* filtrech v CSS 3](http://www.html5rocks.com/en/tutorials/filters/understanding-css/) (anglicky),
[Ukázka bez HTML značky `&lt;svg>`](http://labs.voronianski.com/css3-grayscale/) (nefunkční v IE 10 a Opeře),
[Jak vytvořit černobílý filtr v IE 10](http://stackoverflow.com/questions/14813142/internet-explorer-10-howto-apply-grayscale-filter) (anglicky),
[Od Microsoftu o SVG filtrech v IE 10](http://blogs.msdn.com/b/ie/archive/2011/10/14/svg-filter-effects-in-ie10.aspx)